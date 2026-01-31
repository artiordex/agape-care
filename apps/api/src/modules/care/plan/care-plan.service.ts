import { CarePlan, careContract } from '@agape-care/api-contract';
import { Prisma, PrismaService } from '@agape-care/database';
import { Injectable } from '@nestjs/common';
import { z } from 'zod';

@Injectable()
export class CarePlanService {
  constructor(private readonly prisma: PrismaService) {}

  async getCarePlans(query: z.infer<typeof careContract.getCarePlans.query>) {
    const { residentId, status } = query;
    const where: Prisma.CarePlanWhereInput = {
      ...(residentId && { residentId: BigInt(residentId) }),
      ...(status && { status }),
    };

    const plans = await this.prisma.carePlan.findMany({
      where,
      include: { items: true },
      orderBy: { createdAt: 'desc' },
    });

    return plans.map(this.serializeCarePlan);
  }

  async createCarePlan(data: z.infer<typeof careContract.createCarePlan.body>) {
    const { residentId, items, createdBy, ...rest } = data;
    const plan = await this.prisma.carePlan.create({
      data: {
        ...rest,
        createdBy: createdBy ? BigInt(createdBy) : undefined,
        residentId: BigInt(residentId),
        startDate: new Date(data.startDate),
        endDate: data.endDate ? new Date(data.endDate) : undefined,
        items: {
          create: items.map((item: any) => ({
            sequenceNo: item.sequenceNo,
            description: item.description,
            frequency: item.frequency,
            notes: item.notes,
          })),
        },
      },
      include: { items: true },
    });

    return this.serializeCarePlan(plan);
  }

  private serializeCarePlan(plan: Prisma.CarePlanGetPayload<{ include: { items: true } }>): CarePlan {
    return {
      id: plan.id.toString() as any,
      residentId: plan.residentId.toString() as any,
      createdBy: plan.createdBy?.toString(),
      title: plan.title,
      goalSummary: plan.goalSummary,
      startDate: plan.startDate as any,
      endDate: (plan.endDate?.toISOString().split('T')[0] || undefined) as any,
      status: plan.status as 'ACTIVE' | 'COMPLETED' | 'CANCELLED',
      items: plan.items.map(item => ({
        id: item.id.toString() as any,
        carePlanId: item.carePlanId.toString() as any,
        sequenceNo: item.sequenceNo,
        description: item.description,
        frequency: item.frequency,
        notes: item.notes,
      })),
      createdAt: plan.createdAt,
      updatedAt: plan.updatedAt,
    } as any;
  }
}
