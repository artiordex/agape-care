/**
 * Description : public.decorator.ts - ?? ?? ????? ??
 * Author : Shiwoo Min
 * Date : 2026-02-18
 */

import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
