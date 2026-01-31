/**
 * [로직] 아가페 지능형 근무 배정 엔진 (Schedule Generator)
 * 고딕체 기반 ERP 시스템의 핵심 배정 프로토콜
 */

import {
  WorkCode,
  ScheduleRule,
  GeneratedSchedule,
  GenerationResult,
  StaffPreference,
  RuleViolation,
  GenerationStatistics,
} from '../schedule.type';

// 1. 근무 코드별 상세 운영 시간 정의 (Agape Standard v4.2)
const WORK_CODE_HOURS: Record<string, { hours: number; start: string; end: string }> = {
  S: { hours: 12, start: '07:00', end: '19:00' },
  A: { hours: 9, start: '09:00', end: '18:00' },
  D: { hours: 9, start: '07:00', end: '16:00' },
  E: { hours: 9, start: '11:00', end: '20:00' },
  N: { hours: 12, start: '20:00', end: '08:00' },
  연: { hours: 8, start: '00:00', end: '00:00' },
  휴: { hours: 0, start: '00:00', end: '00:00' },
  공: { hours: 8, start: '00:00', end: '00:00' },
  O: { hours: 4, start: '09:00', end: '13:00' },
};

export class ScheduleGenerator {
  private rules: ScheduleRule;
  private staffList: any[];
  private startDate: Date;
  private endDate: Date;
  private preferences: Map<string, StaffPreference>;
  private building: string;
  private floor: string;

  constructor(
    rules: ScheduleRule,
    staffList: any[],
    startDate: Date,
    endDate: Date,
    building: string,
    floor: string,
    preferences: StaffPreference[] = [],
  ) {
    this.rules = rules;
    this.staffList = staffList;
    this.startDate = startDate;
    this.endDate = endDate;
    this.building = building;
    this.floor = floor;
    this.preferences = new Map(preferences.map(p => [p.staffId, p]));
  }

