/**
 * @description 간호 및 요양 서비스 관리 API Contract
 * @author Shiwoo Min
 * @date 2026-01-27
 */
import { z } from 'zod';
import { CarePlanSchema, CareTaskSchema, ConsultationRecordSchema, IncidentSchema } from '../schemas/care/index';
import { ApiResponseSchema } from '../schemas/common/response.schema';

/**
 * [케어플랜] GET /care/plans
 * 입소자별 수립된 케어 플랜 목록 조회
 */

export const careContract = {
  /**
   * [케어플랜] GET /care/plans
   * 입소자별 수립된 케어 플랜 목록 조회
   */
  getCarePlans: {
    method: 'GET' as const,
    path: '/care/plans',
    query: z.object({
      residentId: z.string().optional(),
      status: z.enum(['ACTIVE', 'COMPLETED', 'CANCELLED']).optional(),
    }),
    responses: {
      200: ApiResponseSchema(z.array(CarePlanSchema)),
    },
  },

  /**
   * [케어플랜] POST /care/plans
   * 신규 케어 플랜 및 목표 수립
   */
  createCarePlan: {
    method: 'POST' as const,
    path: '/care/plans',
    body: CarePlanSchema.omit({ id: true, createdAt: true, updatedAt: true }),
    responses: {
      201: ApiResponseSchema(CarePlanSchema),
    },
  },

  /**
   * [상담] POST /care/consultations
   * 입소자 또는 보호자 상담 기록 등록
   */
  createConsultation: {
    method: 'POST' as const,
    path: '/care/consultations',
    body: ConsultationRecordSchema.omit({ id: true, createdAt: true }),
    responses: {
      201: ApiResponseSchema(ConsultationRecordSchema),
    },
  },

  /**
   * [사고보고] GET /care/incidents
   * 시설 내 발생한 사건/사고 목록 조회
   */
  getIncidents: {
    method: 'GET' as const,
    path: '/care/incidents',
    query: z.object({
      severity: z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']).optional(),
      status: z.enum(['OPEN', 'IN_REVIEW', 'CLOSED']).optional(),
    }),
    responses: {
      200: ApiResponseSchema(z.array(IncidentSchema)),
    },
  },

  /**
   * [사고보고] PATCH /care/incidents/:id/status
   * 사고 처리 상태 변경 및 후속 조치 기록
   */
  updateIncidentStatus: {
    method: 'PATCH' as const,
    path: '/care/incidents/:id/status',
    body: z.object({
      status: z.enum(['IN_REVIEW', 'CLOSED']),
      actionTaken: z.string().optional(),
    }),
    responses: {
      200: ApiResponseSchema(IncidentSchema),
    },
  },

  /**
   * [업무태스크] GET /care/tasks
   * 요양보호사에게 할당된 케어 업무 목록 조회
   */
  getCareTasks: {
    method: 'GET' as const,
    path: '/care/tasks',
    query: z.object({
      assignedTo: z.string().optional(),
      status: z.enum(['PENDING', 'IN_PROGRESS', 'DONE', 'CANCELLED']).optional(),
    }),
    responses: {
      200: ApiResponseSchema(z.array(CareTaskSchema)),
    },
  },

  /**
   * [업무태스크] PATCH /care/tasks/:id/status
   * 케어 업무 수행 상태 업데이트
   */
  updateCareTaskStatus: {
    method: 'PATCH' as const,
    path: '/care/tasks/:id/status',
    body: z.object({
      status: z.enum(['IN_PROGRESS', 'DONE', 'CANCELLED']),
    }),
    responses: {
      200: ApiResponseSchema(CareTaskSchema),
    },
  },
} as const;

// Contract 타입 추출
export type CareContract = typeof careContract;
