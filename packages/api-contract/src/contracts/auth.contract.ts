/**
 * @description 인증 API Contract
 * @author Shiwoo Min
 * @date 2026-01-26
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
import { ApiResponseSchema } from '../schemas/common/response.schema.js';

/**
 * POST /auth/login
 */
export const loginContract = {
  method: 'POST' as const,
  path: '/auth/login',
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
  body: ResetPasswordRequestSchema,
  responses: {
    200: ApiResponseSchema(z.object({ message: z.string() })),
  },
};

/**
 * GET /auth/me
 */
export const getMeContract = {
  method: 'GET' as const,
  path: '/auth/me',
  responses: {
    200: ApiResponseSchema(
      z.object({
        id: z.string(),
        email: z.string().email(),
        name: z.string(),
        isAdmin: z.boolean(),
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
