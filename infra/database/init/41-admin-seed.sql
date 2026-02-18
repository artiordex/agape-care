-- Description : 41-admin-seed.sql - ?? ?????? DDL ? ?? ????
-- Author : Shiwoo Min
-- Date : 2026-02-17
-- Note : 시설 정보, 사이트 설정, 직원 역할(Role) 및 권한(Permission) 초기 데이터

-- ============================================
-- 1. 시설 정보 (Facilities)
-- ============================================
INSERT INTO facilities (
  org_code,
  facility_name,
  facility_desc,
  facility_type,
  designated_date,
  director,
  director_phone,
  ceo_name,
  business_no,
  biz_type,
  staff_count,
  phone,
  fax,
  email,
  homepage,
  zip,
  address1,
  address2,
  total_capacity,
  short_stay_capacity,
  day_care_capacity,
  stamp_image,
  created_at,
  updated_at
) VALUES (
  'F-2026-001',                            -- org_code
  '아가페케어 요양센터',                   -- facility_name
  '어르신들의 존엄한 노후를 위한 프리미엄 케어 서비스를 제공합니다.', -- facility_desc
  '노인요양시설',                          -- facility_type
  '2026-01-01',                            -- designated_date
  '홍길동',                                -- director
  '010-1234-5678',                         -- director_phone
  '이아무개',                              -- ceo_name
  '123-45-67890',                          -- business_no
  '사회복지서비스업',                      -- biz_type
  35,                                      -- staff_count
  '02-1234-5678',                          -- phone
  '02-1234-5679',                          -- fax
  'admin@agape-care.com',                  -- email
  'https://agape-care.com',                -- homepage
  '06234',                                 -- zip
  '서울특별시 강남구 테헤란로 123',        -- address1
  '아카이브 빌딩 7층',                     -- address2
  49,                                      -- total_capacity
  5,                                       -- short_stay_capacity
  10,                                      -- day_care_capacity
  NULL,                                    -- stamp_image (추후 업로드)
  now(),
  now()
) ON CONFLICT (org_code) DO NOTHING;

-- ============================================
-- 2. 사이트 설정 (Site Infos)
-- ============================================
INSERT INTO site_infos (
  service_name,
  service_desc,
  contact_phone,
  contact_email,
  customer_hours,
  meta_title,
  meta_description,
  meta_keywords,
  footer_text,
  legal_notice,
  updated_by,
  created_at,
  updated_at
) VALUES (
  '아가페케어 요양센터',                                      -- service_name
  '어르신들의 존엄한 노후를 위한 프리미엄 케어 서비스',       -- service_desc
  '02-1234-5678',                                             -- contact_phone
  'help@agape-care.com',                                      -- contact_email
  '평일 09:00 ~ 18:00 (주말 및 공휴일 휴무)',                 -- customer_hours
  '아가페케어 요양센터 | 프리미엄 시니어 케어',               -- meta_title
  '2026년 최신 설비와 전문 인력을 갖춘 아가페케어에서 어르신들의 행복한 일상을 함께합니다.', -- meta_description
  '요양원, 노인복지, 주야간보호, 아가페케어',                 -- meta_keywords
  '© 2026 Agape-Care. All rights reserved.',                  -- footer_text
  '본 사이트의 모든 콘텐츠는 저작권법의 보호를 받습니다.',    -- legal_notice
  NULL,                                                       -- updated_by
  now(),
  now()
);

-- ============================================
-- 3. 직원 역할 (Employee Roles) & 권한 (Permissions)
-- ============================================

