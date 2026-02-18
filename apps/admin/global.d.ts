/**
 * Description : global.d.ts - ?? global.d ?? ?? ??
 * Author : Shiwoo Min
 * Date : 2026-02-18
 */

export {};

declare global {
  interface Window {
    google?: any;
    googleTranslateElementInit?: () => void;
  }
}
