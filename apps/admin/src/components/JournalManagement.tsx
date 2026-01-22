import { useState, useEffect } from 'react';

interface JournalManagementProps {
  initialJournalType?: string | null;
}

export default function JournalManagement({ initialJournalType }: JournalManagementProps) {
  const [activeTab, setActiveTab] = useState<'list' | 'input' | 'approval'>('list');
  const [journalType, setJournalType] = useState('general');
  const [filterStatus, setFilterStatus] = useState<'all' | 'draft' | 'pending' | 'approved' | 'posted'>('all');
  const [filterType, setFilterType] = useState<'all' | 'general' | 'receipt' | 'payment' | 'sales' | 'purchase' | 'payroll'>('all');
  const [selectedMonth, setSelectedMonth] = useState('2026-01');

  // initialJournalType이 전달되면 자동으로 입력 탭으로 전환
  useEffect(() => {
    if (initialJournalType) {
      setJournalType(initialJournalType);
      setActiveTab('input');
    }
  }, [initialJournalType]);

  // Mock 데이터
  const journals = [
    {
      id: 'J001',
      journalNumber: 'JV-2026-001',
      journalType: 'payment',
      journalDate: '2026-01-10',
      description: '12월 급여지급',
      totalAmount: 14257432,
      debitTotal: 14257432,
      creditTotal: 14257432,
      status: 'posted',
      partnerName: '직원',
      createdBy: '사무국장',
      createdAt: '2026-01-10 09:00:00'
    },
    {
      id: 'J002',
      journalNumber: 'JV-2026-002',
      journalType: 'receipt',
      journalDate: '2026-01-25',
      description: '12월 장기요양급여 입금',
      totalAmount: 28500000,
      debitTotal: 28500000,
      creditTotal: 28500000,
      status: 'posted',
      partnerName: '국민건강보험공단',
      createdBy: '사무국장',
      createdAt: '2026-01-25 14:20:00'
    },
    {
      id: 'J003',
      journalNumber: 'JV-2026-003',
      journalType: 'purchase',
      journalDate: '2026-01-05',
      description: '1월 식자재 구입',
      totalAmount: 3850000,
      debitTotal: 3850000,
      creditTotal: 3850000,
      status: 'approved',
      partnerName: '㈜농협식품',
      createdBy: '최영양',
      createdAt: '2026-01-05 15:20:00'
    },
    {
      id: 'J004',
      journalNumber: 'JV-2026-004',
      journalType: 'payment',
      journalDate: '2026-01-08',
      description: '12월 공과금 납부',
      totalAmount: 2650000,
      debitTotal: 2650000,
      creditTotal: 2650000,
      status: 'pending',
      partnerName: '한국전력공사 외',
      createdBy: '사무국장',
      createdAt: '2026-01-08 09:00:00'
    },
    {
      id: 'J005',
      journalNumber: 'JV-2026-005',
      journalType: 'general',
      journalDate: '2026-01-22',
      description: '감가상각비 계상',
      totalAmount: 500000,
      debitTotal: 500000,
      creditTotal: 500000,
      status: 'draft',
      partnerName: '-',
      createdBy: '사무국장',
      createdAt: '2026-01-22 16:00:00'
    }
  ];

  // 전표 유형 라벨
  const journalTypeLabels: Record<string, string> = {
    general: '일반전표',
    receipt: '입금전표',
    payment: '출금전표',
    sales: '매출전표',
    purchase: '매입전표',
    payroll: '급여전표',
    asset: '자산전표',
    transfer: '이체전표'
  };

  // 상태 라벨
  const statusLabels: Record<string, string> = {
    draft: '임시저장',
    pending: '승인요청',
    approved: '승인',
    rejected: '반려',
    posted: '전기완료'
  };

  // 상태 색상
  const statusColors: Record<string, string> = {
    draft: 'bg-gray-100 text-gray-800',
    pending: 'bg-yellow-100 text-yellow-800',
    approved: 'bg-blue-100 text-blue-800',
    rejected: 'bg-red-100 text-red-800',
    posted: 'bg-green-100 text-green-800'
  };

  // 필터링된 전표
  const filteredJournals = journals.filter(j => {
    const matchStatus = filterStatus === 'all' || j.status === filterStatus;
    const matchType = filterType === 'all' || j.journalType === filterType;
    const matchMonth = j.journalDate.startsWith(selectedMonth);
    return matchStatus && matchType && matchMonth;
  });

  // 통계
  const stats = {
    total: journals.length,
    draft: journals.filter(j => j.status === 'draft').length,
    pending: journals.filter(j => j.status === 'pending').length,
    approved: journals.filter(j => j.status === 'approved').length,
    posted: journals.filter(j => j.status === 'posted').length,
    totalAmount: journals.reduce((sum, j) => sum + j.totalAmount, 0)
  };

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">전표 관리</h2>
          <p className="text-sm text-gray-600 mt-1">복식부기 전표 입력 및 승인</p>
        </div>
        <button
          onClick={() => setActiveTab('input')}
          className="px-4 py-2 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-lg hover:shadow-lg transition-all duration-300 whitespace-nowrap cursor-pointer"
        >
          <i className="ri-add-line mr-2"></i>
          전표 입력
        </button>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="text-sm text-gray-600 mb-1">전체 전표</div>
          <div className="text-2xl font-bold text-gray-900">{stats.total}건</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="text-sm text-gray-600 mb-1">임시저장</div>
          <div className="text-2xl font-bold text-gray-500">{stats.draft}건</div>
        </div>
        <div className="bg-white rounded-lg border border-yellow-200 p-4 bg-yellow-50">
          <div className="text-sm text-yellow-700 mb-1">승인대기</div>
          <div className="text-2xl font-bold text-yellow-600">{stats.pending}건</div>
        </div>
        <div className="bg-white rounded-lg border border-blue-200 p-4 bg-blue-50">
          <div className="text-sm text-blue-700 mb-1">승인완료</div>
          <div className="text-2xl font-bold text-blue-600">{stats.approved}건</div>
        </div>
        <div className="bg-white rounded-lg border border-green-200 p-4 bg-green-50">
          <div className="text-sm text-green-700 mb-1">전기완료</div>
          <div className="text-2xl font-bold text-green-600">{stats.posted}건</div>
        </div>
      </div>

      {/* 탭 네비게이션 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('list')}
            className={`px-6 py-4 font-medium whitespace-nowrap cursor-pointer transition-colors $\{
              activeTab === 'list'
                ? 'text-teal-600 border-b-2 border-teal-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <i className="ri-file-list-3-line mr-2"></i>
            전표 목록
          </button>
          <button
            onClick={() => setActiveTab('input')}
            className={`px-6 py-4 font-medium whitespace-nowrap cursor-pointer transition-colors $\{
              activeTab === 'input'
                ? 'text-teal-600 border-b-2 border-teal-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <i className="ri-add-circle-line mr-2"></i>
            전표 입력
          </button>
          <button
            onClick={() => setActiveTab('approval')}
            className={`px-6 py-4 font-medium whitespace-nowrap cursor-pointer transition-colors $\{
              activeTab === 'approval'
                ? 'text-teal-600 border-b-2 border-teal-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <i className="ri-checkbox-circle-line mr-2"></i>
            승인 관리
            {stats.pending > 0 && (
              <span className="ml-2 px-2 py-0.5 bg-yellow-500 text-white text-xs rounded-full">
                {stats.pending}
              </span>
            )}
          </button>
        </div>

        {/* 전표 목록 탭 */}
        {activeTab === 'list' && (
          <div className="p-6">
            {/* 필터 */}
            <div className="flex items-center gap-4 mb-6 flex-wrap">
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700">기준월:</label>
                <input
                  type="month"
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setFilterStatus('all')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer $\{
                    filterStatus === 'all'
                      ? 'bg-teal-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  전체
                </button>
                <button
                  onClick={() => setFilterStatus('draft')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer $\{
                    filterStatus === 'draft'
                      ? 'bg-gray-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  임시저장
                </button>
                <button
                  onClick={() => setFilterStatus('pending')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer $\{
                    filterStatus === 'pending'
                      ? 'bg-yellow-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  승인대기
                </button>
                <button
                  onClick={() => setFilterStatus('posted')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer $\{
                    filterStatus === 'posted'
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  전기완료
                </button>
              </div>

              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as any)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              >
                <option value="all">전체 유형</option>
                <option value="general">일반전표</option>
                <option value="receipt">입금전표</option>
                <option value="payment">출금전표</option>
                <option value="sales">매출전표</option>
                <option value="purchase">매입전표</option>
                <option value="payroll">급여전표</option>
              </select>
            </div>

            {/* 전표 테이블 */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">전표번호</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">유형</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">전표일자</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">적요</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">거래처</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">차변</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">대변</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">상태</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">관리</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredJournals.map((journal) => (
                    <tr key={journal.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-teal-600 cursor-pointer hover:underline">
                          {journal.journalNumber}
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-center">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {journalTypeLabels[journal.journalType]}
                        </span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                        {journal.journalDate}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-900">
                        {journal.description}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                        {journal.partnerName}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-right font-medium text-gray-900">
                        {journal.debitTotal.toLocaleString()}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-right font-medium text-gray-900">
                        {journal.creditTotal.toLocaleString()}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-center">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium $\{statusColors[journal.status]}`}>
                          {statusLabels[journal.status]}
                        </span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-center">
                        <button
                          className="text-blue-600 hover:text-blue-800 mr-2 cursor-pointer"
                          title="상세보기"
                        >
                          <i className="ri-eye-line text-lg"></i>
                        </button>
                        {journal.status === 'draft' && (
                          <>
                            <button
                              className="text-teal-600 hover:text-teal-800 mr-2 cursor-pointer"
                              title="수정"
                            >
                              <i className="ri-edit-line text-lg"></i>
                            </button>
                            <button
                              className="text-red-600 hover:text-red-800 cursor-pointer"
                              title="삭제"
                            >
                              <i className="ri-delete-bin-line text-lg"></i>
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* 합계 */}
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-gray-700">
                  총 {filteredJournals.length}건
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-sm">
                    <span className="text-gray-600">차변 합계: </span>
                    <span className="font-bold text-gray-900">
                      {filteredJournals.reduce((sum, j) => sum + j.debitTotal, 0).toLocaleString()}원
                    </span>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-600">대변 합계: </span>
                    <span className="font-bold text-gray-900">
                      {filteredJournals.reduce((sum, j) => sum + j.creditTotal, 0).toLocaleString()}원
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 전표 입력 탭 */}
        {activeTab === 'input' && (
          <div className="p-6">
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white p-6 rounded-t-xl">
                <h3 className="text-xl font-bold">전표 입력</h3>
                <p className="text-sm opacity-90 mt-1">복식부기 전표를 입력합니다</p>
              </div>

              <div className="bg-white border border-gray-200 rounded-b-xl p-6 space-y-6">
                {/* 전표 유형 선택 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">전표 유형</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {['general', 'receipt', 'payment', 'purchase'].map((type) => (
                      <button
                        key={type}
                        className="px-4 py-3 border-2 border-gray-300 rounded-lg hover:border-teal-500 hover:bg-teal-50 transition-colors cursor-pointer"
                      >
                        <div className="text-sm font-medium text-gray-900">
                          {journalTypeLabels[type]}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 기본 정보 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">전표일자</label>
                    <input
                      type="date"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      defaultValue={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">거래처</label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500">
                      <option value="">선택하세요</option>
                      <option value="1">국민건강보험공단</option>
                      <option value="2">㈜농협식품</option>
                      <option value="3">한국전력공사</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">적요</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    placeholder="거래 내용을 입력하세요"
                  />
                </div>

                {/* 분개 입력 */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="block text-sm font-medium text-gray-700">분개 입력</label>
                    <button className="text-teal-600 hover:text-teal-800 text-sm font-medium cursor-pointer whitespace-nowrap">
                      <i className="ri-add-line mr-1"></i>
                      라인 추가
                    </button>
                  </div>

                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">계정과목</th>
                          <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">차변</th>
                          <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">대변</th>
                          <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase w-20"></th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        <tr>
                          <td className="px-4 py-3">
                            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                              <option value="">계정과목 선택</option>
                              <option value="101">101 - 현금</option>
                              <option value="102">102 - 보통예금</option>
                              <option value="601">601 - 급여</option>
                            </select>
                          </td>
                          <td className="px-4 py-3">
                            <input
                              type="number"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-right"
                              placeholder="0"
                            />
                          </td>
                          <td className="px-4 py-3">
                            <input
                              type="number"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-right"
                              placeholder="0"
                            />
                          </td>
                          <td className="px-4 py-3 text-center">
                            <button className="text-red-600 hover:text-red-800 cursor-pointer">
                              <i className="ri-delete-bin-line"></i>
                            </button>
                          </td>
                        </tr>
                      </tbody>
                      <tfoot className="bg-gray-50">
                        <tr>
                          <td className="px-4 py-3 text-sm font-bold text-gray-900">합계</td>
                          <td className="px-4 py-3 text-sm font-bold text-right text-gray-900">0</td>
                          <td className="px-4 py-3 text-sm font-bold text-right text-gray-900">0</td>
                          <td></td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>

                  <div className="mt-2 text-sm text-gray-600">
                    <i className="ri-information-line mr-1"></i>
                    차변과 대변의 합계가 일치해야 저장할 수 있습니다.
                  </div>
                </div>

                {/* 증빙 정보 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">증빙유형</label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500">
                      <option value="">선택하세요</option>
                      <option value="tax_invoice">세금계산서</option>
                      <option value="cash_receipt">현금영수증</option>
                      <option value="card">카드전표</option>
                      <option value="simple">간이영수증</option>
                      <option value="none">무증빙</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">결제수단</label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500">
                      <option value="">선택하세요</option>
                      <option value="cash">현금</option>
                      <option value="transfer">계좌이체</option>
                      <option value="card">카드</option>
                    </select>
                  </div>
                </div>

                {/* 메모 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">메모</label>
                  <textarea
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    rows={3}
                    placeholder="추가 메모 (선택사항)"
                  ></textarea>
                </div>

                {/* 버튼 */}
                <div className="flex gap-3 pt-4">
                  <button className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium whitespace-nowrap cursor-pointer">
                    임시저장
                  </button>
                  <button className="flex-1 px-6 py-3 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-lg hover:shadow-lg transition-all duration-300 font-medium whitespace-nowrap cursor-pointer">
                    승인요청
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 승인 관리 탭 */}
        {activeTab === 'approval' && (
          <div className="p-6">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <div className="flex items-center">
                <i className="ri-alert-line text-yellow-600 text-xl mr-3"></i>
                <div>
                  <div className="font-medium text-yellow-900">승인 대기 중인 전표가 {stats.pending}건 있습니다</div>
                  <div className="text-sm text-yellow-700 mt-1">전표를 검토하고 승인 또는 반려 처리해 주세요</div>
                </div>
              </div>
            </div>

            {/* 승인 대기 목록 */}
            <div className="space-y-4">
              {journals.filter(j => j.status === 'pending').map((journal) => (
                <div key={journal.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="text-lg font-bold text-gray-900">{journal.journalNumber}</div>
                      <div className="text-sm text-gray-600 mt-1">{journal.description}</div>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      승인대기
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <div className="text-xs text-gray-500 mb-1">전표일자</div>
                      <div className="text-sm font-medium text-gray-900">{journal.journalDate}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">거래처</div>
                      <div className="text-sm font-medium text-gray-900">{journal.partnerName}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">금액</div>
                      <div className="text-sm font-medium text-gray-900">{journal.totalAmount.toLocaleString()}원</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">작성자</div>
                      <div className="text-sm font-medium text-gray-900">{journal.createdBy}</div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium whitespace-nowrap cursor-pointer">
                      <i className="ri-eye-line mr-2"></i>
                      상세보기
                    </button>
                    <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium whitespace-nowrap cursor-pointer">
                      <i className="ri-checkbox-circle-line mr-2"></i>
                      승인
                    </button>
                    <button className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium whitespace-nowrap cursor-pointer">
                      <i className="ri-close-circle-line mr-2"></i>
                      반려
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
