import React, { useState } from 'react';

// 거래처 관리 컴포넌트
const PartnerManagement: React.FC = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [filterType, setFilterType] = useState<'all' | 'customer' | 'supplier' | 'employee' | 'other'>('all');

  // Mock 데이터
  const partners = [
    {
      id: '1',
      code: 'P001',
      name: '국민건강보험공단',
      partnerType: 'customer',
      businessNumber: '123-45-67890',
      representative: '홍길동',
      phone: '02-1234-5678',
      email: 'nhis@example.com',
      totalSales: 285000000,
      totalReceivable: 0,
      isActive: true
    },
    {
      id: '2',
      code: 'P002',
      name: '㈜농협식품',
      partnerType: 'supplier',
      businessNumber: '234-56-78901',
      representative: '김농협',
      phone: '02-2345-6789',
      email: 'nh@example.com',
      totalPurchase: 42000000,
      totalPayable: 3850000,
      isActive: true
    },
    {
      id: '3',
      code: 'P003',
      name: '한국전력공사',
      partnerType: 'supplier',
      businessNumber: '345-67-89012',
      representative: '이전력',
      phone: '123',
      email: 'kepco@example.com',
      totalPurchase: 15000000,
      totalPayable: 0,
      isActive: true
    },
    {
      id: '4',
      code: 'P004',
      name: '㈜메디컬서플라이',
      partnerType: 'supplier',
      businessNumber: '456-78-90123',
      representative: '박의료',
      phone: '02-3456-7890',
      email: 'medical@example.com',
      totalPurchase: 8500000,
      totalPayable: 0,
      isActive: true
    }
  ];

  const typeLabels: Record<string, string> = {
    customer: '고객',
    supplier: '공급업체',
    employee: '직원',
    other: '기타'
  };

  const typeColors: Record<string, string> = {
    customer: 'bg-blue-100 text-blue-800',
    supplier: 'bg-green-100 text-green-800',
    employee: 'bg-purple-100 text-purple-800',
    other: 'bg-gray-100 text-gray-800'
  };

  const filteredPartners = partners.filter(p => filterType === 'all' || p.partnerType === filterType);

  const stats = {
    total: partners.length,
    customer: partners.filter(p => p.partnerType === 'customer').length,
    supplier: partners.filter(p => p.partnerType === 'supplier').length,
    employee: partners.filter(p => p.partnerType === 'employee').length,
    other: partners.filter(p => p.partnerType === 'other').length
  };

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">거래처 관리</h2>
          <p className="text-sm text-gray-600 mt-1">거래처 정보 등록 및 관리</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-lg hover:shadow-lg transition-all duration-300 whitespace-nowrap cursor-pointer"
        >
          <i className="ri-add-line mr-2"></i>
          거래처 추가
        </button>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="text-sm text-gray-600 mb-1">전체</div>
          <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
        </div>
        <div className="bg-blue-50 rounded-lg border border-blue-200 p-4">
          <div className="text-sm text-blue-700 mb-1">고객</div>
          <div className="text-2xl font-bold text-blue-600">{stats.customer}</div>
        </div>
        <div className="bg-green-50 rounded-lg border border-green-200 p-4">
          <div className="text-sm text-green-700 mb-1">공급업체</div>
          <div className="text-2xl font-bold text-green-600">{stats.supplier}</div>
        </div>
        <div className="bg-purple-50 rounded-lg border border-purple-200 p-4">
          <div className="text-sm text-purple-700 mb-1">직원</div>
          <div className="text-2xl font-bold text-purple-600">{stats.employee}</div>
        </div>
        <div className="bg-gray-50 rounded-lg border border-gray-200 p-4">
          <div className="text-sm text-gray-700 mb-1">기타</div>
          <div className="text-2xl font-bold text-gray-600">{stats.other}</div>
        </div>
      </div>

      {/* 필터 */}
      <div className="flex gap-2">
        <button
          onClick={() => setFilterType('all')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer ${
            filterType === 'all' ? 'bg-teal-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          전체
        </button>
        <button
          onClick={() => setFilterType('customer')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer ${
            filterType === 'customer' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          고객
        </button>
        <button
          onClick={() => setFilterType('supplier')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer ${
            filterType === 'supplier' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          공급업체
        </button>
      </div>

      {/* 거래처 테이블 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">코드</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">거래처명</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">유형</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">사업자번호</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">대표자</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">연락처</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">거래금액</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">관리</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPartners.map((partner) => (
                <tr key={partner.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm font-mono font-bold text-gray-900">{partner.code}</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{partner.name}</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${typeColors[partner.partnerType]}`}>
                      {typeLabels[partner.partnerType]}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                    {partner.businessNumber}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                    {partner.representative}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                    {partner.phone}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-right">
                    {partner.partnerType === 'customer' ? (
                      <div>
                        <div className="font-medium text-blue-600">
                          매출: {partner.totalSales?.toLocaleString()}원
                        </div>
                        {partner.totalReceivable > 0 && (
                          <div className="text-xs text-red-600">
                            미수: {partner.totalReceivable.toLocaleString()}원
                          </div>
                        )}
                      </div>
                    ) : (
                      <div>
                        <div className="font-medium text-green-600">
                          매입: {partner.totalPurchase?.toLocaleString()}원
                        </div>
                        {partner.totalPayable > 0 && (
                          <div className="text-xs text-red-600">
                            미지급: {partner.totalPayable.toLocaleString()}원
                          </div>
                        )}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-center">
                    <button className="text-blue-600 hover:text-blue-800 mr-2 cursor-pointer" title="상세보기">
                      <i className="ri-eye-line text-lg"></i>
                    </button>
                    <button className="text-teal-600 hover:text-teal-800 mr-2 cursor-pointer" title="수정">
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

      {/* 거래처 추가 모달 */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-teal-500 to-emerald-500 text-white p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">거래처 추가</h2>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="w-10 h-10 flex items-center justify-center hover:bg-white/20 rounded-lg transition-colors cursor-pointer"
                >
                  <i className="ri-close-line text-2xl"></i>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* 기본 정보 */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">기본 정보</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">거래처코드</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      placeholder="자동생성"
                      disabled
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">거래처 유형</label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500">
                      <option value="">선택하세요</option>
                      <option value="customer">고객</option>
                      <option value="supplier">공급업체</option>
                      <option value="employee">직원</option>
                      <option value="other">기타</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">거래처명</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      placeholder="예: ㈜농협식품"
                    />
                  </div>
                </div>
              </div>

              {/* 사업자 정보 */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">사업자 정보</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">사업자번호</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      placeholder="123-45-67890"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">대표자</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      placeholder="홍길동"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">업종</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      placeholder="예: 식품 도소매"
                    />
                  </div>
                </div>
              </div>

              {/* 연락처 정보 */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">연락처 정보</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">전화번호</label>
                    <input
                      type="tel"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      placeholder="02-1234-5678"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">이메일</label>
                    <input
                      type="email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      placeholder="example@company.com"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">주소</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      placeholder="주소를 입력하세요"
                    />
                  </div>
                </div>
              </div>

              {/* 정산 정보 */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">정산 정보</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">은행명</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      placeholder="예: 국민은행"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">계좌번호</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      placeholder="123-456-789012"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">예금주</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      placeholder="홍길동"
                    />
                  </div>
                </div>
              </div>

              {/* 버튼 */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => {
                    alert('거래처가 추가되었습니다.');
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

export default PartnerManagement;
