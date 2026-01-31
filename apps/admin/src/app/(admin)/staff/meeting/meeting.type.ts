/**
 * [Type] 아가페 회의 관리 데이터 프로토콜
 */

// 1. 회의 유형 정의 (이미지 기반)
export type MeetingCategory = 'committee' | 'guardian' | 'custom';

// 2. 개별 회의 기록 인터페이스
export interface MeetingRecord {
  id: string;
  category: MeetingCategory;
  title: string; // 주제
  date: string; // 회의일시
  startTime: string;
  endTime: string;
  writer: string; // 작성자
  location: string; // 회의장소
  method: 'offline' | 'online'; // 회의방법
  participants: string[]; // 참석자 명단
  content: string; // 회의내용
  result?: string; // 회의결과 (보호자 소통용)

  // 운영위원회 전용 체크 리스트 (image_1097bc 참고)
  committeeOptions?: {
    staffOpinion: boolean; // 종사자 처우개선 의견수렴
    abusePrevention: boolean; // 노인학대예방 교육/의견
    treatmentReflected: boolean; // 종사자 처우개선 의견반영
  };

  attachments: { name: string; url: string }[];
  attendanceRate: number;
  status: '작성완료' | '미작성';
  quarter: 1 | 2 | 3 | 4; // 분기 정보
}

// 3. 대시보드 통계용 인터페이스
export interface MeetingDashboardStats {
  totalCount: number;
  completedCount: number;
  pendingCount: number;
}
