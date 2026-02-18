/**
 * Description : file.service.ts - ?? common ??? ???? ?? ???
 * Author : Agape Care AI
 */

import { PrismaService } from '@agape-care/database';
import { Injectable, OnModuleInit } from '@nestjs/common';
import fs from 'node:fs/promises';
import path from 'node:path';

@Injectable()
export class FileService implements OnModuleInit {
  private readonly uploadDir = path.resolve(process.cwd(), 'uploads');

  constructor(private readonly prisma: PrismaService) {}

  async onModuleInit() {
    await this.ensureUploadDir();
  }

  private async ensureUploadDir() {
    try {
      await fs.access(this.uploadDir);
    } catch {
      await fs.mkdir(this.uploadDir, { recursive: true });
    }
  }

  async uploadFile(file: any, createdBy?: string): Promise<any> {
    const bucket = 'default';
    const filePath = `${Date.now()}-${file.originalname}`;
    const fullPath = path.join(this.uploadDir, filePath);

    await fs.writeFile(fullPath, file.buffer);

    const record = await this.prisma.fileStorage.create({
      data: {
        bucket,
        path: `/uploads/${filePath}`, // Simple web access path
        originalName: file.originalname,
        mimeType: file.mimetype,
        sizeBytes: BigInt(file.size),
        createdBy: createdBy ? BigInt(createdBy) : null,
      },
    });

    return this.serialize(record);
  }

  async uploadMultiple(files: any[], createdBy?: string): Promise<any[]> {
    const results = [];
    for (const file of files) {
      results.push(await this.uploadFile(file, createdBy));
    }
    return results;
  }

  async getFiles(query: {
    page: number;
    limit: number;
    search?: string;
    bucket?: string;
    mimeType?: string;
    order?: 'asc' | 'desc';
  }) {
    const { page, limit, search, bucket, mimeType, order = 'desc' } = query;
    const skip = (page - 1) * limit;

    const where: any = {};

    if (search) {
      where.OR = [
        { originalName: { contains: search } },
        { path: { contains: search } },
      ];
    }

    if (bucket) where.bucket = bucket;
    if (mimeType) where.mimeType = { contains: mimeType };

    const [total, items] = await Promise.all([
      this.prisma.fileStorage.count({ where }),
      this.prisma.fileStorage.findMany({
        where,
        orderBy: { createdAt: order },
        skip,
        take: limit,
      }),
    ]);

    return {
      items: items.map(item => ({
        ...this.serialize(item),
        uploaderName: item.createdBy?.toString() ?? null,
      })),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  private serialize(record: any) {
    return {
      id: record.id.toString(),
      bucket: record.bucket,
      path: record.path,
      originalName: record.originalName ?? null,
      mimeType: record.mimeType ?? null,
      sizeBytes: record.sizeBytes != null ? Number(record.sizeBytes) : null,
      checksum: record.checksum ?? null,
      createdBy: record.createdBy?.toString() || null,
      createdAt: record.createdAt.toISOString(),
    };
  }
}
