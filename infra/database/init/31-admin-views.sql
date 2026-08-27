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


-- ============================================
-- 10. 급여 관련 Admin Views
-- ============================================

-- v_admin_payroll_records: 급여 대장 (직원명, 부서명 포함)
CREATE OR REPLACE VIEW v_admin_payroll_records AS
SELECT
  pr.id,
  pr.employee_id,
  e.name            AS employee_name,
  d.name            AS department_name,
  r.name            AS role_name,
  to_char(pr.period_start, 'YYYY-MM') AS year_month,
  pr.period_start,
  pr.period_end,
  pr.base_salary,
  pr.total_allowance,
  pr.total_deduction,
  pr.total_pay,
  pr.net_pay,
  pr.work_days,
  pr.total_work_hours,
  pr.status,
  pr.reflected_to_accounting,
  NULL::BIGINT      AS batch_id,
  NULL::BIGINT      AS confirmed_by,
  NULL::TEXT        AS confirmed_by_name,
  NULL::TIMESTAMPTZ AS confirmed_at,
  pr.paid_at,
  NULL::TEXT        AS notes,
  pr.created_at,
  pr.updated_at
FROM payroll_records pr
JOIN employees e ON e.id = pr.employee_id
LEFT JOIN departments d ON d.id = e.department_id
LEFT JOIN employee_roles r ON r.id = e.role_id;

COMMENT ON VIEW v_admin_payroll_records IS 'Admin 급여 대장 - 직원명, 부서, 직급 포함';


-- v_admin_payroll_batches: 급여 일괄 처리 배치 (처리자명 포함)
CREATE OR REPLACE VIEW v_admin_payroll_batches AS
SELECT
  pb.id,
  pb.pay_month AS year_month,
  pb.status,
  pb.employee_count AS total_employees,
  pb.total_amount,
  pb.processed_by,
  e.name AS processed_by_name,
  pb.processed_at,
  pb.memo AS notes,
  pb.reflected_to_accounting,
  pb.created_at,
  pb.updated_at
FROM payroll_batches pb
LEFT JOIN employees e ON e.id = pb.processed_by;

COMMENT ON VIEW v_admin_payroll_batches IS 'Admin 급여 배치 - 처리자명 포함';


-- v_admin_payroll_settings: 급여 설정 (최신 1건)
CREATE OR REPLACE VIEW v_admin_payroll_settings AS
SELECT
  ps.id,
  ps.employee_id,
  e.name AS employee_name,
  d.name AS department_name,
  r.name AS role_name,
  ps.base_wage,
  ps.hourly_rate,
  ps.wage_type,
  ps.overtime_rate,
  ps.night_bonus_rate,
  ps.meal_allowance,
  ps.transport_allowance,
  ps.position_allowance,
  ps.risk_allowance,
  ps.longevity_allowance,
  ps.insurance_flags,
  ps.tax_flags,
  ps.allowances,
  ps.deductions,
  ps.effective_from,
  ps.effective_until,
  ps.created_at,
  ps.updated_at
FROM payroll_settings ps
LEFT JOIN employees e ON e.id = ps.employee_id
LEFT JOIN departments d ON d.id = e.department_id
LEFT JOIN employee_roles r ON r.id = e.role_id;

COMMENT ON VIEW v_admin_payroll_settings IS 'Admin 급여 설정 - 수정자명 포함';


-- ============================================
-- 11. 인사/근무 관련 Admin Views
-- ============================================

-- v_admin_attendance_records: 근태 기록 (직원명, 부서명 포함)
CREATE OR REPLACE VIEW v_admin_attendance_records AS
SELECT
  ar.id,
  ar.employee_id,
  e.name            AS employee_name,
  d.name            AS department_name,
  r.name            AS role_name,
  ar.work_date,
  ar.check_in_at,
  ar.check_out_at,
  COALESCE((EXTRACT(EPOCH FROM (ar.check_out_at - ar.check_in_at)) / 60)::INT, 0) AS work_minutes,
  NULL::INT        AS overtime_minutes,
  NULL::INT        AS night_minutes,
  ar.status,
  ar.notes,
  ar.created_at,
  ar.updated_at
