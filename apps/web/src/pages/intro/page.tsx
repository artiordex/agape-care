import Navbar from '../../components/feature/Navbar';
import Footer from '../../components/feature/Footer';
import FloatingSidebar from '../../components/feature/FloatingSidebar';
import IntroHero from './components/IntroHero';
import PhilosophySection from './components/PhilosophySection';
import DirectorMessage from './components/DirectorMessage';
import OrganizationChart from './components/OrganizationChart';
import LocationSection from '../home/components/LocationSection';

export default function IntroPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <FloatingSidebar />
      <IntroHero />
      <PhilosophySection />
      <DirectorMessage />
      <OrganizationChart />
      <LocationSection />
      <Footer />
    </div>
  );
}