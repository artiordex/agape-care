/**
 * @description Dashboard API Contract
 * @author Agape Care Team
 * @date 2026-01-29
 */

import { z } from 'zod';
import { ApiResponseSchema } from '../schemas/common/response.schema';
import { DashboardStatsSchema, DashboardWidgetsSchema } from '../schemas/dashboard/dashboard.schema';

const authHeader = z.object({
  authorization: z.string().describe('Bearer {token}'),
});

export const dashboardContract = {
  /**
   * GET /api/dashboard/stats
   * Get summary statistics for the dashboard
   */
  getDashboardStats: {
    method: 'GET' as const,
    path: '/api/dashboard/stats',
    responses: {
      200: ApiResponseSchema(DashboardStatsSchema),
    },
    summary: '대시보드 통계 조회',
    headers: authHeader,
  },

  /**
   * GET /api/dashboard/widgets
   * Get all dashboard widget data (alerts, activities, schedules)
   */
  getDashboardWidgets: {
    method: 'GET' as const,
    path: '/api/dashboard/widgets',
    responses: {
      200: ApiResponseSchema(DashboardWidgetsSchema),
    },
    summary: '대시보드 위젯 데이터 조회',
    headers: authHeader,
  },
} as const;

export type DashboardContract = typeof dashboardContract;
