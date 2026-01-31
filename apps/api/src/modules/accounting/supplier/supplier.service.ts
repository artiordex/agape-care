import { accountingContract } from '@agape-care/api-contract';
import { Prisma, PrismaService } from '@agape-care/database';
import { Injectable } from '@nestjs/common';
import { z } from 'zod';

type CreateSupplierContract = typeof accountingContract.createSupplier;

@Injectable()
export class SupplierService {
  constructor(private readonly prisma: PrismaService) {}

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

  private serializeSupplier(supplier: Prisma.SupplierGetPayload<object>) {
    return {
      ...supplier,
      id: supplier.id.toString(),
    };
  }
}