  /**
   * [메인] 근무표 자동 생성 가동
   * 날짜별 순회 배정 후 통계 및 유효성 검증 수행
   */
  generate(): GenerationResult {
    const schedules: GeneratedSchedule[] = [];
    const violations: RuleViolation[] = [];

    // 1. 날짜별 루프 가동 및 배정 알고리즘 실행
    const currentDate = new Date(this.startDate);
    while (currentDate <= this.endDate) {
      const dateStr = this.formatDate(currentDate);
      const dayOfWeek = currentDate.getDay();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

      // 해당 날짜 전체 직원 노드 배치
      for (const staff of this.staffList) {
        const schedule = this.assignShift(staff, dateStr, isWeekend, schedules);
        if (schedule) {
          schedules.push(schedule);
        }
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    // 2. 결과 정밀 분석 및 행정 통계 산출
    const statistics = this.calculateStatistics(schedules);
    const validationViolations = this.validateSchedules(schedules);
    violations.push(...validationViolations);

    return {
      schedules,
      statistics,
      violations,
      score: this.calculateScore(schedules, violations),
    };
  }

  /**
   * [내부] 개별 근무 배치 로직 (하드 제약 조건 상시 검사)
   */
  private assignShift(
    staff: any,
    date: string,
    isWeekend: boolean,
    existingSchedules: GeneratedSchedule[],
  ): GeneratedSchedule | null {
    const preference = this.preferences.get(staff.id);

    // 규칙 A. 개인 선호도 및 지정 휴무일 확인
    if (preference?.unavailableDates.includes(date)) {
      return this.createSchedule(staff.id, date, '휴');
    }

    const recentSchedules = this.getRecentSchedules(staff.id, date, existingSchedules);
    const consecutiveDays = this.getConsecutiveWorkDays(recentSchedules);
    const lastShift = recentSchedules[recentSchedules.length - 1];

    // 규칙 B. 법정/시설 최대 연속 근무 제한 확인
    if (consecutiveDays >= this.rules.consecutiveWork.maxConsecutiveDays) {
      return this.createSchedule(staff.id, date, '휴');
    }

    // 규칙 C. 야간 근무 후 필수 휴식 보장 확인
    if (lastShift?.workType === 'N' && this.rules.consecutiveWork.offDaysAfterNight > 0) {
      return this.createSchedule(staff.id, date, '휴');
    }

    // 규칙 D. 주말/공휴일 최소 가동 인력 통제
    if (isWeekend) {
      const weekendWorkers = existingSchedules.filter(
        s => s.date === date && !['휴', '연'].includes(s.workType),
      ).length;

      if (weekendWorkers >= this.rules.weekendHoliday.weekendStaffCount) {
        return this.createSchedule(staff.id, date, '휴');
      }
    }

    // 규칙 E. 근무 패턴 배분 알고리즘 실행
    const workType = this.selectWorkType(staff, recentSchedules, isWeekend);
    return this.createSchedule(staff.id, date, workType as WorkCode);
  }

  /**
   * [내부] 근무 유형 결정 알고리즘 (확률 및 가중치 기반)
   */
  private selectWorkType(staff: any, recentSchedules: GeneratedSchedule[], isWeekend: boolean): string {
    const preference = this.preferences.get(staff.id);

    // 1순위: 개인 선호 근무 반영
    if (preference?.preferredShifts && preference.preferredShifts.length > 0) {
      return preference.preferredShifts[Math.floor(Math.random() * preference.preferredShifts.length)];
    }

    // 2순위: 주말 운영 모드 (주간/단축 우선)
    if (isWeekend) return Math.random() < 0.7 ? 'D' : 'A';

    // 3순위: 야간 근무 밸런싱 (최근 이력 기반)
    const recentNightCount = recentSchedules.filter(s => s.workType === 'N').length;
    if (recentNightCount < 2 && Math.random() < this.rules.workPatterns.nightShiftRatio / 100) {
      return 'N';
    }

    // 4순위: 기본 주간 배분 (D/A/E 가중 배분)
    const rand = Math.random();
    if (rand < 0.4) return 'A';
    if (rand < 0.7) return 'D';
    return 'E';
  }

  private createSchedule(staffId: string, date: string, workType: WorkCode): GeneratedSchedule {
    const timeInfo = WORK_CODE_HOURS[workType] || { start: '09:00', end: '18:00' };
    return {
      staffId,
      date,
      workType,
      startTime: timeInfo.start,
      endTime: timeInfo.end,
      breakTime: ['휴', '연'].includes(workType) ? 0 : 60,
      overtime: 0,
      building: this.building,
      floor: this.floor,
    };
  }

  private getRecentSchedules(
    staffId: string,
    currentDate: string,
    schedules: GeneratedSchedule[],
  ): GeneratedSchedule[] {
    return schedules
      .filter(s => s.staffId === staffId && s.date < currentDate)
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(-7);
  }

  private getConsecutiveWorkDays(schedules: GeneratedSchedule[]): number {
    let count = 0;
    for (let i = schedules.length - 1; i >= 0; i--) {
      if (['휴', '연'].includes(schedules[i].workType)) break;
      count++;
    }
    return count;
  }

  private calculateStatistics(schedules: GeneratedSchedule[]): GenerationStatistics {
    const byStaff: any = {};
    const byShift: any = {};

    for (const schedule of schedules) {
      if (!byStaff[schedule.staffId]) {
        byStaff[schedule.staffId] = { workDays: 0, totalHours: 0, nightCount: 0, weekendCount: 0 };
      }

      const hours = WORK_CODE_HOURS[schedule.workType]?.hours || 0;
      if (hours > 0) {
        byStaff[schedule.staffId].workDays++;
        byStaff[schedule.staffId].totalHours += hours;
      }
      if (schedule.workType === 'N') byStaff[schedule.staffId].nightCount++;

      const date = new Date(schedule.date);
      if ((date.getDay() === 0 || date.getDay() === 6) && !['휴', '연'].includes(schedule.workType)) {
        byStaff[schedule.staffId].weekendCount++;
      }
      byShift[schedule.workType] = (byShift[schedule.workType] || 0) + 1;
    }

    return { totalSchedules: schedules.length, byStaff, byShift };
  }

  private validateSchedules(schedules: GeneratedSchedule[]): RuleViolation[] {
    const violations: RuleViolation[] = [];
    for (const staff of this.staffList) {
      const staffSchedules = schedules.filter(s => s.staffId === staff.id).sort((a, b) => a.date.localeCompare(b.date));
      let consecutiveDays = 0;

      staffSchedules.forEach((schedule, i) => {
        if (!['휴', '연'].includes(schedule.workType)) {
          consecutiveDays++;
          if (consecutiveDays > this.rules.consecutiveWork.maxConsecutiveDays) {
            violations.push({
              type: 'hard',
              staffId: staff.id,
              date: schedule.date,
              rule: 'maxConsecutiveDays',
              message: `${staff.name} 직원: 연속 ${consecutiveDays}일 근무 (최대 ${this.rules.consecutiveWork.maxConsecutiveDays}일 상한 초과)`,
            });
          }
        } else {
          consecutiveDays = 0;
        }

        if (schedule.workType === 'N' && i < staffSchedules.length - 1) {
          const next = staffSchedules[i + 1];
          if (!['휴', '연'].includes(next.workType)) {
            violations.push({
              type: 'soft',
              staffId: staff.id,
              date: next.date,
              rule: 'offDaysAfterNight',
              message: `${staff.name} 직원: 야간 근무 후 익일 휴무 권장 지침 미준수`,
            });
          }
        }
      });
    }
    return violations;
  }

  private calculateScore(schedules: GeneratedSchedule[], violations: RuleViolation[]): number {
    let score = 100;
    score -= violations.filter(v => v.type === 'hard').length * 10;
    score -= violations.filter(v => v.type === 'soft').length * 2;

    if (this.rules.fairness.balanceWorkload) {
      const stats = this.calculateStatistics(schedules);
      const workDays = Object.values(stats.byStaff).map((s: any) => s.workDays);
      const variance = this.calculateVariance(workDays);
      score -= Math.min(variance * 0.5, 20);
    }
    return Math.max(0, Math.min(100, score));
  }

  private calculateVariance(numbers: number[]): number {
    const mean = numbers.reduce((a, b) => a + b, 0) / numbers.length;
    return numbers.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / numbers.length;
  }

  private formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }
}
