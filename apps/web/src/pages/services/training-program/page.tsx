import Navbar from '../../../components/feature/Navbar';
import Footer from '../../../components/feature/Footer';
import FloatingSidebar from '../../../components/feature/FloatingSidebar';
import ServiceHero from './components/ServiceHero';
import ProgramOverview from './components/ProgramOverview';
import StageDetails from './components/StageDetails';
import ProgramBenefits from './components/ProgramBenefits';
import TestimonialsGallery from './components/TestimonialsGallery';
import ConsultationCTA from './components/ConsultationCTA';
import RelatedServices from './components/RelatedServices';
import LegalNotice from './components/LegalNotice';
import Breadcrumb from './components/Breadcrumb';

export default function TrainingProgramPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <FloatingSidebar />
      
      <Breadcrumb />
      
      <ServiceHero />
      
      <ProgramOverview />
      
      <StageDetails />
      
      <ProgramBenefits />
      
      <TestimonialsGallery />
      
      <ConsultationCTA />
      
      <RelatedServices />
      
      <LegalNotice />
      
      <Footer />
    </div>
  );
}