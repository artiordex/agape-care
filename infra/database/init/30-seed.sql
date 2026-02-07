-- Description : 30-seed.sql - 📌 Agape-Care 요양원 ERP Seed Data (61 Tables)
-- Author : Shiwoo Min
-- Date : 2026-01-24
-- Version : 3.0
-- Note : 개발·테스트용 기본 데이터

-- 조직 / 직원

-- DEPARTMENTS (부서)
INSERT INTO departments (id, code, name, description, is_active) VALUES
  (1, 'ADMIN', '행정부', '사무국 및 관리', TRUE),
  (2, 'NURSING', '간호부', '간호 및 의료', TRUE),
  (3, 'CARE', '요양부', '요양보호', TRUE),
  (4, 'KITCHEN', '조리부', '급식 관리', TRUE),
  (5, 'FACILITY', '시설부', '시설 관리', TRUE);

-- EMPLOYEE_ROLES (직원 역할)
INSERT INTO employee_roles (id, code, name, description, permissions) VALUES
  (1, 'ADMIN', '시스템 관리자', '모든 권한', '{"all": true}'::jsonb),
  (2, 'DIRECTOR', '원장', '최고 관리자', '{"management": true}'::jsonb),
  (3, 'NURSE', '간호사', '간호 업무', '{"care": true, "health": true}'::jsonb),
  (4, 'CARE_GIVER', '요양보호사', '요양 서비스', '{"care": true}'::jsonb),
  (5, 'COOK', '조리사', '급식 관리', '{"meal": true}'::jsonb),
  (6, 'SOCIAL_WORKER', '사회복지사', '상담 및 지원', '{"consultation": true}'::jsonb);

-- EMPLOYEES (직원)
INSERT INTO employees (id, department_id, role_id, email, password_hash, name, phone_number, hire_date, status, is_admin) VALUES
  (1, 1, 1, 'admin@agape-care.kr', '$2b$10$abcdefghijklmnopqrstuvwxyz1234567890', '시스템관리자', '02-1234-5678', '2020-01-01', 'ACTIVE', TRUE),
  (2, 1, 2, 'director@agape-care.kr', '$2b$10$abcdefghijklmnopqrstuvwxyz1234567890', '김원장', '010-1111-2222', '2020-01-01', 'ACTIVE', FALSE),
  (3, 2, 3, 'nurse1@agape-care.kr', '$2b$10$abcdefghijklmnopqrstuvwxyz1234567890', '박간호사', '010-2222-3333', '2021-03-15', 'ACTIVE', FALSE),
  (4, 3, 4, 'care1@agape-care.kr', '$2b$10$abcdefghijklmnopqrstuvwxyz1234567890', '이요양사', '010-3333-4444', '2021-06-01', 'ACTIVE', FALSE),
  (5, 3, 4, 'care2@agape-care.kr', '$2b$10$abcdefghijklmnopqrstuvwxyz1234567890', '최요양사', '010-4444-5555', '2022-01-10', 'ACTIVE', FALSE),
  (6, 4, 5, 'cook1@agape-care.kr', '$2b$10$abcdefghijklmnopqrstuvwxyz1234567890', '강조리사', '010-5555-6666', '2021-04-01', 'ACTIVE', FALSE),
  (7, 1, 6, 'social1@agape-care.kr', '$2b$10$abcdefghijklmnopqrstuvwxyz1234567890', '정사회복지사', '010-6666-7777', '2021-09-01', 'ACTIVE', FALSE);

-- EMPLOYEE_EDUCATIONS (직원 교육 이력)
INSERT INTO employee_educations (employee_id, education_date, title, category, duration_hours, instructor, completion_status) VALUES
  (3, '2025-12-15', '낙상 예방 안전교육', 'SAFETY', 2.0, '외부강사', 'COMPLETED'),
  (4, '2025-12-15', '낙상 예방 안전교육', 'SAFETY', 2.0, '외부강사', 'COMPLETED'),
  (5, '2026-01-10', '인권 교육', 'COMPLIANCE', 4.0, '사회복지사', 'COMPLETED'),
  (6, '2025-11-20', '위생 관리 교육', 'CARE', 3.0, '보건소', 'COMPLETED');

