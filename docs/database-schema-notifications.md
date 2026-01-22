# 알림 관리 시스템 데이터베이스 스키마

## 개요
SMS/Band/카카오톡 등 다채널 알림 발송 및 관리를 위한 데이터베이스 스키마입니다.

---

## 테이블 구조

### 1. notification_campaigns (알림 캠페인)
발송 캠페인의 기본 정보를 관리합니다.

```sql
CREATE TABLE notification_campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- 기본 정보
  title VARCHAR(200) NOT NULL,
  purpose VARCHAR(50) NOT NULL, -- 'notice', 'urgent', 'billing', 'payroll', 'schedule', 'other'
  description TEXT,
  
  -- 발송 설정
  send_type VARCHAR(20) NOT NULL, -- 'immediate', 'scheduled'
  scheduled_at TIMESTAMP WITH TIME ZONE,
  
  -- 상태
  status VARCHAR(20) NOT NULL DEFAULT 'draft', -- 'draft', 'scheduled', 'sending', 'done', 'failed', 'canceled'
  
  -- 채널 정보
  channels JSONB NOT NULL, -- ['sms', 'band', 'kakao']
  
  -- 통계
  total_recipients INTEGER DEFAULT 0,
  success_count INTEGER DEFAULT 0,
  failed_count INTEGER DEFAULT 0,
  
  -- 발송 옵션
  options JSONB, -- { nightTimeRestriction, dailyLimit, testMode, fallbackToSms }
  
  -- 메타데이터
  created_by UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  sent_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  
  -- 기관 ID (멀티테넌트)
  organization_id UUID,
  
  CONSTRAINT valid_status CHECK (status IN ('draft', 'scheduled', 'sending', 'done', 'failed', 'canceled')),
  CONSTRAINT valid_send_type CHECK (send_type IN ('immediate', 'scheduled'))
);

-- 인덱스
CREATE INDEX idx_campaigns_status ON notification_campaigns(status);
CREATE INDEX idx_campaigns_created_at ON notification_campaigns(created_at DESC);
CREATE INDEX idx_campaigns_scheduled_at ON notification_campaigns(scheduled_at) WHERE status = 'scheduled';
CREATE INDEX idx_campaigns_created_by ON notification_campaigns(created_by);
```

---

### 2. notification_messages (채널별 메시지)
각 캠페인의 채널별 메시지 내용을 저장합니다.

```sql
CREATE TABLE notification_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- 캠페인 연결
  campaign_id UUID NOT NULL REFERENCES notification_campaigns(id) ON DELETE CASCADE,
  
  -- 채널 정보
  channel VARCHAR(20) NOT NULL, -- 'sms', 'lms', 'mms', 'band', 'kakao_alimtalk', 'kakao_friendtalk'
  
  -- 메시지 내용
  template_id UUID REFERENCES notification_templates(id),
  subject VARCHAR(200), -- LMS/MMS/Band 제목
  content TEXT NOT NULL,
  
  -- 변수 스키마
  variables JSONB, -- { "수급자명": "홍길동", "날짜": "2024-01-15" }
  
  -- 첨부 파일 (MMS/Band)
  attachments JSONB, -- [{ url, type, size, name }]
  
  -- 발신 정보
  sender_number VARCHAR(20), -- SMS 발신번호
  sender_name VARCHAR(50), -- Band/Kakao 발신자명
  
  -- 카카오 전용
  kakao_template_code VARCHAR(50),
  kakao_buttons JSONB, -- [{ name, type, url }]
  
  -- Band 전용
  band_id VARCHAR(100),
  band_options JSONB, -- { allowComments, isPinned }
  
  -- 메타데이터
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  CONSTRAINT valid_channel CHECK (channel IN ('sms', 'lms', 'mms', 'band', 'kakao_alimtalk', 'kakao_friendtalk'))
);

-- 인덱스
CREATE INDEX idx_messages_campaign ON notification_messages(campaign_id);
CREATE INDEX idx_messages_channel ON notification_messages(channel);
```

---

### 3. notification_recipients (수신자 목록)
각 캠페인의 수신자 정보를 저장합니다.

