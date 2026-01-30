'use client';

import { useState } from 'react';
import BurdenRateResidentCard from './BurdenRateResidentCard';
import BurdenRateHistoryTable from './BurdenRateHistoryTable';

interface Resident {
  id: string;
  name: string;
  birth: string;
  age: number;
  admissionDate: string;
}

interface BurdenRateHistory {
  id: string;
  residentId: string;
  startDate: string;
  endDate: string | null;
  rateName: string;
  rate: number;
  reason: string;
  createdBy: string;
  createdAt: string;
}

interface BurdenRateType {
  value: string;
  label: string;
  rate: number;
  description: string;
}

/**
 * 노인장기요양보험 본인부담률 (2024년 기준)
 *
 * 1. 기초생활수급자: 본인부담 면제 (0%)
 * 2. 의료급여 수급권자 (차상위계층): 본인부담률 6%
 * 3. 일반 대상자: 본인부담률 20%
 *
 * 추가 감경 (소득/재산 기준):
 * - 건강보험료 하위 50% 이하: 본인부담률 15%로 경감
 * - 건강보험료 하위 25% 이하: 본인부담률 9%로 경감
 */
const burdenRateTypes: BurdenRateType[] = [
  {
    value: 'RATE_0',
    label: '0% (기초생활수급자)',
    rate: 0,
    description: '국민기초생활보장 수급자 - 본인부담 면제',
  },
  {
    value: 'RATE_6',
    label: '6% (의료급여 수급권자)',
    rate: 6,
    description: '의료급여 수급권자 (차상위계층)',
  },
  {
    value: 'RATE_9',
    label: '9% (건강보험료 하위 25%)',
    rate: 9,
    description: '건강보험료 하위 25% 이하 감경 대상',
  },
  {
    value: 'RATE_15',
    label: '15% (건강보험료 하위 50%)',
    rate: 15,
    description: '건강보험료 하위 50% 이하 감경 대상',
  },
  {
    value: 'RATE_20',
    label: '20% (일반)',
    rate: 20,
    description: '일반 대상자 기본 본인부담률',
  },
];

const mockResidents: Resident[] = [
  { id: 'R001', name: '김영희', birth: '1945-03-15', age: 79, admissionDate: '2023-01-01' },
  { id: 'R002', name: '박민수', birth: '1944-08-21', age: 80, admissionDate: '2022-09-15' },
];

const burdenRateHistory: BurdenRateHistory[] = [
  {
    id: 'H001',
    residentId: 'R001',
    startDate: '2024-01-01',
    endDate: null,
    rateName: '15% (건강보험료 하위 50%)',
    rate: 15,
    reason: '소득 재판정 결과 건강보험료 하위 50% 경감 대상 확인',
    createdBy: '김사회복지사',
    createdAt: '2024-01-01 10:30',
  },
  {
    id: 'H002',
    residentId: 'R001',
    startDate: '2023-01-01',
    endDate: '2023-12-31',
    rateName: '6% (의료급여 수급권자)',
    rate: 6,
    description: '입소 시 의료급여 수급권자 확인',
    createdBy: '이관리자',
    createdAt: '2023-01-01 09:12',
  } as any,
  {
    id: 'H003',
    residentId: 'R002',
    startDate: '2022-09-15',
    endDate: null,
    rateName: '0% (기초생활수급자)',
    rate: 0,
    reason: '기초생활수급자 자격 확인 - 본인부담 면제',
    createdBy: '박요양사',
    createdAt: '2022-09-15 14:20',
  },
];

