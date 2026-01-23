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
      notes: ''
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
      notes: ''
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
      notes: '재동의 필요'
    }
  ]);

  // 필터링된 동의서 목록
  const filteredConsents = consents.filter(consent => {
    const matchesSearch = consent.residentName.includes(searchTerm) || 
                         consent.room.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || consent.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handlePrint = (consent: RoomConsent) => {
    // 동의서 서식 출력
    window.print();
  };

  const handleExport = () => {
    alert('PDF 다운로드 기능은 백엔드 연동 후 구현됩니다.');
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* 헤더 */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              <i className="ri-file-shield-line text-emerald-600"></i>
              CCTV 침실 촬영 동의서
            </h1>
            <p className="text-sm text-gray-600 mt-1">침실 내 CCTV 촬영에 대한 동의서를 관리합니다</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleExport}
              className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 whitespace-nowrap"
            >
              <i className="ri-file-pdf-line"></i>
              PDF
            </button>
          </div>
        </div>

        {/* 통계 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">총 동의서</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{consents.length}건</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <i className="ri-file-list-3-line text-2xl text-blue-600"></i>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">유효</p>
                <p className="text-2xl font-bold text-emerald-600 mt-1">
                  {consents.filter(c => c.status === 'active').length}건
                </p>
              </div>
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                <i className="ri-checkbox-circle-line text-2xl text-emerald-600"></i>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">만료</p>
                <p className="text-2xl font-bold text-orange-600 mt-1">
                  {consents.filter(c => c.status === 'expired').length}건
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <i className="ri-time-line text-2xl text-orange-600"></i>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">철회</p>
                <p className="text-2xl font-bold text-red-600 mt-1">
                  {consents.filter(c => c.status === 'revoked').length}건
                </p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <i className="ri-close-circle-line text-2xl text-red-600"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 동의서 목록 */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6">
          {/* 필터 바 */}
          <div className="flex gap-3 mb-6">
            <div className="flex-1">
              <input
                type="text"
                placeholder="수급자명, 방호실 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
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
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2 whitespace-nowrap"
            >
              <i className="ri-add-line"></i>
              동의서 작성
            </button>
          </div>

          {/* 테이블 */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">수급자</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">방호실</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">동의자</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">촬영범위</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">사유</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">동의일</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">상태</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase">관리</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredConsents.map((consent) => (
                  <tr key={consent.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{consent.residentName}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{consent.room}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {consent.consentType === '본인' ? (
                        <span className="text-emerald-600 font-medium">본인</span>
                      ) : (
                        <div>
                          <div className="font-medium">{consent.guardianName}</div>
                          <div className="text-xs text-gray-500">({consent.guardianRelation})</div>
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{consent.scope}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{consent.reason}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{consent.consentDate}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        consent.status === 'active' ? 'bg-emerald-100 text-emerald-700' :
                        consent.status === 'expired' ? 'bg-orange-100 text-orange-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {consent.status === 'active' ? '유효' :
                         consent.status === 'expired' ? '만료' : '철회'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => handlePrint(consent)}
                        className="text-blue-600 hover:text-blue-700 mr-3"
                      >
                        <i className="ri-printer-line text-lg"></i>
                      </button>
                      <button
                        onClick={() => {
                          setSelectedConsent(consent);
                          setIsEditMode(true);
                          setShowConsentModal(true);
                        }}
                        className="text-emerald-600 hover:text-emerald-700 mr-3"
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

      {/* 동의서 작성/수정 모달 */}
      {showConsentModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowConsentModal(false)}>
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">
                CCTV 침실 촬영 동의서 {isEditMode ? '수정' : '작성'}
              </h2>
              <button onClick={() => setShowConsentModal(false)} className="text-white hover:bg-white/20 rounded-full p-1">
                <i className="ri-close-line text-2xl"></i>
              </button>
            </div>
            <div className="p-6">
              {/* 수급자 정보 */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <i className="ri-user-line text-emerald-600"></i>
                  수급자 정보
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">수급자명 *</label>
                    <input
                      type="text"
                      defaultValue={selectedConsent?.residentName}
                      placeholder="수급자 이름"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">방호실 *</label>
                    <input
                      type="text"
                      defaultValue={selectedConsent?.room}
                      placeholder="예: 101호"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>
              </div>

              {/* 동의자 정보 */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <i className="ri-shield-user-line text-emerald-600"></i>
                  동의자 정보
                </h3>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">동의자 구분 *</label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="consentType"
                        value="본인"
                        defaultChecked={selectedConsent?.consentType === '본인'}
                        className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className="text-sm text-gray-700">본인</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="consentType"
                        value="보호자"
                        defaultChecked={selectedConsent?.consentType === '보호자'}
                        className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className="text-sm text-gray-700">보호자 (대리)</span>
                    </label>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">보호자명</label>
                    <input
                      type="text"
                      defaultValue={selectedConsent?.guardianName}
                      placeholder="보호자 이름"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">관계</label>
                    <input
                      type="text"
                      defaultValue={selectedConsent?.guardianRelation}
                      placeholder="예: 아들, 딸"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>
              </div>

              {/* 촬영 정보 */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <i className="ri-camera-line text-emerald-600"></i>
                  촬영 정보
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">촬영 범위 *</label>
                    <input
                      type="text"
                      defaultValue={selectedConsent?.scope}
                      placeholder="예: 침실 내부 전체, 침실 출입구"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">촬영 사유 *</label>
                    <textarea
                      defaultValue={selectedConsent?.reason}
                      rows={3}
                      placeholder="예: 낙상 예방 및 안전 모니터링"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">동의일 *</label>
                    <input
                      type="date"
                      defaultValue={selectedConsent?.consentDate}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>
              </div>

              {/* 서명 */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <i className="ri-quill-pen-line text-emerald-600"></i>
                  서명
                </h3>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  {selectedConsent?.signature ? (
                    <div>
                      <img src={selectedConsent.signature} alt="서명" className="mx-auto max-h-32" />
                      <button
                        onClick={() => setShowSignatureModal(true)}
                        className="mt-3 text-sm text-emerald-600 hover:text-emerald-700"
                      >
                        서명 다시하기
                      </button>
                    </div>
                  ) : (
                    <div>
                      <i className="ri-quill-pen-line text-4xl text-gray-400 mb-2"></i>
                      <p className="text-sm text-gray-600 mb-3">동의자의 서명이 필요합니다</p>
                      <button
                        onClick={() => setShowSignatureModal(true)}
                        className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
                      >
                        서명하기
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* 첨부파일 */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <i className="ri-attachment-line text-emerald-600"></i>
                  첨부파일
                </h3>
                <input
                  type="file"
                  multiple
                  accept="image/*,.pdf"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                />
                <p className="text-xs text-gray-500 mt-1">관계 증빙 서류 등을 첨부할 수 있습니다</p>
              </div>

              {/* 비고 */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">비고</label>
                <textarea
                  defaultValue={selectedConsent?.notes}
                  rows={2}
                  placeholder="추가 정보를 입력하세요"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                ></textarea>
              </div>

              {/* 버튼 그룹 */}
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setShowConsentModal(false)}
                  className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                >
                  취소
                </button>
                <button
                  onClick={() => {
                    alert('저장되었습니다.');
                    setShowConsentModal(false);
                  }}
                  className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60]" onClick={() => setShowSignatureModal(false)}>
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-4 flex items-center justify-between rounded-t-xl">
              <h3 className="text-xl font-bold text-white">서명하기</h3>
              <button onClick={() => setShowSignatureModal(false)} className="text-white hover:bg-white/20 rounded-full p-1">
                <i className="ri-close-line text-2xl"></i>
              </button>
            </div>
            <div className="p-6">
              <div className="border-2 border-gray-300 rounded-lg bg-white" style={{ height: '300px' }}>
                {/* 서명 캔버스 영역 */}
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <div className="text-center">
                    <i className="ri-quill-pen-line text-6xl mb-2"></i>
                    <p className="text-sm">이 영역에 서명해주세요</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => alert('서명이 지워졌습니다.')}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                >
                  <i className="ri-eraser-line mr-1"></i>
                  지우기
                </button>
                <button
                  onClick={() => {
                    alert('서명이 저장되었습니다.');
                    setShowSignatureModal(false);
                  }}
                  className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
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
