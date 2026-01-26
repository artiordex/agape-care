/**
 * @description 프로그램 참석 스키마
 * @author Shiwoo Min
 * @date 2026-01-26
 */

import { z } from 'zod';

/**
 * 참석 역할
 */
export const AttendanceRoleSchema = z.enum(['PARTICIPANT', 'HELPER']);

/**
 * 프로그램 참석 정보
 */
export const ProgramAttendanceSchema = z.object({
  id: z.string(),
  scheduleId: z.string(),
  residentId: z.string().nullable(),
  residentName: z.string().nullable().optional(), // 조인
  employeeId: z.string().nullable(),
  employeeName: z.string().nullable().optional(), // 조인
  role: AttendanceRoleSchema,
  attended: z.boolean(),
  checkedAt: z.string().nullable(), // ISO datetime
  notes: z.string().nullable(),
  createdAt: z.string(),
});

/**
 * 참석 등록 요청
 */
export const CreateAttendanceRequestSchema = z
  .object({
    residentId: z.string().optional(),
    employeeId: z.string().optional(),
    role: AttendanceRoleSchema.default('PARTICIPANT'),
    attended: z.boolean().default(false),
    checkedAt: z.string().optional(),
    notes: z.string().optional(),
  })
  .refine(data => data.residentId || data.employeeId, {
    message: '입소자 또는 직원 중 하나는 필수입니다',
  });

/**
 * 참석 수정 요청
 */
export const UpdateAttendanceRequestSchema = z.object({
  role: AttendanceRoleSchema.optional(),
  attended: z.boolean().optional(),
  checkedAt: z.string().nullable().optional(),
  notes: z.string().nullable().optional(),
});

/**
 * 참석 체크 요청 (출석 체크)
 */
export const CheckAttendanceRequestSchema = z.object({
  attended: z.boolean(),
  checkedAt: z.string().optional(), // 기본값: 현재 시각
  notes: z.string().optional(),
});

/**
 * 참석자 목록 조회 쿼리
 */
export const GetAttendancesQuerySchema = z.object({
  scheduleId: z.string(),
  role: AttendanceRoleSchema.optional(),
});

/**
 * 참석자 목록 응답
 */
export const GetAttendancesResponseSchema = z.array(ProgramAttendanceSchema);

/**
 * 참석 통계
 */
export const AttendanceStatsSchema = z.object({
  totalParticipants: z.number(),
  attended: z.number(),
  absent: z.number(),
  attendanceRate: z.number(), // 출석률 (%)
});

// Type exports
export type AttendanceRole = z.infer<typeof AttendanceRoleSchema>;
export type ProgramAttendance = z.infer<typeof ProgramAttendanceSchema>;
export type CreateAttendanceRequest = z.infer<typeof CreateAttendanceRequestSchema>;
export type UpdateAttendanceRequest = z.infer<typeof UpdateAttendanceRequestSchema>;
export type CheckAttendanceRequest = z.infer<typeof CheckAttendanceRequestSchema>;
export type GetAttendancesQuery = z.infer<typeof GetAttendancesQuerySchema>;
export type GetAttendancesResponse = z.infer<typeof GetAttendancesResponseSchema>;
export type AttendanceStats = z.infer<typeof AttendanceStatsSchema>;
