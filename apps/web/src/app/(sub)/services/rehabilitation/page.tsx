/**
 * Description : page.tsx - ?? services/rehabilitation ??? UI ????
 * Author : Shiwoo Min
 * Date : 2026-02-18
 */

import BenefitsSection from './BenefitsSection';
import OperationSection from './OperationSection';
import ProgramsSection from './ProgramsSection';

export default function RehabilitationPage() {
  return (
    <main>
      <ProgramsSection />
      <OperationSection />
      <BenefitsSection />
    </main>
  );
}
