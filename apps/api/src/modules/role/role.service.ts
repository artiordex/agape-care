/**
 * Description : role.service.ts - ?? role ??? ???? ?? ???
 * Author : Shiwoo Min
 * Date : 2026-02-18
 */

import { Prisma, PrismaService } from '@agape-care/database';
import { AgapeCareLogger } from '@agape-care/logger';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RoleService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly logger: AgapeCareLogger,
  ) {}

  async create(data: Prisma.EmployeeRoleCreateInput) {
    this.logger.info('역할 생성', { category: 'SYSTEM' });
    return this.prisma.employeeRole.create({
      data,
    });
  }

  async findAll(params?: {
    skip?: number;
    take?: number;
    cursor?: Prisma.EmployeeRoleWhereUniqueInput;
    where?: Prisma.EmployeeRoleWhereInput;
    orderBy?: Prisma.EmployeeRoleOrderByWithRelationInput;
  }) {
    this.logger.info('역할 목록 조회', { category: 'SYSTEM' });
    const { skip, take, cursor, where, orderBy } = params || {};
    return this.prisma.employeeRole.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async findOne(where: Prisma.EmployeeRoleWhereUniqueInput) {
    this.logger.info('역할 단건 조회', { category: 'SYSTEM' });
    return this.prisma.employeeRole.findUnique({
      where,
    });
  }

  async update(params: { where: Prisma.EmployeeRoleWhereUniqueInput; data: Prisma.EmployeeRoleUpdateInput }) {
    this.logger.info('역할 수정', { category: 'SYSTEM' });
    const { where, data } = params;
    return this.prisma.employeeRole.update({
      data,
      where,
    });
  }

  async remove(where: Prisma.EmployeeRoleWhereUniqueInput) {
    this.logger.info('역할 삭제', { category: 'SYSTEM' });
    return this.prisma.employeeRole.delete({
      where,
    });
  }
}
