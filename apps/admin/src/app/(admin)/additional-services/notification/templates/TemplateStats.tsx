/**
 * Description : TemplateStats.tsx - 템플릿 현황 통계 위젯
 * Author : Shiwoo Min
 * Date : 2026-02-18
 */

'use client';

interface Props {
  readonly totalTemplates: number;
  readonly activeTemplates: number;
  readonly smsTemplates: number;
  readonly kakaoTemplates: number;
}

export default function TemplateStats({ totalTemplates, activeTemplates, smsTemplates, kakaoTemplates }: Props) {
  const stats = [
    { label: '전체 템플릿', value: totalTemplates, icon: 'ri-file-list-3-line', border: 'border-gray-200' },
    {
      label: '활성 템플릿',
      value: activeTemplates,
      icon: 'ri-checkbox-circle-line',
      border: 'border-[#5C8D5A]/30',
      color: 'text-[#5C8D5A]',
    },
    {
      label: '문자(SMS/LMS)',
      value: smsTemplates,
      icon: 'ri-message-2-line',
      border: 'border-blue-100',
      color: 'text-blue-600',
    },
    {
      label: '카카오 알림톡',
      value: kakaoTemplates,
      icon: 'ri-chat-3-line',
      border: 'border-orange-100',
      color: 'text-orange-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`group flex items-center justify-between rounded-sm border bg-white p-4 shadow-sm transition-all hover:shadow-md ${stat.border}`}
        >
          <div className="flex flex-col">
            <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400">{stat.label}</span>
            <span className={`mt-1 text-2xl font-black ${stat.color || 'text-gray-900'}`}>{stat.value}</span>
          </div>
          <div
            className={`text-3xl opacity-10 transition-opacity group-hover:opacity-20 ${stat.color || 'text-gray-900'}`}
          >
            <i className={stat.icon}></i>
          </div>
        </div>
      ))}
    </div>
  );
}
