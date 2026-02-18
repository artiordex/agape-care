/**
 * Description : notification.service.ts - ?? notification ??? ???? ?? ???
 * Author : Shiwoo Min
 * Date : 2026-02-18
 */

import {
  CreateRecipientGroupRequest,
  CreateScheduledNotificationRequest,
  EmailJobData,
  GetNotificationQueueQuery,
  GetUserNotificationsQuery,
  NotificationJobData,
  QUEUE_NAMES,
  RecipientGroupListQuery,
  ScheduledNotificationListQuery,
  SendBulkNotificationRequest,
  SmsJobData,
  UpdateRecipientGroupRequest,
} from '@agape-care/api-contract';
import { PrismaService } from '@agape-care/database';
import { InjectQueue } from '@nestjs/bullmq';
import { Injectable, NotFoundException } from '@nestjs/common';
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

  // ─────────────────────────────────────────────────────────────────
  // 수신자 그룹 CRUD
  // ─────────────────────────────────────────────────────────────────

  /**
   * 수신자 그룹 목록 조회
   */
  async getRecipientGroups(query: RecipientGroupListQuery) {
    const { page = 1, limit = 10, type, status, search } = query;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (type) where.type = type;
    if (status) where.status = status;
    if (search) where.name = { contains: search, mode: 'insensitive' };

    const [total, items] = await Promise.all([
      this.db.recipientGroup.count({ where }),
      this.db.recipientGroup.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    return {
      data: items.map((item: any) => ({
        ...item,
        id: Number(item.id),
        type: item.type as any,
        status: item.status as any,
        lastUsedAt: item.lastUsedAt?.toISOString() || null,
        createdBy: item.createdBy?.toString(),
        createdAt: item.createdAt.toISOString(),
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
   * 수신자 그룹 생성
   */
  async createRecipientGroup(data: CreateRecipientGroupRequest) {
    const item = await this.db.recipientGroup.create({
      data: {
        name: data.name,
        description: data.description,
        type: data.type,
        status: data.status ?? 'ACTIVE',
      },
    });

    return {
      id: Number(item.id),
      name: item.name,
      type: item.type as any,
      description: item.description ?? undefined,
      status: item.status as any,
      memberCount: item.memberCount,
      usageCount: item.usageCount,
      lastUsedAt: null,
      createdBy: item.createdBy?.toString(),
      createdAt: item.createdAt.toISOString(),
    };
  }

  /**
   * 수신자 그룹 상세 조회
   */
  async getRecipientGroup(id: number) {
    const item = await this.db.recipientGroup.findUnique({
      where: { id: BigInt(id) },
    });

    if (!item) throw new NotFoundException(`수신자 그룹(id=${id})을 찾을 수 없습니다.`);

    return {
      id: Number(item.id),
      name: item.name,
      type: item.type as any,
      description: item.description ?? undefined,
      status: item.status as any,
      memberCount: item.memberCount,
      usageCount: item.usageCount,
      lastUsedAt: item.lastUsedAt?.toISOString() || null,
      createdBy: item.createdBy?.toString(),
      createdAt: item.createdAt.toISOString(),
    };
  }

  /**
   * 수신자 그룹 수정
   */
  async updateRecipientGroup(id: number, data: UpdateRecipientGroupRequest) {
    const item = await this.db.recipientGroup.update({
      where: { id: BigInt(id) },
      data: {
        ...(data.name && { name: data.name }),
        ...(data.description !== undefined && { description: data.description }),
        ...(data.type && { type: data.type }),
        ...(data.status && { status: data.status }),
      },
    });

    return {
      id: Number(item.id),
      name: item.name,
      type: item.type as any,
      description: item.description ?? undefined,
      status: item.status as any,
      memberCount: item.memberCount,
      usageCount: item.usageCount,
      lastUsedAt: item.lastUsedAt?.toISOString() || null,
      createdBy: item.createdBy?.toString(),
      createdAt: item.createdAt.toISOString(),
    };
  }

  /**
   * 수신자 그룹 삭제
   */
  async deleteRecipientGroup(id: number) {
    await this.db.recipientGroup.delete({ where: { id: BigInt(id) } });
    return { message: '수신자 그룹이 삭제되었습니다.' };
  }

  // ─────────────────────────────────────────────────────────────────
  // 예약 발송 (NotificationCampaign where sendType='SCHEDULED')
  // ─────────────────────────────────────────────────────────────────

  /**
   * 예약 발송 목록 조회
   */
  async getScheduledNotifications(query: ScheduledNotificationListQuery) {
    const { page = 1, limit = 10, status, startDate, endDate } = query;
    const skip = (page - 1) * limit;

    const where: any = { sendType: 'SCHEDULED' };
    if (status) where.status = status;
    if (startDate || endDate) {
      where.scheduledAt = {};
      if (startDate) where.scheduledAt.gte = new Date(startDate);
      if (endDate) where.scheduledAt.lte = new Date(endDate);
    }

    const [total, items] = await Promise.all([
      this.db.notificationCampaign.count({ where }),
      this.db.notificationCampaign.findMany({
        where,
        skip,
        take: limit,
        orderBy: { scheduledAt: 'asc' },
      }),
    ]);

    return {
      data: items.map((item: any) => this.mapCampaignToScheduled(item)),
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * 예약 발송 생성
   */
  async createScheduledNotification(data: CreateScheduledNotificationRequest) {
    const item = await this.db.notificationCampaign.create({
      data: {
        campaignName: data.title || '예약 발송',
        title: data.title,
        body: data.body,
        channel: data.channel,
        sendType: 'SCHEDULED',
        scheduledAt: new Date(data.scheduledAt),
        status: 'PENDING',
        payload: (data.payload as any) ?? {},
        ...(data.recipientGroupId && { recipientGroupId: BigInt(data.recipientGroupId) }),
      },
    });

    return this.mapCampaignToScheduled(item);
  }

  /**
   * 예약 발송 취소
   */
  async cancelScheduledNotification(id: string) {
    const item = await this.db.notificationCampaign.update({
      where: { id: BigInt(id) },
      data: { status: 'CANCELLED' },
    });
    return this.mapCampaignToScheduled(item);
  }

  /**
   * 예약 발송 삭제
   */
  async deleteScheduledNotification(id: string) {
    await this.db.notificationCampaign.delete({ where: { id: BigInt(id) } });
    return { message: '예약 발송이 삭제되었습니다.' };
  }

  /**
   * NotificationCampaign → ScheduledNotificationSchema 형태로 변환
   */
  private mapCampaignToScheduled(item: any) {
    return {
      id: item.id.toString(),
      title: item.title ?? undefined,
      body: item.body ?? '',
      channel: item.channel as any,
      targetType: 'GUARDIAN' as const, // 기본값 (캠페인은 타입 고정)
      recipientGroupId: item.recipientGroupId ? Number(item.recipientGroupId) : undefined,
      payload: (item.payload as any) ?? {},
      scheduledAt: item.scheduledAt?.toISOString() ?? new Date().toISOString(),
      status: item.status as any,
      sentAt: item.sentAt?.toISOString() ?? null,
      createdAt: item.createdAt.toISOString(),
      updatedAt: item.updatedAt.toISOString(),
    };
  }

  // ─────────────────────────────────────────────────────────────────
  // 사용자(INAPP) 알림
  // ─────────────────────────────────────────────────────────────────

  /**
   * 내 알림 목록 조회
   */
  async getMyNotifications(targetId: string, query: GetUserNotificationsQuery) {
    const { page = 1, limit = 20, isRead } = query;
    const skip = (page - 1) * limit;

    const where: any = {
      channel: 'INAPP',
      targetId: BigInt(targetId),
    };

    // payload.isRead 기반 필터링 (Prisma JSON 필터)
    if (isRead !== undefined) {
      where.payload = { path: ['isRead'], equals: isRead };
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

    const unreadWhere = { ...where };
    delete unreadWhere.payload;
    unreadWhere.payload = { path: ['isRead'], equals: false };
    const unreadCount = await this.db.notificationQueue.count({ where: unreadWhere });

    return {
      data: items.map(item => ({
        id: item.id.toString(),
        title: item.title ?? null,
        body: item.body ?? '',
        payload: item.payload as Record<string, unknown>,
        isRead: (item.payload as any)?.isRead === true,
        sentAt: item.sentAt?.toISOString() ?? item.createdAt.toISOString(),
        readAt: (item.payload as any)?.readAt ?? null,
      })),
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
      unreadCount,
    };
  }

  /**
   * 알림 읽음 처리
   */
  async markNotificationsRead(ids: string[]) {
    // payload JSON 업데이트는 Prisma updateMany로 직접 불가 → 개별 업데이트
    let updatedCount = 0;
    for (const id of ids) {
      const item = await this.db.notificationQueue.findUnique({ where: { id: BigInt(id) } });
      if (!item) continue;

      const newPayload = {
        ...(item.payload as object),
        isRead: true,
        readAt: new Date().toISOString(),
      };

      await this.db.notificationQueue.update({
        where: { id: BigInt(id) },
        data: { payload: newPayload },
      });
      updatedCount++;
    }

    return { message: `${updatedCount}건이 읽음 처리되었습니다.`, updatedCount };
  }

  /**
   * 모든 알림 읽음 처리
   */
  async markAllNotificationsRead(targetId: string) {
    const items = await this.db.notificationQueue.findMany({
      where: { channel: 'INAPP', targetId: BigInt(targetId) },
    });

    let updatedCount = 0;
    for (const item of items) {
      if ((item.payload as any)?.isRead) continue;
      const newPayload = {
        ...(item.payload as object),
        isRead: true,
        readAt: new Date().toISOString(),
      };
      await this.db.notificationQueue.update({
        where: { id: item.id },
        data: { payload: newPayload },
      });
      updatedCount++;
    }

    return { message: `${updatedCount}건이 모두 읽음 처리되었습니다.`, updatedCount };
  }

  // ─────────────────────────────────────────────────────────────────
  // 대량 발송
  // ─────────────────────────────────────────────────────────────────

  /**
   * 대량 알림 발송 (캠페인 생성 + 수신자별 큐 등록)
   */
  async sendBulkNotificationCampaign(data: SendBulkNotificationRequest) {
    // 캠페인 레코드 생성
    const campaign = await this.db.notificationCampaign.create({
      data: {
        campaignName: data.title || '대량 발송',
        title: data.title,
        body: data.body,
        channel: data.channel,
        sendType: 'IMMEDIATE',
        status: 'PENDING',
        recipientCount: data.targetIds.length,
        payload: (data.payload as any) ?? {},
      },
    });

    const queueIds: string[] = [];

    for (const targetId of data.targetIds) {
      // 수신자 레코드 생성
      await this.db.notificationCampaignRecipient.create({
        data: {
          campaignId: campaign.id,
          recipientType: data.targetType,
          recipientId: BigInt(targetId),
          name: targetId, // 실제 이름은 별도 조회 필요
          status: 'PENDING',
        },
      });

      // 채널별 큐에 작업 추가
      let jobId: string | undefined;
      if (data.channel === 'SMS') {
        const job = await this.smsQueue.add(
          'send-sms',
          { to: targetId, body: data.body, logId: campaign.id.toString() },
          { attempts: 3, removeOnComplete: true },
        );
        jobId = job.id;
      } else if (data.channel === 'EMAIL') {
        const job = await this.emailQueue.add(
          'send-email',
          { to: targetId, subject: data.title ?? '', html: data.body, logId: campaign.id.toString() },
          { attempts: 3, removeOnComplete: true },
        );
        jobId = job.id;
      } else {
        const job = await this.notificationQueue.add(
          'send-notification',
          { userId: targetId, title: data.title ?? '', body: data.body, type: 'INFO', logId: campaign.id.toString() },
          { attempts: 3, removeOnComplete: true },
        );
        jobId = job.id;
      }

      if (jobId) queueIds.push(jobId);
    }

    // 캠페인 상태 업데이트
    await this.db.notificationCampaign.update({
      where: { id: campaign.id },
      data: { status: 'SENT', sentAt: new Date() },
    });

    return {
      message: `${data.targetIds.length}명에게 발송 요청이 등록되었습니다.`,
      queueIds,
    };
  }
}
