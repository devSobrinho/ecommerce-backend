import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
// import { OptionalIfParamRequired } from 'src/common/decorators/optionalIfParamRequired.decorator';

@InputType()
export class FindUserInput {
  @Field({ nullable: true })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  id?: string;

  // @OptionalIfParamRequired('id')
  @Field({ nullable: true })
  @IsEmail()
  @IsNotEmpty()
  @IsOptional()
  email?: string;
}
