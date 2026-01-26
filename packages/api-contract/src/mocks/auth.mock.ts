/**
 * @description 인증 및 세션 Mock 데이터
 */

export const mockCurrentUser = {
  id: 'E003',
  email: 'admin@agape.com',
  name: '김시설', // 이미지 하단 관리자 이름 반영
  role: '시설장',
  isAdmin: true,
  lastLoginAt: '2026-01-27T00:56:00Z',
};

export const mockAuthTokens = {
  accessToken: 'mock-access-token-123',
  refreshToken: 'mock-refresh-token-456',
};
