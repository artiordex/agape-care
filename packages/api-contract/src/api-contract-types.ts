/**
 * Description : api-contract-types.ts - ?? api-contract-types ?? ?? ??
 * Author: Shiwoo Min
 * Date: 2025-09-10
 * 09-21 - 주석 보강
 */
import { z } from 'zod';

/**
 * @description API 계층 BIGINT를 문자열로 노출 (정확도 보장)
 * @returns 숫자 문자열 타입 (브랜드된 Id)
 */
export const IdSchema = z.string().regex(/^\d+$/).brand<'Id'>();
export type Id = z.infer<typeof IdSchema>;

/**
 * @description RFC3339 타임스탬프 문자열 타입
 * @returns ISO 8601 형식의 날짜-시간 문자열
 */
export const TimestampSchema = z.string().datetime();
export type Timestamp = z.infer<typeof TimestampSchema>;

/**
 * @description JSONB 타입 (임의 JSON 객체)
 * @returns 키-값 쌍의 임의 데이터 레코드
 */
export const JsonbSchema = z.record(z.unknown());
export type Jsonb = z.infer<typeof JsonbSchema>;

/**
 * @description 커서 페이지네이션 쿼리 파라미터
 * @returns 커서, 제한, 정렬 필드를 포함한 페이지네이션 쿼리
 */
export const CursorPaginationQuerySchema = z.object({
  cursor: z.string().optional(),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  sort: z.string().optional(),
  order: z.enum(['asc', 'desc']).default('desc'),
});
export type CursorPaginationQuery = z.infer<typeof CursorPaginationQuerySchema>;

/**
 * @description 커서 기반 페이지네이션 응답
 * @returns 다음 커서, 더보기 여부, 제한 수 포함
 */
export const CursorPaginationResponseSchema = z.object({
  next_cursor: z.string().nullable(),
  has_more: z.boolean(),
  limit: z.number(),
});
export type CursorPaginationResponse = z.infer<typeof CursorPaginationResponseSchema>;

/**
 * @description 커서 기반 페이지네이션 응답 래퍼 (성공 시)
 * @template T 아이템 배열의 타입
 * @returns 성공 상태, 아이템 배열, 페이지네이션, 메시지, 타임스탬프 포함
 */
export const CursorPaginatedResponseSchema = <T extends z.ZodTypeAny>(itemSchema: T) =>
  z.object({
    success: z.literal(true),
    data: z.object({
      items: z.array(itemSchema),
      pagination: CursorPaginationResponseSchema,
    }),
    message: z.string().optional(),
    timestamp: TimestampSchema,
  });

/**
 * @description 커서 기반 페이지네이션 응답 타입 (TypeScript)
 * @template T 아이템 배열의 타입
 */
export type CursorPaginatedResponse<T> = {
  success: true;
  data: {
    items: T[];
    pagination: CursorPaginationResponse;
  };
  message?: string;
  timestamp: Timestamp;
};

/**
 * @description API 성공 응답 스키마
 * @template T 데이터 타입
 * @returns 성공 여부, 데이터, 메시지, 타임스탬프 포함
 */
export const ApiSuccessSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    success: z.literal(true),
    data: dataSchema,
    message: z.string().optional(),
    timestamp: TimestampSchema,
  });

/**
 * @description API 에러 응답 스키마
 * @returns 실패 상태, 에러 코드, 메시지, 상세 정보, 타임스탬프 포함
 */
export const ApiErrorResponseSchema = z.object({
  success: z.literal(false),
  error: z.object({
    code: z.string(),
    message: z.string(),
    details: z.unknown().optional(),
  }),
  timestamp: TimestampSchema,
});
export type ApiErrorResponse = z.infer<typeof ApiErrorResponseSchema>;

/**
 * @description API 성공/실패 응답 통합 스키마
 * @template T 데이터 타입
 */
export const ApiEnvelopeSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.union([ApiSuccessSchema(dataSchema), ApiErrorResponseSchema]);

/**
 * @description API 공통 성공 응답 타입
 * @template T 데이터 타입
 */
export type ApiResponse<T> = {
  success: true;
  data: T;
  message?: string;
  timestamp: Timestamp;
};

/**
 * @description 사용자 스키마
 * @returns 사용자 정보
 */
