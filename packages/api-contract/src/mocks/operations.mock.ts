/**
 * @description 시설 운영(CCTV, 차량, 자산) Mock 데이터
 * @author Shiwoo Min
 * @date 2026-01-27
 */

// CCTV 열람 기록
export const mockCctvLogs = [
  {
    id: 'LOG-001',
    viewerName: '김시설', // 시설장
    purpose: '보호자 요청 확인',
    location: '2층 복도 3번 카메라',
    viewedAt: '2026-01-27T10:30:00Z',
  },
];

// 시설 차량 관리
export const mockVehicles = [
  {
    id: 'VEH-001',
    model: '카니발',
    plateNumber: '12가 3456',
    status: 'AVAILABLE',
    lastServiceDate: '2025-12-15',
    manager: '박사무',
  },
];

// 자산 및 비품 재고 (회계 지출 내역 기반)
export const mockAssetInventory = [
  {
    id: 'ASSET-001',
    name: '성인용 기저귀',
    category: '위생용품',
    currentStock: 150,
    unit: '팩',
    lastRestockedAt: '2026-01-20', // 회계 전표 T017 기록 반영
  },
  {
    id: 'ASSET-002',
    name: '난방기',
    category: '시설 설비',
    status: 'NORMAL',
    lastRepairedAt: '2026-01-18', // 회계 전표 T016 기록 반영
  },
];