-- 3.1. 시설장 (Director) - 슈퍼 관리자
INSERT INTO employee_roles (code, name, description, permissions, created_at, updated_at)
VALUES (
  'director',
  '시설장',
  '시스템 전반에 대한 최고 권한 (모든 메뉴 접근 가능)',
  '{
    "dashboard": { "checked": true, "menus": { "dashboard": { "checked": true, "screens": { "DashboardOverview": { "checked": true, "actions": ["read", "export"] } } } } },
    "resident": { "checked": true, "menus": { "resident-info": { "checked": true, "screens": { "ResidentManagement": { "checked": true, "actions": ["read", "write", "update", "delete", "export"] } } }, "resident-outing": { "checked": true, "screens": { "OutingManagement": { "checked": true, "actions": ["read", "write", "update", "export"] } } }, "resident-billing": { "checked": true, "screens": { "BillingCopay": { "checked": true, "actions": ["read", "write", "update", "approve", "export"] } } }, "resident-consultation": { "checked": true, "screens": { "ConsultationManagement": { "checked": true, "actions": ["read", "write", "update", "export"] } } } } },
    "care": { "checked": true, "menus": { "care-daily": { "checked": true, "screens": { "DailyCareRecord": { "checked": true, "actions": ["read", "write", "update", "export"] } } }, "care-records": { "checked": true, "screens": { "CareRecordManagement": { "checked": true, "actions": ["read", "export"] } } }, "care-medication": { "checked": true, "screens": { "MedicationManagement": { "checked": true, "actions": ["read", "write", "update", "export"] } } }, "care-reports": { "checked": true, "screens": { "ReportElimination": { "checked": true, "actions": ["read", "export"] }, "ReportNursing": { "checked": true, "actions": ["read", "export"] }, "ReportPressureUlcer": { "checked": true, "actions": ["read", "export"] }, "ReportClinic": { "checked": true, "actions": ["read", "export"] }, "ReportMedication": { "checked": true, "actions": ["read", "export"] } } } } },
    "operations": { "checked": true, "menus": { "vehicle": { "checked": true, "screens": { "VehicleManagement": { "checked": true, "actions": ["read", "write", "update"] } } }, "asset": { "checked": true, "screens": { "AssetManagement": { "checked": true, "actions": ["read", "write", "update", "export"] } } }, "cctv": { "checked": true, "screens": { "CCTVDeviceManagement": { "checked": true, "actions": ["read", "write", "update"] }, "CCTVWeeklyCheck": { "checked": true, "actions": ["read", "write"] }, "CCTVViewLog": { "checked": true, "actions": ["read", "export"] } } } } },
    "staff": { "checked": true, "menus": { "staff": { "checked": true, "screens": { "StaffManagement": { "checked": true, "actions": ["read", "write", "update", "delete", "export"] }, "AttendanceManagement": { "checked": true, "actions": ["read", "export"] }, "WorkScheduleManagement": { "checked": true, "actions": ["read", "write", "update"] } } } } },
    "accounting": { "checked": true, "menus": { "accounting": { "checked": true, "screens": { "AccountingManagement": { "checked": true, "actions": ["read", "write", "update", "approve", "export"] } } }, "insurance": { "checked": true, "screens": { "InsuranceClaimManagement": { "checked": true, "actions": ["read", "write", "update", "approve", "export"] } } }, "payroll": { "checked": true, "screens": { "PayrollManagement": { "checked": true, "actions": ["read", "write", "update", "approve", "export"] } } } } },
    "system": { "checked": true, "menus": { "rbac": { "checked": true, "screens": { "RBACManagement": { "checked": true, "actions": ["read", "write", "update"] } } }, "facility": { "checked": true, "screens": { "FacilityInfo": { "checked": true, "actions": ["read", "write", "update"] } } }, "site": { "checked": true, "screens": { "SiteSettings": { "checked": true, "actions": ["read", "write", "update"] } } } } }
  }'::jsonb,
  now(),
  now()
) ON CONFLICT (code) DO NOTHING;

-- 3.2. 사회복지사 (Social Worker) - 상담, 입소자 관리, 프로그램
INSERT INTO employee_roles (code, name, description, permissions, created_at, updated_at)
VALUES (
  'social-worker',
  '사회복지사',
  '입소자 관리 및 상담, 프로그램 운영, 보호자 소통',
  '{
    "dashboard": { "checked": true, "menus": { "dashboard": { "checked": true, "screens": { "DashboardOverview": { "checked": true, "actions": ["read"] } } } } },
    "resident": { "checked": true, "menus": { "resident-info": { "checked": true, "screens": { "ResidentManagement": { "checked": true, "actions": ["read", "write", "update", "export"] } } }, "resident-outing": { "checked": true, "screens": { "OutingManagement": { "checked": true, "actions": ["read", "write", "update", "export"] } } }, "resident-consultation": { "checked": true, "screens": { "ConsultationManagement": { "checked": true, "actions": ["read", "write", "update", "export"] } } } } },
    "care": { "checked": true, "menus": { "care-daily": { "checked": true, "screens": { "DailyCareRecord": { "checked": true, "actions": ["read", "export"] } } }, "care-records": { "checked": true, "screens": { "CareRecordManagement": { "checked": true, "actions": ["read", "export"] } } } } },
    "operations": { "checked": false, "menus": {} },
    "staff": { "checked": false, "menus": {} },
    "accounting": { "checked": false, "menus": {} },
    "system": { "checked": false, "menus": {} }
  }'::jsonb,
  now(),
  now()
) ON CONFLICT (code) DO NOTHING;

-- 3.3. 간호조무사 (Nurse) - 간호, 투약, 응급
INSERT INTO employee_roles (code, name, description, permissions, created_at, updated_at)
VALUES (
  'nurse',
  '간호조무사',
  '간호 기록, 투약 관리, 응급 상황 대처',
  '{
    "dashboard": { "checked": true, "menus": { "dashboard": { "checked": true, "screens": { "DashboardOverview": { "checked": true, "actions": ["read"] } } } } },
    "resident": { "checked": true, "menus": { "resident-info": { "checked": true, "screens": { "ResidentManagement": { "checked": true, "actions": ["read"] } } } } },
    "care": { "checked": true, "menus": { "care-daily": { "checked": true, "screens": { "DailyCareRecord": { "checked": true, "actions": ["read", "write", "update", "export"] } } }, "care-records": { "checked": true, "screens": { "CareRecordManagement": { "checked": true, "actions": ["read", "export"] } } }, "care-medication": { "checked": true, "screens": { "MedicationManagement": { "checked": true, "actions": ["read", "write", "update", "export"] } } }, "care-reports": { "checked": true, "screens": { "ReportNursing": { "checked": true, "actions": ["read", "export"] }, "ReportPressureUlcer": { "checked": true, "actions": ["read", "export"] }, "ReportClinic": { "checked": true, "actions": ["read", "export"] }, "ReportMedication": { "checked": true, "actions": ["read", "export"] } } } } },
    "operations": { "checked": false, "menus": {} },
    "staff": { "checked": false, "menus": {} },
    "accounting": { "checked": false, "menus": {} },
    "system": { "checked": false, "menus": {} }
  }'::jsonb,
  now(),
  now()
) ON CONFLICT (code) DO NOTHING;

