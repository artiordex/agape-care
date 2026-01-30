/**
 * @description Employee API Contract
 * @author Shiwoo Min
 * @date 2026-01-26
 */

import { z } from 'zod';
import {
  CreateEmployeeRequestSchema,
  UpdateEmployeeRequestSchema,
  GetEmployeesQuerySchema,
  GetEmployeesResponseSchema,
  EmployeeSchema,
  EmployeeStatsSchema,
  ChangeEmployeePasswordRequestSchema,
} from '../schemas/employee/index';

const authHeader = z.object({
  authorization: z.string().describe('Bearer {token}'),
});

const errorResponse = (statusCode: number) =>
  z.object({
    message: z.string(),
    error: z.string().optional(),
    statusCode: z.literal(statusCode),
  });

export const employeeContract = {
  /**
   * GET /api/employees
   * 직원 목록 조회
   */
  getEmployees: {
    method: 'GET' as const,
    path: '/api/employees',
    query: GetEmployeesQuerySchema,
    responses: {
      200: GetEmployeesResponseSchema,
    },
    summary: '직원 목록 조회',
    headers: authHeader,
  },

  /**
   * GET /api/employees/:id
   * 직원 상세 조회
   */
  getEmployee: {
    method: 'GET' as const,
    path: '/api/employees/:id',
    pathParams: z.object({
      id: z.string(),
    }),
    responses: {
      200: EmployeeSchema,
      404: errorResponse(404),
    },
    summary: '직원 상세 조회',
    headers: authHeader,
  },

  /**
   * POST /api/employees
   * 직원 생성
   */
  createEmployee: {
    method: 'POST' as const,
    path: '/api/employees',
    body: CreateEmployeeRequestSchema,
    responses: {
      201: EmployeeSchema,
      400: errorResponse(400),
      409: errorResponse(409),
    },
    summary: '직원 생성',
    headers: authHeader,
  },

  /**
   * PATCH /api/employees/:id
   * 직원 수정
   */
  updateEmployee: {
    method: 'PATCH' as const,
    path: '/api/employees/:id',
    pathParams: z.object({
      id: z.string(),
    }),
    body: UpdateEmployeeRequestSchema,
    responses: {
      200: EmployeeSchema,
      404: errorResponse(404),
      400: errorResponse(400),
    },
    summary: '직원 수정',
    headers: authHeader,
  },

  /**
   * DELETE /api/employees/:id
   * 직원 삭제
   */
  deleteEmployee: {
    method: 'DELETE' as const,
    path: '/api/employees/:id',
    pathParams: z.object({
      id: z.string(),
    }),
    responses: {
      200: z.object({
        message: z.string(),
      }),
      404: errorResponse(404),
    },
    summary: '직원 삭제',
    headers: authHeader,
  },

  /**
   * POST /api/employees/:id/change-password
   * 직원 비밀번호 변경 (관리자)
   */
  changeEmployeePassword: {
    method: 'POST' as const,
    path: '/api/employees/:id/change-password',
    pathParams: z.object({
      id: z.string(),
    }),
    body: ChangeEmployeePasswordRequestSchema,
    responses: {
      200: z.object({
        message: z.string(),
      }),
      404: errorResponse(404),
      400: errorResponse(400),
    },
    summary: '직원 비밀번호 변경',
    headers: authHeader,
  },

  /**
   * GET /api/employees/stats
   * 직원 통계
   */
  getEmployeeStats: {
    method: 'GET' as const,
    path: '/api/employees/stats',
    responses: {
      200: EmployeeStatsSchema,
    },
    summary: '직원 통계',
    headers: authHeader,
  },
} as const;

export type EmployeeContract = typeof employeeContract;
