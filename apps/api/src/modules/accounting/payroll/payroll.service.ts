import { accountingContract } from '@agape-care/api-contract';
import { Prisma, PrismaService } from '@agape-care/database';
import { Injectable } from '@nestjs/common';
import { z } from 'zod';

type UpdatePayrollStatusContract = typeof accountingContract.updatePayrollStatus;

@Injectable()
export class PayrollService {
  constructor(private readonly prisma: PrismaService) {}

  async getPayrolls() {
    const payrolls = await this.prisma.payrollRecord.findMany({
      include: { items: true },
    });
    return payrolls.map(this.serializePayroll);
  }

  async updatePayrollStatus(id: string, data: z.infer<UpdatePayrollStatusContract['body']>) {
    const payroll = await this.prisma.payrollRecord.update({
      where: { id: BigInt(id) },
      data: { status: data.status },
      include: { items: true },
    });

    return this.serializePayroll(payroll);
  }

  private serializePayroll(payroll: Prisma.PayrollRecordGetPayload<{ include: { items: true } }>) {
    return {
      ...payroll,
      id: payroll.id.toString(),
      employeeId: payroll.employeeId.toString(),
      baseSalary: Number(payroll.baseSalary),
      totalAllowance: Number(payroll.totalAllowance),
      totalDeduction: Number(payroll.totalDeduction),
      netPay: Number(payroll.netPay),
      items: payroll.items?.map(item => ({
        ...item,
        id: item.id.toString(),
        payrollId: item.payrollId.toString(),
        amount: Number(item.amount),
      })),
    };
  }
}