```sql
CREATE TABLE notification_recipients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- 캠페인 연결
  campaign_id UUID NOT NULL REFERENCES notification_campaigns(id) ON DELETE CASCADE,
  
  -- 대상자 정보
  target_type VARCHAR(20) NOT NULL, -- 'resident', 'guardian', 'staff', 'external'
  target_id UUID, -- 수급자/직원/보호자 ID
  
  -- 연락처 정보
  name VARCHAR(100) NOT NULL,
  phone VARCHAR(20),
  email VARCHAR(100),
  kakao_user_key VARCHAR(100),
  band_user_id VARCHAR(100),
  
  -- 수신 동의
  sms_consent BOOLEAN DEFAULT true,
  kakao_consent BOOLEAN DEFAULT true,
  
  -- 필터 정보
  room VARCHAR(50),
  grade VARCHAR(10),
  department VARCHAR(50),
  tags JSONB,
  
  -- 메타데이터
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  CONSTRAINT valid_target_type CHECK (target_type IN ('resident', 'guardian', 'staff', 'external'))
);

-- 인덱스
CREATE INDEX idx_recipients_campaign ON notification_recipients(campaign_id);
CREATE INDEX idx_recipients_target ON notification_recipients(target_type, target_id);
CREATE INDEX idx_recipients_phone ON notification_recipients(phone);
```

---

### 4. notification_delivery (발송 결과)
실제 발송 결과를 개별 수신자별로 저장합니다.

```sql
CREATE TABLE notification_delivery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- 캠페인 및 수신자 연결
  campaign_id UUID NOT NULL REFERENCES notification_campaigns(id) ON DELETE CASCADE,
  recipient_id UUID NOT NULL REFERENCES notification_recipients(id) ON DELETE CASCADE,
  message_id UUID NOT NULL REFERENCES notification_messages(id) ON DELETE CASCADE,
  
  -- 채널 정보
  channel VARCHAR(20) NOT NULL,
  
  -- 발송 정보
  external_message_id VARCHAR(200), -- 외부 업체 메시지 ID
  status VARCHAR(20) NOT NULL DEFAULT 'pending', -- 'pending', 'sent', 'delivered', 'failed', 'read', 'clicked'
  
  -- 발송 시간
  sent_at TIMESTAMP WITH TIME ZONE,
  delivered_at TIMESTAMP WITH TIME ZONE,
  read_at TIMESTAMP WITH TIME ZONE,
  clicked_at TIMESTAMP WITH TIME ZONE,
  
  -- 실패 정보
  error_code VARCHAR(50),
  error_message TEXT,
  retry_count INTEGER DEFAULT 0,
  
  -- 요청/응답 로그 (일부)
  request_payload JSONB,
  response_payload JSONB,
  
  -- 비용 정보
  cost DECIMAL(10, 2),
  
  -- 메타데이터
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  CONSTRAINT valid_status CHECK (status IN ('pending', 'sent', 'delivered', 'failed', 'read', 'clicked')),
  CONSTRAINT valid_channel CHECK (channel IN ('sms', 'lms', 'mms', 'band', 'kakao_alimtalk', 'kakao_friendtalk'))
);

-- 인덱스
CREATE INDEX idx_delivery_campaign ON notification_delivery(campaign_id);
CREATE INDEX idx_delivery_recipient ON notification_delivery(recipient_id);
CREATE INDEX idx_delivery_status ON notification_delivery(status);
CREATE INDEX idx_delivery_sent_at ON notification_delivery(sent_at DESC);
CREATE INDEX idx_delivery_channel ON notification_delivery(channel);
```

---

### 5. notification_templates (템플릿)
재사용 가능한 메시지 템플릿을 관리합니다.

```sql
CREATE TABLE notification_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- 템플릿 정보
  code VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(200) NOT NULL,
  channel VARCHAR(20) NOT NULL,
  
  -- 내용
  subject VARCHAR(200),
  content TEXT NOT NULL,
  
  -- 변수 정의
  variables JSONB, -- [{ name: "수급자명", key: "residentName", type: "string", required: true }]
  
  -- 카카오 전용
  kakao_template_code VARCHAR(50),
  kakao_approval_status VARCHAR(20), -- 'pending', 'approved', 'rejected'
  kakao_buttons JSONB,
  
  -- 분류
  category VARCHAR(50), -- 'notice', 'billing', 'schedule', 'urgent'
  
  -- 상태
  is_active BOOLEAN DEFAULT true,
  
  -- 메타데이터
  created_by UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- 기관 ID
  organization_id UUID,
  
  CONSTRAINT valid_channel CHECK (channel IN ('sms', 'lms', 'mms', 'band', 'kakao_alimtalk', 'kakao_friendtalk')),
  CONSTRAINT valid_approval_status CHECK (kakao_approval_status IN ('pending', 'approved', 'rejected'))
);

-- 인덱스
CREATE INDEX idx_templates_channel ON notification_templates(channel);
CREATE INDEX idx_templates_category ON notification_templates(category);
CREATE INDEX idx_templates_active ON notification_templates(is_active);
```

