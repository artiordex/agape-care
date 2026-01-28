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
