/**
 * @description 웹사이트 상담 문의 스키마
 */
import { z } from 'zod';

export const InquiryStatusSchema = z.enum(['PENDING', 'IN_PROGRESS', 'DONE', 'CANCELLED']);
export type InquiryStatus = z.infer<typeof InquiryStatusSchema>;

export const WebInquirySchema = z.object({
  id: z.coerce.string(),
  name: z.string().min(1, '성함은 필수입니다.'),
  phone: z.string().min(1, '연락처는 필수입니다.'),
  email: z.string().email('올바른 이메일 형식이 아닙니다.').nullable().optional(),
  type: z.string().min(1, '문의 유형은 필수입니다.'),
  residentAge: z.string().nullable().optional(),
  careGrade: z.string().nullable().optional(),
  preferredDate: z
    .string()
    .or(z.date().transform(d => d.toISOString().split('T')[0]))
    .nullable()
    .optional(),
  message: z.string().nullable().optional(),
  isConsented: z.boolean().default(false),
  status: InquiryStatusSchema.default('PENDING'),
  ipAddress: z.string().nullable().optional(),
  userAgent: z.string().nullable().optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type WebInquiry = z.infer<typeof WebInquirySchema>;

// 생성 요청 스키마
export const CreateWebInquirySchema = WebInquirySchema.omit({
  id: true,
  status: true,
  ipAddress: true,
  userAgent: true,
  createdAt: true,
  updatedAt: true,
});

export type CreateWebInquiry = z.infer<typeof CreateWebInquirySchema>;

// 수정 요청 스키마 (관리자용)
export const UpdateWebInquirySchema = z.object({
  status: InquiryStatusSchema,
});

export type UpdateWebInquiry = z.infer<typeof UpdateWebInquirySchema>;

// 목록 조회 쿼리 스키마
export const GetWebInquiriesQuerySchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(20),
  status: InquiryStatusSchema.optional(),
  type: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  search: z.string().optional(),
});

export type GetWebInquiriesQuery = z.infer<typeof GetWebInquiriesQuerySchema>;
