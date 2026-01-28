'use client';

import footerData from '@/data/footer.json';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  const { topLinks, branding, institutionInfo, addressInfo, copy } = footerData;

  return (
    <footer className="border-t border-[#E5E1D8] bg-[#F5F3EE] py-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 sm:px-6 lg:px-8">
        {/* Top Links */}
        <ul className="flex flex-wrap items-center text-sm text-gray-700">
          {topLinks.map((item, idx) => (
            <li key={item.label} className="flex items-center">
              {item.href ? (
                <Link href={item.href} className="cursor-pointer px-1 hover:text-[#5C8D5A]">
                  {item.label}
                </Link>
              ) : (
                <span className="px-1">{item.label}</span>
              )}

              {/* 구분자 */}
              {idx < topLinks.length - 1 && <span className="px-2 text-gray-400">|</span>}
            </li>
          ))}
        </ul>

        {/* Branding + Info */}
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          {/* Left Branding */}
          <div className="max-w-sm">
            <div className="mb-3 flex items-center gap-3">
              <Image src={branding.logo} alt={branding.alt} width={48} height={48} className="object-contain" />
              <span className="text-lg font-semibold text-gray-900">{branding.name}</span>
            </div>

            <p className="text-sm leading-relaxed text-gray-700">
              {branding.description.map((line, idx) => (
                <span key={line}>
                  {line}
                  {idx < branding.description.length - 1 && <br />}
                </span>
              ))}
            </p>
          </div>

          {/* Right Info */}
          <div className="flex-1 text-sm leading-relaxed text-gray-700 md:text-right">
            <p>
              대표자 : {institutionInfo.ceo} &nbsp;/&nbsp; 전화 : {institutionInfo.phone} &nbsp;/&nbsp; 팩스 :{' '}
              {institutionInfo.fax} &nbsp;/&nbsp; 이메일 : {institutionInfo.email}
            </p>

            <p className="mt-1">
              주소 : (우 {addressInfo.zipcode}) {addressInfo.address} &nbsp;/&nbsp; 사업자등록번호 :{' '}
              {addressInfo.businessNumber}
            </p>

            <p className="mt-3 text-gray-500">{copy}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
