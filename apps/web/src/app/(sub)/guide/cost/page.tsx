/**
 * Description : page.tsx - ?? guide/cost ??? UI ????
 * Author : Shiwoo Min
 * Date : 2026-02-18
 */

import CostByGradeSection from './CostByGradeSection';
import DiscountSection from './DiscountSection';
import CostInfoSection from './CostInfoSection';

export default function CostPage() {
  return (
    <main>
      <CostInfoSection />
      <CostByGradeSection />
      <DiscountSection />
    </main>
  );
}
