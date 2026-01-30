/**
 * @description Program API Contract
 * @author Shiwoo Min
 * @date 2026-01-26
 */

import { z } from 'zod';
import {
  CreateProgramRequestSchema,
  UpdateProgramRequestSchema,
  GetProgramsQuerySchema,
  GetProgramsResponseSchema,
  ProgramSchema,
  CreateScheduleRequestSchema,
  UpdateScheduleRequestSchema,
  GetSchedulesQuerySchema,
  GetSchedulesResponseSchema,
  CreateAttendanceRequestSchema,
  UpdateAttendanceRequestSchema,
  CheckAttendanceRequestSchema,
} from '../schemas/program/index';

const authHeader = z.object({
  authorization: z.string().describe('Bearer {token}'),
});

const errorResponse = (statusCode: number) =>
  z.object({
    message: z.string(),
    error: z.string().optional(),
    statusCode: z.literal(statusCode),
  });

export const programContract = {
  // ==================== Program ====================
  /**
   * GET /api/programs
   * 프로그램 목록 조회
   */
  getPrograms: {
    method: 'GET' as const,
    path: '/api/programs',
    query: GetProgramsQuerySchema,
    responses: {
      200: GetProgramsResponseSchema,
    },
    summary: '프로그램 목록 조회',
    headers: authHeader,
  },

  /**
   * GET /api/programs/:id
   * 프로그램 상세 조회
   */
  getProgram: {
    method: 'GET' as const,
    path: '/api/programs/:id',
    pathParams: z.object({
      id: z.string(),
    }),
    responses: {
      200: ProgramSchema,
      404: errorResponse(404),
    },
    summary: '프로그램 상세 조회',
    headers: authHeader,
  },

  /**
   * POST /api/programs
   * 프로그램 생성
   */
  createProgram: {
    method: 'POST' as const,
    path: '/api/programs',
    body: CreateProgramRequestSchema,
    responses: {
      201: ProgramSchema,
      400: errorResponse(400),
    },
    summary: '프로그램 생성',
    headers: authHeader,
  },

  /**
   * PATCH /api/programs/:id
   * 프로그램 수정
   */
  updateProgram: {
    method: 'PATCH' as const,
    path: '/api/programs/:id',
    pathParams: z.object({
      id: z.string(),
    }),
    body: UpdateProgramRequestSchema,
    responses: {
      200: ProgramSchema,
      404: errorResponse(404),
    },
    summary: '프로그램 수정',
    headers: authHeader,
  },

  /**
   * DELETE /api/programs/:id
   * 프로그램 삭제
   */
  deleteProgram: {
    method: 'DELETE' as const,
    path: '/api/programs/:id',
    pathParams: z.object({
      id: z.string(),
    }),
    responses: {
      200: z.object({
        message: z.string(),
      }),
      404: errorResponse(404),
    },
    summary: '프로그램 삭제',
    headers: authHeader,
  },

  // ==================== Schedule ====================
  /**
   * GET /api/programs/schedules
   * 프로그램 일정 목록 조회
   */
  getSchedules: {
    method: 'GET' as const,
    path: '/api/programs/schedules',
    query: GetSchedulesQuerySchema,
    responses: {
      200: GetSchedulesResponseSchema,
    },
    summary: '프로그램 일정 목록 조회',
    headers: authHeader,
  },

  /**
   * POST /api/programs/:programId/schedules
   * 프로그램 일정 생성
   */
  createSchedule: {
    method: 'POST' as const,
    path: '/api/programs/:programId/schedules',
    pathParams: z.object({
      programId: z.string(),
    }),
    body: CreateScheduleRequestSchema,
    responses: {
      201: z.any(), // ProgramScheduleSchema
      400: errorResponse(400),
    },
    summary: '프로그램 일정 생성',
    headers: authHeader,
  },

  /**
   * PATCH /api/programs/schedules/:id
   * 프로그램 일정 수정
   */
  updateSchedule: {
    method: 'PATCH' as const,
    path: '/api/programs/schedules/:id',
    pathParams: z.object({
      id: z.string(),
    }),
    body: UpdateScheduleRequestSchema,
    responses: {
      200: z.any(), // ProgramScheduleSchema
      404: errorResponse(404),
    },
    summary: '프로그램 일정 수정',
    headers: authHeader,
  },

  /**
   * DELETE /api/programs/schedules/:id
   * 프로그램 일정 삭제
   */
  deleteSchedule: {
    method: 'DELETE' as const,
    path: '/api/programs/schedules/:id',
    pathParams: z.object({
      id: z.string(),
    }),
    responses: {
      200: z.object({
        message: z.string(),
      }),
      404: errorResponse(404),
    },
    summary: '프로그램 일정 삭제',
    headers: authHeader,
  },

  // ==================== Attendance ====================
  /**
   * POST /api/programs/schedules/:scheduleId/attendances
   * 참석자 등록
   */
  createAttendance: {
    method: 'POST' as const,
    path: '/api/programs/schedules/:scheduleId/attendances',
    pathParams: z.object({
      scheduleId: z.string(),
    }),
    body: CreateAttendanceRequestSchema,
    responses: {
      201: z.any(), // ProgramAttendanceSchema
      400: errorResponse(400),
    },
    summary: '참석자 등록',
    headers: authHeader,
  },

  /**
   * PATCH /api/programs/attendances/:id
   * 참석 정보 수정
   */
  updateAttendance: {
    method: 'PATCH' as const,
    path: '/api/programs/attendances/:id',
    pathParams: z.object({
      id: z.string(),
    }),
    body: UpdateAttendanceRequestSchema,
    responses: {
      200: z.any(), // ProgramAttendanceSchema
      404: errorResponse(404),
    },
    summary: '참석 정보 수정',
    headers: authHeader,
  },

  /**
   * POST /api/programs/attendances/:id/check
   * 출석 체크
   */
  checkAttendance: {
    method: 'POST' as const,
    path: '/api/programs/attendances/:id/check',
    pathParams: z.object({
      id: z.string(),
    }),
    body: CheckAttendanceRequestSchema,
    responses: {
      200: z.any(), // ProgramAttendanceSchema
      404: errorResponse(404),
    },
    summary: '출석 체크',
    headers: authHeader,
  },

  /**
   * DELETE /api/programs/attendances/:id
   * 참석자 삭제
   */
  deleteAttendance: {
    method: 'DELETE' as const,
    path: '/api/programs/attendances/:id',
    pathParams: z.object({
      id: z.string(),
    }),
    responses: {
      200: z.object({
        message: z.string(),
      }),
      404: errorResponse(404),
    },
    summary: '참석자 삭제',
    headers: authHeader,
  },
} as const;

export type ProgramContract = typeof programContract;
