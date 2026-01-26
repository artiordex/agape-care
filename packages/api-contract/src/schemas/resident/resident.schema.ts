/**
 * @description 입소자 기본 정보 스키마
 * @author Shiwoo Min
 * @date 2026-01-26
 */

import { z } from 'zod';

/**
 * 입소자 상태
 */
export const ResidentStatusSchema = z.enum(['ADMITTED', 'ON_LEAVE', 'DISCHARGED', 'PENDING']);

/**
 * 성별
 */
export const GenderSchema = z.enum(['M', 'F', 'OTHER']);

/**
 * 입소자 기본 정보
 */
export const ResidentSchema = z.object({
  id: z.string(),
  code: z.string(),
  name: z.string(),
  birthday: z.string().nullable(), // ISO date string
  gender: GenderSchema.nullable(),
  nationalIdHash: z.string().nullable(),
  admissionDate: z.string().nullable(), // ISO date string
  dischargeDate: z.string().nullable(),
  status: ResidentStatusSchema,
  guardianName: z.string().nullable(),
  guardianPhone: z.string().nullable(),
  memo: z.string().nullable(),
  meta: z.record(z.unknown()).optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

/**
 * 입소자 생성 요청
 */
export const CreateResidentRequestSchema = z.object({
  code: z.string().min(1, '관리번호는 필수입니다'),
  name: z.string().min(1, '이름은 필수입니다'),
  birthday: z.string().optional(),
  gender: GenderSchema.optional(),
  admissionDate: z.string().optional(),
  guardianName: z.string().optional(),
  guardianPhone: z.string().optional(),
  memo: z.string().optional(),
});

/**
 * 입소자 수정 요청
 */
export const UpdateResidentRequestSchema = z.object({
  name: z.string().min(1).optional(),
  birthday: z.string().optional(),
  gender: GenderSchema.optional(),
  admissionDate: z.string().optional(),
  dischargeDate: z.string().optional(),
  status: ResidentStatusSchema.optional(),
  guardianName: z.string().optional(),
  guardianPhone: z.string().optional(),
  memo: z.string().optional(),
});

/**
 * 입소자 목록 조회 쿼리
 */
export const GetResidentsQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
  status: ResidentStatusSchema.optional(),
  search: z.string().optional(), // 이름, 코드 검색
  sort: z.enum(['name', 'code', 'admissionDate', 'createdAt']).default('createdAt'),
  order: z.enum(['asc', 'desc']).default('desc'),
});

/**
 * 입소자 목록 응답
 */
export const GetResidentsResponseSchema = z.object({
  data: z.array(ResidentSchema),
  total: z.number(),
  page: z.number(),
  limit: z.number(),
  totalPages: z.number(),
});

/**
 * 입소자 상세 응답
 */
export const GetResidentResponseSchema = ResidentSchema;

/**
 * 입소자 통계
 */
export const ResidentStatsSchema = z.object({
  total: z.number(),
  admitted: z.number(),
  onLeave: z.number(),
  discharged: z.number(),
  pending: z.number(),
  byGender: z.object({
    male: z.number(),
    female: z.number(),
    other: z.number(),
  }),
  averageAge: z.number().nullable(),
});

// Type exports
export type ResidentStatus = z.infer<typeof ResidentStatusSchema>;
export type Gender = z.infer<typeof GenderSchema>;
export type Resident = z.infer<typeof ResidentSchema>;
export type CreateResidentRequest = z.infer<typeof CreateResidentRequestSchema>;
export type UpdateResidentRequest = z.infer<typeof UpdateResidentRequestSchema>;
export type GetResidentsQuery = z.infer<typeof GetResidentsQuerySchema>;
export type GetResidentsResponse = z.infer<typeof GetResidentsResponseSchema>;
export type GetResidentResponse = z.infer<typeof GetResidentResponseSchema>;
export type ResidentStats = z.infer<typeof ResidentStatsSchema>;
