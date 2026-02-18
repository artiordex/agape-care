/**
 * Description : GalleryWeekTab.tsx - ?? ? UI ????
 * Author : Shiwoo Min
 * Date : 2026-02-01
 */

'use client';

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  date: string;
  description: string;
  images: string[];
}

interface WeekData {
  date: string;
  items: GalleryItem[];
}

interface Props {
  weekData: WeekData[];
  onItemClick: (images: string[], title: string, category: string, date: string, description: string) => void;
}

const dayNames = ['월', '화', '수', '목', '금', '토', '일'];

export default function GalleryWeekTab({ weekData, onItemClick }: Readonly<Props>) {
  const todayStr = new Date().toISOString().split('T')[0];

  const getHeaderColor = (idx: number) => {
    if (idx === 6) return 'text-red-500'; // 일요일
    if (idx === 5) return 'text-blue-500'; // 토요일
    return 'text-gray-700';
  };

  const getDayColor = (dayOfWeek: number, isToday?: boolean) => {
    if (isToday) return 'text-[#5C8D5A]';
    if (dayOfWeek === 0) return 'text-red-500'; // 일요일
    if (dayOfWeek === 6) return 'text-blue-500'; // 토요일
    return 'text-gray-700';
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case '행사':
        return 'ri-calendar-event-line';
      case '일상':
        return 'ri-home-smile-line';
      case '인지프로그램':
        return 'ri-brain-line';
      case '여가활동':
        return 'ri-music-2-line';
      default:
        return 'ri-image-line';
    }
  };

  return (
    <div className="overflow-hidden border border-gray-200 bg-white shadow-sm">
      {/* 요일 헤더 */}
      <div className="grid grid-cols-7 border-b-2 border-[#5C8D5A]/30 bg-[#5C8D5A]/5">
        {dayNames.map((day, idx) => (
          <div
            key={day}
            className={`border-r border-[#5C8D5A]/20 p-3 text-center font-bold last:border-r-0 ${getHeaderColor(idx)}`}
          >
            {day}
          </div>
        ))}
      </div>

      {/* 달력 한 줄 (주간) */}
      <div className="grid grid-cols-7">
        {weekData.map(data => {
          const dateObj = new Date(data.date);
          const isToday = data.date === todayStr;
          const dayOfWeek = dateObj.getDay();

          return (
            <div
              key={data.date}
              className={`min-h-[300px] border-r border-[#5C8D5A]/10 p-3 last:border-r-0 ${
                isToday ? 'bg-[#5C8D5A]/10' : ''
              }`}
            >
              {/* 날짜 */}
              <div className={`mb-3 text-center text-lg font-bold ${getDayColor(dayOfWeek, isToday)}`}>
                <span className="block text-xs font-normal text-gray-400">{data.date}</span>
                {dateObj.getDate()}
              </div>

              {/* 갤러리 아이템들 */}
              {data.items.length > 0 ? (
                <div className="space-y-3">
                  {data.items.map(item => (
                    <button
                      key={item.id}
                      onClick={() => onItemClick(item.images, item.title, item.category, item.date, item.description)}
                      className="group w-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:border-[#5C8D5A]/50 hover:shadow-md"
                    >
                      {item.images[0] && (
                        <div className="relative h-24 w-full">
                          <img src={item.images[0]} alt={item.title} className="h-full w-full object-cover" />
                        </div>
                      )}
                      <div className="p-2 text-left">
                        <div className="mb-1 flex items-center gap-1">
                          <i className={`${getCategoryIcon(item.category)} text-[10px] text-[#5C8D5A]`} />
                          <span className="text-[10px] font-semibold text-[#5C8D5A]">{item.category}</span>
                        </div>
                        <p className="line-clamp-2 text-xs font-medium text-gray-900">{item.title}</p>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="flex h-40 items-center justify-center text-center">
                  <span className="text-xs text-gray-300">데이터 없음</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
