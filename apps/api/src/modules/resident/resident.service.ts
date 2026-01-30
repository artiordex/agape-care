import {
  CreateResidentRequest,
  Gender,
  GetResidentsQuery,
  ResidentStatus,
  Resident as ResidentType,
  UpdateResidentRequest,
} from '@agape-care/api-contract';
import { Prisma, PrismaService } from '@agape-care/database';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class ResidentService {
  constructor(private readonly prisma: PrismaService) {}

  async getResidents(query: GetResidentsQuery) {
    const { page, limit, status, search, sort, order } = query;
    const skip = (page - 1) * limit;

    const where: Prisma.ResidentWhereInput = {
      ...(status && { status }),
      ...(search && {
        OR: [{ name: { contains: search, mode: 'insensitive' } }, { code: { contains: search, mode: 'insensitive' } }],
      }),
    };

    const [total, data] = await Promise.all([
      this.prisma.resident.count({ where }),
      this.prisma.resident.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sort]: order },
      }),
    ]);

    return {
      data: data.map(this.serializeResident),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async getResident(id: string) {
    const resident = await this.prisma.resident.findUnique({
      where: { id: BigInt(id) },
    });

    if (!resident) {
      throw new NotFoundException(`Resident with ID ${id} not found`);
    }

    return this.serializeResident(resident);
  }

  async createResident(data: CreateResidentRequest) {
    const resident = await this.prisma.resident.create({
      data: {
        code: data.code,
        name: data.name,
        birthday: data.birthday ? new Date(data.birthday) : null,
        gender: data.gender,
        admissionDate: data.admissionDate ? new Date(data.admissionDate) : null,
        guardianName: data.guardianName,
        guardianPhone: data.guardianPhone,
        memo: data.memo,
        status: 'ADMITTED',
      },
    });

    return this.serializeResident(resident);
  }

  async updateResident(id: string, data: UpdateResidentRequest) {
    const resident = await this.prisma.resident.update({
      where: { id: BigInt(id) },
      data: {
        ...data,
        birthday: data.birthday ? new Date(data.birthday) : undefined,
        admissionDate: data.admissionDate ? new Date(data.admissionDate) : undefined,
        dischargeDate: data.dischargeDate ? new Date(data.dischargeDate) : undefined,
      },
    });

    return this.serializeResident(resident);
  }

  async deleteResident(id: string) {
    await this.prisma.resident.delete({
      where: { id: BigInt(id) },
    });
    return { message: 'Resident deleted successfully' };
  }

  async getResidentStats() {
    const total = await this.prisma.resident.count();
    const admitted = await this.prisma.resident.count({
      where: { status: 'ADMITTED' },
    });
    const onLeave = await this.prisma.resident.count({
      where: { status: 'ON_LEAVE' },
    });
    const discharged = await this.prisma.resident.count({
      where: { status: 'DISCHARGED' },
    });
    const pending = await this.prisma.resident.count({
      where: { status: 'PENDING' },
    });

    const male = await this.prisma.resident.count({
      where: { gender: 'M', status: 'ADMITTED' },
    });
    const female = await this.prisma.resident.count({
      where: { gender: 'F', status: 'ADMITTED' },
    });
    const other = await this.prisma.resident.count({
      where: { gender: 'OTHER', status: 'ADMITTED' },
    });

    // TODO: Implement average age calculation if needed
    const averageAge = null;

    return {
      total,
      admitted,
      onLeave,
      discharged,
      pending,
      byGender: { male, female, other },
      averageAge,
    };
  }

  private serializeResident(resident: Prisma.ResidentGetPayload<object>): ResidentType {
    return {
      id: resident.id.toString(),
      code: resident.code,
      name: resident.name,
      birthday: resident.birthday?.toISOString() || null,
      gender: resident.gender as Gender | null,
      nationalIdHash: resident.nationalIdHash,
      admissionDate: resident.admissionDate?.toISOString() || null,
      dischargeDate: resident.dischargeDate?.toISOString() || null,
      status: resident.status as ResidentStatus,
      guardianName: resident.guardianName,
      guardianPhone: resident.guardianPhone,
      memo: resident.memo,
      meta: (resident.meta as Record<string, unknown>) || {},
      createdAt: resident.createdAt.toISOString(),
      updatedAt: resident.updatedAt.toISOString(),
    };
  }
}
