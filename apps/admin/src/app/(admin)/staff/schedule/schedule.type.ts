// 근무 코드 타입
export type WorkCode = 'S' | 'A' | 'D' | 'E' | 'N' | '연' | '휴' | '공' | 'O' | '교육' | '출장' | '회의';

// 근무 규칙 설정
export interface ScheduleRule {
  // 기본 근무 패턴
  workPatterns: {
    dayShiftRatio: number; // 주간 근무 비율 (%)
    nightShiftRatio: number; // 야간 근무 비율 (%)
    offDayRatio: number; // 휴무일 비율 (%)
  };

  // 연속 근무 제한
  consecutiveWork: {
    maxConsecutiveDays: number; // 최대 연속 근무일
    minOffDays: number; // 최소 휴무일
    offDaysAfterNight: number; // 야간 근무 후 휴무
  };

  // 주말/공휴일 처리
  weekendHoliday: {
    weekendStaffCount: number; // 주말 근무 인원
    holidayRotation: boolean; // 공휴일 순번제
  };

  // 공평성 설정
  fairness: {
    balanceWorkload: boolean; // 근무량 균등 배분
    balanceNightShift: boolean; // 야간 근무 균등 배분
    balanceWeekend: boolean; // 주말 근무 균등 배분
  };
}

// 직원 선호도
export interface StaffPreference {
  staffId: string;
  preferredShifts: WorkCode[]; // 선호 근무 시간대
  unavailableDates: string[]; // 불가능한 날짜
  maxWorkDays?: number; // 최대 근무일
  minWorkDays?: number; // 최소 근무일
}

// 생성 결과
export interface GenerationResult {
  schedules: GeneratedSchedule[];
  statistics: GenerationStatistics;
  violations: RuleViolation[];
  score: number; // 0-100 점수
}

// 생성된 스케줄
export interface GeneratedSchedule {
  staffId: string;
  date: string;
  workType: WorkCode;
  startTime: string;
  endTime: string;
  breakTime: number;
  overtime: number;
  building: string;
  floor: string;
}

// 통계
export interface GenerationStatistics {
  totalSchedules: number;
  byStaff: {
    [staffId: string]: {
      workDays: number;
      totalHours: number;
      nightCount: number;
      weekendCount: number;
    };
  };
  byShift: {
    [shift: string]: number;
  };
}

// 규칙 위반
export interface RuleViolation {
  type: 'hard' | 'soft'; // 하드 제약 / 소프트 제약
  staffId: string;
  date: string;
  rule: string;
  message: string;
}

// 기본 규칙 설정
export const DEFAULT_RULES: ScheduleRule = {
  workPatterns: {
    dayShiftRatio: 60,
    nightShiftRatio: 20,
    offDayRatio: 20,
  },
  consecutiveWork: {
    maxConsecutiveDays: 5,
    minOffDays: 1,
    offDaysAfterNight: 1,
  },
  weekendHoliday: {
    weekendStaffCount: 3,
    holidayRotation: true,
  },
  fairness: {
    balanceWorkload: true,
    balanceNightShift: true,
    balanceWeekend: true,
  },
};
