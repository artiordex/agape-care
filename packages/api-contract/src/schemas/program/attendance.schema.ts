/**
 * @description Program Attendance 도메인 스키마
 * @date 2026-01-26
 */
import { z } from 'zod';

/**
 * 참석자 정보 기본 구조
 */
export const ProgramAttendanceSchema = z.object({
  id: z.string(),
  scheduleId: z.string(),
  residentId: z.string().nullable(),
  employeeId: z.string().nullable(),
  role: z.string().default('PARTICIPANT'),
  attended: z.boolean().default(false),
  checkedAt: z.string().nullable(),
  notes: z.string().nullable(),
  createdAt: z.string(),
});

/**
 * 참석자 생성 요청
 */
export const CreateAttendanceRequestSchema = z.object({
  residentId: z.string().optional(),
  employeeId: z.string().optional(),
  role: z.string().optional(),
  attended: z.boolean().optional(),
  notes: z.string().optional(),
});

/**
 * 참석자 수정 요청
 */
export const UpdateAttendanceRequestSchema = z.object({
  role: z.string().optional(),
  attended: z.boolean().optional(),
  notes: z.string().optional(),
});

/**
 * 출석 체크 요청
 */
export const CheckAttendanceRequestSchema = z.object({
  attended: z.boolean().default(true),
  notes: z.string().optional(),
});

/**
 * 참석자 목록 조회 Query
 */
export const GetAttendancesQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  scheduleId: z.string().optional(),
  residentId: z.string().optional(),
  employeeId: z.string().optional(),
  attended: z.boolean().optional(),
});

/**
 * 참석자 목록 Response
 */
export const GetAttendancesResponseSchema = z.object({
  items: z.array(ProgramAttendanceSchema),
  totalCount: z.number(),
  page: z.number(),
  limit: z.number(),
});

/* Types */
export type ProgramAttendance = z.infer<typeof ProgramAttendanceSchema>;
export type CreateAttendanceRequest = z.infer<typeof CreateAttendanceRequestSchema>;
export type UpdateAttendanceRequest = z.infer<typeof UpdateAttendanceRequestSchema>;
export type CheckAttendanceRequest = z.infer<typeof CheckAttendanceRequestSchema>;
export type GetAttendancesQuery = z.infer<typeof GetAttendancesQuerySchema>;
export type GetAttendancesResponse = z.infer<typeof GetAttendancesResponseSchema>;
