/**
 * Description : main.ts - ?? src ?????? ???
 * Author : Shiwoo Min
 * Updated : 2026-02-18
 */

import { EmailJobData, NotificationJobData, QUEUE_NAMES, SmsJobData } from '@agape-care/api-contract';
import { logger } from '@agape-care/logger';
import { Queue, Worker } from 'bullmq';
import * as dotenv from 'dotenv';
import { Redis } from 'ioredis';
import path from 'node:path';
import { emailProcessor } from './processors/email.processor.js';
import { createInquiryProcessor } from './processors/inquiry.processor.js';
import { notificationProcessor } from './processors/notification.processor.js';
import { smsProcessor } from './processors/sms.processor.js';

// .env 로드
dotenv.config();
dotenv.config({ path: path.resolve(process.cwd(), '../../.env'), override: true });

// 서비스명 설정
logger.setLogLevel((process.env.LOG_LEVEL as any) || 'info');
const category = 'SYSTEM';

// Redis 연결 (BullMQ용 설정)
const connection = new Redis({
  host: process.env.REDIS_HOST || '127.0.0.1',
  port: Number(process.env.REDIS_PORT || 6379),
  password: process.env.REDIS_PASSWORD,
  db: Number(process.env.REDIS_DB || 0),
  maxRetriesPerRequest: null,
});

// 큐 인스턴스 (워커에서 다른 큐에 작업을 추가하기 위함)
const emailQueue = new Queue<EmailJobData>(QUEUE_NAMES.EMAIL, { connection });
const smsQueue = new Queue<SmsJobData>(QUEUE_NAMES.SMS, { connection });
const notificationQueue = new Queue<NotificationJobData>(QUEUE_NAMES.NOTIFICATION, { connection });

// 워커 등록
const notificationWorker = new Worker(QUEUE_NAMES.NOTIFICATION, notificationProcessor, { connection });
const smsWorker = new Worker(QUEUE_NAMES.SMS, smsProcessor, { connection });
const emailWorker = new Worker(QUEUE_NAMES.EMAIL, emailProcessor, { connection });
const inquiryWorker = new Worker(QUEUE_NAMES.INQUIRY, createInquiryProcessor(smsQueue, notificationQueue, emailQueue), { connection });

// 에러 핸들러
[notificationWorker, smsWorker, emailWorker, inquiryWorker].forEach(worker => {
  worker.on('failed', (job, err) => {
    logger.error(`${worker.name} Job Failed (${job?.id})`, { category, error: err });
  });
});

// 종료 처리
const cleanup = async () => {
  logger.info('Worker shutting down...', { category });
  await Promise.all([
    notificationWorker.close(),
    smsWorker.close(),
    emailWorker.close(),
    inquiryWorker.close(),
    emailQueue.close(),
    smsQueue.close(),
    notificationQueue.close(),
  ]);
  process.exit(0);
};

process.on('SIGTERM', cleanup);
process.on('SIGINT', cleanup);

// 시작 로그
logger.info(
  'Agape-Care Worker Started (BullMQ Consumers Ready)\n' +
    `Redis: ${process.env.REDIS_HOST || '127.0.0.1'}:${process.env.REDIS_PORT || 6379}`,
  { category },
);
