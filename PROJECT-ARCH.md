```
agape-care
├─ .changeset
│  ├─ config.json
│  └─ README.md
├─ .cz-config.cjs
├─ .dockerignore
├─ .hintrc
├─ .husky
│  └─ _
│     ├─ applypatch-msg
│     ├─ commit-msg
│     ├─ h
│     ├─ husky.sh
│     ├─ post-applypatch
│     ├─ post-commit
│     ├─ post-merge
│     ├─ post-rewrite
│     ├─ pre-applypatch
│     ├─ pre-auto-gc
│     ├─ pre-commit
│     ├─ pre-merge-commit
│     ├─ pre-push
│     ├─ pre-rebase
│     └─ prepare-commit-msg
├─ .pnpmrc
├─ apps
│  ├─ admin
│  │  ├─ global.d.ts
│  │  ├─ index.css
│  │  ├─ index.html
│  │  ├─ next-env.d.ts
│  │  ├─ next.config.mjs
│  │  ├─ package.json
│  │  ├─ postcss.config.mjs
│  │  ├─ project.json
│  │  ├─ public
│  │  │  └─ images
│  │  │     └─ logo.png
│  │  ├─ server.ts
│  │  ├─ src
│  │  │  ├─ app
│  │  │  │  ├─ (admin)
│  │  │  │  │  ├─ accounting
│  │  │  │  │  │  ├─ insurance-claim
│  │  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  │  ├─ main
│  │  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  │  └─ payroll
│  │  │  │  │  │     └─ page.tsx
│  │  │  │  │  ├─ additional-services
│  │  │  │  │  │  ├─ inquiry
│  │  │  │  │  │  │  ├─ InquiryDetailModal.tsx
│  │  │  │  │  │  │  ├─ InquiryTable.tsx
│  │  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  │  ├─ notice
│  │  │  │  │  │  │  └─ NoticeManagement.tsx
│  │  │  │  │  │  ├─ notification
│  │  │  │  │  │  │  ├─ dashboard
│  │  │  │  │  │  │  │  ├─ NotificationCampaignTable.tsx
│  │  │  │  │  │  │  │  ├─ NotificationMonthlyStats.tsx
│  │  │  │  │  │  │  │  ├─ NotificationStatsCards.tsx
│  │  │  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  │  │  ├─ recipients
│  │  │  │  │  │  │  │  ├─ page.tsx
│  │  │  │  │  │  │  │  ├─ RecipientGroupDetailModal.tsx
│  │  │  │  │  │  │  │  ├─ RecipientGroupFilters.tsx
│  │  │  │  │  │  │  │  ├─ RecipientGroupFormModal.tsx
│  │  │  │  │  │  │  │  ├─ RecipientGroupMembersModal.tsx
│  │  │  │  │  │  │  │  ├─ RecipientGroupStats.tsx
│  │  │  │  │  │  │  │  └─ RecipientGroupTable.tsx
│  │  │  │  │  │  │  ├─ scheduled
│  │  │  │  │  │  │  │  ├─ page.tsx
│  │  │  │  │  │  │  │  ├─ ScheduledNotificationDetailModal.tsx
│  │  │  │  │  │  │  │  ├─ ScheduledNotificationFilters.tsx
│  │  │  │  │  │  │  │  ├─ ScheduledNotificationStats.tsx
│  │  │  │  │  │  │  │  └─ ScheduledNotificationTable.tsx
│  │  │  │  │  │  │  ├─ send
│  │  │  │  │  │  │  │  ├─ NotificationMessageStep.tsx
│  │  │  │  │  │  │  │  ├─ NotificationOptionsStep.tsx
│  │  │  │  │  │  │  │  ├─ NotificationPurposeStep.tsx
│  │  │  │  │  │  │  │  ├─ NotificationRecipientStep.tsx
│  │  │  │  │  │  │  │  ├─ NotificationSendSteps.tsx
│  │  │  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  │  │  ├─ settings
│  │  │  │  │  │  │  │  ├─ NotificationSettingsForm.tsx
│  │  │  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  │  │  └─ templates
│  │  │  │  │  │  │     ├─ page.tsx
│  │  │  │  │  │  │     ├─ TemplateDetailModal.tsx
│  │  │  │  │  │  │     ├─ TemplateFilters.tsx
│  │  │  │  │  │  │     ├─ TemplateFormModal.tsx
│  │  │  │  │  │  │     ├─ TemplateStats.tsx
│  │  │  │  │  │  │     └─ TemplateTable.tsx
│  │  │  │  │  │  └─ sms
│  │  │  │  │  │     └─ page.tsx
│  │  │  │  │  ├─ care
│  │  │  │  │  │  ├─ BathScheduleManagement.tsx
│  │  │  │  │  │  ├─ CareRecordAnalytics.tsx
│  │  │  │  │  │  ├─ CareRecordManagement.tsx
│  │  │  │  │  │  ├─ daily
│  │  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  │  ├─ DailyCareRecord.tsx
│  │  │  │  │  │  ├─ history
│  │  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  │  ├─ MealAssistRecord.tsx
│  │  │  │  │  │  ├─ medication
│  │  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  │  ├─ MedicationManagementAdvanced.tsx
│  │  │  │  │  │  ├─ needs-assessment
│  │  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  │  ├─ NeedsAssessment.tsx
│  │  │  │  │  │  ├─ NeedsAssessmentAdvanced.tsx
│  │  │  │  │  │  ├─ records
│  │  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  │  └─ report
│  │  │  │  │  │     ├─ clinic
│  │  │  │  │  │     │  └─ page.tsx
│  │  │  │  │  │     ├─ elimination
│  │  │  │  │  │     │  └─ page.tsx
│  │  │  │  │  │     ├─ medication
│  │  │  │  │  │     │  └─ page.tsx
│  │  │  │  │  │     ├─ nursing
│  │  │  │  │  │     │  └─ page.tsx
│  │  │  │  │  │     └─ pressure-ulcer
│  │  │  │  │  │        └─ page.tsx
│  │  │  │  │  ├─ contents
│  │  │  │  │  │  ├─ board-management
│  │  │  │  │  │  │  ├─ consultation-requests
│  │  │  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  │  │  └─ program-album
│  │  │  │  │  │  │     └─ page.tsx
│  │  │  │  │  │  ├─ free-board
│  │  │  │  │  │  │  ├─ FreeBoardAdmin.tsx
│  │  │  │  │  │  │  ├─ FreeBoardManagement.tsx
│  │  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  │  ├─ gallery
│  │  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  │  ├─ meal-plan
│  │  │  │  │  │  │  ├─ MonthlyMealPlan.tsx
│  │  │  │  │  │  │  ├─ page.tsx
│  │  │  │  │  │  │  └─ WeeklyMealPlan.tsx
│  │  │  │  │  │  ├─ page.tsx
│  │  │  │  │  │  ├─ popup
│  │  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  │  ├─ program
│  │  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  │  └─ website
│  │  │  │  │  │     ├─ basic
│  │  │  │  │  │     │  └─ page.tsx
│  │  │  │  │  │     ├─ cost
│  │  │  │  │  │     │  └─ page.tsx
│  │  │  │  │  │     ├─ design
│  │  │  │  │  │     │  └─ page.tsx
│  │  │  │  │  │     ├─ donation
│  │  │  │  │  │     │  └─ page.tsx
│  │  │  │  │  │     ├─ intro
│  │  │  │  │  │     │  └─ page.tsx
│  │  │  │  │  │     ├─ menu
│  │  │  │  │  │     │  └─ page.tsx
│  │  │  │  │  │     └─ service
│  │  │  │  │  │        └─ page.tsx
│  │  │  │  │  ├─ dashboard
│  │  │  │  │  │  ├─ ActivitySection.tsx
│  │  │  │  │  │  ├─ HealthAlertSection.tsx
│  │  │  │  │  │  ├─ MedicationSection.tsx
│  │  │  │  │  │  ├─ page.tsx
│  │  │  │  │  │  ├─ QuickActionSection.tsx
│  │  │  │  │  │  ├─ ScheduleSection.tsx
│  │  │  │  │  │  └─ StatsSection.tsx
│  │  │  │  │  ├─ mobile
│  │  │  │  │  ├─ mypage
│  │  │  │  │  │  ├─ MusculoskeletalTab.tsx
│  │  │  │  │  │  ├─ NotificationsTab.tsx
│  │  │  │  │  │  ├─ page.tsx
│  │  │  │  │  │  ├─ ScheduleTab.tsx
│  │  │  │  │  │  └─ SettingsTab.tsx
│  │  │  │  │  ├─ operations
│  │  │  │  │  │  ├─ asset
│  │  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  │  ├─ cctv
│  │  │  │  │  │  │  ├─ device
│  │  │  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  │  │  ├─ room-consent
│  │  │  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  │  │  ├─ transport
│  │  │  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  │  │  ├─ view-log
│  │  │  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  │  │  └─ weekly-check
│  │  │  │  │  │  │     └─ page.tsx
│  │  │  │  │  │  ├─ grievance
│  │  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  │  ├─ inspection
│  │  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  │  ├─ inventory
│  │  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  │  ├─ special-room
│  │  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  │  ├─ transport
│  │  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  │  └─ vehicle
│  │  │  │  │  │     ├─ page.tsx
│  │  │  │  │  │     └─ VehicleManagement.tsx
│  │  │  │  │  ├─ page.tsx
│  │  │  │  │  ├─ resident
│  │  │  │  │  │  ├─ billing
│  │  │  │  │  │  │  ├─ BurdenRateHistoryTable.tsx
│  │  │  │  │  │  │  ├─ BurdenRateResidentCard.tsx
│  │  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  │  ├─ consultation
│  │  │  │  │  │  │  ├─ ConsultationListTable.tsx
│  │  │  │  │  │  │  ├─ ConsultationQuarterlyTable.tsx
│  │  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  │  └─ info
│  │  │  │  │  │     ├─ detail
│  │  │  │  │  │     │  └─ [id]
│  │  │  │  │  │     │     ├─ page.tsx
│  │  │  │  │  │     │     ├─ ResidentDetailProfile.tsx
│  │  │  │  │  │     │     └─ ResidentDetailTabs.tsx
│  │  │  │  │  │     ├─ edit
│  │  │  │  │  │     │  └─ [id]
│  │  │  │  │  │     │     └─ page.tsx
│  │  │  │  │  │     ├─ new
│  │  │  │  │  │     │  ├─ BasicInfoSection.tsx
│  │  │  │  │  │     │  ├─ GradeAdmissionSection.tsx
│  │  │  │  │  │     │  ├─ GuardianSection.tsx
│  │  │  │  │  │     │  ├─ HealthSection.tsx
│  │  │  │  │  │     │  ├─ page.tsx
│  │  │  │  │  │     │  └─ types.ts
│  │  │  │  │  │     ├─ page.tsx
│  │  │  │  │  │     ├─ ResidentList.tsx
│  │  │  │  │  │     ├─ ResidentManagement.tsx
│  │  │  │  │  │     ├─ ResidentProfile.tsx
│  │  │  │  │  │     ├─ ResidentTabs.tsx
│  │  │  │  │  │     └─ tabs
│  │  │  │  │  │        ├─ AdmissionHistoryTab.tsx
│  │  │  │  │  │        ├─ AssessmentTab.tsx
│  │  │  │  │  │        ├─ BasicInfoTab.tsx
│  │  │  │  │  │        ├─ CarePlanTab.tsx
│  │  │  │  │  │        ├─ CareSummaryTab.tsx
│  │  │  │  │  │        ├─ ConsultationTab.tsx
│  │  │  │  │  │        ├─ CopaymentTab.tsx
│  │  │  │  │  │        ├─ DocumentsTab.tsx
│  │  │  │  │  │        ├─ ExtraCostTab.tsx
│  │  │  │  │  │        ├─ GuardiansTab.tsx
│  │  │  │  │  │        └─ MedicationTab.tsx
│  │  │  │  │  ├─ settings
│  │  │  │  │  │  ├─ facility
│  │  │  │  │  │  │  ├─ FacilityAddressSection.tsx
│  │  │  │  │  │  │  ├─ FacilityBasicInfoSection.tsx
│  │  │  │  │  │  │  ├─ FacilityCapacitySection.tsx
│  │  │  │  │  │  │  ├─ FacilityContactSection.tsx
│  │  │  │  │  │  │  ├─ FacilityPreviewSection.tsx
│  │  │  │  │  │  │  ├─ FacilityStampSection.tsx
│  │  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  │  └─ system
│  │  │  │  │  │     ├─ rbac
│  │  │  │  │  │     │  ├─ EmployeeBar.tsx
│  │  │  │  │  │     │  ├─ page.tsx
│  │  │  │  │  │     │  └─ PermissionPanel.tsx
│  │  │  │  │  │     └─ site
│  │  │  │  │  │        ├─ FooterSection.tsx
│  │  │  │  │  │        ├─ page.tsx
│  │  │  │  │  │        ├─ PreviewSection.tsx
│  │  │  │  │  │        ├─ SeoSection.tsx
│  │  │  │  │  │        └─ ServiceSection.tsx
│  │  │  │  │  └─ staff
│  │  │  │  │     ├─ attendance
│  │  │  │  │     │  └─ page.tsx
│  │  │  │  │     ├─ eduction
│  │  │  │  │     │  └─ page.tsx
│  │  │  │  │     ├─ list
│  │  │  │  │     │  └─ page.tsx
│  │  │  │  │     ├─ meeting
│  │  │  │  │     │  ├─ page.tsx
│  │  │  │  │     │  ├─ RepeatWorkTemplate.tsx
│  │  │  │  │     │  ├─ WeeklyWorkTemplate.tsx
│  │  │  │  │     │  ├─ WorkScheduleCalendar.tsx
│  │  │  │  │     │  └─ WorkScheduleManagement.tsx
│  │  │  │  │     ├─ schedule
│  │  │  │  │     │  └─ page.tsx
│  │  │  │  │     └─ work-status
│  │  │  │  │        └─ page.tsx
│  │  │  │  ├─ (auth)
│  │  │  │  │  └─ login
│  │  │  │  │     └─ page.tsx
│  │  │  │  ├─ error.tsx
│  │  │  │  ├─ globals.css
│  │  │  │  ├─ loading.tsx
│  │  │  │  └─ not-found.tsx
│  │  │  ├─ components
│  │  │  │  ├─ AppShell.tsx
│  │  │  │  ├─ Header.tsx
│  │  │  │  └─ sidebar
│  │  │  │     ├─ hooks
│  │  │  │     │  └─ useSidebarMenus.ts
│  │  │  │     ├─ items
│  │  │  │     │  ├─ SidebarGroup.tsx
│  │  │  │     │  └─ SidebarItem.tsx
│  │  │  │     ├─ MobileSidebar.tsx
│  │  │  │     ├─ Sidebar.tsx
│  │  │  │     ├─ SidebarFooter.tsx
│  │  │  │     └─ useSidebarUser.ts
│  │  │  ├─ data
│  │  │  │  ├─ dashboard.json
│  │  │  │  ├─ menu.json
│  │  │  │  ├─ rbac.json
│  │  │  │  ├─ resident.json
│  │  │  │  ├─ role.json
│  │  │  │  └─ staff.json
│  │  │  ├─ lib
│  │  │  │  └─ api.ts
│  │  │  └─ providers
│  │  │     └─ query-provider.tsx
│  │  └─ tsconfig.json
│  ├─ api
│  │  ├─ .swcrc
│  │  ├─ ecosystem.config.js
│  │  ├─ nest-cli.json
│  │  ├─ package.json
│  │  ├─ project.json
│  │  ├─ src
│  │  │  ├─ app.module.ts
│  │  │  ├─ config
│  │  │  │  ├─ env.validation.ts
│  │  │  │  └─ swagger.config.ts
│  │  │  ├─ main.ts
│  │  │  └─ modules
│  │  │     ├─ accounting
│  │  │     │  ├─ account
│  │  │     │  │  └─ account.service.ts
│  │  │     │  ├─ accounting.controller.ts
│  │  │     │  ├─ accounting.module.ts
│  │  │     │  ├─ accounting.service.ts
│  │  │     │  ├─ insurance-claim
│  │  │     │  │  └─ insurance-claim.service.ts
│  │  │     │  ├─ invoice
│  │  │     │  │  └─ invoice.service.ts
│  │  │     │  ├─ payroll
│  │  │     │  │  └─ payroll.service.ts
│  │  │     │  ├─ supplier
│  │  │     │  │  └─ supplier.service.ts
│  │  │     │  └─ transaction
│  │  │     │     └─ transaction.service.ts
│  │  │     ├─ attendance
│  │  │     │  ├─ attendance.controller.ts
│  │  │     │  ├─ attendance.module.ts
│  │  │     │  ├─ attendance.service.ts
│  │  │     │  ├─ leave
│  │  │     │  │  └─ leave.service.ts
│  │  │     │  └─ shift
│  │  │     │     └─ shift.service.ts
│  │  │     ├─ auth
│  │  │     │  ├─ auth.controller.ts
│  │  │     │  ├─ auth.module.ts
│  │  │     │  ├─ auth.service.ts
│  │  │     │  ├─ decorators
│  │  │     │  │  ├─ current-user.decorator.ts
│  │  │     │  │  └─ roles.decorator.ts
│  │  │     │  ├─ guards
│  │  │     │  │  ├─ jwt-auth.guard.ts
│  │  │     │  │  ├─ jwt-refresh.guard.ts
│  │  │     │  │  └─ roles.guard.ts
│  │  │     │  └─ strategies
│  │  │     │     ├─ jwt-refresh.strategy.ts
│  │  │     │     └─ jwt.strategy.ts
│  │  │     ├─ care
│  │  │     │  ├─ care.controller.ts
│  │  │     │  ├─ care.module.ts
│  │  │     │  ├─ care.service.ts
│  │  │     │  ├─ consultation
│  │  │     │  │  └─ consultation.service.ts
│  │  │     │  ├─ incident
│  │  │     │  │  └─ incident.service.ts
│  │  │     │  ├─ plan
│  │  │     │  │  └─ care-plan.service.ts
│  │  │     │  └─ task
│  │  │     │     └─ care-task.service.ts
│  │  │     ├─ common
│  │  │     │  ├─ decorators
│  │  │     │  │  └─ api-paginated-response.decorator.ts
│  │  │     │  ├─ filters
│  │  │     │  │  ├─ http-exception.filter.ts
│  │  │     │  │  └─ prisma-exception.filter.ts
│  │  │     │  ├─ interceptors
│  │  │     │  │  ├─ logging.interceptor.ts
│  │  │     │  │  └─ transform.interceptor.ts
│  │  │     │  ├─ middleware
│  │  │     │  │  └─ logger.middleware.ts
│  │  │     │  └─ pipes
│  │  │     │     ├─ validation.pipe.ts
│  │  │     │     └─ zod-validation.pipe.ts
│  │  │     ├─ content
│  │  │     │  ├─ board
│  │  │     │  │  └─ board.service.ts
│  │  │     │  ├─ content.controller.ts
│  │  │     │  ├─ content.module.ts
│  │  │     │  ├─ content.service.ts
│  │  │     │  ├─ gallery
│  │  │     │  │  └─ gallery.service.ts
│  │  │     │  ├─ notice
│  │  │     │  │  └─ notice.service.ts
│  │  │     │  ├─ popup
│  │  │     │  │  └─ popup.service.ts
│  │  │     │  └─ website
│  │  │     │     └─ website.service.ts
│  │  │     ├─ dashboard
│  │  │     │  ├─ dashboard.controller.ts
│  │  │     │  ├─ dashboard.module.ts
│  │  │     │  └─ dashboard.service.ts
│  │  │     ├─ department
│  │  │     │  ├─ department.controller.ts
│  │  │     │  ├─ department.module.ts
│  │  │     │  └─ department.service.ts
│  │  │     ├─ employee
│  │  │     │  ├─ employee.controller.ts
│  │  │     │  ├─ employee.module.ts
│  │  │     │  └─ employee.service.ts
│  │  │     ├─ health
│  │  │     │  ├─ health.controller.ts
│  │  │     │  └─ health.module.ts
│  │  │     ├─ index.ts
│  │  │     ├─ meal
│  │  │     │  ├─ meal.controller.ts
│  │  │     │  ├─ meal.module.ts
│  │  │     │  ├─ meal.service.ts
│  │  │     │  └─ plan
│  │  │     │     └─ meal-plan.service.ts
│  │  │     ├─ mypage
│  │  │     │  ├─ mypage.controller.ts
│  │  │     │  ├─ mypage.module.ts
│  │  │     │  └─ mypage.service.ts
│  │  │     ├─ notification
│  │  │     │  ├─ notification.controller.ts
│  │  │     │  ├─ notification.module.ts
│  │  │     │  └─ notification.service.ts
│  │  │     ├─ operations
│  │  │     │  ├─ cctv
│  │  │     │  │  └─ cctv.service.ts
│  │  │     │  ├─ grievance
│  │  │     │  │  └─ grievance.service.ts
│  │  │     │  ├─ inspection
│  │  │     │  │  └─ inspection.service.ts
│  │  │     │  ├─ inventory
│  │  │     │  │  └─ inventory.service.ts
│  │  │     │  ├─ operations.controller.ts
│  │  │     │  ├─ operations.module.ts
│  │  │     │  ├─ operations.service.ts
│  │  │     │  ├─ sms
│  │  │     │  │  └─ sms.service.ts
│  │  │     │  ├─ transport
│  │  │     │  │  └─ transport.service.ts
│  │  │     │  └─ vehicle
│  │  │     │     └─ vehicle.service.ts
│  │  │     ├─ program
│  │  │     │  ├─ attendance
│  │  │     │  │  └─ attendance.service.ts
│  │  │     │  ├─ program.controller.ts
│  │  │     │  ├─ program.module.ts
│  │  │     │  ├─ program.service.ts
│  │  │     │  └─ schedule
│  │  │     │     └─ schedule.service.ts
│  │  │     ├─ resident
│  │  │     │  ├─ contact
│  │  │     │  │  └─ contact.service.ts
│  │  │     │  ├─ health
│  │  │     │  │  └─ health.service.ts
│  │  │     │  ├─ medication
│  │  │     │  │  └─ medication.service.ts
│  │  │     │  ├─ resident.controller.ts
│  │  │     │  ├─ resident.module.ts
│  │  │     │  ├─ resident.service.ts
│  │  │     │  ├─ room
│  │  │     │  │  └─ room.service.ts
│  │  │     │  └─ vital
│  │  │     │     └─ vital.service.ts
│  │  │     ├─ role
│  │  │     │  ├─ role.controller.ts
│  │  │     │  ├─ role.module.ts
│  │  │     │  └─ role.service.ts
│  │  │     ├─ setting
│  │  │     │  ├─ setting.controller.ts
│  │  │     │  ├─ setting.module.ts
│  │  │     │  └─ setting.service.ts
│  │  │     └─ web-inquiry
│  │  │        ├─ web-inquiry.controller.ts
│  │  │        ├─ web-inquiry.module.ts
│  │  │        └─ web-inquiry.service.ts
│  │  ├─ test.http
│  │  └─ tsconfig.json
│  ├─ web
│  │  ├─ index.css
│  │  ├─ index.html
│  │  ├─ next-env.d.ts
│  │  ├─ next.config.mjs
│  │  ├─ package.json
│  │  ├─ postcss.config.mjs
│  │  ├─ project.json
│  │  ├─ public
│  │  │  └─ images
│  │  │     └─ logo.png
│  │  ├─ server.ts
│  │  ├─ src
│  │  │  ├─ app
│  │  │  │  ├─ (sub)
│  │  │  │  │  ├─ facility
│  │  │  │  │  │  ├─ page.tsx
│  │  │  │  │  │  └─ section
│  │  │  │  │  │     ├─ CommonAreas.tsx
│  │  │  │  │  │     ├─ FacilityBanner.tsx
│  │  │  │  │  │     ├─ FloorGuide.tsx
│  │  │  │  │  │     ├─ RoomTypes.tsx
│  │  │  │  │  │     └─ SafetyFeatures.tsx
│  │  │  │  │  ├─ guide
│  │  │  │  │  │  ├─ admission
│  │  │  │  │  │  │  ├─ FAQSection.tsx
│  │  │  │  │  │  │  ├─ LifeRulesSection.tsx
│  │  │  │  │  │  │  ├─ page.tsx
│  │  │  │  │  │  │  ├─ PreparationSection.tsx
│  │  │  │  │  │  │  ├─ ProcessSection.tsx
│  │  │  │  │  │  │  └─ RequiredDocumentsSection.tsx
│  │  │  │  │  │  ├─ contact
│  │  │  │  │  │  │  ├─ ContactCTASection.tsx
│  │  │  │  │  │  │  ├─ ContactFormSection.tsx
│  │  │  │  │  │  │  ├─ ContactInfoSection.tsx
│  │  │  │  │  │  │  ├─ ContactTypeSection.tsx
│  │  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  │  ├─ cost
│  │  │  │  │  │  │  ├─ CostByGradeSection.tsx
│  │  │  │  │  │  │  ├─ DiscountSection.tsx
│  │  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  │  └─ visit
│  │  │  │  │  │     ├─ page.tsx
│  │  │  │  │  │     ├─ VisitContactSection.tsx
│  │  │  │  │  │     ├─ VisitFormSection.tsx
│  │  │  │  │  │     ├─ VisitGuidelinesSection.tsx
│  │  │  │  │  │     └─ VisitRulesSection.tsx
│  │  │  │  │  ├─ intro
│  │  │  │  │  │  ├─ greeting
│  │  │  │  │  │  │  ├─ DirectorMessageSection.tsx
│  │  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  │  ├─ history
│  │  │  │  │  │  │  ├─ HistoryBottom.tsx
│  │  │  │  │  │  │  ├─ HistoryTimeline.tsx
│  │  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  │  ├─ introduction
│  │  │  │  │  │  │  ├─ CorporationEssentialSection.tsx
│  │  │  │  │  │  │  ├─ FacilitySection.tsx
│  │  │  │  │  │  │  ├─ MedicalCareSection.tsx
│  │  │  │  │  │  │  ├─ NutritionSection.tsx
│  │  │  │  │  │  │  ├─ OperationPhilosophySection.tsx
│  │  │  │  │  │  │  ├─ OrganizationChart.tsx
│  │  │  │  │  │  │  ├─ OverviewSection.tsx
│  │  │  │  │  │  │  ├─ page.tsx
│  │  │  │  │  │  │  ├─ SafetySection.tsx
│  │  │  │  │  │  │  └─ StaffSection.tsx
│  │  │  │  │  │  ├─ location
│  │  │  │  │  │  │  ├─ LocationInfoBox.tsx
│  │  │  │  │  │  │  ├─ LocationMap.tsx
│  │  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  │  └─ staff
│  │  │  │  │  │     ├─ page.tsx
│  │  │  │  │  │     └─ StaffSections.tsx
│  │  │  │  │  ├─ notices
│  │  │  │  │  │  ├─ announcements
│  │  │  │  │  │  │  ├─ NoticeList.tsx
│  │  │  │  │  │  │  ├─ NoticePagination.tsx
│  │  │  │  │  │  │  ├─ NoticeSearchSection.tsx
│  │  │  │  │  │  │  ├─ page.tsx
│  │  │  │  │  │  │  └─ [id]
│  │  │  │  │  │  │     └─ page.tsx
│  │  │  │  │  │  ├─ board
│  │  │  │  │  │  │  ├─ BoardHeader.tsx
│  │  │  │  │  │  │  ├─ BoardMobileList.tsx
│  │  │  │  │  │  │  ├─ BoardTable.tsx
│  │  │  │  │  │  │  ├─ DeleteConfirmModal.tsx
│  │  │  │  │  │  │  ├─ EditPostModal.tsx
│  │  │  │  │  │  │  ├─ page.tsx
│  │  │  │  │  │  │  ├─ Pagination.tsx
│  │  │  │  │  │  │  ├─ PostDetailModal.tsx
│  │  │  │  │  │  │  ├─ WritePostModal.tsx
│  │  │  │  │  │  │  └─ [id]
│  │  │  │  │  │  │     └─ page.tsx
│  │  │  │  │  │  ├─ gallery
│  │  │  │  │  │  │  ├─ CategoryFilter.tsx
│  │  │  │  │  │  │  ├─ GalleryGrid.tsx
│  │  │  │  │  │  │  ├─ GalleryModal.tsx
│  │  │  │  │  │  │  ├─ Lightbox.tsx
│  │  │  │  │  │  │  ├─ page.tsx
│  │  │  │  │  │  │  └─ Pagination.tsx
│  │  │  │  │  │  ├─ meal-plan
│  │  │  │  │  │  │  ├─ ImageModal.tsx
│  │  │  │  │  │  │  ├─ MealDetailModal.tsx
│  │  │  │  │  │  │  ├─ MealPlanControls.tsx
│  │  │  │  │  │  │  ├─ MonthView.tsx
│  │  │  │  │  │  │  ├─ page.tsx
│  │  │  │  │  │  │  └─ WeekView.tsx
│  │  │  │  │  │  └─ program-schedule
│  │  │  │  │  │     ├─ CalendarView.tsx
│  │  │  │  │  │     ├─ CategoryFilter.tsx
│  │  │  │  │  │     ├─ ListView.tsx
│  │  │  │  │  │     ├─ MonthHeader.tsx
│  │  │  │  │  │     ├─ page.tsx
│  │  │  │  │  │     ├─ ProgramDetail.tsx
│  │  │  │  │  │     └─ ProgramModal.tsx
│  │  │  │  │  └─ services
│  │  │  │  │     ├─ admission-process
│  │  │  │  │     │  ├─ AdmissionStepsSection.tsx
│  │  │  │  │     │  ├─ CostInfoSection.tsx
│  │  │  │  │     │  ├─ page.tsx
│  │  │  │  │     │  ├─ PersonalItemsSection.tsx
│  │  │  │  │     │  └─ RequiredDocumentsSection.tsx
│  │  │  │  │     ├─ cognitive-program
│  │  │  │  │     │  ├─ FeaturesSection.tsx
│  │  │  │  │     │  ├─ page.tsx
│  │  │  │  │     │  └─ ProgramListSection.tsx
│  │  │  │  │     ├─ daily-life
│  │  │  │  │     │  ├─ DailyLifeCTA.tsx
│  │  │  │  │     │  ├─ DailyScheduleSection.tsx
│  │  │  │  │     │  ├─ FacilitiesSection.tsx
│  │  │  │  │     │  ├─ FamilySupportSection.tsx
│  │  │  │  │     │  ├─ LifeRulesSection.tsx
│  │  │  │  │     │  └─ page.tsx
│  │  │  │  │     ├─ individual-care
│  │  │  │  │     │  ├─ CareLevelsSection.tsx
│  │  │  │  │     │  ├─ CarePhilosophySection.tsx
│  │  │  │  │     │  ├─ CareServicesSection.tsx
│  │  │  │  │     │  ├─ CTASection.tsx
│  │  │  │  │     │  ├─ IndividualCareSection.tsx
│  │  │  │  │     │  └─ page.tsx
│  │  │  │  │     ├─ leisure-program
│  │  │  │  │     │  ├─ FeaturesSection.tsx
│  │  │  │  │     │  ├─ page.tsx
│  │  │  │  │     │  ├─ ProgramListSection.tsx
│  │  │  │  │     │  └─ SeasonalEventsSection.tsx
│  │  │  │  │     ├─ medical-nursing
│  │  │  │  │     │  ├─ CooperationSection.tsx
│  │  │  │  │     │  ├─ page.tsx
│  │  │  │  │     │  ├─ ServicesSection.tsx
│  │  │  │  │     │  └─ StandardsSection.tsx
│  │  │  │  │     ├─ nutrition-care
│  │  │  │  │     │  ├─ NutritionSection.tsx
│  │  │  │  │     │  ├─ NutritionStandardsSection.tsx
│  │  │  │  │     │  ├─ page.tsx
│  │  │  │  │     │  └─ WeeklyMenuSection.tsx
│  │  │  │  │     ├─ rehabilitation
│  │  │  │  │     │  ├─ BenefitsSection.tsx
│  │  │  │  │     │  ├─ OperationSection.tsx
│  │  │  │  │     │  ├─ page.tsx
│  │  │  │  │     │  └─ ProgramsSection.tsx
│  │  │  │  │     └─ training-program
│  │  │  │  │        ├─ BasicTrainingSection.tsx
│  │  │  │  │        ├─ BehaviorEmotionSection.tsx
│  │  │  │  │        ├─ DailyLivingSection.tsx
│  │  │  │  │        ├─ page.tsx
│  │  │  │  │        ├─ SafetyEducationSection.tsx
│  │  │  │  │        └─ StepCareProgramSection.tsx
│  │  │  │  ├─ error.tsx
│  │  │  │  ├─ globals.css
│  │  │  │  ├─ loading.tsx
│  │  │  │  ├─ not-found.tsx
│  │  │  │  ├─ page.tsx
│  │  │  │  └─ section
│  │  │  │     ├─ AdmissionProcessSection.tsx
│  │  │  │     ├─ ConsultationSection.tsx
│  │  │  │     ├─ ContactSection.tsx
│  │  │  │     ├─ FeaturesSection.tsx
│  │  │  │     ├─ HeroSection.tsx
│  │  │  │     ├─ IntroSection.tsx
│  │  │  │     ├─ NewsSection.tsx
│  │  │  │     └─ ServicesSection.tsx
│  │  │  ├─ components
│  │  │  │  ├─ AppShell.tsx
│  │  │  │  ├─ Breadcrumb.tsx
│  │  │  │  ├─ FloatingSidebar.tsx
│  │  │  │  ├─ Footer.tsx
│  │  │  │  ├─ HeroSection.tsx
│  │  │  │  ├─ navbar
│  │  │  │  │  ├─ AllMenu.tsx
│  │  │  │  │  ├─ DesktopDropdown.tsx
│  │  │  │  │  ├─ MobileMenu.tsx
│  │  │  │  │  └─ Navbar.tsx
│  │  │  │  └─ NoticeSidebar.tsx
│  │  │  ├─ data
│  │  │  │  ├─ announce.json
│  │  │  │  ├─ board.json
│  │  │  │  ├─ breadcrumb.json
│  │  │  │  ├─ footer.json
│  │  │  │  ├─ gallery.json
│  │  │  │  ├─ hero.json
│  │  │  │  ├─ history.json
│  │  │  │  ├─ meal.json
│  │  │  │  ├─ menu.json
│  │  │  │  └─ staff.json
│  │  │  ├─ global.d.ts
│  │  │  ├─ lib
│  │  │  │  ├─ api.ts
│  │  │  │  ├─ email.ts
│  │  │  │  ├─ security-demo.ts
│  │  │  │  └─ security-store.ts
│  │  │  ├─ next-env.d.ts
│  │  │  ├─ providers
│  │  │  │  ├─ query-provider.tsx
│  │  │  │  └─ RootProvider.tsx
│  │  │  ├─ public
│  │  │  │  └─ policies
│  │  │  │     └─ privacy.html
│  │  │  ├─ web-types.d.ts
│  │  │  └─ web-types.ts
│  │  └─ tsconfig.json
│  └─ worker
│     ├─ package.json
│     ├─ project.json
│     ├─ src
│     │  ├─ main.ts
│     │  ├─ metrics.ts
│     │  └─ processors
│     │     └─ email.processor.ts
│     └─ tsconfig.json
├─ docs
│  ├─ database-schema-accounting-erp.md
│  ├─ database-schema-attendance.md
│  ├─ database-schema-consultation.md
│  ├─ database-schema-notifications.md
│  ├─ guideline
│  │  ├─ 01_프로젝트아키텍처.md
│  │  ├─ 02_개발환경설정.md
│  │  ├─ 03_외부라이브러리목록.md
│  │  ├─ 04_의존성관리가이드.md
│  │  └─ 05_배포및운영가이드.md
│  └─ study
│     ├─ 01_프로젝트소개.md
│     ├─ 02_비즈니스모델.md
│     ├─ 03_서비스플로우.md
│     ├─ 04_도메인정의.md
│     ├─ 05_기술스택개요.md
│     ├─ 06_모노레포구조.md
│     ├─ 07_전체아키텍처.md
│     ├─ 08_도메인모듈패턴.md
│     ├─ 09_데이터베이스설계.md
│     ├─ 10_개발환경설정.md
│     ├─ 11_코딩컨벤션.md
│     ├─ 12_Git워크플로우.md
│     ├─ 13_AI_API통합가이드.md
│     ├─ 14_AI_서비스플로우.md
│     ├─ 15_REST_API문서.md
│     ├─ 16_인증권한.md
│     ├─ 17_배포가이드.md
│     ├─ 18_기술스택가이드.md
│     ├─ 19_트러블슈팅건.md
│     └─ 20_참고자료.md
├─ eslint.config.mjs
├─ infra
│  ├─ database
│  │  ├─ conf
│  │  │  ├─ pg_hba.conf
│  │  │  └─ postgresql.conf
│  │  └─ init
│  │     ├─ 00-extensions.sql
│  │     ├─ 20-ddl.sql
│  │     ├─ 30-seed.sql
│  │     └─ 99-final-setup.sql
│  ├─ docker
│  │  ├─ .wslconfig
│  │  ├─ docker-compose.yml
│  │  ├─ Dockerfile.admin
│  │  ├─ Dockerfile.api
│  │  ├─ Dockerfile.db
│  │  ├─ Dockerfile.web
│  │  ├─ Dockerfile.worker
│  │  └─ nginx.conf
│  ├─ infra-types.ts
│  └─ n8n
│     ├─ package.json
│     └─ project.json
├─ LICENSE
├─ nx.json
├─ package.json
├─ packages
│  ├─ api-contract
│  │  ├─ package.json
│  │  ├─ project.json
│  │  ├─ src
│  │  │  ├─ api-contract-types.ts
│  │  │  ├─ contracts
│  │  │  │  ├─ accounting.contract.ts
│  │  │  │  ├─ attendance.contract.ts
│  │  │  │  ├─ auth.contract.ts
│  │  │  │  ├─ care.contract.ts
│  │  │  │  ├─ content.contract.ts
│  │  │  │  ├─ dashboard.contract.ts
│  │  │  │  ├─ employee.contract.ts
│  │  │  │  ├─ index.ts
│  │  │  │  ├─ meal.contract.ts
│  │  │  │  ├─ mypage.contract.ts
│  │  │  │  ├─ notification.contract.ts
│  │  │  │  ├─ operations.contract.ts
│  │  │  │  ├─ program.contract.ts
│  │  │  │  ├─ resident.contract.ts
│  │  │  │  ├─ setting.contract.ts
│  │  │  │  └─ web-inquiry.contract.ts
│  │  │  ├─ index.ts
│  │  │  ├─ mocks
│  │  │  │  ├─ accounting.mock.ts
│  │  │  │  ├─ attendance.mock.ts
│  │  │  │  ├─ auth.mock.ts
│  │  │  │  ├─ care.mock.ts
│  │  │  │  ├─ content.mock.ts
│  │  │  │  ├─ dashboard.mock.ts
│  │  │  │  ├─ employee.mock.ts
│  │  │  │  ├─ index.ts
│  │  │  │  ├─ meal.mock.ts
│  │  │  │  ├─ notification.mock.ts
│  │  │  │  ├─ operations.mock.ts
│  │  │  │  ├─ program.mock.ts
│  │  │  │  └─ resident.mock.ts
│  │  │  ├─ schemas
│  │  │  │  ├─ accounting
│  │  │  │  │  ├─ account-category.schema.ts
│  │  │  │  │  ├─ account.schema.ts
│  │  │  │  │  ├─ index.ts
│  │  │  │  │  ├─ insurance-claim.schema.ts
│  │  │  │  │  ├─ invoice.schema.ts
│  │  │  │  │  ├─ payroll.schema.ts
│  │  │  │  │  ├─ supplier.schema.ts
│  │  │  │  │  └─ transaction.schema.ts
│  │  │  │  ├─ attendance
│  │  │  │  │  ├─ attendance-record.schema.ts
│  │  │  │  │  ├─ index.ts
│  │  │  │  │  ├─ leave-approval.schema.ts
│  │  │  │  │  ├─ leave-request.schema.ts
│  │  │  │  │  ├─ shift-assignment.schema.ts
│  │  │  │  │  └─ shift-template.schema.ts
│  │  │  │  ├─ auth
│  │  │  │  │  ├─ auth.schema.ts
│  │  │  │  │  └─ index.ts
│  │  │  │  ├─ care
│  │  │  │  │  ├─ care-plan-item.schema.ts
│  │  │  │  │  ├─ care-plan.schema.ts
│  │  │  │  │  ├─ care-task.schema.ts
│  │  │  │  │  ├─ consultation.schema.ts
│  │  │  │  │  ├─ incident.schema.ts
│  │  │  │  │  └─ index.ts
│  │  │  │  ├─ common
│  │  │  │  │  ├─ audit.schema.ts
│  │  │  │  │  ├─ date.schema.ts
│  │  │  │  │  ├─ file.schema.ts
│  │  │  │  │  ├─ index.ts
│  │  │  │  │  ├─ pagination.schema.ts
│  │  │  │  │  ├─ response.schema.ts
│  │  │  │  │  └─ system-setting.schema.ts
│  │  │  │  ├─ content
│  │  │  │  │  ├─ board-comment.schema.ts
│  │  │  │  │  ├─ board-post.schema.ts
│  │  │  │  │  ├─ gallery.schema.ts
│  │  │  │  │  ├─ index.ts
│  │  │  │  │  ├─ notice.schema.ts
│  │  │  │  │  ├─ popup-banner.schema.ts
│  │  │  │  │  └─ website-setting.schema.ts
│  │  │  │  ├─ dashboard
│  │  │  │  │  ├─ dashboard.schema.ts
│  │  │  │  │  └─ index.ts
│  │  │  │  ├─ employee
│  │  │  │  │  ├─ department.schema.ts
│  │  │  │  │  ├─ education.schema.ts
│  │  │  │  │  ├─ employee.schema.ts
│  │  │  │  │  ├─ index.ts
│  │  │  │  │  └─ role.schema.ts
│  │  │  │  ├─ index.ts
│  │  │  │  ├─ meal
│  │  │  │  │  ├─ index.ts
│  │  │  │  │  ├─ meal-plan-item.schema.ts
│  │  │  │  │  └─ meal-plan.schema.ts
│  │  │  │  ├─ mypage
│  │  │  │  │  ├─ index.ts
│  │  │  │  │  └─ mypage.schema.ts
│  │  │  │  ├─ notification
│  │  │  │  │  ├─ index.ts
│  │  │  │  │  ├─ notification.schema.ts
│  │  │  │  │  ├─ recipient-group.schema.ts
│  │  │  │  │  └─ scheduled.schema.ts
│  │  │  │  ├─ operations
│  │  │  │  │  ├─ cctv.schema.ts
│  │  │  │  │  ├─ grievance.schema.ts
│  │  │  │  │  ├─ index.ts
│  │  │  │  │  ├─ inspection.schema.ts
│  │  │  │  │  ├─ inventory.schema.ts
│  │  │  │  │  ├─ sms.schema.ts
│  │  │  │  │  ├─ transport.schema.ts
│  │  │  │  │  └─ vehicle.schema.ts
│  │  │  │  ├─ program
│  │  │  │  │  ├─ attendance.schema.ts
│  │  │  │  │  ├─ index.ts
│  │  │  │  │  ├─ program.schema.ts
│  │  │  │  │  └─ schedule.schema.ts
│  │  │  │  ├─ resident
│  │  │  │  │  ├─ contact.schema.ts
│  │  │  │  │  ├─ health-note.schema.ts
│  │  │  │  │  ├─ index.ts
│  │  │  │  │  ├─ medication.schema.ts
│  │  │  │  │  ├─ resident.schema.ts
│  │  │  │  │  ├─ room.schema.ts
│  │  │  │  │  └─ vital.schema.ts
│  │  │  │  ├─ setting
│  │  │  │  │  ├─ index.ts
│  │  │  │  │  └─ setting.schema.ts
│  │  │  │  ├─ staff
│  │  │  │  │  ├─ department.schema.ts
│  │  │  │  │  ├─ employee-education.schema.ts
│  │  │  │  │  ├─ employee-role.schema.ts
│  │  │  │  │  ├─ employee.schema.ts
│  │  │  │  │  └─ index.ts
│  │  │  │  └─ web-inquiry
│  │  │  │     └─ index.ts
│  │  │  └─ worker-types.ts
│  │  └─ tsconfig.json
│  ├─ database
│  │  ├─ package.json
│  │  ├─ prisma
│  │  │  ├─ prisma.config.ts
│  │  │  └─ schema.prisma
│  │  ├─ project.json
│  │  ├─ src
│  │  │  ├─ database.module.ts
│  │  │  ├─ generated
│  │  │  │  └─ prisma
│  │  │  │     ├─ client.d.ts
│  │  │  │     ├─ client.js
│  │  │  │     ├─ default.d.ts
│  │  │  │     ├─ default.js
│  │  │  │     ├─ edge.d.ts
│  │  │  │     ├─ edge.js
│  │  │  │     ├─ index-browser.js
│  │  │  │     ├─ index.d.ts
│  │  │  │     ├─ index.js
│  │  │  │     ├─ package.json
│  │  │  │     ├─ query_compiler_fast_bg.js
│  │  │  │     ├─ query_compiler_fast_bg.wasm
│  │  │  │     ├─ query_compiler_fast_bg.wasm-base64.js
│  │  │  │     ├─ runtime
│  │  │  │     │  ├─ client.d.ts
│  │  │  │     │  ├─ client.js
│  │  │  │     │  ├─ index-browser.d.ts
│  │  │  │     │  ├─ index-browser.js
│  │  │  │     │  └─ wasm-compiler-edge.js
│  │  │  │     ├─ schema.prisma
│  │  │  │     ├─ wasm-edge-light-loader.mjs
│  │  │  │     └─ wasm-worker-loader.mjs
│  │  │  ├─ index.ts
│  │  │  └─ prisma.service.ts
│  │  └─ tsconfig.json
│  ├─ logger
│  │  ├─ package.json
│  │  ├─ project.json
│  │  ├─ src
│  │  │  ├─ console.ts
│  │  │  ├─ index.ts
│  │  │  ├─ logger-types.ts
│  │  │  ├─ logger.module.ts
│  │  │  ├─ logger.ts
│  │  │  └─ nest-logger.ts
│  │  └─ tsconfig.json
│  └─ ui
│     ├─ package.json
│     ├─ project.json
│     ├─ public
│     │  ├─ favicon
│     │  ├─ fonts
│     │  ├─ icons
│     │  └─ images
│     ├─ src
│     │  ├─ animations
│     │  │  └─ Animation.tsx
│     │  ├─ components
│     │  │  ├─ Button.tsx
│     │  │  ├─ Card.tsx
│     │  │  ├─ Checkbox.tsx
│     │  │  ├─ DatePicker.tsx
│     │  │  ├─ Divider.tsx
│     │  │  ├─ Drawer.tsx
│     │  │  ├─ EmptyState.tsx
│     │  │  ├─ ErrorPage.tsx
│     │  │  ├─ Field.tsx
│     │  │  ├─ Form.tsx
│     │  │  ├─ Input.tsx
│     │  │  ├─ LoadingPage.tsx
│     │  │  ├─ LoadingSpinner.tsx
│     │  │  ├─ Modal.tsx
│     │  │  ├─ RadioGroup.tsx
│     │  │  ├─ Select.tsx
│     │  │  ├─ Table.tsx
│     │  │  ├─ Textarea.tsx
│     │  │  └─ Toolbar.tsx
│     │  ├─ hooks
│     │  │  ├─ useBoolean.ts
│     │  │  ├─ useDebounce.ts
│     │  │  ├─ useDisclosure.ts
│     │  │  ├─ useEventListener.ts
│     │  │  ├─ useIsMounted.ts
│     │  │  ├─ useMediaQuery.ts
│     │  │  ├─ useOnClickOutside.ts
│     │  │  └─ useThrottle.ts
│     │  ├─ index.ts
│     │  ├─ styles
│     │  │  ├─ animations.css
│     │  │  └─ customs.css
│     │  ├─ templates
│     │  │  ├─ error.tsx
│     │  │  └─ loading.tsx
│     │  ├─ ui-types.ts
│     │  └─ utils
│     │     └─ cn.ts
│     ├─ tailwind.config.mjs
│     └─ tsconfig.json
├─ pnpm-lock.yaml
├─ pnpm-workspace.yaml
├─ postcss.config.ts
├─ prettier.config.mjs
├─ PROJECT-ARCH.md
├─ README.md
├─ renovate.json
├─ scripts
│  ├─ setup-api-contract.ps1
│  └─ setup-api-modules.ps1
├─ tmp
│  ├─ apps
│  │  ├─ api
│  │  └─ worker
│  │     └─ serve
│  │        └─ tsconfig.generated.604736f6-154a-40ef-b3f1-cc176ed80e0d.json
│  └─ packages
│     ├─ api-contract
│     ├─ database
│     └─ ui
├─ tsconfig.base.json
├─ tsconfig.json
└─ vitest.config.ts

```
