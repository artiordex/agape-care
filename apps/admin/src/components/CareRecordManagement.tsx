import { useState, useEffect } from 'react';

interface CareRecord {
  id: string;
  residentId: string;
  residentName: string;
  date: string;
  time: string;
  type: string;
  category: string;
  details: string;
  staffName: string;
  notes: string;
  vitalSigns?: {
    bloodPressure?: string;
    pulse?: string;
    temperature?: string;
    respiration?: string;
  };
}

export default function CareRecordManagement() {
  const [records, setRecords] = useState<CareRecord[]>([]);
  const [filteredRecords, setFilteredRecords] = useState<CareRecord[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingRecord, setEditingRecord] = useState<CareRecord | null>(null);
  const [residents, setResidents] = useState<any[]>([]);

  useEffect(() => {
    loadRecords();
    loadResidents();
  }, []);

  useEffect(() => {
    filterRecords();
  }, [records, searchTerm, filterDate, filterCategory]);

  const loadResidents = () => {
    const saved = localStorage.getItem('admin_residents');
    if (saved) {
      const allResidents = JSON.parse(saved);
      setResidents(allResidents.filter((r: any) => r.name));
    }
  };

  const loadRecords = () => {
    const saved = localStorage.getItem('admin_care_records');
    if (saved) {
      setRecords(JSON.parse(saved));
    } else {
      const initial: CareRecord[] = [
        {
          id: '1',
          residentId: '1',
          residentName: '김순자',
          date: new Date().toISOString().split('T')[0],
          time: '08:00',
          type: '식사',
          category: '일상케어',
          details: '아침식사 50% 섭취',
          staffName: '이수진',
          notes: '식욕 보통',
          vitalSigns: {}
        },
        {
          id: '2',
          residentId: '2',
          residentName: '박영희',
          date: new Date().toISOString().split('T')[0],
          time: '09:30',
          type: '간호기록',
          category: '건강관리',
          details: 'Vital Sign 측정',
          staffName: '김미경',
          notes: '정상 범위',
          vitalSigns: {
            bloodPressure: '120/80',
            pulse: '72',
            temperature: '36.5',
            respiration: '18'
          }
        }
      ];
      setRecords(initial);
      localStorage.setItem('admin_care_records', JSON.stringify(initial));
    }
  };

  const filterRecords = () => {
    let filtered = [...records];

    if (searchTerm) {
      filtered = filtered.filter(record =>
        record.residentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.staffName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterDate) {
      filtered = filtered.filter(record => record.date === filterDate);
    }

    if (filterCategory !== 'all') {
      filtered = filtered.filter(record => record.category === filterCategory);
    }

    filtered.sort((a, b) => {
      const dateA = new Date(`${a.date} ${a.time}`).getTime();
      const dateB = new Date(`${b.date} ${b.time}`).getTime();
      return dateB - dateA;
    });

    setFilteredRecords(filtered);
  };

  const handleSave = (recordData: Partial<CareRecord>) => {
    if (editingRecord) {
      const updated = records.map(r =>
        r.id === editingRecord.id ? { ...r, ...recordData } : r
      );
      setRecords(updated);
      localStorage.setItem('admin_care_records', JSON.stringify(updated));
    } else {
      const newRecord: CareRecord = {
        id: Date.now().toString(),
        residentId: recordData.residentId || '',
        residentName: recordData.residentName || '',
        date: recordData.date || new Date().toISOString().split('T')[0],
        time: recordData.time || new Date().toTimeString().slice(0, 5),
        type: recordData.type || '',
        category: recordData.category || '',
        details: recordData.details || '',
        staffName: recordData.staffName || '',
        notes: recordData.notes || '',
        vitalSigns: recordData.vitalSigns || {}
      };
      const updated = [...records, newRecord];
      setRecords(updated);
      localStorage.setItem('admin_care_records', JSON.stringify(updated));
    }
    setShowModal(false);
    setEditingRecord(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      const updated = records.filter(r => r.id !== id);
      setRecords(updated);
      localStorage.setItem('admin_care_records', JSON.stringify(updated));
    }
  };

  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: string } = {
      '일상케어': 'ri-user-smile-line',
      '건강관리': 'ri-heart-pulse-line',
      '투약': 'ri-medicine-bottle-line',
      '프로그램': 'ri-calendar-event-line',
      '사고보고': 'ri-alarm-warning-line',
      '응급상황': 'ri-emergency-line'
    };
    return icons[category] || 'ri-file-list-line';
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      '일상케어': 'bg-blue-100 text-blue-700',
      '건강관리': 'bg-green-100 text-green-700',
      '투약': 'bg-purple-100 text-purple-700',
      '프로그램': 'bg-orange-100 text-orange-700',
      '사고보고': 'bg-red-100 text-red-700',
      '응급상황': 'bg-pink-100 text-pink-700'
    };
    return colors[category] || 'bg-gray-100 text-gray-700';
  };

  const getTodayRecordsByCategory = () => {
    const today = new Date().toISOString().split('T')[0];
    const todayRecords = records.filter(r => r.date === today);
    
    return {
      total: todayRecords.length,
      daily: todayRecords.filter(r => r.category === '일상케어').length,
      health: todayRecords.filter(r => r.category === '건강관리').length,
      medication: todayRecords.filter(r => r.category === '투약').length,
      accident: todayRecords.filter(r => r.category === '사고보고' || r.category === '응급상황').length
    };
  };

  const todayStats = getTodayRecordsByCategory();

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">요양 케어 기록</h1>
        <p className="text-gray-600 text-sm">입소자별 일상케어, 건강관리, 투약, 사고 등을 기록합니다</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600 font-medium">오늘 총 기록</p>
              <p className="text-2xl font-bold text-blue-700">{todayStats.total}건</p>
            </div>
            <i className="ri-file-list-3-line text-4xl text-blue-500"></i>
          </div>
        </div>

        <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600 font-medium">건강관리</p>
              <p className="text-2xl font-bold text-green-700">{todayStats.health}건</p>
            </div>
            <i className="ri-heart-pulse-line text-4xl text-green-500"></i>
          </div>
        </div>

        <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-600 font-medium">투약 기록</p>
              <p className="text-2xl font-bold text-purple-700">{todayStats.medication}건</p>
            </div>
            <i className="ri-medicine-bottle-line text-4xl text-purple-500"></i>
          </div>
        </div>

        <div className="p-4 bg-gradient-to-br from-red-50 to-red-100 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-red-600 font-medium">사고/응급</p>
              <p className="text-2xl font-bold text-red-700">{todayStats.accident}건</p>
            </div>
            <i className="ri-alarm-warning-line text-4xl text-red-500"></i>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
              <input
                type="text"
                placeholder="입소자명 또는 작성자 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
          </div>
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent cursor-pointer"
          >
            <option value="all">전체 분류</option>
            <option value="일상케어">일상케어</option>
            <option value="건강관리">건강관리</option>
            <option value="투약">투약</option>
            <option value="프로그램">프로그램</option>
            <option value="사고보고">사고보고</option>
            <option value="응급상황">응급상황</option>
          </select>
          <button
            onClick={() => {
              setEditingRecord(null);
              setShowModal(true);
            }}
            className="px-6 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-lg hover:shadow-lg transition-all duration-300 whitespace-nowrap cursor-pointer"
          >
            <i className="ri-add-line mr-2"></i>
            기록 추가
          </button>
        </div>

        <div className="space-y-3">
          {filteredRecords.map((record) => (
            <div key={record.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3">
                  <div className={`w-12 h-12 flex items-center justify-center rounded-lg ${getCategoryColor(record.category)}`}>
                    <i className={`${getCategoryIcon(record.category)} text-2xl`}></i>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-bold text-gray-800">{record.residentName}</h3>
                      <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getCategoryColor(record.category)}`}>
                        {record.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <span><i className="ri-calendar-line mr-1"></i>{record.date}</span>
                      <span><i className="ri-time-line mr-1"></i>{record.time}</span>
                      <span><i className="ri-user-line mr-1"></i>{record.staffName}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setEditingRecord(record);
                      setShowModal(true);
                    }}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded cursor-pointer"
                  >
                    <i className="ri-edit-line text-lg"></i>
                  </button>
                  <button
                    onClick={() => handleDelete(record.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded cursor-pointer"
                  >
                    <i className="ri-delete-bin-line text-lg"></i>
                  </button>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-3 mb-3">
                <div className="text-sm font-medium text-gray-700 mb-1">{record.type}</div>
                <div className="text-sm text-gray-600">{record.details}</div>
              </div>

              {record.vitalSigns && Object.keys(record.vitalSigns).length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                  {record.vitalSigns.bloodPressure && (
                    <div className="bg-red-50 rounded-lg p-2">
                      <p className="text-xs text-red-600 font-medium">혈압</p>
                      <p className="text-sm font-bold text-red-700">{record.vitalSigns.bloodPressure} mmHg</p>
                    </div>
                  )}
                  {record.vitalSigns.pulse && (
                    <div className="bg-pink-50 rounded-lg p-2">
                      <p className="text-xs text-pink-600 font-medium">맥박</p>
                      <p className="text-sm font-bold text-pink-700">{record.vitalSigns.pulse} bpm</p>
                    </div>
                  )}
                  {record.vitalSigns.temperature && (
                    <div className="bg-orange-50 rounded-lg p-2">
                      <p className="text-xs text-orange-600 font-medium">체온</p>
                      <p className="text-sm font-bold text-orange-700">{record.vitalSigns.temperature} °C</p>
                    </div>
                  )}
                  {record.vitalSigns.respiration && (
                    <div className="bg-blue-50 rounded-lg p-2">
                      <p className="text-xs text-blue-600 font-medium">호흡</p>
                      <p className="text-sm font-bold text-blue-700">{record.vitalSigns.respiration} /min</p>
                    </div>
                  )}
                </div>
              )}

              {record.notes && (
                <div className="text-sm text-gray-600">
                  <span className="font-medium">특이사항:</span> {record.notes}
                </div>
              )}
            </div>
          ))}

          {filteredRecords.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <i className="ri-file-list-line text-5xl mb-3 block"></i>
              <p>등록된 케어 기록이 없습니다</p>
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <CareRecordModal
          record={editingRecord}
          residents={residents}
          onClose={() => {
            setShowModal(false);
            setEditingRecord(null);
          }}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

function CareRecordModal({ record, residents, onClose, onSave }: {
  record: CareRecord | null;
  residents: any[];
  onClose: () => void;
  onSave: (data: Partial<CareRecord>) => void;
}) {
  const [formData, setFormData] = useState({
    residentId: record?.residentId || '',
    residentName: record?.residentName || '',
    date: record?.date || new Date().toISOString().split('T')[0],
    time: record?.time || new Date().toTimeString().slice(0, 5),
    category: record?.category || '일상케어',
    type: record?.type || '',
    details: record?.details || '',
    staffName: record?.staffName || '',
    notes: record?.notes || '',
    vitalSigns: {
      bloodPressure: record?.vitalSigns?.bloodPressure || '',
      pulse: record?.vitalSigns?.pulse || '',
      temperature: record?.vitalSigns?.temperature || '',
      respiration: record?.vitalSigns?.respiration || ''
    }
  });

  const careTypes: { [key: string]: string[] } = {
    '일상케어': ['식사', '배변', '세면', '목욕', '옷갈아입기', '체위변경', '산책', '운동'],
    '건강관리': ['간호기록', 'Vital Sign 측정', '욕창관리', '상처치료', '건강상담'],
    '투약': ['정기투약', '응급투약', '약품변경', '투약거부'],
    '프로그램': ['인지프로그램', '레크리에이션', '물리치료', '음악치료', '미술활동'],
    '사고보고': ['낙상', '실종', '폭력', '기타사고'],
    '응급상황': ['응급실이송', '119신고', '응급처치', '병원진료']
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleResidentChange = (residentId: string) => {
    const resident = residents.find(r => r.id === residentId);
    if (resident) {
      setFormData({
        ...formData,
        residentId: resident.id,
        residentName: resident.name
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h3 className="text-xl font-bold text-gray-800">
            {record ? '케어 기록 수정' : '새 케어 기록 추가'}
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
                    {resident.name} (베드 {resident.bedNumber})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">날짜 *</label>
              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">시간 *</label>
              <input
                type="time"
                required
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">분류 *</label>
              <select
                required
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value, type: '' })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent cursor-pointer"
              >
                <option value="일상케어">일상케어</option>
                <option value="건강관리">건강관리</option>
                <option value="투약">투약</option>
                <option value="프로그램">프로그램</option>
                <option value="사고보고">사고보고</option>
                <option value="응급상황">응급상황</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">유형 *</label>
              <select
                required
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent cursor-pointer"
              >
                <option value="">유형 선택</option>
                {careTypes[formData.category]?.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">상세 내용 *</label>
              <textarea
                required
                value={formData.details}
                onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                placeholder="케어 내용을 상세히 기록하세요"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">작성자 *</label>
              <input
                type="text"
                required
                value={formData.staffName}
                onChange={(e) => setFormData({ ...formData, staffName: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="작성자명 입력"
              />
            </div>

            {formData.category === '건강관리' && (
              <>
                <div className="md:col-span-2">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                    <i className="ri-heart-pulse-line mr-2 text-red-500"></i>
                    Vital Signs (선택사항)
                  </h4>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">혈압 (mmHg)</label>
                  <input
                    type="text"
                    value={formData.vitalSigns.bloodPressure}
                    onChange={(e) => setFormData({
                      ...formData,
                      vitalSigns: { ...formData.vitalSigns, bloodPressure: e.target.value }
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="예: 120/80"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">맥박 (bpm)</label>
                  <input
                    type="text"
                    value={formData.vitalSigns.pulse}
                    onChange={(e) => setFormData({
                      ...formData,
                      vitalSigns: { ...formData.vitalSigns, pulse: e.target.value }
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="예: 72"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">체온 (°C)</label>
                  <input
                    type="text"
                    value={formData.vitalSigns.temperature}
                    onChange={(e) => setFormData({
                      ...formData,
                      vitalSigns: { ...formData.vitalSigns, temperature: e.target.value }
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="예: 36.5"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">호흡 (/min)</label>
                  <input
                    type="text"
                    value={formData.vitalSigns.respiration}
                    onChange={(e) => setFormData({
                      ...formData,
                      vitalSigns: { ...formData.vitalSigns, respiration: e.target.value }
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="예: 18"
                  />
                </div>
              </>
            )}

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">특이사항</label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={2}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                placeholder="추가로 기록할 특이사항이 있다면 입력하세요"
              />
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
              {record ? '수정하기' : '기록하기'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
