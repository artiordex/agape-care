
import { useState, useEffect } from 'react';

interface Inspection {
  id: string;
  type: 'daily' | 'regular';
  category: string;
  title: string;
  frequency: string;
  nextDate: string;
  status: 'scheduled' | 'completed' | 'overdue';
  inspector: string;
  checklist: string[];
  checkResult: boolean[];
  notes: string;
  photos: string[];
  completedDate?: string;
  createdAt: string;
}

const inspectionTemplates = {
  daily: [
    { title: '일상생활 소독', frequency: '매일', checklist: ['거실 소독', '복도 소독', '화장실 소독', '손잡이 소독', '침대 주변 소독'] },
    { title: '주방 집기류 소독', frequency: '주 1회', checklist: ['식기 소독', '조리대 소독', '냉장고 청소', '가스레인지 청소', '싱크대 소독'] },
    { title: '간호비품 소독', frequency: '사용 후', checklist: ['혈압계 소독', '체온계 소독', '청진기 소독', '의료용 가위 소독', '보조기구 소독'] }
  ],
  regular: [
    { title: '전문소독', frequency: '분기 1회', checklist: ['전 구역 방역', '해충 방제', '소독증명서 확보', '소독 결과 기록', '차기 일정 확인'] },
    { title: '소방시설 점검', frequency: '월 1회', checklist: ['소화기 점검', '스프링클러 점검', '비상구 확인', '화재경보기 점검', '피난유도등 점검'] },
    { title: '전기안전관리 점검', frequency: '월 1회', checklist: ['배전반 점검', '누전차단기 점검', '콘센트 점검', '조명 점검', '전선 노후 확인'] },
    { title: '가스안전관리 점검', frequency: '월 1회', checklist: ['가스레인지 점검', '가스밸브 점검', '가스감지기 점검', '환기설비 점검', '가스배관 점검'] },
    { title: '약품 점검', frequency: '분기 1회', checklist: ['유효기간 확인', '보관상태 확인', '재고 파악', '폐기약품 처리', '약품대장 정리'] },
    { title: '시설운영일지', frequency: '수시', checklist: ['입소자 현황', '직원 근무상황', '특이사항 기록', '방문객 기록', '시설 이상 여부'] }
  ]
};

