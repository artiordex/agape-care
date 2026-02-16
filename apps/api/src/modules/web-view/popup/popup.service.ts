/**
 * Description : PopupService.ts - 📌 팝업 서비스
 * Author : Shiwoo Min
 * Date : 2026-02-16
 */

import { PrismaService } from '@agape-care/database';
import { Injectable } from '@nestjs/common';
import { serializePopupBanner } from './utils/popup-serialization.utils';

@Injectable()
export class PopupService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * [팝업] 활성 팝업 배너 조회
   */
  async getActivePopups() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    console.log('[PopupService] 오늘 날짜:', today.toISOString());

    const popups = await this.prisma.popupBanner.findMany({
      where: {
        isActive: true,
        startDate: { lte: today },
        endDate: { gte: today },
      },
      orderBy: [{ priority: 'desc' }, { createdAt: 'desc' }],
    });

    console.log('[PopupService] DB에서 조회된 팝업 개수:', popups.length);
    console.log(
      '[PopupService] 조회된 팝업:',
      popups.map(p => ({
        id: p.id,
        title: p.title,
        displayType: p.displayType,
        startDate: p.startDate,
        endDate: p.endDate,
        isActive: p.isActive,
      })),
    );

    const serialized = popups.map(pb => serializePopupBanner(pb));
    console.log('[PopupService] 직렬화 후 개수:', serialized.length);

    return serialized;
  }
}
