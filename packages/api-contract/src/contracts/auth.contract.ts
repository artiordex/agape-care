/**
 * @description 인증 API Contract
 * @author Shiwoo Min
 * @date 2026-01-27
 */

import { z } from 'zod';
import {
  LoginRequestSchema,
  LoginResponseSchema,
  RefreshTokenRequestSchema,
  RefreshTokenResponseSchema,
  ChangePasswordRequestSchema,
  ForgotPasswordRequestSchema,
  ResetPasswordRequestSchema,
  LogoutRequestSchema,
} from '../schemas/auth/index.js';
import { EmployeeSchema } from '../schemas/staff/employee.schema.js'; // EmployeeSchema 활용
import { ApiResponseSchema } from '../schemas/common/response.schema.js';

/**
 * POST /auth/login
 */
export const loginContract = {
  method: 'POST' as const,
  path: '/auth/login',
  summary: '직원 로그인', // 문서화용 요약 추가
  body: LoginRequestSchema,
  responses: {
    200: ApiResponseSchema(LoginResponseSchema),
  },
};

/**
 * POST /auth/refresh
 */
export const refreshTokenContract = {
  method: 'POST' as const,
  path: '/auth/refresh',
  summary: '토큰 갱신',
  body: RefreshTokenRequestSchema,
  responses: {
    200: ApiResponseSchema(RefreshTokenResponseSchema),
  },
};

/**
 * POST /auth/logout
 */
export const logoutContract = {
  method: 'POST' as const,
  path: '/auth/logout',
  summary: '로그아웃',
  body: LogoutRequestSchema,
  responses: {
    200: ApiResponseSchema(z.object({ message: z.string() })),
  },
};

/**
 * POST /auth/change-password
 */
export const changePasswordContract = {
  method: 'POST' as const,
  path: '/auth/change-password',
  summary: '비밀번호 변경',
  body: ChangePasswordRequestSchema,
  responses: {
    200: ApiResponseSchema(z.object({ message: z.string() })),
  },
};

/**
 * POST /auth/forgot-password
 */
export const forgotPasswordContract = {
  method: 'POST' as const,
  path: '/auth/forgot-password',
  summary: '비밀번호 찾기(이메일 발송)',
  body: ForgotPasswordRequestSchema,
  responses: {
    200: ApiResponseSchema(z.object({ message: z.string() })),
  },
};

/**
 * POST /auth/reset-password
 */
export const resetPasswordContract = {
  method: 'POST' as const,
  path: '/auth/reset-password',
  summary: '비밀번호 초기화',
  body: ResetPasswordRequestSchema,
  responses: {
    200: ApiResponseSchema(z.object({ message: z.string() })),
  },
};

/**
 * GET /auth/me
 * EmployeeSchema의 핵심 필드를 재사용하여 타입 안정성 강화
 */
export const getMeContract = {
  method: 'GET' as const,
  path: '/auth/me',
  summary: '내 정보 조회',
  responses: {
    200: ApiResponseSchema(
      EmployeeSchema.pick({
        id: true,
        email: true,
        name: true,
        isAdmin: true,
        roleId: true, // 역할 정보도 포함하면 프론트 RBAC 구현 시 유용합니다.
      }),
    ),
  },
};

// Contract 타입 추출
export type LoginContract = typeof loginContract;
export type RefreshTokenContract = typeof refreshTokenContract;
export type LogoutContract = typeof logoutContract;
export type ChangePasswordContract = typeof changePasswordContract;
export type ForgotPasswordContract = typeof forgotPasswordContract;
export type ResetPasswordContract = typeof resetPasswordContract;
export type GetMeContract = typeof getMeContract;
