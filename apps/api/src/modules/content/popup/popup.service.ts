import { PrismaService } from '@agape-care/database';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class PopupService {
  constructor(private readonly prisma: PrismaService) {}

  async createPopup(data: Prisma.PopupBannerCreateInput) {
    return this.prisma.popupBanner.create({
      data,
    });
  }

  async findAllPopups(params?: {
    skip?: number;
    take?: number;
    cursor?: Prisma.PopupBannerWhereUniqueInput;
    where?: Prisma.PopupBannerWhereInput;
    orderBy?: Prisma.PopupBannerOrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params || {};
    return this.prisma.popupBanner.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async findActivePopups() {
    const now = new Date();
    return this.prisma.popupBanner.findMany({
      where: {
        isActive: true,
        startDate: { lte: now },
        endDate: { gte: now },
      },
      orderBy: {
        priority: 'desc',
      },
      include: {
        creator: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async findOnePopup(where: Prisma.PopupBannerWhereUniqueInput) {
    return this.prisma.popupBanner.findUnique({
      where,
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async updatePopup(params: { where: Prisma.PopupBannerWhereUniqueInput; data: Prisma.PopupBannerUpdateInput }) {
    const { where, data } = params;
    return this.prisma.popupBanner.update({
      data,
      where,
    });
  }

  async deletePopup(where: Prisma.PopupBannerWhereUniqueInput) {
    return this.prisma.popupBanner.delete({
      where,
    });
  }
}
