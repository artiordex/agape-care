import { mealContract } from '@agape-care/api-contract';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { MealService } from './meal.service';

@Controller()
export class MealController {
  constructor(private readonly mealService: MealService) {}

  // ==================== MealPlan ====================

  @Get(mealContract.getMealPlans.path)
  async getMealPlans(
    @Query(new ZodValidationPipe(mealContract.getMealPlans.query))
    query: any,
  ) {
    return this.mealService.getMealPlans(query);
  }

  @Get(mealContract.getCurrentWeekMealPlan.path)
  async getCurrentWeekMealPlan(
    @Query(new ZodValidationPipe(mealContract.getCurrentWeekMealPlan.query))
    query: any,
  ) {
    return this.mealService.getCurrentWeekMealPlan(query);
  }

  @Get(mealContract.getMealPlan.path.replace(':id', ':id'))
  async getMealPlan(@Param('id') id: string) {
    return this.mealService.getMealPlan(id);
  }

  @Post(mealContract.createMealPlan.path)
  async createMealPlan(
    @Body(new ZodValidationPipe(mealContract.createMealPlan.body))
    body: any,
  ) {
    return this.mealService.createMealPlan(body);
  }

  @Patch(mealContract.updateMealPlan.path.replace(':id', ':id'))
  async updateMealPlan(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(mealContract.updateMealPlan.body))
    body: any,
  ) {
    return this.mealService.updateMealPlan(id, body);
  }

  @Delete(mealContract.deleteMealPlan.path.replace(':id', ':id'))
  async deleteMealPlan(@Param('id') id: string) {
    return this.mealService.deleteMealPlan(id);
  }

  // ==================== MealPlanItem ====================

  @Get(mealContract.getMealPlanItems.path.replace(':mealPlanId', ':mealPlanId'))
  async getMealPlanItems(
    @Param('mealPlanId') mealPlanId: string,
    @Query(new ZodValidationPipe(mealContract.getMealPlanItems.query))
    query: any,
  ) {
    return this.mealService.getMealPlanItems(mealPlanId, query);
  }

  @Post(mealContract.createMealPlanItem.path.replace(':mealPlanId', ':mealPlanId'))
  async createMealPlanItem(
    @Param('mealPlanId') mealPlanId: string,
    @Body(new ZodValidationPipe(mealContract.createMealPlanItem.body))
    body: any,
  ) {
    return this.mealService.createMealPlanItem(mealPlanId, body);
  }

  @Patch(mealContract.updateMealPlanItem.path.replace(':mealPlanId', ':mealPlanId').replace(':id', ':id'))
  async updateMealPlanItem(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(mealContract.updateMealPlanItem.body))
    body: any,
  ) {
    return this.mealService.updateMealPlanItem(id, body);
  }

  @Delete(mealContract.deleteMealPlanItem.path.replace(':mealPlanId', ':mealPlanId').replace(':id', ':id'))
  async deleteMealPlanItem(@Param('id') id: string) {
    return this.mealService.deleteMealPlanItem(id);
  }
}
