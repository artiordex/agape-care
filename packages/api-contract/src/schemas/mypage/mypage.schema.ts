import { z } from 'zod';

/**
 * My Profile Schema
 * Extends the basic user info with more details needed for the profile page
 */
export const MyProfileSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string(),
  phoneNumber: z.string().optional(),
  role: z.string(),
  department: z.string().optional(),
  position: z.string().optional(),
  joinedAt: z.string().datetime().optional(),
  avatarUrl: z.string().url().optional(),
  bio: z.string().optional(),
});

/**
 * Update Profile Schema
 */
export const UpdateMyProfileSchema = MyProfileSchema.pick({
  name: true,
  phoneNumber: true,
  avatarUrl: true,
  bio: true,
}).partial();

/**
 * My Schedule Schema
 */
export const MyScheduleSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  startTime: z.string().datetime(),
  endTime: z.string().datetime(),
  type: z.enum(['WORK', 'MEETING', 'LEAVE', 'OTHER']),
  status: z.enum(['SCHEDULED', 'COMPLETED', 'CANCELLED']),
});

export type MyProfile = z.infer<typeof MyProfileSchema>;
export type UpdateMyProfile = z.infer<typeof UpdateMyProfileSchema>;
export type MySchedule = z.infer<typeof MyScheduleSchema>;
