'use client';

interface Props {
  staff: any;
}

export default function BasicInfoTab({ staff }: Props) {
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
          <table className="w-full text-xs">
            <thead className="bg-gray-50 text-[10px]">
              <tr className="border-b border-gray-300">
                <th className="border-r border-gray-300 px-2 py-1.5 text-center font-medium">연번</th>
                <th className="border-r border-gray-300 px-3 py-1.5 text-left font-medium">
                  근무시작시간 ~ 근무종료시간
                </th>
                <th className="border-r border-gray-300 px-2 py-1.5 text-center font-medium">
                  휴게시간
                  <br />
                  (주간)
                </th>
                <th className="border-r border-gray-300 px-2 py-1.5 text-center font-medium">
                  야간
                  <br />
                  (22~06)
                </th>
                <th className="px-2 py-1.5 text-center font-medium">
                  실 근무시간
                  <br />
                  (주계시간 제외)
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200">
                <td className="border-r border-gray-200 px-2 py-2 text-center">1</td>
                <td className="border-r border-gray-200 px-3 py-2 font-mono text-[11px]">09:00~18:00</td>
                <td className="border-r border-gray-200 px-2 py-2 text-center">60분</td>
                <td className="border-r border-gray-200 px-2 py-2 text-center">-</td>
                <td className="px-2 py-2 text-center font-medium">8시간</td>
              </tr>
            </tbody>
          </table>
          <div className="mt-2 border-t border-gray-200 pt-2">
            <label className="block text-[10px] font-medium text-gray-600">비고</label>
            <textarea
              rows={2}
              className="mt-1 w-full resize-none rounded border border-gray-300 px-2 py-1 text-xs"
              placeholder="근무시간 관련 특이사항"
            />
          </div>
        </div>
      </div>

      {/* 4대 보험 섹션 */}
      <div className="rounded border border-gray-300 bg-white">
        <div className="flex items-center justify-between border-b border-gray-300 bg-gray-50 px-3 py-2">
          <h4 className="text-xs font-bold text-gray-900">4대 보험</h4>
          <button className="rounded bg-blue-500 px-3 py-1 text-[10px] font-medium text-white hover:bg-blue-600">
            4대 보험 조회
          </button>
        </div>
        <div className="p-3">
          <table className="w-full text-xs">
            <thead className="bg-gray-50 text-[10px]">
              <tr className="border-b border-gray-300">
                <th className="border-r border-gray-300 px-3 py-1.5 text-left font-medium">구분</th>
                <th className="border-r border-gray-300 px-3 py-1.5 text-center font-medium">가입일자</th>
                <th className="px-3 py-1.5 text-center font-medium">상실일자</th>
              </tr>
            </thead>
            <tbody className="text-xs">
              <tr className="border-b border-gray-200">
                <td className="border-r border-gray-200 px-3 py-2 font-medium">국민연금</td>
                <td className="border-r border-gray-200 px-3 py-2 text-center">-</td>
                <td className="px-3 py-2 text-center">-</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="border-r border-gray-200 px-3 py-2 font-medium">건강보험</td>
                <td className="border-r border-gray-200 px-3 py-2 text-center">-</td>
                <td className="px-3 py-2 text-center">-</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="border-r border-gray-200 px-3 py-2 font-medium">고용보험</td>
                <td className="border-r border-gray-200 px-3 py-2 text-center">-</td>
                <td className="px-3 py-2 text-center">-</td>
              </tr>
              <tr>
                <td className="border-r border-gray-200 px-3 py-2 font-medium">산재보험</td>
                <td className="border-r border-gray-200 px-3 py-2 text-center">-</td>
                <td className="px-3 py-2 text-center">-</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 2열 레이아웃 */}
      <div className="grid grid-cols-2 gap-4">
        {/* 입/퇴사 이력 */}
        <div className="rounded border border-gray-300 bg-white">
          <div className="flex items-center justify-between border-b border-gray-300 bg-gray-50 px-3 py-2">
            <h4 className="text-xs font-bold text-gray-900">입/퇴사 이력</h4>
            <button className="rounded bg-blue-500 px-3 py-1 text-[10px] font-medium text-white hover:bg-blue-600">
              입/퇴사 이력 조회
            </button>
          </div>
          <div className="p-3">
            <table className="w-full text-xs">
              <thead className="bg-gray-50 text-[10px]">
                <tr className="border-b border-gray-300">
                  <th className="border-r border-gray-300 px-2 py-1.5 text-center font-medium">연번</th>
                  <th className="border-r border-gray-300 px-3 py-1.5 text-left font-medium">구분</th>
                  <th className="border-r border-gray-300 px-3 py-1.5 text-center font-medium">일자</th>
                  <th className="px-3 py-1.5 text-left font-medium">사유</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="border-r border-gray-200 px-2 py-2 text-center">1</td>
                  <td className="border-r border-gray-200 px-3 py-2 font-medium">최초입사일</td>
                  <td className="border-r border-gray-200 px-3 py-2 text-center font-mono text-[11px]">
                    {staff.hireDate}
                  </td>
                  <td className="px-3 py-2">-</td>
                </tr>
              </tbody>
            </table>
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
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                <span className="text-[10px] font-medium text-gray-600">근무년차</span>
                <div className="text-right">
                  <div className="font-bold text-gray-900">0.15차</div>
                  <div className="mt-0.5 font-mono text-[10px] text-gray-500">(2025.12.01 ~ 2026.11.30)</div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-medium text-gray-600">발생</span>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-900">1 일</span>
                  <button className="rounded border border-blue-500 bg-blue-50 px-2 py-0.5 text-[10px] text-blue-600 hover:bg-blue-100">
                    발생이력
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-medium text-gray-600">사용</span>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-900">0 일</span>
                  <button className="rounded border border-blue-500 bg-blue-50 px-2 py-0.5 text-[10px] text-blue-600 hover:bg-blue-100">
                    사용이력
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-medium text-gray-600">차감</span>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-900">0 일</span>
                  <button className="rounded border border-blue-500 bg-blue-50 px-2 py-0.5 text-[10px] text-blue-600 hover:bg-blue-100">
                    차감이력
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-2">
                <span className="text-[10px] font-bold text-gray-700">잔여연차</span>
                <span className="text-lg font-black text-blue-600">1 일</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
