'use client';

import clsx from 'clsx';
import { useState } from 'react';

/**
 * [Page] 전체 기초평가 현황 (ResidentInitial)
 * 신규 입소 어르신의 낙상, 욕창, 인지, 욕구사정 등 초기 평가 상태 관리
 */
export default function ResidentInitialPage() {
  const [activeFilter, setActiveFilter] = useState('전체');

  const evaluations = [
    {
      id: 1,
      name: '김순옥',
      gender: '여',
      age: 85,
      room: '101호',
      fall: '고위험',
      bedsore: '저위험',
      cognitive: '중증',
      status: '평가완료',
    },
    {
      id: 2,
      name: '이철수',
      gender: '남',
      age: 79,
      room: '102호',
      fall: '중위험',
      bedsore: '정상',
      cognitive: '경증',
      status: '진행중',
    },
    {
      id: 3,
      name: '박정자',
      gender: '여',
      age: 92,
      room: '201호',
      fall: '고위험',
      bedsore: '고위험',
      cognitive: '와상',
      status: '미작성',
    },
    {
      id: 4,
      name: '최영호',
      gender: '남',
      age: 82,
      room: '202호',
      fall: '정상',
      bedsore: '정상',
      cognitive: '정상',
      status: '평가완료',
    },
    {
      id: 5,
      name: '한순자',
      gender: '여',
      age: 88,
      room: '301호',
      fall: '중위험',
      bedsore: '저위험',
      cognitive: '중증',
      status: '평가완료',
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-[#f8fafc] p-6 font-sans">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-black tracking-tight text-gray-800">
            <i className="ri-shield-user-line text-[#5C8D5A]"></i> 전체 기초평가 현황
          </h1>
          <p className="mt-1 text-sm font-medium text-gray-500">
            입소 어르신의 4대 기초평가 및 욕구사정 진행 상태를 관리합니다.
          </p>
        </div>
        <div className="flex gap-2">
          <button className="rounded border border-gray-300 bg-white px-4 py-2 text-xs font-bold text-gray-600 shadow-sm hover:border-[#5C8D5A]">
            엑셀 다운로드
          </button>
          <button className="rounded bg-[#5C8D5A] px-5 py-2 text-xs font-bold text-white shadow-lg transition-all hover:bg-[#4A7548]">
            신규 평가 등록
          </button>
        </div>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-4">
        {[
          { label: '전체 대상', value: 45, color: 'text-gray-700' },
          { label: '평가 완료', value: 38, color: 'text-[#5C8D5A]' },
          { label: '진행 중', value: 4, color: 'text-blue-600' },
          { label: '미작성', value: 3, color: 'text-red-500' },
        ].map(stat => (
          <div key={stat.label} className="rounded border border-gray-200 bg-white p-5 shadow-sm">
            <p className="mb-1 text-[10px] font-black uppercase tracking-widest text-gray-400">{stat.label}</p>
            <p className={clsx('text-2xl font-black', stat.color)}>
              {stat.value}
              <span className="ml-1 text-xs font-bold text-gray-300">명</span>
            </p>
          </div>
        ))}
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-xl">
        <table className="w-full border-collapse text-left">
          <thead className="border-b border-gray-200 bg-[#f1f5f9]">
            <tr>
              <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">성함/정보</th>
              <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">낙상위험</th>
              <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">욕창위험</th>
              <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">인지상태</th>
              <th className="px-6 py-4 text-center text-[10px] font-bold uppercase tracking-widest text-gray-500">
                진행 상태
              </th>
              <th className="px-6 py-4 text-right text-[10px] font-bold uppercase tracking-widest text-gray-500">
                관리
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {evaluations.map(doc => (
              <tr key={doc.id} className="transition-colors hover:bg-blue-50/30">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-gray-100 text-[10px] font-black text-gray-400">
                      {doc.name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-black text-gray-700">
                        {doc.name}{' '}
                        <span className="text-[10px] font-normal text-gray-400">
                          ({doc.gender}/{doc.age})
                        </span>
                      </p>
                      <p className="text-[10px] font-bold text-[#5C8D5A]">{doc.room}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={clsx(
                      'rounded border px-2 py-0.5 text-[10px] font-bold',
                      doc.fall === '고위험'
                        ? 'border-red-100 bg-red-50 text-red-600'
                        : 'border-gray-100 bg-gray-50 text-gray-500',
                    )}
                  >
                    낙상: {doc.fall}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={clsx(
                      'rounded border px-2 py-0.5 text-[10px] font-bold',
                      doc.bedsore === '고위험'
                        ? 'border-orange-100 bg-orange-50 text-orange-600'
                        : 'border-gray-100 bg-gray-50 text-gray-500',
                    )}
                  >
                    욕창: {doc.bedsore}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="rounded border border-blue-100 bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-600">
                    {doc.cognitive}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span
                    className={clsx(
                      'rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-tighter shadow-sm',
                      doc.status === '평가완료'
                        ? 'border border-emerald-100 bg-emerald-50 text-emerald-600'
                        : doc.status === '진행중'
                          ? 'border border-blue-100 bg-blue-50 text-blue-600'
                          : 'border border-gray-100 bg-gray-50 text-gray-400',
                    )}
                  >
                    {doc.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-gray-300 transition-colors hover:text-[#5C8D5A]">
                    <i className="ri-external-link-line text-lg"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
