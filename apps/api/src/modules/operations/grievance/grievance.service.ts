import { PrismaService } from '@agape-care/database';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GrievanceService {
  constructor(private readonly prisma: PrismaService) {}

  async getGrievances(query: { page: number; limit: number; status?: string; category?: string }) {
    const { page, limit, status, category } = query;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (status) where.status = status;
    if (category) where.category = category;

    const [grievances, total] = await Promise.all([
      this.prisma.grievance.findMany({
        where,
        skip,
        take: limit,
        orderBy: { receivedAt: 'desc' },
        include: {
          resident: true,
          assignee: true,
        },
      }),
      this.prisma.grievance.count({ where }),
    ]);

    return {
      data: grievances.map(g => ({
        ...g,
        id: g.id.toString(),
        residentId: g.residentId?.toString() ?? null,
        assignedTo: g.assignedTo?.toString() ?? null,
        receivedAt: g.receivedAt.toISOString(),
        resolvedAt: g.resolvedAt?.toISOString() ?? null,
        createdAt: g.createdAt.toISOString(),
        updatedAt: g.updatedAt.toISOString(),
        resident: g.resident ? { name: g.resident.name } : null,
        assignee: g.assignee ? { name: g.assignee.name } : null,
      })),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
}
