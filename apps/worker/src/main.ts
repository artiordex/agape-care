/**
 * Description : main.ts - 📌 Agape-Care Background Worker (BullMQ Consumer)
 * Author : Shiwoo Min
 * Updated : 2026-01-26
 */

import { QUEUE_NAMES } from '@agape-care/api-contract';
import { logger } from '@agape-care/logger';
import { Worker } from 'bullmq';
import * as dotenv from 'dotenv';
import { Redis } from 'ioredis';
import path from 'node:path';
import { emailProcessor } from './processors/email.processor';

// .env 로드
dotenv.config();
dotenv.config({ path: path.resolve(process.cwd(), '../../.env'), override: true });

// 서비스명 설정
logger.setLogLevel((process.env.LOG_LEVEL as any) || 'info');
const category = 'SYSTEM';

// 디버깅용 로그
logger.info('Environment Variables Check:', { category });
logger.info(`REDIS_HOST: ${process.env.REDIS_HOST}`, { category });
logger.info(`REDIS_PORT: ${process.env.REDIS_PORT}`, { category });
logger.info(`REDIS_PASSWORD: ${process.env.REDIS_PASSWORD ? '***' : 'undefined'}`, { category });

// Redis 연결 (BullMQ용 설정)
const connection = new Redis({
  host: process.env.REDIS_HOST || '127.0.0.1',
  port: Number(process.env.REDIS_PORT || 6379),
  password: process.env.REDIS_PASSWORD,
  db: Number(process.env.REDIS_DB || 0),
  maxRetriesPerRequest: null,
});

// 알림 처리
const notificationWorker = new Worker(
  QUEUE_NAMES.NOTIFICATION,
  async job => {
    logger.info(`[Notification] Job: ${job.name}`, {
      category: 'SYSTEM',
      metadata: { jobData: job.data },
    });
  },
  { connection },
);

// SMS 처리
const smsWorker = new Worker(
  QUEUE_NAMES.SMS,
  async job => {
    logger.info(`[SMS] Job: ${job.name}`, {
      category: 'SYSTEM',
      metadata: { jobData: job.data },
    });
  },
  { connection },
);

// 이메일 처리
const emailWorker = new Worker(QUEUE_NAMES.EMAIL, emailProcessor, { connection });

// 에러 핸들러
notificationWorker.on('failed', (job, err) => {
  logger.error(`Notification Job Failed (${job?.id})`, { category: 'SYSTEM', error: err });
});
smsWorker.on('failed', (job, err) => {
  logger.error(`SMS Job Failed (${job?.id})`, { category: 'SYSTEM', error: err });
});
emailWorker.on('failed', (job, err) => {
  logger.error(`Email Job Failed (${job?.id})`, { category: 'SYSTEM', error: err });
});

// 종료 처리
process.on('SIGTERM', async () => {
  logger.info('Worker shutting down...', { category });
  await Promise.all([notificationWorker.close(), smsWorker.close(), emailWorker.close()]);
  process.exit(0);
});

process.on('SIGINT', async () => {
  logger.info('Worker interrupted...', { category });
  await Promise.all([notificationWorker.close(), smsWorker.close(), emailWorker.close()]);
  process.exit(0);
});

// 시작 로그
logger.info(
  'Agape-Care Worker Started (BullMQ Consumers Ready)\n' +
    `Redis: ${process.env.REDIS_HOST || '127.0.0.1'}:${process.env.REDIS_PORT || 6379}`,
  { category },
);
