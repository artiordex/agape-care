/**
 * Description : HeroSection.tsx - 📌 Agape-Care 메인 섹션 컴포넌트
 * Author : Shiwoo Min
 * Date : 2026-02-01
 */

'use client';

interface HeroProps {
  title: string;
  description?: string;
  image?: string;
}

export default function HeroSection({ title, description, image }: Readonly<HeroProps>) {
  return (
    <section
      className="relative flex items-center justify-center py-28 text-white"
      style={{
        backgroundImage: image ? `url(${image})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* 어둡게 덮는 오버레이 */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 text-center">
        {/* Title */}
        <h1 className="mb-4 text-4xl font-bold drop-shadow-lg sm:text-5xl">{title}</h1>

        {/* Description */}
        {description && (
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-white/90 drop-shadow">{description}</p>
        )}
      </div>
    </section>
  );
}
