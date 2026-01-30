const TABS = [
  { id: 'basic', label: '기본정보' },
  { id: 'care-plan', label: '이용계획서' },
  { id: 'assessment', label: '기초평가' },
  { id: 'consultation', label: '상담일지' },
  { id: 'extra-cost', label: '비급여/기타' },
  { id: 'copayment', label: '본인부담금' },
  { id: 'guardians', label: '보호자' },
  { id: 'admission-history', label: '입퇴소이력' },
  { id: 'documents', label: '서류' },
  { id: 'medication', label: '투약' },
  { id: 'care-summary', label: '케어기록' },
];

export default function ResidentTabs({
  activeTab,
  onTabChange,
}: {
  activeTab: string;
  onTabChange: (id: string) => void;
}) {
  return (
    <div className="border-b border-gray-200 bg-white">
      <div className="flex overflow-x-auto px-6">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`shrink-0 border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:border-gray-300 hover:text-gray-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
