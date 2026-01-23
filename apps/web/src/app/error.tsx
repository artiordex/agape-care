'use client';

import { useEffect } from 'react';
import Link from 'next/link';

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-red-50 px-4">
      <div className="max-w-md rounded-xl bg-white p-8 shadow-md">
        <h1 className="text-2xl font-bold text-red-600">문제가 발생했습니다</h1>

        {error.digest && <p className="mt-2 text-sm text-gray-500">에러 코드: {error.digest}</p>}

        <div className="mt-6 space-y-3">
          <button
            onClick={reset}
            className="w-full rounded bg-red-600 px-4 py-2 text-white transition hover:bg-red-700"
          >
            다시 시도
          </button>

          <Link
            href="/"
            className="block w-full rounded bg-gray-100 px-4 py-2 text-center transition hover:bg-gray-200"
          >
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}
