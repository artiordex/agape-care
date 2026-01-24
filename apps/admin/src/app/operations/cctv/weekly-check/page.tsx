'use client';

import { useState } from 'react';

interface WeeklyCheck {
  id: string;
  weekStart: string;
  weekEnd: string;
  status: 'pending' | 'completed' | 'locked';
  performanceCheck: boolean;
  storageCheck: boolean;
  lockCheck: boolean;
  leakCheck: boolean;
  monitorCheck: boolean;
  findings: string;
  improvements: string;
  inspector: string;
  inspectionDate?: string;
  completedAt?: string;
}

const CCTVWeeklyCheck = () => {
  const [selectedWeek, setSelectedWeek] = useState<string>('');
  const [showCheckModal, setShowCheckModal] = useState(false);
  const [selectedCheck, setSelectedCheck] = useState<WeeklyCheck | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  // 샘플 데이터
  const [weeklyChecks] = useState<WeeklyCheck[]>([
    {
      id: 'WC001',
      weekStart: '2024-01-08',
      weekEnd: '2024-01-14',
      status: 'completed',
      performanceCheck: true,
      storageCheck: true,
      lockCheck: true,
      leakCheck: true,
      monitorCheck: true,
      findings: '모든 장비 정상 작동',
      improvements: '없음',
      inspector: '김보안',
      inspectionDate: '2024-01-14',
      completedAt: '2024-01-14 17:30',
    },
    {
      id: 'WC002',
      weekStart: '2024-01-15',
      weekEnd: '2024-01-21',
      status: 'completed',
      performanceCheck: true,
      storageCheck: true,
      lockCheck: true,
      leakCheck: true,
      monitorCheck: false,
      findings: '2층 복도 카메라 화질 저하',
      improvements: '렌즈 청소 완료',
      inspector: '이관리',
      inspectionDate: '2024-01-21',
      completedAt: '2024-01-21 16:00',
    },
    {
      id: 'WC003',
      weekStart: '2024-01-22',
      weekEnd: '2024-01-28',
      status: 'pending',
      performanceCheck: false,
      storageCheck: false,
      lockCheck: false,
      leakCheck: false,
      monitorCheck: false,
      findings: '',
      improvements: '',
      inspector: '',
    },
  ]);

  // 이번 주 날짜 계산
  const getThisWeek = () => {
    const today = new Date();
    const day = today.getDay();
    const diff = today.getDate() - day + (day === 0 ? -6 : 1); // 월요일 기준
    const monday = new Date(today.setDate(diff));
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);

    return {
      start: monday.toISOString().split('T')[0],
      end: sunday.toISOString().split('T')[0],
    };
  };

  // 이번 주 점검대장 생성
  const createThisWeek = () => {
    const thisWeek = getThisWeek();
    const exists = weeklyChecks.some(check => check.weekStart === thisWeek.start && check.weekEnd === thisWeek.end);

    if (exists) {
      alert('이번 주 점검대장이 이미 존재합니다.');
      return;
    }

    alert(`${thisWeek.start} ~ ${thisWeek.end} 주간 점검대장이 생성되었습니다.`);
  };

  // 점검 완료 처리
  const handleComplete = (check: WeeklyCheck) => {
    if (!check.inspector || !check.findings) {
      alert('점검자와 점검 내용을 입력해주세요.');
      return;
    }

    if (confirm('점검을 완료하시겠습니까? 완료 후에는 수정이 제한됩니다.')) {
      alert('점검이 완료되었습니다.');
    }
  };

  // 잠금 해제 (관리자만)
  const handleUnlock = (check: WeeklyCheck) => {
    if (confirm('점검대장 잠금을 해제하시겠습니까?')) {
      alert('잠금이 해제되었습니다.');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExport = () => {
    alert('PDF 다운로드 기능은 백엔드 연동 후 구현됩니다.');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* 헤더 */}
      <div className="mb-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h1 className="flex items-center gap-3 text-2xl font-bold text-gray-900">
              <i className="ri-calendar-check-line text-emerald-600"></i>
              CCTV 주간 점검대장
            </h1>
            <p className="mt-1 text-sm text-gray-600">주 1회 CCTV 설비 점검 기록을 관리합니다</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={createThisWeek}
              className="flex items-center gap-2 whitespace-nowrap rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
            >
              <i className="ri-add-line"></i>
              이번 주 생성
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 whitespace-nowrap rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-700 transition-colors hover:bg-gray-50"
            >
              <i className="ri-printer-line"></i>
              출력
            </button>
            <button
              onClick={handleExport}
              className="flex items-center gap-2 whitespace-nowrap rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-700 transition-colors hover:bg-gray-50"
            >
              <i className="ri-file-pdf-line"></i>
              PDF
            </button>
          </div>
        </div>

        {/* 통계 카드 */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">총 점검 주차</p>
                <p className="mt-1 text-2xl font-bold text-gray-900">{weeklyChecks.length}주</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                <i className="ri-calendar-line text-2xl text-blue-600"></i>
              </div>
            </div>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">완료</p>
                <p className="mt-1 text-2xl font-bold text-emerald-600">
                  {weeklyChecks.filter(c => c.status === 'completed').length}주
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100">
                <i className="ri-checkbox-circle-line text-2xl text-emerald-600"></i>
              </div>
            </div>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">미작성</p>
                <p className="mt-1 text-2xl font-bold text-orange-600">
                  {weeklyChecks.filter(c => c.status === 'pending').length}주
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100">
                <i className="ri-alarm-warning-line text-2xl text-orange-600"></i>
              </div>
            </div>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">완료율</p>
                <p className="mt-1 text-2xl font-bold text-purple-600">
                  {Math.round((weeklyChecks.filter(c => c.status === 'completed').length / weeklyChecks.length) * 100)}%
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                <i className="ri-pie-chart-line text-2xl text-purple-600"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 점검대장 목록 */}
      <div className="rounded-lg bg-white shadow-sm">
        <div className="p-6">
          {/* 필터 바 */}
          <div className="mb-6 flex gap-3">
            <div className="flex-1">
              <input
                type="week"
                value={selectedWeek}
                onChange={e => setSelectedWeek(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <select className="rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-emerald-500">
              <option value="all">전체 상태</option>
              <option value="pending">미작성</option>
              <option value="completed">작성완료</option>
              <option value="locked">잠금</option>
            </select>
            <button className="flex items-center gap-2 whitespace-nowrap rounded-lg bg-emerald-600 px-4 py-2 text-white transition-colors hover:bg-emerald-700">
              <i className="ri-search-line"></i>
              조회
            </button>
          </div>

          {/* 테이블 */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-gray-200 bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-600">주차</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-600">기간</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold uppercase text-gray-600">성능/촬영</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold uppercase text-gray-600">저장장치</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold uppercase text-gray-600">잠금장치</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold uppercase text-gray-600">유출방지</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold uppercase text-gray-600">모니터</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-600">점검자</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-600">상태</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold uppercase text-gray-600">관리</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {weeklyChecks.map((check, index) => (
                  <tr key={check.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{weeklyChecks.length - index}주차</td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {check.weekStart} ~ {check.weekEnd}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {check.performanceCheck ? (
                        <i className="ri-checkbox-circle-fill text-xl text-emerald-600"></i>
                      ) : (
                        <i className="ri-close-circle-fill text-xl text-gray-300"></i>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {check.storageCheck ? (
                        <i className="ri-checkbox-circle-fill text-xl text-emerald-600"></i>
                      ) : (
                        <i className="ri-close-circle-fill text-xl text-gray-300"></i>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {check.lockCheck ? (
                        <i className="ri-checkbox-circle-fill text-xl text-emerald-600"></i>
                      ) : (
                        <i className="ri-close-circle-fill text-xl text-gray-300"></i>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {check.leakCheck ? (
                        <i className="ri-checkbox-circle-fill text-xl text-emerald-600"></i>
                      ) : (
                        <i className="ri-close-circle-fill text-xl text-gray-300"></i>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {check.monitorCheck ? (
                        <i className="ri-checkbox-circle-fill text-xl text-emerald-600"></i>
                      ) : (
                        <i className="ri-close-circle-fill text-xl text-gray-300"></i>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{check.inspector || '-'}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                          check.status === 'completed'
                            ? 'bg-emerald-100 text-emerald-700'
                            : check.status === 'locked'
                              ? 'bg-gray-100 text-gray-700'
                              : 'bg-orange-100 text-orange-700'
                        }`}
                      >
                        {check.status === 'completed' ? '작성완료' : check.status === 'locked' ? '잠금' : '미작성'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => {
                          setSelectedCheck(check);
                          setIsEditMode(true);
                          setShowCheckModal(true);
                        }}
                        className="mr-3 text-emerald-600 hover:text-emerald-700"
                        disabled={check.status === 'locked'}
                      >
                        <i className="ri-edit-line text-lg"></i>
                      </button>
                      {check.status === 'pending' && (
                        <button
                          onClick={() => handleComplete(check)}
                          className="mr-3 text-blue-600 hover:text-blue-700"
                        >
                          <i className="ri-check-line text-lg"></i>
                        </button>
                      )}
                      {check.status === 'locked' && (
                        <button
                          onClick={() => handleUnlock(check)}
                          className="mr-3 text-orange-600 hover:text-orange-700"
                        >
                          <i className="ri-lock-unlock-line text-lg"></i>
                        </button>
                      )}
                      <button
                        onClick={() => {
                          if (confirm('정말 삭제하시겠습니까?')) {
                            alert('삭제되었습니다.');
                          }
                        }}
                        className="text-red-600 hover:text-red-700"
                      >
                        <i className="ri-delete-bin-line text-lg"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 점검 작성/수정 모달 */}
      {showCheckModal && selectedCheck && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={() => setShowCheckModal(false)}
        >
          <div
            className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-xl bg-white shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="sticky top-0 flex items-center justify-between bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-4">
              <h2 className="text-xl font-bold text-white">
                CCTV 주간 점검대장 ({selectedCheck.weekStart} ~ {selectedCheck.weekEnd})
              </h2>
              <button
                onClick={() => setShowCheckModal(false)}
                className="rounded-full p-1 text-white hover:bg-white/20"
              >
                <i className="ri-close-line text-2xl"></i>
              </button>
            </div>
            <div className="p-6">
              {/* 기본 정보 */}
              <div className="mb-6">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
                  <i className="ri-information-line text-emerald-600"></i>
                  기본 정보
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">점검 주차</label>
                    <input
                      type="text"
                      value={`${selectedCheck.weekStart} ~ ${selectedCheck.weekEnd}`}
                      className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">점검일자 *</label>
                    <input
                      type="date"
                      defaultValue={selectedCheck.inspectionDate}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>
              </div>

              {/* 점검 항목 */}
              <div className="mb-6">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
                  <i className="ri-checkbox-multiple-line text-emerald-600"></i>
                  점검 항목
                </h3>
                <div className="space-y-3">
                  <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 p-4 hover:bg-gray-50">
                    <input
                      type="checkbox"
                      defaultChecked={selectedCheck.performanceCheck}
                      className="h-5 w-5 rounded text-emerald-600 focus:ring-emerald-500"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">성능 및 촬영·삭제주기 확인</div>
                      <div className="text-sm text-gray-600">카메라 화질, 녹화 상태, 자동 삭제 주기 정상 작동 여부</div>
                    </div>
                  </label>
                  <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 p-4 hover:bg-gray-50">
                    <input
                      type="checkbox"
                      defaultChecked={selectedCheck.storageCheck}
                      className="h-5 w-5 rounded text-emerald-600 focus:ring-emerald-500"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">영상정보 저장장치 정상 작동 여부</div>
                      <div className="text-sm text-gray-600">NVR/DVR 작동 상태, 저장 용량, 백업 시스템 점검</div>
                    </div>
                  </label>
                  <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 p-4 hover:bg-gray-50">
                    <input
                      type="checkbox"
                      defaultChecked={selectedCheck.lockCheck}
                      className="h-5 w-5 rounded text-emerald-600 focus:ring-emerald-500"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">잠금장치 및 권한관리 상태</div>
                      <div className="text-sm text-gray-600">관리실 출입 통제, 접근 권한 설정, 비밀번호 관리</div>
                    </div>
                  </label>
                  <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 p-4 hover:bg-gray-50">
                    <input
                      type="checkbox"
                      defaultChecked={selectedCheck.leakCheck}
                      className="h-5 w-5 rounded text-emerald-600 focus:ring-emerald-500"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">화면 외부 유출 여부 점검</div>
                      <div className="text-sm text-gray-600">모니터 위치, 외부 노출 방지, 네트워크 보안 상태</div>
                    </div>
                  </label>
                  <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 p-4 hover:bg-gray-50">
                    <input
                      type="checkbox"
                      defaultChecked={selectedCheck.monitorCheck}
                      className="h-5 w-5 rounded text-emerald-600 focus:ring-emerald-500"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">모니터 관리 상태</div>
                      <div className="text-sm text-gray-600">모니터 화면 상태, 케이블 연결, 전원 공급 정상 여부</div>
                    </div>
                  </label>
                </div>
              </div>

              {/* 점검 결과 */}
              <div className="mb-6">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
                  <i className="ri-file-text-line text-emerald-600"></i>
                  점검 결과
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">발견 내용 *</label>
                    <textarea
                      defaultValue={selectedCheck.findings}
                      rows={4}
                      placeholder="점검 중 발견된 내용을 상세히 기록하세요"
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-emerald-500"
                    ></textarea>
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">개선 계획 및 조치사항</label>
                    <textarea
                      defaultValue={selectedCheck.improvements}
                      rows={4}
                      placeholder="개선이 필요한 사항과 조치 계획을 기록하세요"
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-emerald-500"
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* 점검자 정보 */}
              <div className="mb-6">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
                  <i className="ri-user-line text-emerald-600"></i>
                  점검자 정보
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">점검자 *</label>
                    <input
                      type="text"
                      defaultValue={selectedCheck.inspector}
                      placeholder="점검자 이름"
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">직책</label>
                    <input
                      type="text"
                      placeholder="예: 홈페이지 바로가기팀장"
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>
              </div>

              {/* 버튼 그룹 */}
              <div className="flex gap-3 border-t border-gray-200 pt-4">
                <button
                  onClick={() => setShowCheckModal(false)}
                  className="flex-1 rounded-lg bg-gray-100 px-4 py-2 text-gray-700 hover:bg-gray-200"
                >
                  취소
                </button>
                <button
                  onClick={() => {
                    alert('임시저장되었습니다.');
                  }}
                  className="flex-1 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                  <i className="ri-save-line mr-1"></i>
                  임시저장
                </button>
                <button
                  onClick={() => {
                    alert('점검이 완료되었습니다.');
                    setShowCheckModal(false);
                  }}
                  className="flex-1 rounded-lg bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700"
                >
                  <i className="ri-check-line mr-1"></i>
                  완료 처리
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CCTVWeeklyCheck;
