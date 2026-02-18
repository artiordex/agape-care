/**
 * @description 수신자 그룹 스키마
 * @author Shiwoo Min
 * @date 2026-01-30
 */

import { z } from 'zod';

export const RecipientGroupTypeSchema = z.enum(['RESIDENT', 'GUARDIAN', 'STAFF', 'MIXED']);
export const RecipientGroupStatusSchema = z.enum(['ACTIVE', 'INACTIVE']);

export const RecipientGroupSchema = z.object({
  id: z.coerce.number().describe('그룹 ID'),
  name: z.string().min(1, '그룹명은 필수입니다').describe('수신자 그룹 이름'),
  type: RecipientGroupTypeSchema.describe('그룹 타입 (STAFF, GUARDIAN 등)'),
  description: z.string().optional().describe('그룹 상세 설명'),
  memberCount: z.number().default(0).describe('그룹에 포함된 인원 수'),
  status: RecipientGroupStatusSchema.default('ACTIVE').describe('그룹 상태 (ACTIVE, INACTIVE)'),
  usageCount: z.number().default(0).describe('해당 그룹 사용 횟수'),
  lastUsedAt: z.string().nullable().optional().describe('마지막 사용 일시'),
  createdBy: z.string().optional().describe('생성자 ID'),
  createdAt: z.string().optional().describe('생성 일시'),
});

export const CreateRecipientGroupRequestSchema = RecipientGroupSchema.omit({
  id: true,
  memberCount: true,
  usageCount: true,
  lastUsedAt: true,
  createdBy: true,
  createdAt: true,
});

export const UpdateRecipientGroupRequestSchema = RecipientGroupSchema.partial().omit({
  memberCount: true,
  usageCount: true,
  lastUsedAt: true,
  createdBy: true,
  createdAt: true,
});

export const RecipientGroupListQuerySchema = z.object({
  page: z.coerce.number().optional().default(1).describe('페이지 번호'),
  limit: z.coerce.number().optional().default(10).describe('페이지당 항목 수'),
  type: RecipientGroupTypeSchema.optional().describe('그룹 타입 필터'),
  status: RecipientGroupStatusSchema.optional().describe('상태 필터'),
  search: z.string().optional().describe('검색어 (그룹명)'),
});

export const RecipientGroupListResponseSchema = z.object({
  data: z.array(RecipientGroupSchema),
  pagination: z.object({
    total: z.number(),
    page: z.number(),
    limit: z.number(),
    totalPages: z.number(),
  }),
});

export type RecipientGroupType = z.infer<typeof RecipientGroupTypeSchema>;
export type RecipientGroupStatus = z.infer<typeof RecipientGroupStatusSchema>;
export type RecipientGroup = z.infer<typeof RecipientGroupSchema>;
export type CreateRecipientGroupRequest = z.infer<typeof CreateRecipientGroupRequestSchema>;
export type UpdateRecipientGroupRequest = z.infer<typeof UpdateRecipientGroupRequestSchema>;
export type RecipientGroupListQuery = z.infer<typeof RecipientGroupListQuerySchema>;
export type RecipientGroupListResponse = z.infer<typeof RecipientGroupListResponseSchema>;
