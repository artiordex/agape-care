-- Description : 31-admin.sql - ?? ?????? DDL ? ?? ????
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

-- ============================================
-- 5. 알림 템플릿 조회 뷰
-- ============================================
CREATE OR REPLACE VIEW v_admin_notification_templates AS
SELECT
  t.id,
  t.name,
  t.category,
  t.channel,
  t.content,
  t.variables,
  t.status,
  t.usage_count,
  t.created_by,
  e.name AS created_by_name,
  t.created_at,
  t.updated_at
FROM notification_templates t
LEFT JOIN employees e ON e.id = t.created_by;

COMMENT ON VIEW v_admin_notification_templates IS 'Admin 알림 템플릿 조회 뷰 - 생성자 이름 포함';

-- ============================================
-- 6. 알림 캠페인 조회 뷰
-- ============================================
CREATE OR REPLACE VIEW v_admin_notification_campaigns AS
SELECT
  c.id,
  c.campaign_name,
  c.purpose,
  c.title,
  c.body,
  c.channel,
  c.send_type,
  c.scheduled_at,
  c.sent_at,
  c.status,
  c.recipient_count,
  c.template_id,
  t.name AS template_name,
  c.recipient_group_id,
  rg.name AS recipient_group_name,
  c.created_by,
  e.name AS created_by_name,
  c.created_at,
  c.updated_at
FROM notification_campaigns c
LEFT JOIN notification_templates t ON t.id = c.template_id
LEFT JOIN recipient_groups rg ON rg.id = c.recipient_group_id
LEFT JOIN employees e ON e.id = c.created_by;

COMMENT ON VIEW v_admin_notification_campaigns IS 'Admin 알림 캠페인 조회 뷰 - 템플릿, 수신자 그룹, 생성자 정보 포함';

-- ============================================
-- 7. 수신자 그룹 조회 뷰
-- ============================================
CREATE OR REPLACE VIEW v_admin_recipient_groups AS
SELECT
  rg.id,
  rg.name,
  rg.description,
  rg.type,
  rg.status,
  rg.member_count,
  rg.usage_count,
  rg.last_used_at,
  rg.created_by,
  e.name AS created_by_name,
  rg.created_at,
  rg.updated_at
FROM recipient_groups rg
LEFT JOIN employees e ON e.id = rg.created_by;

COMMENT ON VIEW v_admin_recipient_groups IS 'Admin 수신자 그룹 조회 뷰 - 생성자 이름 포함';

-- ============================================
-- 8. 자료실 파일 조회 뷰
-- ============================================
CREATE OR REPLACE VIEW v_admin_facility_files AS
SELECT
  ff.id,
  ff.name,
  ff.category,
  ff.file_url,
  ff.file_type,
  ff.size,
  -- 파일 크기를 읽기 쉬운 형식으로 변환
  CASE
    WHEN ff.size >= 1073741824 THEN ROUND(ff.size / 1073741824.0, 1)::TEXT || ' GB'
    WHEN ff.size >= 1048576 THEN ROUND(ff.size / 1048576.0, 1)::TEXT || ' MB'
    WHEN ff.size >= 1024 THEN ROUND(ff.size / 1024.0, 1)::TEXT || ' KB'
    ELSE ff.size::TEXT || ' B'
  END AS size_readable,
  ff.uploaded_by,
  ff.created_at
FROM facility_files ff;

COMMENT ON VIEW v_admin_facility_files IS 'Admin 자료실 파일 조회 뷰 - 파일 크기를 읽기 쉬운 형식으로 변환';

-- ============================================
-- 9. 입소자 관련 Admin Views
-- ============================================

-- v_admin_residents: 입소자 목록 (현재 방 + 보호자 정보 포함)
CREATE OR REPLACE VIEW v_admin_residents AS
SELECT
  r.id,
  r.code,
  r.name,
  r.birthday,
  r.gender,
  r.admission_date,
  r.discharge_date,
  r.status,
  r.guardian_name,
  r.guardian_phone,
  r.memo,
  r.meta,
  r.created_at,
  r.updated_at,
  -- 현재 배정된 방 정보
  rr.room_id,
  rm.room_name,
  rm.floor,
  -- 주 보호자 연락처
  rc.name    AS primary_guardian_name,
  rc.phone_number AS primary_guardian_phone,
  rc.relationship AS primary_guardian_relation,
  rc.receive_notice AS guardian_receive_notice
FROM residents r
LEFT JOIN resident_rooms rr
  ON rr.resident_id = r.id
  AND rr.is_primary = TRUE
  AND rr.ends_at IS NULL