-- 3.4. 요양보호사 (Care Worker) - 일일 케어
INSERT INTO employee_roles (code, name, description, permissions, created_at, updated_at)
VALUES (
  'care-worker',
  '요양보호사',
  '어르신 목욕, 식사, 배설 보조 및 일일 케어 기록',
  '{
    "dashboard": { "checked": true, "menus": { "dashboard": { "checked": true, "screens": { "DashboardOverview": { "checked": true, "actions": ["read"] } } } } },
    "resident": { "checked": true, "menus": { "resident-info": { "checked": true, "screens": { "ResidentManagement": { "checked": true, "actions": ["read"] } } } } },
    "care": { "checked": true, "menus": { "care-daily": { "checked": true, "screens": { "DailyCareRecord": { "checked": true, "actions": ["read", "write", "update"] } } }, "care-records": { "checked": true, "screens": { "CareRecordManagement": { "checked": true, "actions": ["read"] } } } } },
    "operations": { "checked": false, "menus": {} },
    "staff": { "checked": false, "menus": {} },
    "accounting": { "checked": false, "menus": {} },
    "system": { "checked": false, "menus": {} }
  }'::jsonb,
  now(),
  now()
) ON CONFLICT (code) DO NOTHING;

-- 3.5. 회계담당 (Accountant) - 회계, 급여, 청구
INSERT INTO employee_roles (code, name, description, permissions, created_at, updated_at)
VALUES (
  'accountant',
  '회계담당',
  '시설 회계, 급여 정산, 장기요양급여 청구 관리',
  '{
    "dashboard": { "checked": true, "menus": { "dashboard": { "checked": true, "screens": { "DashboardOverview": { "checked": true, "actions": ["read"] } } } } },
    "resident": { "checked": true, "menus": { "resident-billing": { "checked": true, "screens": { "BillingCopay": { "checked": true, "actions": ["read", "write", "update", "approve", "export"] } } } } },
    "accounting": { "checked": true, "menus": { "accounting": { "checked": true, "screens": { "AccountingManagement": { "checked": true, "actions": ["read", "write", "update", "approve", "export"] } } }, "insurance": { "checked": true, "screens": { "InsuranceClaimManagement": { "checked": true, "actions": ["read", "write", "update", "approve", "export"] } } }, "payroll": { "checked": true, "screens": { "PayrollManagement": { "checked": true, "actions": ["read", "write", "update", "approve", "export"] } } } } },
    "staff": { "checked": true, "menus": { "staff": { "checked": true, "screens": { "StaffManagement": { "checked": true, "actions": ["read", "export"] }, "AttendanceManagement": { "checked": true, "actions": ["read", "export"] } } } } },
    "care": { "checked": false, "menus": {} },
    "operations": { "checked": false, "menus": {} },
    "system": { "checked": false, "menus": {} }
  }'::jsonb,
  now(),
  now()
) ON CONFLICT (code) DO NOTHING;

-- 3.6. 사무원 (Office Staff) - 일반 행정
INSERT INTO employee_roles (code, name, description, permissions, created_at, updated_at)
VALUES (
  'office-staff',
  '사무원',
  '일반 행정 업무, 비품 관리, 게시판 관리',
  '{
    "dashboard": { "checked": true, "menus": { "dashboard": { "checked": true, "screens": { "DashboardOverview": { "checked": true, "actions": ["read"] } } } } },
    "resident": { "checked": true, "menus": { "resident-info": { "checked": true, "screens": { "ResidentManagement": { "checked": true, "actions": ["read", "export"] } } } } },
    "operations": { "checked": true, "menus": { "vehicle": { "checked": true, "screens": { "VehicleManagement": { "checked": true, "actions": ["read", "write", "update"] } } }, "asset": { "checked": true, "screens": { "AssetManagement": { "checked": true, "actions": ["read", "write", "update", "export"] } } } } },
    "care": { "checked": false, "menus": {} },
    "staff": { "checked": false, "menus": {} },
    "accounting": { "checked": false, "menus": {} },
    "system": { "checked": false, "menus": {} }
  }'::jsonb,
  now(),
  now()
) ON CONFLICT (code) DO NOTHING;

