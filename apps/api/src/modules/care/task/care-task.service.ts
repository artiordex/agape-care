import { CareTask, careContract } from '@agape-care/api-contract';
import { Prisma, PrismaService } from '@agape-care/database';
import { Injectable } from '@nestjs/common';
import { z } from 'zod';

@Injectable()
export class CareTaskService {
  constructor(private readonly prisma: PrismaService) {}

  async getCareTasks(query: z.infer<typeof careContract.getCareTasks.query>) {
    const { assignedTo, status } = query;
    const where: Prisma.CareTaskWhereInput = {
      ...(assignedTo && { assignedTo: BigInt(assignedTo) }),
      ...(status && { status }),
    };

    const tasks = await this.prisma.careTask.findMany({
      where,
      orderBy: { dueAt: 'asc' },
    });

    return tasks.map(this.serializeCareTask);
  }

  async updateCareTaskStatus(id: string, data: z.infer<typeof careContract.updateCareTaskStatus.body>) {
    const task = await this.prisma.careTask.update({
      where: { id: BigInt(id) },
      data: {
        status: data.status,
      },
    });

    return this.serializeCareTask(task);
  }

  private serializeCareTask(task: Prisma.CareTaskGetPayload<object>): CareTask {
    return {
      id: task.id.toString() as any,
      residentId: task.residentId.toString() as any,
      assignedTo: task.assignedTo?.toString(),
      dueAt: task.dueAt ?? undefined, // Date or undefined
      title: task.title,
      description: task.description || undefined,
      status: task.status as 'PENDING' | 'IN_PROGRESS' | 'DONE' | 'CANCELLED',
      priority: task.priority as 'LOW' | 'NORMAL' | 'HIGH',
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
    };
  }
}
