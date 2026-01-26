/**
 * Description : main.ts - 📌 Minimal NestJS API bootstrap
 * Author : Shiwoo Min
 * Date : 2026-01-25
 * Updated : 2026-01-26
 */

import 'tsconfig-paths/register';
import { NestFactory } from '@nestjs/core';
import 'reflect-metadata';
import { AppModule } from './app.module';

async function bootstrap() {
  // NestJS 애플리케이션 생성
  const app = await NestFactory.create(AppModule);

  // 간단한 CORS 허용 (완전 기본)
  app.enableCors();

  // 기본 포트 설정 (환경변수 없으면 8000)
  const port = process.env.PORT ? Number(process.env.PORT) : 8000;

  // 서버 실행
  await app.listen(port);

  console.log(`Agape-Care API Server running on http://localhost:${port}`);

  // Graceful shutdown
  process.on('SIGTERM', async () => {
    console.log('SIGTERM received. Closing Nest application...');
    await app.close();
    process.exit(0);
  });

  process.on('SIGINT', async () => {
    console.log('SIGINT received. Closing Nest application...');
    await app.close();
    process.exit(0);
  });
}

bootstrap().catch(err => {
  console.error('NestJS bootstrap failed:', err);
  process.exit(1);
});
