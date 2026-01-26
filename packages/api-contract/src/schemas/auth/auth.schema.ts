/**
 * @description 인증 관련 스키마
 * @author Shiwoo Min
 * @date 2026-01-26
 */

import { z } from 'zod';

/**
 * 로그인 요청
 */
export const LoginRequestSchema = z.object({
  email: z.string().email('올바른 이메일 형식이 아닙니다'),
  password: z.string().min(6, '비밀번호는 최소 6자 이상이어야 합니다'),
});

/**
 * 로그인 응답 - 사용자 정보
 */
export const AuthUserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string(),
  isAdmin: z.boolean(),
  departmentId: z.string().nullable(),
  roleId: z.string().nullable(),
  status: z.enum(['ACTIVE', 'ON_LEAVE', 'INACTIVE']),
});

/**
 * 로그인 응답
 */
export const LoginResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  user: AuthUserSchema,
});

/**
 * 토큰 갱신 요청
 */
export const RefreshTokenRequestSchema = z.object({
  refreshToken: z.string(),
});

/**
 * 토큰 갱신 응답
 */
export const RefreshTokenResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string().optional(),
});

/**
 * 비밀번호 변경 요청
 */
export const ChangePasswordRequestSchema = z
  .object({
    currentPassword: z.string().min(6),
    newPassword: z.string().min(6, '새 비밀번호는 최소 6자 이상이어야 합니다'),
    confirmPassword: z.string(),
  })
  .refine(data => data.newPassword === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다',
    path: ['confirmPassword'],
  });

/**
 * 비밀번호 재설정 요청 (이메일 전송)
 */
export const ForgotPasswordRequestSchema = z.object({
  email: z.string().email('올바른 이메일 형식이 아닙니다'),
});

/**
 * 비밀번호 재설정 (토큰 포함)
 */
export const ResetPasswordRequestSchema = z
  .object({
    token: z.string(),
    newPassword: z.string().min(6, '비밀번호는 최소 6자 이상이어야 합니다'),
    confirmPassword: z.string(),
  })
  .refine(data => data.newPassword === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다',
    path: ['confirmPassword'],
  });

/**
 * 로그아웃 요청
 */
export const LogoutRequestSchema = z.object({
  refreshToken: z.string().optional(),
});

/**
 * JWT 페이로드
 */
export const JwtPayloadSchema = z.object({
  sub: z.string(), // userId
  email: z.string().email(),
  isAdmin: z.boolean(),
  iat: z.number(),
  exp: z.number(),
});

// Type exports
export type LoginRequest = z.infer<typeof LoginRequestSchema>;
export type LoginResponse = z.infer<typeof LoginResponseSchema>;
export type AuthUser = z.infer<typeof AuthUserSchema>;
export type RefreshTokenRequest = z.infer<typeof RefreshTokenRequestSchema>;
export type RefreshTokenResponse = z.infer<typeof RefreshTokenResponseSchema>;
export type ChangePasswordRequest = z.infer<typeof ChangePasswordRequestSchema>;
export type ForgotPasswordRequest = z.infer<typeof ForgotPasswordRequestSchema>;
export type ResetPasswordRequest = z.infer<typeof ResetPasswordRequestSchema>;
export type LogoutRequest = z.infer<typeof LogoutRequestSchema>;
export type JwtPayload = z.infer<typeof JwtPayloadSchema>;
