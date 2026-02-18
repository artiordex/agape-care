/**
 * Description : employee.service.ts - ?? employee ??? ???? ?? ???
 * Author : Shiwoo Min
 * Date : 2026-02-18
 */

import { ChangeEmployeePasswordRequest, CreateEmployeeRequest, GetEmployeesQuery, UpdateEmployeeRequest } from '@agape-care/api-contract';
import { PrismaService } from '@agape-care/database';
import { AgapeCareLogger } from '@agape-care/logger';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class EmployeeService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly logger: AgapeCareLogger,
  ) {}

  async getEmployees(query: GetEmployeesQuery) {
    this.logger.info('직원 목록 조회', { category: 'SYSTEM', metadata: { page: query.page, limit: query.limit } });
    const { page, limit, search, status, departmentId, roleId } = query;
    const skip = (page - 1) * limit;

    const where: any = {};

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { phoneNumber: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (status) {
      where.status = status;
    }

    if (departmentId) {
      where.departmentId = BigInt(departmentId);
    }

    if (roleId) {
      where.roleId = BigInt(roleId);
    }

    const [employees, total] = await Promise.all([
      this.prisma.employee.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          department: true,
          role: true,
        },
      }),
      this.prisma.employee.count({ where }),
    ]);

    return {
      data: employees.map(this.serializeEmployee),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async getEmployee(id: string) {
    this.logger.info('직원 상세 조회', { category: 'SYSTEM', metadata: { id } });
    const employee = await this.prisma.employee.findUnique({
      where: { id: BigInt(id) },
      include: {
        department: true,
        role: true,
        educations: {
          orderBy: { educationDate: 'desc' },
          take: 5,
        },
      },
    });

    if (!employee) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }

    return this.serializeEmployee(employee);
  }

  async createEmployee(data: CreateEmployeeRequest) {
    this.logger.info('직원 등록 요청', { category: 'SYSTEM', metadata: { email: data.email } });
    // Check if email exists
    if (data.email) {
      const existing = await this.prisma.employee.findUnique({
        where: { email: data.email },
      });
      if (existing) {
        this.logger.warn('직원 등록 실패 - 이메일 중복', { category: 'SYSTEM', metadata: { email: data.email } });
        throw new ConflictException('Email already exists');
      }
    }

    let passwordHash = null;
    if (data.password) {
      passwordHash = await bcrypt.hash(data.password, 10);
    }

    const employee = await this.prisma.employee.create({
      data: {
        name: data.name,
        email: data.email,
        phoneNumber: data.phoneNumber,
        passwordHash,
        status: data.status || 'ACTIVE',
        hireDate: data.hireDate ? new Date(data.hireDate) : null,
        departmentId: data.departmentId ? BigInt(data.departmentId) : null,
        roleId: data.roleId ? BigInt(data.roleId) : null,
        meta: {},
      },
      include: {
        department: true,
        role: true,
      },
    });

    this.logger.info('직원 등록 완료', { category: 'SYSTEM', metadata: { id: employee.id.toString() } });
    return this.serializeEmployee(employee);
  }

  async updateEmployee(id: string, data: UpdateEmployeeRequest) {
    this.logger.info('직원 정보 수정 요청', { category: 'SYSTEM', metadata: { id } });
    const employee = await this.prisma.employee.findUnique({
      where: { id: BigInt(id) },
    });

    if (!employee) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }

    // Check if email explicitly changed and exists
    if (data.email && data.email !== employee.email) {
      const existing = await this.prisma.employee.findUnique({
        where: { email: data.email },
      });
      if (existing) {
        throw new ConflictException('Email already exists');
      }
    }

    const updateData: any = { ...data };

    // Handle date strings
    if (data.hireDate) updateData.hireDate = new Date(data.hireDate);
    if (data.resignDate) updateData.resignDate = new Date(data.resignDate);

    // Handle ID strings
    if (data.departmentId) updateData.departmentId = BigInt(data.departmentId);
    if (data.roleId) updateData.roleId = BigInt(data.roleId);

    // Filter out undefined
    Object.keys(updateData).forEach(key => updateData[key] === undefined && delete updateData[key]);

    const updatedEmployee = await this.prisma.employee.update({
      where: { id: BigInt(id) },
      data: updateData,
      include: {
        department: true,
        role: true,
      },
    });

    this.logger.info('직원 정보 수정 완료', { category: 'SYSTEM', metadata: { id } });
    return this.serializeEmployee(updatedEmployee);
  }

  async deleteEmployee(id: string) {
    this.logger.info('직원 삭제 요청', { category: 'SYSTEM', metadata: { id } });
    const employee = await this.prisma.employee.findUnique({
      where: { id: BigInt(id) },
    });

    if (!employee) {
      this.logger.warn('직원 삭제 실패 - 사용자 없음', { category: 'SYSTEM', metadata: { id } });
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }

    await this.prisma.employee.delete({
      where: { id: BigInt(id) },
    });

    this.logger.info('직원 삭제 완료', { category: 'SYSTEM', metadata: { id } });
    return { message: 'Employee deleted successfully' };
  }

  async changePassword(id: string, data: ChangeEmployeePasswordRequest) {
    this.logger.info('비밀번호 변경 요청', { category: 'AUTH', metadata: { id } });
    const employee = await this.prisma.employee.findUnique({
      where: { id: BigInt(id) },
    });

    if (!employee) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }

    const passwordHash = await bcrypt.hash(data.newPassword, 10);

    await this.prisma.employee.update({
      where: { id: BigInt(id) },
      data: { passwordHash },
    });

    this.logger.info('비밀번호 변경 완료', { category: 'AUTH', metadata: { id } });
    return { message: 'Password changed successfully' };
  }

  async getEmployeeStats() {
    const totalEmployees = await this.prisma.employee.count();
    const activeEmployees = await this.prisma.employee.count({
      where: { status: 'ACTIVE' },
    });
    const onLeaveEmployees = await this.prisma.employee.count({
      where: { status: 'ON_LEAVE' },
    });
    const retiredEmployees = await this.prisma.employee.count({
      where: { status: 'RESIGNED' },
    });

    // Department Stats
    const departments = await this.prisma.department.findMany({
      select: {
        id: true,
        name: true,
        _count: {
          select: { employees: true },
        },
      },
    });

    const byDepartment = departments.map(dept => ({
      departmentId: dept.id.toString(),
      departmentName: dept.name,
      count: dept._count.employees,
    }));

    return {
      totalEmployees,
      activeEmployees,
      onLeaveEmployees,
      retiredEmployees,
      byDepartment,
    };
  }

  private serializeEmployee(employee: any) {
    return {
      ...employee,
      id: employee.id.toString(),
      departmentId: employee.departmentId?.toString() ?? null,
      roleId: employee.roleId?.toString() ?? null,
      hireDate: employee.hireDate?.toISOString().split('T')[0] ?? null,
      resignDate: employee.resignDate?.toISOString().split('T')[0] ?? null,
      lastLoginAt: employee.lastLoginAt?.toISOString() ?? null,
      createdAt: employee.createdAt.toISOString(),
      updatedAt: employee.updatedAt.toISOString(),
      // Remove sensitive data
      passwordHash: undefined,
      department: employee.department
        ? {
            ...employee.department,
            id: employee.department.id.toString(),
            createdAt: employee.department.createdAt.toISOString(),
            updatedAt: employee.department.updatedAt.toISOString(),
          }
        : null,
      role: employee.role
        ? {
            ...employee.role,
            id: employee.role.id.toString(),
            createdAt: employee.role.createdAt.toISOString(),
            updatedAt: employee.role.updatedAt.toISOString(),
          }
        : null,
      educations: employee.educations?.map((edu: any) => ({
        ...edu,
        id: edu.id.toString(),
        employeeId: edu.employeeId.toString(),
        educationDate: edu.educationDate.toISOString().split('T')[0],
        createdAt: edu.createdAt.toISOString(),
        updatedAt: edu.updatedAt.toISOString(),
      })),
    };
  }
}
