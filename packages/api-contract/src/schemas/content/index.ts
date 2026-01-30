/**
 * @description Content 도메인 스키마 통합 Export
 * @author Shiwoo Min
 * @date 2026-01-26
 */

// 게시판 댓글 정보 (대댓글 포함)
export * from './board-comment.schema';

// 게시판 게시글 정보
export * from './board-post.schema';

// 갤러리 아이템 정보 (이벤트 사진 등)
export * from './gallery.schema';

// 공지사항 정보
export * from './notice.schema';

// 팝업 및 배너 관리 정보
export * from './popup-banner.schema';

// 웹사이트 일반 설정 정보 (JSON 설정 포함)
export * from './website-setting.schema';
