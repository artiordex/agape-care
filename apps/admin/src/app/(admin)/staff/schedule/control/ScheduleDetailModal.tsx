'use client';

import React, { useState } from 'react';
import clsx from 'clsx';

interface ScheduleDetailModalProps {
  readonly date: string;
  readonly staff: {
    id: string;
    name: string;
    position: string;
    [key: string]: any;
  };
  readonly schedule: {
    workType?: string;
    startTime?: string;
    endTime?: string;
    breakTime?: number;
    overtime?: number;
    memo?: string;
    [key: string]: any;
  } | null;
  readonly building: string;
  readonly floor: string;
  readonly onClose: () => void;
  readonly onSave: (data: any) => void;
  readonly onDelete: (date: string, staffId: string) => void;
}

/**
 * [Modal] 일자별 상세 근무 유형 및 시간 설정 프로토콜
 * 아가페 그린(#5C8D5A) 테마 및 완전 직각형 UI 적용
 */
export default function ScheduleDetailModal({
  date,
  staff,
  schedule,
  building,
  floor,
  onClose,
  onSave,
  onDelete,
}: ScheduleDetailModalProps) {
  // 1. 폼 상태 초기화 (기존 데이터 로드 또는 기본값)
  const [formData, setFormData] = useState({
    workType: schedule?.workType || 'A',
    startTime: schedule?.startTime || '09:00',
    endTime: schedule?.endTime || '18:00',
    breakTime: schedule?.breakTime || 60,
    overtime: schedule?.overtime || 0,
    memo: schedule?.memo || '',
  });

  // 아가페 표준 근무 코드 명세
  const WORK_CODES = {
    S: { name: '주간', color: 'text-blue-600' },
    A: { name: '단축', color: 'text-cyan-600' },
    D: { name: '오전', color: 'text-[#5C8D5A]' },
    E: { name: '오후', color: 'text-yellow-600' },
    N: { name: '야간', color: 'text-purple-600' },
    연: { name: '연차', color: 'text-pink-600' },
    휴: { name: '휴무', color: 'text-gray-400' },
  };

  // 2. 확정 버튼 핸들러
  const handleConfirm = () => {
    onSave({
      staffId: staff.id,
      date,
      ...formData,
      building,
      floor,
      updatedAt: new Date().toISOString(),
    });
  };

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/60 p-4 font-sans antialiased backdrop-blur-sm">
      <div className="animate-in fade-in zoom-in w-full max-w-xl overflow-hidden rounded-none border-2 border-[#5C8D5A] bg-white shadow-2xl">
        {/* A. 모달 상단 헤더 */}
        <div className="flex items-center justify-between bg-[#5C8D5A] px-6 py-4 text-white">
          <div className="flex items-center gap-3">
            <i className="ri-edit-box-line text-xl"></i>
            <h3 className="text-sm font-black uppercase italic tracking-widest">Work Assignment Entry</h3>
          </div>
          <button onClick={onClose} className="cursor-pointer p-1 transition-all hover:bg-black/10">
            <i className="ri-close-line text-2xl"></i>
          </button>
        </div>

        <div className="space-y-8 p-8">
          {/* B. 대상 직원 및 일자 요약 노드 */}
          <div className="grid grid-cols-2 gap-4 rounded-none border border-gray-200 bg-gray-50 p-4 shadow-inner">
            <InfoItem label="조회 직원" value={staff.name} highlight />
            <InfoItem label="배정 일자" value={date} isMono />
            <InfoItem label="소속 정보" value={staff.position} />
            <InfoItem label="배치 정보" value={`${building} / ${floor}`} />
          </div>

          {/* C. 근무 유형 퀵 셀렉터 (직각형 버튼) */}
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase italic tracking-widest text-gray-400">
              Shift Type Selection
            </label>
            <div className="grid grid-cols-4 gap-2">
              {Object.entries(WORK_CODES).map(([code, info]) => (
                <button
                  key={code}
                  onClick={() => setFormData({ ...formData, workType: code })}
                  className={clsx(
                    'cursor-pointer rounded-none border py-3 text-[12px] font-black transition-all',
                    formData.workType === code
                      ? 'border-[#5C8D5A] bg-emerald-50 text-[#5C8D5A] shadow-md ring-1 ring-[#5C8D5A]'
                      : 'border-gray-200 bg-white text-gray-400 hover:border-gray-300',
                  )}
                >
                  <span className="block text-[14px]">{code}</span>
                  <span className="text-[9px] uppercase opacity-60">{info.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* D. 상세 시간 및 행정 입력 폼 */}
          <div className="grid grid-cols-2 gap-6">
            <FormInput
              label="업무 시작"
              type="time"
              value={formData.startTime}
              onChange={v => setFormData({ ...formData, startTime: v })}
            />
            <FormInput
              label="업무 종료"
              type="time"
              value={formData.endTime}
              onChange={v => setFormData({ ...formData, endTime: v })}
            />
            <FormInput
              label="휴게 시간 (분)"
              type="number"
              value={formData.breakTime}
              onChange={v => setFormData({ ...formData, breakTime: Number(v) })}
            />
            <FormInput
              label="초과 시간 (h)"
              type="number"
              value={formData.overtime}
              onChange={v => setFormData({ ...formData, overtime: Number(v) })}
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase italic tracking-widest text-gray-400">
              특이사항 및 행정 메모
            </label>
            <textarea
              rows={3}
              className="w-full resize-none rounded-none border border-gray-200 bg-gray-50 p-4 text-[12px] font-medium shadow-inner outline-none transition-all focus:border-[#5C8D5A]"
              placeholder="배치 관련 특이사항을 기록하십시오..."
              value={formData.memo}
              onChange={e => setFormData({ ...formData, memo: e.target.value })}
            />
          </div>

          {/* E. 하단 액션 버튼 그룹 */}
          <div className="flex gap-3 pt-2">
            {schedule && (
              <button
                onClick={() => onDelete(date, staff.id)}
                className="flex-1 cursor-pointer rounded-none border-2 border-red-100 bg-white py-3.5 text-[13px] font-black text-red-600 transition-all hover:bg-red-50"
              >
                배정 삭제
              </button>
            )}
            <button
              onClick={onClose}
              className="flex-1 cursor-pointer rounded-none border-2 border-gray-200 bg-white py-3.5 text-[13px] font-black text-gray-400 hover:bg-gray-50"
            >
              취소
            </button>
            <button
              onClick={handleConfirm}
              className="flex-[2] cursor-pointer rounded-none bg-[#5C8D5A] py-3.5 text-[13px] font-black text-white shadow-lg shadow-emerald-100 transition-all hover:bg-[#4A7548] active:scale-95"
            >
              일정 확정 및 저장
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/** [Sub] 정보 요약 아이템 */
function InfoItem({ label, value, highlight, isMono }: any) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[9px] font-black uppercase tracking-tighter text-gray-400">{label}</span>
      <span
        className={clsx(
          'text-[12px] font-black',
          highlight ? 'text-[#5C8D5A]' : 'text-gray-800',
          isMono && 'font-mono',
        )}
      >
        {value}
      </span>
    </div>
  );
}

/** [Sub] 폼 입력 필드 */
function FormInput({ label, type, value, onChange }: any) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[10px] font-black uppercase italic tracking-widest text-gray-500">{label}</label>
      <input
        type={type}
        className="rounded-none border border-gray-300 bg-white px-3 py-2.5 font-mono text-[13px] font-bold text-gray-800 shadow-sm outline-none transition-all focus:border-[#5C8D5A]"
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  );
}
