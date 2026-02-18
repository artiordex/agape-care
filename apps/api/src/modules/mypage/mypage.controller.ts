/**
 * Description : mypage.controller.ts - ?? mypage ??? API ????
 * Author : Shiwoo Min
 * Date : 2026-02-18
 */

import { myPageContract } from '@agape-care/api-contract';
import { Controller } from '@nestjs/common';
import { TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { MyPageService } from './mypage.service';

@Controller()
export class MyPageController {
  constructor(private readonly myPageService: MyPageService) {}

  @TsRestHandler(myPageContract)
  async handler() {
    return tsRestHandler(myPageContract, {
      getMyProfile: async () => {
        const profile = await this.myPageService.getProfile();
        return { status: 200, body: { success: true, data: profile } };
      },
      updateMyProfile: async ({ body }) => {
        const updated = await this.myPageService.updateProfile(body);
        return { status: 200, body: { success: true, data: updated } };
      },
      getMySchedules: async () => {
        const schedules = await this.myPageService.getSchedules();
        return { status: 200, body: { success: true, data: schedules } };
      },
    });
  }
}
