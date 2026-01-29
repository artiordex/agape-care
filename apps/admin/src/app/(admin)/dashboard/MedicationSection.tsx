export default function MedicationSection({ medications }: any) {
  return (
    <section className="rounded-lg border border-gray-200 bg-white shadow-sm">
      <header className="border-b border-gray-200 px-6 py-4">
        <h3 className="flex items-center gap-2 text-base font-bold text-gray-900">
          <i className="ri-medicine-bottle-line text-blue-600" />
          투약 현황
        </h3>
      </header>

      <div className="p-6">
        <div className="mb-4 grid grid-cols-3 gap-3">
          <div className="rounded-lg bg-green-50 p-3 text-center">
            <p className="text-xs text-green-600">완료</p>
            <p className="mt-1 text-2xl font-bold text-green-700">{medications.completed}건</p>
          </div>
          <div className="rounded-lg bg-amber-50 p-3 text-center">
            <p className="text-xs text-amber-600">예정</p>
            <p className="mt-1 text-2xl font-bold text-amber-700">{medications.scheduled}건</p>
          </div>
          <div className="rounded-lg bg-red-50 p-3 text-center">
            <p className="text-xs text-red-600">누락</p>
            <p className="mt-1 text-2xl font-bold text-red-700">{medications.missed}건</p>
          </div>
        </div>

        {medications.upcoming && medications.upcoming.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs font-semibold text-gray-600">다음 투약 예정</p>
            {medications.upcoming.map((item: any) => (
              <div key={item.id} className="flex items-center justify-between rounded-lg border border-gray-200 p-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-100">
                    <i className="ri-user-line text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{item.name}</p>
                    <p className="text-xs text-gray-600">{item.medication}</p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-gray-600">{item.time}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
