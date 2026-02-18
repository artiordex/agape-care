/**
 * Description : gallery.controller.ts - ?? contents ??? API ????
 * Author : (User)
 * Date : 2026-02-16
 */

import { contentContract } from '@agape-care/api-contract';
import { Controller } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { tsRestHandler, TsRestHandler } from '@ts-rest/nest';
import { GalleryService } from './gallery.service';

@ApiTags('Contents - Gallery')
@Controller()
export class GalleryController {
  constructor(private readonly galleryService: GalleryService) {}

  @ApiOperation({ summary: '갤러리 목록 조회' })
  @TsRestHandler(contentContract.getGalleryItems)
  async getGalleryItems() {
    return tsRestHandler(contentContract.getGalleryItems, async () => {
      // Note: contentContract.getGalleryItems currently doesn't have query params in its definition,
      // but we can add them later if needed. For now, we follow the contract.
      // If the user wants pagination, we'd need to update the contract.

      const data = await this.galleryService.findAll({
        orderBy: { createdAt: 'desc' },
      });

      return {
        status: 200,
        body: {
          success: true,
          data: data as any,
        },
      };
    });
  }

  @ApiOperation({ summary: '갤러리 상세 조회' })
  @TsRestHandler(contentContract.getGalleryItem)
  async getGalleryItem() {
    return tsRestHandler(contentContract.getGalleryItem, async ({ params: { id } }) => {
      const data = await this.galleryService.findOne(BigInt(id));

      if (!data) {
        return {
          status: 404,
          body: { success: false, message: 'Gallery item not found' } as any,
        };
      }

      return {
        status: 200,
        body: {
          success: true,
          data: data as any,
        },
      };
    });
  }

  @ApiOperation({ summary: '갤러리 생성' })
  @TsRestHandler(contentContract.createGalleryItem)
  async createGalleryItem() {
    return tsRestHandler(contentContract.createGalleryItem, async ({ body }) => {
      const data = await this.galleryService.create(body);

      return {
        status: 201,
        body: {
          success: true,
          data: data as any,
        },
      };
    });
  }

  @ApiOperation({ summary: '갤러리 수정' })
  @TsRestHandler(contentContract.updateGalleryItem)
  async updateGalleryItem() {
    return tsRestHandler(contentContract.updateGalleryItem, async ({ params: { id }, body }) => {
      const data = await this.galleryService.update({
        where: { id: BigInt(id) },
        data: body,
      });

      if (!data) {
        return {
          status: 404,
          body: { success: false, message: 'Gallery item not found' } as any,
        };
      }

      return {
        status: 200,
        body: {
          success: true,
          data: data as any,
        },
      };
    });
  }

  @ApiOperation({ summary: '갤러리 삭제' })
  @TsRestHandler(contentContract.deleteGalleryItem)
  async deleteGalleryItem() {
    return tsRestHandler(contentContract.deleteGalleryItem, async ({ params: { id } }) => {
      await this.galleryService.delete({ id: BigInt(id) });

      return {
        status: 200,
        body: {
          success: true,
          data: { success: true },
        },
      };
    });
  }
}
