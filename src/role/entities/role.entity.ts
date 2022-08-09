import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/entities/user.entity';
import { Permission } from 'src/permission/entities/permission.entity';

@ObjectType()
export class Role {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  builtIn: boolean;

  @Field()
  role_create_for_user_id: string;

  @Field(() => [User], { nullable: true })
  users?: User[];

  @Field(() => [Permission], { nullable: true })
  permissions?: Permission[];
}
