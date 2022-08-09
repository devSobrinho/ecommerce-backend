import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { RoleResolver } from './role.resolver';
import { RoleService } from './role.service';

@Module({
  imports: [],
  providers: [PrismaService, RoleService, RoleResolver],
})
export class RoleModule {}
