/**
 * @description Program Schedule 도메인 스키마
 * @author Shiwoo
 * @date 2026-01-26
 */
import { z } from 'zod';

import { ProgramSchema } from './program.schema.js';

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
  capacity: z.number().nullable().optional(),
  status: z.enum(['예정', '진행중', '완료', '취소']).nullable().optional(),
  notes: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
  program: ProgramSchema.optional(),
});

/**
 * 일정 생성 요청
 */
export const CreateScheduleRequestSchema = z.object({
  startTime: z.string(),
  endTime: z.string().optional(),
  facilitatorId: z.string().optional(),
  location: z.string().optional(),
  capacity: z.number().optional(),
  status: z.enum(['예정', '진행중', '완료', '취소']).optional(),
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
  capacity: z.number().optional(),
  status: z.enum(['예정', '진행중', '완료', '취소']).optional(),
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

/**
 * 프로그램 일정 상세 조회 (캘린더용 - Program + Schedule 결합)
 */
export const EnrichedScheduleSchema = z.object({
  id: z.string(),
  title: z.string(),
  category: z.string(),
  date: z.string(), // YYYY-MM-DD
  time: z.string(), // HH:MM
  duration: z.number(),
  instructor: z.string(),
  location: z.string(),
  participants: z.number(),
  maxParticipants: z.number(),
  recipientIds: z.array(z.string()).optional(),
  description: z.string(),
  status: z.enum(['예정', '진행중', '완료', '취소']),
  color: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  programId: z.string(),
  scheduleId: z.string(),
});

/**
 * 상세 일정 목록 조회 Query
 */
export const GetSchedulesEnrichedQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(100),
  startDate: z.string().optional(), // YYYY-MM-DD
  endDate: z.string().optional(),
  category: z.string().optional(),
  status: z.string().optional(),
});

/**
 * 상세 일정 목록 조회 Response
 */
export const GetSchedulesEnrichedResponseSchema = z.object({
  items: z.array(EnrichedScheduleSchema),
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
export type EnrichedSchedule = z.infer<typeof EnrichedScheduleSchema>;
export type GetSchedulesEnrichedQuery = z.infer<typeof GetSchedulesEnrichedQuerySchema>;
export type GetSchedulesEnrichedResponse = z.infer<typeof GetSchedulesEnrichedResponseSchema>;
