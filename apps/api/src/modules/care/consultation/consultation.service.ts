import { ConsultationRecord, careContract } from '@agape-care/api-contract';
import { Prisma, PrismaService } from '@agape-care/database';
import { Injectable } from '@nestjs/common';
import { z } from 'zod';

@Injectable()
export class CareConsultationService {
  constructor(private readonly prisma: PrismaService) {}

  async createConsultation(data: z.infer<typeof careContract.createConsultation.body>) {
    const consultation = await this.prisma.consultationRecord.create({
      data: {
        residentId: BigInt(data.residentId),
        counselorId: data.counselorId ? BigInt(data.counselorId) : undefined,
        consultedAt: new Date(data.consultedAt),
        type: data.type,
        channel: data.channel,
        summary: data.summary,
        details: data.details,
        followUpDate: data.followUpDate ? new Date(data.followUpDate) : undefined,
      },
    });

    return this.serializeConsultation(consultation);
  }

  private serializeConsultation(record: Prisma.ConsultationRecordGetPayload<object>): ConsultationRecord {
    return {
      id: record.id.toString() as any,
      residentId: record.residentId.toString() as any,
      counselorId: record.counselorId?.toString(),
      consultedAt: record.consultedAt,
      type: record.type as 'GENERAL' | 'COMPLAINT' | 'ADMISSION' | 'DISCHARGE' | 'OTHER',
      channel: record.channel || undefined,
      summary: record.summary,
      details: record.details || undefined,
      followUpDate: (record.followUpDate?.toISOString().split('T')[0] || undefined) as any,
      createdAt: record.createdAt,
    };
  }
}
