export default function GuardiansTab({ guardians, onAddGuardian }: any) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-gray-900">보호자 정보</h3>
        <button
          onClick={onAddGuardian}
          className="flex items-center gap-1.5 rounded border border-blue-600 bg-blue-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
        >
          <i className="ri-add-line text-base"></i>
          추가
        </button>
      </div>

      <div className="space-y-3">
        {guardians.map((guardian: any, idx: number) => (
          <div key={idx} className="rounded-lg border border-gray-200 bg-white p-5">
            <div className="mb-4 flex items-start justify-between">
              <div>
                <p className="mb-1 text-sm font-bold text-gray-900">{guardian.name}</p>
                <span className="inline-block rounded bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700">
                  {guardian.relation}
                </span>
              </div>
              <button className="text-gray-400 transition-colors hover:text-gray-600">
                <i className="ri-more-2-fill text-lg"></i>
              </button>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <i className="ri-phone-line text-gray-400"></i>
                <span className="text-gray-700">{guardian.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="ri-mail-line text-gray-400"></i>
                <span className="text-gray-700">{guardian.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="ri-map-pin-line text-gray-400"></i>
                <span className="text-gray-700">{guardian.address}</span>
              </div>
              <div className="mt-3 flex items-center gap-2 border-t border-gray-100 pt-3">
                <i className={`ri-checkbox-circle-${guardian.receiveNotice ? 'fill' : 'line'} text-gray-400`}></i>
                <span className="text-xs text-gray-600">청구서 수신 {guardian.receiveNotice ? '동의' : '미동의'}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
