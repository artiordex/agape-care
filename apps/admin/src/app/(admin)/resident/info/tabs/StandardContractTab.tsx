/**
 * Description : StandardContractTab.tsx - ?? ? UI ????
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
    <div className="flex flex-col gap-6 font-sans text-[#333] antialiased">
      {/* 1. 표준약관 정보 섹션 */}
      <section>
        <div className="mb-2 flex items-center justify-between border-b-2 border-[#2E6A9E] pb-1">
          <div className={sectionTitleClass}>
            <i className="ri-file-list-3-line"></i> 표준약관 정보
          </div>
          <button className="rounded bg-[#57A5CE] px-3 py-1 text-[11px] font-bold text-white hover:bg-[#468db3]">
            표준약관 조회
          </button>
        </div>

        <table className="w-full table-fixed border-collapse border border-[#B8D1E0]">
          <thead>
            <tr>
              <th
                colSpan={4}
                className="border border-[#B8D1E0] bg-[#E8F1F8] py-1.5 text-center text-[12px] font-bold text-gray-700"
              >
                계약 정보
              </th>
              <th
                colSpan={4}
                className="border border-[#B8D1E0] bg-[#E8F1F8] py-1.5 text-center text-[12px] font-bold text-gray-700"
              >
                본인부담금 정보 (세부내역 - 30일 기준)
                <span className="float-right mr-2 text-[11px] font-normal text-gray-500">※ 시설비급여수가</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th className={thClass}>계약일</th>
              <td colSpan={3} className={clsx(tdClass, 'text-center')}>
                2026.01.23
              </td>
              <th className={thClass}>본인부담금(12%)</th>
              <td className={clsx(tdClass, 'text-right')}>293,540 원</td>
              <th className={thClass}>식사재료비(1식)</th>
              <td className={clsx(tdClass, 'text-right')}>3,500 원</td>
            </tr>
            <tr>
              <th className={thClass}>계약기간</th>
              <td colSpan={3} className={clsx(tdClass, 'text-center')}>
                2026.01.23 ~ 2031.01.22
              </td>
              <th className={thClass}>간식비(1식)</th>
              <td className={clsx(tdClass, 'text-right')}>1,200 원 (2 회)</td>
              <th className={thClass}>경관유동식(1개월)</th>
              <td className={clsx(tdClass, 'text-right')}>0 원</td>
            </tr>
            <tr>
              <th className={thClass}>수급자</th>
              <td className={clsx(tdClass, 'text-center')}>
                가나당 <span className="text-[10px] text-gray-400">가나당</span>
              </td>
              <th className={thClass}>보호자</th>
              <td className={clsx(tdClass, 'text-center')}>
                김가나 <span className="text-[10px] text-gray-400">김가나</span>
              </td>
              <th className={thClass}>상급침실비(1박)</th>
              <td className={clsx(tdClass, 'text-right')}>0 원</td>
              <th className={thClass}>이/미용료</th>
              <td className={clsx(tdClass, 'text-right')}>1,000 원</td>
            </tr>
            <tr>
              <th className={thClass}>인정등급</th>
              <td colSpan={1} className={clsx(tdClass, 'text-center')}>
                3등급
              </td>
              <th className={thClass}>본인부담률</th>
              <td className={clsx(tdClass, 'text-center text-[11px]')}>
                12% (40%
                <br />
                감경대상자)
              </td>
              <th className="border border-[#B8D1E0] bg-[#E8F1F8] px-2 py-1.5 text-center text-[12px] font-bold text-gray-700">
                본인부담금 합계
              </th>
              <td
                colSpan={3}
                className="border border-[#B8D1E0] bg-[#FEFCE8] px-3 py-1.5 text-right text-[14px] font-black text-gray-900"
              >
                681,540 원
              </td>
            </tr>
          </tbody>
        </table>

        {/* 중앙 액션 버튼 */}
        <div className="mt-4 flex justify-center gap-2">
          <button className="rounded bg-[#2E9FAE] px-6 py-2 text-[13px] font-bold text-white shadow-md hover:bg-[#25828e]">
            표준약관 신규등록
          </button>
          <button className="rounded bg-[#57A5CE] px-6 py-2 text-[13px] font-bold text-white shadow-md hover:bg-[#468db3]">
            표준약관 발송 및 전자서명
            <br />
            <span className="text-[11px] font-normal">(서명완료)</span>
          </button>
          <button className="rounded bg-[#7A8B9A] px-6 py-2 text-[13px] font-bold text-white shadow-md hover:bg-[#647481]">
            표준약관 출력
          </button>
        </div>
      </section>

      {/* 하단 2열 그리드 */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* 2. 표준약관 이력 섹션 */}
        <section>
          <div className="mb-2 flex items-center gap-1 border-b-2 border-[#B8D1E0] pb-1 text-[14px] font-black text-[#2E6A9E]">
            <i className="ri-checkbox-indeterminate-line"></i> 표준약관 이력
          </div>
          <table className="w-full border-collapse border border-[#B8D1E0]">
            <thead>
              <tr className="bg-[#E8F1F8] text-[12px] text-gray-700">
                <th className="w-10 border border-[#B8D1E0] py-1.5 font-bold">연번</th>
                <th className="w-24 border border-[#B8D1E0] py-1.5 font-bold">계약일</th>
                <th className="border border-[#B8D1E0] py-1.5 font-bold">계약기간</th>
                <th className="w-16 border border-[#B8D1E0] py-1.5 font-bold">
                  수급자
                  <br />
                  서명
                </th>
                <th className="w-16 border border-[#B8D1E0] py-1.5 font-bold">
                  보호자
                  <br />
                  서명
                </th>
                <th className="w-16 border border-[#B8D1E0] py-1.5 font-bold">조회</th>
              </tr>
            </thead>
            <tbody>
              {/* Row 1 (Active) */}
              <tr className="bg-[#89C168]">
                <td className="border border-[#B8D1E0] py-1 text-center text-[12px] font-bold text-white">2</td>
                <td className="border border-[#B8D1E0] py-1 text-center text-[12px] font-bold text-white">
                  2026.01.23
                </td>
                <td className="border border-[#B8D1E0] px-2 py-1 text-[12px] text-white">
                  <span className="mr-1 rounded-sm bg-white px-1 text-[10px] font-bold text-[#89C168]">현재</span>
                  <span className="font-bold">2026.01.23 ~ 2031.01.22</span>
                </td>
                <td className="border border-[#B8D1E0] py-1 text-center text-[12px] text-[#333]">가나당</td>
                <td className="border border-[#B8D1E0] py-1 text-center text-[12px] text-[#333]">김가나</td>
                <td className="border border-[#B8D1E0] py-1 text-center">
                  <button className="rounded bg-[#57A5CE] px-2 py-0.5 text-[11px] text-white">조회</button>
                </td>
              </tr>
              {/* Row 2 */}
              <tr className="bg-white">
                <td className="border border-[#B8D1E0] py-1 text-center text-[12px] text-gray-700">1</td>
                <td className="border border-[#B8D1E0] py-1 text-center text-[12px] text-gray-700">2026.01.23</td>
                <td className="border border-[#B8D1E0] px-2 py-1 text-center text-[12px] text-gray-700">
                  2026.01.23 ~ 2031.01.22
                </td>
                <td className="border border-[#B8D1E0] py-1 text-center text-[12px] text-gray-700">미등록</td>
                <td className="border border-[#B8D1E0] py-1 text-center text-[12px] text-gray-700">미등록</td>
                <td className="border border-[#B8D1E0] py-1 text-center">
                  <button className="rounded bg-[#57A5CE] px-2 py-0.5 text-[11px] text-white">조회</button>
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* 3. 입소시 제공(안내)문서 섹션 */}
        <section>
          <div className="mb-2 flex items-center gap-1 border-b-2 border-[#B8D1E0] pb-1 text-[14px] font-black text-[#2E6A9E]">
            <i className="ri-checkbox-indeterminate-line"></i> 입소시 제공(안내)문서
          </div>
          <table className="w-full border-collapse border border-[#B8D1E0]">
            <thead>
              <tr className="bg-[#E8F1F8] text-[12px] text-gray-700">
                {[
                  '개인정보\n동의서\n(입소시)',
                  '노인인권\n보호지침\n(입소시)',
                  '직원인권\n보호지침\n(입소시)',
                  '연명의료\n결정제도\n(필요시)',
                ].map((title, i) => (
                  <th key={i} className="border border-[#B8D1E0] py-2 text-center font-bold leading-tight">
                    {title.split('\n').map((line, j) => (
                      <div key={j}>{line}</div>
                    ))}
                    {i < 3 && <i className="ri-question-fill ml-1 text-gray-500"></i>}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {[1, 2, 3, 4].map((_, i) => (
                  <td key={i} className="border border-[#B8D1E0] bg-white p-2 text-center align-top">
                    <button className="mb-2 w-full rounded bg-[#7A8B9A] py-1 text-[12px] font-bold text-white shadow-sm hover:bg-[#647481]">
                      출력
                    </button>

                    <div className="rounded bg-[#EEF9E6] py-2 text-center">
                      <div className="text-[12px] font-bold text-[#3E6B36]">
                        {i === 3 ? '안내완료' : i === 0 ? '작성완료' : '제공완료'}
                      </div>
                      <div className="text-[11px] text-[#3E6B36]">(2026.01.23)</div>
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
}
