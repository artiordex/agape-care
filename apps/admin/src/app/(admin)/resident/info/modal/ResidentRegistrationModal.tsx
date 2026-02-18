/**
 * Description : ResidentRegistrationModal.tsx - ?? ?? UI ????
 * Author : Shiwoo Min
 * Date : 2026-02-18
 */

'use client';

import clsx from 'clsx';
import React, { useState } from 'react';

interface Props {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly onSave: (data: any) => void;
}

export default function ResidentRegistrationModal({ isOpen, onClose, onSave }: Props) {
  const [formData, setFormData] = useState({
    name: '',
    gender: '남',
    birthDate: '2026.02.18', // Default for demonstration
    birthType: '음력',
    grade: '',
    isGradeOut: false,
    gradeFrom: '',
    gradeTo: '',
    gradePeriod: '2년',
    certNo: '',
    admissionDate: '2026.02.18',
    admissionTime: '10:00',
    copaymentRate: '',
    phone: '',
    tel: '',
    zipCode: '',
    address: '',
    addressDetail: '',
    disease: '',
    room: '',
    supportMeal: false,
    supportSnack: false,
    memo: '',
    // Guardian
    guardianName: '',
    guardianRelation: '',
    guardianPhone: '',
    guardianEmail: '',
    guardianBirth: '',
    guardianTel: '',
    billingMethod: ['문자.알림톡'],
    billingZipCode: '',
    billingAddress: '',
    family: [
      { name: '', relation: '', phone: '', isPay: false, isBill: false },
      { name: '', relation: '', phone: '', isPay: false, isBill: false },
    ],
  });

  const birthDateRef = React.useRef<HTMLInputElement>(null);
  const admissionDateRef = React.useRef<HTMLInputElement>(null);
  const gradeFromRef = React.useRef<HTMLInputElement>(null);
  const gradeToRef = React.useRef<HTMLInputElement>(null);
  const birthTypeDateRef = React.useRef<HTMLInputElement>(null);
  const guardianBirthDateRef = React.useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const labelClass =
    'bg-[#E8F1F8] border border-[#B8D1E0] px-2 py-1.5 text-center text-[12px] font-bold text-gray-700 w-full h-full flex items-center justify-center';
  const inputClass = 'border border-[#B8D1E0] px-2 py-1 text-[12px] outline-none focus:border-blue-400 w-full h-[28px]';
  const selectClass = 'border border-[#B8D1E0] px-1 py-1 text-[12px] outline-none focus:border-blue-400 h-[28px]';
  const checkboxLabelClass = 'flex items-center gap-1 text-[12px] cursor-pointer';

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 antialiased">
      <div className="w-full max-w-[1000px] overflow-hidden rounded-sm border border-blue-900 bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#B8D1E0] bg-[#E3F2FD] px-4 py-2">
          <h2 className="text-[16px] font-black tracking-tight text-gray-800">수급자 신규등록</h2>
          <button onClick={onClose} className="text-gray-500 transition-colors hover:text-red-500">
            <i className="ri-close-line text-2xl"></i>
          </button>
        </div>

        {/* Content */}
        <div className="max-h-[85vh] overflow-y-auto bg-white p-4">
          {/* Section 1: 수급자 기본 정보 */}
          <div className="mb-6">
            <div className="mb-2 flex items-center gap-1 text-[14px] font-bold text-[#2E6A9E]">
              <i className="ri-checkbox-indeterminate-line"></i>
              <span>수급자 기본 정보</span>
            </div>

            <div className="flex border-collapse border border-[#B8D1E0]">
              {/* Photo Section */}
              <div className="flex w-[160px] shrink-0 flex-col items-center border-r border-[#B8D1E0] p-3">
                <div className="mb-2 flex h-[150px] w-[120px] items-center justify-center border border-dashed border-gray-300 bg-gray-50">
                  <i className="ri-user-fill text-6xl text-gray-200"></i>
                </div>
                <button className="mb-1 rounded-sm bg-gray-500 px-3 py-1 text-[11px] text-white">사진선택</button>
                <p className="text-[9px] text-gray-400">(직원 앱에서도 등록가능)</p>
              </div>

              {/* Grid Section */}
              <div className="grid flex-1 grid-cols-12">
                {/* Row 1 */}
                <div className={clsx(labelClass, 'col-span-2')}>
                  수급자명<span className="ml-0.5 text-red-500">*</span>
                </div>
                <div className="col-span-4 flex items-center gap-2 border border-[#B8D1E0] p-1">
                  <input type="text" className={clsx(inputClass, 'w-[120px]')} />
                  <div className="flex items-center gap-3">
                    <label className={checkboxLabelClass}>
                      <input type="radio" name="gender" defaultChecked /> 남
                    </label>
                    <label className={checkboxLabelClass}>
                      <input type="radio" name="gender" /> 여
                    </label>
                  </div>
                </div>
                <div className={clsx(labelClass, 'col-span-2')}>
                  생년월일<span className="ml-0.5 text-red-500">*</span>
                </div>
                <div className="col-span-4 flex items-center gap-2 border border-[#B8D1E0] p-1">
                  <input
                    ref={birthDateRef}
                    type="date"
                    className={clsx(inputClass, 'w-[120px]')}
                    value={formData.birthDate}
                    name="birthDate"
                    onChange={handleInputChange}
                  />
                  <i
                    className="ri-calendar-event-line cursor-pointer text-gray-400 hover:text-blue-500"
                    onClick={() => birthDateRef.current?.showPicker()}
                  ></i>
                </div>

                {/* Row: Birthday Type attached to Row 1 logic in image */}
                <div className={clsx(labelClass, 'col-span-2')}>생신일</div>
                <div className="col-span-10 flex items-center gap-3 border border-[#B8D1E0] p-1">
                  <input ref={birthTypeDateRef} type="date" className={clsx(inputClass, 'w-[120px]')} />
                  <i
                    className="ri-calendar-event-line cursor-pointer text-gray-400 hover:text-blue-500"
                    onClick={() => birthTypeDateRef.current?.showPicker()}
                  ></i>
                  <div className="ml-2 flex items-center gap-3">
                    <label className={checkboxLabelClass}>
                      <input type="radio" name="birthType" /> 양력
                    </label>
                    <label className={checkboxLabelClass}>
                      <input type="radio" name="birthType" defaultChecked /> 음력
                    </label>
                  </div>
                </div>

                {/* Row 2 */}
                <div className={clsx(labelClass, 'col-span-2')}>
                  인정등급<span className="ml-0.5 text-red-500">*</span>
                </div>
                <div className="col-span-4 flex items-center gap-2 border border-[#B8D1E0] p-1">
                  <select className={clsx(selectClass, 'w-[100px]')}>
                    <option>--선택--</option>
                  </select>
                  <label className={checkboxLabelClass}>
                    <input type="checkbox" /> 등급외
                  </label>
                </div>
                <div className={clsx(labelClass, 'col-span-2')}>
                  인정기간<span className="ml-0.5 text-red-500">*</span>
                </div>
                <div className="col-span-4 flex items-center gap-1 border border-[#B8D1E0] p-1">
                  <input
                    ref={gradeFromRef}
                    type="date"
                    className={clsx(inputClass, 'w-[120px]')}
                    value={formData.gradeFrom}
                    name="gradeFrom"
                    onChange={handleInputChange}
                  />
                  <span>~</span>
                  <input
                    ref={gradeToRef}
                    type="date"
                    className={clsx(inputClass, 'w-[120px]')}
                    value={formData.gradeTo}
                    name="gradeTo"
                    onChange={handleInputChange}
                  />
                  <select className={clsx(selectClass, 'w-16')}>
                    <option>2년</option>
                  </select>
                </div>

                {/* Row 3 */}
                <div className={clsx(labelClass, 'col-span-2')}>
                  입소일시<span className="ml-0.5 text-red-500">*</span>
                </div>
                <div className="col-span-4 flex items-center gap-2 border border-[#B8D1E0] p-1">
                  <input
                    ref={admissionDateRef}
                    type="date"
                    className={clsx(inputClass, 'w-[120px]')}
                    value={formData.admissionDate}
                    name="admissionDate"
                    onChange={handleInputChange}
                  />
                  <i
                    className="ri-calendar-event-line cursor-pointer text-gray-400 hover:text-blue-500"
                    onClick={() => admissionDateRef.current?.showPicker()}
                  ></i>
                  <input type="text" className={clsx(inputClass, 'w-10')} /> :{' '}
                  <input type="text" className={clsx(inputClass, 'w-10')} />
                </div>
                <div className={clsx(labelClass, 'col-span-2')}>
                  본인부담률<span className="ml-0.5 text-red-500">*</span>
                </div>
                <div className="col-span-4 flex items-center border border-[#B8D1E0] p-1">
                  <select className={clsx(selectClass, 'w-[120px]')}>
                    <option>--선택--</option>
                  </select>
                </div>

                {/* Row 4: 인정번호 / 연락처 */}
                <div className={labelClass + ' col-span-2'}>
                  인정번호<span className="ml-0.5 text-red-500">*</span>
                </div>
                <div className="col-span-4 flex items-center gap-1 border border-[#B8D1E0] p-1">
                  <input type="text" className={clsx(inputClass, 'w-24')} /> -{' '}
                  <input type="text" className={clsx(inputClass, 'w-32')} />
                </div>
                <div className={labelClass + ' col-span-2'}>연락처</div>
                <div className="col-span-4 grid grid-cols-2 gap-1 border border-[#B8D1E0] p-1">
                  <input type="text" placeholder="휴대폰번호" className={inputClass} />
                  <input type="text" placeholder="전화번호" className={inputClass} />
                </div>

                {/* Row 5: 주소 */}
                <div className={clsx(labelClass, 'col-span-2', 'h-auto')}>주소</div>
                <div className="col-span-6 flex flex-col gap-1 border border-[#B8D1E0] p-1">
                  <div className="flex gap-1">
                    <input type="text" className={clsx(inputClass, 'w-20', 'h-8')} readOnly />
                    <button className="h-8 shrink-0 rounded-sm bg-[#8FA1B0] px-3 py-1 text-[11px] text-white">
                      우편번호
                    </button>
                    <input type="text" className={clsx(inputClass, 'flex-1', 'h-8')} readOnly />
                  </div>
                  <input type="text" placeholder="상세주소" className={clsx(inputClass, 'h-8')} />
                </div>
                <div className={clsx(labelClass, 'col-span-2', 'h-auto')}>주요질환</div>
                <div className="col-span-2 border border-[#B8D1E0] p-1">
                  <textarea className="h-full w-full resize-none border-none text-[12px] outline-none"></textarea>
                </div>

                {/* Row 6: 생활실 / 생계급여지원 */}
                <div className={clsx(labelClass, 'col-span-2')}>생활실</div>
                <div className="col-span-4 flex items-center gap-1 border border-[#B8D1E0] p-1">
                  <input type="text" className={clsx(inputClass, 'flex-1')} readOnly />
                  <button className="shrink-0 rounded-sm bg-[#8FA1B0] px-2 py-1 text-[11px] text-white">
                    생활실 선택
                  </button>
                </div>
                <div className={clsx(labelClass, 'col-span-2')}>생계급여 지원</div>
                <div className="col-span-4 flex items-center gap-4 border border-[#B8D1E0] p-1">
                  <label className={checkboxLabelClass}>
                    <input type="checkbox" /> 식사재료비
                  </label>
                  <label className={checkboxLabelClass}>
                    <input type="checkbox" /> 간식비
                  </label>
                </div>

                {/* Row 7: 비고 */}
                <div className={clsx(labelClass, 'col-span-2')}>비고</div>
                <div className="col-span-10 border border-[#B8D1E0] p-1">
                  <textarea
                    placeholder="수급자 비고"
                    className="h-10 w-full resize-none border-none text-[12px] outline-none"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: 보호자 정보 */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-1 text-[14px] font-bold text-[#2E6A9E]">
                <i className="ri-checkbox-indeterminate-line"></i>
                <span>보호자 정보</span>
              </div>
              <span className="text-[10px] text-gray-500">
                ※ 보호자의 휴대폰 및 이메일 정보는 각종 정보 조회, 인증 및 발송에 사용됩니다.
              </span>
            </div>

            <div className="grid grid-cols-12">
              {/* Guardian Row 1 */}
              <div className={clsx(labelClass, 'col-span-2')}>
                보호자명
                <br />
                (주보호자)
              </div>
              <div className="col-span-2 flex items-center border border-[#B8D1E0] p-1">
                <input type="text" className={inputClass} />
              </div>
              <div className={clsx(labelClass, 'col-span-2')}>관계</div>
              <div className="col-span-2 flex items-center border border-[#B8D1E0] p-1">
                <input type="text" className={inputClass} />
              </div>
              <div className={clsx(labelClass, 'col-span-2')}>휴대폰번호</div>
              <div className="col-span-2 flex flex-col justify-center gap-1 border border-[#B8D1E0] p-1">
                <input type="text" placeholder="010-1234-5678" className={inputClass} />
                <div className="flex shrink-0 items-center gap-1">
                  <label className={checkboxLabelClass}>
                    <input type="checkbox" /> 급여
                  </label>
                  <label className={checkboxLabelClass}>
                    <input type="checkbox" defaultChecked /> 청구
                  </label>
                </div>
              </div>

              {/* Guardian Row 2 */}
              <div className={clsx(labelClass, 'col-span-2')}>생년월일</div>
              <div className="col-span-2 flex items-center gap-1 border border-[#B8D1E0] p-1">
                <input ref={guardianBirthDateRef} type="date" className={inputClass} />
                <i
                  className="ri-calendar-event-line cursor-pointer text-gray-400 hover:text-blue-500"
                  onClick={() => guardianBirthDateRef.current?.showPicker()}
                ></i>
              </div>
              <div className={clsx(labelClass, 'col-span-2')}>전화번호</div>
              <div className="col-span-2 flex items-center border border-[#B8D1E0] p-1">
                <input type="text" className={inputClass} />
              </div>
              <div className={clsx(labelClass, 'col-span-2')}>이메일</div>
              <div className="col-span-2 flex flex-col justify-center gap-1 border border-[#B8D1E0] p-1">
                <div className="flex w-full items-center gap-1">
                  <input className={clsx(inputClass, 'w-full')} />@<input className={clsx(inputClass, 'w-full')} />
                </div>
                <select className={clsx(selectClass, 'w-full')}>
                  <option>직접입력</option>
                </select>
              </div>

              {/* Memo */}
              <div className={clsx(labelClass, 'col-span-2')}>비고</div>
              <div className="col-span-10 border border-[#B8D1E0] p-1">
                <textarea
                  placeholder="보호자 비고"
                  className="h-10 w-full resize-none border-none text-[12px] outline-none"
                ></textarea>
              </div>

              {/* Billing Method */}
              <div className={clsx(labelClass, 'col-span-2')}>청구서수신</div>
              <div className="col-span-10 flex items-center gap-6 border border-[#B8D1E0] p-1">
                <label className={checkboxLabelClass}>
                  <input type="checkbox" defaultChecked /> 문자,알림톡
                </label>
                <label className={checkboxLabelClass}>
                  <input type="checkbox" /> 이메일
                </label>
                <label className={checkboxLabelClass}>
                  <input type="checkbox" /> 우편
                </label>
              </div>

              {/* Billing Address */}
              <div className={clsx(labelClass, 'col-span-2 h-auto')}>청구지주소</div>
              <div className="col-span-10 flex flex-col gap-1 border border-[#B8D1E0] p-1">
                <div className="flex gap-1">
                  <input type="text" className={clsx(inputClass, 'w-20', 'h-8')} readOnly />
                  <button className="h-8 shrink-0 rounded-sm bg-[#8FA1B0] px-3 py-1 text-[11px] text-white">
                    우편번호
                  </button>
                  <input type="text" className={clsx(inputClass, 'flex-1', 'h-8')} readOnly />
                </div>
                <input type="text" placeholder="상세주소" className={clsx(inputClass, 'h-8')} />
              </div>

              {/* Family 1 */}
              <div className={clsx(labelClass, 'col-span-2')}>가족이름1</div>
              <div className="col-span-2 flex items-center border border-[#B8D1E0] p-1">
                <input type="text" className={inputClass} />
              </div>
              <div className={clsx(labelClass, 'col-span-2')}>관계1</div>
              <div className="col-span-2 flex items-center border border-[#B8D1E0] p-1">
                <input type="text" className={inputClass} />
              </div>
              <div className={clsx(labelClass, 'col-span-2')}>휴대폰번호1</div>
              <div className="col-span-2 flex flex-col justify-center gap-1 border border-[#B8D1E0] p-1">
                <input type="text" placeholder="010-1234-5678" className={inputClass} />
                <div className="flex shrink-0 items-center gap-1">
                  <label className={checkboxLabelClass}>
                    <input type="checkbox" /> 급여
                  </label>
                  <label className={checkboxLabelClass}>
                    <input type="checkbox" /> 청구
                  </label>
                </div>
              </div>

              {/* Family 2 */}
              <div className={clsx(labelClass, 'col-span-2')}>가족이름2</div>
              <div className="col-span-2 flex items-center border border-[#B8D1E0] p-1">
                <input type="text" className={inputClass} />
              </div>
              <div className={clsx(labelClass, 'col-span-2')}>관계2</div>
              <div className="col-span-2 flex items-center border border-[#B8D1E0] p-1">
                <input type="text" className={inputClass} />
              </div>
              <div className={clsx(labelClass, 'col-span-2')}>휴대폰번호2</div>
              <div className="col-span-2 flex flex-col justify-center gap-1 border border-[#B8D1E0] p-1">
                <input type="text" placeholder="010-1234-5678" className={inputClass} />
                <div className="flex shrink-0 items-center gap-1">
                  <label className={checkboxLabelClass}>
                    <input type="checkbox" /> 급여
                  </label>
                  <label className={checkboxLabelClass}>
                    <input type="checkbox" /> 청구
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-center gap-3 border-t border-[#B8D1E0] bg-[#F8FAFC] p-3">
          <button
            onClick={() => onSave(formData)}
            className="w-28 rounded-md border border-blue-700 bg-gradient-to-b from-blue-400 to-blue-600 px-10 py-1.5 text-[14px] font-bold text-white shadow-md transition-all hover:from-blue-500 hover:to-blue-700 active:scale-95"
          >
            저장
          </button>
          <button
            onClick={onClose}
            className="w-28 rounded-md border border-gray-800 bg-gradient-to-b from-gray-500 to-gray-700 px-10 py-1.5 text-[14px] font-bold text-white shadow-md transition-all hover:from-gray-600 hover:to-gray-800 active:scale-95"
          >
            창닫기
          </button>
        </div>
      </div>
    </div>
  );
}
