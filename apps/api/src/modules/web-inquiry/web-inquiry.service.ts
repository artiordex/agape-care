import { CreateWebInquiry } from '@agape-care/api-contract';
import { PrismaService } from '@agape-care/database';
import { Injectable } from '@nestjs/common';

@Injectable()
export class WebInquiryService {
  constructor(private readonly db: PrismaService) {}

  async create(data: CreateWebInquiry) {
    const inquiry = await this.db.webInquiry.create({
      data: {
        ...data,
        status: 'PENDING',
      },
    });

    return {
      ...inquiry,
      id: inquiry.id.toString(),
      createdAt: inquiry.createdAt.toISOString(),
      updatedAt: inquiry.updatedAt.toISOString(),
    };
  }

  async findAll(query: {
    page: number;
    limit: number;
    status?: 'PENDING' | 'IN_PROGRESS' | 'DONE';
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
      items: items.map(item => ({
        ...item,
        id: item.id.toString(),
        createdAt: item.createdAt.toISOString(),
        updatedAt: item.updatedAt.toISOString(),
      })),
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

    return {
      ...inquiry,
      id: inquiry.id.toString(),
      createdAt: inquiry.createdAt.toISOString(),
      updatedAt: inquiry.updatedAt.toISOString(),
    };
  }

  async updateStatus(id: string, status: 'PENDING' | 'IN_PROGRESS' | 'DONE') {
    const inquiry = await this.db.webInquiry.update({
      where: { id: BigInt(id) },
      data: { status },
    });

    return {
      ...inquiry,
      id: inquiry.id.toString(),
      createdAt: inquiry.createdAt.toISOString(),
      updatedAt: inquiry.updatedAt.toISOString(),
    };
  }

  async delete(id: string) {
    const inquiry = await this.db.webInquiry.delete({
      where: { id: BigInt(id) },
    });

    return {
      ...inquiry,
      id: inquiry.id.toString(),
      createdAt: inquiry.createdAt.toISOString(),
      updatedAt: inquiry.updatedAt.toISOString(),
    };
  }
}
