'use client';

import { useState, useEffect } from 'react';
import clsx from 'clsx';

interface WeeklyTemplate {
  id: string;
  name: string;
  pattern: {
    dayOfWeek: number; // 0=일, 1=월, ..., 6=토
    workType: string;
    startTime: string;
    endTime: string;
    breakTime: number;
  }[];
  startDate: string;
  endDate: string;
  assignedStaff: string[];
  createdAt: string;
}

// 아가페 표준 근무 코드 및 색상 체계
const WORK_CODES = {
  S: { name: '주간', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  A: { name: '단축주간', color: 'bg-cyan-50 text-cyan-700 border-cyan-200' },
  D: { name: '오전근무', color: 'bg-emerald-50 text-[#5C8D5A] border-emerald-200' },
  E: { name: '오후근무', color: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
  N: { name: '야간근무', color: 'bg-purple-50 text-purple-700 border-purple-200' },
  휴: { name: '휴무/비번', color: 'bg-gray-50 text-gray-500 border-gray-200' },
};

const DAY_NAMES = ['일', '월', '화', '수', '목', '금', '토'];

/**
 * [Component] 주간 단위 근무 패턴 마스터 관리
 * 아가페 표준 UI 프로토콜(고딕/직각/한국어) 적용
 */
export default function WeeklyWorkTemplate() {
  const [templates, setTemplates] = useState<WeeklyTemplate[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<WeeklyTemplate | null>(null);

  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = () => {
    const saved = localStorage.getItem('weekly_work_templates');
    if (saved) {
      try {
        setTemplates(JSON.parse(saved));
      } catch (e) {
        setTemplates([]);
      }
    }
  };

  const saveTemplates = (newTemplates: WeeklyTemplate[]) => {
    localStorage.setItem('weekly_work_templates', JSON.stringify(newTemplates));
    setTemplates(newTemplates);
  };

  const handleDelete = (id: string) => {
    if (confirm('이 주별 근무 프로토콜을 삭제하시겠습니까? 관련 배치 데이터에 영향을 줄 수 있습니다.')) {
      const updated = templates.filter(t => t.id !== id);
      saveTemplates(updated);
    }
  };

  return (
    <div className="space-y-6 font-sans text-gray-900 antialiased">
      {/* 1. 상단 액션 바 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <i className="ri-calendar-check-line text-xl text-[#5C8D5A]"></i>
          <h3 className="text-[15px] font-black uppercase tracking-tight text-gray-800">주간 반복 시퀀스 목록</h3>
        </div>
        <button
          onClick={() => {
            setEditingTemplate(null);
            setShowModal(true);
          }}
          className="flex cursor-pointer items-center gap-2 rounded-none bg-[#5C8D5A] px-6 py-2.5 text-[12px] font-black uppercase text-white shadow-lg transition-all hover:bg-[#4A7548]"
        >
          <i className="ri-add-line text-lg"></i>
          신규 주간 템플릿 등록
        </button>
      </div>

      {/* 2. 템플릿 그리드 리스트 */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {templates.map(template => (
          <div
            key={template.id}
            className="overflow-hidden rounded-none border border-gray-300 bg-white shadow-sm transition-all hover:border-[#5C8D5A]"
          >
            {/* 카드 헤더 */}
            <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 p-4">
              <div>
                <h4 className="text-[14px] font-black text-gray-900">{template.name}</h4>
                <span className="text-[10px] font-black uppercase italic tracking-widest text-[#5C8D5A]">
                  7-Day Fixed Cycle Protocol
                </span>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => {
                    setEditingTemplate(template);
                    setShowModal(true);
                  }}
                  className="cursor-pointer rounded-none border border-transparent p-2 text-gray-400 transition-all hover:border-emerald-100 hover:bg-emerald-50 hover:text-[#5C8D5A]"
                >
                  <i className="ri-edit-line text-lg"></i>
                </button>
                <button
                  onClick={() => handleDelete(template.id)}
                  className="cursor-pointer rounded-none border border-transparent p-2 text-gray-400 transition-all hover:border-red-100 hover:bg-red-50 hover:text-red-600"
                >
                  <i className="ri-delete-bin-line text-lg"></i>
                </button>
              </div>
            </div>

            <div className="space-y-4 p-5">
              {/* 적용 기간 정보 */}
              <div className="grid grid-cols-2 gap-4 border border-gray-100 bg-gray-50 p-3 shadow-inner">
                <DataRow label="적용 시작일" value={template.startDate} isMono />
                <DataRow label="적용 종료일" value={template.endDate} isMono />
              </div>

              {/* 주간 시퀀스 명세 */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase italic tracking-widest text-gray-400">
                  Weekly Assignment Sequence
                </label>
                <div className="grid grid-cols-1 gap-1">
                  {template.pattern
                    .sort((a, b) => (a.dayOfWeek === 0 ? 7 : a.dayOfWeek) - (b.dayOfWeek === 0 ? 7 : b.dayOfWeek))
                    .map((p, idx) => {
                      const workCode = WORK_CODES[p.workType as keyof typeof WORK_CODES];
                      return (
                        <div
                          key={idx}
                          className="flex items-center gap-3 rounded-none border border-gray-100 bg-white p-2 transition-colors hover:bg-gray-50"
                        >
                          <span
                            className={clsx(
                              'w-8 text-center text-[11px] font-black italic',
                              p.dayOfWeek === 0
                                ? 'text-red-500'
                                : p.dayOfWeek === 6
                                  ? 'text-blue-500'
                                  : 'text-gray-400',
                            )}
                          >
                            {DAY_NAMES[p.dayOfWeek]}
                          </span>
                          <span
                            className={clsx(
                              'min-w-[42px] rounded-none border px-2 py-0.5 text-center text-[10px] font-black',
                              workCode?.color,
                            )}
                          >
                            {p.workType}
                          </span>
                          <span className="flex-1 font-mono text-[11px] font-bold italic text-gray-600">
                            {p.workType !== '휴' ? `${p.startTime} - ${p.endTime}` : '-'}
                          </span>
                          {p.workType !== '휴' && (
                            <span className="text-[9px] font-bold uppercase italic text-gray-300">
                              Break {p.breakTime}m
                            </span>
                          )}
                        </div>
                      );
                    })}
                </div>
              </div>

              {/* 배정된 직원 노드 */}
              <div className="border-t border-dashed border-gray-200 pt-2">
                <label className="mb-2 block text-[10px] font-black uppercase italic tracking-widest text-gray-400">
                  Assigned Staff Nodes
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {template.assignedStaff.length > 0 ? (
                    template.assignedStaff.map((staff, idx) => (
                      <span
                        key={idx}
                        className="rounded-none border border-gray-200 bg-gray-100 px-2 py-0.5 text-[10px] font-bold text-gray-600 shadow-sm"
                      >
                        {staff}
                      </span>
                    ))
                  ) : (
                    <span className="px-1 text-[11px] font-bold italic text-gray-300">배정된 인력 노드 없음</span>
                  )}
                </div>
              </div>

              <button
                onClick={() => alert(`"${template.name}" 프로토콜을 시스템 마스터로 주입합니다.`)}
                className="w-full cursor-pointer rounded-none border-2 border-[#5C8D5A] bg-white py-3 text-[12px] font-black uppercase tracking-widest text-[#5C8D5A] shadow-sm transition-all hover:bg-emerald-50 active:scale-95"
              >
                주간 프로토콜 일괄 적용 실행
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 데이터 부재 가이드 */}
      {templates.length === 0 && (
        <div className="animate-in fade-in rounded-none border-2 border-dashed border-gray-200 bg-white p-20 text-center duration-500">
          <i className="ri-calendar-2-line mb-4 block text-6xl text-gray-100"></i>
          <p className="font-sans text-[13px] font-bold italic text-gray-400">
            등록된 주별 근무 템플릿이 존재하지 않습니다.
          </p>
        </div>
      )}

      {/* 3. 편집 모달 */}
      {showModal && (
        <WeeklyTemplateModal
          template={editingTemplate}
          onClose={() => setShowModal(false)}
          onSave={template => {
            const next = editingTemplate
              ? templates.map(t => (t.id === template.id ? template : t))
              : [...templates, template];
            saveTemplates(next);
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
}

/** [Sub] 데이터 표시 행 */
function DataRow({ label, value, isMono }: any) {
  return (
    <div className="space-y-1">
      <span className="text-[9px] font-black uppercase italic tracking-tighter text-gray-400">{label}</span>
      <p className={clsx('text-[12px] font-bold text-gray-800', isMono && 'font-mono tracking-tighter')}>{value}</p>
    </div>
  );
}

/** [Modal] 주간 템플릿 정밀 편집기 */
function WeeklyTemplateModal({ template, onClose, onSave }: any) {
  const [formData, setFormData] = useState({
    name: template?.name || '',
    startDate: template?.startDate || '',
    endDate: template?.endDate || '',
  });

  const [pattern, setPattern] = useState(
    template?.pattern || [
      { dayOfWeek: 1, workType: 'A', startTime: '09:00', endTime: '18:00', breakTime: 60 },
      { dayOfWeek: 2, workType: 'A', startTime: '09:00', endTime: '18:00', breakTime: 60 },
      { dayOfWeek: 3, workType: 'A', startTime: '09:00', endTime: '18:00', breakTime: 60 },
      { dayOfWeek: 4, workType: 'A', startTime: '09:00', endTime: '18:00', breakTime: 60 },
      { dayOfWeek: 5, workType: 'A', startTime: '09:00', endTime: '18:00', breakTime: 60 },
      { dayOfWeek: 6, workType: '휴', startTime: '', endTime: '', breakTime: 0 },
      { dayOfWeek: 0, workType: '휴', startTime: '', endTime: '', breakTime: 0 },
    ],
  );

  const handleSubmit = () => {
    if (!formData.name || !formData.startDate) return alert('필수 행정 항목을 입력하십시오.');
    onSave({
      ...formData,
      id: template?.id || Date.now().toString(),
      pattern,
      assignedStaff: template?.assignedStaff || [],
      createdAt: template?.createdAt || new Date().toISOString(),
    });
  };

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/60 p-4 font-sans antialiased backdrop-blur-sm">
      <div className="animate-in fade-in zoom-in flex max-h-[90vh] w-full max-w-3xl flex-col rounded-none border-2 border-[#5C8D5A] bg-white shadow-2xl duration-200">
        {/* 모달 헤더 */}
        <div className="flex items-center justify-between bg-[#5C8D5A] px-6 py-4 text-white">
          <div className="flex items-center gap-3">
            <i className="ri-calendar-event-line text-xl"></i>
            <h3 className="text-[14px] font-black uppercase tracking-widest">
              주간 근무 프로토콜 설정 (Weekly Editor)
            </h3>
          </div>
          <button onClick={onClose} className="cursor-pointer rounded-none p-1 transition-all hover:bg-black/10">
            <i className="ri-close-line text-2xl"></i>
          </button>
        </div>

        <div className="custom-scrollbar flex-1 space-y-8 overflow-y-auto p-8 text-gray-900">
          {/* A. 기본 식별 정보 */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="space-y-2 md:col-span-3">
              <label className="text-[11px] font-black uppercase italic tracking-widest text-gray-500">
                템플릿 식별 명칭 *
              </label>
              <input
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="w-full rounded-none border-2 border-gray-100 bg-gray-50 p-3 text-[13px] font-bold shadow-inner outline-none transition-all focus:border-[#5C8D5A] focus:bg-white"
                placeholder="예: [사무팀] 평일 정상근무 패턴"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-black uppercase italic tracking-widest text-gray-500">
                적용 시작일 *
              </label>
              <input
                type="date"
                value={formData.startDate}
                onChange={e => setFormData({ ...formData, startDate: e.target.value })}
                className="w-full rounded-none border-2 border-gray-100 bg-gray-50 p-3 font-mono text-[12px] font-bold shadow-inner outline-none focus:border-[#5C8D5A]"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-black uppercase italic tracking-widest text-gray-500">
                적용 종료일
              </label>
              <input
                type="date"
                value={formData.endDate}
                onChange={e => setFormData({ ...formData, endDate: e.target.value })}
                className="w-full rounded-none border-2 border-gray-100 bg-gray-50 p-3 font-mono text-[12px] font-bold shadow-inner outline-none focus:border-[#5C8D5A]"
              />
            </div>
          </div>

          {/* B. 요일별 시퀀스 정의 */}
          <div className="space-y-3">
            <label className="text-[11px] font-black uppercase italic tracking-widest text-gray-500">
              요일별 근무 시퀀스 정의 (Weekly Sequence)
            </label>
            <div className="space-y-2 rounded-none border border-gray-100 bg-gray-50 p-6 shadow-inner">
              {pattern
                .sort((a, b) => (a.dayOfWeek === 0 ? 7 : a.dayOfWeek) - (b.dayOfWeek === 0 ? 7 : b.dayOfWeek))
                .map((p, idx) => (
                  <div
                    key={idx}
                    className="flex flex-wrap items-center gap-4 rounded-none border border-gray-200 bg-white p-4 shadow-sm transition-all hover:border-[#5C8D5A]"
                  >
                    <span
                      className={clsx(
                        'w-14 text-[12px] font-black italic',
                        p.dayOfWeek === 0 ? 'text-red-500' : p.dayOfWeek === 6 ? 'text-blue-500' : 'text-gray-400',
                      )}
                    >
                      {DAY_NAMES[p.dayOfWeek]}요일
                    </span>
                    <select
                      value={p.workType}
                      onChange={e => {
                        const next = [...pattern];
                        const target = next.find(item => item.dayOfWeek === p.dayOfWeek);
                        if (target) target.workType = e.target.value;
                        setPattern(next);
                      }}
                      className="min-w-[130px] cursor-pointer rounded-none border border-gray-300 bg-white p-2 text-[12px] font-black text-gray-800 shadow-sm outline-none focus:border-[#5C8D5A]"
                    >
                      {Object.entries(WORK_CODES).map(([code, info]) => (
                        <option key={code} value={code}>
                          {code} - {info.name}
                        </option>
                      ))}
                    </select>
                    {p.workType !== '휴' && (
                      <div className="animate-in fade-in slide-in-from-left-2 flex items-center gap-3 duration-300">
                        <div className="flex items-center gap-2">
                          <input
                            type="time"
                            value={p.startTime}
                            onChange={e => {
                              const next = [...pattern];
                              const target = next.find(item => item.dayOfWeek === p.dayOfWeek);
                              if (target) target.startTime = e.target.value;
                              setPattern(next);
                            }}
                            className="rounded-none border border-gray-200 p-2 font-mono text-[12px] font-bold shadow-sm outline-none focus:border-[#5C8D5A]"
                          />
                          <span className="font-black text-gray-300">~</span>
                          <input
                            type="time"
                            value={p.endTime}
                            onChange={e => {
                              const next = [...pattern];
                              const target = next.find(item => item.dayOfWeek === p.dayOfWeek);
                              if (target) target.endTime = e.target.value;
                              setPattern(next);
                            }}
                            className="rounded-none border border-gray-200 p-2 font-mono text-[12px] font-bold shadow-sm outline-none focus:border-[#5C8D5A]"
                          />
                        </div>
                        <div className="mx-1 h-6 w-[1px] bg-gray-200"></div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-black uppercase italic text-gray-400">휴게</span>
                          <input
                            type="number"
                            value={p.breakTime}
                            onChange={e => {
                              const next = [...pattern];
                              const target = next.find(item => item.dayOfWeek === p.dayOfWeek);
                              if (target) target.breakTime = parseInt(e.target.value) || 0;
                              setPattern(next);
                            }}
                            className="w-16 rounded-none border border-gray-200 p-2 text-right font-mono text-[12px] font-bold shadow-sm outline-none focus:border-[#5C8D5A]"
                          />
                          <span className="text-[10px] font-black text-gray-400">분</span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* 모달 액션 바 */}
        <div className="flex justify-end gap-3 border-t border-gray-200 bg-gray-50 p-6">
          <button
            onClick={onClose}
            className="cursor-pointer rounded-none border border-gray-300 px-8 py-3 text-[12px] font-black uppercase tracking-widest text-gray-400 transition-all hover:bg-gray-100"
          >
            취소
          </button>
          <button
            onClick={handleSubmit}
            className="cursor-pointer rounded-none bg-[#5C8D5A] px-10 py-3 text-[12px] font-black uppercase tracking-widest text-white shadow-lg shadow-emerald-100 transition-all hover:bg-[#4A7548] active:scale-95"
          >
            주간 프로토콜 저장
          </button>
        </div>
      </div>
    </div>
  );
}
