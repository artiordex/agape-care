export default function ScheduleSection({ schedules, onAdd }: any) {
  return (
    <section className="rounded-lg border border-gray-200 bg-white shadow-sm">
      <header className="border-b border-gray-200 px-6 py-4">
        <h3 className="text-base font-bold text-gray-900">오늘의 일정</h3>
      </header>

      <div className="p-6">
        <div className="max-h-80 space-y-3 overflow-y-auto">
          {schedules.length === 0 ? (
            <div className="py-8 text-center text-sm text-gray-500">등록된 일정이 없습니다</div>
          ) : (
            schedules.map((s: any) => (
              <div key={s.id} className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                <p className="text-sm font-semibold text-gray-900">{s.title}</p>
                <p className="mt-1 text-xs text-gray-600">
                  <i className="ri-time-line mr-1" />
                  {s.time}
                </p>
                <p className="mt-1 text-xs text-gray-600">
                  <i className="ri-map-pin-line mr-1" />
                  {s.location}
                </p>
              </div>
            ))
          )}
        </div>

        <button
          onClick={onAdd}
          className="mt-4 w-full rounded-lg border border-gray-300 bg-white py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
        >
          <i className="ri-add-line mr-1" />
          일정 추가
        </button>
      </div>
    </section>
  );
}
