'use client';

export default function ProgramModal({ selected, close }: any) {
  if (!selected) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={close}>
      <div
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white p-8"
        onClick={e => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold">{selected.title}</h2>
        <p className="mt-2 text-gray-600">{selected.description}</p>

        <div className="mt-6 text-gray-700">
          <p>
            <i className="ri-calendar-line" /> {selected.date}
          </p>
          <p>
            <i className="ri-time-line" /> {selected.start_time} - {selected.end_time}
          </p>
          <p>
            <i className="ri-user-line" /> 담당: {selected.staff}
          </p>
        </div>

        <button className="mx-auto mt-6 block rounded-lg bg-gray-700 px-6 py-2 text-white" onClick={close}>
          닫기
        </button>
      </div>
    </div>
  );
}
