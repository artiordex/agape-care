import { useEffect, useState } from 'react';
import { supabase } from '../../../../../src/supabaseClient';

interface MealRecord {
  id?: number;
  beneficiary_id: number;
  beneficiary_name?: string;
  record_date: string;
  breakfast_type?: string;
  breakfast_amount?: string;
  breakfast_time?: string;
  lunch_type?: string;
  lunch_amount?: string;
  lunch_time?: string;
  dinner_type?: string;
  dinner_amount?: string;
  dinner_time?: string;
  morning_snack: boolean;
  morning_snack_type?: string;
  morning_snack_time?: string;
  afternoon_snack: boolean;
  afternoon_snack_type?: string;
  afternoon_snack_time?: string;
  therapeutic_diet?: string;
  therapeutic_diet_note?: string;
  completed: boolean;
}

interface CodeOption {
  code: string;
  label: string;
}

export default function MealAssistRecord() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [records, setRecords] = useState<MealRecord[]>([]);
  const [mealTypes, setMealTypes] = useState<CodeOption[]>([]);
  const [mealAmounts, setMealAmounts] = useState<CodeOption[]>([]);
  const [snackTypes, setSnackTypes] = useState<CodeOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadCodes();
    loadRecords();
  }, [selectedDate]);

  const loadCodes = async () => {
    try {
      const { data: types } = await supabase
        .from('care_codes')
        .select('code, label')
        .eq('category', 'meal_type')
        .eq('active', true)
        .order('display_order');

      const { data: amounts } = await supabase
        .from('care_codes')
        .select('code, label')
        .eq('category', 'meal_amount')
        .eq('active', true)
        .order('display_order');

      const { data: snacks } = await supabase
        .from('care_codes')
        .select('code, label')
        .eq('category', 'snack_type')
        .eq('active', true)
        .order('display_order');

      if (types) setMealTypes(types);
      if (amounts) setMealAmounts(amounts);
      if (snacks) setSnackTypes(snacks);
    } catch (error) {
      console.error('코드 로드 실패:', error);
    }
  };

  const loadRecords = async () => {
    setLoading(true);
    try {
      // 실제로는 수급자 테이블과 조인해야 하지만, 여기서는 간단히 처리
      const { data: existingRecords } = await supabase
        .from('care_meal_records')
        .select('*')
        .eq('record_date', selectedDate);

      // 임시: 모든 입소 중인 수급자 목록 가져오기 (실제로는 residents 테이블 사용)
      const mockBeneficiaries = [
        { id: 1, name: '김영희' },
        { id: 2, name: '박철수' },
        { id: 3, name: '이순자' },
        { id: 4, name: '최동식' },
        { id: 5, name: '정미숙' },
      ];

      const recordsWithNames = mockBeneficiaries.map((ben) => {
        const existing = existingRecords?.find((r) => r.beneficiary_id === ben.id);
        return existing
          ? { ...existing, beneficiary_name: ben.name }
          : {
              beneficiary_id: ben.id,
              beneficiary_name: ben.name,
              record_date: selectedDate,
              breakfast_time: '08:00',
              lunch_time: '12:00',
              dinner_time: '17:30',
              morning_snack: false,
              morning_snack_time: '10:00',
              afternoon_snack: false,
              afternoon_snack_time: '15:00',
              completed: false,
            };
      });

      setRecords(recordsWithNames);
    } catch (error) {
      console.error('기록 로드 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateRecord = (index: number, field: string, value: any) => {
    const updated = [...records];
    updated[index] = { ...updated[index], [field]: value };
    setRecords(updated);
  };

  const saveRecord = async (record: MealRecord) => {
    setSaving(true);
    try {
      const { id, beneficiary_name, ...dataToSave } = record;

      if (id) {
        await supabase.from('care_meal_records').update(dataToSave).eq('id', id);
      } else {
        await supabase.from('care_meal_records').insert([dataToSave]);
      }

      alert('저장되었습니다.');
      loadRecords();
    } catch (error) {
      console.error('저장 실패:', error);
      alert('저장에 실패했습니다.');
    } finally {
      setSaving(false);
    }
  };

  const saveAllRecords = async () => {
    setSaving(true);
    try {
      for (const record of records) {
        const { id, beneficiary_name, ...dataToSave } = record;

        if (id) {
          await supabase.from('care_meal_records').update(dataToSave).eq('id', id);
        } else {
          await supabase.from('care_meal_records').insert([dataToSave]);
        }
      }

      alert('전체 저장되었습니다.');
      loadRecords();
    } catch (error) {
      console.error('전체 저장 실패:', error);
      alert('저장에 실패했습니다.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* 헤더 */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">통합 식사도움 기록</h1>
            <p className="text-sm text-gray-600 mt-1">수급자별 식사 및 간식 섭취 기록을 관리합니다</p>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
            <button
              type="button"
              onClick={saveAllRecords}
              disabled={saving}
              className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 whitespace-nowrap"
            >
              <i className="ri-save-line mr-2"></i>
              전체 저장
            </button>
          </div>
        </div>
      </div>

      {/* 테이블 */}
      <div className="flex-1 overflow-auto p-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700 whitespace-nowrap sticky left-0 bg-gray-50 z-10">
                    수급자명
                  </th>
                  <th className="px-4 py-3 text-center font-semibold text-gray-700 border-l border-gray-200" colSpan={3}>
                    아침
                  </th>
                  <th className="px-4 py-3 text-center font-semibold text-gray-700 border-l border-gray-200" colSpan={3}>
                    점심
                  </th>
                  <th className="px-4 py-3 text-center font-semibold text-gray-700 border-l border-gray-200" colSpan={3}>
                    저녁
                  </th>
                  <th className="px-4 py-3 text-center font-semibold text-gray-700 border-l border-gray-200" colSpan={2}>
                    오전간식
                  </th>
                  <th className="px-4 py-3 text-center font-semibold text-gray-700 border-l border-gray-200" colSpan={2}>
                    오후간식
                  </th>
                  <th className="px-4 py-3 text-center font-semibold text-gray-700 border-l border-gray-200">
                    치료식이
                  </th>
                  <th className="px-4 py-3 text-center font-semibold text-gray-700 border-l border-gray-200">
                    완료
                  </th>
                  <th className="px-4 py-3 text-center font-semibold text-gray-700 border-l border-gray-200">
                    저장
                  </th>
                </tr>
                <tr className="bg-gray-50 border-t border-gray-200">
                  <th className="px-4 py-2 sticky left-0 bg-gray-50 z-10"></th>
                  <th className="px-2 py-2 text-xs text-gray-600 border-l border-gray-200">종류</th>
                  <th className="px-2 py-2 text-xs text-gray-600">양</th>
                  <th className="px-2 py-2 text-xs text-gray-600">시간</th>
                  <th className="px-2 py-2 text-xs text-gray-600 border-l border-gray-200">종류</th>
                  <th className="px-2 py-2 text-xs text-gray-600">양</th>
                  <th className="px-2 py-2 text-xs text-gray-600">시간</th>
                  <th className="px-2 py-2 text-xs text-gray-600 border-l border-gray-200">종류</th>
                  <th className="px-2 py-2 text-xs text-gray-600">양</th>
                  <th className="px-2 py-2 text-xs text-gray-600">시간</th>
                  <th className="px-2 py-2 text-xs text-gray-600 border-l border-gray-200">제공</th>
                  <th className="px-2 py-2 text-xs text-gray-600">종류</th>
                  <th className="px-2 py-2 text-xs text-gray-600 border-l border-gray-200">제공</th>
                  <th className="px-2 py-2 text-xs text-gray-600">종류</th>
                  <th className="px-2 py-2 text-xs text-gray-600 border-l border-gray-200"></th>
                  <th className="px-2 py-2 text-xs text-gray-600 border-l border-gray-200"></th>
                  <th className="px-2 py-2 text-xs text-gray-600 border-l border-gray-200"></th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={17} className="px-4 py-8 text-center text-gray-500">
                      <i className="ri-loader-4-line animate-spin text-2xl"></i>
                      <p className="mt-2">로딩 중...</p>
                    </td>
                  </tr>
                ) : records.length === 0 ? (
                  <tr>
                    <td colSpan={17} className="px-4 py-8 text-center text-gray-500">
                      해당 날짜의 기록이 없습니다.
                    </td>
                  </tr>
                ) : (
                  records.map((record, index) => (
                    <tr
                      key={record.beneficiary_id}
                      className={`border-t border-gray-200 hover:bg-gray-50 ${
                        record.completed ? 'bg-emerald-50/30' : ''
                      }`}
                    >
                      <td className="px-4 py-3 font-medium text-gray-900 sticky left-0 bg-white whitespace-nowrap">
                        {record.beneficiary_name}
                      </td>

                      {/* 아침 */}
                      <td className="px-2 py-3 border-l border-gray-200">
                        <select
                          value={record.breakfast_type || ''}
                          onChange={(e) => updateRecord(index, 'breakfast_type', e.target.value)}
                          disabled={record.completed}
                          className="w-24 px-2 py-1 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-emerald-500 disabled:bg-gray-100"
                        >
                          <option value="">선택</option>
                          {mealTypes.map((type) => (
                            <option key={type.code} value={type.code}>
                              {type.label}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-2 py-3">
                        <select
                          value={record.breakfast_amount || ''}
                          onChange={(e) => updateRecord(index, 'breakfast_amount', e.target.value)}
                          disabled={record.completed}
                          className="w-24 px-2 py-1 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-emerald-500 disabled:bg-gray-100"
                        >
                          <option value="">선택</option>
                          {mealAmounts.map((amount) => (
                            <option key={amount.code} value={amount.code}>
                              {amount.label}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-2 py-3">
                        <input
                          type="time"
                          value={record.breakfast_time || ''}
                          onChange={(e) => updateRecord(index, 'breakfast_time', e.target.value)}
                          disabled={record.completed}
                          className="w-24 px-2 py-1 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-emerald-500 disabled:bg-gray-100"
                        />
                      </td>

                      {/* 점심 */}
                      <td className="px-2 py-3 border-l border-gray-200">
                        <select
                          value={record.lunch_type || ''}
                          onChange={(e) => updateRecord(index, 'lunch_type', e.target.value)}
                          disabled={record.completed}
                          className="w-24 px-2 py-1 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-emerald-500 disabled:bg-gray-100"
                        >
                          <option value="">선택</option>
                          {mealTypes.map((type) => (
                            <option key={type.code} value={type.code}>
                              {type.label}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-2 py-3">
                        <select
                          value={record.lunch_amount || ''}
                          onChange={(e) => updateRecord(index, 'lunch_amount', e.target.value)}
                          disabled={record.completed}
                          className="w-24 px-2 py-1 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-emerald-500 disabled:bg-gray-100"
                        >
                          <option value="">선택</option>
                          {mealAmounts.map((amount) => (
                            <option key={amount.code} value={amount.code}>
                              {amount.label}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-2 py-3">
                        <input
                          type="time"
                          value={record.lunch_time || ''}
                          onChange={(e) => updateRecord(index, 'lunch_time', e.target.value)}
                          disabled={record.completed}
                          className="w-24 px-2 py-1 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-emerald-500 disabled:bg-gray-100"
                        />
                      </td>

                      {/* 저녁 */}
                      <td className="px-2 py-3 border-l border-gray-200">
                        <select
                          value={record.dinner_type || ''}
                          onChange={(e) => updateRecord(index, 'dinner_type', e.target.value)}
                          disabled={record.completed}
                          className="w-24 px-2 py-1 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-emerald-500 disabled:bg-gray-100"
                        >
                          <option value="">선택</option>
                          {mealTypes.map((type) => (
                            <option key={type.code} value={type.code}>
                              {type.label}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-2 py-3">
                        <select
                          value={record.dinner_amount || ''}
                          onChange={(e) => updateRecord(index, 'dinner_amount', e.target.value)}
                          disabled={record.completed}
                          className="w-24 px-2 py-1 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-emerald-500 disabled:bg-gray-100"
                        >
                          <option value="">선택</option>
                          {mealAmounts.map((amount) => (
                            <option key={amount.code} value={amount.code}>
                              {amount.label}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-2 py-3">
                        <input
                          type="time"
                          value={record.dinner_time || ''}
                          onChange={(e) => updateRecord(index, 'dinner_time', e.target.value)}
                          disabled={record.completed}
                          className="w-24 px-2 py-1 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-emerald-500 disabled:bg-gray-100"
                        />
                      </td>

                      {/* 오전간식 */}
                      <td className="px-2 py-3 border-l border-gray-200">
                        <input
                          type="checkbox"
                          checked={record.morning_snack}
                          onChange={(e) => updateRecord(index, 'morning_snack', e.target.checked)}
                          disabled={record.completed}
                          className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500 disabled:opacity-50"
                        />
                      </td>
                      <td className="px-2 py-3">
                        <select
                          value={record.morning_snack_type || ''}
                          onChange={(e) => updateRecord(index, 'morning_snack_type', e.target.value)}
                          disabled={record.completed || !record.morning_snack}
                          className="w-20 px-2 py-1 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-emerald-500 disabled:bg-gray-100"
                        >
                          <option value="">선택</option>
                          {snackTypes.map((type) => (
                            <option key={type.code} value={type.code}>
                              {type.label}
                            </option>
                          ))}
                        </select>
                      </td>

                      {/* 오후간식 */}
                      <td className="px-2 py-3 border-l border-gray-200">
                        <input
                          type="checkbox"
                          checked={record.afternoon_snack}
                          onChange={(e) => updateRecord(index, 'afternoon_snack', e.target.checked)}
                          disabled={record.completed}
                          className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500 disabled:opacity-50"
                        />
                      </td>
                      <td className="px-2 py-3">
                        <select
                          value={record.afternoon_snack_type || ''}
                          onChange={(e) => updateRecord(index, 'afternoon_snack_type', e.target.value)}
                          disabled={record.completed || !record.afternoon_snack}
                          className="w-20 px-2 py-1 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-emerald-500 disabled:bg-gray-100"
                        >
                          <option value="">선택</option>
                          {snackTypes.map((type) => (
                            <option key={type.code} value={type.code}>
                              {type.label}
                            </option>
                          ))}
                        </select>
                      </td>

                      {/* 치료식이 */}
                      <td className="px-2 py-3 border-l border-gray-200">
                        <input
                          type="text"
                          value={record.therapeutic_diet || ''}
                          onChange={(e) => updateRecord(index, 'therapeutic_diet', e.target.value)}
                          disabled={record.completed}
                          placeholder="치료식"
                          className="w-32 px-2 py-1 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-emerald-500 disabled:bg-gray-100"
                        />
                      </td>

                      {/* 완료 */}
                      <td className="px-2 py-3 text-center border-l border-gray-200">
                        <input
                          type="checkbox"
                          checked={record.completed}
                          onChange={(e) => updateRecord(index, 'completed', e.target.checked)}
                          className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                        />
                      </td>

                      {/* 저장 */}
                      <td className="px-2 py-3 text-center border-l border-gray-200">
                        <button
                          type="button"
                          onClick={() => saveRecord(record)}
                          disabled={saving}
                          className="px-3 py-1 text-xs bg-emerald-600 text-white rounded hover:bg-emerald-700 transition-colors disabled:opacity-50 whitespace-nowrap"
                        >
                          저장
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* 안내 */}
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start gap-3">
            <i className="ri-information-line text-blue-600 text-xl mt-0.5"></i>
            <div className="text-sm text-blue-900">
              <p className="font-semibold mb-1">사용 안내</p>
              <ul className="list-disc list-inside space-y-1 text-blue-800">
                <li>각 수급자별로 식사 종류, 양, 시간을 선택하여 입력합니다.</li>
                <li>간식 제공 시 체크박스를 선택하고 종류를 입력합니다.</li>
                <li>기록 완료 체크 시 해당 행이 잠금 처리됩니다.</li>
                <li>개별 저장 또는 전체 저장 버튼을 사용하여 저장합니다.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
