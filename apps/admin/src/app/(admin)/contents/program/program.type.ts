/**
 * [Type] 아가페 프로그램 관리 데이터 프로토콜
 */

export type ProgramCategory = '전체' | '인지활동' | '여가활동' | '물리치료' | '음악치료' | '미술활동' | '특별행사';

export interface Program {
  id: string;
  title: string; // 프로그램명
  category: ProgramCategory; // 카테고리
  date: string; // 날짜 (YYYY-MM-DD)
  time: string; // 시간 (HH:MM)
  duration: number; // 소요시간 (분)
  instructor: string; // 담당자
  location: string; // 장소
  participants: number; // 참여인원
  maxParticipants: number; // 최대인원
  recipientIds?: string[]; // 대상 수급자 ID 목록
  description: string; // 프로그램 설명
  status: '예정' | '진행중' | '완료' | '취소';
  color: string; // 캘린더 표시 색상
  createdAt: string;
  updatedAt: string;
}

export interface ProgramStats {
  total: number;
  scheduled: number;
  inProgress: number;
  completed: number;
  cancelled: number;
}
