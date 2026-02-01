import OperationalGoalSection from './OperationalGoalSection';
import PhilosophySection from './PhilosophySection';
import VisionSection from './VisionSection';

export default function Page() {
  return (
    <main>
      {/* 기관의 가치와 목표 */}
      <VisionSection />
      {/* 운영 철학 */}
      <PhilosophySection />
      {/* 운영 목표 및 방향성 */}
      <OperationalGoalSection />
    </main>
  );
}
