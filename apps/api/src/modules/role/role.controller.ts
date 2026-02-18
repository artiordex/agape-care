/**
 * Description : role.controller.ts - ?? role ??? API ????
 * Author : Shiwoo Min
 * Date : 2026-02-18
 */

import { Prisma } from '@agape-care/database';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RoleService } from './role.service';

@ApiTags('Settings')
@ApiBearerAuth('JWT-auth')
@Controller('roles')
@UseGuards(JwtAuthGuard)
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @ApiOperation({ summary: '직원 역할 생성', description: '새로운 직원 역할을 생성합니다.' })
  @Post()
  create(@Body() data: Prisma.EmployeeRoleCreateInput) {
    return this.roleService.create(data);
  }

  @ApiOperation({ summary: '직원 역할 목록 조회', description: '직원 역할 목록을 조회합니다.' })
  @Get()
  findAll(@Query('skip') skip?: string, @Query('take') take?: string, @Query('orderBy') orderBy?: string) {
    return this.roleService.findAll({
      skip: skip ? Number(skip) : undefined,
      take: take ? Number(take) : undefined,
      orderBy: orderBy ? JSON.parse(orderBy) : undefined,
    });
  }

  @ApiOperation({ summary: '직원 역할 단건 조회', description: '특정 직원 역할의 상세 정보를 조회합니다.' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roleService.findOne({ id: BigInt(id) });
  }

  @ApiOperation({ summary: '직원 역할 수정', description: '특정 직원 역할 정보를 수정합니다.' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() data: Prisma.EmployeeRoleUpdateInput) {
    return this.roleService.update({
      where: { id: BigInt(id) },
      data,
    });
  }

  @ApiOperation({ summary: '직원 역할 삭제', description: '특정 직원 역할을 삭제합니다.' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roleService.remove({ id: BigInt(id) });
  }
}
