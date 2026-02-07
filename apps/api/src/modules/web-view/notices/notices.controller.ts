/**
 * Description : NoticesController.ts - 📌 알림마당 API Controller
 * Author : Shiwoo Min
 * Date : 2026-02-01
 */

import { GetProgramsQuery, GetSchedulesQuery, mealContract, programContract, webpageContract } from '@agape-care/api-contract';
import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { tsRestHandler, TsRestHandler } from '@ts-rest/nest';
import { Public } from '../../auth/decorators/public.decorator';
import { ZodValidationPipe } from '../../common/pipes/zod-validation.pipe';
import { NoticesService } from './notices.service';

@ApiTags('Web - Notices')
@Controller()
export class NoticesController {
  constructor(private readonly noticesService: NoticesService) {}

  // 공지사항 목록 조회
  @Public()
  @TsRestHandler(webpageContract.getNotices)
  async getNotices() {
    return tsRestHandler(webpageContract.getNotices, async ({ query }: { query: { category?: string; isActive?: boolean } }) => {
      const { category, isActive } = query;
      const where: any = {};

      if (category) where.category = category;
      if (isActive !== undefined) where.isActive = isActive;

      const data = await this.noticesService.findAllAnnouncements({
        where,
        orderBy: { createdAt: 'desc' },
      });

      return {
        status: 200,
        body: {
          success: true,
          data,
        },
      };
    });
  }

  // 공지사항 상세 조회
  @Public()
  @TsRestHandler(webpageContract.getNotice)
  async getNotice() {
    return tsRestHandler(webpageContract.getNotice, async ({ params }: { params: { id: string } }) => {
      const { id } = params;

      const data = await this.noticesService.findOneAnnouncement({
        id: BigInt(id),
      });

      if (!data) {
        return {
          status: 404,
          body: { success: false, message: 'Notice not found' as any },
        };
      }

      return {
        status: 200,
        body: {
          success: true,
          data,
        },
      };
    });
  }

  // 게시글 목록 조회
  @Public()
  @TsRestHandler(webpageContract.getPosts)
  async getPosts() {
    return tsRestHandler(webpageContract.getPosts, async ({ query }: { query: { boardKey?: string; page: number; limit: number } }) => {
      const { page, limit, boardKey } = query;
      const skip = (page - 1) * limit;

      const where = boardKey && boardKey !== 'ALL' ? { boardKey } : {};

      try {
        const posts = await this.noticesService.findAllPosts({
          skip,
          take: limit,
          where,
          orderBy: { id: 'desc' },
        });
        const total = await this.noticesService.countPosts(where);
        return {
          status: 200,
          body: {
            success: true,
            data: posts,
            meta: {
              page,
              limit,
              total,
              totalPages: Math.ceil(total / limit),
            },
          },
        };
      } catch (error) {
        console.error('❌ Error in getPosts:', error);
        throw error;
      }
    });
  }

  // 게시글 상세 조회
  @Public()
  @TsRestHandler(webpageContract.getPost)
  async getPost() {
    return tsRestHandler(webpageContract.getPost, async ({ params }: { params: { id: string } }) => {
      const { id } = params;

      const post = await this.noticesService.findOnePost({
        id: BigInt(id),
      });

      if (!post) {
        return {
          status: 404,
          body: null as any,
        };
      }

      return {
        status: 200,
        body: {
          success: true,
          data: post,
        } as any,
      };
    });
  }

  // 갤러리 목록 조회
  @Public()
  @TsRestHandler(webpageContract.getGalleryItems)
  async getGalleryItems() {
    return tsRestHandler(webpageContract.getGalleryItems, async () => {
      const items = await this.noticesService.findAllGalleryItems({
        orderBy: { createdAt: 'desc' },
      });

      return {
        status: 200,
        body: {
          success: true,
          data: items,
        },
      };
    });
  }

  // 식단표 목록 조회
  @Get(mealContract.getMealPlans.path)
  async getMealPlans(
    @Query(new ZodValidationPipe(mealContract.getMealPlans.query))
    query: any,
  ) {
    return this.noticesService.getMealPlans(query);
  }

  // 이번 주 식단표 조회
  @Get(mealContract.getCurrentWeekMealPlan.path)
  async getCurrentWeekMealPlan(
    @Query(new ZodValidationPipe(mealContract.getCurrentWeekMealPlan.query))
    query: any,
  ) {
    return this.noticesService.getCurrentWeekMealPlan(query);
  }

  // 식단표 상세 조회
  @Get(mealContract.getMealPlan.path.replace(':id', ':id'))
  async getMealPlan(@Param('id') id: string) {
    return this.noticesService.getMealPlan(id);
  }

  // 식단표 항목 조회
  @Get(mealContract.getMealPlanItems.path.replace(':mealPlanId', ':mealPlanId'))
  async getMealPlanItems(
    @Param('mealPlanId') mealPlanId: string,
    @Query(new ZodValidationPipe(mealContract.getMealPlanItems.query))
    query: any,
  ) {
    return this.noticesService.getMealPlanItems(mealPlanId, query);
  }

  // 프로그램 목록 조회
  @Get(programContract.getPrograms.path)
  @ApiOperation({ summary: '프로그램 목록 조회' })
  async findAllPrograms(@Query() query: any) {
    const params = query as GetProgramsQuery;

    return this.noticesService.findAllPrograms({
      search: params.search,
      isActive: params.isActive === undefined ? undefined : String(params.isActive) === 'true',
      page: Number(params.page) || 1,
      limit: Number(params.limit) || 20,
    });
  }

  // 프로그램 상세 조회
  @Get(programContract.getProgram.path.replace(':id', ':id'))
  @ApiOperation({ summary: '프로그램 상세 조회' })
  async findOneProgram(@Param('id') id: string) {
    return this.noticesService.findOneProgram(id);
  }

  // 프로그램 일정 목록 조회
  @Get(programContract.getSchedules.path)
  @ApiOperation({ summary: '프로그램 일정 목록 조회' })
  async getSchedules(@Query() query: any) {
    return this.noticesService.getSchedules(query as GetSchedulesQuery);
  }
}
