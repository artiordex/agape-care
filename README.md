# 🏥 Agape Care - 요양원 통합 관리 시스템

![License](https://img.shields.io/badge/License-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react)
![Next.js](https://img.shields.io/badge/Next.js-15-000000?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?logo=typescript)
![NestJS](https://img.shields.io/badge/NestJS-11-E0234E?logo=nestjs)

> **아가페케어는 요양원 운영의 모든 것을 하나로 연결하는 통합 관리
> 플랫폼입니다.**

요양원 홈페이지부터 입소자 관리, 직원 근태, 프로그램 운영, 회계/급여, 가족
소통까지 - 디지털 혁신으로 돌봄의 질을 높이고 운영 효율을 극대화합니다.

---

## 📋 목차

- [프로젝트 소개](#-프로젝트-소개)
- [주요 기능](#-주요-기능)
- [기술 스택](#-기술-스택)
- [시스템 아키텍처](#-시스템-아키텍처)
- [설치 및 실행](#-설치-및-실행)
- [프로젝트 구조](#-프로젝트-구조)
- [데이터베이스 설계](#-데이터베이스-설계)
- [주요 화면](#-주요-화면)
- [배포](#-배포)
- [기여하기](#-기여하기)
- [라이선스](#-라이선스)
- [문의](#-문의)

---

## 🎯 프로젝트 소개

### 개요

**Agape Care**는 요양원 운영에 필요한 모든 기능을 통합한 올인원 디지털
플랫폼입니다.

- **🌐 대외 홈페이지**: 요양원 소개, 입소 상담, 프로그램 안내, 식단표, 갤러리,
  공지사항
- **🔐 관리자 ERP**: 입소자/직원 관리, 간호/돌봄 기록, 근태/급여, 회계/재고,
  차량/시설 관리
- **📱 모바일 출퇴근**: 직원 스마트폰 기반 실시간 근태 체크

### 핵심 가치

| 가치             | 설명                                        |
| ---------------- | ------------------------------------------- |
| **🎯 통합성**    | 분산된 업무 시스템을 하나의 플랫폼으로 통합 |
| **⚡ 효율성**    | 반복 업무 자동화로 관리 시간 50% 단축       |
| **📊 투명성**    | 실시간 데이터 기반 의사결정 지원            |
| **💙 돌봄 품질** | 체계적인 기록 관리로 입소자 맞춤 케어 실현  |
| **🔒 보안성**    | RBAC 기반 권한 관리 및 개인정보 보호        |

### 타겟 사용자

- **요양원 운영자**: 경영 현황 한눈에 파악, 의사결정 지원
- **사무 행정 직원**: 회계, 급여, 재고, 보험청구 업무 간소화
- **간호사/요양보호사**: 돌봄 기록 입력 및 인계 업무 디지털화
- **입소 희망 가족**: 시설 정보 확인 및 온라인 상담 신청
- **입소자 가족**: 식단, 프로그램, 공지사항 실시간 확인

---

## 🚀 주요 기능

### 🌐 대외 홈페이지 (Public Web)

#### 📱 시설 소개

- 요양원 소개 및 철학
- 시설 둘러보기 (공용공간, 객실, 안전시설)
- 층별 안내 및 3D 평면도
- 의료진/직원 소개

#### 🍽️ 생활 정보

- 주간/월간 식단표
- 프로그램 일정
- 공지사항 및 소식
- 갤러리 (일상, 행사 사진)

#### 💬 입소 상담

- 온라인 상담 신청
- 입소 절차 안내
- 비용 안내
- 자주 묻는 질문

#### 👨‍👩‍👧 커뮤니티

- 자유게시판
- 가족 소통방
- 봉사/후원 안내
- 오시는 길

---

### 🔐 관리자 시스템 (Admin ERP)

#### 📊 대시보드

- 실시간 운영 현황 (입소율, 출근율, 당일 일정)
- 주요 지표 시각화 (입소자 추세, 매출, 근태 현황)
- 알림 센터 (돌봄 일정, 약물 투여, 긴급 상황)
- 빠른 액세스 메뉴

#### 👤 입소자 관리

- **기본 정보**: 입소자 등록/수정, 보호자 정보, 건강보험 정보
- **욕구 사정**: 장기요양등급, ADL/IADL 평가, 인지 기능 평가
- **돌봄 기록**: 일일 간호/요양 기록, 식사/배설/목욕 보조 기록
- **건강 관리**: 투약 기록, 활력징후, 병원 동행, 욕창 관리
- **케어 히스토리**: 시계열 기록 조회 및 분석
- **가족 소통**: 입소자별 공지, 사진 전송

#### 👔 직원 관리

- **인사 관리**: 직원 등록/정보 수정, 계약 관리, 자격증 관리
- **근태 관리**: 출퇴근 기록, 휴가/연차 신청, 주간/월간 근무표
- **급여 관리**: 급여 대장, 4대보험 산출, 급여명세서 발행
- **교육 관리**: 직원 교육 이력, 교육 일정 관리
- **평가 관리**: 업무 평가, 보상 체계

#### 📅 프로그램 운영

- **프로그램 기획**: 인지 활동, 여가, 재활 프로그램 등록
- **일정 관리**: 주간/월간 프로그램 스케줄링
- **참여 관리**: 입소자별 참여 현황 기록
- **앨범 관리**: 프로그램 사진 업로드 및 가족 공유

#### 💰 회계 및 재무

- **수입/지출 관리**: 일일 거래 입력, 항목별 분류
- **예산 관리**: 월간/연간 예산 수립 및 집행 현황
- **결산 관리**: 월말 결산, 재무제표 생성
- **보험 청구**: 장기요양보험 청구 업무
- **후원/기부 관리**: 후원금 입금 및 증빙 관리

#### 🍱 급식 관리

- **식단 관리**: 주간/월간 식단표 작성 (일반식, 죽식, 치료식)
- **영양 관리**: 영양소 계산, 특이사항 관리 (알레르기, 금기식품)
- **식사 보조 기록**: 입소자별 식사량, 보조 내용 기록

#### 🚗 차량 및 시설

- **차량 관리**: 차량 정보, 운행 일지, 정비 이력
- **외출 서비스**: 병원 동행, 외출 신청/승인
- **시설 관리**: 객실 배정, 공용공간 예약, 비품 관리
- **재고 관리**: 의료소모품, 식자재, 일상용품 재고

#### 🔐 CCTV 및 보안

- **CCTV 관리**: 설치 위치 관리, 동의서 관리
- **열람 기록**: CCTV 조회 로그, 주간 점검 기록
- **개인정보 보호**: 열람 권한 통제, 보관 기간 관리

#### 🔧 시스템 설정

- **사이트 설정**: 요양원 기본정보, 디자인 설정, 메뉴 관리
- **권한 관리**: RBAC 기반 역할별 권한 설정
- **팝업 관리**: 공지 팝업 등록 및 노출 제어
- **알림 설정**: 푸시 알림, 이메일 알림 설정

---

### 📱 모바일 출퇴근 앱

- GPS 기반 위치 인증 출퇴근 체크
- 실시간 근무 현황 조회
- 근무표 확인
- 공지사항 알림

---

## 🛠️ 기술 스택

### 🖥️ Frontend

| 카테고리          | 기술              | 버전 | 용도                          |
| ----------------- | ----------------- | ---- | ----------------------------- |
| **Framework**     | Next.js           | 15   | React 프레임워크 (App Router) |
| **Language**      | TypeScript        | 5.6  | 타입 안전성                   |
| **UI Framework**  | React             | 18.3 | 컴포넌트 기반 UI              |
| **Styling**       | Tailwind CSS      | 3.4  | 유틸리티 기반 스타일링        |
| **State**         | Zustand           | -    | 전역 상태 관리                |
| **Data Fetching** | TanStack Query    | -    | 서버 상태 관리                |
| **Forms**         | React Hook Form   | -    | 폼 검증 및 관리               |
| **Icons**         | Heroicons, Lucide | -    | 아이콘 시스템                 |
| **Charts**        | Recharts          | -    | 데이터 시각화                 |

### ⚙️ Backend

| 카테고리       | 기술                 | 버전 | 용도                      |
| -------------- | -------------------- | ---- | ------------------------- |
| **Framework**  | NestJS               | 11   | Node.js 백엔드 프레임워크 |
| **Language**   | TypeScript           | 5.6  | 타입 안전성               |
| **ORM**        | Prisma               | -    | 데이터베이스 ORM          |
| **Database**   | PostgreSQL           | 15+  | 관계형 데이터베이스       |
| **Cache**      | Redis                | 7+   | 캐싱 및 세션 관리         |
| **Queue**      | BullMQ               | -    | 백그라운드 작업 큐        |
| **Auth**       | Auth.js              | -    | 인증 시스템               |
| **Validation** | Zod, class-validator | -    | 데이터 검증               |
| **Email**      | Nodemailer           | -    | 이메일 발송               |

### 🚀 DevOps & Infra

| 카테고리       | 기술                                   | 용도                   |
| -------------- | -------------------------------------- | ---------------------- |
| **Container**  | Docker, Docker Compose                 | 개발 환경 표준화       |
| **CI/CD**      | GitHub Actions                         | 자동화 배포 파이프라인 |
| **Deployment** | Vercel (Frontend), Cloud Run (Backend) | 서비스 배포            |
| **Monitoring** | Sentry, Vercel Analytics               | 에러 추적 및 분석      |
| **Logging**    | Winston, Pino                          | 로그 관리              |

### 🧪 Testing & Quality

| 카테고리      | 기술               | 용도              |
| ------------- | ------------------ | ----------------- |
| **Unit Test** | Vitest             | 단위 테스트       |
| **E2E Test**  | Playwright         | End-to-End 테스트 |
| **Lint**      | ESLint             | 코드 품질 검사    |
| **Format**    | Prettier           | 코드 포맷팅       |
| **Git Hooks** | Husky, lint-staged | 커밋 전 검증      |

### 🤖 AI & Automation

| 기술             | 용도                                  |
| ---------------- | ------------------------------------- |
| **n8n**          | 워크플로우 자동화 (알림, 보고서 생성) |
| **OpenAI API**   | AI 기반 기록 요약, 추천               |
| **Hugging Face** | 자연어 처리                           |

---

## 🏗️ 시스템 아키텍처

```
┌─────────────────────────────────────────────────────────────┐
│                      Frontend Layer                          │
├─────────────────────────────────────────────────────────────┤
│  Next.js Web App  │  Admin Dashboard  │  Mobile Attendance  │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      Backend Layer                           │
├─────────────────────────────────────────────────────────────┤
│    NestJS API Server  │  BullMQ Worker  │  n8n Automation   │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      Data Layer                              │
├─────────────────────────────────────────────────────────────┤
│           PostgreSQL Database     │     Redis Cache          │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                   External Services                          │
├─────────────────────────────────────────────────────────────┤
│  Email  │  SMS  │  AI Services  │  Cloud Storage  │  etc.   │
└─────────────────────────────────────────────────────────────┘
```

### 주요 설계 원칙

- **Monorepo 구조**: Nx 기반 통합 코드베이스 관리
- **타입 안전성**: TypeScript 엔드투엔드 타입 체크
- **API 우선**: REST API 기반 명확한 계층 분리
- **확장 가능성**: 모듈화된 도메인 구조
- **보안**: RBAC 권한 관리, JWT 인증

---

## 📦 설치 및 실행

### 사전 요구사항

| 도구        | 최소 버전 | 설치 방법                                                        |
| ----------- | --------- | ---------------------------------------------------------------- |
| **Node.js** | 20+       | [nodejs.org](https://nodejs.org)                                 |
| **pnpm**    | 10+       | `npm install -g pnpm`                                            |
| **Docker**  | 최신      | [Docker Desktop](https://www.docker.com/products/docker-desktop) |
| **Git**     | 최신      | [git-scm.com](https://git-scm.com)                               |

### 1️⃣ 저장소 클론

```bash
git clone https://github.com/your-org/agape-care.git
cd agape-care
```

### 2️⃣ 의존성 설치

```bash
pnpm install
```

### 3️⃣ 환경 변수 설정

```bash
cp .env.example .env
```

`.env` 파일에 다음 항목 설정:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/agapecare"

# Redis
REDIS_URL="redis://localhost:6379"

# Auth
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# Email
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-password"

# AI Services (Optional)
OPENAI_API_KEY="sk-..."
```

### 4️⃣ Docker 서비스 실행

```bash
docker compose -f infra/docker/docker-compose.yml up -d
```

이 명령어로 PostgreSQL, Redis 컨테이너가 실행됩니다.

### 5️⃣ 데이터베이스 설정

```bash
# Prisma 마이그레이션
pnpm prisma migrate dev

# 초기 데이터 시딩
pnpm prisma db seed
```

### 6️⃣ 개발 서버 실행

#### 전체 서비스 실행

```bash
pnpm dev
```

#### 개별 서비스 실행

```bash
# 사용자 웹사이트
pnpm dev:web

# 관리자 대시보드
pnpm dev:admin

# API 서버
pnpm dev:api

# 백그라운드 워커
pnpm dev:worker
```

### 7️⃣ 접속 확인

| 서비스       | URL                       | 기본 계정                   |
| ------------ | ------------------------- | --------------------------- |
| **홈페이지** | http://localhost:3000     | -                           |
| **관리자**   | http://localhost:3001     | admin@agape.care / admin123 |
| **API 문서** | http://localhost:3002/api | -                           |

---

## 📂 프로젝트 구조

```
agape-care/
├── apps/
│   ├── web/                    # 대외 홈페이지 (Next.js)
│   │   ├── src/
│   │   │   ├── app/            # App Router 페이지
│   │   │   │   ├── (public)/  # 공개 페이지
│   │   │   │   └── (auth)/    # 인증 페이지
│   │   │   └── components/     # UI 컴포넌트
│   │   └── public/             # 정적 파일
│   │
│   ├── admin/                  # 관리자 시스템 (Next.js)
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   ├── (protected)/  # 인증 필요 페이지
│   │   │   │   │   ├── dashboard/
│   │   │   │   │   ├── residents/
│   │   │   │   │   ├── staff/
│   │   │   │   │   ├── programs/
│   │   │   │   │   ├── accounting/
│   │   │   │   │   └── settings/
│   │   │   │   └── (auth)/       # 로그인
│   │   │   ├── components/        # 공통 컴포넌트
│   │   │   └── data/              # 목업 데이터
│   │   └── public/
│   │
│   ├── api/                    # 백엔드 API (NestJS)
│   │   └── src/
│   │       ├── modules/
│   │       │   ├── auth/       # 인증 모듈
│   │       │   ├── users/      # 사용자 관리
│   │       │   ├── residents/  # 입소자 관리
│   │       │   ├── programs/   # 프로그램 관리
│   │       │   ├── accounting/ # 회계 모듈
│   │       │   └── ...
│   │       └── app.module.ts
│   │
│   └── worker/                 # 백그라운드 작업 (BullMQ)
│       └── src/
│           ├── processors/     # 작업 처리
│           └── schedules/      # 스케줄 작업
│
├── infra/
│   ├── docker/                 # Docker 설정
│   │   └── docker-compose.yml
│   ├── database/               # DB 초기화 스크립트
│   │   ├── init/
│   │   │   ├── 00-extensions.sql
│   │   │   ├── 20-ddl.sql
│   │   │   └── 30-seed.sql
│   │   └── conf/               # PostgreSQL 설정
│   └── n8n/                    # n8n 워크플로우
│
├── docs/                       # 프로젝트 문서
│   ├── guideline/              # 개발 가이드
│   └── study/                  # 기술 학습 자료
│
├── src/                        # 레거시 Vite 앱 (점진적 마이그레이션)
│   ├── pages/
│   │   ├── home/
│   │   ├── admin/
│   │   ├── services/
│   │   └── ...
│   └── components/
│
├── .husky/                     # Git hooks
├── nx.json                     # Nx 설정
├── package.json
└── README.md
```

---

## 🗄️ 데이터베이스 설계

### ERD 개요

시스템은 다음과 같은 주요 도메인으로 구성됩니다:

1. **사용자 관리** (Users, Staff, Auth)
2. **입소자 관리** (Residents, Health Records, Care Records)
3. **프로그램 운영** (Programs, Sessions, Participants)
4. **회계 재무** (Accounting, Payroll, Insurance)
5. **시설 관리** (Rooms, Equipment, Vehicles)
6. **게시판 커뮤니티** (Boards, Notices, Gallery)

### 주요 테이블 예시

#### 입소자 관리

```sql
-- 입소자 기본정보
CREATE TABLE residents (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  birth_date DATE,
  gender VARCHAR(10),
  admission_date DATE,
  room_id BIGINT,
  status VARCHAR(20) DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 건강기록
CREATE TABLE health_records (
  id BIGSERIAL PRIMARY KEY,
  resident_id BIGINT REFERENCES residents(id),
  record_date DATE NOT NULL,
  vital_signs JSONB,
  medications JSONB,
  notes TEXT,
  created_by BIGINT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### 직원 관리

```sql
-- 직원 정보
CREATE TABLE staff (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT REFERENCES users(id),
  name VARCHAR(100) NOT NULL,
  position VARCHAR(50),
  department VARCHAR(50),
  hire_date DATE,
  status VARCHAR(20) DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 근태 기록
CREATE TABLE attendance (
  id BIGSERIAL PRIMARY KEY,
  staff_id BIGINT REFERENCES staff(id),
  date DATE NOT NULL,
  check_in TIMESTAMPTZ,
  check_out TIMESTAMPTZ,
  status VARCHAR(20),
  location_data JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

전체 ERD 및 상세 스키마는 `docs/database-schema-*.md` 파일을 참고하세요.

---

## 🖼️ 주요 화면

### 1. 홈페이지 (Public Web)

#### 메인 페이지

- Hero 섹션
- 시설 소개
- 주요 서비스 안내
- 입소 상담 CTA
- 최근 공지사항
- 찾아오시는 길

#### 시설 안내

- 층별 안내
- 객실 타입
- 공용 공간
- 안전 시설
- 이미지 갤러리

#### 프로그램 & 식단

- 주간 프로그램 일정
- 프로그램 상세 소개
- 이번 주 식단표
- 프로그램 앨범

#### 커뮤니티

- 공지사항
- 자유게시판
- 갤러리
- 입소 상담 신청

---

### 2. 관리자 시스템 (Admin)

#### 대시보드

- 실시간 운영 지표
- 입소자/직원 현황
- 당일 일정 요약
- 최근 알림
- 빠른 액세스 메뉴

#### 입소자 관리

- 입소자 목록/검색
- 상세 프로필
- 건강 기록 입력
- 돌봄 일지
- 가족 소통

#### 직원 관리

- 직원 목록/등록
- 근태 현황
- 근무표 관리
- 급여 관리
- 평가 기록

#### 프로그램 운영

- 프로그램 등록
- 일정 스케줄링
- 참여자 관리
- 앨범 관리

#### 회계/재무

- 수입/지출 입력
- 월간 결산
- 보험 청구
- 예산 관리
- 재무제표

#### 시스템 설정

- 사이트 기본정보
- 권한 관리
- 메뉴 설정
- 디자인 커스터마이징

---

## 🚀 배포

### 프로덕션 빌드

```bash
# 전체 빌드
pnpm build

# 개별 빌드
pnpm build:web
pnpm build:admin
pnpm build:api
```

### 배포 전략

| 서비스        | 플랫폼                 | 방식                  |
| ------------- | ---------------------- | --------------------- |
| **Web/Admin** | Vercel                 | GitHub 연동 자동 배포 |
| **API**       | Google Cloud Run       | Docker 컨테이너 배포  |
| **Database**  | Cloud SQL (PostgreSQL) | 관리형 서비스         |
| **Redis**     | Cloud Memorystore      | 관리형 서비스         |

### 환경 분리

- **Development**: 로컬 Docker 환경
- **Staging**: Vercel Preview + Cloud Run Dev
- **Production**: Vercel Production + Cloud Run Production

---

## 🤝 기여하기

프로젝트에 기여하고 싶으신가요? 환영합니다!

### 개발 워크플로우

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### 커밋 컨벤션

[Conventional Commits](https://www.conventionalcommits.org/) 규칙을 따릅니다:

```
feat: 새로운 기능 추가
fix: 버그 수정
docs: 문서 수정
style: 코드 포맷팅
refactor: 코드 리팩토링
test: 테스트 추가/수정
chore: 빌드/설정 변경
```

---

## 📄 라이선스

이 프로젝트는 [MIT License](LICENSE)를 따릅니다.

---

## 📞 문의

**프로젝트 관련 문의**

- 이메일: contact@agape-care.com
- 이슈: [GitHub Issues](https://github.com/your-org/agape-care/issues)

**비즈니스 문의**

- 웹사이트: https://agape-care.com
- 전화: 043-XXX-XXXX
- 주소: 충청북도 청주시 OO구 OO로 123

---

<div align="center">

**Made with ❤️ for Better Care**

[홈페이지](https://agape-care.com) • [문서](https://docs.agape-care.com) •
[데모](https://demo.agape-care.com)

</div>

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
│  │  │  │  │  │  │  ├─ ClaimActionBar.tsx
│  │  │  │  │  │  │  ├─ ClaimFilter.tsx
│  │  │  │  │  │  │  ├─ ClaimModal.tsx
│  │  │  │  │  │  │  ├─ ClaimStats.tsx
│  │  │  │  │  │  │  ├─ ClaimTableView.tsx
│  │  │  │  │  │  │  ├─ constants.ts
│  │  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  │  ├─ main
│  │  │  │  │  │  │  ├─ AccountingHeader.tsx
│  │  │  │  │  │  │  ├─ AccountingStats.tsx
│  │  │  │  │  │  │  ├─ AccountingTabs.tsx
│  │  │  │  │  │  │  ├─ AccountModal.tsx
│  │  │  │  │  │  │  ├─ page.tsx
│  │  │  │  │  │  │  ├─ tabs
│  │  │  │  │  │  │  │  ├─ AccountTab.tsx
│  │  │  │  │  │  │  │  ├─ ClosingTab.tsx
│  │  │  │  │  │  │  │  ├─ DashboardTab.tsx
│  │  │  │  │  │  │  │  ├─ JournalTab.tsx
│  │  │  │  │  │  │  │  ├─ StatisticsTab.tsx
│  │  │  │  │  │  │  │  └─ TransactionTab.tsx
│  │  │  │  │  │  │  └─ TransactionModal.tsx
│  │  │  │  │  │  └─ payroll
│  │  │  │  │  │     ├─ page.tsx
│  │  │  │  │  │     ├─ PayrollHeader.tsx
│  │  │  │  │  │     ├─ PayrollStats.tsx
│  │  │  │  │  │     ├─ PayrollTabs.tsx
│  │  │  │  │  │     ├─ PayslipModal.tsx
│  │  │  │  │  │     └─ tabs
│  │  │  │  │  │        ├─ CalculationTab.tsx
│  │  │  │  │  │        ├─ HistoryTab.tsx
│  │  │  │  │  │        └─ SettingsTab.tsx
│  │  │  │  │  ├─ additional-services
│  │  │  │  │  │  ├─ notice
│  │  │  │  │  │  │  └─ NoticeManagement.tsx
│  │  │  │  │  │  ├─ notification
│  │  │  │  │  │  │  ├─ dashboard
│  │  │  │  │  │  │  │  ├─ CampaignGrid.tsx
│  │  │  │  │  │  │  │  ├─ NotificationHeader.tsx
│  │  │  │  │  │  │  │  ├─ page.tsx
│  │  │  │  │  │  │  │  └─ StatsBoard.tsx
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
│  │  │  │  │  │  │  ├─ DailyCareHeader.tsx
│  │  │  │  │  │  │  ├─ DailyCareInfoCards.tsx
│  │  │  │  │  │  │  ├─ DailyCareResidentPanel.tsx
│  │  │  │  │  │  │  ├─ DailyCareTabs.tsx
│  │  │  │  │  │  │  ├─ NursingRecordTable.tsx
│  │  │  │  │  │  │  ├─ page.tsx
│  │  │  │  │  │  │  ├─ tabs
│  │  │  │  │  │  │  │  ├─ BowelManagementTab.tsx
│  │  │  │  │  │  │  │  ├─ CatheterManagementTab.tsx
│  │  │  │  │  │  │  │  ├─ DailyMedicationTab.tsx
│  │  │  │  │  │  │  │  ├─ NursingCareTab.tsx
│  │  │  │  │  │  │  │  ├─ NursingRecordTab.tsx
│  │  │  │  │  │  │  │  ├─ TechnicalNursingTab.tsx
│  │  │  │  │  │  │  │  ├─ TubeManagementTab.tsx
│  │  │  │  │  │  │  │  ├─ VitalSignsTab.tsx
│  │  │  │  │  │  │  │  └─ WoundCareTab.tsx
│  │  │  │  │  │  │  └─ VitalSignsTab.tsx
│  │  │  │  │  │  ├─ DailyCareRecord.tsx
│  │  │  │  │  │  ├─ MealAssistRecord.tsx
│  │  │  │  │  │  ├─ medication
│  │  │  │  │  │  │  ├─ MedicationFormModal.tsx
│  │  │  │  │  │  │  ├─ MedicationHeader.tsx
│  │  │  │  │  │  │  ├─ MedicationListTable.tsx
│  │  │  │  │  │  │  ├─ MedicationRecordTable.tsx
│  │  │  │  │  │  │  ├─ MedicationScheduleTable.tsx
│  │  │  │  │  │  │  ├─ MedicationStatsCards.tsx
│  │  │  │  │  │  │  ├─ page.tsx
│  │  │  │  │  │  │  └─ ScheduleFormModal.tsx
│  │  │  │  │  │  ├─ MedicationManagementAdvanced.tsx
│  │  │  │  │  │  ├─ needs-assessment
│  │  │  │  │  │  │  ├─ DiseaseStatusSection.tsx
│  │  │  │  │  │  │  ├─ GeneralStatusSection.tsx
│  │  │  │  │  │  │  ├─ OtherAssessmentSection.tsx
│  │  │  │  │  │  │  ├─ page.tsx
│  │  │  │  │  │  │  └─ PhysicalStatusSection.tsx
│  │  │  │  │  │  ├─ NeedsAssessment.tsx
│  │  │  │  │  │  ├─ NeedsAssessmentAdvanced.tsx
│  │  │  │  │  │  ├─ records
│  │  │  │  │  │  │  ├─ HistoryActionBar.tsx
│  │  │  │  │  │  │  ├─ HistoryCardView.tsx
│  │  │  │  │  │  │  ├─ HistoryDetailModal.tsx
│  │  │  │  │  │  │  ├─ HistoryFilter.tsx
│  │  │  │  │  │  │  ├─ HistoryStats.tsx
│  │  │  │  │  │  │  ├─ HistoryTableView.tsx
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
│  │  │  │  │  │  ├─ board
│  │  │  │  │  │  │  ├─ board.type.ts
│  │  │  │  │  │  │  ├─ BoardAdmin.tsx
│  │  │  │  │  │  │  ├─ BoardDetailModal.tsx
│  │  │  │  │  │  │  ├─ BoardFilter.tsx
│  │  │  │  │  │  │  ├─ BoardFormModal.tsx
│  │  │  │  │  │  │  ├─ BoardHeader.tsx
│  │  │  │  │  │  │  ├─ BoardItem.tsx
│  │  │  │  │  │  │  ├─ BoardManagement.tsx
│  │  │  │  │  │  │  ├─ BoardTable.tsx
│  │  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  │  ├─ gallery
│  │  │  │  │  │  │  ├─ gallery.type.ts
│  │  │  │  │  │  │  ├─ GalleryAdmin.tsx
│  │  │  │  │  │  │  ├─ GalleryDetailModal.tsx
│  │  │  │  │  │  │  ├─ GalleryFilter.tsx
│  │  │  │  │  │  │  ├─ GalleryFormModal.tsx
│  │  │  │  │  │  │  ├─ GalleryHeader.tsx
│  │  │  │  │  │  │  ├─ GalleryItem.tsx
│  │  │  │  │  │  │  ├─ GalleryManagement.tsx
│  │  │  │  │  │  │  ├─ GalleryTable.tsx
│  │  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  │  ├─ inquiry
│  │  │  │  │  │  │  ├─ inquiry.type.ts
│  │  │  │  │  │  │  ├─ InquiryDetailModal.tsx
│  │  │  │  │  │  │  ├─ InquiryTable.tsx
│  │  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  │  ├─ meal-plan
│  │  │  │  │  │  │  ├─ MealPlanHeader.tsx
│  │  │  │  │  │  │  ├─ MealPlanStatBanner.tsx
│  │  │  │  │  │  │  ├─ MealPlanTabs.tsx
│  │  │  │  │  │  │  ├─ monthly
│  │  │  │  │  │  │  │  ├─ ExcelUploadModal.tsx
│  │  │  │  │  │  │  │  ├─ MonthlyEditModal.tsx
│  │  │  │  │  │  │  │  ├─ MonthlyMealList.tsx
│  │  │  │  │  │  │  │  └─ MonthlyMealPlan.tsx
│  │  │  │  │  │  │  ├─ page.tsx
│  │  │  │  │  │  │  └─ weekly
│  │  │  │  │  │  │     ├─ WeeklyExcelActions.tsx
│  │  │  │  │  │  │     ├─ WeeklyMealPlan.tsx
│  │  │  │  │  │  │     └─ WeeklyMealTable.tsx
│  │  │  │  │  │  ├─ notice
│  │  │  │  │  │  │  ├─ notice.type.ts
│  │  │  │  │  │  │  ├─ NoticeDetailModal.tsx
│  │  │  │  │  │  │  ├─ NoticeFilter.tsx
│  │  │  │  │  │  │  ├─ NoticeFormModal.tsx
│  │  │  │  │  │  │  ├─ NoticeHeader.tsx
│  │  │  │  │  │  │  ├─ NoticeTable.tsx
│  │  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  │  ├─ page.tsx
│  │  │  │  │  │  ├─ popup
│  │  │  │  │  │  │  ├─ page.tsx
│  │  │  │  │  │  │  ├─ popup.type.ts
│  │  │  │  │  │  │  ├─ PopupDetailModal.tsx
│  │  │  │  │  │  │  ├─ PopupFilter.tsx
│  │  │  │  │  │  │  ├─ PopupFormModal.tsx
│  │  │  │  │  │  │  ├─ PopupHeader.tsx
│  │  │  │  │  │  │  └─ PopupTable.tsx
│  │  │  │  │  │  └─ program
│  │  │  │  │  │     ├─ page.tsx
│  │  │  │  │  │     ├─ program.type.ts
│  │  │  │  │  │     ├─ ProgramCalendar.tsx
│  │  │  │  │  │     ├─ ProgramDetailModal.tsx
│  │  │  │  │  │     ├─ ProgramFilter.tsx
│  │  │  │  │  │     ├─ ProgramFormModal.tsx
│  │  │  │  │  │     ├─ ProgramHeader.tsx
│  │  │  │  │  │     └─ ProgramList.tsx
│  │  │  │  │  ├─ dashboard
│  │  │  │  │  │  ├─ CareMonitor
│  │  │  │  │  │  │  ├─ HealthAlerts.tsx
│  │  │  │  │  │  │  └─ MedicationStatus.tsx
│  │  │  │  │  │  ├─ DashboardHeader.tsx
│  │  │  │  │  │  ├─ Operations
│  │  │  │  │  │  │  ├─ ActivityLog.tsx
│  │  │  │  │  │  │  └─ TodaySchedule.tsx
│  │  │  │  │  │  ├─ page.tsx
│  │  │  │  │  │  ├─ QuickLinkGrid.tsx
│  │  │  │  │  │  └─ StatsCards.tsx
│  │  │  │  │  ├─ mobile
│  │  │  │  │  ├─ mypage
│  │  │  │  │  │  ├─ MyPageHeader.tsx
│  │  │  │  │  │  ├─ MyPageTabs.tsx
│  │  │  │  │  │  ├─ page.tsx
│  │  │  │  │  │  └─ tabs
│  │  │  │  │  │     ├─ MusculoskeletalTab.tsx
│  │  │  │  │  │     ├─ NotificationsTab.tsx
│  │  │  │  │  │     ├─ ScheduleTab.tsx
│  │  │  │  │  │     └─ SettingsTab.tsx
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
│  │  │  │  │  │  │  ├─ BurdenRateHeader.tsx
│  │  │  │  │  │  │  ├─ BurdenRateHistoryTable.tsx
│  │  │  │  │  │  │  ├─ BurdenRateModals.tsx
│  │  │  │  │  │  │  ├─ BurdenRateResidentCard.tsx
│  │  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  │  ├─ consultation
│  │  │  │  │  │  │  ├─ ConsultationForm.tsx
│  │  │  │  │  │  │  ├─ ConsultationHeader.tsx
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
│  │  │  │  │  │     ├─ ResidentHeader.tsx
│  │  │  │  │  │     ├─ ResidentList.tsx
│  │  │  │  │  │     ├─ ResidentManagement.tsx
│  │  │  │  │  │     ├─ ResidentProfile.tsx
│  │  │  │  │  │     ├─ ResidentTabs.tsx
│  │  │  │  │  │     └─ tabs
│  │  │  │  │  │        ├─ AdmissionHistoryTab.tsx
│  │  │  │  │  │        ├─ AssessmentTab.tsx
│  │  │  │  │  │        ├─ BasicInfoTab.tsx
│  │  │  │  │  │        ├─ CareSummaryTab.tsx
│  │  │  │  │  │        ├─ ConsultationTab.tsx
│  │  │  │  │  │        ├─ CopaymentTab.tsx
│  │  │  │  │  │        ├─ DocumentsTab.tsx
│  │  │  │  │  │        ├─ ExtraCostTab.tsx
│  │  │  │  │  │        ├─ GuardiansTab.tsx
│  │  │  │  │  │        ├─ MedicationTab.tsx
│  │  │  │  │  │        ├─ modals
│  │  │  │  │  │        │  ├─ BedsoreRiskModal.tsx
│  │  │  │  │  │        │  ├─ CognitiveEvalModal.tsx
│  │  │  │  │  │        │  ├─ ConsultationModal.tsx
│  │  │  │  │  │        │  ├─ DepositProcessingModal.tsx
│  │  │  │  │  │        │  ├─ DocumentUploadModal.tsx
│  │  │  │  │  │        │  ├─ ExtraCostModal.tsx
│  │  │  │  │  │        │  └─ FallRiskModal.tsx
│  │  │  │  │  │        └─ StandardContractTab.tsx
│  │  │  │  │  ├─ settings
│  │  │  │  │  │  ├─ facility
│  │  │  │  │  │  │  ├─ constants.ts
│  │  │  │  │  │  │  ├─ FacilityAddressSection.tsx
│  │  │  │  │  │  │  ├─ FacilityHeader.tsx
│  │  │  │  │  │  │  ├─ FacilityPreview.tsx
│  │  │  │  │  │  │  ├─ page.tsx
│  │  │  │  │  │  │  └─ sections
│  │  │  │  │  │  │     ├─ AddressSection.tsx
│  │  │  │  │  │  │     ├─ BasicInfoSection.tsx
│  │  │  │  │  │  │     ├─ CapacitySection.tsx
│  │  │  │  │  │  │     ├─ ContactSection.tsx
│  │  │  │  │  │  │     └─ StampSection.tsx
│  │  │  │  │  │  └─ system
│  │  │  │  │  │     ├─ rbac
│  │  │  │  │  │     │  ├─ EmployeeSidebar.tsx
│  │  │  │  │  │     │  ├─ page.tsx
│  │  │  │  │  │     │  ├─ PermissionGrid.tsx
│  │  │  │  │  │     │  └─ RBACHeader.tsx
│  │  │  │  │  │     └─ site
│  │  │  │  │  │        ├─ constants.ts
│  │  │  │  │  │        ├─ page.tsx
│  │  │  │  │  │        ├─ sections
│  │  │  │  │  │        │  ├─ FooterSection.tsx
│  │  │  │  │  │        │  ├─ SeoSection.tsx
│  │  │  │  │  │        │  └─ ServiceSection.tsx
│  │  │  │  │  │        ├─ SettingsHeader.tsx
│  │  │  │  │  │        └─ SettingsPreview.tsx
│  │  │  │  │  └─ staff
│  │  │  │  │     ├─ attendance
│  │  │  │  │     │  ├─ AttendanceFilter.tsx
│  │  │  │  │     │  ├─ AttendanceHeader.tsx
│  │  │  │  │     │  ├─ AttendanceStats.tsx
│  │  │  │  │     │  ├─ AttendanceTabs.tsx
│  │  │  │  │     │  ├─ DailyAttendanceTable.tsx
│  │  │  │  │     │  ├─ MonthlyAttendanceTable.tsx
│  │  │  │  │     │  └─ page.tsx
│  │  │  │  │     ├─ education
│  │  │  │  │     │  ├─ EducationFilter.tsx
│  │  │  │  │     │  ├─ EducationFormModal.tsx
│  │  │  │  │     │  ├─ EducationGuide.tsx
│  │  │  │  │     │  ├─ EducationHeader.tsx
│  │  │  │  │     │  ├─ EducationItem.tsx
│  │  │  │  │     │  ├─ EducationList.tsx
│  │  │  │  │     │  ├─ EducationStats.tsx
│  │  │  │  │     │  └─ page.tsx
│  │  │  │  │     ├─ list
│  │  │  │  │     │  ├─ page.tsx
│  │  │  │  │     │  ├─ StaffBasicInfo.tsx
│  │  │  │  │     │  ├─ StaffHeader.tsx
│  │  │  │  │     │  ├─ StaffListPanel.tsx
│  │  │  │  │     │  ├─ StaffTabs.tsx
│  │  │  │  │     │  └─ tabs
│  │  │  │  │     │     ├─ AttendanceTab.tsx
│  │  │  │  │     │     ├─ BasicInfoTab.tsx
│  │  │  │  │     │     ├─ CertificateTab.tsx
│  │  │  │  │     │     ├─ ManagementTab.tsx
│  │  │  │  │     │     ├─ SalaryTab.tsx
│  │  │  │  │     │     └─ WorkScheduleTab.tsx
│  │  │  │  │     ├─ meeting
│  │  │  │  │     │  ├─ meeting.type.ts
│  │  │  │  │     │  ├─ MeetingDetailView.tsx
│  │  │  │  │     │  ├─ MeetingFilter.tsx
│  │  │  │  │     │  ├─ MeetingFormModal.tsx
│  │  │  │  │     │  ├─ MeetingHeader.tsx
│  │  │  │  │     │  ├─ MeetingItem.tsx
│  │  │  │  │     │  ├─ MeetingList.tsx
│  │  │  │  │     │  ├─ MeetingStats.tsx
│  │  │  │  │     │  └─ page.tsx
│  │  │  │  │     └─ schedule
│  │  │  │  │        ├─ auto-schedule
│  │  │  │  │        │  ├─ AutoSchedulePanel.tsx
│  │  │  │  │        │  ├─ AutoScheduleSettings.tsx
│  │  │  │  │        │  ├─ ScheduleGenerator.ts
│  │  │  │  │        │  ├─ SchedulePreview.tsx
│  │  │  │  │        │  ├─ ScheduleRuleEngine.ts
│  │  │  │  │        │  └─ ScheduleValidator.ts
│  │  │  │  │        ├─ calendar
│  │  │  │  │        │  ├─ ScheduleCalendarGrid.tsx
│  │  │  │  │        │  ├─ ScheduleLegend.tsx
│  │  │  │  │        │  └─ WorkScheduleCalendar.tsx
│  │  │  │  │        ├─ control
│  │  │  │  │        │  ├─ ControlTab.tsx
│  │  │  │  │        │  ├─ ScheduleDetailModal.tsx
│  │  │  │  │        │  ├─ ScheduleHeader.tsx
│  │  │  │  │        │  ├─ ScheduleMonthlyStats.tsx
│  │  │  │  │        │  ├─ StaffControlPanel.tsx
│  │  │  │  │        │  └─ WorkScheduleManagement.tsx
│  │  │  │  │        ├─ individual
│  │  │  │  │        │  ├─ IndividualCalendar.tsx
│  │  │  │  │        │  ├─ IndividualTab.tsx
│  │  │  │  │        │  └─ StaffSelectionList.tsx
│  │  │  │  │        ├─ page.tsx
│  │  │  │  │        ├─ schedule.type.ts
│  │  │  │  │        ├─ StaffSelectionList.tsx
│  │  │  │  │        └─ template
│  │  │  │  │           ├─ RepeatWorkTemplate.tsx
│  │  │  │  │           ├─ TemplateTab.tsx
│  │  │  │  │           └─ WeeklyWorkTemplate.tsx
│  │  │  │  ├─ (auth)
│  │  │  │  │  └─ login
│  │  │  │  │     └─ page.tsx
│  │  │  │  ├─ error.tsx
│  │  │  │  ├─ globals.css
│  │  │  │  ├─ loading.tsx
│  │  │  │  └─ not-found.tsx
│  │  │  ├─ components
│  │  │  │  ├─ AppShell.tsx
│  │  │  │  ├─ FullMenuModal.tsx
│  │  │  │  ├─ Header.tsx
│  │  │  │  └─ sidebar
│  │  │  │     ├─ hooks
│  │  │  │     │  ├─ useSidebarMenus.ts
│  │  │  │     │  └─ useSidebarUser.ts
│  │  │  │     ├─ MobileSidebar.tsx
│  │  │  │     ├─ Sidebar.tsx
│  │  │  │     └─ SidebarFooter.tsx
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
│  │  │  ├─ modules
│  │  │  │  ├─ accounting
│  │  │  │  │  ├─ account
│  │  │  │  │  │  └─ account.service.ts
│  │  │  │  │  ├─ accounting.controller.ts
│  │  │  │  │  ├─ accounting.module.ts
│  │  │  │  │  ├─ accounting.service.ts
│  │  │  │  │  ├─ insurance-claim
│  │  │  │  │  │  └─ insurance-claim.service.ts
│  │  │  │  │  ├─ invoice
│  │  │  │  │  │  └─ invoice.service.ts
│  │  │  │  │  ├─ payroll
│  │  │  │  │  │  └─ payroll.service.ts
│  │  │  │  │  ├─ supplier
│  │  │  │  │  │  └─ supplier.service.ts
│  │  │  │  │  └─ transaction
│  │  │  │  │     └─ transaction.service.ts
│  │  │  │  ├─ attendance
│  │  │  │  │  ├─ attendance.controller.ts
│  │  │  │  │  ├─ attendance.module.ts
│  │  │  │  │  ├─ attendance.service.ts
│  │  │  │  │  ├─ leave
│  │  │  │  │  │  └─ leave.service.ts
│  │  │  │  │  └─ shift
│  │  │  │  │     └─ shift.service.ts
│  │  │  │  ├─ auth
│  │  │  │  │  ├─ auth.controller.ts
│  │  │  │  │  ├─ auth.module.ts
│  │  │  │  │  ├─ auth.service.ts
│  │  │  │  │  ├─ decorators
│  │  │  │  │  │  ├─ current-user.decorator.ts
│  │  │  │  │  │  ├─ public.decorator.ts
│  │  │  │  │  │  └─ roles.decorator.ts
│  │  │  │  │  ├─ guards
│  │  │  │  │  │  ├─ jwt-auth.guard.ts
│  │  │  │  │  │  ├─ jwt-refresh.guard.ts
│  │  │  │  │  │  └─ roles.guard.ts
│  │  │  │  │  └─ strategies
│  │  │  │  │     ├─ jwt-refresh.strategy.ts
│  │  │  │  │     └─ jwt.strategy.ts
│  │  │  │  ├─ care
│  │  │  │  │  ├─ care.controller.ts
│  │  │  │  │  ├─ care.module.ts
│  │  │  │  │  ├─ care.service.ts
│  │  │  │  │  ├─ consultation
│  │  │  │  │  │  └─ consultation.service.ts
│  │  │  │  │  ├─ incident
│  │  │  │  │  │  └─ incident.service.ts
│  │  │  │  │  ├─ plan
│  │  │  │  │  │  └─ care-plan.service.ts
│  │  │  │  │  └─ task
│  │  │  │  │     └─ care-task.service.ts
│  │  │  │  ├─ common
│  │  │  │  │  ├─ decorators
│  │  │  │  │  │  └─ api-paginated-response.decorator.ts
│  │  │  │  │  ├─ filters
│  │  │  │  │  │  ├─ http-exception.filter.ts
│  │  │  │  │  │  └─ prisma-exception.filter.ts
│  │  │  │  │  ├─ interceptors
│  │  │  │  │  │  ├─ logging.interceptor.ts
│  │  │  │  │  │  └─ transform.interceptor.ts
│  │  │  │  │  ├─ middleware
│  │  │  │  │  │  └─ logger.middleware.ts
│  │  │  │  │  └─ pipes
│  │  │  │  │     ├─ validation.pipe.ts
│  │  │  │  │     └─ zod-validation.pipe.ts
│  │  │  │  ├─ contents
│  │  │  │  │  ├─ announcement
│  │  │  │  │  ├─ board
│  │  │  │  │  ├─ contents.controller.ts
│  │  │  │  │  ├─ contents.module.ts
│  │  │  │  │  ├─ contents.service.ts
│  │  │  │  │  ├─ gallery
│  │  │  │  │  ├─ meal
│  │  │  │  │  │  └─ plan
│  │  │  │  │  │     └─ meal-plan.service.ts
│  │  │  │  │  └─ popup
│  │  │  │  │     └─ popup.service.ts
│  │  │  │  ├─ dashboard
│  │  │  │  │  ├─ dashboard.controller.ts
│  │  │  │  │  ├─ dashboard.module.ts
│  │  │  │  │  └─ dashboard.service.ts
│  │  │  │  ├─ employee
│  │  │  │  │  ├─ employee.controller.ts
│  │  │  │  │  ├─ employee.module.ts
│  │  │  │  │  └─ employee.service.ts
│  │  │  │  ├─ health
│  │  │  │  │  ├─ health.controller.ts
│  │  │  │  │  └─ health.module.ts
│  │  │  │  ├─ index.ts
│  │  │  │  ├─ mypage
│  │  │  │  │  ├─ mypage.controller.ts
│  │  │  │  │  ├─ mypage.module.ts
│  │  │  │  │  └─ mypage.service.ts
│  │  │  │  ├─ notification
│  │  │  │  │  ├─ notification.controller.ts
│  │  │  │  │  ├─ notification.module.ts
│  │  │  │  │  └─ notification.service.ts
│  │  │  │  ├─ operations
│  │  │  │  │  ├─ cctv
│  │  │  │  │  │  └─ cctv.service.ts
│  │  │  │  │  ├─ grievance
│  │  │  │  │  │  └─ grievance.service.ts
│  │  │  │  │  ├─ inspection
│  │  │  │  │  │  └─ inspection.service.ts
│  │  │  │  │  ├─ inventory
│  │  │  │  │  │  └─ inventory.service.ts
│  │  │  │  │  ├─ operations.controller.ts
│  │  │  │  │  ├─ operations.module.ts
│  │  │  │  │  ├─ operations.service.ts
│  │  │  │  │  ├─ sms
│  │  │  │  │  │  └─ sms.service.ts
│  │  │  │  │  ├─ transport
│  │  │  │  │  │  └─ transport.service.ts
│  │  │  │  │  └─ vehicle
│  │  │  │  │     └─ vehicle.service.ts
│  │  │  │  ├─ resident
│  │  │  │  │  ├─ contact
│  │  │  │  │  │  └─ contact.service.ts
│  │  │  │  │  ├─ health
│  │  │  │  │  │  └─ health.service.ts
│  │  │  │  │  ├─ medication
│  │  │  │  │  │  └─ medication.service.ts
│  │  │  │  │  ├─ resident.controller.ts
│  │  │  │  │  ├─ resident.module.ts
│  │  │  │  │  ├─ resident.service.ts
│  │  │  │  │  ├─ room
│  │  │  │  │  │  └─ room.service.ts
│  │  │  │  │  └─ vital
│  │  │  │  │     └─ vital.service.ts
│  │  │  │  ├─ role
│  │  │  │  │  ├─ role.controller.ts
│  │  │  │  │  ├─ role.module.ts
│  │  │  │  │  └─ role.service.ts
│  │  │  │  ├─ setting
│  │  │  │  │  ├─ setting.controller.ts
│  │  │  │  │  ├─ setting.module.ts
│  │  │  │  │  └─ setting.service.ts
│  │  │  │  └─ web-view
│  │  │  │     ├─ contact-inquiry
│  │  │  │     │  ├─ contact-inquiry.controller.ts
│  │  │  │     │  ├─ contact-inquiry.module.ts
│  │  │  │     │  └─ contact-inquiry.service.ts
│  │  │  │     ├─ notices
│  │  │  │     │  ├─ notices.controller.ts
│  │  │  │     │  ├─ notices.module.ts
│  │  │  │     │  ├─ notices.service.ts
│  │  │  │     │  └─ utils
│  │  │  │     │     └─ serialization.utils.ts
│  │  │  │     └─ visit-inquiry
│  │  │  │        ├─ visit-inquiry.controller.ts
│  │  │  │        ├─ visit-inquiry.module.ts
│  │  │  │        └─ visit-inquiry.service.ts
│  │  │  └─ package.json
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
│  │  │  ├─ fonts
│  │  │  │  └─ PretendardVariable.woff2
│  │  │  ├─ images
│  │  │  │  ├─ band.svg
│  │  │  │  ├─ history
│  │  │  │  ├─ logo.png
│  │  │  │  └─ sample.svg
│  │  │  └─ policies
│  │  │     └─ privacy.html
│  │  ├─ server.ts
│  │  ├─ src
│  │  │  ├─ app
│  │  │  │  ├─ (sub)
│  │  │  │  │  ├─ facility
│  │  │  │  │  │  ├─ CommonAreaSection.tsx
│  │  │  │  │  │  ├─ FacilityBannerSection.tsx
│  │  │  │  │  │  ├─ FloorGuideSection.tsx
│  │  │  │  │  │  ├─ page.tsx
│  │  │  │  │  │  ├─ RoomTypeSection.tsx
│  │  │  │  │  │  └─ SafetyFeatureSection.tsx
│  │  │  │  │  ├─ guide
│  │  │  │  │  │  ├─ admission
│  │  │  │  │  │  │  ├─ AdmissionTargetSection.tsx
│  │  │  │  │  │  │  ├─ FAQSection.tsx
│  │  │  │  │  │  │  ├─ LifeRuleSection.tsx
│  │  │  │  │  │  │  ├─ page.tsx
│  │  │  │  │  │  │  ├─ PreparationSection.tsx
│  │  │  │  │  │  │  ├─ ProcessSection.tsx
│  │  │  │  │  │  │  └─ RequiredDocumentSection.tsx
│  │  │  │  │  │  ├─ contact
│  │  │  │  │  │  │  ├─ ContactFAQSection.tsx
│  │  │  │  │  │  │  ├─ ContactFormModal.tsx
│  │  │  │  │  │  │  ├─ ContactSection.tsx
│  │  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  │  ├─ cost
│  │  │  │  │  │  │  ├─ CostByGradeSection.tsx
│  │  │  │  │  │  │  ├─ CostInfoSection.tsx
│  │  │  │  │  │  │  ├─ DiscountSection.tsx
│  │  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  │  ├─ long-term-care
│  │  │  │  │  │  │  ├─ LongTermCareSection.tsx
│  │  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  │  └─ visit
│  │  │  │  │  │     ├─ page.tsx
│  │  │  │  │  │     ├─ VisitContactSection.tsx
│  │  │  │  │  │     ├─ VisitFormModal.tsx
│  │  │  │  │  │     ├─ VisitGuidelinesSection.tsx
│  │  │  │  │  │     └─ VisitRulesSection.tsx
│  │  │  │  │  ├─ intro
│  │  │  │  │  │  ├─ facility-overview
│  │  │  │  │  │  │  ├─ AgapeSystemSection.tsx
│  │  │  │  │  │  │  ├─ FacilityStatusSection.tsx
│  │  │  │  │  │  │  ├─ GeneralStatusSection.tsx
│  │  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  │  ├─ greeting
│  │  │  │  │  │  │  ├─ CommunityPhotoSection.tsx
│  │  │  │  │  │  │  ├─ DirectorMessageSection.tsx
│  │  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  │  ├─ history
│  │  │  │  │  │  │  ├─ HistoryTimeline.tsx
│  │  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  │  ├─ location
│  │  │  │  │  │  │  ├─ LocationInfoBox.tsx
│  │  │  │  │  │  │  ├─ LocationMap.tsx
│  │  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  │  ├─ organization
│  │  │  │  │  │  │  ├─ EmployeeStatusSection.tsx
│  │  │  │  │  │  │  ├─ OrganizationChart.tsx
│  │  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  │  └─ vision
│  │  │  │  │  │     ├─ OperationalGoalSection.tsx
│  │  │  │  │  │     ├─ page.tsx
│  │  │  │  │  │     ├─ PhilosophySection.tsx
│  │  │  │  │  │     └─ VisionSection.tsx
│  │  │  │  │  ├─ notices
│  │  │  │  │  │  ├─ board
│  │  │  │  │  │  │  ├─ BoardList.tsx
│  │  │  │  │  │  │  ├─ BoardMobileList.tsx
│  │  │  │  │  │  │  ├─ BoardSearch.tsx
│  │  │  │  │  │  │  ├─ page.tsx
│  │  │  │  │  │  │  ├─ Pagination.tsx
│  │  │  │  │  │  │  └─ [id]
│  │  │  │  │  │  │     ├─ BoardComment.tsx
│  │  │  │  │  │  │     └─ page.tsx
│  │  │  │  │  │  ├─ gallery
│  │  │  │  │  │  │  ├─ GalleryFilter.tsx
│  │  │  │  │  │  │  ├─ GalleryHeader.tsx
│  │  │  │  │  │  │  ├─ GalleryModal.tsx
│  │  │  │  │  │  │  ├─ page.tsx
│  │  │  │  │  │  │  ├─ Pagination.tsx
│  │  │  │  │  │  │  ├─ SearchBar.tsx
│  │  │  │  │  │  │  └─ tabs
│  │  │  │  │  │  │     ├─ GalleryAllTab.tsx
│  │  │  │  │  │  │     ├─ GalleryGridTab.tsx
│  │  │  │  │  │  │     ├─ GalleryMonthTab.tsx
│  │  │  │  │  │  │     └─ GalleryWeekTab.tsx
│  │  │  │  │  │  ├─ meal-plan
│  │  │  │  │  │  │  ├─ ImageModal.tsx
│  │  │  │  │  │  │  ├─ MealDetailModal.tsx
│  │  │  │  │  │  │  ├─ MealPlanHeader.tsx
│  │  │  │  │  │  │  ├─ page.tsx
│  │  │  │  │  │  │  └─ tabs
│  │  │  │  │  │  │     ├─ MonthTab.tsx
│  │  │  │  │  │  │     └─ WeekTab.tsx
│  │  │  │  │  │  ├─ notice
│  │  │  │  │  │  │  ├─ NoticeList.tsx
│  │  │  │  │  │  │  ├─ NoticeSearch.tsx
│  │  │  │  │  │  │  ├─ page.tsx
│  │  │  │  │  │  │  ├─ Pagination.tsx
│  │  │  │  │  │  │  └─ [id]
│  │  │  │  │  │  │     └─ page.tsx
│  │  │  │  │  │  └─ program-schedule
│  │  │  │  │  │     ├─ page.tsx
│  │  │  │  │  │     ├─ ProgramFilter.tsx
│  │  │  │  │  │     ├─ ProgramHeader.tsx
│  │  │  │  │  │     ├─ ProgramModal.tsx
│  │  │  │  │  │     ├─ ProgramScheduleSection.tsx
│  │  │  │  │  │     └─ tabs
│  │  │  │  │  │        ├─ ProgramCalendarTab.tsx
│  │  │  │  │  │        └─ ProgramListTab.tsx
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
│  │  │  │     ├─ FeaturesSection.tsx
│  │  │  │     ├─ HeroSection.tsx
│  │  │  │     ├─ IntroSection.tsx
│  │  │  │     └─ NotificationSection.tsx
│  │  │  ├─ components
│  │  │  │  ├─ AppShell.tsx
│  │  │  │  ├─ Breadcrumb.tsx
│  │  │  │  ├─ FloatingSidebar.tsx
│  │  │  │  ├─ Footer.tsx
│  │  │  │  ├─ HeroSection.tsx
│  │  │  │  ├─ navbar
│  │  │  │  │  ├─ AllMenu.tsx
│  │  │  │  │  ├─ MobileNavbar.tsx
│  │  │  │  │  └─ Navbar.tsx
│  │  │  │  └─ NoticeSidebar.tsx
│  │  │  ├─ data
│  │  │  │  ├─ breadcrumb.json
│  │  │  │  ├─ employee.json
│  │  │  │  ├─ facility.json
│  │  │  │  ├─ footer.json
│  │  │  │  ├─ gallery.json
│  │  │  │  ├─ hero.json
│  │  │  │  ├─ history.json
│  │  │  │  ├─ meal.json
│  │  │  │  └─ menu.json
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
│  ├─ backup
│  │  ├─ 20-ddl.sql
│  │  ├─ 30-seed.sql
│  │  ├─ 99-final-setup.sql
│  │  └─ schema.prisma
│  ├─ database
│  │  ├─ conf
│  │  │  ├─ pg_hba.conf
│  │  │  └─ postgresql.conf
│  │  └─ init
│  │     ├─ 00-extensions.sql
│  │     ├─ 20-ddl.sql
│  │     ├─ 30-web-views.sql
│  │     ├─ 40-web-seed.sql
│  │     └─ 99-web-final-setup.sql
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
│  │  │  │  ├─ contents.contract.ts
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
│  │  │  │  ├─ web-inquiry.contract.ts
│  │  │  │  └─ web-notices.contract.ts
│  │  │  ├─ index.ts
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
│  │  │  │  │  ├─ daily-care.schema.ts
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
│  │  │  │  ├─ contents
│  │  │  │  │  ├─ announcement.schema.ts
│  │  │  │  │  ├─ board-comment.schema.ts
│  │  │  │  │  ├─ board-post.schema.ts
│  │  │  │  │  ├─ gallery.schema.ts
│  │  │  │  │  ├─ index.ts
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
│  │  │  │  └─ web-view
│  │  │  │     ├─ contact-inquiry
│  │  │  │     │  └─ index.ts
│  │  │  │     └─ visit-inquiry
│  │  │  │        └─ index.ts
│  │  │  └─ worker-types.ts
│  │  └─ tsconfig.json
│  ├─ database
│  │  ├─ package.json
│  │  ├─ prisma
│  │  │  └─ schema.prisma
│  │  ├─ prisma.config.ts
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
│     │  │  └─ PretendardVariable.woff2
│     │  ├─ icons
│     │  └─ images
│     │     └─ logo.png
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
├─ repro-issue.ts
├─ scripts
│  ├─ fix_esm_imports.py
│  ├─ fix_esm_imports_v2.py
│  ├─ setup-api-contract.ps1
│  └─ setup-api-modules.ps1
├─ test-db.cjs
├─ tsconfig.base.json
├─ tsconfig.json
├─ verify_fix.js
└─ vitest.config.ts

```