FROM attendance_records ar
JOIN employees e ON e.id = ar.employee_id
LEFT JOIN departments d ON d.id = e.department_id
LEFT JOIN employee_roles r ON r.id = e.role_id;

COMMENT ON VIEW v_admin_attendance_records IS 'Admin 근태 기록 - 직원명, 부서, 직급 포함';


-- v_admin_leave_requests: 휴가 신청 (직원명, 승인자명 포함)
CREATE OR REPLACE VIEW v_admin_leave_requests AS
SELECT
  lr.id,
  lr.employee_id,
  e.name            AS employee_name,
  d.name            AS department_name,
  lr.type            AS leave_type,
  lr.start_date,
  lr.end_date,
  GREATEST((lr.end_date - lr.start_date) + 1, 1) AS days,
  lr.reason,
  lr.status,
  lr.created_at,
  lr.updated_at,
  -- 최신 승인 정보
  la.approved_by,
  approver.name     AS approved_by_name,
  la.approved_at,
  la.comment        AS approval_comment
FROM leave_requests lr
JOIN employees e ON e.id = lr.employee_id
LEFT JOIN departments d ON d.id = e.department_id
LEFT JOIN leave_approvals la
  ON la.leave_request_id = lr.id
  AND la.id = (
    SELECT MAX(la2.id) FROM leave_approvals la2 WHERE la2.leave_request_id = lr.id
  )
LEFT JOIN employees approver ON approver.id = la.approved_by;

COMMENT ON VIEW v_admin_leave_requests IS 'Admin 휴가 신청 - 직원명, 최신 승인자명 포함';


-- v_admin_shift_assignments: 근무 배정 (직원명, 시프트 템플릿명 포함)
CREATE OR REPLACE VIEW v_admin_shift_assignments AS
SELECT
  sa.id,
  sa.employee_id,
  e.name            AS employee_name,
  d.name            AS department_name,
  sa.shift_template_id AS template_id,
  st.name           AS template_name,
  st.start_time     AS shift_start_time,
  st.end_time       AS shift_end_time,
  sa.work_date      AS assigned_date,
  NULL::TEXT        AS notes,
  sa.created_at,
  sa.updated_at
FROM shift_assignments sa
JOIN employees e ON e.id = sa.employee_id
LEFT JOIN departments d ON d.id = e.department_id
LEFT JOIN shift_templates st ON st.id = sa.shift_template_id;

COMMENT ON VIEW v_admin_shift_assignments IS 'Admin 근무 배정 - 직원명, 시프트 템플릿 정보 포함';


-- ============================================
-- 12. 투약 관련 Admin Views
-- ============================================

-- v_admin_medication_schedules: 투약 스케줄 (입소자명, 약품명 포함)
CREATE OR REPLACE VIEW v_admin_medication_schedules AS
SELECT
  ms.id,
  ms.resident_id,
  r.name            AS resident_name,
  ms.medication_id,
  m.name            AS medication_name,
  m.unit            AS medication_unit,
  ms.dosage          AS dose,
  ms.frequency,
  NULL::TEXT         AS route,
  ms.start_date,
  ms.end_date,
  ms.timing          AS instructions,
  ms.is_active,
  ms.prescribed_by,
  NULL::BIGINT      AS created_by,
  NULL::TEXT        AS created_by_name,
  ms.created_at,
  ms.updated_at
FROM medication_schedules ms
JOIN residents r ON r.id = ms.resident_id
JOIN medications m ON m.id = ms.medication_id;

COMMENT ON VIEW v_admin_medication_schedules IS 'Admin 투약 스케줄 - 입소자명, 약품명 포함';


