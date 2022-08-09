import { Field, HideField, ID, ObjectType } from '@nestjs/graphql';
import { BaseModel } from 'src/common/entities/base.entity';
import { Role } from 'src/role/entities/role.entity';

@ObjectType()
export class User extends BaseModel {
  @Field()
  email: string;

  @HideField()
  password: string;

  @Field(() => [Role], { nullable: true })
  roles?: Role[];
}
