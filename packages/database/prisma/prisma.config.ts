/**
 * @description Prisma 설정 파일 (Prisma 7+)
 * @author Shiwoo Min
 * @date 2026-01-26
 */

export default {
  datasources: {
    db: {
      url: process.env.DATABASE_URL || 'postgresql://agape:agape@127.0.0.1:5432/agape_care',
    },
  },
};
