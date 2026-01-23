'use client';

export default function DirectorMessage() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* 생활 프로그램 */}
        <div className="mb-20">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-800 sm:text-4xl">생활 프로그램 및 서비스</h2>
            <p className="mx-auto max-w-2xl text-base text-gray-600">
              어르신의 신체·인지·정서 건강을 위한 다양한 프로그램을 운영합니다
            </p>
          </div>

          <div className="mx-auto mb-8 max-w-5xl rounded-2xl bg-[#F9F8F6] p-10">
            <p className="mb-6 text-base leading-relaxed text-gray-700">
              정원 29인 요양원의 장점을 살려 소규모 그룹 활동이 가능하며, 어르신의 관심사와 기능 수준에 맞춘 프로그램을
              주 5일 운영하고 있습니다. 인지 재활 프로그램을 통해 어르신의 인지 기능 유지와 향상을 돕고, 미술·원예·음악
              등 다양한 여가활동으로 정서적 안정과 삶의 즐거움을 제공하고 있습니다.
            </p>
            <p className="text-base leading-relaxed text-gray-700">
              사회성 향상을 위한 소그룹 활동과 물리·작업치료(시설 여건에 따라), 종교 및 정서 프로그램도 운영되며,
              생신잔치와 계절별 행사를 통해 어르신께 특별한 추억을 선물하고 있습니다. 주간 일정표에 따라 체계적으로
              운영되는 프로그램은 어르신의 일상에 활력을 더하고 있습니다.
            </p>
          </div>

          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-xl bg-white p-6 text-center shadow-md transition-all hover:shadow-lg">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#5C8D5A]/10">
                <i className="ri-brain-line text-3xl text-[#5C8D5A]" />
              </div>
              <h4 className="mb-2 font-bold text-gray-800">인지 재활 프로그램</h4>
              <p className="text-sm text-gray-600">인지 기능 유지 및 향상</p>
            </div>

            <div className="rounded-xl bg-white p-6 text-center shadow-md transition-all hover:shadow-lg">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#5C8D5A]/10">
                <i className="ri-palette-line text-3xl text-[#5C8D5A]" />
              </div>
              <h4 className="mb-2 font-bold text-gray-800">여가활동</h4>
              <p className="text-sm text-gray-600">미술, 원예, 음악 등</p>
            </div>

            <div className="rounded-xl bg-white p-6 text-center shadow-md transition-all hover:shadow-lg">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#5C8D5A]/10">
                <i className="ri-team-line text-3xl text-[#5C8D5A]" />
              </div>
              <h4 className="mb-2 font-bold text-gray-800">사회성 향상</h4>
              <p className="text-sm text-gray-600">소그룹 활동 및 교류</p>
            </div>

            <div className="rounded-xl bg-white p-6 text-center shadow-md transition-all hover:shadow-lg">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#5C8D5A]/10">
                <i className="ri-heart-pulse-line text-3xl text-[#5C8D5A]" />
              </div>
              <h4 className="mb-2 font-bold text-gray-800">물리·작업치료</h4>
              <p className="text-sm text-gray-600">시설 여건에 따라 제공</p>
            </div>

            <div className="rounded-xl bg-white p-6 text-center shadow-md transition-all hover:shadow-lg">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#5C8D5A]/10">
                <i className="ri-seedling-line text-3xl text-[#5C8D5A]" />
              </div>
              <h4 className="mb-2 font-bold text-gray-800">종교·정서 프로그램</h4>
              <p className="text-sm text-gray-600">마음의 평안과 위로</p>
            </div>

            <div className="rounded-xl bg-white p-6 text-center shadow-md transition-all hover:shadow-lg">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#5C8D5A]/10">
                <i className="ri-cake-3-line text-3xl text-[#5C8D5A]" />
              </div>
              <h4 className="mb-2 font-bold text-gray-800">생신잔치·행사</h4>
              <p className="text-sm text-gray-600">특별한 추억 만들기</p>
            </div>
          </div>
        </div>

        {/* 가족·보호자 소통 */}
        <div className="mb-20">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-800 sm:text-4xl">가족 및 보호자와의 소통</h2>
            <p className="mx-auto max-w-2xl text-base text-gray-600">
              투명한 운영과 지속적인 소통으로 보호자의 신뢰를 지킵니다
            </p>
          </div>

          <div className="mx-auto mb-8 max-w-5xl rounded-2xl bg-[#F9F8F6] p-10">
            <p className="mb-6 text-base leading-relaxed text-gray-700">
              보호자께서는 언제든지 상담을 통해 어르신의 생활과 건강 상태를 확인하실 수 있으며, 생활일지는 정기적으로
              공유하여 투명한 운영을 실천하고 있습니다. 어르신의 행동 변화, 식사량, 건강 체크 결과 등을 상세히 기록하여
              보호자께 정기적으로 보고드리고 있습니다.
            </p>
            <p className="text-base leading-relaxed text-gray-700">
              면회 규정을 안내하고 있으며, 보호자 상담제를 운영하여 궁금한 사항이나 요청 사항을 언제든지 말씀하실 수
              있도록 열린 소통 창구를 마련하고 있습니다. 가족과 요양원이 함께 어르신을 돌본다는 마음으로 긴밀하게
              협력하고 있습니다.
            </p>
          </div>

          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-xl bg-white p-6 shadow-md">
              <div className="mb-4 flex items-center space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#5C8D5A]/10">
                  <i className="ri-user-voice-line text-xl text-[#5C8D5A]" />
                </div>
                <h4 className="font-bold text-gray-800">보호자 상담제</h4>
              </div>
              <p className="text-sm leading-relaxed text-gray-600">
                언제든지 어르신의 상태를 확인하고 상담받으실 수 있습니다
              </p>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-md">
              <div className="mb-4 flex items-center space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#5C8D5A]/10">
                  <i className="ri-file-text-line text-xl text-[#5C8D5A]" />
                </div>
                <h4 className="font-bold text-gray-800">생활일지 공유</h4>
              </div>
              <p className="text-sm leading-relaxed text-gray-600">정기적으로 어르신의 생활과 건강 상태를 공유합니다</p>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-md">
              <div className="mb-4 flex items-center space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#5C8D5A]/10">
                  <i className="ri-health-book-line text-xl text-[#5C8D5A]" />
                </div>
                <h4 className="font-bold text-gray-800">건강 체크 보고</h4>
              </div>
              <p className="text-sm leading-relaxed text-gray-600">
                행동 변화, 식사량, 건강 상태를 상세히 보고드립니다
              </p>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-md">
              <div className="mb-4 flex items-center space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#5C8D5A]/10">
                  <i className="ri-door-open-line text-xl text-[#5C8D5A]" />
                </div>
                <h4 className="font-bold text-gray-800">면회 규정</h4>
              </div>
              <p className="text-sm leading-relaxed text-gray-600">안전한 면회를 위한 규정을 안내해 드립니다</p>
            </div>
          </div>
        </div>

        {/* 장기요양등급 안내 */}
        <div className="mb-20">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-800 sm:text-4xl">장기요양등급 안내 및 입소 절차</h2>
            <p className="mx-auto max-w-2xl text-base text-gray-600">입소를 위한 모든 절차를 상세히 안내해 드립니다</p>
          </div>

          <div className="mx-auto max-w-5xl rounded-2xl bg-[#F9F8F6] p-10">
            <p className="mb-6 text-base leading-relaxed text-gray-700">
              입소를 원하시는 보호자님께서는 장기요양등급 안내부터 계약까지 모든 절차를 상담받으실 수 있으며, 등급
              신청이 처음이신 분도 쉽게 이해할 수 있도록 상세히 설명해 드립니다. 장기요양등급 신청 절차, 필요 서류, 비용
              및 본인부담금 예시, 입소 대기 및 계약 절차 등을 단계별로 안내해 드리고 있습니다.
            </p>
            <p className="text-base leading-relaxed text-gray-700">
              처음부터 끝까지 보호자님과 함께하며, 복잡한 행정 절차도 쉽게 이해하실 수 있도록 도와드립니다. 궁금하신
              사항은 언제든지 문의해 주시면 친절하게 안내해 드리겠습니다.
            </p>
          </div>
        </div>

        {/* 시설장 메시지 */}
        <div>
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-800 sm:text-4xl">시설장 인사말</h2>
          </div>

          <div className="mx-auto max-w-4xl">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#5C8D5A]/5 to-[#5C8D5A]/10 p-12">
              {/* 장식 요소 */}
              <div className="absolute right-0 top-0 -mr-16 -mt-16 h-32 w-32 rounded-full bg-[#5C8D5A]/5" />
              <div className="absolute bottom-0 left-0 -mb-20 -ml-20 h-40 w-40 rounded-full bg-[#5C8D5A]/5" />

              <div className="relative">
                <div className="mb-8 flex items-center justify-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#5C8D5A]/10">
                    <i className="ri-heart-3-line text-4xl text-[#5C8D5A]" />
                  </div>
                </div>

                <div className="space-y-6 text-center">
                  <p className="text-lg leading-relaxed text-gray-700">
                    저희 요양원을 찾아주신 보호자님과 어르신께 진심으로 감사드립니다.
                  </p>

                  <p className="text-base leading-relaxed text-gray-700">
                    정원 29인 소규모 정원형 시설만의 장점을 살려, 어르신 한 분 한 분께 세심한 관심과 개별 맞춤형 케어를
                    제공하는 것이 저희의 가장 큰 자랑입니다. 대규모 시설에서는 느낄 수 없는 가족 같은 분위기 속에서,
                    어르신께서 편안하고 행복한 일상을 보내실 수 있도록 최선을 다하고 있습니다.
                  </p>

                  <p className="text-base leading-relaxed text-gray-700">
                    저희는 단순히 요양 서비스를 제공하는 것을 넘어, 어르신의 존엄성과 자율성을 존중하며 정서적으로
                    안정된 환경을 만들어가고 있습니다. 24시간 상주하는 전문 인력과 법적 기준을 충족하는 안전 시설,
                    그리고 무엇보다 가족을 대신해 따뜻하게 모시는 마음으로 어르신을 돌보고 있습니다.
                  </p>

                  <p className="text-base leading-relaxed text-gray-700">
                    보호자님께서 느끼시는 걱정과 불안함을 저희는 충분히 이해하고 있습니다. 그렇기에 투명한 운영과
                    지속적인 소통을 통해 신뢰를 쌓아가고 있으며, 언제든지 궁금하신 사항이나 요청 사항을 편하게 말씀해
                    주실 수 있도록 열린 자세로 임하고 있습니다.
                  </p>

                  <p className="text-base leading-relaxed text-gray-700">
                    어르신께서 건강하고 행복한 일상을 보내실 수 있도록, 그리고 보호자님께서 안심하실 수 있도록, 저희는
                    언제나 최선을 다하겠습니다. 저희 요양원이 어르신께 편안한 보금자리가 되고, 보호자님께는 믿고 맡기실
                    수 있는 곳이 되도록 노력하겠습니다.
                  </p>

                  <p className="mt-8 text-lg font-semibold text-[#5C8D5A]">가족 같은 마음으로 어르신을 모시겠습니다.</p>

                  <div className="mt-8 border-t border-gray-300 pt-6">
                    <p className="text-sm text-gray-600">시설장 드림</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
