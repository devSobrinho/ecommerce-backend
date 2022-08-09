import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { GraphQLScalarType, Kind } from 'graphql';

// custom Scalar type exemple
// const teste = new GraphQLScalarType({
//   name: 'Date',
//   description: 'Date custom scalar type',
//   serialize(value: any) {
//     return value.getTime();
//   },
//   parseValue(value: any) {
//     return new Date(value);
//   },
//   parseLiteral(ast) {
//     if (ast.kind === Kind.INT) {
//       return new Date(parseInt(ast.value, 10));
//     }
//     return null;
//   },
// });

@InputType()
export class CreateRoleInput {
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

  // @IsString()
  // @IsNotEmpty()
  // role_create_for_user_id: string;
}
