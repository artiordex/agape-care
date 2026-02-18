/**
 * @description 예약 발송 스키마
 * @author Shiwoo Min
 * @date 2026-01-30
 */

import { z } from 'zod';
import { NotificationChannelSchema, NotificationTargetTypeSchema } from './notification.schema.js';

export const ScheduledNotificationStatusSchema = z.enum(['PENDING', 'SENT', 'CANCELLED', 'FAILED']);

export const ScheduledNotificationSchema = z.object({
  id: z.string().describe('예약 발송 ID'),
  title: z.string().optional().describe('알림 제목'),
  body: z.string().min(1, '내용은 필수입니다').describe('알림 본문'),
  channel: NotificationChannelSchema.describe('발송 채널'),
  targetType: NotificationTargetTypeSchema.describe('대상 타입'),
  targetId: z.string().optional().describe('특정 대상 ID'),
  recipientGroupId: z.number().optional().describe('수신자 그룹 ID'),
  payload: z.record(z.unknown()).optional().describe('추가 데이터'),
  scheduledAt: z.string().describe('발송 예정 시간 (ISO 8601)'),
  status: ScheduledNotificationStatusSchema.describe('예약 상태 (PENDING, SENT, CANCELLED, FAILED)'),
  sentAt: z.string().nullable().optional().describe('실제 발송 일시'),
  createdAt: z.string().describe('생성 일시'),
  updatedAt: z.string().optional().describe('수정 일시'),
});

export const CreateScheduledNotificationRequestSchema = z.object({
  title: z.string().optional().describe('알림 제목'),
  body: z.string().min(1, '내용은 필수입니다').describe('알림 본문'),
  channel: NotificationChannelSchema.describe('발송 채널 (SMS, EMAIL, PUSH 등)'),
  targetType: NotificationTargetTypeSchema.describe('대상 타입'),
  targetId: z.string().optional().describe('개별 발송 시 대상 ID'),
  recipientGroupId: z.number().optional().describe('그룹 발송 시 수신자 그룹 ID'),
  payload: z.record(z.unknown()).optional().describe('추가 전송 데이터'),
  scheduledAt: z.string().describe('발송 예정 일시 (ISO 8601)'),
});

export const UpdateScheduledNotificationRequestSchema = CreateScheduledNotificationRequestSchema.partial();

export const ScheduledNotificationListQuerySchema = z.object({
  page: z.coerce.number().optional().default(1),
  limit: z.coerce.number().optional().default(10),
  status: ScheduledNotificationStatusSchema.optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});

export const ScheduledNotificationListResponseSchema = z.object({
  data: z.array(ScheduledNotificationSchema),
  pagination: z.object({
    total: z.number(),
    page: z.number(),
    limit: z.number(),
    totalPages: z.number(),
  }),
});

export type ScheduledNotificationStatus = z.infer<typeof ScheduledNotificationStatusSchema>;
export type ScheduledNotification = z.infer<typeof ScheduledNotificationSchema>;
export type CreateScheduledNotificationRequest = z.infer<typeof CreateScheduledNotificationRequestSchema>;
export type UpdateScheduledNotificationRequest = z.infer<typeof UpdateScheduledNotificationRequestSchema>;
export type ScheduledNotificationListQuery = z.infer<typeof ScheduledNotificationListQuerySchema>;
export type ScheduledNotificationListResponse = z.infer<typeof ScheduledNotificationListResponseSchema>;
