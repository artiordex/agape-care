import { Incident, careContract } from '@agape-care/api-contract';
import { Prisma, PrismaService } from '@agape-care/database';
import { Injectable } from '@nestjs/common';
import { z } from 'zod';

@Injectable()
export class CareIncidentService {
  constructor(private readonly prisma: PrismaService) {}

  async getIncidents(query: z.infer<typeof careContract.getIncidents.query>) {
    const { severity, status } = query;
    const where: Prisma.IncidentWhereInput = {
      ...(severity && { severity }),
      ...(status && { status }),
    };

    const incidents = await this.prisma.incident.findMany({
      where,
      orderBy: { occurredAt: 'desc' },
    });

    return incidents.map(this.serializeIncident);
  }

  async updateIncidentStatus(id: string, data: z.infer<typeof careContract.updateIncidentStatus.body>) {
    const incident = await this.prisma.incident.update({
      where: { id: BigInt(id) },
      data: {
        status: data.status,
        actionTaken: data.actionTaken,
      },
    });

    return this.serializeIncident(incident);
  }

  private serializeIncident(incident: Prisma.IncidentGetPayload<object>): Incident {
    return {
      id: incident.id.toString() as any,
      residentId: incident.residentId?.toString() as any,
      reportedBy: incident.reportedBy?.toString(),
      occurredAt: incident.occurredAt,
      severity: incident.severity as 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL',
      title: incident.title,
      description: incident.description,
      location: incident.location || undefined,
      status: incident.status as 'OPEN' | 'IN_REVIEW' | 'CLOSED',
      actionTaken: incident.actionTaken || undefined,
      createdAt: incident.createdAt,
      updatedAt: incident.updatedAt,
    };
  }
}