---

### 6. notification_channel_settings (채널 연동 설정)
각 채널의 API 키 및 연동 정보를 저장합니다.

```sql
CREATE TABLE notification_channel_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- 채널 정보
  channel VARCHAR(20) NOT NULL,
  
  -- 연동 정보 (암호화 필요)
  api_key TEXT,
  api_secret TEXT,
  
  -- SMS 설정
  sms_provider VARCHAR(50), -- 'aligo', 'coolsms', 'solapi'
  sender_numbers JSONB, -- [{ number, verified, isDefault }]
  
  -- Band 설정
  band_access_token TEXT,
  band_refresh_token TEXT,
  band_list JSONB, -- [{ bandKey, name, memberCount }]
  
  -- Kakao 설정
  kakao_channel_id VARCHAR(100),
  kakao_sender_key VARCHAR(100),
  kakao_api_key TEXT,
  kakao_profile JSONB, -- { name, profileImageUrl }
  
  -- 발송 제한
  daily_limit INTEGER,
  night_time_restriction BOOLEAN DEFAULT true,
  night_start_hour INTEGER DEFAULT 21,
  night_end_hour INTEGER DEFAULT 8,
  
  -- 상태
  is_active BOOLEAN DEFAULT true,
  last_verified_at TIMESTAMP WITH TIME ZONE,
  
  -- 메타데이터
  created_by UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- 기관 ID
  organization_id UUID,
  
  CONSTRAINT valid_channel CHECK (channel IN ('sms', 'band', 'kakao')),
  CONSTRAINT unique_channel_org UNIQUE (channel, organization_id)
);

-- 인덱스
CREATE INDEX idx_channel_settings_active ON notification_channel_settings(is_active);
```

---

### 7. notification_recipient_groups (수신자 그룹)
자주 사용하는 수신자 그룹을 저장합니다.

```sql
CREATE TABLE notification_recipient_groups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- 그룹 정보
  name VARCHAR(100) NOT NULL,
  description TEXT,
  
  -- 필터 조건
  filters JSONB, -- { targetType, rooms, grades, departments, tags }
  
  -- 수신자 수
  member_count INTEGER DEFAULT 0,
  
  -- 메타데이터
  created_by UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- 기관 ID
  organization_id UUID
);

-- 인덱스
CREATE INDEX idx_recipient_groups_created_by ON notification_recipient_groups(created_by);
```

---

### 8. notification_blocked_numbers (수신거부 번호)
수신거부를 요청한 번호를 관리합니다.

```sql
CREATE TABLE notification_blocked_numbers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- 번호 정보
  phone VARCHAR(20) NOT NULL UNIQUE,
  
  -- 차단 정보
  blocked_channels JSONB, -- ['sms', 'kakao']
  reason TEXT,
  
  -- 메타데이터
  blocked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  blocked_by UUID, -- 관리자가 수동 차단한 경우
  
  -- 기관 ID
  organization_id UUID
);

-- 인덱스
CREATE INDEX idx_blocked_numbers_phone ON notification_blocked_numbers(phone);
```

---

## RLS (Row Level Security) 정책

### notification_campaigns
```sql
-- 관리자는 모든 캠페인 조회 가능
CREATE POLICY "Admins can view all campaigns"
  ON notification_campaigns FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_id = auth.uid()
      AND role IN ('admin', 'manager')
    )
  );

-- 작성자는 자신의 캠페인 수정 가능
CREATE POLICY "Users can update own campaigns"
  ON notification_campaigns FOR UPDATE
  TO authenticated
  USING (created_by = auth.uid());

-- 관리자는 캠페인 생성 가능
CREATE POLICY "Admins can create campaigns"
  ON notification_campaigns FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_id = auth.uid()
      AND role IN ('admin', 'manager')
    )
  );
```

