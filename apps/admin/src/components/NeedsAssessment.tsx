import { useState, useEffect } from 'react';

interface AssessmentData {
  residentId: string;
  residentName: string;
  assessmentDate: string;
  assessor: string;
  
  // 1. 일반 상태
  generalStatus: {
    height: number;
    weight: number;
    bmi: number;
    nutritionStatus: 'excellent' | 'good' | 'poor' | 'very_poor' | '';
    nutritionMemo: string;
    
    mealType: {
      regular: boolean;
      soft: boolean;
      pureed: boolean;
      therapeutic: boolean;
      therapeuticDetail: string;
    };
    mealTypeMemo: string;
    
    mealProblems: {
      chewingDifficulty: boolean;
      dentalProblems: boolean;
      indigestion: boolean;
      swallowingDifficulty: boolean;
      poorAppetite: boolean;
      other: boolean;
      otherDetail: string;
    };
    mealProblemsMemo: string;
    
    oralStatus: 'good' | 'poor_hygiene' | 'weak_teeth' | 'dentures' | '';
    dentureType: string;
    oralMemo: string;
    
    bowelStatus: 'normal' | 'constipation' | 'diarrhea' | 'frequent' | 'incontinence' | '';
    bowelMemo: string;
    
    urinaryStatus: 'normal' | 'frequent' | 'difficult' | 'incontinence' | 'catheter' | '';
    urinaryMemo: string;
  };
  
  // 2. 인지 기능
  cognitiveFunction: {
    consciousnessLevel: 'alert' | 'drowsy' | 'confused' | 'stupor' | '';
    consciousnessMemo: string;
    
    memoryStatus: 'normal' | 'mild_impairment' | 'moderate_impairment' | 'severe_impairment' | '';
    memoryMemo: string;
    
    orientationTime: boolean;
    orientationPlace: boolean;
    orientationPerson: boolean;
    orientationMemo: string;
    
    judgmentAbility: 'good' | 'fair' | 'poor' | '';
    judgmentMemo: string;
    
    communicationAbility: 'fluent' | 'limited' | 'difficult' | 'impossible' | '';
    communicationMemo: string;
  };
  
  // 3. 신체 기능
  physicalFunction: {
    mobilityStatus: 'independent' | 'assist_device' | 'partial_assist' | 'full_assist' | 'bedridden' | '';
    mobilityMemo: string;
    
    transferAbility: 'independent' | 'supervised' | 'partial_assist' | 'full_assist' | '';
    transferMemo: string;
    
    balanceStatus: 'good' | 'fair' | 'poor' | 'unable' | '';
    balanceMemo: string;
    
    rangeOfMotion: {
      leftUpper: 'full' | 'limited' | 'severely_limited' | '';
      rightUpper: 'full' | 'limited' | 'severely_limited' | '';
      leftLower: 'full' | 'limited' | 'severely_limited' | '';
      rightLower: 'full' | 'limited' | 'severely_limited' | '';
    };
    romMemo: string;
    
    muscleStrength: {
      leftUpper: 1 | 2 | 3 | 4 | 5 | 0;
      rightUpper: 1 | 2 | 3 | 4 | 5 | 0;
      leftLower: 1 | 2 | 3 | 4 | 5 | 0;
      rightLower: 1 | 2 | 3 | 4 | 5 | 0;
    };
    muscleMemo: string;
  };
  
  // 4. 일상생활 수행능력 (ADL)
  adl: {
    eating: 'independent' | 'supervised' | 'partial_assist' | 'full_assist' | '';
    eatingMemo: string;
    
    bathing: 'independent' | 'supervised' | 'partial_assist' | 'full_assist' | '';
    bathingMemo: string;
    
    dressing: 'independent' | 'supervised' | 'partial_assist' | 'full_assist' | '';
    dressingMemo: string;
    
    toileting: 'independent' | 'supervised' | 'partial_assist' | 'full_assist' | '';
    toiletingMemo: string;
    
    continence: 'independent' | 'occasional_accident' | 'frequent_accident' | 'incontinent' | '';
    continenceMemo: string;
  };
  
  // 5. 피부 상태
  skinCondition: {
    skinIntegrity: 'intact' | 'at_risk' | 'stage1' | 'stage2' | 'stage3' | 'stage4' | '';
    pressureUlcerLocation: string;
    skinMemo: string;
    
    otherSkinIssues: {
      rash: boolean;
      bruising: boolean;
      dryness: boolean;
      infection: boolean;
      other: boolean;
      otherDetail: string;
    };
    skinIssuesMemo: string;
  };
  
  // 6. 의료 상태
  medicalCondition: {
    primaryDiagnosis: string;
    secondaryDiagnosis: string[];
    currentMedications: string;
    allergies: string;
    recentHospitalization: boolean;
    hospitalizationDetail: string;
    medicalMemo: string;
  };
  
  // 7. 심리·정서 상태
  psychologicalStatus: {
    moodStatus: 'stable' | 'anxious' | 'depressed' | 'irritable' | 'withdrawn' | '';
    moodMemo: string;
    
    behavioralIssues: {
      wandering: boolean;
      aggression: boolean;
      agitation: boolean;
      resistance: boolean;
      other: boolean;
      otherDetail: string;
    };
    behaviorMemo: string;
    
    socialInteraction: 'active' | 'moderate' | 'limited' | 'isolated' | '';
    socialMemo: string;
  };
  
  // 8. 감각 기능
  sensoryFunction: {
    vision: 'normal' | 'corrected' | 'impaired' | 'blind' | '';
    visionAid: string;
    visionMemo: string;
    
    hearing: 'normal' | 'corrected' | 'impaired' | 'deaf' | '';
    hearingAid: string;
    hearingMemo: string;
    
    pain: 'none' | 'mild' | 'moderate' | 'severe' | '';
    painLocation: string;
    painMemo: string;
  };
  
  // 9. 사회적 지지
  socialSupport: {
    familyVisitFrequency: 'weekly' | 'monthly' | 'rarely' | 'none' | '';
    primaryCaregiver: string;
    caregiverContact: string;
    familySupportMemo: string;
    
    financialStatus: 'stable' | 'limited' | 'assistance_needed' | '';
    financialMemo: string;
  };
  
  // 10. 종합 평가 및 케어 계획
  carePlan: {
    overallAssessment: string;
    careGoals: string[];
    interventions: string[];
    riskFactors: string[];
    specialNeeds: string;
    reviewDate: string;
  };
}

