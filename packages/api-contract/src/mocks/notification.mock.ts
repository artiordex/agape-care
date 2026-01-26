/**
 * @description 알림 및 SMS 발송 이력 Mock 데이터
 * @author Shiwoo Min
 * @date 2026-01-27
 */

export const mockNotifications = [
  {
    id: 'NOTI-001',
    type: 'EMERGENCY',
    title: '긴급 상황 발생',
    content: '강영수 님 생활실 내 낙상 감지 센서 작동',
    targetRole: 'NURSE',
    isRead: false,
    createdAt: '2026-01-27T10:00:00Z',
  },
  {
    id: 'NOTI-002',
    type: 'SYSTEM',
    title: '시설 점검 안내',
    content: '금일 오후 2시 소방 시설 정기 점검 예정입니다.',
    targetRole: 'ALL',
    isRead: true,
    createdAt: '2026-01-27T09:00:00Z',
  },
];

export const mockSmsLogs = [
  {
    id: 'SMS-001',
    recipientName: '김철수', // 김영희 님 보호자
    recipientPhone: '010-2345-6789',
    content: '[아가페요양원] 김영희 님 금일 투약 및 식사 정상적으로 완료되었습니다.',
    status: 'SUCCESS',
    sentAt: '2026-01-27T11:00:00Z',
  },
  {
    id: 'SMS-002',
    recipientName: '박지훈', // 박순자 님 보호자
    recipientPhone: '010-5678-9012',
    content: '[아가페요양원] 박순자 님 보호자 간담회 일정 안내 드립니다.',
    status: 'PENDING',
    sentAt: '2026-01-27T13:00:00Z',
  },
];
