/**
 * Description : page.tsx - 📌 위치 페이지
 * Author : Shiwoo Min
 * Date : 2026-02-01
 */

import LocationInfoBox from './LocationInfoBox';
import LocationMap from './LocationMap';

export default function Page() {
  return (
    <main>
      <section className="bg-white py-20">
        <div className="mx-auto max-w-[90%] px-4">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/** 지도 */}
            <LocationMap />
            {/** 정보 박스 */}
            <LocationInfoBox />
          </div>
        </div>
      </section>
    </main>
  );
}
