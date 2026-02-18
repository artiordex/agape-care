/**
 * Description : page.tsx - ?? guide/admission ??? UI ????
 * Author : Shiwoo Min
 * Date : 2026-02-18
 */

import FAQSection from './FAQSection';
import LifeRulesSection from './LifeRuleSection';
import PreparationSection from './PreparationSection';
import ProcessSection from './ProcessSection';
import RequiredDocumentsSection from './RequiredDocumentSection';
import AdmissionTargetSection from './AdmissionTargetSection';

export default function AdmissionPage() {
  return (
    <main>
      <AdmissionTargetSection />
      <ProcessSection />
      <RequiredDocumentsSection />
      <PreparationSection />
      <LifeRulesSection />
      <FAQSection />
    </main>
  );
}
