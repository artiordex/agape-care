/**
 * @description 감사 로그 공통 스키마
 * @author Shiwoo Min
 * @date 2026-01-26
 */

import { z } from 'zod';

export const AuditLogSchema = z.object({
  id: z.string(),
  actorId: z.string().nullable(),
  action: z.string(),
  entityType: z.string().nullable(),
  entityId: z.string().nullable(),
  changes: z.any().nullable(),
  ipAddress: z.string().nullable(),
  userAgent: z.string().nullable(),
  createdAt: z.string(),
});

export type AuditLog = z.infer<typeof AuditLogSchema>;
