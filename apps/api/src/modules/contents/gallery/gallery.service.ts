import { Prisma, PrismaService } from '@agape-care/database';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GalleryService {
  constructor(private prisma: PrismaService) {}

  async createGalleryItem(data: Prisma.GalleryItemUncheckedCreateInput) {
    const item = await this.prisma.galleryItem.create({
      data,
    });
    return this.serializeGalleryItem(item);
  }

  async findAllGalleryItems(params: {
    skip?: number;
    take?: number;
    where?: Prisma.GalleryItemWhereInput;
    orderBy?: Prisma.GalleryItemOrderByWithRelationInput;
  }) {
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
    return items.map(item => this.serializeGalleryItem(item));
  }

  async findOneGalleryItem(where: Prisma.GalleryItemWhereUniqueInput) {
    const item = await this.prisma.galleryItem.findUnique({
      where,
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
    return this.serializeGalleryItem(item);
  }

  async updateGalleryItem(params: { where: Prisma.GalleryItemWhereUniqueInput; data: Prisma.GalleryItemUpdateInput }) {
    const { where, data } = params;
    const item = await this.prisma.galleryItem.update({
      data,
      where,
    });
    return this.serializeGalleryItem(item);
  }

  async deleteGalleryItem(where: Prisma.GalleryItemWhereUniqueInput) {
    await this.prisma.galleryItem.delete({
      where,
    });
    return { success: true };
  }

  private serializeGalleryItem(item: any) {
    return {
      ...item,
      id: item.id.toString(),
      createdBy: item.createdBy?.toString() || null,
      files:
        item.files?.map((f: any) => ({
          ...f,
          id: f.id.toString(),
          galleryId: f.galleryId.toString(),
          fileId: f.fileId.toString(),
          file: f.file
            ? {
                ...f.file,
                id: f.file.id.toString(),
              }
            : null,
        })) || [],
    };
  }
}
