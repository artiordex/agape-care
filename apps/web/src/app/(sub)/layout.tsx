'use client';

import Breadcrumb from '@/components/Breadcrumb';
import HeroSection from '@/components/HeroSection';
import breadcrumbData from '@/data/breadcrumb.json';
import heroData from '@/data/hero.json';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

export default function SubLayout({ children }: Readonly<{ children: ReactNode }>) {
  const pathname = usePathname();

  const getPageData = () => {
    const segments = pathname?.split('/').filter(Boolean) || [];

    const section = segments[0] as keyof typeof heroData;
    const sub = segments[1];

    if (!section || !heroData[section]) {
      return null;
    }

    const sectionHero = heroData[section] as Record<string, { title: string; description: string; image: string }>;
    const sectionBread = breadcrumbData[section] as Record<string, { label: string; href?: string }[]> | undefined;

    if (sub && sectionHero[sub]) {
      return {
        title: sectionHero[sub].title,
        description: sectionHero[sub].description,
        image: sectionHero[sub].image,
        breadcrumb: sectionBread?.[sub],
      };
    }

    if (sectionHero.main) {
      return {
        title: sectionHero.main.title,
        description: sectionHero.main.description,
        image: sectionHero.main.image,
        breadcrumb: sectionBread?.main,
      };
    }

    return null;
  };

  const hero = getPageData();

  return (
    <>
      {/* 히어로 */}
      {hero && <HeroSection title={hero.title} description={hero.description} image={hero.image} />}

      <div className="mx-auto max-w-7xl px-4 py-10">
        {/* 브레드스크럼 */}
        {hero?.breadcrumb && <Breadcrumb items={hero.breadcrumb} />}
        {children}
      </div>
    </>
  );
}
