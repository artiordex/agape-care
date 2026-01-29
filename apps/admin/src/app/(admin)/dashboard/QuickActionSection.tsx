export default function QuickActionSection({ actions, onAction }: any) {
  return (
    <section>
      <header className="mb-4">
        <h3 className="text-base font-bold text-gray-900">빠른 작업</h3>
      </header>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
        {actions.map((a: any) => (
          <button
            key={a.label}
            onClick={() => onAction(a)}
            className="group rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all hover:border-gray-300 hover:shadow-md"
          >
            <div className="mb-3 flex items-center justify-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 transition-colors group-hover:bg-gray-200">
                <i className={`${a.icon} text-2xl text-gray-700`} />
              </div>
            </div>
            <p className="text-center text-xs font-semibold text-gray-700">{a.label}</p>
          </button>
        ))}
      </div>
    </section>
  );
}
