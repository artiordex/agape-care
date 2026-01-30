/**
 * @description 예약 발송 스키마
 * @author Shiwoo Min
 * @date 2026-01-30
 */

import { z } from 'zod';
import { NotificationChannelSchema, NotificationTargetTypeSchema } from './notification.schema';

export const ScheduledNotificationStatusSchema = z.enum(['PENDING', 'SENT', 'CANCELLED', 'FAILED']);

export const ScheduledNotificationSchema = z.object({
  id: z.string(),
  title: z.string().optional(),
  body: z.string().min(1, '내용은 필수입니다'),
  channel: NotificationChannelSchema,
  targetType: NotificationTargetTypeSchema,
  targetId: z.string().optional(), // 특정 대상 ID 또는 그룹 ID
  recipientGroupId: z.number().optional(), // 수신자 그룹 사용 시
  payload: z.record(z.unknown()).optional(),
  scheduledAt: z.string(),
  status: ScheduledNotificationStatusSchema,
  sentAt: z.string().nullable().optional(),
  createdAt: z.string(),
  updatedAt: z.string().optional(),
});

export const CreateScheduledNotificationRequestSchema = z.object({
  title: z.string().optional(),
  body: z.string().min(1, '내용은 필수입니다'),
  channel: NotificationChannelSchema,
  targetType: NotificationTargetTypeSchema,
  targetId: z.string().optional(), // 개별 발송 시
  recipientGroupId: z.number().optional(), // 그룹 발송 시
  payload: z.record(z.unknown()).optional(),
  scheduledAt: z.string(),
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
