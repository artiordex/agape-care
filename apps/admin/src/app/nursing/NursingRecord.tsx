import { useState, useEffect } from 'react';
import { supabase } from '../../../supabaseClient';

interface VitalRecord {
  id?: number;
  beneficiary_id: number;
  record_date: string;
  round_number: number;
  record_time: string;
  bp_systolic?: number;
  bp_diastolic?: number;
  pulse?: number;
  temperature?: number;
  respiration?: number;
  glucose?: number;
  weight?: number;
  notes?: string;
}

interface NursingNote {
  id?: number;
  beneficiary_id: number;
  record_date: string;
  health_minutes: number;
  nursing_minutes: number;
  issues_flags: any;
  notes?: string;
  author_id?: number;
}

interface Medication {
  id?: number;
  beneficiary_id: number;
  drug_name: string;
  dosage?: string;
  schedule_json: any;
  start_date: string;
  end_date?: string;
  notes?: string;
  active: boolean;
}

export default function NursingRecord() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedBeneficiary, setSelectedBeneficiary] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'nursing' | 'medication'>('nursing');
  
  // 바이탈 데이터
  const [vitals, setVitals] = useState<VitalRecord[]>([]);
  const [newVital, setNewVital] = useState<VitalRecord>({
    beneficiary_id: 0,
    record_date: selectedDate,
    round_number: 1,
    record_time: '09:00',
  });

  // 간호일지 데이터
  const [nursingNote, setNursingNote] = useState<NursingNote>({
    beneficiary_id: 0,
    record_date: selectedDate,
    health_minutes: 0,
    nursing_minutes: 0,
    issues_flags: {},
    notes: '',
  });

  // 투약 데이터
  const [medications, setMedications] = useState<Medication[]>([]);
  const [showMedicationModal, setShowMedicationModal] = useState(false);

  // 건강 문제 체크리스트
  const healthIssues = [
    { code: 'fall', label: '낙상' },
    { code: 'dehydration', label: '탈수' },
    { code: 'bedsore', label: '욕창' },
    { code: 'pain', label: '통증' },
    { code: 'incontinence', label: '실금' },
    { code: 'delirium', label: '섬망' },
  ];

  // 임시 수급자 목록
  const beneficiaries = [
    { id: 1, name: '김영희', age: 82, gender: '여', grade: '1등급', room: '본관 101호' },
    { id: 2, name: '박철수', age: 78, gender: '남', grade: '2등급', room: '본관 102호' },
    { id: 3, name: '이순자', age: 85, gender: '여', grade: '3등급', room: '본관 201호' },
  ];

  useEffect(() => {
    if (selectedBeneficiary) {
      loadVitals();
      loadNursingNote();
      loadMedications();
    }
  }, [selectedBeneficiary, selectedDate]);

  const loadVitals = async () => {
    if (!selectedBeneficiary) return;
    
    try {
      const { data } = await supabase
        .from('care_vitals')
        .select('*')
        .eq('beneficiary_id', selectedBeneficiary)
        .eq('record_date', selectedDate)
        .order('round_number');

      if (data) setVitals(data);
    } catch (error) {
      console.error('바이탈 로드 실패:', error);
    }
  };

  const loadNursingNote = async () => {
    if (!selectedBeneficiary) return;

    try {
      const { data } = await supabase
        .from('care_nursing_notes')
        .select('*')
        .eq('beneficiary_id', selectedBeneficiary)
        .eq('record_date', selectedDate)
        .single();

      if (data) {
        setNursingNote(data);
      } else {
        setNursingNote({
          beneficiary_id: selectedBeneficiary,
          record_date: selectedDate,
          health_minutes: 0,
          nursing_minutes: 0,
          issues_flags: {},
          notes: '',
        });
      }
    } catch (error) {
      console.error('간호일지 로드 실패:', error);
    }
  };

  const loadMedications = async () => {
    if (!selectedBeneficiary) return;

    try {
      const { data } = await supabase
        .from('care_medications')
        .select('*')
        .eq('beneficiary_id', selectedBeneficiary)
        .eq('active', true)
        .order('created_at', { ascending: false });

      if (data) setMedications(data);
    } catch (error) {
      console.error('투약 정보 로드 실패:', error);
    }
  };

  const addVitalRecord = async () => {
    if (!selectedBeneficiary) return;

    try {
      const maxRound = vitals.length > 0 ? Math.max(...vitals.map(v => v.round_number)) : 0;
      const vitalToAdd = {
        ...newVital,
        beneficiary_id: selectedBeneficiary,
        record_date: selectedDate,
        round_number: maxRound + 1,
      };

      const { error } = await supabase.from('care_vitals').insert([vitalToAdd]);

      if (error) throw error;

      alert('바이탈 기록이 추가되었습니다.');
      loadVitals();
      setNewVital({
        beneficiary_id: selectedBeneficiary,
        record_date: selectedDate,
        round_number: 1,
        record_time: '09:00',
      });
    } catch (error) {
      console.error('바이탈 추가 실패:', error);
      alert('바이탈 기록 추가에 실패했습니다.');
    }
  };

  const saveNursingNote = async () => {
    if (!selectedBeneficiary) return;

    try {
      const noteToSave = {
        ...nursingNote,
        beneficiary_id: selectedBeneficiary,
        record_date: selectedDate,
      };

      if (nursingNote.id) {
        await supabase.from('care_nursing_notes').update(noteToSave).eq('id', nursingNote.id);
      } else {
        await supabase.from('care_nursing_notes').insert([noteToSave]);
      }

      alert('간호일지가 저장되었습니다.');
      loadNursingNote();
    } catch (error) {
      console.error('간호일지 저장 실패:', error);
      alert('간호일지 저장에 실패했습니다.');
    }
  };

  const selectedBeneficiaryInfo = beneficiaries.find(b => b.id === selectedBeneficiary);

  return (
    <div className="h-full flex bg-gray-50">
      {/* 좌측: 수급자 목록 */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900">수급자 목록</h2>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="mt-3 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {beneficiaries.map((ben) => (
            <button
              key={ben.id}
              type="button"
              onClick={() => setSelectedBeneficiary(ben.id)}
              className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                selectedBeneficiary === ben.id
                  ? 'border-emerald-500 bg-emerald-50'
                  : 'border-gray-200 bg-white hover:border-emerald-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-gray-900">{ben.name}</span>
                <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                  {ben.grade}
                </span>
              </div>
              <div className="text-sm text-gray-600 space-y-1">
                <div>{ben.age}세 / {ben.gender}</div>
                <div className="flex items-center gap-1">
                  <i className="ri-home-4-line text-xs"></i>
                  {ben.room}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 우측: 상세 정보 */}
      <div className="flex-1 flex flex-col">
        {!selectedBeneficiary ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <i className="ri-user-line text-6xl mb-4"></i>
              <p className="text-lg">좌측에서 수급자를 선택해주세요</p>
            </div>
          </div>
        ) : (
          <>
            {/* 헤더 */}
            <div className="bg-white border-b border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">간호/건강관리 기록</h1>
                  <p className="text-sm text-gray-600 mt-1">
                    {selectedBeneficiaryInfo?.name} ({selectedBeneficiaryInfo?.grade})
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap"
                  >
                    <i className="ri-printer-line mr-2"></i>
                    출력
                  </button>
                </div>
              </div>
            </div>

            {/* 탭 메뉴 */}
            <div className="bg-white border-b border-gray-200 px-6">
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() => setActiveTab('nursing')}
                  className={`px-6 py-3 font-medium transition-colors whitespace-nowrap ${
                    activeTab === 'nursing'
                      ? 'text-emerald-600 border-b-2 border-emerald-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  간호일지
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('medication')}
                  className={`px-6 py-3 font-medium transition-colors whitespace-nowrap ${
                    activeTab === 'medication'
                      ? 'text-emerald-600 border-b-2 border-emerald-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  투약관리
                </button>
              </div>
            </div>

            {/* 탭 컨텐츠 */}
            <div className="flex-1 overflow-y-auto p-6">
              {activeTab === 'nursing' ? (
                <div className="space-y-6">
                  {/* 바이탈 기록 */}
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-gray-900">바이탈 기록</h3>
                      <button
                        type="button"
                        onClick={addVitalRecord}
                        className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors whitespace-nowrap"
                      >
                        <i className="ri-add-line mr-2"></i>
                        회차 추가
                      </button>
                    </div>

                    {/* 바이탈 입력 폼 */}
                    <div className="grid grid-cols-4 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">시간</label>
                        <input
                          type="time"
                          value={newVital.record_time}
                          onChange={(e) => setNewVital({ ...newVital, record_time: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">혈압 (mmHg)</label>
                        <div className="flex gap-2">
                          <input
                            type="number"
                            placeholder="수축기"
                            value={newVital.bp_systolic || ''}
                            onChange={(e) => setNewVital({ ...newVital, bp_systolic: parseInt(e.target.value) || undefined })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                          />
                          <span className="flex items-center">/</span>
                          <input
                            type="number"
                            placeholder="이완기"
                            value={newVital.bp_diastolic || ''}
                            onChange={(e) => setNewVital({ ...newVital, bp_diastolic: parseInt(e.target.value) || undefined })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">맥박 (회/분)</label>
                        <input
                          type="number"
                          value={newVital.pulse || ''}
                          onChange={(e) => setNewVital({ ...newVital, pulse: parseInt(e.target.value) || undefined })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">체온 (°C)</label>
                        <input
                          type="number"
                          step="0.1"
                          value={newVital.temperature || ''}
                          onChange={(e) => setNewVital({ ...newVital, temperature: parseFloat(e.target.value) || undefined })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">호흡 (회/분)</label>
                        <input
                          type="number"
                          value={newVital.respiration || ''}
                          onChange={(e) => setNewVital({ ...newVital, respiration: parseInt(e.target.value) || undefined })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">혈당 (mg/dL)</label>
                        <input
                          type="number"
                          value={newVital.glucose || ''}
                          onChange={(e) => setNewVital({ ...newVital, glucose: parseInt(e.target.value) || undefined })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">체중 (kg)</label>
                        <input
                          type="number"
                          step="0.1"
                          value={newVital.weight || ''}
                          onChange={(e) => setNewVital({ ...newVital, weight: parseFloat(e.target.value) || undefined })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                    </div>

                    {/* 바이탈 기록 테이블 */}
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead className="bg-gray-50 border-b border-gray-200">
                          <tr>
                            <th className="px-4 py-3 text-left font-semibold text-gray-700">회차</th>
                            <th className="px-4 py-3 text-left font-semibold text-gray-700">시간</th>
                            <th className="px-4 py-3 text-left font-semibold text-gray-700">혈압</th>
                            <th className="px-4 py-3 text-left font-semibold text-gray-700">맥박</th>
                            <th className="px-4 py-3 text-left font-semibold text-gray-700">체온</th>
                            <th className="px-4 py-3 text-left font-semibold text-gray-700">호흡</th>
                            <th className="px-4 py-3 text-left font-semibold text-gray-700">혈당</th>
                            <th className="px-4 py-3 text-left font-semibold text-gray-700">체중</th>
                          </tr>
                        </thead>
                        <tbody>
                          {vitals.length === 0 ? (
                            <tr>
                              <td colSpan={8} className="px-4 py-8 text-center text-gray-500">
                                바이탈 기록이 없습니다. 회차를 추가해주세요.
                              </td>
                            </tr>
                          ) : (
                            vitals.map((vital) => (
                              <tr key={vital.id} className="border-t border-gray-200 hover:bg-gray-50">
                                <td className="px-4 py-3 font-medium text-gray-900">{vital.round_number}회</td>
                                <td className="px-4 py-3 text-gray-700">{vital.record_time}</td>
                                <td className="px-4 py-3 text-gray-700">
                                  {vital.bp_systolic && vital.bp_diastolic
                                    ? `${vital.bp_systolic}/${vital.bp_diastolic}`
                                    : '-'}
                                </td>
                                <td className="px-4 py-3 text-gray-700">{vital.pulse || '-'}</td>
                                <td className="px-4 py-3 text-gray-700">{vital.temperature || '-'}</td>
                                <td className="px-4 py-3 text-gray-700">{vital.respiration || '-'}</td>
                                <td className="px-4 py-3 text-gray-700">{vital.glucose || '-'}</td>
                                <td className="px-4 py-3 text-gray-700">{vital.weight || '-'}</td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* 건강관리 기록 */}
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">건강관리 기록</h3>
                    
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      {healthIssues.map((issue) => (
                        <label key={issue.code} className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={nursingNote.issues_flags?.[issue.code] || false}
                            onChange={(e) =>
                              setNursingNote({
                                ...nursingNote,
                                issues_flags: {
                                  ...nursingNote.issues_flags,
                                  [issue.code]: e.target.checked,
                                },
                              })
                            }
                            className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                          />
                          <span className="text-sm font-medium text-gray-700">{issue.label}</span>
                        </label>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">급여계획 (분)</label>
                        <input
                          type="number"
                          value={nursingNote.health_minutes}
                          onChange={(e) => setNursingNote({ ...nursingNote, health_minutes: parseInt(e.target.value) || 0 })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">간호관리 (분)</label>
                        <input
                          type="number"
                          value={nursingNote.nursing_minutes}
                          onChange={(e) => setNursingNote({ ...nursingNote, nursing_minutes: parseInt(e.target.value) || 0 })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">특이사항</label>
                      <textarea
                        value={nursingNote.notes || ''}
                        onChange={(e) => setNursingNote({ ...nursingNote, notes: e.target.value })}
                        rows={6}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                        placeholder="특이사항을 입력하세요..."
                      />
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={saveNursingNote}
                        className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors whitespace-nowrap"
                      >
                        <i className="ri-save-line mr-2"></i>
                        저장
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                /* 투약관리 탭 */
                <div className="space-y-6">
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-gray-900">투약 목록</h3>
                      <button
                        type="button"
                        onClick={() => setShowMedicationModal(true)}
                        className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors whitespace-nowrap"
                      >
                        <i className="ri-add-line mr-2"></i>
                        투약 추가
                      </button>
                    </div>

                    {medications.length === 0 ? (
                      <div className="text-center py-12 text-gray-500">
                        <i className="ri-medicine-bottle-line text-5xl mb-3"></i>
                        <p>등록된 투약 정보가 없습니다.</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {medications.map((med) => (
                          <div key={med.id} className="p-4 border border-gray-200 rounded-lg hover:border-emerald-300 transition-colors">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <h4 className="font-semibold text-gray-900 text-lg">{med.drug_name}</h4>
                                <p className="text-sm text-gray-600 mt-1">{med.dosage}</p>
                              </div>
                              <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                                복용중
                              </span>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="text-gray-600">시작일:</span>
                                <span className="ml-2 font-medium text-gray-900">{med.start_date}</span>
                              </div>
                              {med.end_date && (
                                <div>
                                  <span className="text-gray-600">종료일:</span>
                                  <span className="ml-2 font-medium text-gray-900">{med.end_date}</span>
                                </div>
                              )}
                            </div>
                            {med.notes && (
                              <p className="mt-3 text-sm text-gray-600 p-3 bg-gray-50 rounded">
                                {med.notes}
                              </p>
                            )}
                          </div>
                        ))}
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
