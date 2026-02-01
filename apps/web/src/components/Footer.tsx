/**
 * Description : Footer.tsx - 📌 아가페 요양원 푸터 컴포넌트
 * Author : Shiwoo Min
 * Date : 2026-02-01
 */

'use client';

import footerData from '@/data/footer.json';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const Footer = () => {
  const { topLinks, branding, institutionInfo, addressInfo, copy } = footerData;
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [privacyContent, setPrivacyContent] = useState<string>('');

  // 모달이 열릴 때 public 폴더의 HTML 파일을 fetch
  useEffect(() => {
    if (isPrivacyModalOpen) {
      fetch('/policies/privacy.html')
        .then(res => {
          if (!res.ok) throw new Error('파일을 찾을 수 없습니다.');
          return res.text();
        })
        .then(data => setPrivacyContent(data))
        .catch(err => {
          console.error('HTML 로드 에러:', err);
          setPrivacyContent(
            '<p style="text-align:center; padding:50px;">정책 파일을 불러오는 중 오류가 발생했습니다.</p>',
          );
        });
    }
  }, [isPrivacyModalOpen]);

  return (
    <footer className="border-t border-[#E5E1D8] bg-[#F5F3EE] pb-[56px] font-['Pretendard'] lg:pb-12">
      {/* 웹 전용 푸터 */}
      <div className="hidden py-8 md:block">
        <div className="mx-auto flex w-[90%] max-w-[1600px] flex-col gap-6 px-4 sm:px-6 lg:px-8">
          <ul className="flex flex-wrap items-center text-sm text-gray-500">
            {topLinks.map((item, idx) => {
              const renderLink = () => {
                if (item.label === '개인정보 처리방침') {
                  return (
                    <button
                      onClick={() => setIsPrivacyModalOpen(true)}
                      className="cursor-pointer px-1 transition-colors hover:text-[#5C8D5A]"
                    >
                      {item.label}
                    </button>
                  );
                }

                if (item.href) {
                  return (
                    <Link href={item.href} className="cursor-pointer px-1 transition-colors hover:text-[#5C8D5A]">
                      {item.label}
                    </Link>
                  );
                }

                return <span className="px-1">{item.label}</span>;
              };

              return (
                <li key={item.label} className="flex items-center">
                  {renderLink()}
                  {idx < topLinks.length - 1 && <span className="px-3 text-gray-300">|</span>}
                </li>
              );
            })}
          </ul>

          <div className="mt-12 flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
            <div className="max-w-sm">
              <div className="mb-4 flex items-center gap-3">
                <Image src={branding.logo} alt={branding.alt} width={48} height={48} className="opacity-90" />
                <span className="text-lg font-bold tracking-tight text-gray-900">{branding.name}</span>
              </div>
              <p className="text-[13px] leading-relaxed text-gray-500">
                {branding.description.map((line, idx) => (
                  <span key={line}>
                    {line}
                    {idx < branding.description.length - 1 && <br />}
                  </span>
                ))}
              </p>
            </div>

            <div className="flex-1 text-[13px] leading-relaxed text-gray-500 md:text-right">
              <div className="space-y-1">
                <p>
                  대표자 : <span className="text-gray-700">{institutionInfo.ceo}</span> &nbsp;/&nbsp; 전화 :{' '}
                  <span className="text-gray-700">{institutionInfo.phone}</span> &nbsp;/&nbsp; 팩스 :{' '}
                  <span className="text-gray-700">{institutionInfo.fax}</span>
                </p>
                <p>
                  이메일 : <span className="text-gray-700">{institutionInfo.email}</span>
                </p>
                <p className="mt-2">
                  주소 : (우 {addressInfo.zipcode}) {addressInfo.address}
                  &nbsp;/&nbsp; 사업자등록번호 : {addressInfo.businessNumber}
                </p>
              </div>
              <p className="mt-6 text-[12px] font-medium uppercase tracking-wider text-gray-400">{copy}</p>
            </div>
            <BandIcon />
          </div>
        </div>
      </div>

      {/* 모바일 전용 로고 영역 */}
      <div className="flex h-[120px] items-center justify-center md:hidden">
        <div className="flex w-full max-w-[90%] items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src={branding.logo} alt={branding.alt} width={50} height={50} />
            <span className="text-base font-semibold text-gray-900">{branding.name}</span>
          </div>
          <BandIcon />
        </div>
      </div>

      {/* 외부 HTML 로드 모달 */}
      <AnimatePresence>
        {isPrivacyModalOpen && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsPrivacyModalOpen(false)}
              className="absolute inset-0 bg-gray-900/40 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 10 }}
              className="relative flex w-full max-w-4xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50/50 px-8 py-5">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-1 rounded-full bg-[#5C8D5A]" />
                  <h3 className="text-base font-bold text-gray-900">운영 정책 및 개인정보 처리방침</h3>
                </div>
                <button
                  onClick={() => setIsPrivacyModalOpen(false)}
                  className="group rounded-full p-2 transition-colors hover:bg-gray-200/50"
                >
                  <i className="ri-close-line text-2xl text-gray-400 group-hover:text-gray-700" />
                </button>
              </div>

              {/* 외부 HTML이 주입되는 영역 */}
              <div className="custom-scrollbar overflow-y-auto px-10 py-12 text-left" style={{ maxHeight: '75vh' }}>
                <div className="privacy-content-wrapper" dangerouslySetInnerHTML={{ __html: privacyContent }} />
              </div>

              <div className="border-t border-gray-100 bg-white px-8 py-5 text-right">
                <button
                  onClick={() => setIsPrivacyModalOpen(false)}
                  className="rounded-xl bg-[#5C8D5A] px-10 py-2.5 text-sm font-bold text-white transition-all hover:bg-[#4a7248]"
                >
                  확인
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </footer>
  );
};

const BandIcon = () => (
  <div className="group relative">
    <a
      href="https://band.us/@agape-care"
      target="_blank"
      rel="noopener noreferrer"
      className="transition hover:opacity-80"
    >
      <Image src="/images/band.svg" alt="밴드 바로가기" width={60} height={60} />
    </a>
  </div>
);

export default Footer;
