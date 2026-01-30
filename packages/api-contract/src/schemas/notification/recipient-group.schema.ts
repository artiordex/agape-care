/**
 * @description 수신자 그룹 스키마
 * @author Shiwoo Min
 * @date 2026-01-30
 */

import { z } from 'zod';

export const RecipientGroupTypeSchema = z.enum(['RESIDENT', 'GUARDIAN', 'STAFF', 'MIXED']);
export const RecipientGroupStatusSchema = z.enum(['ACTIVE', 'INACTIVE']);

export const RecipientGroupSchema = z.object({
  id: z.coerce.number(),
  name: z.string().min(1, '그룹명은 필수입니다'),
  type: RecipientGroupTypeSchema,
  description: z.string().optional(),
  memberCount: z.number().default(0),
  status: RecipientGroupStatusSchema.default('ACTIVE'),
  usageCount: z.number().default(0),
  lastUsedAt: z.string().nullable().optional(),
  createdBy: z.string().optional(),
  createdAt: z.string().optional(),
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
  page: z.coerce.number().optional().default(1),
  limit: z.coerce.number().optional().default(10),
  type: RecipientGroupTypeSchema.optional(),
  status: RecipientGroupStatusSchema.optional(),
  search: z.string().optional(),
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
