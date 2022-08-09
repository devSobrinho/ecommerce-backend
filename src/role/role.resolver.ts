import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import {
  CurrentUser,
  ICurrentUser,
} from 'src/common/decorators/currentUser.decorator';
import { Permissions } from 'src/common/decorators/permission.decorator';
import { Permission } from 'src/permission/enums/permission.enum';
import { PermissionGuard } from 'src/permission/permission.guard';
import { AddPermissionsInRolesInput } from './dto/add-permissions-in-role.input';
import { CreateRoleInput } from './dto/create-role.input';
import { UpdateRoleInput } from './dto/update-role.input';
import { Role } from './entities/role.entity';
import { RoleService } from './role.service';

@UseGuards(GqlAuthGuard, PermissionGuard)
@Resolver(() => Role)
export class RoleResolver {
  constructor(private roleService: RoleService) {}

  @Permissions(Permission.FindRoles)
  @Query(() => [Role])
  async roles() {
    return await this.roleService.findRoles();
  }

  @Permissions(Permission.FindRole)
  @Query(() => Role)
  async roleById(@Args('id') id: string) {
    return await this.roleService.findRoleById(id);
  }

  @Permissions(Permission.FindRole)
  @Query(() => Role)
  async roleByName(@Args('name') name: string) {
    return await this.roleService.findRoleByName(name.toLowerCase());
  }

  @Permissions(Permission.CreateRole)
  @Mutation(() => Role)
  async createRole(
    @CurrentUser('currentUser') { id }: ICurrentUser,
    @Args('data')
    { name, description }: CreateRoleInput,
  ) {
    return await this.roleService.createRole(id, {
      name: name.toLowerCase(),
      description,
    });
  }

  @Permissions(Permission.UpdateRole)
  @Mutation(() => Role)
  async updateRole(@Args('data') data: UpdateRoleInput) {
    data.name = data.name?.toLocaleLowerCase();
    return await this.roleService.updateRole(data);
  }

  @Permissions(Permission.DeleteRole)
  @Mutation(() => Role)
  async deleteRole(@Args('id') id: string) {
    return await this.roleService.deleteRole(id);
  }

  @Permissions(Permission.PostRoleAddPermissions)
  @Mutation(() => Role)
  async addPermissionsAtRole(@Args('data') data: AddPermissionsInRolesInput) {
    return await this.roleService.addPermissionsAtRole(data);
  }
}
