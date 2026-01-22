# 회계관리 ERP 데이터베이스 스키마

## 개요
요양시설 회계관리를 위한 ERP 수준의 복식부기 회계 시스템 데이터베이스 스키마입니다.

---

## 1. 전표 관리

### 1.1 전표 헤더 (gl_journals)
```sql
CREATE TABLE gl_journals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  journal_number VARCHAR(50) UNIQUE NOT NULL, -- 전표번호 (자동생성)
  journal_type VARCHAR(20) NOT NULL, -- 전표유형: general(일반), receipt(입금), payment(출금), sales(매출), purchase(매입), payroll(급여), asset(자산), transfer(이체)
  journal_date DATE NOT NULL, -- 전표일자
  posting_date DATE, -- 전기일자 (승인일)
  
  -- 거래 정보
  partner_id UUID REFERENCES gl_partners(id), -- 거래처
  description TEXT NOT NULL, -- 적요
  memo TEXT, -- 메모
  
  -- 증빙 정보
  evidence_type VARCHAR(20), -- 증빙유형: tax_invoice(세금계산서), cash_receipt(현금영수증), card(카드전표), simple(간이영수증), none(무증빙)
  evidence_number VARCHAR(100), -- 증빙번호
  
  -- 부가세 정보
  tax_type VARCHAR(20), -- 과세구분: taxable(과세), exempt(면세), zero(영세)
  supply_amount DECIMAL(15,2) DEFAULT 0, -- 공급가액
  tax_amount DECIMAL(15,2) DEFAULT 0, -- 부가세
  total_amount DECIMAL(15,2) NOT NULL, -- 합계금액
  
  -- 결제 정보
  payment_method VARCHAR(20), -- 결제수단: cash(현금), transfer(계좌이체), card(카드), virtual(가상계좌)
  bank_account_id UUID REFERENCES gl_bank_accounts(id), -- 은행계좌
  card_id UUID REFERENCES gl_cards(id), -- 카드
  
  -- 조직 정보
  department VARCHAR(100), -- 부서
  project VARCHAR(100), -- 프로젝트
  responsible_user_id UUID, -- 담당자
  
  -- 승인 정보
  status VARCHAR(20) NOT NULL DEFAULT 'draft', -- 상태: draft(임시저장), pending(승인요청), approved(승인), rejected(반려), posted(전기완료)
  submitted_at TIMESTAMP, -- 승인요청일시
  submitted_by UUID, -- 승인요청자
  approved_at TIMESTAMP, -- 승인일시
  approved_by UUID, -- 승인자
  rejection_reason TEXT, -- 반려사유
  
  -- 첨부파일
  attachments JSONB, -- [{filename, url, size, type}]
  
  -- 연동 정보
  linked_payroll_id UUID, -- 연동 급여ID
  linked_billing_id UUID, -- 연동 청구ID
  linked_transaction_id VARCHAR(100), -- 기존 거래내역 ID
  
  -- 감사 정보
  created_at TIMESTAMP DEFAULT NOW(),
  created_by UUID NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW(),
  updated_by UUID,
  
  -- 제약조건
  CONSTRAINT chk_journal_type CHECK (journal_type IN ('general', 'receipt', 'payment', 'sales', 'purchase', 'payroll', 'asset', 'transfer')),
  CONSTRAINT chk_status CHECK (status IN ('draft', 'pending', 'approved', 'rejected', 'posted')),
  CONSTRAINT chk_tax_type CHECK (tax_type IN ('taxable', 'exempt', 'zero', NULL))
);

-- 인덱스
CREATE INDEX idx_journals_date ON gl_journals(journal_date);
CREATE INDEX idx_journals_number ON gl_journals(journal_number);
CREATE INDEX idx_journals_status ON gl_journals(status);
CREATE INDEX idx_journals_partner ON gl_journals(partner_id);
CREATE INDEX idx_journals_type ON gl_journals(journal_type);
```

