'use client';

import React from 'react';
import clsx from 'clsx';

interface Staff {
  id: string;
  name: string;
  position: string;
  type: string;
  hireDate: string;
  annualLeave: number;
  usedLeave: number;
}

interface Props {
  readonly staffList: Staff[];
  readonly selectedStaff: Staff | null;
  readonly onStaffSelect: (staff: Staff) => void;
  readonly building: string;
  readonly setBuilding: (val: string) => void;
  readonly floor: string;
  readonly setFloor: (val: string) => void;
}

/**
 * [Component] 직원 식별 및 배치 위치 제어 패널
 * 아가페 표준 UI 및 고밀도 데이터 명세 레이아웃 적용
 */
export default function StaffControlPanel({
  staffList,
  selectedStaff,
  onStaffSelect,
  building,
  setBuilding,
  floor,
  setFloor,
}: Props) {
  return (
    <div className="rounded-none border border-gray-300 bg-white font-sans text-gray-900 antialiased shadow-sm">
      {/* A. 패널 헤더 */}
      <div className="flex items-center gap-2 border-b border-gray-200 bg-[#f8fafc] px-5 py-4">
        <i className="ri-user-settings-line text-lg text-[#5C8D5A]"></i>
        <h3 className="text-[13px] font-black uppercase tracking-tight">인력 및 위치 관제 노드</h3>
      </div>

      <div className="space-y-6 p-6">
        {/* B. 직원 선택 컨트롤 */}
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase italic tracking-widest text-gray-400">
            Target Personnel Selection
          </label>
          <select
            value={selectedStaff?.id || ''}
            onChange={e => {
              const staff = staffList.find(s => s.id === e.target.value);
              if (staff) onStaffSelect(staff);
            }}
            className="w-full rounded-none border-2 border-gray-100 bg-gray-50 p-3 text-[13px] font-black text-gray-800 shadow-inner outline-none transition-all focus:border-[#5C8D5A] focus:bg-white"
          >
            <option value="" disabled>
              조회할 직원을 선택하십시오
            </option>
            {staffList.map(s => (
              <option key={s.id} value={s.id}>
                {s.name} ({s.position})
              </option>
            ))}
          </select>
        </div>

        {/* C. 상세 행정 명세 (Bio Info) */}
        {selectedStaff && (
          <div className="animate-in fade-in slide-in-from-top-1 space-y-3 rounded-none border border-gray-100 bg-gray-50 p-4 shadow-inner">
            <BioRow label="직원 식별 코드" value={selectedStaff.id} isMono />
            <BioRow label="담당 직종" value={selectedStaff.type} />
            <BioRow label="입사 일자" value={selectedStaff.hireDate} isMono />
            <div className="mt-2 flex justify-between border-t border-gray-200 pt-2">
              <span className="text-[10px] font-black uppercase text-gray-400">잔여 연차</span>
              <span className="text-[12px] font-black text-[#5C8D5A]">
                {selectedStaff.annualLeave - selectedStaff.usedLeave}일 / {selectedStaff.annualLeave}일
              </span>
            </div>
          </div>
        )}

        {/* D. 배치 위치 설정 (Location) */}
        <div className="space-y-3 border-t border-gray-100 pt-6">
          <label className="text-[10px] font-black uppercase italic tracking-widest text-gray-400">
            Deployment Area Control
          </label>
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <span className="ml-1 text-[9px] font-black uppercase text-gray-400">건물 섹션</span>
              <select
                value={building}
                onChange={e => setBuilding(e.target.value)}
                className="w-full cursor-pointer rounded-none border border-gray-300 bg-white p-2.5 text-[12px] font-bold text-gray-700 shadow-sm outline-none transition-all focus:border-[#5C8D5A]"
              >
                <option value="본관">본관 (Main)</option>
                <option value="별관">별관 (Annex)</option>
              </select>
            </div>
            <div className="space-y-1">
              <span className="ml-1 text-[9px] font-black uppercase text-gray-400">층수 레이어</span>
              <select
                value={floor}
                onChange={e => setFloor(e.target.value)}
                className="w-full cursor-pointer rounded-none border border-gray-300 bg-white p-2.5 text-[12px] font-bold text-gray-700 shadow-sm outline-none transition-all focus:border-[#5C8D5A]"
              >
                <option value="1층">1층 (L1)</option>
                <option value="2층">2층 (L2)</option>
                <option value="3층">3층 (L3)</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** [Sub] 인력 데이터 행 */
function BioRow({ label, value, isMono }: { label: string; value: string | number; isMono?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-[10px] font-black uppercase tracking-tighter text-gray-400">{label}</span>
      <span className={clsx('truncate text-[12px] font-bold text-gray-700', isMono && 'font-mono')}>{value}</span>
    </div>
  );
}
