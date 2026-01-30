import { z } from 'zod';

/**
 * Dashboard Statistics Schema
 */
export const DashboardStatsSchema = z.object({
  totalResidents: z.number(),
  newResidents: z.number(),
  emptyRooms: z.number(),
  staffOnDuty: z.number(),
  criticalAlerts: z.number(),
  pendingConsultations: z.number(),
});

/**
 * Health Alert Schema
 */
export const HealthAlertSchema = z.object({
  id: z.string(),
  residentId: z.string(),
  residentName: z.string(),
  type: z.enum(['BLOOD_PRESSURE', 'TEMPERATURE', 'BLOOD_SUGAR', 'FALL', 'OTHER']),
  value: z.string(),
  threshold: z.string().optional(),
  occurredAt: z.string().datetime(),
  status: z.enum(['OPEN', 'CHECKED', 'RESOLVED']),
  severity: z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']),
});

/**
 * Medication Alert Schema
 */
export const MedicationAlertSchema = z.object({
  id: z.string(),
  residentId: z.string(),
  residentName: z.string(),
  medicationName: z.string(),
  scheduledTime: z.string(), // HH:mm
  status: z.enum(['PENDING', 'TAKEN', 'SKIPPED', 'REFUSED']),
  notes: z.string().optional(),
});

/**
 * Recent Activity Schema
 */
export const RecentActivitySchema = z.object({
  id: z.string(),
  type: z.string(),
  description: z.string(),
  performerId: z.string().optional(),
  performerName: z.string().optional(),
  occurredAt: z.string().datetime(),
  targetId: z.string().optional(), // Related resource ID
  targetType: z.string().optional(), // Related resource type
});

/**
 * Today Schedule Schema
 */
export const TodayScheduleSchema = z.object({
  id: z.string(),
  title: z.string(),
  startTime: z.string(), // HH:mm
  endTime: z.string(), // HH:mm
  type: z.string(),
  location: z.string().optional(),
  attendees: z.array(z.string()).optional(), // List of names or IDs
});

export const DashboardWidgetsSchema = z.object({
  stats: DashboardStatsSchema,
  healthAlerts: z.array(HealthAlertSchema),
  medicationAlerts: z.array(MedicationAlertSchema),
  recentActivities: z.array(RecentActivitySchema),
  todaySchedules: z.array(TodayScheduleSchema),
});

export type DashboardStats = z.infer<typeof DashboardStatsSchema>;
export type HealthAlert = z.infer<typeof HealthAlertSchema>;
export type MedicationAlert = z.infer<typeof MedicationAlertSchema>;
export type RecentActivity = z.infer<typeof RecentActivitySchema>;
export type TodaySchedule = z.infer<typeof TodayScheduleSchema>;
export type DashboardWidgets = z.infer<typeof DashboardWidgetsSchema>;
