import { contentContract } from '@agape-care/api-contract';
import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { PopupBannerService } from './popup-banner.service';

@Controller()
@ApiTags('Contents - Popup')
export class PopupBannerController {
  constructor(private readonly popupService: PopupBannerService) {}

  @TsRestHandler(contentContract.getPopups)
  async getPopups() {
    return tsRestHandler(contentContract.getPopups, async ({ query }) => {
      const result = await this.popupService.findAll(query);
      return { status: 200, body: { success: true, data: result.data, meta: result.pagination } };
    });
  }

  @TsRestHandler(contentContract.getPopup)
  async getPopup() {
    return tsRestHandler(contentContract.getPopup, async ({ params }) => {
      try {
        const popup = await this.popupService.findOne(params.id);
        return { status: 200, body: { success: true, data: popup } };
      } catch (error: any) {
        return {
          status: 404,
          body: {
            success: false,
            message: 'Popup not found',
          },
        };
      }
    });
  }

  @TsRestHandler(contentContract.createPopup)
  async createPopup() {
    return tsRestHandler(contentContract.createPopup, async ({ body }) => {
      try {
        const popup = await this.popupService.create(body);
        return { status: 201, body: { success: true, data: popup } };
      } catch (error: any) {
        return {
          status: 400,
          body: {
            success: false,
            message: error.message || 'Failed to create popup',
          },
        };
      }
    });
  }

  @TsRestHandler(contentContract.updatePopup)
  async updatePopup() {
    return tsRestHandler(contentContract.updatePopup, async ({ params, body }) => {
      try {
        const popup = await this.popupService.update(params.id, body);
        return { status: 200, body: { success: true, data: popup } };
      } catch (error: any) {
        return {
          status: 404,
          body: {
            success: false,
            message: 'Popup not found',
          },
        };
      }
    });
  }

  @TsRestHandler(contentContract.deletePopup)
  async deletePopup() {
    return tsRestHandler(contentContract.deletePopup, async ({ params }) => {
      try {
        await this.popupService.delete(params.id);
        return {
          status: 200,
          body: {
            success: true,
            data: { message: 'Popup deleted successfully' },
          },
        };
      } catch (error: any) {
        return {
          status: 404,
          body: {
            success: false,
            message: 'Popup not found',
          },
        };
      }
    });
  }
}
