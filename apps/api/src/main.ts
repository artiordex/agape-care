/**
 * Description : main.ts - 📌 Minimal NestJS API bootstrap
 * Author : Shiwoo Min
 * Date : 2026-01-25
 * Updated : 2026-01-26
 */

import { NestLoggerAdapter } from '@agape-care/logger';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import 'dotenv/config';
import 'reflect-metadata';
import { AppModule } from './app.module';
import { validateEnv } from './config/env.validation';
import { setupSwagger } from './config/swagger.config';

async function bootstrap() {
  // 환경변수 검증
  validateEnv();

  // NestJS 애플리케이션 생성
  const app = await NestFactory.create(AppModule, {
    logger: new NestLoggerAdapter(),
  });

  // CORS 설정
  app.enableCors();

  // Global Prefix 설정
  app.setGlobalPrefix('api', {
    exclude: ['health'], // health check는 제외
  });

  // Global Validation Pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // DTO에 없는 속성 제거
      forbidNonWhitelisted: true, // DTO에 없는 속성 있으면 에러
      transform: true, // 자동 타입 변환
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Swagger 설정
  setupSwagger(app);

  // 기본 포트 설정 (환경변수 없으면 8000)
  const port = process.env.PORT ? Number(process.env.PORT) : 8000;

  // 서버 실행
  await app.listen(port);

  console.log(`Agape-Care API Server running on http://localhost:${port}`);
  console.log(`Swagger Documentation: http://localhost:${port}/api-docs`);
  console.log(`Health Check: http://localhost:${port}/health`);

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
