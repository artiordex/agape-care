/**
 * @description Web Inquiry Schema
 * @author Agape Care AI
 */
import { z } from 'zod';

export const WebInquirySchema = z.object({
  id: z.string(), // BigInt serialized as string in response
  name: z.string().min(1, '이름을 입력해주세요'),
  phone: z.string().min(1, '연락처를 입력해주세요'),
  type: z.string().min(1, '상담 유형을 선택해주세요'),
  message: z.string().nullable().optional(),
  status: z.enum(['PENDING', 'IN_PROGRESS', 'DONE']).default('PENDING'),
  ipAddress: z.string().nullable().optional(),
  userAgent: z.string().nullable().optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const CreateWebInquirySchema = WebInquirySchema.omit({
  id: true,
  status: true,
  createdAt: true,
  updatedAt: true,
  ipAddress: true,
  userAgent: true,
});

export type WebInquiry = z.infer<typeof WebInquirySchema>;
export type CreateWebInquiry = z.infer<typeof CreateWebInquirySchema>;
