import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import {
  CurrentUser,
  ICurrentUser,
} from 'src/common/decorators/currentUser.decorator';
import { Permissions } from 'src/common/decorators/permission.decorator';
import { Permission } from 'src/permission/enums/permission.enum';
import { PermissionGuard } from 'src/permission/permission.guard';
import { FindUserInput } from './dto/find-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@UseGuards(GqlAuthGuard, PermissionGuard)
@Resolver('User')
export class UserResolver {
  constructor(private userService: UserService) {}

  @Permissions(Permission.FindUsers)
  @Query(() => [User])
  async users() {
    const users = await this.userService.findUsers();
    return users;
  }

  @Query(() => User)
  async user(@CurrentUser('user') user: User): Promise<any> {
    console.log('user current', user);

    const userResponse = await this.userService.findUserById(user.id);
    return userResponse;
  }

  @Permissions(Permission.FindUser)
  @Query(() => User)
  async findUser(@Args('data') data: FindUserInput): Promise<User> {
    data.email = data.email?.toLowerCase();
    const user = await this.userService.findUser(data);
    return user;
  }

  @Permissions(Permission.FindUser)
  @Query(() => User)
  async findUserById(@Args('id') id: string): Promise<User> {
    const userResponse = await this.userService.findUserById(id);
    return userResponse;
  }

  @Permissions(Permission.FindUser)
  @Query(() => User)
  async findUserByEmail(@Args('email') email: string): Promise<User> {
    const user = await this.userService.findUserByEmail(email);
    return user;
  }

  @Mutation(() => User)
  async updateUser(
    @CurrentUser() currentUser: ICurrentUser,
    @Args('data') data: UpdateUserInput,
  ) {
    return await this.userService.updateUser(currentUser.id, data);
  }

  // async createUser(@Args('data') data: CreateUserInput): Promise<User> {
  //   data.email = data.email.toLowerCase();
  //   const user = await this.userService.createUser(data);
  //   return user;
  // }
}
