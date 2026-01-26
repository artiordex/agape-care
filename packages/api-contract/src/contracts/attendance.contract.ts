/**
 * @description 출결 및 근태 관리 API Contract
 * @author Shiwoo Min
 * @date 2026-01-27
 */
import { z } from 'zod';
import {
  AttendanceRecordSchema,
  ShiftAssignmentSchema,
  LeaveRequestSchema,
  LeaveApprovalSchema,
  ShiftTemplateSchema,
} from '../schemas/attendance/index.js';
import { ApiResponseSchema } from '../schemas/common/response.schema.js';

/**
 * [출결] POST /attendance/check-in
 * 오늘 일자의 출근 기록 생성
 */
export const checkInContract = {
  method: 'POST' as const,
  path: '/attendance/check-in',
  body: z.object({
    employeeId: z.string(),
    workDate: z.string(), // YYYY-MM-DD
    notes: z.string().optional(),
  }),
  responses: {
    201: ApiResponseSchema(AttendanceRecordSchema),
  },
};

/**
 * [출결] POST /attendance/check-out
 * 퇴근 시간 기록 업데이트
 */
export const checkOutContract = {
  method: 'POST' as const,
  path: '/attendance/check-out',
  body: z.object({
    employeeId: z.string(),
    workDate: z.string(),
  }),
  responses: {
    200: ApiResponseSchema(AttendanceRecordSchema),
  },
};

/**
 * [근무표] GET /attendance/shifts
 * 특정 직원의 기간별 근무 배정 목록 조회 (캘린더용)
 */
export const getShiftAssignmentsContract = {
  method: 'GET' as const,
  path: '/attendance/shifts',
  query: z.object({
    employeeId: z.string().optional(),
    startDate: z.string(),
    endDate: z.string(),
  }),
  responses: {
    200: ApiResponseSchema(z.array(ShiftAssignmentSchema)),
  },
};

/**
 * [휴가] POST /attendance/leaves
 * 신규 휴가 신청서 제출
 */
export const createLeaveRequestContract = {
  method: 'POST' as const,
  path: '/attendance/leaves',
  body: LeaveRequestSchema.omit({
    id: true,
    status: true,
    requestedAt: true,
    createdAt: true,
    updatedAt: true,
  }),
  responses: {
    201: ApiResponseSchema(LeaveRequestSchema),
  },
};

/**
 * [휴가] PATCH /attendance/leaves/:id/approve
 * 관리자의 휴가 승인 또는 반려 처리
 */
export const approveLeaveRequestContract = {
  method: 'PATCH' as const,
  path: '/attendance/leaves/:id/approve',
  body: z.object({
    approvedBy: z.string(),
    decision: z.enum(['APPROVED', 'REJECTED']),
    comment: z.string().optional(),
  }),
  responses: {
    200: ApiResponseSchema(LeaveApprovalSchema),
  },
};

/**
 * [템플릿] GET /attendance/shift-templates
 * 설정된 근무 패턴(DAY, NIGHT 등) 목록 조회
 */
export const getShiftTemplatesContract = {
  method: 'GET' as const,
  path: '/attendance/shift-templates',
  responses: {
    200: ApiResponseSchema(z.array(ShiftTemplateSchema)),
  },
};

// Contract 타입 추출
export type CheckInContract = typeof checkInContract;
export type CheckOutContract = typeof checkOutContract;
export type GetShiftAssignmentsContract = typeof getShiftAssignmentsContract;
export type CreateLeaveRequestContract = typeof createLeaveRequestContract;
export type ApproveLeaveRequestContract = typeof approveLeaveRequestContract;
export type GetShiftTemplatesContract = typeof getShiftTemplatesContract;
