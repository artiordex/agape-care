export default function ActivitySection({ activities, onViewAll }: any) {
  return (
    <section className="rounded-lg border border-gray-200 bg-white shadow-sm lg:col-span-2">
      <header className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
        <h3 className="text-base font-bold text-gray-900">최근 활동</h3>
        <button onClick={onViewAll} className="text-sm font-medium text-teal-600 hover:text-teal-700">
          전체보기 →
        </button>
      </header>

      <div className="p-6">
        <ul className="divide-y divide-gray-100">
          {activities.length === 0 ? (
            <li className="py-8 text-center text-sm text-gray-500">최근 활동이 없습니다</li>
          ) : (
            activities.map((a: any) => (
              <li key={a.id} className="flex items-center gap-4 py-4 transition-colors hover:bg-gray-50">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gray-100">
                  <i className={`${a.icon} text-lg text-gray-700`} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-gray-900">{a.type}</p>
                  <p className="truncate text-sm text-gray-600">{a.name}</p>
                </div>
                <span className="whitespace-nowrap text-xs text-gray-500">{a.time}</span>
              </li>
            ))
          )}
        </ul>
      </div>
    </section>
  );
}
