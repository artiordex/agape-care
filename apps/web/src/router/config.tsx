import { RouteObject } from 'react-router-dom';
import { lazy } from 'react';

const HomePage = lazy(() => import('../pages/home/page'));
const IntroPage = lazy(() => import('../pages/intro/page'));
const IntroHistoryPage = lazy(() => import('../pages/intro/history/page'));
const IntroStaffPage = lazy(() => import('../pages/intro/staff/page'));
const FacilityPage = lazy(() => import('../pages/facility/page'));
const CommunitiesPage = lazy(() => import('../pages/communities/page'));
const CommunityDetailPage = lazy(() => import('../pages/communities/detail/page'));
const BoardPage = lazy(() => import('../pages/board/page'));
const GalleryPage = lazy(() => import('../pages/gallery/page'));
const MealPlanPage = lazy(() => import('../pages/meal-plan/page'));
const ProgramSchedulePage = lazy(() => import('../pages/program-schedule/page'));
const CognitiveProgramPage = lazy(() => import('../pages/services/cognitive-program/page'));
const LeisureProgramPage = lazy(() => import('../pages/services/leisure-program/page'));
const MedicalNursingPage = lazy(() => import('../pages/services/medical-nursing/page'));
const RehabilitationPage = lazy(() => import('../pages/services/rehabilitation/page'));
const NutritionCarePage = lazy(() => import('../pages/services/nutrition-care/page'));
const AdmissionProcessPage = lazy(() => import('../pages/services/admission-process/page'));
const StepCareProgramPage = lazy(() => import('../pages/services/step-care-program/page'));
const FamilySupportPage = lazy(() => import('../pages/services/family-support/page'));
const DailyLifePage = lazy(() => import('../pages/services/daily-life/page'));
const IndividualCarePage = lazy(() => import('../pages/services/individual-care/page'));
const CostPage = lazy(() => import('../pages/cost/page'));
const VisitPage = lazy(() => import('../pages/visit/page'));
const NotFound = lazy(() => import('../pages/NotFound'));

// Admin Pages
const AdminLoginPage = lazy(() => import('../pages/admin/login/page'));
const AdminDashboardPage = lazy(() => import('../pages/admin/dashboard/page'));
const AdminMyPage = lazy(() => import('../pages/admin/my-page/page'));

// Mobile Pages
const MobileAttendancePage = lazy(() => import('../pages/mobile/attendance/page'));

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
