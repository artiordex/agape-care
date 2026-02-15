/**
 * Description : NoticesService.ts - 📌 알림마당 서비스
 * Author : Shiwoo Min
 * Date : 2026-02-09
 */

import { CreateMealPlanRequest, GetMealPlanItemsQuery, GetMealPlansQuery, GetSchedulesQuery } from '@agape-care/api-contract';
import { Prisma, PrismaService } from '@agape-care/database';
import { Injectable, NotFoundException } from '@nestjs/common';
import * as serialize from './utils/serialization.utils';

@Injectable()
export class NoticesService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * [공지사항] GET /notices/notice
   */
  async findAllAnnouncements(params: {
    skip?: number;
    take?: number;
    where?: Prisma.WebNoticeWhereInput;
    orderBy?: Prisma.WebNoticeOrderByWithRelationInput;
  }) {
    const { skip, take, where, orderBy } = params;
    const notices = await this.prisma.webNotice.findMany({
      skip,
      take,
      where,
      orderBy,
    });
    return notices.map(n => serialize.serializeWebNotice(n));
  }

  /**
   * [공지사항] GET /notices/notice/:id
   */
  async findOneAnnouncement(where: Prisma.WebNoticeDetailWhereUniqueInput) {
    // Increment view count directly on the table first
    await this.prisma.notice.update({
      where: { id: (where as any).id },
      data: { viewCount: { increment: 1 } },
    });

    const notice = await this.prisma.webNoticeDetail.findUnique({
      where,
    });
    if (!notice) return null;
    return serialize.serializeWebNoticeDetail(notice);
  }

  /**
   * [게시판] GET /notices/board
   */
  async findAllPosts(params?: {
    skip?: number;
    take?: number;
    where?: Prisma.WebBoardPostWhereInput;
    orderBy?: Prisma.WebBoardPostOrderByWithRelationInput;
  }) {
    const { skip, take, where, orderBy } = params || {};

    const posts = await this.prisma.webBoardPost.findMany({
      skip,
      take,
      where,
      orderBy,
    });

    return posts.map(post => serialize.serializeWebBoardPost(post));
  }

  /**
   * [게시판] 게시글 개수 조회
   */
  async countPosts(where?: Prisma.BoardPostWhereInput) {
    return this.prisma.boardPost.count({
      where,
    });
  }

  /**
   * [게시판] GET /notices/board/:id
   */
  async findOnePost(where: Prisma.WebBoardPostDetailWhereUniqueInput) {
    try {
      console.log('🔍 [DEBUG] findOnePost - Start', { where });

      // Increment view count on the table
      if ((where as any).id) {
        try {
          console.log('🔍 [DEBUG] findOnePost - Updating view count for id:', (where as any).id);
          await this.prisma.boardPost.update({
            where: { id: (where as any).id },
            data: { viewCount: { increment: 1 } },
          });
          console.log('🔍 [DEBUG] findOnePost - View count updated');
        } catch (updateError) {
          console.error('⚠️ [WARN] findOnePost - View count update failed (ignoring):', updateError);
        }
      } else {
        console.warn('⚠️ [WARN] findOnePost - No ID found in where clause for view count update');
      }

      console.log('🔍 [DEBUG] findOnePost - Finding unique post...');
      const post = await this.prisma.webBoardPostDetail.findUnique({
        where,
      });
      console.log('🔍 [DEBUG] findOnePost - Post found:', !!post);

      if (!post) return null;

      console.log('🔍 [DEBUG] findOnePost - Serializing...');
      const result = serialize.serializeWebBoardPostDetail(post);
      console.log('🔍 [DEBUG] findOnePost - Serialized');
      return result;
    } catch (error) {
      console.error('💥 [ERROR] Error in findOnePost:', error);
      throw error;
    }
  }

  // 게시글 작성
  async createPost(data: Prisma.BoardPostCreateInput) {
    const post = await this.prisma.boardPost.create({
      data,
      include: { author: true, files: { include: { file: true } } },
    });
    return serialize.serializePost(post);
  }

  // 게시글 수정
  async updatePost(params: { where: Prisma.BoardPostWhereUniqueInput; data: Prisma.BoardPostUpdateInput }) {
    const { where, data } = params;
    const post = await this.prisma.boardPost.update({
      where,
      data,
      include: { author: true, files: { include: { file: true } } },
    });
    return serialize.serializePost(post);
  }

  // 게시글 삭제
  async deletePost(where: Prisma.BoardPostWhereUniqueInput) {
    return this.prisma.boardPost.delete({
      where,
    });
  }

  /**
   * [게시판] 댓글 생성
   */
  async createComment(data: Prisma.BoardCommentCreateInput) {
    const comment = await this.prisma.boardComment.create({
      data,
      include: { author: true },
    });
    return serialize.serializeComment(comment);
  }

  /**
   * [게시판] 댓글 삭제
   */
  async deleteComment(where: Prisma.BoardCommentWhereUniqueInput) {
    return this.prisma.boardComment.update({
      where,
      data: { isDeleted: true, content: 'Deleted Comment' },
    });
  }

  /**
   * [갤러리] 갤러리 전체 조회
   */
  async findAllGalleryItems(params: {
    skip?: number;
    take?: number;
    where?: Prisma.WebGalleryItemWhereInput;
    orderBy?: Prisma.WebGalleryItemOrderByWithRelationInput;
  }) {
    const { skip, take, where, orderBy } = params;
    const items = await this.prisma.webGalleryItem.findMany({
      skip,
      take,
      where,
      orderBy,
    });
    return items.map(item => serialize.serializeWebGalleryItem(item));
  }

  /**
   * [갤러리] 갤러리 상세 조회
   */
  async findOneGalleryItem(where: Prisma.GalleryItemWhereUniqueInput) {
    const item = await this.prisma.galleryItem.findUnique({
      where,
      include: {
        creator: true,
        files: { include: { file: true } },
      },
    });
    if (!item) return null;
    return serialize.serializeGalleryItem(item);
  }

  /**
   * [식단표] 식단표 목록 조회
   */
  async getMealPlans(query: GetMealPlansQuery) {
    const { page, limit } = query;
    const skip = (page - 1) * limit;

    const [mealPlans, total] = await Promise.all([
      this.prisma.webMealPlan.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.webMealPlan.count(),
    ]);

    return {
      data: mealPlans.map(mp => serialize.serializeWebMealPlan(mp)).filter((item): item is NonNullable<typeof item> => item !== null),
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * [식단표] 식단표 상세 조회
   */
  async getMealPlan(id: string) {
    const mealPlan = await this.prisma.webMealPlan.findUnique({
      where: { id: BigInt(id) },
    });

    if (!mealPlan) {
      throw new NotFoundException(`MealPlan with ID ${id} not found`);
    }

    return serialize.serializeWebMealPlan(mealPlan);
  }

  /**
   * [식단표] 현재 주 식단표 조회
   */
  async getCurrentWeekMealPlan(query: any) {
    const mealPlans = await this.prisma.webMealPlan.findMany({
      take: 1,
      orderBy: { createdAt: 'desc' },
    });

    if (mealPlans.length === 0) {
      throw new NotFoundException('No meal plan found');
    }

    return serialize.serializeWebMealPlan(mealPlans[0]);
  }

  /**
   * [식단표] 식단표 생성
   */
  async createMealPlan(data: CreateMealPlanRequest) {
    const mealPlan = await this.prisma.mealPlan.create({
      data: {
        facilityCode: data.facilityCode || 'DEFAULT',
        mealMonth: data.mealMonth,
        week_start_date: new Date(),
        createdBy: data.createdBy ? BigInt(data.createdBy) : null,
        status: data.status || 'DRAFT',
        nutritionManager: data.nutritionManager,
        notes: data.notes,
      } as any,
      include: {
        creator: true,
        mealPlanItems: true,
      },
    });

    return serialize.serializeWebMealPlan(mealPlan);
  }

  /**
   * [식단표] 식단판 세부 항목 조회
   */
  async getMealPlanItems(mealPlanId: string, query: GetMealPlanItemsQuery) {
    const { mealType, mealDate } = query;
    const where: Prisma.MealPlanItemWhereInput = {
      mealPlanId: BigInt(mealPlanId),
    };

    if (mealType) {
      where.mealType = mealType;
    }

    if (mealDate) {
      where.mealDate = new Date(mealDate);
    }

    const items = await this.prisma.mealPlanItem.findMany({
      where,
      orderBy: { mealDate: 'asc' },
    });

    const dailyMeals = serialize.groupMealPlanItemsByDate(items);

    return {
      data: dailyMeals,
      total: dailyMeals.length,
    };
  }

  /**
   * [프로그램] 프로그램 목록 조회
   */
  async findAllPrograms(query: { search?: string; isActive?: boolean; page: number; limit: number }) {
    const { search, isActive, page, limit } = query;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (search) {
      where.title = { contains: search, mode: 'insensitive' };
    }
    if (isActive !== undefined) {
      where.isActive = isActive;
    }

    const [items, totalCount] = await Promise.all([
      this.prisma.program.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.program.count({ where }),
    ]);

    return {
      items: items.map(p => this.serializeProgram(p)),
      totalCount,
      page,
      limit,
    };
  }

  /**
   * [프로그램] 프로그램 상세 조회
   */
  async findOneProgram(id: string) {
    const program = await this.prisma.program.findUnique({
      where: { id: BigInt(id) },
    });

    if (!program) {
      throw new NotFoundException(`Program with ID ${id} not found`);
    }

    return this.serializeProgram(program);
  }

  private serializeProgram(program: any) {
    return {
      ...program,
      id: program.id.toString(),
      createdBy: program.createdBy?.toString(),
      createdAt: program.createdAt,
      updatedAt: program.updatedAt,
    };
  }

  /**
   * [일정] 일정 목록 조회
   */
  async getSchedules(query: GetSchedulesQuery) {
    const { programId, page, limit } = query;
    const where: Prisma.ProgramScheduleWhereInput = {};

    if (programId) where.programId = BigInt(programId);

    const pageNum = Number(page) || 1;
    const limitNum = Number(limit) || 20;
    const skip = (pageNum - 1) * limitNum;

    const [schedules, totalCount] = await Promise.all([
      this.prisma.programSchedule.findMany({
        where,
        skip,
        take: limitNum,
        orderBy: { startsAt: 'asc' },
        include: { program: true },
      }),
      this.prisma.programSchedule.count({ where }),
    ]);

    return {
      items: schedules.map(s => this.serializeSchedule(s)),
      totalCount,
      page: pageNum,
      limit: limitNum,
    };
  }

  private serializeSchedule(schedule: any) {
    return {
      id: schedule.id.toString(),
      programId: schedule.programId.toString(),
      startTime: schedule.startsAt.toISOString(),
      endTime: schedule.endsAt ? schedule.endsAt.toISOString() : null,
      location: schedule.location,
      notes: null, // DB definition missing
      facilitatorId: null, // DB definition missing
      createdAt: schedule.createdAt.toISOString(),
      updatedAt: schedule.updatedAt.toISOString(),
      program: schedule.program ? this.serializeProgram(schedule.program) : undefined,
    };
  }
}
