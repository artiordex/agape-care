import { Prisma, PrismaService } from '@agape-care/database';
import { Injectable } from '@nestjs/common';

@Injectable()
export class InvoiceService {
  constructor(private readonly prisma: PrismaService) {}

  async getInvoices() {
    const invoices = await this.prisma.invoiceHeader.findMany({
      include: { items: true },
      orderBy: { issueDate: 'desc' },
    });
    return invoices.map(this.serializeInvoice);
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
}
