/**
 * Description : notification.controller.ts - ?? notification ??? API ????
 * Author : Shiwoo Min
 * Date : 2026-02-18
 */

import { ApiResponse, EmailJobData, NotificationJobData, SmsJobData, notificationContract } from '@agape-care/api-contract';
import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { NotificationService } from './notification.service';

@ApiTags('Additional-Services - Notification')
@ApiBearerAuth('JWT-auth')
@Controller()
@UseGuards(JwtAuthGuard)
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  // ─── 기존 구현 엔드포인트 ──────────────────────────────────────────

  @TsRestHandler(notificationContract.getNotificationQueue)
  @ApiOperation({ summary: '알림 큐 목록 조회', description: '알림 발송 큐 목록을 조회합니다.' })
  async getNotificationQueue() {
    return tsRestHandler(notificationContract.getNotificationQueue, async ({ query }: any) => {
      const result = await this.notificationService.getNotificationQueue(query);
      return {
        status: 200 as const,
        body: result,
      };
    });
  }

  @TsRestHandler(notificationContract.getNotificationSettings)
  @ApiOperation({ summary: '알림 설정 조회', description: '알림 발송 설정을 조회합니다.' })
  async getNotificationSettings() {
    return tsRestHandler(notificationContract.getNotificationSettings, async () => {
      const result = await this.notificationService.getNotificationSettings();
      const defaultSettings = {
        sms: { enabled: false },
        email: { enabled: false },
        push: { enabled: false },
        kakao: { enabled: false },
      };
      return {
        status: 200 as const,
        body: (result || defaultSettings) as any,
      };
    });
  }

  @TsRestHandler(notificationContract.updateNotificationSettings)
  @ApiOperation({ summary: '알림 설정 수정', description: '알림 발송 설정을 수정합니다.' })
  async updateNotificationSettings() {
    return tsRestHandler(notificationContract.updateNotificationSettings, async ({ body }: any) => {
      const result = await this.notificationService.updateNotificationSettings(body);
      return {
        status: 200 as const,
        body: result as any,
      };
    });
  }

  @Post('notifications/email')
  @ApiOperation({ summary: '이메일 발송 요청' })
  async sendEmail(@Body() data: any): Promise<ApiResponse<string>> {
    const jobData = data as EmailJobData;
    const jobId = await this.notificationService.sendEmail(jobData);
    return {
      success: true,
      data: jobId || '',
      message: 'Email job added to queue',
    };
  }

  @Post('notifications/sms')
  @ApiOperation({ summary: 'SMS 발송 요청' })
  async sendSms(@Body() data: any): Promise<ApiResponse<string>> {
    const jobData = data as SmsJobData;
    const jobId = await this.notificationService.sendSms(jobData);
    return {
      success: true,
      data: jobId || '',
      message: 'SMS job added to queue',
    };
  }

  @Post('notifications/push')
  @ApiOperation({ summary: '푸시 알림 발송 요청' })
  async sendNotificationRaw(@Body() data: any): Promise<ApiResponse<string>> {
    const jobData = data as NotificationJobData;
    const jobId = await this.notificationService.sendNotification(jobData);
    return {
      success: true,
      data: jobId || '',
      message: 'Notification job added to queue',
    };
  }

  // ─── 신규 구현 엔드포인트 (contract 연결) ─────────────────────────

  /**
   * POST /api/notifications/send — 단건 알림 전송
   */
  @TsRestHandler(notificationContract.sendNotification)
  @ApiOperation({ summary: '단건 알림 전송', description: '특정 사용자에게 단일 알림을 전송합니다.' })
  async sendNotification() {
    return tsRestHandler(notificationContract.sendNotification, async ({ body }: any) => {
      const jobId = await this.notificationService.sendNotification(body as any);
      return {
        status: 201 as const,
        body: { message: '알림이 전송되었습니다.', queueId: jobId || '' },
      };
    });
  }

  /**
   * POST /api/notifications/send-bulk — 대량 알림 전송
   */
  @TsRestHandler(notificationContract.sendBulkNotification)
  @ApiOperation({ summary: '대량 알림 전송', description: '여러 대상에게 한꺼번에 알림을 전송합니다.' })
  async sendBulkNotification() {
    return tsRestHandler(notificationContract.sendBulkNotification, async ({ body }: any) => {
      const result = await this.notificationService.sendBulkNotificationCampaign(body);
      return {
        status: 201 as const,
        body: result,
      };
    });
  }

  /**
   * GET /api/notifications/me — 내 알림 목록 조회
   */
  @TsRestHandler(notificationContract.getMyNotifications)
  @ApiOperation({ summary: '내 알림 목록 조회', description: '현재 로그인한 사용자의 알림 목록을 조회합니다.' })
  async getMyNotifications(@Request() req: any) {
    return tsRestHandler(notificationContract.getMyNotifications, async ({ query }: any) => {
      const result = await this.notificationService.getMyNotifications(req.user.id, query);
      return {
        status: 200 as const,
        body: result,
      };
    });
  }

  /**
   * POST /api/notifications/mark-read — 알림 읽음 처리
   */
  @TsRestHandler(notificationContract.markNotificationsRead)
  @ApiOperation({ summary: '알림 읽음 처리', description: '지정한 알림들을 읽음 상태로 변경합니다.' })
  async markNotificationsRead() {
    return tsRestHandler(notificationContract.markNotificationsRead, async ({ body }: any) => {
      const result = await this.notificationService.markNotificationsRead(body.notificationIds);
      return {
        status: 200 as const,
        body: result,
      };
    });
  }

  /**
   * POST /api/notifications/mark-all-read — 모든 알림 읽음 처리
   */
  @TsRestHandler(notificationContract.markAllNotificationsRead)
  @ApiOperation({ summary: '모든 알림 읽음 처리', description: '나의 모든 알림을 한꺼번에 읽음 상태로 변경합니다.' })
  async markAllNotificationsRead(@Request() req: any) {
    return tsRestHandler(notificationContract.markAllNotificationsRead, async () => {
      const result = await this.notificationService.markAllNotificationsRead(req.user.id);
      return {
        status: 200 as const,
        body: result,
      };
    });
  }

  /**
   * GET /api/notifications/recipients — 수신자 그룹 목록 조회
   */
  @TsRestHandler(notificationContract.getRecipientGroups)
  @ApiOperation({ summary: '수신자 그룹 목록 조회', description: '알림을 발송할 수 있는 수신자 그룹 목록을 조회합니다.' })
  async getRecipientGroups() {
    return tsRestHandler(notificationContract.getRecipientGroups, async ({ query }: any) => {
      const result = await this.notificationService.getRecipientGroups(query);
      return {
        status: 200 as const,
        body: result,
      };
    });
  }

  /**
   * POST /api/notifications/recipients — 수신자 그룹 생성
   */
  @TsRestHandler(notificationContract.createRecipientGroup)
  @ApiOperation({ summary: '수신자 그룹 생성', description: '새로운 알림 수신자 그룹을 만듭니다.' })
  async createRecipientGroup() {
    return tsRestHandler(notificationContract.createRecipientGroup, async ({ body }: any) => {
      const result = await this.notificationService.createRecipientGroup(body);
      return {
        status: 201 as const,
        body: result,
      };
    });
  }

  /**
   * GET /api/notifications/recipients/:id — 수신자 그룹 상세 조회
   */
  @TsRestHandler(notificationContract.getRecipientGroup)
  @ApiOperation({ summary: '수신자 그룹 상세 조회', description: '특정 수신자 그룹의 상세 정보(이름, 대상 등)를 조회합니다.' })
  async getRecipientGroup() {
    return tsRestHandler(notificationContract.getRecipientGroup, async ({ params }: any) => {
      const result = await this.notificationService.getRecipientGroup(Number(params.id));
      return {
        status: 200 as const,
        body: result,
      };
    });
  }

  /**
   * PATCH /api/notifications/recipients/:id — 수신자 그룹 수정
   */
  @TsRestHandler(notificationContract.updateRecipientGroup)
  @ApiOperation({ summary: '수신자 그룹 수정', description: '기존 수신자 그룹의 정보를 수정합니다.' })
  async updateRecipientGroup() {
    return tsRestHandler(notificationContract.updateRecipientGroup, async ({ params, body }: any) => {
      const result = await this.notificationService.updateRecipientGroup(Number(params.id), body);
      return {
        status: 200 as const,
        body: result,
      };
    });
  }

  /**
   * DELETE /api/notifications/recipients/:id — 수신자 그룹 삭제
   */
  @TsRestHandler(notificationContract.deleteRecipientGroup)
  @ApiOperation({ summary: '수신자 그룹 삭제', description: '더 이상 사용하지 않는 수신자 그룹을 삭제합니다.' })
  async deleteRecipientGroup() {
    return tsRestHandler(notificationContract.deleteRecipientGroup, async ({ params }: any) => {
      const result = await this.notificationService.deleteRecipientGroup(Number(params.id));
      return {
        status: 200 as const,
        body: result,
      };
    });
  }

  /**
   * GET /api/notifications/scheduled — 예약 발송 목록 조회
   */
  @TsRestHandler(notificationContract.getScheduledNotifications)
  @ApiOperation({ summary: '예약 발송 목록 조회', description: '앞으로 발송될 예정인 예약 알림 목록을 조회합니다.' })
  async getScheduledNotifications() {
    return tsRestHandler(notificationContract.getScheduledNotifications, async ({ query }: any) => {
      const result = await this.notificationService.getScheduledNotifications(query);
      return {
        status: 200 as const,
        body: result,
      };
    });
  }

  /**
   * POST /api/notifications/scheduled — 예약 발송 생성
   */
  @TsRestHandler(notificationContract.createScheduledNotification)
  @ApiOperation({ summary: '예약 발송 생성', description: '특정 시간에 알림이 발송되도록 예약을 등록합니다.' })
  async createScheduledNotification() {
    return tsRestHandler(notificationContract.createScheduledNotification, async ({ body }: any) => {
      const result = await this.notificationService.createScheduledNotification(body);
      return {
        status: 201 as const,
        body: result,
      };
    });
  }

  /**
   * POST /api/notifications/scheduled/:id/cancel — 예약 발송 취소
   */
  @TsRestHandler(notificationContract.cancelScheduledNotification)
  @ApiOperation({ summary: '예약 발송 취소', description: '등록된 예약 알림 발송을 취소합니다.' })
  async cancelScheduledNotification() {
    return tsRestHandler(notificationContract.cancelScheduledNotification, async ({ params }: any) => {
      const result = await this.notificationService.cancelScheduledNotification(params.id);
      return {
        status: 200 as const,
        body: result,
      };
    });
  }

  /**
   * DELETE /api/notifications/scheduled/:id — 예약 발송 삭제
   */
  @TsRestHandler(notificationContract.deleteScheduledNotification)
  @ApiOperation({ summary: '예약 발송 삭제', description: '예약된 알림 발송 내역을 삭제합니다.' })
  async deleteScheduledNotification() {
    return tsRestHandler(notificationContract.deleteScheduledNotification, async ({ params }: any) => {
      const result = await this.notificationService.deleteScheduledNotification(params.id);
      return {
        status: 200 as const,
        body: result,
      };
    });
  }
}
