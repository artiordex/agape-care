'use client';

import React, { useRef } from 'react';

interface Props {
  value: string;
  onChange: (v: string) => void;
}

/**
 * [Section] 시설 공식 직인(도장) 관리
 * 투명 배경 지원 및 고해상도 미리보기 UI
 */
export default function StampSection({ value, onChange }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.match(/image\/(png|jpg|jpeg)/)) {
      alert('PNG, JPG 파일만 업로드 가능합니다.');
      return;
    }
    const reader = new FileReader();
    reader.onload = ev => onChange(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <div className="overflow-hidden rounded-lg border border-gray-300 bg-white text-[11px] shadow-sm">
      {/* 섹션 헤더 */}
      <div className="flex items-center gap-2 border-b border-gray-300 bg-[#f8fafc] px-4 py-2">
        <div className="h-3 w-1 bg-[#1a5a96]"></div>
        <h3 className="font-black uppercase tracking-tighter text-gray-800">Official Facility Stamp</h3>
      </div>

      <div className="flex flex-col items-center gap-8 p-6 md:flex-row">
        {/* 업로드 및 미리보기 영역 */}
        <div className="group relative">
          <div
            className={`flex h-32 w-32 items-center justify-center rounded-lg border-2 border-dashed transition-all ${value ? 'border-blue-200 bg-white shadow-inner' : 'border-gray-300 bg-gray-50 hover:border-[#1a5a96] hover:bg-blue-50'} `}
          >
            {value ? (
              <img
                src={value}
                alt="직인 미리보기"
                className="max-h-[80%] max-w-[80%] object-contain mix-blend-multiply"
              />
            ) : (
              <div className="text-center text-gray-400">
                <i className="ri-image-add-line text-3xl"></i>
                <p className="mt-1 text-[9px] font-bold">이미지 없음</p>
              </div>
            )}
          </div>

          {/* 액션 오버레이 */}
          {value && (
            <button
              onClick={() => onChange('')}
              className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white shadow-lg transition-colors hover:bg-red-600"
            >
              <i className="ri-close-line text-xs"></i>
            </button>
          )}
        </div>

        {/* 안내 및 컨트롤 */}
        <div className="flex-1 space-y-4">
          <div className="space-y-1">
            <p className="flex items-center gap-1.5 text-[12px] font-black text-gray-800">
              <i className="ri-information-fill text-blue-500"></i>
              공식 직인 등록 가이드
            </p>
            <ul className="list-inside list-disc space-y-1 font-medium leading-relaxed text-gray-500">
              <li>
                흰색 배경이 제거된 <span className="font-bold text-[#1a5a96]">투명 배경 PNG</span> 파일을 권장합니다.
              </li>
              <li>
                파일 크기는 <span className="font-bold">5MB 이하</span>의 고해상도 이미지를 사용하세요.
              </li>
              <li>등록된 도장은 급여명세서 및 공식 문서 하단에 자동 날인됩니다.</li>
            </ul>
          </div>

          <button
            onClick={() => fileRef.current?.click()}
            className="flex items-center gap-2 rounded-sm bg-[#1a5a96] px-4 py-2 font-black text-white shadow-sm transition-all hover:bg-[#144675] active:scale-95"
          >
            <i className="ri-upload-cloud-2-line text-sm"></i>
            직인 이미지 파일 선택
          </button>
          <input ref={fileRef} type="file" accept="image/png,image/jpeg" className="hidden" onChange={handleUpload} />
        </div>
      </div>
    </div>
  );
}
