/**
 * Description : page.tsx - 자료실 (ERP Library / Cloud Storage)
 * Author : Shiwoo Min
 * Date : 2026-02-18
 */

'use client';

import clsx from 'clsx';
import { useMemo, useState } from 'react';

// 파일 인터페이스
interface FileItem {
  id: string;
  name: string;
  type: 'pdf' | 'xlsx' | 'docx' | 'png' | 'zip';
  size: number;
  uploadedAt: string;
  uploader: string;
  category: string;
}

export default function LibraryPage() {
  const [activeCategory, setActiveCategory] = useState('전체');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);

  // 20GB 설정을 시각화하기 위한 값 (바이트 단위)
  const TOTAL_CAPACITY = 20 * 1024 * 1024 * 1024; // 20GB
  const USED_CAPACITY = 4.2 * 1024 * 1024 * 1024; // 예시: 4.2GB 사용 중
  const usedPercent = Math.round((USED_CAPACITY / TOTAL_CAPACITY) * 100);

  // 샘플 데이터
  const [files] = useState<FileItem[]>([
    {
      id: '1',
      name: '2026년_상반기_기관_운영규정.pdf',
      type: 'pdf',
      size: 2.4 * 1024 * 1024,
      uploadedAt: '2026-02-10 14:20',
      uploader: '김관리',
      category: '운영규정',
    },
    {
      id: '2',
      name: '수급자_입소_계약서_양식_V2.docx',
      type: 'docx',
      size: 450 * 1024,
      uploadedAt: '2026-02-12 09:15',
      uploader: '박정근',
      category: '공통서식',
    },
    {
      id: '3',
      name: '식단료_및_간식_선호도_통계.xlsx',
      type: 'xlsx',
      size: 1.2 * 1024 * 1024,
      uploadedAt: '2026-02-15 16:40',
      uploader: '최영자',
      category: '영양/급식',
    },
    {
      id: '4',
      name: '2024년_소방안전_점검_결과보고서.pdf',
      type: 'pdf',
      size: 5.8 * 1024 * 1024,
      uploadedAt: '2026-01-20 11:00',
      uploader: '김관리',
      category: '안전관리',
    },
    {
      id: '5',
      name: '시설_전경_사진_모음.zip',
      type: 'zip',
      size: 156 * 1024 * 1024,
      uploadedAt: '2026-02-17 10:30',
      uploader: '이홍기',
      category: '사진자료',
    },
  ]);

  const categories = ['전체', '운영규정', '공통서식', '안전관리', '영양/급식', '사진자료', '기타'];

  const filteredFiles = useMemo(() => {
    return files.filter(
      f =>
        (activeCategory === '전체' || f.category === activeCategory) &&
        f.name.toLowerCase().includes(searchKeyword.toLowerCase()),
    );
  }, [files, activeCategory, searchKeyword]);

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    else if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    else return (bytes / (1024 * 1024 * 1024)).toFixed(1) + ' GB';
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return 'ri-file-pdf-fill text-red-500';
      case 'xlsx':
        return 'ri-file-excel-fill text-green-600';
      case 'docx':
        return 'ri-file-word-fill text-blue-500';
      case 'png':
        return 'ri-image-fill text-orange-400';
      case 'zip':
        return 'ri-file-zip-fill text-yellow-600';
      default:
        return 'ri-file-fill text-gray-400';
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#F1F5F9] font-sans text-gray-800 antialiased">
      {/* 1. 좌측 사이드바: 카테고리 트리 및 저장공간 정보 */}
      <div className="flex w-64 flex-col border-r border-gray-200 bg-white">
        <div className="border-b border-gray-100 p-5">
          <div className="mb-4 flex items-center gap-2">
            <div className="rounded-lg bg-[#5C8D5A] p-2 text-white">
              <i className="ri-folder-shared-line text-xl"></i>
            </div>
            <div>
              <h1 className="text-lg font-black tracking-tight">기관 자료실</h1>
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Agape Library System</p>
            </div>
          </div>

          {/* 저장공간 쿼터 인디케이터 (20GB 강조) */}
          <div className="mt-4 rounded-xl border border-gray-100 bg-gray-50 p-4 shadow-inner">
            <div className="mb-2 flex justify-between text-[11px] font-black text-gray-600">
              <span>STORAGE SPACE</span>
              <span className="text-[#5C8D5A]">{usedPercent}% USED</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
              <div
                className="h-full bg-gradient-to-r from-[#5C8D5A] to-[#86B084] transition-all duration-1000"
                style={{ width: `${usedPercent}%` }}
              ></div>
            </div>
            <div className="mt-2 flex justify-between text-[10px] font-bold text-gray-400">
              <span>{formatSize(USED_CAPACITY)} 사용 중</span>
              <span className="font-extrabold text-gray-900">최대 20GB</span>
            </div>
          </div>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-4">
          <p className="px-2 pb-2 text-[10px] font-black uppercase tracking-widest text-gray-400">Categories</p>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={clsx(
                'flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-bold transition-all',
                activeCategory === cat
                  ? 'bg-[#5C8D5A]/10 text-[#5C8D5A] shadow-sm'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900',
              )}
            >
              <i
                className={clsx(
                  cat === '전체' ? 'ri-folder-line' : 'ri-folder-3-line',
                  activeCategory === cat ? 'text-[#5C8D5A]' : 'text-gray-300',
                )}
              ></i>
              {cat}
            </button>
          ))}
        </nav>

        <div className="border-t border-gray-100 bg-gray-50/50 p-4">
          <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#5C8D5A] py-3 text-sm font-black text-white shadow-lg transition-all hover:bg-[#4A7548] active:scale-95">
            <i className="ri-upload-cloud-2-line font-black"></i>
            자료 파일 업로드
          </button>
        </div>
      </div>

      {/* 2. 메인 파일 탐색기 영역 */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* 헤더 필터 바 */}
        <header className="z-10 flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4 shadow-sm">
          <div className="flex flex-1 items-center gap-4">
            <div className="relative w-full max-w-md">
              <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
              <input
                type="text"
                placeholder="파일명, 업로더, 카테고리 검색..."
                value={searchKeyword}
                onChange={e => setSearchKeyword(e.target.value)}
                className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm font-medium outline-none transition-all focus:border-[#5C8D5A] focus:bg-white"
              />
            </div>
            <div className="mx-2 h-6 w-[1px] bg-gray-200"></div>
            <div className="flex gap-1">
              {['최신순', '이름순', '용량순'].map(sort => (
                <button
                  key={sort}
                  className="px-3 py-1.5 text-[12px] font-bold text-gray-500 transition-colors hover:text-[#5C8D5A]"
                >
                  {sort}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[12px] font-bold text-gray-400">TOTAL {filteredFiles.length} FILES</span>
            <button className="rounded-lg border border-gray-200 p-2 text-gray-500 hover:bg-gray-50">
              <i className="ri-layout-grid-line"></i>
            </button>
            <button className="rounded-lg border border-gray-200 bg-[#5C8D5A]/5 p-2 text-[#5C8D5A]">
              <i className="ri-list-check-2"></i>
            </button>
          </div>
        </header>

        {/* 메인 리스트 테이블 */}
        <main className="flex-1 overflow-auto p-6">
          <div className="flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="w-12 px-6 py-4">
                    <input type="checkbox" className="rounded" />
                  </th>
                  <th className="px-6 py-4 text-[11px] font-black uppercase tracking-tighter text-gray-400">
                    파일명 / 카테고리
                  </th>
                  <th className="px-6 py-4 text-[11px] font-black uppercase tracking-tighter text-gray-400">용량</th>
                  <th className="px-6 py-4 text-[11px] font-black uppercase tracking-tighter text-gray-400">
                    업로드 정보
                  </th>
                  <th className="px-6 py-4 pr-10 text-right text-[11px] font-black uppercase tracking-tighter text-gray-400">
                    관리
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredFiles.map(file => (
                  <tr key={file.id} className="group transition-colors hover:bg-gray-50/50">
                    <td className="px-6 py-5">
                      <input type="checkbox" className="rounded" />
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <i
                          className={clsx(
                            'text-2xl transition-transform group-hover:scale-110',
                            getFileIcon(file.type),
                          )}
                        ></i>
                        <div>
                          <p className="mb-1 cursor-pointer text-sm font-bold leading-none text-gray-900 hover:text-[#5C8D5A]">
                            {file.name}
                          </p>
                          <span className="inline-block rounded bg-gray-100 px-1.5 py-0.5 text-[10px] font-black uppercase leading-none text-gray-500">
                            {file.category}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 font-mono text-sm font-black text-gray-400">{formatSize(file.size)}</td>
                    <td className="px-6 py-5">
                      <div className="text-[12px] font-bold text-gray-900">{file.uploader}</div>
                      <div className="text-[10px] text-gray-400">{file.uploadedAt}</div>
                    </td>
                    <td className="px-6 py-5 pr-8 text-right">
                      <div className="flex justify-end gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                        <button className="rounded-lg p-2 text-blue-500 hover:bg-blue-50" title="다운로드">
                          <i className="ri-download-2-line text-lg"></i>
                        </button>
                        <button className="rounded-lg p-2 text-gray-400 hover:bg-gray-100" title="이름변경">
                          <i className="ri-edit-line text-lg"></i>
                        </button>
                        <button className="rounded-lg p-2 text-red-400 hover:bg-red-50" title="삭제">
                          <i className="ri-delete-bin-line text-lg"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredFiles.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 text-gray-400 underline-offset-4">
                <i className="ri-folder-open-line mb-3 text-5xl opacity-20"></i>
                <p className="text-sm font-black italic">조회된 파일이 없습니다.</p>
              </div>
            )}

            <div className="flex items-center justify-between border-t border-gray-100 bg-gray-50/30 px-6 py-3">
              <div className="flex gap-2">
                <button className="px-4 py-1.5 text-[11px] font-black text-gray-400 transition-colors hover:text-red-500">
                  선택 삭제
                </button>
                <button className="px-4 py-1.5 text-[11px] font-black text-gray-400 transition-colors hover:text-blue-500">
                  선택 다운로드
                </button>
              </div>
              <p className="text-[10px] font-bold text-gray-300">AGA_STORAGE_ENGINE_SECURE_V1</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