### 1.2 전표 라인 (gl_journal_lines)
```sql
CREATE TABLE gl_journal_lines (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  journal_id UUID NOT NULL REFERENCES gl_journals(id) ON DELETE CASCADE,
  line_number INT NOT NULL, -- 라인번호
  
  -- 계정 정보
  account_id UUID NOT NULL REFERENCES gl_accounts(id), -- 계정과목
  account_code VARCHAR(20) NOT NULL, -- 계정코드 (비정규화)
  account_name VARCHAR(200) NOT NULL, -- 계정명 (비정규화)
  
  -- 차변/대변
  debit_amount DECIMAL(15,2) DEFAULT 0, -- 차변금액
  credit_amount DECIMAL(15,2) DEFAULT 0, -- 대변금액
  
  -- 보조 정보
  partner_id UUID REFERENCES gl_partners(id), -- 거래처 (라인별)
  description TEXT, -- 적요 (라인별)
  
  -- 부가 정보
  department VARCHAR(100), -- 부서
  project VARCHAR(100), -- 프로젝트
  cost_center VARCHAR(100), -- 원가중심점
  
  created_at TIMESTAMP DEFAULT NOW(),
  
  -- 제약조건
  CONSTRAINT chk_debit_credit CHECK (
    (debit_amount > 0 AND credit_amount = 0) OR 
    (debit_amount = 0 AND credit_amount > 0)
  ),
  CONSTRAINT uq_journal_line UNIQUE(journal_id, line_number)
);

-- 인덱스
CREATE INDEX idx_journal_lines_journal ON gl_journal_lines(journal_id);
CREATE INDEX idx_journal_lines_account ON gl_journal_lines(account_id);
CREATE INDEX idx_journal_lines_partner ON gl_journal_lines(partner_id);
```

---

## 2. 계정과목 관리

### 2.1 계정과목 (gl_accounts)
```sql
CREATE TABLE gl_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code VARCHAR(20) UNIQUE NOT NULL, -- 계정코드
  name VARCHAR(200) NOT NULL, -- 계정명
  name_en VARCHAR(200), -- 영문명
  
  -- 분류
  account_class VARCHAR(20) NOT NULL, -- 대분류: asset(자산), liability(부채), equity(자본), revenue(수익), expense(비용)
  account_type VARCHAR(50), -- 중분류: current_asset(유동자산), fixed_asset(고정자산), etc
  parent_id UUID REFERENCES gl_accounts(id), -- 상위계정
  level INT NOT NULL DEFAULT 1, -- 계층레벨
  
  -- 속성
  is_control BOOLEAN DEFAULT FALSE, -- 통제계정 여부
  is_detail BOOLEAN DEFAULT TRUE, -- 세부계정 여부 (전표입력 가능)
  is_taxable BOOLEAN DEFAULT FALSE, -- 과세대상 여부
  default_tax_type VARCHAR(20), -- 기본 과세구분
  
  -- 자동분개
  default_debit_account_id UUID REFERENCES gl_accounts(id), -- 기본 차변 상대계정
  default_credit_account_id UUID REFERENCES gl_accounts(id), -- 기본 대변 상대계정
  
  -- 예산
  is_budget_control BOOLEAN DEFAULT FALSE, -- 예산통제 대상
  
  -- 표시
  display_order INT DEFAULT 0, -- 표시순서
  is_active BOOLEAN DEFAULT TRUE, -- 사용여부
  
  -- 메타
  description TEXT, -- 설명
  notes TEXT, -- 비고
  
  created_at TIMESTAMP DEFAULT NOW(),
  created_by UUID NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW(),
  updated_by UUID,
  
  CONSTRAINT chk_account_class CHECK (account_class IN ('asset', 'liability', 'equity', 'revenue', 'expense'))
);

-- 인덱스
CREATE INDEX idx_accounts_code ON gl_accounts(code);
CREATE INDEX idx_accounts_class ON gl_accounts(account_class);
CREATE INDEX idx_accounts_parent ON gl_accounts(parent_id);
CREATE INDEX idx_accounts_active ON gl_accounts(is_active);
```

---

## 3. 거래처 관리

