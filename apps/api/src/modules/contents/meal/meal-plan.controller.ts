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
      console.log('┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓');
      console.log('┃ [MEAL-PLAN CONTROLLER] getMealPlans');
      console.log('┃ Query params:', JSON.stringify(query, null, 2));
      console.log('┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛');

      try {
        const result = await this.mealPlanService.findAll(query);

        console.log('┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓');
        console.log('┃ [MEAL-PLAN CONTROLLER] Service response:');
        console.log('┃ Data count:', result?.data?.length || 0);
        console.log('┃ Total:', result?.pagination?.total || 0);
        console.log('┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛');

        return { status: 200, body: result };
      } catch (error: any) {
        console.error('┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓');
        console.error('┃ [MEAL-PLAN CONTROLLER] ❌ ERROR');
        console.error('┃ Message:', error.message);
        console.error('┃ Query was:', JSON.stringify(query, null, 2));
        console.error('┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛');
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
      console.log('┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓');
      console.log('┃ [MEAL-PLAN CONTROLLER] getCurrentWeekMealPlan');
      console.log('┃ Query params:', JSON.stringify(query, null, 2));
      console.log('┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛');

      try {
        const result = await this.mealPlanService.findCurrentWeek(query);

        if (!result) {
          console.warn('┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓');
          console.warn('┃ [MEAL-PLAN CONTROLLER] ⚠️ Not Found (404)');
          console.warn('┃ Query was:', JSON.stringify(query, null, 2));
          console.warn('┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛');
          return { status: 404, body: { message: 'Meal plan not found', statusCode: 404 } };
        }

        console.log('┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓');
        console.log('┃ [MEAL-PLAN CONTROLLER] Service response:');
        console.log('┃ Has meal plan:', !!result.mealPlan);
        console.log('┃ Daily meals count:', result.dailyMeals?.length || 0);
        console.log('┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛');

        return {
          status: 200,
          body: {
            ...result,
            weekStartDate: result.weekStartDate!,
            weekEndDate: result.weekEndDate!,
          },
        };
      } catch (error: any) {
        console.error('┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓');
        console.error('┃ [MEAL-PLAN CONTROLLER] ❌ ERROR');
        console.error('┃ Message:', error.message);
        console.error('┃ Query was:', JSON.stringify(query, null, 2));
        console.error('┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛');
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
