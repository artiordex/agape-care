/**
 * Description : notice.service.ts - ?? contents ??? ???? ?? ???
 * Author : Shiwoo Min
 * Date : 2026-02-16
 */

import { Prisma, PrismaService } from '@agape-care/database';
import { Injectable, NotFoundException } from '@nestjs/common';
import * as serialize from '../../web-view/notices/utils/serialization.utils';

@Injectable()
export class NoticeService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * 공지사항 목록 조회
   */
  async findAll(params: {
    skip?: number;
    take?: number;
    where?: Prisma.NoticeWhereInput;
    orderBy?: Prisma.NoticeOrderByWithRelationInput;
  }) {
    const { skip, take, where, orderBy } = params;
    const notices = await this.prisma.webNotice.findMany({
      skip,
      take,
      where: where as any,
      orderBy: orderBy as any,
    });

    console.log('NoticeService.findAll query:', JSON.stringify(where, null, 2));
    console.log('NoticeService.findAll result count:', notices.length);
    if (notices.length > 0) {
      console.log('NoticeService.findAll sample:', serialize.serializeWebNotice(notices[0]));
    }

    return notices.map((notice: any) => serialize.serializeWebNotice(notice));
  }

  /**
   * 공지사항 개수 조회
   */
  async count(where?: Prisma.NoticeWhereInput) {
    return this.prisma.notice.count({ where });
  }

  /**
   * 공지사항 상세 조회
   */
  async findOne(id: bigint) {
    // 조회수 증가
    await this.prisma.notice.update({
      where: { id },
      data: { viewCount: { increment: 1 } },
    });

    const notice = await this.prisma.webNoticeDetail.findUnique({
      where: { id },
    });

    if (!notice) return null;

    return serialize.serializeWebNoticeDetail(notice);
  }

  /**
   * 공지사항 생성
   */
  async create(data: any) {
    const notice = await this.prisma.notice.create({
      data: {
        ...data,
        createdBy: data.createdBy ? BigInt(data.createdBy) : null,
      },
    });

    const created = await this.prisma.webNoticeDetail.findUnique({
      where: { id: notice.id },
    });

    return serialize.serializeWebNoticeDetail(created);
  }

  /**
   * 공지사항 수정
   */
  async update(params: { where: Prisma.NoticeWhereUniqueInput; data: any }) {
    const { where, data } = params;
    const { updatedBy, createdBy, ...rest } = data;

    const notice = await this.prisma.notice.update({
      where,
      data: {
        ...rest,
        createdBy: createdBy ? BigInt(createdBy) : undefined,
      },
    });

    const updated = await this.prisma.webNoticeDetail.findUnique({
      where: { id: notice.id },
    });

    return serialize.serializeWebNoticeDetail(updated);
  }

  /**
   * 공지사항 삭제
   */
  async delete(where: Prisma.NoticeWhereUniqueInput) {
    const notice = await this.prisma.notice.findUnique({ where });

    if (!notice) {
      throw new NotFoundException('Notice not found');
    }

    return this.prisma.notice.delete({ where });
  }
}
