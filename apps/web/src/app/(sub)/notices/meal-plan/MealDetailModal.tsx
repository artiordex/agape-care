/**
 * Description : MealDetailModal.tsx - 📌 알림마당 식단표 상세 모달
 * Author : Shiwoo Min
 * Date : 2026-02-01
 */

'use client';

import { useState } from 'react';

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
}

const dayNames = ['일', '월', '화', '수', '목', '금', '토'];

export default function MealDetailModal({ meal, onClose }: Props) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (!meal) return null;

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
                    <div className="border-l border-[#5C8D5A]/10 p-4">
                      {meal.breakfast_image ? (
                        <img
                          src={meal.breakfast_image}
                          alt="아침 급식 사진"
                          className="h-48 w-full cursor-pointer rounded-lg object-cover transition-opacity hover:opacity-90"
                          onClick={() => setSelectedImage(meal.breakfast_image!)}
                        />
                      ) : (
                        <div className="flex h-48 items-center justify-center rounded-lg border-2 border-dashed border-[#5C8D5A]/20 bg-gray-50">
                          <div className="text-center text-sm text-gray-400">
                            <i className="ri-image-line mb-2 text-2xl" />
                            <p>사진 준비중</p>
                          </div>
                        </div>
                      )}
                    </div>
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
                    <div className="border-l border-[#5C8D5A]/10 p-4">
                      {meal.lunch_image ? (
                        <img
                          src={meal.lunch_image}
                          alt="점심 급식 사진"
                          className="h-48 w-full cursor-pointer rounded-lg object-cover transition-opacity hover:opacity-90"
                          onClick={() => setSelectedImage(meal.lunch_image!)}
                        />
                      ) : (
                        <div className="flex h-48 items-center justify-center rounded-lg border-2 border-dashed border-[#5C8D5A]/20 bg-gray-50">
                          <div className="text-center text-sm text-gray-400">
                            <i className="ri-image-line mb-2 text-2xl" />
                            <p>사진 준비중</p>
                          </div>
                        </div>
                      )}
                    </div>
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
                    <div className="border-l border-[#5C8D5A]/10 p-4">
                      {meal.dinner_image ? (
                        <img
                          src={meal.dinner_image}
                          alt="저녁 급식 사진"
                          className="h-48 w-full cursor-pointer rounded-lg object-cover transition-opacity hover:opacity-90"
                          onClick={() => setSelectedImage(meal.dinner_image!)}
                        />
                      ) : (
                        <div className="flex h-48 items-center justify-center rounded-lg border-2 border-dashed border-[#5C8D5A]/20 bg-gray-50">
                          <div className="text-center text-sm text-gray-400">
                            <i className="ri-image-line mb-2 text-2xl" />
                            <p>사진 준비중</p>
                          </div>
                        </div>
                      )}
                    </div>
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
