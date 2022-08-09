import { Field, InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

@InputType()
export class UpdateUserInput {
  @Field({ nullable: true })
  @IsEmail()
  @IsNotEmpty()
  @IsOptional()
  email?: string;

  @Field({ nullable: true })
  @MinLength(8)
  @MaxLength(55)
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  password?: string;
}
