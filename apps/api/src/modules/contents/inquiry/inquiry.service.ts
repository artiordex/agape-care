/**
 * Description : inquiry.service.ts - 📌 상담 및 면회 문의 통합 서비스
 * Author : (User)
 * Date : 2026-02-16
 */

import { CreateVisitReservation, CreateWebInquiry } from '@agape-care/api-contract';
import { PrismaService } from '@agape-care/database';
import { Injectable } from '@nestjs/common';

type InquiryStatus = 'PENDING' | 'IN_PROGRESS' | 'DONE' | 'CANCELLED';
type VisitStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELLED';

@Injectable()
export class InquiryService {
  constructor(private readonly db: PrismaService) {}

  // ==========================================
  // [상담 문의] Web Inquiry Logic
  // ==========================================

  async createWebInquiry(data: CreateWebInquiry) {
    const inquiry = await this.db.webInquiry.create({
      data: {
        ...data,
        preferredDate: data.preferredDate ? new Date(data.preferredDate) : null,
        status: 'PENDING',
      },
    });
    return this.serializeWebInquiry(inquiry);
  }

  async findAllWebInquiries(query: {
    page: number;
    limit: number;
    status?: InquiryStatus;
    type?: string;
    search?: string;
    startDate?: string;
    endDate?: string;
  }) {
    const { page, limit, status, type, search, startDate, endDate } = query;
    const skip = (page - 1) * limit;

    const where: any = {
      ...(status && { status }),
      ...(type && { type }),
    };

    if (search) {
      where.OR = [{ name: { contains: search, mode: 'insensitive' } }, { phone: { contains: search, mode: 'insensitive' } }];
    }

    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) where.createdAt.gte = new Date(startDate);
      if (endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        where.createdAt.lte = end;
      }
    }

    const [total, items] = await Promise.all([
      this.db.webInquiry.count({ where }),
      this.db.webInquiry.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    return {
      items: items.map(item => this.serializeWebInquiry(item)),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOneWebInquiry(id: string) {
    const inquiry = await this.db.webInquiry.findUnique({
      where: { id: BigInt(id) },
    });
    if (!inquiry) return null;
    return this.serializeWebInquiry(inquiry);
  }

  async updateWebInquiryStatus(id: string, status: InquiryStatus) {
    const inquiry = await this.db.webInquiry.update({
      where: { id: BigInt(id) },
      data: { status },
    });
    return this.serializeWebInquiry(inquiry);
  }

  async deleteWebInquiry(id: string) {
    const inquiry = await this.db.webInquiry.delete({
      where: { id: BigInt(id) },
    });
    return this.serializeWebInquiry(inquiry);
  }

  private serializeWebInquiry(inquiry: any) {
    return {
      ...inquiry,
      id: inquiry.id.toString(),
      preferredDate: inquiry.preferredDate ? inquiry.preferredDate.toISOString().split('T')[0] : null,
      status: inquiry.status as InquiryStatus,
      createdAt: inquiry.createdAt.toISOString(),
      updatedAt: inquiry.updatedAt.toISOString(),
    };
  }

  // ==========================================
  // [면회 예약] Visit Reservation Logic
  // ==========================================

  async createVisitReservation(data: CreateVisitReservation) {
    const reservation = await this.db.visitReservation.create({
      data: {
        ...data,
        visitDate: data.visitDate ? new Date(data.visitDate) : new Date(),
        status: 'PENDING',
      },
    });
    return this.serializeVisitReservation(reservation);
  }

  async findAllVisitReservations(query: {
    page: number;
    limit: number;
    status?: VisitStatus;
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
      items: items.map(item => this.serializeVisitReservation(item)),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOneVisitReservation(id: string) {
    const reservation = await this.db.visitReservation.findUnique({
      where: { id: BigInt(id) },
    });
    if (!reservation) return null;
    return this.serializeVisitReservation(reservation);
  }

  async updateVisitReservationStatus(id: string, status: VisitStatus) {
    const reservation = await this.db.visitReservation.update({
      where: { id: BigInt(id) },
      data: { status },
    });
    return this.serializeVisitReservation(reservation);
  }

  async deleteVisitReservation(id: string) {
    const reservation = await this.db.visitReservation.delete({
      where: { id: BigInt(id) },
    });
    return this.serializeVisitReservation(reservation);
  }

  private serializeVisitReservation(reservation: any) {
    return {
      ...reservation,
      id: reservation.id.toString(),
      visitDate: reservation.visitDate.toISOString().split('T')[0],
      status: reservation.status as VisitStatus,
      createdAt: reservation.createdAt.toISOString(),
      updatedAt: reservation.updatedAt.toISOString(),
    };
  }
}
