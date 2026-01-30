'use client';

interface Props {
  totalGroups: number;
  activeGroups: number;
  totalMembers: number;
  recentlyUsed: number;
}

export default function RecipientGroupStats({ totalGroups, activeGroups, totalMembers, recentlyUsed }: Props) {
  const stats = [
    {
      label: '전체 그룹',
      value: totalGroups,
      icon: 'ri-group-line',
      color: 'blue',
    },
    {
      label: '사용중',
      value: activeGroups,
      icon: 'ri-checkbox-circle-line',
      color: 'green',
    },
    {
      label: '총 대상자',
      value: totalMembers,
      icon: 'ri-user-line',
      color: 'purple',
    },
    {
      label: '최근 사용',
      value: recentlyUsed,
      icon: 'ri-time-line',
      color: 'orange',
    },
  ];

  const getColorClasses = (color: string) => {
    const colorMap: { [key: string]: string } = {
      blue: 'bg-blue-50 text-blue-600',
      green: 'bg-green-50 text-green-600',
      purple: 'bg-purple-50 text-purple-600',
      orange: 'bg-orange-50 text-orange-600',
    };
    return colorMap[color] || 'bg-gray-50 text-gray-600';
  };

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
      {stats.map((stat, index) => (
        <div key={index} className="rounded-lg border border-gray-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-600">{stat.label}</p>
              <p className="mt-2 text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
            <div className={`flex h-12 w-12 items-center justify-center rounded ${getColorClasses(stat.color)}`}>
              <i className={`${stat.icon} text-2xl`}></i>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
