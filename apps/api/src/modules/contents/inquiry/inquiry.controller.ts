/**
 * Description : inquiry.controller.ts - ?? contents ??? API ????
 * Author : (User)
 * Date : 2026-02-16
 */

import { visitReservationContract, webInquiryContract } from '@agape-care/api-contract';
import { Controller } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { tsRestHandler, TsRestHandler } from '@ts-rest/nest';
import { InquiryService } from './inquiry.service';

@ApiTags('Contents - Inquiry')
@Controller()
export class InquiryController {
  constructor(private readonly inquiryService: InquiryService) {}

  // ==========================================
  // [상담 문의] Web Inquiry Handlers
  // ==========================================

  @ApiOperation({ summary: '상담 문의 등록' })
  @TsRestHandler(webInquiryContract.createWebInquiry)
  async createWebInquiry() {
    return tsRestHandler(webInquiryContract.createWebInquiry, async ({ body }) => {
      const data = await this.inquiryService.createWebInquiry(body);
      return {
        status: 201,
        body: { success: true, data: data as any, message: '상담 신청이 완료되었습니다.' },
      };
    });
  }

  @ApiOperation({ summary: '상담 문의 목록 조회' })
  @TsRestHandler(webInquiryContract.getWebInquiries)
  async getWebInquiries() {
    return tsRestHandler(webInquiryContract.getWebInquiries, async ({ query }) => {
      const result = await this.inquiryService.findAllWebInquiries(query as any);
      return {
        status: 200,
        body: {
          success: true,
          data: result.items as any,
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

  @ApiOperation({ summary: '상담 문의 상세 조회' })
  @TsRestHandler(webInquiryContract.getWebInquiry)
  async getWebInquiry() {
    return tsRestHandler(webInquiryContract.getWebInquiry, async ({ params }) => {
      const data = await this.inquiryService.findOneWebInquiry(params.id);
      if (!data) {
        return {
          status: 404,
          body: { success: false, error: { code: 'NOT_FOUND', message: '문의 내역을 찾을 수 없습니다.' } as any },
        };
      }
      return { status: 200, body: { success: true, data: data as any } };
    });
  }

  @ApiOperation({ summary: '상담 문의 상태 변경' })
  @TsRestHandler(webInquiryContract.updateWebInquiryStatus)
  async updateWebInquiryStatus() {
    return tsRestHandler(webInquiryContract.updateWebInquiryStatus, async ({ params, body }) => {
      const data = await this.inquiryService.updateWebInquiryStatus(params.id, body.status as any);
      return { status: 200, body: { success: true, data: data as any, message: '상태가 변경되었습니다.' } };
    });
  }

  @ApiOperation({ summary: '상담 문의 삭제' })
  @TsRestHandler(webInquiryContract.deleteWebInquiry)
  async deleteWebInquiry() {
    return tsRestHandler(webInquiryContract.deleteWebInquiry, async ({ params }) => {
      const data = await this.inquiryService.deleteWebInquiry(params.id);
      return { status: 200, body: { success: true, data: data as any, message: '문의 내역이 삭제되었습니다.' } };
    });
  }

  // ==========================================
  // [면회 예약] Visit Reservation Handlers
  // ==========================================

  @ApiOperation({ summary: '면회 예약 신청' })
  @TsRestHandler(visitReservationContract.createVisitReservation)
  async createVisitReservation() {
    return tsRestHandler(visitReservationContract.createVisitReservation, async ({ body }) => {
      const data = await this.inquiryService.createVisitReservation(body);
      return {
        status: 201,
        body: { success: true, data: data as any, message: '면회 예약 신청이 완료되었습니다.' },
      };
    });
  }

  @ApiOperation({ summary: '면회 예약 목록 조회' })
  @TsRestHandler(visitReservationContract.getVisitReservations)
  async getVisitReservations() {
    return tsRestHandler(visitReservationContract.getVisitReservations, async ({ query }) => {
      const result = await this.inquiryService.findAllVisitReservations(query as any);
      return {
        status: 200,
        body: {
          success: true,
          data: result.items as any,
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

  @ApiOperation({ summary: '면회 예약 상세 조회' })
  @TsRestHandler(visitReservationContract.getVisitReservation)
  async getVisitReservation() {
    return tsRestHandler(visitReservationContract.getVisitReservation, async ({ params }) => {
      const data = await this.inquiryService.findOneVisitReservation(params.id);
      if (!data) {
        return {
          status: 404,
          body: { success: false, error: { code: 'NOT_FOUND', message: '예약 내역을 찾을 수 없습니다.' } as any },
        };
      }
      return { status: 200, body: { success: true, data: data as any } };
    });
  }

  @ApiOperation({ summary: '면회 예약 상태 변경' })
  @TsRestHandler(visitReservationContract.updateVisitReservationStatus)
  async updateVisitReservationStatus() {
    return tsRestHandler(visitReservationContract.updateVisitReservationStatus, async ({ params, body }) => {
      const data = await this.inquiryService.updateVisitReservationStatus(params.id, body.status as any);
      return { status: 200, body: { success: true, data: data as any, message: '상태가 변경되었습니다.' } };
    });
  }

  @ApiOperation({ summary: '면회 예약 삭제' })
  @TsRestHandler(visitReservationContract.deleteVisitReservation)
  async deleteVisitReservation() {
    return tsRestHandler(visitReservationContract.deleteVisitReservation, async ({ params }) => {
      const data = await this.inquiryService.deleteVisitReservation(params.id);
      return { status: 200, body: { success: true, data: data as any, message: '예약 내역이 삭제되었습니다.' } };
    });
  }
}
