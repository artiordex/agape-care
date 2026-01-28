import DailyLifeCTA from './DailyLifeCTA';
import DailyScheduleSection from './DailyScheduleSection';
import FacilitiesSection from './FacilitiesSection';
import FamilySupportSection from './FamilySupportSection';
import LifeRulesSection from './LifeRulesSection';

export default function Page() {
  return (
    <main>
      <DailyScheduleSection />
      <DailyLifeCTA />
      <FacilitiesSection />
      <LifeRulesSection />
      <FamilySupportSection />
    </main>
  );
}
