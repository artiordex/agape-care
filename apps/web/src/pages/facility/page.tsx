import Navbar from '../../components/feature/Navbar';
import Footer from '../../components/feature/Footer';
import FloatingSidebar from '../../components/feature/FloatingSidebar';
import FacilityHero from './components/FacilityHero';
import FloorGuide from './components/FloorGuide';
import RoomTypes from './components/RoomTypes';
import CommonAreas from './components/CommonAreas';
import SafetyFeatures from './components/SafetyFeatures';

export default function FacilityPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <FloatingSidebar />
      <FacilityHero />
      <FloorGuide />
      <RoomTypes />
      <CommonAreas />
      <SafetyFeatures />
      <Footer />
    </div>
  );
}