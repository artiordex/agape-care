'use client';

import React, { useState, useEffect } from 'react';
import clsx from 'clsx';

/**
 * [Modal] 교육 및 훈련 상세 정보 등록/수정 폼
 * 아가페 그린(#5C8D5A) 테마 및 직각형 고밀도 레이아웃 적용
 */
export default function EducationFormModal({ isOpen, onClose, onSave, education }: any) {
  const [formData, setFormData] = useState({
    type: 'humanRights',
    title: '',
    date: new Date().toISOString().split('T')[0],
    time: '14:00',
    instructor: '',
    location: '',
    participants: [''],
    fileUrl: '',
    fileName: '',
    summary: '',
    evaluation: '',
    notes: '',
  });

  const educationTypes = [
    { value: 'humanRights', label: '노인인권', color: 'text-red-600' },
    { value: 'staffRights', label: '직원인권', color: 'text-orange-600' },
    { value: 'disaster', label: '재난대응', color: 'text-[#5C8D5A]' },
    { value: 'competency', label: '역량강화', color: 'text-blue-600' },
    { value: 'legal', label: '법정교육', color: 'text-purple-600' },
  ];

  // 1. 함수 정의를 위로 이동 (Initialization 순서 해결)
  const resetForm = () => {
    setFormData({
      type: 'humanRights',
      title: '',
      date: new Date().toISOString().split('T')[0],
      time: '14:00',
      instructor: '',
      location: '',
      participants: [''],
      fileUrl: '',
      fileName: '',
      summary: '',
      evaluation: '',
      notes: '',
    });
  };

  // 2. useEffect는 함수들이 정의된 후에 실행되도록 배치
  useEffect(() => {
    if (education) {
      setFormData({ ...education });
    } else {
      resetForm();
    }
  }, [education, isOpen]);

  if (!isOpen) return null;

  const handleParticipantChange = (index: number, value: string) => {
    const newParticipants = [...formData.participants];
    newParticipants[index] = value;
    setFormData({ ...formData, participants: newParticipants });
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 p-4 font-sans antialiased backdrop-blur-sm">
      <div className="animate-in fade-in zoom-in flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-none bg-white shadow-2xl">
        {/* 헤더 */}
        <div className="flex shrink-0 items-center justify-between bg-[#5C8D5A] px-6 py-4 text-white">
          <div className="flex items-center gap-3">
            <i className="ri-edit-box-line text-xl"></i>
            <h3 className="text-sm font-black uppercase tracking-widest">
              {education ? 'Education Record Revision' : 'New Education Entry Protocol'}
            </h3>
          </div>
          <button onClick={onClose} className="p-1 transition-all hover:bg-black/10">
            <i className="ri-close-line text-2xl"></i>
          </button>
        </div>

        {/* 폼 본문 */}
        <form
          onSubmit={e => {
            e.preventDefault();
            onSave(formData);
          }}
          className="custom-scrollbar flex-1 space-y-8 overflow-y-auto p-8"
        >
          {/* 1. 교육 유형 및 제목 */}
          <div className="space-y-4">
            <label className="text-[10px] font-black uppercase italic tracking-widest text-gray-400">
              1. Primary Information
            </label>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="flex flex-col gap-2">
                <span className="text-[11px] font-bold text-gray-600">교육 카테고리 *</span>
                <div className="grid grid-cols-3 gap-1">
                  {educationTypes.map(type => (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, type: type.value as any })}
                      className={clsx(
                        'rounded-none border py-2 text-[10px] font-black transition-all',
                        formData.type === type.value
                          ? 'border-[#5C8D5A] bg-emerald-50 text-[#5C8D5A] shadow-inner'
                          : 'border-gray-200 bg-white text-gray-400 hover:border-gray-300',
                      )}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>
              <FormInput
                label="교육 명칭 (Education Title) *"
                required
                value={formData.title}
                onChange={(v: string) => setFormData({ ...formData, title: v })}
                placeholder="시행 교육명을 입력하십시오."
              />
            </div>
          </div>

          {/* 2. 상세 일시 및 장소 */}
          <div className="space-y-4">
            <label className="text-[10px] font-black uppercase italic tracking-widest text-gray-400">
              2. Schedule & Logistics
            </label>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              <FormInput
                label="시행 일자"
                type="date"
                value={formData.date}
                onChange={(v: string) => setFormData({ ...formData, date: v })}
                isMono
              />
              <FormInput
                label="시작 시간"
                type="time"
                value={formData.time}
                onChange={(v: string) => setFormData({ ...formData, time: v })}
                isMono
              />
              <FormInput
                label="담당 강사"
                value={formData.instructor}
                onChange={(v: string) => setFormData({ ...formData, instructor: v })}
                placeholder="성함 입력"
              />
              <FormInput
                label="교육 장소"
                value={formData.location}
                onChange={(v: string) => setFormData({ ...formData, location: v })}
                placeholder="장소 입력"
              />
            </div>
          </div>

          {/* 3. 참석자 관리 (동적 리스트) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-[10px] font-black uppercase italic tracking-widest text-gray-400">
                3. Participants Management
              </label>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, participants: [...formData.participants, ''] })}
                className="cursor-pointer text-[10px] font-black text-[#5C8D5A] hover:underline"
              >
                + 참석자 추가 등록
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
              {formData.participants.map((p, i) => (
                <div key={i} className="group relative">
                  <input
                    type="text"
                    value={p}
                    onChange={e => handleParticipantChange(i, e.target.value)}
                    className="w-full rounded-none border border-gray-200 bg-gray-50 px-3 py-2 text-[11px] font-bold text-gray-700 outline-none focus:border-[#5C8D5A]"
                    placeholder={`참석자 ${i + 1}`}
                  />
                  {formData.participants.length > 1 && (
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, participants: formData.participants.filter((_, idx) => idx !== i) })
                      }
                      className="absolute right-1 top-1/2 -translate-y-1/2 cursor-pointer text-gray-300 opacity-0 transition-all hover:text-red-500 group-hover:opacity-100"
                    >
                      <i className="ri-close-circle-fill"></i>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 4. 교육 내용 및 증빙 자료 */}
          <div className="space-y-4">
            <label className="text-[10px] font-black uppercase italic tracking-widest text-gray-400">
              4. Documentation & Evidence
            </label>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-gray-600">교육 내용 요약</span>
                <textarea
                  rows={4}
                  className="w-full resize-none rounded-none border border-gray-200 bg-gray-50 p-4 text-[12px] font-medium shadow-inner outline-none focus:border-[#5C8D5A]"
                  value={formData.summary}
                  onChange={e => setFormData({ ...formData, summary: e.target.value })}
                  placeholder="교육 핵심 내용을 기록하십시오."
                />
              </div>
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-gray-600">시행 결과 평가</span>
                <textarea
                  rows={4}
                  className="w-full resize-none rounded-none border border-gray-200 bg-gray-50 p-4 text-[12px] font-medium shadow-inner outline-none focus:border-[#5C8D5A]"
                  value={formData.evaluation}
                  onChange={e => setFormData({ ...formData, evaluation: e.target.value })}
                  placeholder="교육 만족도 및 성과를 평가하십시오."
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormInput
                label="증빙 이미지 URL (CDN)"
                value={formData.fileUrl}
                onChange={(v: string) => setFormData({ ...formData, fileUrl: v })}
                placeholder="https://..."
              />
              <FormInput
                label="첨부 파일명 (증빙용)"
                value={formData.fileName}
                onChange={(v: string) => setFormData({ ...formData, fileName: v })}
                placeholder="예: 2026_교육_서명부.pdf"
              />
            </div>
          </div>
        </form>

        {/* 푸터 액션 */}
        <div className="flex shrink-0 gap-3 border-t border-gray-100 bg-gray-50 p-6">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 cursor-pointer rounded-none border border-gray-300 bg-white py-3.5 text-[13px] font-black text-gray-400 transition-all hover:bg-gray-100"
          >
            취소 및 닫기
          </button>
          <button
            type="button"
            onClick={() => onSave(formData)}
            className="flex-[2] cursor-pointer rounded-none bg-[#5C8D5A] py-3.5 text-[13px] font-black text-white shadow-lg shadow-emerald-100 transition-all hover:bg-[#4A7548] active:scale-95"
          >
            <i className="ri-save-3-line mr-2"></i>
            데이터 마스터 저장
          </button>
        </div>
      </div>
    </div>
  );
}

/** [Sub] 모달 입력 필드 */
function FormInput({ label, type = 'text', value, onChange, placeholder, isMono, required }: any) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-[11px] font-bold text-gray-600">
        {label} {required && '*'}
      </span>
      <input
        type={type}
        className={clsx(
          'w-full rounded-none border border-gray-200 bg-gray-50 px-3 py-2.5 text-[12px] font-bold text-gray-800 outline-none transition-all focus:border-[#5C8D5A] focus:bg-white',
          isMono && 'font-mono',
        )}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
}
