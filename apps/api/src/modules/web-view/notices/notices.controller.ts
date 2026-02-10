/**
 * Description : NoticesController.ts - 📌 알림마당 API Controller
 * Author : Shiwoo Min
 * Date : 2026-02-09
 */

import { GetProgramsQuery, GetSchedulesQuery, mealContract, programContract, webpageContract } from '@agape-care/api-contract';
import { Controller, Get, NotFoundException, Param, Query } from '@nestjs/common';
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
  @Get('/notices/notice')
  @ApiOperation({ summary: '공지사항 목록 조회' })
  async getNotices(@Query() query: { category?: string; isActive?: string }) {
    const { category, isActive } = query;
    const where: any = {};

    if (category) where.category = category;
    if (isActive !== undefined) where.isActive = isActive === 'true';

    const data = await this.noticesService.findAllAnnouncements({
      where,
      orderBy: { createdAt: 'desc' },
    });

    return {
      success: true,
      data: data.filter((item): item is NonNullable<typeof item> => item !== null),
    };
  }

  // 공지사항 상세 조회
  @Public()
  @Get('/notices/notice/:id')
  @ApiOperation({ summary: '공지사항 상세 조회' })
  async getNotice(@Param('id') id: string) {
    const data = await this.noticesService.findOneAnnouncement({
      id: BigInt(id),
    });

    if (!data) {
      throw new NotFoundException('Notice not found');
    }

    return {
      success: true,
      data,
    };
  }

  // 게시글 목록 조회
  @Public()
  @Get('/notices/board')
  @ApiOperation({ summary: '게시글 목록 조회' })
  async getPosts(@Query() query: { boardKey?: string; page?: string; limit?: string }) {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const boardKey = query.boardKey;
    const skip = (page - 1) * limit;

    const where = boardKey && boardKey !== 'ALL' ? { boardKey } : {};

    const posts = await this.noticesService.findAllPosts({
      skip,
      take: limit,
      where,
      orderBy: { id: 'desc' },
    });
    const total = await this.noticesService.countPosts(where);

    return {
      success: true,
      data: posts.filter((item): item is NonNullable<typeof item> => item !== null),
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1,
      },
    };
  }

  // 게시글 상세 조회
  @ApiOperation({ summary: '게시글 상세 조회' })
  @TsRestHandler(webpageContract.getPost)
  async getPost() {
    return tsRestHandler(webpageContract.getPost, async ({ params: { id } }) => {
      const post = await this.noticesService.findOnePost({
        id: BigInt(id),
      });

      if (!post) {
        return {
          status: 404,
          body: null,
        };
      }

      return {
        status: 200,
        body: {
          success: true,
          data: post,
        },
      };
    });
  }

  // 게시글 작성
  @ApiOperation({ summary: '게시글 작성' })
  @TsRestHandler(webpageContract.createPost)
  async createPost() {
    return tsRestHandler(webpageContract.createPost, async ({ body }) => {
      const data = await this.noticesService.createPost(body as any);
      if (!data) {
        return {
          status: 400,
          body: { success: false, message: '포스트 생성에 실패했습니다.' },
        };
      }
      return {
        status: 201,
        body: { success: true, data: data },
      };
    });
  }

  // 게시글 수정
  @ApiOperation({ summary: '게시글 수정' })
  @TsRestHandler(webpageContract.updatePost)
  async updatePost() {
    return tsRestHandler(webpageContract.updatePost, async ({ params: { id }, body }) => {
      const data = await this.noticesService.updatePost({
        where: { id: BigInt(id) },
        data: body as any,
      });
      return {
        status: 200,
        body: { success: true, data: data as any },
      };
    });
  }

  /**
   * [댓글] GET /notices/board/:postId/comments
   */
  @Public()
  @Get('/notices/board/:postId/comments')
  @ApiOperation({ summary: '댓글 목록 조회' })
  async getComments(@Param('postId') postId: string) {
    // Use findOnePost to get nested comments if needed, or query directly
    // Here we assume getComments is for a specific post
    const post = await this.noticesService.findOnePost({ id: BigInt(postId) });

    return {
      success: true,
      data: post?.comments || [],
    };
  }

  /**
   * [댓글] POST /notices/board/comments
   */
  @ApiOperation({ summary: '댓글 작성' })
  @TsRestHandler(webpageContract.createComment)
  async createComment() {
    return tsRestHandler(webpageContract.createComment, async ({ body }) => {
      const data = await this.noticesService.createComment(body as any);
      if (!data) {
        return {
          status: 400,
          body: { success: false, message: '댓글 생성에 실패했습니다.' },
        };
      }
      return {
        status: 201,
        body: { success: true, data: data },
      };
    });
  }

  /**
   * [댓글] DELETE /notices/board/comments/:id
   */
  @ApiOperation({ summary: '댓글 삭제' })
  @TsRestHandler(webpageContract.deleteComment)
  async deleteComment() {
    return tsRestHandler(webpageContract.deleteComment, async ({ params: { id } }) => {
      await this.noticesService.deleteComment({ id: BigInt(id) });
      return { status: 200, body: { success: true, data: { success: true } } };
    });
  }

  // 갤러리 목록 조회
  @Public()
  @Get('/notices/gallery')
  @ApiOperation({ summary: '갤러리 목록 조회' })
  async getGalleryItems() {
    const items = await this.noticesService.findAllGalleryItems({
      orderBy: { createdAt: 'desc' },
    });

    return {
      success: true,
      data: items.filter((item): item is NonNullable<typeof item> => item !== null),
    };
  }

  // 식단표 목록 조회
  @Get(mealContract.getMealPlans.path)
  @ApiOperation({ summary: '식단표 목록 조회' })
  async getMealPlans(
    @Query(new ZodValidationPipe(mealContract.getMealPlans.query))
    query: any,
  ) {
    return this.noticesService.getMealPlans(query);
  }

  // 이번 주 식단표 조회
  @Get(mealContract.getCurrentWeekMealPlan.path)
  @ApiOperation({ summary: '이번 주 식단표 조회' })
  async getCurrentWeekMealPlan(
    @Query(new ZodValidationPipe(mealContract.getCurrentWeekMealPlan.query))
    query: any,
  ) {
    return this.noticesService.getCurrentWeekMealPlan(query);
  }

  // 식단표 상세 조회
  @Get(mealContract.getMealPlan.path.replace(':id', ':id'))
  @ApiOperation({ summary: '식단표 상세 조회' })
  async getMealPlan(@Param('id') id: string) {
    return this.noticesService.getMealPlan(id);
  }

  // 식단표 항목 조회
  @Get(mealContract.getMealPlanItems.path.replace(':mealPlanId', ':mealPlanId'))
  @ApiOperation({ summary: '식단표 항목 조회' })
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