-- v_admin_medication_records: 투약 기록 (입소자명, 약품명, 투약자명 포함)
CREATE OR REPLACE VIEW v_admin_medication_records AS
SELECT
  mr.id,
  mr.schedule_id,
  mr.resident_id,
  r.name            AS resident_name,
  mr.medication_id,
  m.name            AS medication_name,
  mr.administered_by,
  e.name            AS administered_by_name,
  mr.administered_at,
  NULL::TEXT        AS dose,
  mr.status,
  mr.memo           AS notes,
  mr.created_at
FROM medication_records mr
JOIN residents r ON r.id = mr.resident_id
JOIN medications m ON m.id = mr.medication_id
LEFT JOIN employees e ON e.id = mr.administered_by;

COMMENT ON VIEW v_admin_medication_records IS 'Admin 투약 기록 - 입소자명, 약품명, 투약자명 포함';


-- ============================================
-- 13. 차량 관련 Admin Views
-- ============================================

-- v_admin_vehicles: 차량 목록
CREATE OR REPLACE VIEW v_admin_vehicles AS
SELECT
  v.id,
  v.vehicle_no      AS vehicle_number,
  v.model           AS vehicle_name,
  v.vehicle_type,
  v.purpose,
  v.ownership,
  v.driver,
  v.capacity,
  NULL::TEXT        AS fuel_type,
  v.year            AS manufacture_year,
  v.insurance_company,
  v.insurance_expires AS insurance_expiry,
  v.last_inspection AS inspection_expiry,
  v.status,
  v.notes,
  v.created_at,
  v.updated_at
FROM vehicles v;

COMMENT ON VIEW v_admin_vehicles IS 'Admin 차량 목록';


-- v_admin_vehicle_run_logs: 차량 운행 일지 (차량번호, 직원명 포함)
CREATE OR REPLACE VIEW v_admin_vehicle_run_logs AS
SELECT
  vrl.id,
  vrl.vehicle_id,
  v.vehicle_no      AS vehicle_number,
  v.model           AS vehicle_name,
  vrl.created_by    AS driver_id,
  e.name            AS driver_name,
  vrl.run_date,
  vrl.start_time    AS departure_time,
  vrl.end_time      AS arrival_time,
  NULL::NUMERIC     AS start_mileage,
  NULL::NUMERIC     AS end_mileage,
  vrl.distance      AS distance_km,
  vrl.purpose,
  vrl.destination,
  vrl.passengers,
  vrl.fuel_cost,
  vrl.notes,
  vrl.created_at,
  vrl.created_at    AS updated_at
FROM vehicle_run_logs vrl
JOIN vehicles v ON v.id = vrl.vehicle_id
LEFT JOIN employees e ON e.id = vrl.created_by;

COMMENT ON VIEW v_admin_vehicle_run_logs IS 'Admin 차량 운행 일지 - 차량번호, 운전자명, 주행거리 포함';


-- ============================================
-- 14. CCTV 관련 Admin Views
-- ============================================

-- v_admin_cctv_devices: CCTV 장치 목록 (설치 방 정보 포함)
CREATE OR REPLACE VIEW v_admin_cctv_devices AS
SELECT
  cd.id,
  COALESCE(cd.model, cd.device_no) AS device_name,
  cd.device_no      AS device_code,
  cd.location,
  cd.room_id,
  rm.room_name,
  cd.ip_address,
  NULL::INT         AS port,
  NULL::TEXT        AS stream_url,
  cd.status,
  cd.consent_required,
  cd.install_date   AS installed_at,
  cd.notes,
  cd.created_at,
  cd.updated_at
FROM cctv_devices cd
LEFT JOIN rooms rm ON rm.id = cd.room_id;

COMMENT ON VIEW v_admin_cctv_devices IS 'Admin CCTV 장치 목록 - 설치 방 정보 포함';


