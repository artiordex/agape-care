# 상담일지/면담일지 데이터베이스 스키마

## 개요
요양시설의 수급자 상담/면담 기록을 분기 단위로 관리하는 시스템입니다.
레거시 시스템의 업무 흐름을 유지하면서 현대적인 데이터 구조로 설계되었습니다.

---

## 테이블 구조

### 1. consultations (상담/면담 기록)

수급자별 상담/면담 기록을 저장하는 메인 테이블입니다.

```sql
CREATE TABLE consultations (
  -- 기본 정보
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  facility_id UUID NOT NULL REFERENCES facilities(id),
  recipient_id UUID NOT NULL REFERENCES recipients(id),
  
  -- 상담/면담 구분
  type VARCHAR(20) NOT NULL CHECK (type IN ('consultation', 'interview')),
  
  -- 일시 및 분기
  occurred_at TIMESTAMP NOT NULL,
  year INTEGER NOT NULL,
  quarter INTEGER NOT NULL CHECK (quarter BETWEEN 1 AND 4),
  
  -- 상담 대상
  target_type VARCHAR(20) NOT NULL CHECK (target_type IN ('recipient', 'guardian')),
  guardian_id UUID REFERENCES guardians(id),
  guardian_name VARCHAR(100),
  guardian_relation VARCHAR(50),
  guardian_phone VARCHAR(20),
  
  -- 상담 정보
  category_code VARCHAR(50) NOT NULL, -- 상담구분 (건강상태/서비스/불편사항/요청/기타)
  method_code VARCHAR(50) NOT NULL,   -- 상담방법 (대면/전화/문자/기타)
  staff_id UUID NOT NULL REFERENCES staff(id),
  staff_name VARCHAR(100) NOT NULL,
  
  -- 내용
  content TEXT NOT NULL,
  action_content TEXT,
  
  -- 상태
  status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'completed', 'approved')),
  
  -- 급여반영 여부
  is_benefit_reflected BOOLEAN DEFAULT false,
  benefit_reflected_at TIMESTAMP,
  
  -- 감사
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  created_by UUID NOT NULL REFERENCES users(id),
  updated_by UUID REFERENCES users(id),
  
  -- 인덱스
  CONSTRAINT consultations_pkey PRIMARY KEY (id)
);

-- 인덱스
CREATE INDEX idx_consultations_recipient ON consultations(recipient_id);
CREATE INDEX idx_consultations_year_quarter ON consultations(year, quarter);
CREATE INDEX idx_consultations_occurred_at ON consultations(occurred_at);
CREATE INDEX idx_consultations_type ON consultations(type);
CREATE INDEX idx_consultations_status ON consultations(status);
CREATE INDEX idx_consultations_facility ON consultations(facility_id);
```

---

### 2. consultation_attachments (첨부파일)

상담/면담 기록의 첨부파일을 관리합니다.

```sql
CREATE TABLE consultation_attachments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  consultation_id UUID NOT NULL REFERENCES consultations(id) ON DELETE CASCADE,
  
  -- 파일 정보
  file_name VARCHAR(255) NOT NULL,
  file_size INTEGER NOT NULL,
  file_type VARCHAR(100) NOT NULL,
  file_path TEXT NOT NULL,
  storage_url TEXT NOT NULL,
  
  -- 메타데이터
  uploaded_at TIMESTAMP DEFAULT NOW(),
  uploaded_by UUID NOT NULL REFERENCES users(id),
  
  CONSTRAINT consultation_attachments_pkey PRIMARY KEY (id)
);

-- 인덱스
CREATE INDEX idx_consultation_attachments_consultation ON consultation_attachments(consultation_id);
```

---

### 3. consultation_categories (상담구분 코드)

상담구분 코드를 관리합니다.

