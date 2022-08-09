import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { PermissionResolver } from './permission.resolver';
import { PermissionService } from './permission.service';

@Module({
  providers: [PrismaService, PermissionResolver, PermissionService, JwtService],
})
export class PermissionModule {}
