'use client';

import { useState } from 'react';

interface SpecialRoomUse {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  residentName: string;
  room: string;
  reason: string;
  staff: string;
  notes: string;
  attachments?: string[];
}

const SpecialRoomUse = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [selectedUse, setSelectedUse] = useState<SpecialRoomUse | null>(null);
  const [showUseModal, setShowUseModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  // 샘플 데이터
  const [uses] = useState<SpecialRoomUse[]>([
    {
      id: 'SR001',
      date: '2024-01-15',
      startTime: '14:00',
      endTime: '16:00',
      residentName: '김영희',
      room: '특별침실 A',
      reason: '가족 면회',
      staff: '이요양',
      notes: '정상 사용 완료',
    },
    {
      id: 'SR002',
      date: '2024-01-16',
      startTime: '10:00',
      endTime: '12:00',
      residentName: '박순자',
      room: '특별침실 B',
      reason: '개인 상담',
      staff: '김사회복지사',
      notes: '',
    },
    {
      id: 'SR003',
      date: '2024-01-17',
      startTime: '15:00',
      endTime: '17:30',
      residentName: '이철수',
      room: '특별침실 A',
      reason: '물리치료',
      staff: '박물리치료사',
      notes: '치료 완료',
    },
  ]);

  // 필터링된 사용 기록
  const filteredUses = uses.filter(use => {
    const matchesSearch = use.residentName.includes(searchTerm) || use.room.includes(searchTerm);
    const matchesDate = (!dateFrom || use.date >= dateFrom) && (!dateTo || use.date <= dateTo);
    return matchesSearch && matchesDate;
  });

  // 월별 통계
  const getMonthlyStats = () => {
    const totalCount = filteredUses.length;
    const roomACount = filteredUses.filter(u => u.room === '특별침실 A').length;
    const roomBCount = filteredUses.filter(u => u.room === '특별침실 B').length;

    return { totalCount, roomACount, roomBCount };
  };

  const stats = getMonthlyStats();

  const handlePrint = () => {
    window.print();
  };

  const handleExport = () => {
    alert('엑셀 다운로드 기능은 백엔드 연동 후 구현됩니다.');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* 헤더 */}
      <div className="mb-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h1 className="flex items-center gap-3 text-2xl font-bold text-gray-900">
              <i className="ri-door-open-line text-emerald-600"></i>
              특별침실 사용기록
            </h1>
            <p className="mt-1 text-sm text-gray-600">특별침실 사용 현황을 관리합니다</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 whitespace-nowrap rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-700 transition-colors hover:bg-gray-50"
            >
              <i className="ri-printer-line"></i>
              출력
            </button>
            <button
              onClick={handleExport}
              className="flex items-center gap-2 whitespace-nowrap rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-700 transition-colors hover:bg-gray-50"
            >
              <i className="ri-file-excel-line"></i>
              엑셀
            </button>
          </div>
        </div>

        {/* 통계 카드 */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">총 사용 건수</p>
                <p className="mt-1 text-2xl font-bold text-gray-900">{stats.totalCount}건</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                <i className="ri-door-open-line text-2xl text-blue-600"></i>
              </div>
            </div>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">특별침실 A</p>
                <p className="mt-1 text-2xl font-bold text-emerald-600">{stats.roomACount}건</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100">
                <i className="ri-home-4-line text-2xl text-emerald-600"></i>
              </div>
            </div>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">특별침실 B</p>
                <p className="mt-1 text-2xl font-bold text-purple-600">{stats.roomBCount}건</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                <i className="ri-home-5-line text-2xl text-purple-600"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 사용 기록 목록 */}
      <div className="rounded-lg bg-white shadow-sm">
        <div className="p-6">
          {/* 필터 바 */}
          <div className="mb-6 flex gap-3">
            <div className="flex-1">
              <input
                type="text"
                placeholder="수급자명, 침실명 검색..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <input
              type="date"
              value={dateFrom}
              onChange={e => setDateFrom(e.target.value)}
              placeholder="시작일"
              className="rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-emerald-500"
            />
            <input
              type="date"
              value={dateTo}
              onChange={e => setDateTo(e.target.value)}
              placeholder="종료일"
              className="rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-emerald-500"
            />
            <button
              onClick={() => {
                setSelectedUse(null);
                setIsEditMode(false);
                setShowUseModal(true);
              }}
              className="flex items-center gap-2 whitespace-nowrap rounded-lg bg-emerald-600 px-4 py-2 text-white transition-colors hover:bg-emerald-700"
            >
              <i className="ri-add-line"></i>
              기록 추가
            </button>
          </div>

          {/* 테이블 */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-gray-200 bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-600">날짜</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-600">시간</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-600">수급자</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-600">침실</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-600">사용 사유</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-600">담당자</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-600">비고</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold uppercase text-gray-600">관리</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredUses.map(use => (
                  <tr key={use.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900">{use.date}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {use.startTime} ~ {use.endTime}
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{use.residentName}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                          use.room === '특별침실 A'
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-purple-100 text-purple-700'
                        }`}
                      >
                        {use.room}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{use.reason}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{use.staff}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{use.notes || '-'}</td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => {
                          setSelectedUse(use);
                          setIsEditMode(true);
                          setShowUseModal(true);
                        }}
                        className="mr-3 text-emerald-600 hover:text-emerald-700"
                      >
                        <i className="ri-edit-line text-lg"></i>
                      </button>
                      <button
                        onClick={() => {
                          if (confirm('정말 삭제하시겠습니까?')) {
                            alert('삭제되었습니다.');
                          }
                        }}
                        className="text-red-600 hover:text-red-700"
                      >
                        <i className="ri-delete-bin-line text-lg"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 사용 기록 추가/수정 모달 */}
      {showUseModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={() => setShowUseModal(false)}
        >
          <div
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="sticky top-0 flex items-center justify-between bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-4">
              <h2 className="text-xl font-bold text-white">특별침실 사용 기록 {isEditMode ? '수정' : '추가'}</h2>
              <button onClick={() => setShowUseModal(false)} className="rounded-full p-1 text-white hover:bg-white/20">
                <i className="ri-close-line text-2xl"></i>
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">날짜 *</label>
                  <input
                    type="date"
                    defaultValue={selectedUse?.date}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">침실 선택 *</label>
                  <select
                    defaultValue={selectedUse?.room}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="">침실을 선택하세요</option>
                    <option value="특별침실 A">특별침실 A</option>
                    <option value="특별침실 B">특별침실 B</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">시작시간 *</label>
                  <input
                    type="time"
                    defaultValue={selectedUse?.startTime}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">종료시간 *</label>
                  <input
                    type="time"
                    defaultValue={selectedUse?.endTime}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">수급자 *</label>
                  <input
                    type="text"
                    defaultValue={selectedUse?.residentName}
                    placeholder="수급자 이름"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">담당자 *</label>
                  <input
                    type="text"
                    defaultValue={selectedUse?.staff}
                    placeholder="담당자 이름"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div className="col-span-2">
                  <label className="mb-1 block text-sm font-medium text-gray-700">사용 사유 *</label>
                  <input
                    type="text"
                    defaultValue={selectedUse?.reason}
                    placeholder="예: 가족 면회, 개인 상담, 물리치료"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div className="col-span-2">
                  <label className="mb-1 block text-sm font-medium text-gray-700">비고</label>
                  <textarea
                    defaultValue={selectedUse?.notes}
                    rows={3}
                    placeholder="특이사항을 입력하세요"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-emerald-500"
                  ></textarea>
                </div>
                <div className="col-span-2">
                  <label className="mb-1 block text-sm font-medium text-gray-700">첨부파일</label>
                  <input
                    type="file"
                    multiple
                    accept="image/*,.pdf"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>
              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setShowUseModal(false)}
                  className="flex-1 rounded-lg bg-gray-100 px-4 py-2 text-gray-700 hover:bg-gray-200"
                >
                  취소
                </button>
                <button
                  onClick={() => {
                    alert('저장되었습니다.');
                    setShowUseModal(false);
                  }}
                  className="flex-1 rounded-lg bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700"
                >
                  <i className="ri-save-line mr-1"></i>
                  저장
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpecialRoomUse;
