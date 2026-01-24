
import React, { useState, useEffect } from 'react';

interface Meeting {
  id: string;
  type: 'family' | 'operation';
  title: string;
  date: string;
  time: string;
  location: string;
  attendees: string[];
  summary: string;
  fileUrl: string;
  fileName: string;
  notes: string;
  createdAt: string;
}

export default function MeetingManagement() {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);
  const [filter, setFilter] = useState<'all' | 'family' | 'operation'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const [formData, setFormData] = useState({
    type: 'family' as 'family' | 'operation',
    title: '',
    date: new Date().toISOString().split('T')[0],
    time: '14:00',
    location: '',
    attendees: [''],
    summary: '',
    fileUrl: '',
    fileName: '',
    notes: '',
  });

  /* -------------------------------------------------------
   * Load meetings from localStorage (with safe JSON parsing)
   * ------------------------------------------------------- */
  useEffect(() => {
    loadMeetings();
  }, []);

  const loadMeetings = () => {
    const saved = localStorage.getItem('meetings');
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as Meeting[];
        setMeetings(parsed);
      } catch (e) {
        console.error('Failed to parse meetings from localStorage:', e);
        // If parsing fails, fallback to default data
        initialiseDefaultMeetings();
      }
    } else {
      initialiseDefaultMeetings();
    }
  };

  const initialiseDefaultMeetings = () => {
    const initialMeetings: Meeting[] = [
      {
        id: '1',
        type: 'family',
        title: '2024년 하반기 보호자 회의',
        date: '2024-12-15',
        time: '14:00',
        location: '시설 2층 회의실',
        attendees: ['시설장', '간호사', '사회복지사', '보호자 12명'],
        summary:
          '2024년 하반기 운영 현황 공유 및 2025년 계획 안내. 보호자 건의사항 수렴.',
        fileUrl:
          'https://readdy.ai/api/search-image?query=Professional%20meeting%20room%20in%20nursing%20care%20facility%20with%20people%20sitting%20around%20conference%20table%20discussing%20elderly%20care%20plans%20warm%20lighting%20clean%20modern%20interior%20soft%20natural%20light%20from%20windows%20professional%20atmosphere&width=800&height=500&seq=meeting1&orientation=landscape',
        fileName: '2024_하반기_보호자회의록.pdf',
        notes: '다과 제공 완료',
        createdAt: '2024-12-15',
      },
      {
        id: '2',
        type: 'operation',
        title: '2025년 1분기 운영위원회',
        date: '2025-01-10',
        time: '15:00',
        location: '시설 1층 사무실',
        attendees: ['시설장', '사무국장', '간호팀장', '사회복지사'],
        summary: '1분기 예산 검토 및 직원 교육 계획 수립',
        fileUrl: '',
        fileName: '',
        notes: '',
        createdAt: '2025-01-10',
      },
    ];
    setMeetings(initialMeetings);
    localStorage.setItem('meetings', JSON.stringify(initialMeetings));
  };

  const saveMeetings = (data: Meeting[]) => {
    localStorage.setItem('meetings', JSON.stringify(data));
    setMeetings(data);
  };

  /* -------------------------------------------------------
   * Form handling
   * ------------------------------------------------------- */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const filteredAttendees = formData.attendees.filter((a) => a.trim() !== '');

    if (selectedMeeting) {
      const updated = meetings.map((item) =>
        item.id === selectedMeeting.id
          ? { ...item, ...formData, attendees: filteredAttendees }
          : item
      );
      saveMeetings(updated);
    } else {
      const newMeeting: Meeting = {
        id: Date.now().toString(),
        ...formData,
        attendees: filteredAttendees,
        createdAt: new Date().toISOString().split('T')[0],
      };
      saveMeetings([...meetings, newMeeting]);
    }

    setIsModalOpen(false);
    setSelectedMeeting(null);
    resetForm();
  };

  const handleEdit = (meeting: Meeting) => {
    setSelectedMeeting(meeting);
    setFormData({
      type: meeting.type,
      title: meeting.title,
      date: meeting.date,
      time: meeting.time,
      location: meeting.location,
      attendees: meeting.attendees.length > 0 ? meeting.attendees : [''],
      summary: meeting.summary,
      fileUrl: meeting.fileUrl,
      fileName: meeting.fileName,
      notes: meeting.notes,
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('이 회의록을 삭제하시겠습니까?')) {
      saveMeetings(meetings.filter((item) => item.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({
      type: 'family',
      title: '',
      date: new Date().toISOString().split('T')[0],
      time: '14:00',
      location: '',
      attendees: [''],
      summary: '',
      fileUrl: '',
      fileName: '',
      notes: '',
    });
  };

  /* -------------------------------------------------------
   * Derived data (filtering, sorting, stats)
   * ------------------------------------------------------- */
  const filteredMeetings = meetings
    .filter((item) => filter === 'all' || item.type === filter)
    .filter(
      (item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.date.includes(searchTerm) ||
        item.location.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const stats = {
    total: meetings.length,
    family: meetings.filter((m) => m.type === 'family').length,
    operation: meetings.filter((m) => m.type === 'operation').length,
    thisYear: meetings.filter((m) =>
      m.date.startsWith(new Date().getFullYear().toString())
    ).length,
  };

  /* -------------------------------------------------------
   * UI
   * ------------------------------------------------------- */
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">회의록 관리</h2>
          <p className="text-sm text-gray-500 mt-1">
            보호자 회의 및 운영위원회 회의록을 관리합니다
          </p>
        </div>
        <button
          onClick={() => {
            setSelectedMeeting(null);
            resetForm();
            setIsModalOpen(true);
          }}
          className="whitespace-nowrap px-4 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-lg hover:from-teal-600 hover:to-cyan-600 transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer"
        >
          <i className="ri-add-line mr-2"></i>
          회의록 추가
        </button>
      </div>

      {/* Statistics cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">전체 회의</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">{stats.total}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <i className="ri-file-list-3-line text-2xl text-blue-600"></i>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">보호자 회의</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">{stats.family}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <i className="ri-parent-line text-2xl text-purple-600"></i>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-orange-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">운영위원회</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">{stats.operation}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <i className="ri-team-line text-2xl text-orange-600"></i>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-teal-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">올해 회의</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">{stats.thisYear}</p>
            </div>
            <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
              <i className="ri-calendar-check-line text-2xl text-teal-600"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Filter section */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="회의명, 날짜, 장소 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
          <div>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent cursor-pointer"
            >
              <option value="all">전체 회의</option>
              <option value="family">보호자 회의</option>
              <option value="operation">운영위원회</option>
            </select>
          </div>
        </div>
      </div>

      {/* Meeting list */}
      <div className="space-y-4">
        {filteredMeetings.map((meeting) => (
          <div
            key={meeting.id}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden"
          >
            <div className="flex flex-col md:flex-row">
              {/* Image (if any) */}
              {meeting.fileUrl && (
                <div className="w-full md:w-64 h-48 overflow-hidden">
                  <img
                    src={meeting.fileUrl}
                    alt={meeting.title}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              )}

              {/* Content */}
              <div className="flex-1 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className={`px-3 py-1 text-xs font-medium rounded-full ${
                          meeting.type === 'family'
                            ? 'bg-purple-100 text-purple-700'
                            : 'bg-orange-100 text-orange-700'
                        }`}
                      >
                        {meeting.type === 'family'
                          ? '보호자 회의 (반기 1회)'
                          : '운영위원회 (분기 1회)'}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{meeting.title}</h3>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(meeting)}
                      className="px-3 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors cursor-pointer"
                      title="수정"
                    >
                      <i className="ri-edit-line"></i>
                    </button>
                    <button
                      onClick={() => handleDelete(meeting.id)}
                      className="px-3 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors cursor-pointer"
                      title="삭제"
                    >
                      <i className="ri-delete-bin-line"></i>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <i className="ri-calendar-line mr-2 text-teal-600"></i>
                    {meeting.date} {meeting.time}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <i className="ri-map-pin-line mr-2 text-teal-600"></i>
                    {meeting.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <i className="ri-group-line mr-2 text-teal-600"></i>
                    참석자 {meeting.attendees.length}명
                  </div>
                </div>

                {meeting.summary && (
                  <div className="mb-3">
                    <div className="text-sm font-medium text-gray-700 mb-1">회의 요약:</div>
                    <p className="text-sm text-gray-600">{meeting.summary}</p>
                  </div>
                )}

                {meeting.attendees.length > 0 && (
                  <div className="mb-3">
                    <div className="text-sm font-medium text-gray-700 mb-1">참석자:</div>
                    <div className="flex flex-wrap gap-2">
                      {meeting.attendees.map((attendee, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                        >
                          {attendee}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {meeting.fileName && (
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <i className="ri-file-line mr-2 text-teal-600"></i>
                    {meeting.fileName}
                  </div>
                )}

                {meeting.notes && (
                  <div className="text-xs text-gray-500 mt-2">{meeting.notes}</div>
                )}
              </div>
            </div>
          </div>
        ))}

        {filteredMeetings.length === 0 && (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <i className="ri-file-list-3-line text-5xl text-gray-400 mb-4"></i>
            <p className="text-gray-500">등록된 회의록이 없습니다</p>
          </div>
        )}
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-800">
                {selectedMeeting ? '회의록 수정' : '회의록 추가'}
              </h3>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setSelectedMeeting(null);
                  resetForm();
                }}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <i className="ri-close-line text-2xl"></i>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Meeting type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  회의 유형 *
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      value="family"
                      checked={formData.type === 'family'}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                      className="mr-2 cursor-pointer"
                    />
                    <span className="text-sm text-gray-700">보호자 회의 (반기 1회)</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      value="operation"
                      checked={formData.type === 'operation'}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                      className="mr-2 cursor-pointer"
                    />
                    <span className="text-sm text-gray-700">운영위원회 (분기 1회)</span>
                  </label>
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  회의명 *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="예: 2025년 상반기 보호자 회의"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    날짜 *
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent cursor-pointer"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    시간 *
                  </label>
                  <input
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent cursor-pointer"
                    required
                  />
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  장소 *
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="예: 시설 2층 회의실"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Attendees */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  참석자
                </label>
                <div className="space-y-2 mb-2">
                  {formData.attendees.map((attendee, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={attendee}
                        onChange={(e) => {
                          const newAttendees = [...formData.attendees];
                          newAttendees[index] = e.target.value;
                          setFormData({ ...formData, attendees: newAttendees });
                        }}
                        placeholder="참석자 이름 또는 직책"
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      />
                      {formData.attendees.length > 1 && (
                        <button
                          type="button"
                          onClick={() => {
                            const newAttendees = formData.attendees.filter((_, i) => i !== index);
                            setFormData({ ...formData, attendees: newAttendees });
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
                  onClick={() => setFormData({ ...formData, attendees: [...formData.attendees, ''] })}
                  className="whitespace-nowrap w-full px-4 py-2 border-2 border-dashed border-gray-300 text-gray-600 rounded-lg hover:border-teal-500 hover:text-teal-500 transition-colors cursor-pointer"
                >
                  <i className="ri-add-line mr-2"></i>
                  참석자 추가
                </button>
              </div>

              {/* Summary */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  회의 요약
                </label>
                <textarea
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                  placeholder="회의 주요 내용 및 결과를 요약하세요"
                ></textarea>
              </div>

              {/* File URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  회의록 파일 URL
                </label>
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
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  파일명
                </label>
                <input
                  type="text"
                  value={formData.fileName}
                  onChange={(e) => setFormData({ ...formData, fileName: e.target.value })}
                  placeholder="예: 2025_상반기_보호자회의록.pdf"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  비고
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                  placeholder="추가 메모"
                ></textarea>
              </div>

              {/* Action buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setSelectedMeeting(null);
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
                  {selectedMeeting ? '수정' : '추가'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