-- 3.7. 조리원 (Cook) - 식단
INSERT INTO employee_roles (code, name, description, permissions, created_at, updated_at)
VALUES (
  'cook',
  '조리원',
  '식단표 관리 및 급식 운영',
  '{
    "dashboard": { "checked": true, "menus": { "dashboard": { "checked": true, "screens": { "DashboardOverview": { "checked": true, "actions": ["read"] } } } } },
    "care": { "checked": true, "menus": { "care-reports": { "checked": true, "screens": { "ReportMedication": { "checked": false }, "ReportNursing": { "checked": false }, "ReportPressureUlcer": { "checked": false }, "ReportClinic": { "checked": false }, "ReportElimination": { "checked": false } } } } },
    "resident": { "checked": false, "menus": {} },
    "operations": { "checked": false, "menus": {} },
    "staff": { "checked": false, "menus": {} },
    "accounting": { "checked": false, "menus": {} },
    "system": { "checked": false, "menus": {} }
  }'::jsonb,
  now(),
  now()
) ON CONFLICT (code) DO NOTHING;


-- 3.8. 일반 직원 (General Staff) - 뷰어
INSERT INTO employee_roles (code, name, description, permissions, created_at, updated_at)
VALUES (
  'general-staff',
  '일반 직원',
  '기본 조회 권한만 보유한 일반 직원',
  '{
    "dashboard": { "checked": true, "menus": { "dashboard": { "checked": true, "screens": { "DashboardOverview": { "checked": true, "actions": ["read"] } } } } },
    "resident": { "checked": false, "menus": {} },
    "care": { "checked": false, "menus": {} },
    "operations": { "checked": false, "menus": {} },
    "staff": { "checked": false, "menus": {} },
    "accounting": { "checked": false, "menus": {} },
    "system": { "checked": false, "menus": {} }
  }'::jsonb,
  now(),
  now()
) ON CONFLICT (code) DO NOTHING;


-- ============================================
-- 4. 직원 정보 (Employees)
-- ============================================
-- Password Hash: $2b$10$X7V... (Example hash for 'password123!')
-- 실제 환경에서는 bcrypt 등으로 해싱된 값을 사용해야 함. 여기서는 예시 값 사용.

INSERT INTO employees (
  email,
  password_hash,
  name,
  phone_number,
  role_id,
  department_id,
  status,
  is_admin,
  hire_date,
  created_at,
  updated_at
) VALUES
-- 1. 시설장 (Director)
(
  'director@agape.com',
  '$2b$10$EpOkuS8JthXu.0rX5Z/O5.Z3f.Z3f.Z3f.Z3f.Z3f.Z3f.Z3f', -- dummy hash
  '홍길동',
  '010-1111-1111',
  (SELECT id FROM employee_roles WHERE code = 'director'),
  NULL, -- 부서 정보 없음
  'ACTIVE',
  true,
  '2020-01-01',
  now(),
  now()
),
-- 2. 사회복지사 (Social Worker)
(
  'social@agape.com',
  '$2b$10$EpOkuS8JthXu.0rX5Z/O5.Z3f.Z3f.Z3f.Z3f.Z3f.Z3f.Z3f',
  '김복지',
  '010-2222-2222',
  (SELECT id FROM employee_roles WHERE code = 'social-worker'),
  NULL,
  'ACTIVE',
  false,
  '2021-03-01',
  now(),
  now()
),
-- 3. 간호조무사 (Nurse)
(
  'nurse@agape.com',
  '$2b$10$EpOkuS8JthXu.0rX5Z/O5.Z3f.Z3f.Z3f.Z3f.Z3f.Z3f.Z3f',
  '이나이팅',
  '010-3333-3333',
  (SELECT id FROM employee_roles WHERE code = 'nurse'),
  NULL,
  'ACTIVE',
  false,
  '2021-05-15',
  now(),
  now()
),
-- 4. 요양보호사 (Care Worker)
(
  'care@agape.com',
  '$2b$10$EpOkuS8JthXu.0rX5Z/O5.Z3f.Z3f.Z3f.Z3f.Z3f.Z3f.Z3f',
  '박사랑',
  '010-4444-4444',
  (SELECT id FROM employee_roles WHERE code = 'care-worker'),
  NULL,
  'ACTIVE',
  false,
  '2022-01-10',
  now(),
  now()
),
-- 5. 사무원 (Office Staff)
(
  'office@agape.com',
  '$2b$10$EpOkuS8JthXu.0rX5Z/O5.Z3f.Z3f.Z3f.Z3f.Z3f.Z3f.Z3f',
  '최행정',
  '010-5555-5555',
  (SELECT id FROM employee_roles WHERE code = 'office-staff'),
  NULL,
  'ACTIVE',
  false,
  '2022-08-20',
  now(),
  now()
)
ON CONFLICT (email) DO NOTHING;


-- ============================================
-- 5. 생활실 및 배정 (Rooms & Assignments)
-- ============================================

DO $$
DECLARE
  v_facility_id BIGINT;
  v_residents_count INT;
