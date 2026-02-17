'use client';

import { useState } from 'react';

interface Props {
  staff: any;
}

export default function ManagementTab({ staff }: Props) {
  if (!staff) return null;

  const [selectedCategory, setSelectedCategory] = useState('근로계약서');

  const categories = [
    '근로계약서',
    '자기정보동의서',
    '개인정보활용동의서',
    '건강검진서',
    '범죄경력조회서',
    '인사발령서',
    '상벌기록',
    '교육이수증',
    '기타서류',
  ];

  const documents = [
    {
      id: '1',
      category: '근로계약서',
      name: '2025년도 근로계약서',
      uploadDate: '2025.12.01',
      uploader: '인사담당자',
      size: '1.2MB',
      status: '최신',
    },
  ];

  return (
    <div className="space-y-4">
      {/* 서류 카테고리 */}
      <div className="rounded border border-gray-300 bg-white">
        <div className="border-b border-gray-300 bg-gray-50 px-3 py-2">
          <h4 className="text-xs font-bold text-gray-900">서류 분류</h4>
        </div>
        <div className="flex flex-wrap gap-2 p-3">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`rounded px-3 py-1.5 text-xs font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-teal-500 text-white'
                  : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* 서류 업로드 */}
      <div className="rounded border border-gray-300 bg-white">
        <div className="flex items-center justify-between border-b border-gray-300 bg-gray-50 px-3 py-2">
          <h4 className="text-xs font-bold text-gray-900">서류 업로드</h4>
          <span className="text-[10px] text-gray-500">선택된 분류: {selectedCategory}</span>
        </div>
        <div className="p-4">
          <div className="space-y-3">
            <div>
              <label className="mb-1 block text-[10px] font-medium text-gray-700">
                서류명 <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                placeholder="예: 2025년도 근로계약서"
                className="w-full rounded border border-gray-300 px-2 py-1.5 text-xs focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-[10px] font-medium text-gray-700">
                파일 첨부 <span className="text-red-600">*</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  className="flex-1 rounded border border-gray-300 px-2 py-1.5 text-xs file:mr-2 file:rounded file:border-0 file:bg-blue-50 file:px-2 file:py-1 file:text-[10px] file:font-medium file:text-blue-600 hover:file:bg-blue-100"
                />
                <button className="rounded bg-blue-500 px-4 py-1.5 text-xs font-medium text-white hover:bg-blue-600">
                  업로드
                </button>
              </div>
              <p className="mt-1 text-[10px] text-gray-500">지원 형식: PDF, JPG, PNG, DOC, DOCX (최대 10MB)</p>
            </div>
            <div>
              <label className="mb-1 block text-[10px] font-medium text-gray-700">비고</label>
              <textarea
                rows={2}
                placeholder="서류 관련 특이사항"
                className="w-full resize-none rounded border border-gray-300 px-2 py-1.5 text-xs focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 서류 목록 */}
      <div className="rounded border border-gray-300 bg-white">
        <div className="flex items-center justify-between border-b border-gray-300 bg-gray-50 px-3 py-2">
          <h4 className="text-xs font-bold text-gray-900">등록된 서류 ({selectedCategory})</h4>
          <button className="rounded border border-gray-300 bg-white px-2 py-1 text-[10px] font-medium text-gray-700 hover:bg-gray-100">
            전체 다운로드
          </button>
        </div>
        <div className="p-3">
          <table className="w-full text-xs">
            <thead className="bg-gray-50 text-[10px]">
              <tr className="border-b border-gray-300">
                <th className="border-r border-gray-300 px-2 py-1.5 text-center font-medium">번호</th>
                <th className="border-r border-gray-300 px-3 py-1.5 text-left font-medium">서류명</th>
                <th className="border-r border-gray-300 px-2 py-1.5 text-center font-medium">업로드일</th>
                <th className="border-r border-gray-300 px-2 py-1.5 text-left font-medium">업로드자</th>
                <th className="border-r border-gray-300 px-2 py-1.5 text-center font-medium">파일크기</th>
                <th className="border-r border-gray-300 px-2 py-1.5 text-center font-medium">상태</th>
                <th className="px-2 py-1.5 text-center font-medium">관리</th>
              </tr>
            </thead>
            <tbody>
              {documents.filter(doc => doc.category === selectedCategory).length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-3 py-12 text-center text-gray-400">
                    <i className="ri-file-text-line mb-2 block text-4xl text-gray-300"></i>
                    <p className="text-xs">등록된 {selectedCategory} 서류가 없습니다</p>
                  </td>
                </tr>
              ) : (
                documents
                  .filter(doc => doc.category === selectedCategory)
                  .map((doc, index) => (
                    <tr key={doc.id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="border-r border-gray-200 px-2 py-2 text-center">{index + 1}</td>
                      <td className="border-r border-gray-200 px-3 py-2 font-medium">{doc.name}</td>
                      <td className="border-r border-gray-200 px-2 py-2 text-center font-mono text-[11px]">
                        {doc.uploadDate}
                      </td>
                      <td className="border-r border-gray-200 px-2 py-2">{doc.uploader}</td>
                      <td className="border-r border-gray-200 px-2 py-2 text-center font-mono text-[11px]">
                        {doc.size}
                      </td>
                      <td className="border-r border-gray-200 px-2 py-2 text-center">
                        <span className="rounded bg-blue-100 px-2 py-0.5 text-[10px] font-medium text-blue-700">
                          {doc.status}
                        </span>
                      </td>
                      <td className="px-2 py-2 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <button className="rounded border border-green-500 bg-green-50 px-2 py-0.5 text-[10px] text-green-600 hover:bg-green-100">
                            <i className="ri-download-line"></i>
                          </button>
                          <button className="rounded border border-blue-500 bg-blue-50 px-2 py-0.5 text-[10px] text-blue-600 hover:bg-blue-100">
                            <i className="ri-eye-line"></i>
                          </button>
                          <button className="rounded border border-red-500 bg-red-50 px-2 py-0.5 text-[10px] text-red-600 hover:bg-red-100">
                            <i className="ri-delete-bin-line"></i>
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

      {/* 서류 관리 안내 */}
      <div className="rounded border border-blue-200 bg-blue-50 p-3">
        <div className="flex gap-2">
          <i className="ri-information-line text-lg text-blue-600"></i>
          <div className="flex-1 text-xs text-blue-900">
            <p className="mb-1 font-bold">서류 관리 안내</p>
            <ul className="list-inside list-disc space-y-0.5 text-[11px]">
              <li>근로계약서는 입사 시 필수로 등록해야 합니다.</li>
              <li>개인정보 관련 서류는 법정 보관기간(3년) 동안 안전하게 보관됩니다.</li>
              <li>서류는 암호화되어 저장되며, 권한이 있는 관리자만 열람 가능합니다.</li>
              <li>만료된 서류는 자동으로 알림이 발송됩니다.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
