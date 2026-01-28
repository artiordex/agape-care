'use client';

import historyData from '@/data/history.json';

export default function HistoryTimeline() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="relative">
          <div className="absolute bottom-0 left-1/2 top-0 hidden w-0.5 -translate-x-1/2 bg-gradient-to-b from-teal-500 to-amber-500 md:block" />

          <div className="space-y-16">
            {historyData.map(yearData => (
              <div key={yearData.year} className="relative">
                <div className="mb-12 flex justify-center">
                  <div className="rounded-full bg-gradient-to-r from-teal-600 to-teal-700 px-8 py-4 shadow-lg">
                    <span className="text-3xl font-bold text-white">{yearData.year}</span>
                  </div>
                </div>

                <div className="space-y-8">
                  {yearData.events.map((event, eventIndex) => (
                    <div
                      key={event.title}
                      className={`flex items-center gap-8 ${
                        eventIndex % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                      }`}
                    >
                      <div className={`flex-1 ${eventIndex % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-lg hover:shadow-xl">
                          <div className="mb-3 flex items-center gap-3">
                            <span className="rounded-full bg-teal-50 px-3 py-1 text-sm font-semibold text-teal-600">
                              {event.month}월
                            </span>
                          </div>

                          <h3 className="mb-2 text-lg font-bold text-gray-900">{event.title}</h3>
                          <p className="leading-relaxed text-gray-600">{event.description}</p>
                        </div>
                      </div>

                      <div className="hidden flex-shrink-0 items-center justify-center md:flex">
                        <div className="relative z-10 h-4 w-4 rounded-full bg-gradient-to-br from-teal-500 to-amber-500 shadow-lg">
                          <div className="absolute inset-0 animate-ping rounded-full bg-gradient-to-br from-teal-500 to-amber-500 opacity-75" />
                        </div>
                      </div>

                      <div className="hidden flex-1 md:block" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
