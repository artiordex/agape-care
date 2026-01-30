/**
 * @description Program 도메인 스키마
 * @author Shiwoo
 * @date 2026-01-26
 */
import { z } from 'zod';

/**
 * Program 기본 구조
 */
export const ProgramSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().nullable(),
  category: z.string().nullable(),
  isActive: z.boolean().default(true),
  meta: z.object({}).catchall(z.any()).default({}),
  createdAt: z.string(), // ISO
  updatedAt: z.string(), // ISO
});

/**
 * 프로그램 생성 요청
 */
export const CreateProgramRequestSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  category: z.string().optional(),
  isActive: z.boolean().optional(),
  meta: z.object({}).catchall(z.any()).optional(),
});

/**
 * 프로그램 수정 요청
 */
export const UpdateProgramRequestSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  category: z.string().optional(),
  isActive: z.boolean().optional(),
  meta: z.object({}).catchall(z.any()).optional(),
});

/**
 * 프로그램 목록 조회 Query
 */
export const GetProgramsQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  search: z.string().optional(),
  isActive: z.boolean().optional(),
});

/**
 * 프로그램 목록 조회 Response
 */
export const GetProgramsResponseSchema = z.object({
  items: z.array(ProgramSchema),
  totalCount: z.number(),
  page: z.number(),
  limit: z.number(),
});

/* Types */
export type Program = z.infer<typeof ProgramSchema>;
export type CreateProgramRequest = z.infer<typeof CreateProgramRequestSchema>;
export type UpdateProgramRequest = z.infer<typeof UpdateProgramRequestSchema>;
export type GetProgramsQuery = z.infer<typeof GetProgramsQuerySchema>;
export type GetProgramsResponse = z.infer<typeof GetProgramsResponseSchema>;
