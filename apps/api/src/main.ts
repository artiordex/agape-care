/**
 * Description : main.ts - ?? src ?????? ???
 * Author : Shiwoo Min
 * Date : 2026-01-25
 * Updated : 2026-01-26
 */

import { logger, NestLoggerAdapter } from '@agape-care/logger';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import path from 'node:path';
import 'reflect-metadata';
import { AppModule } from './app.module';
import { validateEnv } from './config/env.validation';
import { setupSwagger } from './config/swagger.config';
import { HttpExceptionFilter } from './modules/common/filters/http-exception.filter';
import { PrismaClientExceptionFilter } from './modules/common/filters/prisma-exception.filter';
import { LoggingInterceptor } from './modules/common/interceptors/logging.interceptor';
import { TransformInterceptor } from './modules/common/interceptors/transform.interceptor';

// .env 로드 (로컬 또는 루트)
const rootEnvPath = path.resolve(process.cwd(), '../../.env');
dotenv.config({ override: true }); // 로컬 .env
dotenv.config({ path: rootEnvPath, override: true }); // 모노레포 루트 .env

async function bootstrap() {
  // 환경변수 로드 확인 로그
  logger.info(`Loading environment from: ${process.cwd()}`, { category: 'SYSTEM' });
  logger.info(`Root .env path: ${path.resolve(process.cwd(), '../../.env')}`, { category: 'SYSTEM' });

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

  // Global Filters
  app.useGlobalFilters(new HttpExceptionFilter(), new PrismaClientExceptionFilter());

  // Global Interceptors
  app.useGlobalInterceptors(new LoggingInterceptor(), new TransformInterceptor());

  // Swagger 설정
  setupSwagger(app);

  // 기본 포트 설정 (환경변수 없으면 8000)
  const port = process.env.PORT ? Number(process.env.PORT) : 8000;

  // 서버 실행
  await app.listen(port);

  logger.info(`Agape-Care API Server running on http://localhost:${port}`, { category: 'SYSTEM' });
  logger.info(`Swagger Documentation: http://localhost:${port}/api-docs`, { category: 'SYSTEM' });
  logger.info(`Health Check: http://localhost:${port}/health`, { category: 'SYSTEM' });

  // Graceful shutdown
  process.on('SIGTERM', async () => {
    logger.info('SIGTERM received. Closing Nest application...', { category: 'SYSTEM' });
    await app.close();
    process.exit(0);
  });

  process.on('SIGINT', async () => {
    logger.info('SIGINT received. Closing Nest application...', { category: 'SYSTEM' });
    await app.close();
    process.exit(0);
  });
}

bootstrap().catch(err => {
  logger.error('NestJS bootstrap failed', { category: 'SYSTEM', error: err });
  process.exit(1);
});
