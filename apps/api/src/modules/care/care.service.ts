import { DailyCareRecord, careContract } from '@agape-care/api-contract';
import { Prisma, PrismaService } from '@agape-care/database';
import { Injectable, NotFoundException } from '@nestjs/common';
import { z } from 'zod';

@Injectable()
export class CareService {
  constructor(private readonly prisma: PrismaService) {}

  // Daily Care
  async getDailyCare(query: z.infer<typeof careContract.getDailyCare.query>) {
    const { residentId, date } = query;
    const record = await this.prisma.dailyCareRecord.findUnique({
      where: {
        residentId_date: {
          residentId: BigInt(residentId),
          date: new Date(date),
        },
      },
    });

    return record ? this.serializeDailyCareRecord(record) : null;
  }

  async saveDailyCare(data: z.infer<typeof careContract.saveDailyCare.body>) {
    const { residentId, date, weight, oral, elimination, nursing, emergency } = data;

    // Check if resident exists
    const resident = await this.prisma.resident.findUnique({
      where: { id: BigInt(residentId) },
    });
    if (!resident) {
      throw new NotFoundException(`Resident with ID ${residentId} not found`);
    }

    const record = await this.prisma.dailyCareRecord.upsert({
      where: {
        residentId_date: {
          residentId: BigInt(residentId),
          date: new Date(date),
        },
      },
      update: {
        weight: weight ? (weight as any) : undefined,
        oral: oral ? (oral as any) : undefined,
        elimination: elimination ? (elimination as any) : undefined,
        nursing: nursing ? (nursing as any) : undefined,
        emergency: emergency ? (emergency as any) : undefined,
      },
      create: {
        residentId: BigInt(residentId),
        date: new Date(date),
        weight: weight ? (weight as any) : undefined,
        oral: oral ? (oral as any) : undefined,
        elimination: elimination ? (elimination as any) : undefined,
        nursing: nursing ? (nursing as any) : undefined,
        emergency: emergency ? (emergency as any) : undefined,
      },
    });

    return this.serializeDailyCareRecord(record);
  }

  // Serializers
  private serializeDailyCareRecord(record: Prisma.DailyCareRecordGetPayload<object>): DailyCareRecord {
    return {
      id: record.id.toString() as any,
      residentId: record.residentId.toString() as any,
      date: record.date.toISOString().split('T')[0],
      weight: (record.weight as any) || undefined,
      oral: (record.oral as any) || undefined,
      elimination: (record.elimination as any) || undefined,
      nursing: (record.nursing as any) || undefined,
      emergency: (record.emergency as any) || undefined,
      createdAt: record.createdAt.toISOString(),
      updatedAt: record.updatedAt.toISOString(),
    };
  }
}
