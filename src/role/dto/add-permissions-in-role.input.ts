import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class AddPermissionsInRolesInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  id: string;

  @Field(() => [String], { nullable: true })
  @IsString({ each: true })
  @IsNotEmpty()
  permissions_id: string[];
}
