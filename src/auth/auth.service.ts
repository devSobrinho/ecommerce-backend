import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';

import { SecurityConfig } from 'src/common/configs/config.interface';
import { PrismaService } from 'src/prisma.service';
import { LoginInput } from './dto/login.input';
import { IPayloadGenerateToken } from './dto/payload-generate-token.dto';
import { SignupInput } from './dto/signup.input';
import { PasswordService } from './password.service';
import { Token } from './entities/token.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly passwordService: PasswordService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(userId: string) {
    const rolesData = await this.prisma.role.findMany({
      where: { users: { every: { id: userId } } },
      include: { permissions: true, users: true },
    });

    const roles =
      rolesData.map((r) => ({
        name: r.name,
        permissions: r.permissions?.map((p) => ({ name: p.name })) || [],
      })) || [];
    return {
      id: userId,
      roles: roles ?? [],
    };
    // return await this.prisma.user.findUnique({ where: { id: userId } });
  }

  async createUser({ email, password }: SignupInput) {
    const passwordHash = await this.passwordService.hashPassword(password);

    try {
      const user = await this.prisma.user.create({
        data: {
          email,
          password: passwordHash,
        },
      });

      return this.generateTokens({ user: { id: user.id } });
    } catch (e: any) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2002'
      ) {
        throw new ConflictException(`Email ${email} already used.`);
      }

      throw new InternalServerErrorException();
    }
  }

  async login({ email, password }: LoginInput): Promise<Token> {
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: { roles: true },
    });
    if (!user) {
      throw new NotFoundException('Email or password is incorrect');
    }

    const passwordValid = await this.passwordService.validatePassword(
      password,
      user.password,
    );

    if (!passwordValid) {
      throw new NotFoundException('Email or password is incorrect');
    }

    // refatorar ...
    const roles = await this.prisma.role.findMany({
      where: { users: { every: { id: user.id } } },
      include: { permissions: true },
    });

    const rolesToken = roles.map((role) => ({
      name: role.name,
      permissions: role.permissions.map((p) => ({ name: p.name })),
    }));

    return this.generateTokens({
      user: { id: user.id, roles: rolesToken },
    });
  }

  // async getUserFromToken(token: string): Promise<User> {
  //   console.log('token', token);

  //   const id = this.jwtService.decode(token)['userId'];
  //   const user = await this.prisma.user.findUnique({ where: { id } });
  //   if (!user) throw new UnauthorizedException();
  //   return user;
  // }

  generateAccessToken(payload: IPayloadGenerateToken): string {
    // payload.user.roles[0]. q
    return this.jwtService.sign(payload);
  }

  generateRefreshToken(payload: IPayloadGenerateToken): string {
    const securityConfig = this.configService.get<SecurityConfig>('security');
    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_SECRET'),
      expiresIn: securityConfig.refreshIn,
    });
  }

  generateTokens(payload: IPayloadGenerateToken): Token {
    return {
      accessToken: this.generateAccessToken(payload),
      refreshToken: this.generateRefreshToken(payload),
    };
  }

  refreshToken(token: string): Token {
    try {
      const { userId } = this.jwtService.verify(token, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
      });

      return this.generateTokens({ user: { id: userId } });
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
