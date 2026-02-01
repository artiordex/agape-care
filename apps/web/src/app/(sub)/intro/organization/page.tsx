/**
 * Description : page.tsx - 📌 Agape-Care 조직도 및 구성원 소개
 * Author : Shiwoo Min
 * Date : 2026-02-01
 */

import OrganizationChart from './OrganizationChart';
import EmployeeStatusSection from './EmployeeStatusSection';

export default function Page() {
  return (
    <main>
      <OrganizationChart />
      <EmployeeStatusSection />
    </main>
  );
}
