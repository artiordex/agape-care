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
