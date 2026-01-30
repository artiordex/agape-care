import { EmailJobData, GetNotificationQueueQuery, NotificationJobData, QUEUE_NAMES, SmsJobData } from '@agape-care/api-contract';
import { PrismaService } from '@agape-care/database';
import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';

@Injectable()
export class NotificationService {
  constructor(
    @InjectQueue(QUEUE_NAMES.EMAIL) private readonly emailQueue: Queue<EmailJobData>,
    @InjectQueue(QUEUE_NAMES.SMS) private readonly smsQueue: Queue<SmsJobData>,
    @InjectQueue(QUEUE_NAMES.NOTIFICATION) private readonly notificationQueue: Queue<NotificationJobData>,
    private readonly db: PrismaService,
  ) {}

  /**
   * 알림 큐 목록 조회
   */
  async getNotificationQueue(query: GetNotificationQueueQuery) {
    const { page, limit, channel, status, targetType, startDate, endDate } = query;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (channel) where.channel = channel;
    if (status) where.status = status;
    if (targetType) where.targetType = targetType;
    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) where.createdAt.gte = new Date(startDate);
      if (endDate) where.createdAt.lte = new Date(endDate);
    }

    const [total, items] = await Promise.all([
      this.db.notificationQueue.count({ where }),
      this.db.notificationQueue.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    return {
      data: items.map(item => ({
        ...item,
        channel: item.channel as any,
        targetType: item.targetType as any,
        status: item.status as any,
        id: item.id.toString(),
        targetId: item.targetId?.toString() || null,
        sentAt: item.sentAt?.toISOString() || null,
        scheduledAt: item.scheduledAt.toISOString(),
        createdAt: item.createdAt.toISOString(),
        payload: item.payload as Record<string, unknown>,
      })),
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * 이메일 발송 요청
   */
  async sendEmail(data: EmailJobData) {
    // DB 로그 생성
    const log = await this.db.notificationQueue.create({
      data: {
        channel: 'EMAIL',
        targetType: 'EMPLOYEE', // 기본값, 필요시 data에서 추출
        title: data.subject,
        body: data.html || data.text,
        payload: data as any,
        status: 'PENDING',
      },
    });

    // 작업 ID를 이메일+타임스탬프로 생성하거나 자동 생성
    const job = await this.emailQueue.add(
      'send-email',
      { ...data, logId: log.id.toString() },
      {
        attempts: 3,
        backoff: {
          type: 'exponential',
          delay: 5000,
        },
        removeOnComplete: true,
      },
    );
    return job.id;
  }

  /**
   * SMS 발송 요청
   */
  async sendSms(data: SmsJobData) {
    // DB 로그 생성
    const log = await this.db.notificationQueue.create({
      data: {
        channel: 'SMS',
        targetType: 'EMPLOYEE', // 기본값
        body: data.body,
        payload: data as any,
        status: 'PENDING',
      },
    });

    const job = await this.smsQueue.add(
      'send-sms',
      { ...data, logId: log.id.toString() },
      {
        attempts: 3,
        removeOnComplete: true,
      },
    );
    return job.id;
  }

  /**
   * 인앱/푸시 알림 요청
   */
  async sendNotification(data: NotificationJobData) {
    // DB 로그 생성
    const log = await this.db.notificationQueue.create({
      data: {
        channel: 'PUSH', // 또는 INAPP
        targetType: 'EMPLOYEE', // 기본값
        title: data.title,
        body: data.body,
        payload: data as any,
        status: 'PENDING',
      },
    });

    const job = await this.notificationQueue.add(
      'send-notification',
      { ...data, logId: log.id.toString() },
      {
        attempts: 3,
        removeOnComplete: true,
      },
    );
    return job.id;
  }

  /**
   * 알림 설정 조회
   */
  async getNotificationSettings() {
    const setting = await this.db.systemSetting.findUnique({
      where: { key: 'NOTIFICATION_CONFIG' },
    });

    if (!setting) {
      // 기본값 반환
      return {
        sms: { enabled: false, senderPhone: '' },
        email: { enabled: false, senderName: '', senderEmail: '' },
        push: { enabled: false },
      };
    }

    return setting.value;
  }

  /**
   * 알림 설정 수정
   */
  async updateNotificationSettings(data: any) {
    const setting = await this.db.systemSetting.upsert({
      where: { key: 'NOTIFICATION_CONFIG' },
      update: { value: data },
      create: {
        key: 'NOTIFICATION_CONFIG',
        value: data,
        description: '알림 발송 설정 (SMS, Email, Push 등)',
      },
    });

    return setting.value;
  }
}
