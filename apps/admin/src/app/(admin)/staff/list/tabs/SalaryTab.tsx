'use client';

interface Props {
  staff: any;
}

export default function SalaryTab({ staff }: Props) {
  if (!staff) return null;

  const salaryData = {
    baseSalary: 2500000,
    positionAllowance: 200000,
    mealAllowance: 100000,
    overtimePay: 0,
    nationalPension: 112500,
    healthInsurance: 98750,
    employmentInsurance: 22500,
    incomeTax: 57890,
  };

  const totalPay =
    salaryData.baseSalary + salaryData.positionAllowance + salaryData.mealAllowance + salaryData.overtimePay;
  const totalDeduction =
    salaryData.nationalPension + salaryData.healthInsurance + salaryData.employmentInsurance + salaryData.incomeTax;
  const netPay = totalPay - totalDeduction;

  return (
    <div className="space-y-4">
      {/* 급여 조회 기간 */}
      <div className="flex items-center gap-2 rounded border border-gray-300 bg-white p-3">
        <label className="text-xs font-medium text-gray-700">급여 조회 기간:</label>
        <input
          type="month"
          defaultValue={new Date().toISOString().slice(0, 7)}
          className="rounded border border-gray-300 px-2 py-1 text-xs"
        />
        <button className="rounded bg-blue-500 px-4 py-1 text-xs font-medium text-white hover:bg-blue-600">조회</button>
      </div>

      {/* 급여 명세 */}
      <div className="grid grid-cols-2 gap-4">
        {/* 지급 항목 */}
        <div className="rounded border border-gray-300 bg-white">
          <div className="border-b border-gray-300 bg-green-50 px-3 py-2">
            <h4 className="text-xs font-bold text-green-700">지급 항목</h4>
          </div>
          <div className="p-3">
            <table className="w-full text-xs">
              <thead className="border-b border-gray-200 bg-gray-50 text-[10px]">
                <tr>
                  <th className="px-3 py-1.5 text-left font-medium">항목</th>
                  <th className="px-3 py-1.5 text-right font-medium">금액</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="px-3 py-2">기본급</td>
                  <td className="px-3 py-2 text-right font-mono">{salaryData.baseSalary.toLocaleString()}원</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="px-3 py-2">직책수당</td>
                  <td className="px-3 py-2 text-right font-mono">{salaryData.positionAllowance.toLocaleString()}원</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="px-3 py-2">식대</td>
                  <td className="px-3 py-2 text-right font-mono">{salaryData.mealAllowance.toLocaleString()}원</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="px-3 py-2">연장근무수당</td>
                  <td className="px-3 py-2 text-right font-mono">{salaryData.overtimePay.toLocaleString()}원</td>
                </tr>
              </tbody>
              <tfoot className="border-t-2 border-gray-300 bg-green-50">
                <tr>
                  <td className="px-3 py-2 text-xs font-bold">지급 합계</td>
                  <td className="px-3 py-2 text-right text-sm font-black text-green-600">
                    {totalPay.toLocaleString()}원
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* 공제 항목 */}
        <div className="rounded border border-gray-300 bg-white">
          <div className="border-b border-gray-300 bg-red-50 px-3 py-2">
            <h4 className="text-xs font-bold text-red-700">공제 항목</h4>
          </div>
          <div className="p-3">
            <table className="w-full text-xs">
              <thead className="border-b border-gray-200 bg-gray-50 text-[10px]">
                <tr>
                  <th className="px-3 py-1.5 text-left font-medium">항목</th>
                  <th className="px-3 py-1.5 text-right font-medium">금액</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="px-3 py-2">국민연금 (4.5%)</td>
                  <td className="px-3 py-2 text-right font-mono">{salaryData.nationalPension.toLocaleString()}원</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="px-3 py-2">건강보험 (3.545%)</td>
                  <td className="px-3 py-2 text-right font-mono">{salaryData.healthInsurance.toLocaleString()}원</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="px-3 py-2">고용보험 (0.9%)</td>
                  <td className="px-3 py-2 text-right font-mono">
                    {salaryData.employmentInsurance.toLocaleString()}원
                  </td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="px-3 py-2">소득세</td>
                  <td className="px-3 py-2 text-right font-mono">{salaryData.incomeTax.toLocaleString()}원</td>
                </tr>
              </tbody>
              <tfoot className="border-t-2 border-gray-300 bg-red-50">
                <tr>
                  <td className="px-3 py-2 text-xs font-bold">공제 합계</td>
                  <td className="px-3 py-2 text-right text-sm font-black text-red-600">
                    {totalDeduction.toLocaleString()}원
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>

      {/* 실지급액 */}
      <div className="rounded border-2 border-blue-500 bg-blue-50 p-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-black text-blue-900">실지급액 (차인지급액)</h4>
          <div className="text-right">
            <div className="text-[10px] font-medium text-blue-700">
              {totalPay.toLocaleString()}원 - {totalDeduction.toLocaleString()}원
            </div>
            <div className="mt-1 font-mono text-2xl font-black text-blue-600">{netPay.toLocaleString()}원</div>
          </div>
        </div>
      </div>

      {/* 급여 이력 */}
      <div className="rounded border border-gray-300 bg-white">
        <div className="flex items-center justify-between border-b border-gray-300 bg-gray-50 px-3 py-2">
          <h4 className="text-xs font-bold text-gray-900">급여 지급 이력</h4>
          <button className="rounded bg-blue-500 px-3 py-1 text-[10px] font-medium text-white hover:bg-blue-600">
            급여명세서 출력
          </button>
        </div>
        <div className="p-3">
          <table className="w-full text-xs">
            <thead className="bg-gray-50 text-[10px]">
              <tr className="border-b border-gray-300">
                <th className="border-r border-gray-300 px-2 py-1.5 text-center font-medium">지급월</th>
                <th className="border-r border-gray-300 px-3 py-1.5 text-right font-medium">지급총액</th>
                <th className="border-r border-gray-300 px-3 py-1.5 text-right font-medium">공제총액</th>
                <th className="border-r border-gray-300 px-3 py-1.5 text-right font-medium">실지급액</th>
                <th className="px-2 py-1.5 text-center font-medium">지급일</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 3 }, (_, i) => {
                const month = 12 - i;
                return (
                  <tr key={i} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="border-r border-gray-200 px-2 py-2 text-center font-mono">2024.{month}</td>
                    <td className="border-r border-gray-200 px-3 py-2 text-right font-mono">
                      {totalPay.toLocaleString()}원
                    </td>
                    <td className="border-r border-gray-200 px-3 py-2 text-right font-mono">
                      {totalDeduction.toLocaleString()}원
                    </td>
                    <td className="border-r border-gray-200 px-3 py-2 text-right font-bold">
                      {netPay.toLocaleString()}원
                    </td>
                    <td className="px-2 py-2 text-center font-mono text-[11px]">2024.{month}.25</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