LEFT JOIN rooms rm ON rm.id = rr.room_id
LEFT JOIN resident_contacts rc
  ON rc.resident_id = r.id
  AND rc.is_primary = TRUE;

COMMENT ON VIEW v_admin_residents IS 'Admin 입소자 목록 - 현재 배정된 방 및 주 보호자 정보 포함';


-- v_admin_resident_assessments: 기초평가 이력 (입소자명, 평가자명 포함)
CREATE OR REPLACE VIEW v_admin_resident_assessments AS
SELECT
  ra.id,
  ra.resident_id,
  ra.assessed_by,
  ra.assessment_type,
  ra.assessment_round,
  ra.reason,
  ra.assessed_at,
  ra.scores,
  ra.total_score,
  ra.risk_level,
  ra.notes,
  ra.created_at,
  ra.updated_at,
  -- 입소자 정보
  r.name     AS resident_name,
  r.birthday AS resident_birthday,
  r.gender   AS resident_gender,
  -- 방 정보
  rm.room_name,
  -- 평가자 정보
  e.name     AS assessor_name
FROM resident_assessments ra
JOIN residents r ON r.id = ra.resident_id
LEFT JOIN resident_rooms rr
  ON rr.resident_id = r.id
  AND rr.is_primary = TRUE
  AND rr.ends_at IS NULL
LEFT JOIN rooms rm ON rm.id = rr.room_id
LEFT JOIN employees e ON e.id = ra.assessed_by;

COMMENT ON VIEW v_admin_resident_assessments IS 'Admin 기초평가 이력 - 입소자명, 방, 평가자명 포함';


-- v_admin_consultation_records: 상담일지 (입소자명, 상담자명 포함)
CREATE OR REPLACE VIEW v_admin_consultation_records AS
SELECT
  cr.id,
  cr.resident_id,
  cr.counselor_id,
  cr.consulted_at,
  cr.type,
  cr.channel,
  cr.summary,
  cr.details,
  cr.follow_up_date,
  cr.created_at,
  -- 입소자 정보
  r.name  AS resident_name,
  r.gender AS resident_gender,
  -- 상담자 정보
  e.name  AS counselor_name
FROM consultation_records cr
JOIN residents r ON r.id = cr.resident_id
LEFT JOIN employees e ON e.id = cr.counselor_id;

COMMENT ON VIEW v_admin_consultation_records IS 'Admin 상담일지 - 입소자명 및 상담자명 포함';


-- v_admin_resident_extra_costs: 비급여/기타 내역 (입소자명, 방 포함)
CREATE OR REPLACE VIEW v_admin_resident_extra_costs AS
SELECT
  ec.id,
  ec.resident_id,
  ec.created_by,
  ec.year_month,
  ec.item_name,
  ec.unit_price,
  ec.quantity,
  ec.total_amount,
  ec.occurred_at,
  ec.notes,
  ec.created_at,
  ec.updated_at,
  -- 입소자 정보
  r.name     AS resident_name,
  r.gender   AS resident_gender,
  -- 방 정보
  rm.room_name
FROM resident_extra_costs ec
JOIN residents r ON r.id = ec.resident_id
LEFT JOIN resident_rooms rr
  ON rr.resident_id = r.id
  AND rr.is_primary = TRUE
  AND rr.ends_at IS NULL
LEFT JOIN rooms rm ON rm.id = rr.room_id;

COMMENT ON VIEW v_admin_resident_extra_costs IS 'Admin 비급여/기타 내역 - 입소자명 및 방 정보 포함';


-- 완료 메시지
DO $$
BEGIN
  RAISE NOTICE '========================================';
  RAISE NOTICE 'Admin View 생성 완료 (31-admin-views.sql)';
  RAISE NOTICE '  [알림/시설]';
  RAISE NOTICE '  - v_admin_facilities';
  RAISE NOTICE '  - v_admin_site_settings';
  RAISE NOTICE '  - v_admin_employees';
  RAISE NOTICE '  - v_admin_employee_permissions';
  RAISE NOTICE '  - v_admin_notification_templates';
  RAISE NOTICE '  - v_admin_notification_campaigns';
  RAISE NOTICE '  - v_admin_recipient_groups';
  RAISE NOTICE '  - v_admin_facility_files';
  RAISE NOTICE '  [입소자 관리]';
  RAISE NOTICE '  - v_admin_residents';
  RAISE NOTICE '  - v_admin_resident_assessments';
  RAISE NOTICE '  - v_admin_consultation_records';
  RAISE NOTICE '  - v_admin_resident_extra_costs';
  RAISE NOTICE '총 12개 Admin View 생성 완료';
  RAISE NOTICE '========================================';
END$$;
