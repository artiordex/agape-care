import FAQSection from './FAQSection';
import LifeRulesSection from './LifeRulesSection';
import PreparationSection from './PreparationSection';
import ProcessSection from './ProcessSection';
import RequiredDocumentsSection from './RequiredDocumentsSection';

export default function AdmissionPage() {
  return (
    <main>
      <ProcessSection />
      <RequiredDocumentsSection />
      <PreparationSection />
      <LifeRulesSection />
      <FAQSection />
    </main>
  );
}
