/**
 * Description : page.tsx - ?? services/daily-life ??? UI ????
 * Author : Shiwoo Min
 * Date : 2026-02-18
 */

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
