/**
 * @description 입소자 연락처(보호자) 스키마
 * @author Shiwoo Min
 * @date 2026-01-26
 */

import { z } from 'zod';

/**
 * 연락처 정보
 */
export const ResidentContactSchema = z.object({
  id: z.string(),
  residentId: z.string(),
  name: z.string(),
  relationship: z.string().nullable(),
  phoneNumber: z.string().nullable(),
  isPrimary: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

/**
 * 연락처 생성 요청
 */
export const CreateContactRequestSchema = z.object({
  name: z.string().min(1, '이름은 필수입니다'),
  relationship: z.string().optional(),
  phoneNumber: z.string().optional(),
  isPrimary: z.boolean().default(false),
});

/**
 * 연락처 수정 요청
 */
export const UpdateContactRequestSchema = z.object({
  name: z.string().min(1).optional(),
  relationship: z.string().optional(),
  phoneNumber: z.string().optional(),
  isPrimary: z.boolean().optional(),
});

/**
 * 연락처 목록 응답
 */
export const GetContactsResponseSchema = z.array(ResidentContactSchema);

// Type exports
export type ResidentContact = z.infer<typeof ResidentContactSchema>;
export type CreateContactRequest = z.infer<typeof CreateContactRequestSchema>;
export type UpdateContactRequest = z.infer<typeof UpdateContactRequestSchema>;
export type GetContactsResponse = z.infer<typeof GetContactsResponseSchema>;
