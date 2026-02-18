/**
 * Description : page.tsx - ?? document/upload ??? UI ????
 * Author : Shiwoo Min
 * Date : 2026-02-18
 */

'use client';

import clsx from 'clsx';
import { useState } from 'react';

/**
 * [Page] 문서 업로드 (DocumentUpload)
 * 지침 문서, 평가 자료, 외부 파일 등을 시스템에 업로드하는 페이지
 */
export default function DocumentUploadPage() {
  const [isDragging, setIsDragging] = useState(false);

  const recentUploads = [
    { id: 1, name: '2026_운영지침_최종.pdf', size: '2.4MB', date: '2026-02-18', type: 'PDF' },
    { id: 2, name: '평가자료_소방점검.zip', size: '15.8MB', date: '2026-02-17', type: 'ZIP' },
    { id: 3, name: '직원교육_참석명단.xlsx', size: '45KB', date: '2026-02-15', type: 'XLSX' },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-[#f8fafc] p-6 font-sans">
      <div className="mb-8">
        <h1 className="text-2xl font-black tracking-tight text-gray-800">문서 업로드</h1>
        <p className="mt-1 text-sm text-gray-500">시스템 관리에 필요한 외부 문서를 안전하게 보관합니다.</p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* 업로드 영역 */}
        <div className="space-y-6 lg:col-span-2">
          <div
            onDragOver={e => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={e => {
              e.preventDefault();
              setIsDragging(false);
              alert('파일이 감지되었습니다.');
            }}
            className={clsx(
              'flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-16 transition-all',
              isDragging
                ? 'scale-[0.99] border-[#5C8D5A] bg-emerald-50'
                : 'border-gray-300 bg-white hover:border-[#5C8D5A] hover:bg-gray-50',
            )}
          >
            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 transition-colors group-hover:bg-white">
              <i
                className={clsx('ri-upload-cloud-2-line text-4xl', isDragging ? 'text-[#5C8D5A]' : 'text-gray-300')}
              ></i>
            </div>
            <h3 className="text-lg font-bold text-gray-700">여기에 파일을 끌어다 놓으세요</h3>
            <p className="mt-1 text-sm text-gray-400">또는 내 컴퓨터에서 파일 선택 (최대 100MB)</p>
            <button className="mt-8 rounded border border-gray-300 bg-white px-6 py-2.5 text-sm font-black text-gray-700 shadow-sm transition-all hover:border-[#5C8D5A] hover:text-[#5C8D5A]">
              시스템 파일 탐색기 열기
            </button>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <h4 className="mb-4 text-xs font-black uppercase tracking-widest text-gray-400">업로드 정책 안내</h4>
            <div className="space-y-3">
              <p className="flex items-center gap-2 text-xs text-gray-500">
                <i className="ri-checkbox-circle-fill text-[#5C8D5A]"></i> 개인정보가 포함된 문서는 마스킹 처리 후
                업로드해 주세요.
              </p>
              <p className="flex items-center gap-2 text-xs text-gray-500">
                <i className="ri-checkbox-circle-fill text-[#5C8D5A]"></i> PDF, DOCX, XLSX, HWP, ZIP 파일 형식을
                지원합니다.
              </p>
              <p className="flex items-center gap-2 text-xs text-gray-500">
                <i className="ri-checkbox-circle-fill text-[#5C8D5A]"></i> 한번 업로드된 문서는 감사 로그에 기록됩니다.
              </p>
            </div>
          </div>
        </div>

        {/* 최근 이력 영역 */}
        <div className="space-y-4">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-sm font-black uppercase italic text-gray-700">최근 업로드 이력</h3>
            <button className="text-[10px] font-bold text-[#5C8D5A] hover:underline">전체보기</button>
          </div>

          {recentUploads.map(file => (
            <div
              key={file.id}
              className="flex items-center gap-4 rounded-lg border border-gray-200 bg-white p-4 transition-shadow hover:shadow-md"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded border border-gray-100 bg-[#f8fafc]">
                <i
                  className={clsx(
                    'text-xl',
                    file.type === 'PDF'
                      ? 'ri-file-pdf-fill text-red-500'
                      : file.type === 'ZIP'
                        ? 'ri-file-zip-fill text-orange-500'
                        : 'ri-file-excel-fill text-green-600',
                  )}
                ></i>
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-bold text-gray-700">{file.name}</p>
                <div className="mt-0.5 flex items-center gap-2">
                  <span className="text-[10px] text-gray-400">{file.size}</span>
                  <span className="h-1 w-1 rounded-full bg-gray-300"></span>
                  <span className="font-mono text-[10px] text-gray-400">{file.date}</span>
                </div>
              </div>
              <button className="text-gray-300 hover:text-gray-600">
                <i className="ri-more-2-line"></i>
              </button>
            </div>
          ))}

          <div className="mt-6 border-t border-gray-100 pt-6">
            <div className="rounded-lg border border-[#5C8D5A]/10 bg-[#5C8D5A]/5 p-5">
              <p className="mb-2 text-[10px] font-black uppercase tracking-tighter text-[#5C8D5A]">Storage Status</p>
              <div className="mb-2 h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
                <div className="h-full bg-[#5C8D5A]" style={{ width: '42%' }}></div>
              </div>
              <div className="flex justify-between text-[10px] font-bold">
                <span className="text-gray-500">4.2 GB Used</span>
                <span className="text-gray-400">10 GB Total</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
