/**
 * @description Web Inquiry Schema
 * @author Agape Care AI
 */
import { z } from 'zod';

export const WebInquirySchema = z.object({
  id: z.string(), // BigInt serialized as string in response
  name: z.string().min(1, '성함을 입력해주세요'),
  phone: z.string().min(1, '연락처를 입력해주세요'),
  email: z.string().email('올바른 이메일 형식이 아닙니다').nullable().optional(),
  type: z.string().min(1, '문의 유형을 선택해주세요'),
  residentAge: z.string().nullable().optional(),
  careGrade: z.string().nullable().optional(),
  preferredDate: z.string().nullable().optional(),
  message: z.string().nullable().optional(),
  isConsented: z.boolean().default(false),
  status: z.enum(['PENDING', 'IN_PROGRESS', 'DONE', 'CANCELLED']).default('PENDING'),
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
}).extend({
  isConsented: z.boolean().refine(val => val === true, {
    message: '개인정보 수집 및 이용에 동의해야 합니다',
  }),
});

export type WebInquiry = z.infer<typeof WebInquirySchema>;
export type CreateWebInquiry = z.infer<typeof CreateWebInquirySchema>;
