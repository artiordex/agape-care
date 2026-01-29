'use client';

import { useState } from 'react';

interface ViewLog {
  id: string;
  requestDate: string;
  requesterType: '입소자' | '보호자' | '수사기관' | '내부';
  requesterName: string;
  requesterContact: string;
  targetPeriod: string;
  targetLocation: string;
  targetDevice: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  approver?: string;
  approvalDate?: string;
  approvalReason?: string;
  viewDate?: string;
  viewMethod?: '현장열람' | '제공' | '반출';
  format?: string;
  copies?: number;
  processor?: string;
  result?: string;
  attachments?: string[];
}

const CCTVViewLog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [selectedLog, setSelectedLog] = useState<ViewLog | null>(null);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  // 샘플 데이터
  const [viewLogs] = useState<ViewLog[]>([
    {
      id: 'VL001',
      requestDate: '2024-01-10',
      requesterType: '보호자',
      requesterName: '김철수',
      requesterContact: '010-1234-5678',
      targetPeriod: '2024-01-08 14:00 ~ 2024-01-08 16:00',
      targetLocation: '1층 복도',
      targetDevice: 'CCTV002',
      reason: '낙상 사고 확인',
      status: 'approved',
      approver: '이시설장',
      approvalDate: '2024-01-10',
      approvalReason: '정당한 사유로 승인',
      viewDate: '2024-01-11',
      viewMethod: '현장열람',
      processor: '김보안',
      result: '정상 열람 완료',
    },
    {
      id: 'VL002',
      requestDate: '2024-01-15',
      requesterType: '수사기관',
      requesterName: '○○경찰서',
      requesterContact: '02-1234-5678',
      targetPeriod: '2024-01-14 전체',
      targetLocation: '1층 현관',
      targetDevice: 'CCTV001',
      reason: '사건 수사 관련',
      status: 'approved',
      approver: '이시설장',
      approvalDate: '2024-01-15',
      approvalReason: '공문 접수 확인',
      viewDate: '2024-01-15',
      viewMethod: '제공',
      format: 'USB',
      copies: 1,
      processor: '김보안',
      result: '영상 제공 완료',
    },
    {
      id: 'VL003',
      requestDate: '2024-01-20',
      requesterType: '입소자',
      requesterName: '박순자',
      requesterContact: '010-9876-5432',
      targetPeriod: '2024-01-19 09:00 ~ 2024-01-19 12:00',
      targetLocation: '2층 복도',
      targetDevice: 'CCTV003',
      reason: '개인 물품 분실 확인',
      status: 'pending',
    },
  ]);

  // 필터링된 열람대장 목록
  const filteredLogs = viewLogs.filter(log => {
    const matchesSearch = log.requesterName.includes(searchTerm) || log.targetLocation.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || log.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // 승인 처리
  const handleApprove = (log: ViewLog) => {
    setSelectedLog(log);
    setShowApprovalModal(true);
  };

  // 반려 처리
  const handleReject = (log: ViewLog) => {
    const reason = prompt('반려 사유를 입력하세요:');
    if (reason) {
      alert('반려 처리되었습니다.');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExport = () => {
    alert('PDF 다운로드 기능은 백엔드 연동 후 구현됩니다.');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* 헤더 */}
      <div className="mb-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h1 className="flex items-center gap-3 text-2xl font-bold text-gray-900">
              <i className="ri-eye-line text-emerald-600"></i>
              CCTV 영상정보 열람대장
            </h1>
            <p className="mt-1 text-sm text-gray-600">CCTV 영상 열람 요청 및 제공 기록을 관리합니다</p>
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
              <i className="ri-file-pdf-line"></i>
              PDF
            </button>
          </div>
        </div>

        {/* 통계 카드 */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">총 요청</p>
                <p className="mt-1 text-2xl font-bold text-gray-900">{viewLogs.length}건</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                <i className="ri-file-list-3-line text-2xl text-blue-600"></i>
              </div>
            </div>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">승인</p>
                <p className="mt-1 text-2xl font-bold text-emerald-600">
                  {viewLogs.filter(l => l.status === 'approved').length}건
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100">
                <i className="ri-checkbox-circle-line text-2xl text-emerald-600"></i>
              </div>
            </div>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">대기중</p>
                <p className="mt-1 text-2xl font-bold text-orange-600">
                  {viewLogs.filter(l => l.status === 'pending').length}건
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100">
                <i className="ri-time-line text-2xl text-orange-600"></i>
              </div>
            </div>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">반려</p>
                <p className="mt-1 text-2xl font-bold text-red-600">
                  {viewLogs.filter(l => l.status === 'rejected').length}건
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-100">
                <i className="ri-close-circle-line text-2xl text-red-600"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 열람대장 목록 */}
      <div className="rounded-lg bg-white shadow-sm">
        <div className="p-6">
          {/* 필터 바 */}
          <div className="mb-6 flex gap-3">
            <div className="flex-1">
              <input
                type="text"
                placeholder="요청자, 장소 검색..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value as any)}
              className="rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-emerald-500"
            >
              <option value="all">전체 상태</option>
              <option value="pending">대기중</option>
              <option value="approved">승인</option>
              <option value="rejected">반려</option>
            </select>
            <button
              onClick={() => {
                setSelectedLog(null);
                setIsEditMode(false);
                setShowRequestModal(true);
              }}
              className="flex items-center gap-2 whitespace-nowrap rounded-lg bg-emerald-600 px-4 py-2 text-white transition-colors hover:bg-emerald-700"
            >
              <i className="ri-add-line"></i>
              요청 등록
            </button>
          </div>

          {/* 테이블 */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-gray-200 bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-600">요청일</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-600">요청자</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-600">구분</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-600">대상기간</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-600">장소</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-600">사유</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-600">상태</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold uppercase text-gray-600">관리</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredLogs.map(log => (
                  <tr key={log.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900">{log.requestDate}</td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">
                      <div>{log.requesterName}</div>
                      <div className="text-xs text-gray-500">{log.requesterContact}</div>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                          log.requesterType === '입소자'
                            ? 'bg-blue-100 text-blue-700'
                            : log.requesterType === '보호자'
                              ? 'bg-green-100 text-green-700'
                              : log.requesterType === '수사기관'
                                ? 'bg-purple-100 text-purple-700'
                                : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {log.requesterType}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{log.targetPeriod}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{log.targetLocation}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{log.reason}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                          log.status === 'approved'
                            ? 'bg-emerald-100 text-emerald-700'
                            : log.status === 'pending'
                              ? 'bg-orange-100 text-orange-700'
                              : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {log.status === 'approved' ? '승인' : log.status === 'pending' ? '대기중' : '반려'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      {log.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleApprove(log)}
                            className="mr-3 text-emerald-600 hover:text-emerald-700"
                          >
                            <i className="ri-check-line text-lg"></i>
                          </button>
                          <button onClick={() => handleReject(log)} className="mr-3 text-red-600 hover:text-red-700">
                            <i className="ri-close-line text-lg"></i>
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => {
                          setSelectedLog(log);
                          setIsEditMode(true);
                          setShowRequestModal(true);
                        }}
                        className="mr-3 text-blue-600 hover:text-blue-700"
                      >
                        <i className="ri-eye-line text-lg"></i>
                      </button>
                      <button
                        onClick={() => {
                          if (confirm('정말 삭제하시겠습니까?')) {
                            alert('삭제되었습니다.');
                          }
                        }}
                        className="text-gray-600 hover:text-gray-700"
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

      {/* 요청 등록/상세 모달 */}
      {showRequestModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={() => setShowRequestModal(false)}
        >
          <div
            className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-xl bg-white shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="sticky top-0 flex items-center justify-between bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-4">
              <h2 className="text-xl font-bold text-white">영상정보 열람 {isEditMode ? '상세' : '요청'}</h2>
              <button
                onClick={() => setShowRequestModal(false)}
                className="rounded-full p-1 text-white hover:bg-white/20"
              >
                <i className="ri-close-line text-2xl"></i>
              </button>
            </div>
            <div className="p-6">
              {/* 요청자 정보 */}
              <div className="mb-6">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
                  <i className="ri-user-line text-emerald-600"></i>
                  요청자 정보
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">요청자 구분 *</label>
                    <select
                      defaultValue={selectedLog?.requesterType}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-emerald-500"
                      disabled={isEditMode}
                    >
                      <option value="입소자">입소자</option>
                      <option value="보호자">보호자</option>
                      <option value="수사기관">수사기관</option>
                      <option value="내부">내부</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">요청일 *</label>
                    <input
                      type="date"
                      defaultValue={selectedLog?.requestDate}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-emerald-500"
                      disabled={isEditMode}
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">요청자명 *</label>
                    <input
                      type="text"
                      defaultValue={selectedLog?.requesterName}
                      placeholder="이름 또는 기관명"
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-emerald-500"
                      disabled={isEditMode}
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">연락처 *</label>
                    <input
                      type="text"
                      defaultValue={selectedLog?.requesterContact}
                      placeholder="전화번호"
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-emerald-500"
                      disabled={isEditMode}
                    />
                  </div>
                </div>
              </div>

              {/* 열람 대상 */}
              <div className="mb-6">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
                  <i className="ri-camera-line text-emerald-600"></i>
                  열람 대상
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">대상 기간 *</label>
                    <input
                      type="text"
                      defaultValue={selectedLog?.targetPeriod}
                      placeholder="예: 2024-01-08 14:00 ~ 2024-01-08 16:00"
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-emerald-500"
                      disabled={isEditMode}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">장소 *</label>
                      <input
                        type="text"
                        defaultValue={selectedLog?.targetLocation}
                        placeholder="예: 1층 복도"
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-emerald-500"
                        disabled={isEditMode}
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">장치 *</label>
                      <input
                        type="text"
                        defaultValue={selectedLog?.targetDevice}
                        placeholder="예: CCTV002"
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-emerald-500"
                        disabled={isEditMode}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">요청 사유 *</label>
                    <textarea
                      defaultValue={selectedLog?.reason}
                      rows={3}
                      placeholder="열람 요청 사유를 상세히 입력하세요"
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-emerald-500"
                      disabled={isEditMode}
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* 승인 정보 (승인된 경우만 표시) */}
              {selectedLog?.status === 'approved' && (
                <div className="mb-6">
                  <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
                    <i className="ri-shield-check-line text-emerald-600"></i>
                    승인 정보
                  </h3>
                  <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">승인자</label>
                        <input
                          type="text"
                          value={selectedLog.approver}
                          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2"
                          readOnly
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">승인일</label>
                        <input
                          type="text"
                          value={selectedLog.approvalDate}
                          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2"
                          readOnly
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="mb-1 block text-sm font-medium text-gray-700">승인 사유</label>
                        <textarea
                          value={selectedLog.approvalReason}
                          rows={2}
                          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2"
                          readOnly
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 열람/제공 정보 (승인된 경우만 표시) */}
              {selectedLog?.status === 'approved' && selectedLog.viewDate && (
                <div className="mb-6">
                  <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
                    <i className="ri-eye-line text-emerald-600"></i>
                    열람/제공 정보
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">열람일</label>
                      <input
                        type="text"
                        value={selectedLog.viewDate}
                        className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">열람 방식</label>
                      <input
                        type="text"
                        value={selectedLog.viewMethod}
                        className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2"
                        readOnly
                      />
                    </div>
                    {selectedLog.format && (
                      <>
                        <div>
                          <label className="mb-1 block text-sm font-medium text-gray-700">제공 포맷</label>
                          <input
                            type="text"
                            value={selectedLog.format}
                            className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2"
                            readOnly
                          />
                        </div>
                        <div>
                          <label className="mb-1 block text-sm font-medium text-gray-700">복사본 수</label>
                          <input
                            type="text"
                            value={`${selectedLog.copies}개`}
                            className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2"
                            readOnly
                          />
                        </div>
                      </>
                    )}
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">처리자</label>
                      <input
                        type="text"
                        value={selectedLog.processor}
                        className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2"
                        readOnly
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="mb-1 block text-sm font-medium text-gray-700">처리 결과</label>
                      <textarea
                        value={selectedLog.result}
                        rows={2}
                        className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2"
                        readOnly
                      ></textarea>
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
                <p className="mt-1 text-xs text-gray-500">공문, 신분증 사본 등을 첨부할 수 있습니다</p>
              </div>

              {/* 버튼 그룹 */}
              <div className="flex gap-3 border-t border-gray-200 pt-4">
                <button
                  onClick={() => setShowRequestModal(false)}
                  className="flex-1 rounded-lg bg-gray-100 px-4 py-2 text-gray-700 hover:bg-gray-200"
                >
                  {isEditMode ? '닫기' : '취소'}
                </button>
                {!isEditMode && (
                  <button
                    onClick={() => {
                      alert('요청이 등록되었습니다.');
                      setShowRequestModal(false);
                    }}
                    className="flex-1 rounded-lg bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700"
                  >
                    <i className="ri-send-plane-line mr-1"></i>
                    요청 등록
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 승인 처리 모달 */}
      {showApprovalModal && selectedLog && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50"
          onClick={() => setShowApprovalModal(false)}
        >
          <div className="w-full max-w-2xl rounded-xl bg-white shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between rounded-t-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-4">
              <h3 className="text-xl font-bold text-white">열람 요청 승인</h3>
              <button
                onClick={() => setShowApprovalModal(false)}
                className="rounded-full p-1 text-white hover:bg-white/20"
              >
                <i className="ri-close-line text-2xl"></i>
              </button>
            </div>
            <div className="p-6">
              <div className="mb-4 rounded-lg bg-gray-50 p-4">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-gray-600">요청자:</span>
                    <span className="ml-2 font-medium">{selectedLog.requesterName}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">구분:</span>
                    <span className="ml-2 font-medium">{selectedLog.requesterType}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-gray-600">대상:</span>
                    <span className="ml-2 font-medium">
                      {selectedLog.targetLocation} ({selectedLog.targetPeriod})
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">승인 사유 *</label>
                  <textarea
                    rows={3}
                    placeholder="승인 사유를 입력하세요"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-emerald-500"
                  ></textarea>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">열람 예정일 *</label>
                  <input
                    type="date"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">열람 방식 *</label>
                  <select className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-emerald-500">
                    <option value="현장열람">현장열람</option>
                    <option value="제공">제공</option>
                    <option value="반출">반출</option>
                  </select>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setShowApprovalModal(false)}
                  className="flex-1 rounded-lg bg-gray-100 px-4 py-2 text-gray-700 hover:bg-gray-200"
                >
                  취소
                </button>
                <button
                  onClick={() => {
                    alert('승인 처리되었습니다.');
                    setShowApprovalModal(false);
                  }}
                  className="flex-1 rounded-lg bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700"
                >
                  <i className="ri-check-line mr-1"></i>
                  승인
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CCTVViewLog;
