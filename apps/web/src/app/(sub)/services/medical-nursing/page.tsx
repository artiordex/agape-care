/**
 * Description : page.tsx - ?? services/medical-nursing ??? UI ????
 * Author : Shiwoo Min
 * Date : 2026-02-18
 */

import CooperationSection from './CooperationSection';
import ServicesSection from './ServicesSection';
import StandardsSection from './StandardsSection';

export default function MedicalNursingPage() {
  return (
    <main>
      <ServicesSection />
      <CooperationSection />
      <StandardsSection />
    </main>
  );
}
