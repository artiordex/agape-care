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

@Injectable()
export class MealService {
  constructor(private readonly prisma: PrismaService) {}

  // ==================== MealPlan ====================

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
          dailyMeals: true,
        },
      }),
      this.prisma.mealPlan.count(),
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
        creator: true,
        dailyMeals: {
          orderBy: { date: 'asc' },
        },
      },
    });

    if (!mealPlan) {
      throw new NotFoundException(`MealPlan with ID ${id} not found`);
    }

    return this.serializeMealPlan(mealPlan);
  }

  async getCurrentWeekMealPlan(query: any) {
    // Get current week's meal plan (simplified implementation)
    const mealPlans = await this.prisma.mealPlan.findMany({
      take: 1,
      orderBy: { createdAt: 'desc' },
      include: {
        creator: true,
        dailyMeals: {
          orderBy: { date: 'asc' },
        },
      },
    });

    if (mealPlans.length === 0) {
      throw new NotFoundException('No meal plan found');
    }

    return this.serializeMealPlan(mealPlans[0]);
  }

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
        dailyMeals: true,
      },
    });

    return this.serializeMealPlan(mealPlan);
  }

  async updateMealPlan(id: string, data: UpdateMealPlanRequest) {
    const updateData: any = {};

    if (data.status) updateData.status = data.status;
    if (data.nutritionManager !== undefined) updateData.nutritionManager = data.nutritionManager;
    if (data.notes !== undefined) updateData.notes = data.notes;

    const mealPlan = await this.prisma.mealPlan.update({
      where: { id: BigInt(id) },
      data: updateData,
      include: {
        creator: true,
        dailyMeals: true,
      },
    });

    return this.serializeMealPlan(mealPlan);
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

  // ==================== DailyMeal (MealPlanItem) ====================

  async getMealPlanItems(mealPlanId: string, query: GetMealPlanItemsQuery) {
    const items = await this.prisma.dailyMeal.findMany({
      where: { mealPlanId: BigInt(mealPlanId) },
      orderBy: { date: 'asc' },
    });

    return {
      data: items.map(this.serializeMealPlanItem),
      total: items.length,
    };
  }

  async createMealPlanItem(mealPlanId: string, data: CreateMealPlanItemRequest) {
    const item = await this.prisma.dailyMeal.create({
      data: {
        mealPlanId: BigInt(mealPlanId),
        date: new Date(data.date),
        breakfast: data.breakfast,
        breakfastImage: data.breakfastImage,
        morningSnack: data.morningSnack,
        lunch: data.lunch,
        lunchImage: data.lunchImage,
        afternoonSnack: data.afternoonSnack,
        dinner: data.dinner,
        dinnerImage: data.dinnerImage,
      },
    });

    return this.serializeMealPlanItem(item);
  }

  async updateMealPlanItem(itemId: string, data: UpdateMealPlanItemRequest) {
    const item = await this.prisma.dailyMeal.findUnique({
      where: { id: BigInt(itemId) },
    });

    if (!item) {
      throw new NotFoundException(`DailyMeal with ID ${itemId} not found`);
    }

    const updateData: any = {};
    if (data.date) updateData.date = new Date(data.date);
    if (data.breakfast !== undefined) updateData.breakfast = data.breakfast;
    if (data.breakfastImage !== undefined) updateData.breakfastImage = data.breakfastImage;
    if (data.morningSnack !== undefined) updateData.morningSnack = data.morningSnack;
    if (data.lunch !== undefined) updateData.lunch = data.lunch;
    if (data.lunchImage !== undefined) updateData.lunchImage = data.lunchImage;
    if (data.afternoonSnack !== undefined) updateData.afternoonSnack = data.afternoonSnack;
    if (data.dinner !== undefined) updateData.dinner = data.dinner;
    if (data.dinnerImage !== undefined) updateData.dinnerImage = data.dinnerImage;

    const updatedItem = await this.prisma.dailyMeal.update({
      where: { id: BigInt(itemId) },
      data: updateData,
    });

    return this.serializeMealPlanItem(updatedItem);
  }

  async deleteMealPlanItem(itemId: string) {
    const item = await this.prisma.dailyMeal.findUnique({
      where: { id: BigInt(itemId) },
    });

    if (!item) {
      throw new NotFoundException(`DailyMeal with ID ${itemId} not found`);
    }

    await this.prisma.dailyMeal.delete({
      where: { id: BigInt(itemId) },
    });

    return { message: 'DailyMeal deleted successfully' };
  }

  // ==================== Serializers ====================

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
      dailyMeals: mealPlan.dailyMeals?.map(this.serializeMealPlanItem) || [],
    };
  }

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
}
