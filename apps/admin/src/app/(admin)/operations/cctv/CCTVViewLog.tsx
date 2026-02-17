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

  const handleApprove = (log: ViewLog) => {
    setSelectedLog(log);
    setShowApprovalModal(true);
  };

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
    <div className="animate-fadeIn overflow-hidden rounded-lg bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50/50 p-6">
        <div>
          <h2 className="flex items-center gap-2 text-lg font-bold text-gray-900">
            <i className="ri-eye-line text-emerald-600"></i>
            CCTV 영상정보 열람대장
          </h2>
          <p className="text-sm text-gray-500">영상 열람 요청 및 제공 기록 관리</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 whitespace-nowrap rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-700 transition-colors hover:bg-gray-50"
          >
            <i className="ri-printer-line"></i>
            출력
          </button>
          <button
            onClick={handleExport}
            className="flex items-center gap-2 whitespace-nowrap rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-700 transition-colors hover:bg-gray-50"
          >
            <i className="ri-file-pdf-line"></i>
            PDF
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 divide-x divide-gray-100 border-b border-gray-100">
        <div className="p-6 text-center">
          <p className="mb-1 text-xs font-bold uppercase tracking-widest text-gray-400">TOTAL</p>
          <p className="text-2xl font-black text-gray-900">{viewLogs.length}</p>
        </div>
        <div className="p-6 text-center">
          <p className="mb-1 text-xs font-bold uppercase tracking-widest text-emerald-500">APPROVED</p>
          <p className="text-2xl font-black text-emerald-600">{viewLogs.filter(l => l.status === 'approved').length}</p>
        </div>
        <div className="p-6 text-center">
          <p className="mb-1 text-xs font-bold uppercase tracking-widest text-orange-500">PENDING</p>
          <p className="text-2xl font-black text-orange-600">{viewLogs.filter(l => l.status === 'pending').length}</p>
        </div>
        <div className="p-6 text-center">
          <p className="mb-1 text-xs font-bold uppercase tracking-widest text-red-500">REJECTED</p>
          <p className="text-2xl font-black text-red-600">{viewLogs.filter(l => l.status === 'rejected').length}</p>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-6 flex gap-3">
          <div className="relative flex-1">
            <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
            <input
              type="text"
              placeholder="요청자, 장소 검색..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 text-sm outline-none focus:border-emerald-500"
            />
          </div>
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value as any)}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm outline-none focus:border-emerald-500"
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
            className="flex items-center gap-2 whitespace-nowrap rounded-lg bg-emerald-600 px-4 py-2 text-sm font-bold text-white shadow-sm transition-all hover:bg-emerald-700"
          >
            <i className="ri-add-line"></i>
            열람 요청 등록
          </button>
        </div>

        <div className="overflow-x-auto rounded-lg border border-gray-100">
          <table className="w-full text-left">
            <thead className="border-b border-gray-100 bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-[11px] font-black uppercase text-gray-400">요청일</th>
                <th className="px-4 py-3 text-[11px] font-black uppercase text-gray-400">요청자</th>
                <th className="px-4 py-3 text-[11px] font-black uppercase text-gray-400">구분</th>
                <th className="px-4 py-3 text-[11px] font-black uppercase text-gray-400">대상기간</th>
                <th className="px-4 py-3 text-[11px] font-black uppercase text-gray-400">장소</th>
                <th className="px-4 py-3 text-[11px] font-black uppercase text-gray-400">사유</th>
                <th className="px-4 py-3 text-center text-[11px] font-black uppercase text-gray-400">상태</th>
                <th className="px-4 py-3 text-center text-[11px] font-black uppercase text-gray-400">관리</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredLogs.map(log => (
                <tr key={log.id} className="transition-colors hover:bg-gray-50">
                  <td className="px-4 py-3 font-mono text-[12px] text-gray-900">{log.requestDate}</td>
                  <td className="px-4 py-3 text-[13px] font-bold text-gray-900">
                    <div>{log.requesterName}</div>
                    <div className="text-[10px] font-medium text-gray-400">{log.requesterContact}</div>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-black uppercase tracking-tighter ${
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
                  <td className="px-4 py-3 text-[12px] leading-tight text-gray-600">{log.targetPeriod}</td>
                  <td className="px-4 py-3 text-[12px] font-bold text-gray-600">{log.targetLocation}</td>
                  <td className="px-4 py-3 text-[12px] text-gray-600">{log.reason}</td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-black uppercase ${
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
                    <div className="flex justify-center gap-1">
                      {log.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleApprove(log)}
                            className="rounded p-1.5 text-emerald-600 hover:bg-emerald-50"
                            title="승인"
                          >
                            <i className="ri-check-line"></i>
                          </button>
                          <button
                            onClick={() => handleReject(log)}
                            className="rounded p-1.5 text-red-500 hover:bg-red-50"
                            title="반려"
                          >
                            <i className="ri-close-line"></i>
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => {
                          setSelectedLog(log);
                          setIsEditMode(true);
                          setShowRequestModal(true);
                        }}
                        className="rounded p-1.5 text-blue-600 hover:bg-blue-50"
                        title="상세조회"
                      >
                        <i className="ri-eye-line"></i>
                      </button>
                      <button
                        onClick={() => {
                          if (confirm('정말 삭제하시겠습니까?')) {
                            alert('삭제되었습니다.');
                          }
                        }}
                        className="rounded p-1.5 text-gray-400 hover:bg-gray-100"
                        title="삭제"
                      >
                        <i className="ri-delete-bin-line"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 요청 등록/상세 모달 */}
      {showRequestModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={() => setShowRequestModal(false)}
        >
          <div
            className="animate-scaleIn max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="sticky top-0 flex items-center justify-between bg-emerald-600 px-6 py-4">
              <h2 className="text-lg font-black uppercase tracking-tighter text-white">
                영상정보 열람 {isEditMode ? '상세 정보' : '신규 요청 등록'}
              </h2>
              <button
                onClick={() => setShowRequestModal(false)}
                className="rounded-full p-1 text-white transition-colors hover:bg-white/20"
              >
                <i className="ri-close-line text-2xl"></i>
              </button>
            </div>
            <div className="p-8">
              {/* 요청자 정보 */}
              <div className="mb-6">
                <h3 className="mb-4 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-400">
                  <i className="ri-user-line text-emerald-600"></i>
                  REQUESTER INFO
                </h3>
                <div className="grid grid-cols-2 gap-6 rounded-xl border border-gray-100 bg-gray-50/50 p-6">
                  <div className="col-span-1">
                    <label className="mb-1 block text-[10px] font-black uppercase text-gray-400">요청자 구분 *</label>
                    <select
                      defaultValue={selectedLog?.requesterType}
                      className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm font-bold outline-none focus:ring-2 focus:ring-emerald-500"
                      disabled={isEditMode}
                    >
                      <option value="입소자">입소자</option>
                      <option value="보호자">보호자</option>
                      <option value="수사기관">수사기관</option>
                      <option value="내부">내부</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-1 block text-[10px] font-black uppercase text-gray-400">요청일 *</label>
                    <input
                      type="date"
                      defaultValue={selectedLog?.requestDate}
                      className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm font-bold outline-none focus:ring-2 focus:ring-emerald-500"
                      disabled={isEditMode}
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-[10px] font-black uppercase text-gray-400">요청자명 *</label>
                    <input
                      type="text"
                      defaultValue={selectedLog?.requesterName}
                      placeholder="이름 또는 기관명"
                      className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm font-bold outline-none focus:ring-2 focus:ring-emerald-500"
                      disabled={isEditMode}
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-[10px] font-black uppercase text-gray-400">연락처 *</label>
                    <input
                      type="text"
                      defaultValue={selectedLog?.requesterContact}
                      placeholder="전화번호"
                      className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm font-bold outline-none focus:ring-2 focus:ring-emerald-500"
                      disabled={isEditMode}
                    />
                  </div>
                </div>
              </div>

              {/* 열람 대상 */}
              <div className="mb-6">
                <h3 className="mb-4 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-400">
                  <i className="ri-camera-line text-emerald-600"></i>
                  TARGET VIDEO INFO
                </h3>
                <div className="space-y-4 rounded-xl border border-gray-100 bg-gray-50/50 p-6">
                  <div>
                    <label className="mb-1 block text-[10px] font-black uppercase text-gray-400">대상 기간 *</label>
                    <input
                      type="text"
                      defaultValue={selectedLog?.targetPeriod}
                      placeholder="예: 2024-01-08 14:00 ~ 2024-01-08 16:00"
                      className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm font-bold outline-none focus:ring-2 focus:ring-emerald-500"
                      disabled={isEditMode}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-1 block text-[10px] font-black uppercase text-gray-400">장소 *</label>
                      <input
                        type="text"
                        defaultValue={selectedLog?.targetLocation}
                        placeholder="예: 1층 복도"
                        className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm font-bold outline-none focus:ring-2 focus:ring-emerald-500"
                        disabled={isEditMode}
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-[10px] font-black uppercase text-gray-400">장치 *</label>
                      <input
                        type="text"
                        defaultValue={selectedLog?.targetDevice}
                        placeholder="예: CCTV002"
                        className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm font-bold outline-none focus:ring-2 focus:ring-emerald-500"
                        disabled={isEditMode}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="mb-1 block text-[10px] font-black uppercase text-gray-400">요청 사유 *</label>
                    <textarea
                      defaultValue={selectedLog?.reason}
                      rows={3}
                      placeholder="열람 요청 사유를 상세히 입력하세요"
                      className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm font-bold outline-none focus:ring-2 focus:ring-emerald-500"
                      disabled={isEditMode}
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* 버튼 그룹 */}
              <div className="flex gap-3 border-t border-gray-100 pt-6">
                <button
                  onClick={() => setShowRequestModal(false)}
                  className="flex-1 rounded-xl bg-gray-100 px-4 py-3 text-sm font-black text-gray-500 transition-colors hover:bg-gray-200"
                >
                  {isEditMode ? '닫기' : '취소'}
                </button>
                {!isEditMode && (
                  <button
                    onClick={() => {
                      alert('요청이 등록되었습니다.');
                      setShowRequestModal(false);
                    }}
                    className="flex-1 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-black text-white shadow-xl transition-all hover:bg-emerald-700"
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

      {/* 승인 처리 모달 (생략 - 필요시 추가 가능) */}
      {showApprovalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-2xl">
            <h2 className="mb-4 text-xl font-black">열람 요청 승인 처리</h2>
            <p className="mb-6 text-sm text-gray-600">해당 요청을 승인하시겠습니까? 승인 사유를 입력해주세요.</p>
            <textarea
              className="mb-6 w-full rounded-xl border p-4 outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="승인 사유 입력..."
            ></textarea>
            <div className="flex gap-3">
              <button
                onClick={() => setShowApprovalModal(false)}
                className="flex-1 rounded-xl bg-gray-100 py-3 font-bold"
              >
                취소
              </button>
              <button
                onClick={() => {
                  alert('승인되었습니다.');
                  setShowApprovalModal(false);
                }}
                className="flex-1 rounded-xl bg-emerald-600 py-3 font-bold text-white"
              >
                승인 완료
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CCTVViewLog;
