/**
 * @description 인증 API Contract
 * @author Shiwoo Min
 * @date 2026-01-27
 */

import { z } from 'zod';
import {
  ChangePasswordRequestSchema,
  ForgotPasswordRequestSchema,
  LoginRequestSchema,
  LoginResponseSchema,
  LogoutRequestSchema,
  RefreshTokenRequestSchema,
  RefreshTokenResponseSchema,
  ResetPasswordRequestSchema,
} from '../schemas/auth/index';
import { ApiResponseSchema } from '../schemas/common/response.schema';
import { EmployeeSchema } from '../schemas/staff/employee.schema'; // EmployeeSchema 활용

/**
 * POST /auth/login
 */

export const authContract = {
  /**
   * POST /auth/login
   */
  login: {
    method: 'POST' as const,
    path: '/auth/login',
    summary: '직원 로그인',
    body: LoginRequestSchema,
    responses: {
      200: ApiResponseSchema(LoginResponseSchema),
    },
  },

  /**
   * POST /auth/refresh
   */
  refreshToken: {
    method: 'POST' as const,
    path: '/auth/refresh',
    summary: '토큰 갱신',
    body: RefreshTokenRequestSchema,
    responses: {
      200: ApiResponseSchema(RefreshTokenResponseSchema),
    },
  },

  /**
   * POST /auth/logout
   */
  logout: {
    method: 'POST' as const,
    path: '/auth/logout',
    summary: '로그아웃',
    body: LogoutRequestSchema,
    responses: {
      200: ApiResponseSchema(z.object({ message: z.string() })),
    },
  },

  /**
   * POST /auth/change-password
   */
  changePassword: {
    method: 'POST' as const,
    path: '/auth/change-password',
    summary: '비밀번호 변경',
    body: ChangePasswordRequestSchema,
    responses: {
      200: ApiResponseSchema(z.object({ message: z.string() })),
    },
  },

  /**
   * POST /auth/forgot-password
   */
  forgotPassword: {
    method: 'POST' as const,
    path: '/auth/forgot-password',
    summary: '비밀번호 찾기(이메일 발송)',
    body: ForgotPasswordRequestSchema,
    responses: {
      200: ApiResponseSchema(z.object({ message: z.string() })),
    },
  },

  /**
   * POST /auth/reset-password
   */
  resetPassword: {
    method: 'POST' as const,
    path: '/auth/reset-password',
    summary: '비밀번호 초기화',
    body: ResetPasswordRequestSchema,
    responses: {
      200: ApiResponseSchema(z.object({ message: z.string() })),
    },
  },

  /**
   * GET /auth/me
   * EmployeeSchema의 핵심 필드를 재사용하여 타입 안정성 강화
   */
  getMe: {
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
  },
} as const;

// Contract 타입 추출
export type AuthContract = typeof authContract;
