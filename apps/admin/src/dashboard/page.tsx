import { useState, useEffect } from 'react';
import AdminHeader from '../components/AdminHeader';
import AdminSidebar from '../components/AdminSidebar';
import DashboardOverview from '../components/DashboardOverview';
import ResidentManagement from '../components/ResidentManagement';
import ResidentRegistration from '../components/ResidentRegistration';
import BurdenRateManagement from '../components/BurdenRateManagement';
import DailyCareRecord from '../components/DailyCareRecord';
import CareRecordManagement from '../components/CareRecordManagement';
import MedicationManagement from '../components/MedicationManagement';
import NeedsAssessment from '../components/NeedsAssessment';
import StaffManagement from '../components/StaffManagement';
import AttendanceManagement from '../components/AttendanceManagement';
import WorkScheduleManagement from '../components/WorkScheduleManagement';
import StaffWorkStatus from '../components/StaffWorkStatus';
import AccountingManagement from '../components/AccountingManagement';
import InsuranceClaimManagement from '../components/InsuranceClaimManagement';
import PayrollManagement from '../components/PayrollManagement';
import NoticeManagement from '../components/NoticeManagement';
import FreeBoardManagement from '../components/FreeBoardManagement';
import GalleryManagement from '../components/GalleryManagement';
import MealPlanManagement from '../components/MealPlanManagement';
import MealPlanManagementAdvanced from '../components/MealPlanManagementAdvanced';
import ProgramManagement from '../components/ProgramManagement';
import RBACManagement from '../components/RBACManagement';
import FacilityInfo from '../components/FacilityInfo';
import SiteSettings from '../components/SiteSettings';
import BeneficiaryList from '../components/BeneficiaryList';
import BeneficiaryNew from '../components/BeneficiaryNew';
import BeneficiaryDetail from '../components/BeneficiaryDetail';
import ProgramAlbumManagement from '../components/ProgramAlbumManagement';
import ConsultationRequestManagement from '../components/ConsultationRequestManagement';
import PopupManagement from '../components/PopupManagement';
import BasicInfoEditor from '../components/BasicInfoEditor';
import DesignInfoEditor from '../components/DesignInfoEditor';
import MenuSettingsEditor from '../components/MenuSettingsEditor';
import IntroEditor from '../components/IntroEditor';
import ServiceEditor from '../components/ServiceEditor';
import CostConsultationEditor from '../components/CostConsultationEditor';
import DonationVolunteerEditor from '../components/DonationVolunteerEditor';
import CareHistory from '../components/CareHistory';
import MedicationManagementAdvanced from '../components/MedicationManagementAdvanced';
import NeedsAssessmentAdvanced from '../components/NeedsAssessmentAdvanced';
import ReportElimination from '../components/ReportElimination';
import ReportNursing from '../components/ReportNursing';
import ReportPressureUlcer from '../components/ReportPressureUlcer';
import ReportClinic from '../components/ReportClinic';
import ReportMedication from '../components/ReportMedication';
// 운영관리 컴포넌트 import
import VehicleManagement from '../components/VehicleManagement';
import AssetManagement from '../components/AssetManagement';
import CCTVDeviceManagement from '../components/CCTVDeviceManagement';
import CCTVWeeklyCheck from '../components/CCTVWeeklyCheck';
import CCTVRoomConsent from '../components/CCTVRoomConsent';
import CCTVViewLog from '../components/CCTVViewLog';
import TransportService from '../components/TransportService';
import SpecialRoomUse from '../components/SpecialRoomUse';
import GrievanceManagement from '../components/GrievanceManagement';
import NotificationDashboard from '../components/NotificationDashboard';
import NotificationSend from '../components/NotificationSend';
import OutingManagement from '../components/OutingManagement';
import ConsultationManagement from '../components/ConsultationManagement';

