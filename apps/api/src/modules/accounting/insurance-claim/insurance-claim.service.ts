import { accountingContract } from '@agape-care/api-contract';
import { Prisma, PrismaService } from '@agape-care/database';
import { Injectable } from '@nestjs/common';
import { z } from 'zod';

type CreateInsuranceClaimContract = typeof accountingContract.createInsuranceClaim;

@Injectable()
export class InsuranceClaimService {
  constructor(private readonly prisma: PrismaService) {}

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
}
