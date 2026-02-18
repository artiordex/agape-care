/**
 * Description : page.tsx - ?? services/admission-process ??? UI ????
 * Author : Shiwoo Min
 * Date : 2026-02-18
 */

import AdmissionStepsSection from './AdmissionStepsSection';
import RequiredDocumentsSection from './RequiredDocumentsSection';
import CostInfoSection from './CostInfoSection';
import PersonalItemsSection from './PersonalItemsSection';

export default function AdmissionProcessPage() {
  return (
    <main>
      <AdmissionStepsSection />
      <RequiredDocumentsSection />
      <CostInfoSection />
      <PersonalItemsSection />
    </main>
  );
}
