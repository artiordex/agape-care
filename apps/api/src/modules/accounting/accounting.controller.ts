import { accountingContract } from '@agape-care/api-contract';
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { AccountService } from './account/account.service';
import { InsuranceClaimService } from './insurance-claim/insurance-claim.service';
import { InvoiceService } from './invoice/invoice.service';
import { PayrollService } from './payroll/payroll.service';
import { SupplierService } from './supplier/supplier.service';
import { TransactionService } from './transaction/transaction.service';

@Controller()
export class AccountingController {
  constructor(
    private readonly accountService: AccountService,
    private readonly insuranceClaimService: InsuranceClaimService,
    private readonly invoiceService: InvoiceService,
    private readonly payrollService: PayrollService,
    private readonly supplierService: SupplierService,
    private readonly transactionService: TransactionService,
  ) {}

  @Post(accountingContract.createTransaction.path)
  async createTransaction(
    @Body(new ZodValidationPipe(accountingContract.createTransaction.body))
    body: any,
  ) {
    return this.transactionService.createTransaction(body);
  }

  @Get('/accounting/transactions')
  async getTransactions() {
    return this.transactionService.getTransactions();
  }

  @Get('/accounting/payroll')
  async getPayrolls() {
    return this.payrollService.getPayrolls();
  }

  @Patch(accountingContract.updatePayrollStatus.path.replace(':id', ':id'))
  async updatePayrollStatus(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(accountingContract.updatePayrollStatus.body))
    body: any,
  ) {
    return this.payrollService.updatePayrollStatus(id, body);
  }

  @Get('/accounting/invoices')
  async getInvoices() {
    return this.invoiceService.getInvoices();
  }

  @Post(accountingContract.createInsuranceClaim.path)
  async createInsuranceClaim(
    @Body(new ZodValidationPipe(accountingContract.createInsuranceClaim.body))
    body: any,
  ) {
    return this.insuranceClaimService.createInsuranceClaim(body);
  }

  @Get('/accounting/accounts')
  async getAccounts() {
    return this.accountService.getAccounts();
  }

  @Post(accountingContract.createSupplier.path)
  async createSupplier(
    @Body(new ZodValidationPipe(accountingContract.createSupplier.body))
    body: any,
  ) {
    return this.supplierService.createSupplier(body);
  }
}
