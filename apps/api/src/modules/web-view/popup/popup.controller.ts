/**
 * Description : PopupController.ts - 📌 팝업 API Controller
 * Author : Shiwoo Min
 * Date : 2026-02-16
 */

import { webPopupContract } from '@agape-care/api-contract';
import { Controller } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { tsRestHandler, TsRestHandler } from '@ts-rest/nest';
import { Public } from '../../auth/decorators/public.decorator';
import { PopupService } from './popup.service';

@ApiTags('Web - Popup')
@Controller()
export class PopupController {
  constructor(private readonly popupService: PopupService) {}

  // 활성 팝업 목록 조회
  @Public()
  @ApiOperation({ summary: '활성 팝업 목록 조회' })
  @TsRestHandler(webPopupContract.getPopups)
  async getPopups() {
    return tsRestHandler(webPopupContract.getPopups, async () => {
      console.log('[PopupController] getPopups 호출됨');
      const data = await this.popupService.getActivePopups();
      console.log('[PopupController] 조회된 팝업 개수:', data.length);
      console.log('[PopupController] 팝업 데이터:', JSON.stringify(data, null, 2));

      const filtered = data.filter((item): item is NonNullable<typeof item> => item !== null);
      console.log('[PopupController] 필터링 후 개수:', filtered.length);

      return {
        status: 200,
        body: {
          success: true,
          data: filtered,
        },
      };
    });
  }
}
