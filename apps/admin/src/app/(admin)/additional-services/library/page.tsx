/**
 * Description : page.tsx - ?? additional-services/library ??? UI ????
 */

'use client';

import { api } from '@/lib/api';
import type { FileStorage } from '@agape-care/api-contract';
import clsx from 'clsx';
import { useMemo, useState } from 'react';
import Header from './Header';
import UploadModal from './UploadModal';

type SortType = 'latest' | 'name' | 'size';

const TOTAL_CAPACITY = 20 * 1024 * 1024 * 1024;

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
}

function getFileType(path: string, mimeType: string | null): string {
  const ext = path.split('.').pop()?.toLowerCase();
  if (ext) return ext;
  if (!mimeType) return 'file';
  if (mimeType.includes('pdf')) return 'pdf';
  if (mimeType.includes('sheet') || mimeType.includes('excel')) return 'xlsx';
  if (mimeType.includes('word')) return 'docx';
  if (mimeType.includes('image')) return 'png';
  if (mimeType.includes('zip') || mimeType.includes('compressed')) return 'zip';
  return 'file';
}

function getCategory(file: FileStorage): string {
  const type = getFileType(file.path, file.mimeType);
  if (['pdf', 'doc', 'docx', 'hwp', 'txt'].includes(type)) return '문서';
  if (['xls', 'xlsx', 'csv'].includes(type)) return '스프레드시트';
  if (['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg'].includes(type)) return '이미지';
  if (['zip', '7z', 'rar', 'tar', 'gz'].includes(type)) return '압축';
  return '기타';
}

function getFileIcon(type: string) {
  switch (type) {
    case 'pdf':
      return 'ri-file-pdf-fill text-red-500';
    case 'xlsx':
    case 'xls':
    case 'csv':
      return 'ri-file-excel-fill text-green-600';
    case 'docx':
    case 'doc':
      return 'ri-file-word-fill text-blue-500';
    case 'png':
    case 'jpg':
    case 'jpeg':
    case 'webp':
    case 'gif':
    case 'svg':
      return 'ri-image-fill text-orange-400';
    case 'zip':
    case 'rar':
    case '7z':
      return 'ri-file-zip-fill text-yellow-600';
    default:
      return 'ri-file-fill text-gray-400';
  }
}

