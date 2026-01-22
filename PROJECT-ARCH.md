```
agape-care
├─ .changeset
│  ├─ config.json
│  └─ README.md
├─ .cz-config.cjs
├─ .firebaserc
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
│  │  ├─ next-env.d.ts
│  │  ├─ next.config.mjs
│  │  ├─ package.json
│  │  ├─ postcss.config.mjs
│  │  ├─ project.json
│  │  ├─ public
│  │  │  ├─ favicon
│  │  │  │  ├─ android-chrome-192x192.png
│  │  │  │  ├─ android-chrome-512x512.png
│  │  │  │  ├─ apple-touch-icon.png
│  │  │  │  ├─ favicon-16x16.png
│  │  │  │  ├─ favicon-32x32.png
│  │  │  │  ├─ favicon.ico
│  │  │  │  └─ site.webmanifest
│  │  │  └─ images
│  │  │     ├─ avatar.png
│  │  │     ├─ footer_logo.png
│  │  │     ├─ header_logo.png
│  │  │     ├─ logo.png
│  │  │     ├─ venue_sp_1.jpg
│  │  │     ├─ venue_sp_2.jpg
│  │  │     └─ venue_sp_3.jpg
│  │  ├─ server.ts
│  │  ├─ src
│  │  │  ├─ app
│  │  │  │  ├─ (auth)
│  │  │  │  │  └─ login
│  │  │  │  │     └─ page.tsx
│  │  │  │  ├─ (protected)
│  │  │  │  │  ├─ board
│  │  │  │  │  │  ├─ BoardManagement.tsx
│  │  │  │  │  │  ├─ ContentCreation.tsx
│  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  ├─ dashboard
│  │  │  │  │  │  ├─ AiDashboard.tsx
│  │  │  │  │  │  ├─ AnalyticsDashboard.tsx
│  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  ├─ facilities
│  │  │  │  │  │  ├─ equipments
│  │  │  │  │  │  │  ├─ add
│  │  │  │  │  │  │  │  ├─ EquipmentAddForm.tsx
│  │  │  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  │  │  ├─ Equipment.tsx
│  │  │  │  │  │  │  ├─ page.tsx
│  │  │  │  │  │  │  └─ [id]
│  │  │  │  │  │  │     ├─ edit
│  │  │  │  │  │  │     │  ├─ EquipmentEditForm.tsx
│  │  │  │  │  │  │     │  └─ page.tsx
│  │  │  │  │  │  │     └─ EquipmentDetail.tsx
│  │  │  │  │  │  ├─ page.tsx
│  │  │  │  │  │  ├─ rooms
│  │  │  │  │  │  │  ├─ add
│  │  │  │  │  │  │  │  ├─ page.tsx
│  │  │  │  │  │  │  │  └─ RoomAddForm.tsx
│  │  │  │  │  │  │  ├─ page.tsx
│  │  │  │  │  │  │  ├─ Room.tsx
│  │  │  │  │  │  │  └─ [id]
│  │  │  │  │  │  │     ├─ edit
│  │  │  │  │  │  │     │  ├─ page.tsx
│  │  │  │  │  │  │     │  └─ RoomEditForm.tsx
│  │  │  │  │  │  │     ├─ page.tsx
│  │  │  │  │  │  │     └─ RoomDetail.tsx
│  │  │  │  │  │  └─ venues
│  │  │  │  │  │     ├─ add
│  │  │  │  │  │     │  ├─ page.tsx
│  │  │  │  │  │     │  └─ VenueAddForm.tsx
│  │  │  │  │  │     ├─ page.tsx
│  │  │  │  │  │     ├─ Venue.tsx
│  │  │  │  │  │     └─ [id]
│  │  │  │  │  │        ├─ edit
│  │  │  │  │  │        │  ├─ page.tsx
│  │  │  │  │  │        │  └─ VenueEditForm.tsx
│  │  │  │  │  │        ├─ page.tsx
│  │  │  │  │  │        └─ VenueDetail.tsx
│  │  │  │  │  ├─ feedback
│  │  │  │  │  │  └─ Feedback.tsx
│  │  │  │  │  ├─ help
│  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  ├─ profile
│  │  │  │  │  │  ├─ edit
│  │  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  ├─ programs
│  │  │  │  │  │  ├─ add
│  │  │  │  │  │  │  ├─ page.tsx
│  │  │  │  │  │  │  └─ Post.tsx
│  │  │  │  │  │  ├─ OfflineProgram.tsx
│  │  │  │  │  │  ├─ OnlineProgram.tsx
│  │  │  │  │  │  ├─ page.tsx
│  │  │  │  │  │  └─ [id]
│  │  │  │  │  │     ├─ edit
│  │  │  │  │  │     │  └─ page.tsx
│  │  │  │  │  │     └─ sessions
│  │  │  │  │  │        └─ page.tsx
│  │  │  │  │  ├─ reservations
│  │  │  │  │  │  ├─ page.tsx
│  │  │  │  │  │  ├─ ProgramReservation.tsx
│  │  │  │  │  │  ├─ Reservation.tsx
│  │  │  │  │  │  ├─ Scheduler.tsx
│  │  │  │  │  │  └─ SpaceReservation.tsx
│  │  │  │  │  ├─ settings
│  │  │  │  │  │  ├─ Contact.tsx
│  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  └─ users
│  │  │  │  │     ├─ page.tsx
│  │  │  │  │     └─ UserSettings.tsx
│  │  │  │  ├─ (public)
│  │  │  │  │  └─ page.tsx
│  │  │  │  ├─ api
│  │  │  │  │  ├─ auth
│  │  │  │  │  ├─ proxy
│  │  │  │  │  │  └─ [...path]
│  │  │  │  │  └─ webhooks
│  │  │  │  │     └─ stripe
│  │  │  │  ├─ error.tsx
│  │  │  │  ├─ globals.css
│  │  │  │  ├─ lib
│  │  │  │  ├─ loading.tsx
│  │  │  │  ├─ not-found.tsx
│  │  │  │  ├─ reservation
│  │  │  │  │  └─ [id]
│  │  │  │  ├─ test-firebase
│  │  │  │  │  └─ page.tsx
│  │  │  │  ├─ users
│  │  │  │  │  └─ [id]
│  │  │  │  │     └─ edit
│  │  │  │  └─ venues
│  │  │  │     └─ [id]
│  │  │  │        └─ edit
│  │  │  ├─ components
│  │  │  │  ├─ ai
│  │  │  │  │  ├─ AutomationTasks.tsx
│  │  │  │  │  ├─ PredictionAnalysis.tsx
│  │  │  │  │  ├─ SentimentAnalysis.tsx
│  │  │  │  │  └─ TimeSlotEfficiency.tsx
│  │  │  │  ├─ AppShell.tsx
│  │  │  │  ├─ Header.tsx
│  │  │  │  ├─ n8n
│  │  │  │  │  ├─ ApiConnections.tsx
│  │  │  │  │  ├─ AutomationTriggers.tsx
│  │  │  │  │  ├─ NotificationCenter.tsx
│  │  │  │  │  ├─ SlackIntegration.tsx
│  │  │  │  │  ├─ WebhookManager.tsx
│  │  │  │  │  └─ WorkflowAutomation.tsx
│  │  │  │  ├─ Pagination.tsx
│  │  │  │  ├─ PeriodFilter.tsx
│  │  │  │  ├─ RealTimeStats.tsx
│  │  │  │  ├─ RoomUsagePrediction.tsx
│  │  │  │  ├─ Sidebar.tsx
│  │  │  │  └─ WeeklyTrends.tsx
│  │  │  ├─ data
│  │  │  │  ├─ comments.json
│  │  │  │  ├─ content.json
│  │  │  │  ├─ devices.json
│  │  │  │  ├─ equipment-with-venues.json
│  │  │  │  ├─ equipmentRentals.json
│  │  │  │  ├─ features.json
│  │  │  │  ├─ hero.json
│  │  │  │  ├─ insights.json
│  │  │  │  ├─ inventories.json
│  │  │  │  ├─ menu.json
│  │  │  │  ├─ partners.json
│  │  │  │  ├─ posts.json
│  │  │  │  ├─ programs.json
│  │  │  │  ├─ rooms-by-venue.json
│  │  │  │  ├─ rooms.json
│  │  │  │  ├─ users.json
│  │  │  │  └─ venues.json
│  │  │  └─ providers
│  │  │     └─ RootProvider.tsx
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
│  │  │     │  ├─ admin.controller.ts
│  │  │     │  ├─ admin.interface.ts
│  │  │     │  ├─ admin.module.ts
│  │  │     │  └─ admin.service.ts
│  │  │     ├─ ai
│  │  │     │  ├─ ai.controller.ts
│  │  │     │  ├─ ai.interface.ts
│  │  │     │  ├─ ai.module.ts
│  │  │     │  ├─ ai.processor.ts
│  │  │     │  └─ ai.service.ts
│  │  │     ├─ auth
│  │  │     │  ├─ auth.controller.ts
│  │  │     │  ├─ auth.interface.ts
│  │  │     │  ├─ auth.module.ts
│  │  │     │  ├─ auth.processor.ts
│  │  │     │  └─ auth.service.ts
│  │  │     ├─ index.ts
│  │  │     ├─ mypage
│  │  │     │  ├─ mypage.controller.ts
│  │  │     │  ├─ mypage.interface.ts
│  │  │     │  ├─ mypage.module.ts
│  │  │     │  ├─ mypage.processor.ts
│  │  │     │  └─ mypage.service.ts
│  │  │     ├─ payments
│  │  │     │  ├─ payment.controller.ts
│  │  │     │  ├─ payment.interface.ts
│  │  │     │  ├─ payment.module.ts
│  │  │     │  ├─ payment.processor.ts
│  │  │     │  └─ payment.service.ts
│  │  │     ├─ programs
│  │  │     │  ├─ program.controller.ts
│  │  │     │  ├─ program.interface.ts
│  │  │     │  ├─ program.module.ts
│  │  │     │  ├─ program.processor.ts
│  │  │     │  └─ program.service.ts
│  │  │     ├─ reservations
│  │  │     │  ├─ reservation.controller.ts
│  │  │     │  ├─ reservation.interface.ts
│  │  │     │  ├─ reservation.module.ts
│  │  │     │  ├─ reservation.processor.ts
│  │  │     │  └─ reservation.service.ts
│  │  │     ├─ users
│  │  │     │  ├─ user.controller.ts
│  │  │     │  ├─ user.interface.ts
│  │  │     │  ├─ user.module.ts
│  │  │     │  └─ user.service.ts
│  │  │     └─ venues
│  │  │        ├─ venue.controller.ts
│  │  │        ├─ venue.interface.ts
│  │  │        ├─ venue.module.ts
│  │  │        └─ venue.service.ts
│  │  └─ tsconfig.json
│  ├─ web
│  │  ├─ next-env.d.ts
│  │  ├─ next.config.mjs
│  │  ├─ package.json
│  │  ├─ postcss.config.mjs
│  │  ├─ project.json
│  │  ├─ public
│  │  │  ├─ favicon
│  │  │  │  ├─ android-chrome-192x192.png
│  │  │  │  ├─ android-chrome-512x512.png
│  │  │  │  ├─ apple-touch-icon.png
│  │  │  │  ├─ favicon-16x16.png
│  │  │  │  ├─ favicon-32x32.png
│  │  │  │  ├─ favicon.ico
│  │  │  │  └─ site.webmanifest
│  │  │  ├─ images
│  │  │  │  ├─ avatar.png
│  │  │  │  ├─ creator_hero_bg.jpg
│  │  │  │  ├─ cta_sec_bk.jpg
│  │  │  │  ├─ facilities_hero_bg.jpg
│  │  │  │  ├─ feature_sp_1.png
│  │  │  │  ├─ feature_sp_2.png
│  │  │  │  ├─ feature_sp_3.png
│  │  │  │  ├─ footer_logo.png
│  │  │  │  ├─ header_logo.png
│  │  │  │  ├─ hero_sp_1.png
│  │  │  │  ├─ hero_sp_2.png
│  │  │  │  ├─ hero_sp_3.png
│  │  │  │  ├─ image.png
│  │  │  │  ├─ logo.png
│  │  │  │  ├─ program_hero_bg.png
│  │  │  │  ├─ room_sp_1.jpg
│  │  │  │  ├─ room_sp_2.jpg
│  │  │  │  ├─ room_sp_3.jpg
│  │  │  │  ├─ room_sp_4.jpg
│  │  │  │  ├─ social_hero_bk.jpg
│  │  │  │  ├─ venue_sp_1.jpg
│  │  │  │  ├─ venue_sp_2.jpg
│  │  │  │  └─ venue_sp_3.jpg
│  │  │  └─ policies
│  │  │     ├─ privacy.html
│  │  │     └─ terms.html
│  │  ├─ server.ts
│  │  ├─ src
│  │  │  ├─ app
│  │  │  │  ├─ (auth)
│  │  │  │  │  ├─ callback
│  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  ├─ login
│  │  │  │  │  │  ├─ login.tsx
│  │  │  │  │  │  ├─ page.tsx
│  │  │  │  │  │  └─ SSO.tsx
│  │  │  │  │  ├─ onboarding
│  │  │  │  │  │  ├─ Onboarding.tsx
│  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  └─ signup
│  │  │  │  │     ├─ page.tsx
│  │  │  │  │     └─ Signup.tsx
│  │  │  │  ├─ (protected)
│  │  │  │  │  └─ mypage
│  │  │  │  │     ├─ MyPageMainContent.tsx
│  │  │  │  │     ├─ MyPageSidebar.tsx
│  │  │  │  │     ├─ notifications
│  │  │  │  │     │  └─ page.tsx
│  │  │  │  │     ├─ page.tsx
│  │  │  │  │     ├─ points
│  │  │  │  │     │  └─ page.tsx
│  │  │  │  │     ├─ profile
│  │  │  │  │     │  └─ page.tsx
│  │  │  │  │     ├─ programs
│  │  │  │  │     │  └─ page.tsx
│  │  │  │  │     ├─ reservations
│  │  │  │  │     │  └─ page.tsx
│  │  │  │  │     ├─ reviews
│  │  │  │  │     │  └─ page.tsx
│  │  │  │  │     └─ security
│  │  │  │  │        └─ page.tsx
│  │  │  │  ├─ api
│  │  │  │  │  ├─ auth
│  │  │  │  │  ├─ proxy
│  │  │  │  │  │  └─ [...path]
│  │  │  │  │  ├─ translate
│  │  │  │  │  └─ webhooks
│  │  │  │  │     └─ stripe
│  │  │  │  ├─ error.tsx
│  │  │  │  ├─ globals.css
│  │  │  │  ├─ loading.tsx
│  │  │  │  ├─ not-found.tsx
│  │  │  │  └─ page.tsx
│  │  │  ├─ components
│  │  │  │  ├─ ai
│  │  │  │  │  └─ AIChat.tsx
│  │  │  │  ├─ AIInsights.tsx
│  │  │  │  ├─ AppShell.tsx
│  │  │  │  ├─ Footer.tsx
│  │  │  │  ├─ Header.tsx
│  │  │  │  ├─ home
│  │  │  │  │  ├─ AIViewSection.tsx
│  │  │  │  │  ├─ CTASection.tsx
│  │  │  │  │  ├─ FacilitiesSection.tsx
│  │  │  │  │  ├─ FeatureSection.tsx
│  │  │  │  │  ├─ InsightSection.tsx
│  │  │  │  │  ├─ MainHeroSection.tsx
│  │  │  │  │  ├─ PartnerSlideSection.tsx
│  │  │  │  │  ├─ ProgramSection.tsx
│  │  │  │  │  └─ QuickMenuSection.tsx
│  │  │  │  ├─ Input.tsx
│  │  │  │  ├─ Pagination.tsx
│  │  │  │  ├─ QuickFab.tsx
│  │  │  │  ├─ TermsModal.tsx
│  │  │  │  └─ Toast.tsx
│  │  │  ├─ data
│  │  │  ├─ global.d.ts
│  │  │  ├─ lib
│  │  │  │  ├─ email.ts
│  │  │  │  ├─ huggingface.ts
│  │  │  │  ├─ security-demo.ts
│  │  │  │  └─ security-store.ts
│  │  │  ├─ next-env.d.ts
│  │  │  ├─ providers
│  │  │  │  └─ RootProvider.tsx
│  │  │  ├─ web-types.d.ts
│  │  │  └─ web-types.ts
│  │  └─ tsconfig.json
│  └─ worker
│     ├─ package.json
│     ├─ project.json
│     ├─ src
│     │  ├─ events
│     │  │  ├─ notification.ts
│     │  │  └─ reservation.ts
│     │  ├─ main.ts
│     │  ├─ metrics.ts
│     │  ├─ processors
│     │  │  ├─ notification.ts
│     │  │  └─ reservation.ts
│     │  └─ schedules
│     │     └─ scheduler.ts
│     └─ tsconfig.json
├─ docs
│  ├─ assets
│  │  └─ ConnectWon.png
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
├─ firebase.json
├─ index.html
├─ infra
│  ├─ cloudbuild.yaml
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
│  │  └─ nginx.conf
│  ├─ infra-types.ts
│  └─ n8n
│     ├─ package.json
│     └─ project.json
├─ LICENSE
├─ nx.json
├─ package.json
├─ packages.json
├─ pnpm-lock.yaml
├─ pnpm-workspace.yaml
├─ postcss.config.ts
├─ prettier.config.mjs
├─ PROJECT-ARCH.md
├─ README.md
├─ renovate.json
├─ setup-structure.ps1
├─ src
│  ├─ App.tsx
│  ├─ components
│  │  └─ feature
│  │     ├─ FloatingSidebar.tsx
│  │     ├─ Footer.tsx
│  │     ├─ Navbar.tsx
│  │     ├─ NoticeSidebar.tsx
│  │     └─ ServiceSidebar.tsx
│  ├─ i18n
│  │  ├─ index.ts
│  │  └─ local
│  │     └─ index.ts
│  ├─ index.css
│  ├─ main.tsx
│  ├─ mocks
│  │  ├─ accounting.ts
│  │  ├─ board.ts
│  │  ├─ communities.ts
│  │  ├─ communityDetail.ts
│  │  ├─ consultations.ts
│  │  ├─ gallery.ts
│  │  ├─ mealPlan.ts
│  │  ├─ payroll.ts
│  │  ├─ programSchedule.ts
│  │  ├─ residents-management.ts
│  │  └─ residents.ts
│  ├─ pages
│  │  ├─ admin
│  │  │  ├─ components
│  │  │  │  ├─ AccountingManagement.tsx
│  │  │  │  ├─ AccountManagement.tsx
│  │  │  │  ├─ AdminHeader.tsx
│  │  │  │  ├─ AdminSidebar.tsx
│  │  │  │  ├─ AssetManagement.tsx
│  │  │  │  ├─ AttendanceManagement.tsx
│  │  │  │  ├─ BasicInfoEditor.tsx
│  │  │  │  ├─ BathScheduleManagement.tsx
│  │  │  │  ├─ BeneficiaryDetail.tsx
│  │  │  │  ├─ BeneficiaryList.tsx
│  │  │  │  ├─ BeneficiaryNew.tsx
│  │  │  │  ├─ BurdenRateManagement.tsx
│  │  │  │  ├─ CareHistory.tsx
│  │  │  │  ├─ CareRecordAnalytics.tsx
│  │  │  │  ├─ CareRecordManagement.tsx
│  │  │  │  ├─ CCTVDeviceManagement.tsx
│  │  │  │  ├─ CCTVRoomConsent.tsx
│  │  │  │  ├─ CCTVViewLog.tsx
│  │  │  │  ├─ CCTVWeeklyCheck.tsx
│  │  │  │  ├─ ClosingManagement.tsx
│  │  │  │  ├─ ConsultationManagement.tsx
│  │  │  │  ├─ ConsultationRequestManagement.tsx
│  │  │  │  ├─ ContentManagement.tsx
│  │  │  │  ├─ CostConsultationEditor.tsx
│  │  │  │  ├─ DailyCareRecord.tsx
│  │  │  │  ├─ DashboardOverview.tsx
│  │  │  │  ├─ DesignInfoEditor.tsx
│  │  │  │  ├─ DonationVolunteerEditor.tsx
│  │  │  │  ├─ EducationManagement.tsx
│  │  │  │  ├─ FacilityInfo.tsx
│  │  │  │  ├─ FamilyCommunication.tsx
│  │  │  │  ├─ FreeBoardAdmin.tsx
│  │  │  │  ├─ FreeBoardManagement.tsx
│  │  │  │  ├─ GalleryManagement.tsx
│  │  │  │  ├─ GrievanceManagement.tsx
│  │  │  │  ├─ InformationManagement.tsx
│  │  │  │  ├─ InspectionManagement.tsx
│  │  │  │  ├─ InsuranceClaimManagement.tsx
│  │  │  │  ├─ IntroEditor.tsx
│  │  │  │  ├─ InventoryManagement.tsx
│  │  │  │  ├─ JournalManagement.tsx
│  │  │  │  ├─ MealAssistRecord.tsx
│  │  │  │  ├─ MealPlanManagement.tsx
│  │  │  │  ├─ MealPlanManagementAdvanced.tsx
│  │  │  │  ├─ MedicationManagement.tsx
│  │  │  │  ├─ MedicationManagementAdvanced.tsx
│  │  │  │  ├─ MeetingManagement.tsx
│  │  │  │  ├─ MenuSettingsEditor.tsx
│  │  │  │  ├─ NeedsAssessment.tsx
│  │  │  │  ├─ NeedsAssessmentAdvanced.tsx
│  │  │  │  ├─ NoticeManagement.tsx
│  │  │  │  ├─ NotificationDashboard.tsx
│  │  │  │  ├─ NotificationSend.tsx
│  │  │  │  ├─ NursingRecord.tsx
│  │  │  │  ├─ OutingManagement.tsx
│  │  │  │  ├─ PartnerManagement.tsx
│  │  │  │  ├─ PayrollManagement.tsx
│  │  │  │  ├─ PopupManagement.tsx
│  │  │  │  ├─ ProgramAlbumManagement.tsx
│  │  │  │  ├─ ProgramManagement.tsx
│  │  │  │  ├─ RBACManagement.tsx
│  │  │  │  ├─ RepeatWorkTemplate.tsx
│  │  │  │  ├─ ReportClinic.tsx
│  │  │  │  ├─ ReportElimination.tsx
│  │  │  │  ├─ ReportMedication.tsx
│  │  │  │  ├─ ReportNursing.tsx
│  │  │  │  ├─ ReportPressureUlcer.tsx
│  │  │  │  ├─ ResidentManagement.tsx
│  │  │  │  ├─ ResidentRegistration.tsx
│  │  │  │  ├─ ServiceEditor.tsx
│  │  │  │  ├─ ServicesManagement.tsx
│  │  │  │  ├─ SiteSettings.tsx
│  │  │  │  ├─ SpecialRoomUse.tsx
│  │  │  │  ├─ StaffManagement.tsx
│  │  │  │  ├─ StaffWorkStatus.tsx
│  │  │  │  ├─ TransportService.tsx
│  │  │  │  ├─ VehicleManagement.tsx
│  │  │  │  ├─ WeeklyWorkTemplate.tsx
│  │  │  │  ├─ WorkScheduleCalendar.tsx
│  │  │  │  └─ WorkScheduleManagement.tsx
│  │  │  ├─ dashboard
│  │  │  │  └─ page.tsx
│  │  │  ├─ login
│  │  │  │  └─ page.tsx
│  │  │  └─ my-page
│  │  │     ├─ components
│  │  │     │  ├─ MusculoskeletalTab.tsx
│  │  │     │  ├─ NotificationsTab.tsx
│  │  │     │  ├─ ScheduleTab.tsx
│  │  │     │  └─ SettingsTab.tsx
│  │  │     └─ page.tsx
│  │  ├─ admission
│  │  │  └─ page.tsx
│  │  ├─ board
│  │  │  ├─ components
│  │  │  │  ├─ DeleteConfirmModal.tsx
│  │  │  │  ├─ EditPostModal.tsx
│  │  │  │  ├─ PostDetailModal.tsx
│  │  │  │  └─ WritePostModal.tsx
│  │  │  └─ page.tsx
│  │  ├─ communities
│  │  │  ├─ detail
│  │  │  │  └─ page.tsx
│  │  │  └─ page.tsx
│  │  ├─ corporation
│  │  │  └─ page.tsx
│  │  ├─ cost
│  │  │  └─ page.tsx
│  │  ├─ facility
│  │  │  ├─ components
│  │  │  │  ├─ CommonAreas.tsx
│  │  │  │  ├─ FacilityHero.tsx
│  │  │  │  ├─ FloorGuide.tsx
│  │  │  │  ├─ RoomTypes.tsx
│  │  │  │  └─ SafetyFeatures.tsx
│  │  │  └─ page.tsx
│  │  ├─ gallery
│  │  │  └─ page.tsx
│  │  ├─ home
│  │  │  ├─ components
│  │  │  │  ├─ AdmissionProcessSection.tsx
│  │  │  │  ├─ ConsultationSection.tsx
│  │  │  │  ├─ ContactSection.tsx
│  │  │  │  ├─ FeaturesSection.tsx
│  │  │  │  ├─ HeroSection.tsx
│  │  │  │  ├─ IntroSection.tsx
│  │  │  │  ├─ LocationSection.tsx
│  │  │  │  ├─ NewsSection.tsx
│  │  │  │  └─ ServicesSection.tsx
│  │  │  └─ page.tsx
│  │  ├─ intro
│  │  │  ├─ components
│  │  │  │  ├─ DirectorMessage.tsx
│  │  │  │  ├─ IntroHero.tsx
│  │  │  │  ├─ OrganizationChart.tsx
│  │  │  │  └─ PhilosophySection.tsx
│  │  │  ├─ history
│  │  │  │  └─ page.tsx
│  │  │  ├─ page.tsx
│  │  │  └─ staff
│  │  │     └─ page.tsx
│  │  ├─ meal-plan
│  │  │  └─ page.tsx
│  │  ├─ mobile
│  │  │  └─ attendance
│  │  │     └─ page.tsx
│  │  ├─ NotFound.tsx
│  │  ├─ notice
│  │  │  └─ page.tsx
│  │  ├─ program-schedule
│  │  │  └─ page.tsx
│  │  ├─ programs
│  │  │  └─ page.tsx
│  │  ├─ services
│  │  │  ├─ admission-process
│  │  │  │  └─ page.tsx
│  │  │  ├─ cognitive-program
│  │  │  │  └─ page.tsx
│  │  │  ├─ daily-life
│  │  │  │  └─ page.tsx
│  │  │  ├─ family-support
│  │  │  │  └─ page.tsx
│  │  │  ├─ individual-care
│  │  │  │  └─ page.tsx
│  │  │  ├─ leisure-program
│  │  │  │  └─ page.tsx
│  │  │  ├─ medical-nursing
│  │  │  │  └─ page.tsx
│  │  │  ├─ nutrition-care
│  │  │  │  └─ page.tsx
│  │  │  ├─ rehabilitation
│  │  │  │  └─ page.tsx
│  │  │  ├─ step-care-program
│  │  │  │  └─ page.tsx
│  │  │  └─ training-program
│  │  │     ├─ components
│  │  │     │  ├─ Breadcrumb.tsx
│  │  │     │  ├─ ConsultationCTA.tsx
│  │  │     │  ├─ LegalNotice.tsx
│  │  │     │  ├─ ProgramBenefits.tsx
│  │  │     │  ├─ ProgramOverview.tsx
│  │  │     │  ├─ RelatedServices.tsx
│  │  │     │  ├─ ServiceHero.tsx
│  │  │     │  ├─ StageDetails.tsx
│  │  │     │  └─ TestimonialsGallery.tsx
│  │  │     └─ page.tsx
│  │  └─ visit
│  │     └─ page.tsx
│  └─ supabaseClient.ts
├─ tsconfig.app.json
├─ tsconfig.base.json
├─ tsconfig.json
├─ tsconfig.node.json
├─ tsconfigs.json
└─ vite.config.ts

```
