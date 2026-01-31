import { employeeContract } from '@agape-care/api-contract';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { EmployeeService } from './employee.service';

@Controller()
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get(employeeContract.getEmployees.path)
  async getEmployees(
    @Query(new ZodValidationPipe(employeeContract.getEmployees.query))
    query: any,
  ) {
    return this.employeeService.getEmployees(query);
  }

  @Get(employeeContract.getEmployeeStats.path)
  async getEmployeeStats() {
    return this.employeeService.getEmployeeStats();
  }

  @Get(employeeContract.getEmployee.path.replace(':id', ':id'))
  async getEmployee(@Param('id') id: string) {
    return this.employeeService.getEmployee(id);
  }

  @Post(employeeContract.createEmployee.path)
  async createEmployee(
    @Body(new ZodValidationPipe(employeeContract.createEmployee.body))
    body: any,
  ) {
    return this.employeeService.createEmployee(body);
  }

  @Patch(employeeContract.updateEmployee.path.replace(':id', ':id'))
  async updateEmployee(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(employeeContract.updateEmployee.body))
    body: any,
  ) {
    return this.employeeService.updateEmployee(id, body);
  }

  @Delete(employeeContract.deleteEmployee.path.replace(':id', ':id'))
  async deleteEmployee(@Param('id') id: string) {
    return this.employeeService.deleteEmployee(id);
  }

  @Post(employeeContract.changeEmployeePassword.path.replace(':id', ':id'))
  async changePassword(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(employeeContract.changeEmployeePassword.body))
    body: any,
  ) {
    return this.employeeService.changePassword(id, body);
  }
}
