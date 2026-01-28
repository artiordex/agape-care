export default function QuickActionSection({ actions, onAction }: any) {
  return (
    <section className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {actions.map((a: any) => (
        <button
          key={a.label}
          onClick={() => onAction(a)}
          className="rounded-xl border bg-white p-6 shadow-sm transition hover:shadow-md"
        >
          <div
            className={`mx-auto mb-3 h-12 w-12 rounded-lg bg-gradient-to-br ${a.color} flex items-center justify-center`}
          >
            <i className={`${a.icon} text-2xl text-white`} />
          </div>
          <p className="text-center text-sm font-semibold">{a.label}</p>
        </button>
      ))}
    </section>
  );
}
