/**
 * @description API 응답 공통 스키마
 * @author Shiwoo Min
 * @date 2026-01-26
 */

import { z } from 'zod';
import { PaginationMetaSchema } from './pagination.schema.js';

/**
 * 성공 응답
 */
export const ApiResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    success: z.literal(true),
    data: dataSchema,
    message: z.string().optional(),
  });

/**
 * 페이지네이션 응답
 */
export const PaginatedResponseSchema = <T extends z.ZodTypeAny>(itemSchema: T) =>
  z.object({
    success: z.literal(true),
    data: z.array(itemSchema),
    meta: PaginationMetaSchema,
  });

/**
 * 에러 응답
 */
export const ErrorResponseSchema = z.object({
  success: z.literal(false),
  error: z.object({
    code: z.string(),
    message: z.string(),
    details: z.any().optional(),
  }),
});

/**
 * 헬퍼 타입
 */
export type ApiResponse<T> = {
  success: true;
  data: T;
  message?: string;
};

export type PaginatedResponse<T> = {
  success: true;
  data: T[];
  meta: z.infer<typeof PaginationMetaSchema>;
};

export type ErrorResponse = z.infer<typeof ErrorResponseSchema>;
