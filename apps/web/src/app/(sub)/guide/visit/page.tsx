import VisitRulesSection from './VisitRulesSection';
import VisitGuidelinesSection from './VisitGuidelinesSection';
import VisitFormSection from './VisitFormSection';
import VisitContactSection from './VisitContactSection';

export default function VisitPage() {
  return (
    <div className="bg-white">
      <VisitRulesSection />
      <VisitGuidelinesSection />
      <VisitFormSection />
      <VisitContactSection />
    </div>
  );
}
