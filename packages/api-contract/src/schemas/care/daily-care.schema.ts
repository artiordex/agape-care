import { z } from 'zod';
import { IdSchema, TimestampSchema } from '../../api-contract-types';

/**
 * 간호 기록 데이터 (바이탈, 증상, 서술)
 */
export const NursingDataSchema = z.object({
  vitals: z.object({
    systolic: z.string().optional(),
    diastolic: z.string().optional(),
    pulse: z.string().optional(),
    temperature: z.string().optional(),
    respiration: z.string().optional(),
    glucose: z.string().optional(),
    oxygen: z.string().optional(),
    pain: z.string().optional(),
    weight: z.string().optional(),
  }),
  issues: z.object({
    fall: z.boolean().default(false),
    pressure: z.boolean().default(false),
    dehydration: z.boolean().default(false),
    delirium: z.boolean().default(false),
    incontinence: z.boolean().default(false),
    pain: z.boolean().default(false),
    dyspnea: z.boolean().default(false),
  }),
  notes: z.string().optional(),
  intervention: z.string().optional(),
  progress: z.string().optional(),
});

/**
 * 체중 관리 데이터
 */
export const WeightDataSchema = z.object({
  weight: z.string(),
  time: z.string(),
  method: z.enum(['체중계', '휠체어 체중계', '침대 체중계']).default('체중계'),
});

/**
 * 구강 상태 데이터
 */
export const OralHealthDataSchema = z.object({
  cleanliness: z.enum(['정상', '주의', '조치필요', '없음']).default('정상'),
  gums: z.enum(['정상', '주의', '조치필요', '없음']).default('정상'),
  stomatitis: z.enum(['없음', '주의', '조치필요']).default('없음'),
  denture: z.enum(['정상', '주의', '조치필요', '없음']).default('정상'),
  halitosis: z.enum(['없음', '심함']).default('없음'),
  pain: z.enum(['없음', '있음']).default('없음'),
  bleeding: z.enum(['없음', '있음']).default('없음'),
  action: z.string().optional(),
});

/**
 * 응급 상황 데이터
 */
export const EmergencyDataSchema = z.object({
  datetime: z.string(),
  discoverer: z.string(),
  category: z.enum(['낙상', '호흡곤란', '경련', '출혈', '기타']).default('낙상'),
  initialResponse: z.string().optional(),
  followUp: z.string().optional(),
  contact119: z.boolean().default(false),
  contactFamily: z.boolean().default(false),
  hospitalTransfer: z.boolean().default(false),
});

/**
 * 배설/비위관/도뇨관 데이터
 */
export const EliminationDataSchema = z.object({
  bowelCount: z.string().optional(),
  bowelNature: z.enum(['정상', '설사', '변비', '혈변']).default('정상'),
  urineCount: z.string().optional(),
  urineNature: z.enum(['정상', '혼탁', '혈뇨', '농뇨']).default('정상'),
  ngTube: z.boolean().default(false),
  ngTubeChange: z.string().optional(),
  ngTubeCleaning: z.string().optional(),
  catheter: z.boolean().default(false),
  catheterIssue: z.string().optional(),
});

/**
 * 일일 요양 기록 스키마
 */
export const DailyCareRecordSchema = z.object({
  id: IdSchema,
  residentId: IdSchema,
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), // YYYY-MM-DD
  nursing: NursingDataSchema.optional(),
  weight: WeightDataSchema.optional(),
  oral: OralHealthDataSchema.optional(),
  emergency: EmergencyDataSchema.optional(),
  elimination: EliminationDataSchema.optional(),
  createdAt: TimestampSchema,
  updatedAt: TimestampSchema,
});

export type NursingData = z.infer<typeof NursingDataSchema>;
export type WeightData = z.infer<typeof WeightDataSchema>;
export type OralHealthData = z.infer<typeof OralHealthDataSchema>;
export type EmergencyData = z.infer<typeof EmergencyDataSchema>;
export type EliminationData = z.infer<typeof EliminationDataSchema>;
export type DailyCareRecord = z.infer<typeof DailyCareRecordSchema>;
