export default function HealthAlertSection({ healthAlerts }: any) {
  return (
    <section className="rounded-lg border border-red-200 bg-red-50 shadow-sm">
      <header className="flex items-center justify-between border-b border-red-200 px-6 py-4">
        <h3 className="flex items-center gap-2 text-base font-bold text-red-900">
          <i className="ri-heart-pulse-line" />
          건강 이상 알림
        </h3>
        <span className="rounded-full bg-red-200 px-2 py-0.5 text-xs font-semibold text-red-900">
          {healthAlerts.length}건
        </span>
      </header>

      <div className="p-6">
        <ul className="space-y-3">
          {healthAlerts.length === 0 ? (
            <li className="py-4 text-center text-sm text-red-700">건강 이상 내역이 없습니다</li>
          ) : (
            healthAlerts.map((alert: any) => (
              <li
                key={alert.id}
                className="flex items-start gap-3 rounded-lg border border-red-200 bg-white p-3 transition-colors hover:bg-red-50"
              >
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-red-100">
                  <i className={`${alert.icon} text-red-600`} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900">{alert.name}</p>
                  <p className="mt-1 text-xs text-red-700">{alert.issue}</p>
                  <p className="mt-1 text-xs text-gray-600">{alert.value}</p>
                  <p className="mt-1 text-xs text-gray-500">{alert.time}</p>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </section>
  );
}
