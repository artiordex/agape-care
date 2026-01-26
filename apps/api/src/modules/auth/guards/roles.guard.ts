/**
 * @description 역할 기반 접근 제어 가드
 * @author Shiwoo Min
 * @date 2026-01-26
 */

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [context.getHandler(), context.getClass()]);

    if (!requiredRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    // Admin은 모든 권한 허용
    if (user.isAdmin) {
      return true;
    }

    return requiredRoles.some(role => user.roles?.includes(role));
  }
}
