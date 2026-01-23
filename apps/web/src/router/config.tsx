import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const HomePage = lazy(() => import('../app/page'));
const IntroPage = lazy(() => import('../app/intro/page'));
const IntroHistoryPage = lazy(() => import('../app/intro/history/page'));
const IntroStaffPage = lazy(() => import('../app/intro/staff/page'));
const FacilityPage = lazy(() => import('../app/facility/page'));
const CommunitiesPage = lazy(() => import('../app/communities/page'));
const CommunityDetailPage = lazy(() => import('../app/communities/detail/page'));
const BoardPage = lazy(() => import('../app/notices/board/page'));
const GalleryPage = lazy(() => import('../app/gallery/page'));
const MealPlanPage = lazy(() => import('../app/notices/meal-plan/page'));
const ProgramSchedulePage = lazy(() => import('../app/notices/program-schedule/page'));
const CognitiveProgramPage = lazy(() => import('../app/services/cognitive-program/page'));
const LeisureProgramPage = lazy(() => import('../app/services/leisure-program/page'));
const MedicalNursingPage = lazy(() => import('../app/services/medical-nursing/page'));
const RehabilitationPage = lazy(() => import('../app/services/rehabilitation/page'));
const NutritionCarePage = lazy(() => import('../app/services/nutrition-care/page'));
const AdmissionProcessPage = lazy(() => import('../app/services/admission-process/page'));
const StepCareProgramPage = lazy(() => import('../app/services/step-care-program/page'));
const FamilySupportPage = lazy(() => import('../app/services/family-support/page'));
const DailyLifePage = lazy(() => import('../app/services/daily-life/page'));
const IndividualCarePage = lazy(() => import('../app/services/individual-care/page'));
const CostPage = lazy(() => import('../app/cost/page'));
const VisitPage = lazy(() => import('../app/visit/page'));
const NotFound = lazy(() => import('../app/not-found'));

// Admin Pages
const AdminLoginPage = lazy(() => import('../pages/admin/login/page'));
const AdminDashboardPage = lazy(() => import('../pages/admin/dashboard/page'));
const AdminMyPage = lazy(() => import('../pages/admin/my-page/page'));

// Mobile Pages
const MobileAttendancePage = lazy(() => import('../../../admin/src/app/mobile/attendance/page'));

const routes: RouteObject[] = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/intro',
    element: <IntroPage />,
  },
  {
    path: '/intro/history',
    element: <IntroHistoryPage />,
  },
  {
    path: '/intro/staff',
    element: <IntroStaffPage />,
  },
  {
    path: '/facility',
    element: <FacilityPage />,
  },
  {
    path: '/communities',
    element: <CommunitiesPage />,
  },
  {
    path: '/communities/detail',
    element: <CommunityDetailPage />,
  },
  {
    path: '/board',
    element: <BoardPage />,
  },
  {
    path: '/gallery',
    element: <GalleryPage />,
  },
  {
    path: '/meal-plan',
    element: <MealPlanPage />,
  },
  {
    path: '/program-schedule',
    element: <ProgramSchedulePage />,
  },
  {
    path: '/services/cognitive-program',
    element: <CognitiveProgramPage />,
  },
  {
    path: '/services/leisure-program',
    element: <LeisureProgramPage />,
  },
  {
    path: '/services/medical-nursing',
    element: <MedicalNursingPage />,
  },
  {
    path: '/services/rehabilitation',
    element: <RehabilitationPage />,
  },
  {
    path: '/services/nutrition-care',
    element: <NutritionCarePage />,
  },
  {
    path: '/services/admission-process',
    element: <AdmissionProcessPage />,
  },
  {
    path: '/services/step-care-program',
    element: <StepCareProgramPage />,
  },
  {
    path: '/services/family-support',
    element: <FamilySupportPage />,
  },
  {
    path: '/services/daily-life',
    element: <DailyLifePage />,
  },
  {
    path: '/services/individual-care',
    element: <IndividualCarePage />,
  },
  {
    path: '/cost',
    element: <CostPage />,
  },
  {
    path: '/visit',
    element: <VisitPage />,
  },
  {
    path: '/admin',
    element: <AdminLoginPage />,
  },
  {
    path: '/admin/login',
    element: <AdminLoginPage />,
  },
  {
    path: '/admin/dashboard',
    element: <AdminDashboardPage />,
  },
  {
    path: '/admin/my-page',
    element: <AdminMyPage />,
  },
  {
    path: '/mobile/attendance',
    element: <MobileAttendancePage />,
  },
  {
    path: '/admin/care/meal-assist',
    element: <AdminDashboardPage />,
  },
  {
    path: '/admin/care/nursing',
    element: <AdminDashboardPage />,
  },
  {
    path: '/admin/care/bath-schedule',
    element: <AdminDashboardPage />,
  },
  {
    path: '/admin/care/analytics',
    element: <AdminDashboardPage />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

export default routes;
