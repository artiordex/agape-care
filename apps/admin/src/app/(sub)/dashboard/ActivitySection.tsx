export default function ActivitySection({ activities, onViewAll }: any) {
  return (
    <section className="rounded-xl border bg-white p-6 shadow-sm lg:col-span-2">
      <header className="mb-6 flex justify-between">
        <h3 className="text-lg font-bold">최근 활동</h3>
        <button onClick={onViewAll} className="text-sm text-teal-600 hover:text-teal-700">
          전체보기 →
        </button>
      </header>

      <ul className="space-y-4">
        {activities.map((a: any) => (
          <li key={a.id} className="flex gap-4 rounded-lg p-4 hover:bg-gray-50">
            <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 ${a.color}`}>
              <i className={`${a.icon} text-xl`} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold">{a.type}</p>
              <p className="truncate text-sm text-gray-600">{a.name}</p>
            </div>
            <span className="whitespace-nowrap text-xs text-gray-500">{a.time}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