export default function InspectionManagement() {
  const [inspections, setInspections] = useState<Inspection[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedInspection, setSelectedInspection] = useState<Inspection | null>(null);
  const [filter, setFilter] = useState<'all' | 'daily' | 'regular'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'scheduled' | 'completed' | 'overdue'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const [formData, setFormData] = useState({
    type: 'daily' as 'daily' | 'regular',
    category: '',
    title: '',
    frequency: '',
    nextDate: new Date().toISOString().split('T')[0],
    inspector: '',
    checklist: [] as string[],
    notes: '',
    photos: [] as string[]
  });

  useEffect(() => {
    loadInspections();
  }, []);

  const loadInspections = () => {
    const saved = localStorage.getItem('inspections');
    if (saved) {
      setInspections(JSON.parse(saved));
    } else {
      // 초기 더미 데이터
      const initialInspections: Inspection[] = [
        {
          id: '1',
          type: 'daily',
          category: '일일점검',
          title: '일상생활 소독',
          frequency: '매일',
          nextDate: new Date().toISOString().split('T')[0],
          status: 'scheduled',
          inspector: '',
          checklist: ['거실 소독', '복도 소독', '화장실 소독', '손잡이 소독', '침대 주변 소독'],
          checkResult: [],
          notes: '',
          photos: [],
          createdAt: new Date().toISOString()
        },
        {
          id: '2',
          type: 'regular',
          category: '정기점검',
          title: '소방시설 점검',
          frequency: '월 1회',
          nextDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          status: 'scheduled',
          inspector: '',
          checklist: ['소화기 점검', '스프링클러 점검', '비상구 확인', '화재경보기 점검', '피난유도등 점검'],
          checkResult: [],
          notes: '',
          photos: [],
          createdAt: new Date().toISOString()
        }
      ];
      setInspections(initialInspections);
      localStorage.setItem('inspections', JSON.stringify(initialInspections));
    }
  };

  const saveInspections = (data: Inspection[]) => {
    localStorage.setItem('inspections', JSON.stringify(data));
    setInspections(data);
  };

  const getStatus = (inspection: Inspection): 'scheduled' | 'completed' | 'overdue' => {
    if (inspection.status === 'completed') return 'completed';
    const today = new Date().toISOString().split('T')[0];
    if (inspection.nextDate < today) return 'overdue';
    return 'scheduled';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newInspection: Inspection = {
      id: Date.now().toString(),
      ...formData,
      category: formData.type === 'daily' ? '일일점검' : '정기점검',
      status: 'scheduled',
      checkResult: new Array(formData.checklist.length).fill(false),
      createdAt: new Date().toISOString()
    };

    saveInspections([...inspections, newInspection]);
    setIsModalOpen(false);
    resetForm();
  };

  const handleComplete = (inspection: Inspection) => {
    setSelectedInspection({
      ...inspection,
      checkResult: new Array(inspection.checklist.length).fill(false)
    });
    setIsDetailModalOpen(true);
  };

  const handleSaveCompletion = () => {
    if (!selectedInspection) return;

    const updated = inspections.map(item =>
      item.id === selectedInspection.id
        ? {
            ...selectedInspection,
            status: 'completed' as const,
            completedDate: new Date().toISOString().split('T')[0]
          }
        : item
    );

    saveInspections(updated);
    setIsDetailModalOpen(false);
    setSelectedInspection(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('이 점검 항목을 삭제하시겠습니까?')) {
      saveInspections(inspections.filter(item => item.id !== id));
    }
  };

  const handleTemplateSelect = (type: 'daily' | 'regular', index: number) => {
    const template = type === 'daily' ? inspectionTemplates.daily[index] : inspectionTemplates.regular[index];
    setFormData({
      ...formData,
      type,
      title: template.title,
      frequency: template.frequency,
      checklist: template.checklist
    });
  };

  const resetForm = () => {
    setFormData({
      type: 'daily',
      category: '',
      title: '',
      frequency: '',
      nextDate: new Date().toISOString().split('T')[0],
      inspector: '',
      checklist: [],
      notes: '',
      photos: []
    });
  };

  const filteredInspections = inspections
    .filter(item => filter === 'all' || item.type === filter)
    .filter(item => statusFilter === 'all' || getStatus(item) === statusFilter)
    .filter(item =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.inspector.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const stats = {
    total: inspections.length,
    scheduled: inspections.filter(i => getStatus(i) === 'scheduled').length,
    completed: inspections.filter(i => getStatus(i) === 'completed').length,
    overdue: inspections.filter(i => getStatus(i) === 'overdue').length
  };

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">점검 관리</h2>
          <p className="text-sm text-gray-500 mt-1">일일점검 및 정기점검을 관리합니다</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="whitespace-nowrap px-4 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-lg hover:from-teal-600 hover:to-cyan-600 transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer"
        >
          <i className="ri-add-line mr-2"></i>
          점검 추가
        </button>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">전체 점검</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">{stats.total}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <i className="ri-file-list-3-line text-2xl text-blue-600"></i>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">예정</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">{stats.scheduled}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <i className="ri-calendar-check-line text-2xl text-green-600"></i>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-teal-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">완료</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">{stats.completed}</p>
            </div>
            <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
              <i className="ri-checkbox-circle-line text-2xl text-teal-600"></i>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-red-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">지연</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">{stats.overdue}</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <i className="ri-error-warning-line text-2xl text-red-600"></i>
            </div>
          </div>
        </div>
      </div>

      {/* 필터 */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="점검명, 점검자 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent cursor-pointer"
            >
              <option value="all">전체 유형</option>
              <option value="daily">일일점검</option>
              <option value="regular">정기점검</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent cursor-pointer"
            >
              <option value="all">전체 상태</option>
              <option value="scheduled">예정</option>
              <option value="completed">완료</option>
              <option value="overdue">지연</option>
            </select>
          </div>
        </div>
      </div>

      {/* 점검 목록 */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-teal-50 to-cyan-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">유형</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">점검명</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">주기</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">예정일</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">점검자</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">상태</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">작업</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredInspections.map((inspection, index) => {
                const status = getStatus(inspection);
                return (
                  <tr key={inspection.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        inspection.type === 'daily' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-purple-100 text-purple-800'
                      }`}>
                        {inspection.type === 'daily' ? '일일점검' : '정기점검'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{inspection.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">{inspection.frequency}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">{inspection.nextDate}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">{inspection.inspector || '-'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        status === 'completed' 
                          ? 'bg-teal-100 text-teal-800'
                          : status === 'overdue'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {status === 'completed' ? '완료' : status === 'overdue' ? '지연' : '예정'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex items-center gap-2">
                        {status !== 'completed' && (
                          <button
                            onClick={() => handleComplete(inspection)}
                            className="text-teal-600 hover:text-teal-800 cursor-pointer"
                            title="점검 완료"
                          >
                            <i className="ri-checkbox-circle-line text-lg"></i>
                          </button>
                        )}
                        {status === 'completed' && (
                          <button
                            onClick={() => {
                              setSelectedInspection(inspection);
                              setIsDetailModalOpen(true);
                            }}
                            className="text-blue-600 hover:text-blue-800 cursor-pointer"
                            title="상세보기"
                          >
                            <i className="ri-eye-line text-lg"></i>
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(inspection.id)}
                          className="text-red-600 hover:text-red-800 cursor-pointer"
                          title="삭제"
                        >
                          <i className="ri-delete-bin-line text-lg"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filteredInspections.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                    <i className="ri-file-list-3-line text-4xl mb-2"></i>
                    <p>등록된 점검 항목이 없습니다</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 추가 모달 */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-800">점검 추가</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <i className="ri-close-line text-2xl"></i>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* 점검 유형 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">점검 유형</label>
                <div className="flex gap-4">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      value="daily"
                      checked={formData.type === 'daily'}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value as 'daily' })}
                      className="mr-2 cursor-pointer"
                    />
                    <span className="text-sm text-gray-700">일일점검</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      value="regular"
                      checked={formData.type === 'regular'}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value as 'regular' })}
                      className="mr-2 cursor-pointer"
                    />
                    <span className="text-sm text-gray-700">정기점검</span>
                  </label>
                </div>
              </div>

              {/* 템플릿 선택 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">템플릿 선택 (선택사항)</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {(formData.type === 'daily' ? inspectionTemplates.daily : inspectionTemplates.regular).map((template, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleTemplateSelect(formData.type, index)}
                      className="text-left p-3 border border-gray-300 rounded-lg hover:border-teal-500 hover:bg-teal-50 transition-colors cursor-pointer"
                    >
                      <div className="text-sm font-medium text-gray-800">{template.title}</div>
                      <div className="text-xs text-gray-500 mt-1">{template.frequency}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 점검명 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">점검명 *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  required
                />
              </div>

              {/* 점검 주기 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">점검 주기 *</label>
                <input
                  type="text"
                  value={formData.frequency}
                  onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
                  placeholder="예: 매일, 주 1회, 월 1회, 분기 1회"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  required
                />
              </div>

              {/* 예정일 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">다음 점검 예정일 *</label>
                <input
                  type="date"
                  value={formData.nextDate}
                  onChange={(e) => setFormData({ ...formData, nextDate: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent cursor-pointer"
                  required
                />
              </div>

              {/* 체크리스트 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">점검 체크리스트</label>
                <div className="space-y-2 mb-2">
                  {formData.checklist.map((item, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => {
                          const newChecklist = [...formData.checklist];
                          newChecklist[index] = e.target.value;
                          setFormData({ ...formData, checklist: newChecklist });
                        }}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const newChecklist = formData.checklist.filter((_, i) => i !== index);
                          setFormData({ ...formData, checklist: newChecklist });
                        }}
                        className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 cursor-pointer"
                      >
                        <i className="ri-delete-bin-line"></i>
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, checklist: [...formData.checklist, ''] })}
                  className="whitespace-nowrap w-full px-4 py-2 border-2 border-dashed border-gray-300 text-gray-600 rounded-lg hover:border-teal-500 hover:text-teal-500 transition-colors cursor-pointer"
                >
                  <i className="ri-add-line mr-2"></i>
                  항목 추가
                </button>
              </div>

              {/* 버튼 */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="whitespace-nowrap flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="whitespace-nowrap flex-1 px-4 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-lg hover:from-teal-600 hover:to-cyan-600 transition-all duration-200 cursor-pointer"
                >
                  추가
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 점검 완료/상세 모달 */}
      {isDetailModalOpen && selectedInspection && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-800">
                {selectedInspection.status === 'completed' ? '점검 상세' : '점검 완료'}
              </h3>
              <button
                onClick={() => {
                  setIsDetailModalOpen(false);
                  setSelectedInspection(null);
                }}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <i className="ri-close-line text-2xl"></i>
              </button>
            </div>

            <div className="p-6 space-y-4">
              {/* 기본 정보 */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm font-medium text-gray-800 mb-2">{selectedInspection.title}</div>
                <div className="text-xs text-gray-600">주기: {selectedInspection.frequency}</div>
                <div className="text-xs text-gray-600">예정일: {selectedInspection.nextDate}</div>
              </div>

              {/* 점검자 */}
              {selectedInspection.status !== 'completed' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">점검자 *</label>
                  <input
                    type="text"
                    value={selectedInspection.inspector}
                    onChange={(e) => setSelectedInspection({ ...selectedInspection, inspector: e.target.value })}
                    placeholder="점검자 이름을 입력하세요"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
              )}

              {/* 체크리스트 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">점검 체크리스트</label>
                <div className="space-y-2">
                  {selectedInspection.checklist.map((item, index) => (
                    <label key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                      <input
                        type="checkbox"
                        checked={selectedInspection.checkResult[index] || false}
                        onChange={(e) => {
                          const newResult = [...selectedInspection.checkResult];
                          newResult[index] = e.target.checked;
                          setSelectedInspection({ ...selectedInspection, checkResult: newResult });
                        }}
                        disabled={selectedInspection.status === 'completed'}
                        className="w-5 h-5 cursor-pointer"
                      />
                      <span className="text-sm text-gray-700">{item}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* 특이사항 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">특이사항</label>
                <textarea
                  value={selectedInspection.notes}
                  onChange={(e) => setSelectedInspection({ ...selectedInspection, notes: e.target.value })}
                  disabled={selectedInspection.status === 'completed'}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                  placeholder="점검 중 발견한 특이사항을 기록하세요"
                />
              </div>

              {/* 완료 정보 */}
              {selectedInspection.status === 'completed' && (
                <div className="bg-teal-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 text-teal-800 mb-2">
                    <i className="ri-checkbox-circle-fill text-xl"></i>
                    <span className="font-medium">완료된 점검</span>
                  </div>
                  <div className="text-sm text-teal-700">
                    <div>점검자: {selectedInspection.inspector}</div>
                    <div>완료일: {selectedInspection.completedDate}</div>
                    <div>
                      완료 항목: {selectedInspection.checkResult.filter(Boolean).length} / {selectedInspection.checklist.length}
                    </div>
                  </div>
                </div>
              )}

              {/* 버튼 */}
              {selectedInspection.status !== 'completed' && (
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setIsDetailModalOpen(false);
                      setSelectedInspection(null);
                    }}
                    className="whitespace-nowrap flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    취소
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveCompletion}
                    className="whitespace-nowrap flex-1 px-4 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-lg hover:from-teal-600 hover:to-cyan-600 transition-all duration-200 cursor-pointer"
                  >
                    완료 저장
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
