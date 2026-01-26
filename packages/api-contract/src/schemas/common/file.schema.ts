/**
 * @description 파일 스토리지 공통 스키마
 * @author Shiwoo Min
 * @date 2026-01-26
 */

import { z } from 'zod';

/**
 * 파일 메타데이터
 */
export const FileStorageSchema = z.object({
  id: z.string(),
  bucket: z.string(),
  path: z.string(),
  originalName: z.string().nullable(),
  mimeType: z.string().nullable(),
  sizeBytes: z.number().int().nullable(),
  checksum: z.string().nullable(),
  createdBy: z.string().nullable(),
  createdAt: z.string(),
});

/**
 * 파일 업로드 요청
 */
export const FileUploadSchema = z.object({
  file: z.instanceof(File),
  bucket: z.string().default('default'),
});

export type FileStorage = z.infer<typeof FileStorageSchema>;
export type FileUpload = z.infer<typeof FileUploadSchema>;