export default function AdminDashboard() {
  const navigate = window.REACT_APP_NAVIGATE;
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 모바일 메뉴 열릴 때 body 스크롤 잠금
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // ESC 키로 모바일 메뉴 닫기
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isMobileMenuOpen]);

  const renderContent = () => {
    switch (activeMenu) {
      case 'dashboard':
        return <DashboardOverview />;
      
      // 수급자 관리
      case 'beneficiary-list':
        return <ResidentManagement />;
      case 'beneficiary-new':
        return <BeneficiaryNew />;
      case 'beneficiary-detail':
        return <BeneficiaryDetail />;
      case 'outing-management':
        return <OutingManagement />;
      case 'billing-copay':
        return <div className="p-6"><h2 className="text-2xl font-bold">청구/본인부담금</h2><p className="text-gray-600 mt-2">청구/본인부담금 관리 화면입니다.</p></div>;
      case 'consultation-management':
        return <ConsultationManagement />;
      case 'beneficiary-notes':
        return <ConsultationManagement />;
      
      // 요양 관리 (레거시 - 수급자 관리로 통합됨)
      case 'resident-list':
        return <ResidentManagement />;
      case 'resident-registration':
        return <ResidentRegistration />;
      case 'burden-rate':
        return <BurdenRateManagement />;
      case 'daily-care':
        return <DailyCareRecord />;
      case 'care-records':
        return <CareRecordManagement />;
      case 'medication':
        return <MedicationManagement />;
      case 'needs-assessment':
        return <NeedsAssessment />;
      
      // 운영관리 (신규)
      case 'vehicle-management':
        return <VehicleManagement />;
      case 'asset-management':
        return <AssetManagement />;
      case 'cctv-device':
        return <CCTVDeviceManagement />;
      case 'cctv-weekly-check':
        return <CCTVWeeklyCheck />;
      case 'cctv-room-consent':
        return <CCTVRoomConsent />;
      case 'cctv-view-log':
        return <CCTVViewLog />;
      case 'transport-service':
        return <TransportService />;
      case 'special-room':
        return <SpecialRoomUse />;
      case 'grievance':
        return <GrievanceManagement />;
      
      // 직원 관리
      case 'staff-list':
        return <StaffManagement />;
      case 'attendance':
        return <AttendanceManagement />;
      case 'work-schedule':
        return <WorkScheduleManagement />;
      case 'staff-work-status':
        return <StaffWorkStatus />;
      
      // 회계/청구
      case 'accounting':
        return <AccountingManagement />;
      case 'insurance-claim':
        return <InsuranceClaimManagement />;
      case 'payroll':
        return <PayrollManagement />;
      
      // 콘텐츠 관리
      case 'notice':
        return <NoticeManagement />;
      case 'free-board':
        return <FreeBoardManagement />;
      case 'gallery':
        return <GalleryManagement />;
      case 'meal-plan':
        return <MealPlanManagementAdvanced />;
      case 'program':
        return <ProgramManagement />;
      
      // 게시판 관리
      case 'program-album':
        return <ProgramAlbumManagement />;
      case 'consultation-requests':
        return <ConsultationRequestManagement />;
      case 'popup-management':
        return <PopupManagement />;
      
      // 홈페이지편집
      case 'basic-info':
        return <BasicInfoEditor />;
      case 'design-info':
        return <DesignInfoEditor />;
      case 'menu-settings':
        return <MenuSettingsEditor />;
      case 'intro-editor':
        return <IntroEditor />;
      case 'service-editor':
        return <ServiceEditor />;
      case 'cost-consultation':
        return <CostConsultationEditor />;
      case 'donation-volunteer':
        return <DonationVolunteerEditor />;
      
      // 시스템 설정
      case 'rbac':
        return <RBACManagement />;
      case 'facility-info':
        return <FacilityInfo />;
      case 'site-settings':
        return <SiteSettings />;
      
      // 요양 관리
      case 'care-history':
        return <CareHistory />;
      
      // 요양 관리 - 리포트
      case 'report-elimination':
        return <ReportElimination />;
      case 'report-nursing':
        return <ReportNursing />;
      case 'report-pressure-ulcer':
        return <ReportPressureUlcer />;
      case 'report-clinic':
        return <ReportClinic />;
      case 'report-medication':
        return <ReportMedication />;
      
      // 부가서비스 - 알림 관리
      case 'notification-dashboard':
        return <NotificationDashboard />;
      case 'notification-send':
        return <NotificationSend />;
      case 'notification-scheduled':
        return (
          <div className="p-6">
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-calendar-schedule-line text-3xl text-emerald-600"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">예약 발송 관리</h3>
              <p className="text-gray-600 mb-6">예약된 알림 발송을 관리하는 화면입니다.</p>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-lg text-sm">
                <i className="ri-information-line"></i>
                <span>곧 구현될 예정입니다</span>
              </div>
            </div>
          </div>
        );
      case 'notification-templates':
        return (
          <div className="p-6">
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-file-list-3-line text-3xl text-emerald-600"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">템플릿 관리</h3>
              <p className="text-gray-600 mb-6">알림 템플릿을 관리하는 화면입니다.</p>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-lg text-sm">
                <i className="ri-information-line"></i>
                <span>곧 구현될 예정입니다</span>
              </div>
            </div>
          </div>
        );
      case 'notification-recipients':
        return (
          <div className="p-6">
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-group-line text-3xl text-emerald-600"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">대상자/수신자 그룹</h3>
              <p className="text-gray-600 mb-6">수신자 그룹을 관리하는 화면입니다.</p>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-lg text-sm">
                <i className="ri-information-line"></i>
                <span>곧 구현될 예정입니다</span>
              </div>
            </div>
          </div>
        );
      case 'notification-logs':
        return (
          <div className="p-6">
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-file-list-line text-3xl text-emerald-600"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">발송 로그/이력 조회</h3>
              <p className="text-gray-600 mb-6">알림 발송 이력을 조회하는 화면입니다.</p>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-lg text-sm">
                <i className="ri-information-line"></i>
                <span>곧 구현될 예정입니다</span>
              </div>
            </div>
          </div>
        );
      case 'notification-settings':
        return (
          <div className="p-6">
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-settings-3-line text-3xl text-emerald-600"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">채널 연동 설정</h3>
              <p className="text-gray-600 mb-6">SMS, Band, 카카오톡 채널을 연동하는 화면입니다.</p>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-lg text-sm">
                <i className="ri-information-line"></i>
                <span>곧 구현될 예정입니다</span>
              </div>
            </div>
          </div>
        );

      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar 
        activeMenu={activeMenu} 
        onMenuClick={(menu) => {
          setActiveMenu(menu);
          setIsMobileMenuOpen(false); // 메뉴 선택 시 모바일 드로어 닫기
        }}
        isMobileMenuOpen={isMobileMenuOpen}
        onCloseMobileMenu={() => setIsMobileMenuOpen(false)}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader 
          onToggleSidebar={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          onLogout={() => {
            localStorage.removeItem('admin_auth');
            window.location.href = '/admin/login';
          }}
        />
        <main className="flex-1 overflow-y-auto">
          {renderContent()}
        </main>
      </div>

      {/* 모바일 오버레이 (배경 딤 처리) */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </div>
  );
}