```sql
CREATE TABLE consultation_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  facility_id UUID NOT NULL REFERENCES facilities(id),
  
  code VARCHAR(50) NOT NULL,
  name VARCHAR(100) NOT NULL,
  type VARCHAR(20) NOT NULL CHECK (type IN ('consultation', 'interview', 'both')),
  
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  
  CONSTRAINT consultation_categories_unique UNIQUE (facility_id, code)
);

-- 초기 데이터
INSERT INTO consultation_categories (facility_id, code, name, type, display_order) VALUES
  ('facility-uuid', 'health', '건강상태', 'both', 1),
  ('facility-uuid', 'service', '서비스', 'both', 2),
  ('facility-uuid', 'complaint', '불편사항', 'both', 3),
  ('facility-uuid', 'request', '요청사항', 'both', 4),
  ('facility-uuid', 'family', '가족상담', 'consultation', 5),
  ('facility-uuid', 'adaptation', '적응상태', 'interview', 6),
  ('facility-uuid', 'etc', '기타', 'both', 99);
```

---

### 4. consultation_methods (상담방법 코드)

상담방법 코드를 관리합니다.

```sql
CREATE TABLE consultation_methods (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  facility_id UUID NOT NULL REFERENCES facilities(id),
  
  code VARCHAR(50) NOT NULL,
  name VARCHAR(100) NOT NULL,
  
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  
  CONSTRAINT consultation_methods_unique UNIQUE (facility_id, code)
);

-- 초기 데이터
INSERT INTO consultation_methods (facility_id, code, name, display_order) VALUES
  ('facility-uuid', 'face', '대면', 1),
  ('facility-uuid', 'phone', '전화', 2),
  ('facility-uuid', 'message', '문자', 3),
  ('facility-uuid', 'video', '화상', 4),
  ('facility-uuid', 'etc', '기타', 99);
```

---

### 5. consultation_audit_logs (감사 로그)

상담/면담 기록의 변경 이력을 추적합니다.

```sql
CREATE TABLE consultation_audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  consultation_id UUID NOT NULL REFERENCES consultations(id) ON DELETE CASCADE,
  
  action VARCHAR(20) NOT NULL CHECK (action IN ('create', 'update', 'delete', 'approve')),
  
  -- 변경 내용
  old_data JSONB,
  new_data JSONB,
  
  -- 감사
  created_at TIMESTAMP DEFAULT NOW(),
  created_by UUID NOT NULL REFERENCES users(id),
  ip_address VARCHAR(50),
  user_agent TEXT
);

-- 인덱스
CREATE INDEX idx_consultation_audit_logs_consultation ON consultation_audit_logs(consultation_id);
CREATE INDEX idx_consultation_audit_logs_created_at ON consultation_audit_logs(created_at);
```

---

## RLS (Row Level Security) 정책

### consultations 테이블

```sql
-- RLS 활성화
ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;

-- 조회 정책: 같은 시설의 직원만 조회 가능
CREATE POLICY consultations_select_policy ON consultations
  FOR SELECT
  USING (
    facility_id IN (
      SELECT facility_id FROM staff WHERE user_id = auth.uid()
    )
  );

-- 생성 정책: 같은 시설의 직원만 생성 가능
CREATE POLICY consultations_insert_policy ON consultations
  FOR INSERT
  WITH CHECK (
    facility_id IN (
      SELECT facility_id FROM staff WHERE user_id = auth.uid()
    )
  );

-- 수정 정책: 본인이 작성한 기록만 수정 가능 (또는 관리자)
CREATE POLICY consultations_update_policy ON consultations
  FOR UPDATE
  USING (
    created_by = auth.uid() OR
    EXISTS (
      SELECT 1 FROM staff 
      WHERE user_id = auth.uid() 
      AND role IN ('admin', 'manager')
      AND facility_id = consultations.facility_id
    )
  );

-- 삭제 정책: 관리자만 삭제 가능
CREATE POLICY consultations_delete_policy ON consultations
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM staff 
      WHERE user_id = auth.uid() 
      AND role IN ('admin', 'manager')
      AND facility_id = consultations.facility_id
    )
  );
```

---

## 트리거

### 1. 자동 분기 계산

```sql
CREATE OR REPLACE FUNCTION calculate_quarter()
RETURNS TRIGGER AS $$
BEGIN
  NEW.year := EXTRACT(YEAR FROM NEW.occurred_at);
  NEW.quarter := EXTRACT(QUARTER FROM NEW.occurred_at);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER consultations_calculate_quarter
  BEFORE INSERT OR UPDATE ON consultations
  FOR EACH ROW
  EXECUTE FUNCTION calculate_quarter();
```

### 2. 감사 로그 자동 생성

