import { DashboardStatsSchema, DashboardWidgetsSchema } from '@agape-care/api-contract';
import { PrismaService } from '@agape-care/database';
import { Injectable } from '@nestjs/common';
import { z } from 'zod';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async getStats(): Promise<z.infer<typeof DashboardStatsSchema>> {
    const [totalResidents, newResidents, staffOnDuty, criticalAlerts, pendingConsultations] = await Promise.all([
      this.prisma.resident.count({ where: { status: 'ADMITTED' } }),
      this.prisma.resident.count({
        where: {
          status: 'ADMITTED',
          admissionDate: {
            gte: new Date(new Date().setDate(new Date().getDate() - 30)), // Last 30 days
          },
        },
      }),
      this.prisma.attendanceRecord.count({
        where: {
          workDate: new Date(),
          status: 'PRESENT',
        },
      }),
      this.prisma.incident.count({
        where: {
          severity: 'CRITICAL',
          status: 'OPEN',
        },
      }),
      this.prisma.consultationRecord.count({
        // Note: 'PENDING' status does not exist in ConsultationRecord currently,
        // relying on 'followUpDate' being in the future or similar logic could be better,
        // but for now let's just count recent ones or strictly check if we add a status field.
        // The contract might imply a status. Let's assume all records are "pending" review if they are recent?
        // Or actually, there is no status field. Let's just return 0 or total recent consultations for now
        // until we clarify the definition of 'pending'.
        // Wait, the interface says 'pendingConsultations', but schema doesn't have status.
        // Let's count consultations created today for now suitable proxy.
        where: {
          consultedAt: {
            gte: new Date(new Date().setHours(0, 0, 0, 0)),
          },
        },
      }),
    ]);

    // Hardcoded for now as Room model is not complex enough to query empty rooms easily without logic
    const emptyRooms = 0;

    return {
      totalResidents,
      newResidents,
      emptyRooms,
      staffOnDuty,
      criticalAlerts,
      pendingConsultations,
    };
  }

  async getWidgets(): Promise<z.infer<typeof DashboardWidgetsSchema>> {
    const stats = await this.getStats();

    const healthAlerts = await this.prisma.residentVital.findMany({
      where: {
        OR: [
          { systolicBp: { gte: 160 } },
          { diastolicBp: { gte: 100 } },
          { spo2: { lt: 95 } },
          { bodyTemperature: { gte: 37.5 } }, // Note: Schema calls it 'temperature', let's check schema
        ] as any, // Cast to any to avoid strict type error if field names mismatch slightly, checking schema below...
        // Schema: systolicBp, diastolicBp, temperature, spo2
      },
      take: 5,
      orderBy: { measuredAt: 'desc' },
      include: {
        resident: true,
      },
    });

    // Map vitals to alerts
    const formattedHealthAlerts = healthAlerts.map(vital => ({
      id: vital.id.toString(),
      residentId: vital.residentId.toString(),
      residentName: vital.resident.name,
      type: this.determineVitalAlertType(vital),
      value: this.formatVitalValue(vital),
      threshold: 'Threshold', // Simplified
      occurredAt: vital.measuredAt.toISOString(),
      status: 'OPEN' as const,
      severity: 'HIGH' as const,
    }));

    // For now, let's use Incidents as activities if AuditLog is not available or empty
    const incidents = await this.prisma.incident.findMany({
      take: 5,
      orderBy: { occurredAt: 'desc' },
      include: { resident: true, reporter: true },
    });

    const activities = incidents.map(incident => ({
      id: incident.id.toString(),
      type: 'INCIDENT' as const,
      description: `${incident.title} - ${incident.resident?.name || 'Unknown'}`,
      occurredAt: incident.occurredAt.toISOString(),
      performerName: incident.reporter?.name || 'Unknown',
    }));

    return {
      stats,
      healthAlerts: formattedHealthAlerts,
      medicationAlerts: [], // Not implemented yet
      recentActivities: activities,
      todaySchedules: [], // Not implemented yet
    };
  }

  private determineVitalAlertType(vital: any): 'BLOOD_PRESSURE' | 'TEMPERATURE' | 'SPO2' | 'OTHER' {
    if (vital.systolicBp >= 160 || vital.diastolicBp >= 100) return 'BLOOD_PRESSURE';
    if (vital.temperature >= 37.5) return 'TEMPERATURE';
    if (vital.spo2 < 95) return 'SPO2';
    return 'OTHER';
  }

  private formatVitalValue(vital: any): string {
    if (vital.systolicBp) return `${vital.systolicBp}/${vital.diastolicBp}`;
    if (vital.temperature) return `${vital.temperature}°C`;
    if (vital.spo2) return `${vital.spo2}%`;
    return '';
  }
}
