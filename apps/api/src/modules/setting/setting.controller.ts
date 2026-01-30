import { settingContract } from '@agape-care/api-contract';
import { Controller } from '@nestjs/common';
import { TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { SettingService } from './setting.service';

@Controller()
export class SettingController {
  constructor(private readonly settingService: SettingService) {}

  @TsRestHandler(settingContract)
  async handler() {
    return tsRestHandler(settingContract, {
      getFacilityInfo: async () => {
        const info = await this.settingService.getFacilityInfo();
        return { status: 200, body: info };
      },
      updateFacilityInfo: async ({ body }) => {
        const info = await this.settingService.updateFacilityInfo(body);
        return { status: 200, body: info };
      },
      getSystemConfig: async () => {
        const config = await this.settingService.getSystemConfig();
        return { status: 200, body: config };
      },
      updateSystemConfig: async ({ body }) => {
        const config = await this.settingService.updateSystemConfig(body);
        return { status: 200, body: config };
      },
      getRoles: async () => {
        const roles = await this.settingService.getRoles();
        return { status: 200, body: roles };
      },
      createRole: async ({ body }) => {
        const role = await this.settingService.createRole(body);
        return { status: 201, body: role };
      },
      updateRole: async ({ params, body }) => {
        const role = await this.settingService.updateRole(params.id, body);
        return { status: 200, body: role };
      },
      deleteRole: async ({ params }) => {
        const result = await this.settingService.deleteRole(params.id);
        return { status: 200, body: result };
      },
      getDepartments: async () => {
        const depts = await this.settingService.getDepartments();
        return { status: 200, body: depts };
      },
      createDepartment: async ({ body }) => {
        const dept = await this.settingService.createDepartment(body);
        return { status: 201, body: dept };
      },
      updateDepartment: async ({ params, body }) => {
        const dept = await this.settingService.updateDepartment(params.id, body);
        return { status: 200, body: dept };
      },
      deleteDepartment: async ({ params }) => {
        const result = await this.settingService.deleteDepartment(params.id);
        return { status: 200, body: result };
      },
    });
  }
}
