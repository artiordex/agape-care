import {
  CreateMealPlanItemRequest,
  CreateMealPlanRequest,
  GetMealPlanItemsQuery,
  GetMealPlansQuery,
  UpdateMealPlanItemRequest,
  UpdateMealPlanRequest,
} from '@agape-care/api-contract';
import { PrismaService } from '@agape-care/database';
import { Injectable, NotFoundException } from '@nestjs/common';
import dayjs from 'dayjs';

@Injectable()
export class MealService {
  constructor(private readonly prisma: PrismaService) {}

  // ==================== MealPlan ====================

  async getMealPlans(query: GetMealPlansQuery) {
    const { page, limit, startDate, endDate } = query;
    const skip = (page - 1) * limit;

    const where: any = {};

    if (startDate || endDate) {
      where.weekStartDate = {};
      if (startDate) where.weekStartDate.gte = new Date(startDate);
      if (endDate) where.weekStartDate.lte = new Date(endDate);
    }

    const [mealPlans, total] = await Promise.all([
      this.prisma.mealPlan.findMany({
        where,
        skip,
        take: limit,
        orderBy: { weekStartDate: 'desc' },
        include: {
          creator: true,
        },
      }),
      this.prisma.mealPlan.count({ where }),
    ]);

    return {
      data: mealPlans.map(this.serializeMealPlan),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async getMealPlan(id: string) {
    const mealPlan = await this.prisma.mealPlan.findUnique({
      where: { id: BigInt(id) },
      include: {
        items: {
          orderBy: [{ mealDate: 'asc' }, { mealType: 'asc' }],
        },
        creator: true,
      },
    });

    if (!mealPlan) {
      throw new NotFoundException(`MealPlan with ID ${id} not found`);
    }

    return this.serializeMealPlan(mealPlan);
  }

  async getCurrentWeekMealPlan(query: any) {
    const today = dayjs();
    // Assuming week starts on Monday or Sunday depending on facility rule,
    // but commonly meal plans are weekly. Let's find a plan that covers today.
    // For simplicity, let's look for a plan where weekStartDate is near today.
    // Actually, usually weekStartDate is the first day of the week.

    // Logic: Find the latest meal plan that includes today or is the most future one?
    // Let's rely on date if provided, or today.
    const targetDate = query.date ? dayjs(query.date) : today;
    const startOfWeek = targetDate.startOf('week').toDate();
    // Note: Dayjs startOf week depends on locale. Assuming Sunday/Monday consistency needed.
    // Let's verify if schema enforces specific day. It doesn't.

    // We try to find a plan starting around this week.
    // Better strategy: Find plan where weekStartDate <= targetDate and weekStartDate + 7 days > targetDate
    // Or just exact match if strict.

    // Simple approach: Find latest plan.
    const mealPlan = await this.prisma.mealPlan.findFirst({
      orderBy: { weekStartDate: 'desc' }, // Get latest
      include: { items: true },
    });

    if (!mealPlan) {
      throw new NotFoundException('No active meal plan found');
    }

    return this.serializeMealPlan(mealPlan);
  }

  async createMealPlan(data: CreateMealPlanRequest) {
    const mealPlan = await this.prisma.mealPlan.create({
      data: {
        weekStartDate: new Date(data.weekStartDate),
        notes: data.notes,
        status: data.status || 'DRAFT',
      },
    });

    return this.serializeMealPlan(mealPlan);
  }

  async updateMealPlan(id: string, data: UpdateMealPlanRequest) {
    const mealPlan = await this.prisma.mealPlan.findUnique({
      where: { id: BigInt(id) },
    });

    if (!mealPlan) {
      throw new NotFoundException(`MealPlan with ID ${id} not found`);
    }

    const updateData: any = { ...data };
    if (data.weekStartDate) {
      updateData.weekStartDate = new Date(data.weekStartDate);
    }

    const updatedMealPlan = await this.prisma.mealPlan.update({
      where: { id: BigInt(id) },
      data: updateData,
    });

    return this.serializeMealPlan(updatedMealPlan);
  }

  async deleteMealPlan(id: string) {
    const mealPlan = await this.prisma.mealPlan.findUnique({
      where: { id: BigInt(id) },
    });

    if (!mealPlan) {
      throw new NotFoundException(`MealPlan with ID ${id} not found`);
    }

    await this.prisma.mealPlan.delete({
      where: { id: BigInt(id) },
    });

    return { message: 'MealPlan deleted successfully' };
  }

  // ==================== MealPlanItem ====================

  async getMealPlanItems(mealPlanId: string, query: GetMealPlanItemsQuery) {
    const { mealDate, mealType } = query;

    const where: any = {
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
      orderBy: [{ mealDate: 'asc' }, { mealType: 'asc' }],
    });

    return {
      data: items.map(this.serializeMealPlanItem),
      total: items.length,
      page: 1,
      limit: items.length,
      totalPages: 1,
    };
  }

  async createMealPlanItem(mealPlanId: string, data: CreateMealPlanItemRequest) {
    const item = await this.prisma.mealPlanItem.create({
      data: {
        mealPlanId: BigInt(mealPlanId),
        mealDate: new Date(data.mealDate),
        mealType: data.mealType,
        mainMenu: data.mainMenu,
        sideMenu: data.sideMenu,
        soup: data.soup,
        dessert: data.dessert,
        calories: data.calories,
        notes: data.notes,
      },
    });

    return this.serializeMealPlanItem(item);
  }

  async updateMealPlanItem(id: string, data: UpdateMealPlanItemRequest) {
    const item = await this.prisma.mealPlanItem.findUnique({
      where: { id: BigInt(id) },
    });

    if (!item) {
      throw new NotFoundException(`MealPlanItem with ID ${id} not found`);
    }

    const updateData: any = { ...data };
    if (data.mealDate) {
      updateData.mealDate = new Date(data.mealDate);
    }

    const updatedItem = await this.prisma.mealPlanItem.update({
      where: { id: BigInt(id) },
      data: updateData,
    });

    return this.serializeMealPlanItem(updatedItem);
  }

  async deleteMealPlanItem(id: string) {
    const item = await this.prisma.mealPlanItem.findUnique({
      where: { id: BigInt(id) },
    });

    if (!item) {
      throw new NotFoundException(`MealPlanItem with ID ${id} not found`);
    }

    await this.prisma.mealPlanItem.delete({
      where: { id: BigInt(id) },
    });

    return { message: 'MealPlanItem deleted successfully' };
  }

  // Helpers

  private serializeMealPlan(plan: any) {
    return {
      ...plan,
      id: plan.id.toString(),
      createdBy: plan.createdBy?.toString() ?? null,
      weekStartDate: plan.weekStartDate.toISOString().split('T')[0],
      createdAt: plan.createdAt.toISOString(),
      updatedAt: plan.updatedAt.toISOString(),
      items: plan.items?.map(this.serializeMealPlanItem) ?? [],
      creator: plan.creator
        ? {
            name: plan.creator.name,
          }
        : null,
    };
  }

  private serializeMealPlanItem(item: any) {
    return {
      ...item,
      id: item.id.toString(),
      mealPlanId: item.mealPlanId.toString(),
      mealDate: item.mealDate.toISOString().split('T')[0],
      createdAt: item.createdAt.toISOString(),
      updatedAt: item.updatedAt.toISOString(),
    };
  }
}
