/**
 * @description MyPage API Contract
 * @author Agape Care Team
 * @date 2026-01-29
 */

import { z } from 'zod';
import { ApiResponseSchema } from '../schemas/common/response.schema';
import { MyProfileSchema, MyScheduleSchema, UpdateMyProfileSchema } from '../schemas/mypage/mypage.schema';

const authHeader = z.object({
  authorization: z.string().describe('Bearer {token}'),
});

export const myPageContract = {
  /**
   * GET /api/mypage/profile
   * Get detailed profile of the current user
   */
  getMyProfile: {
    method: 'GET' as const,
    path: '/api/mypage/profile',
    responses: {
      200: ApiResponseSchema(MyProfileSchema),
    },
    summary: '내 프로필 조회',
    headers: authHeader,
  },

  /**
   * PATCH /api/mypage/profile
   * Update current user's profile
   */
  updateMyProfile: {
    method: 'PATCH' as const,
    path: '/api/mypage/profile',
    body: UpdateMyProfileSchema,
    responses: {
      200: ApiResponseSchema(MyProfileSchema),
    },
    summary: '내 프로필 수정',
    headers: authHeader,
  },

  /**
   * GET /api/mypage/schedules
   * Get current user's schedule
   */
  getMySchedules: {
    method: 'GET' as const,
    path: '/api/mypage/schedules',
    query: z.object({
      startDate: z.string().optional(),
      endDate: z.string().optional(),
    }),
    responses: {
      200: ApiResponseSchema(z.array(MyScheduleSchema)),
    },
    summary: '내 일정 조회',
    headers: authHeader,
  },
} as const;

export type MyPageContract = typeof myPageContract;
