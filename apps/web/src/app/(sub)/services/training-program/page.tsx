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
