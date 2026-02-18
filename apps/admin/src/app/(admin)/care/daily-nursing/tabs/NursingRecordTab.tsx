/**
 * Description : NursingRecordTab.tsx - ?? ? UI ????
 * Author : Shiwoo Min
 * Date : 2026-02-18
 */

'use client';

import clsx from 'clsx';

export interface NursingNote {
  // 진료 기본 정보
  date: string; // 진료일 (YYYY-MM-DD or YYYY.MM.DD)
  type: 'external' | 'contract'; // 진료구분: 외래진료, 계약의사진료
  hospital: string; // 병의원명
  writer: string; // 작성자
  content: string; // 진료내용
  hasReceipt: boolean; // 영수증첨부

  // 진료비 (Medical Cost)
  medicalCost: string;
  medicalCostBilling: 'billed' | 'not-billed'; // 청구/미청구

  // 약제비 (Pharmacy Cost)
  pharmacyCost: string;
  pharmacyCostBilling: 'billed' | 'not-billed'; // 청구/미청구

  // 외출기록 (Outing)
  hasOuting: boolean; // 외출기록 유무
  outingTime: string; // 외출시간
  guardian: string; // 보호자명
  relation: string; // 관계
  contact: string; // 연락처
}

interface Props {
  readonly note: NursingNote;
  readonly onChange: (note: NursingNote) => void;
  readonly onSave: () => void;
}

/**
 * [Tab Content] 7. 진료기록 (Medical Record)
 * Fixed Layout: Using a vertical split (Left Panel / Right Panel) to stabilize the table-like grid.
 */
