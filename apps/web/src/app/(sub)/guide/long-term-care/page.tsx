/**
 * Description : page.tsx - 📌 장기요양보험 안내 통합 페이지 (너비 90%)
 * Author : Shiwoo Min
 * Date : 2026-02-01
 */

import LongTermCareSection from './LongTermCareSection';

export default function LongTermCarePage() {
  return (
    <main className="min-h-screen bg-white">
      {/* 장기요양보험 상세 안내 섹션 */}
      <LongTermCareSection />
    </main>
  );
}
