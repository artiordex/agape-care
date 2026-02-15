/**
 * @description 면회 예약 스키마
 */
import { z } from 'zod';

export const VisitStatusSchema = z.enum(['PENDING', 'APPROVED', 'REJECTED', 'CANCELLED']);
export type VisitStatus = z.infer<typeof VisitStatusSchema>;

export const VisitReservationSchema = z.object({
  id: z.coerce.string(),
  visitorName: z.string().min(1, '방문자 성함은 필수입니다.'),
  visitorPhone: z.string().min(1, '연락처는 필수입니다.'),
  visitorRelationship: z.string().min(1, '관계는 필수입니다.'),
  residentName: z.string().min(1, '어르신 성함은 필수입니다.'),
  visitDate: z.string().or(z.date().transform(d => d.toISOString().split('T')[0])), // YYYY-MM-DD
  visitTime: z.string().min(1, '방문 시간은 필수입니다.'),
  visitorCount: z.coerce.number().min(1).default(1),
  visitPurpose: z.string().nullable().optional(),

  // 건강 상태 체크
  healthCheckSymptoms: z.boolean().default(false), // 감염 증상 여부
  healthCheckAssistance: z.boolean().default(false), // 이동 보조 필요 여부

  notes: z.string().nullable().optional(),
  isConsented: z.boolean().default(false),

  status: VisitStatusSchema.default('PENDING'),

  // 메타 데이터
  ipAddress: z.string().nullable().optional(),
  userAgent: z.string().nullable().optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type VisitReservation = z.infer<typeof VisitReservationSchema>;

// 생성 요청 스키마
export const CreateVisitReservationSchema = VisitReservationSchema.omit({
  id: true,
  status: true,
  ipAddress: true,
  userAgent: true,
  createdAt: true,
  updatedAt: true,
});

export type CreateVisitReservation = z.infer<typeof CreateVisitReservationSchema>;

// 수정 요청 스키마 (관리자용 상태 변경 등)
export const UpdateVisitReservationSchema = z.object({
  status: VisitStatusSchema.optional(),
  notes: z.string().optional(),
  visitDate: z.string().optional(),
  visitTime: z.string().optional(),
});

export type UpdateVisitReservation = z.infer<typeof UpdateVisitReservationSchema>;

// 목록 조회 쿼리 스키마
export const GetVisitReservationsQuerySchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(20),
  status: VisitStatusSchema.optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  search: z.string().optional(), // 방문자명 or 어르신명
});

export type GetVisitReservationsQuery = z.infer<typeof GetVisitReservationsQuerySchema>;
