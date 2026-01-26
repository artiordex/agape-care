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
│  │  ├─ server.ts
│  │  ├─ src
│  │  │  ├─ app
│  │  │  │  ├─ accounting
│  │  │  │  │  ├─ insurance-claim
│  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  ├─ main
│  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  └─ payroll
│  │  │  │  │     └─ page.tsx
│  │  │  │  ├─ additional-services
│  │  │  │  │  ├─ notice
│  │  │  │  │  │  └─ NoticeManagement.tsx
│  │  │  │  │  ├─ notification
│  │  │  │  │  │  ├─ dashboard
│  │  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  │  ├─ recipients
│  │  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  │  ├─ scheduled
│  │  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  │  ├─ send
│  │  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  │  ├─ settings
│  │  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  │  └─ templates
│  │  │  │  │  │     └─ page.tsx
│  │  │  │  │  └─ sms
│  │  │  │  │     └─ page.tsx
│  │  │  │  ├─ beneficiary
│  │  │  │  │  ├─ billing
│  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  ├─ consultation
│  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  ├─ detail
│  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  ├─ list
│  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  └─ new
│  │  │  │  │     └─ page.tsx
│  │  │  │  ├─ care
│  │  │  │  │  ├─ BathScheduleManagement.tsx
│  │  │  │  │  ├─ CareRecordAnalytics.tsx
│  │  │  │  │  ├─ CareRecordManagement.tsx
│  │  │  │  │  ├─ daily
│  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  ├─ DailyCareRecord.tsx
│  │  │  │  │  ├─ history
│  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  ├─ MealAssistRecord.tsx
│  │  │  │  │  ├─ medication
│  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  ├─ MedicationManagementAdvanced.tsx
│  │  │  │  │  ├─ needs-assessment
│  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  ├─ NeedsAssessment.tsx
│  │  │  │  │  ├─ NeedsAssessmentAdvanced.tsx
│  │  │  │  │  ├─ records
│  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  └─ report
│  │  │  │  │     ├─ clinic
│  │  │  │  │     │  └─ page.tsx
│  │  │  │  │     ├─ elimination
│  │  │  │  │     │  └─ page.tsx
│  │  │  │  │     ├─ medication
│  │  │  │  │     │  └─ page.tsx
│  │  │  │  │     ├─ nursing
│  │  │  │  │     │  └─ page.tsx
│  │  │  │  │     └─ pressure-ulcer
│  │  │  │  │        └─ page.tsx
│  │  │  │  ├─ contents
│  │  │  │  │  ├─ board-management
│  │  │  │  │  │  ├─ consultation-requests
│  │  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  │  └─ program-album
│  │  │  │  │  │     └─ page.tsx
│  │  │  │  │  ├─ free-board
│  │  │  │  │  │  ├─ FreeBoardAdmin.tsx
│  │  │  │  │  │  ├─ FreeBoardManagement.tsx
│  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  ├─ gallery
│  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  ├─ meal-plan
│  │  │  │  │  │  ├─ MonthlyMealPlan.tsx
│  │  │  │  │  │  ├─ page.tsx
│  │  │  │  │  │  └─ WeeklyMealPlan.tsx
│  │  │  │  │  ├─ page.tsx
│  │  │  │  │  ├─ popup
│  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  ├─ program
│  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  └─ website
│  │  │  │  │     ├─ basic
│  │  │  │  │     │  └─ page.tsx
│  │  │  │  │     ├─ cost
│  │  │  │  │     │  └─ page.tsx
│  │  │  │  │     ├─ design
│  │  │  │  │     │  └─ page.tsx
│  │  │  │  │     ├─ donation
│  │  │  │  │     │  └─ page.tsx
│  │  │  │  │     ├─ intro
│  │  │  │  │     │  └─ page.tsx
│  │  │  │  │     ├─ menu
│  │  │  │  │     │  └─ page.tsx
│  │  │  │  │     └─ service
│  │  │  │  │        └─ page.tsx
│  │  │  │  ├─ dashboard
│  │  │  │  │  └─ page.tsx
│  │  │  │  ├─ error.tsx
│  │  │  │  ├─ globals.css
│  │  │  │  ├─ loading.tsx
│  │  │  │  ├─ login
│  │  │  │  │  └─ page.tsx
│  │  │  │  ├─ mypage
│  │  │  │  │  ├─ MusculoskeletalTab.tsx
│  │  │  │  │  ├─ NotificationsTab.tsx
│  │  │  │  │  ├─ page.tsx
│  │  │  │  │  ├─ ScheduleTab.tsx
│  │  │  │  │  └─ SettingsTab.tsx
│  │  │  │  ├─ not-found.tsx
│  │  │  │  ├─ operations
│  │  │  │  │  ├─ asset
│  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  ├─ cctv
│  │  │  │  │  │  ├─ device
│  │  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  │  ├─ room-consent
│  │  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  │  ├─ transport
│  │  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  │  ├─ view-log
│  │  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  │  └─ weekly-check
│  │  │  │  │  │     └─ page.tsx
│  │  │  │  │  ├─ grievance
│  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  ├─ inspection
│  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  ├─ inventory
│  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  ├─ partner
│  │  │  │  │  ├─ special-room
│  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  ├─ transport
│  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  └─ vehicle
│  │  │  │  │     ├─ page.tsx
│  │  │  │  │     └─ VehicleManagement.tsx
│  │  │  │  ├─ page.tsx
│  │  │  │  ├─ settings
│  │  │  │  │  ├─ facility
│  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  ├─ rbac
│  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  └─ site
│  │  │  │  │     └─ page.tsx
│  │  │  │  └─ staff
│  │  │  │     ├─ attendance
│  │  │  │     │  └─ page.tsx
│  │  │  │     ├─ eduction
│  │  │  │     │  └─ page.tsx
│  │  │  │     ├─ list
│  │  │  │     │  └─ page.tsx
│  │  │  │     ├─ meeting
│  │  │  │     │  ├─ page.tsx
│  │  │  │     │  ├─ RepeatWorkTemplate.tsx
│  │  │  │     │  ├─ WeeklyWorkTemplate.tsx
│  │  │  │     │  ├─ WorkScheduleCalendar.tsx
│  │  │  │     │  └─ WorkScheduleManagement.tsx
│  │  │  │     ├─ schedule
│  │  │  │     │  └─ page.tsx
│  │  │  │     └─ work-status
│  │  │  │        └─ page.tsx
│  │  │  ├─ components
│  │  │  │  ├─ AppShell.tsx
│  │  │  │  ├─ Header.tsx
│  │  │  │  └─ Sidebar.tsx
│  │  │  └─ data
│  │  │     └─ menu.json
│  │  └─ tsconfig.json
│  ├─ api
│  │  ├─ ecosystem.config.js
│  │  ├─ nest-cli.json
│  │  ├─ package.json
│  │  ├─ project.json
│  │  ├─ src
│  │  │  ├─ app.module.ts
│  │  │  ├─ main.ts
│  │  │  └─ modules
│  │  │     ├─ admin
│  │  │     ├─ auth
│  │  │     ├─ index.ts
│  │  │     ├─ mypage
│  │  │     │  ├─ mypage.controller.ts
│  │  │     │  ├─ mypage.interface.ts
│  │  │     │  ├─ mypage.module.ts
│  │  │     │  ├─ mypage.processor.ts
│  │  │     │  └─ mypage.service.ts
│  │  │     ├─ programs
│  │  │     └─ users
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
│  │  ├─ server.ts
│  │  ├─ src
│  │  │  ├─ app
│  │  │  │  ├─ admission
│  │  │  │  │  └─ page.tsx
│  │  │  │  ├─ error.tsx
│  │  │  │  ├─ facility
│  │  │  │  │  ├─ page.tsx
│  │  │  │  │  └─ section
│  │  │  │  │     ├─ CommonAreas.tsx
│  │  │  │  │     ├─ FacilityHero.tsx
│  │  │  │  │     ├─ FloorGuide.tsx
│  │  │  │  │     ├─ RoomTypes.tsx
│  │  │  │  │     └─ SafetyFeatures.tsx
│  │  │  │  ├─ globals.css
│  │  │  │  ├─ guide
│  │  │  │  │  ├─ cost
│  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  └─ visit
│  │  │  │  │     └─ page.tsx
│  │  │  │  ├─ intro
│  │  │  │  │  ├─ corporation
│  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  ├─ greeting
│  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  ├─ history
│  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  ├─ introduction
│  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  ├─ location
│  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  └─ staff
│  │  │  │  │     └─ page.tsx
│  │  │  │  ├─ loading.tsx
│  │  │  │  ├─ not-found.tsx
│  │  │  │  ├─ notices
│  │  │  │  │  ├─ announcements
│  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  ├─ board
│  │  │  │  │  │  ├─ DeleteConfirmModal.tsx
│  │  │  │  │  │  ├─ EditPostModal.tsx
│  │  │  │  │  │  ├─ page.tsx
│  │  │  │  │  │  ├─ PostDetailModal.tsx
│  │  │  │  │  │  └─ WritePostModal.tsx
│  │  │  │  │  ├─ communities
│  │  │  │  │  │  ├─ detail
│  │  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  ├─ gallery
│  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  ├─ meal-plan
│  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  ├─ program-schedule
│  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  └─ programs
│  │  │  │  │     └─ page.tsx
│  │  │  │  ├─ page.tsx
│  │  │  │  ├─ section
│  │  │  │  │  ├─ AdmissionProcessSection.tsx
│  │  │  │  │  ├─ ConsultationSection.tsx
│  │  │  │  │  ├─ ContactSection.tsx
│  │  │  │  │  ├─ FeaturesSection.tsx
│  │  │  │  │  ├─ HeroSection.tsx
│  │  │  │  │  ├─ IntroSection.tsx
│  │  │  │  │  ├─ NewsSection.tsx
│  │  │  │  │  └─ ServicesSection.tsx
│  │  │  │  └─ services
│  │  │  │     ├─ admission-process
│  │  │  │     │  └─ page.tsx
│  │  │  │     ├─ cognitive-program
│  │  │  │     │  └─ page.tsx
│  │  │  │     ├─ daily-life
│  │  │  │     │  └─ page.tsx
│  │  │  │     ├─ family-support
│  │  │  │     │  └─ page.tsx
│  │  │  │     ├─ individual-care
│  │  │  │     │  └─ page.tsx
│  │  │  │     ├─ leisure-program
│  │  │  │     │  └─ page.tsx
│  │  │  │     ├─ medical-nursing
│  │  │  │     │  └─ page.tsx
│  │  │  │     ├─ nutrition-care
│  │  │  │     │  └─ page.tsx
│  │  │  │     ├─ rehabilitation
│  │  │  │     │  └─ page.tsx
│  │  │  │     └─ step-care-program
│  │  │  │        └─ page.tsx
│  │  │  ├─ components
│  │  │  │  ├─ AppShell.tsx
│  │  │  │  ├─ FloatingSidebar.tsx
│  │  │  │  ├─ Footer.tsx
│  │  │  │  ├─ navbar
│  │  │  │  │  ├─ AllMenu.tsx
│  │  │  │  │  ├─ DesktopDropdown.tsx
│  │  │  │  │  ├─ MobileMenu.tsx
│  │  │  │  │  └─ Navbar.tsx
│  │  │  │  └─ NoticeSidebar.tsx
│  │  │  ├─ data
│  │  │  │  └─ menu.json
│  │  │  ├─ global.d.ts
│  │  │  ├─ image
│  │  │  │  └─ logo.png
│  │  │  ├─ lib
│  │  │  │  ├─ email.ts
│  │  │  │  ├─ huggingface.ts
│  │  │  │  ├─ security-demo.ts
│  │  │  │  └─ security-store.ts
│  │  │  ├─ next-env.d.ts
│  │  │  ├─ providers
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
│     │  ├─ events
│     │  ├─ metrics.ts
│     │  ├─ processors
│     │  └─ schedules
│     └─ tsconfig.json
├─ docs
│  ├─ assets
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
│  │  │  └─ schemas
│  │  └─ tsconfig.json
│  ├─ database
│  │  ├─ package.json
│  │  ├─ prisma
│  │  │  └─ schema.prisma
│  │  ├─ project.json
│  │  ├─ src
│  │  │  ├─ adapters
│  │  │  └─ index.ts
│  │  └─ tsconfig.json
│  ├─ logger
│  │  ├─ package.json
│  │  ├─ project.json
│  │  ├─ src
│  │  │  ├─ console.ts
│  │  │  ├─ index.ts
│  │  │  ├─ logger-types.ts
│  │  │  └─ logger.ts
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
├─ tmp
│  ├─ apps
│  │  ├─ api
│  │  └─ worker
│  └─ packages
│     ├─ database
│     └─ ui
├─ tsconfig.base.json
├─ tsconfig.json
└─ vitest.config.ts

```
