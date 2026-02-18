/**
 * Description : BowelManagementTab.tsx - ?? ? UI ????
 * Author : Shiwoo Min
 * Date : 2026-02-18
 */

'use client';

export interface BowelManagement {
  // 관찰기록 (Observation)
  observation: string;

  // 조치사항 (Checkboxes)
  actions: {
    fluidSupply: boolean; // 수분공급
    abdominalMassage: boolean; // 복부마사지
    constipationMedicine: boolean; // 변비약투여
    antidiarrheal: boolean; // 지사제투여
    suppository: boolean; // 좌약삽입
    enema: boolean; // 관장실시
    etc: boolean; // 기타
  };
  etcDetail: string; // 기타 상세 내용

  // 결과 (Result)
  result: string;

  // 작성자 (Writer)
  writer: string;

  // 기저귀 교체시간 (Diaper Change Time) - 2 rows x 6 cols grid data
  // Using a flat array or a structured object to represent the grid.
  // Let's use a simple array of strings for simplicity, or a structured object if needed.
  // Given the screenshot, it looks like a visual grid for time entry.
  diaperChangeTimes: string[]; // Stores up to 12 time entries
}

interface Props {
  readonly management: BowelManagement;
  readonly onChange: (management: BowelManagement) => void;
  readonly onSave: () => void;
}

/**
 * [Tab Content] 6. 배설관리기록
 * Legacy UI Style (Blue/Gray Theme) matching the screenshot
 */
