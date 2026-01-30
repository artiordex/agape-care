export default function BasicInfoTab({ resident }: { resident: any }) {
  return (
    <div className="space-y-6">
      {/* 기본 정보 */}
      <div className="rounded-lg border border-gray-200 bg-white">
        <div className="border-b border-gray-200 px-5 py-3">
          <h3 className="text-sm font-bold text-gray-900">기본 정보</h3>
        </div>
        <div className="p-5">
          <div className="grid grid-cols-3 gap-6">
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-500">이름</label>
              <p className="text-sm font-semibold text-gray-900">{resident.name}</p>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-500">성별</label>
              <p className="text-sm font-semibold text-gray-900">{resident.gender}</p>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-500">생년월일</label>
              <p className="text-sm font-semibold text-gray-900">{resident.birthDate}</p>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-500">주민등록번호</label>
              <p className="text-sm font-semibold text-gray-900">{resident.registrationNumber}</p>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-500">연락처</label>
              <p className="text-sm font-semibold text-gray-900">{resident.phone}</p>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-500">방호실</label>
              <p className="text-sm font-semibold text-gray-900">{resident.room}</p>
            </div>
            <div className="col-span-3">
              <label className="mb-1 block text-xs font-medium text-gray-500">주소</label>
              <p className="text-sm font-semibold text-gray-900">{resident.address}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 건강 및 기능 상태 */}
      <div className="rounded-lg border border-gray-200 bg-white">
        <div className="border-b border-gray-200 px-5 py-3">
          <h3 className="text-sm font-bold text-gray-900">건강 및 기능 상태</h3>
        </div>
        <div className="p-5">
          <div className="grid grid-cols-4 gap-6">
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-500">인지기능</label>
              <p className="text-sm font-semibold text-gray-900">{resident.cognition}</p>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-500">거동상태</label>
              <p className="text-sm font-semibold text-gray-900">{resident.mobility}</p>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-500">식사상태</label>
              <p className="text-sm font-semibold text-gray-900">{resident.mealStatus}</p>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-500">배변상태</label>
              <p className="text-sm font-semibold text-gray-900">{resident.toiletStatus}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 주요 질환 및 복용약품 */}
      <div className="rounded-lg border border-gray-200 bg-white">
        <div className="border-b border-gray-200 px-5 py-3">
          <h3 className="text-sm font-bold text-gray-900">주요 질환 및 복용약품</h3>
        </div>
        <div className="p-5">
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-xs font-medium text-gray-500">주요 질환</label>
              <div className="flex flex-wrap gap-2">
                {resident.mainDiseases.map((disease: string, idx: number) => (
                  <span key={idx} className="rounded bg-red-50 px-2.5 py-1 text-xs font-medium text-red-700">
                    {disease}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <label className="mb-2 block text-xs font-medium text-gray-500">복용약품</label>
              <div className="flex flex-wrap gap-2">
                {resident.medications.map((med: string, idx: number) => (
                  <span key={idx} className="rounded bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">
                    {med}
                  </span>
                ))}
              </div>
            </div>
            {resident.allergies.length > 0 && (
              <div>
                <label className="mb-2 block text-xs font-medium text-gray-500">알레르기</label>
                <div className="flex flex-wrap gap-2">
                  {resident.allergies.map((allergy: string, idx: number) => (
                    <span key={idx} className="rounded bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700">
                      ⚠️ {allergy}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 특이사항 */}
      <div className="rounded-lg border border-gray-200 bg-white">
        <div className="border-b border-gray-200 px-5 py-3">
          <h3 className="text-sm font-bold text-gray-900">특이사항</h3>
        </div>
        <div className="p-5">
          <p className="whitespace-pre-wrap text-sm text-gray-700">{resident.specialNotes}</p>
        </div>
      </div>
    </div>
  );
}