-- 입소자 / 건강정보

-- RESIDENTS (입소자)
INSERT INTO residents (id, code, name, birthday, gender, admission_date, status, guardian_name, guardian_phone) VALUES
  (1, 'R2025001', '김순자', '1940-03-15', 'F', '2025-01-10', 'ADMITTED', '김철수', '010-1234-5678'),
  (2, 'R2025002', '박영희', '1938-07-22', 'F', '2025-02-01', 'ADMITTED', '박민수', '010-2345-6789'),
  (3, 'R2025003', '이만수', '1942-11-08', 'M', '2025-03-15', 'ADMITTED', '이영희', '010-3456-7890'),
  (4, 'R2025004', '최옥자', '1939-05-20', 'F', '2025-04-01', 'ADMITTED', '최진우', '010-4567-8901'),
  (5, 'R2025005', '정남식', '1941-09-12', 'M', '2025-06-10', 'ADMITTED', '정수미', '010-5678-9012');

-- RESIDENT_ROOMS (생활실 배정)
INSERT INTO resident_rooms (resident_id, room_label, bed_label, starts_at, is_primary) VALUES
  (1, '101', 'A', '2025-01-10', TRUE),
  (2, '101', 'B', '2025-02-01', TRUE),
  (3, '102', 'A', '2025-03-15', TRUE),
  (4, '102', 'C', '2025-04-01', TRUE),
  (5, '201', 'A', '2025-06-10', TRUE);

-- RESIDENT_CONTACTS (추가 보호자)
INSERT INTO resident_contacts (resident_id, name, relationship, phone_number, is_primary) VALUES
  (1, '김철수', '장남', '010-1234-5678', TRUE),
  (1, '김영희', '차녀', '010-1111-2222', FALSE),
  (2, '박민수', '차남', '010-2345-6789', TRUE),
  (3, '이영희', '배우자', '010-3456-7890', TRUE);

-- RESIDENT_HEALTH_NOTES (건강 메모)
INSERT INTO resident_health_notes (resident_id, recorded_by, note_type, content) VALUES
  (1, 3, 'GENERAL', '혈압 안정적, 식사 잘 하심'),
  (2, 3, 'NUTRITION', '식욕 저하, 부드러운 식사로 변경 필요'),
  (3, 4, 'MOBILITY', '보행 시 지팡이 사용, 낙상 주의');

-- RESIDENT_MEDICATIONS (투약 기록)
INSERT INTO resident_medications (resident_id, prescribed_by, drug_name, dosage, schedule, start_date) VALUES
  (1, '김내과', '아스피린', '100mg', '1-0-0', '2025-01-15'),
  (2, '이내과', '혈압약', '5mg', '1-0-1', '2025-02-05'),
  (3, '박내과', '당뇨약', '500mg', '1-1-1', '2025-03-20');

-- RESIDENT_VITALS (활력징후)
INSERT INTO resident_vitals (resident_id, recorded_by, measured_at, systolic_bp, diastolic_bp, heart_rate, temperature, spo2) VALUES
  (1, 3, '2026-01-23 09:00:00', 130, 80, 72, 36.5, 98),
  (2, 3, '2026-01-23 09:10:00', 145, 85, 78, 36.7, 97),
  (3, 3, '2026-01-23 09:20:00', 125, 75, 68, 36.4, 99);

-- 식단 / 프로그램

-- MEAL_PLANS (주간 식단표)
INSERT INTO meal_plans (id, facility_code, week_start_date, created_by, status) VALUES
  (1, 'DEFAULT', '2026-01-20', 6, 'PUBLISHED');

