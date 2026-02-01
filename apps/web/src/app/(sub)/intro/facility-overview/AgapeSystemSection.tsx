/**
 * Description : AgapeSystemSection.tsx - 📌 안심 케어 시스템 섹션
 * Author : Shiwoo Min
 * Date : 2026-02-01
 */

'use client';

import facilityData from '@/data/facility.json';
import { motion } from 'framer-motion';

export default function AgapeSystemSection() {
  const { generalInfo } = facilityData;
  const capacity = generalInfo.find(item => item.category === '정원')?.content ?? '29명';

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-[90%] px-4">
        {/* 1. 헤더 타이틀 */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-16 flex items-center gap-3"
        >
          <div className="h-8 w-2 flex-shrink-0 rounded-sm bg-[#5C8D5A]" />
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">안심 케어 시스템</h2>
        </motion.div>

        {/* 2. 시설 규모 및 안전 철학 (기존 Facility/SafetySection 통합) */}
        <div className="mb-20 grid grid-cols-1 gap-12 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h3 className="mb-4 text-xl font-bold text-[#5C8D5A]">쾌적하고 안전한 생활 환경</h3>
            <p className="mb-6 leading-relaxed text-gray-600">
              정원 {capacity} 규모의 요양원으로서 법적 기준 이상의 쾌적한 공간을 제공합니다. 모든 침실은 1인당 6.6㎡
              이상의 면적을 확보하여 어르신께서 여유롭게 생활하실 수 있으며, 욕실과 복도에는 안전바를 설치하고 모든
              바닥은 미끄럼 방지 시공을 완료하였습니다.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg border border-gray-100 bg-gray-50 p-4 text-center">
                <i className="ri-home-heart-line mb-2 block text-2xl text-[#5C8D5A]" />
                <span className="text-sm font-bold text-gray-800">침실 6.6㎡ 이상</span>
              </div>
              <div className="rounded-lg border border-gray-100 bg-gray-50 p-4 text-center">
                <i className="ri-shield-check-line mb-2 block text-2xl text-[#5C8D5A]" />
                <span className="text-sm font-bold text-gray-800">안전바 및 미끄럼방지</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl bg-[#F9F8F6] p-8 lg:p-10"
          >
            <h3 className="mb-4 text-xl font-bold text-[#5C8D5A]">철저한 안전 관리 체계</h3>
            <p className="mb-6 leading-relaxed text-gray-700">
              시설 내부의 모든 복도와 주요 동선에는 CCTV가 설치되어 24시간 모니터링되며, 비상벨과 스프링클러 등 법적
              기준 이상의 안전 설비를 갖추고 있습니다. 정기적인 소방훈련과 감염병 대응 체계를 통해 보호자가 안심할 수
              있는 환경을 만듭니다.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm font-semibold text-gray-600">
                <i className="ri-checkbox-circle-fill text-[#5C8D5A]" /> 화재안전관리자 선임 및 소방훈련
              </div>
              <div className="flex items-center gap-3 text-sm font-semibold text-gray-600">
                <i className="ri-checkbox-circle-fill text-[#5C8D5A]" /> 감염병 예방 및 방문객 출입 관리
              </div>
            </div>
          </motion.div>
        </div>

        {/* 안전 케어 4대 핵심 카드 */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <SafetyCard icon="ri-fire-line" title="화재안전 관리" desc="스프링클러·비상벨 완비 및 정기 훈련 실시" />
          <SafetyCard
            icon="ri-shield-cross-line"
            title="감염병 대응"
            desc="엄격한 방문객 관리 및 철저한 위생 수칙 준수"
          />
          <SafetyCard icon="ri-vidicon-line" title="CCTV 모니터링" desc="주요 동선 24시간 모니터링으로 사고 예방" />
          <SafetyCard
            icon="ri-file-list-3-line"
            title="생활 기록 관리"
            desc="어르신 상태 실시간 모니터링 및 기록 공유"
          />
        </div>
      </div>
    </section>
  );
}

function SafetyCard({ icon, title, desc }: Readonly<{ icon: string; title: string; desc: string }>) {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-md transition-shadow hover:shadow-lg">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#5C8D5A]/10">
        <i className={`${icon} text-2xl text-[#5C8D5A]`} />
      </div>
      <h4 className="mb-2 font-bold text-gray-900">{title}</h4>
      <p className="text-sm leading-relaxed text-gray-600">{desc}</p>
    </div>
  );
}
