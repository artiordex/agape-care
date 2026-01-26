/**
 * @description 근무 패턴(데이, 이브닝, 나이트 등) 템플릿 스키마
 * @author Shiwoo Min
 * @date 2026-01-27
 */
import { z } from 'zod';

export const ShiftTemplateSchema = z.object({
  id: z.coerce.string(),
  code: z.string().min(1, '근무 코드는 필수입니다.'), // 예: 'DAY', 'NIGHT'
  name: z.string().min(1, '근무 명칭은 필수입니다.'),
  startTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, 'HH:mm:ss 형식이어야 합니다.'),
  endTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, 'HH:mm:ss 형식이어야 합니다.'),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type ShiftTemplate = z.infer<typeof ShiftTemplateSchema>;
