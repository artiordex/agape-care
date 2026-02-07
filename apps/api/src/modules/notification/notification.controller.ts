import { ApiResponse, EmailJobData, NotificationJobData, SmsJobData, notificationContract } from '@agape-care/api-contract';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { NotificationService } from './notification.service';

@ApiTags('Notification')
@Controller()
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @TsRestHandler(notificationContract.getNotificationQueue)
  async getNotificationQueue() {
    return tsRestHandler(notificationContract.getNotificationQueue, async ({ query }) => {
      const result = await this.notificationService.getNotificationQueue(query);

      return {
        status: 200,
        body: result,
      };
    });
  }

  @TsRestHandler(notificationContract.getNotificationSettings)
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
        status: 200,
        body: (result || defaultSettings) as any,
      };
    });
  }

  @TsRestHandler(notificationContract.updateNotificationSettings)
  async updateNotificationSettings() {
    return tsRestHandler(notificationContract.updateNotificationSettings, async ({ body }) => {
      const result = await this.notificationService.updateNotificationSettings(body);

      return {
        status: 200,
        body: result as any, // Cast to any to bypass strict schema check if it returns slightly different structure
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
  async sendNotification(@Body() data: any): Promise<ApiResponse<string>> {
    const jobData = data as NotificationJobData;
    const jobId = await this.notificationService.sendNotification(jobData);
    return {
      success: true,
      data: jobId || '',
      message: 'Notification job added to queue',
    };
  }
}
