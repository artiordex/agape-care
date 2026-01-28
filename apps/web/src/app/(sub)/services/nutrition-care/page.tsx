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
