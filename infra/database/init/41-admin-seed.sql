-- Description : 41-admin-seed.sql - 📌 Admin 시스템 설정 및 권한(RBAC) 샘플 데이터
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
  RAISE NOTICE '========================================';
END$$;