### notification_delivery
```sql
-- 관리자는 모든 발송 결과 조회 가능
CREATE POLICY "Admins can view all delivery logs"
  ON notification_delivery FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_id = auth.uid()
      AND role IN ('admin', 'manager')
    )
  );
```

### notification_templates
```sql
-- 모든 인증된 사용자는 활성 템플릿 조회 가능
CREATE POLICY "Users can view active templates"
  ON notification_templates FOR SELECT
  TO authenticated
  USING (is_active = true);

-- 관리자는 템플릿 생성/수정 가능
CREATE POLICY "Admins can manage templates"
  ON notification_templates FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_id = auth.uid()
      AND role IN ('admin', 'manager')
    )
  );
```

---

## 트리거

### 캠페인 통계 자동 업데이트
```sql
CREATE OR REPLACE FUNCTION update_campaign_statistics()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE notification_campaigns
  SET 
    success_count = (
      SELECT COUNT(*) FROM notification_delivery
      WHERE campaign_id = NEW.campaign_id
      AND status IN ('sent', 'delivered', 'read')
    ),
    failed_count = (
      SELECT COUNT(*) FROM notification_delivery
      WHERE campaign_id = NEW.campaign_id
      AND status = 'failed'
    ),
    updated_at = NOW()
  WHERE id = NEW.campaign_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_campaign_statistics
AFTER INSERT OR UPDATE ON notification_delivery
FOR EACH ROW
EXECUTE FUNCTION update_campaign_statistics();
```

### 수신자 수 자동 업데이트
```sql
CREATE OR REPLACE FUNCTION update_recipient_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE notification_campaigns
  SET 
    total_recipients = (
      SELECT COUNT(*) FROM notification_recipients
      WHERE campaign_id = NEW.campaign_id
    ),
    updated_at = NOW()
  WHERE id = NEW.campaign_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_recipient_count
AFTER INSERT OR DELETE ON notification_recipients
FOR EACH ROW
EXECUTE FUNCTION update_recipient_count();
```

---

## 감사 로그

모든 알림 발송/수정/취소 행위는 `audit_logs` 테이블에 기록됩니다.

```sql
-- 감사 로그 트리거
CREATE OR REPLACE FUNCTION log_notification_audit()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO audit_logs (
    user_id,
    entity_type,
    entity_id,
    action,
    old_value,
    new_value,
    ip_address,
    user_agent
  ) VALUES (
    auth.uid(),
    TG_TABLE_NAME,
    COALESCE(NEW.id, OLD.id),
    TG_OP,
    CASE WHEN TG_OP = 'DELETE' THEN row_to_json(OLD) ELSE NULL END,
    CASE WHEN TG_OP IN ('INSERT', 'UPDATE') THEN row_to_json(NEW) ELSE NULL END,
    current_setting('request.headers', true)::json->>'x-forwarded-for',
    current_setting('request.headers', true)::json->>'user-agent'
  );
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- 캠페인 감사 로그
CREATE TRIGGER audit_notification_campaigns
AFTER INSERT OR UPDATE OR DELETE ON notification_campaigns
FOR EACH ROW
EXECUTE FUNCTION log_notification_audit();

-- 발송 결과 감사 로그
CREATE TRIGGER audit_notification_delivery
AFTER INSERT OR UPDATE ON notification_delivery
FOR EACH ROW
EXECUTE FUNCTION log_notification_audit();
```

---

## 데이터 보관 정책

### 발송 이력 보관 (6개월)
```sql
-- 6개월 이상 된 발송 이력 아카이빙
CREATE OR REPLACE FUNCTION archive_old_delivery_logs()
RETURNS void AS $$
BEGIN
  -- 아카이브 테이블로 이동
  INSERT INTO notification_delivery_archive
  SELECT * FROM notification_delivery
  WHERE created_at < NOW() - INTERVAL '6 months';
  
  -- 원본 삭제
  DELETE FROM notification_delivery
  WHERE created_at < NOW() - INTERVAL '6 months';
END;
$$ LANGUAGE plpgsql;

-- 매월 1일 자동 실행 (pg_cron 사용)
-- SELECT cron.schedule('archive-delivery-logs', '0 0 1 * *', 'SELECT archive_old_delivery_logs()');
```

---

## 초기 데이터

