/**
 * 자유게시판 카테고리 정의
 */
export type FreeBoardCategory = '일반' | '질문' | '정보' | '잡담';

/**
 * 게시글 상태 (어드민 관리용)
 */
export type FreeBoardStatus = '게시' | '숨김' | '삭제';

/**
 * 자유게시판 게시글 기본 인터페이스
 */
export interface FreeBoardPost {
  id: string; // 게시글 고유 ID
  category: FreeBoardCategory; // 카테고리
  title: string; // 제목
  content: string; // 내용 (HTML 스트링 포함)
  authorName: string; // 작성자 이름 (또는 닉네임)
  authorId: string; // 작성자 고유 ID
  viewCount: number; // 조회수
  commentCount: number; // 댓글 수
  status: FreeBoardStatus; // 게시 상태
  isNotice: boolean; // 상단 고정(공지) 여부
  createdAt: string; // 등록일 (ISO 8601)
  updatedAt: string; // 수정일 (ISO 8601)
}

/**
 * 게시글 생성/수정을 위한 데이터 타입
 * (Pick 또는 Partial을 사용하여 정의)
 */
export type FreeBoardFormValues = Pick<FreeBoardPost, 'category' | 'title' | 'content' | 'status' | 'isNotice'>;

/**
 * 테이블 목록 조회를 위한 필터 타입
 */
export interface FreeBoardFilter {
  category?: FreeBoardCategory | '전체';
  searchType: 'title' | 'author' | 'content';
  searchKeyword: string;
  startDate?: string;
  endDate?: string;
}