### 3.1 거래처 (gl_partners)
```sql
CREATE TABLE gl_partners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code VARCHAR(50) UNIQUE NOT NULL, -- 거래처코드
  name VARCHAR(200) NOT NULL, -- 거래처명
  name_en VARCHAR(200), -- 영문명
  
  -- 분류
  partner_type VARCHAR(20) NOT NULL, -- 유형: customer(고객), supplier(공급업체), employee(직원), other(기타)
  business_type VARCHAR(100), -- 업종
  
  -- 사업자 정보
  business_number VARCHAR(20), -- 사업자번호
  corporate_number VARCHAR(20), -- 법인번호
  representative VARCHAR(100), -- 대표자
  
  -- 연락처
  phone VARCHAR(20),
  mobile VARCHAR(20),
  fax VARCHAR(20),
  email VARCHAR(100),
  
  -- 주소
  address TEXT,
  address_detail TEXT,
  postal_code VARCHAR(10),
  
  -- 정산 정보
  bank_name VARCHAR(100), -- 은행명
  account_number VARCHAR(50), -- 계좌번호
  account_holder VARCHAR(100), -- 예금주
  
  -- 세금계산서
  tax_invoice_email VARCHAR(100), -- 세금계산서 이메일
  
  -- 거래 조건
  payment_terms VARCHAR(100), -- 결제조건
  credit_limit DECIMAL(15,2), -- 여신한도
  
  -- 통계 (비정규화)
  total_purchase DECIMAL(15,2) DEFAULT 0, -- 누적 매입
  total_sales DECIMAL(15,2) DEFAULT 0, -- 누적 매출
  total_payable DECIMAL(15,2) DEFAULT 0, -- 미지급금
  total_receivable DECIMAL(15,2) DEFAULT 0, -- 미수금
  
  -- 상태
  is_active BOOLEAN DEFAULT TRUE,
  
  -- 메타
  notes TEXT,
  
  created_at TIMESTAMP DEFAULT NOW(),
  created_by UUID NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW(),
  updated_by UUID,
  
  CONSTRAINT chk_partner_type CHECK (partner_type IN ('customer', 'supplier', 'employee', 'other'))
);

-- 인덱스
CREATE INDEX idx_partners_code ON gl_partners(code);
CREATE INDEX idx_partners_name ON gl_partners(name);
CREATE INDEX idx_partners_type ON gl_partners(partner_type);
CREATE INDEX idx_partners_business_number ON gl_partners(business_number);
```

---

## 4. 은행/카드 관리

### 4.1 은행계좌 (gl_bank_accounts)
```sql
CREATE TABLE gl_bank_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  account_code VARCHAR(50) UNIQUE NOT NULL, -- 계좌코드
  account_name VARCHAR(200) NOT NULL, -- 계좌명
  
  -- 은행 정보
  bank_name VARCHAR(100) NOT NULL, -- 은행명
  bank_code VARCHAR(20), -- 은행코드
  account_number VARCHAR(50) NOT NULL, -- 계좌번호
  account_holder VARCHAR(100) NOT NULL, -- 예금주
  
  -- 계정 연결
  gl_account_id UUID REFERENCES gl_accounts(id), -- 연결 계정과목
  
  -- 잔액
  current_balance DECIMAL(15,2) DEFAULT 0, -- 현재잔액
  
  -- 상태
  is_active BOOLEAN DEFAULT TRUE,
  is_default BOOLEAN DEFAULT FALSE, -- 기본계좌
  
  -- 메타
  notes TEXT,
  
  created_at TIMESTAMP DEFAULT NOW(),
  created_by UUID NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW(),
  updated_by UUID
);

-- 인덱스
CREATE INDEX idx_bank_accounts_code ON gl_bank_accounts(account_code);
CREATE INDEX idx_bank_accounts_active ON gl_bank_accounts(is_active);
```

### 4.2 카드 (gl_cards)
```sql
CREATE TABLE gl_cards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  card_code VARCHAR(50) UNIQUE NOT NULL, -- 카드코드
  card_name VARCHAR(200) NOT NULL, -- 카드명
  
  -- 카드 정보
  card_company VARCHAR(100) NOT NULL, -- 카드사
  card_number VARCHAR(20) NOT NULL, -- 카드번호 (마스킹)
  card_holder VARCHAR(100) NOT NULL, -- 카드소유자
  card_type VARCHAR(20), -- 카드유형: corporate(법인), personal(개인)
  
  -- 계정 연결
  gl_account_id UUID REFERENCES gl_accounts(id), -- 연결 계정과목
  
  -- 한도
  credit_limit DECIMAL(15,2), -- 한도
  current_usage DECIMAL(15,2) DEFAULT 0, -- 사용금액
  
  -- 결제
  payment_day INT, -- 결제일
  payment_bank_account_id UUID REFERENCES gl_bank_accounts(id), -- 결제계좌
  
  -- 상태
  is_active BOOLEAN DEFAULT TRUE,
  
  -- 메타
  notes TEXT,
  
  created_at TIMESTAMP DEFAULT NOW(),
  created_by UUID NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW(),
  updated_by UUID
);

-- 인덱스
CREATE INDEX idx_cards_code ON gl_cards(card_code);
CREATE INDEX idx_cards_active ON gl_cards(is_active);
```

