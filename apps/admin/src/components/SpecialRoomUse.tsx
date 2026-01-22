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
      notes: '정상 사용 완료'
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
      notes: ''
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
      notes: '치료 완료'
    }
  ]);

  // 필터링된 사용 기록
  const filteredUses = uses.filter(use => {
    const matchesSearch = use.residentName.includes(searchTerm) || 
                         use.room.includes(searchTerm);
    const matchesDate = (!dateFrom || use.date >= dateFrom) && 
                       (!dateTo || use.date <= dateTo);
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
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* 헤더 */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              <i className="ri-door-open-line text-emerald-600"></i>
              특별침실 사용기록
            </h1>
            <p className="text-sm text-gray-600 mt-1">특별침실 사용 현황을 관리합니다</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 whitespace-nowrap"
            >
              <i className="ri-printer-line"></i>
              출력
            </button>
            <button
              onClick={handleExport}
              className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 whitespace-nowrap"
            >
              <i className="ri-file-excel-line"></i>
              엑셀
            </button>
          </div>
        </div>

        {/* 통계 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">총 사용 건수</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stats.totalCount}건</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <i className="ri-door-open-line text-2xl text-blue-600"></i>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">특별침실 A</p>
                <p className="text-2xl font-bold text-emerald-600 mt-1">{stats.roomACount}건</p>
              </div>
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                <i className="ri-home-4-line text-2xl text-emerald-600"></i>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">특별침실 B</p>
                <p className="text-2xl font-bold text-purple-600 mt-1">{stats.roomBCount}건</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <i className="ri-home-5-line text-2xl text-purple-600"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 사용 기록 목록 */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6">
          {/* 필터 바 */}
          <div className="flex gap-3 mb-6">
            <div className="flex-1">
              <input
                type="text"
                placeholder="수급자명, 침실명 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              placeholder="시작일"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              placeholder="종료일"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
            <button
              onClick={() => {
                setSelectedUse(null);
                setIsEditMode(false);
                setShowUseModal(true);
              }}
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2 whitespace-nowrap"
            >
              <i className="ri-add-line"></i>
              기록 추가
            </button>
          </div>

          {/* 테이블 */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">날짜</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">시간</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">수급자</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">침실</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">사용 사유</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">담당자</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">비고</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase">관리</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredUses.map((use) => (
                  <tr key={use.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900">{use.date}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {use.startTime} ~ {use.endTime}
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{use.residentName}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        use.room === '특별침실 A' ? 'bg-emerald-100 text-emerald-700' : 'bg-purple-100 text-purple-700'
                      }`}>
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

      {/* 사용 기록 추가/수정 모달 */}
      {showUseModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowUseModal(false)}>
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">
                특별침실 사용 기록 {isEditMode ? '수정' : '추가'}
              </h2>
              <button onClick={() => setShowUseModal(false)} className="text-white hover:bg-white/20 rounded-full p-1">
                <i className="ri-close-line text-2xl"></i>
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">날짜 *</label>
                  <input
                    type="date"
                    defaultValue={selectedUse?.date}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">침실 선택 *</label>
                  <select
                    defaultValue={selectedUse?.room}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="">침실을 선택하세요</option>
                    <option value="특별침실 A">특별침실 A</option>
                    <option value="특별침실 B">특별침실 B</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">시작시간 *</label>
                  <input
                    type="time"
                    defaultValue={selectedUse?.startTime}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">종료시간 *</label>
                  <input
                    type="time"
                    defaultValue={selectedUse?.endTime}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">수급자 *</label>
                  <input
                    type="text"
                    defaultValue={selectedUse?.residentName}
                    placeholder="수급자 이름"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">담당자 *</label>
                  <input
                    type="text"
                    defaultValue={selectedUse?.staff}
                    placeholder="담당자 이름"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">사용 사유 *</label>
                  <input
                    type="text"
                    defaultValue={selectedUse?.reason}
                    placeholder="예: 가족 면회, 개인 상담, 물리치료"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">비고</label>
                  <textarea
                    defaultValue={selectedUse?.notes}
                    rows={3}
                    placeholder="특이사항을 입력하세요"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  ></textarea>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">첨부파일</label>
                  <input
                    type="file"
                    multiple
                    accept="image/*,.pdf"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowUseModal(false)}
                  className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                >
                  취소
                </button>
                <button
                  onClick={() => {
                    alert('저장되었습니다.');
                    setShowUseModal(false);
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
    </div>
  );
};

export default SpecialRoomUse;
