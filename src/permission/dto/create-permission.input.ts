import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

@InputType()
export class CreatePermissionInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(20)
  name: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(55)
  description: string;
}