---

## 5. 증빙 관리

### 5.1 증빙 (gl_evidences)
```sql
CREATE TABLE gl_evidences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  evidence_number VARCHAR(100) UNIQUE NOT NULL, -- 증빙번호
  evidence_type VARCHAR(20) NOT NULL, -- 증빙유형
  
  -- 연결
  journal_id UUID REFERENCES gl_journals(id), -- 연결 전표
  partner_id UUID REFERENCES gl_partners(id), -- 거래처
  
  -- 금액
  supply_amount DECIMAL(15,2) DEFAULT 0,
  tax_amount DECIMAL(15,2) DEFAULT 0,
  total_amount DECIMAL(15,2) NOT NULL,
  
  -- 일자
  issue_date DATE NOT NULL, -- 발행일
  
  -- 파일
  file_url TEXT, -- 파일 URL
  file_name VARCHAR(255), -- 파일명
  file_size BIGINT, -- 파일크기
  file_type VARCHAR(50), -- 파일타입
  
  -- OCR 결과
  ocr_data JSONB, -- OCR 추출 데이터
  
  -- 상태
  is_linked BOOLEAN DEFAULT FALSE, -- 전표연결 여부
  
  created_at TIMESTAMP DEFAULT NOW(),
  created_by UUID NOT NULL,
  
  CONSTRAINT chk_evidence_type CHECK (evidence_type IN ('tax_invoice', 'cash_receipt', 'card', 'simple', 'none'))
);

-- 인덱스
CREATE INDEX idx_evidences_number ON gl_evidences(evidence_number);
CREATE INDEX idx_evidences_journal ON gl_evidences(journal_id);
CREATE INDEX idx_evidences_linked ON gl_evidences(is_linked);
```

---

## 6. 결산 관리

### 6.1 마감 (gl_close_periods)
```sql
CREATE TABLE gl_close_periods (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  period_type VARCHAR(20) NOT NULL, -- 마감유형: month(월마감), year(연마감)
  fiscal_year INT NOT NULL, -- 회계연도
  period_month INT, -- 월 (월마감시)
  
  -- 마감 정보
  close_date DATE NOT NULL, -- 마감일
  closed_at TIMESTAMP NOT NULL, -- 마감일시
  closed_by UUID NOT NULL, -- 마감자
  
  -- 검증
  total_debit DECIMAL(15,2) NOT NULL, -- 총 차변
  total_credit DECIMAL(15,2) NOT NULL, -- 총 대변
  journal_count INT NOT NULL, -- 전표 건수
  
  -- 상태
  status VARCHAR(20) NOT NULL DEFAULT 'closed', -- 상태: closed(마감), reopened(재개)
  reopen_reason TEXT, -- 재개 사유
  reopened_at TIMESTAMP, -- 재개일시
  reopened_by UUID, -- 재개자
  
  -- 메타
  notes TEXT,
  
  created_at TIMESTAMP DEFAULT NOW(),
  
  CONSTRAINT chk_period_type CHECK (period_type IN ('month', 'year')),
  CONSTRAINT chk_status CHECK (status IN ('closed', 'reopened')),
  CONSTRAINT uq_close_period UNIQUE(fiscal_year, period_month, period_type)
);

-- 인덱스
CREATE INDEX idx_close_periods_year ON gl_close_periods(fiscal_year);
CREATE INDEX idx_close_periods_status ON gl_close_periods(status);
```

---

## 7. 예산 관리