-- MEAL_PLAN_ITEMS (식단 아이템)
INSERT INTO meal_plan_items (meal_plan_id, meal_date, meal_type, main_menu, side_menu, soup, dessert, calories) VALUES
  -- 2026-01-23 (목)
  (1, '2026-01-23', 'BREAKFAST', '쇠고기미역국', '계란후라이, 김구이', '된장국', '우유', 520),
  (1, '2026-01-23', 'LUNCH', '제육볶음', '두부조림, 시금치나물', '배추국', '과일', 680),
  (1, '2026-01-23', 'DINNER', '생선구이', '감자조림, 콩나물', '미역국', '요구르트', 610),
  -- 2026-01-24 (금)
  (1, '2026-01-24', 'BREAKFAST', '북어국', '계란찜, 김', '된장국', '우유', 500),
  (1, '2026-01-24', 'LUNCH', '닭볶음탕', '두부부침, 나물', '무국', '수박', 720),
  (1, '2026-01-24', 'DINNER', '돈가스', '샐러드, 단무지', '콩나물국', '푸딩', 650);

-- PROGRAMS (프로그램 마스터)
INSERT INTO programs (id, title, description, category, is_active, created_by) VALUES
  (1, '인지활동 프로그램', '기억력과 사고력 향상을 위한 인지 훈련', 'COGNITIVE', TRUE, 7),
  (2, '노래교실', '추억의 노래를 통한 정서 안정', 'MUSIC', TRUE, 7),
  (3, '종이접기', '소근육 운동 및 집중력 향상', 'CRAFT', TRUE, 7),
  (4, '가벼운 체조', '건강 유지를 위한 스트레칭', 'EXERCISE', TRUE, 3),
  (5, '영화감상', '문화생활 및 여가 활동', 'RECREATION', TRUE, 7);

-- PROGRAM_SCHEDULES (프로그램 일정)
INSERT INTO program_schedules (id, program_id, starts_at, ends_at, location, capacity, status) VALUES
  (1, 1, '2026-01-23 10:00:00', '2026-01-23 11:00:00', '1층 프로그램실', 15, 'CONFIRMED'),
  (2, 2, '2026-01-23 14:00:00', '2026-01-23 15:00:00', '2층 강당', 20, 'CONFIRMED'),
  (3, 4, '2026-01-24 09:00:00', '2026-01-24 09:30:00', '옥상 정원', 10, 'PLANNED'),
  (4, 3, '2026-01-24 15:00:00', '2026-01-24 16:00:00', '1층 프로그램실', 12, 'PLANNED');

-- PROGRAM_ATTENDANCE (프로그램 참석)
INSERT INTO program_attendance (schedule_id, resident_id, employee_id, role, attended, checked_at) VALUES
  (1, 1, 7, 'PARTICIPANT', TRUE, '2026-01-23 10:00:00'),
  (1, 2, 7, 'PARTICIPANT', TRUE, '2026-01-23 10:00:00'),
  (1, 3, 7, 'PARTICIPANT', FALSE, NULL),
  (2, 1, 3, 'HELPER', TRUE, '2026-01-23 14:00:00'),
  (2, 2, NULL, 'PARTICIPANT', TRUE, '2026-01-23 14:00:00');

-- 케어 플랜 / 상담 / 사건

-- CARE_PLANS (케어 플랜)
INSERT INTO care_plans (id, resident_id, created_by, title, goal_summary, start_date, status) VALUES
  (1, 1, 3, '2026년 1분기 케어플랜', '혈압 관리 및 낙상 예방', '2026-01-01', 'ACTIVE'),
  (2, 2, 3, '2026년 1분기 케어플랜', '식욕 개선 및 영양 관리', '2026-01-01', 'ACTIVE');

-- CARE_PLAN_ITEMS
INSERT INTO care_plan_items (care_plan_id, sequence_no, description, frequency) VALUES
  (1, 1, '혈압 측정 및 기록', 'DAILY'),
  (1, 2, '낙상 예방 순찰', 'DAILY'),
  (2, 1, '식사량 체크', 'DAILY'),
  (2, 2, '간식 제공', 'DAILY');

