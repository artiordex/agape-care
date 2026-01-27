/**
 * @description 식단 Mock 데이터
 * @author Shiwoo Min
 * @date 2026-01-27
 */

export const mockMealPlans = [
  {
    id: '1',
    facilityCode: 'DEFAULT',
    weekStartDate: '2026-01-27', // 월요일
    createdBy: '6',
    createdByName: '강조리사',
    status: 'PUBLISHED' as const,
    notes: '2026년 1월 5주차 식단',
    createdAt: '2026-01-20T10:00:00Z',
    updatedAt: '2026-01-24T15:00:00Z',
  },
  {
    id: '2',
    facilityCode: 'DEFAULT',
    weekStartDate: '2026-02-03', // 다음 주 월요일
    createdBy: '6',
    createdByName: '강조리사',
    status: 'DRAFT' as const,
    notes: '2026년 2월 1주차 식단 (작성 중)',
    createdAt: '2026-01-27T09:00:00Z',
    updatedAt: '2026-01-27T09:00:00Z',
  },
];

export const mockMealPlanItems = [
  // 2026-01-27 (월요일)
  {
    id: '1',
    mealPlanId: '1',
    mealDate: '2026-01-27',
    mealType: 'BREAKFAST' as const,
    mainMenu: '흰쌀밥',
    sideMenu: '된장찌개, 김치, 계란찜',
    soup: '된장찌개',
    dessert: null,
    calories: 450,
    notes: null,
    createdAt: '2026-01-20T10:00:00Z',
    updatedAt: '2026-01-24T15:00:00Z',
  },
  {
    id: '2',
    mealPlanId: '1',
    mealDate: '2026-01-27',
    mealType: 'LUNCH' as const,
    mainMenu: '쌀밥',
    sideMenu: '불고기, 시금치나물, 김치, 깍두기',
    soup: '미역국',
    dessert: '과일(사과)',
    calories: 650,
    notes: null,
    createdAt: '2026-01-20T10:00:00Z',
    updatedAt: '2026-01-24T15:00:00Z',
  },
  {
    id: '3',
    mealPlanId: '1',
    mealDate: '2026-01-27',
    mealType: 'DINNER' as const,
    mainMenu: '쌀밥',
    sideMenu: '생선구이, 무나물, 김치',
    soup: '콩나물국',
    dessert: null,
    calories: 550,
    notes: null,
    createdAt: '2026-01-20T10:00:00Z',
    updatedAt: '2026-01-24T15:00:00Z',
  },
  {
    id: '4',
    mealPlanId: '1',
    mealDate: '2026-01-27',
    mealType: 'SNACK' as const,
    mainMenu: '우유',
    sideMenu: '과일(바나나)',
    soup: null,
    dessert: null,
    calories: 150,
    notes: null,
    createdAt: '2026-01-20T10:00:00Z',
    updatedAt: '2026-01-24T15:00:00Z',
  },

  // 2026-01-28 (화요일)
  {
    id: '5',
    mealPlanId: '1',
    mealDate: '2026-01-28',
    mealType: 'BREAKFAST' as const,
    mainMenu: '흰쌀밥',
    sideMenu: '북어국, 김치, 멸치볶음',
    soup: '북어국',
    dessert: null,
    calories: 420,
    notes: null,
    createdAt: '2026-01-20T10:00:00Z',
    updatedAt: '2026-01-24T15:00:00Z',
  },
  {
    id: '6',
    mealPlanId: '1',
    mealDate: '2026-01-28',
    mealType: 'LUNCH' as const,
    mainMenu: '잡곡밥',
    sideMenu: '돈가스, 샐러드, 김치',
    soup: '양파수프',
    dessert: '요구르트',
    calories: 680,
    notes: null,
    createdAt: '2026-01-20T10:00:00Z',
    updatedAt: '2026-01-24T15:00:00Z',
  },
  {
    id: '7',
    mealPlanId: '1',
    mealDate: '2026-01-28',
    mealType: 'DINNER' as const,
    mainMenu: '쌀밥',
    sideMenu: '두부조림, 콩나물무침, 김치',
    soup: '무국',
    dessert: null,
    calories: 520,
    notes: null,
    createdAt: '2026-01-20T10:00:00Z',
    updatedAt: '2026-01-24T15:00:00Z',
  },
  {
    id: '8',
    mealPlanId: '1',
    mealDate: '2026-01-28',
    mealType: 'SNACK' as const,
    mainMenu: '호상요구르트',
    sideMenu: '쿠키',
    soup: null,
    dessert: null,
    calories: 180,
    notes: null,
    createdAt: '2026-01-20T10:00:00Z',
    updatedAt: '2026-01-24T15:00:00Z',
  },
];

// 주간 식단 조회용
export const mockWeeklyMealPlan = {
  mealPlan: mockMealPlans[0],
  dailyMeals: [
    {
      date: '2026-01-27',
      meals: {
        breakfast: mockMealPlanItems[0],
        lunch: mockMealPlanItems[1],
        dinner: mockMealPlanItems[2],
        snack: mockMealPlanItems[3],
      },
      totalCalories: 1800,
    },
    {
      date: '2026-01-28',
      meals: {
        breakfast: mockMealPlanItems[4],
        lunch: mockMealPlanItems[5],
        dinner: mockMealPlanItems[6],
        snack: mockMealPlanItems[7],
      },
      totalCalories: 1800,
    },
    // ... 나머지 요일도 비슷하게
  ],
  weekStartDate: '2026-01-27',
  weekEndDate: '2026-02-02',
};
