'use client';

import { useState } from 'react';

interface Beneficiary {
  id: string;
  name: string;
  room: string;
  grade: string;
  status: string;
}

export default function DailyCareRecord() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedBeneficiary, setSelectedBeneficiary] = useState<Beneficiary | null>(null);
  const [activeTab, setActiveTab] = useState<'nursing' | 'weight' | 'oral' | 'emergency' | 'elimination'>('nursing');
  const [statusFilter, setStatusFilter] = useState('입소중');
  const [searchQuery, setSearchQuery] = useState('');

  // 수급자 데이터 (하드코딩)
  const beneficiaries: Beneficiary[] = [
    { id: '1', name: '김영희', room: '101호', grade: '1등급', status: '입소중' },
    { id: '2', name: '이철수', room: '102호', grade: '2등급', status: '입소중' },
    { id: '3', name: '박순자', room: '103호', grade: '3등급', status: '입소중' },
    { id: '4', name: '최민수', room: '201호', grade: '2등급', status: '입소중' },
    { id: '5', name: '정미경', room: '202호', grade: '1등급', status: '입소중' },
  ];

  const filteredBeneficiaries = beneficiaries.filter(
    b =>
      (statusFilter === '전체' || b.status === statusFilter) &&
      (b.name.includes(searchQuery) || b.room.includes(searchQuery)),
  );

  // 통합 간호
  const [nursingData, setNursingData] = useState({
    vitals: {
      systolic: '',
      diastolic: '',
      pulse: '',
      temperature: '',
      respiration: '',
      glucose: '',
      oxygen: '',
      pain: '',
      weight: '',
    },
    issues: {
      fall: false,
      pressure: false,
      dehydration: false,
      delirium: false,
      incontinence: false,
      pain: false,
      dyspnea: false,
    },
    notes: '',
    intervention: '',
    progress: '',
  });

  // 체중
  const [weightData, setWeightData] = useState({
    weight: '',
    time: '',
    method: '체중계',
  });

  // 구강상태
  const [oralData, setOralData] = useState({
    cleanliness: '정상',
    gums: '정상',
    stomatitis: '없음',
    denture: '정상',
    halitosis: '없음',
    pain: '없음',
    bleeding: '없음',
    action: '',
  });

  // 응급상황
  const [emergencyData, setEmergencyData] = useState({
    datetime: '',
    discoverer: '',
    category: '낙상',
    initialResponse: '',
    followUp: '',
    contact119: false,
    contactFamily: false,
    hospitalTransfer: false,
  });

  // 배설/비위관/도뇨관
  const [eliminationData, setEliminationData] = useState({
    bowelCount: '',
    bowelNature: '정상',
    urineCount: '',
    urineNature: '정상',
    ngTube: false,
    ngTubeChange: '',
    ngTubeCleaning: '',
    catheter: false,
    catheterIssue: '',
  });

  const tabs = [
    { id: 'nursing', label: '통합 간호관리', icon: 'ri-heart-pulse-line' },
    { id: 'weight', label: '체중 관리', icon: 'ri-scales-3-line' },
    { id: 'oral', label: '구강상태 점검', icon: 'ri-tooth-line' },
    { id: 'emergency', label: '응급상황 기록', icon: 'ri-alarm-warning-line' },
    { id: 'elimination', label: '배설/비위관/도뇨관', icon: 'ri-file-list-line' },
  ];

  const handleSave = () => alert('저장 완료되었습니다.');
  const handleTempSave = () => alert('임시 저장되었습니다.');
  const handleFinalize = () => {
    if (confirm('마감 처리하시겠습니까? 이후 수정이 제한됩니다.')) {
      alert('마감되었습니다.');
    }
  };

  return (
    <div className="flex h-full">
      {/* 좌측 패널: 수급자 목록 */}
      <div className="flex w-80 flex-col border-r bg-white">
        <div className="border-b p-4">
          <h2 className="mb-4 text-lg font-semibold">일일 케어 기록</h2>

          <div className="mb-3">
            <label className="text-sm">기준일</label>
            <input
              type="date"
              value={selectedDate}
              onChange={e => setSelectedDate(e.target.value)}
              className="w-full rounded-lg border px-3 py-2"
            />
          </div>

          <div className="mb-3">
            <label className="text-sm">현황</label>
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="w-full rounded-lg border px-3 py-2"
            >
              <option value="입소중">입소중</option>
              <option value="퇴소">퇴소</option>
              <option value="전체">전체</option>
            </select>
          </div>

          <div>
            <label className="text-sm">수급자 검색</label>
            <input
              type="text"
              placeholder="이름 / 방호 입력"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border px-3 py-2"
            />
          </div>
        </div>

        <div className="flex-1 space-y-2 overflow-y-auto p-4">
          {filteredBeneficiaries.map(b => (
            <button
              key={b.id}
              onClick={() => setSelectedBeneficiary(b)}
              className={`w-full rounded-lg border p-3 text-left ${
                selectedBeneficiary?.id === b.id
                  ? 'border-emerald-500 bg-emerald-50'
                  : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{b.name}</span>
                <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs text-emerald-700">{b.grade}</span>
              </div>
              <div className="text-sm text-gray-600">{b.room}</div>
            </button>
          ))}
        </div>
      </div>

      {/* 우측 패널: 상세 기록 입력 */}
      <div className="flex flex-1 flex-col bg-gray-50">
        {!selectedBeneficiary ? (
          <div className="flex flex-1 items-center justify-center">
            <div className="text-center text-gray-400">
              <i className="ri-user-search-line mb-4 text-6xl" />
              <p>수급자를 선택하세요.</p>
            </div>
          </div>
        ) : (
          <>
            {/* 상단 정보 */}
            <div className="flex justify-between border-b bg-white p-4">
              <div>
                <h3 className="text-xl font-semibold">{selectedBeneficiary.name}</h3>
                <p className="text-sm text-gray-600">
                  {selectedBeneficiary.room} · {selectedBeneficiary.grade} · {selectedDate}
                </p>
              </div>

              <div className="flex gap-2">
                <button className="rounded-lg bg-gray-200 px-4 py-2" onClick={handleTempSave}>
                  임시저장
                </button>
                <button className="rounded-lg bg-emerald-600 px-4 py-2 text-white" onClick={handleSave}>
                  저장
                </button>
                <button className="rounded-lg bg-blue-600 px-4 py-2 text-white" onClick={handleFinalize}>
                  마감
                </button>
              </div>
            </div>

            {/* 탭 메뉴 */}
            <div className="border-b bg-white px-4">
              <div className="flex gap-2 overflow-x-auto">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`border-b-2 px-4 py-3 text-sm ${
                      activeTab === tab.id
                        ? 'border-emerald-600 text-emerald-600'
                        : 'border-transparent text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    <i className={`${tab.icon} mr-2`} />
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 탭 콘텐츠 */}
            <div className="flex-1 overflow-y-auto p-6">
              {/* 통합 간호관리 */}
              {activeTab === 'nursing' && (
                <>
                  {/* 바이탈 */}
                  <div className="mb-6 rounded-lg bg-white p-6 shadow">
                    <h4 className="mb-4 text-lg font-semibold">바이탈 기록</h4>

                    <div className="grid grid-cols-3 gap-4">
                      {/* 혈압 */}
                      <div>
                        <label className="mb-1 block text-sm">혈압 (수축/이완)</label>
                        <div className="flex gap-2">
                          <input
                            type="number"
                            placeholder="수축"
                            value={nursingData.vitals.systolic}
                            onChange={e =>
                              setNursingData({
                                ...nursingData,
                                vitals: { ...nursingData.vitals, systolic: e.target.value },
                              })
                            }
                            className="w-full rounded-lg border px-3 py-2"
                          />
                          <input
                            type="number"
                            placeholder="이완"
                            value={nursingData.vitals.diastolic}
                            onChange={e =>
                              setNursingData({
                                ...nursingData,
                                vitals: { ...nursingData.vitals, diastolic: e.target.value },
                              })
                            }
                            className="w-full rounded-lg border px-3 py-2"
                          />
                        </div>
                      </div>

                      {/* 맥박 */}
                      <div>
                        <label className="mb-1 block text-sm">맥박</label>
                        <input
                          type="number"
                          value={nursingData.vitals.pulse}
                          onChange={e =>
                            setNursingData({
                              ...nursingData,
                              vitals: { ...nursingData.vitals, pulse: e.target.value },
                            })
                          }
                          className="w-full rounded-lg border px-3 py-2"
                        />
                      </div>

                      {/* 체온 */}
                      <div>
                        <label className="mb-1 block text-sm">체온</label>
                        <input
                          type="number"
                          step="0.1"
                          value={nursingData.vitals.temperature}
                          onChange={e =>
                            setNursingData({
                              ...nursingData,
                              vitals: { ...nursingData.vitals, temperature: e.target.value },
                            })
                          }
                          className="w-full rounded-lg border px-3 py-2"
                        />
                      </div>

                      {/* 호흡 */}
                      <div>
                        <label className="mb-1 block text-sm">호흡</label>
                        <input
                          type="number"
                          value={nursingData.vitals.respiration}
                          onChange={e =>
                            setNursingData({
                              ...nursingData,
                              vitals: { ...nursingData.vitals, respiration: e.target.value },
                            })
                          }
                          className="w-full rounded-lg border px-3 py-2"
                        />
                      </div>

                      {/* 혈당 */}
                      <div>
                        <label className="mb-1 block text-sm">혈당</label>
                        <input
                          type="number"
                          value={nursingData.vitals.glucose}
                          onChange={e =>
                            setNursingData({
                              ...nursingData,
                              vitals: { ...nursingData.vitals, glucose: e.target.value },
                            })
                          }
                          className="w-full rounded-lg border px-3 py-2"
                        />
                      </div>

                      {/* 산소포화도 */}
                      <div>
                        <label className="mb-1 block text-sm">산소포화도 (%)</label>
                        <input
                          type="number"
                          value={nursingData.vitals.oxygen}
                          onChange={e =>
                            setNursingData({
                              ...nursingData,
                              vitals: { ...nursingData.vitals, oxygen: e.target.value },
                            })
                          }
                          className="w-full rounded-lg border px-3 py-2"
                        />
                      </div>

                      {/* 통증 */}
                      <div>
                        <label className="mb-1 block text-sm">통증척도 (0~10)</label>
                        <input
                          type="number"
                          min="0"
                          max="10"
                          value={nursingData.vitals.pain}
                          onChange={e =>
                            setNursingData({
                              ...nursingData,
                              vitals: { ...nursingData.vitals, pain: e.target.value },
                            })
                          }
                          className="w-full rounded-lg border px-3 py-2"
                        />
                      </div>

                      {/* 체중 */}
                      <div>
                        <label className="mb-1 block text-sm">체중 (kg)</label>
                        <input
                          type="number"
                          step="0.1"
                          value={nursingData.vitals.weight}
                          onChange={e =>
                            setNursingData({
                              ...nursingData,
                              vitals: { ...nursingData.vitals, weight: e.target.value },
                            })
                          }
                          className="w-full rounded-lg border px-3 py-2"
                        />
                      </div>
                    </div>
                  </div>

                  {/* 문제 체크 */}
                  <div className="mb-6 rounded-lg bg-white p-6 shadow">
                    <h4 className="mb-4 text-lg font-semibold">증상/문제 체크</h4>
                    <div className="grid grid-cols-4 gap-4">
                      {Object.entries({
                        fall: '낙상위험',
                        pressure: '욕창위험',
                        dehydration: '탈수',
                        delirium: '섬망',
                        incontinence: '실금',
                        pain: '통증',
                        dyspnea: '호흡곤란',
                      }).map(([key, label]) => (
                        <label key={key} className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={nursingData.issues[key as keyof typeof nursingData.issues]}
                            onChange={e =>
                              setNursingData({
                                ...nursingData,
                                issues: {
                                  ...nursingData.issues,
                                  [key]: e.target.checked,
                                },
                              })
                            }
                          />
                          <span>{label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* 서술 기록 */}
                  <div className="rounded-lg bg-white p-6 shadow">
                    <h4 className="mb-4 text-lg font-semibold">간호기록 서술</h4>

                    <div className="space-y-4">
                      <textarea
                        rows={3}
                        placeholder="특이사항"
                        value={nursingData.notes}
                        onChange={e => setNursingData({ ...nursingData, notes: e.target.value })}
                        className="w-full rounded-lg border p-3"
                      />

                      <textarea
                        rows={3}
                        placeholder="중재내용"
                        value={nursingData.intervention}
                        onChange={e => setNursingData({ ...nursingData, intervention: e.target.value })}
                        className="w-full rounded-lg border p-3"
                      />

                      <textarea
                        rows={3}
                        placeholder="경과"
                        value={nursingData.progress}
                        onChange={e => setNursingData({ ...nursingData, progress: e.target.value })}
                        className="w-full rounded-lg border p-3"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* 체중 관리 */}
              {activeTab === 'weight' && (
                <div className="space-y-6">
                  <div className="rounded-lg bg-white p-6 shadow">
                    <h4 className="mb-4 text-lg font-semibold">체중 입력</h4>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="text-sm">체중 (kg)</label>
                        <input
                          type="number"
                          value={weightData.weight}
                          onChange={e => setWeightData({ ...weightData, weight: e.target.value })}
                          className="w-full rounded-lg border px-3 py-2"
                        />
                      </div>

                      <div>
                        <label className="text-sm">측정 시간</label>
                        <input
                          type="time"
                          value={weightData.time}
                          onChange={e => setWeightData({ ...weightData, time: e.target.value })}
                          className="w-full rounded-lg border px-3 py-2"
                        />
                      </div>

                      <div>
                        <label className="text-sm">측정 방법</label>
                        <select
                          value={weightData.method}
                          onChange={e => setWeightData({ ...weightData, method: e.target.value })}
                          className="w-full rounded-lg border px-3 py-2"
                        >
                          <option value="체중계">체중계</option>
                          <option value="휠체어 체중계">휠체어 체중계</option>
                          <option value="침대 체중계">침대 체중계</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* 그래프 */}
                  <div className="rounded-lg bg-white p-6 shadow">
                    <h4 className="mb-4 text-lg font-semibold">체중 추이 (최근 30일)</h4>
                    <div className="flex h-64 items-center justify-center rounded-lg bg-gray-100">
                      <span className="text-gray-500">그래프 영역 (차트 라이브러리 필요)</span>
                    </div>
                  </div>
                </div>
              )}

              {/* 구강상태 점검 */}
              {activeTab === 'oral' && (
                <div className="space-y-6 rounded-lg bg-white p-6 shadow">
                  <h4 className="text-lg font-semibold">구강상태 점검</h4>

                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries({
                      cleanliness: '구강 청결',
                      gums: '잇몸 상태',
                      stomatitis: '구내염',
                      denture: '의치 상태',
                      halitosis: '구취',
                      pain: '통증',
                      bleeding: '출혈',
                    }).map(([key, label]) => (
                      <div key={key}>
                        <label className="text-sm">{label}</label>
                        <select
                          value={oralData[key as keyof typeof oralData]}
                          onChange={e => setOralData({ ...oralData, [key]: e.target.value })}
                          className="w-full rounded-lg border px-3 py-2"
                        >
                          <option value="정상">정상</option>
                          <option value="주의">주의</option>
                          <option value="조치필요">조치 필요</option>
                          <option value="없음">없음</option>
                        </select>
                      </div>
                    ))}
                  </div>

                  <div>
                    <label className="text-sm">조치 내용</label>
                    <textarea
                      rows={3}
                      value={oralData.action}
                      onChange={e => setOralData({ ...oralData, action: e.target.value })}
                      className="w-full rounded-lg border px-3 py-2"
                    />
                  </div>
                </div>
              )}

              {/* 응급상황 기록 */}
              {activeTab === 'emergency' && (
                <div className="space-y-6 rounded-lg bg-white p-6 shadow">
                  <h4 className="text-lg font-semibold">응급상황 기록</h4>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm">발생일시</label>
                      <input
                        type="datetime-local"
                        value={emergencyData.datetime}
                        onChange={e => setEmergencyData({ ...emergencyData, datetime: e.target.value })}
                        className="w-full rounded-lg border px-3 py-2"
                      />
                    </div>

                    <div>
                      <label className="text-sm">발견자</label>
                      <input
                        type="text"
                        value={emergencyData.discoverer}
                        onChange={e => setEmergencyData({ ...emergencyData, discoverer: e.target.value })}
                        className="w-full rounded-lg border px-3 py-2"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm">상황분류</label>
                    <select
                      value={emergencyData.category}
                      onChange={e => setEmergencyData({ ...emergencyData, category: e.target.value })}
                      className="w-full rounded-lg border px-3 py-2"
                    >
                      <option value="낙상">낙상</option>
                      <option value="호흡곤란">호흡곤란</option>
                      <option value="경련">경련</option>
                      <option value="출혈">출혈</option>
                      <option value="기타">기타</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-sm">초기 대응</label>
                    <textarea
                      rows={3}
                      value={emergencyData.initialResponse}
                      onChange={e =>
                        setEmergencyData({
                          ...emergencyData,
                          initialResponse: e.target.value,
                        })
                      }
                      className="w-full rounded-lg border px-3 py-2"
                    />
                  </div>

                  <div>
                    <label className="text-sm">후속 조치</label>
                    <textarea
                      rows={3}
                      value={emergencyData.followUp}
                      onChange={e => setEmergencyData({ ...emergencyData, followUp: e.target.value })}
                      className="w-full rounded-lg border px-3 py-2"
                    />
                  </div>

                  <div className="flex gap-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={emergencyData.contact119}
                        onChange={e =>
                          setEmergencyData({
                            ...emergencyData,
                            contact119: e.target.checked,
                          })
                        }
                      />
                      <span>119 연락</span>
                    </label>

                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={emergencyData.contactFamily}
                        onChange={e =>
                          setEmergencyData({
                            ...emergencyData,
                            contactFamily: e.target.checked,
                          })
                        }
                      />
                      <span>보호자 연락</span>
                    </label>

                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={emergencyData.hospitalTransfer}
                        onChange={e =>
                          setEmergencyData({
                            ...emergencyData,
                            hospitalTransfer: e.target.checked,
                          })
                        }
                      />
                      <span>병원 이송</span>
                    </label>
                  </div>
                </div>
              )}

              {/* 배설 / 비위관 / 도뇨관 관리 */}
              {activeTab === 'elimination' && (
                <div className="space-y-6">
                  {/* 배설 */}
                  <div className="rounded-lg bg-white p-6 shadow">
                    <h4 className="mb-4 text-lg font-semibold">배설 관리</h4>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm">배변 횟수</label>
                        <input
                          type="number"
                          value={eliminationData.bowelCount}
                          onChange={e =>
                            setEliminationData({
                              ...eliminationData,
                              bowelCount: e.target.value,
                            })
                          }
                          className="w-full rounded-lg border px-3 py-2"
                        />
                      </div>

                      <div>
                        <label className="text-sm">배변 성상</label>
                        <select
                          value={eliminationData.bowelNature}
                          onChange={e =>
                            setEliminationData({
                              ...eliminationData,
                              bowelNature: e.target.value,
                            })
                          }
                          className="w-full rounded-lg border px-3 py-2"
                        >
                          <option value="정상">정상</option>
                          <option value="설사">설사</option>
                          <option value="변비">변비</option>
                          <option value="혈변">혈변</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-sm">배뇨 횟수</label>
                        <input
                          type="number"
                          value={elinationData.urineCount}
                          onChange={e =>
                            setEliminationData({
                              ...eliminationData,
                              urineCount: e.target.value,
                            })
                          }
                          className="w-full rounded-lg border px-3 py-2"
                        />
                      </div>

                      <div>
                        <label className="text-sm">배뇨 성상</label>
                        <select
                          value={eliminationData.urineNature}
                          onChange={e =>
                            setEliminationData({
                              ...eliminationData,
                              urineNature: e.target.value,
                            })
                          }
                          className="w-full rounded-lg border px-3 py-2"
                        >
                          <option value="정상">정상</option>
                          <option value="혼탁">혼탁</option>
                          <option value="혈뇨">혈뇨</option>
                          <option value="농뇨">농뇨</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* 비위관 */}
                  <div className="rounded-lg bg-white p-6 shadow">
                    <h4 className="mb-4 text-lg font-semibold">비위관 관리</h4>

                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={eliminationData.ngTube}
                        onChange={e =>
                          setEliminationData({
                            ...eliminationData,
                            ngTube: e.target.checked,
                          })
                        }
                      />
                      <span>비위관 삽입</span>
                    </label>

                    {eliminationData.ngTube && (
                      <div className="mt-4 grid grid-cols-2 gap-4 pl-6">
                        <div>
                          <label className="text-sm">교체일</label>
                          <input
                            type="date"
                            value={eliminationData.ngTubeChange}
                            onChange={e =>
                              setEliminationData({
                                ...eliminationData,
                                ngTubeChange: e.target.value,
                              })
                            }
                            className="w-full rounded-lg border px-3 py-2"
                          />
                        </div>

                        <div>
                          <label className="text-sm">세척 여부</label>
                          <input
                            type="text"
                            placeholder="세척 내용"
                            value={eliminationData.ngTubeCleaning}
                            onChange={e =>
                              setEliminationData({
                                ...eliminationData,
                                ngTubeCleaning: e.target.value,
                              })
                            }
                            className="w-full rounded-lg border px-3 py-2"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* 도뇨관 */}
                  <div className="rounded-lg bg-white p-6 shadow">
                    <h4 className="mb-4 text-lg font-semibold">도뇨관 관리</h4>

                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={eliminationData.catheter}
                        onChange={e =>
                          setEliminationData({
                            ...eliminationData,
                            catheter: e.target.checked,
                          })
                        }
                      />
                      <span>도뇨관 유치</span>
                    </label>

                    {eliminationData.catheter && (
                      <div className="mt-4 pl-6">
                        <label className="text-sm">문제/특이사항</label>
                        <textarea
                          rows={3}
                          value={eliminationData.catheterIssue}
                          onChange={e =>
                            setEliminationData({
                              ...eliminationData,
                              catheterIssue: e.target.value,
                            })
                          }
                          className="w-full rounded-lg border px-3 py-2"
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
