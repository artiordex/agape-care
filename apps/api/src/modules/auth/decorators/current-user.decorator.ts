/**
 * @description 현재 로그인한 사용자 정보를 가져오는 커스텀 데코레이터
 * @author Shiwoo Min
 * @date 2026-01-26
 */

import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface CurrentUserDto {
  sub: string;
  email: string;
  name?: string;
  isAdmin?: boolean;
}

export const CurrentUser = createParamDecorator((data: unknown, ctx: ExecutionContext): CurrentUserDto => {
  const request = ctx.switchToHttp().getRequest();
  return request.user;
});
