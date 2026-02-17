'use client';

import React, { useState, useEffect } from 'react';
import clsx from 'clsx';

/**
 * [Modal] 회의록 전문 작성 및 증빙 업로드 프로토콜
 * 이미지 기반의 고밀도 레이아웃 및 유형별 선택 옵션 반영
 */
export default function MeetingFormModal({ isOpen, category, onClose, onSave, record }: any) {
  const [formData, setFormData] = useState<any>({
    title: '',
    date: new Date().toISOString().split('T')[0],
    startTime: '14:00',
    endTime: '15:00',
    writer: '최인경',
    location: '',
    method: 'offline',
    participants: [''],
    content: '',
    result: '',
    committeeOptions: { staffOpinion: false, abusePrevention: false, treatmentReflected: false },
  });

  useEffect(() => {
    if (record) setFormData({ ...record });
  }, [record, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 p-4 font-sans antialiased backdrop-blur-sm">
      <div className="animate-in fade-in zoom-in flex max-h-[95vh] w-full max-w-6xl flex-col overflow-hidden border-2 border-[#5C8D5A] bg-white shadow-2xl">
        {/* A. 모달 헤더 */}
        <div className="flex shrink-0 items-center justify-between bg-[#5C8D5A] px-6 py-4 text-white">
          <div className="flex items-center gap-3">
            <i className="ri-edit-2-line text-xl"></i>
            <h3 className="text-[14px] font-black uppercase italic tracking-widest">
              {category === 'committee' ? '운영 위원회 회의 작성' : '보호자 소통 및 간담회 작성'} Protocol
            </h3>
          </div>
          <button onClick={onClose} className="cursor-pointer p-1 transition-all hover:bg-black/10">
            <i className="ri-close-line text-2xl"></i>
          </button>
        </div>

        <form
          className="custom-scrollbar flex-1 overflow-y-auto bg-[#f8fafc] p-8"
          onSubmit={e => {
            e.preventDefault();
            onSave(formData);
          }}
        >
          {/* B. 기본 행정 정보 (Top Section) */}
          <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="grid grid-cols-2 gap-4 border border-gray-200 bg-white p-5 shadow-sm lg:col-span-8">
              <FormInput
                label="회의일시*"
                type="date"
                value={formData.date}
                onChange={v => setFormData({ ...formData, date: v })}
                isMono
                required
              />
              <div className="flex gap-2">
                <FormInput
                  label="시작*"
                  type="time"
                  value={formData.startTime}
                  onChange={v => setFormData({ ...formData, startTime: v })}
                  isMono
                />
                <FormInput
                  label="종료*"
                  type="time"
                  value={formData.endTime}
                  onChange={v => setFormData({ ...formData, endTime: v })}
                  isMono
                />
              </div>
              <FormInput
                label="작성자*"
                value={formData.writer}
                onChange={v => setFormData({ ...formData, writer: v })}
                required
              />
              <FormInput
                label="회의장소*"
                value={formData.location}
                onChange={v => setFormData({ ...formData, location: v })}
                placeholder="시설 회의실 등"
              />
              <div className="col-span-2">
                <FormInput
                  label="회의주제*"
                  value={formData.title}
                  onChange={v => setFormData({ ...formData, title: v })}
                  placeholder="회의 안건을 입력하십시오."
                  required
                />
              </div>
            </div>

            {/* 참석자 및 자료첨부 노드 */}
            <div className="space-y-4 lg:col-span-4">
              <div className="flex h-full flex-col justify-between border border-gray-200 bg-white p-4 shadow-sm">
                <label className="mb-2 block text-[10px] font-black uppercase italic tracking-widest text-gray-400">
                  참석자 명단 (5인 이상 권장)
                </label>
                <textarea
                  className="w-full flex-1 resize-none border border-gray-100 bg-gray-50 p-3 text-[12px] font-bold outline-none transition-all focus:border-[#5C8D5A]"
                  placeholder="참석자 성명을 쉼표(,)로 구분하여 입력..."
                  value={formData.participants.join(',')}
                  onChange={e => setFormData({ ...formData, participants: e.target.value.split(',') })}
                />
                <div className="mt-4 border-2 border-dashed border-gray-200 p-4 text-center text-gray-300">
                  <i className="ri-upload-cloud-2-line text-2xl"></i>
                  <p className="mt-1 text-[9px] font-black uppercase">파일 드래그 & 드롭</p>
                </div>
              </div>
            </div>
          </div>

          {/* C. 메인 회의 내용 섹션 (2분할) */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[11px] font-black uppercase italic text-[#5C8D5A]">
                <span className="h-3 w-1 bg-[#5C8D5A]"></span> 회의 내용 (Minute Details)
              </label>
              <textarea
                rows={15}
                className="w-full border border-gray-200 bg-white p-6 text-[13px] font-medium leading-relaxed shadow-inner outline-none focus:border-[#5C8D5A]"
                value={formData.content}
                onChange={e => setFormData({ ...formData, content: e.target.value })}
                placeholder="상세 회의 내용을 기록하십시오."
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[11px] font-black uppercase italic text-gray-400">
                <span className="h-3 w-1 bg-gray-300"></span>{' '}
                {category === 'guardian' ? '회의 결과 및 조치사항' : '행정 검토 및 결의사항'}
              </label>
              <div className="flex h-full flex-col gap-4">
                <textarea
                  rows={category === 'committee' ? 8 : 15}
                  className="w-full border border-gray-200 bg-white p-6 text-[13px] font-medium leading-relaxed shadow-inner outline-none focus:border-[#5C8D5A]"
                  value={formData.result}
                  onChange={e => setFormData({ ...formData, result: e.target.value })}
                  placeholder="회의 결과 및 향후 계획을 기록하십시오."
                />

                {/* D. 운영위원회 전용 필수 체크박스 (image_1097bc 반영) */}
                {category === 'committee' && (
                  <div className="space-y-3 border border-emerald-100 bg-emerald-50/50 p-5">
                    <p className="mb-1 text-[10px] font-black uppercase italic text-[#5C8D5A]">Compliance Check-list</p>
                    <CheckItem
                      label="종사자 처우개선 의견수렴 시행 (반기 1회)"
                      checked={formData.committeeOptions.staffOpinion}
                      onChange={(v: boolean) =>
                        setFormData({
                          ...formData,
                          committeeOptions: { ...formData.committeeOptions, staffOpinion: v },
                        })
                      }
                    />
                    <CheckItem
                      label="노인학대예방 교육 및 의견 청취 (반기 1회)"
                      checked={formData.committeeOptions.abusePrevention}
                      onChange={(v: boolean) =>
                        setFormData({
                          ...formData,
                          committeeOptions: { ...formData.committeeOptions, abusePrevention: v },
                        })
                      }
                    />
                    <CheckItem
                      label="종사자 처우개선 의견반영 결과 (연 1회)"
                      checked={formData.committeeOptions.treatmentReflected}
                      onChange={(v: boolean) =>
                        setFormData({
                          ...formData,
                          committeeOptions: { ...formData.committeeOptions, treatmentReflected: v },
                        })
                      }
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </form>

        {/* E. 하단 액션 바 */}
        <div className="flex shrink-0 justify-end gap-3 border-t border-gray-200 bg-gray-50 p-6">
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer border border-gray-300 bg-white px-10 py-3.5 text-[13px] font-black uppercase text-gray-400 shadow-sm transition-all hover:bg-gray-100"
          >
            취소 및 닫기
          </button>
          <button
            type="button"
            onClick={() => onSave(formData)}
            className="cursor-pointer bg-[#5C8D5A] px-12 py-3.5 text-[13px] font-black uppercase text-white shadow-lg shadow-emerald-100 transition-all hover:bg-[#4A7548] active:scale-95"
          >
            <i className="ri-save-3-line mr-2"></i> 회의록 최종 저장
          </button>
        </div>
      </div>
    </div>
  );
}

/** [Sub] 폼 입력 필드 */
function FormInput({ label, type = 'text', value, onChange, placeholder, isMono, required }: any) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-[10px] font-black uppercase tracking-tighter text-gray-400">
        {label} {required && '*'}
      </span>
      <input
        type={type}
        className={clsx(
          'w-full border border-gray-200 bg-gray-50 px-3 py-2 text-[12px] font-bold text-gray-800 outline-none transition-all focus:border-[#5C8D5A] focus:bg-white',
          isMono && 'font-mono',
        )}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
}

/** [Sub] 커스텀 체크박스 */
function CheckItem({ label, checked, onChange }: any) {
  return (
    <label className="group flex cursor-pointer items-center gap-3">
      <div
        onClick={() => onChange(!checked)}
        className={clsx(
          'flex h-5 w-5 items-center justify-center border-2 transition-all',
          checked ? 'border-[#5C8D5A] bg-[#5C8D5A]' : 'border-gray-300 bg-white',
        )}
      >
        {checked && <i className="ri-check-line text-[14px] text-white"></i>}
      </div>
      <span
        className={clsx(
          'text-[12px] font-bold transition-all',
          checked ? 'text-[#5C8D5A]' : 'text-gray-500 group-hover:text-gray-700',
        )}
      >
        {label}
      </span>
    </label>
  );
}
