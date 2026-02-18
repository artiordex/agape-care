/**
 * Description : settings.controller.ts - ?? settings ??? API ????
 * Author : Shiwoo Min
 * Date : 2026-02-18
 */

import { settingContract } from '@agape-care/api-contract';
import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { SettingsService } from './settings.service';

@ApiTags('Settings')
@Controller()
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @TsRestHandler(settingContract)
  async handler() {
    return tsRestHandler(settingContract, {
      getFacilityInfo: async () => {
        const info = await this.settingsService.getFacilityInfo();
        return { status: 200, body: { success: true, data: info } };
      },
      updateFacilityInfo: async ({ body }: { body: any }) => {
        const info = await this.settingsService.updateFacilityInfo(body);
        return { status: 200, body: { success: true, data: info } };
      },
      getSiteInfo: async () => {
        const info = await this.settingsService.getSiteInfo();
        return { status: 200, body: { success: true, data: info } };
      },
      updateSiteInfo: async ({ body }: { body: any }) => {
        const info = await this.settingsService.updateSiteInfo(body);
        return { status: 200, body: { success: true, data: info } };
      },
      getRoles: async () => {
        const roles = await this.settingsService.getRoles();
        return { status: 200, body: { success: true, data: roles } };
      },
      createRole: async ({ body }: { body: any }) => {
        const role = await this.settingsService.createRole(body);
        return { status: 201, body: { success: true, data: role } };
      },
      updateRole: async ({ params, body }: { params: any; body: any }) => {
        const role = await this.settingsService.updateRole(params.id, body);
        return { status: 200, body: { success: true, data: role } };
      },
      deleteRole: async ({ params }: { params: any }) => {
        const result = await this.settingsService.deleteRole(params.id);
        return { status: 200, body: { success: true, data: result } };
      },
      getEmployeePermission: async ({ params }: { params: any }) => {
        const perm = await this.settingsService.getEmployeePermission(params.employeeId);
        return { status: 200, body: { success: true, data: perm } };
      },
      updateEmployeePermission: async ({ params, body }: { params: any; body: any }) => {
        const perm = await this.settingsService.updateEmployeePermission(params.employeeId, body);
        return { status: 200, body: { success: true, data: perm } };
      },
      getDepartments: async () => {
        const depts = await this.settingsService.getDepartments();
        return { status: 200, body: { success: true, data: depts } };
      },
      createDepartment: async ({ body }: { body: any }) => {
        const dept = await this.settingsService.createDepartment(body);
        return { status: 201, body: { success: true, data: dept } };
      },
      updateDepartment: async ({ params, body }: { params: any; body: any }) => {
        const dept = await this.settingsService.updateDepartment(params.id, body);
        return { status: 200, body: { success: true, data: dept } };
      },
      deleteDepartment: async ({ params }: { params: any }) => {
        const result = await this.settingsService.deleteDepartment(params.id);
        return { status: 200, body: { success: true, data: result } };
      },
    });
  }
}
