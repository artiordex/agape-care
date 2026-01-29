
import React, { useState } from 'react';

interface Record {
  id: string;
  date: string;
  bodyParts: string[];
  symptoms: string;
  severity: 'mild' | 'moderate' | 'severe';
  actions: string;
  status: 'ongoing' | 'improved' | 'resolved';
  attachments?: string[];
}

export default function MusculoskeletalTab() {
  const [records, setRecords] = useState<Record[]>([
    {
      id: '1',
      date: '2026-01-15',
      bodyParts: ['허리', '목'],
      symptoms: '장시간 앉아서 근무 후 허리 통증 발생',
      severity: 'moderate',
      actions: '스트레칭 실시, 자세 교정',
      status: 'ongoing',
      attachments: [],
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<Record | null>(null);

  const bodyPartOptions = [
    '목',
    '어깨',
    '팔',
    '손목',
    '손가락',
    '허리',
    '등',
    '엉덩이',
    '무릎',
    '발목',
    '발',
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'mild':
        return 'bg-green-100 text-green-700';
      case 'moderate':
        return 'bg-yellow-100 text-yellow-700';
      case 'severe':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getSeverityLabel = (severity: string) => {
    switch (severity) {
      case 'mild':
        return '경미';
      case 'moderate':
        return '보통';
      case 'severe':
        return '심각';
      default:
        return '알 수 없음';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ongoing':
        return 'bg-blue-100 text-blue-700';
      case 'improved':
        return 'bg-green-100 text-green-700';
      case 'resolved':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'ongoing':
        return '진행중';
      case 'improved':
        return '호전';
      case 'resolved':
        return '완치';
      default:
        return '알 수 없음';
    }
  };

  // Helper to safely get form values
  const getFormValues = () => {
    const form = document.getElementById('add-record-form') as HTMLFormElement | null;
    if (!form) return null;

    const date = (form.elements.namedItem('date') as HTMLInputElement)?.value;
    const bodyParts = Array.from(
      form.querySelectorAll('input[name="bodyPart"]:checked')
    ).map((el) => (el as HTMLInputElement).value);
    const symptoms = (form.elements.namedItem('symptoms') as HTMLTextAreaElement)
      ?.value;
    const severity = (form.elements.namedItem('severity') as HTMLSelectElement)
      ?.value;
    const actions = (form.elements.namedItem('actions') as HTMLTextAreaElement)
      ?.value;

    if (!date || !symptoms || !severity || !actions) return null;

    return { date, bodyParts, symptoms, severity, actions };
  };

  const handleSave = () => {
    const values = getFormValues();
    if (!values) {
      alert('필수 항목을 모두 입력해주세요.');
      return;
    }

    const newRecord: Record = {
      id: Date.now().toString(),
      date: values.date,
      bodyParts: values.bodyParts,
      symptoms: values.symptoms,
      severity: values.severity as Record['severity'],
      actions: values.actions,
      status: 'ongoing',
      attachments: [],
    };

    setRecords((prev) => [...prev, newRecord]);
    alert('기록이 저장되었습니다.');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-4">
      {/* 안내 카드 */}
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-200">
        <div className="flex items-start gap-3">
          <i className="ri-information-line text-2xl text-blue-600 flex-shrink-0"></i>
          <div>
            <h3 className="font-semibold text-blue-900 mb-1">근골격계질환 관리</h3>
            <p className="text-sm text-blue-700">
              업무 중 발생한 근골격계 통증이나 불편함을 기록하고 관리하세요.
              조기 발견과 적절한 조치로 건강을 지킬 수 있습니다.
            </p>
          </div>
        </div>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">총 기록</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{records.length}건</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <i className="ri-file-list-line text-2xl text-blue-600"></i>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">진행중</p>
              <p className="text-2xl font-bold text-blue-600 mt-1">
                {records.filter((r) => r.status === 'ongoing').length}건
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <i className="ri-time-line text-2xl text-blue-600"></i>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">호전/완치</p>
              <p className="text-2xl font-bold text-green-600 mt-1">
                {records.filter(
                  (r) => r.status === 'improved' || r.status === 'resolved'
                ).length}
                건
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <i className="ri-check-line text-2xl text-green-600"></i>
            </div>
          </div>
        </div>
      </div>

      {/* 액션 버튼 */}
      <div className="flex justify-end">
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors cursor-pointer whitespace-nowrap flex items-center gap-2"
        >
          <i className="ri-add-line"></i>
          새 기록 추가
        </button>
      </div>

      {/* 기록 목록 */}
      <div className="space-y-3">
        {records.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <i className="ri-file-list-line text-6xl text-gray-300 mb-4"></i>
            <p className="text-gray-500 mb-4">등록된 기록이 없습니다.</p>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors cursor-pointer whitespace-nowrap"
            >
              첫 기록 추가하기
            </button>
          </div>
        ) : (
          records.map((record) => (
            <div
              key={record.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setSelectedRecord(record)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(
                      record.severity
                    )}`}
                  >
                    {getSeverityLabel(record.severity)}
                  </span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      record.status
                    )}`}
                  >
                    {getStatusLabel(record.status)}
                  </span>
                </div>
                <span className="text-sm text-gray-500">{record.date}</span>
              </div>

              <div className="mb-2">
                <div className="flex flex-wrap gap-2 mb-2">
                  {record.bodyParts.map((part) => (
                    <span
                      key={part}
                      className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-lg font-medium"
                    >
                      {part}
                    </span>
                  ))}
                </div>
                <p className="text-gray-900 font-medium mb-1">{record.symptoms}</p>
                <p className="text-sm text-gray-600">조치: {record.actions}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 추가/수정 모달 */}
      {showAddModal && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowAddModal(false)}
        >
          <div
            className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">근골격계질환 기록 추가</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors cursor-pointer"
              >
                <i className="ri-close-line text-xl text-white"></i>
              </button>
            </div>

            <form id="add-record-form" className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  발생일
                </label>
                <input
                  type="date"
                  name="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  defaultValue={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  통증 부위 (복수 선택 가능)
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {bodyPartOptions.map((part) => (
                    <label key={part} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        name="bodyPart"
                        value={part}
                        className="rounded text-emerald-500 focus:ring-emerald-500"
                      />
                      <span className="text-sm">{part}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  증상 설명
                </label>
                <textarea
                  name="symptoms"
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                  placeholder="증상을 상세히 기록해주세요"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  심각도
                </label>
                <select
                  name="severity"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                >
                  <option value="mild">경미</option>
                  <option value="moderate">보통</option>
                  <option value="severe">심각</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  조치 내용
                </label>
                <textarea
                  name="actions"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                  placeholder="취한 조치나 계획을 기록해주세요"
                ></textarea>
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap"
                >
                  취소
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="flex-1 px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-lg font-medium transition-all shadow-md hover:shadow-lg cursor-pointer whitespace-nowrap"
                >
                  저장하기
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
