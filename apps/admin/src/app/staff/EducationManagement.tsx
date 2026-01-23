import { useState, useEffect } from 'react';

interface Education {
  id: string;
  type: 'humanRights' | 'staffRights' | 'disaster' | 'competency' | 'legal';
  title: string;
  date: string;
  time: string;
  instructor: string;
  location: string;
  participants: string[];
  attendanceRate: number;
  fileUrl: string;
  fileName: string;
  summary: string;
  evaluation: string;
  notes: string;
  createdAt: string;
}

const educationTypes = [
  { value: 'humanRights', label: '노인인권 및 학대예방', frequency: '연 1회', color: 'red' },
  { value: 'staffRights', label: '직원인권 침해대응', frequency: '연 1회', color: 'orange' },
  { value: 'disaster', label: '재난상황 대응훈련', frequency: '반기 1회', color: 'yellow' },
  { value: 'competency', label: '역량 강화 교육', frequency: '연 1회', color: 'green' },
  { value: 'legal', label: '장기요양기관 법정교육', frequency: '연 1회 이상', color: 'blue' }
];

export default function EducationManagement() {
  const [educations, setEducations] = useState<Education[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEducation, setSelectedEducation] = useState<Education | null>(null);
  const [filter, setFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const [formData, setFormData] = useState({
    type: 'humanRights' as Education['type'],
    title: '',
    date: new Date().toISOString().split('T')[0],
    time: '14:00',
    instructor: '',
    location: '',
    participants: [''],
    fileUrl: '',
    fileName: '',
    summary: '',
    evaluation: '',
    notes: ''
  });

  useEffect(() => {
    loadEducations();
  }, []);

  const loadEducations = () => {
    const saved = localStorage.getItem('educations');
    if (saved) {
      setEducations(JSON.parse(saved));
    } else {
      const initialEducations: Education[] = [
        {
          id: '1',
          type: 'humanRights',
          title: '2024년 노인인권 및 학대예방 교육',
          date: '2024-03-15',
          time: '14:00',
          instructor: '김인권 강사',
          location: '시설 2층 교육실',
          participants: ['시설장', '간호사 2명', '요양보호사 8명', '조리원 1명', '사회복지사 1명'],
          attendanceRate: 100,
          fileUrl: 'https://readdy.ai/api/search-image?query=Professional%20training%20session%20in%20nursing%20care%20facility%20with%20elderly%20care%20staff%20attending%20human%20rights%20education%20seminar%20instructor%20presenting%20at%20front%20warm%20lighting%20clean%20modern%20training%20room%20engaged%20participants&width=800&height=500&seq=edu1&orientation=landscape',
          fileName: '2024_노인인권교육_자료.pdf',
          summary: '노인 인권의 중요성, 학대 유형 및 신고 절차, 예방 방법 등을 교육',
          evaluation: '전 직원이 적극적으로 참여하였으며, 사례 중심 교육으로 실무 적용 가능성이 높음',
          notes: '다과 제공, 수료증 발급',
          createdAt: '2024-03-15'
        },
        {
          id: '2',
          type: 'disaster',
          title: '2024년 하반기 재난대응 훈련',
          date: '2024-10-20',
          time: '10:00',
          instructor: '소방서 안전교육팀',
          location: '시설 전체',
          participants: ['시설장', '간호사 2명', '요양보호사 8명', '조리원 1명'],
          attendanceRate: 95,
          fileUrl: 'https://readdy.ai/api/search-image?query=Fire%20safety%20drill%20training%20in%20elderly%20care%20facility%20with%20staff%20practicing%20evacuation%20procedures%20fire%20extinguisher%20demonstration%20professional%20emergency%20response%20training%20realistic%20practice%20scenario&width=800&height=500&seq=edu2&orientation=landscape',
          fileName: '2024_재난대응훈련_보고서.pdf',
          summary: '화재 발생 시 대피 절차, 소화기 사용법, 입소자 안전 확보 방법',
          evaluation: '실제 상황과 유사한 훈련으로 대응 능력 향상',
          notes: '소방서 합동 훈련',
          createdAt: '2024-10-20'
        },
        {
          id: '3',
          type: 'legal',
          title: '2025년 장기요양기관 법정교육',
          date: '2025-01-25',
          time: '15:00',
          instructor: '보건복지부 인증 강사',
          location: '온라인 (Zoom)',
          participants: ['시설장', '간호사', '사회복지사'],
          attendanceRate: 100,
          fileUrl: '',
          fileName: '',
          summary: '장기요양보험법 개정 사항, 급여 제공 기준, 평가 지표 등',
          evaluation: '진행 예정',
          notes: '온라인 교육',
          createdAt: '2025-01-15'
        }
      ];
      setEducations(initialEducations);
      localStorage.setItem('educations', JSON.stringify(initialEducations));
    }
  };

  const saveEducations = (data: Education[]) => {
    localStorage.setItem('educations', JSON.stringify(data));
    setEducations(data);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const filteredParticipants = formData.participants.filter(p => p.trim() !== '');
    const attendanceRate = filteredParticipants.length > 0 ? 100 : 0;

    if (selectedEducation) {
      const updated = educations.map(item =>
        item.id === selectedEducation.id
          ? { 
              ...item, 
              ...formData, 
              participants: filteredParticipants,
              attendanceRate: item.attendanceRate
            }
          : item
      );
      saveEducations(updated);
    } else {
      const newEducation: Education = {
        id: Date.now().toString(),
        ...formData,
        participants: filteredParticipants,
        attendanceRate,
        createdAt: new Date().toISOString().split('T')[0]
      };
      saveEducations([...educations, newEducation]);
    }

    setIsModalOpen(false);
    setSelectedEducation(null);
    resetForm();
  };

  const handleEdit = (education: Education) => {
    setSelectedEducation(education);
    setFormData({
      type: education.type,
      title: education.title,
      date: education.date,
      time: education.time,
      instructor: education.instructor,
      location: education.location,
      participants: education.participants.length > 0 ? education.participants : [''],
      fileUrl: education.fileUrl,
      fileName: education.fileName,
      summary: education.summary,
      evaluation: education.evaluation,
      notes: education.notes
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('이 교육 기록을 삭제하시겠습니까?')) {
      saveEducations(educations.filter(item => item.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({
      type: 'humanRights',
      title: '',
      date: new Date().toISOString().split('T')[0],
      time: '14:00',
      instructor: '',
      location: '',
      participants: [''],
      fileUrl: '',
      fileName: '',
      summary: '',
      evaluation: '',
      notes: ''
    });
  };

  const filteredEducations = educations
    .filter(item => filter === 'all' || item.type === filter)
    .filter(item =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.date.includes(searchTerm)
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const stats = {
    total: educations.length,
    thisYear: educations.filter(e => e.date.startsWith(new Date().getFullYear().toString())).length,
    avgAttendance: educations.length > 0 
      ? Math.round(educations.reduce((sum, e) => sum + e.attendanceRate, 0) / educations.length) 
      : 0,
    upcoming: educations.filter(e => e.date >= new Date().toISOString().split('T')[0]).length
  };

  const getTypeInfo = (type: string) => {
    return educationTypes.find(t => t.value === type) || educationTypes[0];
  };

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">교육일지 관리</h2>
          <p className="text-sm text-gray-500 mt-1">필수 교육 및 훈련 기록을 관리합니다</p>
        </div>
        <button
          onClick={() => {
            setSelectedEducation(null);
            resetForm();
            setIsModalOpen(true);
          }}
          className="whitespace-nowrap px-4 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-lg hover:from-teal-600 hover:to-cyan-600 transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer"
        >
          <i className="ri-add-line mr-2"></i>
          교육 추가
        </button>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">전체 교육</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">{stats.total}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <i className="ri-book-open-line text-2xl text-blue-600"></i>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">올해 교육</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">{stats.thisYear}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <i className="ri-calendar-check-line text-2xl text-green-600"></i>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-teal-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">평균 참석률</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">{stats.avgAttendance}%</p>
            </div>
            <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
              <i className="ri-user-star-line text-2xl text-teal-600"></i>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-orange-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">예정 교육</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">{stats.upcoming}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <i className="ri-time-line text-2xl text-orange-600"></i>
            </div>
          </div>
        </div>
      </div>

      {/* 필수 교육 안내 */}
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
          <i className="ri-information-line text-blue-600 mr-2"></i>
          필수 교육 안내
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {educationTypes.map(type => (
            <div key={type.value} className="bg-white rounded-lg p-4 shadow-sm">
              <div className={`inline-block px-3 py-1 bg-${type.color}-100 text-${type.color}-700 text-xs font-medium rounded-full mb-2`}>
                {type.frequency}
              </div>
              <div className="text-sm font-medium text-gray-800">{type.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 필터 */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="교육명, 강사, 날짜 검색..."
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
              <option value="all">전체 교육</option>
              {educationTypes.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* 교육 목록 */}
      <div className="space-y-4">
        {filteredEducations.map((education) => {
          const typeInfo = getTypeInfo(education.type);
          return (
            <div key={education.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden">
              <div className="flex flex-col md:flex-row">
                {/* 이미지 */}
                {education.fileUrl && (
                  <div className="w-full md:w-64 h-48 overflow-hidden">
                    <img
                      src={education.fileUrl}
                      alt={education.title}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                )}

                {/* 내용 */}
                <div className="flex-1 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`px-3 py-1 bg-${typeInfo.color}-100 text-${typeInfo.color}-700 text-xs font-medium rounded-full`}>
                          {typeInfo.label} ({typeInfo.frequency})
                        </span>
                        <span className="px-3 py-1 bg-teal-100 text-teal-700 text-xs font-medium rounded-full">
                          참석률 {education.attendanceRate}%
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{education.title}</h3>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(education)}
                        className="px-3 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors cursor-pointer"
                        title="수정"
                      >
                        <i className="ri-edit-line"></i>
                      </button>
                      <button
                        onClick={() => handleDelete(education.id)}
                        className="px-3 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors cursor-pointer"
                        title="삭제"
                      >
                        <i className="ri-delete-bin-line"></i>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <i className="ri-calendar-line mr-2 text-teal-600"></i>
                      {education.date} {education.time}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <i className="ri-user-line mr-2 text-teal-600"></i>
                      {education.instructor}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <i className="ri-map-pin-line mr-2 text-teal-600"></i>
                      {education.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <i className="ri-group-line mr-2 text-teal-600"></i>
                      참석자 {education.participants.length}명
                    </div>
                  </div>

                  {education.summary && (
                    <div className="mb-3">
                      <div className="text-sm font-medium text-gray-700 mb-1">교육 내용:</div>
                      <p className="text-sm text-gray-600">{education.summary}</p>
                    </div>
                  )}

                  {education.evaluation && (
                    <div className="mb-3">
                      <div className="text-sm font-medium text-gray-700 mb-1">평가:</div>
                      <p className="text-sm text-gray-600">{education.evaluation}</p>
                    </div>
                  )}

                  {education.participants.length > 0 && (
                    <div className="mb-3">
                      <div className="text-sm font-medium text-gray-700 mb-1">참석자:</div>
                      <div className="flex flex-wrap gap-2">
                        {education.participants.map((participant, index) => (
                          <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                            {participant}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {education.fileName && (
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <i className="ri-file-line mr-2 text-teal-600"></i>
                      {education.fileName}
                    </div>
                  )}

                  {education.notes && (
                    <div className="text-xs text-gray-500 mt-2">
                      {education.notes}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {filteredEducations.length === 0 && (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <i className="ri-book-open-line text-5xl text-gray-400 mb-4"></i>
            <p className="text-gray-500">등록된 교육 기록이 없습니다</p>
          </div>
        )}
      </div>

      {/* 추가/수정 모달 */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-800">
                {selectedEducation ? '교육 수정' : '교육 추가'}
              </h3>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setSelectedEducation(null);
                  resetForm();
                }}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <i className="ri-close-line text-2xl"></i>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* 교육 유형 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">교육 유형 *</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {educationTypes.map(type => (
                    <label
                      key={type.value}
                      className={`flex items-center justify-between p-3 border-2 rounded-lg cursor-pointer transition-all ${
                        formData.type === type.value
                          ? `border-${type.color}-500 bg-${type.color}-50`
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center">
                        <input
                          type="radio"
                          value={type.value}
                          checked={formData.type === type.value}
                          onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                          className="mr-3 cursor-pointer"
                        />
                        <div>
                          <div className="text-sm font-medium text-gray-800">{type.label}</div>
                          <div className="text-xs text-gray-500">{type.frequency}</div>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* 교육명 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">교육명 *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="예: 2025년 노인인권 및 학대예방 교육"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  required
                />
              </div>

              {/* 날짜 및 시간 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">날짜 *</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent cursor-pointer"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">시간 *</label>
                  <input
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent cursor-pointer"
                    required
                  />
                </div>
              </div>

              {/* 강사 및 장소 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">강사 *</label>
                  <input
                    type="text"
                    value={formData.instructor}
                    onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                    placeholder="예: 김인권 강사"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">장소 *</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="예: 시설 2층 교육실"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              {/* 참석자 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">참석자</label>
                <div className="space-y-2 mb-2">
                  {formData.participants.map((participant, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={participant}
                        onChange={(e) => {
                          const newParticipants = [...formData.participants];
                          newParticipants[index] = e.target.value;
                          setFormData({ ...formData, participants: newParticipants });
                        }}
                        placeholder="참석자 이름 또는 직책"
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      />
                      {formData.participants.length > 1 && (
                        <button
                          type="button"
                          onClick={() => {
                            const newParticipants = formData.participants.filter((_, i) => i !== index);
                            setFormData({ ...formData, participants: newParticipants });
                          }}
                          className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 cursor-pointer"
                        >
                          <i className="ri-delete-bin-line"></i>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, participants: [...formData.participants, ''] })}
                  className="whitespace-nowrap w-full px-4 py-2 border-2 border-dashed border-gray-300 text-gray-600 rounded-lg hover:border-teal-500 hover:text-teal-500 transition-colors cursor-pointer"
                >
                  <i className="ri-add-line mr-2"></i>
                  참석자 추가
                </button>
              </div>

              {/* 교육 내용 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">교육 내용</label>
                <textarea
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                  placeholder="교육 주요 내용을 요약하세요"
                />
              </div>

              {/* 평가 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">교육 평가</label>
                <textarea
                  value={formData.evaluation}
                  onChange={(e) => setFormData({ ...formData, evaluation: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                  placeholder="교육 결과 및 효과성 평가"
                />
              </div>

              {/* 파일 URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">교육자료 파일 URL</label>
                <input
                  type="url"
                  value={formData.fileUrl}
                  onChange={(e) => setFormData({ ...formData, fileUrl: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>

              {/* 파일명 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">파일명</label>
                <input
                  type="text"
                  value={formData.fileName}
                  onChange={(e) => setFormData({ ...formData, fileName: e.target.value })}
                  placeholder="예: 2025_노인인권교육_자료.pdf"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>

              {/* 비고 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">비고</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                  placeholder="추가 메모"
                />
              </div>

              {/* 버튼 */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setSelectedEducation(null);
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
                  {selectedEducation ? '수정' : '추가'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
