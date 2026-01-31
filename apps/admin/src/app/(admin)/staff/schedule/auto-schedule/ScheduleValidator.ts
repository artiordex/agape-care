/**
 * [로직] 아가페 근무 유효성 정밀 검증 엔진 (Schedule Validator)
 * 법정 근로 기준 및 시설 운영 지침 준수 여부 최종 감사 프로토콜
 */

import { GeneratedSchedule, ScheduleRule, RuleViolation, WorkCode } from '../schedule.type';

export class ScheduleValidator {
  private schedules: GeneratedSchedule[];
  private rules: ScheduleRule;
  private staffList: any[];

  constructor(schedules: GeneratedSchedule[], rules: ScheduleRule, staffList: any[]) {
    this.schedules = schedules;
    this.rules = rules;
    this.staffList = staffList;
  }

  /**
   * [메인] 전사 근무표 통합 유효성 검사 실행
   * 모든 인력 및 일자별 규칙 준수 여부를 전수 조사합니다.
   */
  validateAll(): RuleViolation[] {
    const violations: RuleViolation[] = [];

    // 1. 직원별 개인 근무 규칙 검증 (연속 근무, 야간 휴식 등)
    this.staffList.forEach(staff => {
      violations.push(...this.checkStaffIndividualRules(staff));
    });

    // 2. 일자별 운영 규칙 검증 (시설 가동 최소 인력 등)
    violations.push(...this.checkDailyOperationalRules());

    return violations;
  }

  /**
   * [내부] 직원별 개인 배정 규칙 준수 여부 진단
   * 개별 인력의 근무 이력을 추적하여 법적 제약 위반을 탐지합니다.
   */
  private checkStaffIndividualRules(staff: any): RuleViolation[] {
    const violations: RuleViolation[] = [];
    const staffSchedules = this.schedules
      .filter(s => s.staffId === staff.id)
      .sort((a, b) => a.date.localeCompare(b.date));

    let consecutiveWorkDays = 0;

    staffSchedules.forEach((current, index) => {
      // A. 최대 연속 근무일 제한 검사 (하드 제약)
      if (this.isWorkDay(current.workType)) {
        consecutiveWorkDays++;
        if (consecutiveWorkDays > this.rules.consecutiveWork.maxConsecutiveDays) {
          violations.push({
            type: 'hard',
            staffId: staff.id,
            date: current.date,
            rule: 'maxConsecutiveDays',
            message: `${staff.name} 직원: 법정 최대 연속 근무(${this.rules.consecutiveWork.maxConsecutiveDays}일)를 초과하여 배정되었습니다.`,
          });
        }
      } else {
        // 휴무 또는 연차 시 카운트 초기화
        consecutiveWorkDays = 0;
      }

      // B. 야간 근무 후 최소 휴무 보장 검사 (소프트 제약 권고)
      if (current.workType === 'N' && index < staffSchedules.length - 1) {
        const nextDay = staffSchedules[index + 1];
        // 야간 근무 바로 다음 날 휴무('휴', '연' 등)가 배정되지 않은 경우 탐지
        if (this.isWorkDay(nextDay.workType) && this.rules.consecutiveWork.offDaysAfterNight > 0) {
          violations.push({
            type: 'soft',
            staffId: staff.id,
            date: nextDay.date,
            rule: 'offDaysAfterNight',
            message: `${staff.name} 직원: 야간 근무(N) 직후에는 충분한 휴식(비번) 배정을 강력히 권장합니다.`,
          });
        }
      }
    });

    return violations;
  }

  /**
   * [내부] 시설 전체 운영 지침 및 최소 인력 가동 여부 진단
   */
  private checkDailyOperationalRules(): RuleViolation[] {
    const violations: RuleViolation[] = [];
    const uniqueDates = Array.from(new Set(this.schedules.map(s => s.date)));

    uniqueDates.forEach(dateStr => {
      const date = new Date(dateStr);
      const isWeekend = date.getDay() === 0 || date.getDay() === 6; // 일요일(0), 토요일(6)

      // 해당 날짜의 실제 가동 인원 산출 (휴무/연차 제외)
      const activeStaffOnDate = this.schedules.filter(s => s.date === dateStr && this.isWorkDay(s.workType));

      // C. 주말/공휴일 최소 운영 인력 미달 검사
      if (isWeekend && activeStaffOnDate.length < this.rules.weekendHoliday.weekendStaffCount) {
        violations.push({
          type: 'hard',
          staffId: 'SYSTEM',
          date: dateStr,
          rule: 'weekendStaffCount',
          message: `${dateStr}(주말): 시설 최소 가동 인원(${this.rules.weekendHoliday.weekendStaffCount}명) 요건이 충족되지 않았습니다. (현재: ${activeStaffOnDate.length}명)`,
        });
      }
    });

    return violations;
  }

  /**
   * [유틸리티] 실제 근무일 여부 판정 노드
   * 휴무, 연차, 공휴일 등 배정 제외 코드를 필터링합니다.
   */
  private isWorkDay(code: WorkCode): boolean {
    const offCodes: WorkCode[] = ['휴', '연', '공'];
    return !offCodes.includes(code);
  }
}
