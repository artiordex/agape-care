import { mealContract } from '@agape-care/api-contract';
import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { MealPlanService } from './meal-plan.service';

@Controller()
@ApiTags('Contents - Meal-Plan')
export class MealPlanController {
  constructor(private readonly mealPlanService: MealPlanService) {}

  @TsRestHandler(mealContract.getMealPlans)
  async getMealPlans() {
    return tsRestHandler(mealContract.getMealPlans, async ({ query }) => {
      try {
        console.log('[DEBUG] MealPlanController.getMealPlans - query:', query);
        const result = await this.mealPlanService.findAll(query);
        console.log('[DEBUG] MealPlanController.getMealPlans - Success, count:', result.data.length);
        return { status: 200, body: result };
      } catch (error: any) {
        console.error('[ERROR] MealPlanController.getMealPlans:', error);
        throw error;
      }
    });
  }

  @TsRestHandler(mealContract.getMealPlan)
  async getMealPlan() {
    return tsRestHandler(mealContract.getMealPlan, async ({ params }) => {
      const result = await this.mealPlanService.findOne(params.id);
      if (!result) {
        return { status: 404, body: { message: 'Meal plan not found', statusCode: 404 } };
      }
      return { status: 200, body: result };
    });
  }

  @TsRestHandler(mealContract.getCurrentWeekMealPlan)
  async getCurrentWeekMealPlan() {
    return tsRestHandler(mealContract.getCurrentWeekMealPlan, async ({ query }) => {
      try {
        console.log('[DEBUG] MealPlanController.getCurrentWeekMealPlan - query:', query);
        const result = await this.mealPlanService.findCurrentWeek(query);
        if (!result) {
          console.log('[DEBUG] MealPlanController.getCurrentWeekMealPlan - Result is null (404)');
          return { status: 404, body: { message: 'Meal plan not found', statusCode: 404 } };
        }
        console.log('[DEBUG] MealPlanController.getCurrentWeekMealPlan - Success');
        return {
          status: 200,
          body: {
            ...result,
            weekStartDate: result.weekStartDate!,
            weekEndDate: result.weekEndDate!,
          },
        };
      } catch (error: any) {
        console.error('[ERROR] MealPlanController.getCurrentWeekMealPlan:', error);
        throw error;
      }
    });
  }

  @TsRestHandler(mealContract.createMealPlan)
  async createMealPlan() {
    return tsRestHandler(mealContract.createMealPlan, async ({ body }) => {
      const result = await this.mealPlanService.create(body);
      return { status: 201, body: result };
    });
  }

  @TsRestHandler(mealContract.updateMealPlan)
  async updateMealPlan() {
    return tsRestHandler(mealContract.updateMealPlan, async ({ params, body }) => {
      const result = await this.mealPlanService.update(params.id, body);
      if (!result) {
        return { status: 404, body: { message: 'Meal plan not found', statusCode: 404 } };
      }
      return { status: 200, body: result };
    });
  }

  @TsRestHandler(mealContract.deleteMealPlan)
  async deleteMealPlan() {
    return tsRestHandler(mealContract.deleteMealPlan, async ({ params }) => {
      await this.mealPlanService.delete(params.id);
      return { status: 200, body: { message: 'Deleted successfully' } };
    });
  }

  @TsRestHandler(mealContract.getMealPlanItems)
  async getMealPlanItems() {
    return tsRestHandler(mealContract.getMealPlanItems, async ({ params, query }) => {
      const result = await this.mealPlanService.findItems(params.mealPlanId, query);
      return { status: 200, body: result };
    });
  }

  @TsRestHandler(mealContract.createMealPlanItem)
  async createMealPlanItem() {
    return tsRestHandler(mealContract.createMealPlanItem, async ({ params, body }) => {
      const result = await this.mealPlanService.createItem(params.mealPlanId, body);
      return { status: 201, body: result };
    });
  }

  @TsRestHandler(mealContract.updateMealPlanItem)
  async updateMealPlanItem() {
    return tsRestHandler(mealContract.updateMealPlanItem, async ({ params, body }) => {
      const result = await this.mealPlanService.updateItem(params.mealPlanId, params.id, body);
      if (!result) {
        return { status: 404, body: { message: 'Item not found', statusCode: 404 } };
      }
      return { status: 200, body: result };
    });
  }

  @TsRestHandler(mealContract.deleteMealPlanItem)
  async deleteMealPlanItem() {
    return tsRestHandler(mealContract.deleteMealPlanItem, async ({ params }) => {
      await this.mealPlanService.deleteItem(params.mealPlanId, params.id);
      return { status: 200, body: { message: 'Deleted successfully' } };
    });
  }
}