export const UserSchema = z.object({
  id: IdSchema,
  email: z.string().email().nullable(),
  name: z.string().nullable(),
  google_sub: z.string().nullable(),
  last_login_at: TimestampSchema.nullable(),
  role_flags: z.number().int().default(0),
  preferences: JsonbSchema.optional().default({}),
  created_at: TimestampSchema,
  updated_at: TimestampSchema,
});
export type User = z.infer<typeof UserSchema>;

/**
 * @description 프로그램 스키마
 * @returns 프로그램 정보
 */
export const ProgramSchema = z.object({
  id: IdSchema,
  created_by_user_id: IdSchema,
  type: z.string().nullable(),
  title: z.string(),
  description: z.string().nullable(),
  ai_summary_tags: z.array(z.string()).optional().default([]),
  is_active: z.boolean().optional().default(true),
  created_at: TimestampSchema,
  updated_at: TimestampSchema,
});
export type Program = z.infer<typeof ProgramSchema>;

/**
 * @description 세션 상태 스키마
 */
export const SessionStatusSchema = z.enum(['SCHEDULED', 'CONFIRMED', 'CANCELLED', 'COMPLETED']);

/**
 * @description 세션 스키마
 * @returns 세션 정보
 */
export const SessionSchema = z.object({
  id: IdSchema,
  program_id: IdSchema,
  starts_at: TimestampSchema,
  ends_at: TimestampSchema,
  capacity: z.number().int().positive().nullable(),
  participant_fee: z.coerce.number().int().min(0).nullable(),
  status: SessionStatusSchema.optional().default('SCHEDULED'),
  room_reservation_id: IdSchema.nullable(),
  location_text: z.string().nullable(),
  created_at: TimestampSchema,
  updated_at: TimestampSchema,
});
export type Session = z.infer<typeof SessionSchema>;

/**
 * @description 장소 스키마
 * @returns 장소 정보
 */
export const VenueSchema = z.object({
  id: IdSchema,
  name: z.string(),
  address: z.string().nullable(),
  opening_hours: JsonbSchema.nullable(),
  blackout_rules: JsonbSchema.nullable(),
  created_at: TimestampSchema,
  updated_at: TimestampSchema,
});
export type Venue = z.infer<typeof VenueSchema>;

/**
 * @description 방 상태 스키마
 */
export const RoomStatusSchema = z.enum(['ACTIVE', 'INACTIVE', 'MAINTENANCE']);

/**
 * @description 방 스키마
 * @returns 방 정보
 */
export const RoomSchema = z.object({
  id: IdSchema,
  venue_id: IdSchema,
  name: z.string(),
  capacity: z.number().int().positive().nullable(),
  status: RoomStatusSchema.optional().default('ACTIVE'),
  created_at: TimestampSchema,
  updated_at: TimestampSchema,
});
export type Room = z.infer<typeof RoomSchema>;

/**
 * @description 룸 예약 상태 스키마
 */
export const ReservationStatusSchema = z.enum(['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED']);

/**
 * @description 룸 예약 스키마
 * @returns 룸 예약 정보
 */
export const RoomReservationSchema = z.object({
  id: IdSchema,
  room_id: IdSchema,
  user_id: IdSchema.nullable(),
  starts_at: TimestampSchema,
  ends_at: TimestampSchema,
  purpose: z.string().nullable(),
  status: ReservationStatusSchema.optional().default('PENDING'),
  meta: JsonbSchema.optional().default({}),
  session_id: IdSchema.nullable(),
  created_at: TimestampSchema,
  updated_at: TimestampSchema,
});
export type RoomReservation = z.infer<typeof RoomReservationSchema>;

/**
 * @description 참가자 역할 스키마
 */
export const ParticipantRoleSchema = z.enum(['HOST', 'ATTENDEE']);

/**
 * @description 참가자 상태 스키마
 */
export const ParticipantStatusSchema = z.enum(['APPLIED', 'CONFIRMED', 'CANCELLED', 'NO_SHOW']);

/**
 * @description 프로그램 참가자 스키마
 * @returns 참가자 정보
 */
export const ProgramParticipantSchema = z.object({
  id: IdSchema,
  session_id: IdSchema,
  user_id: IdSchema,
  role: ParticipantRoleSchema.optional().default('ATTENDEE'),
  status: ParticipantStatusSchema.optional().default('APPLIED'),
  joined_at: TimestampSchema.nullable(),
});
export type ProgramParticipant = z.infer<typeof ProgramParticipantSchema>;

/**
 * @description AI 상호작용 상태 스키마
 */
export const AIInteractionStatusSchema = z.enum(['OK', 'ERROR']);

