/**
 * Description : gallery.service.ts - ?? contents ??? ???? ?? ???
 * Author : (User)
 * Date : 2026-02-16
 */

import { Prisma, PrismaService } from '@agape-care/database';
import { Injectable, NotFoundException } from '@nestjs/common';
import * as serialize from '../../web-view/notices/utils/serialization.utils';

@Injectable()
export class GalleryService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * 갤러리 목록 조회
   */
  async findAll(params: { skip?: number; take?: number; where?: Prisma.GalleryItemWhereInput; orderBy?: any }) {
    const { skip, take, where, orderBy } = params;

    const items = await this.prisma.galleryItem.findMany({
      skip,
      take,
      where,
      orderBy,
      include: {
        creator: true,
        files: {
          include: {
            file: true,
          },
        },
      },
    });

    return items.map(item => serialize.serializeGalleryItem(item));
  }

  /**
   * 갤러리 개수 조회
   */
  async count(where?: Prisma.GalleryItemWhereInput) {
    return this.prisma.galleryItem.count({ where });
  }

  /**
   * 갤러리 상세 조회
   */
  async findOne(id: bigint) {
    const item = await this.prisma.galleryItem.findUnique({
      where: { id },
      include: {
        creator: true,
        files: {
          include: {
            file: true,
          },
        },
      },
    });

    if (!item) return null;

    return serialize.serializeGalleryItem(item);
  }

  /**
   * 갤러리 생성
   */
  async create(data: any) {
    console.log('🚀 [GalleryService] Create Data:', JSON.stringify(data, null, 2));
    const { fileIds, status, imageUrl, updatedBy, ...rest } = data;
    const createdBy = rest.createdBy || data.createdBy;

    try {
      const item = await this.prisma.galleryItem.create({
        data: {
          ...rest,
          category: serialize.mapGalleryCategoryToDb(rest.category),
          createdBy: createdBy ? BigInt(createdBy) : null,
          files: fileIds
            ? {
                create: (fileIds as string[]).map(fileId => ({
                  fileId: BigInt(fileId),
                })),
              }
            : undefined,
        },
        include: {
          creator: true,
          files: {
            include: {
              file: true,
            },
          },
        },
      });

      console.log('✅ [GalleryService] Created Item ID:', item.id.toString());
      return serialize.serializeGalleryItem(item);
    } catch (error) {
      console.error('❌ [GalleryService] Create Error:', error);
      throw error;
    }
  }

  /**
   * 갤러리 수정
   */
  async update(params: { where: Prisma.GalleryItemWhereUniqueInput; data: any }) {
    const { where, data } = params;
    const { fileIds, status, imageUrl, updatedBy, ...rest } = data;
    const createdBy = rest.createdBy || data.createdBy;

    // Update gallery item and sync files if provided
    const item = await this.prisma.galleryItem.update({
      where,
      data: {
        ...rest,
        category: serialize.mapGalleryCategoryToDb(rest.category),
        createdBy: createdBy ? BigInt(createdBy) : undefined,
        files: fileIds
          ? {
              deleteMany: {}, // Clear old files mapping
              create: (fileIds as string[]).map(fileId => ({
                fileId: BigInt(fileId),
              })),
            }
          : undefined,
      },
      include: {
        creator: true,
        files: {
          include: {
            file: true,
          },
        },
      },
    });

    return serialize.serializeGalleryItem(item);
  }

  /**
   * 갤러리 삭제
   */
  async delete(where: Prisma.GalleryItemWhereUniqueInput) {
    const item = await this.prisma.galleryItem.findUnique({ where });

    if (!item) {
      throw new NotFoundException('Gallery item not found');
    }

    return this.prisma.galleryItem.delete({ where });
  }
}
