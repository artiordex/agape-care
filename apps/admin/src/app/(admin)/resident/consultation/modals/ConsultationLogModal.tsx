/**
 * Description : ConsultationLogModal.tsx - ?? ?? UI ????
 * Author : Shiwoo Min
 * Date : 2026-02-18
 */

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

interface ConsultationLogModalProps {
  isOpen: boolean;
  onClose: () => void;
  record?: any; // The record clicked (quarter info)
  resident?: any; // The resident info
}

export default function ConsultationLogModal({ isOpen, onClose, record, resident }: ConsultationLogModalProps) {
  const [consultationDate, setConsultationDate] = useState('2026.04.01');
  const [employee] = useState('최인경');
  const [targetName, setTargetName] = useState('1월3일');
  const [relation, setRelation] = useState('본인');
  const [method, setMethod] = useState('');
  const [type, setType] = useState('');

  // Styles
  const thClass =
    'bg-[#E8F1F8] border border-[#B8D1E0] text-[12px] font-bold text-[#333] text-center px-2 py-1.5 whitespace-nowrap';
  const tdClass = 'border border-[#B8D1E0] px-2 py-1.5 bg-white text-[12px] text-[#333]';

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex h-[85vh] w-full max-w-[1200px] flex-col overflow-hidden rounded bg-white shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-200 bg-[#E8F1F8] px-5 py-3">
              <h2 className="text-[18px] font-black text-[#333]">상담일지 신규작성</h2>
              <button onClick={onClose} className="text-gray-500 hover:text-red-500">
                <i className="ri-close-line text-2xl font-bold"></i>
              </button>
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col overflow-y-auto p-4">
              {/* Recipient Info */}
              <div className="mb-4">
                <div className="mb-1 flex items-center text-[13px] font-bold text-[#2E6A9E]">
                  <i className="ri-checkbox-blank-fill mr-1 text-[10px]"></i> 수급자 정보
                </div>
                <table className="w-full border-collapse">
                  <tbody>
                    <tr>
                      <th className={thClass} style={{ width: '100px' }}>
                        수급자명
                      </th>
                      <td className={tdClass}>{resident?.name || '1월3일'}</td>
                      <th className={thClass} style={{ width: '100px' }}>
                        성별/나이
                      </th>
                      <td className={tdClass}>남 / 만 96세</td>
                      <th className={thClass} style={{ width: '100px' }}>
                        생활실
                      </th>
                      <td className={tdClass}>{resident?.room || '코코넛땅콩실'}</td>
                      <th className={thClass} style={{ width: '100px' }}>
                        입소일
                      </th>
                      <td className={tdClass}>2026.01.03</td>
                    </tr>
                    <tr>
                      <th className={thClass}>주요질환</th>
                      <td colSpan={7} className={tdClass}></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Consultation Log */}
              <div className="flex-1">
                <div className="mb-1 flex items-center justify-between">
                  <div className="flex items-center text-[13px] font-bold text-[#2E6A9E]">
                    <i className="ri-checkbox-blank-fill mr-1 text-[10px]"></i> 상담일지
                  </div>
                  <button className="rounded bg-[#57A5CE] px-2 py-1 text-[11px] text-white hover:bg-[#468db3]">
                    이전 상담일지 불러오기
                  </button>
                </div>

                <div className="border-t border-[#B8D1E0]">
                  <table className="w-full border-collapse">
                    <tbody>
                      <tr>
                        <th className={thClass} style={{ width: '120px' }}>
                          상담일시 <span className="text-red-500">*</span>
                        </th>
                        <td className={tdClass}>
                          <div className="flex items-center gap-1">
                            <input
                              type="text"
                              value={consultationDate}
                              onChange={e => setConsultationDate(e.target.value)}
                              className="w-[90px] border border-[#D1D1D1] px-1 text-center outline-none"
                            />
                            <i className="ri-calendar-line text-gray-500"></i>
                            <div className="ml-2 flex items-center gap-1">
                              <input type="text" className="w-[30px] border border-[#D1D1D1] px-1 text-center" />{' '}
                              <span>:</span>
                              <input type="text" className="w-[30px] border border-[#D1D1D1] px-1 text-center" />{' '}
                              <span>~</span>
                              <input type="text" className="w-[30px] border border-[#D1D1D1] px-1 text-center" />{' '}
                              <span>:</span>
                              <input type="text" className="w-[30px] border border-[#D1D1D1] px-1 text-center" />
                            </div>
                            <label className="ml-2 flex items-center gap-1 text-[11px] text-gray-500">
                              <input type="checkbox" /> ( 상담불가 )
                            </label>
                          </div>
                        </td>
                        <th className={thClass} style={{ width: '100px' }}>
                          상담구분
                        </th>
                        <td className={tdClass}>
                          <select
                            className="w-full border border-[#D1D1D1] px-1 py-0.5 outline-none"
                            value={type}
                            onChange={e => setType(e.target.value)}
                          >
                            <option value="">-상담구분-</option>
                            <option value="정기">정기</option>
                            <option value="수시">수시</option>
                          </select>
                        </td>
                        <th className={thClass} style={{ width: '100px' }}>
                          상담직원명 <span className="text-red-500">*</span>
                        </th>
                        <td className={tdClass}>
                          <div className="flex items-center gap-1">
                            <input
                              type="text"
                              value={employee}
                              readOnly
                              className="w-[80px] border border-[#D1D1D1] px-1 text-center outline-none"
                            />
                            <button className="rounded bg-[#5F7183] px-2 py-0.5 text-[11px] text-white hover:bg-[#4E5D6C]">
                              선택
                            </button>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th className={thClass}>
                          상담대상자명(관계) <span className="text-red-500">*</span>
                          <br />
                          (수급자/보호자)
                        </th>
                        <td className={tdClass}>
                          <div className="flex items-center gap-1">
                            <input
                              type="text"
                              value={targetName}
                              onChange={e => setTargetName(e.target.value)}
                              className="w-[80px] border border-[#D1D1D1] px-1 text-center outline-none"
                            />
                            <input
                              type="text"
                              value={relation}
                              onChange={e => setRelation(e.target.value)}
                              className="w-[60px] border border-[#D1D1D1] px-1 text-center outline-none"
                            />
                            <button className="rounded bg-[#5F7183] px-2 py-0.5 text-[11px] text-white hover:bg-[#4E5D6C]">
                              상담대상자 선택
                            </button>
                          </div>
                        </td>
                        <th className={thClass}>
                          상담방법 <span className="text-red-500">*</span>
                        </th>
                        <td colSpan={3} className={tdClass}>
                          <select
                            className="w-[150px] border border-[#D1D1D1] px-1 py-0.5 outline-none"
                            value={method}
                            onChange={e => setMethod(e.target.value)}
                          >
                            <option value="">-상담방법-</option>
                            <option value="전화">전화</option>
                            <option value="방문">방문</option>
                            <option value="내방">내방</option>
                          </select>
                        </td>
                      </tr>
                      <tr>
                        <th className={thClass}>
                          상담내용 <span className="text-red-500">*</span>
                          <button className="mt-2 block w-full rounded bg-[#57A5CE] py-1 text-[10px] text-white">
                            급여제공
                            <br />
                            특이사항 조회
                          </button>
                        </th>
                        <td colSpan={5} className={tdClass}>
                          <div className="relative h-[200px]">
                            <textarea
                              className="h-full w-full resize-none border border-[#D1D1D1] p-2 text-[12px] outline-none"
                              placeholder={`※ SNS 등에 공지·안내만 하는 일방향 소통은 인정되지 않으며, 양방향 소통이 이루어진 경우만 인정함\n\n상담예시) 수급자의 건강상태 변화, 일상생활 수행능력, 최근 불편사항, 서비스 이용 중 요구·희망사항, 급여제공 일정·방법 조정 요청, 약 복용·식사·수면 등 생활관리 관련 문의, 프로그램 참여 의사, 추가 지원 요청 등`}
                            ></textarea>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th className={thClass}>조치내용</th>
                        <td colSpan={5} className={tdClass}>
                          <textarea className="h-[80px] w-full resize-none border border-[#D1D1D1] p-2 text-[12px] outline-none"></textarea>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* File Attachment */}
                <div className="mt-2 flex h-[80px] items-center justify-center border border-dashed border-[#B8D1E0] bg-[#F9FBFF]">
                  <div className="flex items-center gap-2 text-gray-400">
                    <i className="ri-file-add-line text-2xl"></i>
                    <span className="text-[12px]">
                      첨부할 파일을 여기에 끌어다 놓거나 자료선택 버튼을 이용해 선택할 수 있습니다.
                    </span>
                  </div>
                </div>
                <div className="mt-1">
                  <button className="rounded bg-[#9CA3AF] px-2 py-1 text-[11px] text-white">자료선택</button>
                  <span className="ml-1 text-[10px] text-gray-500">(최대 10MB x 10개)</span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-center gap-2 border-t border-gray-200 bg-[#F8F9FA] px-5 py-3">
              <button className="w-[100px] rounded bg-[#2E8BCC] py-2 text-[13px] font-bold text-white shadow-md hover:bg-[#206FA2]">
                저장
              </button>
              <button
                onClick={onClose}
                className="w-[100px] rounded bg-[#666666] py-2 text-[13px] font-bold text-white shadow-md hover:bg-[#555555]"
              >
                창닫기
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
