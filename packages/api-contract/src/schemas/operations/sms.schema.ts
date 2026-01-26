/**
 * @description SMS 발송 이력 스키마
 * @author Shiwoo Min
 * @date 2026-01-26
 */

import { z } from 'zod';

/**
 * SMS 발송 유형
 */
export const SmsSendTypeSchema = z.enum(['IMMEDIATE', 'SCHEDULED', 'BULK']);

/**
 * SMS 발송 상태
 */
export const SmsSendStatusSchema = z.enum(['PENDING', 'SENT', 'FAILED']);

/**
 * SMS 발송 로그
 */
export const SmsSendLogSchema = z.object({
  id: z.string(),
  recipientPhone: z.string(),
  recipientName: z.string().nullable(),
  message: z.string(),
  sendType: SmsSendTypeSchema,
  scheduledAt: z.string().nullable(), // ISO datetime
  sentAt: z.string().nullable(),
  status: SmsSendStatusSchema,
  errorMessage: z.string().nullable(),
  smsCount: z.number(), // 전송 건수 (LMS 고려)
  cost: z.number().nullable(),
  resultCode: z.string().nullable(),
  senderId: z.string().nullable(),
  senderName: z.string().nullable().optional(), // 조인
  createdAt: z.string(),
});

/**
 * SMS 발송 요청
 */
export const SendSmsRequestSchema = z.object({
  recipientPhone: z.string().min(1, '수신자 전화번호는 필수입니다'),
  recipientName: z.string().optional(),
  message: z.string().min(1, '메시지는 필수입니다').max(2000),
  sendType: SmsSendTypeSchema.default('IMMEDIATE'),
  scheduledAt: z.string().optional(),
});

/**
 * 대량 SMS 발송 요청
 */
export const SendBulkSmsRequestSchema = z.object({
  recipients: z
    .array(
      z.object({
        phone: z.string().min(1),
        name: z.string().optional(),
      }),
    )
    .min(1, '수신자는 최소 1명 이상이어야 합니다'),
  message: z.string().min(1).max(2000),
  scheduledAt: z.string().optional(),
});

/**
 * SMS 발송 로그 조회 쿼리
 */
export const GetSmsLogsQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
  status: SmsSendStatusSchema.optional(),
  sendType: SmsSendTypeSchema.optional(),
  senderId: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  search: z.string().optional(), // 수신자, 메시지 검색
});

/**
 * SMS 발송 로그 목록 응답
 */
export const GetSmsLogsResponseSchema = z.object({
  data: z.array(SmsSendLogSchema),
  pagination: z.object({
    total: z.number(),
    page: z.number(),
    limit: z.number(),
    totalPages: z.number(),
  }),
});

/**
 * SMS 발송 통계
 */
export const SmsStatsSchema = z.object({
  total: z.number(),
  sent: z.number(),
  failed: z.number(),
  pending: z.number(),
  totalCost: z.number(),
  period: z.object({
    startDate: z.string(),
    endDate: z.string(),
  }),
});

// Type exports
export type SmsSendType = z.infer<typeof SmsSendTypeSchema>;
export type SmsSendStatus = z.infer<typeof SmsSendStatusSchema>;
export type SmsSendLog = z.infer<typeof SmsSendLogSchema>;
export type SendSmsRequest = z.infer<typeof SendSmsRequestSchema>;
export type SendBulkSmsRequest = z.infer<typeof SendBulkSmsRequestSchema>;
export type GetSmsLogsQuery = z.infer<typeof GetSmsLogsQuerySchema>;
export type GetSmsLogsResponse = z.infer<typeof GetSmsLogsResponseSchema>;
export type SmsStats = z.infer<typeof SmsStatsSchema>;
