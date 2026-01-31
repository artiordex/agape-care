/**
 * [로직] 아가페 근무 규칙 검증 엔진 (Schedule Rule Engine)
 * 법정 근로 기준 및 시설 운영 지침 준수 여부 정밀 판정
 */

import { ScheduleRule, GeneratedSchedule, RuleViolation } from '../schedule.type';

/**
 * 전사 근무표 유효성 정밀 검사 수행
 * @param assignments 생성된 스케줄 배열
 * @param rules 적용된 배정 규칙 프로토콜
 * @param staffList 대상 직원 마스터 정보
 */
export const validateSchedule = (
  assignments: GeneratedSchedule[],
  rules: ScheduleRule,
  staffList: any[],
): RuleViolation[] => {
  const violations: RuleViolation[] = [];

  // 날짜순 정렬을 통한 순차적 검증 수행
  const sortedAssignments = [...assignments].sort((a, b) => a.date.localeCompare(b.date));

  // 1. 직원별 개인 배정 규칙 준수 여부 검증
  staffList.forEach(staff => {
    const staffSchedule = sortedAssignments.filter(a => a.staffId === staff.id);

    let consecutiveCount = 0;

    staffSchedule.forEach((current, index) => {
      // 규칙 A: 최대 연속 근무일 위반 체크 (하드 제약)
      // '휴', '연', '공' 등 휴무 코드가 아닌 경우 근무일로 간주
      if (!['휴', '연', '공'].includes(current.workType)) {
        consecutiveCount++;

        if (consecutiveCount > rules.consecutiveWork.maxConsecutiveDays) {
          violations.push({
            type: 'hard',
            staffId: staff.id,
            date: current.date,
            rule: 'maxConsecutiveDays',
            message: `${staff.name} 직원: 법정 최대 연속 근무(${rules.consecutiveWork.maxConsecutiveDays}일) 상한을 초과하여 배정되었습니다.`,
          });
        }

        // 규칙 B: 야간 근무(N) 후 필수 휴식 보장 체크
        if (current.workType === 'N' && rules.consecutiveWork.offDaysAfterNight > 0) {
          const nextDays = staffSchedule.slice(index + 1, index + 1 + rules.consecutiveWork.offDaysAfterNight);
          const invalidNext = nextDays.find(n => !['휴', '연'].includes(n.workType));

          if (invalidNext) {
            violations.push({
              type: 'soft',
              staffId: staff.id,
              date: invalidNext.date,
              rule: 'offDaysAfterNight',
              message: `${staff.name} 직원: 야간 근무 후 필수 휴무(${rules.consecutiveWork.offDaysAfterNight}일) 권장 지침이 준수되지 않았습니다.`,
            });
          }
        }
      } else {
        // 휴무 조우 시 연속 근무 카운트 초기화
        consecutiveCount = 0;
      }
    });
  });

  // 2. 일자별 시설 운영 필수 인력 가동 검증
  const uniqueDates = Array.from(new Set(assignments.map(a => a.date)));

  uniqueDates.forEach(dateStr => {
    const date = new Date(dateStr);
    const isWeekend = date.getDay() === 0 || date.getDay() === 6; // 일요일(0), 토요일(6)

    if (isWeekend) {
      // 주말 가동 인원 산출 (휴무 인원 제외)
      const activeStaff = assignments.filter(a => a.date === dateStr && !['휴', '연'].includes(a.workType));

      // 규칙 C: 주말 최소 운영 인력 미달 체크
      if (activeStaff.length < rules.weekendHoliday.weekendStaffCount) {
        violations.push({
          type: 'hard',
          staffId: 'SYSTEM',
          date: dateStr,
          rule: 'weekendStaffCount',
          message: `${dateStr}(주말): 시설 최소 운영 인력(${rules.weekendHoliday.weekendStaffCount}명) 기준에 미달합니다. (현재: ${activeStaff.length}명)`,
        });
      }
    }
  });

  return violations;
};
