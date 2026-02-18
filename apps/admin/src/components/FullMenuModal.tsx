/**
 * Description : FullMenuModal.tsx - ?? ??? UI ????
 * Author : Shiwoo Min
 * Date : 2026-02-06
 */

'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SubMenuItem {
  id: string;
  name: string;
  path: string;
}

interface MenuItem {
  id: string;
  name: string;
  icon: string;
  children?: SubMenuItem[];
}

interface FullMenuModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly menus: MenuItem[];
  readonly onMenuClick: (path: string) => void;
}

export default function FullMenuModal({ isOpen, onClose, menus, onMenuClick }: FullMenuModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[999] flex items-start justify-center overflow-y-auto bg-black/50 p-4 pt-10 font-sans antialiased backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="relative w-full max-w-[1600px] rounded-xl bg-white p-8 shadow-2xl"
          >
            {/* 닫기 버튼 */}
            <button
              onClick={onClose}
              className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 transition-all hover:bg-gray-100 hover:text-red-500"
            >
              <i className="ri-close-line text-2xl"></i>
            </button>

            {/* 헤더 검색창 영역 (이미지 상단 재현) */}
            <div className="mb-10 flex flex-col items-center">
              <div className="relative w-full max-w-2xl">
                <input
                  type="text"
                  placeholder="검색을 원하는 서비스명이나 기능 또는 업무를 입력해주세요!"
                  className="w-full rounded-full border-2 border-gray-300 py-3 pl-6 pr-14 text-lg font-bold outline-none transition-all focus:border-[#5C8D5A]"
                />
                <button className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#5C8D5A]">
                  <i className="ri-search-line text-2xl"></i>
                </button>
              </div>
            </div>

            {/* 메뉴 그리드 (12개 컬럼 레이아웃) */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
              {menus.map((menu, index) => (
                <div key={menu.id} className="flex flex-col rounded-lg border border-gray-100 bg-gray-50/30 p-2">
                  {/* 대메뉴 헤더 (이미지 스타일: 인덱스.이름) */}
                  <div className="mb-3 flex items-center bg-[#5C8D5A] px-3 py-2 text-center shadow-sm">
                    <span className="w-full text-[15px] font-black tracking-tight text-white">
                      {index + 1}. {menu.name}
                    </span>
                  </div>

                  {/* 소메뉴 리스트 */}
                  <div className="flex flex-col gap-1 px-1 pb-4">
                    {menu.children?.map((child, cIndex) => (
                      <button
                        key={child.id}
                        onClick={() => {
                          onMenuClick(child.path);
                          onClose();
                        }}
                        className="group flex items-start gap-1 py-1 text-left"
                      >
                        <span className="text-[12px] font-bold leading-tight text-gray-700 transition-colors hover:text-[#57A5CE]">
                          {index + 1}-{cIndex + 1}. {child.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
