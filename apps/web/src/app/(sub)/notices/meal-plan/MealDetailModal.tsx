/**
 * Description : MealDetailModal.tsx - 📌 알림마당 식단표 상세 모달 (사진 업로드 기능 포함)
 * Author : Shiwoo Min
 * Date : 2026-02-01
 * Updated : 2026-02-16 - 사진 업로드/수정/삭제 기능 추가
 */

'use client';

import { useRef, useState } from 'react';

interface MealImage {
  id: string;
  url: string;
  uploadedAt: string;
}

interface MealPlan {
  id: string;
  date: string;
  breakfast: string;
  breakfast_image?: string; // 아침 사진 URL
  morning_snack: string;
  lunch: string;
  lunch_image?: string; // 점심 사진 URL
  afternoon_snack: string;
  dinner: string;
  dinner_image?: string; // 저녁 사진 URL
  memo?: string;
  nutrition_manager: string;
  images: MealImage[]; // 기존 호환성 유지
}

interface Props {
  meal: MealPlan | null;
  onClose: () => void;
  onUpdateImage?: (mealType: 'breakfast' | 'lunch' | 'dinner', file: File) => Promise<void>;
  onDeleteImage?: (mealType: 'breakfast' | 'lunch' | 'dinner') => Promise<void>;
  isEditable?: boolean; // 편집 가능 여부 (권한에 따라)
}

const dayNames = ['일', '월', '화', '수', '목', '금', '토'];