### 7.1 예산 (gl_budgets)
```sql
CREATE TABLE gl_budgets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  fiscal_year INT NOT NULL, -- 회계연도
  period_month INT, -- 월 (월별예산)
  
  -- 계정
  account_id UUID NOT NULL REFERENCES gl_accounts(id),
  
  -- 예산
  budget_amount DECIMAL(15,2) NOT NULL, -- 예산금액
  
  -- 집행
  executed_amount DECIMAL(15,2) DEFAULT 0, -- 집행금액
  remaining_amount DECIMAL(15,2), -- 잔액
  execution_rate DECIMAL(5,2), -- 집행률
  
  -- 부서/프로젝트
  department VARCHAR(100),
  project VARCHAR(100),
  
  -- 메타
  notes TEXT,
  
  created_at TIMESTAMP DEFAULT NOW(),
  created_by UUID NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW(),
  updated_by UUID,
  
  CONSTRAINT uq_budget UNIQUE(fiscal_year, period_month, account_id, department, project)
);

-- 인덱스
CREATE INDEX idx_budgets_year ON gl_budgets(fiscal_year);
CREATE INDEX idx_budgets_account ON gl_budgets(account_id);
```

---

## 8. 자동분개 템플릿

### 8.1 자동분개 규칙 (gl_auto_rules)
```sql
CREATE TABLE gl_auto_rules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  rule_code VARCHAR(50) UNIQUE NOT NULL, -- 규칙코드
  rule_name VARCHAR(200) NOT NULL, -- 규칙명
  
  -- 트리거
  trigger_type VARCHAR(50) NOT NULL, -- 트리거: payroll(급여), billing(청구), purchase(매입), etc
  
  -- 분개 템플릿
  journal_type VARCHAR(20) NOT NULL, -- 전표유형
  debit_account_id UUID REFERENCES gl_accounts(id), -- 차변계정
  credit_account_id UUID REFERENCES gl_accounts(id), -- 대변계정
  
  -- 조건
  conditions JSONB, -- 조건 (JSON)
  
  -- 상태
  is_active BOOLEAN DEFAULT TRUE,
  
  -- 메타
  description TEXT,
  
  created_at TIMESTAMP DEFAULT NOW(),
  created_by UUID NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW(),
  updated_by UUID
);

-- 인덱스
CREATE INDEX idx_auto_rules_code ON gl_auto_rules(rule_code);
CREATE INDEX idx_auto_rules_trigger ON gl_auto_rules(trigger_type);
CREATE INDEX idx_auto_rules_active ON gl_auto_rules(is_active);
```

---

## 9. 감사 로그

### 9.1 회계 감사 로그 (gl_audit_logs)
```sql
CREATE TABLE gl_audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- 대상
  entity_type VARCHAR(50) NOT NULL, -- 엔티티: journal, account, partner, etc
  entity_id UUID NOT NULL, -- 엔티티 ID
  
  -- 액션
  action VARCHAR(20) NOT NULL, -- 액션: create, update, delete, approve, reject, close, reopen
  
  -- 변경 내용
  old_value JSONB, -- 변경 전
  new_value JSONB, -- 변경 후
  
  -- 사용자
  user_id UUID NOT NULL,
  user_name VARCHAR(100),
  
  -- 메타
  ip_address VARCHAR(50),
  user_agent TEXT,
  
  created_at TIMESTAMP DEFAULT NOW(),
  
  CONSTRAINT chk_action CHECK (action IN ('create', 'update', 'delete', 'approve', 'reject', 'close', 'reopen', 'post'))
);

-- 인덱스
CREATE INDEX idx_audit_logs_entity ON gl_audit_logs(entity_type, entity_id);
CREATE INDEX idx_audit_logs_user ON gl_audit_logs(user_id);
CREATE INDEX idx_audit_logs_created ON gl_audit_logs(created_at);
```

---

## 10. RLS (Row Level Security) 정책

```sql
-- 전표 조회 권한
ALTER TABLE gl_journals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own journals or all if admin"
  ON gl_journals FOR SELECT
  USING (
    auth.uid() = created_by OR
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_id = auth.uid() AND role IN ('admin', 'accountant')
    )
  );

-- 전표 생성 권한
CREATE POLICY "Users can create journals if authorized"
  ON gl_journals FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_id = auth.uid() AND role IN ('admin', 'accountant', 'staff')
    )
  );

-- 전표 수정 권한 (임시저장 상태만)
CREATE POLICY "Users can update draft journals"
  ON gl_journals FOR UPDATE
  USING (
    status = 'draft' AND (
      auth.uid() = created_by OR
      EXISTS (
        SELECT 1 FROM user_roles
        WHERE user_id = auth.uid() AND role IN ('admin', 'accountant')
      )
    )
  );

-- 전표 삭제 권한 (임시저장 상태만)
CREATE POLICY "Users can delete draft journals"
  ON gl_journals FOR DELETE
  USING (
    status = 'draft' AND (
      auth.uid() = created_by OR
      EXISTS (
        SELECT 1 FROM user_roles
        WHERE user_id = auth.uid() AND role = 'admin'
      )
    )
  );
```

