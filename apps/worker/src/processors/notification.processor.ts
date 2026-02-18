/**
 * Description : notification.processor.ts - ?? processors ??? ? ?? ????
 * Author : Shiwoo Min
 * Date : 2026-02-18
 */

import { NotificationJobData } from '@agape-care/api-contract';
import { PrismaService } from '@agape-care/database';
import { logger } from '@agape-care/logger';
import { Job } from 'bullmq';

const db = new PrismaService();

/**
 * 인앱/푸시 알림 프로세서
 */
export const notificationProcessor = async (job: Job<NotificationJobData>) => {
  const { userId, title, body, logId } = job.data;
  const category = 'SYSTEM';

  logger.info(`[Notification] Processing job ${job.id} for user ${userId}`, { category });

  try {
    // 1. 발송 처리 (Push API, Socket.io 등 연동)
    // 실제로는 Firebase Cloud Messaging(FCM) 등을 사용합니다.
    const result = await mockPushProvider(userId, title, body);

    // 2. 발송 결과 업데이트
    if (logId) {
      await db.notificationQueue.update({
        where: { id: BigInt(logId) },
        data: {
          status: 'SENT',
          sentAt: new Date(),
          payload: {
            ...job.data,
            result,
          } as any,
        },
      });
    }

    logger.info(`[Notification] Sent successfully to user ${userId}`, { category });
    return result;
  } catch (error) {
    logger.error(`[Notification] Failed to send to user ${userId}`, { category, error });

    if (logId) {
      await db.notificationQueue.update({
        where: { id: BigInt(logId) },
        data: {
          status: 'FAILED',
          errorMessage: error instanceof Error ? error.message : String(error),
        },
      });
    }

    throw error;
  }
};

async function mockPushProvider(userId: string, title: string, body: string) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        success: true,
        pushToken: `token_${userId}`,
        platform: 'FCM',
      });
    }, 300);
  });
}
