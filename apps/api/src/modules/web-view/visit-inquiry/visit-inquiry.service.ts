import { CreateVisitReservation } from '@agape-care/api-contract';
import { PrismaService } from '@agape-care/database';
import { Injectable } from '@nestjs/common';

@Injectable()
export class VisitReservationService {
  constructor(private readonly db: PrismaService) {}

  async create(data: CreateVisitReservation) {
    const reservation = await this.db.visitReservation.create({
      data: {
        ...data,
        visitDate: new Date(data.visitDate),
        status: 'PENDING',
      },
    });

    return this.serialize(reservation);
  }

  async findAll(query: {
    page: number;
    limit: number;
    status?: 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELLED';
    search?: string;
    startDate?: string;
    endDate?: string;
  }) {
    const { page, limit, status, search, startDate, endDate } = query;
    const skip = (page - 1) * limit;

    const where: any = {
      ...(status && { status }),
    };

    if (search) {
      where.OR = [
        { visitorName: { contains: search, mode: 'insensitive' } },
        { residentName: { contains: search, mode: 'insensitive' } },
        { visitorPhone: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (startDate || endDate) {
      where.visitDate = {};
      if (startDate) where.visitDate.gte = new Date(startDate);
      if (endDate) where.visitDate.lte = new Date(endDate);
    }

    const [total, items] = await Promise.all([
      this.db.visitReservation.count({ where }),
      this.db.visitReservation.findMany({
        where,
        skip,
        take: limit,
        orderBy: { visitDate: 'desc' },
      }),
    ]);

    return {
      items: items.map(item => this.serialize(item)),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: string) {
    const reservation = await this.db.visitReservation.findUnique({
      where: { id: BigInt(id) },
    });

    if (!reservation) {
      return null;
    }

    return this.serialize(reservation);
  }

  async updateStatus(id: string, status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELLED') {
    const reservation = await this.db.visitReservation.update({
      where: { id: BigInt(id) },
      data: { status },
    });

    return this.serialize(reservation);
  }

  async delete(id: string) {
    const reservation = await this.db.visitReservation.delete({
      where: { id: BigInt(id) },
    });

    return this.serialize(reservation);
  }

  private serialize(reservation: any) {
    return {
      ...reservation,
      id: reservation.id.toString(),
      visitDate: reservation.visitDate.toISOString().split('T')[0],
      status: reservation.status as 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELLED',
      createdAt: reservation.createdAt.toISOString(),
      updatedAt: reservation.updatedAt.toISOString(),
    };
  }
}