/**
 * @description AI 상호작용 스키마
 * @returns AI 상호작용 정보
 */
export const AIInteractionSchema = z.object({
  id: IdSchema,
  user_id: IdSchema.nullable(),
  program_id: IdSchema.nullable(),
  session_id: IdSchema.nullable(),
  provider: z.string(),
  model: z.string(),
  kind: z.string(),
  prompt_tokens: z.coerce.number().int().min(0).optional().default(0),
  completion_tokens: z.coerce.number().int().min(0).optional().default(0),
  cost: z.coerce.number().min(0).optional().default(0),
  status: AIInteractionStatusSchema.optional().default('OK'),
  trace_id: z.string().nullable(),
  meta: JsonbSchema.optional().default({}),
  created_at: TimestampSchema,
});
export type AIInteraction = z.infer<typeof AIInteractionSchema>;

/**
 * @description 생성 DTO 타입들 (id, 생성·수정시각 제외)
 */
export type CreateUser = Omit<User, 'id' | 'created_at' | 'updated_at'>;
export type CreateProgram = Omit<Program, 'id' | 'created_at' | 'updated_at'>;
export type CreateSession = Omit<Session, 'id' | 'created_at' | 'updated_at'>;
export type CreateVenue = Omit<Venue, 'id' | 'created_at' | 'updated_at'>;
export type CreateRoom = Omit<Room, 'id' | 'created_at' | 'updated_at'>;
export type CreateRoomReservation = Omit<RoomReservation, 'id' | 'created_at' | 'updated_at'>;
export type CreateProgramParticipant = Omit<ProgramParticipant, 'id'>;
export type CreateAIInteraction = Omit<AIInteraction, 'id' | 'created_at'>;

/**
 * @description 업데이트 DTO 타입들 (선택적 필드)
 */
export type UpdateUser = Partial<Omit<CreateUser, 'google_sub'>>;
export type UpdateProgram = Partial<CreateProgram>;
export type UpdateSession = Partial<CreateSession>;
export type UpdateVenue = Partial<CreateVenue>;
export type UpdateRoom = Partial<CreateRoom>;
export type UpdateRoomReservation = Partial<CreateRoomReservation>;
export type UpdateProgramParticipant = Partial<
  Omit<CreateProgramParticipant, 'session_id' | 'user_id'>
>;

/**
 * @description 조회용 조인 타입들
 */
export type SessionWithProgram = Session & { program: Program };
export type SessionWithProgramAndVenue = Session & {
  program: Program;
  room_reservation?: RoomReservation & { room: Room & { venue: Venue } };
};
export type ProgramWithCreator = Program & {
  created_by_user: Pick<User, 'id' | 'name' | 'email'>;
};
export type RoomWithVenue = Room & { venue: Venue };
export type SessionWithParticipants = Session & {
  program: Program;
  participants: (ProgramParticipant & {
    user: Pick<User, 'id' | 'name' | 'email'>;
  })[];
};
export type RoomReservationWithDetails = RoomReservation & {
  room: Room & { venue: Venue };
  user?: Pick<User, 'id' | 'name' | 'email'>;
  session?: Session & { program: Program };
};

/**
 * @description HTTP 관련 공통 타입
 */
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

/**
 * @description 쿼리 파라미터
 */
export type QueryParams = Record<string, string | number | boolean | undefined>;

/**
 * @description 인증된 사용자 정보 (JWT 페이로드)
 */
export type AuthUser = Pick<User, 'id' | 'email' | 'name' | 'role_flags'>;

/**
 * @description Google OAuth 페이로드 정보
 */
export type GoogleOAuthPayload = {
  sub: string;
  email: string;
  name: string;
  picture?: string;
};

/**
 * @description 세션 가용성 타입
 */
export type SessionAvailability = {
  session_id: Id;
  available_spots: number;
  is_full: boolean;
  waiting_list_count?: number;
};

/**
 * @description 방 충돌 정보 타입
 */
export type RoomConflict = {
  room_id: Id;
  conflicting_reservations: Pick<RoomReservation, 'id' | 'starts_at' | 'ends_at' | 'purpose'>[];
  is_available: boolean;
};

/**
 * @description AI 사용 통계 타입
 */
export type AIUsageStats = {
  total_interactions: number;
  total_tokens: number;
  total_cost: number;
  by_provider: Record<string, { interactions: number; tokens: number; cost: number }>;
};
