import { useState, useEffect } from 'react';

interface WeeklyTemplate {
  id: string;
  name: string;
  pattern: {
    dayOfWeek: number; // 0=일, 1=월, ..., 6=토
    workType: string;
    startTime: string;
    endTime: string;
    breakTime: number;
  }[];
  startDate: string;
  endDate: string;
  assignedStaff: string[];
  createdAt: string;
}

const WORK_CODES = {
  S: { name: '주간', time: '07:00~19:00', color: 'bg-blue-100 text-blue-800' },
  A: { name: '단축주간', time: '09:00~18:00', color: 'bg-cyan-100 text-cyan-800' },
  D: { name: '오전근무', time: '07:00~16:00', color: 'bg-green-100 text-green-800' },
  E: { name: '오후근무', time: '11:00~20:00', color: 'bg-yellow-100 text-yellow-800' },
  N: { name: '야간근무', time: '20:00~08:00', color: 'bg-purple-100 text-purple-800' },
  휴: { name: '휴무/비번', time: '-', color: 'bg-gray-100 text-gray-800' },
};

const DAY_NAMES = ['일', '월', '화', '수', '목', '금', '토'];

export default function WeeklyWorkTemplate() {
  const [templates, setTemplates] = useState<WeeklyTemplate[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<WeeklyTemplate | null>(null);

  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = () => {
    const saved = localStorage.getItem('weekly_work_templates');
    if (saved) {
      try {
        setTemplates(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse templates', e);
        setTemplates([]);
      }
    }
  };

  const saveTemplates = (newTemplates: WeeklyTemplate[]) => {
    localStorage.setItem('weekly_work_templates', JSON.stringify(newTemplates));
    setTemplates(newTemplates);
  };

  const handleDelete = (id: string) => {
    if (confirm('이 주별근무 템플릿을 삭제하시겠습니까?')) {
      const updated = templates.filter(t => t.id !== id);
      saveTemplates(updated);
    }
  };

  const handleApplyTemplate = (template: WeeklyTemplate) => {
    alert(`"${template.name}" 템플릿을 적용합니다. 근무표 관리 화면에서 자동 생성을 실행하세요.`);
  };

  return (
    <div className="p-6">
      {/* 헤더 */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">주별근무 등록</h1>
        <p className="text-gray-600 text-sm">7일 기준으로 반복되는 주간 근무 템플릿을 관리합니다</p>
      </div>

      {/* 액션 버튼 */}
      <div className="flex justify-end mb-6">
        <button
          onClick={() => {
            setEditingTemplate(null);
            setShowModal(true);
          }}
          className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg hover:shadow-lg transition-all duration-300 whitespace-nowrap cursor-pointer"
        >
          <i className="ri-add-line mr-2"></i>
          새 주별 템플릿 추가
        </button>
      </div>

      {/* 템플릿 목록 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {templates.map(template => (
          <div key={template.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-4">
              <div className="flex items-center justify-between text-white">
                <div>
                  <h3 className="text-lg font-bold">{template.name}</h3>
                  <p className="text-sm text-indigo-100 mt-1">
                    주간 단위 반복 (월~일)
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditingTemplate(template);
                      setShowModal(true);
                    }}
                    className="p-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg transition-colors cursor-pointer"
                  >
                    <i className="ri-edit-line"></i>
                  </button>
                  <button
                    onClick={() => handleDelete(template.id)}
                    className="p-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg transition-colors cursor-pointer"
                  >
                    <i className="ri-delete-bin-line"></i>
                  </button>
                </div>
              </div>
            </div>

            <div className="p-4">
              {/* 적용 기간 */}
              <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">적용 기간</div>
                <div className="font-medium text-gray-800">
                  {template.startDate} ~ {template.endDate}
                </div>
              </div>

              {/* 주간 패턴 */}
              <div className="mb-4">
                <div className="text-sm font-medium text-gray-700 mb-3">주간 근무 패턴</div>
                <div className="grid grid-cols-1 gap-2">
                  {template.pattern.sort((a, b) => a.dayOfWeek - b.dayOfWeek).map((p, index) => {
                    const workCode = WORK_CODES[p.workType as keyof typeof WORK_CODES];
                    return (
                      <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-12 text-center">
                          <span className={`text-sm font-bold ${p.dayOfWeek === 0 ? 'text-red-600' : p.dayOfWeek === 6 ? 'text-blue-600' : 'text-gray-700'}`}>
                            {DAY_NAMES[p.dayOfWeek]}
                          </span>
                        </div>
                        {workCode && (
                          <>
                            <span className={`px-3 py-1 rounded text-sm font-medium ${workCode.color}`}>
                              {p.workType}
                            </span>
                            {p.workType !== '휴' && (
                              <>
                                <span className="text-sm text-gray-600">
                                  {p.startTime} ~ {p.endTime}
                                </span>
                                <span className="text-xs text-gray-500">
                                  (휴게 {p.breakTime}분)
                                </span>
                              </>
                            )}
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 적용 직원 */}
              <div className="mb-4">
                <div className="text-sm font-medium text-gray-700 mb-2">적용 직원</div>
                <div className="flex flex-wrap gap-2">
                  {template.assignedStaff.length > 0 ? (
                    template.assignedStaff.map((staffId, index) => (
                      <span key={index} className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium">
                        {staffId}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-gray-500">적용된 직원 없음</span>
                  )}
                </div>
              </div>

              {/* 적용 버튼 */}
              <button
                onClick={() => handleApplyTemplate(template)}
                className="w-full px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg hover:shadow-lg transition-all duration-300 whitespace-nowrap cursor-pointer"
              >
                <i className="ri-checkbox-circle-line mr-2"></i>
                이 템플릿 적용하기
              </button>
            </div>
          </div>
        ))}
      </div>

      {templates.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <i className="ri-calendar-2-line text-6xl text-gray-300 mb-4"></i>
          <p className="text-gray-500 mb-4">등록된 주별근무 템플릿이 없습니다</p>
          <button
            onClick={() => {
              setEditingTemplate(null);
              setShowModal(true);
            }}
            className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg hover:shadow-lg transition-all duration-300 whitespace-nowrap cursor-pointer"
          >
            첫 템플릿 만들기
          </button>
        </div>
      )}

      {/* 템플릿 편집 모달 */}
      {showModal && (
        <WeeklyTemplateModal
          template={editingTemplate}
          onClose={() => {
            setShowModal(false);
            setEditingTemplate(null);
          }}
          onSave={(template) => {
            if (editingTemplate) {
              const updated = templates.map(t => t.id === template.id ? template : t);
              saveTemplates(updated);
            } else {
              saveTemplates([...templates, template]);
            }
            setShowModal(false);
            setEditingTemplate(null);
          }}
        />
      )}
    </div>
  );
}

function WeeklyTemplateModal({
  template,
  onClose,
  onSave,
}: {
  template: WeeklyTemplate | null;
  onClose: () => void;
  onSave: (template: WeeklyTemplate) => void;
}) {
  const [formData, setFormData] = useState({
    name: template?.name || '',
    startDate: template?.startDate || '',
    endDate: template?.endDate || '',
  });

  const [pattern, setPattern] = useState(
    template?.pattern || [
      { dayOfWeek: 0, workType: '휴', startTime: '', endTime: '', breakTime: 0 },
      { dayOfWeek: 1, workType: 'A', startTime: '09:00', endTime: '18:00', breakTime: 60 },
      { dayOfWeek: 2, workType: 'A', startTime: '09:00', endTime: '18:00', breakTime: 60 },
      { dayOfWeek: 3, workType: 'A', startTime: '09:00', endTime: '18:00', breakTime: 60 },
      { dayOfWeek: 4, workType: 'A', startTime: '09:00', endTime: '18:00', breakTime: 60 },
      { dayOfWeek: 5, workType: 'A', startTime: '09:00', endTime: '18:00', breakTime: 60 },
      { dayOfWeek: 6, workType: '휴', startTime: '', endTime: '', breakTime: 0 },
    ]
  );

  const handleSubmit = () => {
    if (!formData.name || !formData.startDate || !formData.endDate) {
      alert('필수 항목을 입력해주세요.');
      return;
    }

    const newTemplate: WeeklyTemplate = {
      id: template?.id || Date.now().toString(),
      name: formData.name,
      pattern,
      startDate: formData.startDate,
      endDate: formData.endDate,
      assignedStaff: template?.assignedStaff || [],
      createdAt: template?.createdAt || new Date().toISOString(),
    };

    onSave(newTemplate);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h3 className="text-xl font-bold text-gray-800">
            {template ? '주별근무 템플릿 수정' : '새 주별근무 템플릿'}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 cursor-pointer">
            <i className="ri-close-line text-2xl"></i>
          </button>
        </div>

        <div className="p-6">
          {/* 기본 정보 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="md:col-span-3">
              <label className="block text-sm font-medium text-gray-700 mb-2">템플릿 이름 *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="예: 평일근무 주말휴무 패턴"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">시작일 *</label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">종료일 *</label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* 주간 패턴 설정 */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">주간 근무 패턴 설정</label>
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              {pattern.sort((a, b) => a.dayOfWeek - b.dayOfWeek).map((p, index) => (
                <div key={index} className="flex items-center gap-3 bg-white p-3 rounded-lg border border-gray-200">
                  <div className="w-16">
                    <span className={`text-sm font-bold ${p.dayOfWeek === 0 ? 'text-red-600' : p.dayOfWeek === 6 ? 'text-blue-600' : 'text-gray-700'}`}>
                      {DAY_NAMES[p.dayOfWeek]}요일
                    </span>
                  </div>

                  <select
                    value={p.workType}
                    onChange={(e) => {
                      const newPattern = [...pattern];
                      const targetIndex = newPattern.findIndex(item => item.dayOfWeek === p.dayOfWeek);
                      newPattern[targetIndex].workType = e.target.value;
                      setPattern(newPattern);
                    }}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                  >
                    {Object.entries(WORK_CODES).map(([code, info]) => (
                      <option key={code} value={code}>{code} - {info.name}</option>
                    ))}
                  </select>

                  {p.workType !== '휴' && (
                    <>
                      <input
                        type="time"
                        value={p.startTime}
                        onChange={(e) => {
                          const newPattern = [...pattern];
                          const targetIndex = newPattern.findIndex(item => item.dayOfWeek === p.dayOfWeek);
                          newPattern[targetIndex].startTime = e.target.value;
                          setPattern(newPattern);
                        }}
                        className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
                      />
                      <span className="text-gray-500">~</span>
                      <input
                        type="time"
                        value={p.endTime}
                        onChange={(e) => {
                          const newPattern = [...pattern];
                          const targetIndex = newPattern.findIndex(item => item.dayOfWeek === p.dayOfWeek);
                          newPattern[targetIndex].endTime = e.target.value;
                          setPattern(newPattern);
                        }}
                        className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
                      />
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">휴게</span>
                        <input
                          type="number"
                          value={p.breakTime}
                          onChange={(e) => {
                            const newPattern = [...pattern];
                            const targetIndex = newPattern.findIndex(item => item.dayOfWeek === p.dayOfWeek);
                            newPattern[targetIndex].breakTime = parseInt(e.target.value) || 0;
                            setPattern(newPattern);
                          }}
                          className="w-20 px-2 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
                        />
                        <span className="text-sm text-gray-600">분</span>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 버튼 */}
          <div className="flex gap-3 justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap cursor-pointer"
            >
              취소
            </button>
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg hover:shadow-lg transition-all duration-300 whitespace-nowrap cursor-pointer"
            >
              <i className="ri-save-line mr-2"></i>
              저장하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
