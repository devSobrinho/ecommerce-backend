import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Role } from 'src/role/entities/role.entity';

export interface ICurrentUser {
  id: string;
  roles?: Role[];
}

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): ICurrentUser => {
    const ctx = GqlExecutionContext.create(context);

    return ctx.getContext().req.user;
  },
);