-- CONSULTATION_RECORDS (상담 기록)
INSERT INTO consultation_records (resident_id, counselor_id, consulted_at, type, channel, summary) VALUES
  (1, 7, '2026-01-15 14:00:00', 'FAMILY', 'PHONE', '보호자와 통화, 건강 상태 공유'),
  (2, 7, '2026-01-18 10:00:00', 'FAMILY', 'IN_PERSON', '보호자 방문, 식사량 저하 상담');

-- INCIDENTS (사건/사고)
INSERT INTO incidents (resident_id, reported_by, occurred_at, severity, title, description, location, status) VALUES
  (3, 4, '2026-01-20 15:30:00', 'LOW', '경미한 낙상', '화장실 이동 중 미끄러짐, 외상 없음', '102호 화장실', 'CLOSED');

-- CARE_TASKS (케어 업무)
INSERT INTO care_tasks (resident_id, assigned_to, due_at, title, description, status, priority) VALUES
  (1, 4, '2026-01-24 09:00:00', '혈압 측정', '아침 혈압 측정 및 기록', 'PENDING', 'HIGH'),
  (2, 5, '2026-01-24 12:00:00', '식사 보조', '점심 식사 보조 필요', 'PENDING', 'NORMAL');

-- 공지 / 게시판 / 갤러리

-- NOTICES (공지사항)
INSERT INTO notices (id, title, content, category, is_pinned, is_active, view_count, published_at, created_by) VALUES
  (1, '2024년 설날 연휴 운영 안내',
  '<p>안녕하세요. 본 시설을 이용해주시는 보호자 및 가족 여러분께 진심으로 감사의 말씀을 드립니다. 2024년 설날 연휴를 맞아 시설 운영 일정 및 면회 관련 안내를 드리고자 합니다.</p><p>설 연휴 기간인 2월 9일(금)부터 2월 12일(월)까지는 안전한 환경을 위해 외부 방문 및 면회가 제한됩니다. 다만 응급상황이나 부득이한 사유가 있을 경우 사전에 시설로 전화 주시면 담당자가 안내해 드립니다. 연휴 기간에도 상주 간호 인력 및 요양보호사들이 24시간 근무하며 어르신들의 건강 상태를 면밀히 살피고, 식사 및 투약 관리 또한 정상적으로 제공될 예정입니다.</p><p>연휴 종료 후 2월 13일(화)부터는 평상시와 동일한 면회 방식으로 전환됩니다. 가족 여러분께서는 방문 전 반드시 전화로 면회 가능 여부를 확인해 주시기 바랍니다. 따뜻한 명절 보내시길 바라며, 새해에도 변함없는 신뢰와 응원 부탁드립니다.</p>',
  'URGENT', TRUE, TRUE, 245, '2024-01-15 09:00:00', 2);

-- BOARD_POSTS (게시판)
INSERT INTO board_posts (id, board_key, title, content, author_id, view_count, is_pinned) VALUES
  (1, 'FREE', '새해 복 많이 받으세요!', '2026년 새해를 맞아 모든 입소자분들과 가족분들께 건강과 행복이 가득하시길 기원합니다.', 2, 45, TRUE),
  (2, 'QNA', '면회 시간 문의', '주말 면회 시간이 궁금합니다.', 7, 12, FALSE);

-- BOARD_COMMENTS (댓글)
INSERT INTO board_comments (post_id, author_id, content) VALUES
  (2, 2, '주말 면회는 오전 10시부터 오후 5시까지 가능합니다.');

-- GALLERY_ITEMS (갤러리)
INSERT INTO gallery_items (id, title, description, event_date, created_by, is_public) VALUES
  (1, '2026 신년 행사', '새해맞이 떡국 나누기 행사', '2026-01-01', 7, TRUE),
  (2, '1월 생신 잔치', '1월 생신 어르신 축하 행사', '2026-01-15', 7, TRUE);

-- POPUP_BANNERS (팝업)
INSERT INTO popup_banners (title, content, display_type, start_date, end_date, is_active, priority, created_by) VALUES
  ('설 연휴 공지', '설 연휴 기간 운영 안내입니다.', 'POPUP', '2026-01-20', '2026-01-30', TRUE, 1, 2);

