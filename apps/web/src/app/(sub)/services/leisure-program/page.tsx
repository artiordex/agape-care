/**
 * Description : page.tsx - ?? services/leisure-program ??? UI ????
 * Author : Shiwoo Min
 * Date : 2026-02-18
 */

import ProgramListSection from './ProgramListSection';
import SeasonalEventsSection from './SeasonalEventsSection';
import FeaturesSection from './FeaturesSection';

export default function LeisureProgramPage() {
  return (
    <main>
      <ProgramListSection />
      <SeasonalEventsSection />
      <FeaturesSection />
    </main>
  );
}
