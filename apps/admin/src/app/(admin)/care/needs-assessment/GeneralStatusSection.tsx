'use client';

interface Props {
  data: {
    nutritionStatus: string;
    mealType: string[];
    mealForm: string;
    treatmentFood: string[];
    oralStatus: string[];
    urineStatus: string;
    stoolStatus: string;
    judgmentBasis: string;
  };
  onChange: (field: string, value: any) => void;
}

export default function GeneralStatusSection({ data, onChange }: Props) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5">
      <h3 className="mb-4 text-sm font-bold text-gray-900">1. 일반 상태 (영양상태)</h3>

      <div className="space-y-4">
        {/* 영양 상태 */}
        <div>
          <label className="mb-2 block text-xs font-medium text-gray-700">영양 상태</label>
          <div className="space-y-2">
            {[
              { value: 'good', label: '양호: 건강 및 섭식, 영양 등에 문제가 없는 상태' },
              { value: 'normal', label: '불량: 건강, 섭식, 영양 등에 문제가 있어 세심한 관찰이 요구' },
              {
                value: 'poor',
                label: '심한 불량: 극도의 건강, 섭식, 영양 등이 문제가 있어 지료적 처치가 필요한 상태',
              },
            ].map(option => (
              <label key={option.value} className="flex items-start gap-2">
                <input
                  type="radio"
                  name="nutritionStatus"
                  value={option.value}
                  checked={data.nutritionStatus === option.value}
                  onChange={e => onChange('nutritionStatus', e.target.value)}
                  className="mt-0.5 h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* 식사 형태 */}
        <div>
          <label className="mb-2 block text-xs font-medium text-gray-700">식사 형태</label>
          <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
            {[
              { value: 'regular', label: '일반식' },
              { value: 'soft', label: '연하식' },
              { value: 'liquid', label: '유동식' },
              { value: 'tube', label: '튜브식' },
              { value: 'mixed', label: '믹스' },
              { value: 'easy_chew', label: '갈은식' },
              { value: 'other', label: '기타' },
            ].map(option => (
              <label key={option.value} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value={option.value}
                  checked={data.mealType.includes(option.value)}
                  onChange={e => {
                    const newValue = e.target.checked
                      ? [...data.mealType, option.value]
                      : data.mealType.filter(v => v !== option.value);
                    onChange('mealType', newValue);
                  }}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* 치료식 */}
        <div>
          <label className="mb-2 block text-xs font-medium text-gray-700">치료식</label>
          <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
            {[
              { value: 'low_salt', label: '당뇨식' },
              { value: 'diabetic', label: '저염식' },
              { value: 'low_protein', label: '저열식' },
              { value: 'pureed', label: '고열식' },
              { value: 'ground', label: '고단백식' },
              { value: 'therapeutic', label: '저단백식' },
              { value: 'other', label: '재생조절식' },
            ].map(option => (
              <label key={option.value} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value={option.value}
                  checked={data.treatmentFood.includes(option.value)}
                  onChange={e => {
                    const newValue = e.target.checked
                      ? [...data.treatmentFood, option.value]
                      : data.treatmentFood.filter(v => v !== option.value);
                    onChange('treatmentFood', newValue);
                  }}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* 소변 상태 */}
        <div>
          <label className="mb-2 block text-xs font-medium text-gray-700">소변 상태</label>
          <div className="flex flex-wrap gap-4">
            {[
              { value: 'normal', label: '양호' },
              { value: 'urine_bag', label: '요실금' },
              { value: 'catheter', label: '배뇨관' },
              { value: 'frequent', label: '소화불량' },
              { value: 'incontinence', label: '오심·구토' },
              { value: 'other', label: '기타' },
            ].map(option => (
              <label key={option.value} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="urineStatus"
                  value={option.value}
                  checked={data.urineStatus === option.value}
                  onChange={e => onChange('urineStatus', e.target.value)}
                  className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* 대변 상태 */}
        <div>
          <label className="mb-2 block text-xs font-medium text-gray-700">대변 상태</label>
          <div className="flex flex-wrap gap-4">
            {[
              { value: 'normal', label: '양호' },
              { value: 'constipation', label: '지속적인 설사' },
              { value: 'diarrhea', label: '변비' },
              { value: 'ostomy', label: '기저귀' },
              { value: 'other', label: '장루' },
            ].map(option => (
              <label key={option.value} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="stoolStatus"
                  value={option.value}
                  checked={data.stoolStatus === option.value}
                  onChange={e => onChange('stoolStatus', e.target.value)}
                  className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* 판단근거 */}
        <div>
          <label className="mb-2 block text-xs font-medium text-gray-700">
            판단근거 (영양 상태) <span className="text-red-600">*</span>
          </label>
          <textarea
            value={data.judgmentBasis}
            onChange={e => onChange('judgmentBasis', e.target.value)}
            rows={4}
            placeholder="예: 치아상태나 연하/저작곤돈에 저하가 없음&#10;- 당뇨 혈압자로 당뇨호 쌀밥 등 당뇨식으로 식사&#10;- 주출 편마비로, 좌측 상지를 움직여 슥가락질로 식사 가능"
            className="w-full resize-none rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          ></textarea>
        </div>
      </div>
    </div>
  );
}
