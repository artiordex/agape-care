'use client';

interface Props {
  data: {
    chronicDiseases: string[];
    circulatorySystem: string[];
    nervousSystem: string[];
    musculoskeletalSystem: string[];
    mentalHealth: string[];
    respiratorySystem: string[];
    cancerHistory: string[];
    allergyHistory: string[];
    pastHistory: string;
    currentDiagnosis: string;
    judgmentBasis: string;
  };
  onChange: (field: string, value: any) => void;
}

export default function DiseaseStatusSection({ data, onChange }: Props) {
  const handleCheckboxChange = (field: string, value: string, checked: boolean) => {
    const currentValues = data[field as keyof typeof data] as string[];
    const newValue = checked ? [...currentValues, value] : currentValues.filter(v => v !== value);
    onChange(field, newValue);
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5">
      <h3 className="mb-4 text-sm font-bold text-gray-900">2. 주요 질병 상태</h3>

      <div className="space-y-4">
        {/* 만성질환 */}
        <div>
          <label className="mb-2 block text-xs font-medium text-gray-700">만성질환</label>
          <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
            {[
              { value: 'diabetes', label: '당뇨' },
              { value: 'hypertension', label: '고혈압' },
              { value: 'chronic_respiratory', label: '만성 호흡기질환' },
              { value: 'cancer', label: '암' },
            ].map(option => (
              <label key={option.value} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={data.chronicDiseases.includes(option.value)}
                  onChange={e => handleCheckboxChange('chronicDiseases', option.value, e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* 순환기계 */}
        <div>
          <label className="mb-2 block text-xs font-medium text-gray-700">순환기계</label>
          <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
            {[
              { value: 'brain_disease', label: '뇌경색' },
              { value: 'brain_hemorrhage', label: '뇌출혈' },
              { value: 'cerebral_infarction', label: '혈심증' },
              { value: 'coronary_disease', label: '심근경색증' },
            ].map(option => (
              <label key={option.value} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={data.circulatorySystem.includes(option.value)}
                  onChange={e => handleCheckboxChange('circulatorySystem', option.value, e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* 신경계 */}
        <div>
          <label className="mb-2 block text-xs font-medium text-gray-700">신경계</label>
          <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
            {[
              { value: 'dementia', label: '치매' },
              { value: 'parkinsons', label: '파킨슨병' },
              { value: 'arthritis', label: '간질' },
            ].map(option => (
              <label key={option.value} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={data.nervousSystem.includes(option.value)}
                  onChange={e => handleCheckboxChange('nervousSystem', option.value, e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* 근골격계 */}
        <div>
          <label className="mb-2 block text-xs font-medium text-gray-700">근골격계</label>
          <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
            {[
              { value: 'arthritis', label: '관절염' },
              { value: 'fracture', label: '요통, 좌골통' },
              { value: 'osteoporosis', label: '골절 등 후유증' },
            ].map(option => (
              <label key={option.value} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={data.musculoskeletalSystem.includes(option.value)}
                  onChange={e => handleCheckboxChange('musculoskeletalSystem', option.value, e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* 정신·행동장애 */}
        <div>
          <label className="mb-2 block text-xs font-medium text-gray-700">정신·행동장애</label>
          <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
            {[
              { value: 'depression', label: '우울증' },
              { value: 'delirium', label: '수면장애' },
              { value: 'anxiety', label: '정신질환' },
            ].map(option => (
              <label key={option.value} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={data.mentalHealth.includes(option.value)}
                  onChange={e => handleCheckboxChange('mentalHealth', option.value, e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* 호흡기계 */}
        <div>
          <label className="mb-2 block text-xs font-medium text-gray-700">호흡기계</label>
          <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
            {[
              { value: 'asthma', label: '호흡곤란' },
              { value: 'copd', label: '결핵' },
            ].map(option => (
              <label key={option.value} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={data.respiratorySystem.includes(option.value)}
                  onChange={e => handleCheckboxChange('respiratorySystem', option.value, e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* 과거병력 */}
        <div>
          <label className="mb-2 block text-xs font-medium text-gray-700">
            과거병력 <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            value={data.pastHistory}
            onChange={e => onChange('pastHistory', e.target.value)}
            placeholder="예: 뇌출혈"
            className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* 현 진단명 */}
        <div>
          <label className="mb-2 block text-xs font-medium text-gray-700">
            현 진단명 <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            value={data.currentDiagnosis}
            onChange={e => onChange('currentDiagnosis', e.target.value)}
            placeholder="예: 뇌출혈, 복합장애(언어,운동), 치매, 당뇨, 고혈압, 변비"
            className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* 판단근거 */}
        <div>
          <label className="mb-2 block text-xs font-medium text-gray-700">
            종합의견 (판단근거) <span className="text-red-600">*</span>
          </label>
          <textarea
            value={data.judgmentBasis}
            onChange={e => onChange('judgmentBasis', e.target.value)}
            rows={6}
            placeholder="예:&#10;- 뇌출혈 : 7년전 발병으로, 이후 우측 편마비 및 언어장애 남음&#10;- 치매 : 6년전 혈관성 치매로 진단받았으며, 지료제 복용시 음식섭취와 삼림없이 복용할 수 있음"
            className="w-full resize-none rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          ></textarea>
        </div>
      </div>
    </div>
  );
}
