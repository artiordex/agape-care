import { DepartmentSchema, EmployeeRoleSchema, FacilityInfoSchema, SystemConfigSchema } from '@agape-care/api-contract';
import { Injectable } from '@nestjs/common';
import { z } from 'zod';

@Injectable()
export class SettingService {
  // Facility Info
  async getFacilityInfo(): Promise<z.infer<typeof FacilityInfoSchema>> {
    return {
      id: 'fac1',
      name: '아가페 요양원',
      representativeName: '김대표',
      businessRegistrationNumber: '123-45-67890',
      address: '서울시 강남구 테헤란로 123',
      phoneNumber: '02-123-4567',
      email: 'contact@agape.care',
      establishedAt: '2020-01-01T00:00:00Z',
      capacity: 100,
      grade: 'A',
    };
  }

  async updateFacilityInfo(data: any) {
    const current = await this.getFacilityInfo();
    return { ...current, ...data };
  }

  // System Config
  async getSystemConfig(): Promise<z.infer<typeof SystemConfigSchema>[]> {
    return [
      { key: 'site_title', value: 'Agape Care Admin', category: 'GENERAL' },
      { key: 'maintenance_mode', value: 'false', category: 'SYSTEM' },
    ];
  }

  async updateSystemConfig(data: any) {
    // TODO: proper update logic
    return await this.getSystemConfig();
  }

  // Roles
  async getRoles(): Promise<z.infer<typeof EmployeeRoleSchema>[]> {
    return [
      {
        id: 'r1',
        code: 'ADMIN',
        name: '관리자',
        description: '전체 권한',
        permissions: {},
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'r2',
        code: 'NURSE',
        name: '간호사',
        description: '간호 업무 권한',
        permissions: {},
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
  }

  async createRole(data: any) {
    return {
      id: Math.random().toString(),
      ...data,
      permissions: {},
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  async updateRole(id: string, data: any) {
    const roles = await this.getRoles();
    const role = roles[0]; // mock
    return { ...role, ...data };
  }

  async deleteRole(id: string) {
    return { message: 'Deleted' };
  }

  // Departments
  async getDepartments(): Promise<z.infer<typeof DepartmentSchema>[]> {
    return [
      {
        id: 'd1',
        code: 'KR',
        name: '요양팀',
        description: '요양 보호 및 생활 지원',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'd2',
        code: 'NR',
        name: '간호팀',
        description: '의료 및 간호 처치',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
  }

  async createDepartment(data: any) {
    return {
      id: Math.random().toString(),
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      ...data,
    };
  }

  async updateDepartment(id: string, data: any) {
    const depts = await this.getDepartments();
    return { ...depts[0], ...data };
  }

  async deleteDepartment(id: string) {
    return { message: 'Deleted' };
  }
}
