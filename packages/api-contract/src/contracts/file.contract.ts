/**
 * @description 파일 업로드 및 관리 API Contract
 * @author Agape Care AI
 */

import { z } from 'zod';
import { FileStorageListQuerySchema, FileStorageListResponseSchema, FileStorageSchema } from '../schemas/common/file.schema.js';
import { ApiResponseSchema } from '../schemas/common/response.schema.js';

export const fileContract = {
  /**
   * [파일] GET /files
   * 파일 목록 조회
   */
  getFiles: {
    method: 'GET' as const,
    path: '/files',
    query: FileStorageListQuerySchema,
    responses: {
      200: ApiResponseSchema(FileStorageListResponseSchema),
    },
    summary: '파일 목록 조회',
  },

  /**
   * [파일] POST /files/upload
   * 단일 파일 업로드
   */
  uploadFile: {
    method: 'POST' as const,
    path: '/files/upload',
    contentType: 'multipart/form-data',
    body: z.any(), // multipart/form-data is tricky with ts-rest + zod
    responses: {
      201: ApiResponseSchema(FileStorageSchema),
    },
    summary: '단일 파일 업로드',
  },

  /**
   * [파일] POST /files/upload-multiple
   * 다중 파일 업로드
   */
  uploadFiles: {
    method: 'POST' as const,
    path: '/files/upload-multiple',
    contentType: 'multipart/form-data',
    body: z.any(),
    responses: {
      201: ApiResponseSchema(z.array(FileStorageSchema)),
    },
    summary: '다중 파일 업로드',
  },
} as const;

export type FileContract = typeof fileContract;
