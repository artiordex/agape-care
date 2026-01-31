'use client';

export default function VitalSignsTab({ record, onChange }: any) {
  return (
    <div className="space-y-4 text-[11px]">
      {/* 1. 바이탈 기록 */}
      <div className="border border-blue-400">
        <div className="flex items-center justify-between border-b border-blue-400 bg-white px-2 py-1">
          <div className="flex items-center gap-1 font-bold text-blue-900">
            <i className="ri-play-fill text-[10px]"></i> 바이탈 기록
          </div>
          <div className="flex gap-1">
            <button className="rounded-sm border border-blue-800 bg-gray-500 px-2 py-0.5 text-white">
              혈압,맥박,체온&건강관리기록전일자료조회
            </button>
            <button className="rounded-sm border border-blue-800 bg-gray-500 px-2 py-0.5 text-white">
              최근바이탈현황조회
            </button>
          </div>
        </div>
        <div className="flex">
          <table className="w-[65%] border-collapse border-r border-blue-400">
            <thead className="bg-blue-50">
              <tr className="border-b border-blue-400">
                <th className="border-r border-blue-400 p-1">회차</th>
                <th className="border-r border-blue-400 p-1">시간(필요시)</th>
                <th className="border-r border-blue-400 p-1">혈압(mmHg)</th>
                <th className="border-r border-blue-400 p-1">맥박(회/분)</th>
                <th className="border-r border-blue-400 p-1">체온(℃)</th>
                <th className="border-r border-blue-400 p-1">호흡(회/분)</th>
                <th className="border-r border-blue-400 p-1">혈당(mg/dL)</th>
                <th className="p-1">체중(kg)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border-r border-blue-400 bg-blue-50 p-1 text-center">1회</td>
                <td className="border-r border-blue-400 p-1">
                  <input type="text" className="w-full border p-1 text-center" defaultValue=":" />
                </td>
                <td className="flex gap-0.5 border-r border-blue-400 p-1">
                  <input type="text" className="w-1/2 border p-1" />
                  <span className="self-center">/</span>
                  <input type="text" className="w-1/2 border p-1" />
                </td>
                <td className="border-r border-blue-400 p-1">
                  <input type="text" className="w-full border p-1" />
                </td>
                <td className="border-r border-blue-400 p-1">
                  <input type="text" className="w-full border p-1" />
                </td>
                <td className="border-r border-blue-400 p-1">
                  <input type="text" className="w-full border p-1" />
                </td>
                <td className="border-r border-blue-400 p-1">
                  <input type="text" className="w-full border p-1" />
                </td>
                <td className="p-1">
                  <input type="text" className="w-full border p-1" />
                </td>
              </tr>
            </tbody>
          </table>
          <div className="flex-1 bg-white p-2">
            <div className="mb-1 flex items-center gap-1 font-bold text-blue-900">
              <i className="ri-play-fill text-[10px]"></i> 건강관리기록{' '}
              <span className="text-[9px] font-normal text-blue-600">(필요시 계약의사에게 제공)</span>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 border p-2">
              <RadioGroup label="문제" options={['유', '무']} defaultVal="무" />
              <RadioGroup label="낙상" options={['유', '무']} defaultVal="무" />
              <RadioGroup label="탈수" options={['의심', '없음']} defaultVal="없음" />
              <RadioGroup label="욕창" options={['유', '무 ( 부위 :      )']} defaultVal="무" />
              <RadioGroup label="섬망" options={['의심', '없음']} defaultVal="없음" />
              <RadioGroup label="통증" options={['강', '중', '약', '없음']} defaultVal="없음" />
            </div>
          </div>
        </div>
      </div>

      {/* 2. 간호일지 입력부 */}
      <div className="border border-blue-400">
        <div className="flex items-center justify-between border-b border-blue-400 bg-white px-2 py-1">
          <div className="flex items-center gap-1 font-bold text-blue-900">
            <i className="ri-play-fill text-[10px]"></i> 간호일지
          </div>
          <div className="flex gap-1">
            <button className="rounded-sm bg-gray-500 px-2 py-0.5 text-white">전일 자료 조회</button>
            <button className="rounded-sm bg-gray-500 px-2 py-0.5 text-white">최근 식사 현황 조회</button>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-2 border-b border-blue-400 p-2">
          <div className="col-span-5 space-y-2 border-r border-blue-200 pr-2">
            <div className="flex items-center gap-2">
              <span className="border border-blue-300 bg-blue-100 p-1 font-bold">
                건강관리 <i className="ri-question-line"></i>
              </span>
              <input type="text" className="w-12 border p-1" />{' '}
              <span>
                (급여계획 <input type="text" className="w-10 border p-1" /> 분)
              </span>
              <i className="ri-save-line text-blue-600"></i>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between font-bold">
                <span>특이사항</span>
                <button className="rounded-sm bg-blue-600 px-2 py-0.5 text-[10px] text-white">특이사항 불러오기</button>
              </div>
              <textarea
                className="h-24 w-full border p-1"
                placeholder="(급여기록지 특이사항) ※ 50자 초과시 별지첨부"
              ></textarea>
            </div>
          </div>
          <div className="col-span-4 space-y-2 border-r border-blue-200 pr-2">
            <div className="flex items-center gap-2">
              <span className="border border-blue-300 bg-blue-100 p-1 font-bold">
                간호관리 <i className="ri-question-line"></i>
              </span>
              <input type="text" className="w-12 border p-1" />{' '}
              <span>
                (급여계획 <input type="text" className="w-10 border p-1" /> 분)
              </span>
              <i className="ri-save-line text-blue-600"></i>
            </div>
            <textarea
              className="h-32 w-full border p-1"
              placeholder="(내부관리용) ※급여기록지에 표기되지 않으며, 필요시만 작성"
            ></textarea>
          </div>
          <div className="col-span-3 space-y-2">
            <div className="flex items-center gap-2">
              <span className="font-bold">
                작성자<span className="text-red-600">*</span>
              </span>
              <input type="text" className="flex-1 border p-1" defaultValue="개드립진짜" />
              <button className="rounded-sm bg-blue-700 px-2 py-1 text-white">선택</button>
            </div>
            <div className="mt-8 h-24 border p-2">{/* 작성 내용 상단 영역 */}</div>
          </div>
        </div>
        <div className="flex gap-2 p-2">
          <div className="flex w-[42%] flex-col gap-1">
            <div className="border bg-blue-50 p-2 text-center font-bold">간호처치 내용</div>
            <select className="h-24 w-full border p-1" multiple>
              <option>호흡기간호(가습기), 피부간호...</option>
            </select>
          </div>
          <div className="flex flex-1 flex-col gap-1">
            <div className="border bg-blue-50 p-2 text-center font-bold">상세처치내역</div>
            <textarea className="h-24 w-full border p-1"></textarea>
          </div>
        </div>
      </div>
    </div>
  );
}

function RadioGroup({ label, options, defaultVal }: any) {
  return (
    <div className="flex items-center gap-2">
      <span className="w-8 font-bold">{label}</span>
      <div className="flex gap-2">
        {options.map((opt: string) => (
          <label key={opt} className="flex items-center gap-1">
            <input type="radio" checked={opt === defaultVal} readOnly className="h-3 w-3" />
            <span>{opt}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
