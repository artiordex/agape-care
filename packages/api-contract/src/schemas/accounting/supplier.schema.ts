/**
 * @description 공급업체(거래처) 스키마
 * @author Shiwoo Min
 * @date 2026-01-26
 */
import { z } from 'zod';

export const SupplierSchema = z.object({
  id: z.coerce.string(),
  name: z.string().min(1, '업체명은 필수입니다.'),
  businessNo: z.string().nullable().optional(),
  phoneNumber: z.string().nullable().optional(),
  email: z.string().email().nullable().optional(),
  address: z.string().nullable().optional(),
  memo: z.string().nullable().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Supplier = z.infer<typeof SupplierSchema>;
