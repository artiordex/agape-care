/**
 * Description : notice.controller.ts - ?? contents ??? API ????
 * Author : Shiwoo Min
 * Date : 2026-02-16
 */

import { contentContract } from '@agape-care/api-contract';
import { Controller } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { tsRestHandler, TsRestHandler } from '@ts-rest/nest';
import { NoticeService } from './notice.service';

@ApiTags('Contents - Notice')
@Controller()
export class NoticeController {
  constructor(private readonly noticeService: NoticeService) {}

  // 공지사항 목록 조회
  @ApiOperation({ summary: '공지사항 목록 조회' })
  @TsRestHandler(contentContract.getNotices)
  async getNotices() {
    return tsRestHandler(contentContract.getNotices, async ({ query }) => {
      const { category, isActive, page, limit } = query;
      const skip = page ? (page - 1) * (limit || 20) : undefined;
      const take = limit;

      const where: any = {};
      if (category) where.category = category;
      // isActive check
      if (isActive !== undefined) where.isActive = isActive;

      const [data, total] = await Promise.all([
        this.noticeService.findAll({
          skip,
          take,
          where,
          orderBy: [{ isPinned: 'desc' }, { createdAt: 'desc' }] as any,
        }),
        this.noticeService.count(where), // count also accepts Prisma.NoticeWhereInput
      ]);

      return {
        status: 200,
        body: {
          success: true,
          data: data.filter((item): item is NonNullable<typeof item> => item !== null),
          meta: {
            page: page || 1,
            limit: limit || 20,
            total,
            totalPages: Math.ceil(total / (limit || 20)),
            hasNext: (page || 1) < Math.ceil(total / (limit || 20)),
            hasPrev: (page || 1) > 1,
          },
        },
      };
    });
  }

  // 공지사항 상세 조회
  @ApiOperation({ summary: '공지사항 상세 조회' })
  @TsRestHandler(contentContract.getNotice)
  async getNotice() {
    return tsRestHandler(contentContract.getNotice, async ({ params: { id } }) => {
      const data = await this.noticeService.findOne(BigInt(id));

      if (!data) {
        return {
          status: 404,
          body: { success: false, message: 'Notice not found' },
        };
      }

      return {
        status: 200,
        body: {
          success: true,
          data,
        },
      };
    });
  }

  // 공지사항 생성
  @ApiOperation({ summary: '공지사항 생성' })
  @TsRestHandler(contentContract.createNotice)
  async createNotice() {
    return tsRestHandler(contentContract.createNotice, async ({ body }) => {
      const data = await this.noticeService.create(body as any);

      if (!data) {
        return {
          status: 400,
          body: { success: false, message: '공지사항 생성에 실패했습니다.' },
        };
      }

      return {
        status: 201,
        body: {
          success: true,
          data,
        },
      };
    });
  }

  // 공지사항 수정
  @ApiOperation({ summary: '공지사항 수정' })
  @TsRestHandler(contentContract.updateNotice)
  async updateNotice() {
    return tsRestHandler(contentContract.updateNotice, async ({ params: { id }, body }) => {
      const data = await this.noticeService.update({
        where: { id: BigInt(id) },
        data: body as any,
      });

      if (!data) {
        return {
          status: 404,
          body: { success: false, message: 'Notice not found' },
        };
      }

      return {
        status: 200,
        body: {
          success: true,
          data,
        },
      };
    });
  }

  // 공지사항 삭제
  @ApiOperation({ summary: '공지사항 삭제' })
  @TsRestHandler(contentContract.deleteNotice)
  async deleteNotice() {
    return tsRestHandler(contentContract.deleteNotice, async ({ params: { id } }) => {
      await this.noticeService.delete({ id: BigInt(id) });

      return {
        status: 200,
        body: {
          success: true,
          data: { success: true },
          message: '공지사항이 삭제되었습니다.',
        },
      };
    });
  }
}
