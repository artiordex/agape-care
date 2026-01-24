'use client';

import { useState } from 'react';

interface Grievance {
  id: string;
  receiptDate: string;
  reporterType: '입소자' | '보호자' | '직원' | '외부';
  reporterName: string;
  reporterContact: string;
  category: '시설환경' | '식사' | '케어서비스' | '직원태도' | '안전' | '기타';
  title: string;
  content: string;
  status: 'received' | 'processing' | 'completed';
  processor?: string;
  processingDate?: string;
  response?: string;
  preventionPlan?: string;
  completedDate?: string;
  attachments?: string[];
}

const GrievanceManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'received' | 'processing' | 'completed'>('all');
  const [categoryFilter, setCategoryFilter] = useState<'all' | string>('all');
  const [selectedGrievance, setSelectedGrievance] = useState<Grievance | null>(null);
  const [showGrievanceModal, setShowGrievanceModal] = useState(false);
  const [showProcessModal, setShowProcessModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const categories = ['시설환경', '식사', '케어서비스', '직원태도', '안전', '기타'];

  // 샘플 데이터
  const [grievances] = useState<Grievance[]>([
    {
      id: 'G001',
      receiptDate: '2024-01-10',
      reporterType: '보호자',
      reporterName: '김철수',
      reporterContact: '010-1234-5678',
      category: '식사',
      title: '식사 온도 관련',
      content: '점심 식사가 너무 차갑게 제공되었습니다.',
      status: 'completed',
      processor: '이시설장',
      processingDate: '2024-01-10',
      response: '즉시 주방에 전달하여 온도 관리를 강화하였습니다.',
      preventionPlan: '식사 제공 전 온도 체크 프로세스 추가',
      completedDate: '2024-01-11',
    },
    {
      id: 'G002',
      receiptDate: '2024-01-15',
      reporterType: '입소자',
      reporterName: '박순자',
      reporterContact: '010-9876-5432',
      category: '시설환경',
      title: '복도 조명 불량',
      content: '2층 복도 조명이 어두워 이동 시 불편합니다.',
      status: 'processing',
      processor: '최관리',
      processingDate: '2024-01-15',
      response: '조명 교체 작업 진행 중입니다.',
    },
    {
      id: 'G003',
      receiptDate: '2024-01-20',
      reporterType: '보호자',
      reporterName: '이영희',
      reporterContact: '010-5555-6666',
      category: '케어서비스',
      title: '목욕 서비스 일정',
      content: '목욕 서비스 일정이 자주 변경되어 불편합니다.',
      status: 'received',
    },
  ]);

  // 필터링된 고충 목록
  const filteredGrievances = grievances.filter(grievance => {
    const matchesSearch = grievance.title.includes(searchTerm) || grievance.reporterName.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || grievance.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || grievance.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  // 처리 시작
  const handleStartProcessing = (grievance: Grievance) => {
    setSelectedGrievance(grievance);
    setShowProcessModal(true);
  };

  // 종결 처리
  const handleComplete = (grievance: Grievance) => {
    if (!grievance.response || !grievance.preventionPlan) {
      alert('조치내용과 재발방지 내용을 입력해주세요.');
      return;
    }

    if (confirm('고충처리를 종결하시겠습니까?')) {
      alert('종결 처리되었습니다.');
    }
  };

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
              <i className="ri-customer-service-line text-emerald-600"></i>
              고충처리 관리
            </h1>
            <p className="mt-1 text-sm text-gray-600">입소자 및 보호자의 고충사항을 접수하고 처리합니다</p>
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
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">총 접수</p>
                <p className="mt-1 text-2xl font-bold text-gray-900">{grievances.length}건</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                <i className="ri-file-list-3-line text-2xl text-blue-600"></i>
              </div>
            </div>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">접수</p>
                <p className="mt-1 text-2xl font-bold text-orange-600">
                  {grievances.filter(g => g.status === 'received').length}건
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100">
                <i className="ri-inbox-line text-2xl text-orange-600"></i>
              </div>
            </div>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">처리중</p>
                <p className="mt-1 text-2xl font-bold text-blue-600">
                  {grievances.filter(g => g.status === 'processing').length}건
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                <i className="ri-time-line text-2xl text-blue-600"></i>
              </div>
            </div>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">종결</p>
                <p className="mt-1 text-2xl font-bold text-emerald-600">
                  {grievances.filter(g => g.status === 'completed').length}건
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100">
                <i className="ri-checkbox-circle-line text-2xl text-emerald-600"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 고충 목록 */}
      <div className="rounded-lg bg-white shadow-sm">
        <div className="p-6">
          {/* 필터 바 */}
          <div className="mb-6 flex gap-3">
            <div className="flex-1">
              <input
                type="text"
                placeholder="제목, 신고자 검색..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <select
              value={categoryFilter}
              onChange={e => setCategoryFilter(e.target.value)}
              className="rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-emerald-500"
            >
              <option value="all">전체 분류</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value as any)}
              className="rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-emerald-500"
            >
              <option value="all">전체 상태</option>
              <option value="received">접수</option>
              <option value="processing">처리중</option>
              <option value="completed">종결</option>
            </select>
            <button
              onClick={() => {
                setSelectedGrievance(null);
                setIsEditMode(false);
                setShowGrievanceModal(true);
              }}
              className="flex items-center gap-2 whitespace-nowrap rounded-lg bg-emerald-600 px-4 py-2 text-white transition-colors hover:bg-emerald-700"
            >
              <i className="ri-add-line"></i>
              고충 접수
            </button>
          </div>

          {/* 테이블 */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-gray-200 bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-600">접수일</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-600">신고자</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-600">구분</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-600">분류</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-600">제목</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-600">처리자</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-600">상태</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold uppercase text-gray-600">관리</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredGrievances.map(grievance => (
                  <tr key={grievance.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900">{grievance.receiptDate}</td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">
                      <div>{grievance.reporterName}</div>
                      <div className="text-xs text-gray-500">{grievance.reporterContact}</div>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                          grievance.reporterType === '입소자'
                            ? 'bg-blue-100 text-blue-700'
                            : grievance.reporterType === '보호자'
                              ? 'bg-green-100 text-green-700'
                              : grievance.reporterType === '직원'
                                ? 'bg-purple-100 text-purple-700'
                                : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {grievance.reporterType}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex rounded-full bg-orange-100 px-2 py-1 text-xs font-medium text-orange-700">
                        {grievance.category}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">{grievance.title}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{grievance.processor || '-'}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                          grievance.status === 'completed'
                            ? 'bg-emerald-100 text-emerald-700'
                            : grievance.status === 'processing'
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-orange-100 text-orange-700'
                        }`}
                      >
                        {grievance.status === 'completed'
                          ? '종결'
                          : grievance.status === 'processing'
                            ? '처리중'
                            : '접수'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      {grievance.status === 'received' && (
                        <button
                          onClick={() => handleStartProcessing(grievance)}
                          className="mr-3 text-blue-600 hover:text-blue-700"
                        >
                          <i className="ri-play-line text-lg"></i>
                        </button>
                      )}
                      {grievance.status === 'processing' && (
                        <button
                          onClick={() => handleComplete(grievance)}
                          className="mr-3 text-emerald-600 hover:text-emerald-700"
                        >
                          <i className="ri-check-line text-lg"></i>
                        </button>
                      )}
                      <button
                        onClick={() => {
                          setSelectedGrievance(grievance);
                          setIsEditMode(true);
                          setShowGrievanceModal(true);
                        }}
                        className="mr-3 text-gray-600 hover:text-gray-700"
                      >
                        <i className="ri-eye-line text-lg"></i>
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

      {/* 고충 접수/상세 모달 */}
      {showGrievanceModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={() => setShowGrievanceModal(false)}
        >
          <div
            className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-xl bg-white shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="sticky top-0 flex items-center justify-between bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-4">
              <h2 className="text-xl font-bold text-white">고충 {isEditMode ? '상세' : '접수'}</h2>
              <button
                onClick={() => setShowGrievanceModal(false)}
                className="rounded-full p-1 text-white hover:bg-white/20"
              >
                <i className="ri-close-line text-2xl"></i>
              </button>
            </div>
            <div className="p-6">
              {/* 신고자 정보 */}
              <div className="mb-6">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
                  <i className="ri-user-line text-emerald-600"></i>
                  신고자 정보
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">접수일 *</label>
                    <input
                      type="date"
                      defaultValue={selectedGrievance?.receiptDate}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-emerald-500"
                      disabled={isEditMode}
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">신고자 구분 *</label>
                    <select
                      defaultValue={selectedGrievance?.reporterType}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-emerald-500"
                      disabled={isEditMode}
                    >
                      <option value="입소자">입소자</option>
                      <option value="보호자">보호자</option>
                      <option value="직원">직원</option>
                      <option value="외부">외부</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">신고자명 *</label>
                    <input
                      type="text"
                      defaultValue={selectedGrievance?.reporterName}
                      placeholder="이름"
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-emerald-500"
                      disabled={isEditMode}
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">연락처 *</label>
                    <input
                      type="text"
                      defaultValue={selectedGrievance?.reporterContact}
                      placeholder="전화번호"
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-emerald-500"
                      disabled={isEditMode}
                    />
                  </div>
                </div>
              </div>

              {/* 고충 내용 */}
              <div className="mb-6">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
                  <i className="ri-file-text-line text-emerald-600"></i>
                  고충 내용
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">분류 *</label>
                    <select
                      defaultValue={selectedGrievance?.category}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-emerald-500"
                      disabled={isEditMode}
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">제목 *</label>
                    <input
                      type="text"
                      defaultValue={selectedGrievance?.title}
                      placeholder="고충 제목"
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-emerald-500"
                      disabled={isEditMode}
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">내용 *</label>
                    <textarea
                      defaultValue={selectedGrievance?.content}
                      rows={5}
                      placeholder="고충 내용을 상세히 입력하세요"
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-emerald-500"
                      disabled={isEditMode}
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* 처리 정보 (처리중/종결인 경우만 표시) */}
              {selectedGrievance && selectedGrievance.status !== 'received' && (
                <div className="mb-6">
                  <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
                    <i className="ri-settings-line text-emerald-600"></i>
                    처리 정보
                  </h3>
                  <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="mb-1 block text-sm font-medium text-gray-700">처리자</label>
                          <input
                            type="text"
                            value={selectedGrievance.processor}
                            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2"
                            readOnly
                          />
                        </div>
                        <div>
                          <label className="mb-1 block text-sm font-medium text-gray-700">처리 시작일</label>
                          <input
                            type="text"
                            value={selectedGrievance.processingDate}
                            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2"
                            readOnly
                          />
                        </div>
                      </div>
                      {selectedGrievance.response && (
                        <div>
                          <label className="mb-1 block text-sm font-medium text-gray-700">조치 내용</label>
                          <textarea
                            value={selectedGrievance.response}
                            rows={3}
                            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2"
                            readOnly
                          ></textarea>
                        </div>
                      )}
                      {selectedGrievance.preventionPlan && (
                        <div>
                          <label className="mb-1 block text-sm font-medium text-gray-700">재발방지 계획</label>
                          <textarea
                            value={selectedGrievance.preventionPlan}
                            rows={3}
                            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2"
                            readOnly
                          ></textarea>
                        </div>
                      )}
                      {selectedGrievance.completedDate && (
                        <div>
                          <label className="mb-1 block text-sm font-medium text-gray-700">종결일</label>
                          <input
                            type="text"
                            value={selectedGrievance.completedDate}
                            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2"
                            readOnly
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* 첨부파일 */}
              <div className="mb-6">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
                  <i className="ri-attachment-line text-emerald-600"></i>
                  첨부파일
                </h3>
                <input
                  type="file"
                  multiple
                  accept="image/*,.pdf"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-emerald-500"
                  disabled={isEditMode}
                />
              </div>

              {/* 버튼 그룹 */}
              <div className="flex gap-3 border-t border-gray-200 pt-4">
                <button
                  onClick={() => setShowGrievanceModal(false)}
                  className="flex-1 rounded-lg bg-gray-100 px-4 py-2 text-gray-700 hover:bg-gray-200"
                >
                  {isEditMode ? '닫기' : '취소'}
                </button>
                {!isEditMode && (
                  <button
                    onClick={() => {
                      alert('접수되었습니다.');
                      setShowGrievanceModal(false);
                    }}
                    className="flex-1 rounded-lg bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700"
                  >
                    <i className="ri-send-plane-line mr-1"></i>
                    접수
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 처리 시작 모달 */}
      {showProcessModal && selectedGrievance && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50"
          onClick={() => setShowProcessModal(false)}
        >
          <div className="w-full max-w-2xl rounded-xl bg-white shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between rounded-t-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-4">
              <h3 className="text-xl font-bold text-white">고충 처리 시작</h3>
              <button
                onClick={() => setShowProcessModal(false)}
                className="rounded-full p-1 text-white hover:bg-white/20"
              >
                <i className="ri-close-line text-2xl"></i>
              </button>
            </div>
            <div className="p-6">
              <div className="mb-4 rounded-lg bg-gray-50 p-4">
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-gray-600">신고자:</span>
                    <span className="ml-2 font-medium">
                      {selectedGrievance.reporterName} ({selectedGrievance.reporterType})
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">분류:</span>
                    <span className="ml-2 font-medium">{selectedGrievance.category}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">제목:</span>
                    <span className="ml-2 font-medium">{selectedGrievance.title}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">처리자 *</label>
                  <input
                    type="text"
                    placeholder="처리 담당자 이름"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">처리 시작일 *</label>
                  <input
                    type="date"
                    defaultValue={new Date().toISOString().split('T')[0]}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">초기 대응 계획</label>
                  <textarea
                    rows={4}
                    placeholder="초기 대응 계획을 입력하세요"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-emerald-500"
                  ></textarea>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setShowProcessModal(false)}
                  className="flex-1 rounded-lg bg-gray-100 px-4 py-2 text-gray-700 hover:bg-gray-200"
                >
                  취소
                </button>
                <button
                  onClick={() => {
                    alert('처리가 시작되었습니다.');
                    setShowProcessModal(false);
                  }}
                  className="flex-1 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                  <i className="ri-play-line mr-1"></i>
                  처리 시작
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GrievanceManagement;
