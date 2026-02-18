/**
 * Description : page.tsx - ?? services/individual-care ??? UI ????
 * Author : Shiwoo Min
 * Date : 2026-02-18
 */

import CareServicesSection from './CareServicesSection';
import CareLevelsSection from './CareLevelsSection';
import CarePhilosophySection from './CarePhilosophySection';
import CTASection from './CTASection';

export default function IndividualCarePage() {
  return (
    <main>
      <CareServicesSection />
      <CareLevelsSection />
      <CarePhilosophySection />
      <CTASection />
    </main>
  );
}
