/**
 * @description 프로그램 일정 스키마
 * @author Shiwoo Min
 * @date 2026-01-26
 */

import { z } from 'zod';

/**
 * 일정 상태
 */
export const ScheduleStatusSchema = z.enum(['PLANNED', 'CONFIRMED', 'CANCELLED', 'DONE']);

/**
 * 프로그램 일정 정보
 */
export const ProgramScheduleSchema = z.object({
  id: z.string(),
  programId: z.string(),
  programTitle: z.string().optional(), // 조인
  programCategory: z.string().nullable().optional(), // 조인
  startsAt: z.string(), // ISO datetime
  endsAt: z.string(),
  location: z.string().nullable(),
  capacity: z.number().nullable(),
  status: ScheduleStatusSchema,
  participantCount: z.number().optional(), // 참석자 수 (조인 카운트)
  createdAt: z.string(),
  updatedAt: z.string(),
});

/**
 * 프로그램 일정 생성 요청
 */
export const CreateScheduleRequestSchema = z
  .object({
    programId: z.string(),
    startsAt: z.string(), // ISO datetime
    endsAt: z.string(),
    location: z.string().optional(),
    capacity: z.number().int().positive().optional(),
    status: ScheduleStatusSchema.default('PLANNED'),
  })
  .refine(data => new Date(data.endsAt) > new Date(data.startsAt), {
    message: '종료 시각은 시작 시각보다 늦어야 합니다',
    path: ['endsAt'],
  });

/**
 * 프로그램 일정 수정 요청
 */
export const UpdateScheduleRequestSchema = z.object({
  startsAt: z.string().optional(),
  endsAt: z.string().optional(),
  location: z.string().nullable().optional(),
  capacity: z.number().int().positive().nullable().optional(),
  status: ScheduleStatusSchema.optional(),
});

/**
 * 프로그램 일정 목록 조회 쿼리
 */
export const GetSchedulesQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
  programId: z.string().optional(),
  status: ScheduleStatusSchema.optional(),
  startDate: z.string().optional(), // ISO date
  endDate: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).default('asc'),
});

/**
 * 프로그램 일정 목록 응답
 */
export const GetSchedulesResponseSchema = z.object({
  data: z.array(ProgramScheduleSchema),
  pagination: z.object({
    total: z.number(),
    page: z.number(),
    limit: z.number(),
    totalPages: z.number(),
  }),
});

/**
 * 프로그램 일정 캘린더 조회 쿼리
 */
export const GetScheduleCalendarQuerySchema = z.object({
  year: z.coerce.number().int().min(2000).max(2100),
  month: z.coerce.number().int().min(1).max(12),
  programId: z.string().optional(),
});

/**
 * 프로그램 일정 캘린더 응답
 */
export const GetScheduleCalendarResponseSchema = z.array(
  z.object({
    date: z.string(), // ISO date
    schedules: z.array(ProgramScheduleSchema),
  }),
);

// Type exports
export type ScheduleStatus = z.infer<typeof ScheduleStatusSchema>;
export type ProgramSchedule = z.infer<typeof ProgramScheduleSchema>;
export type CreateScheduleRequest = z.infer<typeof CreateScheduleRequestSchema>;
export type UpdateScheduleRequest = z.infer<typeof UpdateScheduleRequestSchema>;
export type GetSchedulesQuery = z.infer<typeof GetSchedulesQuerySchema>;
export type GetSchedulesResponse = z.infer<typeof GetSchedulesResponseSchema>;
export type GetScheduleCalendarQuery = z.infer<typeof GetScheduleCalendarQuerySchema>;
export type GetScheduleCalendarResponse = z.infer<typeof GetScheduleCalendarResponseSchema>;
