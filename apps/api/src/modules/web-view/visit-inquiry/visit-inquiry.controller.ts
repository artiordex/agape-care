/**
 * Description : visit-inquiry.controller.ts - ?? web-view ??? API ????
 * Author : Shiwoo Min
 * Date : 2026-02-18
 */

import { contract } from '@agape-care/api-contract';
import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { VisitReservationService } from './visit-inquiry.service';

@ApiTags('Web - Visit')
@Controller()
export class VisitReservationController {
  constructor(private readonly service: VisitReservationService) {}

  @TsRestHandler(contract.visitReservation.createVisitReservation)
  async createVisitReservation() {
    return tsRestHandler(contract.visitReservation.createVisitReservation, async ({ body }) => {
      const result = await this.service.create(body);

      return {
        status: 201,
        body: {
          success: true,
          data: result,
          message: '면회 예약 신청이 완료되었습니다.',
        },
      };
    });
  }

  @TsRestHandler(contract.visitReservation.getVisitReservations)
  async getVisitReservations() {
    return tsRestHandler(contract.visitReservation.getVisitReservations, async ({ query }) => {
      const result = await this.service.findAll(query);

      return {
        status: 200,
        body: {
          success: true,
          data: result.items,
          meta: {
            total: result.total,
            page: result.page,
            limit: result.limit,
            totalPages: result.totalPages,
            hasNext: result.page < result.totalPages,
            hasPrev: result.page > 1,
          },
        },
      };
    });
  }

  @TsRestHandler(contract.visitReservation.getVisitReservation)
  async getVisitReservation() {
    return tsRestHandler(contract.visitReservation.getVisitReservation, async ({ params }) => {
      const result = await this.service.findOne(params.id);

      if (!result) {
        return {
          status: 404,
          body: {
            success: false,
            error: {
              code: 'NOT_FOUND',
              message: '예약 내역을 찾을 수 없습니다.',
            },
          },
        } as any;
      }

      return {
        status: 200,
        body: {
          success: true,
          data: result,
        },
      };
    });
  }

  @TsRestHandler(contract.visitReservation.updateVisitReservationStatus)
  async updateVisitReservationStatus() {
    return tsRestHandler(contract.visitReservation.updateVisitReservationStatus, async ({ params, body }) => {
      const result = await this.service.updateStatus(params.id, body.status);

      return {
        status: 200,
        body: {
          success: true,
          data: result,
          message: '상태가 변경되었습니다.',
        },
      };
    });
  }

  @TsRestHandler(contract.visitReservation.deleteVisitReservation)
  async deleteVisitReservation() {
    return tsRestHandler(contract.visitReservation.deleteVisitReservation, async ({ params }) => {
      const result = await this.service.delete(params.id);

      return {
        status: 200,
        body: {
          success: true,
          data: result,
          message: '예약 내역이 삭제되었습니다.',
        },
      };
    });
  }
}
