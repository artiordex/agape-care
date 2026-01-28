'use client';

import CommonAreas from './section/CommonAreas';
import FacilityBanner from './section/FacilityBanner';
import FloorGuide from './section/FloorGuide';
import RoomTypes from './section/RoomTypes';
import SafetyFeatures from './section/SafetyFeatures';

export default function FacilityPage() {
  return (
    <main>
      <FacilityBanner />
      <FloorGuide />
      <RoomTypes />
      <CommonAreas />
      <SafetyFeatures />
    </main>
  );
}
