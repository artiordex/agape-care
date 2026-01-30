/**
 * @description Notification API Contract
 * @author Shiwoo Min
 * @date 2026-01-26
 */

import { z } from 'zod';
import {
  CreateRecipientGroupRequestSchema,
  CreateScheduledNotificationRequestSchema,
  GetNotificationQueueQuerySchema,
  GetNotificationQueueResponseSchema,
  GetUserNotificationsQuerySchema,
  GetUserNotificationsResponseSchema,
  MarkNotificationReadRequestSchema,
  NotificationConfigSchema,
  RecipientGroupListQuerySchema,
  RecipientGroupListResponseSchema,
  RecipientGroupSchema,
  ScheduledNotificationListQuerySchema,
  ScheduledNotificationListResponseSchema,
  ScheduledNotificationSchema,
  SendBulkNotificationRequestSchema,
  SendNotificationRequestSchema,
  UpdateRecipientGroupRequestSchema,
} from '../schemas/notification/index';

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
    body: z.object({}),
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
  /**
   * GET /api/notifications/recipients
   * 수신자 그룹 목록 조회
   */
  getRecipientGroups: {
    method: 'GET' as const,
    path: '/api/notifications/recipients',
    query: RecipientGroupListQuerySchema,
    responses: {
      200: RecipientGroupListResponseSchema,
    },
    summary: '수신자 그룹 목록 조회',
    description: '수신자 그룹 목록을 조회합니다.',
    headers: authHeader,
  },

  /**
   * POST /api/notifications/recipients
   * 수신자 그룹 생성
   */
  createRecipientGroup: {
    method: 'POST' as const,
    path: '/api/notifications/recipients',
    body: CreateRecipientGroupRequestSchema,
    responses: {
      201: RecipientGroupSchema,
      400: errorResponse(400),
    },
    summary: '수신자 그룹 생성',
    description: '새로운 수신자 그룹을 생성합니다.',
    headers: authHeader,
  },

  /**
   * GET /api/notifications/recipients/:id
   * 수신자 그룹 상세 조회
   */
  getRecipientGroup: {
    method: 'GET' as const,
    path: '/api/notifications/recipients/:id',
    responses: {
      200: RecipientGroupSchema,
      404: errorResponse(404),
    },
    summary: '수신자 그룹 상세 조회',
    description: '특정 수신자 그룹의 상세 정보를 조회합니다.',
    headers: authHeader,
  },

  /**
   * PATCH /api/notifications/recipients/:id
   * 수신자 그룹 수정
   */
  updateRecipientGroup: {
    method: 'PATCH' as const,
    path: '/api/notifications/recipients/:id',
    body: UpdateRecipientGroupRequestSchema,
    responses: {
      200: RecipientGroupSchema,
      404: errorResponse(404),
    },
    summary: '수신자 그룹 수정',
    description: '수신자 그룹 정보를 수정합니다.',
    headers: authHeader,
  },

  /**
   * DELETE /api/notifications/recipients/:id
   * 수신자 그룹 삭제
   */
  deleteRecipientGroup: {
    method: 'DELETE' as const,
    path: '/api/notifications/recipients/:id',
    body: z.object({}),
    responses: {
      200: z.object({ message: z.string() }),
      404: errorResponse(404),
    },
    summary: '수신자 그룹 삭제',
    description: '수신자 그룹을 삭제합니다.',
    headers: authHeader,
  },

  /**
   * GET /api/notifications/scheduled
   * 예약 발송 목록 조회
   */
  getScheduledNotifications: {
    method: 'GET' as const,
    path: '/api/notifications/scheduled',
    query: ScheduledNotificationListQuerySchema,
    responses: {
      200: ScheduledNotificationListResponseSchema,
    },
    summary: '예약 발송 목록 조회',
    description: '예약된 알림 발송 목록을 조회합니다.',
    headers: authHeader,
  },

  /**
   * POST /api/notifications/scheduled
   * 예약 발송 생성
   */
  createScheduledNotification: {
    method: 'POST' as const,
    path: '/api/notifications/scheduled',
    body: CreateScheduledNotificationRequestSchema,
    responses: {
      201: ScheduledNotificationSchema,
      400: errorResponse(400),
    },
    summary: '예약 발송 생성',
    description: '새로운 예약 발송을 생성합니다.',
    headers: authHeader,
  },

  /**
   * POST /api/notifications/scheduled/:id/cancel
   * 예약 발송 취소
   */
  cancelScheduledNotification: {
    method: 'POST' as const,
    path: '/api/notifications/scheduled/:id/cancel',
    body: z.object({}),
    responses: {
      200: ScheduledNotificationSchema,
      404: errorResponse(404),
    },
    summary: '예약 발송 취소',
    description: '예약된 알림 발송을 취소합니다.',
    headers: authHeader,
  },

  /**
   * DELETE /api/notifications/scheduled/:id
   * 예약 발송 삭제
   */
  deleteScheduledNotification: {
    method: 'DELETE' as const,
    path: '/api/notifications/scheduled/:id',
    body: z.object({}),
    responses: {
      200: z.object({ message: z.string() }),
      404: errorResponse(404),
    },
    summary: '예약 발송 삭제',
    description: '예약 발송 내역을 삭제합니다.',
    headers: authHeader,
  },

  /**
   * GET /api/notifications/settings
   * 알림 설정 조회
   */
  getNotificationSettings: {
    method: 'GET' as const,
    path: '/api/notifications/settings',
    responses: {
      200: NotificationConfigSchema,
    },
    summary: '알림 설정 조회',
    description: '알림 발송 설정을 조회합니다.',
    headers: authHeader,
  },

  /**
   * PUT /api/notifications/settings
   * 알림 설정 수정
   */
  updateNotificationSettings: {
    method: 'PUT' as const,
    path: '/api/notifications/settings',
    body: NotificationConfigSchema,
    responses: {
      200: NotificationConfigSchema,
    },
    summary: '알림 설정 수정',
    description: '알림 발송 설정을 수정합니다.',
    headers: authHeader,
  },
} as const;

export type NotificationContract = typeof notificationContract;
