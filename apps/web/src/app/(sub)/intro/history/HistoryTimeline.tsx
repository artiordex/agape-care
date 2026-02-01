/**
 * Description : HistoryTimeline.tsx - 📌 타임라인 축 개별 위치 보정
 * Author : Shiwoo Min
 * Date : 2026-02-01
 */

'use client';

import historyData from '@/data/history.json';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface HistoryEvent {
  readonly month: string;
  readonly title: string;
  readonly description: string;
  readonly image?: string;
  readonly year: string;
  readonly isFirstOfYear: boolean;
}

interface EventRowProps {
  readonly event: HistoryEvent;
  readonly isEven: boolean;
}

export default function HistoryTimeline() {
  if (!historyData || historyData.length === 0) {
    return <section className="py-20 text-center text-gray-500">등록된 연혁 정보가 없습니다.</section>;
  }

  const allEvents: HistoryEvent[] = (historyData as any[]).flatMap(yearGroup =>
    yearGroup.events.map((event: any, idx: number) => ({
      ...event,
      year: yearGroup.year,
      isFirstOfYear: idx === 0,
    })),
  );

  return (
    <section className="overflow-hidden bg-white py-12 font-['Pretendard']">
      <div className="mx-auto max-w-[90%] px-6">
        <div className="relative">
          {/* 도트의 기준점은 left-1/2 */}
          <div
            className="absolute bottom-0 top-0 hidden w-0 border-l-2 border-dashed border-gray-300 md:block"
            style={{ left: 'calc(50%)' }}
          />
          {/* 년도 뱃지 */}
          <div className="space-y-6 md:space-y-0">
            {allEvents.map((event, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={`${event.year}-${event.title}-${index}`} className="relative">
                  {event.isFirstOfYear && (
                    <div className="relative z-30 flex justify-center pb-8 pt-10">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="rounded-full bg-[#5C8D5A] px-10 py-2.5 shadow-lg ring-4 ring-white"
                      >
                        <span className="text-2xl font-bold tracking-widest text-white">{event.year}</span>
                      </motion.div>
                    </div>
                  )}
                  <EventRow event={event} isEven={isEven} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function EventRow({ event, isEven }: EventRowProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [dotTop, setDotTop] = useState<number | null>(null);

  useEffect(() => {
    const calculatePosition = () => {
      if (titleRef.current && containerRef.current) {
        const offsetTop = titleRef.current.offsetTop;
        const height = titleRef.current.offsetHeight;
        setDotTop(offsetTop + height / 2);
      }
    };

    const timer = setTimeout(calculatePosition, 300);
    window.addEventListener('resize', calculatePosition);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', calculatePosition);
    };
  }, []);

  return (
    /* 연혁 카드 */
    <div
      ref={containerRef}
      className={`relative flex flex-col md:flex-row md:py-2 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className={`z-10 w-full md:w-1/2 ${isEven ? 'md:pr-16' : 'md:pl-16'}`}
      >
        <div className="group relative bg-white">
          {event.image && (
            <div className="mb-5 overflow-hidden rounded-xl border border-gray-100 shadow-sm transition-all duration-300 group-hover:shadow-md">
              <img
                src={event.image}
                alt={event.title}
                className="h-56 w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          )}

          {/* 연혁 카드 내용 */}
          <div className={`${isEven ? 'md:text-right' : 'md:text-left'}`}>
            <div className={`mb-2 flex items-baseline gap-2 ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
              {!isEven && <span className="text-2xl font-black text-[#5C8D5A]">{event.month}</span>}
              <h3 ref={titleRef} className="text-xl font-bold leading-tight tracking-tight text-gray-900">
                {event.title}
              </h3>
              {isEven && <span className="text-2xl font-black text-[#5C8D5A]">{event.month}</span>}
            </div>
            <p className="break-keep text-[1rem] leading-relaxed text-gray-500 opacity-90">{event.description}</p>
          </div>
        </div>
      </motion.div>

      {/* 중앙 도트: 이동된 선의 위치에 맞춰 12px 이동 */}
      {dotTop !== null && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="absolute left-1/2 z-40 hidden h-7 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[3px] border-[#5C8D5A] bg-white shadow-md md:flex"
          style={{
            top: `${dotTop}px`,
            left: 'calc(50% - 12px)', // [수정] 중앙 축 이동 거리와 동일하게 설정
          }}
        >
          <div className="h-3.5 w-3.5 rounded-full bg-[#5C8D5A]" />
        </motion.div>
      )}

      <div className="hidden md:block md:w-1/2" />
    </div>
  );
}
