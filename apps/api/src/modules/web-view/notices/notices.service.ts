/**
 * Description : NoticesService.ts - 📌 알림마당 서비스
 * Author : Shiwoo Min
 * Date : 2026-02-07
 */

import { CreateMealPlanRequest, GetMealPlanItemsQuery, GetMealPlansQuery, GetSchedulesQuery } from '@agape-care/api-contract';
import { Prisma, PrismaService } from '@agape-care/database';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class NoticesService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * [공지사항] GET /notices/announcement
   * 전체 공지사항 목록 조회 (활성화된 공지만 조회하는 필터 포함)
   */
  async findAllAnnouncements(params: {
    skip?: number;
    take?: number;
    where?: Prisma.NoticeWhereInput;
    orderBy?: Prisma.NoticeOrderByWithRelationInput;
  }) {
    const { skip, take, where, orderBy } = params;
    const notices = await this.prisma.notice.findMany({
      skip,
      take,
      where,
      orderBy,
      include: { creator: true },
    });
    return notices.map(n => this.serializeAnnouncement(n));
  }

  /**
   * [공지사항] GET /notices/announcement/:id
   * 공지사항 상세 조회 (조회수 증가 포함)
   */
  async findOneAnnouncement(where: Prisma.NoticeWhereUniqueInput) {
    const notice = await this.prisma.notice.update({
      where,
      data: { viewCount: { increment: 1 } },
      include: { creator: true },
    });
    if (!notice) return null;
    return this.serializeAnnouncement(notice);
  }

  /**
   * [공지사항] 공지사항 직렬화
   * ID를 문자열로 변환하고 생성자 정보를 처리
   */
  private serializeAnnouncement(notice: any) {
    return {
      ...notice,
      id: notice.id.toString(),
      createdBy: notice.createdBy?.toString() || null,
    };
  }

  /**
   * [게시판] GET /notices/board
   * 게시판 키('FREE', 'QNA' 등)에 따른 게시글 목록 조회
   */
  async findAllPosts(params?: {
    skip?: number;
    take?: number;
    cursor?: Prisma.BoardPostWhereUniqueInput;
    where?: Prisma.BoardPostWhereInput;
    orderBy?: Prisma.BoardPostOrderByWithRelationInput;
  }) {
    const { skip, take, where, orderBy } = params || {};

    // include 제거하고 기본 조회만
    const posts = await this.prisma.boardPost.findMany({
      skip,
      take,
      where,
      orderBy,
    });

    // 간단한 직렬화만
    return posts.map(post => ({
      ...post,
      id: post.id.toString(),
      authorId: post.authorId?.toString() ?? null,
    }));
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
   * 특정 게시글 상세 정보 및 조회수 증가
   */
  async findOnePost(where: Prisma.BoardPostWhereUniqueInput) {
    console.log('🔍 findOnePost where:', where); // 추가

    const post = await this.prisma.boardPost.findUnique({
      where,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        // ✅ 임시로 comments 단순화
        comments: {
          include: {
            author: {
              select: { id: true, name: true },
            },
          },
          orderBy: { createdAt: 'asc' },
        },
        files: {
          include: {
            file: true,
          },
        },
      },
    });

    console.log('📄 Post found:', post ? 'YES' : 'NO'); // 추가

    if (!post) return null;
    return this.serializePost(post);
  }

  /**
   * [게시판] 댓글 생성
   */
  async createComment(data: Prisma.BoardCommentCreateInput) {
    return this.prisma.boardComment.create({
      data,
    });
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
    where?: Prisma.GalleryItemWhereInput;
    orderBy?: Prisma.GalleryItemOrderByWithRelationInput;
  }) {
    const { skip, take, where, orderBy } = params;
    const items = await this.prisma.galleryItem.findMany({
      skip,
      take,
      where,
      orderBy,
      include: {
        creator: true,
        files: {
          include: {
            file: true,
          },
        },
      },
    });
    return items.map(item => this.serializeGalleryItem(item));
  }

  /**
   * [게시판] 게시글 직렬화
   */
  private serializePost(post: any) {
    return {
      ...post,
      id: post.id.toString(),
      authorId: post.authorId?.toString() ?? null,
      files:
        post.files?.map((f: any) => ({
          ...f,
          id: f.id.toString(),
          postId: f.postId.toString(),
          fileId: f.fileId.toString(),
          file: f.file
            ? {
                ...f.file,
                id: f.file.id.toString(),
              }
            : null,
        })) || [],
      comments: post.comments?.map((c: any) => this.serializeComment(c)) || [],
    };
  }

  /**
   * [게시판] 댓글 직렬화
   */
  private serializeComment(comment: any) {
    return {
      ...comment,
      id: comment.id.toString(),
      postId: comment.postId.toString(),
      parentId: comment.parentId?.toString() ?? null,
      authorId: comment.authorId?.toString() ?? null,
      replies: comment.replies?.map((r: any) => this.serializeComment(r)) || [],
    };
  }

  /**
   * [갤러리] 갤러리 조회
   */
  async findOneGalleryItem(where: Prisma.GalleryItemWhereUniqueInput) {
    const item = await this.prisma.galleryItem.findUnique({
      where,
      include: {
        creator: true,
        files: {
          include: {
            file: true,
          },
        },
      },
    });
    if (!item) return null;
    return this.serializeGalleryItem(item);
  }

  /**
   * [갤러리] 갤러리 직렬화
   */
  private serializeGalleryItem(item: any) {
    return {
      ...item,
      id: item.id.toString(),
      createdBy: item.createdBy?.toString() || null,
      files:
        item.files?.map((f: any) => ({
          ...f,
          id: f.id.toString(),
          galleryId: f.galleryId.toString(),
          fileId: f.fileId.toString(),
          file: f.file
            ? {
                ...f.file,
                id: f.file.id.toString(),
              }
            : null,
        })) || [],
    };
  }

  /**
   * [식단표] 식단표 조회
   */
  async getMealPlans(query: GetMealPlansQuery) {
    const { page, limit } = query;
    const skip = (page - 1) * limit;

    const [mealPlans, total] = await Promise.all([
      this.prisma.mealPlan.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          creator: true,
          mealPlanItems: true,
        },
      }),
      this.prisma.mealPlan.count(),
    ]);

    return {
      data: mealPlans.map(this.serializeMealPlan.bind(this)),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  // 식단표 조회
  async getMealPlan(id: string) {
    const mealPlan = await this.prisma.mealPlan.findUnique({
      where: { id: BigInt(id) },
      include: {
        creator: true,
        mealPlanItems: {
          orderBy: { mealDate: 'asc' },
        },
      },
    });

    if (!mealPlan) {
      throw new NotFoundException(`MealPlan with ID ${id} not found`);
    }

    return this.serializeMealPlan(mealPlan);
  }

  /**
   * [식단표] 현재 주 식단표 조회
   */
  async getCurrentWeekMealPlan(query: any) {
    // Simplified implementation as per original service
    const mealPlans = await this.prisma.mealPlan.findMany({
      take: 1,
      orderBy: { createdAt: 'desc' },
      include: {
        creator: true,
        mealPlanItems: {
          orderBy: { mealDate: 'asc' },
        },
      },
    });

    if (mealPlans.length === 0) {
      throw new NotFoundException('No meal plan found');
    }

    return this.serializeMealPlan(mealPlans[0]);
  }

  /**
   * [식단표] 식단표 생성
   */
  async createMealPlan(data: CreateMealPlanRequest) {
    const mealPlan = await this.prisma.mealPlan.create({
      data: {
        facilityCode: data.facilityCode || 'DEFAULT',
        mealMonth: data.mealMonth,
        createdBy: data.createdBy ? BigInt(data.createdBy) : null,
        status: data.status || 'DRAFT',
        nutritionManager: data.nutritionManager,
        notes: data.notes,
      },
      include: {
        creator: true,
        mealPlanItems: true,
      },
    });

    return this.serializeMealPlan(mealPlan);
  }

  /**
   * [식단표] 식단표 아이템 조회
   */
  async getMealPlanItems(mealPlanId: string, query: GetMealPlanItemsQuery) {
    const items = await this.prisma.mealPlanItem.findMany({
      where: { mealPlanId: BigInt(mealPlanId) },
      orderBy: { mealDate: 'asc' },
    });

    const dailyMeals = this.groupMealPlanItemsByDate(items);

    return {
      data: dailyMeals,
      total: dailyMeals.length,
    };
  }

  /**
   * [식단표] 식단표 직렬화
   */
  private serializeMealPlan(mealPlan: any) {
    return {
      id: mealPlan.id.toString(),
      facilityCode: mealPlan.facilityCode,
      mealMonth: mealPlan.mealMonth,
      status: mealPlan.status,
      nutritionManager: mealPlan.nutritionManager,
      notes: mealPlan.notes,
      createdBy: mealPlan.createdBy?.toString() || null,
      createdAt: mealPlan.createdAt.toISOString(),
      updatedAt: mealPlan.updatedAt.toISOString(),
      creator: mealPlan.creator
        ? {
            id: mealPlan.creator.id.toString(),
            name: mealPlan.creator.name,
          }
        : null,
      dailyMeals: this.groupMealPlanItemsByDate(mealPlan.mealPlanItems || []),
    };
  }

  // Helper method to group mealPlanItems by date
  private groupMealPlanItemsByDate(items: any[]) {
    const grouped = new Map<string, any>();

    items.forEach(item => {
      const dateStr = item.mealDate.toISOString().split('T')[0];

      if (!grouped.has(dateStr)) {
        grouped.set(dateStr, {
          id: item.id.toString(),
          mealPlanId: item.mealPlanId.toString(),
          date: dateStr,
          breakfast: null,
          breakfastImage: null,
          morningSnack: null,
          lunch: null,
          lunchImage: null,
          afternoonSnack: null,
          dinner: null,
          dinnerImage: null,
          createdAt: item.createdAt.toISOString(),
          updatedAt: item.updatedAt.toISOString(),
        });
      }

      const dailyMeal = grouped.get(dateStr)!;

      // Map mealType to the appropriate field
      switch (item.mealType?.toUpperCase()) {
        case 'BREAKFAST':
          dailyMeal.breakfast = [item.mainMenu, item.sideMenu, item.soup, item.dessert].filter(Boolean).join('\\n');
          break;
        case 'MORNING_SNACK':
          dailyMeal.morningSnack = [item.mainMenu, item.sideMenu].filter(Boolean).join('\\n');
          break;
        case 'LUNCH':
          dailyMeal.lunch = [item.mainMenu, item.sideMenu, item.soup, item.dessert].filter(Boolean).join('\\n');
          break;
        case 'AFTERNOON_SNACK':
          dailyMeal.afternoonSnack = [item.mainMenu, item.sideMenu].filter(Boolean).join('\\n');
          break;
        case 'DINNER':
          dailyMeal.dinner = [item.mainMenu, item.sideMenu, item.soup, item.dessert].filter(Boolean).join('\\n');
          break;
      }
    });

    return Array.from(grouped.values());
  }

  // 식단표 아이템 직렬화
  private serializeMealPlanItem(item: any) {
    return {
      id: item.id.toString(),
      mealPlanId: item.mealPlanId.toString(),
      date: item.date.toISOString().split('T')[0],
      breakfast: item.breakfast,
      breakfastImage: item.breakfastImage,
      morningSnack: item.morningSnack,
      lunch: item.lunch,
      lunchImage: item.lunchImage,
      afternoonSnack: item.afternoonSnack,
      dinner: item.dinner,
      dinnerImage: item.dinnerImage,
      createdAt: item.createdAt.toISOString(),
      updatedAt: item.updatedAt.toISOString(),
    };
  }

  // 프로그램 스케줄 조회
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
      items: items.map(this.serializeProgram),
      totalCount,
      page,
      limit,
    };
  }

  // 프로그램 스케줄 조회
  async findOneProgram(id: string) {
    const program = await this.prisma.program.findUnique({
      where: { id: BigInt(id) },
    });

    if (!program) {
      throw new NotFoundException(`Program with ID ${id} not found`);
    }

    return this.serializeProgram(program);
  }

  // 프로그램 스케줄 직렬화
  private serializeProgram(program: any) {
    return {
      ...program,
      id: program.id.toString(),
      createdBy: program.createdBy?.toString(),
      createdAt: program.createdAt.toISOString(),
      updatedAt: program.updatedAt.toISOString(),
    };
  }

  // 스케줄 조회
  async getSchedules(query: GetSchedulesQuery) {
    const { programId } = query;
    const where: Prisma.ProgramScheduleWhereInput = {};

    if (programId) where.programId = BigInt(programId);

    const schedules = await this.prisma.programSchedule.findMany({
      where,
      orderBy: { startsAt: 'asc' },
      include: { program: true },
    });

    return schedules.map(this.serializeSchedule);
  }

  // 스케줄 직렬화
  private serializeSchedule(schedule: any) {
    return {
      id: schedule.id.toString(),
      programId: schedule.programId.toString(),
      startsAt: schedule.startsAt.toISOString(),
      endsAt: schedule.endsAt.toISOString(),
      location: schedule.location,
      capacity: schedule.capacity,
      status: schedule.status,
      createdAt: schedule.createdAt.toISOString(),
      updatedAt: schedule.updatedAt.toISOString(),
      program: schedule.program
        ? {
            id: schedule.program.id.toString(),
            title: schedule.program.title,
          }
        : null,
    };
  }
}
