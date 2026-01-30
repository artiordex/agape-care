'use client';

interface Props {
  recipientType: string;
  onSelectType: (type: string) => void;
  recipientCount: number;
}

const recipientTypes = [
  { value: 'resident', label: '수급자', icon: 'ri-user-heart-line' },
  { value: 'guardian', label: '보호자', icon: 'ri-parent-line' },
  { value: 'staff', label: '직원', icon: 'ri-team-line' },
  { value: 'all', label: '전체', icon: 'ri-group-line' },
];

export default function NotificationRecipientStep({ recipientType, onSelectType, recipientCount }: Props) {
  return (
    <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-5">
      <h2 className="text-sm font-bold text-gray-900">수신자를 선택하세요</h2>

      {/* 대상자 유형 */}
      <div>
        <label className="mb-2 block text-xs font-medium text-gray-700">대상자 유형</label>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {recipientTypes.map(item => (
            <button
              key={item.value}
              onClick={() => onSelectType(item.value)}
              className={`rounded-lg border-2 p-4 transition-all ${
                recipientType === item.value
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <i className={`${item.icon} mb-2 block text-xl text-blue-600`}></i>
              <div className="text-sm font-medium text-gray-900">{item.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* 필터 */}
      {recipientType && recipientType !== 'all' && (
        <div className="space-y-3">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-gray-700">생활실</label>
            <select className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
              <option value="">전체</option>
              <option value="101">101호</option>
              <option value="102">102호</option>
              <option value="103">103호</option>
            </select>
          </div>

          {recipientType === 'resident' && (
            <div>
              <label className="mb-1.5 block text-xs font-medium text-gray-700">등급</label>
              <select className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
                <option value="">전체</option>
                <option value="1">1등급</option>
                <option value="2">2등급</option>
                <option value="3">3등급</option>
              </select>
            </div>
          )}

          {recipientType === 'staff' && (
            <div>
              <label className="mb-1.5 block text-xs font-medium text-gray-700">부서</label>
              <select className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
                <option value="">전체</option>
                <option value="nursing">간호팀</option>
                <option value="care">요양팀</option>
                <option value="admin">행정팀</option>
              </select>
            </div>
          )}
        </div>
      )}

      {/* 수신자 수 */}
      <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">예상 수신자</span>
          <span className="text-2xl font-bold text-blue-600">{recipientCount}명</span>
        </div>
      </div>
    </div>
  );
}