-- WEBSITE_SETTINGS (웹사이트 설정)
INSERT INTO website_settings (category, key, value, description) VALUES
  ('BASIC', 'facility_name', '{"name": "아가페케어 요양원"}'::jsonb, '시설명'),
  ('BASIC', 'contact', '{"phone": "02-1234-5678", "email": "info@agape-care.kr"}'::jsonb, '연락처'),
  ('DESIGN', 'theme_color', '{"primary": "#14B8A6", "secondary": "#0EA5E9"}'::jsonb, '테마 색상');

-- 출결 / 근무표

-- ATTENDANCE_RECORDS (근태)
INSERT INTO attendance_records (employee_id, work_date, check_in_at, check_out_at, status) VALUES
  (3, '2026-01-23', '2026-01-23 08:50:00', '2026-01-23 18:05:00', 'PRESENT'),
  (4, '2026-01-23', '2026-01-23 08:55:00', '2026-01-23 18:00:00', 'PRESENT'),
  (5, '2026-01-23', '2026-01-23 09:10:00', '2026-01-23 18:00:00', 'LATE'),
  (6, '2026-01-23', '2026-01-23 07:00:00', '2026-01-23 16:00:00', 'PRESENT');

-- SHIFT_TEMPLATES (근무 패턴)
INSERT INTO shift_templates (id, code, name, start_time, end_time) VALUES
  (1, 'DAY', '주간근무', '09:00', '18:00'),
  (2, 'EVE', '오후근무', '14:00', '22:00'),
  (3, 'NIGHT', '야간근무', '22:00', '08:00');

-- SHIFT_ASSIGNMENTS (근무 배정)
INSERT INTO shift_assignments (employee_id, work_date, shift_template_id, starts_at, ends_at) VALUES
  (3, '2026-01-24', 1, '2026-01-24 09:00:00', '2026-01-24 18:00:00'),
  (4, '2026-01-24', 1, '2026-01-24 09:00:00', '2026-01-24 18:00:00'),
  (5, '2026-01-24', 2, '2026-01-24 14:00:00', '2026-01-24 22:00:00');

-- LEAVE_REQUESTS (휴가 신청)
INSERT INTO leave_requests (employee_id, start_date, end_date, type, reason, status) VALUES
  (4, '2026-02-01', '2026-02-02', 'ANNUAL', '개인 사유', 'APPROVED');

-- LEAVE_APPROVALS (휴가 승인)
INSERT INTO leave_approvals (leave_request_id, approved_by, approved_at, decision, comment) VALUES
  (1, 2, '2026-01-22 10:00:00', 'APPROVED', '승인합니다');


-- 회계 / 급여 / 매입

-- ACCOUNT_CATEGORIES (계정 분류)
INSERT INTO account_categories (id, code, name, kind) VALUES
  (1, 'INC', '수익', 'INCOME'),
  (2, 'EXP', '비용', 'EXPENSE'),
  (3, 'AST', '자산', 'ASSET'),
  (4, 'LIA', '부채', 'LIABILITY');

-- ACCOUNTS (계정과목)
INSERT INTO accounts (id, category_id, code, name, is_active) VALUES
  (1, 1, '4100', '장기요양급여수익', TRUE),
  (2, 1, '4200', '본인부담금수익', TRUE),
  (3, 2, '5100', '급여', TRUE),
  (4, 2, '5200', '식자재비', TRUE),
  (5, 2, '5300', '공과금', TRUE),
  (6, 3, '1100', '현금', TRUE),
  (7, 3, '1200', '보통예금', TRUE);

-- SUPPLIERS (거래처)
INSERT INTO suppliers (id, name, business_no, phone_number, email) VALUES
  (1, '○○식자재', '123-45-67890', '02-1111-2222', 'food@example.com'),
  (2, '△△의료용품', '234-56-78901', '02-3333-4444', 'medical@example.com');

-- TRANSACTIONS (전표)
INSERT INTO transactions (id, txn_date, description, supplier_id, created_by, total_amount) VALUES
  (1, '2026-01-20', '식자재 구입', 1, 2, 500000),
  (2, '2026-01-21', '의료용품 구입', 2, 2, 300000);

