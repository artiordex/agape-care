/**
 * Description : StandardContractTab.tsx - 📌 탭 2. 표준약관
 * Author : Shiwoo Min
 * Date : 2026-02-06
 */

'use client';

import clsx from 'clsx';

export default function StandardContractTab() {
  // 공통 스타일 클래스
  const thClass = 'bg-[#E8F1F8] border border-[#B8D1E0] px-2 py-1.5 text-center text-[12px] font-bold text-gray-700';
  const tdClass = 'border border-[#B8D1E0] px-3 py-1.5 text-[12px] text-gray-900 bg-white';
  const sectionTitleClass = 'flex items-center gap-1 text-[#2E6A9E] font-black text-[14px] mb-2';

  return (
    <div className="flex flex-col gap-6 bg-white p-4 font-sans antialiased">
      {/* 1. 표준약관 정보 섹션 */}
      <section>
        <div className="mb-2 flex items-center justify-between">
          <div className={sectionTitleClass}>
            <i className="ri-checkbox-indeterminate-line"></i> 표준약관 정보
          </div>
          <button className="rounded border border-[#57A5CE] bg-[#E8F1F8] px-3 py-1 text-[11px] font-bold text-[#2E6A9E] shadow-sm">
            표준약관 조회
          </button>
        </div>

        <table className="w-full table-fixed border-collapse border border-[#B8D1E0]">
          <thead>
            <tr>
              <th
                colSpan={2}
                className="border border-[#B8D1E0] bg-[#E8F1F8] py-1.5 text-[12px] font-black text-[#2E6A9E]"
              >
                계약 정보
              </th>
              <th
                colSpan={4}
                className="border border-[#B8D1E0] bg-[#E8F1F8] py-1.5 text-[12px] font-black text-[#2E6A9E]"
              >
                본인부담금 정보 (세부내역 - 30일 기준)
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th className={thClass}>계약일</th>
              <td className={clsx(tdClass, 'text-center')}>2026.01.23</td>
              <th className={thClass}>본인부담금(20%)</th>
              <td className={clsx(tdClass, 'text-right')}>576,300 원</td>
              <th className={thClass}>식사재료비(1식)</th>
              <td className={clsx(tdClass, 'text-right')}>3,500 원</td>
            </tr>
            <tr>
              <th className={thClass}>계약기간</th>
              <td className={clsx(tdClass, 'text-center')}>2026.01.23 ~ 2031.01.22</td>
              <th className={thClass}>간식비(1식)</th>
              <td className={clsx(tdClass, 'text-right')}>1,200 원 (1 회)</td>
              <th className={thClass}>경관유동식(1개월)</th>
              <td className={clsx(tdClass, 'text-right')}>0 원</td>
            </tr>
            <tr>
              <th className={thClass}>수급자</th>
              <td className={tdClass}>
                <div className="flex items-center justify-between">
                  <span>가나다</span>
                  <span className="text-[10px] font-normal italic text-gray-400">가나다</span>
                </div>
              </td>
              <th className={thClass}>상급침실비(1박)</th>
              <td className={clsx(tdClass, 'text-right')}>0 원</td>
              <th className={thClass}>이/미용료</th>
              <td className={clsx(tdClass, 'text-right')}>1,000 원</td>
            </tr>
            <tr>
              <th className={thClass}>인정등급</th>
              <td className={clsx(tdClass, 'text-center font-bold')}>4등급</td>
              <th className={thClass}>본인부담률</th>
              <td className={clsx(tdClass, 'text-center')}>20% (일반)</td>
              <th className="border border-[#B8D1E0] bg-[#FEFCE8] px-2 py-1.5 text-center text-[12px] font-bold text-gray-700">
                본인부담금 합계
              </th>
              <td className="border border-[#B8D1E0] bg-[#FEFCE8] px-3 py-1.5 text-right text-[14px] font-black text-gray-900">
                928,300 원
              </td>
            </tr>
          </tbody>
        </table>

        {/* 중앙 액션 버튼 */}
        <div className="mt-4 flex justify-center gap-2">
          <button className="rounded bg-[#57A5CE] px-4 py-2 text-[12px] font-bold text-white shadow-md hover:bg-[#468db3]">
            표준약관 신규등록
          </button>
          <button className="rounded bg-[#57A5CE] px-4 py-2 text-[12px] font-bold text-white shadow-md hover:bg-[#468db3]">
            표준약관 발송 및 전자서명
          </button>
          <button className="rounded bg-[#7A8B9A] px-4 py-2 text-[12px] font-bold text-white shadow-md hover:bg-[#647481]">
            표준약관 출력
          </button>
        </div>
      </section>

      {/* 하단 2열 그리드 */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* 2. 표준약관 이력 섹션 */}
        <section>
          <div className={sectionTitleClass}>
            <i className="ri-checkbox-indeterminate-line"></i> 표준약관 이력
          </div>
          <table className="w-full border-collapse border border-[#B8D1E0]">
            <thead>
              <tr className="bg-[#E8F1F8]">
                <th className={clsx(thClass, 'w-12')}>연번</th>
                <th className={thClass}>계약일</th>
                <th className={thClass}>계약기간</th>
                <th className={thClass}>수급자 서명</th>
                <th className={thClass}>보호자 서명</th>
                <th className={clsx(thClass, 'w-16')}>조회</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-[#89C168]/20 transition-colors">
                <td className={clsx(tdClass, 'text-center font-bold')}>1</td>
                <td className={clsx(tdClass, 'bg-[#89C168] text-center font-black text-white')}>2026.01.23</td>
                <td className={tdClass}>
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-[#89C168] px-1 text-[10px] text-white">현재</span>
                    <span className="font-bold text-[#4A7548]">2026.01.23 ~ 2031.01.22</span>
                  </div>
                </td>
                <td className={clsx(tdClass, 'text-center italic text-gray-400')}>가나다</td>
                <td className={clsx(tdClass, 'text-center italic text-gray-400')}>김사랑</td>
                <td className={tdClass}>
                  <button className="w-full rounded bg-[#57A5CE] py-0.5 text-[11px] text-white shadow-inner">
                    조회
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* 3. 입소시 제공(안내)문서 섹션 */}
        <section>
          <div className={sectionTitleClass}>
            <i className="ri-checkbox-indeterminate-line"></i> 입소시 제공(안내)문서
          </div>
          <div className="grid grid-cols-4 border border-[#B8D1E0]">
            {[
              { label: '개인정보 동의서 (입소시)', date: '2026.01.23' },
              { label: '노인인권 보호지침 (입소시)', date: '2026.01.23' },
              { label: '직원인권 보호지침 (입소시)', date: '2026.01.23' },
              { label: '연명의료 결정제도 (필요시)', date: '2026.01.23' },
            ].map(doc => (
              <div key={doc.label} className="flex flex-col border-r border-[#B8D1E0] last:border-r-0">
                <div className="flex min-h-[60px] items-center justify-center bg-[#E8F1F8] p-3 text-center text-[11px] font-bold leading-tight text-gray-700">
                  {doc.label} <i className="ri-question-line ml-1 text-gray-400"></i>
                </div>
                <div className="border-t border-[#B8D1E0] bg-white p-2">
                  <button className="mb-2 w-full rounded bg-[#7A8B9A] py-1 text-[11px] text-white">출력</button>
                  <div className="rounded border border-[#B8D1E0] bg-[#DCF2D8] p-2 text-center">
                    <p className="text-[10px] font-bold text-[#4A7548]">작성완료</p>
                    <p className="text-[10px] text-[#4A7548]">({doc.date})</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
