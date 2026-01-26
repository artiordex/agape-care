/**
 * @description 입소자 정보 및 생활실 목록 Mock 데이터
 */

export const mockResidents = [
  {
    id: 1,
    name: '김영희',
    room: '본관 101호',
    grade: '1등급',
    admissionDate: '2023-01-15',
    mainDiseases: ['치매', '고혈압', '당뇨'],
  },
  {
    id: 2,
    name: '박철수',
    room: '본관 102호',
    grade: '2등급',
    mainDiseases: ['파킨슨병', '고혈압'],
  },
  // ... (10번 조명희 님까지 통합)
];

export const mockRooms = [
  { id: '1', building: '본관', floor: '1층', room: '101호', status: 'available' },
  { id: '2', building: '본관', floor: '1층', room: '102호', status: 'occupied' },
]; // 시설 생활실 목록