export default function BowelManagementTab({ management, onChange, onSave }: Props) {
  const toggleAction = (key: keyof BowelManagement['actions']) => {
    onChange({
      ...management,
      actions: { ...management.actions, [key]: !management.actions[key] },
    });
  };

  const updateDiaperTime = (index: number, value: string) => {
    const newTimes = [...management.diaperChangeTimes];
    newTimes[index] = value;
    onChange({ ...management, diaperChangeTimes: newTimes });
  };

  return (
    <div className="space-y-6 font-sans text-[#333] antialiased">
      {/* 1. 배설관리기록 메인 폼 */}
      <div className="flex flex-col border border-[#B8D1E0] bg-white shadow-sm">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#B8D1E0] bg-[#f8fafc] px-3 py-2">
          <div className="flex items-center gap-1 text-[13px] font-bold">
            <i className="ri-arrow-right-s-fill text-[10px] text-[#204987]"></i>
            <span className="text-[#204987]">배설관리기록</span>
          </div>
          <div className="flex gap-1">
            <button className="rounded-sm bg-[#788fa0] px-3 py-1 text-[11px] text-white shadow-sm hover:bg-[#637d91]">
              최근 화장실 이용 현황
            </button>
            <button className="rounded-sm bg-[#788fa0] px-3 py-1 text-[11px] text-white shadow-sm hover:bg-[#637d91]">
              전일 자료 조회
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex flex-col lg:flex-row">
          {/* Left Column: Form Inputs */}
          <div className="flex flex-[1.2] flex-col border-r border-[#B8D1E0]">
            {/* 관찰기록 */}
            <div className="flex flex-1 border-b border-[#B8D1E0]">
              <div className="flex w-[100px] shrink-0 items-center justify-center bg-[#E8F1F8] p-2 text-center">
                <span className="text-[12px] font-bold text-[#333]">
                  관찰기록<span className="text-red-500">*</span>
                </span>
              </div>
              <div className="flex-1 p-2">
                <textarea
                  value={management.observation}
                  onChange={e => onChange({ ...management, observation: e.target.value })}
                  className="h-full min-h-[80px] w-full resize-none border border-gray-300 p-2 text-[12px] placeholder-gray-300 outline-none focus:border-[#204987]"
                />
              </div>
            </div>

            {/* 조치사항 */}
            <div className="flex flex-1 border-b border-[#B8D1E0]">
              <div className="flex w-[100px] shrink-0 items-center justify-center bg-[#E8F1F8] p-2 text-center">
                <span className="text-[12px] font-bold text-[#333]">
                  조치사항<span className="text-red-500">*</span>
                </span>
              </div>
              <div className="flex-1 p-3">
                <div className="grid grid-cols-2 gap-y-2 sm:grid-cols-3">
                  <Checkbox
                    label="수분공급"
                    checked={management.actions.fluidSupply}
                    onChange={() => toggleAction('fluidSupply')}
                  />
                  <Checkbox
                    label="복부마사지"
                    checked={management.actions.abdominalMassage}
                    onChange={() => toggleAction('abdominalMassage')}
                  />
                  <Checkbox
                    label="변비약투여"
                    checked={management.actions.constipationMedicine}
                    onChange={() => toggleAction('constipationMedicine')}
                  />
                  <Checkbox
                    label="지사제투여"
                    checked={management.actions.antidiarrheal}
                    onChange={() => toggleAction('antidiarrheal')}
                  />
                  <Checkbox
                    label="좌약삽입"
                    checked={management.actions.suppository}
                    onChange={() => toggleAction('suppository')}
                  />
                  <Checkbox
                    label="관장실시"
                    checked={management.actions.enema}
                    onChange={() => toggleAction('enema')}
                  />
                  <div className="col-span-2 flex items-center gap-2 sm:col-span-3">
                    <Checkbox label="기타 :" checked={management.actions.etc} onChange={() => toggleAction('etc')} />
                    <input
                      type="text"
                      disabled={!management.actions.etc}
                      value={management.etcDetail}
                      onChange={e => onChange({ ...management, etcDetail: e.target.value })}
                      className="w-full max-w-[200px] border-b border-gray-300 py-1 text-[12px] outline-none focus:border-[#204987] disabled:bg-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 결과 */}
            <div className="flex flex-1 border-b border-[#B8D1E0] lg:border-b-0">
              <div className="flex w-[100px] shrink-0 items-center justify-center bg-[#E8F1F8] p-2 text-center">
                <span className="text-[12px] font-bold text-[#333]">결과</span>
              </div>
              <div className="flex-1 p-2">
                <textarea
                  value={management.result}
                  onChange={e => onChange({ ...management, result: e.target.value })}
                  className="h-full min-h-[60px] w-full resize-none border border-gray-300 p-2 text-[12px] placeholder-gray-300 outline-none focus:border-[#204987]"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Diaper Change Time & Writer */}
          <div className="flex flex-1 flex-col">
            {/* 기저귀 교체시간 */}
            <div className="flex flex-1 border-b border-[#B8D1E0]">
              <div className="flex w-[80px] shrink-0 items-center justify-center bg-[#E8F1F8] p-2 text-center">
                <span className="text-[12px] font-bold leading-tight text-[#333]">
                  기저귀
                  <br />
                  교체시간
                </span>
              </div>
              <div className="flex flex-1 flex-col p-1">
                {/* 2x6 Grid for Time Inputs */}
                <div className="flex h-full flex-col border-l border-t border-[#B8D1E0]">
                  {/* Row 1 */}
                  <div className="flex flex-1">
                    {[0, 1, 2, 3, 4, 5].map(idx => (
                      <div key={idx} className="flex-1 border-b border-r border-[#B8D1E0]">
                        <input
                          type="text"
                          value={management.diaperChangeTimes[idx] || ''}
                          onChange={e => updateDiaperTime(idx, e.target.value)}
                          className="h-full w-full text-center text-[12px] outline-none focus:bg-blue-50"
                        />
                      </div>
                    ))}
                  </div>
                  {/* Row 2 */}
                  <div className="flex flex-1">
                    {[6, 7, 8, 9, 10, 11].map(idx => (
                      <div key={idx} className="flex-1 border-b border-r border-[#B8D1E0]">
                        <input
                          type="text"
                          value={management.diaperChangeTimes[idx] || ''}
                          onChange={e => updateDiaperTime(idx, e.target.value)}
                          className="h-full w-full text-center text-[12px] outline-none focus:bg-blue-50"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 작성자 */}
            <div className="flex h-[50px] items-center">
              <div className="flex h-full w-[80px] shrink-0 items-center justify-center bg-[#E8F1F8] p-2 text-center">
                <span className="text-[12px] font-bold text-[#333]">
                  작성자<span className="text-red-500">*</span>
                </span>
              </div>
              <div className="flex h-full flex-1 items-center gap-1 bg-white p-2">
                <input
                  type="text"
                  readOnly
                  value={management.writer}
                  className="w-32 border border-gray-300 px-2 py-1 text-center text-[12px] outline-none"
                />
                <button className="rounded-sm bg-[#546E7A] px-4 py-1 text-[11px] font-bold text-white shadow-sm hover:bg-[#455A64]">
                  선택
                </button>
              </div>
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
          <span className="text-[13px] font-bold">배설 기록지 출력</span>
          <span className="text-[10px] opacity-90">2026.02.01 - 2026.02.28</span>
        </button>
      </div>

      {/* 2. 하단 리스트: 배설관리기록 이력 */}
      <div className="overflow-hidden border border-[#B8D1E0] bg-white shadow-sm">
        <div className="flex items-center gap-2 border-b border-[#B8D1E0] bg-[#f8fafc] px-3 py-2">
          <i className="ri-arrow-right-s-fill text-[10px] text-[#204987]"></i>
          <h3 className="text-[13px] font-bold text-[#204987]">배설관리기록 이력</h3>
        </div>
        <div className="min-h-[200px] overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead className="border-b border-[#B8D1E0] bg-[#E8F1F8] text-center text-[11px] font-bold text-[#333]">
              <tr>
                <th className="w-[50px] border-r border-[#B8D1E0] py-2">연번</th>
                <th className="w-[100px] border-r border-[#B8D1E0] py-2">관리기록일</th>
                <th className="border-r border-[#B8D1E0] py-2">관찰기록</th>
                <th className="border-r border-[#B8D1E0] py-2">조치사항</th>
                <th className="border-r border-[#B8D1E0] py-2">결과</th>
                <th className="w-[80px] border-r border-[#B8D1E0] py-2">기록자</th>
                <th className="w-[50px] py-2">삭제</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white text-center text-[12px]">
              <tr>
                <td colSpan={7} className="py-20 text-gray-500">
                  조회된 배설관리기록일지 목록이 없습니다.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function Checkbox({
  label,
  checked,
  onChange,
}: {
  readonly label: string;
  readonly checked: boolean;
  readonly onChange: () => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-1.5 hover:opacity-80">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-3.5 w-3.5 rounded border-gray-300 text-[#204987] focus:ring-[#204987]"
      />
      <span className="text-[12px] font-medium text-[#555]">{label}</span>
    </label>
  );
}
