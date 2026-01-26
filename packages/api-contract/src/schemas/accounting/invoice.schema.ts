/**
 * @description 입소자 비용 청구(인보이스) 스키마
 * @author Shiwoo Min
 * @date 2026-01-26
 */
import { z } from 'zod';

export const InvoiceItemSchema = z.object({
  id: z.coerce.string(),
  invoiceId: z.coerce.string(),
  lineNo: z.number().int(),
  description: z.string(),
  quantity: z.coerce.number(),
  unitPrice: z.coerce.number(),
  amount: z.coerce.number(),
});

export const InvoiceSchema = z.object({
  id: z.coerce.string(),
  invoiceNo: z.string(),
  residentId: z.coerce.string().nullable(),
  issueDate: z.coerce.date(),
  dueDate: z.coerce.date().nullable().optional(),
  totalAmount: z.coerce.number(),
  status: z.enum(['DRAFT', 'ISSUED', 'PAID', 'CANCELLED']),
  items: z.array(InvoiceItemSchema).optional(),
});

export type Invoice = z.infer<typeof InvoiceSchema>;
