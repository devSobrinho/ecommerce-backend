import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context);
    const test = ctx.getContext<{ req: Request }>().req;

    const userPermissions =
      test.user?.roles?.map((r) => r.permissions).flat() || [];

    const requiredPermissions =
      this.reflector.get('permissions', context.getHandler()) || [];

    const hasAllRequiredPermissions = requiredPermissions.every(
      (permission) => {
        return userPermissions.find(
          (userPermission) => userPermission.name === permission,
        );
      },
    );

    if (requiredPermissions.length === 0 || hasAllRequiredPermissions) {
      return true;
    }

    throw new ForbiddenException('Insufficient Permissions');
  }
}
