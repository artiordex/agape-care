/**
 * Description : OutingModals.tsx - 📌 이미지(image_81aeae.png) 기반 행정 서식 모달
 * Author : Shiwoo Min
 * Date : 2026-02-06
 */

'use client';

import React from 'react';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * [Modal 1] 외출·외박 신규 작성 모달 (이미지 구조 완벽 재현)
 */
export function AddOutingModal({ isOpen, onClose, resident, formData, setFormData, onAdd }: any) {
  if (!isOpen || !resident) return null;

  // 공통 스타일 클래스
  const thClass =
    'bg-[#E8F1F8] border border-[#B8D1E0] px-2 py-1.5 text-center text-[12px] font-bold text-gray-700 w-[110px]';
  const tdClass = 'border border-[#B8D1E0] px-3 py-1.5 text-[12px] text-gray-900 bg-white';
  const inputClass = 'border border-gray-300 px-2 py-0.5 outline-none focus:border-[#57A5CE] text-[12px]';

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 p-4 font-sans antialiased backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex w-[850px] flex-col overflow-hidden rounded-sm border-2 border-[#57A5CE] bg-white shadow-2xl"
      >
        {/* 모달 헤더 */}
        <div className="flex items-center justify-between border-b border-gray-200 px-4 py-2">
          <h2 className="text-lg font-black tracking-tight text-gray-800">외출, 외박 작성</h2>
          <button onClick={onClose} className="text-gray-500 transition-colors hover:text-red-500">
            <i className="ri-close-line text-3xl"></i>
          </button>
        </div>

        <div className="flex flex-col gap-4 p-4">
          {/* 1. 수급자 정보 요약 (이미지 상단 표) */}
          <table className="w-full table-fixed border-collapse border border-[#B8D1E0]">
            <tbody>
              <tr>
                <th className={thClass}>수급자명</th>
                <td className={tdClass}>{resident.name}</td>
                <th className={thClass}>성별</th>
                <td className={tdClass}>{resident.gender} (80세)</td>
                <th className={thClass}>생년월일</th>
                <td className={tdClass}>{resident.birthDate}</td>
              </tr>
              <tr>
                <th className={thClass}>등급</th>
                <td className={tdClass}>{resident.grade}</td>
                <th className={thClass}>입소일</th>
                <td className={tdClass}>{resident.admissionDate}</td>
                <th className={thClass}>생활실</th>
                <td className={tdClass}>{resident.room}</td>
              </tr>
            </tbody>
          </table>

          <div className="text-right text-[11px] font-bold text-red-500">* 은 필수항목입니다.</div>

          {/* 2. 외출/외박 상세 입력 (이미지 하단 표) */}
          <table className="w-full table-fixed border-collapse border border-[#B8D1E0]">
            <tbody>
              <tr>
                <th className={thClass}>구분</th>
                <td colSpan={5} className={tdClass}>
                  <div className="flex gap-4">
                    {['외출', '외박'].map(t => (
                      <label key={t} className="flex cursor-pointer items-center gap-1">
                        <input
                          type="radio"
                          name="type"
                          checked={formData.type === t}
                          onChange={() => setFormData({ ...formData, type: t })}
                          className="accent-[#E67E22]"
                        />
                        <span className={clsx(formData.type === t && 'font-bold text-[#E67E22]')}>{t}</span>
                      </label>
                    ))}
                  </div>
                </td>
              </tr>
              <tr>
                <th className={thClass}>
                  외출일시 <span className="text-red-500">*</span>
                </th>
                <td colSpan={5} className={tdClass}>
                  <div className="flex items-center gap-1">
                    <input
                      type="date"
                      value={formData.departureDate}
                      onChange={e => setFormData({ ...formData, departureDate: e.target.value })}
                      className={inputClass}
                    />
                    <input type="text" className={clsx(inputClass, 'w-10 text-center')} placeholder="00" /> :
                    <input type="text" className={clsx(inputClass, 'w-10 text-center')} placeholder="00" /> ~
                    <input type="text" className={clsx(inputClass, 'w-10 text-center')} placeholder="00" /> :
                    <input type="text" className={clsx(inputClass, 'w-10 text-center')} placeholder="00" />
                  </div>
                </td>
              </tr>
              <tr>
                <th className={thClass}>
                  동행자선택 <span className="text-red-500">*</span>
                </th>
                <td colSpan={5} className={tdClass}>
                  <div className="flex items-center gap-1">
                    <input
                      type="text"
                      placeholder="동행자명"
                      className={clsx(inputClass, 'w-24')}
                      value={formData.guardianName}
                      onChange={e => setFormData({ ...formData, guardianName: e.target.value })}
                    />
                    <input
                      type="text"
                      placeholder="관계"
                      className={clsx(inputClass, 'w-20')}
                      value={formData.guardianRelation}
                      onChange={e => setFormData({ ...formData, guardianRelation: e.target.value })}
                    />
                    <input
                      type="text"
                      placeholder="전화번호"
                      className={clsx(inputClass, 'w-32')}
                      value={formData.guardianPhone}
                      onChange={e => setFormData({ ...formData, guardianPhone: e.target.value })}
                    />
                    <button className="ml-1 rounded-[2px] bg-[#7A8B9A] px-2 py-0.5 text-[11px] font-bold text-white">
                      보호자 선택
                    </button>
                    <button className="rounded-[2px] bg-[#7A8B9A] px-2 py-0.5 text-[11px] font-bold text-white">
                      직원 선택
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <th className={thClass}>외출목적</th>
                <td colSpan={2} className={tdClass}>
                  <input
                    type="text"
                    className={clsx(inputClass, 'w-full')}
                    value={formData.purpose}
                    onChange={e => setFormData({ ...formData, purpose: e.target.value })}
                  />
                </td>
                <th className={thClass}>행선지</th>
                <td colSpan={2} className={tdClass}>
                  <input
                    type="text"
                    className={clsx(inputClass, 'w-full')}
                    value={formData.destination}
                    onChange={e => setFormData({ ...formData, destination: e.target.value })}
                  />
                </td>
              </tr>
              <tr>
                <th className={thClass}>
                  작성자 <span className="text-red-500">*</span>
                </th>
                <td colSpan={5} className={tdClass}>
                  <div className="flex items-center gap-1">
                    <input type="text" defaultValue="최인경" className={clsx(inputClass, 'w-24 bg-gray-50')} readOnly />
                    <button className="rounded-[2px] bg-[#7A8B9A] px-2 py-0.5 text-[11px] font-bold text-white">
                      선택
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <th className={thClass}>병원 진료 기록</th>
                <td colSpan={5} className={tdClass}>
                  <label className="flex cursor-pointer items-center gap-1 text-gray-500">
                    <input type="checkbox" className="h-3 w-3" /> 진료 기록
                  </label>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 모달 푸터 버튼 (그라데이션 스타일) */}
        <div className="flex justify-center gap-1.5 border-t border-gray-200 bg-[#F8FAFC] px-4 py-3">
          <button
            onClick={onAdd}
            className="rounded-[3px] bg-gradient-to-b from-[#57A5CE] to-[#2E6A9E] px-16 py-2.5 text-[14px] font-black text-white shadow-md transition-all active:scale-95"
          >
            저장
          </button>
          <button
            onClick={onClose}
            className="rounded-[3px] bg-[#666] px-12 py-2.5 text-[14px] font-black text-white shadow-md hover:bg-[#555]"
          >
            창닫기
          </button>
        </div>
      </motion.div>
    </div>
  );
}

