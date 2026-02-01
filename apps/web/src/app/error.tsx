/**
 * Description : error.tsx - 📌 Agape-Care 500 페이지
 * Author : Shiwoo Min
 * Date : 2026-02-01
 */

'use client';

import Link from 'next/link';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#f4f8f3] to-[#e8efe6] px-6">
      <div className="w-full max-w-xl rounded-3xl bg-white/70 p-12 text-center shadow-xl backdrop-blur-md">
        {/* 500 타이틀 */}
        <h1 className="text-7xl font-extrabold tracking-tight text-[#5C8D5A]">500</h1>

        {/* 메시지 */}
        <p className="mt-6 text-lg font-medium text-gray-700">시스템에 문제가 발생했습니다.</p>

        <p className="mt-2 text-sm text-gray-500">
          일시적인 오류일 수 있습니다.
          <br />
          잠시 후 다시 시도해주세요.
        </p>

        {/* 버튼 영역 */}
        <div className="mt-8 flex justify-center gap-4">
          <button
            onClick={() => reset()}
            className="inline-flex items-center rounded-xl bg-[#5C8D5A] px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#4A7548] hover:shadow-lg"
          >
            다시 시도
          </button>

          <Link
            href="/"
            className="inline-flex items-center rounded-xl border border-[#5C8D5A] px-6 py-3 text-sm font-semibold text-[#5C8D5A] transition-all duration-300 hover:bg-[#5C8D5A] hover:text-white"
          >
            홈으로 이동
          </Link>
        </div>
      </div>
    </div>
  );
}
