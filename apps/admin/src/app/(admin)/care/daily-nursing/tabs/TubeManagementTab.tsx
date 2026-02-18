/**
 * Description : TubeManagementTab.tsx - ?? ? UI ????
 * Author : Shiwoo Min
 * Date : 2026-02-18
 */

'use client';

export interface TubeManagement {
  tubeType: 'gastric' | 'peg' | 'tracheostomy' | 'none';
  insertionDate: string;
  changeDate: string;
  feedingAmount: string;
  feedingTimes: string[];
  tubeStatus: string[];
  note: string;
}

interface Props {
  readonly management: TubeManagement;
  readonly onChange: (management: TubeManagement) => void;
  readonly onSave: () => void;
}

/**
 * [Tab Content] 4. 비위관/튜브 관리 및 영양 공급 기록
 * Refactored to match legacy UI layout pixel-perfectly
 */
export default function TubeManagementTab({ management, onChange, onSave }: Props) {
  return (
    <div className="space-y-6 font-sans text-[#333] antialiased">
      {/* 1. 메인 입력 영역: 2단 그리드 시스템 */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* [좌측] 비위관 관리기록 - 필요시 */}
        <div className="flex flex-col border border-[#B8D1E0] bg-white shadow-sm">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#B8D1E0] bg-[#f8fafc] px-3 py-2">
            <div className="flex items-center gap-1 text-[13px] font-bold">
              <i className="ri-arrow-right-s-fill text-[10px] text-[#204987]"></i>
              <span className="text-[#204987]">비위관 관리기록</span>
              <span className="text-[#e74c3c]">- 필요시</span>
            </div>
            <button className="rounded-sm bg-[#788fa0] px-3 py-1 text-[11px] text-white shadow-sm hover:bg-[#637d91]">
              전일 자료 조회
            </button>
          </div>

          <div className="flex flex-1 flex-col p-0">
            <div className="flex flex-1 border-b border-[#B8D1E0]">
              {/* 레이블 */}
              <div className="flex w-[100px] shrink-0 items-center justify-center border-r border-[#B8D1E0] bg-[#E8F1F8] p-2 text-center">
                <span className="text-[12px] font-bold leading-tight text-[#333]">
                  비위관 교체
                  <br />및<br />
                  관리 기록
                </span>
              </div>
              {/* 입력창 */}
              <div className="flex-1 p-2">
                <textarea
                  value={management.note}
                  onChange={e => onChange({ ...management, note: e.target.value })}
                  className="h-full min-h-[160px] w-full resize-none border border-gray-300 p-2 text-[12px] placeholder-gray-300 outline-none focus:border-[#204987]"
                />
              </div>
            </div>

            {/* 작성자 */}
            <div className="flex items-center bg-white">
              <div className="flex w-[100px] shrink-0 justify-center border-r border-[#B8D1E0] bg-[#E8F1F8] py-2 text-center">
                <span className="text-[12px] font-bold text-[#333]">
                  작성자<span className="text-red-500">*</span>
                </span>
              </div>
              <div className="flex flex-1 items-center gap-1 border-t border-transparent p-2 pl-3">
                <input
                  type="text"
                  readOnly
                  value="최인정"
                  className="w-32 border border-gray-300 bg-white px-2 py-1 text-center text-[12px] outline-none"
                />
                <button className="rounded-sm bg-[#546E7A] px-4 py-1 text-[11px] font-bold text-white shadow-sm hover:bg-[#455A64]">
                  선택
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* [우측] 비위관 영양 - 필요시 */}
        <div className="flex flex-col border border-[#B8D1E0] bg-white shadow-sm">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#B8D1E0] bg-[#f8fafc] px-3 py-2">
            <div className="flex items-center gap-1 text-[13px] font-bold">
              <i className="ri-arrow-right-s-fill text-[10px] text-[#204987]"></i>
              <span className="text-[#204987]">비위관 영양</span>
              <span className="text-[#e74c3c]">- 필요시</span>
            </div>
            <button className="rounded-sm bg-[#788fa0] px-3 py-1 text-[11px] text-white shadow-sm hover:bg-[#637d91]">
              전일 자료 조회
            </button>
          </div>

          <div className="flex flex-col p-0">
            {/* Table Header */}
            <div className="border-b border-[#B8D1E0] bg-[#E8F1F8]">
              <table className="w-full table-fixed border-collapse text-[11px] text-[#333]">
                <thead>
                  <tr>
                    <th className="w-[15%] border-r border-[#B8D1E0] py-2 text-center font-bold">횟수</th>
                    <th className="w-[25%] border-r border-[#B8D1E0] px-2 py-2 text-center font-bold">
                      식사종류{' '}
                      <span className="inline-block rounded border border-gray-400 bg-white px-0.5 text-[9px] text-gray-500">
                        ?
                      </span>
                    </th>
                    <th className="w-[20%] border-r border-[#B8D1E0] py-2 text-center font-bold">식사량(ml)</th>
                    <th className="w-[25%] border-r border-[#B8D1E0] py-2 text-center font-bold">식사시간</th>
                    <th className="w-[15%] py-2 text-center font-bold">지움</th>
                  </tr>
                </thead>
              </table>
            </div>

            {/* Table Body - Scrollable Area Implementation */}
            <div className="custom-scrollbar h-[200px] overflow-y-auto">
              <table className="w-full table-fixed border-collapse text-[12px]">
                <tbody className="divide-y divide-gray-100">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                    <tr key={i} className="hover:bg-blue-50">
                      <td className="w-[15%] border-r border-[#B8D1E0] py-1.5 text-center font-bold text-gray-700">
                        {i}회
                      </td>
                      <td className="w-[25%] border-r border-[#B8D1E0] px-2 py-1.5 align-middle">
                        <select className="w-full border border-gray-300 px-1 py-1 text-[11px] outline-none focus:border-[#204987]">
                          <option>선택</option>
                          <option>뉴케어</option>
                          <option>그린비아</option>
                        </select>
                      </td>
                      <td className="w-[20%] border-r border-[#B8D1E0] px-2 py-1.5 align-middle">
                        <input
                          type="text"
                          className="w-full border border-gray-300 py-1 text-center outline-none focus:border-[#204987]"
                        />
                      </td>
                      <td className="w-[25%] border-r border-[#B8D1E0] px-2 py-1.5 align-middle">
                        <div className="flex items-center justify-center gap-1">
                          <input
                            type="text"
                            className="w-8 border border-gray-300 py-1 text-center outline-none focus:border-[#204987]"
                          />
                          :
                          <input
                            type="text"
                            className="w-8 border border-gray-300 py-1 text-center outline-none focus:border-[#204987]"
                          />
                        </div>
                      </td>
                      <td className="w-[15%] py-1.5 text-center align-middle">
                        <button className="text-gray-300 transition-colors hover:text-red-500">
                          <i className="ri-close-circle-fill text-lg"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* 액션 버튼 */}
      <div className="flex items-center justify-center gap-2 py-4">
        <button
          onClick={onSave}
          className="rounded bg-[#2980b9] px-16 py-2 text-[14px] font-bold text-white shadow-md transition-colors hover:bg-[#2066aa]"
        >
          저장
        </button>
        <button className="flex flex-col items-center justify-center rounded bg-[#7f8c8d] px-6 py-1 text-white shadow-md transition-colors hover:bg-[#636e72]">
          <span className="text-[13px] font-bold">비위관 기록지 출력</span>
          <span className="text-[10px] opacity-90">2026.02.01 - 2026.02.28</span>
        </button>
      </div>

      {/* 2. 하단 리스트: 비위관영양 관리기록 이력 */}
      <div className="overflow-hidden border border-[#B8D1E0] bg-white shadow-sm">
        <div className="flex items-center gap-2 border-b border-[#B8D1E0] bg-[#f8fafc] px-3 py-2">
          <i className="ri-arrow-right-s-fill text-[10px] text-[#204987]"></i>
          <h3 className="text-[13px] font-bold text-[#204987]">비위관영양 관리기록 이력</h3>
        </div>
        <div className="min-h-[150px] overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead className="border-b border-[#B8D1E0] bg-[#E8F1F8] text-center text-[11px] font-bold text-[#333]">
              <tr>
                <th className="w-[60px] border-r border-[#B8D1E0] py-2">연번</th>
                <th className="w-[100px] border-r border-[#B8D1E0] py-2">관리기록일</th>
                <th className="w-[80px] border-r border-[#B8D1E0] py-2">식사량</th>
                <th className="border-r border-[#B8D1E0] py-2">비위관 교체 및 관리 기록</th>
                <th className="w-[80px] border-r border-[#B8D1E0] py-2">작성자</th>
                <th className="w-[60px] py-2">삭제</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white text-center text-[12px]">
              <tr>
                <td colSpan={6} className="py-12 text-gray-500">
                  조회된 비위관 관리기록일지 목록이 없습니다.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