/**
 * [Modal 2] 복귀 처리 모달
 */
export function ReturnOutingModal({ isOpen, onClose, record, formData, setFormData, onConfirm }: any) {
  if (!isOpen || !record) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 p-4 font-sans backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-[450px] overflow-hidden rounded-sm border-2 border-[#57A5CE] bg-white shadow-2xl"
      >
        <div className="p-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-emerald-100 bg-emerald-50 text-[#5C8D5A]">
            <i className="ri-check-double-line text-4xl"></i>
          </div>
          <h3 className="text-xl font-black leading-tight text-gray-900">복귀 확인</h3>
          <p className="mt-2 text-[13px] font-bold text-gray-400">
            {record.residentName} 어르신이 복귀하셨습니까?
            <br />
            실제 복귀 시간을 기록해 주세요.
          </p>

          <div className="mt-6 flex gap-2">
            <input
              type="date"
              className="flex-1 rounded-sm border border-gray-300 px-3 py-2 text-[13px] outline-none"
              value={formData.returnDate}
              onChange={e => setFormData({ ...formData, returnDate: e.target.value })}
            />
            <input
              type="time"
              className="w-32 rounded-sm border border-gray-300 px-3 py-2 text-[13px] outline-none"
              value={formData.returnTime}
              onChange={e => setFormData({ ...formData, returnTime: e.target.value })}
            />
          </div>
        </div>
        <div className="flex border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClose}
            className="flex-1 border-r border-gray-200 py-4 text-[13px] font-black text-gray-400 hover:bg-white"
          >
            취소
          </button>
          <button onClick={onConfirm} className="flex-1 py-4 text-[13px] font-black text-[#2E6A9E] hover:bg-blue-50">
            복귀 처리 완료
          </button>
        </div>
      </motion.div>
    </div>
  );
}
