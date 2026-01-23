import { useState, useEffect } from 'react';

interface Claim {
  id: string;
  month: string;
  residentId: string;
  residentName: string;
  grade: string;
  serviceDays: number;
  serviceAmount: number;
  copayment: number;
  insuranceAmount: number;
  status: string;
  submittedDate: string;
  approvedDate: string;
  notes: string;
}

export default function InsuranceClaimManagement() {
  const [claims, setClaims] = useState<Claim[]>([]);
  const [filteredClaims, setFilteredClaims] = useState<Claim[]>([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));
  const [showModal, setShowModal] = useState(false);
  const [editingClaim, setEditingClaim] = useState<Claim | null>(null);
  const [residents, setResidents] = useState<any[]>([]);

  useEffect(() => {
    loadClaims();
    loadResidents();
  }, []);

  useEffect(() => {
    filterClaims();
  }, [claims, selectedMonth]);

  const loadResidents = () => {
    const saved = localStorage.getItem('admin_residents');
    if (saved) {
      const allResidents = JSON.parse(saved);
      setResidents(allResidents.filter((r: any) => r.name));
    }
  };

  const loadClaims = () => {
    const saved = localStorage.getItem('admin_insurance_claims');
    if (saved) {
      setClaims(JSON.parse(saved));
    } else {
      const initial: Claim[] = [
        {
          id: '1',
          month: new Date().toISOString().slice(0, 7),
          residentId: '1',
          residentName: '김순자',
          grade: '1등급',
          serviceDays: 30,
          serviceAmount: 2000000,
          copayment: 400000,
          insuranceAmount: 1600000,
          status: '청구완료',
          submittedDate: new Date().toISOString().split('T')[0],
          approvedDate: '',
          notes: ''
        }
      ];
      setClaims(initial);
      localStorage.setItem('admin_insurance_claims', JSON.stringify(initial));
    }
  };

  const filterClaims = () => {
    const filtered = claims.filter(c => c.month === selectedMonth);
    setFilteredClaims(filtered);
  };

  const handleSave = (claimData: Partial<Claim>) => {
    if (editingClaim) {
      const updated = claims.map(c =>
        c.id === editingClaim.id ? { ...c, ...claimData } : c
      );
      setClaims(updated);
      localStorage.setItem('admin_insurance_claims', JSON.stringify(updated));
    } else {
      const newClaim: Claim = {
        id: Date.now().toString(),
        month: claimData.month || selectedMonth,
        residentId: claimData.residentId || '',
        residentName: claimData.residentName || '',
        grade: claimData.grade || '',
        serviceDays: claimData.serviceDays || 0,
        serviceAmount: claimData.serviceAmount || 0,
        copayment: claimData.copayment || 0,
        insuranceAmount: claimData.insuranceAmount || 0,
        status: '작성중',
        submittedDate: '',
        approvedDate: '',
        notes: claimData.notes || ''
      };
      const updated = [...claims, newClaim];
      setClaims(updated);
      localStorage.setItem('admin_insurance_claims', JSON.stringify(updated));
    }
    setShowModal(false);
    setEditingClaim(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      const updated = claims.filter(c => c.id !== id);
      setClaims(updated);
      localStorage.setItem('admin_insurance_claims', JSON.stringify(updated));
    }
  };

  const handleStatusChange = (id: string, newStatus: string) => {
    const updated = claims.map(c => {
      if (c.id === id) {
        const updates: Partial<Claim> = { status: newStatus };
        if (newStatus === '청구완료' && !c.submittedDate) {
          updates.submittedDate = new Date().toISOString().split('T')[0];
        }
        if (newStatus === '승인완료' && !c.approvedDate) {
          updates.approvedDate = new Date().toISOString().split('T')[0];
        }
        return { ...c, ...updates };
      }
      return c;
    });
    setClaims(updated);
    localStorage.setItem('admin_insurance_claims', JSON.stringify(updated));
  };

  const generateAllClaims = () => {
    if (confirm(`${selectedMonth} 월 전체 입소자의 청구 데이터를 생성하시겠습니까?`)) {
      const existingResidentIds = filteredClaims.map(c => c.residentId);
      const newClaims = residents
        .filter(r => !existingResidentIds.includes(r.id))
        .map(r => ({
          id: Date.now().toString() + r.id,
          month: selectedMonth,
          residentId: r.id,
          residentName: r.name,
          grade: r.grade || '미정',
          serviceDays: 30,
          serviceAmount: 2000000,
          copayment: 400000,
          insuranceAmount: 1600000,
          status: '작성중',
          submittedDate: '',
          approvedDate: '',
          notes: ''
        }));

      const updated = [...claims, ...newClaims];
      setClaims(updated);
      localStorage.setItem('admin_insurance_claims', JSON.stringify(updated));
    }
  };

  const exportToCSV = () => {
    const headers = ['입소자명', '등급', '급여일수', '급여비용', '본인부담금', '공단부담금', '상태'];
    const rows = filteredClaims.map(c => [
      c.residentName,
      c.grade,
      c.serviceDays,
      c.serviceAmount,
      c.copayment,
      c.insuranceAmount,
      c.status
    ]);

    const csvContent = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `장기요양보험청구_${selectedMonth}.csv`;
    link.click();
  };

  const getMonthStats = () => {
    const totalService = filteredClaims.reduce((sum, c) => sum + c.serviceAmount, 0);
    const totalCopay = filteredClaims.reduce((sum, c) => sum + c.copayment, 0);
    const totalInsurance = filteredClaims.reduce((sum, c) => sum + c.insuranceAmount, 0);
    
    return {
      totalService,
      totalCopay,
      totalInsurance,
      count: filteredClaims.length,
      submitted: filteredClaims.filter(c => c.status === '청구완료' || c.status === '승인완료').length,
      approved: filteredClaims.filter(c => c.status === '승인완료').length
    };
  };

  const stats = getMonthStats();

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">장기요양보험 청구</h1>
        <p className="text-gray-600 text-sm">급여일수 산출, 청구 파일 생성, 공단 청구 관리</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600 font-medium">총 급여비용</p>
              <p className="text-2xl font-bold text-blue-700">{stats.totalService.toLocaleString()}원</p>
            </div>
            <i className="ri-file-shield-line text-4xl text-blue-500"></i>
          </div>
        </div>

        <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-600 font-medium">본인부담금</p>
              <p className="text-2xl font-bold text-purple-700">{stats.totalCopay.toLocaleString()}원</p>
            </div>
            <i className="ri-user-line text-4xl text-purple-500"></i>
          </div>
        </div>

        <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600 font-medium">공단부담금</p>
              <p className="text-2xl font-bold text-green-700">{stats.totalInsurance.toLocaleString()}원</p>
            </div>
            <i className="ri-shield-check-line text-4xl text-green-500"></i>
          </div>
        </div>

        <div className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-orange-600 font-medium">청구 대상</p>
              <p className="text-2xl font-bold text-orange-700">{stats.count}명</p>
              <p className="text-xs text-orange-600 mt-1">승인 {stats.approved}명</p>
            </div>
            <i className="ri-team-line text-4xl text-orange-500"></i>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <input
            type="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
          <button
            onClick={() => {
              setEditingClaim(null);
              setShowModal(true);
            }}
            className="px-6 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-lg hover:shadow-lg transition-all duration-300 whitespace-nowrap cursor-pointer"
          >
            <i className="ri-add-line mr-2"></i>
            개별 청구 추가
          </button>
          <button
            onClick={generateAllClaims}
            className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:shadow-lg transition-all duration-300 whitespace-nowrap cursor-pointer"
          >
            <i className="ri-file-add-line mr-2"></i>
            전체 청구 생성
          </button>
          <button
            onClick={exportToCSV}
            className="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:shadow-lg transition-all duration-300 whitespace-nowrap cursor-pointer"
          >
            <i className="ri-download-line mr-2"></i>
            CSV 다운로드
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">입소자명</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">등급</th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">급여일수</th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">급여비용</th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">본인부담금</th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">공단부담금</th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">상태</th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">관리</th>
              </tr>
            </thead>
            <tbody>
              {filteredClaims.map((claim, index) => (
                <tr key={claim.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-4 py-3 text-sm font-medium text-gray-800">{claim.residentName}</td>
                  <td className="px-4 py-3">
                    <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-700">
                      {claim.grade}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 text-right">{claim.serviceDays}일</td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-800 text-right">{claim.serviceAmount.toLocaleString()}원</td>
                  <td className="px-4 py-3 text-sm text-purple-600 text-right">{claim.copayment.toLocaleString()}원</td>
                  <td className="px-4 py-3 text-sm text-green-600 text-right font-bold">{claim.insuranceAmount.toLocaleString()}원</td>
                  <td className="px-4 py-3 text-center">
                    <select
                      value={claim.status}
                      onChange={(e) => handleStatusChange(claim.id, e.target.value)}
                      className={`px-3 py-1 text-xs font-medium rounded-full cursor-pointer border-none ${
                        claim.status === '작성중' ? 'bg-gray-100 text-gray-700' :
                        claim.status === '청구완료' ? 'bg-blue-100 text-blue-700' :
                        claim.status === '승인완료' ? 'bg-green-100 text-green-700' :
                        'bg-red-100 text-red-700'
                      }`}
                    >
                      <option value="작성중">작성중</option>
                      <option value="청구완료">청구완료</option>
                      <option value="승인완료">승인완료</option>
                      <option value="반려">반려</option>
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => {
                          setEditingClaim(claim);
                          setShowModal(true);
                        }}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded cursor-pointer"
                      >
                        <i className="ri-edit-line text-lg"></i>
                      </button>
                      <button
                        onClick={() => handleDelete(claim.id)}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded cursor-pointer"
                      >
                        <i className="ri-delete-bin-line text-lg"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-gray-100 border-t-2 border-gray-300">
              <tr>
                <td colSpan={3} className="px-4 py-3 text-sm font-bold text-gray-800">합계</td>
                <td className="px-4 py-3 text-sm font-bold text-gray-800 text-right">{stats.totalService.toLocaleString()}원</td>
                <td className="px-4 py-3 text-sm font-bold text-purple-600 text-right">{stats.totalCopay.toLocaleString()}원</td>
                <td className="px-4 py-3 text-sm font-bold text-green-600 text-right">{stats.totalInsurance.toLocaleString()}원</td>
                <td colSpan={2}></td>
              </tr>
            </tfoot>
          </table>

          {filteredClaims.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <i className="ri-file-shield-line text-5xl mb-3 block"></i>
              <p>해당 월의 청구 데이터가 없습니다</p>
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <ClaimModal
          claim={editingClaim}
          residents={residents}
          selectedMonth={selectedMonth}
          onClose={() => {
            setShowModal(false);
            setEditingClaim(null);
          }}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

function ClaimModal({ claim, residents, selectedMonth, onClose, onSave }: {
  claim: Claim | null;
  residents: any[];
  selectedMonth: string;
  onClose: () => void;
  onSave: (data: Partial<Claim>) => void;
}) {
  const [formData, setFormData] = useState({
    month: claim?.month || selectedMonth,
    residentId: claim?.residentId || '',
    residentName: claim?.residentName || '',
    grade: claim?.grade || '',
    serviceDays: claim?.serviceDays || 30,
    serviceAmount: claim?.serviceAmount || 0,
    copayment: claim?.copayment || 0,
    insuranceAmount: claim?.insuranceAmount || 0,
    notes: claim?.notes || ''
  });

  useEffect(() => {
    const insurance = formData.serviceAmount - formData.copayment;
    setFormData(prev => ({ ...prev, insuranceAmount: insurance }));
  }, [formData.serviceAmount, formData.copayment]);

  const handleResidentChange = (residentId: string) => {
    const resident = residents.find(r => r.id === residentId);
    if (resident) {
      setFormData({
        ...formData,
        residentId: resident.id,
        residentName: resident.name,
        grade: resident.grade || ''
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h3 className="text-xl font-bold text-gray-800">
            {claim ? '청구 정보 수정' : '새 청구 추가'}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 cursor-pointer">
            <i className="ri-close-line text-2xl"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">입소자 선택 *</label>
              <select
                required
                value={formData.residentId}
                onChange={(e) => handleResidentChange(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent cursor-pointer"
              >
                <option value="">입소자를 선택하세요</option>
                {residents.map(resident => (
                  <option key={resident.id} value={resident.id}>
                    {resident.name} (베드 {resident.bedNumber}) - {resident.grade || '등급 미정'}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">청구 월 *</label>
              <input
                type="month"
                required
                value={formData.month}
                onChange={(e) => setFormData({ ...formData, month: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">등급</label>
              <input
                type="text"
                value={formData.grade}
                onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="예: 1등급"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">급여일수 *</label>
              <input
                type="number"
                required
                value={formData.serviceDays}
                onChange={(e) => setFormData({ ...formData, serviceDays: parseInt(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">급여비용 *</label>
              <input
                type="number"
                required
                value={formData.serviceAmount}
                onChange={(e) => setFormData({ ...formData, serviceAmount: parseInt(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">본인부담금 *</label>
              <input
                type="number"
                required
                value={formData.copayment}
                onChange={(e) => setFormData({ ...formData, copayment: parseInt(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">공단부담금</label>
              <input
                type="number"
                value={formData.insuranceAmount}
                readOnly
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">비고</label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                placeholder="특이사항이 있다면 입력하세요"
              />
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">총 급여비용</span>
              <span className="text-lg font-bold text-blue-600">{formData.serviceAmount.toLocaleString()}원</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">본인부담금</span>
              <span className="text-base font-medium text-purple-600">-{formData.copayment.toLocaleString()}원</span>
            </div>
            <div className="border-t border-blue-200 pt-2 flex justify-between items-center">
              <span className="text-sm font-bold text-gray-800">공단부담금</span>
              <span className="text-xl font-bold text-green-600">{formData.insuranceAmount.toLocaleString()}원</span>
            </div>
          </div>

          <div className="flex gap-3 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap cursor-pointer"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-lg hover:shadow-lg transition-all duration-300 whitespace-nowrap cursor-pointer"
            >
              {claim ? '수정하기' : '추가하기'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
