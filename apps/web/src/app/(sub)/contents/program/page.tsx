'use client';

import { api } from '@/lib/api';
import ProgramList from './ProgramList';

export default function ProgramPage() {
  const { data, isLoading } = api.webpage.getPrograms.useQuery(['programs'], {
    query: {
      page: 1,
      limit: 100,
      isActive: true,
    },
  });

  return (
    <main className="min-h-screen bg-transparent pb-20">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-10 text-center">
          <h1 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">프로그램 안내</h1>
          <p className="text-lg text-gray-600">어르신들의 활기찬 일상을 위한 다양한 프로그램을 소개합니다.</p>
        </header>

        <section className="mx-auto max-w-7xl">
          <ProgramList programs={data?.status === 200 ? data.body.items : []} isLoading={isLoading} />
        </section>
      </div>
    </main>
  );
}
