/**
 * Description : page.tsx - ?? services/training-program ??? UI ????
 * Author : Shiwoo Min
 * Date : 2026-02-18
 */

import BasicTrainingSection from './BasicTrainingSection';
import BehaviorEmotionSection from './BehaviorEmotionSection';
import DailyLivingSection from './DailyLivingSection';
import SafetyEducationSection from './SafetyEducationSection';
import StepCareProgramSection from './StepCareProgramSection';

export default function TrainingProgramPage() {
  return (
    <>
      <BasicTrainingSection />
      <DailyLivingSection />
      <SafetyEducationSection />
      <BehaviorEmotionSection />
      <StepCareProgramSection />
    </>
  );
}
