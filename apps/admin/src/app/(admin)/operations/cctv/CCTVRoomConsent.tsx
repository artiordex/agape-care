/**
 * Description : CCTVRoomConsent.tsx - ?? CCTVRoomConsent UI ????
 * Author : Shiwoo Min
 * Date : 2026-02-18
 */

'use client';

import { useState } from 'react';

interface RoomConsent {
  id: string;
  residentName: string;
  room: string;
  consentType: '본인' | '보호자';
  guardianName?: string;
  guardianRelation?: string;
  scope: string;
  reason: string;
  consentDate: string;
  signature?: string;
  attachments?: string[];
  status: 'active' | 'expired' | 'revoked';
  notes: string;
}

const CCTVRoomConsent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'expired' | 'revoked'>('all');
  const [selectedConsent, setSelectedConsent] = useState<RoomConsent | null>(null);
  const [showConsentModal, setShowConsentModal] = useState(false);
  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  // 샘플 데이터
  const [consents] = useState<RoomConsent[]>([
    {
      id: 'RC001',
      residentName: '김영희',
      room: '101호',
      consentType: '보호자',
      guardianName: '김철수',
      guardianRelation: '아들',
      scope: '침실 내부 전체',
      reason: '낙상 예방 및 안전 모니터링',
      consentDate: '2024-01-10',
      status: 'active',
      notes: '',
    },
    {
      id: 'RC002',
      residentName: '이철수',
      room: '102호',
      consentType: '본인',
      scope: '침실 출입구',
      reason: '안전 관리',
      consentDate: '2024-01-15',
      status: 'active',
      notes: '',
    },
    {
      id: 'RC003',
      residentName: '박순자',
      room: '103호',
      consentType: '보호자',
      guardianName: '박민수',
      guardianRelation: '딸',
      scope: '침실 내부 전체',
      reason: '건강 상태 모니터링',
      consentDate: '2023-12-20',
      status: 'expired',
      notes: '재동의 필요',
    },
  ]);

  // 필터링된 동의서 목록
  const filteredConsents = consents.filter(consent => {
    const matchesSearch = consent.residentName.includes(searchTerm) || consent.room.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || consent.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handlePrint = (consent: RoomConsent) => {
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
            <i className="ri-file-shield-line text-emerald-600"></i>
            CCTV 침실 촬영 동의서
          </h2>
          <p className="text-sm text-gray-500">침실 내 CCTV 촬영에 대한 동의서 관리</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleExport}
            className="flex items-center gap-2 whitespace-nowrap rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-700 transition-colors hover:bg-gray-50"
          >
            <i className="ri-file-pdf-line"></i>
            PDF 다운로드
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 divide-x divide-gray-100 border-b border-gray-100">
        <div className="p-6 text-center">
          <p className="mb-1 text-xs font-bold uppercase tracking-widest text-gray-400">TOTAL</p>
          <p className="text-2xl font-black text-gray-900">{consents.length}</p>
        </div>
        <div className="p-6 text-center">
          <p className="mb-1 text-xs font-bold uppercase tracking-widest text-emerald-500">VALID</p>
          <p className="text-2xl font-black text-emerald-600">{consents.filter(c => c.status === 'active').length}</p>
        </div>
        <div className="p-6 text-center">
          <p className="mb-1 text-xs font-bold uppercase tracking-widest text-orange-500">EXPIRED</p>
          <p className="text-2xl font-black text-orange-600">{consents.filter(c => c.status === 'expired').length}</p>
        </div>
        <div className="p-6 text-center">
          <p className="mb-1 text-xs font-bold uppercase tracking-widest text-red-500">REVOKED</p>
          <p className="text-2xl font-black text-red-600">{consents.filter(c => c.status === 'revoked').length}</p>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-6 flex gap-3">
          <div className="relative flex-1">
            <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
            <input
              type="text"
              placeholder="수급자명, 방호실 검색..."
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
            <option value="active">유효</option>
            <option value="expired">만료</option>
            <option value="revoked">철회</option>
          </select>
          <button
            onClick={() => {
              setSelectedConsent(null);
              setIsEditMode(false);
              setShowConsentModal(true);
            }}
            className="flex items-center gap-2 whitespace-nowrap rounded-lg bg-emerald-600 px-4 py-2 text-sm font-bold text-white shadow-sm transition-all hover:bg-emerald-700"
          >
            <i className="ri-add-line"></i>
            동의서 작성
          </button>
        </div>

        <div className="overflow-x-auto rounded-lg border border-gray-100">
          <table className="w-full text-left">
            <thead className="border-b border-gray-100 bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-[11px] font-black uppercase text-gray-400">수급자</th>
                <th className="px-4 py-3 text-[11px] font-black uppercase text-gray-400">방호실</th>
                <th className="px-4 py-3 text-[11px] font-black uppercase text-gray-400">동의자</th>
                <th className="px-4 py-3 text-[11px] font-black uppercase text-gray-400">촬영범위</th>
                <th className="px-4 py-3 text-[11px] font-black uppercase text-gray-400">사유</th>
                <th className="px-4 py-3 text-[11px] font-black uppercase text-gray-400">동의일</th>
                <th className="px-4 py-3 text-[11px] font-black uppercase text-gray-400">상태</th>
                <th className="px-4 py-3 text-center text-[11px] font-black uppercase text-gray-400">관리</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredConsents.map(consent => (
                <tr key={consent.id} className="transition-colors hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-bold text-gray-900">{consent.residentName}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{consent.room}</td>
                  <td className="px-4 py-3 text-[12px] text-gray-600">
                    {consent.consentType === '본인' ? (
                      <span className="font-bold text-emerald-600">본인</span>
                    ) : (
                      <div>
                        <div className="font-bold text-gray-900">{consent.guardianName}</div>
                        <div className="text-[10px] text-gray-400">({consent.guardianRelation})</div>
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 text-[12px] text-gray-600">{consent.scope}</td>
                  <td className="px-4 py-3 text-[12px] text-gray-600">{consent.reason}</td>
                  <td className="px-4 py-3 text-[12px] text-gray-600">{consent.consentDate}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-black uppercase ${
                        consent.status === 'active'
                          ? 'bg-emerald-100 text-emerald-700'
                          : consent.status === 'expired'
                            ? 'bg-orange-100 text-orange-700'
                            : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {consent.status === 'active' ? '유효' : consent.status === 'expired' ? '만료' : '철회'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex justify-center gap-1">
                      <button
                        onClick={() => handlePrint(consent)}
                        className="rounded p-1.5 text-blue-600 hover:bg-blue-50"
                      >
                        <i className="ri-printer-line"></i>
                      </button>
                      <button
                        onClick={() => {
                          setSelectedConsent(consent);
                          setIsEditMode(true);
                          setShowConsentModal(true);
                        }}
                        className="rounded p-1.5 text-emerald-600 hover:bg-emerald-50"
                      >
                        <i className="ri-edit-line"></i>
                      </button>
                      <button
                        onClick={() => {
                          if (confirm('정말 삭제하시겠습니까?')) {
                            alert('삭제되었습니다.');
                          }
                        }}
                        className="rounded p-1.5 text-red-500 hover:bg-red-50"
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

      {/* 동의서 작성/수정 모달 */}
      {showConsentModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={() => setShowConsentModal(false)}
        >
          <div
            className="animate-scaleIn max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="sticky top-0 flex items-center justify-between bg-emerald-600 px-6 py-4">
              <h2 className="text-lg font-black text-white">CCTV 침실 촬영 동의서 {isEditMode ? '수정' : '작성'}</h2>
              <button
                onClick={() => setShowConsentModal(false)}
                className="rounded-full p-1 text-white transition-colors hover:bg-white/20"
              >
                <i className="ri-close-line text-2xl"></i>
              </button>
            </div>
            <div className="p-8">
              {/* 수급자 정보 */}
              <div className="mb-8 rounded-xl border border-gray-100 bg-gray-50/50 p-6">
                <h3 className="mb-4 flex items-center gap-2 text-sm font-black uppercase text-gray-900">
                  <i className="ri-user-line text-emerald-600"></i>
                  수급자 정보
                </h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="mb-1.5 block text-xs font-black text-gray-500">수급자명 *</label>
                    <input
                      type="text"
                      defaultValue={selectedConsent?.residentName}
                      placeholder="수급자 이름"
                      className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm font-bold outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-black text-gray-500">방호실 *</label>
                    <input
                      type="text"
                      defaultValue={selectedConsent?.room}
                      placeholder="예: 101호"
                      className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm font-bold outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>
              </div>

              {/* 동의자 정보 */}
              <div className="mb-8 rounded-xl border border-gray-100 bg-gray-50/50 p-6">
                <h3 className="mb-4 flex items-center gap-2 text-sm font-black uppercase text-gray-900">
                  <i className="ri-shield-user-line text-emerald-600"></i>
                  동의자 정보
                </h3>
                <div className="mb-6">
                  <label className="mb-2 block text-xs font-black text-gray-500">동의자 구분 *</label>
                  <div className="flex gap-6">
                    <label className="flex cursor-pointer items-center gap-2">
                      <input
                        type="radio"
                        name="consentType"
                        value="본인"
                        defaultChecked={selectedConsent?.consentType === '본인'}
                        className="h-4 w-4 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className="text-sm font-bold text-gray-700">본인</span>
                    </label>
                    <label className="flex cursor-pointer items-center gap-2">
                      <input
                        type="radio"
                        name="consentType"
                        value="보호자"
                        defaultChecked={selectedConsent?.consentType === '보호자'}
                        className="h-4 w-4 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className="text-sm font-bold text-gray-700">보호자 (대리)</span>
                    </label>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="mb-1.5 block text-xs font-black text-gray-500">보호자명</label>
                    <input
                      type="text"
                      defaultValue={selectedConsent?.guardianName}
                      placeholder="보호자 이름"
                      className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm font-bold outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-black text-gray-500">관계</label>
                    <input
                      type="text"
                      defaultValue={selectedConsent?.guardianRelation}
                      placeholder="예: 아들, 딸"
                      className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm font-bold outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>
              </div>

              {/* 촬영 정보 */}
              <h3 className="mb-4 flex items-center gap-2 text-sm font-black uppercase text-gray-900">
                <i className="ri-camera-line text-emerald-600"></i>
                촬영 정보
              </h3>
              <div className="mb-8 space-y-4">
                <div>
                  <label className="mb-1.5 block text-xs font-black text-gray-500">촬영 범위 *</label>
                  <input
                    type="text"
                    defaultValue={selectedConsent?.scope}
                    placeholder="예: 침실 내부 전체, 침실 출입구"
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm font-bold outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-black text-gray-500">촬영 사유 *</label>
                  <textarea
                    defaultValue={selectedConsent?.reason}
                    rows={3}
                    placeholder="예: 낙상 예방 및 안전 모니터링"
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm font-bold outline-none focus:ring-2 focus:ring-emerald-500"
                  ></textarea>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-black text-gray-500">동의일 *</label>
                  <input
                    type="date"
                    defaultValue={selectedConsent?.consentDate}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm font-bold outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {/* 서명 */}
              <h3 className="mb-4 flex items-center gap-2 text-sm font-black uppercase text-gray-900">
                <i className="ri-quill-pen-line text-emerald-600"></i>
                서명
              </h3>
              <div className="mb-8 rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50/50 p-8 text-center">
                {selectedConsent?.signature ? (
                  <div>
                    <img src={selectedConsent.signature} alt="서명" className="mx-auto mb-4 max-h-32" />
                    <button
                      onClick={() => setShowSignatureModal(true)}
                      className="text-sm font-bold text-emerald-600 hover:text-emerald-700"
                    >
                      서명 다시하기
                    </button>
                  </div>
                ) : (
                  <div>
                    <i className="ri-quill-pen-line mb-2 text-4xl text-gray-300"></i>
                    <p className="mb-4 text-sm font-bold text-gray-400">동의자의 서명이 필요합니다</p>
                    <button
                      onClick={() => setShowSignatureModal(true)}
                      className="rounded-xl bg-emerald-600 px-6 py-2.5 text-sm font-black text-white shadow-lg hover:bg-emerald-700"
                    >
                      서명패드 열기
                    </button>
                  </div>
                )}
              </div>

              {/* 버튼 그룹 */}
              <div className="flex gap-3 border-t border-gray-100 pt-6">
                <button
                  onClick={() => setShowConsentModal(false)}
                  className="flex-1 rounded-xl bg-gray-100 px-4 py-3 text-sm font-black text-gray-500 hover:bg-gray-200"
                >
                  취소
                </button>
                <button
                  onClick={() => {
                    alert('저장되었습니다.');
                    setShowConsentModal(false);
                  }}
                  className="flex-1 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-black text-white shadow-xl hover:bg-emerald-700"
                >
                  <i className="ri-save-line mr-1"></i>
                  저장
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 서명 모달 */}
      {showSignatureModal && (
        <div
          className="z-60 fixed inset-0 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={() => setShowSignatureModal(false)}
        >
          <div
            className="animate-scaleIn w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between bg-emerald-600 px-6 py-4 text-white">
              <h3 className="text-lg font-black uppercase">전자 서명</h3>
              <button onClick={() => setShowSignatureModal(false)} className="rounded-full p-1 hover:bg-white/20">
                <i className="ri-close-line text-2xl"></i>
              </button>
            </div>
            <div className="p-8">
              <div
                className="overflow-hidden rounded-2xl border-2 border-gray-100 bg-white shadow-inner"
                style={{ height: '300px' }}
              >
                <div className="flex h-full w-full items-center justify-center text-gray-400">
                  <div className="text-center">
                    <i className="ri-quill-pen-line mb-2 text-6xl opacity-20"></i>
                    <p className="text-sm font-bold opacity-50">이 영역에 서명해주세요</p>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => alert('서명이 지워졌습니다.')}
                  className="rounded-xl bg-gray-100 px-6 py-3 text-sm font-black text-gray-500 transition-colors hover:bg-gray-200"
                >
                  <i className="ri-eraser-line mr-1"></i>
                  지우기
                </button>
                <button
                  onClick={() => {
                    alert('서명이 저장되었습니다.');
                    setShowSignatureModal(false);
                  }}
                  className="flex-1 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-black text-white shadow-lg transition-all hover:bg-emerald-700"
                >
                  <i className="ri-check-line mr-1"></i>
                  서명 완료
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CCTVRoomConsent;
