/**
 * @description Notification API Contract
 * @author Shiwoo Min
 * @date 2026-01-26
 */

import { z } from 'zod';
import {
  SendNotificationRequestSchema,
  SendBulkNotificationRequestSchema,
  GetNotificationQueueQuerySchema,
  GetNotificationQueueResponseSchema,
  GetUserNotificationsQuerySchema,
  GetUserNotificationsResponseSchema,
  MarkNotificationReadRequestSchema,
} from '../schemas/notification/index.js';

const authHeader = z.object({
  authorization: z.string().describe('Bearer {token}'),
});

const errorResponse = (statusCode: number) =>
  z.object({
    message: z.string(),
    error: z.string().optional(),
    statusCode: z.literal(statusCode),
  });

export const notificationContract = {
  /**
   * POST /api/notifications/send
   * 알림 전송
   */
  sendNotification: {
    method: 'POST' as const,
    path: '/api/notifications/send',
    body: SendNotificationRequestSchema,
    responses: {
      201: z.object({
        message: z.string(),
        queueId: z.string(),
      }),
      400: errorResponse(400),
    },
    summary: '알림 전송',
    description: '단일 알림을 전송합니다.',
    headers: authHeader,
  },

  /**
   * POST /api/notifications/send-bulk
   * 대량 알림 전송
   */
  sendBulkNotification: {
    method: 'POST' as const,
    path: '/api/notifications/send-bulk',
    body: SendBulkNotificationRequestSchema,
    responses: {
      201: z.object({
        message: z.string(),
        queueIds: z.array(z.string()),
      }),
      400: errorResponse(400),
    },
    summary: '대량 알림 전송',
    description: '여러 대상에게 알림을 전송합니다.',
    headers: authHeader,
  },

  /**
   * GET /api/notifications/queue
   * 알림 큐 목록 조회
   */
  getNotificationQueue: {
    method: 'GET' as const,
    path: '/api/notifications/queue',
    query: GetNotificationQueueQuerySchema,
    responses: {
      200: GetNotificationQueueResponseSchema,
    },
    summary: '알림 큐 목록 조회',
    description: '알림 발송 큐 목록을 조회합니다.',
    headers: authHeader,
  },

  /**
   * GET /api/notifications/me
   * 내 알림 목록 조회
   */
  getMyNotifications: {
    method: 'GET' as const,
    path: '/api/notifications/me',
    query: GetUserNotificationsQuerySchema,
    responses: {
      200: GetUserNotificationsResponseSchema,
    },
    summary: '내 알림 목록 조회',
    description: '현재 사용자의 알림 목록을 조회합니다.',
    headers: authHeader,
  },

  /**
   * POST /api/notifications/mark-read
   * 알림 읽음 처리
   */
  markNotificationsRead: {
    method: 'POST' as const,
    path: '/api/notifications/mark-read',
    body: MarkNotificationReadRequestSchema,
    responses: {
      200: z.object({
        message: z.string(),
        updatedCount: z.number(),
      }),
    },
    summary: '알림 읽음 처리',
    description: '선택한 알림들을 읽음 처리합니다.',
    headers: authHeader,
  },

  /**
   * POST /api/notifications/mark-all-read
   * 모든 알림 읽음 처리
   */
  markAllNotificationsRead: {
    method: 'POST' as const,
    path: '/api/notifications/mark-all-read',
    responses: {
      200: z.object({
        message: z.string(),
        updatedCount: z.number(),
      }),
    },
    summary: '모든 알림 읽음 처리',
    description: '현재 사용자의 모든 알림을 읽음 처리합니다.',
    headers: authHeader,
  },
} as const;

export type NotificationContract = typeof notificationContract;