---

## 11. 트리거

### 11.1 전표 차대평형 검증
```sql
CREATE OR REPLACE FUNCTION check_journal_balance()
RETURNS TRIGGER AS $$
DECLARE
  total_debit DECIMAL(15,2);
  total_credit DECIMAL(15,2);
BEGIN
  -- 전표의 차변/대변 합계 계산
  SELECT 
    COALESCE(SUM(debit_amount), 0),
    COALESCE(SUM(credit_amount), 0)
  INTO total_debit, total_credit
  FROM gl_journal_lines
  WHERE journal_id = NEW.journal_id;
  
  -- 차대평형 검증
  IF total_debit != total_credit THEN
    RAISE EXCEPTION '차변과 대변이 일치하지 않습니다. 차변: %, 대변: %', total_debit, total_credit;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_check_journal_balance
  AFTER INSERT OR UPDATE ON gl_journal_lines
  FOR EACH ROW
  EXECUTE FUNCTION check_journal_balance();
```

### 11.2 감사 로그 자동 기록
```sql
CREATE OR REPLACE FUNCTION log_journal_changes()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    INSERT INTO gl_audit_logs (entity_type, entity_id, action, new_value, user_id)
    VALUES ('journal', NEW.id, 'create', row_to_json(NEW), NEW.created_by);
  ELSIF TG_OP = 'UPDATE' THEN
    INSERT INTO gl_audit_logs (entity_type, entity_id, action, old_value, new_value, user_id)
    VALUES ('journal', NEW.id, 'update', row_to_json(OLD), row_to_json(NEW), NEW.updated_by);
  ELSIF TG_OP = 'DELETE' THEN
    INSERT INTO gl_audit_logs (entity_type, entity_id, action, old_value, user_id)
    VALUES ('journal', OLD.id, 'delete', row_to_json(OLD), auth.uid());
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_log_journal_changes
  AFTER INSERT OR UPDATE OR DELETE ON gl_journals
  FOR EACH ROW
  EXECUTE FUNCTION log_journal_changes();
```

---

## 12. 초기 데이터

### 12.1 기본 계정과목
```sql
-- 자산
INSERT INTO gl_accounts (code, name, account_class, account_type, level, is_detail) VALUES
('101', '현금', 'asset', 'current_asset', 1, true),
('102', '보통예금', 'asset', 'current_asset', 1, true),
('103', '당좌예금', 'asset', 'current_asset', 1, true),
('111', '미수금', 'asset', 'current_asset', 1, true),
('112', '선급금', 'asset', 'current_asset', 1, true),
('201', '비품', 'asset', 'fixed_asset', 1, true),
('202', '차량운반구', 'asset', 'fixed_asset', 1, true),
('203', '건물', 'asset', 'fixed_asset', 1, true);

-- 부채
INSERT INTO gl_accounts (code, name, account_class, account_type, level, is_detail) VALUES
('301', '미지급금', 'liability', 'current_liability', 1, true),
('302', '예수금', 'liability', 'current_liability', 1, true),
('303', '선수금', 'liability', 'current_liability', 1, true),
('304', '미지급비용', 'liability', 'current_liability', 1, true);

-- 자본
INSERT INTO gl_accounts (code, name, account_class, account_type, level, is_detail) VALUES
('401', '자본금', 'equity', 'capital', 1, true),
('402', '이익잉여금', 'equity', 'retained_earnings', 1, true);

-- 수익
INSERT INTO gl_accounts (code, name, account_class, account_type, level, is_detail, is_taxable) VALUES
('501', '장기요양급여수익', 'revenue', 'operating_revenue', 1, true, false),
('502', '본인부담금수익', 'revenue', 'operating_revenue', 1, true, false),
('503', '식사재료비수익', 'revenue', 'operating_revenue', 1, true, false),
('511', '이자수익', 'revenue', 'non_operating_revenue', 1, true, false),
('512', '후원금수익', 'revenue', 'non_operating_revenue', 1, true, false);

-- 비용
INSERT INTO gl_accounts (code, name, account_class, account_type, level, is_detail, is_taxable) VALUES
('601', '급여', 'expense', 'personnel_expense', 1, true, false),
('602', '상여금', 'expense', 'personnel_expense', 1, true, false),
('603', '퇴직금', 'expense', 'personnel_expense', 1, true, false),
('604', '국민연금', 'expense', 'personnel_expense', 1, true, false),
('605', '건강보험', 'expense', 'personnel_expense', 1, true, false),
('606', '고용보험', 'expense', 'personnel_expense', 1, true, false),
('607', '산재보험', 'expense', 'personnel_expense', 1, true, false),
('611', '식자재비', 'expense', 'operating_expense', 1, true, true),
('612', '소모품비', 'expense', 'operating_expense', 1, true, true),
('613', '수선비', 'expense', 'operating_expense', 1, true, true),
('621', '전기료', 'expense', 'utility_expense', 1, true, true),
('622', '수도료', 'expense', 'utility_expense', 1, true, true),
('623', '가스료', 'expense', 'utility_expense', 1, true, true),
('624', '통신비', 'expense', 'utility_expense', 1, true, true),
('631', '교육훈련비', 'expense', 'administrative_expense', 1, true, true),
('632', '차량유지비', 'expense', 'administrative_expense', 1, true, true),
('633', '보험료', 'expense', 'administrative_expense', 1, true, true);
```

