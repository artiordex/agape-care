/**
 * Description : inquiry.processor.ts - ?? processors ??? ? ?? ????
 * Author : Shiwoo Min
 * Date : 2026-02-18
 */

import { EmailJobData, InquiryJobData, NotificationJobData, SmsJobData } from '@agape-care/api-contract';
import { logger } from '@agape-care/logger';
import { Job, Queue } from 'bullmq';

/**
 * 문의/예약 알림 통합 프로세서
 * - 관리자 푸시 알림
 * - 사용자 감사 문자 (SMS)
 * - 중요 문의의 경우 메일 발송
 */
export const createInquiryProcessor = (
  smsQueue: Queue<SmsJobData>,
  notificationQueue: Queue<NotificationJobData>,
  emailQueue: Queue<EmailJobData>,
) => {
  return async (job: Job<InquiryJobData>) => {
    const { inquiryId, type, name, phone, content, visitDate, visitTime } = job.data;
    const category = 'SYSTEM';

    logger.info(`[Inquiry] Processing ${type} inquiry ${inquiryId} from ${name}`, { category });

    try {
      const typeName = type === 'VISIT' ? '면회 예약' : '입소 상담';

      // 1. 관리자 실시간 푸시 알림 전송 (배치)
      await notificationQueue.add('admin-inquiry-push', {
        userId: 'admin', // 실제로는 관리자 그룹이나 특정 ID 조회 필요
        title: `🛎️ 새 ${typeName} 접수`,
        body: `${name}님의 ${typeName} 신청이 들어왔습니다. 내용을 확인해주세요.`,
        type: 'INFO',
      });

      // 2. 고객(보호자) 감사 문자 발송
      await smsQueue.add('user-thanks-sms', {
        to: phone,
        body: `[아가페케어] 안녕하세요 ${name}님, 신청하신 ${typeName}이 정상 접수되었습니다. 담당자가 확인 후 연락드리겠습니다.`,
      });

      // 3. 입소 상담(ADMISSION)의 경우 메일 알림 추가 발송
      if (type === 'ADMISSION') {
        await emailQueue.add('admission-inquiry-email', {
          to: process.env.ADMIN_EMAIL || 'admin@agape-care.com',
          subject: `[입소상담] ${name}님으로부터 상담 신청이 접수되었습니다.`,
          html: `
            <h3>신규 입소 상담 신청</h3>
            <p><b>성함:</b> ${name}</p>
            <p><b>연락처:</b> ${phone}</p>
            <p><b>상세내용:</b> ${content || '내용 없음'}</p>
            <hr/>
            <p>관리자 페이지에서 상세 내용을 확인하세요.</p>
          `,
        });
      }

      logger.info(`[Inquiry] All notifications queued for ${inquiryId}`, { category });
    } catch (error) {
      logger.error(`[Inquiry] Failed to process notifications for ${inquiryId}`, { category, error });
      throw error;
    }
  };
};
