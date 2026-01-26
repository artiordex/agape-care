/**
 * @description 입소자 호실 배정 스키마
 * @author Shiwoo Min
 * @date 2026-01-26
 */

import { z } from 'zod';

/**
 * 호실 배정 정보
 */
export const ResidentRoomSchema = z.object({
  id: z.string(),
  residentId: z.string(),
  roomLabel: z.string(),
  bedLabel: z.string().nullable(),
  startsAt: z.string(), // ISO date
  endsAt: z.string().nullable(), // ISO date
  isPrimary: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

/**
 * 호실 배정 생성 요청
 */
export const CreateRoomRequestSchema = z.object({
  roomLabel: z.string().min(1, '호실은 필수입니다'),
  bedLabel: z.string().optional(),
  startsAt: z.string(), // ISO date
  endsAt: z.string().optional(),
  isPrimary: z.boolean().default(true),
});

/**
 * 호실 배정 수정 요청
 */
export const UpdateRoomRequestSchema = z.object({
  roomLabel: z.string().min(1).optional(),
  bedLabel: z.string().nullable().optional(),
  startsAt: z.string().optional(),
  endsAt: z.string().nullable().optional(),
  isPrimary: z.boolean().optional(),
});

/**
 * 호실 배정 목록 응답
 */
export const GetRoomsResponseSchema = z.array(ResidentRoomSchema);

/**
 * 현재 호실 정보
 */
export const CurrentRoomSchema = z.object({
  roomLabel: z.string(),
  bedLabel: z.string().nullable(),
  startsAt: z.string(),
});

// Type exports
export type ResidentRoom = z.infer<typeof ResidentRoomSchema>;
export type CreateRoomRequest = z.infer<typeof CreateRoomRequestSchema>;
export type UpdateRoomRequest = z.infer<typeof UpdateRoomRequestSchema>;
export type GetRoomsResponse = z.infer<typeof GetRoomsResponseSchema>;
export type CurrentRoom = z.infer<typeof CurrentRoomSchema>;
