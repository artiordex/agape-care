/**
 * @description 회계 전표 및 분개 항목 스키마
 * @author Shiwoo Min
 * @date 2026-01-26
 */
import { z } from 'zod';

export const TransactionItemSchema = z.object({
  id: z.coerce.string(),
  transactionId: z.coerce.string(),
  accountId: z.coerce.string(),
  lineNo: z.number().int(),
  description: z.string().nullable().optional(),
  debitAmount: z.coerce.number().default(0),
  creditAmount: z.coerce.number().default(0),
});

export const TransactionSchema = z.object({
  id: z.coerce.string(),
  txnDate: z.coerce.date(),
  description: z.string().nullable().optional(),
  referenceNo: z.string().nullable().optional(),
  supplierId: z.coerce.string().nullable().optional(),
  createdBy: z.coerce.string().nullable().optional(),
  totalAmount: z.coerce.number(),
  currency: z.string().default('KRW'),
  items: z.array(TransactionItemSchema),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Transaction = z.infer<typeof TransactionSchema>;
