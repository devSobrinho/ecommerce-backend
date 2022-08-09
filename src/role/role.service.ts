import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Permission, Prisma } from '@prisma/client';

import { PrismaService } from 'src/prisma.service';
import { AddPermissionsInRolesInput } from './dto/add-permissions-in-role.input';
import { CreateRoleInput } from './dto/create-role.input';
import { UpdateRoleInput } from './dto/update-role.input';

@Injectable()
export class RoleService {
  constructor(private prisma: PrismaService) {}

  async findRoles() {
    const roles = await this.prisma.role.findMany({
      include: { permissions: true },
    });
    return roles;
  }

  async findRoleById(id: string) {
    const role = await this.prisma.role.findFirst({ where: { id } });
    if (!role) throw new NotFoundException('Role not found');

    return role;
  }

  async findRoleByName(name: string) {
    const role = await this.prisma.role.findFirst({
      where: { name },
    });
    if (!role) throw new NotFoundException('Role not found');

    return role;
  }

  /* criar roles baseadas em cascata de acesso do qual o
 criador tem acesso, limitando-o no maximo ao proprio limite 
 de suas permissions */
  async createRole(id: string, { name, description }: CreateRoleInput) {
    // const alreadyExistRole = await this.prisma.role.findFirst({
    //   where: { name },
    // });

    // if (alreadyExistRole)
    //   throw new HttpException('Role name already exists', HttpStatus.NOT_FOUND);
    try {
      const role = await this.prisma.role.create({
        data: {
          name,
          description,
          role_create_for_user_id: id,
        },
      });

      return role;
    } catch (e: any) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2002'
      ) {
        throw new HttpException(
          'Role name already exists',
          HttpStatus.NOT_FOUND,
        );
      }
      throw new InternalServerErrorException();
    }
  }

  async updateRole({ id, name, description }: UpdateRoleInput) {
    try {
      const role = await this.prisma.role.update({
        where: {
          id,
        },
        data: {
          name,
          description,
        },
      });

      return role;
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2025'
      ) {
        throw new NotFoundException('Role not found');
      }
      throw new InternalServerErrorException();
    }
  }

  async deleteRole(id: string) {
    const role = await this.prisma.role.delete({ where: { id } });
    if (!role) throw new NotFoundException('Role not found');

    return role;
  }

  async addPermissionsAtRole({
    id,
    permissions_id,
  }: AddPermissionsInRolesInput) {
    const errors: string[] = [];
    const permissions: Permission[] = [];

    const role = await this.prisma.role.findFirst({
      where: { id },
    });
    if (!role) throw new NotFoundException('Role not found');

    for (const permission_id of permissions_id) {
      const permission = await this.prisma.permission.findFirst({
        where: { id: permission_id },
      });

      if (!permission) {
        errors.push(permission_id);
      } else {
        permissions.push(permission);
      }
    }

    if (errors.length > 0) {
      throw new NotFoundException(
        `Permissions not found, ids errors: ${errors.join(', ')}`,
      );
    }
    if (permissions.length === 0) {
      throw new BadRequestException('Not permission added');
    }

    for (const permission of permissions) {
      await this.prisma.permission.update({
        where: { id: permission.id },
        data: {
          roles: {
            connectOrCreate: {
              where: { id: role.id },
              create: role,
            },
          },
        },
      });
    }

    const roleUpdated = this.prisma.role.findFirst({
      where: { id },
      include: { permissions: true },
    });

    return roleUpdated;
  }
}
