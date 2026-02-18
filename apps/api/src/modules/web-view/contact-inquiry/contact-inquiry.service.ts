/**
 * Description : contact-inquiry.service.ts - ?? web-view ??? ???? ?? ???
 * Author : Shiwoo Min
 * Date : 2026-02-18
 */

import { CreateWebInquiry, InquiryJobData, QUEUE_NAMES } from '@agape-care/api-contract';
import { PrismaService } from '@agape-care/database';
import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';

@Injectable()
export class WebInquiryService {
  constructor(
    private readonly db: PrismaService,
    @InjectQueue(QUEUE_NAMES.INQUIRY) private readonly inquiryQueue: Queue<InquiryJobData>,
  ) {}

  async create(data: CreateWebInquiry) {
    const inquiry = await this.db.webInquiry.create({
      data: {
        ...data,
        preferredDate: data.preferredDate ? new Date(data.preferredDate) : null,
        status: 'PENDING',
      },
    });

    await this.inquiryQueue.add('contact-inquiry', {
      inquiryId: inquiry.id.toString(),
      type: 'ADMISSION',
      name: inquiry.name,
      phone: inquiry.phone,
      content: inquiry.message ?? undefined,
    });

    return this.serialize(inquiry);
  }

  async findAll(query: {
    page: number;
    limit: number;
    status?: 'PENDING' | 'IN_PROGRESS' | 'DONE' | 'CANCELLED';
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

    // 검색 필터 (이름 또는 전화번호)
    if (search) {
      where.OR = [{ name: { contains: search, mode: 'insensitive' } }, { phone: { contains: search, mode: 'insensitive' } }];
    }

    // 날짜 필터
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
      items: items.map(item => this.serialize(item)),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: string) {
    const inquiry = await this.db.webInquiry.findUnique({
      where: { id: BigInt(id) },
    });

    if (!inquiry) {
      return null;
    }

    return this.serialize(inquiry);
  }

  async updateStatus(id: string, status: 'PENDING' | 'IN_PROGRESS' | 'DONE' | 'CANCELLED') {
    const inquiry = await this.db.webInquiry.update({
      where: { id: BigInt(id) },
      data: { status },
    });

    return this.serialize(inquiry);
  }

  async delete(id: string) {
    const inquiry = await this.db.webInquiry.delete({
      where: { id: BigInt(id) },
    });

    return this.serialize(inquiry);
  }

  private serialize(inquiry: any) {
    return {
      ...inquiry,
      id: inquiry.id.toString(),
      preferredDate: inquiry.preferredDate ? inquiry.preferredDate.toISOString().split('T')[0] : null,
      status: inquiry.status as 'PENDING' | 'IN_PROGRESS' | 'DONE' | 'CANCELLED',
      createdAt: inquiry.createdAt.toISOString(),
      updatedAt: inquiry.updatedAt.toISOString(),
    };
  }
}
