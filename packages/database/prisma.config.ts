/**
 * @description Prisma 설정 파일 (Prisma 7+)
 * @author Shiwoo Min
 * @date 2026-02-07
 */

import { defineConfig } from 'prisma/config';

export default defineConfig({
  datasource: {
    url: process.env.DATABASE_URL || 'postgresql://agape:agape@127.0.0.1:5432/agape_care',
  },
});
