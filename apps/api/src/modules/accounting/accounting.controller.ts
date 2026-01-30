import {
  createInsuranceClaimContract,
  createSupplierContract,
  createTransactionContract,
  updatePayrollStatusContract,
} from '@agape-care/api-contract';
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { AccountingService } from './accounting.service';

@Controller()
export class AccountingController {
  constructor(private readonly accountingService: AccountingService) {}

  @Post(createTransactionContract.path)
  async createTransaction(
    @Body(new ZodValidationPipe(createTransactionContract.body))
    body: any,
  ) {
    return this.accountingService.createTransaction(body);
  }

  @Get('/accounting/transactions')
  async getTransactions() {
    return this.accountingService.getTransactions();
  }

  @Get('/accounting/payroll')
  async getPayrolls() {
    return this.accountingService.getPayrolls();
  }

  @Patch(updatePayrollStatusContract.path.replace(':id', ':id'))
  async updatePayrollStatus(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updatePayrollStatusContract.body))
    body: any,
  ) {
    return this.accountingService.updatePayrollStatus(id, body);
  }

  @Get('/accounting/invoices')
  async getInvoices() {
    return this.accountingService.getInvoices();
  }

  @Post(createInsuranceClaimContract.path)
  async createInsuranceClaim(
    @Body(new ZodValidationPipe(createInsuranceClaimContract.body))
    body: any,
  ) {
    return this.accountingService.createInsuranceClaim(body);
  }

  @Get('/accounting/accounts')
  async getAccounts() {
    return this.accountingService.getAccounts();
  }

  @Post(createSupplierContract.path)
  async createSupplier(
    @Body(new ZodValidationPipe(createSupplierContract.body))
    body: any,
  ) {
    return this.accountingService.createSupplier(body);
  }
}
