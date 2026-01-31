/**
 * @description Resident API Contract
 * @author Shiwoo Min
 * @date 2026-01-26
 */

import { z } from 'zod';
import {
  CreateContactRequestSchema,
  CreateHealthNoteRequestSchema,
  CreateMedicationRequestSchema,
  CreateResidentRequestSchema,
  GetContactsResponseSchema,
  GetHealthNotesQuerySchema,
  GetHealthNotesResponseSchema,
  GetMedicationsQuerySchema,
  GetMedicationsResponseSchema,
  GetResidentsQuerySchema,
  GetResidentsResponseSchema,
  ResidentContactSchema,
  ResidentHealthNoteSchema,
  ResidentMedicationSchema,
  ResidentSchema,
  ResidentStatsSchema,
  UpdateContactRequestSchema,
  UpdateHealthNoteRequestSchema,
  UpdateMedicationRequestSchema,
  UpdateResidentRequestSchema,
} from '../schemas/resident/index';

const authHeader = z.object({
  authorization: z.string().describe('Bearer {token}'),
});

const errorResponse = (statusCode: number) =>
  z.object({
    message: z.string(),
    error: z.string().optional(),
    statusCode: z.literal(statusCode),
  });

export const residentContract = {
  /**
   * GET /api/residents
   * 입소자 목록 조회
   */
  getResidents: {
    method: 'GET' as const,
    path: '/api/residents',
    query: GetResidentsQuerySchema,
    responses: {
      200: GetResidentsResponseSchema,
    },
    summary: '입소자 목록 조회',
    description: '입소자 목록을 페이징하여 조회합니다.',
    headers: authHeader,
  },

  /**
   * GET /api/residents/:id
   * 입소자 상세 조회
   */
  getResident: {
    method: 'GET' as const,
    path: '/api/residents/:id',
    pathParams: z.object({
      id: z.string(),
    }),
    responses: {
      200: ResidentSchema,
      404: errorResponse(404),
    },
    summary: '입소자 상세 조회',
    description: '특정 입소자의 상세 정보를 조회합니다.',
    headers: authHeader,
  },

  /**
   * POST /api/residents
   * 입소자 생성
   */
  createResident: {
    method: 'POST' as const,
    path: '/api/residents',
    body: CreateResidentRequestSchema,
    responses: {
      201: ResidentSchema,
      400: errorResponse(400),
      409: errorResponse(409),
    },
    summary: '입소자 생성',
    description: '새로운 입소자를 등록합니다.',
    headers: authHeader,
  },

  /**
   * PATCH /api/residents/:id
   * 입소자 수정
   */
  updateResident: {
    method: 'PATCH' as const,
    path: '/api/residents/:id',
    pathParams: z.object({
      id: z.string(),
    }),
    body: UpdateResidentRequestSchema,
    responses: {
      200: ResidentSchema,
      404: errorResponse(404),
      400: errorResponse(400),
    },
    summary: '입소자 수정',
    description: '입소자 정보를 수정합니다.',
    headers: authHeader,
  },

  /**
   * DELETE /api/residents/:id
   * 입소자 삭제
   */
  deleteResident: {
    method: 'DELETE' as const,
    path: '/api/residents/:id',
    pathParams: z.object({
      id: z.string(),
    }),
    responses: {
      200: z.object({
        message: z.string(),
      }),
      404: errorResponse(404),
    },
    summary: '입소자 삭제',
    description: '입소자를 삭제합니다.',
    headers: authHeader,
  },

  getResidentStats: {
    method: 'GET' as const,
    path: '/api/residents/stats',
    responses: {
      200: ResidentStatsSchema,
    },
    summary: '입소자 통계',
    description: '입소자 통계 정보를 조회합니다.',
    headers: authHeader,
  },

  /**
   * GET /api/residents/:residentId/contacts
   * 입소자 연락처 목록 조회
   */
  getContacts: {
    method: 'GET' as const,
    path: '/api/residents/:residentId/contacts',
    pathParams: z.object({
      residentId: z.string(),
    }),
    responses: {
      200: GetContactsResponseSchema,
      404: errorResponse(404),
    },
    summary: '입소자 연락처 목록 조회',
    description: '특정 입소자의 연락처 목록을 조회합니다.',
    headers: authHeader,
  },

  /**
   * POST /api/residents/:residentId/contacts
   * 입소자 연락처 등록
   */
  createContact: {
    method: 'POST' as const,
    path: '/api/residents/:residentId/contacts',
    pathParams: z.object({
      residentId: z.string(),
    }),
    body: CreateContactRequestSchema,
    responses: {
      201: ResidentContactSchema,
      404: errorResponse(404),
      400: errorResponse(400),
    },
    summary: '입소자 연락처 등록',
    description: '특정 입소자의 연락처를 등록합니다.',
    headers: authHeader,
  },

  /**
   * PATCH /api/residents/contacts/:contactId
   * 입소자 연락처 수정
   */
  updateContact: {
    method: 'PATCH' as const,
    path: '/api/residents/contacts/:contactId',
    pathParams: z.object({
      contactId: z.string(),
    }),
    body: UpdateContactRequestSchema,
    responses: {
      200: ResidentContactSchema,
      404: errorResponse(404),
      400: errorResponse(400),
    },
    summary: '입소자 연락처 수정',
    description: '입소자의 연락처 정보를 수정합니다.',
    headers: authHeader,
  },

  /**
   * DELETE /api/residents/contacts/:contactId
   * 입소자 연락처 삭제
   */
  deleteContact: {
    method: 'DELETE' as const,
    path: '/api/residents/contacts/:contactId',
    pathParams: z.object({
      contactId: z.string(),
    }),
    responses: {
      200: z.object({
        message: z.string(),
      }),
      404: errorResponse(404),
    },
    summary: '입소자 연락처 삭제',
    description: '입소자의 연락처를 삭제합니다.',
    headers: authHeader,
  },

  /**
   * GET /api/residents/:residentId/health-notes
   * 건강 노트 목록 조회
   */
  getHealthNotes: {
    method: 'GET' as const,
    path: '/api/residents/:residentId/health-notes',
    pathParams: z.object({
      residentId: z.string(),
    }),
    query: GetHealthNotesQuerySchema,
    responses: {
      200: GetHealthNotesResponseSchema,
      404: errorResponse(404),
    },
    summary: '건강 노트 목록 조회',
    description: '특정 입소자의 건강 노트 목록을 조회합니다.',
    headers: authHeader,
  },

  /**
   * POST /api/residents/:residentId/health-notes
   * 건강 노트 생성
   */
  createHealthNote: {
    method: 'POST' as const,
    path: '/api/residents/:residentId/health-notes',
    pathParams: z.object({
      residentId: z.string(),
    }),
    body: CreateHealthNoteRequestSchema,
    responses: {
      201: ResidentHealthNoteSchema,
      404: errorResponse(404),
      400: errorResponse(400),
    },
    summary: '건강 노트 생성',
    description: '특정 입소자의 건강 노트를 생성합니다.',
    headers: authHeader,
  },

  /**
   * PATCH /api/residents/health-notes/:noteId
   * 건강 노트 수정
   */
  updateHealthNote: {
    method: 'PATCH' as const,
    path: '/api/residents/health-notes/:noteId',
    pathParams: z.object({
      noteId: z.string(),
    }),
    body: UpdateHealthNoteRequestSchema,
    responses: {
      200: ResidentHealthNoteSchema,
      404: errorResponse(404),
      400: errorResponse(400),
    },
    summary: '건강 노트 수정',
    description: '건강 노트 정보를 수정합니다.',
    headers: authHeader,
  },

  /**
   * DELETE /api/residents/health-notes/:noteId
   * 건강 노트 삭제
   */
  deleteHealthNote: {
    method: 'DELETE' as const,
    path: '/api/residents/health-notes/:noteId',
    pathParams: z.object({
      noteId: z.string(),
    }),
    responses: {
      200: z.object({
        message: z.string(),
      }),
      404: errorResponse(404),
    },
    summary: '건강 노트 삭제',
    description: '건강 노트를 삭제합니다.',
    headers: authHeader,
  },

  /**
   * GET /api/residents/:residentId/medications
   * 투약 정보 목록 조회
   */
  getMedications: {
    method: 'GET' as const,
    path: '/api/residents/:residentId/medications',
    pathParams: z.object({
      residentId: z.string(),
    }),
    query: GetMedicationsQuerySchema,
    responses: {
      200: GetMedicationsResponseSchema,
      404: errorResponse(404),
    },
    summary: '투약 정보 목록 조회',
    description: '특정 입소자의 투약 정보 목록을 조회합니다.',
    headers: authHeader,
  },

  /**
   * POST /api/residents/:residentId/medications
   * 투약 정보 생성
   */
  createMedication: {
    method: 'POST' as const,
    path: '/api/residents/:residentId/medications',
    pathParams: z.object({
      residentId: z.string(),
    }),
    body: CreateMedicationRequestSchema,
    responses: {
      201: ResidentMedicationSchema,
      404: errorResponse(404),
      400: errorResponse(400),
    },
    summary: '투약 정보 생성',
    description: '특정 입소자의 투약 정보를 생성합니다.',
    headers: authHeader,
  },

  /**
   * PATCH /api/residents/medications/:medicationId
   * 투약 정보 수정
   */
  updateMedication: {
    method: 'PATCH' as const,
    path: '/api/residents/medications/:medicationId',
    pathParams: z.object({
      medicationId: z.string(),
    }),
    body: UpdateMedicationRequestSchema,
    responses: {
      200: ResidentMedicationSchema,
      404: errorResponse(404),
      400: errorResponse(400),
    },
    summary: '투약 정보 수정',
    description: '투약 정보를 수정합니다.',
    headers: authHeader,
  },

  /**
   * DELETE /api/residents/medications/:medicationId
   * 투약 정보 삭제
   */
  deleteMedication: {
    method: 'DELETE' as const,
    path: '/api/residents/medications/:medicationId',
    pathParams: z.object({
      medicationId: z.string(),
    }),
    responses: {
      200: z.object({
        message: z.string(),
      }),
      404: errorResponse(404),
    },
    summary: '투약 정보 삭제',
    description: '투약 정보를 삭제합니다.',
    headers: authHeader,
  },
} as const;

export type ResidentContract = typeof residentContract;
