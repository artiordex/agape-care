/**
 * @description 역할 기반 접근 제어 데코레이터
 * @author Shiwoo Min
 * @date 2026-01-26
 */

import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
