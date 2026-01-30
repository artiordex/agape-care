'use client';

interface Props {
  totalTemplates: number;
  activeTemplates: number;
  smsTemplates: number;
  kakaoTemplates: number;
}

export default function TemplateStats({ totalTemplates, activeTemplates, smsTemplates, kakaoTemplates }: Props) {
  const stats = [
    {
      label: '전체 템플릿',
      value: totalTemplates,
      icon: 'ri-file-list-3-line',
      color: 'blue',
    },
    {
      label: '사용중',
      value: activeTemplates,
      icon: 'ri-checkbox-circle-line',
      color: 'green',
    },
    {
      label: 'SMS 템플릿',
      value: smsTemplates,
      icon: 'ri-message-2-line',
      color: 'purple',
    },
    {
      label: '카카오톡',
      value: kakaoTemplates,
      icon: 'ri-kakao-talk-line',
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
