# 🏥 Agape Care - 요양원 통합 관리 시스템

![License](https://img.shields.io/badge/License-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react)
![Next.js](https://img.shields.io/badge/Next.js-15-000000?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?logo=typescript)
![NestJS](https://img.shields.io/badge/NestJS-11-E0234E?logo=nestjs)

> **아가페케어는 요양원 운영의 모든 것을 하나로 연결하는 통합 관리 플랫폼입니다.**

요양원 홈페이지부터 입소자 관리, 직원 근태, 프로그램 운영, 회계/급여, 가족 소통까지 디지털 혁신으로 돌봄의 질을 높이고 운영 효율을 극대화합니다.

---

## 📋 목차

- [프로젝트 소개](#-프로젝트-소개)
- [주요 기능](#-주요-기능)
- [기술 스택](#-기술-스택)
- [시스템 아키텍처](#-시스템-아키텍처)
- [주요 화면](#-주요-화면)
- [설치 및 실행](#-설치-및-실행)
- [프로젝트 구조](#-프로젝트-구조)
- [데이터베이스 설계](#-데이터베이스-설계)
- [배포](#-배포)
- [기여하기](#-기여하기)
- [라이선스](#-라이선스)
- [문의](#-문의)

---

## 🎯 프로젝트 소개

### 개요

**Agape Care**는 요양원 운영에 필요한 기능을 통합한 올인원 디지털 플랫폼입니다.

- **🌐 대외 홈페이지**: 요양원 소개, 입소 상담, 프로그램 안내, 식단표, 갤러리, 공지사항
- **🔐 관리자 ERP**: 입소자/직원 관리, 간호/돌봄 기록, 근태/급여, 회계/재고, 차량/시설 관리
- **⚙️ 백엔드 API + 워커**: REST API, 알림/메일 등 비동기 처리, 자동화 워크플로우

### 핵심 가치

| 가치 | 설명 |
| --- | --- |
| **🎯 통합성** | 분산된 업무 시스템을 하나의 플랫폼으로 통합 |
| **⚡ 효율성** | 반복 업무 자동화로 운영 효율 향상 |
| **📊 투명성** | 실시간 데이터 기반 의사결정 지원 |
| **💙 돌봄 품질** | 체계적인 기록 관리로 입소자 맞춤 케어 실현 |
| **🔒 보안성** | RBAC 기반 권한 관리 및 개인정보 보호 |

---

## 🚀 주요 기능

### 🌐 대외 홈페이지 (Public Web)

- 시설 소개, 생활 정보, 프로그램/식단 안내
- 공지사항/갤러리/게시판 등 콘텐츠 제공
- 입소 상담 및 방문 문의 유도

### 🔐 관리자 시스템 (Admin ERP)

- 대시보드: 운영 현황, 지표, 알림
- 입소자 관리: 기본정보, 평가, 돌봄/건강 기록
- 직원 관리: 인사, 근태, 급여, 교육
- 프로그램 운영: 일정, 참여, 앨범
- 회계/재무: 수입/지출, 결산, 청구
- 운영/시설: 재고, 점검, 차량, 민원, CCTV
- 시스템 설정: 사이트 설정, 권한(RBAC), 알림

### ⚙️ API / Worker

- NestJS 모듈형 API (`auth`, `resident`, `notification`, `contents`, `operations` 등)
- BullMQ 기반 비동기 처리 (이메일/알림/처리 작업)
- Swagger 문서, 공통 예외/검증/로깅 파이프라인

---

## 🛠️ 기술 스택

### 🖥️ Frontend

| 카테고리 | 기술 | 버전 | 용도 |
| --- | --- | --- | --- |
| Framework | Next.js | 15 | App Router 기반 웹/어드민 |
| Language | TypeScript | 5.6 | 타입 안전성 |
| UI | React | 18.3 | 컴포넌트 기반 UI |
| Styling | Tailwind CSS | 3.4 | 유틸리티 스타일링 |
| State | Zustand | - | 전역 상태 |
| Data Fetching | TanStack Query | - | 서버 상태 |
| Form | React Hook Form, Zod | - | 폼 관리/검증 |
| Chart | Recharts | - | 데이터 시각화 |

### ⚙️ Backend

| 카테고리 | 기술 | 버전 | 용도 |
| --- | --- | --- | --- |
| Framework | NestJS | 11 | Node.js 백엔드 |
| API Contract | ts-rest + Zod | - | API 계약 공유 |
| ORM | Prisma | - | DB 접근 계층 |
| Database | PostgreSQL | 15+ | 관계형 DB |
| Cache/Queue | Redis, BullMQ | 7+ / - | 캐시/비동기 큐 |
| Validation | class-validator, Zod | - | 입력 검증 |
| Email | Nodemailer | - | 메일 발송 |

### 🚀 DevOps / Quality

| 카테고리 | 기술 | 용도 |
| --- | --- | --- |
| Monorepo | pnpm workspace, Nx | 멀티앱/패키지 통합 관리 |
| Container | Docker, Docker Compose | 로컬 인프라 실행 |
| CI/CD | GitHub Actions | 자동화 파이프라인 |
| Lint/Format | ESLint, Prettier | 코드 품질 |
| Test | Vitest, Playwright | 단위/E2E 테스트 |
| Git Hook | Husky, lint-staged | 커밋 전 검사 |

### 🤖 Automation

| 기술 | 용도 |
| --- | --- |
| n8n | 워크플로우 자동화 |
| OpenAI API | AI 기반 요약/보조 기능 (선택) |

---

## 🏗️ 시스템 아키텍처

```text
Frontend (web/admin)
        │
        ▼
NestJS API (apps/api) ── API Contract (packages/api-contract)
        │
        ├── PostgreSQL
        └── Redis
               │
               ▼
         Worker (apps/worker)
```

### 주요 설계 원칙

- **Monorepo**: 앱/패키지 일관 버전 관리
- **Contract-first**: 프론트/백 타입 계약 공유
- **모듈화**: 도메인 기준 확장 가능한 구조
- **보안/권한**: JWT + RBAC 기반 접근 제어

---

## 🖼️ 주요 화면

아래 경로에 스크린샷 파일을 두면 README에서 바로 표시됩니다.

- `docs/assets/screenshots/web-home.png`
- `docs/assets/screenshots/admin-dashboard.png`
- `docs/assets/screenshots/admin-resident.png`
- `docs/assets/screenshots/admin-notification-send.png`

![Web Home](docs/assets/screenshots/web-home.png)
![Admin Dashboard](docs/assets/screenshots/admin-dashboard.png)
![Admin Resident](docs/assets/screenshots/admin-resident.png)
![Admin Notification](docs/assets/screenshots/admin-notification-send.png)

---

## 📦 설치 및 실행

### 사전 요구사항

- Node.js `>= 22.19.0`
- pnpm `>= 9`
- Docker / Docker Compose (선택)

### 1) 저장소 클론

```bash
git clone https://github.com/your-org/agape-care.git
cd agape-care
```

### 2) 의존성 설치

```bash
pnpm install
```

### 3) 환경 변수 설정

```bash
cp .env.example .env
```

PowerShell:

```powershell
Copy-Item .env.example .env
```

### 4) API Contract 선빌드 (중요)

```bash
pnpm --filter @agape-care/api-contract build
```

### 5) 개발 서버 실행

```bash
pnpm dev:api
pnpm dev:admin
pnpm dev:web
```

워커:

```bash
pnpm dev:worker
```

### 6) 접속 확인

| 서비스 | URL |
| --- | --- |
| 홈페이지 | http://localhost:3000 |
| 관리자 | http://localhost:3001 |
| API | http://localhost:8000/api |
| API 문서 (Swagger) | http://localhost:8000/api-docs |
| Health | http://localhost:8000/health |

---

## 📂 프로젝트 구조

```text
agape-care/
├── apps/
│   ├── web/
│   ├── admin/
│   ├── api/
│   └── worker/
├── packages/
│   ├── api-contract/
│   ├── database/
│   ├── logger/
│   └── ui/
├── infra/
│   ├── docker/
│   ├── database/
│   └── n8n/
├── docs/
├── PROJECT-ARCH.md
└── README.md
```

상세 트리는 `PROJECT-ARCH.md` 및 `docs/` 문서 참고.

---

## 🗄️ 데이터베이스 설계

- Prisma 스키마: `packages/database/prisma/schema.prisma`
- SQL 초기화: `infra/database/init/*.sql`
- DB 문서: `docs/database-schema-*.md`

주요 도메인:

1. 사용자/권한
2. 입소자/건강/돌봄
3. 직원/근태/급여
4. 프로그램/콘텐츠
5. 회계/운영/시설

---

## 🚀 배포

### 프로덕션 빌드

```bash
pnpm build
pnpm build:web
pnpm build:admin
pnpm build:api
```

### 배포 예시 전략

- Web/Admin: Vercel
- API/Worker: Cloud Run 또는 VM/Docker
- DB: Cloud SQL PostgreSQL
- Redis: Managed Redis

---

## 🤝 기여하기

1. 브랜치 생성: `git checkout -b feature/your-feature`
2. 변경 후 커밋: `git commit -m "feat: ..."`
3. 푸시: `git push origin feature/your-feature`
4. PR 생성

커밋 컨벤션: Conventional Commits

---

## 📄 라이선스

MIT License

---

## 📞 문의

- 이슈: `https://github.com/your-org/agape-care/issues`
- 이메일: `contact@agape-care.com`