BEGIN
  -- 1) 시설 ID 조회
  SELECT id INTO v_facility_id FROM facilities LIMIT 1;

  -- 2) 생활실 데이터 적재 (이미지 참조)
  -- 1층
  INSERT INTO rooms (facility_id, floor, room_name, capacity) VALUES
  (v_facility_id, '1층', '1층', 41),
  (v_facility_id, '1층', '1층(4)', 4),
  (v_facility_id, '1층', '계양새일요양원4', 4),
  (v_facility_id, '1층', '여가생활', 4),
  (v_facility_id, '1층', '홍길동', 1)
  ON CONFLICT DO NOTHING;

  -- 2층
  INSERT INTO rooms (facility_id, floor, room_name, capacity) VALUES
  (v_facility_id, '2층', '2층', 8),
  (v_facility_id, '2층', '진달래개나리', 2),
  (v_facility_id, '2층', '계양새일요양원6', 4)
  ON CONFLICT DO NOTHING;

  -- 3) 입소자 배정 (Resident Rooms)
  -- residents 테이블에 데이터가 있다고 가정하고, 순차적으로 방에 배정
  -- 만약 residents 데이터가 없다면 배정 데이터는 생성되지 않음

  SELECT COUNT(*) INTO v_residents_count FROM residents;

  IF v_residents_count > 0 THEN
    -- 간단한 로직: 모든 방에 대해 용량이 허용하는 만큼 입소자 순차 배정
    -- (복잡한 로직 대신 데모용 랜덤/순차 배정)
    INSERT INTO resident_rooms (resident_id, room_id, starts_at, is_primary)
    SELECT
      r.id,
      rm.id,
      CURRENT_DATE,
      true
    FROM residents r
    CROSS JOIN LATERAL (
      SELECT id FROM rooms ORDER BY random() LIMIT 1
    ) rm
    WHERE NOT EXISTS (SELECT 1 FROM resident_rooms rr WHERE rr.resident_id = r.id)
    LIMIT v_residents_count; -- 모든 입소자 배정 시도
  END IF;

END$$;

-- ============================================
-- 추가 서비스 샘플 데이터
-- ============================================

-- 알림 템플릿 샘플 데이터
INSERT INTO notification_templates (name, category, channel, content, variables, status, usage_count) VALUES
  ('입소 환영 안내', '입소안내', 'SMS', '안녕하세요, {{name}}님. 계양새일요양원에 오신 것을 환영합니다. 입소일: {{date}}', '["{{name}}", "{{date}}"]', 'ACTIVE', 12),
  ('투약 알림', '투약알림', 'SMS', '{{name}}님의 {{time}} 투약 시간입니다. 담당 직원이 방문할 예정입니다.', '["{{name}}", "{{time}}"]', 'ACTIVE', 45),
  ('면회 예약 확인', '면회안내', 'SMS', '{{guardian_name}}님, {{date}} {{time}} 면회 예약이 확인되었습니다. 방문 시 입구에서 방문자 등록을 해주세요.', '["{{guardian_name}}", "{{date}}", "{{time}}"]', 'ACTIVE', 8),
  ('긴급 상황 알림', '긴급', 'SMS', '긴급 알림: {{resident_name}}님께서 {{situation}} 상황이 발생하였습니다. 즉시 연락 바랍니다. 연락처: {{phone}}', '["{{resident_name}}", "{{situation}}", "{{phone}}"]', 'ACTIVE', 3),
  ('월간 생활 보고', '생활보고', 'EMAIL', '안녕하세요 {{guardian_name}}님, {{month}}월 {{resident_name}}님의 생활 보고서를 전달드립니다.\n\n건강상태: {{health_status}}\n주요 활동: {{activities}}', '["{{guardian_name}}", "{{month}}", "{{resident_name}}", "{{health_status}}", "{{activities}}"]', 'ACTIVE', 22),
  ('연말 인사 템플릿', '기타', 'SMS', '{{name}}님, 한 해 동안 계양새일요양원을 믿고 맡겨주셔서 감사합니다. 새해 복 많이 받으세요!', '["{{name}}"]', 'INACTIVE', 1)
ON CONFLICT DO NOTHING;

-- 수신자 그룹 샘플 데이터
INSERT INTO recipient_groups (name, description, type, status, member_count, usage_count) VALUES
  ('전체 보호자', '모든 입소자의 보호자 그룹', 'GUARDIAN', 'ACTIVE', 29, 15),
  ('전체 직원', '모든 재직 직원 그룹', 'STAFF', 'ACTIVE', 22, 8),
  ('1층 보호자', '1층 생활실 입소자 보호자', 'GUARDIAN', 'ACTIVE', 15, 3),
  ('2층 보호자', '2층 생활실 입소자 보호자', 'GUARDIAN', 'ACTIVE', 14, 2),
  ('치매 입소자 보호자', '치매 진단 입소자 보호자 그룹', 'GUARDIAN', 'ACTIVE', 12, 5),
  ('요양보호사팀', '요양보호사 직원 그룹', 'STAFF', 'ACTIVE', 15, 4)
ON CONFLICT DO NOTHING;

-- 문자 크레딧 샘플 데이터 (초기 충전 + 일부 차감)
INSERT INTO sms_credits (balance, deducted_amount, method, description, created_at) VALUES
  (1000, -1000, 'SMS', '초기 크레딧 충전', NOW() - INTERVAL '30 days'),
  (998, 2, 'SMS', '테스트 발송', NOW() - INTERVAL '25 days'),
  (985, 13, 'SMS', '입소 안내 발송 (13건)', NOW() - INTERVAL '20 days'),
  (982, 3, 'LMS', '긴급 알림 발송 (1건)', NOW() - INTERVAL '15 days'),
  (960, 22, 'SMS', '월간 보고 알림 (22건)', NOW() - INTERVAL '7 days'),
  (957, 3, 'SMS', '면회 예약 확인 (3건)', NOW() - INTERVAL '2 days')