```sql
CREATE OR REPLACE FUNCTION log_consultation_changes()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    INSERT INTO consultation_audit_logs (consultation_id, action, new_data, created_by)
    VALUES (NEW.id, 'create', to_jsonb(NEW), auth.uid());
  ELSIF TG_OP = 'UPDATE' THEN
    INSERT INTO consultation_audit_logs (consultation_id, action, old_data, new_data, created_by)
    VALUES (NEW.id, 'update', to_jsonb(OLD), to_jsonb(NEW), auth.uid());
  ELSIF TG_OP = 'DELETE' THEN
    INSERT INTO consultation_audit_logs (consultation_id, action, old_data, created_by)
    VALUES (OLD.id, 'delete', to_jsonb(OLD), auth.uid());
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER consultations_audit_log
  AFTER INSERT OR UPDATE OR DELETE ON consultations
  FOR EACH ROW
  EXECUTE FUNCTION log_consultation_changes();
```

### 3. updated_at 자동 갱신

```sql
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at := NOW();
  NEW.updated_by := auth.uid();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER consultations_update_timestamp
  BEFORE UPDATE ON consultations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();
```

---

## 뷰 (Views)

### 1. 분기별 요약 뷰

```sql
CREATE OR REPLACE VIEW consultation_quarterly_summary AS
SELECT
  r.id AS recipient_id,
  r.name AS recipient_name,
  r.room_number,
  r.grade,
  r.status,
  c.year,
  c.type,
  COUNT(CASE WHEN c.quarter = 1 THEN 1 END) AS q1_count,
  COUNT(CASE WHEN c.quarter = 2 THEN 1 END) AS q2_count,
  COUNT(CASE WHEN c.quarter = 3 THEN 1 END) AS q3_count,
  COUNT(CASE WHEN c.quarter = 4 THEN 1 END) AS q4_count,
  COUNT(*) AS total_count
FROM recipients r
LEFT JOIN consultations c ON r.id = c.recipient_id
GROUP BY r.id, r.name, r.room_number, r.grade, r.status, c.year, c.type;
```

### 2. 최근 상담 이력 뷰

```sql
CREATE OR REPLACE VIEW consultation_recent_history AS
SELECT
  c.*,
  r.name AS recipient_name,
  r.room_number,
  s.name AS staff_name,
  (
    SELECT COUNT(*) 
    FROM consultation_attachments 
    WHERE consultation_id = c.id
  ) AS attachment_count
FROM consultations c
JOIN recipients r ON c.recipient_id = r.id
JOIN staff s ON c.staff_id = s.id
ORDER BY c.occurred_at DESC;
```

---

## API 엔드포인트 설계

### 1. 목록 조회
```
GET /api/consultations
Query Parameters:
  - type: consultation | interview
  - year: 2025
  - quarter: 1-4
  - status: draft | completed | approved
  - recipient_status: active | discharged
  - room: 101, 102, ...
  - grade: 1-5
  - keyword: 수급자명 검색
  - page: 1
  - limit: 20
```

### 2. 분기별 요약
```
GET /api/consultations/quarterly-summary
Query Parameters:
  - type: consultation | interview
  - year: 2025
  - recipient_status: active | discharged
  - room: 101, 102, ...
  - grade: 1-5
```

### 3. 상세 조회
```
GET /api/consultations/:id
```

### 4. 생성
```
POST /api/consultations
Body: {
  recipient_id, type, occurred_at, target_type,
  guardian_id?, category_code, method_code,
  staff_id, content, action_content?
}
```

### 5. 수정
```
PUT /api/consultations/:id
Body: { ... }
```

### 6. 삭제
```
DELETE /api/consultations/:id
```

### 7. 첨부파일 업로드
```
POST /api/consultations/:id/attachments
Body: FormData (multipart/form-data)
  - files: File[]
```

### 8. 첨부파일 삭제
```
DELETE /api/consultations/:id/attachments/:attachmentId
```

### 9. 이전 기록 불러오기
```
GET /api/consultations/recent/:recipientId
Query Parameters:
  - type: consultation | interview
  - limit: 5
```

### 10. 코드 조회
```
GET /api/consultations/codes/categories
GET /api/consultations/codes/methods
```

---

## 파일 업로드 제한

