import { CreateMedicationRequest, GetMedicationsQuery, UpdateMedicationRequest } from '@agape-care/api-contract';
import { PrismaService } from '@agape-care/database';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class MedicationService {
  constructor(private readonly prisma: PrismaService) {}

  async getMedications(residentId: string, query: GetMedicationsQuery) {
    const { page, limit, active, search } = query;
    const skip = (page - 1) * limit;
    const now = new Date();

    const where: any = {
      residentId: BigInt(residentId),
    };

    if (active) {
      where.startDate = { lte: now };
      where.OR = [{ endDate: null }, { endDate: { gte: now } }];
    }

    if (search) {
      where.drugName = { contains: search, mode: 'insensitive' };
    }

    const [medications, total] = await Promise.all([
      this.prisma.residentMedication.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.residentMedication.count({ where }),
    ]);

    return {
      data: medications.map(this.serializeMedication),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async createMedication(residentId: string, data: CreateMedicationRequest) {
    const medication = await this.prisma.residentMedication.create({
      data: {
        residentId: BigInt(residentId),
        drugName: data.drugName,
        dosage: data.dosage,
        schedule: data.schedule,
        startDate: new Date(data.startDate),
        endDate: data.endDate ? new Date(data.endDate) : null,
        notes: data.notes,
        prescribedBy: data.prescribedBy,
      },
    });

    return this.serializeMedication(medication);
  }

  async updateMedication(medicationId: string, data: UpdateMedicationRequest) {
    const medication = await this.prisma.residentMedication.findUnique({
      where: { id: BigInt(medicationId) },
    });

    if (!medication) {
      throw new NotFoundException(`Medication with ID ${medicationId} not found`);
    }

    const updateData: any = { ...data };
    if (data.startDate) {
      updateData.startDate = new Date(data.startDate);
    }
    if (data.endDate) {
      updateData.endDate = new Date(data.endDate);
    }

    const updatedMedication = await this.prisma.residentMedication.update({
      where: { id: BigInt(medicationId) },
      data: updateData,
    });

    return this.serializeMedication(updatedMedication);
  }

  async deleteMedication(medicationId: string) {
    const medication = await this.prisma.residentMedication.findUnique({
      where: { id: BigInt(medicationId) },
    });

    if (!medication) {
      throw new NotFoundException(`Medication with ID ${medicationId} not found`);
    }

    await this.prisma.residentMedication.delete({
      where: { id: BigInt(medicationId) },
    });

    return { message: 'Medication deleted successfully' };
  }

  private serializeMedication(medication: any) {
    return {
      ...medication,
      id: medication.id.toString(),
      residentId: medication.residentId.toString(),
      startDate: medication.startDate.toISOString(),
      endDate: medication.endDate ? medication.endDate.toISOString() : null,
      createdAt: medication.createdAt.toISOString(),
      updatedAt: medication.updatedAt.toISOString(),
    };
  }
}
