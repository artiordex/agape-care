import { DashboardStatsSchema, DashboardWidgetsSchema } from '@agape-care/api-contract';
import { Injectable } from '@nestjs/common';
import { z } from 'zod';

@Injectable()
export class DashboardService {
  async getStats(): Promise<z.infer<typeof DashboardStatsSchema>> {
    // TODO: Connect to actual services (Resident, Employee, etc.)
    return {
      totalResidents: 42,
      newResidents: 3,
      emptyRooms: 5,
      staffOnDuty: 12,
      criticalAlerts: 2,
      pendingConsultations: 4,
    };
  }

  async getWidgets(): Promise<z.infer<typeof DashboardWidgetsSchema>> {
    return {
      stats: {
        totalResidents: 42,
        newResidents: 3,
        emptyRooms: 5,
        staffOnDuty: 12,
        criticalAlerts: 2,
        pendingConsultations: 4,
      },
      healthAlerts: [
        {
          id: '1',
          residentId: 'r1',
          residentName: '김철수',
          type: 'BLOOD_PRESSURE',
          value: '160/100',
          threshold: '140/90',
          occurredAt: new Date().toISOString(),
          status: 'OPEN',
          severity: 'HIGH',
        },
        {
          id: '2',
          residentId: 'r2',
          residentName: '이영희',
          type: 'FALL',
          value: '낙상 감지',
          occurredAt: new Date(Date.now() - 3600000).toISOString(),
          status: 'CHECKED',
          severity: 'CRITICAL',
        },
      ],
      medicationAlerts: [],
      recentActivities: [
        {
          id: '1',
          type: 'ADMISSION',
          description: '신규 입소자 등록: 박지성',
          occurredAt: new Date().toISOString(),
          performerName: '관리자',
        },
        {
          id: '2',
          type: 'CARE_RECORD',
          description: '김철수 어르신 혈압 측정',
          occurredAt: new Date(Date.now() - 1800000).toISOString(),
          performerName: '김간호',
        },
      ],
      todaySchedules: [
        {
          id: '1',
          title: '오전 회진',
          startTime: new Date().toISOString(),
          endTime: new Date(Date.now() + 3600000).toISOString(),
          type: 'PROGRAM',
          location: '생활실',
        },
      ],
    };
  }
}
