import { z } from 'zod';

/**
 * Facility Information Schema
 */
export const FacilityInfoSchema = z.object({
  id: z.string(),
  name: z.string(),
  representativeName: z.string(),
  businessRegistrationNumber: z.string(),
  address: z.string(),
  phoneNumber: z.string(),
  faxNumber: z.string().optional(),
  email: z.string().email(),
  establishedAt: z.string().datetime(),
  capacity: z.number().int().positive(),
  grade: z.string().optional(), // Evaluation grade
});

export const UpdateFacilityInfoSchema = FacilityInfoSchema.partial();

/**
 * System Configuration Schema
 */
export const SystemConfigSchema = z.object({
  key: z.string(),
  value: z.string(),
  description: z.string().optional(),
  category: z.string().optional(),
});

export const UpdateSystemConfigSchema = z.object({
  configs: z.array(
    z.object({
      key: z.string(),
      value: z.string(),
    }),
  ),
});

export type FacilityInfo = z.infer<typeof FacilityInfoSchema>;
export type SystemConfig = z.infer<typeof SystemConfigSchema>;
