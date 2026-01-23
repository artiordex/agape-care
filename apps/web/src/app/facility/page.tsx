'use client';

import FloatingSidebar from '@/components/FloatingSidebar';
import Navbar from '@/components/navbar/Navbar';

import CommonAreas from './section/CommonAreas';
import FacilityHero from './section/FacilityHero';
import FloorGuide from './section/FloorGuide';
import RoomTypes from './section/RoomTypes';
import SafetyFeatures from './section/SafetyFeatures';

export default function FacilityPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <FloatingSidebar />

      {/* Sections */}
      <FacilityHero />
      <FloorGuide />
      <RoomTypes />
      <CommonAreas />
      <SafetyFeatures />
    </div>
  );
}
