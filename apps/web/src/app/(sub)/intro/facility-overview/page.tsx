/**
 * Description : page.tsx - 📌 Agape-Care 조직 및 시설 현황 통합 페이지
 * Author : Shiwoo Min
 * Date : 2026-02-01
 */

import GeneralStatusSection from './GeneralStatusSection';
import FacilityStatusSection from './FacilityStatusSection';
import AgapeSystemSection from './AgapeSystemSection';

export default function OrganizationPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* 일반 현황 */}
      <GeneralStatusSection />
      {/* 시설 현황 */}
      <FacilityStatusSection />
      {/* 안심 시스템 */}
      <AgapeSystemSection />
      {/* 하단 여백 확보 */}
      <div className="bg-gray-50/30 py-10" />
    </main>
  );
}