const initialAssessmentData: AssessmentData = {
  residentId: '',
  residentName: '',
  assessmentDate: new Date().toISOString().split('T')[0],
  assessor: '',
  
  generalStatus: {
    height: 0,
    weight: 0,
    bmi: 0,
    nutritionStatus: '',
    nutritionMemo: '',
    mealType: {
      regular: false,
      soft: false,
      pureed: false,
      therapeutic: false,
      therapeuticDetail: ''
    },
    mealTypeMemo: '',
    mealProblems: {
      chewingDifficulty: false,
      dentalProblems: false,
      indigestion: false,
      swallowingDifficulty: false,
      poorAppetite: false,
      other: false,
      otherDetail: ''
    },
    mealProblemsMemo: '',
    oralStatus: '',
    dentureType: '',
    oralMemo: '',
    bowelStatus: '',
    bowelMemo: '',
    urinaryStatus: '',
    urinaryMemo: ''
  },
  
  cognitiveFunction: {
    consciousnessLevel: '',
    consciousnessMemo: '',
    memoryStatus: '',
    memoryMemo: '',
    orientationTime: false,
    orientationPlace: false,
    orientationPerson: false,
    orientationMemo: '',
    judgmentAbility: '',
    judgmentMemo: '',
    communicationAbility: '',
    communicationMemo: ''
  },
  
  physicalFunction: {
    mobilityStatus: '',
    mobilityMemo: '',
    transferAbility: '',
    transferMemo: '',
    balanceStatus: '',
    balanceMemo: '',
    rangeOfMotion: {
      leftUpper: '',
      rightUpper: '',
      leftLower: '',
      rightLower: ''
    },
    romMemo: '',
    muscleStrength: {
      leftUpper: 0,
      rightUpper: 0,
      leftLower: 0,
      rightLower: 0
    },
    muscleMemo: ''
  },
  
  adl: {
    eating: '',
    eatingMemo: '',
    bathing: '',
    bathingMemo: '',
    dressing: '',
    dressingMemo: '',
    toileting: '',
    toiletingMemo: '',
    continence: '',
    continenceMemo: ''
  },
  
  skinCondition: {
    skinIntegrity: '',
    pressureUlcerLocation: '',
    skinMemo: '',
    otherSkinIssues: {
      rash: false,
      bruising: false,
      dryness: false,
      infection: false,
      other: false,
      otherDetail: ''
    },
    skinIssuesMemo: ''
  },
  
  medicalCondition: {
    primaryDiagnosis: '',
    secondaryDiagnosis: [],
    currentMedications: '',
    allergies: '',
    recentHospitalization: false,
    hospitalizationDetail: '',
    medicalMemo: ''
  },
  
  psychologicalStatus: {
    moodStatus: '',
    moodMemo: '',
    behavioralIssues: {
      wandering: false,
      aggression: false,
      agitation: false,
      resistance: false,
      other: false,
      otherDetail: ''
    },
    behaviorMemo: '',
    socialInteraction: '',
    socialMemo: ''
  },
  
  sensoryFunction: {
    vision: '',
    visionAid: '',
    visionMemo: '',
    hearing: '',
    hearingAid: '',
    hearingMemo: '',
    pain: '',
    painLocation: '',
    painMemo: ''
  },
  
  socialSupport: {
    familyVisitFrequency: '',
    primaryCaregiver: '',
    caregiverContact: '',
    familySupportMemo: '',
    financialStatus: '',
    financialMemo: ''
  },
  
  carePlan: {
    overallAssessment: '',
    careGoals: [],
    interventions: [],
    riskFactors: [],
    specialNeeds: '',
    reviewDate: ''
  }
};

