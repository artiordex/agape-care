-- Description : 31-admin-views.sql - ⚙️ Admin 관리자용 View
-- Author : Shiwoo Min
-- Date : 2026-02-17
-- Purpose : Admin에서 시스템 설정 및 데이터 관리를 효율적으로 하기 위한 가상 뷰

-- ============================================
-- 1. 시설 정보 조회 뷰
-- ============================================
CREATE OR REPLACE VIEW v_admin_facilities AS
SELECT
  f.id,
  f.org_code,
  f.facility_name,
  f.facility_desc,
  f.facility_type,
  f.designated_date,
  f.director,
  f.director_phone,
  f.ceo_name,
  f.business_no,
  f.biz_type,
  f.staff_count,
  f.phone,
  f.fax,
  f.email,
  f.homepage,
  f.zip,
  f.address1,
  f.address2,
  f.total_capacity,
  f.short_stay_capacity,
  f.day_care_capacity,
  f.stamp_image,
  f.created_at,
  f.updated_at
FROM facilities f;

COMMENT ON VIEW v_admin_facilities IS 'Admin 시설 정보 조회 뷰 - 시설 기본 정보 제공';

-- ============================================
-- 2. 사이트 설정 조회 뷰
-- ============================================
CREATE OR REPLACE VIEW v_admin_site_settings AS
SELECT
  s.id,
  s.service_name,
  s.service_desc,
  s.contact_phone,
  s.contact_email,
  s.customer_hours,
  s.meta_title,
  s.meta_description,
  s.meta_keywords,
  s.footer_text,
  s.legal_notice,
  s.updated_by,
  e.name AS updater_name,
  s.created_at,
  s.updated_at
FROM site_infos s
LEFT JOIN employees e ON e.id = s.updated_by;

COMMENT ON VIEW v_admin_site_settings IS 'Admin 사이트 설정 조회 뷰 - 수정자 정보 포함';

-- ============================================
-- 3. 직원 목록 조회 뷰 (관리자용)
-- ============================================
CREATE OR REPLACE VIEW v_admin_employees AS
SELECT
  e.id,
  e.name,
  e.email,
  e.phone_number,
  e.department_id,
  d.name AS department_name,
  e.role_id,
  r.name AS role_name,
  e.status,
  e.is_admin,
  e.hire_date,
  e.resign_date,
  e.last_login_at,
  e.created_at,
  e.updated_at,
  -- 권한 보유 여부 확인
  CASE
    WHEN ep.id IS NOT NULL THEN true
    ELSE false
  END AS has_custom_permissions
FROM employees e
LEFT JOIN departments d ON d.id = e.department_id
LEFT JOIN employee_roles r ON r.id = e.role_id
LEFT JOIN employee_permissions ep ON ep.employee_id = e.id;

COMMENT ON VIEW v_admin_employees IS 'Admin 직원 목록 조회 뷰 - 부서, 직급, 커스텀 권한 여부 포함';

-- ============================================
-- 4. 직원 개인 권한 상세 조회 뷰
-- ============================================
CREATE OR REPLACE VIEW v_admin_employee_permissions AS
SELECT
  ep.id,
  ep.employee_id,
  e.name AS employee_name,
  e.email AS employee_email,
  d.name AS department_name,
  r.name AS base_role_name,
  ep.role_id AS override_role_id,
  or_role.name AS override_role_name,
  ep.permissions,
  ep.updated_by,
  updater.name AS updater_name,
  ep.created_at,
  ep.updated_at
FROM employee_permissions ep
JOIN employees e ON e.id = ep.employee_id
LEFT JOIN departments d ON d.id = e.department_id
LEFT JOIN employee_roles r ON r.id = e.role_id
LEFT JOIN employee_roles or_role ON or_role.id = ep.role_id
LEFT JOIN employees updater ON updater.id = ep.updated_by;

COMMENT ON VIEW v_admin_employee_permissions IS 'Admin 직원 개인 권한 상세 조회 뷰 - 직원 기본 정보 및 베이스 역할 정보 포함';

-- 완료 메시지
DO $$
BEGIN
  RAISE NOTICE '========================================';
  RAISE NOTICE 'Admin View 생성 완료 (31-admin-views.sql)';
  RAISE NOTICE '  - v_admin_facilities';
  RAISE NOTICE '  - v_admin_site_settings';
  RAISE NOTICE '  - v_admin_employees';
  RAISE NOTICE '  - v_admin_employee_permissions';
  RAISE NOTICE '========================================';
END$$;
