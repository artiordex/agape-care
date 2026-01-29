'use client';

import { useEffect, useState } from 'react';

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
  { value: 'legal', label: '장기요양기관 법정교육', frequency: '연 1회 이상', color: 'blue' },
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
    notes: '',
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
          fileUrl:
            'https://readdy.ai/api/search-image?query=Professional%20training%20session%20in%20nursing%20care%20facility%20with%20elderly%20care%20staff%20attending%20human%20rights%20education%20seminar%20instructor%20presenting%20at%20front%20warm%20lighting%20clean%20modern%20training%20room%20engaged%20participants&width=800&height=500&seq=edu1&orientation=landscape',
          fileName: '2024_노인인권교육_자료.pdf',
          summary: '노인 인권의 중요성, 학대 유형 및 신고 절차, 예방 방법 등을 교육',
          evaluation: '전 직원이 적극적으로 참여하였으며, 사례 중심 교육으로 실무 적용 가능성이 높음',
          notes: '다과 제공, 수료증 발급',
          createdAt: '2024-03-15',
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
          fileUrl:
            'https://readdy.ai/api/search-image?query=Fire%20safety%20drill%20training%20in%20elderly%20care%20facility%20with%20staff%20practicing%20evacuation%20procedures%20fire%20extinguisher%20demonstration%20professional%20emergency%20response%20training%20realistic%20practice%20scenario&width=800&height=500&seq=edu2&orientation=landscape',
          fileName: '2024_재난대응훈련_보고서.pdf',
          summary: '화재 발생 시 대피 절차, 소화기 사용법, 입소자 안전 확보 방법',
          evaluation: '실제 상황과 유사한 훈련으로 대응 능력 향상',
          notes: '소방서 합동 훈련',
          createdAt: '2024-10-20',
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
          createdAt: '2025-01-15',
        },
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
              attendanceRate: item.attendanceRate,
            }
          : item,
      );
      saveEducations(updated);
    } else {
      const newEducation: Education = {
        id: Date.now().toString(),
        ...formData,
        participants: filteredParticipants,
        attendanceRate,
        createdAt: new Date().toISOString().split('T')[0],
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
      notes: education.notes,
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
      notes: '',
    });
  };

  const filteredEducations = educations
    .filter(item => filter === 'all' || item.type === filter)
    .filter(
      item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.date.includes(searchTerm),
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const stats = {
    total: educations.length,
    thisYear: educations.filter(e => e.date.startsWith(new Date().getFullYear().toString())).length,
    avgAttendance:
      educations.length > 0
        ? Math.round(educations.reduce((sum, e) => sum + e.attendanceRate, 0) / educations.length)
        : 0,
    upcoming: educations.filter(e => e.date >= new Date().toISOString().split('T')[0]).length,
  };

  const getTypeInfo = (type: string) => {
    return educationTypes.find(t => t.value === type) || educationTypes[0];
  };

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">교육일지 관리</h2>
          <p className="mt-1 text-sm text-gray-500">필수 교육 및 훈련 기록을 관리합니다</p>
        </div>
        <button
          onClick={() => {
            setSelectedEducation(null);
            resetForm();
            setIsModalOpen(true);
          }}
          className="cursor-pointer whitespace-nowrap rounded-lg bg-gradient-to-r from-teal-500 to-cyan-500 px-4 py-2 text-white shadow-md transition-all duration-200 hover:from-teal-600 hover:to-cyan-600 hover:shadow-lg"
        >
          <i className="ri-add-line mr-2"></i>
          교육 추가
        </button>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border-l-4 border-blue-500 bg-white p-6 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">전체 교육</p>
              <p className="mt-1 text-2xl font-bold text-gray-800">{stats.total}</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
              <i className="ri-book-open-line text-2xl text-blue-600"></i>
            </div>
          </div>
        </div>

        <div className="rounded-xl border-l-4 border-green-500 bg-white p-6 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">올해 교육</p>
              <p className="mt-1 text-2xl font-bold text-gray-800">{stats.thisYear}</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
              <i className="ri-calendar-check-line text-2xl text-green-600"></i>
            </div>
          </div>
        </div>

        <div className="rounded-xl border-l-4 border-teal-500 bg-white p-6 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">평균 참석률</p>
              <p className="mt-1 text-2xl font-bold text-gray-800">{stats.avgAttendance}%</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-teal-100">
              <i className="ri-user-star-line text-2xl text-teal-600"></i>
            </div>
          </div>
        </div>

        <div className="rounded-xl border-l-4 border-orange-500 bg-white p-6 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">예정 교육</p>
              <p className="mt-1 text-2xl font-bold text-gray-800">{stats.upcoming}</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100">
              <i className="ri-time-line text-2xl text-orange-600"></i>
            </div>
          </div>
        </div>
      </div>

      {/* 필수 교육 안내 */}
      <div className="rounded-xl border border-blue-200 bg-gradient-to-r from-blue-50 to-cyan-50 p-6">
        <h3 className="mb-4 flex items-center text-lg font-bold text-gray-800">
          <i className="ri-information-line mr-2 text-blue-600"></i>
          필수 교육 안내
        </h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {educationTypes.map(type => (
            <div key={type.value} className="rounded-lg bg-white p-4 shadow-sm">
              <div
                className={`inline-block px-3 py-1 bg-${type.color}-100 text-${type.color}-700 mb-2 rounded-full text-xs font-medium`}
              >
                {type.frequency}
              </div>
              <div className="text-sm font-medium text-gray-800">{type.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 필터 */}
      <div className="rounded-lg bg-white p-4 shadow-md">
        <div className="flex flex-col gap-4 lg:flex-row">
          <div className="flex-1">
            <input
              type="text"
              placeholder="교육명, 강사, 날짜 검색..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div>
            <select
              value={filter}
              onChange={e => setFilter(e.target.value)}
              className="w-full cursor-pointer rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-teal-500"
            >
              <option value="all">전체 교육</option>
              {educationTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* 교육 목록 */}
      <div className="space-y-4">
        {filteredEducations.map(education => {
          const typeInfo = getTypeInfo(education.type);
          return (
            <div
              key={education.id}
              className="overflow-hidden rounded-xl bg-white shadow-md transition-shadow duration-200 hover:shadow-lg"
            >
              <div className="flex flex-col md:flex-row">
                {/* 이미지 */}
                {education.fileUrl && (
                  <div className="h-48 w-full overflow-hidden md:w-64">
                    <img
                      src={education.fileUrl}
                      alt={education.title}
                      className="h-full w-full object-cover object-top"
                    />
                  </div>
                )}

                {/* 내용 */}
                <div className="flex-1 p-6">
                  <div className="mb-4 flex items-start justify-between">
                    <div className="flex-1">
                      <div className="mb-2 flex items-center gap-3">
                        <span
                          className={`px-3 py-1 bg-${typeInfo.color}-100 text-${typeInfo.color}-700 rounded-full text-xs font-medium`}
                        >
                          {typeInfo.label} ({typeInfo.frequency})
                        </span>
                        <span className="rounded-full bg-teal-100 px-3 py-1 text-xs font-medium text-teal-700">
                          참석률 {education.attendanceRate}%
                        </span>
                      </div>
                      <h3 className="mb-2 text-xl font-bold text-gray-800">{education.title}</h3>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(education)}
                        className="cursor-pointer rounded-lg bg-blue-500 px-3 py-2 text-sm text-white transition-colors hover:bg-blue-600"
                        title="수정"
                      >
                        <i className="ri-edit-line"></i>
                      </button>
                      <button
                        onClick={() => handleDelete(education.id)}
                        className="cursor-pointer rounded-lg bg-red-500 px-3 py-2 text-sm text-white transition-colors hover:bg-red-600"
                        title="삭제"
                      >
                        <i className="ri-delete-bin-line"></i>
                      </button>
                    </div>
                  </div>

                  <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
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
                      <div className="mb-1 text-sm font-medium text-gray-700">교육 내용:</div>
                      <p className="text-sm text-gray-600">{education.summary}</p>
                    </div>
                  )}

                  {education.evaluation && (
                    <div className="mb-3">
                      <div className="mb-1 text-sm font-medium text-gray-700">평가:</div>
                      <p className="text-sm text-gray-600">{education.evaluation}</p>
                    </div>
                  )}

                  {education.participants.length > 0 && (
                    <div className="mb-3">
                      <div className="mb-1 text-sm font-medium text-gray-700">참석자:</div>
                      <div className="flex flex-wrap gap-2">
                        {education.participants.map((participant, index) => (
                          <span key={index} className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-700">
                            {participant}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {education.fileName && (
                    <div className="mb-2 flex items-center text-sm text-gray-600">
                      <i className="ri-file-line mr-2 text-teal-600"></i>
                      {education.fileName}
                    </div>
                  )}

                  {education.notes && <div className="mt-2 text-xs text-gray-500">{education.notes}</div>}
                </div>
              </div>
            </div>
          );
        })}

        {filteredEducations.length === 0 && (
          <div className="rounded-xl bg-white p-12 text-center shadow-md">
            <i className="ri-book-open-line mb-4 text-5xl text-gray-400"></i>
            <p className="text-gray-500">등록된 교육 기록이 없습니다</p>
          </div>
        )}
      </div>

      {/* 추가/수정 모달 */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-xl bg-white shadow-2xl">
            <div className="sticky top-0 flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
              <h3 className="text-xl font-bold text-gray-800">{selectedEducation ? '교육 수정' : '교육 추가'}</h3>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setSelectedEducation(null);
                  resetForm();
                }}
                className="cursor-pointer text-gray-400 hover:text-gray-600"
              >
                <i className="ri-close-line text-2xl"></i>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 p-6">
              {/* 교육 유형 */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">교육 유형 *</label>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {educationTypes.map(type => (
                    <label
                      key={type.value}
                      className={`flex cursor-pointer items-center justify-between rounded-lg border-2 p-3 transition-all ${
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
                          onChange={e => setFormData({ ...formData, type: e.target.value as any })}
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
                <label className="mb-2 block text-sm font-medium text-gray-700">교육명 *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  placeholder="예: 2025년 노인인권 및 학대예방 교육"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>

              {/* 날짜 및 시간 */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">날짜 *</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={e => setFormData({ ...formData, date: e.target.value })}
                    className="w-full cursor-pointer rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-teal-500"
                    required
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">시간 *</label>
                  <input
                    type="time"
                    value={formData.time}
                    onChange={e => setFormData({ ...formData, time: e.target.value })}
                    className="w-full cursor-pointer rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-teal-500"
                    required
                  />
                </div>
              </div>

              {/* 강사 및 장소 */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">강사 *</label>
                  <input
                    type="text"
                    value={formData.instructor}
                    onChange={e => setFormData({ ...formData, instructor: e.target.value })}
                    placeholder="예: 김인권 강사"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-teal-500"
                    required
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">장소 *</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={e => setFormData({ ...formData, location: e.target.value })}
                    placeholder="예: 시설 2층 교육실"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-teal-500"
                    required
                  />
                </div>
              </div>

              {/* 참석자 */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">참석자</label>
                <div className="mb-2 space-y-2">
                  {formData.participants.map((participant, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={participant}
                        onChange={e => {
                          const newParticipants = [...formData.participants];
                          newParticipants[index] = e.target.value;
                          setFormData({ ...formData, participants: newParticipants });
                        }}
                        placeholder="참석자 이름 또는 직책"
                        className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-teal-500"
                      />
                      {formData.participants.length > 1 && (
                        <button
                          type="button"
                          onClick={() => {
                            const newParticipants = formData.participants.filter((_, i) => i !== index);
                            setFormData({ ...formData, participants: newParticipants });
                          }}
                          className="cursor-pointer rounded-lg bg-red-500 px-3 py-2 text-white hover:bg-red-600"
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
                  className="w-full cursor-pointer whitespace-nowrap rounded-lg border-2 border-dashed border-gray-300 px-4 py-2 text-gray-600 transition-colors hover:border-teal-500 hover:text-teal-500"
                >
                  <i className="ri-add-line mr-2"></i>
                  참석자 추가
                </button>
              </div>

              {/* 교육 내용 */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">교육 내용</label>
                <textarea
                  value={formData.summary}
                  onChange={e => setFormData({ ...formData, summary: e.target.value })}
                  rows={4}
                  className="w-full resize-none rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-teal-500"
                  placeholder="교육 주요 내용을 요약하세요"
                />
              </div>

              {/* 평가 */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">교육 평가</label>
                <textarea
                  value={formData.evaluation}
                  onChange={e => setFormData({ ...formData, evaluation: e.target.value })}
                  rows={3}
                  className="w-full resize-none rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-teal-500"
                  placeholder="교육 결과 및 효과성 평가"
                />
              </div>

              {/* 파일 URL */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">교육자료 파일 URL</label>
                <input
                  type="url"
                  value={formData.fileUrl}
                  onChange={e => setFormData({ ...formData, fileUrl: e.target.value })}
                  placeholder="https://..."
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-teal-500"
                />
              </div>

              {/* 파일명 */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">파일명</label>
                <input
                  type="text"
                  value={formData.fileName}
                  onChange={e => setFormData({ ...formData, fileName: e.target.value })}
                  placeholder="예: 2025_노인인권교육_자료.pdf"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-teal-500"
                />
              </div>

              {/* 비고 */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">비고</label>
                <textarea
                  value={formData.notes}
                  onChange={e => setFormData({ ...formData, notes: e.target.value })}
                  rows={2}
                  className="w-full resize-none rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-teal-500"
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
                  className="flex-1 cursor-pointer whitespace-nowrap rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-50"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="flex-1 cursor-pointer whitespace-nowrap rounded-lg bg-gradient-to-r from-teal-500 to-cyan-500 px-4 py-2 text-white transition-all duration-200 hover:from-teal-600 hover:to-cyan-600"
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
