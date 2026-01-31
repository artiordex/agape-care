/**
 * [Type] 아가페 공지사항 데이터 프로토콜
 */
export type AnnouncementCategory = '일반' | '긴급' | '교육' | '행사' | '점검';

export interface Announcement {
  id: string; // 번호
  category: AnnouncementCategory; // 구분
  title: string; // 제목
  author: string; // 작성자
  createdAt: string; // 작성일
  views: number; // 조회
  content: string; // 본문 내용
  isPinned: boolean; // 상단 고정 여부
  attachments?: { name: string; url: string }[];
}
