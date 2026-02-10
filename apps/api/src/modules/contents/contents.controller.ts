import { contentContract, mealContract } from '@agape-care/api-contract';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { tsRestHandler, TsRestHandler } from '@ts-rest/nest';
import { Public } from '../auth/decorators/public.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { NoticesService } from '../web-view/notices/notices.service';
import { ContentService } from './contents.service';
import { PopupService } from './popup/popup.service';

@Controller()
@UseGuards(JwtAuthGuard)
export class ContentsController {
  constructor(
    private readonly contentService: ContentService,
    private readonly noticesService: NoticesService,
    private readonly popupService: PopupService,
  ) {}

  @Public()
  @TsRestHandler(contentContract.getNotices)
  async getNotices() {
    return tsRestHandler(contentContract.getNotices, async ({ query: { category, isActive } }) => {
      const where: any = {};
      if (category) where.category = category;
      if (isActive !== undefined) where.isActive = isActive;

      const data = await this.noticesService.findAllAnnouncements({
        where,
        orderBy: { createdAt: 'desc' },
      });

      // Ensure no null values are returned to match schema
      const filteredData = data.filter((item): item is NonNullable<typeof item> => item !== null);

      return { status: 200, body: { success: true, data: filteredData as any } };
    });
  }

  @Public()
  @TsRestHandler(contentContract.getNotice)
  async getNotice() {
    return tsRestHandler(contentContract.getNotice, async ({ params: { id } }) => {
      const data = await this.noticesService.findOneAnnouncement({ id: BigInt(id) });
      if (!data) return { status: 404, body: null };
      return { status: 200, body: { success: true, data: data as any } };
    });
  }

  @Public()
  @TsRestHandler(contentContract.getGalleryItems)
  async getGalleryItems() {
    return tsRestHandler(contentContract.getGalleryItems, async () => {
      const data = await this.noticesService.findAllGalleryItems({
        orderBy: { createdAt: 'desc' },
      });

      const filteredData = data.filter((item): item is NonNullable<typeof item> => item !== null);

      return { status: 200, body: { success: true, data: filteredData as any } };
    });
  }

  @Public()
  @TsRestHandler(contentContract.getActivePopups)
  async getActivePopups() {
    return tsRestHandler(contentContract.getActivePopups, async () => {
      const data = await this.popupService.findActivePopups();
      const serializedData = data.map((item: any) => ({
        ...item,
        id: item.id.toString(),
        createdBy: item.createdBy?.toString() || null,
      }));
      return { status: 200, body: { success: true, data: serializedData } };
    });
  }

  @TsRestHandler(contentContract.getWebsiteSettings)
  async getWebsiteSettings() {
    return tsRestHandler(contentContract.getWebsiteSettings, async () => {
      return { status: 200, body: { success: true, data: [] } };
    });
  }

  // ==================== Meal Plan (Write Only) ====================

  @Post(mealContract.createMealPlan.path)
  async createMealPlan(
    @Body(new ZodValidationPipe(mealContract.createMealPlan.body))
    body: any,
  ) {
    return this.noticesService.createMealPlan(body);
  }
}
