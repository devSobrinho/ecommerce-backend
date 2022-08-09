import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { Permissions } from 'src/common/decorators/permission.decorator';
import { Permission as PermissionEnum } from './enums/permission.enum';
import { CreatePermissionInput } from './dto/create-permission.input';
import { UpdatePermissionInput } from './dto/update-permission.input';
import { Permission } from './entities/permission.entity';
import { PermissionGuard } from './permission.guard';
import { PermissionService } from './permission.service';

@UseGuards(GqlAuthGuard, PermissionGuard)
@Resolver(() => Permission)
export class PermissionResolver {
  constructor(private permissionService: PermissionService) {}

  @Permissions(PermissionEnum.FindPermissions)
  @Query(() => [Permission])
  async permissions() {
    return await this.permissionService.findPermissions();
  }

  @Permissions(PermissionEnum.FindPermission)
  @Query(() => [Permission])
  async permissionById(@Args('id') id: string) {
    return await this.permissionService.findPermissionById(id);
  }

  @Permissions(PermissionEnum.FindPermission)
  @Query(() => Permission)
  async permissionByName(@Args('name') name: string) {
    return await this.permissionService.findPermissionByName(
      name.toLowerCase(),
    );
  }

  @Permissions(PermissionEnum.CreatePermission)
  @Mutation(() => Permission)
  async createPermission(@Args('data') data: CreatePermissionInput) {
    data.name = data.name.toLowerCase();
    return await this.permissionService.createPermission(data);
  }

  @Permissions(PermissionEnum.UpdatePermission)
  @Mutation(() => Permission)
  async updatePermission(@Args('data') data: UpdatePermissionInput) {
    data.name = data.name?.toLowerCase();
    console.log(data.name);

    return await this.permissionService.updatePermission(data);
  }

  @Permissions(PermissionEnum.DeletePermission)
  @Mutation(() => Permission)
  async deletePermission(@Args('id') id: string) {
    return await this.permissionService.deletePermission(id);
  }
}
