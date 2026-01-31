/**
 * [Type] 아가페 팝업 관리 데이터 프로토콜
 */

export type PopupStatus = '활성' | '비활성' | '예약';

export interface Popup {
  id: string;
  title: string;
  status: PopupStatus;
  startDate: string;
  endDate: string;
  imageUrl?: string;
  linkUrl?: string;
  priority: number; // 노출 순위
  position: {
    x: number; // 좌측에서부터 거리 (px)
    y: number; // 상단에서부터 거리 (px)
  };
  width: number; // 팝업 너비 (px)
  height: number; // 팝업 높이 (px)
  showOnce: boolean; // 하루동안 보지 않기 기능
  createdAt: string;
  updatedAt: string;
}

export interface PopupStats {
  total: number;
  active: number;
  inactive: number;
  scheduled: number;
}
