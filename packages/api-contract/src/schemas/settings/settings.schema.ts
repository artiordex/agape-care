/**
 * Description : settings.schema.ts - ?? settings ??? ??? ??
 * Author : Shiwoo Min
 * Date : 2026-02-18
 */

import { z } from 'zod';

// ==========================================
// 1. Facility (시설 정보)
// ==========================================
export const FacilitySchema = z.object({
  id: z.string(), // BigInt -> String
  orgCode: z.string(),
  facilityName: z.string(),
  facilityDesc: z.string().nullable().optional(),
  facilityType: z.string(),
  designatedDate: z.coerce.date().nullable().optional(),
  director: z.string(),
  directorPhone: z.string().nullable().optional(),
  ceoName: z.string(),
  businessNo: z.string(),
  bizType: z.string().nullable().optional(),
  staffCount: z.number().int().nullable().optional(),
  phone: z.string(),
  fax: z.string().nullable().optional(),
  email: z.string().nullable().optional(),
  homepage: z.string().nullable().optional(),
  zip: z.string().nullable().optional(),
  address1: z.string(),
  address2: z.string().nullable().optional(),
  totalCapacity: z.number().int().nullable().optional(),
  shortStayCapacity: z.number().int().nullable().optional(),
  dayCareCapacity: z.number().int().nullable().optional(),
  stampImage: z.string().nullable().optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const UpdateFacilityRequestSchema = FacilitySchema.partial().omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type Facility = z.infer<typeof FacilitySchema>;
export type UpdateFacilityRequest = z.infer<typeof UpdateFacilityRequestSchema>;

// ==========================================
// 2. Site Info (사이트 설정)
// ==========================================
export const SiteInfoSchema = z.object({
  id: z.string(),
  serviceName: z.string(),
  serviceDesc: z.string().nullable().optional(),
  contactPhone: z.string().nullable().optional(),
  contactEmail: z.string().nullable().optional(),
  customerHours: z.string().nullable().optional(),
  metaTitle: z.string().nullable().optional(),
  metaDescription: z.string().nullable().optional(),
  metaKeywords: z.string().nullable().optional(),
  footerText: z.string().nullable().optional(),
  legalNotice: z.string().nullable().optional(),
  updatedBy: z.string().nullable().optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const UpdateSiteInfoRequestSchema = SiteInfoSchema.partial().omit({
  id: true,
  updatedBy: true,
  createdAt: true,
  updatedAt: true,
});

export type SiteInfo = z.infer<typeof SiteInfoSchema>;
export type UpdateSiteInfoRequest = z.infer<typeof UpdateSiteInfoRequestSchema>;

// ==========================================
// 3. Employee Permission (개인 권한 예외)
// ==========================================
export const EmployeePermissionSchema = z.object({
  id: z.string(),
  employeeId: z.string(),
  roleId: z.string().nullable().optional(),
  permissions: z.record(z.any()).default({}), // JSON structure
  updatedBy: z.string().nullable().optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const UpdateEmployeePermissionRequestSchema = z.object({
  permissions: z.record(z.any()), // Full replacement of permissions JSON
  roleId: z.string().nullable().optional(),
});

export type EmployeePermission = z.infer<typeof EmployeePermissionSchema>;
export type UpdateEmployeePermissionRequest = z.infer<typeof UpdateEmployeePermissionRequestSchema>;
