import { Prisma, PrismaService } from '@agape-care/database';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AnnouncementService {
  constructor(private readonly prisma: PrismaService) {}

  async createAnnouncement(data: Prisma.NoticeUncheckedCreateInput) {
    const notice = await this.prisma.notice.create({
      data,
    });
    return this.serializeAnnouncement(notice);
  }

  async findAllAnnouncements(params: {
    skip?: number;
    take?: number;
    where?: Prisma.NoticeWhereInput;
    orderBy?: Prisma.NoticeOrderByWithRelationInput;
  }) {
    const { skip, take, where, orderBy } = params;
    const notices = await this.prisma.notice.findMany({
      skip,
      take,
      where,
      orderBy,
      include: { creator: true },
    });
    return notices.map(n => this.serializeAnnouncement(n));
  }

  async findOneAnnouncement(where: Prisma.NoticeWhereUniqueInput) {
    const notice = await this.prisma.notice.update({
      where,
      data: { viewCount: { increment: 1 } },
      include: { creator: true },
    });
    if (!notice) return null;
    return this.serializeAnnouncement(notice);
  }

  async updateAnnouncement(params: { where: Prisma.NoticeWhereUniqueInput; data: Prisma.NoticeUpdateInput }) {
    const { where, data } = params;
    const notice = await this.prisma.notice.update({
      data,
      where,
    });
    return this.serializeAnnouncement(notice);
  }

  async deleteAnnouncement(where: Prisma.NoticeWhereUniqueInput) {
    await this.prisma.notice.delete({
      where,
    });
    return { success: true };
  }

  private serializeAnnouncement(notice: any) {
    return {
      ...notice,
      id: notice.id.toString(),
      createdBy: notice.createdBy?.toString() || null,
    };
  }
}
