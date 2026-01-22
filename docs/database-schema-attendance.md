# 출퇴근 관리 데이터베이스 스키마

## 테이블 구조

### 1. attendance_records (출퇴근 기록)

```sql
CREATE TABLE attendance_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  user_name VARCHAR(100) NOT NULL,
  work_date DATE NOT NULL,
  check_in_time TIME,
  check_out_time TIME,
  check_in_note TEXT,
  check_out_note TEXT,
  status VARCHAR(20) DEFAULT 'none' CHECK (status IN ('none', 'checked-in', 'checked-out')),
  location_info JSONB,
  device_info JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID,
  updated_by UUID,
  UNIQUE(user_id, work_date)
);
```

**필드 설명:**
- `id`: 기본 키
- `user_id`: 사용자 ID (직원)
- `user_name`: 사용자 이름
- `work_date`: 근무 날짜
- `check_in_time`: 출근 시간
- `check_out_time`: 퇴근 시간
- `check_in_note`: 출근 비고 (외근, 대체근무 등)
- `check_out_note`: 퇴근 비고
- `status`: 상태 (none, checked-in, checked-out)
- `location_info`: 위치 정보 (선택, GPS)
- `device_info`: 디바이스 정보 (브라우저, OS 등)

### 2. attendance_edit_requests (출퇴근 수정 요청)

```sql
CREATE TABLE attendance_edit_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  attendance_id UUID REFERENCES attendance_records(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  user_name VARCHAR(100) NOT NULL,
  request_type VARCHAR(20) NOT NULL CHECK (request_type IN ('check-in', 'check-out', 'both')),
  original_check_in TIME,
  original_check_out TIME,
  requested_check_in TIME,
  requested_check_out TIME,
  reason TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  reviewed_by UUID,
  reviewed_at TIMESTAMP WITH TIME ZONE,
  review_note TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**필드 설명:**
- `attendance_id`: 원본 출퇴근 기록 ID
- `request_type`: 수정 요청 유형 (출근만, 퇴근만, 둘 다)
- `original_*`: 원본 시간
- `requested_*`: 요청 시간
- `reason`: 수정 사유
- `status`: 승인 상태 (pending, approved, rejected)
- `reviewed_by`: 승인자 ID
- `review_note`: 승인/반려 사유

### 3. work_diaries (근무일지)

```sql
CREATE TABLE work_diaries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  user_name VARCHAR(100) NOT NULL,
  work_date DATE NOT NULL,
  content TEXT NOT NULL,
  tasks JSONB,
  attachments JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, work_date)
);
```

**필드 설명:**
- `work_date`: 근무 날짜
- `content`: 근무일지 내용
- `tasks`: 수행 업무 목록 (JSON 배열)
- `attachments`: 첨부파일 정보 (JSON 배열)

## 인덱스

```sql
CREATE INDEX idx_attendance_user_date ON attendance_records(user_id, work_date DESC);
CREATE INDEX idx_attendance_status ON attendance_records(status);
CREATE INDEX idx_attendance_work_date ON attendance_records(work_date DESC);
CREATE INDEX idx_edit_requests_status ON attendance_edit_requests(status);
CREATE INDEX idx_edit_requests_user ON attendance_edit_requests(user_id);
CREATE INDEX idx_work_diaries_user_date ON work_diaries(user_id, work_date DESC);
```

## RLS (Row Level Security) 정책

### attendance_records
- 사용자는 자신의 출퇴근 기록만 조회/생성/수정 가능
- 관리자는 모든 기록 조회 가능

### attendance_edit_requests
- 사용자는 자신의 수정 요청만 조회/생성 가능
- 관리자는 모든 요청 조회 및 승인/반려 가능

### work_diaries
- 사용자는 자신의 근무일지만 조회/생성/수정 가능
- 관리자는 모든 근무일지 조회 가능

## API 엔드포인트

### 출퇴근 기록
- `GET /api/attendance/today` - 오늘 출퇴근 상태 조회
- `POST /api/attendance/check-in` - 출근 처리
- `POST /api/attendance/check-out` - 퇴근 처리
- `GET /api/attendance/history?from=YYYY-MM-DD&to=YYYY-MM-DD` - 기간별 조회
- `PATCH /api/attendance/:id/note` - 비고 수정

### 출퇴근 수정 요청
- `POST /api/attendance/edit-request` - 수정 요청 생성
- `GET /api/attendance/edit-requests` - 내 수정 요청 목록
- `PATCH /api/attendance/edit-request/:id/approve` - 승인 (관리자)
- `PATCH /api/attendance/edit-request/:id/reject` - 반려 (관리자)

### 근무일지
- `GET /api/work-diary?date=YYYY-MM-DD` - 특정 날짜 근무일지 조회
- `POST /api/work-diary` - 근무일지 작성
- `PATCH /api/work-diary/:id` - 근무일지 수정
- `DELETE /api/work-diary/:id` - 근무일지 삭제

## 감사 로그

모든 출퇴근 기록 생성/수정/삭제는 `audit_logs` 테이블에 기록됩니다:
- 누가 (user_id)
- 언제 (timestamp)
- 무엇을 (entity_type: 'attendance', 'attendance_edit_request', 'work_diary')
- 어떻게 (action: 'create', 'update', 'delete', 'approve', 'reject')
- 변경 전/후 값 (old_value, new_value)
- IP 주소 및 디바이스 정보
