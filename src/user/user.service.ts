import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from 'src/prisma.service';
import { FindUserInput } from './dto/find-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findUsers() {
    const user = await this.prisma.user.findMany({ include: { roles: true } });
    return user;
  }

  async findUser(data: FindUserInput) {
    if (!data.email && !data.id)
      throw new NotFoundException('Email or id needs to be sent for find user');

    const user = await this.prisma.user.findFirst({
      where: { ...data },
    });
    if (!user) throw new NotFoundException();
    return user;
  }

  async findUserById(id: string) {
    const user = await this.prisma.user.findUniqueOrThrow({ where: { id } });
    return user;
  }

  async findUserByEmail(email: string) {
    const user = await this.prisma.user.findUniqueOrThrow({ where: { email } });
    return user;
  }

  async updateUser(id: string, data: UpdateUserInput) {
    if (!data.email && !data.password)
      throw new NotFoundException(
        'Email or id needs to be sent for update user',
      );

    const user = await this.prisma.user.update({
      where: { id },
      data: { ...data },
    });
    if (!user) throw new InternalServerErrorException();

    return user;
  }
}
