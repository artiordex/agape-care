/**
 * Description : page.tsx - ?? operations/daily-inspection ??? UI ????
 * Author : Shiwoo Min
 * Date : 2026-02-18
 */

'use client';

import clsx from 'clsx';

// ================= Mock Data =================
interface DailyRecord {
  day: number;
  dayOfWeek: string;
  isHoliday: boolean;

  // 1. 야간보호
  nightCare: {
    dayNightHandover: string; // 주간->야간 인계
    nightInspection: string; // 야간점검일지
    nightDayHandover: string; // 야간->주간 인계
  };

  // 2. 간호비품관리
  nursingSupplies: string;

  // 3. 급식운영 (영양사)
  foodService: string;

  // 4. 일일식사평가 (영양사)
  mealEvaluation: string;

  // 5. 위생원업무일지 (위생원)
  hygieneWork: string;

  // 6. 일상소독일지
  dailyDisinfection: string;

  // 7. 위생점검일지
  hygieneInspection: {
    disinfectionLog: string; // 위생소독일지
    kitchenUtensil: string; // 주방 및 집기류 소독 (주1회)
  };
}

const RECORDS: DailyRecord[] = Array.from({ length: 18 }, (_, i) => {
  const day = i + 1;
  const date = new Date(2026, 1, day); // Feb 2026
  const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'][date.getDay()];
  const isHoliday = dayOfWeek === '일';

  return {
    day,
    dayOfWeek,
    isHoliday,
    nightCare: {
      dayNightHandover: day === 2 ? '1건' : '없음',
      nightInspection: day === 6 ? '권춘자' : '미작성',
      nightDayHandover: day === 6 ? '2건' : '없음',
    },
    nursingSupplies: day === 3 ? '최인경' : '-',
    foodService: day === 1 ? '최인경' : '-',
    mealEvaluation: '-',
    hygieneWork: '-',
    dailyDisinfection: '미작성',
    hygieneInspection: {
      disinfectionLog: day === 10 ? '최인경' : '미작성',
      kitchenUtensil: day === 1 ? '미소독' : day === 10 ? '소독완료' : '미소독', // Simplified for demo
    },
  };
});

