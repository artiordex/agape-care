import { accountingContract } from '@agape-care/api-contract';
import { Prisma, PrismaService } from '@agape-care/database';
import { Injectable } from '@nestjs/common';
import { z } from 'zod';

type CreateTransactionContract = typeof accountingContract.createTransaction;

@Injectable()
export class TransactionService {
  constructor(private readonly prisma: PrismaService) {}

  async createTransaction(data: z.infer<CreateTransactionContract['body']>) {
    const { items, ...txnData } = data;

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
}
