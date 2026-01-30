import { contract } from '@agape-care/api-contract';
import { Controller } from '@nestjs/common';
import { TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { WebInquiryService } from './web-inquiry.service';

@Controller()
export class WebInquiryController {
  constructor(private readonly service: WebInquiryService) {}

  @TsRestHandler(contract.webInquiry.createWebInquiry)
  async createWebInquiry() {
    return tsRestHandler(contract.webInquiry.createWebInquiry, async ({ body }) => {
      const result = await this.service.create(body);

      return {
        status: 201,
        body: {
          success: true,
          data: result,
          message: '상담 신청이 완료되었습니다.',
        },
      };
    });
  }

  @TsRestHandler(contract.webInquiry.getWebInquiries)
  async getWebInquiries() {
    return tsRestHandler(contract.webInquiry.getWebInquiries, async ({ query }) => {
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

  @TsRestHandler(contract.webInquiry.getWebInquiry)
  async getWebInquiry() {
    return tsRestHandler(contract.webInquiry.getWebInquiry, async ({ params }) => {
      const result = await this.service.findOne(params.id);

      if (!result) {
        return {
          status: 404,
          body: {
            success: false,
            error: {
              code: 'NOT_FOUND',
              message: '문의 내역을 찾을 수 없습니다.',
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

  @TsRestHandler(contract.webInquiry.updateWebInquiryStatus)
  async updateWebInquiryStatus() {
    return tsRestHandler(contract.webInquiry.updateWebInquiryStatus, async ({ params, body }) => {
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
}
