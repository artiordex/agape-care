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
