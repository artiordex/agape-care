'use client';

import React, { useState, useMemo } from 'react';

// --- 타입 정의 ---
interface Popup {
  id: string;
  title: string;
  status: '활성' | '비활성' | '예약';
  startDate: string;
  endDate: string;
  imageUrl?: string;
  linkUrl?: string;
  priority: number; // 노출 순위
}

export default function PopupManagementPage() {
  // 1. 상태 관리
  const [popups, setPopups] = useState<Popup[]>([
    {
      id: '1',
      title: '2026 설맞이 특별 면회 안내',
      status: '활성',
      startDate: '2026-01-20',
      endDate: '2026-01-31',
      priority: 1,
      imageUrl: 'https://images.unsplash.com/photo-1504194184404-4aa81a097b3d?q=80&w=400&auto=format&fit=crop',
    },
    {
      id: '2',
      title: '신규 요양보호사 채용 공고',
      status: '비활성',
      startDate: '2026-02-01',
      endDate: '2026-02-28',
      priority: 2,
    },
  ]);

  const [filterStatus, setFilterStatus] = useState('전체 상태');
  const [showModal, setShowModal] = useState(false);
  const [editingPopup, setEditingPopup] = useState<Popup | null>(null);

  // 2. 필터링 로직
  const filteredPopups = useMemo(() => {
    if (filterStatus === '전체 상태') return popups;
    return popups.filter(p => p.status === filterStatus);
  }, [popups, filterStatus]);

  // 3. 핸들러
  const handleToggleStatus = (id: string) => {
    setPopups(prev => prev.map(p => (p.id === id ? { ...p, status: p.status === '활성' ? '비활성' : '활성' } : p)));
  };

  const handleDelete = (id: string) => {
    if (confirm('이 팝업을 삭제하시겠습니까?')) {
      setPopups(prev => prev.filter(p => p.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans">
      {/* --- 헤더 섹션 --- */}
      <div className="mx-auto mb-8 flex max-w-6xl items-end justify-between">
        <div>
          <h1 className="flex items-center gap-2 text-3xl font-black tracking-tight text-gray-900">
            <span className="h-8 w-2 rounded-full bg-emerald-500"></span>
            팝업 관리
          </h1>
          <p className="mt-1 font-medium text-gray-500">홈페이지에 노출될 중요 공지 및 이벤트 팝업을 관리합니다.</p>
        </div>
        <button
          onClick={() => {
            setEditingPopup(null);
            setShowModal(true);
          }}
          className="flex items-center gap-2 rounded-2xl bg-emerald-600 px-6 py-3 font-bold text-white shadow-lg shadow-emerald-200 transition-all hover:bg-emerald-700"
        >
          <i className="ri-add-circle-line text-lg"></i>새 팝업 등록
        </button>
      </div>

      {/* --- 메인 컨텐츠 (필터 + 리스트) --- */}
      <div className="mx-auto max-w-6xl">
        <div className="overflow-hidden rounded-[2rem] border border-gray-100 bg-white shadow-xl shadow-gray-200/50">
          {/* 필터 바 */}
          <div className="flex items-center justify-between border-b border-gray-50 bg-gray-50/30 p-6">
            <div className="flex items-center gap-2">
              <select
                value={filterStatus}
                onChange={e => setFilterStatus(e.target.value)}
                className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-bold text-gray-600 outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option>전체 상태</option>
                <option>활성</option>
                <option>비활성</option>
                <option>예약</option>
              </select>
              <span className="ml-2 text-xs font-bold text-gray-400">총 {filteredPopups.length}건</span>
            </div>
          </div>

          {/* 팝업 리스트 테이블 */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-gray-50 text-[11px] font-black uppercase tracking-widest text-gray-400">
                  <th className="px-8 py-5">미리보기</th>
                  <th className="px-8 py-5">팝업 제목 / 기간</th>
                  <th className="px-8 py-5">우선순위</th>
                  <th className="px-8 py-5 text-center">상태</th>
                  <th className="px-8 py-5 text-right">관리</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredPopups.map(popup => (
                  <tr key={popup.id} className="group transition-colors hover:bg-gray-50/50">
                    <td className="px-8 py-5">
                      <div className="flex h-14 w-20 items-center justify-center overflow-hidden rounded-lg border border-gray-200 bg-gray-100">
                        {popup.imageUrl ? (
                          <img src={popup.imageUrl} alt="preview" className="h-full w-full object-cover" />
                        ) : (
                          <i className="ri-image-line text-xl text-gray-300"></i>
                        )}
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex flex-col">
                        <span className="font-bold text-gray-900 transition-colors group-hover:text-emerald-600">
                          {popup.title}
                        </span>
                        <span className="text-xs font-medium text-gray-400">
                          {popup.startDate} ~ {popup.endDate}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-5 font-bold text-gray-500">{popup.priority}순위</td>
                    <td className="px-8 py-5 text-center">
                      <button
                        onClick={() => handleToggleStatus(popup.id)}
                        className={`rounded-full px-3 py-1.5 text-[10px] font-black transition-all ${
                          popup.status === '활성' ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-400'
                        }`}
                      >
                        {popup.status}
                      </button>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex justify-end gap-2">
                        <button className="rounded-lg p-2 text-gray-400 transition-all hover:bg-blue-50 hover:text-blue-500">
                          <i className="ri-edit-line text-lg"></i>
                        </button>
                        <button
                          onClick={() => handleDelete(popup.id)}
                          className="rounded-lg p-2 text-gray-400 transition-all hover:bg-red-50 hover:text-red-500"
                        >
                          <i className="ri-delete-bin-7-line text-lg"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* 데이터 없음 상태 */}
            {filteredPopups.length === 0 && (
              <div className="py-24 text-center">
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gray-50">
                  <i className="ri-window-line text-4xl text-gray-200"></i>
                </div>
                <p className="font-bold text-gray-400">등록된 팝업이 없습니다</p>
                <p className="mt-1 text-xs text-gray-300">우측 상단의 추가 버튼을 눌러 새 팝업을 만드세요.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* --- 팝업 등록/수정 모달 --- */}
      {showModal && (
        <div className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm duration-200">
          <div className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-[2.5rem] bg-white shadow-2xl">
            <header className="flex items-center justify-between border-b border-gray-50 p-8">
              <div>
                <h2 className="text-2xl font-black text-gray-900">팝업 정보 설정</h2>
                <p className="text-sm font-medium text-gray-400">노출 기간과 이미지를 설정해 주세요.</p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="flex h-12 w-12 items-center justify-center rounded-2xl text-xl text-gray-400 transition-colors hover:bg-gray-100"
              >
                ✕
              </button>
            </header>

            <div className="space-y-6 overflow-y-auto p-8">
              <div className="space-y-2">
                <label className="ml-1 text-xs font-black uppercase tracking-widest text-gray-400">팝업 제목</label>
                <input
                  type="text"
                  className="w-full rounded-2xl border-none bg-gray-50 px-6 py-4 text-sm font-bold outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="관리용 제목을 입력하세요"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="ml-1 text-xs font-black uppercase tracking-widest text-gray-400">시작일</label>
                  <input
                    type="date"
                    className="w-full rounded-2xl border-none bg-gray-50 px-6 py-4 text-sm font-bold outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="ml-1 text-xs font-black uppercase tracking-widest text-gray-400">종료일</label>
                  <input
                    type="date"
                    className="w-full rounded-2xl border-none bg-gray-50 px-6 py-4 text-sm font-bold outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="ml-1 text-xs font-black uppercase tracking-widest text-gray-400">
                  연결 링크 (URL)
                </label>
                <input
                  type="text"
                  className="w-full rounded-2xl border-none bg-gray-50 px-6 py-4 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="https://..."
                />
              </div>

              <div className="space-y-2">
                <label className="ml-1 text-xs font-black uppercase tracking-widest text-gray-400">팝업 이미지</label>
                <div className="group flex aspect-video w-full cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-gray-200 bg-gray-50 transition-all hover:border-emerald-200 hover:bg-emerald-50">
                  <i className="ri-image-add-line mb-2 text-4xl text-gray-300 group-hover:text-emerald-500"></i>
                  <p className="text-xs font-bold text-gray-400">클릭하여 이미지 업로드</p>
                  <p className="mt-1 text-[10px] text-gray-300">권장 사이즈: 500x700px (JPG, PNG)</p>
                </div>
              </div>
            </div>

            <footer className="flex justify-end gap-3 border-t border-gray-100 bg-gray-50 p-8">
              <button
                onClick={() => setShowModal(false)}
                className="rounded-2xl border border-gray-200 bg-white px-8 py-4 font-bold text-gray-500 hover:bg-gray-100"
              >
                취소
              </button>
              <button className="rounded-2xl bg-emerald-600 px-12 py-4 font-black text-white shadow-xl shadow-emerald-200 transition-all hover:bg-emerald-700">
                설정 저장하기
              </button>
            </footer>
          </div>
        </div>
      )}
    </div>
  );
}
