'use client';

import { useRef } from 'react';

interface Props {
  value: string;
  onChange: (v: string) => void;
}

export default function StampSection({ value, onChange }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.match(/image\/(png|jpg|jpeg)/)) {
      alert('PNG, JPG 파일만 업로드 가능합니다.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert('파일 크기는 5MB 이하여야 합니다.');
      return;
    }

    const reader = new FileReader();
    reader.onload = ev => {
      onChange(ev.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleRemove = () => {
    onChange('');
    if (fileRef.current) fileRef.current.value = '';
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white">
      <div className="border-b border-gray-200 px-5 py-3">
        <h3 className="text-sm font-bold text-gray-900">시설 도장</h3>
      </div>

      <div className="p-5">
        {!value ? (
          <div
            onClick={() => fileRef.current?.click()}
            className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-10 text-center transition-colors hover:border-blue-400 hover:bg-blue-50"
          >
            <i className="ri-image-add-line mb-3 text-4xl text-gray-400"></i>
            <p className="text-sm font-medium text-gray-700">도장 이미지 업로드</p>
            <p className="mt-1 text-xs text-gray-500">PNG / JPG · 5MB 이하</p>
          </div>
        ) : (
          <div className="relative inline-block">
            <img
              src={value}
              alt="시설 도장"
              className="h-40 w-40 rounded-lg border border-gray-300 bg-white object-contain"
            />
            <button
              onClick={handleRemove}
              className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white transition-colors hover:bg-red-600"
            >
              <i className="ri-close-line text-sm"></i>
            </button>
          </div>
        )}

        <input
          ref={fileRef}
          type="file"
          accept="image/png,image/jpeg,image/jpg"
          className="hidden"
          onChange={handleUpload}
        />
      </div>
    </div>
  );
}
