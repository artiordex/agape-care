/**
 * [Type] 갤러리 카테고리 정의
 */
export type GalleryCategory = '활동' | '시설' | '행사' | '기타';

/**
 * [Type] 게시 상태 (어드민 관리용)
 */
export type GalleryStatus = '게시' | '숨김';

/**
 * [Interface] 갤러리 아이템 기본 프로토콜
 */
export interface GalleryItem {
  id: string;
  category: GalleryCategory;
  title: string;
  description: string;
  imageUrl: string; // 원본 이미지 경로
  thumbnailUrl: string; // 리스트용 썸네일 경로
  authorName: string;
  authorId: string;
  viewCount: number;
  status: GalleryStatus;
  createdAt: string;
  updatedAt: string;
}

/**
 * [Type] 등록/수정을 위한 폼 데이터 타입
 */
export type GalleryFormValues = Pick<GalleryItem, 'category' | 'title' | 'description' | 'status' | 'imageUrl'>;

/**
 * [Interface] 검색 및 필터링 조건 프로토콜
 */
export interface GalleryFilterType {
  category: GalleryCategory | '전체';
  searchType: 'title' | 'description' | 'author';
  searchKeyword: string;
  startDate?: string;
  endDate?: string;
}