export default function MealDetailModal({ meal, onClose, onUpdateImage, onDeleteImage, isEditable = false }: Props) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [uploadingType, setUploadingType] = useState<'breakfast' | 'lunch' | 'dinner' | null>(null);

  const breakfastInputRef = useRef<HTMLInputElement>(null);
  const lunchInputRef = useRef<HTMLInputElement>(null);
  const dinnerInputRef = useRef<HTMLInputElement>(null);

  if (!meal) return null;

  /**
   * 사진 업로드 핸들러
   */
  const handleImageUpload = async (mealType: 'breakfast' | 'lunch' | 'dinner', file: File) => {
    if (!onUpdateImage) return;

    // 파일 크기 체크 (5MB 제한)
    if (file.size > 5 * 1024 * 1024) {
      alert('파일 크기는 5MB를 초과할 수 없습니다.');
      return;
    }

    // 파일 타입 체크
    if (!file.type.startsWith('image/')) {
      alert('이미지 파일만 업로드 가능합니다.');
      return;
    }

    setUploadingType(mealType);
    try {
      await onUpdateImage(mealType, file);
    } catch (error) {
      console.error('Image upload failed:', error);
      alert('사진 업로드에 실패했습니다.');
    } finally {
      setUploadingType(null);
    }
  };

  /**
   * 사진 삭제 핸들러
   */
  const handleImageDelete = async (mealType: 'breakfast' | 'lunch' | 'dinner') => {
    if (!onDeleteImage) return;

    if (!confirm('사진을 삭제하시겠습니까?')) return;

    setUploadingType(mealType);
    try {
      await onDeleteImage(mealType);
    } catch (error) {
      console.error('Image delete failed:', error);
      alert('사진 삭제에 실패했습니다.');
    } finally {
      setUploadingType(null);
    }
  };

  /**
   * 파일 선택 핸들러
   */
  const handleFileChange = (mealType: 'breakfast' | 'lunch' | 'dinner', event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleImageUpload(mealType, file);
    }
    // input 초기화 (같은 파일 재선택 가능하도록)
    event.target.value = '';
  };

  /**
   * 급식 사진 컴포넌트
   */
  const MealImageSection = ({
    mealType,
    imageUrl,
    label,
    inputRef,
  }: {
    mealType: 'breakfast' | 'lunch' | 'dinner';
    imageUrl?: string;
    label: string;
    inputRef: React.RefObject<HTMLInputElement>;
  }) => {
    const isUploading = uploadingType === mealType;

    return (
      <div className="border-l border-[#5C8D5A]/10 p-4">
        {imageUrl ? (
          <div className="relative">
            <img
              src={imageUrl}
              alt={`${label} 급식 사진`}
              className="h-48 w-full cursor-pointer rounded-lg object-cover transition-opacity hover:opacity-90"
              onClick={() => setSelectedImage(imageUrl)}
            />
            {isEditable && (
              <div className="absolute right-2 top-2 flex gap-2">
                <button
                  onClick={() => inputRef.current?.click()}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg transition-all hover:bg-blue-700 active:scale-95"
                  title="사진 변경"
                  disabled={isUploading}
                >
                  <i className={`${isUploading ? 'ri-loader-4-line animate-spin' : 'ri-edit-line'} text-sm`} />
                </button>
                <button
                  onClick={() => handleImageDelete(mealType)}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-red-600 text-white shadow-lg transition-all hover:bg-red-700 active:scale-95"
                  title="사진 삭제"
                  disabled={isUploading}
                >
                  <i className="ri-delete-bin-line text-sm" />
                </button>
              </div>
            )}
          </div>
        ) : (
          <div
            className={`flex h-48 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed transition-colors ${
              isEditable
                ? 'border-[#5C8D5A]/30 bg-[#5C8D5A]/5 hover:border-[#5C8D5A]/50 hover:bg-[#5C8D5A]/10'
                : 'border-[#5C8D5A]/20 bg-gray-50'
            }`}
            onClick={() => isEditable && inputRef.current?.click()}
          >
            <div className="text-center text-sm">
              {isUploading ? (
                <>
                  <i className="ri-loader-4-line mb-2 animate-spin text-2xl text-[#5C8D5A]" />
                  <p className="text-[#5C8D5A]">업로드 중...</p>
                </>
              ) : isEditable ? (
                <>
                  <i className="ri-upload-cloud-line mb-2 text-2xl text-[#5C8D5A]" />
                  <p className="text-[#5C8D5A]">클릭하여 사진 업로드</p>
                  <p className="mt-1 text-xs text-gray-400">(최대 5MB)</p>
                </>
              ) : (
                <>
                  <i className="ri-image-line mb-2 text-2xl text-gray-400" />
                  <p className="text-gray-400">사진 준비중</p>
                </>
              )}
            </div>
          </div>
        )}

        {/* 숨겨진 파일 input */}
        {isEditable && (
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={e => handleFileChange(mealType, e)}
          />
        )}
      </div>
    );
  };

  return (
    <>
      {/* 메인 모달 */}
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
        <div
          className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-lg bg-white shadow-2xl"
          onClick={e => e.stopPropagation()}
        >
          {/* 헤더 */}
          <div className="sticky top-0 z-10 border-b-2 border-[#5C8D5A] bg-[#5C8D5A] p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="mb-1 text-2xl font-bold">
                  {new Date(meal.date).getFullYear()}년 {new Date(meal.date).getMonth() + 1}월{' '}
                  {new Date(meal.date).getDate()}일 ({dayNames[new Date(meal.date).getDay()]})
                </h3>
                <p className="text-sm text-white/90">담당 영양사: {meal.nutrition_manager}</p>
              </div>
              <button
                onClick={onClose}
                className="flex h-10 w-10 items-center justify-center rounded border border-white/40 bg-white/10 transition-colors hover:bg-white/20"
              >
                <i className="ri-close-line text-2xl text-white" />
              </button>
            </div>
          </div>

          <div className="p-6">
            {/* 편집 모드 표시 */}
            {isEditable && (
              <div className="mb-4 flex items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 p-3">
                <i className="ri-edit-box-line text-blue-600" />
                <span className="text-sm font-medium text-blue-700">
                  사진을 클릭하여 업로드하거나 변경할 수 있습니다.
                </span>
              </div>
            )}

            {/* 식단 및 사진 */}
            <div className="mb-6 space-y-4">
              {/* 아침 */}
              {meal.breakfast && (
                <div className="overflow-hidden rounded-lg border border-[#5C8D5A]/20">
                  <div className="border-b border-[#5C8D5A]/20 bg-[#5C8D5A]/5 p-3">
                    <h4 className="font-bold text-[#5C8D5A]">아침</h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2">
                    {/* 메뉴 */}
                    <div className="p-4">
                      <p className="whitespace-pre-line text-sm text-gray-900">
                        {meal.breakfast.replace(/,\s*/g, '\n')}
                      </p>
                    </div>
                    {/* 사진 */}
                    <MealImageSection
                      mealType="breakfast"
                      imageUrl={meal.breakfast_image}
                      label="아침"
                      inputRef={breakfastInputRef}
                    />
                  </div>
                </div>
              )}

              {/* 오전간식 */}
              {meal.morning_snack && (
                <div className="overflow-hidden rounded-lg border border-[#5C8D5A]/20">
                  <div className="border-b border-[#5C8D5A]/20 bg-[#5C8D5A]/5 p-3">
                    <h4 className="font-bold text-[#5C8D5A]">오전간식</h4>
                  </div>
                  <div className="p-4">
                    <p className="whitespace-pre-line text-sm text-gray-700">
                      {meal.morning_snack.replace(/,\s*/g, '\n')}
                    </p>
                  </div>
                </div>
              )}

              {/* 점심 */}
              {meal.lunch && (
                <div className="overflow-hidden rounded-lg border border-[#5C8D5A]/20">
                  <div className="border-b border-[#5C8D5A]/20 bg-[#5C8D5A]/5 p-3">
                    <h4 className="font-bold text-[#5C8D5A]">점심</h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2">
                    {/* 메뉴 */}
                    <div className="p-4">
                      <p className="whitespace-pre-line text-sm text-gray-900">{meal.lunch.replace(/,\s*/g, '\n')}</p>
                    </div>
                    {/* 사진 */}
                    <MealImageSection
                      mealType="lunch"
                      imageUrl={meal.lunch_image}
                      label="점심"
                      inputRef={lunchInputRef}
                    />
                  </div>
                </div>
              )}

              {/* 오후간식 */}
              {meal.afternoon_snack && (
                <div className="overflow-hidden rounded-lg border border-[#5C8D5A]/20">
                  <div className="border-b border-[#5C8D5A]/20 bg-[#5C8D5A]/5 p-3">
                    <h4 className="font-bold text-[#5C8D5A]">오후간식</h4>
                  </div>
                  <div className="p-4">
                    <p className="whitespace-pre-line text-sm text-gray-700">
                      {meal.afternoon_snack.replace(/,\s*/g, '\n')}
                    </p>
                  </div>
                </div>
              )}

              {/* 저녁 */}
              {meal.dinner && (
                <div className="overflow-hidden rounded-lg border border-[#5C8D5A]/20">
                  <div className="border-b border-[#5C8D5A]/20 bg-[#5C8D5A]/5 p-3">
                    <h4 className="font-bold text-[#5C8D5A]">저녁</h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2">
                    {/* 메뉴 */}
                    <div className="p-4">
                      <p className="whitespace-pre-line text-sm text-gray-900">{meal.dinner.replace(/,\s*/g, '\n')}</p>
                    </div>
                    {/* 사진 */}
                    <MealImageSection
                      mealType="dinner"
                      imageUrl={meal.dinner_image}
                      label="저녁"
                      inputRef={dinnerInputRef}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* 메모 */}
            {meal.memo && (
              <div className="mb-6 rounded-lg border border-[#5C8D5A]/30 bg-[#5C8D5A]/5 p-4">
                <div className="flex items-start gap-3">
                  <i className="ri-information-line mt-0.5 text-xl text-[#5C8D5A]" />
                  <div>
                    <h5 className="mb-1 font-semibold text-[#5C8D5A]">특이사항</h5>
                    <p className="text-sm text-gray-700">{meal.memo}</p>
                  </div>
                </div>
              </div>
            )}

            {/* 닫기 버튼 */}
            <div className="flex justify-center">
              <button
                onClick={onClose}
                className="rounded border border-[#5C8D5A] bg-[#5C8D5A] px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-[#4E7B4D]"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 이미지 확대 모달 */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/20 transition-colors hover:bg-white/30"
          >
            <i className="ri-close-line text-2xl text-white" />
          </button>
          <img
            src={selectedImage}
            alt="급식 사진 확대"
            className="max-h-full max-w-full rounded-lg object-contain"
            onClick={e => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
