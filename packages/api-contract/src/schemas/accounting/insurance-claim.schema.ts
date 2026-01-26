/**
 * @description 장기요양보험 청구 및 상세 항목 스키마
 * @author Shiwoo Min
 * @date 2026-01-27
 */
import { z } from 'zod';

/**
 * INSURANCE_CLAIM_ITEMS 테이블 대응
 */
export const InsuranceClaimItemSchema = z.object({
  id: z.coerce.string(),
  claimId: z.coerce.string(),
  serviceDate: z.coerce.date(),
  serviceCode: z.string(),
  serviceName: z.string(),
  quantity: z.coerce.number(),
  unitPrice: z.coerce.number(),
  amount: z.coerce.number(),
  copayAmount: z.coerce.number(),
  createdAt: z.date().default(() => new Date()),
});

/**
 * INSURANCE_CLAIMS 테이블 대응
 */
export const InsuranceClaimSchema = z.object({
  id: z.coerce.string(),
  claimNo: z.string(),
  residentId: z.coerce.string(),
  claimMonth: z.coerce.date(),
  claimType: z.string(),
  totalAmount: z.coerce.number(),
  approvedAmount: z.coerce.number().nullable().optional(),

  // 상태 및 이력 관리 필드 추가
  submittedAt: z.coerce.date().nullable().optional(),
  approvedAt: z.coerce.date().nullable().optional(),
  paidAt: z.coerce.date().nullable().optional(),
  status: z.enum(['DRAFT', 'SUBMITTED', 'APPROVED', 'REJECTED', 'PAID']),
  rejectReason: z.string().nullable().optional(),
  notes: z.string().nullable().optional(),
  createdBy: z.coerce.string().nullable().optional(),

  // .omit() 에러 해결을 위한 필수 필드
  createdAt: z.date(),
  updatedAt: z.date(),

  // 관계 설정
  items: z.array(InsuranceClaimItemSchema).optional(),
});

export type InsuranceClaim = z.infer<typeof InsuranceClaimSchema>;
export type InsuranceClaimItem = z.infer<typeof InsuranceClaimItemSchema>;
