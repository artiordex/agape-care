'use client';

import { useState, useEffect } from 'react';

interface Staff {
  id: string;
  name: string;
  position: string;
  type: string;
  phone: string;
  email: string;
  hireDate: string;
  certNumber: string;
  certExpiry: string;
  workSchedule: { [key: string]: string };
  annualLeave: number;
  usedLeave: number;
  education: string[];
  status: string;
}

export default function StaffManagement() {
  const [staffList, setStaffList] = useState<Staff[]>([]);
  const [filteredStaff, setFilteredStaff] = useState<Staff[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [editingStaff, setEditingStaff] = useState<Staff | null>(null);
  const [currentWeek, setCurrentWeek] = useState(new Date());

  useEffect(() => {
    loadStaffData();
  }, []);

  useEffect(() => {
    filterStaff();
  }, [staffList, searchTerm, filterType]);

  const loadStaffData = () => {
    const saved = localStorage.getItem('admin_staff');
    if (saved) {
      setStaffList(JSON.parse(saved));
    } else {
      const initial: Staff[] = [
        {
          id: '1',
          name: '김영희',
          position: '시설장',
          type: '사회복지사',
          phone: '010-1234-5678',
          email: 'kim@example.com',
          hireDate: '2020-03-01',
          certNumber: 'SW-2019-1234',
          certExpiry: '2025-12-31',
          workSchedule: {},
          annualLeave: 15,
          usedLeave: 3,
          education: ['노인복지론', '치매케어'],
          status: '재직',
        },
        {
          id: '2',
          name: '이수진',
          position: '요양보호사',
          type: '요양보호사',
          phone: '010-2345-6789',
          email: 'lee@example.com',
          hireDate: '2021-05-15',
          certNumber: 'NC-2020-5678',
          certExpiry: '2025-05-14',
          workSchedule: {},
          annualLeave: 12,
          usedLeave: 5,
          education: ['낙상예방교육', '감염관리'],
          status: '재직',
        },
      ];
      setStaffList(initial);
      localStorage.setItem('admin_staff', JSON.stringify(initial));
    }
  };

  const filterStaff = () => {
    let filtered = [...staffList];

    if (searchTerm) {
      filtered = filtered.filter(
        staff =>
          staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          staff.position.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    if (filterType !== 'all') {
      filtered = filtered.filter(staff => staff.type === filterType);
    }

    setFilteredStaff(filtered);
  };

  const handleSave = (staffData: Partial<Staff>) => {
    if (editingStaff) {
      const updated = staffList.map(s => (s.id === editingStaff.id ? { ...s, ...staffData } : s));
      setStaffList(updated);
      localStorage.setItem('admin_staff', JSON.stringify(updated));
    } else {
      const newStaff: Staff = {
        id: Date.now().toString(),
        name: staffData.name || '',
        position: staffData.position || '',
        type: staffData.type || '',
        phone: staffData.phone || '',
        email: staffData.email || '',
        hireDate: staffData.hireDate || '',
        certNumber: staffData.certNumber || '',
        certExpiry: staffData.certExpiry || '',
        workSchedule: {},
        annualLeave: staffData.annualLeave || 15,
        usedLeave: 0,
        education: [],
        status: '재직',
      };
      const updated = [...staffList, newStaff];
      setStaffList(updated);
      localStorage.setItem('admin_staff', JSON.stringify(updated));
    }
    setShowModal(false);
    setEditingStaff(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      const updated = staffList.filter(s => s.id !== id);
      setStaffList(updated);
      localStorage.setItem('admin_staff', JSON.stringify(updated));
    }
  };

  const getCertExpiryStatus = (expiry: string) => {
    const today = new Date();
    const expiryDate = new Date(expiry);
    const diffDays = Math.ceil((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return { text: '만료됨', color: 'text-red-600 bg-red-50' };
    if (diffDays < 30) return { text: `${diffDays}일 남음`, color: 'text-orange-600 bg-orange-50' };
    if (diffDays < 90) return { text: `${diffDays}일 남음`, color: 'text-yellow-600 bg-yellow-50' };
    return { text: '정상', color: 'text-green-600 bg-green-50' };
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="mb-2 text-2xl font-bold text-gray-800">직원 관리</h1>
        <p className="text-sm text-gray-600">직원 정보, 자격증, 근무표, 근태를 관리합니다</p>
      </div>

      <div className="mb-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex flex-col gap-4 lg:flex-row">
          <div className="flex-1">
            <div className="relative">
              <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
              <input
                type="text"
                placeholder="직원명 또는 직위 검색..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-transparent focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>
          <select
            value={filterType}
            onChange={e => setFilterType(e.target.value)}
            className="cursor-pointer rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-teal-500"
          >
            <option value="all">전체 직종</option>
            <option value="사회복지사">사회복지사</option>
            <option value="요양보호사">요양보호사</option>
            <option value="간호조무사">간호조무사</option>
            <option value="조리원">조리원</option>
            <option value="사무원">사무원</option>
          </select>
          <button
            onClick={() => {
              setEditingStaff(null);
              setShowModal(true);
            }}
            className="cursor-pointer whitespace-nowrap rounded-lg bg-gradient-to-r from-teal-500 to-cyan-500 px-6 py-2 text-white transition-all duration-300 hover:shadow-lg"
          >
            <i className="ri-add-line mr-2"></i>
            직원 추가
          </button>
          <button
            onClick={() => setShowScheduleModal(true)}
            className="cursor-pointer whitespace-nowrap rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-2 text-white transition-all duration-300 hover:shadow-lg"
          >
            <i className="ri-calendar-line mr-2"></i>
            근무표 작성
          </button>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">총 직원 수</p>
                <p className="text-2xl font-bold text-blue-700">
                  {staffList.filter(s => s.status === '재직').length}명
                </p>
              </div>
              <i className="ri-team-line text-4xl text-blue-500"></i>
            </div>
          </div>

          <div className="rounded-lg bg-gradient-to-br from-orange-50 to-orange-100 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600">자격증 만료 임박</p>
                <p className="text-2xl font-bold text-orange-700">
                  {
                    staffList.filter(s => {
                      const diffDays = Math.ceil(
                        (new Date(s.certExpiry).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
                      );
                      return diffDays < 90 && diffDays > 0;
                    }).length
                  }
                  명
                </p>
              </div>
              <i className="ri-alarm-warning-line text-4xl text-orange-500"></i>
            </div>
          </div>

          <div className="rounded-lg bg-gradient-to-br from-green-50 to-green-100 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">오늘 근무자</p>
                <p className="text-2xl font-bold text-green-700">
                  {
                    staffList.filter(s => {
                      const today = new Date().toISOString().split('T')[0];
                      return s.workSchedule[today] && s.workSchedule[today] !== '휴무';
                    }).length
                  }
                  명
                </p>
              </div>
              <i className="ri-user-follow-line text-4xl text-green-500"></i>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">이름</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">직위</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">직종</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">연락처</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">입사일</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">자격증 만료일</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">상태</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">연차</th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">관리</th>
              </tr>
            </thead>
            <tbody>
              {filteredStaff.map((staff, index) => {
                const certStatus = getCertExpiryStatus(staff.certExpiry);
                return (
                  <tr key={staff.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-4 py-3 text-sm font-medium text-gray-800">{staff.name}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{staff.position}</td>
                    <td className="px-4 py-3">
                      <span className="inline-block rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">
                        {staff.type}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{staff.phone}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{staff.hireDate}</td>
                    <td className="px-4 py-3">
                      <div className="text-sm text-gray-600">{staff.certExpiry}</div>
                      <span
                        className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${certStatus.color} mt-1`}
                      >
                        {certStatus.text}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${
                          staff.status === '재직' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {staff.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {staff.annualLeave - staff.usedLeave}/{staff.annualLeave}일
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => {
                            setEditingStaff(staff);
                            setShowModal(true);
                          }}
                          className="cursor-pointer rounded p-1.5 text-blue-600 hover:bg-blue-50"
                        >
                          <i className="ri-edit-line text-lg"></i>
                        </button>
                        <button
                          onClick={() => handleDelete(staff.id)}
                          className="cursor-pointer rounded p-1.5 text-red-600 hover:bg-red-50"
                        >
                          <i className="ri-delete-bin-line text-lg"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <StaffModal
          staff={editingStaff}
          onClose={() => {
            setShowModal(false);
            setEditingStaff(null);
          }}
          onSave={handleSave}
        />
      )}

      {showScheduleModal && (
        <WorkScheduleModal
          staffList={staffList}
          currentWeek={currentWeek}
          onClose={() => setShowScheduleModal(false)}
          onSave={schedules => {
            const updated = staffList.map(staff => ({
              ...staff,
              workSchedule: { ...staff.workSchedule, ...schedules[staff.id] },
            }));
            setStaffList(updated);
            localStorage.setItem('admin_staff', JSON.stringify(updated));
            setShowScheduleModal(false);
          }}
        />
      )}
    </div>
  );
}

function StaffModal({
  staff,
  onClose,
  onSave,
}: {
  staff: Staff | null;
  onClose: () => void;
  onSave: (data: Partial<Staff>) => void;
}) {
  const [formData, setFormData] = useState({
    name: staff?.name || '',
    position: staff?.position || '',
    type: staff?.type || '요양보호사',
    phone: staff?.phone || '',
    email: staff?.email || '',
    hireDate: staff?.hireDate || '',
    certNumber: staff?.certNumber || '',
    certExpiry: staff?.certExpiry || '',
    annualLeave: staff?.annualLeave || 15,
    status: staff?.status || '재직',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white shadow-xl">
        <div className="sticky top-0 flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
          <h3 className="text-xl font-bold text-gray-800">{staff ? '직원 정보 수정' : '새 직원 추가'}</h3>
          <button onClick={onClose} className="cursor-pointer text-gray-400 hover:text-gray-600">
            <i className="ri-close-line text-2xl"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">이름 *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">직위 *</label>
              <input
                type="text"
                required
                value={formData.position}
                onChange={e => setFormData({ ...formData, position: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">직종 *</label>
              <select
                required
                value={formData.type}
                onChange={e => setFormData({ ...formData, type: e.target.value })}
                className="w-full cursor-pointer rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-teal-500"
              >
                <option value="사회복지사">사회복지사</option>
                <option value="요양보호사">요양보호사</option>
                <option value="간호조무사">간호조무사</option>
                <option value="조리원">조리원</option>
                <option value="사무원">사무원</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">연락처 *</label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">이메일</label>
              <input
                type="email"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">입사일 *</label>
              <input
                type="date"
                required
                value={formData.hireDate}
                onChange={e => setFormData({ ...formData, hireDate: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">자격증 번호</label>
              <input
                type="text"
                value={formData.certNumber}
                onChange={e => setFormData({ ...formData, certNumber: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">자격증 만료일</label>
              <input
                type="date"
                value={formData.certExpiry}
                onChange={e => setFormData({ ...formData, certExpiry: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">연차 일수</label>
              <input
                type="number"
                value={formData.annualLeave}
                onChange={e => setFormData({ ...formData, annualLeave: parseInt(e.target.value) })}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">상태</label>
              <select
                value={formData.status}
                onChange={e => setFormData({ ...formData, status: e.target.value })}
                className="w-full cursor-pointer rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-teal-500"
              >
                <option value="재직">재직</option>
                <option value="휴직">휴직</option>
                <option value="퇴사">퇴사</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer whitespace-nowrap rounded-lg border border-gray-300 px-6 py-2 text-gray-700 transition-colors hover:bg-gray-50"
            >
              취소
            </button>
            <button
              type="submit"
              className="cursor-pointer whitespace-nowrap rounded-lg bg-gradient-to-r from-teal-500 to-cyan-500 px-6 py-2 text-white transition-all duration-300 hover:shadow-lg"
            >
              {staff ? '수정하기' : '추가하기'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function WorkScheduleModal({
  staffList,
  currentWeek,
  onClose,
  onSave,
}: {
  staffList: Staff[];
  currentWeek: Date;
  onClose: () => void;
  onSave: (schedules: { [staffId: string]: { [date: string]: string } }) => void;
}) {
  const [schedules, setSchedules] = useState<{ [staffId: string]: { [date: string]: string } }>({});

  const getWeekDates = () => {
    const dates = [];
    const start = new Date(currentWeek);
    start.setDate(start.getDate() - start.getDay());

    for (let i = 0; i < 7; i++) {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const weekDates = getWeekDates();

  const handleScheduleChange = (staffId: string, date: string, value: string) => {
    setSchedules(prev => ({
      ...prev,
      [staffId]: {
        ...(prev[staffId] || {}),
        [date]: value,
      },
    }));
  };

  const handleSubmit = () => {
    onSave(schedules);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="max-h-[90vh] w-full max-w-6xl overflow-y-auto rounded-lg bg-white shadow-xl">
        <div className="sticky top-0 flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
          <h3 className="text-xl font-bold text-gray-800">주간 근무표 작성</h3>
          <button onClick={onClose} className="cursor-pointer text-gray-400 hover:text-gray-600">
            <i className="ri-close-line text-2xl"></i>
          </button>
        </div>

        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border px-4 py-3 text-left text-sm font-semibold text-gray-700">직원명</th>
                  {weekDates.map((date, index) => (
                    <th key={index} className="border px-4 py-3 text-center text-sm font-semibold text-gray-700">
                      <div>{['일', '월', '화', '수', '목', '금', '토'][index]}</div>
                      <div className="text-xs font-normal text-gray-500">
                        {date.getMonth() + 1}/{date.getDate()}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {staffList
                  .filter(s => s.status === '재직')
                  .map(staff => (
                    <tr key={staff.id} className="hover:bg-gray-50">
                      <td className="border px-4 py-3 text-sm font-medium text-gray-800">
                        {staff.name}
                        <div className="text-xs text-gray-500">{staff.position}</div>
                      </td>
                      {weekDates.map((date, index) => {
                        const dateStr = date.toISOString().split('T')[0];
                        return (
                          <td key={index} className="border px-2 py-2">
                            <select
                              value={schedules[staff.id]?.[dateStr] || staff.workSchedule[dateStr] || ''}
                              onChange={e => handleScheduleChange(staff.id, dateStr, e.target.value)}
                              className="w-full cursor-pointer rounded border border-gray-300 px-2 py-1 text-sm focus:border-transparent focus:ring-2 focus:ring-teal-500"
                            >
                              <option value="">미정</option>
                              <option value="주간">주간</option>
                              <option value="야간">야간</option>
                              <option value="비번">비번</option>
                              <option value="휴무">휴무</option>
                              <option value="연차">연차</option>
                            </select>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button
              onClick={onClose}
              className="cursor-pointer whitespace-nowrap rounded-lg border border-gray-300 px-6 py-2 text-gray-700 transition-colors hover:bg-gray-50"
            >
              취소
            </button>
            <button
              onClick={handleSubmit}
              className="cursor-pointer whitespace-nowrap rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-2 text-white transition-all duration-300 hover:shadow-lg"
            >
              근무표 저장
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
