/**
 * Description : layout.tsx - 📌 Agape-Care 서브 페이지 레이아웃
 * Author : Shiwoo Min
 * Date : 2026-02-01
 */

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

  // 이미지가 없는 경우 랜덤 기하학 패턴 이미지 생성
  const getFallbackImage = () => {
    // 브랜드 컬러 팔레트
    const colors = ['5C8D5A', '7CAF7A', '6B9A69', '8FBC8D', '5A8558', '4A7C48'];

    // pathname 기반 해시로 일관된 랜덤값 생성 (같은 페이지는 항상 같은 이미지)
    const hash = pathname?.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) || 0;

    // 색상과 seed 선택
    const colorIndex = hash % colors.length;
    const backgroundColor = colors[colorIndex];
    const seed = `agape-${hash}`;

    return `https://api.dicebear.com/7.x/shapes/svg?seed=${seed}&backgroundColor=${backgroundColor}`;
  };

  const heroImage = hero?.image || getFallbackImage();

  return (
    <>
      {/* 히어로 */}
      {hero && <HeroSection title={hero.title} description={hero.description} image={heroImage} />}
      {/* 브레드스크럼 */}
      {hero?.breadcrumb && <Breadcrumb items={hero.breadcrumb} />}
      {children}
    </>
  );
}
