/**
 * @description 날짜/시간 공통 스키마
 * @author Shiwoo Min
 * @date 2026-01-26
 */

import { z } from 'zod';

/**
 * ISO 8601 날짜 문자열 (YYYY-MM-DD)
 */
export const DateStringSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);

/**
 * ISO 8601 날짜+시간 문자열
 */
export const DateTimeStringSchema = z.string().datetime();

/**
 * 날짜 범위
 */
export const DateRangeSchema = z.object({
  startDate: DateStringSchema,
  endDate: DateStringSchema,
});

/**
 * 날짜+시간 범위
 */
export const DateTimeRangeSchema = z.object({
  startDateTime: DateTimeStringSchema,
  endDateTime: DateTimeStringSchema,
});

export type DateString = z.infer<typeof DateStringSchema>;
export type DateTimeString = z.infer<typeof DateTimeStringSchema>;
export type DateRange = z.infer<typeof DateRangeSchema>;
export type DateTimeRange = z.infer<typeof DateTimeRangeSchema>;
