import { dashboardContract } from '@agape-care/api-contract';
import { Controller } from '@nestjs/common';
import { TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { DashboardService } from './dashboard.service';

@Controller()
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @TsRestHandler(dashboardContract)
  async handler() {
    return tsRestHandler(dashboardContract, {
      getDashboardStats: async () => {
        const stats = await this.dashboardService.getStats();
        return { status: 200, body: stats };
      },
      getDashboardWidgets: async () => {
        const widgets = await this.dashboardService.getWidgets();
        return { status: 200, body: widgets };
      },
    });
  }
}
