'use client';

interface Props {
  staff: any;
}

export default function CertificateTab({ staff }: Props) {
  if (!staff) return null;

  const certificates = [
    {
      id: '1',
      name: '사회복지사 1급',
      number: '2024-1234567',
      issueDate: '2024.03.15',
      issuer: '보건복지부',
      expiryDate: null,
      status: '유효',
    },
  ];

  return (
    <div className="space-y-4">
      {/* 자격증 등록 */}
      <div className="rounded border border-gray-300 bg-white">
        <div className="flex items-center justify-between border-b border-gray-300 bg-gray-50 px-3 py-2">
          <h4 className="text-xs font-bold text-gray-900">자격증 정보 등록</h4>
          <button className="rounded bg-teal-500 px-3 py-1 text-[10px] font-medium text-white hover:bg-teal-600">
            신규 자격증 추가
          </button>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <label className="mb-1 block text-[10px] font-medium text-gray-700">
                자격증명 <span className="text-red-600">*</span>
              </label>
              <select className="w-full rounded border border-gray-300 px-2 py-1.5 text-xs focus:border-blue-500 focus:outline-none">
                <option value="">선택하세요</option>
                <option value="사회복지사1급">사회복지사 1급</option>
                <option value="사회복지사2급">사회복지사 2급</option>
                <option value="요양보호사">요양보호사</option>
                <option value="간호사">간호사</option>
                <option value="물리치료사">물리치료사</option>
                <option value="작업치료사">작업치료사</option>
                <option value="영양사">영양사</option>
                <option value="조리사">조리사</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-[10px] font-medium text-gray-700">
                자격증 번호 <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                placeholder="예: 2024-1234567"
                className="w-full rounded border border-gray-300 px-2 py-1.5 text-xs focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-[10px] font-medium text-gray-700">
                발급일 <span className="text-red-600">*</span>
              </label>
              <input
                type="date"
                className="w-full rounded border border-gray-300 px-2 py-1.5 text-xs focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-[10px] font-medium text-gray-700">
                발급기관 <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                placeholder="예: 보건복지부"
                className="w-full rounded border border-gray-300 px-2 py-1.5 text-xs focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-[10px] font-medium text-gray-700">유효기간</label>
              <input
                type="date"
                className="w-full rounded border border-gray-300 px-2 py-1.5 text-xs focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-[10px] font-medium text-gray-700">상태</label>
              <select className="w-full rounded border border-gray-300 px-2 py-1.5 text-xs focus:border-blue-500 focus:outline-none">
                <option value="유효">유효</option>
                <option value="만료">만료</option>
                <option value="정지">정지</option>
              </select>
            </div>
            <div className="col-span-2">
              <label className="mb-1 block text-[10px] font-medium text-gray-700">비고</label>
              <textarea
                rows={2}
                placeholder="자격증 관련 특이사항"
                className="w-full resize-none rounded border border-gray-300 px-2 py-1.5 text-xs focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>
          <div className="mt-3 flex justify-end gap-2">
            <button className="rounded border border-gray-300 bg-white px-4 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-100">
              취소
            </button>
            <button className="rounded bg-blue-500 px-4 py-1.5 text-xs font-medium text-white hover:bg-blue-600">
              등록
            </button>
          </div>
        </div>
      </div>

      {/* 보유 자격증 목록 */}
      <div className="rounded border border-gray-300 bg-white">
        <div className="border-b border-gray-300 bg-gray-50 px-3 py-2">
          <h4 className="text-xs font-bold text-gray-900">보유 자격증 목록</h4>
        </div>
        <div className="p-3">
          <table className="w-full text-xs">
            <thead className="bg-gray-50 text-[10px]">
              <tr className="border-b border-gray-300">
                <th className="border-r border-gray-300 px-2 py-1.5 text-center font-medium">번호</th>
                <th className="border-r border-gray-300 px-3 py-1.5 text-left font-medium">자격증명</th>
                <th className="border-r border-gray-300 px-3 py-1.5 text-center font-medium">자격증 번호</th>
                <th className="border-r border-gray-300 px-2 py-1.5 text-center font-medium">발급일</th>
                <th className="border-r border-gray-300 px-3 py-1.5 text-left font-medium">발급기관</th>
                <th className="border-r border-gray-300 px-2 py-1.5 text-center font-medium">유효기간</th>
                <th className="border-r border-gray-300 px-2 py-1.5 text-center font-medium">상태</th>
                <th className="px-2 py-1.5 text-center font-medium">관리</th>
              </tr>
            </thead>
            <tbody>
              {certificates.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-3 py-12 text-center text-gray-400">
                    <i className="ri-award-line mb-2 block text-4xl text-gray-300"></i>
                    <p className="text-xs">등록된 자격증이 없습니다</p>
                  </td>
                </tr>
              ) : (
                certificates.map((cert, index) => (
                  <tr key={cert.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="border-r border-gray-200 px-2 py-2 text-center">{index + 1}</td>
                    <td className="border-r border-gray-200 px-3 py-2 font-medium">{cert.name}</td>
                    <td className="border-r border-gray-200 px-3 py-2 text-center font-mono text-[11px]">
                      {cert.number}
                    </td>
                    <td className="border-r border-gray-200 px-2 py-2 text-center font-mono text-[11px]">
                      {cert.issueDate}
                    </td>
                    <td className="border-r border-gray-200 px-3 py-2">{cert.issuer}</td>
                    <td className="border-r border-gray-200 px-2 py-2 text-center font-mono text-[11px]">
                      {cert.expiryDate || '무기한'}
                    </td>
                    <td className="border-r border-gray-200 px-2 py-2 text-center">
                      <span className="rounded bg-green-100 px-2 py-0.5 text-[10px] font-medium text-green-700">
                        {cert.status}
                      </span>
                    </td>
                    <td className="px-2 py-2 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <button className="rounded border border-blue-500 bg-blue-50 px-2 py-0.5 text-[10px] text-blue-600 hover:bg-blue-100">
                          수정
                        </button>
                        <button className="rounded border border-red-500 bg-red-50 px-2 py-0.5 text-[10px] text-red-600 hover:bg-red-100">
                          삭제
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 자격증 갱신 안내 */}
      <div className="rounded border border-orange-200 bg-orange-50 p-3">
        <div className="flex gap-2">
          <i className="ri-information-line text-lg text-orange-600"></i>
          <div className="flex-1 text-xs text-orange-900">
            <p className="mb-1 font-bold">자격증 갱신 안내</p>
            <ul className="list-inside list-disc space-y-0.5 text-[11px]">
              <li>요양보호사 자격증은 갱신 없이 평생 유효합니다.</li>
              <li>사회복지사 자격증은 보수교육 이수가 필요할 수 있습니다.</li>
              <li>간호사 및 의료 관련 자격증은 정기적인 보수교육이 필수입니다.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
