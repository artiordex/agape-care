import { useState } from 'react';
import * as XLSX from 'xlsx';
import { attendanceRecords, monthlyAttendanceSummary } from '../../../../../src/mocks/residents-management';

export default function AttendanceManagement() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [viewMode, setViewMode] = useState<'daily' | 'monthly'>('daily');
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<any>(null);

  // 수기 수정 폼
  const [editCheckIn, setEditCheckIn] = useState('');
  const [editCheckOut, setEditCheckOut] = useState('');
  const [editMemo, setEditMemo] = useState('');

  // 일일 기록 필터링
  const dailyRecords = attendanceRecords.filter(r => r.date === selectedDate);

  // 상태별 통계
  const stats = {
    total: dailyRecords.length,
    normal: dailyRecords.filter(r => r.status === 'normal').length,
    late: dailyRecords.filter(r => r.status === 'late').length,
    earlyLeave: dailyRecords.filter(r => r.status === 'early-leave').length,
    absent: dailyRecords.filter(r => r.status === 'absent').length,
    night: dailyRecords.filter(r => r.workType === 'NIGHT').length
  };

  const getStatusBadge = (status: string) => {
    const badges: any = {
      'normal': { bg: 'bg-green-100', text: 'text-green-700', icon: 'ri-check-line', label: '정상' },
      'late': { bg: 'bg-yellow-100', text: 'text-yellow-700', icon: 'ri-time-line', label: '지각' },
      'early-leave': { bg: 'bg-orange-100', text: 'text-orange-700', icon: 'ri-logout-box-line', label: '조퇴' },
      'absent': { bg: 'bg-red-100', text: 'text-red-700', icon: 'ri-close-circle-line', label: '결근' }
    };
    const badge = badges[status] || badges.normal;
    return (
      <span className={`px-3 py-1 ${badge.bg} ${badge.text} rounded-full text-sm font-medium`}>
        <i className={`${badge.icon} mr-1`}></i>
        {badge.label}
      </span>
    );
  };

  const getWorkTypeBadge = (type: string) => {
    return type === 'NIGHT' ? (
      <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
        <i className="ri-moon-line mr-1"></i>야간근무
      </span>
    ) : (
      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
        <i className="ri-sun-line mr-1"></i>주간근무
      </span>
    );
  };

  const handleEdit = (record: any) => {
    setSelectedRecord(record);
    setEditCheckIn(record.checkIn || '');
    setEditCheckOut(record.checkOut || '');
    setEditMemo(record.memo || '');
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    if (!editCheckIn && !editCheckOut) {
      alert('출근 또는 퇴근 시간을 입력해주세요.');
      return;
    }

    // 실제로는 API 호출
    alert('출퇴근 기록이 수정되었습니다.');
    setShowEditModal(false);
  };

  // 엑셀 다운로드
  const handleExcelDownload = () => {
    let data: any[] = [];
    let filename = '';

    if (viewMode === 'daily') {
      data = dailyRecords.map(r => ({
        '직원명': r.employeeName,
        '직종': r.position,
        '근무유형': r.workType === 'NIGHT' ? '야간근무' : '주간근무',
        '출근시간': r.checkIn || '-',
        '퇴근시간': r.checkOut || '-',
        '근무시간': r.totalHours ? `${r.totalHours}시간` : '-',
        '연장근무': r.overtimeHours ? `${r.overtimeHours}시간` : '-',
        '상태': r.status === 'normal' ? '정상' : r.status === 'late' ? '지각' : r.status === 'early-leave' ? '조퇴' : '결근',
        '메모': r.memo || '-'
      }));
      filename = `출퇴근기록_${selectedDate}.xlsx`;
    } else {
      data = monthlyAttendanceSummary.map(s => ({
        '직원명': s.employeeName,
        '직종': s.position,
        '총근무일수': s.totalDays,
        '총근무시간': `${s.totalHours}시간`,
        '연장근무': `${s.overtimeHours}시간`,
        '야간근무': `${s.nightShifts}회`,
        '주말근무': `${s.weekendShifts}회`,
        '지각': `${s.lateDays}일`,
        '조퇴': `${s.earlyLeaveDays}일`,
        '결근': `${s.absentDays}일`,
        '주52시간초과': s.over52Hours ? 'Y' : 'N'
      }));
      filename = `월간근무현황_${new Date().toISOString().slice(0, 7)}.xlsx`;
    }

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, viewMode === 'daily' ? '일일출퇴근' : '월간현황');

    // 열 너비 자동 조정
    const colWidths = Object.keys(data[0] || {}).map(key => ({
      wch: Math.max(key.length, ...data.map(row => String(row[key]).length)) + 2
    }));
    ws['!cols'] = colWidths;

    XLSX.writeFile(wb, filename);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">출퇴근 기록 관리</h1>
            <p className="text-sm text-gray-500 mt-1">직원들의 출퇴근 기록을 조회하고 관리합니다</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('daily')}
                className={`px-4 py-2 rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  viewMode === 'daily'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <i className="ri-calendar-line mr-2"></i>일일 현황
              </button>
              <button
                onClick={() => setViewMode('monthly')}
                className={`px-4 py-2 rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  viewMode === 'monthly'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <i className="ri-calendar-2-line mr-2"></i>월간 현황
              </button>
            </div>
            <button
              onClick={handleExcelDownload}
              className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:shadow-lg transition-all duration-300 whitespace-nowrap cursor-pointer"
            >
              <i className="ri-file-excel-line mr-2"></i>엑셀 다운로드
            </button>
          </div>
        </div>
      </div>

      <div className="p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          {viewMode === 'daily' ? (
            <>
              {/* 날짜 선택 및 통계 */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <label className="text-sm font-medium text-gray-700">조회 날짜:</label>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      max={new Date().toISOString().split('T')[0]}
                      className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent cursor-pointer"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500 mb-1">전체 직원</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-600 mb-1">정상 출근</p>
                    <p className="text-2xl font-bold text-green-700">{stats.normal}</p>
                  </div>
                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <p className="text-sm text-yellow-600 mb-1">지각</p>
                    <p className="text-2xl font-bold text-yellow-700">{stats.late}</p>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-lg">
                    <p className="text-sm text-orange-600 mb-1">조퇴</p>
                    <p className="text-2xl font-bold text-orange-700">{stats.earlyLeave}</p>
                  </div>
                  <div className="p-4 bg-red-50 rounded-lg">
                    <p className="text-sm text-red-600 mb-1">결근</p>
                    <p className="text-2xl font-bold text-red-700">{stats.absent}</p>
                  </div>
                  <div className="p-4 bg-indigo-50 rounded-lg">
                    <p className="text-sm text-indigo-600 mb-1">야간근무</p>
                    <p className="text-2xl font-bold text-indigo-700">{stats.night}</p>
                  </div>
                </div>
              </div>

              {/* 일일 출퇴근 기록 테이블 */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-bold text-gray-900">출퇴근 상세 기록</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">직원명</th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">직종</th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">근무유형</th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">출근시간</th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">퇴근시간</th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">근무시간</th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">연장근무</th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">상태</th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">메모</th>
                        <th className="px-6 py-3 text-center text-xs font-bold text-gray-700 uppercase">관리</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {dailyRecords.length === 0 ? (
                        <tr>
                          <td colSpan={10} className="px-6 py-12 text-center">
                            <div className="flex flex-col items-center justify-center text-gray-400">
                              <i className="ri-calendar-close-line text-5xl mb-3"></i>
                              <p className="text-sm">해당 날짜의 출퇴근 기록이 없습니다</p>
                            </div>
                          </td>
                        </tr>
                      ) : (
                        dailyRecords.map((record) => (
                          <tr key={record.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="font-medium text-gray-900">{record.employeeName}</div>
                              <div className="text-sm text-gray-500">{record.employeeId}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                              {record.position}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {getWorkTypeBadge(record.workType)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {record.checkIn ? (
                                <span className="text-sm font-medium text-gray-900">{record.checkIn}</span>
                              ) : (
                                <span className="text-sm text-gray-400">-</span>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {record.checkOut ? (
                                <span className="text-sm font-medium text-gray-900">{record.checkOut}</span>
                              ) : (
                                <span className="text-sm text-gray-400">-</span>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {record.totalHours > 0 ? (
                                <span className="text-sm font-bold text-blue-600">
                                  {record.totalHours.toFixed(1)}시간
                                </span>
                              ) : (
                                <span className="text-sm text-gray-400">-</span>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {record.overtimeHours > 0 ? (
                                <span className="text-sm font-bold text-orange-600">
                                  +{record.overtimeHours.toFixed(1)}시간
                                </span>
                              ) : (
                                <span className="text-sm text-gray-400">-</span>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {getStatusBadge(record.status)}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                              {record.memo || '-'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-center">
                              <button
                                onClick={() => handleEdit(record)}
                                className="px-3 py-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition-colors text-sm whitespace-nowrap cursor-pointer"
                              >
                                <i className="ri-edit-line mr-1"></i>수정
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* 월간 근무 현황 */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-bold text-gray-900">월간 근무 현황 (2024년 5월)</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">직원명</th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">직종</th>
                        <th className="px-6 py-3 text-center text-xs font-bold text-gray-700 uppercase">총근무일수</th>
                        <th className="px-6 py-3 text-center text-xs font-bold text-gray-700 uppercase">총근무시간</th>
                        <th className="px-6 py-3 text-center text-xs font-bold text-gray-700 uppercase">연장근무</th>
                        <th className="px-6 py-3 text-center text-xs font-bold text-gray-700 uppercase">야간근무</th>
                        <th className="px-6 py-3 text-center text-xs font-bold text-gray-700 uppercase">주말근무</th>
                        <th className="px-6 py-3 text-center text-xs font-bold text-gray-700 uppercase">지각</th>
                        <th className="px-6 py-3 text-center text-xs font-bold text-gray-700 uppercase">조퇴</th>
                        <th className="px-6 py-3 text-center text-xs font-bold text-gray-700 uppercase">결근</th>
                        <th className="px-6 py-3 text-center text-xs font-bold text-gray-700 uppercase">주52시간</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {monthlyAttendanceSummary.map((summary) => (
                        <tr key={summary.employeeId} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-medium text-gray-900">{summary.employeeName}</div>
                            <div className="text-sm text-gray-500">{summary.employeeId}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            {summary.position}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            <span className="text-sm font-medium text-gray-900">{summary.totalDays}일</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            <span className="text-sm font-bold text-blue-600">{summary.totalHours}시간</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            {summary.overtimeHours > 0 ? (
                              <span className="text-sm font-bold text-orange-600">
                                +{summary.overtimeHours}시간
                              </span>
                            ) : (
                              <span className="text-sm text-gray-400">-</span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            <span className="text-sm font-medium text-indigo-600">{summary.nightShifts}회</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            <span className="text-sm font-medium text-purple-600">{summary.weekendShifts}회</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            {summary.lateDays > 0 ? (
                              <span className="text-sm font-bold text-yellow-600">{summary.lateDays}일</span>
                            ) : (
                              <span className="text-sm text-gray-400">-</span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            {summary.earlyLeaveDays > 0 ? (
                              <span className="text-sm font-bold text-orange-600">{summary.earlyLeaveDays}일</span>
                            ) : (
                              <span className="text-sm text-gray-400">-</span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            {summary.absentDays > 0 ? (
                              <span className="text-sm font-bold text-red-600">{summary.absentDays}일</span>
                            ) : (
                              <span className="text-sm text-gray-400">-</span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            {summary.over52Hours ? (
                              <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-bold">
                                초과
                              </span>
                            ) : (
                              <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-bold">
                                정상
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* 수기 수정 모달 */}
      {showEditModal && selectedRecord && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">출퇴근 기록 수정</h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              >
                <i className="ri-close-line text-2xl"></i>
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">직원명</p>
                    <p className="text-lg font-medium text-gray-900">{selectedRecord.employeeName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">직종</p>
                    <p className="text-lg font-medium text-gray-900">{selectedRecord.position}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">날짜</p>
                    <p className="text-lg font-medium text-gray-900">{selectedRecord.date}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">근무유형</p>
                    <p className="text-lg font-medium text-gray-900">
                      {selectedRecord.workType === 'NIGHT' ? '야간근무' : '주간근무'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">출근 시간</label>
                  <input
                    type="time"
                    value={editCheckIn}
                    onChange={(e) => setEditCheckIn(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">퇴근 시간</label>
                  <input
                    type="time"
                    value={editCheckOut}
                    onChange={(e) => setEditCheckOut(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent cursor-pointer"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">메모</label>
                <textarea
                  value={editMemo}
                  onChange={(e) => setEditMemo(e.target.value)}
                  rows={4}
                  placeholder="수정 사유나 특이사항을 입력하세요"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  maxLength={500}
                ></textarea>
              </div>

              <div className="p-4 bg-yellow-50 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <i className="ri-information-line mr-2"></i>
                  관리자만 출퇴근 기록을 수정할 수 있으며, 모든 수정 내역은 감사 로그에 기록됩니다.
                </p>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-end gap-3">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors whitespace-nowrap cursor-pointer"
              >
                취소
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-6 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg hover:shadow-lg transition-all duration-300 whitespace-nowrap cursor-pointer"
              >
                <i className="ri-save-line mr-2"></i>저장하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
