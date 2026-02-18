/**
 * Description : notices.service.ts - ?? web-view ??? ???? ?? ???
 * Author : Shiwoo Min
 * Date : 2026-02-09
 */

import { CreateMealPlanRequest, GetMealPlanItemsQuery, GetMealPlansQuery, GetSchedulesQuery } from '@agape-care/api-contract';
import { Prisma, PrismaService } from '@agape-care/database';
import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
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
      const id = BigInt((where as any).id);
      console.log('🔍 [DEBUG] findOnePost - Start', { id });

      // Increment view count on the table
      if (id) {
        try {
          console.log('🔍 [DEBUG] findOnePost - Updating view count for id:', id);
          await this.prisma.boardPost.update({
            where: { id: id },
            data: { viewCount: { increment: 1 } },
          });
          console.log('🔍 [DEBUG] findOnePost - View count updated');
        } catch (updateError) {
          console.error('⚠️ [WARN] findOnePost - View count update failed (ignoring):', updateError);
        }
      }

      console.log('🔍 [DEBUG] findOnePost - Finding unique post...');
      const post = await this.prisma.webBoardPostDetail.findUnique({
        where: { id: id },
      });
      console.log('🔍 [DEBUG] findOnePost - Post found:', !!post);

      if (!post) return null;

      // [Fix] Use queryRaw to ensure all fields like guest_nickname are correctly fetched
      const allComments: any[] = await this.prisma.$queryRawUnsafe(
        `
        SELECT * FROM board_comments
        WHERE post_id = $1 AND is_deleted = false
        ORDER BY created_at ASC
      `,
        id,
      );

      // Build Comment Tree
      const commentMap = new Map<string, any>();
      const rootComments: any[] = [];

      allComments.forEach(c => {
        commentMap.set(c.id.toString(), { ...c, replies: [] });
      });

      allComments.forEach(c => {
        const commentWithReplies = commentMap.get(c.id.toString());
        if (c.parentId) {
          const parent = commentMap.get(c.parentId.toString());
          if (parent) {
            parent.replies.push(commentWithReplies);
          } else {
            rootComments.push(commentWithReplies);
          }
        } else {
          rootComments.push(commentWithReplies);
        }
      });

      (post as any).comments = rootComments;

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
  async createPost(data: any) {
    const post = await this.prisma.boardPost.create({
      data: {
        ...data,
        authorId: data.authorId ? BigInt(data.authorId) : null,
      },
      include: { author: true, files: { include: { file: true } } },
    });
    return serialize.serializePost(post);
  }

  // 게시글 수정
  async updatePost(params: { where: Prisma.BoardPostWhereUniqueInput; data: any }) {
    const { where, data } = params;
    const post = await this.prisma.boardPost.update({
      where: { id: BigInt((where as any).id) },
      data: {
        ...data,
        authorId: data.authorId ? BigInt(data.authorId) : null,
      },
      include: { author: true, files: { include: { file: true } } },
    });
    return serialize.serializePost(post);
  }

  // 게시글 삭제
  async deletePost(where: Prisma.BoardPostWhereUniqueInput) {
    return this.prisma.boardPost.delete({
      where: { id: BigInt((where as any).id) },
    });
  }

  /**
   * [게시판] 댓글 생성
   */
  async createComment(input: any) {
    try {
      console.log('📝 [DEBUG] createComment - START (RAW SQL MODE)');
      const postId = input.postId ? BigInt(input.postId) : null;
      const parentId = input.parentId ? BigInt(input.parentId) : null;
      const authorId = input.authorId ? BigInt(input.authorId) : null;

      if (!postId) throw new Error('postId is required');

      // Use executeRaw to bypass any model/client mismatches
      await this.prisma.$executeRawUnsafe(
        `
        INSERT INTO board_comments (post_id, parent_id, author_id, content, guest_nickname, guest_password, is_deleted, created_at, updated_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW())
      `,
        postId,
        parentId,
        authorId,
        input.content || '',
        input.guestNickname || null,
        input.guestPassword || null,
        false,
      );

      console.log('📝 [DEBUG] createComment - SQL EXECUTION SUCCESS');

      // Fetch the last inserted comment to return
      const [lastComment]: any[] = await this.prisma.$queryRawUnsafe(`
        SELECT * FROM board_comments ORDER BY created_at DESC LIMIT 1
      `);

      if (!lastComment) throw new Error('Failed to retrieve created comment');

      const serialized = serialize.serializeComment(lastComment);
      return serialized;
    } catch (error: any) {
      console.error('💥 [ERROR] createComment (RAW) failed!');
      console.error('💥 [ERROR] Message:', error.message);
      if (error.stack) console.error('💥 [ERROR] Stack:', error.stack);
      throw error;
    }
  }

  async deleteComment(params: { id: bigint; password?: string }) {
    const { id, password } = params;

    // [Fix] Raw SQL fetch to ensure correct column access
    const comments: any[] = await this.prisma.$queryRawUnsafe(`SELECT * FROM board_comments WHERE id = $1`, id);
    const comment = comments[0];

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    // [Fix] 비회원 댓글(author_id IS NULL)인 경우 비밀번호 검증
    const authorId = comment.author_id === undefined ? comment.authorId : comment.author_id;
    console.log(`🔒 [DEBUG] deleteComment - id: ${id}, author_id: ${authorId} (${typeof authorId}), input pass: [${password}]`);

    if (authorId == null) {
      const dbPassword = comment.guest_password;
      console.log(`🔒 [DEBUG] Guest Password check: DB[${dbPassword}] vs Input[${password}]`);

      // 공백 제거 후 비교
      const isMatch = (dbPassword || '').toString().trim() === (password || '').trim();
      if (!isMatch) {
        throw new ForbiddenException('비밀번호가 일치하지 않습니다.');
      }
    } else {
      console.log(`🔒 [DEBUG] Member comment block: author_id is ${authorId}`);
      throw new ForbiddenException('회원 댓글은 비밀번호로 삭제할 수 없습니다.');
    }

    await this.prisma.$executeRawUnsafe(
      `
      UPDATE board_comments SET is_deleted = true, content = '삭제된 댓글입니다.', updated_at = NOW() WHERE id = $1
    `,
      id,
    );

    return { success: true };
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

    console.log(`🔍 [DEBUG] getMealPlans found: ${mealPlans.length} plans, total: ${total}`);
    if (mealPlans.length > 0) {
      console.log('🔍 [DEBUG] First Plan WeekMeals:', JSON.stringify(mealPlans[0]?.weekMeals, null, 2));
    }

    return {
      data: mealPlans.map(mp => serialize.serializeWebMealPlan(mp)).filter((item): item is NonNullable<typeof item> => item !== null),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
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