- **허용 확장자**: jpg, jpeg, png, gif, pdf, doc, docx, xls, xlsx, hwp
- **최대 파일 크기**: 10MB
- **최대 파일 개수**: 10개
- **저장소**: Supabase Storage 또는 S3 호환 스토리지

---

## 권한 매트릭스

| 역할 | 조회 | 생성 | 수정(본인) | 수정(타인) | 삭제 | 승인 |
|------|------|------|------------|------------|------|------|
| 관리자 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| 사회복지사 | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| 간호사 | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| 요양보호사 | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |

---

## 마이그레이션 스크립트

기존 "기록/상담일지" 데이터를 신규 모델로 마이그레이션합니다.

```sql
-- 기존 데이터 마이그레이션
INSERT INTO consultations (
  facility_id, recipient_id, type, occurred_at, year, quarter,
  target_type, category_code, method_code, staff_id, staff_name,
  content, action_content, status, created_at, created_by
)
SELECT
  facility_id,
  recipient_id,
  'consultation' AS type,
  consultation_date AS occurred_at,
  EXTRACT(YEAR FROM consultation_date) AS year,
  EXTRACT(QUARTER FROM consultation_date) AS quarter,
  COALESCE(target_type, 'recipient') AS target_type,
  COALESCE(category, 'etc') AS category_code,
  COALESCE(method, 'face') AS method_code,
  staff_id,
  staff_name,
  content,
  action_content,
  'completed' AS status,
  created_at,
  created_by
FROM old_consultation_records
WHERE deleted_at IS NULL;
```

---

## 통계 쿼리 예시

### 1. 분기별 작성 현황
```sql
SELECT
  year,
  quarter,
  type,
  COUNT(*) AS total_count,
  COUNT(CASE WHEN status = 'completed' THEN 1 END) AS completed_count,
  COUNT(CASE WHEN is_benefit_reflected THEN 1 END) AS reflected_count
FROM consultations
WHERE facility_id = 'facility-uuid'
GROUP BY year, quarter, type
ORDER BY year DESC, quarter DESC;
```

### 2. 수급자별 상담 빈도
```sql
SELECT
  r.name AS recipient_name,
  r.room_number,
  COUNT(*) AS consultation_count,
  MAX(c.occurred_at) AS last_consultation_date
FROM recipients r
LEFT JOIN consultations c ON r.id = c.recipient_id
WHERE r.facility_id = 'facility-uuid'
  AND r.status = 'active'
GROUP BY r.id, r.name, r.room_number
ORDER BY consultation_count DESC;
```

### 3. 직원별 작성 현황
```sql
SELECT
  s.name AS staff_name,
  s.role,
  COUNT(*) AS consultation_count,
  COUNT(CASE WHEN c.type = 'consultation' THEN 1 END) AS consultation_type_count,
  COUNT(CASE WHEN c.type = 'interview' THEN 1 END) AS interview_type_count
FROM staff s
LEFT JOIN consultations c ON s.id = c.staff_id
WHERE s.facility_id = 'facility-uuid'
  AND c.occurred_at >= DATE_TRUNC('month', NOW())
GROUP BY s.id, s.name, s.role
ORDER BY consultation_count DESC;
```

---

## 보안 고려사항

1. **개인정보 보호**
   - 상담 내용은 암호화 저장 고려
   - 출력 시 워터마크 포함
   - 접근 로그 기록

2. **권한 관리**
   - RLS 정책으로 시설별 데이터 격리
   - 역할 기반 접근 제어
   - 본인 작성 기록만 수정 가능

3. **감사 추적**
   - 모든 변경 이력 자동 기록
   - IP 주소 및 User Agent 저장
   - 삭제된 데이터도 감사 로그에 보관

---

## 성능 최적화

1. **인덱스**
   - recipient_id, year, quarter 복합 인덱스
   - occurred_at 인덱스 (시계열 조회)
   - status 인덱스 (필터링)

2. **캐싱**
   - 분기별 요약 데이터 캐싱
   - 코드 테이블 메모리 캐싱

3. **페이지네이션**
   - 목록 조회 시 페이지네이션 필수
   - 무한 스크롤 지원

---

이 스키마는 레거시 시스템의 업무 흐름을 유지하면서 현대적인 데이터베이스 설계 원칙을 따릅니다.
