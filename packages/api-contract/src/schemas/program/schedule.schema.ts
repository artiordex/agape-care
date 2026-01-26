/**
 * @description Program Schedule 도메인 스키마
 * @author Shiwoo
 * @date 2026-01-26
 */
import { z } from 'zod';

/**
 * 일정 기본 구조
 */
export const ProgramScheduleSchema = z.object({
  id: z.string(),
  programId: z.string(),
  startTime: z.string(), // ISO
  endTime: z.string().nullable(),
  facilitatorId: z.string().nullable(),
  location: z.string().nullable(),
  notes: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

/**
 * 일정 생성 요청
 */
export const CreateScheduleRequestSchema = z.object({
  startTime: z.string(),
  endTime: z.string().optional(),
  facilitatorId: z.string().optional(),
  location: z.string().optional(),
  notes: z.string().optional(),
});

/**
 * 일정 수정 요청
 */
export const UpdateScheduleRequestSchema = z.object({
  startTime: z.string().optional(),
  endTime: z.string().optional(),
  facilitatorId: z.string().optional(),
  location: z.string().optional(),
  notes: z.string().optional(),
});

/**
 * 일정 목록 조회 Query
 */
export const GetSchedulesQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  programId: z.string().optional(),
  facilitatorId: z.string().optional(),
});

/**
 * 일정 목록 조회 Response
 */
export const GetSchedulesResponseSchema = z.object({
  items: z.array(ProgramScheduleSchema),
  totalCount: z.number(),
  page: z.number(),
  limit: z.number(),
});

/* Types */
export type ProgramSchedule = z.infer<typeof ProgramScheduleSchema>;
export type CreateScheduleRequest = z.infer<typeof CreateScheduleRequestSchema>;
export type UpdateScheduleRequest = z.infer<typeof UpdateScheduleRequestSchema>;
export type GetSchedulesQuery = z.infer<typeof GetSchedulesQuerySchema>;
export type GetSchedulesResponse = z.infer<typeof GetSchedulesResponseSchema>;
