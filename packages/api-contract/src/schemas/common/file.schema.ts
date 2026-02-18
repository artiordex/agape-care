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
  uploaderName: z.string().nullable().optional(),
  createdAt: z.string(),
});

/**
 * 파일 업로드 요청
 */
export const FileUploadSchema = z.object({
  file: z.instanceof(File),
  bucket: z.string().default('default'),
});

/**
 * 파일 목록 조회 쿼리
 */
export const FileStorageListQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(50),
  search: z.string().optional(),
  bucket: z.string().optional(),
  mimeType: z.string().optional(),
  order: z.enum(['asc', 'desc']).default('desc'),
});

/**
 * 파일 목록 조회 응답
 */
export const FileStorageListResponseSchema = z.object({
  items: z.array(FileStorageSchema),
  total: z.number().int(),
  page: z.number().int(),
  limit: z.number().int(),
  totalPages: z.number().int(),
});

export type FileStorage = z.infer<typeof FileStorageSchema>;
export type FileUpload = z.infer<typeof FileUploadSchema>;
export type FileStorageListQuery = z.infer<typeof FileStorageListQuerySchema>;
export type FileStorageListResponse = z.infer<typeof FileStorageListResponseSchema>;
