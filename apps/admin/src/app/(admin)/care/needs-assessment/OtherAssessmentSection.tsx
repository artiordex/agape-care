'use client';

// 4. 재활상태
export function RehabilitationSection({ data, onChange }: any) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5">
      <h3 className="mb-4 text-sm font-bold text-gray-900">4. 재활 상태</h3>
      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-xs font-medium text-gray-700">운동장애</label>
          <div className="flex flex-wrap gap-4">
            {['우측상지', '좌측상지', '우측하지', '좌측하지'].map(option => (
              <label key={option} className="flex items-center gap-2">
                <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-blue-600" />
                <span className="text-sm text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        </div>
        <div>
          <label className="mb-2 block text-xs font-medium text-gray-700">종합의견</label>
          <textarea
            value={data.judgmentBasis}
            onChange={e => onChange('judgmentBasis', e.target.value)}
            rows={3}
            className="w-full resize-none rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
          ></textarea>
        </div>
      </div>
    </div>
  );
}

// 5. 간호처치
export function NursingCareSection({ data, onChange }: any) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5">
      <h3 className="mb-4 text-sm font-bold text-gray-900">5. 간호처치 상태</h3>
      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-xs font-medium text-gray-700">욕창</label>
          <div className="flex flex-wrap gap-4">
            {['1단계', '2단계', '3단계', '4단계'].map(option => (
              <label key={option} className="flex items-center gap-2">
                <input type="radio" name="bedsore" className="h-4 w-4 border-gray-300 text-blue-600" />
                <span className="text-sm text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        </div>
        <div>
          <label className="mb-2 block text-xs font-medium text-gray-700">종합의견</label>
          <textarea
            value={data.judgmentBasis}
            onChange={e => onChange('judgmentBasis', e.target.value)}
            rows={3}
            className="w-full resize-none rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
          ></textarea>
        </div>
      </div>
    </div>
  );
}

// 6. 인지상태
export function CognitiveStatusSection({ data, onChange }: any) {
  const cognitiveItems = [
    '지남력 저하 (날짜·시간·장소·사람)',
    '기억력 저하 (단기·장기)',
    '주의 집중력 저하',
    '계산력 저하',
    '판단력 저하',
    '부적절한 옷 입기',
    '망상',
    '배회',
    '환각',
    '반복적인 행동',
    '부적절한 행동',
    '폭력적 행동',
    '야간 수면장애',
    '불결 행동',
    '식습관 변화',
    '먹는 것이 아닌 물건을 먹음',
    '불안',
    '우울',
  ];

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5">
      <h3 className="mb-4 text-sm font-bold text-gray-900">6. 인지 상태</h3>
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          {cognitiveItems.map((item, index) => (
            <label key={index} className="flex items-center gap-2">
              <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-blue-600" />
              <span className="text-sm text-gray-700">
                {index + 1}. {item}
              </span>
            </label>
          ))}
        </div>
        <div>
          <label className="mb-2 block text-xs font-medium text-gray-700">
            판단근거 <span className="text-red-600">*</span>
          </label>
          <textarea
            value={data.judgmentBasis}
            onChange={e => onChange('judgmentBasis', e.target.value)}
            rows={3}
            placeholder="예: 시간 및 장소에 대한 지남력이 저하되어 혼재 거주하는 곳이 아닌 과거에 살던 장소나 다른 곳이라고 대답하는 행동이 잦음"
            className="w-full resize-none rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
          ></textarea>
        </div>
      </div>
    </div>
  );
}

// 7. 의사소통
export function CommunicationSection({ data, onChange }: any) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5">
      <h3 className="mb-4 text-sm font-bold text-gray-900">7. 의사소통</h3>
      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-xs font-medium text-gray-700">청력상태</label>
          <div className="space-y-2">
            {[
              '정상(보청기 사용 포함)',
              '가까운 곳에서 대화는 가능하나 먼 곳의 말소리는 듣지 못한다',
              '큰소리만 들을 수 있다',
              '소리에 거의 반응이 없다',
              '들리는지 판단 불능',
            ].map(option => (
              <label key={option} className="flex items-start gap-2">
                <input type="radio" name="hearing" className="mt-0.5 h-4 w-4 border-gray-300 text-blue-600" />
                <span className="text-sm text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        </div>
        <div>
          <label className="mb-2 block text-xs font-medium text-gray-700">발음능력</label>
          <div className="space-y-2">
            {[
              '정확하게 발음이 가능하다',
              '중얼거리는 소리로만 한다',
              '간혹 아해할 발음이 섞인다',
              '전혀 발음하지 못한다',
            ].map(option => (
              <label key={option} className="flex items-start gap-2">
                <input type="radio" name="speech" className="mt-0.5 h-4 w-4 border-gray-300 text-blue-600" />
                <span className="text-sm text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        </div>
        <div>
          <label className="mb-2 block text-xs font-medium text-gray-700">
            판단근거 <span className="text-red-600">*</span>
          </label>
          <textarea
            value={data.judgmentBasis}
            onChange={e => onChange('judgmentBasis', e.target.value)}
            rows={3}
            className="w-full resize-none rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
          ></textarea>
        </div>
      </div>
    </div>
  );
}

// 8. 가족 및 환경상태
export function FamilyEnvironmentSection({ data, onChange }: any) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5">
      <h3 className="mb-4 text-sm font-bold text-gray-900">8. 가족 및 환경상태</h3>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-gray-700">동거인</label>
            <select className="w-full rounded border border-gray-300 px-3 py-2 text-sm">
              <option>독거</option>
              <option>배우자</option>
              <option>부모</option>
              <option>자녀</option>
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-gray-700">자녀수</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input type="radio" name="children" className="h-4 w-4" />
                <span className="text-sm">무</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="children" className="h-4 w-4" />
                <span className="text-sm">유</span>
              </label>
            </div>
          </div>
        </div>
        <div>
          <label className="mb-2 block text-xs font-medium text-gray-700">
            판단근거 <span className="text-red-600">*</span>
          </label>
          <textarea
            value={data.judgmentBasis}
            onChange={e => onChange('judgmentBasis', e.target.value)}
            rows={3}
            className="w-full resize-none rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
          ></textarea>
        </div>
      </div>
    </div>
  );
}

// 9. 자원이용
export function ResourceUsageSection({ data, onChange }: any) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5">
      <h3 className="mb-4 text-sm font-bold text-gray-900">9. 자원 이용</h3>
      <div className="space-y-4">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-gray-700">진료병원명</label>
          <input
            type="text"
            placeholder="예: 한강종합병원"
            className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-gray-700">정기진료</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input type="radio" name="regularCheckup" className="h-4 w-4" />
              <span className="text-sm">무</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="regularCheckup" className="h-4 w-4" />
              <span className="text-sm">유</span>
            </label>
          </div>
        </div>
        <div>
          <label className="mb-2 block text-xs font-medium text-gray-700">
            판단근거 <span className="text-red-600">*</span>
          </label>
          <textarea
            value={data.judgmentBasis}
            onChange={e => onChange('judgmentBasis', e.target.value)}
            rows={3}
            className="w-full resize-none rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
          ></textarea>
        </div>
      </div>
    </div>
  );
}

// 10. 주관적 욕구
export function SubjectiveNeedsSection({ data, onChange }: any) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5">
      <h3 className="mb-4 text-sm font-bold text-gray-900">10. 주관적 욕구</h3>
      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-xs font-medium text-gray-700">일상생활</label>
          <div className="grid grid-cols-2 gap-2">
            {[
              '개인위생',
              '식사하기',
              '화장실 이용하기',
              '이동 도움',
              '배변',
              '보호자 물품',
              '여가활동 도움',
              '청소·수발 적도',
            ].map(option => (
              <label key={option} className="flex items-center gap-2">
                <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-blue-600" />
                <span className="text-sm text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        </div>
        <div>
          <label className="mb-2 block text-xs font-medium text-gray-700">
            판단근거 <span className="text-red-600">*</span>
          </label>
          <textarea
            value={data.judgmentBasis}
            onChange={e => onChange('judgmentBasis', e.target.value)}
            rows={3}
            placeholder="예: 식사 시 혼자 수저질 하실 수 있도록 하고, 프로그램도 참여시켜달라고 하시며, 조금이라도 걸은 연습을 시켜달라고 하심"
            className="w-full resize-none rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
          ></textarea>
        </div>
      </div>
    </div>
  );
}

// 11. 총평
export function SummarySection({ data, onChange }: any) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5">
      <h3 className="mb-4 text-sm font-bold text-gray-900">11. 총평</h3>
      <div>
        <label className="mb-2 block text-xs font-medium text-gray-700">
          종합 소견 <span className="text-red-600">*</span>
        </label>
        <textarea
          value={data.summary}
          onChange={e => onChange('summary', e.target.value)}
          rows={8}
          placeholder="각 영역별로 작성된 판단근거를 토대로 종합소견 형태로 서술"
          className="w-full resize-none rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        ></textarea>
      </div>
    </div>
  );
}
