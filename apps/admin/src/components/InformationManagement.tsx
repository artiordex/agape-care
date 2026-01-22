
import { useState, useEffect } from 'react';

interface Information {
  id: string;
  type: 'careRecord' | 'payroll' | 'program' | 'newsletter' | 'menu';
  title: string;
  month: string;
  status: 'draft' | 'published';
  fileUrl: string;
  fileName: string;
  providedToFamily: boolean;
  notes: string;
  createdAt: string;
  publishedAt?: string;
}

const informationTypes = [
  { value: 'careRecord', label: '급여제공기록지', icon: 'ri-file-text-line', color: 'blue' },
  { value: 'payroll', label: '급여명세서', icon: 'ri-money-dollar-circle-line', color: 'green' },
  { value: 'program', label: '프로그램 일정', icon: 'ri-calendar-event-line', color: 'purple' },
  { value: 'newsletter', label: '가정통신문', icon: 'ri-mail-send-line', color: 'orange' },
  { value: 'menu', label: '식단표', icon: 'ri-restaurant-line', color: 'teal' },
];

export default function InformationManagement() {
  const [informations, setInformations] = useState<Information[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInfo, setSelectedInfo] = useState<Information | null>(null);
  const [filter, setFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const [formData, setFormData] = useState({
    type: 'careRecord' as Information['type'],
    title: '',
    month: new Date().toISOString().slice(0, 7),
    fileUrl: '',
    fileName: '',
    notes: '',
  });

  /** Load data from localStorage on mount */
  useEffect(() => {
    loadInformations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** Helper: read from localStorage or initialise with demo data */
  const loadInformations = () => {
    const saved = localStorage.getItem('informations');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) setInformations(parsed);
      } catch (e) {
        console.error('Failed to parse stored informations', e);
      }
    } else {
      const initialData: Information[] = [
        {
          id: '1',
          type: 'menu',
          title: '2025년 1월 식단표',
          month: '2025-01',
          status: 'published',
          fileUrl:
            'https://readdy.ai/api/search-image?query=Korean%20nursing%20home%20monthly%20menu%20plan%20with%20balanced%20nutritious%20meals%20breakfast%20lunch%20dinner%20displayed%20on%20clean%20white%20background%20organized%20weekly%20schedule%20table%20format%20soft%20natural%20lighting%20professional%20food%20photography%20style%20warm%20inviting%20atmosphere&width=800&height=600&seq=menu1&orientation=landscape',
          fileName: '2025_01_식단표.pdf',
          providedToFamily: true,
          notes: '보호자 앱을 통해 배포 완료',
          createdAt: '2025-01-05',
          publishedAt: '2025-01-05',
        },
        {
          id: '2',
          type: 'program',
          title: '1월 프로그램 일정표',
          month: '2025-01',
          status: 'published',
          fileUrl:
            'https://readdy.ai/api/search-image?query=Activity%20calendar%20for%20elderly%20care%20center%20with%20colorful%20program%20schedule%20including%20music%20therapy%20physical%20exercise%20cognitive%20activities%20displayed%20on%20clean%20white%20background%20organized%20weekly%20format%20soft%20lighting%20professional%20design&width=800&height=600&seq=program1&orientation=landscape',
          fileName: '2025_01_프로그램일정.pdf',
          providedToFamily: true,
          notes: '',
          createdAt: '2025-01-03',
          publishedAt: '2025-01-03',
        },
        {
          id: '3',
          type: 'newsletter',
          title: '1월 가정통신문',
          month: '2025-01',
          status: 'draft',
          fileUrl: '',
          fileName: '',
          providedToFamily: false,
          notes: '작성 중',
          createdAt: '2025-01-10',
        },
      ];
      setInformations(initialData);
      localStorage.setItem('informations', JSON.stringify(initialData));
    }
  };

  /** Helper: persist to localStorage and state */
  const saveInformations = (data: Information[]) => {
    localStorage.setItem('informations', JSON.stringify(data));
    setInformations(data);
  };

  /** Form submit – create or update */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedInfo) {
      const updated = informations.map((item) =>
        item.id === selectedInfo.id ? { ...item, ...formData, status: item.status } : item,
      );
      saveInformations(updated);
    } else {
      const newInfo: Information = {
        id: Date.now().toString(),
        ...formData,
        status: 'draft',
        providedToFamily: false,
        createdAt: new Date().toISOString().split('T')[0],
      };
      saveInformations([...informations, newInfo]);
    }

    setIsModalOpen(false);
    setSelectedInfo(null);
    resetForm();
  };

  /** Open edit modal and fill form */
  const handleEdit = (info: Information) => {
    setSelectedInfo(info);
    setFormData({
      type: info.type,
      title: info.title,
      month: info.month,
      fileUrl: info.fileUrl,
      fileName: info.fileName,
      notes: info.notes,
    });
    setIsModalOpen(true);
  };

  /** Delete after confirmation */
  const handleDelete = (id: string) => {
    if (window.confirm('이 항목을 삭제하시겠습니까?')) {
      saveInformations(informations.filter((item) => item.id !== id));
    }
  };

  /** Toggle published / draft */
  const handlePublish = (id: string) => {
    const updated = informations.map((item) =>
      item.id === id
        ? {
            ...item,
            status: item.status === 'published' ? 'draft' : 'published',
            publishedAt:
              item.status === 'draft' ? new Date().toISOString().split('T')[0] : item.publishedAt,
          }
        : item,
    );
    saveInformations(updated);
  };

  /** Toggle “provided to family” flag */
  const handleProvideToggle = (id: string) => {
    const updated = informations.map((item) =>
      item.id === id ? { ...item, providedToFamily: !item.providedToFamily } : item,
    );
    saveInformations(updated);
  };

  /** Reset form to defaults */
  const resetForm = () => {
    setFormData({
      type: 'careRecord',
      title: '',
      month: new Date().toISOString().slice(0, 7),
      fileUrl: '',
      fileName: '',
      notes: '',
    });
  };

  /** Apply filter & search */
  const filteredInformations = informations
    .filter((item) => filter === 'all' || item.type === filter)
    .filter(
      (item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.month.includes(searchTerm),
    );

  /** Statistics */
  const stats = {
    total: informations.length,
    published: informations.filter((i) => i.status === 'published').length,
    provided: informations.filter((i) => i.providedToFamily).length,
    draft: informations.filter((i) => i.status === 'draft').length,
  };

  /** Resolve type info (label, icon, colour) */
  const getTypeInfo = (type: string) => {
    return informationTypes.find((t) => t.value === type) || informationTypes[0];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">정보 제공 관리</h2>
          <p className="text-sm text-gray-500 mt-1">월별 필수 정보 자료를 관리합니다</p>
        </div>
        <button
          onClick={() => {
            setSelectedInfo(null);
            resetForm();
            setIsModalOpen(true);
          }}
          className="whitespace-nowrap px-4 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-lg hover:from-teal-600 hover:to-cyan-600 transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer"
        >
          <i className="ri-add-line mr-2" />
          자료 추가
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">전체 자료</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">{stats.total}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <i className="ri-file-list-3-line text-2xl text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">게시됨</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">{stats.published}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <i className="ri-checkbox-circle-line text-2xl text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-teal-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">가족 제공</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">{stats.provided}</p>
            </div>
            <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
              <i className="ri-send-plane-fill text-2xl text-teal-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-gray-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">임시저장</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">{stats.draft}</p>
            </div>
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
              <i className="ri-draft-line text-2xl text-gray-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="제목, 월 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
          <div>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent cursor-pointer"
            >
              <option value="all">전체 유형</option>
              {informationTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredInformations.map((info) => {
          const typeInfo = getTypeInfo(info.type);
          return (
            <div key={info.id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-200">
              {/* Image preview */}
              {info.fileUrl && (
                <div className="relative w-full h-48 overflow-hidden rounded-t-xl">
                  <img src={info.fileUrl} alt={info.title} className="w-full h-full object-cover object-top" />
                  <div className="absolute top-3 right-3 flex gap-2">
                    {info.status === 'published' && (
                      <span className="px-2 py-1 bg-green-500 text-white text-xs font-medium rounded-full">
                        게시됨
                      </span>
                    )}
                    {info.providedToFamily && (
                      <span className="px-2 py-1 bg-teal-500 text-white text-xs font-medium rounded-full">
                        제공완료
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Content */}
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className={`w-8 h-8 bg-${typeInfo.color}-100 rounded-lg flex items-center justify-center`}>
                    <i className={`${typeInfo.icon} text-${typeInfo.color}-600`} />
                  </div>
                  <span className={`text-xs font-medium text-${typeInfo.color}-600`}>{typeInfo.label}</span>
                </div>

                <h3 className="text-lg font-bold text-gray-800 mb-2">{info.title}</h3>

                <div className="space-y-1 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <i className="ri-calendar-line mr-2" />
                    {info.month}
                  </div>
                  {info.fileName && (
                    <div className="flex items-center text-sm text-gray-600">
                      <i className="ri-file-line mr-2" />
                      {info.fileName}
                    </div>
                  )}
                  {info.notes && <div className="text-xs text-gray-500 mt-2">{info.notes}</div>}
                </div>

                {/* Action buttons */}
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handlePublish(info.id)}
                    className={`flex-1 px-3 py-2 text-sm rounded-lg transition-colors cursor-pointer ${
                      info.status === 'published'
                        ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        : 'bg-green-500 text-white hover:bg-green-600'
                    }`}
                  >
                    <i className={`${info.status === 'published' ? 'ri-eye-off-line' : 'ri-send-plane-line'} mr-1`} />
                    {info.status === 'published' ? '숨김' : '게시'}
                  </button>

                  <button
                    onClick={() => handleProvideToggle(info.id)}
                    className={`flex-1 px-3 py-2 text-sm rounded-lg transition-colors cursor-pointer ${
                      info.providedToFamily
                        ? 'bg-teal-100 text-teal-700 hover:bg-teal-200'
                        : 'bg-teal-500 text-white hover:bg-teal-600'
                    }`}
                  >
                    <i className="ri-parent-line mr-1" />
                    {info.providedToFamily ? '제공완료' : '가족제공'}
                  </button>

                  <button
                    onClick={() => handleEdit(info)}
                    className="px-3 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors cursor-pointer"
                  >
                    <i className="ri-edit-line" />
                  </button>

                  <button
                    onClick={() => handleDelete(info.id)}
                    className="px-3 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors cursor-pointer"
                  >
                    <i className="ri-delete-bin-line" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {filteredInformations.length === 0 && (
          <div className="col-span-full bg-white rounded-xl shadow-md p-12 text-center">
            <i className="ri-file-list-3-line text-5xl text-gray-400 mb-4" />
            <p className="text-gray-500">등록된 자료가 없습니다</p>
          </div>
        )}
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-800">{selectedInfo ? '자료 수정' : '자료 추가'}</h3>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setSelectedInfo(null);
                  resetForm();
                }}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <i className="ri-close-line text-2xl" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Type selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">자료 유형 *</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {informationTypes.map((type) => (
                    <label
                      key={type.value}
                      className={`flex items-center gap-2 p-3 border-2 rounded-lg cursor-pointer transition-all ${
                        formData.type === type.value
                          ? `border-${type.color}-500 bg-${type.color}-50`
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        value={type.value}
                        checked={formData.type === type.value}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                        className="cursor-pointer"
                      />
                      <i className={`${type.icon} text-${type.color}-600`} />
                      <span className="text-sm font-medium text-gray-700">{type.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">제목 *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="예: 2025년 1월 식단표"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Month */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">해당 월 *</label>
                <input
                  type="month"
                  value={formData.month}
                  onChange={(e) => setFormData({ ...formData, month: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent cursor-pointer"
                  required
                />
              </div>

              {/* File URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">파일 URL</label>
                <input
                  type="url"
                  value={formData.fileUrl}
                  onChange={(e) => setFormData({ ...formData, fileUrl: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>

              {/* File name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">파일명</label>
                <input
                  type="text"
                  value={formData.fileName}
                  onChange={(e) => setFormData({ ...formData, fileName: e.target.value })}
                  placeholder="예: 2025_01_식단표.pdf"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">비고</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                  placeholder="추가 메모를 입력하세요"
                />
              </div>

              {/* Form actions */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setSelectedInfo(null);
                    resetForm();
                  }}
                  className="whitespace-nowrap flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="whitespace-nowrap flex-1 px-4 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-lg hover:from-teal-600 hover:to-cyan-600 transition-all duration-200 cursor-pointer"
                >
                  {selectedInfo ? '수정' : '추가'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
