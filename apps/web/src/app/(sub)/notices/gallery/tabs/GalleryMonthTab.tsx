/**
 * Description : GalleryMonthTab.tsx - 📌 갤러리 월간 달력 보기
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

interface MonthData {
  date: string | null;
  items: GalleryItem[];
}

interface Props {
  monthData: MonthData[];
  onItemClick: (images: string[], title: string, category: string, date: string, description: string) => void;
}

const dayNames = ['일', '월', '화', '수', '목', '금', '토'];

export default function GalleryMonthTab({ monthData, onItemClick }: Readonly<Props>) {
  const todayStr = new Date().toISOString().split('T')[0];

  const getHeaderColor = (idx: number) => {
    if (idx === 0) return 'text-red-500';
    if (idx === 6) return 'text-blue-500';
    return 'text-gray-700';
  };

  const getDayColor = (dayOfWeek: number, isToday?: boolean) => {
    if (isToday) return 'text-[#5C8D5A]';
    if (dayOfWeek === 0) return 'text-red-500';
    if (dayOfWeek === 6) return 'text-blue-500';
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

      {/* 달력 */}
      <div className="grid grid-cols-7">
        {monthData.map((data, index) => {
          if (!data.date) {
            return (
              <div
                key={`empty-cell-${index}`}
                className="min-h-[180px] border-b border-r border-[#5C8D5A]/10 bg-gray-50 last:border-r-0"
              />
            );
          }

          const dateObj = new Date(data.date);
          const isToday = data.date === todayStr;
          const dayOfWeek = dateObj.getDay();
          const firstItem = data.items[0];

          return (
            <div
              key={data.date}
              className={`min-h-[180px] border-b border-r border-[#5C8D5A]/10 p-3 last:border-r-0 ${
                isToday ? 'bg-[#5C8D5A]/10' : ''
              }`}
            >
              {/* 날짜 */}
              <div className={`mb-2 text-sm font-bold ${getDayColor(dayOfWeek, isToday)}`}>{dateObj.getDate()}</div>

              {/* 갤러리 아이템들 */}
              {data.items.length > 0 ? (
                <div className="space-y-2">
                  {/* 대표 썸네일 (첫 번째 아이템) */}
                  {firstItem && (
                    <button
                      onClick={() =>
                        onItemClick(
                          firstItem.images,
                          firstItem.title,
                          firstItem.category,
                          firstItem.date,
                          firstItem.description,
                        )
                      }
                      className="group relative w-full overflow-hidden rounded-lg border border-[#5C8D5A]/20"
                    >
                      {firstItem.images[0] ? (
                        <div className="relative h-20 w-full">
                          <img
                            src={firstItem.images[0]}
                            alt={firstItem.title}
                            className="h-full w-full object-cover transition-transform group-hover:scale-105"
                          />
                          {firstItem.images.length > 1 && (
                            <div className="absolute right-2 top-2 rounded-full bg-black/70 px-2 py-0.5 text-[10px] font-medium text-white">
                              +{firstItem.images.length}
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="flex h-20 items-center justify-center bg-gray-100">
                          <i className={`${getCategoryIcon(firstItem.category)} text-3xl text-gray-400`} />
                        </div>
                      )}

                      {/* 제목 (항상 표시) */}
                      <div className="bg-white p-2">
                        <div className="mb-1 flex items-center gap-1">
                          <i className={`${getCategoryIcon(firstItem.category)} text-xs text-[#5C8D5A]`} />
                          <span className="text-[10px] font-semibold text-[#5C8D5A]">{firstItem.category}</span>
                        </div>
                        <p className="line-clamp-2 text-xs font-medium text-gray-900">{firstItem.title}</p>
                      </div>
                    </button>
                  )}

                  {/* 개수 표시 */}
                  {data.items.length > 1 && (
                    <div className="flex items-center justify-center rounded bg-[#5C8D5A]/10 py-1 text-xs font-semibold text-[#5C8D5A]">
                      <i className="ri-image-line mr-1" />외 {data.items.length - 1}개 더 있음
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex h-32 items-center justify-center text-center">
                  <span className="text-xs text-gray-400">-</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
