import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Role } from 'src/role/entities/role.entity';

@ObjectType()
export class Permission {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field(() => [Role], { nullable: true })
  roles: Role[];
}