ON CONFLICT DO NOTHING;

-- 자료실 파일 샘플 데이터
INSERT INTO facility_files (name, category, file_url, file_type, size, uploaded_by, created_at) VALUES
  ('2026년 케어플랜 양식', '케어플랜', '/files/careplan-2026.xlsx', 'xlsx', 245760, '관리자', NOW() - INTERVAL '60 days'),
  ('입소계약서 양식 (최신)', '운영서식', '/files/contract-form-v3.docx', 'docx', 163840, '관리자', NOW() - INTERVAL '45 days'),
  ('장기요양급여 청구 가이드', '행정서류', '/files/insurance-claim-guide.pdf', 'pdf', 1048576, '원장', NOW() - INTERVAL '30 days'),
  ('치매예방 프로그램 교재', '교육자료', '/files/dementia-prevention.pdf', 'pdf', 3145728, '사회복지사', NOW() - INTERVAL '20 days'),
  ('직원 근무 수칙', '행정서류', '/files/staff-work-rules.docx', 'docx', 122880, '관리자', NOW() - INTERVAL '15 days'),
  ('물리치료 안전 지침', '교육자료', '/files/physio-safety-guide.pdf', 'pdf', 819200, '물리치료사', NOW() - INTERVAL '10 days'),
  ('2025년 결산 보고서', '행정서류', '/files/annual-report-2025.xlsx', 'xlsx', 491520, '원장', NOW() - INTERVAL '5 days'),
  ('어르신 인지활동 프로그램', '교육자료', '/files/cognitive-program.pdf', 'pdf', 2097152, '사회복지사', NOW() - INTERVAL '3 days')
ON CONFLICT DO NOTHING;

-- ============================================
-- 입소자 관련 샘플 데이터
-- ============================================

DO $$
DECLARE
  v_resident_1 BIGINT;
  v_resident_2 BIGINT;
  v_resident_3 BIGINT;
  v_resident_4 BIGINT;
  v_emp_id     BIGINT;
