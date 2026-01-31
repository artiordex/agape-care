'use client';

import React from 'react';

interface Props {
  readonly selectedDate: string;
  readonly editingMeal: any | null;
  readonly formData: any;
  readonly onFormChange: (data: any) => void;
  readonly onSave: () => void;
  readonly onDelete: () => void;
  readonly onClose: () => void;
}

/**
 * [Component] 월간 식단 상세 편집 모달
 * 아가페 그린(#5C8D5A) 테마 및 고밀도 데이터 입력 레이아웃 적용
 */
export default function MonthlyEditModal({
  selectedDate,
  editingMeal,
  formData,
  onFormChange,
  onSave,
  onDelete,
  onClose,
}: Props) {
  // 개별 필드 업데이트 헬퍼
  const updateField = (key: string, value: any) => {
    onFormChange({ ...formData, [key]: value });
  };

  const updateMealField = (mealType: 'breakfast' | 'lunch' | 'dinner', field: 'menu' | 'calories', value: string) => {
    onFormChange({
      ...formData,
      [mealType]: { ...formData[mealType], [field]: value },
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 font-sans antialiased backdrop-blur-sm">
      <div className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden border-2 border-gray-400 bg-white shadow-2xl">
        {/* 1. 모달 헤더 */}
        <div className="flex items-center justify-between border-b-2 border-gray-300 bg-blue-50 px-4 py-3">
          <div>
            <div className="flex items-center gap-2">
              <div className="h-4 w-1 bg-[#5C8D5A]"></div>
              <h2 className="text-[14px] font-black uppercase tracking-tight text-blue-900">식단 상세 정보 편집</h2>
            </div>
            <p className="mt-0.5 text-[10px] font-bold text-gray-500">Selected Date: {selectedDate}</p>
          </div>
          <button onClick={onClose} className="text-2xl font-bold text-gray-400 transition-colors hover:text-gray-600">
            <i className="ri-close-line"></i>
          </button>
        </div>

        {/* 2. 모달 바디 (스크롤 영역) */}
        <div className="flex-1 space-y-4 overflow-y-auto p-4">
          {/* 아침/점심/저녁 식단 입력 그룹 */}
          {(['breakfast', 'lunch', 'dinner'] as const).map(mealType => (
            <div key={mealType} className="border border-blue-400 bg-blue-50/20 p-3">
              <div className="mb-2 flex items-center gap-1.5 border-b border-blue-100 pb-1">
                <i className="ri-play-mini-fill text-[10px] text-blue-600"></i>
                <h3 className="text-[11px] font-black text-blue-900">
                  {mealType === 'breakfast' ? '아침(Breakfast)' : mealType === 'lunch' ? '점심(Lunch)' : '저녁(Dinner)'}
                </h3>
              </div>
              <div className="grid gap-3 md:grid-cols-4">
                <div className="md:col-span-3">
                  <label className="mb-1 block text-[9px] font-black uppercase text-gray-400">Menu Composition</label>
                  <textarea
                    rows={2}
                    value={formData[mealType].menu}
                    onChange={e => updateMealField(mealType, 'menu', e.target.value)}
                    placeholder="식단 메뉴를 입력하세요..."
                    className="w-full border border-blue-300 p-2 text-[11px] font-medium outline-none focus:border-[#5C8D5A] focus:ring-1 focus:ring-[#5C8D5A]"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-[9px] font-black uppercase text-gray-400">Calories (Kcal)</label>
                  <input
                    type="text"
                    value={formData[mealType].calories}
                    onChange={e => updateMealField(mealType, 'calories', e.target.value)}
                    placeholder="0"
                    className="w-full border border-blue-300 p-2 text-center text-[11px] font-bold text-orange-700 outline-none focus:border-[#5C8D5A]"
                  />
                </div>
              </div>
            </div>
          ))}

          {/* 간식 및 기타 정보 */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <div className="border border-emerald-200 bg-emerald-50/20 p-3">
                <h4 className="mb-2 text-[10px] font-black uppercase text-[#5C8D5A]">Snack Management</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-12 text-[10px] font-bold text-gray-500">오전(AM)</span>
                    <input
                      type="text"
                      value={formData.morningSnack}
                      onChange={e => updateField('morningSnack', e.target.value)}
                      className="flex-1 border border-gray-300 p-1.5 text-[11px] outline-none focus:border-[#5C8D5A]"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-12 text-[10px] font-bold text-gray-500">오후(PM)</span>
                    <input
                      type="text"
                      value={formData.afternoonSnack}
                      onChange={e => updateField('afternoonSnack', e.target.value)}
                      className="flex-1 border border-gray-300 p-1.5 text-[11px] outline-none focus:border-[#5C8D5A]"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="border border-orange-200 bg-orange-50/20 p-3">
                <h4 className="mb-2 text-[10px] font-black uppercase text-orange-700">Special Diet / Allergy</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-12 text-[10px] font-bold text-gray-500">일반식</span>
                    <input
                      type="text"
                      value={formData.allergyPossible}
                      onChange={e => updateField('allergyPossible', e.target.value)}
                      className="flex-1 border border-gray-300 p-1.5 text-[11px] outline-none focus:border-orange-400"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-12 text-[10px] font-bold text-gray-500">제한식</span>
                    <input
                      type="text"
                      value={formData.allergyRestricted}
                      onChange={e => updateField('allergyRestricted', e.target.value)}
                      className="flex-1 border border-gray-300 p-1.5 text-[11px] outline-none focus:border-orange-400"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 영양사 및 메모 */}
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-[10px] font-black uppercase text-gray-400">Nutrition Manager</label>
              <input
                type="text"
                value={formData.manager}
                onChange={e => updateField('manager', e.target.value)}
                className="w-full border border-gray-300 p-2 text-[11px] font-bold outline-none focus:border-[#5C8D5A]"
              />
            </div>
            <div>
              <label className="mb-1 block text-[10px] font-black uppercase text-gray-400">Internal Memo</label>
              <input
                type="text"
                value={formData.memo}
                onChange={e => updateField('memo', e.target.value)}
                className="w-full border border-gray-300 p-2 text-[11px] outline-none focus:border-[#5C8D5A]"
              />
            </div>
          </div>
        </div>

        {/* 3. 모달 푸터 (액션 버튼) */}
        <div className="flex items-center justify-between border-t-2 border-gray-300 bg-gray-50 p-4">
          <div>
            {editingMeal && (
              <button
                onClick={onDelete}
                className="flex items-center gap-1.5 border border-red-200 bg-white px-4 py-2 text-[11px] font-black text-red-500 transition-all hover:bg-red-50 active:scale-95"
              >
                <i className="ri-delete-bin-line"></i>
                해당 식단 삭제
              </button>
            )}
          </div>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="min-w-[80px] border border-gray-400 bg-gray-500 px-5 py-2 text-[11px] font-black text-white transition-all hover:bg-gray-600"
            >
              닫기
            </button>
            <button
              onClick={onSave}
              className="min-w-[100px] border border-blue-700 bg-blue-600 px-6 py-2 text-[11px] font-black text-white shadow-md transition-all hover:bg-blue-700 active:scale-95"
            >
              데이터 저장
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