-- TRANSACTION_ITEMS (전표 항목)
INSERT INTO transaction_items (transaction_id, account_id, line_no, debit_amount, credit_amount) VALUES
  (1, 4, 1, 500000, 0),
  (1, 6, 2, 0, 500000),
  (2, 4, 1, 300000, 0),
  (2, 7, 2, 0, 300000);

-- PAYROLL_RECORDS (급여)
INSERT INTO payroll_records (employee_id, period_start, period_end, base_salary, total_allowance, total_deduction, net_pay, status) VALUES
  (3, '2026-01-01', '2026-01-31', 3000000, 200000, 300000, 2900000, 'PENDING'),
  (4, '2026-01-01', '2026-01-31', 2500000, 150000, 250000, 2400000, 'PENDING');

-- INSURANCE_CLAIMS (보험 청구)
INSERT INTO insurance_claims (claim_no, resident_id, claim_month, claim_type, total_amount, status, created_by) VALUES
  ('2025-12-001', 1, '2025-12-01', 'CARE_BENEFIT', 1500000, 'PAID', 2),
  ('2026-01-001', 1, '2026-01-01', 'CARE_BENEFIT', 1500000, 'SUBMITTED', 2);

-- INSURANCE_CLAIM_ITEMS (청구 항목)
INSERT INTO insurance_claim_items (claim_id, service_date, service_code, service_name, quantity, unit_price, amount, copay_amount) VALUES
  (1, '2025-12-05', 'L0101', '요양보호서비스', 30, 50000, 1500000, 150000);


-- 운영 관리

-- INVENTORY_ITEMS (재고)
INSERT INTO inventory_items (id, code, name, category, unit, current_stock, min_stock, unit_price) VALUES
  (1, 'MED001', '기저귀(대)', 'MEDICAL', 'BOX', 50, 20, 30000),
  (2, 'FOOD001', '쌀', 'FOOD', 'KG', 200, 100, 2500),
  (3, 'SUP001', '휴지', 'SUPPLY', 'BOX', 30, 10, 15000);

-- INVENTORY_TRANSACTIONS (재고 입출고)
INSERT INTO inventory_transactions (item_id, txn_date, txn_type, quantity, unit_price, total_amount, supplier_id, created_by) VALUES
  (1, '2026-01-15', 'IN', 20, 30000, 600000, 2, 2),
  (1, '2026-01-20', 'OUT', -5, 30000, -150000, NULL, 4),
  (2, '2026-01-10', 'IN', 100, 2500, 250000, 1, 6);

-- VEHICLES (차량)
INSERT INTO vehicles (id, vehicle_no, vehicle_type, model, manufacturer, year, capacity, status) VALUES
  (1, '12가3456', 'VAN', '스타렉스', '현대', 2023, 11, 'ACTIVE'),
  (2, '78나9012', 'SEDAN', '그랜저', '현대', 2022, 5, 'ACTIVE');

-- TRANSPORT_REQUESTS (운송 요청)
INSERT INTO transport_requests (resident_id, vehicle_id, driver_id, request_date, pickup_location, destination, purpose, status, created_by) VALUES
  (1, 1, 4, '2026-01-25 10:00:00', '요양원', '○○병원', 'HOSPITAL', 'CONFIRMED', 7);

-- CCTV_DEVICES (CCTV)
INSERT INTO cctv_devices (id, device_no, location, ip_address, install_date, status) VALUES
  (1, 'CCTV-001', '1층 복도', '192.168.1.101', '2023-01-01', 'ACTIVE'),
  (2, 'CCTV-002', '2층 복도', '192.168.1.102', '2023-01-01', 'ACTIVE'),
  (3, 'CCTV-003', '식당', '192.168.1.103', '2023-01-01', 'ACTIVE');