export default function LibraryPage() {
  const [activeCategory, setActiveCategory] = useState('전체');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [sortType, setSortType] = useState<SortType>('latest');

  const { data, isLoading, refetch } = api.file.getFiles.useQuery(['libraryFiles', searchKeyword], {
    query: {
      page: 1,
      limit: 200,
      search: searchKeyword || undefined,
      order: 'desc',
    },
  });

  const MOCK_FILES: any[] = [
    {
      id: 'mock-1',
      bucket: 'default',
      path: '/uploads/mock-1.pdf',
      originalName: '2024년_상반기_프로그램_계획서.pdf',
      mimeType: 'application/pdf',
      sizeBytes: 2450000,
      checksum: 'mock',
      createdBy: '1',
      createdAt: new Date(Date.now() - 100000000).toISOString(),
      uploaderName: '김관리',
    },
    {
      id: 'mock-2',
      bucket: 'default',
      path: '/uploads/mock-2.docx',
      originalName: '2023년_하반기_운영_보고서.docx',
      mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      sizeBytes: 1200000,
      checksum: 'mock',
      createdBy: '1',
      createdAt: new Date(Date.now() - 200000000).toISOString(),
      uploaderName: '이복지',
    },
    {
      id: 'mock-3',
      bucket: 'default',
      path: '/uploads/mock-3.xlsx',
      originalName: '2024년_1월_식단표.xlsx',
      mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      sizeBytes: 45000,
      checksum: 'mock',
      createdBy: '2',
      createdAt: new Date(Date.now() - 300000).toISOString(),
      uploaderName: '박영양',
    },
    {
      id: 'mock-4',
      bucket: 'default',
      path: '/uploads/mock-4.png',
      originalName: '어르신_나들이_사진_01.png',
      mimeType: 'image/png',
      sizeBytes: 3500000,
      checksum: 'mock',
      createdBy: '3',
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      uploaderName: '최간호',
    },
    {
      id: 'mock-5',
      bucket: 'default',
      path: '/uploads/mock-5.zip',
      originalName: '2023년_회계_자료_모음.zip',
      mimeType: 'application/zip',
      sizeBytes: 154000000,
      checksum: 'mock',
      createdBy: '1',
      createdAt: new Date(Date.now() - 600000000).toISOString(),
      uploaderName: '김관리',
    },
    {
      id: 'mock-6',
      bucket: 'default',
      path: '/uploads/mock-6.pdf',
      originalName: '개인정보_처리방침_v1.2.pdf',
      mimeType: 'application/pdf',
      sizeBytes: 500000,
      checksum: 'mock',
      createdBy: '1',
      createdAt: new Date(Date.now() - 50000).toISOString(),
      uploaderName: '시스템',
    },
    {
      id: 'mock-7',
      bucket: 'default',
      path: '/uploads/mock-7.hwp',
      originalName: '입소_신청서_양식.hwp',
      mimeType: 'application/x-hwp',
      sizeBytes: 12000,
      checksum: 'mock',
      createdBy: '2',
      createdAt: new Date(Date.now() - 100000).toISOString(),
      uploaderName: '이복지',
    },
  ];

  const files = useMemo(() => {
    if (data?.status === 200 && data.body.data.items.length > 0) {
      return data.body.data.items;
    }
    // Return mock data if API returns nothing (for demo/dev purposes)
    return MOCK_FILES;
  }, [data]);

  const categories = useMemo(() => {
    const dynamic = [...new Set(files.map(file => getCategory(file)))];
    return ['전체', ...dynamic];
  }, [files]);

  const usedCapacity = useMemo(() => {
    return files.reduce((acc, file) => acc + (file.sizeBytes ?? 0), 0);
  }, [files]);

  const usedPercent = Math.min(100, Math.round((usedCapacity / TOTAL_CAPACITY) * 100));

  const filteredFiles = useMemo(() => {
    const base = files.filter(file => {
      const category = getCategory(file);
      const name = file.originalName || file.path;
      return activeCategory === '전체' || category === activeCategory
        ? name.toLowerCase().includes(searchKeyword.toLowerCase())
        : false;
    });

    if (sortType === 'name') {
      return [...base].sort((a, b) => (a.originalName || a.path).localeCompare(b.originalName || b.path));
    }
    if (sortType === 'size') {
      return [...base].sort((a, b) => (b.sizeBytes ?? 0) - (a.sizeBytes ?? 0));
    }
    return [...base].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [files, activeCategory, searchKeyword, sortType]);

  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const handleUpload = () => {
    setIsUploadModalOpen(true);
  };

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[#F1F5F9] font-sans text-gray-800 antialiased">
      <Header onUpload={handleUpload} />

      <div className="flex flex-1 overflow-hidden">
        <div className="flex w-64 flex-col border-r border-gray-200 bg-white">
          <div className="p-5">
            <div className="mt-2 rounded-xl border border-gray-100 bg-gray-50 p-4 shadow-inner">
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
                <span>{formatSize(usedCapacity)} 사용 중</span>
                <span className="font-extrabold text-gray-900">최대 20GB</span>
              </div>
            </div>
          </div>

          <nav className="flex-1 space-y-1 overflow-y-auto p-4 pt-0">
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
        </div>

        <div className="flex flex-1 flex-col overflow-hidden">
          <header className="z-10 flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4 shadow-sm">
            <div className="flex flex-1 items-center gap-4">
              <div className="relative w-full max-w-md">
                <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                <input
                  type="text"
                  placeholder="파일명 검색"
                  value={searchKeyword}
                  onChange={e => setSearchKeyword(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm font-medium outline-none transition-all focus:border-[#5C8D5A] focus:bg-white"
                />
              </div>
              <div className="mx-2 h-6 w-[1px] bg-gray-200"></div>
              <div className="flex gap-1">
                <button
                  onClick={() => setSortType('latest')}
                  className={clsx(
                    'px-3 py-1.5 text-[12px] font-bold transition-colors',
                    sortType === 'latest' ? 'text-[#5C8D5A]' : 'text-gray-500 hover:text-[#5C8D5A]',
                  )}
                >
                  최신순
                </button>
                <button
                  onClick={() => setSortType('name')}
                  className={clsx(
                    'px-3 py-1.5 text-[12px] font-bold transition-colors',
                    sortType === 'name' ? 'text-[#5C8D5A]' : 'text-gray-500 hover:text-[#5C8D5A]',
                  )}
                >
                  이름순
                </button>
                <button
                  onClick={() => setSortType('size')}
                  className={clsx(
                    'px-3 py-1.5 text-[12px] font-bold transition-colors',
                    sortType === 'size' ? 'text-[#5C8D5A]' : 'text-gray-500 hover:text-[#5C8D5A]',
                  )}
                >
                  용량순
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[12px] font-bold text-gray-400">TOTAL {filteredFiles.length} FILES</span>
              <button
                onClick={() => refetch()}
                className="rounded-lg border border-gray-200 p-2 text-gray-500 hover:bg-gray-50"
              >
                <i className="ri-refresh-line"></i>
              </button>
            </div>
          </header>

          <main className="flex-1 overflow-auto p-6">
            <div className="flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/50">
                    <th className="w-12 px-6 py-4"></th>
                    <th className="px-6 py-4 text-[11px] font-black uppercase tracking-tighter text-gray-400">
                      파일명 / 카테고리
                    </th>
                    <th className="px-6 py-4 text-[11px] font-black uppercase tracking-tighter text-gray-400">용량</th>
                    <th className="px-6 py-4 text-[11px] font-black uppercase tracking-tighter text-gray-400">
                      업로드 정보
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filteredFiles.map(file => {
                    const type = getFileType(file.path, file.mimeType);
                    const category = getCategory(file);
                    const name = file.originalName || file.path;
                    return (
                      <tr
                        key={file.id}
                        className="group cursor-pointer transition-colors hover:bg-gray-50/50"
                        onClick={() => window.open(`http://localhost:3000${file.path}`, '_blank')}
                      >
                        <td className="px-6 py-5">
                          <i
                            className={clsx('text-2xl transition-transform group-hover:scale-110', getFileIcon(type))}
                          ></i>
                        </td>
                        <td className="px-6 py-5">
                          <div>
                            <p className="mb-1 text-sm font-bold leading-none text-gray-900">{name}</p>
                            <span className="inline-block rounded bg-gray-100 px-1.5 py-0.5 text-[10px] font-black uppercase leading-none text-gray-500">
                              {category}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-5 font-mono text-sm font-black text-gray-400">
                          {formatSize(file.sizeBytes ?? 0)}
                        </td>
                        <td className="px-6 py-5">
                          <div className="text-[12px] font-bold text-gray-900">{file.uploaderName || '-'}</div>
                          <div className="text-[10px] text-gray-400">
                            {new Date(file.createdAt).toLocaleString('ko-KR')}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {isLoading && (
                <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                  <i className="ri-loader-4-line mb-3 animate-spin text-3xl"></i>
                  <p className="text-sm font-black">DB 데이터를 불러오는 중입니다.</p>
                </div>
              )}

              {!isLoading && filteredFiles.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                  <i className="ri-folder-open-line mb-3 text-5xl opacity-20"></i>
                  <p className="text-sm font-black">조회된 파일이 없습니다.</p>
                </div>
              )}

              <div className="flex items-center justify-between border-t border-gray-100 bg-gray-50/30 px-6 py-3">
                <p className="text-[11px] font-bold text-gray-400">
                  DB total: {data?.status === 200 ? data.body.data.total : 0}
                </p>
                <p className="text-[10px] font-bold text-gray-300">AGA_STORAGE_ENGINE_SECURE_V1</p>
              </div>
            </div>
          </main>
        </div>
      </div>

      <UploadModal isOpen={isUploadModalOpen} onClose={() => setIsUploadModalOpen(false)} onSuccess={() => refetch()} />
    </div>
  );
}
