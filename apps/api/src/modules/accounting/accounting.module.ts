import { Module } from '@nestjs/common';
import { AccountService } from './account/account.service';
import { AccountingController } from './accounting.controller';
import { AccountingService } from './accounting.service';
import { InsuranceClaimService } from './insurance-claim/insurance-claim.service';
import { InvoiceService } from './invoice/invoice.service';
import { PayrollService } from './payroll/payroll.service';
import { SupplierService } from './supplier/supplier.service';
import { TransactionService } from './transaction/transaction.service';

@Module({
  controllers: [AccountingController],
  providers: [
    AccountingService, // Keep for now if needed, or remove if fully migrated
    AccountService,
    InsuranceClaimService,
    InvoiceService,
    PayrollService,
    SupplierService,
    TransactionService,
  ],
})
export class AccountingModule {}
