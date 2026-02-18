/**
 * Description : page.tsx - ?? intro/greeting ??? UI ????
 * Author : Shiwoo Min
 * Date : 2026-02-01
 */

import DirectorMessageSection from './DirectorMessageSection';
import CommunityPhotoSection from './CommunityPhotoSection';

export default function Page() {
  return (
    <main>
      {/* 인사말 */}
      <DirectorMessageSection />
      {/* 공동체 사진 */}
      <CommunityPhotoSection />
    </main>
  );
}