### 기본 템플릿
```sql
-- 공지사항 템플릿
INSERT INTO notification_templates (code, name, channel, category, content, variables, created_by) VALUES
('NOTICE_GENERAL', '일반 공지사항', 'sms', 'notice', '[{시설명}] {제목}\n\n{내용}\n\n문의: {연락처}', 
 '[{"name":"시설명","key":"facilityName","type":"string","required":true},{"name":"제목","key":"title","type":"string","required":true},{"name":"내용","key":"content","type":"string","required":true},{"name":"연락처","key":"phone","type":"string","required":true}]',
 '00000000-0000-0000-0000-000000000000');

-- 청구 안내 템플릿
INSERT INTO notification_templates (code, name, channel, category, content, variables, created_by) VALUES
('BILLING_NOTICE', '청구 안내', 'lms', 'billing', '[{시설명}] {월}월 청구 안내\n\n{수급자명} 보호자님께\n\n{월}월 본인부담금은 {금액}원입니다.\n\n납부기한: {납부기한}\n계좌번호: {계좌번호}\n\n문의: {연락처}',
 '[{"name":"시설명","key":"facilityName","type":"string","required":true},{"name":"월","key":"month","type":"number","required":true},{"name":"수급자명","key":"residentName","type":"string","required":true},{"name":"금액","key":"amount","type":"number","required":true},{"name":"납부기한","key":"dueDate","type":"string","required":true},{"name":"계좌번호","key":"accountNumber","type":"string","required":true},{"name":"연락처","key":"phone","type":"string","required":true}]',
 '00000000-0000-0000-0000-000000000000');

-- 긴급 알림 템플릿
INSERT INTO notification_templates (code, name, channel, category, content, variables, created_by) VALUES
('URGENT_ALERT', '긴급 알림', 'sms', 'urgent', '[긴급] {수급자명} {상황}\n\n{내용}\n\n담당자: {담당자명}\n연락처: {연락처}',
 '[{"name":"수급자명","key":"residentName","type":"string","required":true},{"name":"상황","key":"situation","type":"string","required":true},{"name":"내용","key":"content","type":"string","required":true},{"name":"담당자명","key":"staffName","type":"string","required":true},{"name":"연락처","key":"phone","type":"string","required":true}]',
 '00000000-0000-0000-0000-000000000000');
```

---

## 성능 최적화

### 파티셔닝 (대용량 데이터 처리)
```sql
-- 발송 결과 테이블을 월별로 파티셔닝
CREATE TABLE notification_delivery_partitioned (
  LIKE notification_delivery INCLUDING ALL
) PARTITION BY RANGE (created_at);

-- 월별 파티션 생성
CREATE TABLE notification_delivery_2024_01 PARTITION OF notification_delivery_partitioned
  FOR VALUES FROM ('2024-01-01') TO ('2024-02-01');

CREATE TABLE notification_delivery_2024_02 PARTITION OF notification_delivery_partitioned
  FOR VALUES FROM ('2024-02-01') TO ('2024-03-01');
-- ... 계속
```

---

## 보안 고려사항

1. **민감 정보 암호화**
   - API 키, 토큰은 PostgreSQL의 `pgcrypto` 확장으로 암호화
   - 전화번호는 마스킹 함수 제공

2. **접근 제어**
   - RLS 정책으로 권한 기반 접근 제어
   - 관리자만 설정 및 로그 조회 가능

3. **감사 로그**
   - 모든 발송/수정/삭제 행위 기록
   - IP 주소 및 User-Agent 저장

4. **개인정보 보호**
   - 수신거부 번호 관리
   - 데이터 보관 기간 준수 (6개월)
   - 마스킹 처리

---

## 마이그레이션 순서

1. `notification_templates` (템플릿)
2. `notification_channel_settings` (채널 설정)
3. `notification_campaigns` (캠페인)
4. `notification_messages` (메시지)
5. `notification_recipients` (수신자)
6. `notification_delivery` (발송 결과)
7. `notification_recipient_groups` (수신자 그룹)
8. `notification_blocked_numbers` (수신거부)

---

## 백업 및 복구

```sql
-- 전체 백업
pg_dump -h localhost -U postgres -d nursing_home \
  -t notification_* \
  -f notification_backup_$(date +%Y%m%d).sql

-- 복구
psql -h localhost -U postgres -d nursing_home \
  -f notification_backup_20240115.sql
```

---

이 스키마는 확장 가능하며, 새로운 채널(예: 라인, 텔레그램) 추가 시에도 기존 구조를 유지하면서 확장할 수 있습니다.
