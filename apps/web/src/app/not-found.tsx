/**
 * Description : not-found.tsx - 📌 Agape-Care 404 페이지
 * Author : Shiwoo Min
 * Date : 2026-02-01
 */

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#f4f8f3] to-[#e8efe6] px-6">
      <div className="w-full max-w-xl rounded-3xl bg-white/70 p-12 text-center shadow-xl backdrop-blur-md">

        {/* 404 타이틀 */}
        <h1 className="text-7xl font-extrabold tracking-tight text-[#5C8D5A]">
          404
        </h1>

        {/* 메시지 */}
        <p className="mt-6 text-lg font-medium text-gray-700">
          요청하신 페이지를 찾을 수 없습니다.
        </p>

        <p className="mt-2 text-sm text-gray-500">
          주소가 변경되었거나 삭제되었을 수 있습니다.
        </p>

        {/* 버튼 */}
        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center rounded-xl bg-[#5C8D5A] px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#4A7548] hover:shadow-lg"
          >
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}