BEGIN

  -- 직원 ID 조회 (상담자/평가자용)
  SELECT id INTO v_emp_id FROM employees LIMIT 1;

  -- ========================================
  -- 1. 입소자 (Residents) - 4명
  -- ========================================
  INSERT INTO residents (code, name, birthday, gender, admission_date, status, guardian_name, guardian_phone, memo, meta)
  VALUES
    ('R-2026-001', '가나다', '1945-01-15', 'F', '2026-01-23', 'ADMITTED', '가보호자', '010-1111-2222',
     '관절염, 약간의 인지저하, 당뇨있음',
     '{"grade":"3","gradeValidUntil":"2027-01-14","copayRate":15,"mainDiseases":["관절염","인지저하","당뇨"],"mobility":"보행기","cognition":"경도 인지저하","mealStatus":"부분 도움","toiletStatus":"부분 도움"}'
    ),
    ('R-2026-002', '나가다', '1938-07-22', 'M', '2026-01-15', 'ADMITTED', '나보호자', '010-2222-3333',
     '뇌졸중 후유증, 편마비',
     '{"grade":"2","gradeValidUntil":"2026-12-31","copayRate":12,"mainDiseases":["뇌졸중","편마비"],"mobility":"휠체어","cognition":"정상","mealStatus":"전적 도움","toiletStatus":"기저귀 사용"}'
    ),
    ('R-2026-003', '다가나', '1942-03-10', 'F', '2025-11-01', 'ADMITTED', '다보호자', '010-3333-4444',
     '치매(중등도), 당뇨, 고혈압',
     '{"grade":"4","gradeValidUntil":"2027-06-30","copayRate":0,"mainDiseases":["치매","당뇨","고혈압"],"mobility":"보행 가능","cognition":"중등도 인지저하","mealStatus":"부분 도움","toiletStatus":"부분 도움"}'
    ),
    ('R-2026-004', '라가나', '1950-09-05', 'M', '2026-02-01', 'ON_LEAVE', '라보호자', '010-4444-5555',
     '파킨슨병, 우울증',
     '{"grade":"2","gradeValidUntil":"2026-10-15","copayRate":8,"mainDiseases":["파킨슨병","우울증"],"mobility":"보행기","cognition":"경도 인지저하","mealStatus":"자립","toiletStatus":"자립"}'
    )
  ON CONFLICT (code) DO NOTHING;

  -- ID 조회
  SELECT id INTO v_resident_1 FROM residents WHERE code = 'R-2026-001';
  SELECT id INTO v_resident_2 FROM residents WHERE code = 'R-2026-002';
  SELECT id INTO v_resident_3 FROM residents WHERE code = 'R-2026-003';
  SELECT id INTO v_resident_4 FROM residents WHERE code = 'R-2026-004';

  -- 입소자가 생성된 경우에만 연관 데이터 삽입
  IF v_resident_1 IS NOT NULL THEN

    -- ========================================
    -- 2. 입소자 방 배정 (Resident Rooms)
    -- ========================================
    INSERT INTO resident_rooms (resident_id, room_id, starts_at, is_primary)
    SELECT v_resident_1, id, '2026-01-23', true FROM rooms WHERE room_name = '1층' LIMIT 1
    ON CONFLICT DO NOTHING;

    INSERT INTO resident_rooms (resident_id, room_id, starts_at, is_primary)
    SELECT v_resident_2, id, '2026-01-15', true FROM rooms WHERE room_name = '2층' LIMIT 1
    ON CONFLICT DO NOTHING;

    INSERT INTO resident_rooms (resident_id, room_id, starts_at, is_primary)
    SELECT v_resident_3, id, '2025-11-01', true FROM rooms WHERE room_name = '1층(4)' LIMIT 1
    ON CONFLICT DO NOTHING;

    INSERT INTO resident_rooms (resident_id, room_id, starts_at, is_primary)
    SELECT v_resident_4, id, '2026-02-01', true FROM rooms WHERE room_name = '진달래개나리' LIMIT 1
    ON CONFLICT DO NOTHING;

    -- ========================================
    -- 3. 보호자/연락처 (Resident Contacts)
    -- ========================================
    INSERT INTO resident_contacts (resident_id, name, relationship, phone_number, email, address, is_primary, receive_notice)
    VALUES
      (v_resident_1, '가보호자', '딸', '010-1111-2222', 'guardian1@email.com', '서울시 강남구 테헤란로 1길', true, true),
      (v_resident_2, '나보호자', '아들', '010-2222-3333', 'guardian2@email.com', '서울시 서초구 반포대로 2길', true, true),
      (v_resident_3, '다보호자', '아들', '010-3333-4444', 'guardian3@email.com', '인천시 부평구 부평대로 3길', true, false),
      (v_resident_4, '라보호자', '배우자', '010-4444-5555', 'guardian4@email.com', '서울시 마포구 홍대입구로 4길', true, true)
    ON CONFLICT DO NOTHING;

    -- ========================================
    -- 4. 투약 정보 (Resident Medications)
    -- ========================================
    INSERT INTO resident_medications (resident_id, prescribed_by, drug_name, dosage, schedule, start_date, end_date)
    VALUES
      (v_resident_1, '김내과', '메트포르민', '500mg', '아침·저녁 식후', '2026-01-23', NULL),
      (v_resident_1, '이정형외과', '세레콕시브', '200mg', '저녁 식후', '2026-01-23', '2026-06-30'),
      (v_resident_2, '박신경외과', '아스피린', '100mg', '아침 식후', '2026-01-15', NULL),
      (v_resident_3, '최신경과', '도네페질', '10mg', '저녁 취침 전', '2025-11-01', NULL),
      (v_resident_3, '최신경과', '메트포르민', '500mg', '아침·점심·저녁 식후', '2025-11-01', NULL),
      (v_resident_4, '한신경과', '레보도파', '100mg', '아침·점심·저녁 식후 1시간 전', '2026-02-01', NULL)
    ON CONFLICT DO NOTHING;

    -- ========================================
    -- 5. 기초평가 (Resident Assessments)
    -- ========================================
    -- assessed_by는 NULL 허용이지만 v_emp_id가 있는 경우에만 FK 값 설정
    -- 낙상위험도 평가 (Huhn Scale) - 가나다, 나가다
    INSERT INTO resident_assessments (resident_id, assessed_by, assessment_type, assessment_round, reason, assessed_at, scores, total_score, risk_level, notes)
    VALUES
      (v_resident_1, CASE WHEN v_emp_id IS NOT NULL THEN v_emp_id ELSE NULL END,
       'FALL_RISK', 1, 'INITIAL', '2026-01-24',
       '{"age":3,"mental":1,"elimination":2,"fall_history":0,"activity":2,"gait":2,"medication":1}',
       11, '고위험', '낙상 경험 없으나 보행기 사용으로 주의 필요'),
      (v_resident_2, CASE WHEN v_emp_id IS NOT NULL THEN v_emp_id ELSE NULL END,
       'FALL_RISK', 1, 'INITIAL', '2026-01-16',
       '{"age":4,"mental":0,"elimination":3,"fall_history":2,"activity":3,"gait":3,"medication":2}',
       17, '고위험', '편마비로 낙상 위험 매우 높음, 1인 도움 필수'),
      -- 욕창위험도 평가 (Braden Scale) - 나가다
      (v_resident_2, CASE WHEN v_emp_id IS NOT NULL THEN v_emp_id ELSE NULL END,
       'BEDSORE', 1, 'INITIAL', '2026-01-16',
       '{"sensory":2,"moisture":2,"activity":1,"mobility":2,"nutrition":2,"friction":1}',
       10, '고위험', '와상 상태로 2시간마다 체위 변경 필요')
    ON CONFLICT DO NOTHING;

    -- ========================================
    -- 6. 상담일지 (Consultation Records)
    -- ========================================
    INSERT INTO consultation_records (resident_id, counselor_id, consulted_at, type, channel, summary, details, follow_up_date)
    VALUES
      (v_resident_1, CASE WHEN v_emp_id IS NOT NULL THEN v_emp_id ELSE NULL END,
       NOW() - INTERVAL '30 days', 'FAMILY', '전화',
       '입소 초기 적응 상담 - 보호자 면담',
       '보호자(딸)와 전화 상담. 입소 후 초기 적응 상황 설명. 식사량 양호, 수면 패턴 안정 중. 관절 통증 약물 복용 중임을 확인.',
       (CURRENT_DATE + INTERVAL '30 days')::DATE),
      (v_resident_3, CASE WHEN v_emp_id IS NOT NULL THEN v_emp_id ELSE NULL END,
       NOW() - INTERVAL '15 days', 'GENERAL', '대면',
       '치매 증상 변화 상담 - 가족 직접 방문',
       '보호자(아들)가 직접 방문하여 어머니의 최근 인지 상태 변화에 대해 상담. 야간 배회 증상이 일부 개선됨. 음악 프로그램 참여 후 정서 안정 효과 확인.',
       NULL),
      (v_resident_4, CASE WHEN v_emp_id IS NOT NULL THEN v_emp_id ELSE NULL END,
       NOW() - INTERVAL '5 days', 'MEDICAL', '대면',
       '파킨슨 증상 경과 및 투약 조정 상담',
       '담당 의사 방문 진료 후 레보도파 복용 시간 조정. 최근 진전 증상 다소 악화되어 추적 관찰 필요. 보호자에게 약물 변경 사항 고지.',
       (CURRENT_DATE + INTERVAL '14 days')::DATE)
    ON CONFLICT DO NOTHING;

    -- ========================================
    -- 7. 비급여/기타 항목 (Resident Extra Costs)
    -- ========================================
    INSERT INTO resident_extra_costs (resident_id, created_by, year_month, item_name, unit_price, quantity, total_amount, occurred_at)
    VALUES
      (v_resident_1, CASE WHEN v_emp_id IS NOT NULL THEN v_emp_id ELSE NULL END, '2026-02', '식재료비(석식)', 3500, 25, 87500, '2026-02-28'),
      (v_resident_2, CASE WHEN v_emp_id IS NOT NULL THEN v_emp_id ELSE NULL END, '2026-02', '식재료비(석식)', 3500, 25, 87500, '2026-02-28'),
      (v_resident_2, CASE WHEN v_emp_id IS NOT NULL THEN v_emp_id ELSE NULL END, '2026-02', '물리치료비(개인)', 15000, 4, 60000, '2026-02-28'),
      (v_resident_3, CASE WHEN v_emp_id IS NOT NULL THEN v_emp_id ELSE NULL END, '2026-02', '식재료비(석식)', 3500, 25, 87500, '2026-02-28')
    ON CONFLICT DO NOTHING;

    -- ========================================
    -- 8. 본인부담금 (Resident Payments)
    -- ========================================
    INSERT INTO resident_payments (resident_id, payment_month, claim_amount, paid_amount, unpaid_amount, deposit_date, depositor_name, payment_method)
    VALUES
      (v_resident_1, '2026-01', 191690, 191690, 0, '2026-02-05', '가보호자', 'BANK_TRANSFER'),
      (v_resident_2, '2026-01', 245780, 245780, 0, '2026-02-03', '나보호자', 'BANK_TRANSFER'),
      (v_resident_3, '2026-01', 0, 0, 0, NULL, NULL, NULL),
      (v_resident_4, '2026-01', 178900, 0, 178900, NULL, NULL, NULL)
    ON CONFLICT DO NOTHING;

  END IF;

