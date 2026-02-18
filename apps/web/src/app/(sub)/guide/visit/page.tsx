/**
 * Description : page.tsx - ?? guide/visit ??? UI ????
 * Author : Shiwoo Min
 * Date : 2026-02-01
 */

import VisitContactSection from './VisitContactSection';
import VisitGuidelinesSection from './VisitGuidelinesSection';
import VisitRulesSection from './VisitRulesSection';

export default function Page() {
  return (
    <main className="bg-white">
      {/* 면회 규정 */}
      <VisitRulesSection />
      {/* 면회 안내 */}
      <VisitGuidelinesSection />
      {/* 면회 문의 */}
      <VisitContactSection />
    </main>
  );
}
