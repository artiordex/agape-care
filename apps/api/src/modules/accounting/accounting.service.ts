import {
  CreateInsuranceClaimContract,
  CreateSupplierContract,
  CreateTransactionContract,
  UpdatePayrollStatusContract,
} from '@agape-care/api-contract';
import { Prisma, PrismaService } from '@agape-care/database';
import { Injectable } from '@nestjs/common';
import { z } from 'zod';

@Injectable()
export class AccountingService {
  constructor(private readonly prisma: PrismaService) {}

  async createTransaction(data: z.infer<CreateTransactionContract['body']>) {
    const { items, ...txnData } = data;

    // items의 accountId가 존재하는지 확인은 Prisma 관계 제약조건으로 처리됨
    // 혹은 비즈니스 로직으로 추가 검증 가능

    const transaction = await this.prisma.transaction.create({
      data: {
        txnDate: txnData.txnDate,
        description: txnData.description,
        referenceNo: txnData.referenceNo,
        supplierId: txnData.supplierId ? BigInt(txnData.supplierId) : null,
        createdBy: txnData.createdBy ? BigInt(txnData.createdBy) : null,
        totalAmount: txnData.totalAmount,
        currency: txnData.currency,
        items: {
          create: items.map(item => ({
            accountId: BigInt(item.accountId),
            lineNo: item.lineNo,
            description: item.description,
            debitAmount: item.debitAmount,
            creditAmount: item.creditAmount,
          })),
        },
      },
      include: {
        items: true,
      },
    });

    return this.serializeTransaction(transaction);
  }

  async getTransactions() {
    const transactions = await this.prisma.transaction.findMany({
      include: { items: true },
      orderBy: { txnDate: 'desc' },
    });
    return transactions.map(this.serializeTransaction);
  }

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

  async getInvoices() {
    const invoices = await this.prisma.invoiceHeader.findMany({
      include: { items: true },
      orderBy: { issueDate: 'desc' },
    });
    return invoices.map(this.serializeInvoice);
  }

  async createInsuranceClaim(data: z.infer<CreateInsuranceClaimContract['body']>) {
    const { items, ...claimData } = data;

    const claim = await this.prisma.insuranceClaim.create({
      data: {
        claimNo: claimData.claimNo,
        residentId: BigInt(claimData.residentId),
        claimMonth: claimData.claimMonth,
        claimType: claimData.claimType,
        totalAmount: claimData.totalAmount,
        approvedAmount: claimData.approvedAmount,
        submittedAt: claimData.submittedAt,
        approvedAt: claimData.approvedAt,
        paidAt: claimData.paidAt,
        status: claimData.status,
        rejectReason: claimData.rejectReason,
        notes: claimData.notes,
        createdBy: claimData.createdBy ? BigInt(claimData.createdBy) : null,
        items: items
          ? {
              create: items.map(item => ({
                serviceDate: item.serviceDate,
                serviceCode: item.serviceCode,
                serviceName: item.serviceName,
                quantity: item.quantity,
                unitPrice: item.unitPrice,
                amount: item.amount,
                copayAmount: item.copayAmount,
              })),
            }
          : undefined,
      },
      include: { items: true },
    });

    return this.serializeInsuranceClaim(claim);
  }

  async getAccounts() {
    const accounts = await this.prisma.account.findMany({
      include: { category: true },
    });
    return accounts.map(this.serializeAccount);
  }

  async createSupplier(data: z.infer<CreateSupplierContract['body']>) {
    const supplier = await this.prisma.supplier.create({
      data: {
        name: data.name,
        businessNo: data.businessNo,
        phoneNumber: data.phoneNumber,
        email: data.email,
        address: data.address,
        memo: data.memo,
      },
    });
    return this.serializeSupplier(supplier);
  }

  /* --- Serializers (BigInt Handling) --- */

  private serializeTransaction(txn: Prisma.TransactionGetPayload<{ include: { items: true } }>) {
    return {
      ...txn,
      id: txn.id.toString(),
      supplierId: txn.supplierId?.toString() || null,
      createdBy: txn.createdBy?.toString() || null,
      totalAmount: Number(txn.totalAmount),
      txnDate: txn.txnDate, // Date object
      createdAt: txn.createdAt,
      updatedAt: txn.updatedAt,
      items: txn.items.map(item => ({
        ...item,
        id: item.id.toString(),
        transactionId: item.transactionId.toString(),
        accountId: item.accountId.toString(),
        debitAmount: Number(item.debitAmount),
        creditAmount: Number(item.creditAmount),
      })),
    };
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

  private serializeInvoice(invoice: Prisma.InvoiceHeaderGetPayload<{ include: { items: true } }>) {
    return {
      ...invoice,
      id: invoice.id.toString(),
      residentId: invoice.residentId?.toString() || null,
      totalAmount: Number(invoice.totalAmount),
      items: invoice.items.map(item => ({
        ...item,
        id: item.id.toString(),
        invoiceId: item.invoiceId.toString(),
        quantity: Number(item.quantity),
        unitPrice: Number(item.unitPrice),
        amount: Number(item.amount),
      })),
    };
  }

  private serializeInsuranceClaim(claim: Prisma.InsuranceClaimGetPayload<{ include: { items: true } }>) {
    return {
      ...claim,
      id: claim.id.toString(),
      residentId: claim.residentId.toString(),
      totalAmount: Number(claim.totalAmount),
      approvedAmount: claim.approvedAmount ? Number(claim.approvedAmount) : undefined,
      createdBy: claim.createdBy?.toString() || null,
      items: claim.items?.map(item => ({
        ...item,
        id: item.id.toString(),
        claimId: item.claimId.toString(),
        quantity: Number(item.quantity),
        unitPrice: Number(item.unitPrice),
        amount: Number(item.amount),
        copayAmount: Number(item.copayAmount),
      })),
    };
  }

  private serializeAccount(account: Prisma.AccountGetPayload<{ include: { category: true } }>) {
    return {
      ...account,
      id: account.id.toString(),
      categoryId: account.categoryId?.toString() || null,
    };
  }

  private serializeSupplier(supplier: Prisma.SupplierGetPayload<object>) {
    return {
      ...supplier,
      id: supplier.id.toString(),
    };
  }
}
