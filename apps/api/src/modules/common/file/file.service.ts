/**
 * Description : file.service.ts - 📌 파일 업로드 및 관리 서비스
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

  private serialize(record: any) {
    return {
      ...record,
      id: record.id.toString(),
      sizeBytes: Number(record.sizeBytes),
      createdBy: record.createdBy?.toString() || null,
      createdAt: record.createdAt.toISOString(),
    };
  }
}
