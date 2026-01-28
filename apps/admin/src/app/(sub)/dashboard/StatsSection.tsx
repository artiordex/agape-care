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
          className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
        >
          <div className="mb-4 flex justify-between">
            <div className={`h-12 w-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
              <i className={`${stat.icon} text-2xl text-white`} />
            </div>
            <span className="rounded bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-500">{stat.change}</span>
          </div>
          <p className="text-sm text-gray-600">{stat.title}</p>
          <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
        </div>
      ))}
    </section>
  );
}