-- v_admin_cctv_consents: CCTV 동의 현황 (입소자명, 장치명 포함)
CREATE OR REPLACE VIEW v_admin_cctv_consents AS
SELECT
  cc.id,
  cc.device_id,
  COALESCE(cd.model, cd.device_no) AS device_name,
  cd.location        AS device_location,
  cc.resident_id,
  r.name             AS resident_name,
  cc.consent_by      AS guardian_name,
  NULL::TEXT         AS guardian_phone,
  (cc.consent_type <> 'REVOKED') AS consent_given,
  cc.consent_date    AS consented_at,
  NULL::TIMESTAMPTZ  AS revoked_at,
  cc.conditions      AS notes,
  cc.created_at,
  cc.updated_at
FROM cctv_consents cc
JOIN cctv_devices cd ON cd.id = cc.device_id
JOIN residents r ON r.id = cc.resident_id;

COMMENT ON VIEW v_admin_cctv_consents IS 'Admin CCTV 동의 현황 - 입소자명, 장치명 포함';


-- ============================================
-- 15. 시설 점검 Admin Views
-- ============================================

-- v_admin_facility_inspections: 시설 점검 이력 (담당자명 포함)
CREATE OR REPLACE VIEW v_admin_facility_inspections AS
SELECT
  fi.id,
  fi.title,
  fi.inspection_type AS category,
  fi.frequency,
  fi.inspection_date AS check_date,
  fi.completed_date,
  fi.status,
  fi.check_result,
  fi.inspector_id,
  e.name             AS inspector_name,
  fi.findings        AS notes,
  fi.photos,
  fi.created_at,
  fi.updated_at
FROM facility_inspections fi
LEFT JOIN employees e ON e.id = fi.inspector_id;

COMMENT ON VIEW v_admin_facility_inspections IS 'Admin 시설 점검 이력 - 담당자명 포함';


-- ============================================
-- 16. 간담회 관련 Admin Views
-- ============================================

-- v_admin_meeting_records: 간담회 기록 (진행자명 포함)
CREATE OR REPLACE VIEW v_admin_meeting_records AS
SELECT
  mr.id,
  mr.title,
  mr.category        AS meeting_type,
  mr.meeting_date::TIMESTAMP AS held_at,
  mr.location,
  NULL::BIGINT       AS facilitator_id,
  e.name             AS facilitator_name,
  mr.attendee_count  AS attendees,
  NULL::TEXT         AS agenda,
  mr.status,
  mr.created_by,
  creator.name       AS created_by_name,
  mr.created_at,
  mr.updated_at,
  -- 회의록 첨부 여부
  CASE WHEN mm.id IS NOT NULL THEN true ELSE false END AS has_minutes
FROM meeting_records mr
LEFT JOIN employees e ON e.id = mr.created_by
LEFT JOIN employees creator ON creator.id = mr.created_by
LEFT JOIN meeting_minutes mm ON mm.meeting_id = mr.id;

COMMENT ON VIEW v_admin_meeting_records IS 'Admin 간담회 기록 - 진행자명, 회의록 여부 포함';


-- ============================================
-- 17. 욕구사정 Admin Views
-- ============================================

-- v_admin_needs_assessments: 욕구사정 (입소자명, 평가자명 포함)
CREATE OR REPLACE VIEW v_admin_needs_assessments AS
SELECT
  na.id,
  na.resident_id,
  r.name             AS resident_name,
  r.birthday         AS resident_birthday,
  r.gender           AS resident_gender,
  na.assessor_id      AS assessed_by,
  e.name             AS assessor_name,
  na.assessment_date,
  na.physical_needs,
  na.cognitive_needs,
  na.social_needs,
  NULL::JSONB         AS emotional_needs,
  na.environment_needs AS environmental_needs,
  NULL::NUMERIC       AS total_score,
  NULL::JSONB         AS priority_needs,
  NULL::JSONB         AS care_goals,
  na.summary          AS notes,
  na.created_at,
  na.updated_at
FROM needs_assessments na
JOIN residents r ON r.id = na.resident_id
LEFT JOIN employees e ON e.id = na.assessor_id;

