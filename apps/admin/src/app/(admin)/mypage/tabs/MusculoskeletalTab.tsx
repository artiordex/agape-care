'use client';

import React, { useState } from 'react';
import clsx from 'clsx';

interface Record {
  id: string;
  date: string;
  bodyParts: string[];
  symptoms: string;
  severity: 'mild' | 'moderate' | 'severe';
  actions: string;
  status: 'ongoing' | 'improved' | 'resolved';
}

/**
 * [Component] 개인 근골격계 증상 기록 및 조치 이력 통합 관제
 * 아가페 그린(#5C8D5A) 테마 및 직각형 ERP 레이아웃 적용
 */
export default function MusculoskeletalTab() {
  // 1. 데이터 및 모달 상태 제어
  const [records, setRecords] = useState<Record[]>([
    {
      id: '1',
      date: '2026-01-15',
      bodyParts: ['허리', '목'],
      symptoms: '장시간 앉아서 근무 후 허리 통증 발생',
      severity: 'moderate',
      actions: '스트레칭 실시, 자세 교정',
      status: 'ongoing',
    },
  ]);
  const [showAddModal, setShowAddModal] = useState(false);

  // 2. 스타일 및 라벨 맵핑 프로토콜
  const getSeverityStyle = (s: string) => {
    if (s === 'mild') return 'bg-emerald-50 text-[#5C8D5A] border-emerald-100';
    if (s === 'moderate') return 'bg-orange-50 text-orange-600 border-orange-100';
    return 'bg-red-50 text-red-600 border-red-100';
  };

  const getStatusStyle = (s: string) => {
    if (s === 'ongoing') return 'bg-blue-50 text-blue-600 border-blue-100';
    if (s === 'improved') return 'bg-emerald-100 text-[#5C8D5A] border-emerald-200';
    return 'bg-gray-100 text-gray-400 border-gray-200';
  };

  const bodyPartOptions = ['목', '어깨', '팔', '손목', '손가락', '허리', '등', '엉덩이', '무릎', '발목', '발'];

  return (
    <div className="space-y-6 font-sans antialiased">
      {/* A. 관리 지침 안내 배너 */}
      <div className="relative overflow-hidden rounded-none border border-[#5C8D5A] bg-emerald-50/30 p-5">
        <div className="flex items-start gap-4">
          <div className="bg-[#5C8D5A] p-2 text-white shadow-md">
            <i className="ri-information-line text-2xl"></i>
          </div>
          <div>
            <h3 className="text-[14px] font-black uppercase tracking-tight text-gray-900">
              Musculoskeletal Health Protocol
            </h3>
            <p className="mt-1 text-[12px] font-medium leading-relaxed text-gray-600">
              업무 중 발생한 근골격계 통증이나 불편함을 즉시 기록하십시오. 조기 발견과 정기적인 스트레칭은 장기적인 건강
              유지의 핵심입니다.
            </p>
          </div>
        </div>
      </div>

      {/* B. 실시간 증상 기록 통계 */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <StatCard
          label="Total Records"
          value={records.length}
          unit="건"
          icon="ri-file-list-3-line"
          color="text-gray-700"
        />
        <StatCard
          label="Ongoing Symptoms"
          value={records.filter(r => r.status === 'ongoing').length}
          unit="건"
          icon="ri-pulse-line"
          color="text-orange-600"
        />
        <StatCard
          label="Resolved Cases"
          value={records.filter(r => r.status !== 'ongoing').length}
          unit="건"
          icon="ri-shield-check-line"
          color="text-[#5C8D5A]"
        />
      </div>

      {/* C. 기록 리스트 및 액션 바 */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-gray-200 pb-2">
          <h4 className="text-[12px] font-black uppercase italic tracking-widest text-gray-400">
            Symptom Tracking Timeline
          </h4>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 rounded-none bg-[#5C8D5A] px-5 py-2 text-[11px] font-black text-white shadow-lg shadow-emerald-100 transition-all hover:bg-[#4A7548] active:scale-95"
          >
            <i className="ri-add-line"></i> NEW RECORD ENTRY
          </button>
        </div>

        <div className="space-y-3">
          {records.map(record => (
            <div
              key={record.id}
              className="group relative rounded-none border border-gray-200 bg-white p-5 transition-all hover:border-[#5C8D5A] hover:shadow-md"
            >
              <div className="mb-4 flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className={clsx(
                      'rounded-none border px-2 py-0.5 text-[10px] font-black uppercase',
                      getSeverityStyle(record.severity),
                    )}
                  >
                    {record.severity}
                  </span>
                  <span
                    className={clsx(
                      'rounded-none border px-2 py-0.5 text-[10px] font-black uppercase',
                      getStatusStyle(record.status),
                    )}
                  >
                    {record.status}
                  </span>
                </div>
                <span className="font-mono text-[11px] font-bold italic text-gray-300">{record.date}</span>
              </div>

              <div className="mb-3 flex flex-wrap gap-1.5">
                {record.bodyParts.map(part => (
                  <span
                    key={part}
                    className="rounded-none border border-gray-100 bg-gray-50 px-2 py-0.5 text-[10px] font-black italic text-gray-500"
                  >
                    #{part}
                  </span>
                ))}
              </div>

              <h5 className="mb-1.5 text-[14px] font-black text-gray-900">{record.symptoms}</h5>
              <div className="flex items-start gap-2 border-l-2 border-[#5C8D5A] bg-gray-50 p-3 text-[12px] font-medium text-gray-500">
                <i className="ri- nurse-line text-[#5C8D5A]"></i>
                <p>
                  <span className="mr-2 text-[10px] font-black uppercase italic text-gray-400">Action Taken:</span>{' '}
                  {record.actions}
                </p>
              </div>

              {/* 하단 호버 가이드 바 */}
              <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#5C8D5A] transition-all group-hover:w-full"></div>
            </div>
          ))}
        </div>
      </div>

      {/* D. 통합 데이터 입력 모달 */}
      {showAddModal && (
        <MSKFormModal
          options={bodyPartOptions}
          onClose={() => setShowAddModal(false)}
          onSave={data => {
            setRecords([...records, { id: Date.now().toString(), ...data, status: 'ongoing' }]);
            setShowAddModal(false);
          }}
        />
      )}
    </div>
  );
}

/** [Sub] 통계 카드 컴포넌트 */
function StatCard({ label, value, unit, icon, color }: any) {
  return (
    <div className="group rounded-none border border-gray-200 bg-white p-5 shadow-sm transition-all hover:border-[#5C8D5A]">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-[10px] font-black uppercase italic tracking-widest text-gray-400">{label}</p>
          <div className="flex items-baseline gap-1">
            <span className={clsx('font-mono text-2xl font-black tracking-tighter', color)}>{value}</span>
            <span className="text-[11px] font-bold uppercase text-gray-300">{unit}</span>
          </div>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-none border border-gray-100 bg-gray-50 transition-all group-hover:bg-[#5C8D5A] group-hover:text-white">
          <i
            className={clsx(
              icon,
              'text-2xl',
              !color.includes('gray') ? color : 'text-gray-400',
              'group-hover:text-white',
            )}
          ></i>
        </div>
      </div>
    </div>
  );
}

/** [Sub] 입력 모달 컴포넌트 (Initialization Error 방지 구조) */
function MSKFormModal({ options, onClose, onSave }: any) {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    bodyParts: [] as string[],
    symptoms: '',
    severity: 'moderate',
    actions: '',
  });

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 p-4 font-sans antialiased backdrop-blur-sm">
      <div className="animate-in fade-in zoom-in w-full max-w-2xl overflow-hidden rounded-none border border-gray-300 bg-white shadow-2xl">
        <div className="flex items-center justify-between bg-[#5C8D5A] px-6 py-4 text-white">
          <div className="flex items-center gap-3">
            <i className="ri-heart-add-line text-xl"></i>
            <h3 className="text-[12px] font-black uppercase tracking-widest">Symptom Record Protocol</h3>
          </div>
          <button onClick={onClose} className="rounded-none p-1 transition-all hover:bg-black/10">
            <i className="ri-close-line text-2xl"></i>
          </button>
        </div>

        <div className="space-y-6 p-8">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase italic text-gray-500">발생 일자</label>
              <input
                type="date"
                value={formData.date}
                onChange={e => setFormData({ ...formData, date: e.target.value })}
                className="w-full rounded-none border border-gray-300 p-2.5 font-mono text-[12px] font-bold outline-none focus:border-[#5C8D5A]"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase italic text-gray-500">증상 심각도</label>
              <select
                value={formData.severity}
                onChange={e => setFormData({ ...formData, severity: e.target.value as any })}
                className="w-full rounded-none border border-gray-300 p-2.5 text-[12px] font-bold outline-none focus:border-[#5C8D5A]"
              >
                <option value="mild">경미 (MILD)</option>
                <option value="moderate">보통 (MODERATE)</option>
                <option value="severe">심각 (SEVERE)</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase italic text-gray-500">발생 부위 (중복 선택)</label>
            <div className="grid grid-cols-4 gap-2 border border-gray-100 bg-gray-50 p-4">
              {options.map((opt: string) => (
                <label key={opt} className="group flex cursor-pointer items-center gap-2">
                  <input
                    type="checkbox"
                    className="rounded-none text-[#5C8D5A] focus:ring-[#5C8D5A]"
                    checked={formData.bodyParts.includes(opt)}
                    onChange={e => {
                      const parts = e.target.checked
                        ? [...formData.bodyParts, opt]
                        : formData.bodyParts.filter(p => p !== opt);
                      setFormData({ ...formData, bodyParts: parts });
                    }}
                  />
                  <span className="text-[11px] font-bold text-gray-600 group-hover:text-[#5C8D5A]">{opt}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase italic text-gray-500">증상 상세 설명</label>
              <textarea
                rows={3}
                value={formData.symptoms}
                onChange={e => setFormData({ ...formData, symptoms: e.target.value })}
                className="w-full resize-none rounded-none border border-gray-300 p-4 text-[12px] font-medium shadow-inner outline-none focus:border-[#5C8D5A]"
                placeholder="발생 경위 및 증상을 기록하십시오."
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase italic text-gray-500">수행 조치 내역</label>
              <textarea
                rows={2}
                value={formData.actions}
                onChange={e => setFormData({ ...formData, actions: e.target.value })}
                className="w-full resize-none rounded-none border border-gray-300 p-4 text-[12px] font-medium shadow-inner outline-none focus:border-[#5C8D5A]"
                placeholder="수행한 스트레칭, 약물 복용, 휴식 등의 조치를 기록하십시오."
              />
            </div>
          </div>

          <div className="flex gap-3 border-t border-gray-100 pt-4">
            <button
              onClick={onClose}
              className="flex-1 rounded-none border border-gray-300 bg-white py-3.5 text-[12px] font-black text-gray-400 transition-all hover:bg-gray-50"
            >
              취소
            </button>
            <button
              onClick={() => onSave(formData)}
              className="flex-[2] rounded-none bg-[#5C8D5A] py-3.5 text-[12px] font-black text-white shadow-lg shadow-emerald-100 transition-all hover:bg-[#4A7548] active:scale-95"
            >
              기록 마스터 저장
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
