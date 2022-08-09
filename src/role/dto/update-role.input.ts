import { Field, InputType } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

@InputType()
export class UpdateRoleInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  id: string;

  @Field({ nullable: true })
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(20)
  @IsOptional()
  name?: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(55)
  @IsOptional()
  description?: string;
}