COMMENT ON VIEW v_admin_needs_assessments IS 'Admin 욕구사정 - 입소자명, 평가자명 포함';


-- ============================================
-- 18. 회계 / 보험청구 Admin Views
-- ============================================

-- v_admin_insurance_claims: 보험청구 (입소자명 포함)
CREATE OR REPLACE VIEW v_admin_insurance_claims AS
SELECT
  ic.id,
  ic.resident_id,
  r.name             AS resident_name,
  ic.claim_month      AS year_month,
  ic.grade,
  ic.service_days,
  ic.total_amount,
  ic.insurance_amount,
  ic.copay_amount,
  ic.status,
  ic.submitted_at     AS claim_date,
  ic.approved_at      AS approved_date,
  ic.paid_at          AS paid_date,
  ic.notes,
  ic.created_by,
  e.name             AS created_by_name,
  ic.created_at,
  ic.updated_at
FROM insurance_claims ic
JOIN residents r ON r.id = ic.resident_id
LEFT JOIN employees e ON e.id = ic.created_by;

COMMENT ON VIEW v_admin_insurance_claims IS 'Admin 보험청구 - 입소자명, 등급, 서비스일수 포함';


-- v_admin_transactions: 회계 거래내역 (공급업체명, 작성자명 포함)
CREATE OR REPLACE VIEW v_admin_transactions AS
SELECT
  t.id,
  t.txn_date          AS transaction_date,
  NULL::TEXT          AS transaction_type,
  NULL::TEXT          AS category,
  t.supplier_id,
  s.name             AS supplier_name,
  t.description,
  t.total_amount,
  NULL::NUMERIC       AS tax_amount,
  NULL::TEXT          AS payment_method,
  NULL::TEXT          AS payment_status,
  NULL::TEXT          AS invoice_number,
  NULL::TEXT          AS notes,
  t.created_by,
  e.name             AS created_by_name,
  t.created_at,
  t.updated_at
FROM transactions t
LEFT JOIN suppliers s ON s.id = t.supplier_id
LEFT JOIN employees e ON e.id = t.created_by;

COMMENT ON VIEW v_admin_transactions IS 'Admin 회계 거래내역 - 공급업체명, 작성자명 포함';


-- ============================================
-- 19. 민원 Admin Views
-- ============================================

-- v_admin_grievances: 민원 처리 (입소자명, 처리자명 포함)
CREATE OR REPLACE VIEW v_admin_grievances AS
SELECT
  g.id,
  g.resident_id,
  r.name             AS resident_name,
  g.complainant_name,
  g.complainant_phone,
  g.complainant_relation,
  g.received_at,
  g.received_method   AS channel,
  g.category,
  g.title,
  g.content,
  g.status,
  g.assigned_to       AS handled_by,
  e.name             AS handled_by_name,
  NULL::TIMESTAMPTZ   AS handled_at,
  g.response          AS resolution,
  g.resolved_at       AS closed_at,
  NULL::TEXT          AS notes,
  g.created_at,
  g.updated_at
FROM grievances g
LEFT JOIN residents r ON r.id = g.resident_id
LEFT JOIN employees e ON e.id = g.assigned_to;

COMMENT ON VIEW v_admin_grievances IS 'Admin 민원 처리 - 입소자명, 처리자명 포함';


-- ============================================
-- 20. 목욕 스케줄 Admin Views
-- ============================================

-- v_admin_bath_schedules: 목욕 스케줄 (입소자명, 담당자명 포함)
CREATE OR REPLACE VIEW v_admin_bath_schedules AS
SELECT
  bs.id,
  bs.resident_id,
  r.name             AS resident_name,
  rm.room_name,
  bs.start_date       AS scheduled_date,
  bs.scheduled_time,
  bs.bath_method      AS bath_type,
  NULL::BIGINT        AS assigned_to,
  NULL::TEXT          AS assigned_to_name,
  CASE WHEN bs.is_active THEN 'ACTIVE' ELSE 'INACTIVE' END AS status,
  NULL::DATE          AS actual_date,
  NULL::TIME          AS actual_time,
  bs.memo             AS notes,
  bs.created_at,
  bs.updated_at
