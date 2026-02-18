/**
 * Description : CCTVWeeklyCheck.tsx - ?? CCTVWeeklyCheck UI ????
 * Author : Shiwoo Min
 * Date : 2026-02-18
 */

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

  const createThisWeek = () => {
    const thisWeek = getThisWeek();
    const exists = weeklyChecks.some(check => check.weekStart === thisWeek.start && check.weekEnd === thisWeek.end);

    if (exists) {
      alert('이번 주 점검대장이 이미 존재합니다.');
      return;
    }
    alert(`${thisWeek.start} ~ ${thisWeek.end} 주간 점검대장이 생성되었습니다.`);
  };

  const handleComplete = (check: WeeklyCheck) => {
    if (!check.inspector || !check.findings) {
      alert('점검자와 점검 내용을 입력해주세요.');
      return;
    }
    if (confirm('점검을 완료하시겠습니까? 완료 후에는 수정이 제한됩니다.')) {
      alert('점검이 완료되었습니다.');
    }
  };

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
    <div className="animate-fadeIn overflow-hidden rounded-lg bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50/50 p-6">
        <div>
          <h2 className="flex items-center gap-2 text-lg font-bold text-gray-900">
            <i className="ri-calendar-check-line text-emerald-600"></i>
            CCTV 주간 점검대장
          </h2>
          <p className="text-sm text-gray-500">주 1회 CCTV 설비 정기 점검 기록</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={createThisWeek}
            className="flex items-center gap-2 whitespace-nowrap rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-blue-700"
          >
            <i className="ri-add-line"></i>
            이번 주 생성
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 whitespace-nowrap rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-700 transition-colors hover:bg-gray-50"
          >
            <i className="ri-printer-line"></i>
            출력
          </button>
          <button
            onClick={handleExport}
            className="flex items-center gap-2 whitespace-nowrap rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-700 transition-colors hover:bg-gray-50"
          >
            <i className="ri-file-pdf-line"></i>
            PDF
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 divide-x divide-gray-100 border-b border-gray-100">
        <div className="p-6 text-center">
          <p className="mb-1 text-xs font-bold uppercase tracking-widest text-gray-400">TOTAL WEEKS</p>
          <p className="text-2xl font-black text-gray-900">{weeklyChecks.length}</p>
        </div>
        <div className="p-6 text-center">
          <p className="mb-1 text-xs font-bold uppercase tracking-widest text-emerald-500">COMPLETED</p>
          <p className="text-2xl font-black text-emerald-600">
            {weeklyChecks.filter(c => c.status === 'completed').length}
          </p>
        </div>
        <div className="p-6 text-center">
          <p className="mb-1 text-xs font-bold uppercase tracking-widest text-orange-500">PENDING</p>
          <p className="text-2xl font-black text-orange-600">
            {weeklyChecks.filter(c => c.status === 'pending').length}
          </p>
        </div>
        <div className="p-6 text-center">
          <p className="mb-1 text-xs font-bold uppercase tracking-widest text-purple-500">COMPLETION RATE</p>
          <p className="text-2xl font-black text-purple-600">
            {Math.round((weeklyChecks.filter(c => c.status === 'completed').length / weeklyChecks.length) * 100)}%
          </p>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-6 flex gap-3">
          <div className="flex-1">
            <input
              type="week"
              value={selectedWeek}
              onChange={e => setSelectedWeek(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm outline-none focus:border-emerald-500"
            />
          </div>
          <select className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm outline-none focus:border-emerald-500">
            <option value="all">전체 상태</option>
            <option value="pending">미작성</option>
            <option value="completed">작성완료</option>
            <option value="locked">잠금</option>
          </select>
          <button className="flex items-center gap-2 whitespace-nowrap rounded-lg bg-emerald-600 px-4 py-2 text-sm font-bold text-white shadow-sm transition-all hover:bg-emerald-700">
            <i className="ri-search-line"></i>
            조회
          </button>
        </div>

        <div className="overflow-x-auto rounded-lg border border-gray-100">
          <table className="w-full text-left">
            <thead className="border-b border-gray-100 bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-[11px] font-black uppercase text-gray-400">주차</th>
                <th className="px-4 py-2 text-[11px] font-black uppercase text-gray-400">성능/촬영</th>
                <th className="px-4 py-2 text-[11px] font-black uppercase text-gray-400">저장장치</th>
                <th className="px-4 py-2 text-[11px] font-black uppercase text-gray-400">잠금장치</th>
                <th className="px-4 py-2 text-[11px] font-black uppercase text-gray-400">유출방지</th>
                <th className="px-4 py-2 text-[11px] font-black uppercase text-gray-400">모니터</th>
                <th className="px-4 py-3 text-[11px] font-black uppercase text-gray-400">점검자</th>
                <th className="px-4 py-3 text-[11px] font-black uppercase text-gray-400">상태</th>
                <th className="px-4 py-3 text-center text-[11px] font-black uppercase text-gray-400">관리</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {weeklyChecks.map((check, index) => (
                <tr key={check.id} className="transition-colors hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="text-sm font-black text-gray-900">{weeklyChecks.length - index}주차</div>
                    <div className="font-mono text-[10px] text-gray-400">
                      {check.weekStart} ~ {check.weekEnd}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <i
                      className={`ri-${check.performanceCheck ? 'checkbox-circle-fill text-emerald-500' : 'close-circle-fill text-gray-200'} text-lg`}
                    ></i>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <i
                      className={`ri-${check.storageCheck ? 'checkbox-circle-fill text-emerald-500' : 'close-circle-fill text-gray-200'} text-lg`}
                    ></i>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <i
                      className={`ri-${check.lockCheck ? 'checkbox-circle-fill text-emerald-500' : 'close-circle-fill text-gray-200'} text-lg`}
                    ></i>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <i
                      className={`ri-${check.leakCheck ? 'checkbox-circle-fill text-emerald-500' : 'close-circle-fill text-gray-200'} text-lg`}
                    ></i>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <i
                      className={`ri-${check.monitorCheck ? 'checkbox-circle-fill text-emerald-500' : 'close-circle-fill text-gray-200'} text-lg`}
                    ></i>
                  </td>
                  <td className="px-4 py-3 text-sm font-bold text-gray-600">{check.inspector || '-'}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-black uppercase ${
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
                    <div className="flex justify-center gap-1">
                      <button
                        onClick={() => {
                          setSelectedCheck(check);
                          setIsEditMode(true);
                          setShowCheckModal(true);
                        }}
                        className="rounded p-1.5 text-emerald-600 hover:bg-emerald-50"
                        disabled={check.status === 'locked'}
                      >
                        <i className="ri-edit-line"></i>
                      </button>
                      {check.status === 'pending' && (
                        <button
                          onClick={() => handleComplete(check)}
                          className="rounded p-1.5 text-blue-600 hover:bg-blue-50"
                        >
                          <i className="ri-check-line"></i>
                        </button>
                      )}
                      {check.status === 'locked' && (
                        <button
                          onClick={() => handleUnlock(check)}
                          className="rounded p-1.5 text-orange-500 hover:bg-orange-50"
                        >
                          <i className="ri-lock-unlock-line"></i>
                        </button>
                      )}
                      <button
                        onClick={() => {
                          if (confirm('정말 삭제하시겠습니까?')) {
                            alert('삭제되었습니다.');
                          }
                        }}
                        className="rounded p-1.5 text-red-500 hover:bg-red-50"
                      >
                        <i className="ri-delete-bin-line"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 점검 작성/수정 모달 */}
      {showCheckModal && selectedCheck && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={() => setShowCheckModal(false)}
        >
          <div
            className="animate-scaleIn max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="sticky top-0 flex items-center justify-between bg-emerald-600 px-6 py-4">
              <h2 className="text-lg font-black uppercase text-white">
                주간 점검대장 ({selectedCheck.weekStart} ~ {selectedCheck.weekEnd})
              </h2>
              <button
                onClick={() => setShowCheckModal(false)}
                className="rounded-full p-1 text-white transition-colors hover:bg-white/20"
              >
                <i className="ri-close-line text-2xl"></i>
              </button>
            </div>
            <div className="p-8">
              <div className="grid grid-cols-2 gap-8">
                {/* 왼쪽: 기본 정보 & 결과 */}
                <div className="space-y-6">
                  <div className="rounded-xl border border-gray-100 bg-gray-50/50 p-6">
                    <h3 className="mb-4 text-xs font-black uppercase tracking-widest text-gray-400">Basic Info</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="mb-1 block text-[10px] font-black uppercase text-gray-400">점검일자 *</label>
                        <input
                          type="date"
                          defaultValue={selectedCheck.inspectionDate}
                          className="w-full rounded-lg border px-3 py-2 text-sm font-bold outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-[10px] font-black uppercase text-gray-400">점검자 *</label>
                        <input
                          type="text"
                          defaultValue={selectedCheck.inspector}
                          placeholder="점검자 성명"
                          className="w-full rounded-lg border px-3 py-2 text-sm font-bold outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="rounded-xl border border-gray-100 bg-gray-50/50 p-6">
                    <h3 className="mb-4 text-xs font-black uppercase tracking-widest text-gray-400">
                      Inspection Results
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="mb-1 block text-[10px] font-black uppercase text-gray-400">발견 내용 *</label>
                        <textarea
                          rows={3}
                          defaultValue={selectedCheck.findings}
                          className="w-full rounded-lg border px-3 py-2 text-sm font-bold outline-none focus:ring-2 focus:ring-emerald-500"
                          placeholder="점검 발견 사항..."
                        ></textarea>
                      </div>
                      <div>
                        <label className="mb-1 block text-[10px] font-black uppercase text-gray-400">개선 조치</label>
                        <textarea
                          rows={3}
                          defaultValue={selectedCheck.improvements}
                          className="w-full rounded-lg border px-3 py-2 text-sm font-bold outline-none focus:ring-2 focus:ring-emerald-500"
                          placeholder="조치 결과 및 계획..."
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 오른쪽: 점검 항목 */}
                <div className="space-y-4">
                  <h3 className="pl-2 text-xs font-black uppercase tracking-widest text-gray-400">
                    Inspection Checklist
                  </h3>
                  {[
                    {
                      label: '성능 및 촬영·삭제주기 확인',
                      key: 'performanceCheck',
                      desc: '카메라 및 녹화 시스템 정상 작동',
                    },
                    { label: '영상정보 저장장치 상태', key: 'storageCheck', desc: 'NVR/DVR 저장 용량 및 백업' },
                    { label: '잠금장치 및 권한관리', key: 'lockCheck', desc: '물리적 잠금 및 시스템 접근 권한' },
                    { label: '화면 외부 유출 여부', key: 'leakCheck', desc: '방문객 노출 방지 및 보안' },
                    { label: '모니터 관리 상태', key: 'monitorCheck', desc: '디스플레이 및 전원 케이블' },
                  ].map(item => (
                    <label
                      key={item.key}
                      className="group flex cursor-pointer items-center gap-4 rounded-xl border p-4 transition-colors hover:bg-gray-50"
                    >
                      <input
                        type="checkbox"
                        defaultChecked={(selectedCheck as any)[item.key]}
                        className="h-5 w-5 rounded text-emerald-600 focus:ring-emerald-500"
                      />
                      <div className="flex-1">
                        <div className="text-sm font-black text-gray-900">{item.label}</div>
                        <div className="text-[10px] font-bold uppercase text-gray-400 transition-colors group-hover:text-emerald-500">
                          {item.desc}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex gap-3 border-t border-gray-100 pt-6">
                <button
                  onClick={() => setShowCheckModal(false)}
                  className="flex-1 rounded-xl bg-gray-100 px-4 py-3 text-sm font-black text-gray-500 transition-colors hover:bg-gray-200"
                >
                  취소
                </button>
                <button
                  onClick={() => {
                    alert('임시저장되었습니다.');
                  }}
                  className="flex-1 rounded-xl bg-blue-100 px-4 py-3 text-sm font-black text-blue-600 transition-colors hover:bg-blue-200"
                >
                  임시저장
                </button>
                <button
                  onClick={() => {
                    alert('점검이 완료되었습니다.');
                    setShowCheckModal(false);
                  }}
                  className="flex-1 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-black text-white shadow-xl transition-all hover:bg-emerald-700"
                >
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