export default function BurdenRateManagementPage() {
  const [selectedResidentId, setSelectedResidentId] = useState('R001');
  const [showAddModal, setShowAddModal] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [rateType, setRateType] = useState('');
  const [reason, setReason] = useState('');

  const selectedResident = mockResidents.find(r => r.id === selectedResidentId);
  const currentRate = burdenRateHistory.find(h => h.residentId === selectedResidentId && h.endDate === null);
  const history = burdenRateHistory.filter(h => h.residentId === selectedResidentId);
  const selectedRateType = burdenRateTypes.find(r => r.value === rateType);

  const handleAddRate = () => {
    if (!startDate || !rateType || !reason) {
      alert('모든 필수 항목을 입력해주세요.');
      return;
    }
    alert('✅ 본인부담률이 등록되었습니다.');
    setShowAddModal(false);
    setStartDate('');
    setRateType('');
    setReason('');
  };

  const handleEdit = (id: string) => {
    alert(`이력 수정 기능 (개발 예정) - ID: ${id}`);
  };

  const handleDelete = (id: string) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      alert(`✅ 삭제 완료 - ID: ${id}`);
    }
  };

  return (
    <div className="h-full bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl space-y-4">
        {/* 헤더 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-gray-900">본인부담률 변경이력 관리</h1>
            <p className="mt-1 text-sm text-gray-600">입소자별 본인부담률을 변경/관리합니다.</p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 rounded border border-blue-600 bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            <i className="ri-add-line"></i>
            신규 부담률 등록
          </button>
        </div>

        {/* 안내 메시지 */}
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
          <div className="flex items-start gap-3">
            <i className="ri-information-line mt-0.5 text-lg text-blue-600"></i>
            <div className="text-sm text-blue-800">
              <p className="mb-1 font-semibold">본인부담률 기준 (노인장기요양보험)</p>
              <p>• 기초생활수급자: 0% (면제) / 의료급여 수급권자: 6%</p>
              <p>• 건강보험료 하위 25%: 9% / 하위 50%: 15% / 일반: 20%</p>
              <p>• 부담률 변경 시 적용 시작일부터 새로운 부담률이 적용됩니다.</p>
            </div>
          </div>
        </div>

        {/* 입소자 선택 */}
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <label className="mb-2 block text-sm font-medium text-gray-700">입소자 선택</label>
          <select
            value={selectedResidentId}
            onChange={e => setSelectedResidentId(e.target.value)}
            className="w-full max-w-md rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            {mockResidents.map(r => (
              <option key={r.id} value={r.id}>
                {r.name} ({r.birth})
              </option>
            ))}
          </select>
        </div>

        {/* 입소자 정보 카드 */}
        {selectedResident && (
          <BurdenRateResidentCard
            resident={selectedResident}
            currentRate={currentRate ? { rateName: currentRate.rateName, rate: currentRate.rate } : null}
          />
        )}

        {/* 이력 테이블 */}
        <BurdenRateHistoryTable history={history} onEdit={handleEdit} onDelete={handleDelete} />
      </div>

      {/* 신규 등록 모달 */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="w-full max-w-2xl rounded-lg bg-white shadow-xl">
            <div className="border-b border-gray-200 px-6 py-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900">본인부담률 신규 등록</h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-400 transition-colors hover:text-gray-600"
                >
                  <i className="ri-close-line text-2xl"></i>
                </button>
              </div>
            </div>

            <div className="max-h-[70vh] overflow-y-auto p-6">
              <div className="space-y-4">
                {/* 입소자 정보 */}
                <div className="rounded-lg border border-blue-100 bg-blue-50 p-3">
                  <p className="text-sm font-semibold text-blue-900">
                    {selectedResident?.name} ({selectedResident?.birth})
                  </p>
                </div>

                {/* 적용 시작일 */}
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-gray-700">
                    적용 시작일 <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={e => setStartDate(e.target.value)}
                    className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                {/* 부담률 종류 */}
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-gray-700">
                    본인부담률 종류 <span className="text-red-600">*</span>
                  </label>
                  <div className="grid grid-cols-1 gap-3">
                    {burdenRateTypes.map(t => (
                      <button
                        key={t.value}
                        onClick={() => setRateType(t.value)}
                        className={`rounded border-2 px-4 py-3 text-left transition-all ${
                          rateType === t.value
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 bg-white hover:border-gray-300'
                        }`}
                      >
                        <div className="mb-1 flex items-center justify-between">
                          <span className="text-sm font-semibold text-gray-900">{t.label}</span>
                          <span className="text-lg font-bold text-blue-600">{t.rate}%</span>
                        </div>
                        <p className="text-xs text-gray-600">{t.description}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 선택 미리보기 */}
                {selectedRateType && (
                  <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                    <p className="text-sm font-medium text-blue-800">
                      선택한 부담률: <strong>{selectedRateType.label}</strong> ({selectedRateType.rate}%)
                    </p>
                  </div>
                )}

                {/* 변경 사유 */}
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-gray-700">
                    변경 사유 <span className="text-red-600">*</span>
                  </label>
                  <textarea
                    value={reason}
                    onChange={e => setReason(e.target.value)}
                    rows={4}
                    maxLength={500}
                    placeholder="본인부담률 변경 사유를 입력해주세요 (예: 기초생활수급자 자격 확인, 건강보험료 재산정 결과)"
                    className="w-full resize-none rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <p className="mt-1 text-xs text-gray-500">최대 500자</p>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 px-6 py-4">
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="rounded border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                >
                  취소
                </button>
                <button
                  onClick={handleAddRate}
                  className="flex items-center gap-1.5 rounded border border-blue-600 bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                >
                  <i className="ri-save-line"></i>
                  등록하기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