FROM bath_schedules bs
JOIN residents r ON r.id = bs.resident_id
LEFT JOIN resident_rooms rr
  ON rr.resident_id = r.id
  AND rr.is_primary = TRUE
  AND rr.ends_at IS NULL
LEFT JOIN rooms rm ON rm.id = rr.room_id;

COMMENT ON VIEW v_admin_bath_schedules IS 'Admin 목욕 스케줄 - 입소자명, 방, 담당자명 포함';


-- ============================================
-- 21. 재고 Admin Views
-- ============================================

-- v_admin_inventory_items: 재고 현황 (공급업체명 포함)
CREATE OR REPLACE VIEW v_admin_inventory_items AS
SELECT
  ii.id,
  ii.code             AS item_code,
  ii.name             AS item_name,
  ii.category,
  ii.unit,
  ii.current_stock,
  ii.min_stock,
  ii.max_stock,
  -- 재고 부족 여부
  CASE WHEN ii.current_stock <= ii.min_stock THEN true ELSE false END AS is_low_stock,
  ii.unit_price,
  (ii.current_stock * ii.unit_price) AS total_value,
  NULL::BIGINT        AS supplier_id,
  NULL::TEXT          AS supplier_name,
  ii.storage_location AS location,
  NULL::TEXT          AS notes,
  ii.created_at,
  ii.updated_at
FROM inventory_items ii;

COMMENT ON VIEW v_admin_inventory_items IS 'Admin 재고 현황 - 공급업체명, 재고부족 여부, 재고가치 포함';


-- 완료 메시지
DO $$
BEGIN
  RAISE NOTICE '========================================';
  RAISE NOTICE 'Admin View 생성 완료 (31-admin-views.sql)';
  RAISE NOTICE '  [시설/알림/직원]';
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
  RAISE NOTICE '  [급여]';
  RAISE NOTICE '  - v_admin_payroll_records';
  RAISE NOTICE '  - v_admin_payroll_batches';
  RAISE NOTICE '  - v_admin_payroll_settings';
  RAISE NOTICE '  [인사/근무]';
  RAISE NOTICE '  - v_admin_attendance_records';
  RAISE NOTICE '  - v_admin_leave_requests';
  RAISE NOTICE '  - v_admin_shift_assignments';
  RAISE NOTICE '  [투약]';
  RAISE NOTICE '  - v_admin_medication_schedules';
  RAISE NOTICE '  - v_admin_medication_records';
  RAISE NOTICE '  [차량]';
  RAISE NOTICE '  - v_admin_vehicles';
  RAISE NOTICE '  - v_admin_vehicle_run_logs';
  RAISE NOTICE '  [CCTV]';
  RAISE NOTICE '  - v_admin_cctv_devices';
  RAISE NOTICE '  - v_admin_cctv_consents';
  RAISE NOTICE '  [시설점검]';
  RAISE NOTICE '  - v_admin_facility_inspections';
  RAISE NOTICE '  [간담회]';
  RAISE NOTICE '  - v_admin_meeting_records';
  RAISE NOTICE '  [욕구사정]';
  RAISE NOTICE '  - v_admin_needs_assessments';
  RAISE NOTICE '  [회계/보험청구]';
  RAISE NOTICE '  - v_admin_insurance_claims';
  RAISE NOTICE '  - v_admin_transactions';
  RAISE NOTICE '  [민원]';
  RAISE NOTICE '  - v_admin_grievances';
  RAISE NOTICE '  [목욕]';
  RAISE NOTICE '  - v_admin_bath_schedules';
  RAISE NOTICE '  [재고]';
  RAISE NOTICE '  - v_admin_inventory_items';
  RAISE NOTICE '총 32개 Admin View 생성 완료';
  RAISE NOTICE '========================================';
END$$;