export default function NursingRecordTab({ note, onChange, onSave }: Props) {
  const updateField = (field: keyof NursingNote, value: any) => {
    onChange({ ...note, [field]: value });
  };

  return (
    <div className="flex flex-col space-y-6 font-sans text-[#333] antialiased">
      {/* 1. 진료기록 메인 폼 */}
      <div className="flex w-full flex-col border border-[#B8D1E0] bg-white shadow-sm">
        {/* HeaderButtons */}
        <div className="flex items-center justify-between border-b border-[#B8D1E0] bg-[#f8fafc] px-3 py-2">
          <div className="flex items-center gap-1 text-[13px] font-bold">
            <i className="ri-arrow-right-s-fill text-[10px] text-[#204987]"></i>
            <span className="text-[#204987]">진료기록</span>
          </div>
          <div className="flex gap-1">
            <button className="rounded-sm bg-[#788fa0] px-3 py-1 text-[11px] text-white shadow-sm hover:bg-[#637d91]">
              병의원 관리
            </button>
            <button className="rounded-sm bg-[#788fa0] px-3 py-1 text-[11px] text-white shadow-sm hover:bg-[#637d91]">
              계약의사 관리
            </button>
            <button className="rounded-sm bg-[#788fa0] px-3 py-1 text-[11px] text-white shadow-sm hover:bg-[#637d91]">
              협약의료기관 관리(협약서출력)
            </button>
          </div>
        </div>

        {/* Form Body - Split Layout (Left / Right) */}
        <div className="flex w-full flex-col lg:flex-row">
          {/* [Left Panel] Main Information (Width: flex-1) */}
          <div className="flex flex-1 flex-col border-r border-[#B8D1E0]">
            {/* Row L-1: 진료일 | 진료구분 */}
            <div className="flex border-b border-[#B8D1E0]">
              <Label title="진료일" required />
              <div className="flex w-[140px] shrink-0 items-center border-r border-[#B8D1E0] p-1.5">
                <input
                  type="text"
                  value={note.date}
                  onChange={e => updateField('date', e.target.value)}
                  placeholder="YYYY.MM.DD"
                  className="w-full border border-gray-300 px-2 py-1 text-[12px] text-[#333] outline-none focus:border-[#204987]"
                />
              </div>
              <Label title="진료구분" required />
              <div className="flex flex-1 items-center gap-2 p-1.5">
                <Radio
                  label="외래진료"
                  checked={note.type === 'external'}
                  onChange={() => updateField('type', 'external')}
                  color="orange"
                />
                <Radio
                  label="계약의사진료"
                  checked={note.type === 'contract'}
                  onChange={() => updateField('type', 'contract')}
                />
              </div>
            </div>

            {/* Row L-2: 병의원명 | 작성자 */}
            <div className="flex border-b border-[#B8D1E0]">
              <Label title="병의원명" required />
              <div className="flex w-[140px] shrink-0 items-center gap-1 border-r border-[#B8D1E0] p-1.5">
                <input
                  type="text"
                  value={note.hospital}
                  onChange={e => updateField('hospital', e.target.value)}
                  className="w-full min-w-0 border border-gray-300 px-2 py-1 text-[12px] outline-none focus:border-[#204987]"
                />
                <button className="whitespace-nowrap rounded-sm bg-[#546E7A] px-2 py-1 text-[11px] font-bold text-white hover:bg-[#455A64]">
                  선택
                </button>
              </div>
              <Label title="작성자" required />
              <div className="flex flex-1 items-center gap-1 p-1.5">
                <input
                  type="text"
                  readOnly
                  value={note.writer}
                  className="w-[80px] border border-gray-300 px-2 py-1 text-center text-[12px] outline-none"
                />
                <button className="whitespace-nowrap rounded-sm bg-[#546E7A] px-2 py-1 text-[11px] font-bold text-white hover:bg-[#455A64]">
                  선택
                </button>
              </div>
            </div>

            {/* Row L-3: 진료내용 (Takes up remaining height) */}
            <div className="flex flex-1">
              <div className="flex w-[100px] shrink-0 flex-col items-center justify-center border-r border-[#B8D1E0] bg-[#E8F1F8] p-2 text-center">
                <span className="text-[12px] font-bold text-[#333]">진료내용</span>
                <div className="mt-2 flex flex-col items-center gap-1">
                  <label className="flex cursor-pointer items-center gap-1">
                    <input
                      type="checkbox"
                      checked={note.hasReceipt}
                      onChange={e => updateField('hasReceipt', e.target.checked)}
                      className="h-3 w-3"
                    />
                    <span className="text-[10px] text-[#555]">영수증첨부</span>
                  </label>
                  <span
                    className="flex h-4 w-4 cursor-help items-center justify-center rounded bg-gray-400 text-[10px] text-white"
                    title="영수증 첨부 여부"
                  >
                    ?
                  </span>
                </div>
              </div>
              <div className="flex-1 p-2">
                <textarea
                  value={note.content}
                  onChange={e => updateField('content', e.target.value)}
                  className="h-full min-h-[140px] w-full resize-none border border-gray-300 p-2 text-[12px] outline-none focus:border-[#204987]"
                />
              </div>
            </div>
          </div>

          {/* [Right Panel] Cost & Outing Info (Fixed Width: 420px) */}
          <div className="flex w-full flex-col lg:w-[420px] lg:shrink-0">
            {/* Row R-1: 진료비 | 청구 */}
            <div className="flex border-b border-[#B8D1E0]">
              <Label title="진료비" />
              <div className="flex w-[130px] shrink-0 items-center border-r border-[#B8D1E0] p-1.5">
                <input
                  type="text"
                  value={note.medicalCost}
                  onChange={e => updateField('medicalCost', e.target.value)}
                  className="w-full border border-gray-300 px-2 py-1 text-right text-[12px] outline-none focus:border-[#204987]"
                />
                <span className="ml-1 text-[12px]">원</span>
              </div>
              <div className="flex items-center gap-2 px-2 py-1.5">
                <span className="text-[11px] font-bold text-[#333]">청구구분</span>
                <Radio
                  label="청구"
                  checked={note.medicalCostBilling === 'billed'}
                  onChange={() => updateField('medicalCostBilling', 'billed')}
                  color="orange"
                />
                <Radio
                  label="미청구"
                  checked={note.medicalCostBilling === 'not-billed'}
                  onChange={() => updateField('medicalCostBilling', 'not-billed')}
                />
              </div>
            </div>

            {/* Row R-2: 약제비 | 청구 */}
            <div className="flex border-b border-[#B8D1E0]">
              <Label title="약제비" />
              <div className="flex w-[130px] shrink-0 items-center border-r border-[#B8D1E0] p-1.5">
                <input
                  type="text"
                  value={note.pharmacyCost}
                  onChange={e => updateField('pharmacyCost', e.target.value)}
                  className="w-full border border-gray-300 px-2 py-1 text-right text-[12px] outline-none focus:border-[#204987]"
                />
                <span className="ml-1 text-[12px]">원</span>
              </div>
              <div className="flex items-center gap-2 px-2 py-1.5">
                <span className="text-[11px] font-bold text-[#333]">청구구분</span>
                <Radio
                  label="청구"
                  checked={note.pharmacyCostBilling === 'billed'}
                  onChange={() => updateField('pharmacyCostBilling', 'billed')}
                  color="orange"
                />
                <Radio
                  label="미청구"
                  checked={note.pharmacyCostBilling === 'not-billed'}
                  onChange={() => updateField('pharmacyCostBilling', 'not-billed')}
                />
              </div>
            </div>

            {/* Row R-3: 외출기록 Checkbox */}
            <div className="flex border-b border-[#B8D1E0]">
              <Label title="외출기록" />
              <div className="flex flex-1 items-center p-2">
                <label className="flex cursor-pointer items-center gap-1.5">
                  <input
                    type="checkbox"
                    checked={note.hasOuting}
                    onChange={e => updateField('hasOuting', e.target.checked)}
                    className="h-4 w-4"
                  />
                  <span className="text-[12px] font-bold text-[#333]">기록</span>
                </label>
              </div>
            </div>

            {/* Row R-4: 외출시간 | 보호자명 */}
            <div className="flex border-b border-[#B8D1E0]">
              <div className="flex flex-1 border-r border-[#B8D1E0]">
                <Label title="외출시간" />
                <input
                  type="text"
                  disabled={!note.hasOuting}
                  value={note.outingTime}
                  onChange={e => updateField('outingTime', e.target.value)}
                  className="w-full min-w-0 bg-transparent px-2 text-[12px] outline-none"
                />
              </div>
              <div className="flex flex-1">
                <Label title="보호자명" />
                <input
                  type="text"
                  disabled={!note.hasOuting}
                  value={note.guardian}
                  onChange={e => updateField('guardian', e.target.value)}
                  className="w-full min-w-0 bg-transparent px-2 text-[12px] outline-none"
                />
              </div>
            </div>

            {/* Row R-5: 관계 | 연락처 */}
            <div className="flex h-full">
              <div className="flex flex-1 border-r border-[#B8D1E0]">
                <Label title="관계" />
                <input
                  type="text"
                  disabled={!note.hasOuting}
                  value={note.relation}
                  onChange={e => updateField('relation', e.target.value)}
                  className="w-full min-w-0 bg-transparent px-2 text-[12px] outline-none"
                />
              </div>
              <div className="flex flex-1">
                <Label title="연락처" />
                <input
                  type="text"
                  disabled={!note.hasOuting}
                  value={note.contact}
                  onChange={e => updateField('contact', e.target.value)}
                  className="w-full min-w-0 bg-transparent px-2 text-[12px] outline-none"
                />
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
        <button className="rounded bg-[#4db6ac] px-4 py-2 text-[12px] font-bold text-white shadow hover:bg-[#009688]">
          월별 진료기록
          <br />
          일괄처리
        </button>
        <button className="rounded bg-[#4db6ac] px-4 py-2 text-[12px] font-bold text-white shadow hover:bg-[#009688]">
          계약의사 진료내역
          <br />
          일괄처리
        </button>
        <button className="flex flex-col items-center justify-center rounded bg-[#7f8c8d] px-6 py-1 text-white shadow-md transition-colors hover:bg-[#636e72]">
          <span className="text-[13px] font-bold">진료 기록지 출력</span>
          <span className="text-[10px] opacity-90">2026.02.01 - 2026.02.28</span>
        </button>
      </div>

      {/* 2. 하단 리스트: 진료기록 내역 */}
      <div className="overflow-hidden border border-[#B8D1E0] bg-white shadow-sm">
        <div className="flex items-center gap-2 border-b border-[#B8D1E0] bg-[#f8fafc] px-3 py-2">
          <i className="ri-arrow-right-s-fill text-[10px] text-[#204987]"></i>
          <h3 className="text-[13px] font-bold text-[#204987]">진료기록 내역</h3>
        </div>
        <div className="min-h-[250px] overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead className="border-b border-[#B8D1E0] bg-[#E8F1F8] text-center text-[11px] font-bold text-[#333]">
              <tr>
                <th className="w-[50px] border-r border-[#B8D1E0] py-2">연번</th>
                <th className="w-[100px] border-r border-[#B8D1E0] py-2">진료일</th>
                <th className="w-[80px] border-r border-[#B8D1E0] py-2">진료구분</th>
                <th className="w-[120px] border-r border-[#B8D1E0] py-2">병의원명</th>
                <th className="border-r border-[#B8D1E0] py-2">진료내용</th>
                <th className="w-[80px] border-r border-[#B8D1E0] py-2">진료비</th>
                <th className="w-[80px] border-r border-[#B8D1E0] py-2">약제비</th>
                <th className="w-[100px] border-r border-[#B8D1E0] py-2">계약의사진료비</th>
                <th className="w-[80px] border-r border-[#B8D1E0] py-2">작성자</th>
                <th className="w-[80px] border-r border-[#B8D1E0] py-2">청구년월</th>
                <th className="w-[80px] py-2">첨부영수증</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white text-center text-[12px]">
              <tr>
                <td colSpan={11} className="py-20 text-gray-500">
                  조회된 진료기록이 없습니다.
                </td>
              </tr>
            </tbody>
            {/* Footer Row (Sum) */}
            <tfoot className="border-t border-[#B8D1E0] bg-[#E8F1F8] text-[12px] font-bold text-[#333]">
              <tr>
                <td colSpan={5} className="border-r border-[#B8D1E0] py-2 text-center">
                  합계
                </td>
                <td className="border-r border-[#B8D1E0] py-2 text-center">0 원</td>
                <td className="border-r border-[#B8D1E0] py-2 text-center">0 원</td>
                <td className="border-r border-[#B8D1E0] py-2 text-center">0 원</td>
                <td colSpan={3}></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}

// Helper Components
function Label({ title, required }: { readonly title: string; readonly required?: boolean }) {
  return (
    <div className="flex w-[100px] shrink-0 items-center justify-center bg-[#E8F1F8] p-2 text-center text-[12px] font-bold text-[#333]">
      {title}
      {required && <span className="ml-0.5 text-red-500">*</span>}
    </div>
  );
}

function Radio({
  label,
  checked,
  onChange,
  color = 'gray',
}: {
  readonly label: string;
  readonly checked: boolean;
  readonly onChange: () => void;
  readonly color?: 'gray' | 'orange';
}) {
  return (
    <label className="flex cursor-pointer items-center gap-1.5 whitespace-nowrap">
      <div className="relative flex items-center justify-center">
        {checked ? (
          <i
            className={clsx('ri-record-circle-fill text-lg', color === 'orange' ? 'text-orange-500' : 'text-gray-600')}
          ></i>
        ) : (
          <i className="ri-checkbox-blank-circle-line text-lg text-gray-300"></i>
        )}
        <input type="radio" checked={checked} onChange={onChange} className="hidden" />
      </div>
      <span className="text-[12px] font-bold text-[#333]">{label}</span>
    </label>
  );
}