-- CCTV_VIEW_LOGS (CCTV 열람 기록)
INSERT INTO cctv_view_logs (device_id, viewer_id, view_start, view_end, purpose, approved_by) VALUES
  (1, 2, '2026-01-20 14:00:00', '2026-01-20 14:30:00', '사고 조사', 2);

-- GRIEVANCES (민원)
INSERT INTO grievances (grievance_no, complainant_name, complainant_phone, resident_id, category, title, content, received_at, assigned_to, status) VALUES
  ('G2026-001', '김철수', '010-1234-5678', 1, 'SERVICE', '면회 시간 연장 요청', '주말 면회 시간을 연장해주실 수 있나요?', '2026-01-18 15:00:00', 2, 'RESOLVED');

-- FACILITY_INSPECTIONS (시설 점검)
INSERT INTO facility_inspections (inspection_date, inspection_type, inspector_id, location, findings, status) VALUES
  ('2026-01-15', 'FIRE', 2, '전체', '소화기 점검 완료, 이상 없음', 'COMPLETED');

-- SMS_SEND_LOGS (SMS 발송 기록)
INSERT INTO sms_send_logs (recipient_phone, recipient_name, message, send_type, sent_at, status, sms_count, sender_id) VALUES
  ('010-1234-5678', '김철수', '[아가페케어] 어머님 건강 상태 양호합니다.', 'IMMEDIATE', '2026-01-23 10:00:00', 'SENT', 1, 3);


-- 공통 (파일, 로그, 설정, 알림)

-- FILE_STORAGE (파일 메타)
INSERT INTO file_storage (bucket, path, original_name, mime_type, size_bytes, created_by) VALUES
  ('gallery', '2026/01/img001.jpg', '신년행사.jpg', 'image/jpeg', 245800, 7),
  ('notice', '2026/01/doc001.pdf', '설명절안내.pdf', 'application/pdf', 128400, 2);

-- AUDIT_LOGS (감사 로그)
INSERT INTO audit_logs (actor_id, action, entity_type, entity_id, changes) VALUES
  (2, 'CREATE', 'residents', 1, '{"name": "김순자", "status": "ADMITTED"}'::jsonb),
  (2, 'UPDATE', 'residents', 1, '{"room_id": {"old": null, "new": "101"}}'::jsonb);

-- SYSTEM_SETTINGS (시스템 설정)
INSERT INTO system_settings (key, value, description) VALUES
  ('facility_name', '{"ko": "아가페케어 요양원"}'::jsonb, '시설명'),
  ('timezone', '"Asia/Seoul"'::jsonb, '시간대'),
  ('max_residents', '29'::jsonb, '최대 입소 인원');

-- NOTIFICATION_QUEUE (알림 큐)
INSERT INTO notification_queue (channel, target_type, target_id, title, body, scheduled_at, status) VALUES
  ('INAPP', 'EMPLOYEE', 3, '혈압 측정 알림', '김순자님 혈압 측정 시간입니다.', '2026-01-24 09:00:00', 'PENDING'),
  ('SMS', 'RESIDENT', 1, '프로그램 안내', '오늘 오후 2시 노래교실이 있습니다.', '2026-01-24 13:00:00', 'PENDING');


-- 완료 메시지

DO $$
BEGIN
    RAISE NOTICE '=================================================';
    RAISE NOTICE 'Agape-Care ERP Seed Data Loaded Successfully!';
    RAISE NOTICE '=================================================';
    RAISE NOTICE 'Employees: 7';
    RAISE NOTICE 'Residents: 5';
    RAISE NOTICE 'Meal Plans: 6 items';
    RAISE NOTICE 'Programs: 5';
    RAISE NOTICE 'Accounting: Sample transactions';
    RAISE NOTICE 'Inventory: 3 items';
    RAISE NOTICE 'Vehicles: 2';
    RAISE NOTICE 'CCTV: 3 devices';
    RAISE NOTICE '=================================================';
    RAISE NOTICE 'Default Login:';
    RAISE NOTICE '   Email: admin@agape-care.kr';
    RAISE NOTICE '   Pass: (bcrypt hashed)';
    RAISE NOTICE '=================================================';
END$$;
