'use client';

import ContactTypeSection from './ContactTypeSection';
import ContactFormSection from './ContactFormSection';
import ContactInfoSection from './ContactInfoSection';
import ContactCTASection from './ContactCTASection';

export default function ContactPage() {
  return (
    <div className="bg-white">
      <ContactTypeSection />
      <ContactFormSection />
      <ContactInfoSection />
      <ContactCTASection />
    </div>
  );
}
