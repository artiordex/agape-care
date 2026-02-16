/**
 * @description 팝업 및 배너 API Contract
 * @author Shiwoo Min
 * @date 2026-02-16
 */

import { z } from 'zod';
import { ApiResponseSchema } from '../schemas/common/response.schema.js';
import { PopupBannerSchema } from '../schemas/contents/popup-banner.schema.js';

export const webPopupContract = {
  /**
   * [팝업] GET /web/popups
   * 활성화된 팝업 목록 조회
   */
  getPopups: {
    method: 'GET' as const,
    path: '/web/popups',
    responses: {
      200: ApiResponseSchema(z.array(PopupBannerSchema)),
    },
  },
} as const;

export type WebPopupContract = typeof webPopupContract;
