import { MyProfileSchema, MyScheduleSchema } from '@agape-care/api-contract';
import { Injectable } from '@nestjs/common';
import { z } from 'zod';

@Injectable()
export class MyPageService {
  async getProfile(): Promise<z.infer<typeof MyProfileSchema>> {
    return {
      id: 'usr1',
      email: 'nurse@agape.care',
      name: '김간호',
      role: 'NURSE',
      department: '간호팀',
      position: '팀장',
      phoneNumber: '010-1234-5678',
      joinedAt: new Date(2023, 1, 15).toISOString(),
    };
  }

  async updateProfile(data: any): Promise<z.infer<typeof MyProfileSchema>> {
    // TODO: Implement actual update
    const current = await this.getProfile();
    return { ...current, ...data };
  }

  async getSchedules(): Promise<z.infer<typeof MyScheduleSchema>[]> {
    return [
      {
        id: 'sch1',
        title: '오전 회진',
        startTime: new Date().toISOString(),
        endTime: new Date(Date.now() + 3600000).toISOString(),
        type: 'WORK',
        status: 'SCHEDULED',
      },
      {
        id: 'sch2',
        title: '팀 회의',
        startTime: new Date(Date.now() + 7200000).toISOString(),
        endTime: new Date(Date.now() + 10800000).toISOString(),
        type: 'MEETING',
        status: 'SCHEDULED',
      },
    ];
  }
}
