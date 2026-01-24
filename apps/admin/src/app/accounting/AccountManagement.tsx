import React, { useState } from 'react';

// 계정과목 관리 컴포넌트
const AccountManagement: React.FC = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [filterClass, setFilterClass] = useState<'all' | 'asset' | 'liability' | 'equity' | 'revenue' | 'expense'>('all');

  // Mock 데이터
  const accounts = [
    // 자산
    { id: '1', code: '101', name: '현금', accountClass: 'asset', accountType: 'current_asset', isActive: true, isDetail: true },
    { id: '2', code: '102', name: '보통예금', accountClass: 'asset', accountType: 'current_asset', isActive: true, isDetail: true },
    { id: '3', code: '111', name: '미수금', accountClass: 'asset', accountType: 'current_asset', isActive: true, isDetail: true },
    { id: '4', code: '201', name: '비품', accountClass: 'asset', accountType: 'fixed_asset', isActive: true, isDetail: true },
    
    // 부채
    { id: '5', code: '301', name: '미지급금', accountClass: 'liability', accountType: 'current_liability', isActive: true, isDetail: true },
    { id: '6', code: '302', name: '예수금', accountClass: 'liability', accountType: 'current_liability', isActive: true, isDetail: true },
    
    // 자본
    { id: '7', code: '401', name: '자본금', accountClass: 'equity', accountType: 'capital', isActive: true, isDetail: true },
    
    // 수익
    { id: '8', code: '501', name: '장기요양급여수익', accountClass: 'revenue', accountType: 'operating_revenue', isActive: true, isDetail: true },
    { id: '9', code: '502', name: '본인부담금수익', accountClass: 'revenue', accountType: 'operating_revenue', isActive: true, isDetail: true },
    
    // 비용
    { id: '10', code: '601', name: '급여', accountClass: 'expense', accountType: 'personnel_expense', isActive: true, isDetail: true },
    { id: '11', code: '604', name: '국민연금', accountClass: 'expense', accountType: 'personnel_expense', isActive: true, isDetail: true },
    { id: '12', code: '611', name: '식자재비', accountClass: 'expense', accountType: 'operating_expense', isActive: true, isDetail: true },
    { id: '13', code: '621', name: '전기료', accountClass: 'expense', accountType: 'utility_expense', isActive: true, isDetail: true }
  ];

  const classLabels: Record<string, string> = {
    asset: '자산',
    liability: '부채',
    equity: '자본',
    revenue: '수익',
    expense: '비용'
  };

  const classColors: Record<string, string> = {
    asset: 'bg-blue-100 text-blue-800',
    liability: 'bg-red-100 text-red-800',
    equity: 'bg-purple-100 text-purple-800',
    revenue: 'bg-green-100 text-green-800',
    expense: 'bg-orange-100 text-orange-800'
  };

  const filteredAccounts = accounts.filter(a => filterClass === 'all' || a.accountClass === filterClass);

  const stats = {
    total: accounts.length,
    asset: accounts.filter(a => a.accountClass === 'asset').length,
    liability: accounts.filter(a => a.accountClass === 'liability').length,
    equity: accounts.filter(a => a.accountClass === 'equity').length,
    revenue: accounts.filter(a => a.accountClass === 'revenue').length,
    expense: accounts.filter(a => a.accountClass === 'expense').length
  };

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">계정과목 관리</h2>
          <p className="text-sm text-gray-600 mt-1">회계 계정과목 설정 및 관리</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-lg hover:shadow-lg transition-all duration-300 whitespace-nowrap cursor-pointer"
        >
          <i className="ri-add-line mr-2"></i>
          계정과목 추가
        </button>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="text-sm text-gray-600 mb-1">전체</div>
          <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
        </div>
        <div className="bg-blue-50 rounded-lg border border-blue-200 p-4">
          <div className="text-sm text-blue-700 mb-1">자산</div>
          <div className="text-2xl font-bold text-blue-600">{stats.asset}</div>
        </div>
        <div className="bg-red-50 rounded-lg border border-red-200 p-4">
          <div className="text-sm text-red-700 mb-1">부채</div>
          <div className="text-2xl font-bold text-red-600">{stats.liability}</div>
        </div>
        <div className="bg-purple-50 rounded-lg border border-purple-200 p-4">
          <div className="text-sm text-purple-700 mb-1">자본</div>
          <div className="text-2xl font-bold text-purple-600">{stats.equity}</div>
        </div>
        <div className="bg-green-50 rounded-lg border border-green-200 p-4">
          <div className="text-sm text-green-700 mb-1">수익</div>
          <div className="text-2xl font-bold text-green-600">{stats.revenue}</div>
        </div>
        <div className="bg-orange-50 rounded-lg border border-orange-200 p-4">
          <div className="text-sm text-orange-700 mb-1">비용</div>
          <div className="text-2xl font-bold text-orange-600">{stats.expense}</div>
        </div>
      </div>

      {/* 필터 */}
      <div className="flex gap-2">
        <button
          onClick={() => setFilterClass('all')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer ${
            filterClass === 'all' ? 'bg-teal-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          전체
        </button>
        <button
          onClick={() => setFilterClass('asset')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer ${
            filterClass === 'asset' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          자산
        </button>
        <button
          onClick={() => setFilterClass('liability')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer ${
            filterClass === 'liability' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          부채
        </button>
        <button
          onClick={() => setFilterClass('equity')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer ${
            filterClass === 'equity' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          자본
        </button>
        <button
          onClick={() => setFilterClass('revenue')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer ${
            filterClass === 'revenue' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          수익
        </button>
        <button
          onClick={() => setFilterClass('expense')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer ${
            filterClass === 'expense' ? 'bg-orange-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          비용
        </button>
      </div>

      {/* 계정과목 테이블 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">코드</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">계정명</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">분류</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">세부계정</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">상태</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">관리</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAccounts.map((account) => (
                <tr key={account.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm font-mono font-bold text-gray-900">{account.code}</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{account.name}</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${classColors[account.accountClass]}`}>
                      {classLabels[account.accountClass]}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-center">
                    {account.isDetail ? (
                      <span className="text-green-600">
                        <i className="ri-checkbox-circle-fill"></i>
                      </span>
                    ) : (
                      <span className="text-gray-400">
                        <i className="ri-close-circle-fill"></i>
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-center">
                    {account.isActive ? (
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        사용중
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        미사용
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-center">
                    <button className="text-blue-600 hover:text-blue-800 mr-2 cursor-pointer" title="수정">
                      <i className="ri-edit-line text-lg"></i>
                    </button>
                    <button className="text-red-600 hover:text-red-800 cursor-pointer" title="삭제">
                      <i className="ri-delete-bin-line text-lg"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 계정과목 추가 모달 */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-teal-500 to-emerald-500 text-white p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">계정과목 추가</h2>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="w-10 h-10 flex items-center justify-center hover:bg-white/20 rounded-lg transition-colors cursor-pointer"
                >
                  <i className="ri-close-line text-2xl"></i>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">계정코드</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    placeholder="예: 701"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">계정명</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    placeholder="예: 광고선전비"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">대분류</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500">
                    <option value="">선택하세요</option>
                    <option value="asset">자산</option>
                    <option value="liability">부채</option>
                    <option value="equity">자본</option>
                    <option value="revenue">수익</option>
                    <option value="expense">비용</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">중분류</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    placeholder="예: 판매비와관리비"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="flex items-center">
                  <input type="checkbox" className="w-4 h-4 text-teal-600 rounded" defaultChecked />
                  <span className="ml-2 text-sm text-gray-700">세부계정 (전표입력 가능)</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="w-4 h-4 text-teal-600 rounded" />
                  <span className="ml-2 text-sm text-gray-700">과세대상</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="w-4 h-4 text-teal-600 rounded" />
                  <span className="ml-2 text-sm text-gray-700">예산통제 대상</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="w-4 h-4 text-teal-600 rounded" defaultChecked />
                  <span className="ml-2 text-sm text-gray-700">사용</span>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">설명</label>
                <textarea
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  rows={3}
                  placeholder="계정과목 설명 (선택사항)"
                ></textarea>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => {
                    alert('계정과목이 추가되었습니다.');
                    setShowAddModal(false);
                  }}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-lg hover:shadow-lg transition-all duration-300 font-medium whitespace-nowrap cursor-pointer"
                >
                  추가하기
                </button>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium whitespace-nowrap cursor-pointer"
                >
                  취소
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountManagement;
