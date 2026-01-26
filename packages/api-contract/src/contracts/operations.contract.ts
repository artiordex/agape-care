/**
 * @description Operations API Contract
 * @author Shiwoo Min
 * @date 2026-01-26
 */

import { z } from 'zod';

const authHeader = z.object({
  authorization: z.string().describe('Bearer {token}'),
});

const errorResponse = (statusCode: number) =>
  z.object({
    message: z.string(),
    error: z.string().optional(),
    statusCode: z.literal(statusCode),
  });

export const operationsContract = {
  // ==================== Vehicle ====================
  /**
   * GET /api/operations/vehicles
   * 차량 목록 조회
   */
  getVehicles: {
    method: 'GET' as const,
    path: '/api/operations/vehicles',
    query: z.object({
      page: z.coerce.number().default(1),
      limit: z.coerce.number().default(20),
      status: z.string().optional(),
    }),
    responses: {
      200: z.any(),
    },
    summary: '차량 목록 조회',
    headers: authHeader,
  },

  // ==================== Inventory ====================
  /**
   * GET /api/operations/inventory/items
   * 재고 품목 목록 조회
   */
  getInventoryItems: {
    method: 'GET' as const,
    path: '/api/operations/inventory/items',
    query: z.object({
      page: z.coerce.number().default(1),
      limit: z.coerce.number().default(20),
      category: z.string().optional(),
      lowStock: z.coerce.boolean().optional(),
    }),
    responses: {
      200: z.any(),
    },
    summary: '재고 품목 목록 조회',
    headers: authHeader,
  },

  // ==================== CCTV ====================
  /**
   * GET /api/operations/cctv/devices
   * CCTV 장비 목록 조회
   */
  getCctvDevices: {
    method: 'GET' as const,
    path: '/api/operations/cctv/devices',
    query: z.object({
      page: z.coerce.number().default(1),
      limit: z.coerce.number().default(20),
      status: z.string().optional(),
    }),
    responses: {
      200: z.any(),
    },
    summary: 'CCTV 장비 목록 조회',
    headers: authHeader,
  },

  /**
   * GET /api/operations/cctv/view-logs
   * CCTV 열람 로그 조회
   */
  getCctvViewLogs: {
    method: 'GET' as const,
    path: '/api/operations/cctv/view-logs',
    query: z.object({
      page: z.coerce.number().default(1),
      limit: z.coerce.number().default(20),
      deviceId: z.string().optional(),
      startDate: z.string().optional(),
    }),
    responses: {
      200: z.any(),
    },
    summary: 'CCTV 열람 로그 조회',
    headers: authHeader,
  },

  // ==================== Grievance ====================
  /**
   * GET /api/operations/grievances
   * 민원 목록 조회
   */
  getGrievances: {
    method: 'GET' as const,
    path: '/api/operations/grievances',
    query: z.object({
      page: z.coerce.number().default(1),
      limit: z.coerce.number().default(20),
      status: z.string().optional(),
      category: z.string().optional(),
    }),
    responses: {
      200: z.any(),
    },
    summary: '민원 목록 조회',
    headers: authHeader,
  },

  // ==================== SMS ====================
  /**
   * POST /api/operations/sms/send
   * SMS 발송
   */
  sendSms: {
    method: 'POST' as const,
    path: '/api/operations/sms/send',
    body: z.object({
      recipientPhone: z.string(),
      message: z.string(),
      scheduledAt: z.string().optional(),
    }),
    responses: {
      201: z.object({
        message: z.string(),
      }),
      400: errorResponse(400),
    },
    summary: 'SMS 발송',
    headers: authHeader,
  },

  /**
   * GET /api/operations/sms/logs
   * SMS 발송 로그 조회
   */
  getSmsLogs: {
    method: 'GET' as const,
    path: '/api/operations/sms/logs',
    query: z.object({
      page: z.coerce.number().default(1),
      limit: z.coerce.number().default(20),
      status: z.string().optional(),
    }),
    responses: {
      200: z.any(),
    },
    summary: 'SMS 발송 로그 조회',
    headers: authHeader,
  },
} as const;

export type OperationsContract = typeof operationsContract;