const NeedsAssessment = () => {
  const [selectedCategory, setSelectedCategory] = useState(1);
  const [selectedResident, setSelectedResident] = useState('');
  const [assessmentDate, setAssessmentDate] = useState('');
  const [assessor, setAssessor] = useState('');
  const [activeSection, setActiveSection] = useState(1);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

  // ✅ 추가: 누락된 기본 변수들
  const [residentId, setResidentId] = useState('');
  const [residentName, setResidentName] = useState('');

  // 일반 상태
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [nutritionStatus, setNutritionStatus] = useState('');
  const [nutritionMemo, setNutritionMemo] = useState('');
  
  // ✅ 추가: 식사 형태 관련 변수들
  const [mealTypes, setMealTypes] = useState<string[]>([]);
  const [therapeuticMealType, setTherapeuticMealType] = useState('');
  
  const [mealTypeRegular, setMealTypeRegular] = useState(false);
  const [mealTypeSoft, setMealTypeSoft] = useState(false);
  const [mealTypeGround, setMealTypeGround] = useState(false);
  const [mealTypeTherapeutic, setMealTypeTherapeutic] = useState(false);
  const [therapeuticDetail, setTherapeuticDetail] = useState('');
  const [mealTypeMemo, setMealTypeMemo] = useState('');
  
  const [mealProblems, setMealProblems] = useState({
    chewingDifficulty: false,
    dentalProblems: false,
    indigestion: false,
    swallowingDifficulty: false,
    poorAppetite: false,
    other: false,
    otherDetail: ''
  });
  const [mealProblemsMemo, setMealProblemsMemo] = useState('');
  const [chewingDifficulty, setChewingDifficulty] = useState(false);
  const [dentalProblems, setDentalProblems] = useState(false);
  const [digestionIssues, setDigestionIssues] = useState(false);
  const [mealProblemOther, setMealProblemOther] = useState('');
  
  // ✅ 추가: 구강 상태 관련 변수들
  const [oralHealth, setOralHealth] = useState('');
  const [oralHealthMemo, setOralHealthMemo] = useState('');
  const [dentureStatus, setDentureStatus] = useState('');
  
  const [oralStatus, setOralStatus] = useState('');
  const [dentureType, setDentureType] = useState('');
  const [oralMemo, setOralMemo] = useState('');
  const [bowelStatus, setBowelStatus] = useState('');
  const [bowelMemo, setBowelMemo] = useState('');
  const [urinaryStatus, setUrinaryStatus] = useState('');
  const [urinaryMemo, setUrinaryMemo] = useState('');

  // 인지 기능
  const [consciousnessLevel, setConsciousnessLevel] = useState('');
  const [consciousnessMemo, setConsciousnessMemo] = useState('');
  const [memoryLevel, setMemoryLevel] = useState('');
  const [memoryStatus, setMemoryStatus] = useState('');
  const [memoryMemo, setMemoryMemo] = useState('');
  
  // ✅ 추가: 지남력 관련 변수들
  const [timeOrientation, setTimeOrientation] = useState(false);
  const [placeOrientation, setPlaceOrientation] = useState(false);
  const [personOrientation, setPersonOrientation] = useState(false);
  
  const [orientationTime, setOrientationTime] = useState(false);
  const [orientationPlace, setOrientationPlace] = useState(false);
  const [orientationPerson, setOrientationPerson] = useState(false);
  const [orientationMemo, setOrientationMemo] = useState('');
  const [judgmentLevel, setJudgmentLevel] = useState('');
  const [judgmentAbility, setJudgmentAbility] = useState('');
  const [judgmentMemo, setJudgmentMemo] = useState('');
  const [communicationLevel, setCommunicationLevel] = useState('');
  const [communicationAbility, setCommunicationAbility] = useState('');
  const [communicationMemo, setCommunicationMemo] = useState('');

  // 3. 신체 기능
  const [mobilityLevel, setMobilityLevel] = useState('');
  const [mobilityMemo, setMobilityMemo] = useState('');
  const [transferAbility, setTransferAbility] = useState('');
  const [transferMemo, setTransferMemo] = useState('');
  const [balanceStatus, setBalanceStatus] = useState('');
  const [balanceMemo, setBalanceMemo] = useState('');
  const [upperLimbFunction, setUpperLimbFunction] = useState('');
  const [lowerLimbFunction, setLowerLimbFunction] = useState('');
  const [limbMemo, setLimbMemo] = useState('');
  const [assistiveDeviceWalker, setAssistiveDeviceWalker] = useState(false);
  const [assistiveDeviceCane, setAssistiveDeviceCane] = useState(false);
  const [assistiveDeviceWheelchair, setAssistiveDeviceWheelchair] = useState(false);
  const [assistiveDeviceOther, setAssistiveDeviceOther] = useState('');

  // 4. 일상생활 수행능력 (ADL)
  const [bathingAbility, setBathingAbility] = useState('');
  const [dressingAbility, setDressingAbility] = useState('');
  const [toiletingAbility, setToiletingAbility] = useState('');
  const [feedingAbility, setFeedingAbility] = useState('');
  const [continenceAbility, setContinenceAbility] = useState('');
  const [adlMemo, setAdlMemo] = useState('');

  // 5. 피부 상태
  const [skinCondition, setSkinCondition] = useState('');
  const [pressureUlcerRisk, setPressureUlcerRisk] = useState('');
  const [pressureUlcerPresent, setPressureUlcerPresent] = useState(false);
  const [pressureUlcerLocation, setPressureUlcerLocation] = useState('');
  const [pressureUlcerStage, setPressureUlcerStage] = useState('');
  const [skinMemo, setSkinMemo] = useState('');

  // 6. 의료 상태
  const [chronicDiseases, setChronicDiseases] = useState('');
  const [currentMedications, setCurrentMedications] = useState('');
  const [allergyHistory, setAllergyHistory] = useState('');
  const [recentHospitalization, setRecentHospitalization] = useState('');
  const [painLevel, setPainLevel] = useState('');
  const [painLocation, setPainLocation] = useState('');
  const [medicalMemo, setMedicalMemo] = useState('');

  // 7. 심리·정서 상태
  const [moodStatus, setMoodStatus] = useState('');
  const [depressionSymptoms, setDepressionSymptoms] = useState(false);
  const [anxietySymptoms, setAnxietySymptoms] = useState(false);
  const [behavioralIssues, setBehavioralIssues] = useState('');
  const [sleepQuality, setSleepQuality] = useState('');
  const [psychologicalMemo, setPsychologicalMemo] = useState('');

  // 8. 감각 기능
  const [visionStatus, setVisionStatus] = useState('');
  const [hearingStatus, setHearingStatus] = useState('');
  const [useGlasses, setUseGlasses] = useState(false);
  const [useHearingAid, setUseHearingAid] = useState(false);
  const [sensoryMemo, setSensoryMemo] = useState('');

  // 9. 사회적 지지
  const [familySupport, setFamilySupport] = useState('');
  const [visitFrequency, setVisitFrequency] = useState('');
  const [socialActivity, setSocialActivity] = useState('');
  const [socialMemo, setSocialMemo] = useState('');

  // 10. 종합 평가 및 케어 계획
  const [overallAssessment, setOverallAssessment] = useState('');
  const [carePriority, setCarePriority] = useState('');
  const [careGoals, setCareGoals] = useState('');
  const [interventionPlan, setInterventionPlan] = useState('');

  const [residents] = useState([
    { id: 'R001', name: '김영희' },
    { id: 'R002', name: '이철수' },
    { id: 'R003', name: '박순자' },
    { id: 'R004', name: '최민수' }
  ]);

  // ✅ 수정: selectedResident 변경 시 residentId와 residentName 자동 설정
  useEffect(() => {
    if (selectedResident) {
      const resident = residents.find(r => r.id === selectedResident);
      if (resident) {
        setResidentId(resident.id);
        setResidentName(resident.name);
      }
    }
  }, [selectedResident]);

  // ✅ 추가: mealType 체크박스 변경 시 mealTypes 배열 업데이트
  useEffect(() => {
    const types = [];
    if (mealTypeRegular) types.push('regular');
    if (mealTypeSoft) types.push('soft');
    if (mealTypeGround) types.push('pureed');
    if (mealTypeTherapeutic) types.push('therapeutic');
    setMealTypes(types);
  }, [mealTypeRegular, mealTypeSoft, mealTypeGround, mealTypeTherapeutic]);

  // ✅ 추가: therapeuticDetail 변경 시 therapeuticMealType 업데이트
  useEffect(() => {
    setTherapeuticMealType(therapeuticDetail);
  }, [therapeuticDetail]);

  // ✅ 추가: oralStatus 변경 시 oralHealth 업데이트
  useEffect(() => {
    setOralHealth(oralStatus);
  }, [oralStatus]);

  // ✅ 추가: oralMemo 변경 시 oralHealthMemo 업데이트
  useEffect(() => {
    setOralHealthMemo(oralMemo);
  }, [oralMemo]);

  // ✅ 추가: dentureType 변경 시 dentureStatus 업데이트
  useEffect(() => {
    setDentureStatus(dentureType);
  }, [dentureType]);

  // ✅ 추가: orientation 체크박스 변경 시 개별 변수 업데이트
  useEffect(() => {
    setTimeOrientation(orientationTime);
  }, [orientationTime]);

  useEffect(() => {
    setPlaceOrientation(orientationPlace);
  }, [orientationPlace]);

  useEffect(() => {
    setPersonOrientation(orientationPerson);
  }, [orientationPerson]);

  // BMI 계산 함수
  const calculateBMI = () => {
    if (parseFloat(height) > 0 && parseFloat(weight) > 0) {
      const heightInMeters = parseFloat(height) / 100;
      const bmi = parseFloat(weight) / (heightInMeters * heightInMeters);
      return bmi.toFixed(1);
    }
    return '0.0';
  };

  const handleSave = () => {
    setSaveStatus('saving');
    
    const assessmentData = {
      residentId,
      residentName,
      assessmentDate,
      assessor,
      generalStatus: {
        height,
        weight,
        bmi: calculateBMI(),
        nutritionStatus,
        nutritionMemo,
        mealType: {
          regular: mealTypes.includes('regular'),
          soft: mealTypes.includes('soft'),
          pureed: mealTypes.includes('pureed'),
          therapeutic: mealTypes.includes('therapeutic'),
          therapeuticDetail: therapeuticMealType
        },
        mealTypeMemo,
        mealProblems,
        mealProblemsMemo,
        oralHealth,
        oralHealthMemo,
        dentureStatus,
        dentureType,
        bowelStatus,
        bowelMemo,
        urinaryStatus,
        urinaryMemo
      },
      cognitiveFunction: {
        consciousnessLevel,
        consciousnessMemo,
        memoryStatus,
        memoryMemo,
        orientation: {
          time: timeOrientation,
          place: placeOrientation,
          person: personOrientation
        },
        orientationMemo,
        judgmentAbility,
        judgmentMemo,
        communicationAbility,
        communicationMemo
      }
    };

    localStorage.setItem('needsAssessment', JSON.stringify(assessmentData));
    
    setTimeout(() => {
      setSaveStatus('saved');
      alert('욕구사정 평가가 저장되었습니다.');
      
      setTimeout(() => {
        setSaveStatus('idle');
      }, 2000);
    }, 500);
  };

  const categories = [
    { id: 1, name: '1. 일반 상태', label: '1. 일반 상태', icon: 'ri-user-heart-line', color: 'bg-blue-50 text-blue-600' },
    { id: 2, name: '2. 인지 기능', label: '2. 인지 기능', icon: 'ri-brain-line', color: 'bg-purple-50 text-purple-600' },
    { id: 3, name: '3. 신체 기능', label: '3. 신체 기능', icon: 'ri-run-line', color: 'bg-green-50 text-green-600' },
    { id: 4, name: '4. 일상생활 수행능력', label: '4. 일상생활 수행능력', icon: 'ri-star-smile-line', color: 'bg-yellow-50 text-yellow-600' },
    { id: 5, name: '5. 피부 상태', label: '5. 피부 상태', icon: 'ri-hand-heart-line', color: 'bg-pink-50 text-pink-600' },
    { id: 6, name: '6. 의료 상태', label: '6. 의료 상태', icon: 'ri-stethoscope-line', color: 'bg-red-50 text-red-600' },
    { id: 7, name: '7. 심리·정서 상태', label: '7. 심리·정서 상태', icon: 'ri-emotion-happy-line', color: 'bg-indigo-50 text-indigo-600' },
    { id: 8, name: '8. 감각 기능', label: '8. 감각 기능', icon: 'ri-eye-line', color: 'bg-teal-50 text-teal-600' },
    { id: 9, name: '9. 사회적 지지', label: '9. 사회적 지지', icon: 'ri-group-line', color: 'bg-orange-50 text-orange-600' },
    { id: 10, name: '10. 종합 평가', label: '10. 종합 평가', icon: 'ri-file-list-3-line', color: 'bg-gray-50 text-gray-600' },
  ];

  const renderCategoryContent = () => {
    switch (selectedCategory) {
      case 1:
        return (
          <div className="space-y-6">
            {/* 기본 정보 */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                <i className="ri-user-line text-teal-600"></i>
                기본 정보
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    입소자 선택 <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={selectedResident}
                    onChange={(e) => setSelectedResident(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  >
                    <option value="">입소자를 선택하세요</option>
                    {residents.map(r => (
                      <option key={r.id} value={r.id}>{r.name} ({r.id})</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    평가 일자 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={assessmentDate}
                    onChange={(e) => setAssessmentDate(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    평가자 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={assessor}
                    onChange={(e) => setAssessor(e.target.value)}
                    placeholder="평가자 이름을 입력하세요"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* 신체 정보 */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="text-base font-bold text-gray-900 mb-4">신체 정보</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">키 (cm)</label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">체중 (kg)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">BMI (자동계산)</label>
                  <input
                    type="text"
                    value={calculateBMI()}
                    readOnly
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50"
                  />
                </div>
              </div>
            </div>

            {/* 영양 상태 */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="text-base font-bold text-gray-900 mb-4">영양 상태</h4>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">평가 결과</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { value: 'excellent', label: '양호' },
                      { value: 'good', label: '보통' },
                      { value: 'poor', label: '부족' },
                      { value: 'very_poor', label: '매우 나쁨' }
                    ].map(option => (
                      <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="nutritionStatus"
                          value={option.value}
                          checked={nutritionStatus === option.value}
                          onChange={(e) => setNutritionStatus(e.target.value as any)}
                          className="w-4 h-4 text-teal-600 focus:ring-teal-500"
                        />
                        <span className="text-sm text-gray-700">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">판단 근거 메모</label>
                  <textarea
                    value={nutritionMemo}
                    onChange={(e) => setNutritionMemo(e.target.value)}
                    rows={3}
                    placeholder="영양 상태에 대한 판단 근거를 상세히 기록하세요..."
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                  />
                </div>
              </div>
            </div>

            {/* 식사 형태 */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="text-base font-bold text-gray-900 mb-4">식사 형태</h4>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="checkbox"
                      checked={mealTypeRegular}
                      onChange={(e) => setMealTypeRegular(e.target.checked)}
                      className="w-4 h-4 text-teal-600 focus:ring-teal-500 rounded"
                    />
                    <span className="text-sm font-medium text-gray-700">일반식</span>
                  </label>
                  
                  <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="checkbox"
                      checked={mealTypeSoft}
                      onChange={(e) => setMealTypeSoft(e.target.checked)}
                      className="w-4 h-4 text-teal-600 focus:ring-teal-500 rounded"
                    />
                    <span className="text-sm font-medium text-gray-700">연하식</span>
                  </label>
                  
                  <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="checkbox"
                      checked={mealTypeGround}
                      onChange={(e) => setMealTypeGround(e.target.checked)}
                      className="w-4 h-4 text-teal-600 focus:ring-teal-500 rounded"
                    />
                    <span className="text-sm font-medium text-gray-700">갈은식</span>
                  </label>
                  
                  <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="checkbox"
                      checked={mealTypeTherapeutic}
                      onChange={(e) => setMealTypeTherapeutic(e.target.checked)}
                      className="w-4 h-4 text-teal-600 focus:ring-teal-500 rounded"
                    />
                    <span className="text-sm font-medium text-gray-700">치료식</span>
                  </label>
                </div>
                
                {mealTypeTherapeutic && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">치료식 세부 종류</label>
                    <input
                      type="text"
                      value={therapeuticDetail}
                      onChange={(e) => setTherapeuticDetail(e.target.value)}
                      placeholder="예: 당뇨식, 저염식, 저단백식 등"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">판단 근거 메모</label>
                  <textarea
                    value={mealTypeMemo}
                    onChange={(e) => setMealTypeMemo(e.target.value)}
                    rows={3}
                    placeholder="식사 형태 선택에 대한 판단 근거를 기록하세요..."
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                  />
                </div>
              </div>
            </div>

            {/* 식사 문제점 */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="text-base font-bold text-gray-900 mb-4">식사 문제점</h4>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[{
                    key: 'chewingDifficulty',
                    label: '저작 곤란'
                  }, {
                    key: 'dentalProblems',
                    label: '치아 문제'
                  }, {
                    key: 'indigestion',
                    label: '소화 불량'
                  }, {
                    key: 'swallowingDifficulty',
                    label: '연하 곤란'
                  }, {
                    key: 'poorAppetite',
                    label: '식욕 부진'
                  }].map(item => (
                    <label key={item.key} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="checkbox"
                        checked={mealProblems[item.key as keyof typeof mealProblems] as boolean}
                        onChange={(e) => setMealProblems({
                          ...mealProblems,
                          [item.key]: e.target.checked
                        })}
                        className="w-4 h-4 text-teal-600 focus:ring-teal-500 rounded"
                      />
                      <span className="text-sm font-medium text-gray-700">{item.label}</span>
                    </label>
                  ))}
                  
                  <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="checkbox"
                      checked={mealProblems.other}
                      onChange={(e) => setMealProblems({
                        ...mealProblems,
                        other: e.target.checked
                      })}
                      className="w-4 h-4 text-teal-600 focus:ring-teal-500 rounded"
                    />
                    <span className="text-sm font-medium text-gray-700">기타</span>
                  </label>
                </div>
                
                {mealProblems.other && (
                  <div>
                    <input
                      type="text"
                      value={mealProblems.otherDetail}
                      onChange={(e) => setMealProblems({
                        ...mealProblems,
                        otherDetail: e.target.value
                      })}
                      placeholder="기타 식사 문제점을 입력하세요"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">판단 근거 메모</label>
                  <textarea
                    value={mealProblemsMemo}
                    onChange={(e) => setMealProblemsMemo(e.target.value)}
                    rows={3}
                    placeholder="식사 문제점에 대한 상세 내용을 기록하세요..."
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                  />
                </div>
              </div>
            </div>

            {/* 구강 상태 */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="text-base font-bold text-gray-900 mb-4">구강 상태</h4>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">평가 결과</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { value: 'good', label: '양호' },
                      { value: 'poor_hygiene', label: '청결 불량' },
                      { value: 'weak_teeth', label: '치아 약함' },
                      { value: 'dentures', label: '틀니 착용' }
                    ].map(option => (
                      <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="oralStatus"
                          value={option.value}
                          checked={oralStatus === option.value}
                          onChange={(e) => setOralStatus(e.target.value as any)}
                          className="w-4 h-4 text-teal-600 focus:ring-teal-500"
                        />
                        <span className="text-sm text-gray-700">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                {oralStatus === 'dentures' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">틀니 종류</label>
                    <input
                      type="text"
                      value={dentureType}
                      onChange={(e) => setDentureType(e.target.value)}
                      placeholder="예: 상악 틀니, 하악 틀니, 전체 틀니 등"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">판단 근거 메모</label>
                  <textarea
                    value={oralMemo}
                    onChange={(e) => setOralMemo(e.target.value)}
                    rows={3}
                    placeholder="구강 상태에 대한 상세 내용을 기록하세요..."
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                  />
                </div>
              </div>
            </div>

            {/* 배변 상태 */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="text-base font-bold text-gray-900 mb-4">배변 상태</h4>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">평가 결과</label>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {[
                      { value: 'normal', label: '정상' },
                      { value: 'constipation', label: '변비' },
                      { value: 'diarrhea', label: '설사' },
                      { value: 'frequent', label: '잦은 배변' },
                      { value: 'incontinence', label: '실금' }
                    ].map(option => (
                      <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="bowelStatus"
                          value={option.value}
                          checked={bowelStatus === option.value}
                          onChange={(e) => setBowelStatus(e.target.value as any)}
                          className="w-4 h-4 text-teal-600 focus:ring-teal-500"
                        />
                        <span className="text-sm text-gray-700">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">판단 근거 메모</label>
                  <textarea
                    value={bowelMemo}
                    onChange={(e) => setBowelMemo(e.target.value)}
                    rows={3}
                    placeholder="배변 상태에 대한 상세 내용을 기록하세요..."
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                  />
                </div>
              </div>
            </div>

            {/* 배뇨 상태 */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="text-base font-bold text-gray-900 mb-4">배뇨 상태</h4>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">평가 결과</label>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {[
                      { value: 'normal', label: '정상' },
                      { value: 'frequent', label: '빈뇨' },
                      { value: 'difficult', label: '배뇨 곤란' },
                      { value: 'incontinence', label: '요실금' },
                      { value: 'catheter', label: '도뇨관 사용' }
                    ].map(option => (
                      <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="urinaryStatus"
                          value={option.value}
                          checked={urinaryStatus === option.value}
                          onChange={(e) => setUrinaryStatus(e.target.value as any)}
                          className="w-4 h-4 text-teal-600 focus:ring-teal-500"
                        />
                        <span className="text-sm text-gray-700">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">판단 근거 메모</label>
                  <textarea
                    value={urinaryMemo}
                    onChange={(e) => setUrinaryMemo(e.target.value)}
                    rows={3}
                    placeholder="배뇨 상태에 대한 상세 내용을 기록하세요..."
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            {/* 의식 수준 */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="text-base font-bold text-gray-900 mb-4">의식 수준</h4>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">평가 결과</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { value: 'alert', label: '명료' },
                      { value: 'drowsy', label: '기면' },
                      { value: 'confused', label: '혼돈' },
                      { value: 'stupor', label: '혼미' }
                    ].map(option => (
                      <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="consciousnessLevel"
                          value={option.value}
                          checked={consciousnessLevel === option.value}
                          onChange={(e) => setConsciousnessLevel(e.target.value as any)}
                          className="w-4 h-4 text-teal-600 focus:ring-teal-500"
                        />
                        <span className="text-sm text-gray-700">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">판단 근거 메모</label>
                  <textarea
                    value={consciousnessMemo}
                    onChange={(e) => setConsciousnessMemo(e.target.value)}
                    rows={3}
                    placeholder="의식 수준에 대한 관찰 내용을 기록하세요..."
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                  />
                </div>
              </div>
            </div>

            {/* 기억력 */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="text-base font-bold text-gray-900 mb-4">기억력 상태</h4>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">평가 결과</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { value: 'normal', label: '정상' },
                      { value: 'mild_impairment', label: '경미한 손상' },
                      { value: 'moderate_impairment', label: '중등도 손상' },
                      { value: 'severe_impairment', label: '심각한 손상' }
                    ].map(option => (
                      <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="memoryStatus"
                          value={option.value}
                          checked={memoryStatus === option.value}
                          onChange={(e) => setMemoryStatus(e.target.value as any)}
                          className="w-4 h-4 text-teal-600 focus:ring-teal-500"
                        />
                        <span className="text-sm text-gray-700">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">판단 근거 메모</label>
                  <textarea
                    value={memoryMemo}
                    onChange={(e) => setMemoryMemo(e.target.value)}
                    rows={3}
                    placeholder="기억력 평가 근거를 기록하세요..."
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                  />
                </div>
              </div>
            </div>

            {/* 지남력 */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="text-base font-bold text-gray-900 mb-4">지남력 (Orientation)</h4>
              
              <div className="space-y-4">
                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="checkbox"
                      checked={orientationTime}
                      onChange={(e) => setOrientationTime(e.target.checked)}
                      className="w-4 h-4 text-teal-600 focus:ring-teal-500 rounded"
                    />
                    <div>
                      <span className="text-sm font-medium text-gray-700">시간 지남력</span>
                      <p className="text-xs text-gray-500 mt-1">날짜, 요일, 시간을 정확히 인지</p>
                    </div>
                  </label>
                  
                  <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="checkbox"
                      checked={orientationPlace}
                      onChange={(e) => setOrientationPlace(e.target.checked)}
                      className="w-4 h-4 text-teal-600 focus:ring-teal-500 rounded"
                    />
                    <div>
                      <span className="text-sm font-medium text-gray-700">장소 지남력</span>
                      <p className="text-xs text-gray-500 mt-1">현재 위치를 정확히 인지</p>
                    </div>
                  </label>
                  
                  <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="checkbox"
                      checked={orientationPerson}
                      onChange={(e) => setOrientationPerson(e.target.checked)}
                      className="w-4 h-4 text-teal-600 focus:ring-teal-500 rounded"
                    />
                    <div>
                      <span className="text-sm font-medium text-gray-700">사람 지남력</span>
                      <p className="text-xs text-gray-500 mt-1">자신과 타인을 정확히 인지</p>
                    </div>
                  </label>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">판단 근거 메모</label>
                  <textarea
                    value={orientationMemo}
                    onChange={(e) => setOrientationMemo(e.target.value)}
                    rows={3}
                    placeholder="지남력 평가 내용을 상세히 기록하세요..."
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                  />
                </div>
              </div>
            </div>

            {/* 판단력 */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="text-base font-bold text-gray-900 mb-4">판단력</h4>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">평가 결과</label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { value: 'good', label: '양호' },
                      { value: 'fair', label: '보통' },
                      { value: 'poor', label: '불량' }
                    ].map(option => (
                      <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="judgmentAbility"
                          value={option.value}
                          checked={judgmentAbility === option.value}
                          onChange={(e) => setJudgmentAbility(e.target.value as any)}
                          className="w-4 h-4 text-teal-600 focus:ring-teal-500"
                        />
                        <span className="text-sm text-gray-700">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">판단 근거 메모</label>
                  <textarea
                    value={judgmentMemo}
                    onChange={(e) => setJudgmentMemo(e.target.value)}
                    rows={3}
                    placeholder="판단력 평가 내용을 기록하세요..."
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                  />
                </div>
              </div>
            </div>

            {/* 의사소통 능력 */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="text-base font-bold text-gray-900 mb-4">의사소통 능력</h4>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">평가 결과</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { value: 'fluent', label: '원활함' },
                      { value: 'limited', label: '제한적' },
                      { value: 'difficult', label: '어려움' },
                      { value: 'impossible', label: '불가능' }
                    ].map(option => (
                      <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="communicationAbility"
                          value={option.value}
                          checked={communicationAbility === option.value}
                          onChange={(e) => setCommunicationAbility(e.target.value as any)}
                          className="w-4 h-4 text-teal-600 focus:ring-teal-500"
                        />
                        <span className="text-sm text-gray-700">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">판단 근거 메모</label>
                  <textarea
                    value={communicationMemo}
                    onChange={(e) => setCommunicationMemo(e.target.value)}
                    rows={3}
                    placeholder="의사소통 능력 평가 내용을 기록하세요..."
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-base font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <i className="ri-wheelchair-line text-green-600"></i>
                이동 능력
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">이동 수준</label>
                  <div className="flex flex-wrap gap-3">
                    {['독립', '부분 도움', '완전 도움', '침상 안정'].map((option) => (
                      <label key={option} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="mobilityLevel"
                          checked={mobilityLevel === option}
                          onChange={() => setMobilityLevel(option)}
                          className="w-4 h-4"
                        />
                        <span className="text-sm text-gray-700">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">판단 근거</label>
                  <textarea
                    value={mobilityMemo}
                    onChange={(e) => setMobilityMemo(e.target.value)}
                    placeholder="이동 능력에 대한 상세 평가를 입력하세요"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    rows={2}
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-base font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <i className="ri-arrow-left-right-line text-green-600"></i>
                이동·이승 능력
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">침상-의자 이동</label>
                  <div className="flex flex-wrap gap-3">
                    {['독립', '최소 도움', '부분 도움', '완전 도움'].map((option) => (
                      <label key={option} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="transferAbility"
                          checked={transferAbility === option}
                          onChange={() => setTransferAbility(option)}
                          className="w-4 h-4"
                        />
                        <span className="text-sm text-gray-700">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">판단 근거</label>
                  <textarea
                    value={transferMemo}
                    onChange={(e) => setTransferMemo(e.target.value)}
                    placeholder="이승 능력에 대한 상세 평가를 입력하세요"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    rows={2}
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-base font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <i className="ri-contrast-drop-2-line text-green-600"></i>
                균형 감각
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">균형 상태</label>
                  <div className="flex flex-wrap gap-3">
                    {['양호', '보통', '불안정', '매우 불안정'].map((option) => (
                      <label key={option} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="balanceStatus"
                          checked={balanceStatus === option}
                          onChange={() => setBalanceStatus(option)}
                          className="w-4 h-4"
                        />
                        <span className="text-sm text-gray-700">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">판단 근거</label>
                  <textarea
                    value={balanceMemo}
                    onChange={(e) => setBalanceMemo(e.target.value)}
                    placeholder="균형 감각에 대한 상세 평가를 입력하세요"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    rows={2}
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-base font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <i className="ri-hand-heart-line text-green-600"></i>
                사지 기능
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">상지 기능</label>
                  <div className="flex flex-wrap gap-3">
                    {['정상', '경미한 제한', '중등도 제한', '심한 제한'].map((option) => (
                      <label key={option} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="upperLimbFunction"
                          checked={upperLimbFunction === option}
                          onChange={() => setUpperLimbFunction(option)}
                          className="w-4 h-4"
                        />
                        <span className="text-sm text-gray-700">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">하지 기능</label>
                  <div className="flex flex-wrap gap-3">
                    {['정상', '경미한 제한', '중등도 제한', '심한 제한'].map((option) => (
                      <label key={option} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="lowerLimbFunction"
                          checked={lowerLimbFunction === option}
                          onChange={() => setLowerLimbFunction(option)}
                          className="w-4 h-4"
                        />
                        <span className="text-sm text-gray-700">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">판단 근거</label>
                  <textarea
                    value={limbMemo}
                    onChange={(e) => setLimbMemo(e.target.value)}
                    placeholder="사지 기능에 대한 상세 평가를 입력하세요"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    rows={2}
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-base font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <i className="ri-wheelchair-line text-green-600"></i>
                보조기구 사용
              </h3>
              <div className="space-y-3">
                <div className="flex flex-wrap gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={assistiveDeviceWalker}
                      onChange={(e) => setAssistiveDeviceWalker(e.target.checked)}
                      className="w-4 h-4"
                    />
                    <span className="text-sm text-gray-700">보행기</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={assistiveDeviceCane}
                      onChange={(e) => setAssistiveDeviceCane(e.target.checked)}
                      className="w-4 h-4"
                    />
                    <span className="text-sm text-gray-700">지팡이</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={assistiveDeviceWheelchair}
                      onChange={(e) => setAssistiveDeviceWheelchair(e.target.checked)}
                      className="w-4 h-4"
                    />
                    <span className="text-sm text-gray-700">휠체어</span>
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">기타 보조기구</label>
                  <input
                    type="text"
                    value={assistiveDeviceOther}
                    onChange={(e) => setAssistiveDeviceOther(e.target.value)}
                    placeholder="기타 사용 중인 보조기구를 입력하세요"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-base font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <i className="ri-shower-line text-yellow-600"></i>
                목욕하기
              </h3>
              <div className="flex flex-wrap gap-3">
                {['독립', '부분 도움', '완전 도움'].map((option) => (
                  <label key={option} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="bathingAbility"
                      value={option}
                      checked={bathingAbility === option}
                      onChange={(e) => setBathingAbility(e.target.value)}
                      className="w-4 h-4"
                    />
                    <span className="text-sm text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-base font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <i className="ri-shirt-line text-yellow-600"></i>
                옷 입고 벗기
              </h3>
              <div className="flex flex-wrap gap-3">
                {['독립', '부분 도움', '완전 도움'].map((option) => (
                  <label key={option} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="dressingAbility"
                      value={option}
                      checked={dressingAbility === option}
                      onChange={(e) => setDressingAbility(e.target.value)}
                      className="w-4 h-4"
                    />
                    <span className="text-sm text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-base font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <i className="ri-home-heart-line text-yellow-600"></i>
                화장실 사용
              </h3>
              <div className="flex flex-wrap gap-3">
                {['독립', '부분 도움', '완전 도움', '기저귀 사용'].map((option) => (
                  <label key={option} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="toiletingAbility"
                      value={option}
                      checked={toiletingAbility === option}
                      onChange={(e) => setToiletingAbility(e.target.value)}
                      className="w-4 h-4"
                    />
                    <span className="text-sm text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-base font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <i className="ri-restaurant-line text-yellow-600"></i>
                식사하기
              </h3>
              <div className="flex flex-wrap gap-3">
                {['독립', '부분 도움', '완전 도움'].map((option) => (
                  <label key={option} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="feedingAbility"
                      value={option}
                      checked={feedingAbility === option}
                      onChange={(e) => setFeedingAbility(e.target.value)}
                      className="w-4 h-4"
                    />
                    <span className="text-sm text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-base font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <i className="ri-drop-line text-yellow-600"></i>
                대소변 조절
              </h3>
              <div className="flex flex-wrap gap-3">
                {['완전 조절', '가끔 실금', '자주 실금', '조절 불가'].map((option) => (
                  <label key={option} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="continenceAbility"
                      value={option}
                      checked={continenceAbility === option}
                      onChange={(e) => setContinenceAbility(e.target.value)}
                      className="w-4 h-4"
                    />
                    <span className="text-sm text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-base font-semibold text-gray-800 mb-4">종합 판단 근거</h3>
              <textarea
                value={adlMemo}
                onChange={(e) => setAdlMemo(e.target.value)}
                placeholder="일상생활 수행능력에 대한 종합 평가를 입력하세요"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                rows={4}
              />
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-base font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <i className="ri-heart-pulse-line text-pink-600"></i>
                전반적 피부 상태
              </h3>
              <div className="flex flex-wrap gap-3">
                {['양호', '보통', '건조', '습윤', '취약'].map((option) => (
                  <label key={option} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="skinCondition"
                      value={option}
                      checked={skinCondition === option}
                      onChange={(e) => setSkinCondition(e.target.value)}
                      className="w-4 h-4"
                    />
                    <span className="text-sm text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-base font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <i className="ri-alert-line text-pink-600"></i>
                욕창 위험도
              </h3>
              <div className="flex flex-wrap gap-3">
                {['없음', '낮음', '중간', '높음', '매우 높음'].map((option) => (
                  <label key={option} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="pressureUlcerRisk"
                      value={option}
                      checked={pressureUlcerRisk === option}
                      onChange={(e) => setPressureUlcerRisk(e.target.value)}
                      className="w-4 h-4"
                    />
                    <span className="text-sm text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-base font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <i className="ri-error-warning-line text-pink-600"></i>
                욕창 발생 여부
              </h3>
              <div className="space-y-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={pressureUlcerPresent}
                    onChange={(e) => setPressureUlcerPresent(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm text-gray-700 font-medium">욕창 있음</span>
                </label>

                {pressureUlcerPresent && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">욕창 위치</label>
                      <input
                        type="text"
                        value={pressureUlcerLocation}
                        onChange={(e) => setPressureUlcerLocation(e.target.value)}
                        placeholder="예: 천골부, 둔부, 발뒤꿈치 등"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">욕창 단계</label>
                      <div className="flex flex-wrap gap-3">
                        {['1단계', '2단계', '3단계', '4단계', '미분류'].map((option) => (
                          <label key={option} className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              name="pressureUlcerStage"
                              value={option}
                              checked={pressureUlcerStage === option}
                              onChange={(e) => setPressureUlcerStage(e.target.value)}
                              className="w-4 h-4"
                            />
                            <span className="text-sm text-gray-700">{option}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-base font-semibold text-gray-800 mb-4">판단 근거</h3>
              <textarea
                value={skinMemo}
                onChange={(e) => setSkinMemo(e.target.value)}
                placeholder="피부 상태에 대한 상세 평가를 입력하세요"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                rows={4}
              />
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-base font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <i className="ri-medicine-bottle-line text-red-600"></i>
                만성 질환
              </h3>
              <textarea
                value={chronicDiseases}
                onChange={(e) => setChronicDiseases(e.target.value)}
                placeholder="진단받은 만성 질환을 모두 입력하세요 (예: 고혈압, 당뇨병, 치매 등)"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                rows={3}
              />
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-base font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <i className="ri-capsule-line text-red-600"></i>
                현재 복용 약물
              </h3>
              <textarea
                value={currentMedications}
                onChange={(e) => setCurrentMedications(e.target.value)}
                placeholder="현재 복용 중인 약물명과 용량을 입력하세요"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                rows={3}
              />
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-base font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <i className="ri-alert-line text-red-600"></i>
                알레르기 이력
              </h3>
              <textarea
                value={allergyHistory}
                onChange={(e) => setAllergyHistory(e.target.value)}
                placeholder="약물 또는 음식 알레르기가 있다면 입력하세요"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                rows={2}
              />
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-base font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <i className="ri-hospital-line text-red-600"></i>
                최근 입원 이력
              </h3>
              <textarea
                value={recentHospitalization}
                onChange={(e) => setRecentHospitalization(e.target.value)}
                placeholder="최근 6개월 내 입원 이력이 있다면 입력하세요 (날짜, 병원, 진단명)"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                rows={2}
              />
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-base font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <i className="ri-heart-add-line text-red-600"></i>
                통증 평가
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">통증 수준 (0-10점)</label>
                  <div className="flex flex-wrap gap-2">
                    {['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'].map((level) => (
                      <label key={level} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="painLevel"
                          value={level}
                          checked={painLevel === level}
                          onChange={() => setPainLevel(level)}
                          className="w-4 h-4"
                        />
                        <span className="text-sm text-gray-700">{level}</span>
                      </label>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-2">0 = 통증 없음, 10 = 극심한 통증</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">통증 부위</label>
                  <input
                    type="text"
                    value={painLocation}
                    onChange={(e) => setPainLocation(e.target.value)}
                    placeholder="통증이 있는 부위를 입력하세요"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-base font-semibold text-gray-800 mb-4">판단 근거</h3>
              <textarea
                value={medicalMemo}
                onChange={(e) => setMedicalMemo(e.target.value)}
                placeholder="의료 상태에 대한 종합 평가를 입력하세요"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                rows={4}
              />
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-base font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <i className="ri-emotion-line text-indigo-600"></i>
                기분 상태
              </h3>
              <div className="flex flex-wrap gap-3">
                {['양호', '보통', '우울함', '불안함', '무기력'].map((option) => (
                  <label key={option} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="moodStatus"
                      value={option}
                      checked={moodStatus === option}
                      onChange={(e) => setMoodStatus(e.target.value)}
                      className="w-4 h-4"
                    />
                    <span className="text-sm text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-base font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <i className="ri-heart-2-line text-indigo-600"></i>
                심리적 증상
              </h3>
              <div className="space-y-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={depressionSymptoms}
                    onChange={(e) => setDepressionSymptoms(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm text-gray-700">우울증 증상 (흥미 상실, 식욕 저하, 수면 장애 등)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={anxietySymptoms}
                    onChange={(e) => setAnxietySymptoms(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm text-gray-700">불안 증상 (초조함, 안절부절, 과도한 걱정 등)</span>
                </label>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-base font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <i className="ri-user-voice-line text-indigo-600"></i>
                행동 문제
              </h3>
              <textarea
                value={behavioralIssues}
                onChange={(e) => setBehavioralIssues(e.target.value)}
                placeholder="배회, 공격성, 소리 지르기, 거부 행동 등의 문제 행동이 있다면 입력하세요"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                rows={3}
              />
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-base font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <i className="ri-moon-line text-indigo-600"></i>
                수면 상태
              </h3>
              <div className="flex flex-wrap gap-3">
                {['양호', '보통', '불면증', '자주 깸', '과수면'].map((option) => (
                  <label key={option} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="sleepQuality"
                      value={option}
                      checked={sleepQuality === option}
                      onChange={(e) => setSleepQuality(e.target.value)}
                      className="w-4 h-4"
                    />
                    <span className="text-sm text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-base font-semibold text-gray-800 mb-4">판단 근거</h3>
              <textarea
                value={psychologicalMemo}
                onChange={(e) => setPsychologicalMemo(e.target.value)}
                placeholder="심리·정서 상태에 대한 상세 평가를 입력하세요"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                rows={4}
              />
            </div>
          </div>
        );

      case 8:
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-base font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <i className="ri-eye-line text-teal-600"></i>
                시력 상태
              </h3>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-3">
                  {['정상', '경미한 저하', '중등도 저하', '심한 저하', '실명'].map((option) => (
                    <label key={option} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="visionStatus"
                        value={option}
                        checked={visionStatus === option}
                        onChange={(e) => setVisionStatus(e.target.value)}
                        className="w-4 h-4"
                      />
                      <span className="text-sm text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={useGlasses}
                    onChange={(e) => setUseGlasses(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm text-gray-700">안경 또는 돋보기 사용</span>
                </label>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-base font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <i className="ri-volume-up-line text-teal-600"></i>
                청력 상태
              </h3>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-3">
                  {['정상', '경미한 저하', '중등도 저하', '심한 저하', '청각 상실'].map((option) => (
                    <label key={option} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="hearingStatus"
                        value={option}
                        checked={hearingStatus === option}
                        onChange={(e) => setHearingStatus(e.target.value)}
                        className="w-4 h-4"
                      />
                      <span className="text-sm text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={useHearingAid}
                    onChange={(e) => setUseHearingAid(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm text-gray-700">보청기 사용</span>
                </label>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-base font-semibold text-gray-800 mb-4">판단 근거</h3>
              <textarea
                value={sensoryMemo}
                onChange={(e) => setSensoryMemo(e.target.value)}
                placeholder="감각 기능에 대한 상세 평가를 입력하세요"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                rows={4}
              />
            </div>
          </div>
        );

      case 9:
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-base font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <i className="ri-parent-line text-orange-600"></i>
                가족 지지
              </h3>
              <div className="flex flex-wrap gap-3">
                {['매우 좋음', '좋음', '보통', '약함', '없음'].map((option) => (
                  <label key={option} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="familySupport"
                      value={option}
                      checked={familySupport === option}
                      onChange={(e) => setFamilySupport(e.target.value)}
                      className="w-4 h-4"
                    />
                    <span className="text-sm text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-base font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <i className="ri-calendar-check-line text-orange-600"></i>
                방문 빈도
              </h3>
              <div className="flex flex-wrap gap-3">
                {['주 2회 이상', '주 1회', '월 2-3회', '월 1회', '거의 없음'].map((option) => (
                  <label key={option} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="visitFrequency"
                      value={option}
                      checked={visitFrequency === option}
                      onChange={(e) => setVisitFrequency(e.target.value)}
                      className="w-4 h-4"
                    />
                    <span className="text-sm text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-base font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <i className="ri-group-line text-orange-600"></i>
                사회 활동 참여
              </h3>
              <div className="flex flex-wrap gap-3">
                {['적극적', '보통', '소극적', '거의 없음'].map((option) => (
                  <label key={option} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="socialActivity"
                      value={option}
                      checked={socialActivity === option}
                      onChange={(e) => setSocialActivity(e.target.value)}
                      className="w-4 h-4"
                    />
                    <span className="text-sm text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-base font-semibold text-gray-800 mb-4">판단 근거</h3>
              <textarea
                value={socialMemo}
                onChange={(e) => setSocialMemo(e.target.value)}
                placeholder="사회적 지지에 대한 상세 평가를 입력하세요"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                rows={4}
              />
            </div>
          </div>
        );

      case 10:
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-base font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <i className="ri-file-text-line text-gray-600"></i>
                종합 평가 소견
              </h3>
              <textarea
                value={overallAssessment}
                onChange={(e) => setOverallAssessment(e.target.value)}
                placeholder="입소자의 전반적인 상태에 대한 종합 평가를 작성하세요"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                rows={5}
              />
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-base font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <i className="ri-flag-line text-gray-600"></i>
                케어 우선순위
              </h3>
              <textarea
                value={carePriority}
                onChange={(e) => setCarePriority(e.target.value)}
                placeholder="우선적으로 관리해야 할 사항들을 순서대로 작성하세요"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                rows={4}
              />
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-base font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <i className="ri-target-line text-gray-600"></i>
                케어 목표
              </h3>
              <textarea
                value={careGoals}
                onChange={(e) => setCareGoals(e.target.value)}
                placeholder="단기 목표와 장기 목표를 구체적으로 작성하세요"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                rows={5}
              />
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-base font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <i className="ri-roadmap-line text-gray-600"></i>
                중재 계획
              </h3>
              <textarea
                value={interventionPlan}
                onChange={(e) => setInterventionPlan(e.target.value)}
                placeholder="목표 달성을 위한 구체적인 중재 계획을 작성하세요 (서비스 종류, 빈도, 담당자 등)"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                rows={6}
              />
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <i className="ri-lightbulb-line text-yellow-600 text-xl mt-0.5"></i>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-yellow-800 mb-1">작성 가이드</h4>
                  <ul className="text-xs text-yellow-700 space-y-1">
                    <li>• 종합 평가: 1~9번 항목의 내용을 종합하여 전반적 상태를 기술</li>
                    <li>• 케어 우선순위: 가장 시급한 문제부터 순서대로 나열</li>
                    <li>• 케어 목표: 달성 가능한 구체적이고 측정 가능한 목표 설정 (SMART 원칙)</li>
                    <li>• 중재 계획: 목표 달성을 위한 구체적인 방법, 담당자, 일정 명시</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-12 text-gray-500">
            해당 카테고리의 내용이 준비 중입니다.
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">욕구사정 평가 (연1회)</h2>
          <p className="text-sm text-gray-600">입소자의 전반적인 건康 상태와 케어 욕구를 종합 평가합니다</p>
        </div>
        
        <button
          onClick={handleSave}
          disabled={saveStatus === 'saving'}
          className="px-6 py-2.5 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-lg font-medium hover:shadow-lg transition-all cursor-pointer whitespace-nowrap disabled:opacity-50 flex items-center gap-2"
        >
          {saveStatus === 'saving' ? (
            <>
              <i className="ri-loader-4-line animate-spin"></i>
              저장 중...
            </>
          ) : saveStatus === 'saved' ? (
            <>
              <i className="ri-check-line"></i>
              저장 완료
            </>
          ) : (
            <>
              <i className="ri-save-line"></i>
              저장하기
            </>
          )}
        </button>
      </div>

      <div className="flex gap-6">
        {/* 좌측 카테고리 네비게이션 */}
        <div className="col-span-12 lg:col-span-3">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sticky top-20">
            <h3 className="text-sm font-bold text-gray-900 mb-3 px-2">평가 항목</h3>
            <nav className="space-y-1">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setActiveSection(category.id)}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                    activeSection === category.id
                      ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-md'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <i className={`${category.icon} text-lg`}></i>
                  <span className="text-left flex-1">{category.label}</span>
                  {activeSection === category.id && (
                    <i className="ri-arrow-right-s-line"></i>
                  )}
                </button>
              ))}
            </nav>
            
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="text-xs text-gray-500 px-2">
                <p className="mb-1">진행률</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-teal-500 to-cyan-500 transition-all"
                      style={{ width: `${(activeSection / categories.length) * 100}%` }}
                    ></div>
                  </div>
                  <span className="font-medium">{Math.round((activeSection / categories.length) * 100)}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 우측 상세 입력 폼 */}
        <div className="col-span-12 lg:col-span-9">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="mb-6">
              <h3 className="text-base font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <i className={`${categories[activeSection - 1].icon} text-teal-600`}></i>
                {categories[activeSection - 1].label}
              </h3>
            </div>
            
            {renderCategoryContent()}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default NeedsAssessment;