END$$;

-- 완료 메시지
DO $$
BEGIN
  RAISE NOTICE '========================================';
  RAISE NOTICE 'Admin 설정 및 권한 샘플 데이터 생성 완료 (41-admin-seed.sql)';
  RAISE NOTICE '  - Facilities: 1건';
  RAISE NOTICE '  - Site Infos: 1건';
  RAISE NOTICE '  - Employee Roles: 8건';
  RAISE NOTICE '  - Rooms: 생활실 데이터 (1층, 2층)';
  RAISE NOTICE '  - Resident Rooms: 입소자 배정 처리 완료';
  RAISE NOTICE '  - Notification Templates: 6건';
  RAISE NOTICE '  - Recipient Groups: 6건';
  RAISE NOTICE '  - SMS Credits: 6건 (이력)';
  RAISE NOTICE '  - Facility Files: 8건';
  RAISE NOTICE '  [입소자 관련]';
  RAISE NOTICE '  - Residents: 4명 (가나다, 나가다, 다가나, 라가나)';
  RAISE NOTICE '  - Resident Contacts (보호자): 4건';
  RAISE NOTICE '  - Resident Medications (투약): 6건';
  RAISE NOTICE '  - Resident Assessments (기초평가): 3건';
  RAISE NOTICE '  - Consultation Records (상담일지): 3건';
  RAISE NOTICE '  - Resident Extra Costs (비급여): 4건';
  RAISE NOTICE '  - Resident Payments (본인부담금): 4건';
  RAISE NOTICE '========================================';
END$$;