// ================= Main Page =================
export default function DailyInspectionPage() {
  return (
    <div className="flex h-[calc(100vh-60px)] flex-col bg-[#f0f2f5] p-4 font-sans text-xs text-[#333] antialiased">
      {/* Month Navigation */}
      <div className="mb-2 flex items-center justify-center gap-2 rounded-t-md border border-[#B8D1E0] bg-[#E8F1F8] py-2">
        <button className="flex h-6 w-6 items-center justify-center rounded bg-[#788fa0] text-white hover:bg-[#637d91]">
          <i className="ri-arrow-left-s-line"></i>
        </button>
        <div className="flex items-center gap-2">
          <span className="text-[16px] font-bold text-[#204987]">2026년 02월</span>
          <button className="text-gray-500 hover:text-[#204987]">
            <i className="ri-calendar-2-fill"></i>
          </button>
        </div>
        <button className="flex h-6 w-6 items-center justify-center rounded bg-[#788fa0] text-white hover:bg-[#637d91]">
          <i className="ri-arrow-right-s-line"></i>
        </button>
      </div>

      {/* Main Table */}
      <div className="flex-1 overflow-auto rounded-b-md border border-t-0 border-[#B8D1E0] bg-white shadow-sm">
        <table className="w-full border-collapse text-center">
          <thead className="sticky top-0 z-10 bg-[#E8F1F8] font-bold text-[#333]">
            <tr>
              <th rowSpan={2} className="w-[60px] border-b border-r border-[#B8D1E0] py-2">
                일자
              </th>
              <th colSpan={3} className="border-b border-r border-[#B8D1E0] py-2">
                <div className="flex items-center justify-center gap-2">
                  <span>야간보호</span>
                  <div className="flex gap-1">
                    <button className="rounded bg-[#17a2b8] px-1.5 py-0.5 text-[9px] text-white hover:bg-[#138496]">
                      구역 관리
                    </button>
                    <button className="rounded bg-[#17a2b8] px-1.5 py-0.5 text-[9px] text-white hover:bg-[#138496]">
                      항목 관리
                    </button>
                  </div>
                </div>
              </th>
              <th rowSpan={2} className="w-[80px] border-b border-r border-[#B8D1E0] py-2">
                간호비품관리
              </th>
              <th rowSpan={2} className="w-[100px] border-b border-r border-[#B8D1E0] py-2">
                <div>
                  급식운영<span className="text-red-500">(필요시)</span>
                </div>
                <div className="text-[9px] font-normal text-gray-500">※ 영양사배치기관 업무용</div>
              </th>
              <th rowSpan={2} className="w-[100px] border-b border-r border-[#B8D1E0] py-2">
                <div>
                  일일식사평가<span className="text-red-500">(필요시)</span>
                </div>
                <div className="text-[9px] font-normal text-gray-500">※ 영양사배치기관 업무용</div>
              </th>
              <th rowSpan={2} className="w-[100px] border-b border-r border-[#B8D1E0] py-2">
                <div>
                  위생원업무일지<span className="text-red-500">(필요시)</span>
                </div>
                <div className="text-[9px] font-normal text-gray-500">※ 위생원 배치기관 업무용</div>
              </th>
              <th rowSpan={2} className="w-[100px] border-b border-r border-[#B8D1E0] py-2">
                일상소독일지<span className="text-red-500">(필요시)</span>
              </th>
              <th colSpan={2} className="border-b border-[#B8D1E0] py-2">
                위생점검일지<span className="text-red-500">(필요시)</span>
              </th>
            </tr>
            <tr>
              <th className="w-[80px] border-b border-r border-[#B8D1E0] bg-[#E8F1F8] py-2">
                주간-야간
                <br />
                인계사항
              </th>
              <th className="w-[80px] border-b border-r border-[#B8D1E0] bg-[#E8F1F8] py-2">야간점검일지</th>
              <th className="w-[80px] border-b border-r border-[#B8D1E0] bg-[#E8F1F8] py-2">
                야간-주간
                <br />
                인계사항
              </th>
              <th className="w-[80px] border-b border-r border-[#B8D1E0] bg-[#E8F1F8] py-2">위생소독일지</th>
              <th className="w-[100px] border-b border-[#B8D1E0] bg-[#E8F1F8] py-2">
                주방 및 집기류 소독
                <br />
                (주1회)
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-[11px] text-[#333]">
            {RECORDS.map(rec => (
              <tr
                key={rec.day}
                className={clsx('hover:bg-blue-50/30', rec.day % 2 === 0 ? 'bg-[#fdfbe6]/30' : 'bg-white')}
              >
                {/* 1. Date */}
                <td
                  className={clsx(
                    'border-r border-gray-200 py-2 font-bold',
                    rec.dayOfWeek === '일' ? 'text-red-500' : rec.dayOfWeek === '토' ? 'text-blue-500' : 'text-[#333]',
                    rec.day === 18 && 'bg-[#ffecb3]', // Today Highlight
                  )}
                >
                  {rec.day.toString().padStart(2, '0')}일({rec.dayOfWeek})
                  {rec.day === 18 && <span className="ml-1 text-[9px] font-normal text-red-500">(오늘)</span>}
                </td>

                {/* 2. Night Care - Day/Night Handover */}
                <td
                  className={clsx(
                    'border-r border-gray-200 py-2',
                    rec.nightCare.dayNightHandover === '1건' && 'bg-[#dff0d8]',
                  )}
                >
                  {rec.nightCare.dayNightHandover}
                </td>

                {/* 3. Night Care - Inspection */}
                <td
                  className={clsx(
                    'border-r border-gray-200 py-2',
                    rec.nightCare.nightInspection !== '미작성' && 'bg-[#dff0d8]',
                  )}
                >
                  {rec.nightCare.nightInspection}
                </td>

                {/* 4. Night Care - Night/Day Handover */}
                <td
                  className={clsx(
                    'border-r border-gray-200 py-2',
                    rec.nightCare.nightDayHandover !== '없음' && 'bg-[#dff0d8]',
                  )}
                >
                  {rec.nightCare.nightDayHandover}
                </td>

                {/* 5. Nursing Supplies */}
                <td className={clsx('border-r border-gray-200 py-2', rec.nursingSupplies !== '-' && 'bg-[#dff0d8]')}>
                  {rec.nursingSupplies}
                </td>

                {/* 6. Food Service */}
                <td className={clsx('border-r border-gray-200 py-2', rec.foodService !== '-' && 'bg-[#dff0d8]')}>
                  {rec.foodService}
                </td>

                {/* 7. Meal Eval */}
                <td className="border-r border-gray-200 py-2 text-gray-400">{rec.mealEvaluation}</td>

                {/* 8. Hygiene Work */}
                <td className="border-r border-gray-200 py-2 text-gray-400">{rec.hygieneWork}</td>

                {/* 9. Daily Disinfection */}
                <td className="border-r border-gray-200 py-2">{rec.dailyDisinfection}</td>

                {/* 10. Hygiene Inspection - Log */}
                <td
                  className={clsx(
                    'border-r border-gray-200 py-2',
                    rec.hygieneInspection.disinfectionLog !== '미작성' && 'bg-[#dff0d8]',
                  )}
                >
                  {rec.hygieneInspection.disinfectionLog === '최인경' ? (
                    <div className="flex flex-col items-center">
                      <span>최인경</span>
                      <span className="rounded-[2px] border border-[#17a2b8] px-1 text-[9px] text-[#17a2b8]">
                        주방 집기류 소독
                      </span>
                      <span className="mt-0.5 rounded-[2px] border border-[#17a2b8] px-1 text-[9px] text-[#17a2b8]">
                        주방 소독
                      </span>
                    </div>
                  ) : (
                    rec.hygieneInspection.disinfectionLog
                  )}
                </td>

                {/* 11. Hygiene Inspection - Kitchen (RowSpan Logic Mock) */}
                {rec.day === 1 && (
                  <td rowSpan={9} className="border-gray-200 bg-[#fdfbe6] py-2 align-middle">
                    미소독
                  </td>
                )}
                {rec.day === 10 && (
                  <td rowSpan={9} className="border-gray-200 bg-[#dff0d8] py-2 align-middle">
                    소독완료
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer Actions */}
      <div className="mt-2 flex items-center justify-between">
        <div className="text-[12px] font-bold text-[#333]">출력</div>
        <div className="flex gap-1">
          <ActionButton label="인계사항 출력" />
          <ActionButton label="야간점검일지 출력" />
          <ActionButton label="인계사항 출력" />
          <ActionButton label="간호비품관리 출력" />
          <div className="flex flex-col gap-0.5">
            <button className="rounded bg-[#78909c] px-3 py-1 text-[10px] text-white hover:bg-[#607d8b]">
              급식운영일지 출력
            </button>
            <button className="rounded bg-[#78909c] px-3 py-1 text-[10px] text-white hover:bg-[#607d8b]">
              보존식 기록표 출력
            </button>
          </div>
          <ActionButton label="일일식사평가 출력" />
          <ActionButton label="위생원업무일지 출력" />
          <ActionButton label="일상소독일지 출력" />
          <div className="w-[80px]"></div>
          {/* Spacer for Hygiene Log */}
          <ActionButton label="위생점검일지 출력" />
        </div>
      </div>
    </div>
  );
}

function ActionButton({ label }: { readonly label: string }) {
  return (
    <button className="rounded bg-[#78909c] px-3 py-1.5 text-[11px] font-bold text-white shadow hover:bg-[#607d8b]">
      {label}
    </button>
  );
}
