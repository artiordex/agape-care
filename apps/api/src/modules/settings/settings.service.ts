/**
 * Description : settings.service.ts - ?? settings ??? ???? ?? ???
 * Author : Shiwoo Min
 * Date : 2026-02-18
 */

import { EmployeePermissionSchema, FacilitySchema, SiteInfoSchema } from '@agape-care/api-contract';
import { PrismaService } from '@agape-care/database';
import { AgapeCareLogger } from '@agape-care/logger';
import { Injectable } from '@nestjs/common';
import { z } from 'zod';

@Injectable()
export class SettingsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly logger: AgapeCareLogger,
  ) {}

  // Facility Info
  async getFacilityInfo(): Promise<z.infer<typeof FacilitySchema>> {
    this.logger.info('시설 정보 조회', { category: 'SYSTEM' });
    const facility = await this.prisma.facility.findFirst();
    if (!facility) {
      // 404 대신 기본값 반환
      return {
        id: '0',
        orgCode: '',
        facilityName: '',
        facilityDesc: '',
        facilityType: '노인요양시설',
        designatedDate: null,
        director: '',
        directorPhone: '',
        ceoName: '',
        businessNo: '',
        bizType: '',
        staffCount: 0,
        phone: '',
        fax: '',
        email: '',
        homepage: '',
        zip: '',
        address1: '',
        address2: '',
        totalCapacity: 0,
        shortStayCapacity: 0,
        dayCareCapacity: 0,
        stampImage: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    }

    return {
      ...facility,
      id: facility.id.toString(),
      createdAt: facility.createdAt,
      updatedAt: facility.updatedAt,
    };
  }

  async updateFacilityInfo(data: any) {
    this.logger.info('시설 정보 수정', { category: 'SYSTEM' });
    const facility = await this.prisma.facility.findFirst();

    // Date conversion if needed (though Zod coerce handles it on request, Prisma might need Date object)
    const updateData = { ...data };
    if (updateData.designatedDate) updateData.designatedDate = new Date(updateData.designatedDate);

    if (facility) {
      const updated = await this.prisma.facility.update({
        where: { id: facility.id },
        data: updateData,
      });
      return { ...updated, id: updated.id.toString() };
    } else {
      // Create logic for initial setup if missing
      const created = await this.prisma.facility.create({
        data: {
          orgCode: 'DEFAULT', // Should come from setup
          facilityName: 'New Facility',
          facilityType: 'Type',
          director: 'Director',
          ceoName: 'CEO',
          businessNo: '000-00-00000',
          phone: '000-0000-0000',
          address1: 'Address',
          ...updateData,
        },
      });
      return { ...created, id: created.id.toString() };
    }
  }

  // Site Info
  async getSiteInfo(): Promise<z.infer<typeof SiteInfoSchema>> {
    this.logger.info('사이트 정보 조회', { category: 'SYSTEM' });
    const siteInfo = await this.prisma.siteInfo.findFirst();
    if (!siteInfo) {
      // Return default empty object instead of 404
      return {
        id: '0',
        serviceName: '',
        serviceDesc: '',
        contactPhone: '',
        contactEmail: '',
        customerHours: '',
        metaTitle: '',
        metaDescription: '',
        metaKeywords: '',
        footerText: '',
        legalNotice: '',
        updatedBy: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    }

    return {
      ...siteInfo,
      id: siteInfo.id.toString(),
      updatedBy: siteInfo.updatedBy?.toString() || null,
    };
  }

  async updateSiteInfo(data: any) {
    this.logger.info('사이트 정보 수정', { category: 'SYSTEM' });
    const siteInfo = await this.prisma.siteInfo.findFirst();
    if (siteInfo) {
      const updated = await this.prisma.siteInfo.update({
        where: { id: siteInfo.id },
        data,
      });
      return {
        ...updated,
        id: updated.id.toString(),
        updatedBy: updated.updatedBy?.toString() || null,
      };
    } else {
      const created = await this.prisma.siteInfo.create({
        data: {
          serviceName: 'Agape Care',
          ...data,
        },
      });
      return {
        ...created,
        id: created.id.toString(),
        updatedBy: created.updatedBy?.toString() || null,
      };
    }
  }

  // Roles
  async getRoles() {
    const roles = await this.prisma.employeeRole.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return roles.map(r => ({
      ...r,
      id: r.id.toString(),
      permissions: r.permissions as Record<string, any>,
      createdAt: r.createdAt.toISOString(),
      updatedAt: r.updatedAt.toISOString(),
    }));
  }

  async createRole(data: any) {
    this.logger.info('역할 생성', { category: 'SYSTEM' });
    const role = await this.prisma.employeeRole.create({
      data: {
        ...data,
        // Ensure permissions is JSON or handled by Prisma
      },
    });
    return {
      ...role,
      id: role.id.toString(),
      permissions: role.permissions as Record<string, any>,
      createdAt: role.createdAt.toISOString(),
      updatedAt: role.updatedAt.toISOString(),
    };
  }

  async updateRole(id: string, data: any) {
    this.logger.info('역할 수정', { category: 'SYSTEM', metadata: { id } });
    const role = await this.prisma.employeeRole.update({
      where: { id: BigInt(id) },
      data,
    });
    return {
      ...role,
      id: role.id.toString(),
      permissions: role.permissions as Record<string, any>,
      createdAt: role.createdAt.toISOString(),
      updatedAt: role.updatedAt.toISOString(),
    };
  }

  async deleteRole(id: string) {
    this.logger.info('역할 삭제', { category: 'SYSTEM', metadata: { id } });
    await this.prisma.employeeRole.delete({ where: { id: BigInt(id) } });
    return { message: 'Deleted' };
  }

  // Departments
  async getDepartments() {
    const depts = await this.prisma.department.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return depts.map(d => ({
      ...d,
      id: d.id.toString(),
      createdAt: d.createdAt.toISOString(),
      updatedAt: d.updatedAt.toISOString(),
    }));
  }

  async createDepartment(data: any) {
    this.logger.info('부서 생성', { category: 'SYSTEM' });
    const dept = await this.prisma.department.create({ data });
    return {
      ...dept,
      id: dept.id.toString(),
      createdAt: dept.createdAt.toISOString(),
      updatedAt: dept.updatedAt.toISOString(),
    };
  }

  async updateDepartment(id: string, data: any) {
    this.logger.info('부서 수정', { category: 'SYSTEM', metadata: { id } });
    const dept = await this.prisma.department.update({
      where: { id: BigInt(id) },
      data,
    });
    return {
      ...dept,
      id: dept.id.toString(),
      createdAt: dept.createdAt.toISOString(),
      updatedAt: dept.updatedAt.toISOString(),
    };
  }

  async deleteDepartment(id: string) {
    this.logger.info('부서 삭제', { category: 'SYSTEM', metadata: { id } });
    await this.prisma.department.delete({ where: { id: BigInt(id) } });
    return { message: 'Deleted' };
  }

  // Permissions (RBAC Overrides)
  async getEmployeePermission(employeeId: string): Promise<z.infer<typeof EmployeePermissionSchema> | null> {
    const perm = await this.prisma.employeePermission.findUnique({
      where: { employeeId: BigInt(employeeId) },
    });
    if (!perm) return null;

    return {
      ...perm,
      id: perm.id.toString(),
      employeeId: perm.employeeId.toString(),
      roleId: perm.roleId?.toString() || null,
      updatedBy: perm.updatedBy?.toString() || null,
      permissions: perm.permissions as Record<string, any>,
    };
  }

  async updateEmployeePermission(employeeId: string, data: any) {
    this.logger.info('직원 권한 수정', { category: 'SYSTEM', metadata: { employeeId } });
    const perm = await this.prisma.employeePermission.upsert({
      where: { employeeId: BigInt(employeeId) },
      update: {
        permissions: data.permissions,
        roleId: data.roleId ? BigInt(data.roleId) : null,
      },
      create: {
        employeeId: BigInt(employeeId),
        permissions: data.permissions,
        roleId: data.roleId ? BigInt(data.roleId) : null,
      },
    });

    this.logger.info('직원 권한 수정 완료', { category: 'SYSTEM', metadata: { employeeId } });
    return {
      ...perm,
      id: perm.id.toString(),
      employeeId: perm.employeeId.toString(),
      roleId: perm.roleId?.toString() || null,
      updatedBy: perm.updatedBy?.toString() || null,
      permissions: perm.permissions as Record<string, any>,
    };
  }
}
