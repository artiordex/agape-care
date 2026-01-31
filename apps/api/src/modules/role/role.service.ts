import { PrismaService } from '@agape-care/database';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class RoleService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.EmployeeRoleCreateInput) {
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
    return this.prisma.employeeRole.findUnique({
      where,
    });
  }

  async update(params: { where: Prisma.EmployeeRoleWhereUniqueInput; data: Prisma.EmployeeRoleUpdateInput }) {
    const { where, data } = params;
    return this.prisma.employeeRole.update({
      data,
      where,
    });
  }

  async remove(where: Prisma.EmployeeRoleWhereUniqueInput) {
    return this.prisma.employeeRole.delete({
      where,
    });
  }
}
