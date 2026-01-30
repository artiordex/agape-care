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

  async findAll(query: { page: number; limit: number; status?: 'PENDING' | 'IN_PROGRESS' | 'DONE'; type?: string }) {
    const { page, limit, status, type } = query;
    const skip = (page - 1) * limit;

    const where = {
      ...(status && { status }),
      ...(type && { type }),
    };

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
}
