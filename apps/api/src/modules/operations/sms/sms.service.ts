import { PrismaService } from '@agape-care/database';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SmsService {
  constructor(private readonly prisma: PrismaService) {}

  async sendSms(data: { recipientPhone: string; message: string; scheduledAt?: string }) {
    // In a real app, integrate with an SMS provider here (e.g., Twilio, CoolSMS)
    // For now, just logging to database
    await this.prisma.smsSendLog.create({
      data: {
        recipientPhone: data.recipientPhone,
        message: data.message,
        sendType: 'AUTO',
        status: data.scheduledAt ? 'SCHEDULED' : 'SENT',
        scheduledAt: data.scheduledAt ? new Date(data.scheduledAt) : null,
        sentAt: data.scheduledAt ? null : new Date(),
        // senderId: ... (typically from context user)
      },
    });

    return { message: 'SMS request accepted' };
  }

  async getSmsLogs(query: { page: number; limit: number; status?: string }) {
    const { page, limit, status } = query;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (status) where.status = status;

    const [logs, total] = await Promise.all([
      this.prisma.smsSendLog.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.smsSendLog.count({ where }),
    ]);

    return {
      data: logs.map(log => ({
        ...log,
        id: log.id.toString(),
        senderId: log.senderId?.toString() ?? null,
        scheduledAt: log.scheduledAt?.toISOString() ?? null,
        sentAt: log.sentAt?.toISOString() ?? null,
        createdAt: log.createdAt.toISOString(),
      })),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
}
