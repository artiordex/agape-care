/**
 * Description : page.tsx - ?? guide/contact ??? UI ????
 * Author : Shiwoo Min
 * Date : 2026-02-01
 */

import ContactFAQSection from './ContactFAQSection';
import ContactMethodsSection from './ContactSection';

export default function Page() {
  return (
    <main className="bg-white">
      {/* 연락 방법 */}
      <ContactMethodsSection />
      {/* 자주 묻는 질문 */}
      <ContactFAQSection />
    </main>
  );
}
