/**
 * Description : page.tsx - ?? services/nutrition-care ??? UI ????
 * Author : Shiwoo Min
 * Date : 2026-02-18
 */

import NutritionSection from './NutritionSection';
import WeeklyMenuSection from './WeeklyMenuSection';
import NutritionStandardsSection from './NutritionStandardsSection';

export default function NutritionCarePage() {
  return (
    <main>
      <NutritionSection />
      <WeeklyMenuSection />
      <NutritionStandardsSection />
    </main>
  );
}
