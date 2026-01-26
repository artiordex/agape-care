/**
 * @description 알림 큐 및 알림 관리 스키마
 * @author Shiwoo Min
 * @date 2026-01-26
 */

import { z } from 'zod';

/**
 * 알림 채널
 */
export const NotificationChannelSchema = z.enum(['PUSH', 'SMS', 'EMAIL', 'INAPP']);

/**
 * 알림 대상 타입
 */
export const NotificationTargetTypeSchema = z.enum(['RESIDENT', 'EMPLOYEE', 'GUARDIAN']);

/**
 * 알림 상태
 */
export const NotificationStatusSchema = z.enum(['PENDING', 'SENT', 'FAILED', 'CANCELLED']);

/**
 * 알림 큐 정보
 */
export const NotificationQueueSchema = z.object({
  id: z.string(),
  channel: NotificationChannelSchema,
  targetType: NotificationTargetTypeSchema,
  targetId: z.string().nullable(),
  title: z.string().nullable(),
  body: z.string().nullable(),
  payload: z.record(z.unknown()),
  scheduledAt: z.string(), // ISO datetime
  sentAt: z.string().nullable(),
  status: NotificationStatusSchema,
  errorMessage: z.string().nullable(),
  createdAt: z.string(),
});

/**
 * 알림 전송 요청
 */
export const SendNotificationRequestSchema = z.object({
  channel: NotificationChannelSchema,
  targetType: NotificationTargetTypeSchema,
  targetId: z.string().optional(),
  title: z.string().optional(),
  body: z.string().min(1, '내용은 필수입니다'),
  payload: z.record(z.unknown()).optional(),
  scheduledAt: z.string().optional(), // 기본값: 즉시 발송
});

/**
 * 대량 알림 전송 요청
 */
export const SendBulkNotificationRequestSchema = z.object({
  channel: NotificationChannelSchema,
  targetType: NotificationTargetTypeSchema,
  targetIds: z.array(z.string()).min(1, '대상은 최소 1명 이상이어야 합니다'),
  title: z.string().optional(),
  body: z.string().min(1, '내용은 필수입니다'),
  payload: z.record(z.unknown()).optional(),
  scheduledAt: z.string().optional(),
});

/**
 * 알림 큐 목록 조회 쿼리
 */
export const GetNotificationQueueQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
  channel: NotificationChannelSchema.optional(),
  targetType: NotificationTargetTypeSchema.optional(),
  status: NotificationStatusSchema.optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});

/**
 * 알림 큐 목록 응답
 */
export const GetNotificationQueueResponseSchema = z.object({
  data: z.array(NotificationQueueSchema),
  pagination: z.object({
    total: z.number(),
    page: z.number(),
    limit: z.number(),
    totalPages: z.number(),
  }),
});

/**
 * 알림 통계
 */
export const NotificationStatsSchema = z.object({
  total: z.number(),
  sent: z.number(),
  failed: z.number(),
  pending: z.number(),
  byChannel: z.record(z.number()),
  byTargetType: z.record(z.number()),
  period: z.object({
    startDate: z.string(),
    endDate: z.string(),
  }),
});

/**
 * 사용자별 알림 목록 (앱 내 알림)
 */
export const UserNotificationSchema = z.object({
  id: z.string(),
  title: z.string().nullable(),
  body: z.string(),
  payload: z.record(z.unknown()),
  isRead: z.boolean(),
  sentAt: z.string(),
  readAt: z.string().nullable(),
});

/**
 * 사용자 알림 목록 조회 쿼리
 */
export const GetUserNotificationsQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
  isRead: z.coerce.boolean().optional(),
});

/**
 * 사용자 알림 목록 응답
 */
export const GetUserNotificationsResponseSchema = z.object({
  data: z.array(UserNotificationSchema),
  pagination: z.object({
    total: z.number(),
    page: z.number(),
    limit: z.number(),
    totalPages: z.number(),
  }),
  unreadCount: z.number(),
});

/**
 * 알림 읽음 처리 요청
 */
export const MarkNotificationReadRequestSchema = z.object({
  notificationIds: z.array(z.string()).min(1),
});

// Type exports
export type NotificationChannel = z.infer<typeof NotificationChannelSchema>;
export type NotificationTargetType = z.infer<typeof NotificationTargetTypeSchema>;
export type NotificationStatus = z.infer<typeof NotificationStatusSchema>;
export type NotificationQueue = z.infer<typeof NotificationQueueSchema>;
export type SendNotificationRequest = z.infer<typeof SendNotificationRequestSchema>;
export type SendBulkNotificationRequest = z.infer<typeof SendBulkNotificationRequestSchema>;
export type GetNotificationQueueQuery = z.infer<typeof GetNotificationQueueQuerySchema>;
export type GetNotificationQueueResponse = z.infer<typeof GetNotificationQueueResponseSchema>;
export type NotificationStats = z.infer<typeof NotificationStatsSchema>;
export type UserNotification = z.infer<typeof UserNotificationSchema>;
export type GetUserNotificationsQuery = z.infer<typeof GetUserNotificationsQuerySchema>;
export type GetUserNotificationsResponse = z.infer<typeof GetUserNotificationsResponseSchema>;
export type MarkNotificationReadRequest = z.infer<typeof MarkNotificationReadRequestSchema>;
