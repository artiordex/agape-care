/**
 * Description : resident.service.ts - ?? resident ??? ???? ?? ???
 * Author : Shiwoo Min
 * Date : 2026-02-18
 */

import {
  CreateResidentRequest,
  Gender,
  GetResidentsQuery,
  ResidentStatus,
  Resident as ResidentType,
  RoomMaster,
  UpdateResidentRequest,
} from '@agape-care/api-contract';
import { Prisma, PrismaService } from '@agape-care/database';
import { AgapeCareLogger } from '@agape-care/logger';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class ResidentService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly logger: AgapeCareLogger,
  ) {}

  async getResidents(query: GetResidentsQuery) {
    this.logger.info('입소자 목록 조회', { category: 'RESIDENT', metadata: { page: query.page, status: query.status } });
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
    this.logger.info('입소자 상세 조회', { category: 'RESIDENT', metadata: { id } });
    const resident = await this.prisma.resident.findUnique({
      where: { id: BigInt(id) },
    });

    if (!resident) {
      this.logger.warn('입소자 조회 실패 - 데이터 없음', { category: 'RESIDENT', metadata: { id } });
      throw new NotFoundException(`Resident with ID ${id} not found`);
    }

    return this.serializeResident(resident);
  }

  async createResident(data: CreateResidentRequest) {
    this.logger.info('입소자 등록 요청', { category: 'RESIDENT', metadata: { name: data.name, code: data.code } });
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

    this.logger.info('입소자 등록 완료', { category: 'RESIDENT', metadata: { id: resident.id.toString() } });
    return this.serializeResident(resident);
  }

  async updateResident(id: string, data: UpdateResidentRequest) {
    this.logger.info('입소자 정보 수정 요청', { category: 'RESIDENT', metadata: { id } });
    const resident = await this.prisma.resident.update({
      where: { id: BigInt(id) },
      data: {
        ...data,
        birthday: data.birthday ? new Date(data.birthday) : undefined,
        admissionDate: data.admissionDate ? new Date(data.admissionDate) : undefined,
        dischargeDate: data.dischargeDate ? new Date(data.dischargeDate) : undefined,
      },
    });

    this.logger.info('입소자 정보 수정 완료', { category: 'RESIDENT', metadata: { id } });
    return this.serializeResident(resident);
  }

  async deleteResident(id: string) {
    this.logger.info('입소자 삭제 요청', { category: 'RESIDENT', metadata: { id } });
    await this.prisma.resident.delete({
      where: { id: BigInt(id) },
    });
    this.logger.info('입소자 삭제 완료', { category: 'RESIDENT', metadata: { id } });
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

  async getRoomList(): Promise<RoomMaster[]> {
    const rooms = await this.prisma.room.findMany({
      where: { isActive: true },
      include: {
        _count: {
          select: {
            residentRooms: {
              where: {
                OR: [{ endsAt: null }, { endsAt: { gt: new Date() } }],
              },
            },
          },
        },
      },
      orderBy: [{ floor: 'asc' }, { roomName: 'asc' }],
    });

    return rooms.map((room: any) => ({
      id: room.id.toString(),
      facilityId: room.facilityId.toString(),
      floor: room.floor,
      roomName: room.roomName,
      capacity: room.capacity ?? 4,
      currentCount: room._count.residentRooms,
      isActive: room.isActive,
    }));
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
