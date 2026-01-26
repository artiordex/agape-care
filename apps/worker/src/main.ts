/**
 * Description : main.ts - 📌 Agape-Care Background Worker (BullMQ Consumer)
 * Author : Shiwoo Min
 * Updated : 2026-01-26
 */

import { Worker } from 'bullmq';
import 'dotenv/config';
import { Redis } from 'ioredis';

// 디버깅용 로그
console.log('Environment Variables Check:');
console.log('REDIS_HOST:', process.env.REDIS_HOST);
console.log('REDIS_PORT:', process.env.REDIS_PORT);
console.log('REDIS_PASSWORD:', process.env.REDIS_PASSWORD ? '***' : 'undefined');

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
  'notification',
  async job => {
    console.log('[Notification] Job:', job.name, job.data);
  },
  { connection },
);

// SMS 처리
const smsWorker = new Worker(
  'sms',
  async job => {
    console.log('[SMS] Job:', job.name, job.data);
  },
  { connection },
);

// 이메일 처리
const emailWorker = new Worker(
  'email',
  async job => {
    console.log('[Email] Job:', job.name, job.data);
  },
  { connection },
);

// 에러 핸들러
notificationWorker.on('failed', (job, err) => {
  console.error(`Notification Job Failed (${job?.id}):`, err);
});
smsWorker.on('failed', (job, err) => {
  console.error(`SMS Job Failed (${job?.id}):`, err);
});
emailWorker.on('failed', (job, err) => {
  console.error(`Email Job Failed (${job?.id}):`, err);
});

// 종료 처리
process.on('SIGTERM', async () => {
  console.log('Worker shutting down...');
  await Promise.all([notificationWorker.close(), smsWorker.close(), emailWorker.close()]);
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('Worker interrupted...');
  await Promise.all([notificationWorker.close(), smsWorker.close(), emailWorker.close()]);
  process.exit(0);
});

// 시작 로그
console.log(
  'Agape-Care Worker Started (BullMQ Consumers Ready)\n' +
    `Redis: ${process.env.REDIS_HOST || '127.0.0.1'}:${process.env.REDIS_PORT || 6379}\n`,
);
