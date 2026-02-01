/**
 * Description : page.tsx - 📌 Agape-Care 상담 문의 페이지
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
