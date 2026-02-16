import { Prisma, PrismaService } from '@agape-care/database';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class PopupBannerService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * 팝업 목록 조회
   */
  async findAll(query: any) {
    const { page = 1, limit = 20, status, search } = query;
    const skip = (page - 1) * limit;

    const where: Prisma.PopupBannerWhereInput = {};

    // 상태 필터 (활성/비활성/예약)
    if (status) {
      const now = new Date();
      if (status === '활성') {
        where.isActive = true;
        where.startDate = { lte: now };
        where.endDate = { gte: now };
      } else if (status === '비활성') {
        where.isActive = false;
      } else if (status === '예약') {
        where.isActive = true;
        where.startDate = { gt: now };
      }
    }

    // 검색
    if (search) {
      where.OR = [{ title: { contains: search } }, { content: { contains: search } }];
    }

    const [total, data] = await Promise.all([
      this.prisma.popupBanner.count({ where }),
      this.prisma.popupBanner.findMany({
        where,
        skip,
        take: limit,
        orderBy: [{ priority: 'asc' }, { createdAt: 'desc' }],
      }),
    ]);

    console.log('[DEBUG] PopupBannerService.findAll - total:', total);

    return {
      data: data.map(this.serializePopup),
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / limit),
        hasNext: Number(page) < Math.ceil(total / limit),
        hasPrev: Number(page) > 1,
      },
    };
  }

  /**
   * 팝업 상세 조회
   */
  async findOne(id: string) {
    const popup = await this.prisma.popupBanner.findUnique({
      where: { id: BigInt(id) },
    });

    if (!popup) throw new NotFoundException('Popup not found');

    return this.serializePopup(popup);
  }

  /**
   * 팝업 생성
   */
  async create(data: any) {
    const popup = await this.prisma.popupBanner.create({
      data: {
        title: data.title,
        content: data.content,
        imageUrl: data.imageUrl,
        linkUrl: data.linkUrl,
        displayType: data.displayType || 'POPUP',
        position: data.position ? JSON.stringify(data.position) : null,
        width: data.width,
        height: data.height,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        isActive: data.isActive ?? true,
        showOnce: data.showOnce ?? false,
        priority: data.priority ?? 0,
        createdBy: data.createdBy ? BigInt(data.createdBy) : null,
      },
    });

    return this.serializePopup(popup);
  }

  /**
   * 팝업 수정
   */
  async update(id: string, data: any) {
    const updateData: any = {};

    if (data.title !== undefined) updateData.title = data.title;
    if (data.content !== undefined) updateData.content = data.content;
    if (data.imageUrl !== undefined) updateData.imageUrl = data.imageUrl;
    if (data.linkUrl !== undefined) updateData.linkUrl = data.linkUrl;
    if (data.displayType !== undefined) updateData.displayType = data.displayType;
    if (data.position !== undefined) updateData.position = JSON.stringify(data.position);
    if (data.width !== undefined) updateData.width = data.width;
    if (data.height !== undefined) updateData.height = data.height;
    if (data.startDate !== undefined) updateData.startDate = new Date(data.startDate);
    if (data.endDate !== undefined) updateData.endDate = new Date(data.endDate);
    if (data.isActive !== undefined) updateData.isActive = data.isActive;
    if (data.showOnce !== undefined) updateData.showOnce = data.showOnce;
    if (data.priority !== undefined) updateData.priority = data.priority;

    const popup = await this.prisma.popupBanner.update({
      where: { id: BigInt(id) },
      data: updateData,
    });

    return this.serializePopup(popup);
  }

  /**
   * 팝업 삭제
   */
  async delete(id: string) {
    await this.prisma.popupBanner.delete({
      where: { id: BigInt(id) },
    });
  }

  /**
   * 팝업 직렬화
   */
  private serializePopup(popup: any) {
    const now = new Date();
    const startDate = popup.startDate;
    const endDate = popup.endDate;

    // 상태 계산 (활성/비활성/예약)
    let status: '활성' | '비활성' | '예약' = '비활성';
    if (popup.isActive) {
      if (startDate > now) {
        status = '예약';
      } else if (startDate <= now && endDate >= now) {
        status = '활성';
      }
    }

    // position 파싱
    let position: { x: number; y: number } = { x: 100, y: 100 };
    if (popup.position) {
      try {
        position = JSON.parse(popup.position);
      } catch (e) {
        console.error('[ERROR] Failed to parse position:', popup.position);
      }
    }

    return {
      id: popup.id.toString(),
      title: popup.title,
      content: popup.content,
      imageUrl: popup.imageUrl,
      linkUrl: popup.linkUrl,
      displayType: popup.displayType,
      status,
      startDate: popup.startDate.toISOString().split('T')[0],
      endDate: popup.endDate.toISOString().split('T')[0],
      priority: popup.priority,
      position,
      width: popup.width,
      height: popup.height,
      showOnce: popup.showOnce,
      isActive: popup.isActive,
      createdAt: popup.createdAt.toISOString(),
      updatedAt: popup.updatedAt.toISOString(),
    };
  }
}
