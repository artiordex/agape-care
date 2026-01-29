interface StatCard {
  title: string;
  value: string;
  icon: string;
  color: string;
  change: string;
}

export default function StatsSection({ stats }: { stats: StatCard[] }) {
  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map(stat => (
        <div
          key={stat.title}
          className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
        >
          <div className="mb-3 flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{stat.title}</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">{stat.value}</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
              <i className={`${stat.icon} text-xl text-gray-700`} />
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1 border-t border-gray-100 pt-3">
            <span className="text-xs font-semibold text-gray-500">{stat.change}</span>
          </div>
        </div>
      ))}
    </section>
  );
}
