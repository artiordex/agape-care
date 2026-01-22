-- Description : 30-seed.sql - 📌 Agape-Care / ConnectWon 요양원 ERP Seed Data
-- Author : Shiwoo Min
-- Date : 2026-01-23
-- Note : 개발·테스트용 기본 데이터

-- ========== USERS (관리자, 직원계정) ==========
INSERT INTO users (id, email, name, role_flags) VALUES
  (1, 'admin@care.com', '관리자', 99),
  (2, 'director@care.com', '원장', 4),
  (3, 'nurse1@care.com', '간호사A', 2),
  (4, 'caregiver1@care.com', '요양보호사A', 1),
  (5, 'cook1@care.com', '조리사A', 1);

-- ========== AUTH_PROVIDERS ==========
INSERT INTO auth_providers (user_id, provider, password_hash)
VALUES
  (1, 'local', '$argon2id$v=19$m=65536,t=3,p=4$admin'),
  (2, 'local', '$argon2id$v=19$m=65536,t=3,p=4$director'),
  (3, 'local', '$argon2id$v=19$m=65536,t=3,p=4$nurse1'),
  (4, 'local', '$argon2id$v=19$m=65536,t=3,p=4$caregiver1');

-- ========== FACILITY_INFO (요양원 기본 정보) ==========
INSERT INTO facility_info (id, name, address, phone, homepage, capacity, created_at)
VALUES
  (1, '아가페-케어 요양원', '경기 광명시 소하동 123-4', '02-000-1234', 'https://agape-care.com', 29, now());

-- ========== ROOMS (방 정보) ==========
INSERT INTO rooms (id, name, room_type, bed_count, floor, status)
VALUES
  (1, '101호', '4인실', 4, 1, 'ACTIVE'),
  (2, '102호', '4인실', 4, 1, 'ACTIVE'),
  (3, '201호', '3인실', 3, 2, 'ACTIVE');

-- ========== RESIDENTS (입소자) ==========
INSERT INTO residents (id, name, gender, birth_date, admission_date, room_id, guardian_name, guardian_phone)
VALUES
  (1, '김입소', 'F', '1943-02-11', '2025-12-01', 1, '김보호', '010-1234-1000'),
  (2, '박어르신', 'M', '1940-07-22', '2025-12-15', 2, '박가족', '010-2222-3333'),
  (3, '최어르신', 'F', '1939-11-18', '2026-01-04', 3, '최가족', '010-3333-4444');

-- ========== STAFF (직원) ==========
INSERT INTO staff (id, name, role, phone, hire_date, status)
VALUES
  (1, '홍간호', 'NURSE', '010-4444-5555', '2024-03-01', 'ACTIVE'),
  (2, '이요양', 'CAREGIVER', '010-6666-7777', '2024-09-10', 'ACTIVE'),
  (3, '조조리', 'COOK', '010-8888-9999', '2025-04-20', 'ACTIVE');

-- ========== MEAL_PLANS (식단표) ==========
INSERT INTO meal_plans (id, meal_date, meal_type, menu, calories)
VALUES
  (1, '2026-01-23', 'BREAKFAST', '쇠고기미역국, 계란말이, 김', 520),
  (2, '2026-01-23', 'LUNCH', '된장찌개, 생선구이, 나물', 680),
  (3, '2026-01-23', 'DINNER', '떡국, 고기산적, 깍두기', 610);

-- ========== PROGRAMS (프로그램) ==========
INSERT INTO programs (id, title, description, category)
VALUES
  (1, '인지 프로그램', '기억력·주의력 향상 프로그램', 'COGNITIVE'),
  (2, '노래교실', '음악을 통한 정서 안정 프로그램', 'MUSIC'),
  (3, '종이접기', '소근육 발달 및 인지 기능 자극', 'CRAFT');

-- ========== PROGRAM_SESSIONS ==========
INSERT INTO program_sessions (id, program_id, session_date, starts_at, ends_at, instructor)
VALUES
  (1, 1, '2026-01-22', '10:00', '11:00', '홍간호'),
  (2, 2, '2026-01-22', '14:00', '15:00', '문화강사A');

-- ========== ATTENDANCE (근태 기록) ==========
INSERT INTO attendance (staff_id, work_date, check_in, check_out, status)
VALUES
  (1, '2026-01-22', '09:00', '18:00', 'NORMAL'),
  (2, '2026-01-22', '09:00', '18:00', 'NORMAL');

-- ========== NOTIFICATIONS ==========
INSERT INTO notifications (user_id, type, title, message)
VALUES
  (1, 'system', '시스템 점검 알림', '오늘 23:00~24:00 점검 예정입니다'),
  (3, 'program', '프로그램 참여 안내', '오늘 노래교실이 진행됩니다.');

-- ========== BOARD (공지사항 게시판) ==========
INSERT INTO board_posts (id, author_id, title, content, category)
VALUES
  (1, 1, '1월 프로그램 안내', '이번 달 진행되는 주요 프로그램 안내드립니다.', 'NOTICE'),
  (2, 2, '설 연휴 운영 공지', '설 연휴 기간 운영 일정 안내입니다.', 'NOTICE');

-- ========== GALLERY (이미지 게시판) ==========
INSERT INTO gallery (id, author_id, title, description)
VALUES
  (1, 1, '2026년 신년 행사', '사진으로 보는 신년 맞이 행사'),
  (2, 3, '인지 프로그램 활동', '오늘 진행된 인지 활동 모습');

INSERT INTO gallery_images (gallery_id, image_url, caption)
VALUES
  (1, '/uploads/gallery/1/img1.jpg', '신년 축하 현수막'),
  (1, '/uploads/gallery/1/img2.jpg', '어르신 합동사진'),
  (2, '/uploads/gallery/2/img1.jpg', '종이접기 활동 모습');

-- ========== ACCOUNTING (회계 계정 & 지출) ==========
INSERT INTO accounting_accounts (id, code, name, category)
VALUES
  (1, '5100', '식자재비', 'EXPENSE'),
  (2, '5200', '간호재료비', 'EXPENSE'),
  (3, '6100', '요양보험수익', 'INCOME');

INSERT INTO accounting_expenses (account_id, amount, description, expense_date)
VALUES
  (1, 120000, '식자재 구입', '2026-01-20'),
  (2, 88000, '기저귀 구매', '2026-01-18');

-- ========== CONSULTATION (상담일지) ==========
INSERT INTO consultations (resident_id, staff_id, consult_date, notes)
VALUES
  (1, 1, '2026-01-20', '상태 양호. 수면 패턴 안정적 유지 중'),
  (2, 1, '2026-01-20', '식욕 저하 있어 경과 관찰 필요');

-- ========== DEVICE_LOGS (기기 기록 – 선택사항) ==========
INSERT INTO device_logs (staff_id, log_type, message)
VALUES
  (1, 'INFO', '혈압측정기 교체 완료'),
  (2, 'WARNING', '휠체어 바퀴 점검 필요');

-- 완료 로그
DO $$
BEGIN
    RAISE NOTICE 'Seed data inserted successfully (Agape-Care)';
END$$;
