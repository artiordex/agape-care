const DOCUMENTS = [
  { id: 1, name: '장기요양인정서', category: '필수서류', uploadDate: '2023-01-10', status: '등록완료', size: '2.4 MB' },
  { id: 2, name: '이용계약서', category: '필수서류', uploadDate: '2023-01-10', status: '등록완료', size: '1.8 MB' },
  { id: 3, name: '개인정보동의서', category: '필수서류', uploadDate: '2023-01-10', status: '등록완료', size: '1.2 MB' },
  { id: 4, name: '신분증 사본', category: '신분증명', uploadDate: '2023-01-10', status: '등록완료', size: '0.8 MB' },
  { id: 5, name: '건강진단서', category: '건강서류', uploadDate: '2023-01-15', status: '등록완료', size: '3.1 MB' },
  { id: 6, name: '진료기록부', category: '건강서류', uploadDate: '2023-02-20', status: '등록완료', size: '4.5 MB' },
];

export default function DocumentsTab() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-gray-900">서류 관리</h3>
        <button className="flex items-center gap-1.5 rounded border border-blue-600 bg-blue-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-blue-700">
          <i className="ri-upload-line text-base"></i>
          서류 업로드
        </button>
      </div>

      {/* 카테고리 필터 */}
      <div className="flex gap-2">
        {['전체', '필수서류', '신분증명', '건강서류', '기타'].map(category => (
          <button
            key={category}
            className="rounded border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            {category}
          </button>
        ))}
      </div>

      {/* 서류 목록 */}
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
        <table className="w-full">
          <thead className="border-b border-gray-200 bg-gray-50">
            <tr>
              <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-700">서류명</th>
              <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-700">분류</th>
              <th className="px-4 py-2.5 text-center text-xs font-semibold text-gray-700">업로드일</th>
              <th className="px-4 py-2.5 text-center text-xs font-semibold text-gray-700">파일크기</th>
              <th className="px-4 py-2.5 text-center text-xs font-semibold text-gray-700">상태</th>
              <th className="px-4 py-2.5 text-center text-xs font-semibold text-gray-700">관리</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {DOCUMENTS.map(doc => (
              <tr key={doc.id} className="transition-colors hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded bg-blue-50">
                      <i className="ri-file-text-line text-blue-600"></i>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{doc.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="rounded bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-700">
                    {doc.category}
                  </span>
                </td>
                <td className="px-4 py-3 text-center text-sm text-gray-700">{doc.uploadDate}</td>
                <td className="px-4 py-3 text-center text-sm text-gray-600">{doc.size}</td>
                <td className="px-4 py-3 text-center">
                  <span className="rounded bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700">
                    {doc.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-center gap-2">
                    <button className="text-blue-600 transition-colors hover:text-blue-700" title="다운로드">
                      <i className="ri-download-line text-base"></i>
                    </button>
                    <button className="text-gray-400 transition-colors hover:text-gray-600" title="더보기">
                      <i className="ri-more-2-fill text-base"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 통계 */}
      <div className="grid grid-cols-4 gap-3">
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <p className="mb-1 text-xs text-gray-600">전체 서류</p>
          <p className="text-xl font-bold text-gray-900">6건</p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <p className="mb-1 text-xs text-gray-600">필수서류</p>
          <p className="text-xl font-bold text-blue-700">3건</p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <p className="mb-1 text-xs text-gray-600">등록완료</p>
          <p className="text-xl font-bold text-green-700">6건</p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <p className="mb-1 text-xs text-gray-600">미등록</p>
          <p className="text-xl font-bold text-red-700">0건</p>
        </div>
      </div>
    </div>
  );
}