---

## 13. 뷰 (Views)

### 13.1 전표 상세 뷰
```sql
CREATE OR REPLACE VIEW v_journal_details AS
SELECT 
  j.id,
  j.journal_number,
  j.journal_type,
  j.journal_date,
  j.description,
  j.total_amount,
  j.status,
  p.name AS partner_name,
  u.name AS created_by_name,
  (SELECT SUM(debit_amount) FROM gl_journal_lines WHERE journal_id = j.id) AS total_debit,
  (SELECT SUM(credit_amount) FROM gl_journal_lines WHERE journal_id = j.id) AS total_credit,
  j.created_at
FROM gl_journals j
LEFT JOIN gl_partners p ON j.partner_id = p.id
LEFT JOIN users u ON j.created_by = u.id;
```

### 13.2 계정별 잔액 뷰
```sql
CREATE OR REPLACE VIEW v_account_balances AS
SELECT 
  a.id,
  a.code,
  a.name,
  a.account_class,
  COALESCE(SUM(jl.debit_amount), 0) AS total_debit,
  COALESCE(SUM(jl.credit_amount), 0) AS total_credit,
  CASE 
    WHEN a.account_class IN ('asset', 'expense') THEN 
      COALESCE(SUM(jl.debit_amount), 0) - COALESCE(SUM(jl.credit_amount), 0)
    ELSE 
      COALESCE(SUM(jl.credit_amount), 0) - COALESCE(SUM(jl.debit_amount), 0)
  END AS balance
FROM gl_accounts a
LEFT JOIN gl_journal_lines jl ON a.id = jl.account_id
LEFT JOIN gl_journals j ON jl.journal_id = j.id AND j.status = 'posted'
GROUP BY a.id, a.code, a.name, a.account_class;
```

---

## 14. 보안 고려사항

1. **민감 정보 암호화**
   - 계좌번호, 카드번호는 암호화 저장
   - 사업자번호는 마스킹 표시

2. **접근 제어**
   - RLS 정책으로 권한 기반 접근 제어
   - 감사 로그 자동 기록

3. **데이터 보존**
   - 회계 데이터는 최소 5년 보관
   - 삭제 대신 is_active = false 처리

4. **백업**
   - 일일 자동 백업
   - 마감 시점 스냅샷 생성

---

## 15. 성능 최적화

1. **인덱스 전략**
   - 날짜, 상태, 거래처 등 자주 조회되는 컬럼에 인덱스
   - 복합 인덱스 활용

2. **파티셔닝**
   - 전표 테이블은 연도별 파티셔닝 고려
   - 감사 로그는 월별 파티셔닝

3. **캐싱**
   - 계정과목, 거래처 등 마스터 데이터 캐싱
   - 집계 데이터는 materialized view 활용

---

이 스키마는 요양시설 회계관리를 위한 ERP 수준의 복식부기 시스템을 지원합니다.
