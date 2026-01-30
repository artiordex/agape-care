/**
 * @description 회계, 급여, 청구 관련 API Contract
 * @author Shiwoo Min
 * @date 2026-01-27
 */
import { z } from 'zod';
import {
  AccountSchema,
  InsuranceClaimSchema,
  InvoiceSchema,
  PayrollRecordSchema,
  SupplierSchema,
  TransactionSchema,
} from '../schemas/accounting/index';
import { ApiResponseSchema } from '../schemas/common/response.schema';

export const accountingContract = {
  /**
   * [전표] POST /accounting/transactions
   * 전표 및 분개 라인 생성
   */
  createTransaction: {
    method: 'POST' as const,
    path: '/accounting/transactions',
    body: TransactionSchema.omit({ id: true, createdAt: true, updatedAt: true }),
    responses: {
      201: ApiResponseSchema(TransactionSchema),
    },
  },

  /**
   * [전표] GET /accounting/transactions
   * 전표 목록 조회 (기간 필터링)
   */
  getTransactions: {
    method: 'GET' as const,
    path: '/accounting/transactions',
    responses: {
      200: ApiResponseSchema(z.array(TransactionSchema)),
    },
  },

  /**
   * [급여] GET /accounting/payroll
   * 전체 직원 급여 대장 조회
   */
  getPayrolls: {
    method: 'GET' as const,
    path: '/accounting/payroll',
    responses: {
      200: ApiResponseSchema(z.array(PayrollRecordSchema)),
    },
  },

  /**
   * [급여] PATCH /accounting/payroll/:id/status
   * 급여 지급 상태 변경 (PENDING -> PAID)
   */
  updatePayrollStatus: {
    method: 'PATCH' as const,
    path: '/accounting/payroll/:id/status',
    body: z.object({ status: z.enum(['PAID', 'CANCELLED']) }),
    responses: {
      200: ApiResponseSchema(PayrollRecordSchema),
    },
  },

  /**
   * [인보이스] GET /accounting/invoices
   * 입소자 비용 청구 목록 조회
   */
  getInvoices: {
    method: 'GET' as const,
    path: '/accounting/invoices',
    responses: {
      200: ApiResponseSchema(z.array(InvoiceSchema)),
    },
  },

  /**
   * [공단청구] POST /accounting/insurance-claims
   * 장기요양보험 공단 청구 생성
   */
  createInsuranceClaim: {
    method: 'POST' as const,
    path: '/accounting/insurance-claims',
    body: InsuranceClaimSchema.omit({ id: true, createdAt: true, updatedAt: true }),
    responses: {
      201: ApiResponseSchema(InsuranceClaimSchema),
    },
  },

  /**
   * [기초자료] GET /accounting/accounts
   * 계정 과목 리스트 조회
   */
  getAccounts: {
    method: 'GET' as const,
    path: '/accounting/accounts',
    responses: {
      200: ApiResponseSchema(z.array(AccountSchema)),
    },
  },

  /**
   * [거래처] POST /accounting/suppliers
   * 신규 공급업체 등록
   */
  createSupplier: {
    method: 'POST' as const,
    path: '/accounting/suppliers',
    body: SupplierSchema.omit({ id: true, createdAt: true, updatedAt: true }),
    responses: {
      201: ApiResponseSchema(SupplierSchema),
    },
  },
} as const;

// --- Contract 타입 추출 ---
export type AccountingContract = typeof accountingContract;
