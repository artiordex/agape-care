/**
 * Description : NoticesController.ts - 📌 알림마당 API Controller
 * Author : Shiwoo Min
 * Date : 2026-02-09
 */

import { GetProgramsQuery, GetSchedulesQuery, webpageContract } from '@agape-care/api-contract';
import { Controller } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { tsRestHandler, TsRestHandler } from '@ts-rest/nest';
import { Public } from '../../auth/decorators/public.decorator';
import { NoticesService } from './notices.service';

@ApiTags('Web - Notices')
@Controller()
export class NoticesController {
  constructor(private readonly noticesService: NoticesService) {}

  // 공지사항 목록 조회
  @Public()
  @ApiOperation({ summary: '공지사항 목록 조회' })
  @TsRestHandler(webpageContract.getNotices)
  async getNotices() {
    return tsRestHandler(webpageContract.getNotices, async ({ query }) => {
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
          data: data.filter((item): item is NonNullable<typeof item> => item !== null),
        },
      };
    });
  }

  // 공지사항 상세 조회
  @Public()
  @ApiOperation({ summary: '공지사항 상세 조회' })
  @TsRestHandler(webpageContract.getNotice)
  async getNotice() {
    return tsRestHandler(webpageContract.getNotice, async ({ params: { id } }) => {
      const data = await this.noticesService.findOneAnnouncement({
        id: BigInt(id),
      });

      if (!data) {
        return {
          status: 404,
          body: { success: false, message: 'Notice not found' },
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
  @ApiOperation({ summary: '게시글 목록 조회' })
  @TsRestHandler(webpageContract.getPosts)
  async getPosts() {
    return tsRestHandler(webpageContract.getPosts, async ({ query }) => {
      const page = query.page;
      const limit = query.limit;
      const boardKey = query.boardKey; // 이제 기본값이 'ALL'
      const skip = (page - 1) * limit;

      // 'ALL'이면 전체 조회
      const where = boardKey === 'ALL' ? {} : { boardKey };

      const posts = await this.noticesService.findAllPosts({
        skip,
        take: limit,
        where,
        orderBy: { id: 'desc' },
      });

      const total = await this.noticesService.countPosts(where);

      return {
        status: 200 as const,
        body: {
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
        },
      };
    });
  }

  // 게시글 상세 조회
  @Public()
  @ApiOperation({ summary: '게시글 상세 조회' })
  @TsRestHandler(webpageContract.getPost)
  async getPost() {
    return tsRestHandler(webpageContract.getPost, async ({ params: { id } }) => {
      const post = await this.noticesService.findOnePost({
        id: BigInt(id),
      });

      if (!post) {
        return {
          status: 404 as const,
          body: null,
        };
      }

      return {
        status: 200 as const,
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
          status: 400 as const,
          body: { success: false, message: '포스트 생성에 실패했습니다.' } as any,
        };
      }
      return {
        status: 201 as const,
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

  // 댓글 목록 조회
  @Public()
  @ApiOperation({ summary: '댓글 목록 조회' })
  @TsRestHandler(webpageContract.getComments)
  async getComments() {
    return tsRestHandler(webpageContract.getComments, async ({ params: { postId } }) => {
      const post = await this.noticesService.findOnePost({ id: BigInt(postId) });

      return {
        status: 200,
        body: {
          success: true,
          data: post?.comments || [],
        },
      };
    });
  }

  // 댓글 작성
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

  // 댓글 삭제
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
  @ApiOperation({ summary: '갤러리 목록 조회' })
  @TsRestHandler(webpageContract.getGalleryItems)
  async getGalleryItems() {
    return tsRestHandler(webpageContract.getGalleryItems, async () => {
      const items = await this.noticesService.findAllGalleryItems({
        orderBy: { createdAt: 'desc' },
      });

      return {
        status: 200 as const,
        body: {
          success: true,
          data: items.filter((item): item is NonNullable<typeof item> => item !== null),
        },
      };
    });
  }

  // 식단표 목록 조회
  @Public()
  @ApiOperation({ summary: '식단표 목록 조회' })
  @TsRestHandler(webpageContract.getMealPlans)
  async getMealPlans() {
    return tsRestHandler(webpageContract.getMealPlans, async ({ query }) => {
      const { data, pagination } = await this.noticesService.getMealPlans({ ...query, sortOrder: 'desc' });
      return {
        status: 200,
        body: {
          data,
          ...pagination,
        },
      };
    });
  }

  // 이번 주 식단표 조회
  @Public()
  @ApiOperation({ summary: '이번 주 식단표 조회' })
  @TsRestHandler(webpageContract.getCurrentWeekMealPlan)
  async getCurrentWeekMealPlan() {
    return tsRestHandler(webpageContract.getCurrentWeekMealPlan, async ({ query }) => {
      const result = await this.noticesService.getCurrentWeekMealPlan(query);

      if (!result) {
        return {
          status: 404,
          body: {
            statusCode: 404,
            message: 'Week meal plan not found',
          },
        };
      }

      return {
        status: 200,
        body: result,
      };
    });
  }

  // 식단표 상세 조회
  @Public()
  @ApiOperation({ summary: '식단표 상세 조회' })
  @TsRestHandler(webpageContract.getMealPlan)
  async getMealPlan() {
    return tsRestHandler(webpageContract.getMealPlan, async ({ params: { id } }) => {
      const result = await this.noticesService.getMealPlan(id);
      if (!result) return { status: 404, body: { success: false, message: 'Meal plan not found' } };
      return {
        status: 200,
        body: result,
      };
    });
  }

  // 식단표 항목 조회
  @Public()
  @ApiOperation({ summary: '식단표 항목 조회' })
  @TsRestHandler(webpageContract.getMealPlanItems)
  async getMealPlanItems() {
    return tsRestHandler(webpageContract.getMealPlanItems, async ({ params: { mealPlanId }, query }) => {
      const result = await this.noticesService.getMealPlanItems(mealPlanId, query);
      return {
        status: 200,
        body: result,
      };
    });
  }

  // 프로그램 목록 조회
  @Public()
  @ApiOperation({ summary: '프로그램 목록 조회' })
  @TsRestHandler(webpageContract.getPrograms)
  async findAllPrograms() {
    return tsRestHandler(webpageContract.getPrograms, async ({ query }) => {
      const params = query as GetProgramsQuery;

      const result = await this.noticesService.findAllPrograms({
        search: params.search,
        isActive: params.isActive === undefined ? undefined : String(params.isActive) === 'true',
        page: Number(params.page) || 1,
        limit: Number(params.limit) || 20,
      });

      return {
        status: 200 as const,
        body: result,
      };
    });
  }

  // 프로그램 상세 조회
  @Public()
  @ApiOperation({ summary: '프로그램 상세 조회' })
  @TsRestHandler(webpageContract.getProgram)
  async findOneProgram() {
    return tsRestHandler(webpageContract.getProgram, async ({ params: { id } }) => {
      const result = await this.noticesService.findOneProgram(id);
      return {
        status: 200 as const,
        body: result,
      };
    });
  }

  // 프로그램 일정 목록 조회
  @Public()
  @ApiOperation({ summary: '프로그램 일정 목록 조회' })
  @TsRestHandler(webpageContract.getProgramSchedules)
  async getSchedules() {
    return tsRestHandler(webpageContract.getProgramSchedules, async ({ query }) => {
      const result = await this.noticesService.getSchedules(query as GetSchedulesQuery);
      return {
        status: 200 as const,
        body: result,
      };
    });
  }
}
