/**
 * Description : useOnClickOutside.ts - ?? ??? ?
 * Author : Shiwoo Min
 * Date : 2025-09-09
 */
'use client';

import { type RefObject, useCallback, useEffect } from 'react';
import type { MaybeRef } from '../ui-types.js';

// 여러 요소 중 하나라도 타겟에 포함되는지 확인
function includesTarget(els: MaybeRef<HTMLElement>[], target: EventTarget | null): boolean {
  if (!target) return false;
  // composedPath로 Shadow DOM도 대응
  const path = (target as any).composedPath?.() as EventTarget[] | undefined;
  for (const el of els) {
    const node = el && 'current' in (el as any) ? (el as RefObject<HTMLElement>).current : (el as HTMLElement | null);
    if (!node) continue;
    if (node === target || (target instanceof Node && node.contains(target))) return true;
    if (path && path.includes(node)) return true;
  }
  return false;
}

// 특정 요소 바깥 클릭 감지 훅
export function useOnClickOutside(
  refs: MaybeRef<HTMLElement> | MaybeRef<HTMLElement>[],
  handler: (ev: MouseEvent | TouchEvent) => void,
  options?: {
    enabled?: boolean;
    events?: Array<'mousedown' | 'mouseup' | 'click' | 'touchstart' | 'touchend'>;
  },
) {
  const enabled = options?.enabled ?? true;
  const events = options?.events ?? ['mousedown', 'touchstart'];
  const arr = Array.isArray(refs) ? refs : [refs];

  const onEvent = useCallback(
    (ev: any) => {
      const t = ev.target as EventTarget | null;
      if (!includesTarget(arr, t)) handler(ev);
    },
    [arr, handler],
  );

  useEffect(() => {
    if (!enabled) return;
    const t = typeof document !== 'undefined' ? document : null;
    if (!t) return;

    const handlerInner = (ev: Event) => onEvent(ev);

    for (const e of events) {
      t.addEventListener(e, handlerInner, { capture: true });
    }

    return () => {
      for (const e of events) {
        t.removeEventListener(e, handlerInner, { capture: true });
      }
    };
  }, [enabled, events, onEvent]);
}
