import {
  CheckAttendanceRequest,
  contentContract,
  CreateAttendanceRequest,
  CreateProgramRequest,
  CreateScheduleRequest,
  mealContract,
  programContract,
  UpdateAttendanceRequest,
  UpdateProgramRequest,
  UpdateScheduleRequest,
} from '@agape-care/api-contract';
import { Body, Controller, Delete, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { tsRestHandler, TsRestHandler } from '@ts-rest/nest';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
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
      return { status: 200, body: { success: true, data } };
    });
  }

  @Public()
  @TsRestHandler(contentContract.getNotice)
  async getNotice() {
    return tsRestHandler(contentContract.getNotice, async ({ params: { id } }) => {
      const data = await this.noticesService.findOneAnnouncement({ id: BigInt(id) });
      if (!data) return { status: 404, body: { success: false, message: 'Notice not found' as any } };
      return { status: 200, body: { success: true, data } };
    });
  }

  // @TsRestHandler(contentContract.createNotice)
  // async createNotice() {
  //   return tsRestHandler(contentContract.createNotice, async ({ body }) => {
  //     const data = await this.noticesService.createAnnouncement(body as any);
  //     return { status: 201, body: { success: true, data } };
  //   });
  // }

  // @TsRestHandler(contentContract.updateNotice)
  // async updateNotice() {
  //   return tsRestHandler(contentContract.updateNotice, async ({ params: { id }, body }) => {
  //     const data = await this.noticesService.updateAnnouncement({
  //       where: { id: BigInt(id) },
  //       data: body as any,
  //     });
  //     return { status: 200, body: { success: true, data } };
  //   });
  // }

  // @TsRestHandler(contentContract.deleteNotice)
  // async deleteNotice() {
  //   return tsRestHandler(contentContract.deleteNotice, async ({ params: { id } }) => {
  //     await this.noticesService.deleteAnnouncement({ id: BigInt(id) });
  //     return { status: 200, body: { success: true, data: { success: true } } };
  //   });
  // }

  @Public()
  @TsRestHandler(contentContract.getPosts)
  async getPosts() {
    return tsRestHandler(contentContract.getPosts, async ({ query: { boardKey, page, limit } }) => {
      const skip = (page - 1) * limit;
      const data = await this.noticesService.findAllPosts({
        where: { boardKey },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      });
      const serializedData = data.map((post: any) => ({
        ...post,
        id: post.id.toString(),
        authorId: post.authorId?.toString() || null,
      }));
      return { status: 200, body: { success: true, data: serializedData } };
    });
  }

  @Public()
  @TsRestHandler(contentContract.getPost)
  async getPost() {
    return tsRestHandler(contentContract.getPost, async ({ params: { id } }) => {
      const data = await this.noticesService.findOnePost({ id: BigInt(id) });
      if (!data) return { status: 404, body: { success: false, message: 'Post not found' as any } };
      const serializedData = {
        ...data,
        id: data.id.toString(),
        authorId: data.authorId?.toString() || null,
      };
      return { status: 200, body: { success: true, data: serializedData as any } };
    });
  }

  // @TsRestHandler(contentContract.createPost)
  // async createPost() {
  //   return tsRestHandler(contentContract.createPost, async ({ body }) => {
  //     const data = await this.noticesService.createPost(body as any);
  //     const serializedData = {
  //       ...data,
  //       id: data.id.toString(),
  //       authorId: data.authorId?.toString() || null,
  //     };
  //     return { status: 201, body: { success: true, data: serializedData as any } };
  //   });
  // }

  // @TsRestHandler(contentContract.updatePost)
  // async updatePost() {
  //   return tsRestHandler(contentContract.updatePost, async ({ params: { id }, body }) => {
  //     const data = await this.noticesService.updatePost({
  //       where: { id: BigInt(id) },
  //       data: body as any,
  //     });
  //     const serializedData = {
  //       ...data,
  //       id: data.id.toString(),
  //       authorId: data.authorId?.toString() || null,
  //     };
  //     return { status: 200, body: { success: true, data: serializedData as any } };
  //   });
  // }

  // @TsRestHandler(contentContract.deletePost)
  // async deletePost() {
  //   return tsRestHandler(contentContract.deletePost, async ({ params: { id } }) => {
  //     await this.noticesService.deletePost({ id: BigInt(id) });
  //     return { status: 200, body: { success: true, data: { success: true } } };
  //   });
  // }

  @TsRestHandler(contentContract.getComments)
  async getComments() {
    return tsRestHandler(contentContract.getComments, async ({ params: { postId } }) => {
      return { status: 200, body: { success: true, data: [] } };
    });
  }

  @TsRestHandler(contentContract.createComment)
  async createComment() {
    return tsRestHandler(contentContract.createComment, async ({ body }) => {
      const data = await this.noticesService.createComment(body as any);
      const serializedData = {
        ...data,
        id: data.id.toString(),
        authorId: data.authorId?.toString() || null,
        postId: data.postId.toString(),
        parentId: data.parentId?.toString() || null,
      };
      return { status: 201, body: { success: true, data: serializedData as any } };
    });
  }

  @Public()
  @TsRestHandler(contentContract.getGalleryItems)
  async getGalleryItems() {
    return tsRestHandler(contentContract.getGalleryItems, async () => {
      const data = await this.noticesService.findAllGalleryItems({
        orderBy: { createdAt: 'desc' },
      });
      const serializedData = data.map((item: any) => ({
        ...item,
        id: item.id.toString(),
        createdBy: item.createdBy?.toString() || null,
      }));
      return { status: 200, body: { success: true, data: serializedData } };
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

  // @Patch(mealContract.updateMealPlan.path.replace(':id', ':id'))
  // async updateMealPlan(
  //   @Param('id') id: string,
  //   @Body(new ZodValidationPipe(mealContract.updateMealPlan.body))
  //   body: any,
  // ) {
  //   return this.noticesService.updateMealPlan(id, body);
  // }

  // @Delete(mealContract.deleteMealPlan.path.replace(':id', ':id'))
  // async deleteMealPlan(@Param('id') id: string) {
  //   return this.noticesService.deleteMealPlan(id);
  // }

  // @Post(mealContract.createMealPlanItem.path.replace(':mealPlanId', ':mealPlanId'))
  // async createMealPlanItem(
  //   @Param('mealPlanId') mealPlanId: string,
  //   @Body(new ZodValidationPipe(mealContract.createMealPlanItem.body))
  //   body: any,
  // ) {
  //   return this.noticesService.createMealPlanItem(mealPlanId, body);
  // }

  // @Patch(mealContract.updateMealPlanItem.path.replace(':mealPlanId', ':mealPlanId').replace(':id', ':id'))
  // async updateMealPlanItem(
  //   @Param('id') id: string,
  //   @Body(new ZodValidationPipe(mealContract.updateMealPlanItem.body))
  //   body: any,
  // ) {
  //   return this.noticesService.updateMealPlanItem(id, body);
  // }

  // @Delete(mealContract.deleteMealPlanItem.path.replace(':mealPlanId', ':mealPlanId').replace(':id', ':id'))
  // async deleteMealPlanItem(@Param('id') id: string) {
  //   return this.noticesService.deleteMealPlanItem(id);
  // }

  // // ==================== Program & Schedule (Write Only) ====================

  // @Post(programContract.createProgram.path)
  // @ApiBearerAuth()
  // @ApiOperation({ summary: '프로그램 생성' })
  // @ApiResponse({ status: 201, description: 'Created' })
  // async createProgram(@Body() createProgramDto: any, @CurrentUser('id') userId: string) {
  //   return this.noticesService.createProgram(createProgramDto as CreateProgramRequest, userId);
  // }

  // @Patch(programContract.updateProgram.path.replace(':id', ':id'))
  // @ApiBearerAuth()
  // @ApiOperation({ summary: '프로그램 수정' })
  // async updateProgram(@Param('id') id: string, @Body() updateProgramDto: any) {
  //   return this.noticesService.updateProgram(id, updateProgramDto as UpdateProgramRequest);
  // }

  // @Delete(programContract.deleteProgram.path.replace(':id', ':id'))
  // @ApiBearerAuth()
  // @ApiOperation({ summary: '프로그램 삭제' })
  // async removeProgram(@Param('id') id: string) {
  //   return this.noticesService.removeProgram(id);
  // }

  // @Post(programContract.createSchedule.path.replace(':programId', ':programId'))
  // @ApiBearerAuth()
  // @ApiOperation({ summary: '프로그램 일정 생성' })
  // async createSchedule(@Param('programId') programId: string, @Body() body: any) {
  //   return this.noticesService.createSchedule(programId, body as CreateScheduleRequest);
  // }

  // @Patch(programContract.updateSchedule.path.replace(':id', ':id'))
  // @ApiBearerAuth()
  // @ApiOperation({ summary: '프로그램 일정 수정' })
  // async updateSchedule(@Param('id') id: string, @Body() body: any) {
  //   return this.noticesService.updateSchedule(id, body as UpdateScheduleRequest);
  // }

  // @Delete(programContract.deleteSchedule.path.replace(':id', ':id'))
  // @ApiBearerAuth()
  // @ApiOperation({ summary: '프로그램 일정 삭제' })
  // async deleteSchedule(@Param('id') id: string) {
  //   return this.noticesService.deleteSchedule(id);
  // }

  // @Post(programContract.createAttendance.path.replace(':scheduleId', ':scheduleId'))
  // @ApiBearerAuth()
  // @ApiOperation({ summary: '참석자 등록' })
  // async createAttendance(@Param('scheduleId') scheduleId: string, @Body() body: any) {
  //   return this.noticesService.createAttendance(scheduleId, body as CreateAttendanceRequest);
  // }

  // @Patch(programContract.updateAttendance.path.replace(':id', ':id'))
  // @ApiBearerAuth()
  // @ApiOperation({ summary: '참석 정보 수정' })
  // async updateAttendance(@Param('id') id: string, @Body() body: any) {
  //   return this.noticesService.updateAttendance(id, body as UpdateAttendanceRequest);
  // }

  // @Post(programContract.checkAttendance.path.replace(':id', ':id'))
  // @ApiBearerAuth()
  // @ApiOperation({ summary: '출석 체크' })
  // async checkAttendance(@Param('id') id: string, @Body() body: any) {
  //   return this.noticesService.checkAttendance(id, body as CheckAttendanceRequest);
  // }

  // @Delete(programContract.deleteAttendance.path.replace(':id', ':id'))
  // @ApiBearerAuth()
  // @ApiOperation({ summary: '참석자 삭제' })
  // async deleteAttendance(@Param('id') id: string) {
  //   return this.noticesService.deleteAttendance(id);
  // }
}
