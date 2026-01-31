'use client';

interface Props {
  data: {
    basicActions: { [key: string]: string };
    physicalFunctions: { [key: string]: string };
    dailyActivities: { [key: string]: string };
    judgmentBasis: string;
  };
  onChange: (field: string, value: any) => void;
}

export default function PhysicalStatusSection({ data, onChange }: Props) {
  const basicActionsList = [
    { id: 'sitting', label: '일어나 앉기' },
    { id: 'standing', label: '일어서기' },
    { id: 'moving', label: '이동(옮겨 앉기)' },
    { id: 'walking', label: '실내 보행(보정구 사용)' },
    { id: 'wheelchairControl', label: '휠체어 이동' },
  ];

  const physicalFunctionsList = [
    { id: 'hygiene', label: '체위변경 하기' },
    { id: 'bathing', label: '세수하기' },
    { id: 'positionChange', label: '양치질(틀니 관리)' },
    { id: 'urination', label: '화장실(이동벽기) 사용' },
    { id: 'defecation', label: '기저귀 갈기' },
  ];

  const dailyActivitiesList = [
    { id: 'eating', label: '식사하기' },
    { id: 'clothingChange', label: '옷 벗고 입기' },
    { id: 'bathing', label: '목욕하기' },
    { id: 'washing', label: '몸단장하기' },
  ];

  const handleActionChange = (
    category: 'basicActions' | 'physicalFunctions' | 'dailyActivities',
    id: string,
    value: string,
  ) => {
    onChange(category, { ...data[category], [id]: value });
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5">
      <h3 className="mb-4 text-sm font-bold text-gray-900">3. 신체 상태 (일상생활 동작 수행능력)</h3>

      <div className="space-y-4">
        {/* 기본동작 항목 */}
        <div>
          <label className="mb-2 block text-xs font-medium text-gray-700">기본동작 항목</label>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-gray-200 bg-gray-50">
                <tr>
                  <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700">항목</th>
                  <th className="px-3 py-2 text-center text-xs font-semibold text-gray-700">좋</th>
                  <th className="px-3 py-2 text-center text-xs font-semibold text-gray-700">상</th>
                  <th className="px-3 py-2 text-center text-xs font-semibold text-gray-700">중</th>
                  <th className="px-3 py-2 text-center text-xs font-semibold text-gray-700">하</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {basicActionsList.map(action => (
                  <tr key={action.id}>
                    <td className="px-3 py-2 text-gray-900">{action.label}</td>
                    {['good', 'fair', 'medium', 'poor'].map(level => (
                      <td key={level} className="px-3 py-2 text-center">
                        <input
                          type="radio"
                          name={`basic-${action.id}`}
                          value={level}
                          checked={data.basicActions[action.id] === level}
                          onChange={() => handleActionChange('basicActions', action.id, level)}
                          className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 신체기능 항목 */}
        <div>
          <label className="mb-2 block text-xs font-medium text-gray-700">신체기능 항목</label>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-gray-200 bg-gray-50">
                <tr>
                  <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700">항목</th>
                  <th className="px-3 py-2 text-center text-xs font-semibold text-gray-700">좋</th>
                  <th className="px-3 py-2 text-center text-xs font-semibold text-gray-700">상</th>
                  <th className="px-3 py-2 text-center text-xs font-semibold text-gray-700">중</th>
                  <th className="px-3 py-2 text-center text-xs font-semibold text-gray-700">하</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {physicalFunctionsList.map(func => (
                  <tr key={func.id}>
                    <td className="px-3 py-2 text-gray-900">{func.label}</td>
                    {['good', 'fair', 'medium', 'poor'].map(level => (
                      <td key={level} className="px-3 py-2 text-center">
                        <input
                          type="radio"
                          name={`function-${func.id}`}
                          value={level}
                          checked={data.physicalFunctions[func.id] === level}
                          onChange={() => handleActionChange('physicalFunctions', func.id, level)}
                          className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 일상생활 동작 항목 */}
        <div>
          <label className="mb-2 block text-xs font-medium text-gray-700">일상생활 동작 항목</label>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-gray-200 bg-gray-50">
                <tr>
                  <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700">항목</th>
                  <th className="px-3 py-2 text-center text-xs font-semibold text-gray-700">최하</th>
                  <th className="px-3 py-2 text-center text-xs font-semibold text-gray-700">하</th>
                  <th className="px-3 py-2 text-center text-xs font-semibold text-gray-700">상</th>
                  <th className="px-3 py-2 text-center text-xs font-semibold text-gray-700">최상</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {dailyActivitiesList.map(activity => (
                  <tr key={activity.id}>
                    <td className="px-3 py-2 text-gray-900">{activity.label}</td>
                    {['lowest', 'low', 'high', 'highest'].map(level => (
                      <td key={level} className="px-3 py-2 text-center">
                        <input
                          type="radio"
                          name={`daily-${activity.id}`}
                          value={level}
                          checked={data.dailyActivities[activity.id] === level}
                          onChange={() => handleActionChange('dailyActivities', activity.id, level)}
                          className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 판단근거 */}
        <div>
          <label className="mb-2 block text-xs font-medium text-gray-700">
            판단근거 <span className="text-red-600">*</span>
          </label>
          <textarea
            value={data.judgmentBasis}
            onChange={e => onChange('judgmentBasis', e.target.value)}
            rows={4}
            placeholder="예:&#10;- 뇌출혈 후유증(우측 편마비) 질환자로 전반적인 일상생활 수행능력이 저하됨&#10;- 뇌관질환 시 보행지체 있음, 현재 시설장소문제로 현 독립적인 이동중&#10;- 저편에 걸음 시 부편운 부추나 생필기능은 자립&#10;- 차근게장샤건설쟝운에 현지좌 새고 슬수로 화장실에서 대변을 처리하나, 요실금 중세가&#10;주 3~4회 빈도로 있음"
            className="w-full resize-none rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          ></textarea>
        </div>
      </div>
    </div>
  );
}
