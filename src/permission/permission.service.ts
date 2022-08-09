import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreatePermissionInput } from './dto/create-permission.input';
import { UpdatePermissionInput } from './dto/update-permission.input';

@Injectable()
export class PermissionService {
  constructor(private prisma: PrismaService) {}

  async findPermissions() {
    const permission = await this.prisma.permission.findMany({
      include: { roles: true },
    });

    return permission;
  }

  async findPermissionById(id: string) {
    const permission = await this.prisma.permission.findFirst({
      where: { id },
    });

    if (!permission) throw new NotFoundException('Permission not found');
    return permission;
  }

  async findPermissionByName(name: string) {
    const permission = await this.prisma.permission.findFirst({
      where: { name },
    });

    if (!permission) throw new NotFoundException('Permission not found');
    return permission;
  }

  async createPermission({ name, description }: CreatePermissionInput) {
    try {
      const permission = await this.prisma.permission.create({
        data: { name, description },
      });

      return permission;
    } catch (e: any) {
      if (Prisma.PrismaClientKnownRequestError && e.code === 'P2002') {
        throw new ConflictException(`Permission ${name} already used.`);
      }

      throw new InternalServerErrorException();
    }
  }

  async updatePermission(data: UpdatePermissionInput) {
    try {
      const permission = await this.prisma.permission.update({
        where: {
          id: data.id,
        },
        data,
      });
      return permission;
    } catch (e: any) {
      if (Prisma.PrismaClientKnownRequestError && e.code === 'P2025') {
        throw new NotFoundException('Permission not found');
      }

      throw new InternalServerErrorException();
    }
  }

  async deletePermission(id: string) {
    try {
      const permission = await this.prisma.permission.delete({ where: { id } });
      return permission;
    } catch (e: any) {
      if (Prisma.PrismaClientKnownRequestError && e.code === 'P2025') {
        throw new NotFoundException('Permission not found');
      }

      throw new InternalServerErrorException();
    }
  }
}
