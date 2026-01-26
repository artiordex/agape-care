/**
 * @description 재고 관리 스키마
 * @author Shiwoo Min
 * @date 2026-01-26
 */

import { z } from 'zod';

/**
 * 재고 카테고리
 */
export const InventoryCategorySchema = z.enum(['MEDICAL', 'FOOD', 'SUPPLY', 'EQUIPMENT']);

/**
 * 재고 거래 유형
 */
export const InventoryTxnTypeSchema = z.enum(['IN', 'OUT', 'ADJUST']);

/**
 * 재고 품목 정보
 */
export const InventoryItemSchema = z.object({
  id: z.string(),
  code: z.string(),
  name: z.string(),
  category: InventoryCategorySchema,
  unit: z.string(),
  currentStock: z.number(),
  minStock: z.number().nullable(),
  maxStock: z.number().nullable(),
  unitPrice: z.number().nullable(),
  storageLocation: z.string().nullable(),
  isActive: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

/**
 * 재고 품목 생성 요청
 */
export const CreateInventoryItemRequestSchema = z.object({
  code: z.string().min(1, '품목 코드는 필수입니다'),
  name: z.string().min(1, '품목명은 필수입니다'),
  category: InventoryCategorySchema,
  unit: z.string().min(1, '단위는 필수입니다'),
  currentStock: z.number().default(0),
  minStock: z.number().optional(),
  maxStock: z.number().optional(),
  unitPrice: z.number().optional(),
  storageLocation: z.string().optional(),
  isActive: z.boolean().default(true),
});

/**
 * 재고 품목 수정 요청
 */
export const UpdateInventoryItemRequestSchema = z.object({
  name: z.string().min(1).optional(),
  category: InventoryCategorySchema.optional(),
  unit: z.string().min(1).optional(),
  minStock: z.number().nullable().optional(),
  maxStock: z.number().nullable().optional(),
  unitPrice: z.number().nullable().optional(),
  storageLocation: z.string().nullable().optional(),
  isActive: z.boolean().optional(),
});

/**
 * 재고 거래 내역
 */
export const InventoryTransactionSchema = z.object({
  id: z.string(),
  itemId: z.string(),
  itemCode: z.string().optional(), // 조인
  itemName: z.string().optional(), // 조인
  txnDate: z.string(), // ISO date
  txnType: InventoryTxnTypeSchema,
  quantity: z.number(),
  unitPrice: z.number().nullable(),
  totalAmount: z.number().nullable(),
  supplierId: z.string().nullable(),
  supplierName: z.string().nullable().optional(), // 조인
  referenceNo: z.string().nullable(),
  notes: z.string().nullable(),
  createdBy: z.string().nullable(),
  createdByName: z.string().nullable().optional(), // 조인
  createdAt: z.string(),
});

/**
 * 재고 거래 생성 요청
 */
export const CreateInventoryTransactionRequestSchema = z.object({
  itemId: z.string(),
  txnDate: z.string(), // ISO date
  txnType: InventoryTxnTypeSchema,
  quantity: z.number(),
  unitPrice: z.number().optional(),
  totalAmount: z.number().optional(),
  supplierId: z.string().optional(),
  referenceNo: z.string().optional(),
  notes: z.string().optional(),
});

/**
 * 재고 품목 목록 조회 쿼리
 */
export const GetInventoryItemsQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
  category: InventoryCategorySchema.optional(),
  isActive: z.coerce.boolean().optional(),
  lowStock: z.coerce.boolean().optional(), // 최소 재고 이하만
  search: z.string().optional(), // 코드, 이름 검색
});

/**
 * 재고 거래 목록 조회 쿼리
 */
export const GetInventoryTransactionsQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
  itemId: z.string().optional(),
  txnType: InventoryTxnTypeSchema.optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});

/**
 * 재고 품목 목록 응답
 */
export const GetInventoryItemsResponseSchema = z.object({
  data: z.array(InventoryItemSchema),
  pagination: z.object({
    total: z.number(),
    page: z.number(),
    limit: z.number(),
    totalPages: z.number(),
  }),
});

/**
 * 재고 거래 목록 응답
 */
export const GetInventoryTransactionsResponseSchema = z.object({
  data: z.array(InventoryTransactionSchema),
  pagination: z.object({
    total: z.number(),
    page: z.number(),
    limit: z.number(),
    totalPages: z.number(),
  }),
});

/**
 * 재고 통계
 */
export const InventoryStatsSchema = z.object({
  totalItems: z.number(),
  lowStockItems: z.number(),
  outOfStockItems: z.number(),
  totalValue: z.number(),
  byCategory: z.record(
    z.object({
      count: z.number(),
      value: z.number(),
    }),
  ),
});

// Type exports
export type InventoryCategory = z.infer<typeof InventoryCategorySchema>;
export type InventoryTxnType = z.infer<typeof InventoryTxnTypeSchema>;
export type InventoryItem = z.infer<typeof InventoryItemSchema>;
export type CreateInventoryItemRequest = z.infer<typeof CreateInventoryItemRequestSchema>;
export type UpdateInventoryItemRequest = z.infer<typeof UpdateInventoryItemRequestSchema>;
export type InventoryTransaction = z.infer<typeof InventoryTransactionSchema>;
export type CreateInventoryTransactionRequest = z.infer<typeof CreateInventoryTransactionRequestSchema>;
export type GetInventoryItemsQuery = z.infer<typeof GetInventoryItemsQuerySchema>;
export type GetInventoryTransactionsQuery = z.infer<typeof GetInventoryTransactionsQuerySchema>;
export type GetInventoryItemsResponse = z.infer<typeof GetInventoryItemsResponseSchema>;
export type GetInventoryTransactionsResponse = z.infer<typeof GetInventoryTransactionsResponseSchema>;
export type InventoryStats = z.infer<typeof InventoryStatsSchema>;
