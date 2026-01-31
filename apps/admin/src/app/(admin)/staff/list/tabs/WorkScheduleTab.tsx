'use client';

interface Props {
  staff: any;
}

export default function WorkScheduleTab({ staff }: Props) {
  if (!staff) return null;

  return (
    <div className="space-y-4">
      {/* 근무시간 섹션 */}
      <div className="rounded border border-gray-300 bg-white">
        <div className="flex items-center justify-between border-b border-gray-300 bg-gray-50 px-3 py-2">
          <h4 className="text-xs font-bold text-gray-900">근무시간</h4>
          <button className="rounded bg-blue-500 px-3 py-1 text-[10px] font-medium text-white hover:bg-blue-600">
            근무시간 조회
          </button>
        </div>
        <div className="p-3">
          <div className="mb-3 rounded border border-blue-200 bg-blue-50 p-3">
            <div className="grid grid-cols-3 gap-4 text-xs">
              <div>
                <label className="block text-[10px] font-medium text-gray-600">근무시작시간 ~ 근무종료시간</label>
                <div className="mt-1 font-mono text-sm font-bold text-gray-900">09:00~18:00</div>
              </div>
              <div>
                <label className="block text-[10px] font-medium text-gray-600">휴게시간(분)</label>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-sm font-bold text-gray-900">주간</span>
                  <span className="font-mono text-sm font-bold text-blue-600">(06~22)</span>
                  <span className="font-mono text-sm font-bold text-gray-900">60분</span>
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-medium text-gray-600">실 근무시간(휴게시간 제외)</label>
                <div className="mt-1 font-mono text-lg font-black text-blue-600">8시간</div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-2">
            <label className="block text-[10px] font-medium text-gray-600">비고</label>
            <textarea
              rows={2}
              className="mt-1 w-full resize-none rounded border border-gray-300 px-2 py-1 text-xs"
              placeholder="근무시간 관련 특이사항"
            />
          </div>
        </div>
      </div>

      {/* 연차정보 */}
      <div className="rounded border border-gray-300 bg-white">
        <div className="flex items-center justify-between border-b border-gray-300 bg-gray-50 px-3 py-2">
          <h4 className="text-xs font-bold text-gray-900">연차정보</h4>
          <div className="flex gap-1">
            <button className="rounded border border-gray-300 bg-white px-2 py-1 text-[10px] font-medium text-gray-700 hover:bg-gray-100">
              연차이력
            </button>
            <button className="rounded bg-blue-500 px-2 py-1 text-[10px] font-medium text-white hover:bg-blue-600">
              연차차감신청등록
            </button>
          </div>
        </div>
        <div className="p-3">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between rounded border border-gray-200 bg-gray-50 px-3 py-2">
                <span className="text-[10px] font-medium text-gray-600">근무년차</span>
                <div className="text-right">
                  <div className="font-bold text-gray-900">0.15차</div>
                  <div className="mt-0.5 font-mono text-[10px] text-gray-500">(2025.12.01 ~ 2026.11.30)</div>
                </div>
              </div>
              <div className="flex items-center justify-between px-1">
                <span className="text-[10px] font-medium text-gray-600">발생</span>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-900">1 일</span>
                  <button className="rounded border border-blue-500 bg-blue-50 px-2 py-0.5 text-[10px] text-blue-600 hover:bg-blue-100">
                    발생이력
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between px-1">
                <span className="text-[10px] font-medium text-gray-600">사용</span>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-900">0 일</span>
                  <button className="rounded border border-blue-500 bg-blue-50 px-2 py-0.5 text-[10px] text-blue-600 hover:bg-blue-100">
                    사용이력
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between px-1">
                <span className="text-[10px] font-medium text-gray-600">차감</span>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-900">0 일</span>
                  <button className="rounded border border-blue-500 bg-blue-50 px-2 py-0.5 text-[10px] text-blue-600 hover:bg-blue-100">
                    차감이력
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 px-1 pt-2">
                <span className="text-[10px] font-bold text-gray-700">잔여연차</span>
                <span className="text-lg font-black text-blue-600">1 일</span>
              </div>
            </div>

            {/* 입/퇴사 이력 */}
            <div className="rounded border border-gray-200 bg-gray-50 p-3">
              <div className="mb-2 flex items-center justify-between">
                <h5 className="text-xs font-bold text-gray-900">입/퇴사 이력</h5>
                <button className="rounded bg-blue-500 px-2 py-0.5 text-[10px] font-medium text-white hover:bg-blue-600">
                  이력 조회
                </button>
              </div>
              <table className="w-full text-xs">
                <thead className="bg-white text-[10px]">
                  <tr className="border-b border-gray-300">
                    <th className="border-r border-gray-300 px-2 py-1 text-center font-medium">연번</th>
                    <th className="border-r border-gray-300 px-2 py-1 text-left font-medium">구분</th>
                    <th className="border-r border-gray-300 px-2 py-1 text-center font-medium">일자</th>
                    <th className="px-2 py-1 text-left font-medium">사유</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  <tr className="border-b border-gray-200">
                    <td className="border-r border-gray-200 px-2 py-2 text-center">1</td>
                    <td className="border-r border-gray-200 px-2 py-2 font-medium">최초입사일</td>
                    <td className="border-r border-gray-200 px-2 py-2 text-center font-mono text-[11px]">
                      {staff.hireDate}
                    </td>
                    <td className="px-2 py-2">-</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
