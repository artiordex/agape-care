'use client';

interface Props {
  totalScheduled: number;
  todayScheduled: number;
  thisWeekScheduled: number;
  cancelledCount: number;
}

export default function ScheduledNotificationStats({
  totalScheduled,
  todayScheduled,
  thisWeekScheduled,
  cancelledCount,
}: Props) {
  const stats = [
    {
      label: '전체 예약',
      value: totalScheduled,
      icon: 'ri-calendar-schedule-line',
      color: 'blue',
    },
    {
      label: '오늘 예약',
      value: todayScheduled,
      icon: 'ri-calendar-check-line',
      color: 'green',
    },
    {
      label: '이번주 예약',
      value: thisWeekScheduled,
      icon: 'ri-calendar-2-line',
      color: 'orange',
    },
    {
      label: '취소됨',
      value: cancelledCount,
      icon: 'ri-close-circle-line',
      color: 'red',
    },
  ];

  const getColorClasses = (color: string) => {
    const colorMap: { [key: string]: string } = {
      blue: 'bg-blue-50 text-blue-600',
      green: 'bg-green-50 text-green-600',
      orange: 'bg-orange-50 text-orange-600',
      red: 'bg-red-50 text-red-600',
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
