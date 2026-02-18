/**
 * Description : page.tsx - ?? facility ??? UI ????
 * Author : Shiwoo Min
 * Date : 2026-02-01
 */

import FacilityBannerSection from './FacilityBannerSection';
import FloorGuideSection from './FloorGuideSection';
import RoomTypeSection from './RoomTypeSection';
import CommonAreaSection from './CommonAreaSection';
import SafetyFeatureSection from './SafetyFeatureSection';

export default function FacilityPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* 시설 배너 */}
      <FacilityBannerSection />
      {/* 층별 안내 */}
      <FloorGuideSection />
      {/* 객실 안내 */}
      <RoomTypeSection />
      {/* 공용 공간 안내 */}
      <CommonAreaSection />
      {/* 안전 시설 안내 */}
      <SafetyFeatureSection />
    </main>
  );
}
