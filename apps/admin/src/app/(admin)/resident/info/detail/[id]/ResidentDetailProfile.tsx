export default function ResidentDetailProfile({
  resident,
  getStatusColor,
  getGradeColor,
  onEdit,
  onDownloadContract,
}: any) {
  return (
    <div className="border-b border-gray-200 bg-white">
      {/* Main Profile */}
      <div className="px-6 py-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded bg-gray-100 text-2xl font-bold text-gray-700">
              {resident.name.charAt(0)}
            </div>
            <div>
              <div className="mb-2 flex items-center gap-2">
                <h2 className="text-lg font-bold text-gray-900">{resident.name}</h2>
                <span className={`rounded px-2 py-0.5 text-xs font-medium ${getStatusColor(resident.status)}`}>
                  {resident.status}
                </span>
                <span className={`rounded px-2 py-0.5 text-xs font-medium ${getGradeColor(resident.grade)}`}>
                  {resident.grade}
                </span>
                <span className="rounded bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-700">
                  {resident.room}
                </span>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span>
                  {resident.gender} / {new Date().getFullYear() - parseInt(resident.birthDate.split('-')[0])}세
                </span>
                <span>•</span>
                <span>입소일 {resident.admissionDate}</span>
                <span>•</span>
                <span>본인부담 {resident.copaymentRate}%</span>
                <span>•</span>
                <span>{resident.phone}</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={onEdit}
              className="flex items-center gap-1 rounded border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
            >
              <i className="ri-edit-line text-base"></i>
              수정
            </button>
            <button
              onClick={onDownloadContract}
              className="flex items-center gap-1 rounded border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
            >
              <i className="ri-file-text-line text-base"></i>
              계약서
            </button>
          </div>
        </div>
      </div>

      {/* Health Stats */}
      <div className="border-t border-gray-100 bg-gray-50 px-6 py-3">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">혈압</span>
            <span className="text-sm font-semibold text-gray-900">{resident.bloodPressure}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">혈당</span>
            <span className="text-sm font-semibold text-gray-900">{resident.bloodSugar}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">신장</span>
            <span className="text-sm font-semibold text-gray-900">{resident.height}cm</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">체중</span>
            <span className="text-sm font-semibold text-gray-900">{resident.weight}kg</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">등급만료</span>
            <span className="text-sm font-semibold text-gray-900">{resident.gradeValidUntil}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
