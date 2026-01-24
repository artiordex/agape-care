
import { useState } from 'react';
// Import 경로 수정: residents-management → residents
import { mockResidents } from '../../../../mocks/residents';
import { burdenRateHistory, burdenRateTypes } from '../../../../mocks/residents-management';

export default function BurdenRateManagement() {
  const [selectedResidentId, setSelectedResidentId] = useState('R001');
  const [selectedResidentName, setSelectedResidentName] = useState('김영희');
  const [showAddModal, setShowAddModal] = useState(false);

  // 신규 등록 폼
  const [startDate, setStartDate] = useState('');
  const [rateType, setRateType] = useState('');
  const [reason, setReason] = useState('');

  // 현재 적용 중인 부담률
  const currentRate = burdenRateHistory.find(
    h => h.residentId === selectedResidentId && h.endDate === null
  );

  // 선택된 입소자의 이력
  const history = burdenRateHistory.filter(h => h.residentId === selectedResidentId);

  const handleAddRate = () => {
    if (!startDate || !rateType || !reason) {
      alert('모든 필수 항목을 입력해주세요.');
      return;
    }

    // 실제로는 API 호출
    alert('본인부담률이 등록되었습니다.');
    setShowAddModal(false);
    setStartDate('');
    setRateType('');
    setReason('');
  };

  const handleEdit = (id: string) => {
    alert(`이력 ID: ${id} 수정 기능 (구현 예정)`);
  };

  const handleDelete = (id: string) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      alert(`이력 ID: ${id} 삭제됨`);
    }
  };

  const selectedRate = burdenRateTypes.find(r => r.value === rateType);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">본인부담률 변경이력 관리</h1>
            <p className="text-sm text-gray-500 mt-1">입소자별 본인부담률 변경 내역을 관리합니다</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-6 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg hover:shadow-lg transition-all duration-300 whitespace-nowrap cursor-pointer"
          >
            <i className="ri-add-line mr-2"></i>신규 부담률 등록
          </button>
        </div>
      </div>

      <div className="p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* 입소자 기본 정보 */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">입소자 정보</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">수급자명</label>
                <p className="text-lg font-bold text-gray-900">{selectedResidentName}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">생년월일</label>
                <p className="text-lg font-medium text-gray-700">1945-03-15 (80세)</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">입소일</label>
                <p className="text-lg font-medium text-gray-700">2023-01-01</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">현재 본인부담률</label>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-sm font-bold">
                    {currentRate?.rateName || '미등록'}
                  </span>
                  {currentRate && (
                    <span className="text-2xl font-bold text-emerald-600">{currentRate.rate}%</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* 변경이력 테이블 */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-bold text-gray-900">본인부담률 변경 이력</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      적용 시작일
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      적용 종료일
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      본인부담률
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      부담률
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      변경 사유
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      처리 담당자
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      등록일시
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">
                      관리
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {history.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="px-6 py-12 text-center">
                        <div className="flex flex-col items-center justify-center text-gray-400">
                          <i className="ri-file-list-line text-5xl mb-3"></i>
                          <p className="text-sm">등록된 본인부담률 이력이 없습니다</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    history.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {item.startDate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {item.endDate ? (
                            item.endDate
                          ) : (
                            <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                              현재 적용 중
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
                            {item.rateName}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-lg font-bold text-emerald-600">{item.rate}%</span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">{item.reason}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {item.createdBy}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.createdAt}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => handleEdit(item.id)}
                              className="px-3 py-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition-colors text-sm whitespace-nowrap cursor-pointer"
                            >
                              <i className="ri-edit-line mr-1"></i>수정
                            </button>
                            <button
                              onClick={() => handleDelete(item.id)}
                              className="px-3 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200 transition-colors text-sm whitespace-nowrap cursor-pointer"
                            >
                              <i className="ri-delete-bin-line mr-1"></i>삭제
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">본인부담률 신규 등록</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              >
                <i className="ri-close-line text-2xl"></i>
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  적용 시작일 <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  본인부담률 종류 <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {burdenRateTypes.map((type) => (
                    <button
                      key={type.value}
                      onClick={() => setRateType(type.value)}
                      className={`px-4 py-3 rounded-lg border-2 transition-all text-left whitespace-nowrap cursor-pointer ${
                        rateType === type.value
                          ? 'border-emerald-500 bg-emerald-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-900">{type.label}</span>
                        <span className="text-xl font-bold text-emerald-600">{type.rate}%</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {selectedRate && (
                <div className="p-4 bg-emerald-50 rounded-lg">
                  <p className="text-sm font-medium text-emerald-800">
                    <i className="ri-information-line mr-2"></i>
                    선택한 부담률: <strong>{selectedRate.label}</strong> ({selectedRate.rate}%)
                  </p>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  변경 사유 <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  rows={4}
                  placeholder="본인부담률 변경 사유를 상세히 입력해주세요"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  maxLength={500}
                ></textarea>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-end gap-3">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors whitespace-nowrap cursor-pointer"
              >
                취소
              </button>
              <button
                onClick={handleAddRate}
                className="px-6 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg hover:shadow-lg transition-all duration-300 whitespace-nowrap cursor-pointer"
              >
                <i className="ri-save-line mr-2"></i>등록하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
