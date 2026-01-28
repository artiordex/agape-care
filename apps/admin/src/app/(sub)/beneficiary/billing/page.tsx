'use client';

import { useState } from 'react';

export default function BurdenRateManagement() {
  // 입소자 기본정보
  const mockResidents = [
    { id: 'R001', name: '김영희', birth: '1945-03-15', age: 80, admissionDate: '2023-01-01' },
    { id: 'R002', name: '박민수', birth: '1944-08-21', age: 81, admissionDate: '2022-09-15' },
  ];

  // 본인부담률 종류
  const burdenRateTypes = [
    { value: 'RATE_0', label: '0% 감경', rate: 0 },
    { value: 'RATE_50', label: '50% 감경', rate: 50 },
    { value: 'RATE_100', label: '100% 부담', rate: 100 },
    { value: 'RATE_200', label: '200% 부담', rate: 200 },
  ];

  // 본인부담률 이력
  const burdenRateHistory = [
    {
      id: 'H001',
      residentId: 'R001',
      startDate: '2023-01-01',
      endDate: null,
      rateName: '50% 감경',
      rate: 50,
      reason: '수급자 소득 재판정',
      createdBy: '관리자A',
      createdAt: '2023-01-01 12:30',
    },
    {
      id: 'H002',
      residentId: 'R001',
      startDate: '2022-01-01',
      endDate: '2022-12-31',
      rateName: '0% 감경',
      rate: 0,
      reason: '초기 등록',
      createdBy: '관리자B',
      createdAt: '2022-01-01 09:12',
    },
  ];

  const [selectedResidentId, setSelectedResidentId] = useState('R001');
  const [selectedResidentName, setSelectedResidentName] = useState('김영희');
  const [showAddModal, setShowAddModal] = useState(false);

  const [startDate, setStartDate] = useState('');
  const [rateType, setRateType] = useState('');
  const [reason, setReason] = useState('');

  // 현재 적용 중인 부담률
  const currentRate = burdenRateHistory.find(h => h.residentId === selectedResidentId && h.endDate === null);

  // 선택된 입소자의 모든 이력
  const history = burdenRateHistory.filter(h => h.residentId === selectedResidentId);

  const handleAddRate = () => {
    if (!startDate || !rateType || !reason) {
      alert('모든 필수 항목을 입력해주세요.');
      return;
    }
    alert('본인부담률이 등록되었습니다. (백엔드 연동 예정)');
    setShowAddModal(false);
    setStartDate('');
    setRateType('');
    setReason('');
  };

  const handleEdit = (id: string) => {
    alert(`이력 수정 기능 예정 - ID: ${id}`);
  };

  const handleDelete = (id: string) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      alert(`삭제 완료 - ID: ${id}`);
    }
  };

  const selectedRate = burdenRateTypes.find(r => r.value === rateType);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <div className="border-b border-gray-200 bg-white px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">본인부담률 변경이력 관리</h1>
            <p className="mt-1 text-sm text-gray-500">입소자별 본인부담률을 변경/관리합니다.</p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="cursor-pointer rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-2 text-white transition-all hover:shadow-lg"
          >
            <i className="ri-add-line mr-2" />
            신규 부담률 등록
          </button>
        </div>
      </div>

      <div className="p-8">
        <div className="mx-auto max-w-7xl space-y-6">
          {/* 입소자 기본 정보 */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-bold text-gray-900">입소자 정보</h3>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
              <div>
                <label className="mb-1 block text-sm text-gray-500">수급자명</label>
                <p className="text-lg font-bold text-gray-900">{selectedResidentName}</p>
              </div>

              <div>
                <label className="mb-1 block text-sm text-gray-500">생년월일</label>
                <p className="text-lg font-medium text-gray-700">1945-03-15 (80세)</p>
              </div>

              <div>
                <label className="mb-1 block text-sm text-gray-500">입소일</label>
                <p className="text-lg font-medium text-gray-700">2023-01-01</p>
              </div>

              <div>
                <label className="mb-1 block text-sm text-gray-500">현재 본인부담률</label>

                <div className="mt-1 flex items-center gap-2">
                  <span className="rounded-full bg-emerald-100 px-3 py-1.5 text-sm font-bold text-emerald-700">
                    {currentRate?.rateName ?? '미등록'}
                  </span>

                  {currentRate && <span className="text-2xl font-bold text-emerald-600">{currentRate.rate}%</span>}
                </div>
              </div>
            </div>
          </div>

          {/* 변경 이력 테이블 */}
          <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-gray-200 px-6 py-4">
              <h3 className="text-lg font-bold text-gray-900">본인부담률 변경 이력</h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-gray-200 bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-bold uppercase text-gray-700">적용 시작일</th>
                    <th className="px-6 py-3 text-left text-xs font-bold uppercase text-gray-700">종료일</th>
                    <th className="px-6 py-3 text-left text-xs font-bold uppercase text-gray-700">부담률명</th>
                    <th className="px-6 py-3 text-left text-xs font-bold uppercase text-gray-700">부담률</th>
                    <th className="px-6 py-3 text-left text-xs font-bold uppercase text-gray-700">변경 사유</th>
                    <th className="px-6 py-3 text-left text-xs font-bold uppercase text-gray-700">처리자</th>
                    <th className="px-6 py-3 text-left text-xs font-bold uppercase text-gray-700">등록일시</th>
                    <th className="px-6 py-3 text-center text-xs font-bold uppercase text-gray-700">관리</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  {history.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="py-12 text-center text-gray-400">
                        <i className="ri-file-list-line mb-3 text-5xl" />
                        등록된 이력이 없습니다.
                      </td>
                    </tr>
                  ) : (
                    history.map(item => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm">{item.startDate}</td>
                        <td className="px-6 py-4 text-sm">
                          {item.endDate ? (
                            item.endDate
                          ) : (
                            <span className="rounded bg-green-100 px-2 py-1 text-xs text-green-700">현재 적용 중</span>
                          )}
                        </td>

                        <td className="px-6 py-4">
                          <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700">
                            {item.rateName}
                          </span>
                        </td>

                        <td className="px-6 py-4 text-lg font-bold text-emerald-600">{item.rate}%</td>

                        <td className="px-6 py-4 text-sm">{item.reason}</td>

                        <td className="px-6 py-4 text-sm">{item.createdBy}</td>

                        <td className="px-6 py-4 text-sm text-gray-500">{item.createdAt}</td>

                        <td className="px-6 py-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => handleEdit(item.id)}
                              className="cursor-pointer rounded bg-blue-100 px-3 py-1 text-sm text-blue-600 hover:bg-blue-200"
                            >
                              수정
                            </button>
                            <button
                              onClick={() => handleDelete(item.id)}
                              className="cursor-pointer rounded bg-red-100 px-3 py-1 text-sm text-red-600 hover:bg-red-200"
                            >
                              삭제
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* 신규 등록 모달 */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="w-full max-w-2xl rounded-xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
              <h3 className="text-xl font-bold text-gray-900">본인부담률 신규 등록</h3>

              <button
                onClick={() => setShowAddModal(false)}
                className="flex h-8 w-8 items-center justify-center text-2xl text-gray-400 hover:text-gray-600"
              >
                <i className="ri-close-line" />
              </button>
            </div>

            <div className="space-y-6 p-6">
              {/* 적용 시작일 */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  적용 시작일 <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={e => setStartDate(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* 부담률 종류 */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  본인부담률 종류 <span className="text-red-500">*</span>
                </label>

                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  {burdenRateTypes.map(t => (
                    <button
                      key={t.value}
                      onClick={() => setRateType(t.value)}
                      className={`cursor-pointer rounded-lg border-2 px-4 py-3 text-left transition-all ${
                        rateType === t.value
                          ? 'border-emerald-500 bg-emerald-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-900">{t.label}</span>
                        <span className="text-xl font-bold text-emerald-600">{t.rate}%</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 선택한 부담률 미리보기 */}
              {selectedRate && (
                <div className="rounded-lg bg-emerald-50 p-4">
                  <p className="text-sm font-medium text-emerald-800">
                    선택한 부담률: <strong>{selectedRate.label}</strong> ({selectedRate.rate}%)
                  </p>
                </div>
              )}

              {/* 변경 사유 */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  변경 사유 <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={reason}
                  onChange={e => setReason(e.target.value)}
                  rows={4}
                  maxLength={500}
                  placeholder="본인부담률 변경 사유를 입력해주세요"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-gray-200 px-6 py-4">
              <button
                onClick={() => setShowAddModal(false)}
                className="cursor-pointer rounded-lg bg-gray-100 px-6 py-2 text-gray-700 hover:bg-gray-200"
              >
                취소
              </button>

              <button
                onClick={handleAddRate}
                className="cursor-pointer rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-2 text-white hover:shadow-lg"
              >
                등록하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
