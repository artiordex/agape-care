export default function ScheduleSection({ schedules, onAdd }: any) {
  return (
    <section className="rounded-xl border bg-white p-6 shadow-sm">
      <h3 className="mb-6 text-lg font-bold">오늘의 일정</h3>

      <div className="max-h-80 space-y-4 overflow-y-auto">
        {schedules.map((s: any) => (
          <div key={s.id} className="border-l-4 border-teal-500 py-2 pl-4">
            <p className="text-sm font-semibold">{s.title}</p>
            <p className="text-xs text-gray-600">
              {s.time} · {s.location}
            </p>
          </div>
        ))}
      </div>

      <button
        onClick={onAdd}
        className="mt-6 w-full rounded-lg bg-gradient-to-r from-teal-500 to-amber-500 py-2 font-medium text-white"
      >
        일정 추가
      </button>
    </section>
  );
}
