import CorporationEssentialSection from './CorporationEssentialSection';
import FacilitySection from './FacilitySection';
import MedicalCareSection from './MedicalCareSection';
import NutritionSection from './NutritionSection';
import OperationPhilosophySection from './OperationPhilosophySection';
import OrganizationChart from './OrganizationChart';
import OverviewSection from './OverviewSection';
import SafetySection from './SafetySection';
import StaffSection from './StaffSection';

export default function Page() {
  return (
    <main>
      {/* Sections */}
      <CorporationEssentialSection />
      <OrganizationChart />
      <OverviewSection />
      <OperationPhilosophySection />
      <FacilitySection />
      <StaffSection />
      <SafetySection />
      <MedicalCareSection />
      <NutritionSection />
    </main>
  );
}
