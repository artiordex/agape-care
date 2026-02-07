/**
 * @description Visit Reservation Schema
 * @author Agape Care AI
 */
import { z } from 'zod';

export const VisitReservationSchema = z.object({
  id: z.string(), // BigInt serialized as string in response
  visitorName: z.string().min(1, '성함을 입력해주세요'),
  visitorPhone: z.string().min(1, '연락처를 입력해주세요'),
  visitorRelationship: z.string().min(1, '어르신과의 관계를 입력해주세요'),
  residentName: z.string().min(1, '어르신 성함을 입력해주세요'),
  visitDate: z.string().min(1, '방문 희망일을 선택해주세요'),
  visitTime: z.string().min(1, '방문 희망시간을 선택해주세요'),
  visitorCount: z.number().int().min(1).default(1),
  visitPurpose: z.string().nullable().optional(),
  healthCheckSymptoms: z.boolean().default(false),
  healthCheckAssistance: z.boolean().default(false),
  notes: z.string().nullable().optional(),
  isConsented: z.boolean().default(false),
  status: z.enum(['PENDING', 'APPROVED', 'REJECTED', 'CANCELLED']).default('PENDING'),
  ipAddress: z.string().nullable().optional(),
  userAgent: z.string().nullable().optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const CreateVisitReservationSchema = VisitReservationSchema.omit({
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

export type VisitReservation = z.infer<typeof VisitReservationSchema>;
export type CreateVisitReservation = z.infer<typeof CreateVisitReservationSchema>;
