import { Prisma, PrismaService } from '@agape-care/database';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class MealPlanService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * 식단표 목록 조회
   */
  async findAll(query: any) {
    try {
      const { page = 1, limit = 20, facilityCode, status, startDate, endDate, sortOrder = 'desc' } = query;
      const skip = (page - 1) * limit;

      const where: Prisma.MealPlanWhereInput = {};

      if (facilityCode) {
        where.facilityCode = facilityCode;
      }

      if (status) {
        where.status = status;
      }

      if (startDate || endDate) {
        where.week_start_date = {};
        if (startDate) where.week_start_date.gte = new Date(startDate);
        if (endDate) where.week_start_date.lte = new Date(endDate);
      }

      console.log(
        '[DEBUG] MealPlanService.findAll - Executing queries with where:',
        JSON.stringify(where, (_, v) => (typeof v === 'bigint' ? v.toString() : v)),
      );

      const [total, data] = await Promise.all([
        this.prisma.mealPlan.count({ where }),
        this.prisma.mealPlan.findMany({
          where,
          skip,
          take: limit,
          orderBy: { week_start_date: sortOrder },
          include: {
            creator: true,
          },
        }),
      ]);

      console.log('[DEBUG] MealPlanService.findAll - Results found:', total, 'Starting serialization...');

      const result = {
        data: data.map(mp => this.serializeMealPlan(mp)),
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      };

      console.log('[DEBUG] MealPlanService.findAll - Finished successfully');
      return result;
    } catch (error) {
      console.error('[ERROR] MealPlanService.findAll:', error);
      throw error;
    }
  }

  /**
   * 식단표 상세 조회
   */
  async findOne(id: string) {
    const mealPlan = await this.prisma.mealPlan.findUnique({
      where: { id: BigInt(id) },
      include: {
        creator: true,
      },
    });

    if (!mealPlan) return null;

    return this.serializeMealPlan(mealPlan);
  }

  /**
   * 현재 주(월) 식단표 조회
   */
  async findCurrentWeek(query: any) {
    try {
      const { facilityCode, date } = query;
      const targetDate = date ? new Date(date) : new Date();

      const year = targetDate.getFullYear();
      const month = targetDate.getMonth() + 1;
      const mealMonth = year * 100 + month;

      const mealPlan = await this.prisma.mealPlan.findFirst({
        where: {
          facilityCode: facilityCode || 'DEFAULT',
          mealMonth: mealMonth,
        },
        include: {
          creator: true,
          mealPlanItems: true,
        },
      });

      if (!mealPlan) return null;

      const groupedItems = this.groupMealPlanItemsByDate(mealPlan.mealPlanItems);
      const dailyMeals = groupedItems.map(item => ({
        date: item.date,
        meals: {
          breakfast: item,
          lunch: item,
          dinner: item,
          snack: item,
        },
        totalCalories: null,
      }));

      return {
        mealPlan: this.serializeMealPlan(mealPlan),
        dailyMeals,
        weekStartDate: mealPlan.week_start_date.toISOString().split('T')[0],
        weekEndDate: new Date(mealPlan.week_start_date.getFullYear(), mealPlan.week_start_date.getMonth() + 1, 0)
          .toISOString()
          .split('T')[0],
      };
    } catch (error) {
      console.error('[ERROR] MealPlanService.findCurrentWeek:', error);
      throw error;
    }
  }

  /**
   * 식단표 생성
   */
  async create(data: any) {
    const { facilityCode, mealMonth, createdBy, status, nutritionManager, notes } = data;

    const year = Math.floor(mealMonth / 100);
    const month = mealMonth % 100;
    const week_start_date = new Date(year, month - 1, 1);
    week_start_date.setHours(9, 0, 0, 0); // Ensure consistent time or use UTC

    try {
      const mealPlan = await this.prisma.mealPlan.create({
        data: {
          facilityCode,
          mealMonth,
          week_start_date,
          status,
          nutritionManager,
          notes,
          createdBy: createdBy ? BigInt(createdBy) : null,
        },
        include: {
          creator: true,
        },
      });

      return this.serializeMealPlan(mealPlan);
    } catch (error: any) {
      if (error.code === 'P2002') {
        throw new ConflictException('Meal plan already exists for this month');
      }
      throw error;
    }
  }

  /**
   * 식단표 수정
   */
  async update(id: string, data: any) {
    const mealPlan = await this.prisma.mealPlan.update({
      where: { id: BigInt(id) },
      data: {
        ...data,
      },
      include: {
        creator: true,
      },
    });

    return this.serializeMealPlan(mealPlan);
  }

  /**
   * 식단표 삭제
   */
  async delete(id: string) {
    await this.prisma.mealPlan.delete({
      where: { id: BigInt(id) },
    });
  }

  /**
   * 식단 항목 목록 조회
   */
  async findItems(mealPlanId: string, query: any) {
    const { mealDate, mealType } = query;
    const where: Prisma.MealPlanItemWhereInput = {
      mealPlanId: BigInt(mealPlanId),
    };

    if (mealDate) {
      where.mealDate = new Date(mealDate);
    }
    if (mealType) {
      where.mealType = mealType;
    }

    const items = await this.prisma.mealPlanItem.findMany({
      where,
      orderBy: { mealDate: 'asc' },
    });

    return this.groupMealPlanItemsByDate(items);
  }

  /**
   * 식단 항목 생성
   */
  async createItem(mealPlanId: string, data: any) {
    const { date, breakfast, lunch, dinner, morningSnack, afternoonSnack } = data;
    const mealDate = new Date(date);
    const planId = BigInt(mealPlanId);

    const meals = [
      { type: 'BREAKFAST', menu: breakfast },
      { type: 'LUNCH', menu: lunch },
      { type: 'DINNER', menu: dinner },
      { type: 'MORNING_SNACK', menu: morningSnack },
      { type: 'AFTERNOON_SNACK', menu: afternoonSnack },
    ];

    for (const m of meals) {
      if (m.menu) {
        // Check existence logic to prevent duplicates if creating logic is slightly loose
        const existing = await this.prisma.mealPlanItem.findFirst({
          where: {
            mealPlanId: planId,
            mealDate: mealDate,
            mealType: m.type,
          },
        });

        if (existing) {
          await this.prisma.mealPlanItem.update({
            where: { id: existing.id },
            data: { mainMenu: m.menu },
          });
        } else {
          await this.prisma.mealPlanItem.create({
            data: {
              mealPlanId: planId,
              mealDate: mealDate,
              mealType: m.type,
              mainMenu: m.menu,
            },
          });
        }
      }
    }

    // Return the grouped day object
    const updatedItems = await this.prisma.mealPlanItem.findMany({
      where: { mealPlanId: planId, mealDate: mealDate },
    });
    const grouped = this.groupMealPlanItemsByDate(updatedItems);
    return grouped[0]; // Should rely on exact date match
  }

  /**
   * 식단 항목 수정
   */
  async updateItem(mealPlanId: string, id: string, data: any) {
    const { date, breakfast, lunch, dinner, morningSnack, afternoonSnack } = data;

    const planId = BigInt(mealPlanId);

    let targetDate: Date;
    if (date) {
      targetDate = new Date(date);
    } else {
      try {
        const item = await this.prisma.mealPlanItem.findUnique({ where: { id: BigInt(id) } });
        if (!item) throw new NotFoundException('Item not found');
        targetDate = item.mealDate;
      } catch (e) {
        // Fallback if ID is invalid but date is provided? No, date logic is above.
        throw new NotFoundException('Item not found');
      }
    }

    const meals = [
      { type: 'BREAKFAST', menu: breakfast },
      { type: 'LUNCH', menu: lunch },
      { type: 'DINNER', menu: dinner },
      { type: 'MORNING_SNACK', menu: morningSnack },
      { type: 'AFTERNOON_SNACK', menu: afternoonSnack },
    ];

    for (const m of meals) {
      if (m.menu !== undefined) {
        const existing = await this.prisma.mealPlanItem.findFirst({
          where: {
            mealPlanId: planId,
            mealDate: targetDate,
            mealType: m.type,
          },
        });

        if (m.menu === null || m.menu === '') {
          if (existing) {
            await this.prisma.mealPlanItem.delete({ where: { id: existing.id } });
          }
        } else {
          if (existing) {
            await this.prisma.mealPlanItem.update({
              where: { id: existing.id },
              data: { mainMenu: m.menu },
            });
          } else {
            await this.prisma.mealPlanItem.create({
              data: {
                mealPlanId: planId,
                mealDate: targetDate,
                mealType: m.type,
                mainMenu: m.menu,
              },
            });
          }
        }
      }
    }

    const updatedItems = await this.prisma.mealPlanItem.findMany({
      where: { mealPlanId: planId, mealDate: targetDate },
    });
    const grouped = this.groupMealPlanItemsByDate(updatedItems);
    return grouped[0];
  }

  /**
   * 식단 항목 삭제 (하루 치 삭제)
   */
  async deleteItem(mealPlanId: string, id: string) {
    const item = await this.prisma.mealPlanItem.findUnique({ where: { id: BigInt(id) } });
    if (!item) throw new NotFoundException('Item not found');

    const { mealDate } = item;

    await this.prisma.mealPlanItem.deleteMany({
      where: {
        mealPlanId: BigInt(mealPlanId),
        mealDate: mealDate,
      },
    });
  }

  private serializeMealPlan(mp: any) {
    // Enum validation fallback
    const validStatuses = ['DRAFT', 'PUBLISHED', 'ARCHIVED'];
    const status = validStatuses.includes(mp.status) ? mp.status : 'DRAFT';

    return {
      id: mp.id.toString(),
      facilityCode: mp.facilityCode,
      mealMonth: mp.mealMonth,
      createdBy: mp.createdBy ? mp.createdBy.toString() : null,
      createdByName: mp.creator?.name || null,
      status: status,
      nutritionManager: mp.nutritionManager,
      notes: mp.notes,
      createdAt: mp.createdAt.toISOString(),
      updatedAt: mp.updatedAt.toISOString(),
    };
  }

  private groupMealPlanItemsByDate(items: any[]) {
    const grouped = new Map<string, any>();

    items.forEach(item => {
      const dateStr =
        item.mealDate instanceof Date ? item.mealDate.toISOString().split('T')[0] : new Date(item.mealDate).toISOString().split('T')[0];

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

      // 메뉴 구성 요소를 모두 합쳐서 표시
      const menuParts = [item.mainMenu, item.sideMenu, item.soup, item.dessert].filter(Boolean);
      const menuStr = menuParts.join(', ');

      const type = item.mealType.toUpperCase();
      if (type === 'BREAKFAST') {
        dailyMeal.breakfast = menuStr;
      } else if (type === 'LUNCH') {
        dailyMeal.lunch = menuStr;
      } else if (type === 'DINNER') {
        dailyMeal.dinner = menuStr;
      } else if (type === 'SNACK') {
        // SNACK의 경우 기본적으로 오후 간식으로 처리 (필요시 로직 추가 가능)
        dailyMeal.afternoonSnack = menuStr;
      } else if (type === 'MORNING_SNACK') {
        dailyMeal.morningSnack = menuStr;
      } else if (type === 'AFTERNOON_SNACK') {
        dailyMeal.afternoonSnack = menuStr;
      }
    });

    return Array.from(grouped.values()).sort((a, b) => a.date.localeCompare(b.date));
  }
}
