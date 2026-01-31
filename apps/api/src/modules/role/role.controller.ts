import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RoleService } from './role.service';

@Controller('roles')
@UseGuards(JwtAuthGuard)
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  create(@Body() data: Prisma.EmployeeRoleCreateInput) {
    return this.roleService.create(data);
  }

  @Get()
  findAll(@Query('skip') skip?: string, @Query('take') take?: string, @Query('orderBy') orderBy?: string) {
    return this.roleService.findAll({
      skip: skip ? Number(skip) : undefined,
      take: take ? Number(take) : undefined,
      orderBy: orderBy ? JSON.parse(orderBy) : undefined,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roleService.findOne({ id: BigInt(id) });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: Prisma.EmployeeRoleUpdateInput) {
    return this.roleService.update({
      where: { id: BigInt(id) },
      data,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roleService.remove({ id: BigInt(id) });
  }
}
