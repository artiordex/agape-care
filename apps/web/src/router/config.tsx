import AppShell from '@/components/AppShell';
import { lazy } from 'react';
import { Outlet, RouteObject } from 'react-router-dom';

// Main Page
const HomePage = lazy(() => import('../app/page'));

// Intro Pages
const IntroPage = lazy(() => import('../app/(sub)/intro/introduction/page'));
const IntroGreetingPage = lazy(() => import('../app/(sub)/intro/greeting/page'));
const IntroHistoryPage = lazy(() => import('../app/(sub)/intro/history/page'));
const IntroLocationPage = lazy(() => import('../app/(sub)/intro/location/page'));
const IntroStaffPage = lazy(() => import('../app/(sub)/intro/staff/page'));

// Facility Pages
const FacilityPage = lazy(() => import('../app/(sub)/facility/page'));

// Community Pages (Mapped to Notices)
const NoticeAnnouncementsPage = lazy(() => import('../app/(sub)/notices/announcements/page'));
const NoticeAnnouncementsDetailPage = lazy(() => import('../app/(sub)/notices/announcements/[id]/page'));
const NoticeBoardPage = lazy(() => import('../app/(sub)/notices/board/page'));
const NoticeBoardDetailPage = lazy(() => import('../app/(sub)/notices/board/[id]/page'));
const NoticeGalleryPage = lazy(() => import('../app/(sub)/notices/gallery/page'));
const NoticeMealPlanPage = lazy(() => import('../app/(sub)/notices/meal-plan/page'));
const NoticeProgramSchedulePage = lazy(() => import('../app/(sub)/notices/program-schedule/page'));

// Service Pages
const CognitiveProgramPage = lazy(() => import('../app/(sub)/services/cognitive-program/page'));
const LeisureProgramPage = lazy(() => import('../app/(sub)/services/leisure-program/page'));
const MedicalNursingPage = lazy(() => import('../app/(sub)/services/medical-nursing/page'));
const RehabilitationPage = lazy(() => import('../app/(sub)/services/rehabilitation/page'));
const NutritionCarePage = lazy(() => import('../app/(sub)/services/nutrition-care/page'));
const AdmissionProcessPage = lazy(() => import('../app/(sub)/services/admission-process/page'));
const TrainingProgramPage = lazy(() => import('../app/(sub)/services/training-program/page'));
const FamilySupportPage = lazy(() => import('../app/(sub)/guide/contact/page'));
const DailyLifePage = lazy(() => import('../app/(sub)/services/daily-life/page'));
const IndividualCarePage = lazy(() => import('../app/(sub)/services/individual-care/page'));

// Guide Pages
const CostPage = lazy(() => import('../app/(sub)/guide/cost/page'));
const VisitPage = lazy(() => import('../app/(sub)/guide/visit/page'));

const NotFound = lazy(() => import('../app/not-found'));

const routes: RouteObject[] = [
  // Public Routes (Wrapped in AppShell)
  {
    path: '/',
    element: (
      <AppShell>
        <Outlet />
      </AppShell>
    ),
    children: [
      { index: true, element: <HomePage /> },

      // Intro
      { path: 'intro', element: <IntroPage /> },
      { path: 'intro/greeting', element: <IntroGreetingPage /> },
      { path: 'intro/history', element: <IntroHistoryPage /> },
      { path: 'intro/location', element: <IntroLocationPage /> },
      { path: 'intro/staff', element: <IntroStaffPage /> },

      // Facility
      { path: 'facility', element: <FacilityPage /> },

      // Communities (Mapped to Notices)
      { path: 'communities', element: <NoticeAnnouncementsPage /> },
      { path: 'communities/detail', element: <NoticeAnnouncementsDetailPage /> },

      // Board & Gallery
      { path: 'board', element: <NoticeBoardPage /> },
      { path: 'board/:id', element: <NoticeBoardDetailPage /> },
      { path: 'gallery', element: <NoticeGalleryPage /> },

      // Notices
      { path: 'meal-plan', element: <NoticeMealPlanPage /> },
      { path: 'program-schedule', element: <NoticeProgramSchedulePage /> },

      // Services
      { path: 'services/cognitive-program', element: <CognitiveProgramPage /> },
      { path: 'services/leisure-program', element: <LeisureProgramPage /> },
      { path: 'services/medical-nursing', element: <MedicalNursingPage /> },
      { path: 'services/rehabilitation', element: <RehabilitationPage /> },
      { path: 'services/nutrition-care', element: <NutritionCarePage /> },
      { path: 'services/admission-process', element: <AdmissionProcessPage /> },
      { path: 'services/training-program', element: <TrainingProgramPage /> },
      { path: 'services/family-support', element: <FamilySupportPage /> },
      { path: 'services/daily-life', element: <DailyLifePage /> },
      { path: 'services/individual-care', element: <IndividualCarePage /> },

      // Guide
      { path: 'cost', element: <CostPage /> },
      { path: 'visit', element: <VisitPage /> },
    ],
  },

  // 404 Route
  {
    path: '*',
    element: <NotFound />,
  },
];

export default routes;
