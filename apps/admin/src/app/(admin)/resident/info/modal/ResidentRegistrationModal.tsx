/**
 * Description : ResidentRegistrationModal.tsx - 📌 수급자 신규등록 모달
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
    'bg-[#E8F1F8] border border-[#B8D1E0] px-2 py-1.5 text-center text-[12px] font-bold text-gray-700 w-[100px] shrink-0 flex items-center justify-center';
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
                  <input type="text" placeholder="YYYY.MM.DD" className={clsx(inputClass, 'w-[120px]')} />
                  <i className="ri-calendar-event-line text-gray-400"></i>
                </div>

                {/* Row: Birthday Type attached to Row 1 logic in image */}
                <div className={clsx(labelClass, 'col-span-2')}>생신일</div>
                <div className="col-span-10 flex items-center gap-3 border border-[#B8D1E0] p-1">
                  <input type="text" placeholder="YYYY.MM.DD" className={clsx(inputClass, 'w-[120px]')} />
                  <i className="ri-calendar-event-line text-gray-400"></i>
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
                  <input type="text" placeholder="YYYY.MM.DD" className={clsx(inputClass, 'w-[100px]')} />
                  <span>~</span>
                  <input type="text" placeholder="YYYY.MM.DD" className={clsx(inputClass, 'w-[100px]')} />
                  <select className={clsx(selectClass, 'w-16')}>
                    <option>2년</option>
                  </select>
                </div>

                {/* Row 3 */}
                <div className={clsx(labelClass, 'col-span-2')}>
                  입소일시<span className="ml-0.5 text-red-500">*</span>
                </div>
                <div className="col-span-4 flex items-center gap-2 border border-[#B8D1E0] p-1">
                  <input type="text" defaultValue="2026.02.18" className={clsx(inputClass, 'w-[100px]')} />
                  <i className="ri-calendar-event-line text-gray-400"></i>
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
                <div className="col-span-4 flex items-center gap-1 border border-[#B8D1E0] p-1">
                  <input type="text" placeholder="휴대폰번호" className={inputClass} />
                  <input type="text" placeholder="전화번호" className={inputClass} />
                </div>

                {/* Row 5: 주소 */}
                <div className={clsx(labelClass, 'col-span-2 h-16')}>주소</div>
                <div className="col-span-6 flex flex-col gap-1 border border-[#B8D1E0] p-1">
                  <div className="flex gap-1">
                    <input type="text" className={clsx(inputClass, 'w-20')} readOnly />
                    <button className="rounded-sm bg-[#8FA1B0] px-2 py-1 text-[11px] text-white">우편번호</button>
                  </div>
                  <div className="flex gap-1">
                    <input type="text" placeholder="상세주소" className={inputClass} />
                    <button className="shrink-0 rounded-sm bg-gray-400 px-2 py-1 text-[11px] text-white">지움</button>
                  </div>
                </div>
                <div className={clsx(labelClass, 'col-span-2 h-16')}>주요질환</div>
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

                {/* Row 7: 비고 (Bottom Row span across disease/notes column in image) */}
                <div className={clsx(labelClass, 'col-span-12 h-6 justify-start bg-[#F8FAFC] px-4')}> </div>
                {/* Note: The image layout has "비고" as a vertical block at the end of the Basic Info table or spanning rows.
                    I'll add it as a full width row at bottom to match the visual weight. */}
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

            <div className="overflow-hidden border border-[#B8D1E0]">
              <table className="w-full border-collapse">
                <tbody>
                  {/* Guardian Row 1 */}
                  <tr className="border-b border-[#B8D1E0]">
                    <th className={clsx(labelClass, 'h-auto w-[120px]')}>
                      보호자명
                      <br />
                      (주보호자)
                    </th>
                    <td className="border-r border-[#B8D1E0] p-1">
                      <input type="text" className={inputClass} />
                    </td>
                    <th className={labelClass}>관계</th>
                    <td className="border-r border-[#B8D1E0] p-1">
                      <input type="text" className={inputClass} />
                    </td>
                    <th className={labelClass}>휴대폰번호</th>
                    <td className="flex items-center gap-2 border-r border-[#B8D1E0] p-1">
                      <input type="text" placeholder="010-1234-5678" className={inputClass} />
                      <div className="flex shrink-0 items-center gap-1">
                        <label className={checkboxLabelClass}>
                          <input type="checkbox" /> 급여
                        </label>
                        <label className={checkboxLabelClass}>
                          <input type="checkbox" defaultChecked /> 청구
                        </label>
                      </div>
                    </td>
                    <th className={clsx(labelClass, 'w-[100px]')}>비고</th>
                  </tr>
                  {/* Guardian Row 2 */}
                  <tr className="border-b border-[#B8D1E0]">
                    <th className={labelClass}>생년월일</th>
                    <td className="flex items-center gap-1 border-r border-[#B8D1E0] p-1">
                      <input type="text" placeholder="YYYY.MM.DD" className={inputClass} />
                      <i className="ri-calendar-event-line text-gray-400"></i>
                      <button className="rounded-sm bg-gray-400 px-1 py-0.5 text-[10px] text-white">지움</button>
                    </td>
                    <th className={labelClass}>전화번호</th>
                    <td className="border-r border-[#B8D1E0] p-1">
                      <input type="text" className={inputClass} />
                    </td>
                    <th className={labelClass}>이메일</th>
                    <td className="flex items-center gap-1 border-r border-[#B8D1E0] p-1">
                      <input type="text" className={inputClass} />
                      <span>@</span>
                      <input type="text" className={inputClass} />
                      <select className={clsx(selectClass, 'w-24')}>
                        <option>직접입력</option>
                      </select>
                    </td>
                    <td rowSpan={5} className="p-1 align-top">
                      <textarea
                        placeholder="보호자 비고"
                        className="h-full w-full resize-none border-none text-[12px] outline-none"
                      ></textarea>
                    </td>
                  </tr>
                  {/* Billing Method Row */}
                  <tr className="border-b border-[#B8D1E0]">
                    <th className={labelClass}>청구서수신</th>
                    <td colSpan={5} className="flex items-center gap-6 p-1">
                      <label className={checkboxLabelClass}>
                        <input type="checkbox" defaultChecked /> 문자,알림톡
                      </label>
                      <label className={checkboxLabelClass}>
                        <input type="checkbox" /> 이메일
                      </label>
                      <label className={checkboxLabelClass}>
                        <input type="checkbox" /> 우편
                      </label>
                    </td>
                  </tr>
                  {/* Billing Address Row */}
                  <tr className="border-b border-[#B8D1E0]">
                    <th className={labelClass}>청구지주소</th>
                    <td colSpan={5} className="flex items-center gap-2 p-1">
                      <input type="text" className={clsx(inputClass, 'w-20')} readOnly />
                      <button className="rounded-sm bg-[#8FA1B0] px-2 py-1 text-[11px] text-white">우편번호</button>
                      <input type="text" className={clsx(inputClass, 'flex-1')} />
                      <button className="shrink-0 rounded-sm bg-gray-400 px-2 py-1 text-[11px] text-white">지움</button>
                    </td>
                  </tr>
                  {/* Family Members Rows */}
                  <tr className="border-b border-[#B8D1E0]">
                    <th className={labelClass}>가족이름1</th>
                    <td className="border-r border-[#B8D1E0] p-1">
                      <input type="text" className={inputClass} />
                    </td>
                    <th className={labelClass}>관계1</th>
                    <td className="border-r border-[#B8D1E0] p-1">
                      <input type="text" className={inputClass} />
                    </td>
                    <th className={labelClass}>휴대폰번호1</th>
                    <td className="flex items-center gap-2 p-1">
                      <input type="text" placeholder="010-1234-5678" className={inputClass} />
                      <div className="flex shrink-0 items-center gap-1">
                        <label className={checkboxLabelClass}>
                          <input type="checkbox" /> 급여
                        </label>
                        <label className={checkboxLabelClass}>
                          <input type="checkbox" /> 청구
                        </label>
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b border-[#B8D1E0]">
                    <th className={labelClass}>가족이름2</th>
                    <td className="border-r border-[#B8D1E0] p-1">
                      <input type="text" className={inputClass} />
                    </td>
                    <th className={labelClass}>관계2</th>
                    <td className="border-r border-[#B8D1E0] p-1">
                      <input type="text" className={inputClass} />
                    </td>
                    <th className={labelClass}>휴대폰번호1</th>
                    <td className="flex items-center gap-2 p-1">
                      <input type="text" placeholder="010-1234-5678" className={inputClass} />
                      <div className="flex shrink-0 items-center gap-1">
                        <label className={checkboxLabelClass}>
                          <input type="checkbox" /> 급여
                        </label>
                        <label className={checkboxLabelClass}>
                          <input type="checkbox" /> 청구
                        </label>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
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
