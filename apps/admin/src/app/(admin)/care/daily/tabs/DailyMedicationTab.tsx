'use client';

interface Props {
  date: string;
  onManageMedication: () => void;
}

export default function DailyMedicationTab({ date, onManageMedication }: Props) {
  return (
    <div className="space-y-4">
      {/* 투약 일지 */}
      <div className="rounded-lg border border-gray-200 bg-white p-4">
        <div className="mb-3 flex items-center justify-between">
          <h4 className="text-xs font-bold text-gray-900">투약 일지</h4>
          <button
            onClick={onManageMedication}
            className="rounded border border-blue-600 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600 hover:bg-blue-100"
          >
            수급자 투약목록 관리
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th rowSpan={2} className="border-r px-2 py-2 text-center text-[10px] font-semibold text-gray-700">
                  연번
                </th>
                <th rowSpan={2} className="border-r px-3 py-2 text-left text-[10px] font-semibold text-gray-700">
                  <div className="flex items-center gap-2">
                    <span>계정자</span>
                    <button className="rounded border border-gray-300 bg-white px-2 py-0.5 text-[10px]">
                      전체선택
                    </button>
                    <button className="rounded border border-gray-300 bg-white px-2 py-0.5 text-[10px]">선택</button>
                  </div>
                </th>
                <th rowSpan={2} className="border-r px-2 py-2 text-center text-[10px] font-semibold text-gray-700">
                  -
                </th>
                <th
                  colSpan={8}
                  className="border-b border-r px-2 py-1 text-center text-[10px] font-semibold text-gray-700"
                >
                  계정자
                </th>
                <th rowSpan={2} className="border-r px-2 py-2 text-center text-[10px] font-semibold text-gray-700">
                  차량
                </th>
                <th rowSpan={2} className="px-2 py-2 text-center text-[10px] font-semibold text-gray-700">
                  기윤
                  <br />
                  생체서슴
                </th>
              </tr>
              <tr className="border-b bg-blue-50">
                <th className="border-r px-2 py-1 text-center text-[10px] font-medium">
                  아침식전
                  <div className="text-[9px] text-gray-600">07:30</div>
                </th>
                <th className="border-r px-2 py-1 text-center text-[10px] font-medium">
                  아침식후
                  <div className="text-[9px] text-gray-600">08:30</div>
                </th>
                <th className="border-r px-2 py-1 text-center text-[10px] font-medium">
                  점심식전
                  <div className="text-[9px] text-gray-600">11:00</div>
                </th>
                <th className="border-r px-2 py-1 text-center text-[10px] font-medium">
                  점심식후
                  <div className="text-[9px] text-gray-600">12:00</div>
                </th>
                <th className="border-r px-2 py-1 text-center text-[10px] font-medium">
                  저녁식전
                  <div className="text-[9px] text-gray-600">16:00</div>
                </th>
                <th className="border-r px-2 py-1 text-center text-[10px] font-medium">
                  저녁식후
                  <div className="text-[9px] text-gray-600">17:00</div>
                </th>
                <th className="border-r px-2 py-1 text-center text-[10px] font-medium">
                  취침전
                  <div className="text-[9px] text-gray-600">21:00</div>
                </th>
                <th className="border-r px-2 py-1 text-center text-[10px] font-medium">
                  필요시
                  <div className="text-[9px] text-gray-600">-</div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={13} className="px-3 py-12 text-center text-xs text-gray-600">
                  <div className="space-y-1">
                    <p>{date} 투약해정일 투약목록이 없습니다.</p>
                    <p className="text-[11px]">"수급자 투약목록 관리" 를 이용하여 투약할 품목을 등록할 수 있습니다.</p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
