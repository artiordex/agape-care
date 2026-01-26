/**
 * @description 급여 기록 및 항목 스키마
 * @author Shiwoo Min
 * @date 2026-01-26
 */
import { z } from 'zod';

export const PayrollItemSchema = z.object({
  id: z.coerce.string(),
  payrollId: z.coerce.string(),
  kind: z.enum(['ALLOWANCE', 'DEDUCTION']),
  name: z.string(),
  amount: z.coerce.number(),
});

export const PayrollRecordSchema = z.object({
  id: z.coerce.string(),
  employeeId: z.coerce.string(),
  periodStart: z.coerce.date(),
  periodEnd: z.coerce.date(),
  baseSalary: z.coerce.number(),
  totalAllowance: z.coerce.number(),
  totalDeduction: z.coerce.number(),
  netPay: z.coerce.number(),
  paidAt: z.coerce.date().nullable().optional(),
  status: z.enum(['PENDING', 'PAID', 'CANCELLED']),
  items: z.array(PayrollItemSchema).optional(),
});

export type PayrollRecord = z.infer<typeof PayrollRecordSchema>;
