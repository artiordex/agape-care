'use client';

interface Props {
  staff: any;
}

export default function AttendanceTab({ staff }: Props) {
  if (!staff) return null;

  return (
    <div className="space-y-4">
      {/* 출퇴근 기록 */}
      <div className="rounded border border-gray-300 bg-white">
        <div className="flex items-center justify-between border-b border-gray-300 bg-gray-50 px-3 py-2">
          <h4 className="text-xs font-bold text-gray-900">출퇴근 기록 조회</h4>
          <div className="flex gap-2">
            <input
              type="month"
              defaultValue={new Date().toISOString().slice(0, 7)}
              className="rounded border border-gray-300 px-2 py-1 text-xs"
            />
            <button className="rounded bg-blue-500 px-3 py-1 text-[10px] font-medium text-white hover:bg-blue-600">
              조회
            </button>
          </div>
        </div>
        <div className="p-3">
          <table className="w-full text-xs">
            <thead className="bg-gray-50 text-[10px]">
              <tr className="border-b border-gray-300">
                <th className="border-r border-gray-300 px-2 py-1.5 text-center font-medium">날짜</th>
                <th className="border-r border-gray-300 px-2 py-1.5 text-center font-medium">요일</th>
                <th className="border-r border-gray-300 px-2 py-1.5 text-center font-medium">출근시간</th>
                <th className="border-r border-gray-300 px-2 py-1.5 text-center font-medium">퇴근시간</th>
                <th className="border-r border-gray-300 px-2 py-1.5 text-center font-medium">근무시간</th>
                <th className="border-r border-gray-300 px-2 py-1.5 text-center font-medium">연장근무</th>
                <th className="border-r border-gray-300 px-2 py-1.5 text-center font-medium">야간근무</th>
                <th className="px-2 py-1.5 text-center font-medium">상태</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 10 }, (_, i) => {
                const date = new Date(2025, 0, i + 1);
                const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'][date.getDay()];
                const isWeekend = date.getDay() === 0 || date.getDay() === 6;

                return (
                  <tr key={i} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="border-r border-gray-200 px-2 py-2 text-center font-mono text-[11px]">
                      2025.01.{String(i + 1).padStart(2, '0')}
                    </td>
                    <td
                      className={`border-r border-gray-200 px-2 py-2 text-center font-medium ${
                        isWeekend ? 'text-red-600' : 'text-gray-900'
                      }`}
                    >
                      {dayOfWeek}
                    </td>
                    <td className="border-r border-gray-200 px-2 py-2 text-center font-mono text-[11px]">
                      {isWeekend ? '-' : '09:00'}
                    </td>
                    <td className="border-r border-gray-200 px-2 py-2 text-center font-mono text-[11px]">
                      {isWeekend ? '-' : '18:00'}
                    </td>
                    <td className="border-r border-gray-200 px-2 py-2 text-center font-medium">
                      {isWeekend ? '-' : '8시간'}
                    </td>
                    <td className="border-r border-gray-200 px-2 py-2 text-center">-</td>
                    <td className="border-r border-gray-200 px-2 py-2 text-center">-</td>
                    <td className="px-2 py-2 text-center">
                      <span
                        className={`rounded px-2 py-0.5 text-[10px] font-medium ${
                          isWeekend ? 'bg-gray-100 text-gray-600' : 'bg-green-100 text-green-700'
                        }`}
                      >
                        {isWeekend ? '휴무' : '정상'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot className="border-t-2 border-gray-300 bg-gray-50">
              <tr>
                <td colSpan={4} className="px-3 py-2 text-right text-xs font-bold">
                  합계
                </td>
                <td className="border-l border-gray-300 px-2 py-2 text-center text-xs font-bold text-blue-600">
                  40시간
                </td>
                <td className="border-l border-gray-300 px-2 py-2 text-center text-xs font-bold">-</td>
                <td className="border-l border-gray-300 px-2 py-2 text-center text-xs font-bold">-</td>
                <td className="border-l border-gray-300 px-2 py-2 text-center"></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* 결근/지각/조퇴 내역 */}
      <div className="grid grid-cols-3 gap-4">
        <div className="rounded border border-gray-300 bg-white p-3">
          <div className="mb-2 flex items-center justify-between">
            <h5 className="text-xs font-bold text-gray-900">결근 내역</h5>
            <span className="text-lg font-black text-red-600">0일</span>
          </div>
          <p className="text-[10px] text-gray-500">당월 결근 없음</p>
        </div>
        <div className="rounded border border-gray-300 bg-white p-3">
          <div className="mb-2 flex items-center justify-between">
            <h5 className="text-xs font-bold text-gray-900">지각 내역</h5>
            <span className="text-lg font-black text-orange-600">0회</span>
          </div>
          <p className="text-[10px] text-gray-500">당월 지각 없음</p>
        </div>
        <div className="rounded border border-gray-300 bg-white p-3">
          <div className="mb-2 flex items-center justify-between">
            <h5 className="text-xs font-bold text-gray-900">조퇴 내역</h5>
            <span className="text-lg font-black text-purple-600">0회</span>
          </div>
          <p className="text-[10px] text-gray-500">당월 조퇴 없음</p>
        </div>
      </div>
    </div>
  );
}
