/**
 * Description : sms.processor.ts - ?? processors ??? ? ?? ????
 * Author : Shiwoo Min
 * Date : 2026-02-18
 */

import { SmsJobData } from '@agape-care/api-contract';
import { PrismaService } from '@agape-care/database';
import { logger } from '@agape-care/logger';
import { Job } from 'bullmq';

// Prisma 인스턴스 (워커에서 독립적으로 사용)
const db = new PrismaService();

/**
 * SNS(SMS/LMS/Alimtalk) 발송 프로세서
 */
export const smsProcessor = async (job: Job<SmsJobData>) => {
  const { to, body, logId } = job.data;
  const category = 'SYSTEM';

  logger.info(`[SMS] Processing job ${job.id} to ${to}`, { category });

  try {
    // 1. 발송 전처리 (필요시 DB 조회 등)
    // 예: 수신 거부 목록 확인, 잔액 확인 등

    // 2. 외부 API 연동 (Mock)
    // 실제 구현 시 알리고, CoolSMS 등의 SDK 또는 REST API 호출
    const result = await mockSmsProvider(to, body);

    // 3. 발송 결과 업데이트 (DB)
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

    logger.info(`[SMS] Sent successfully to ${to}`, { category });
    return result;
  } catch (error) {
    logger.error(`[SMS] Failed to send SMS to ${to}`, { category, error });

    // 실패 상태 업데이트
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

/**
 * Mock SMS Provider
 */
async function mockSmsProvider(to: string, body: string) {
  // 실제 외부 API 호출을 흉내냅니다.
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        success: true,
        messageId: `msg_${Math.random().toString(36).substr(2, 9)}`,
        provider: 'MOCK_PROVIDER',
      });
    }, 500);
  });
}
