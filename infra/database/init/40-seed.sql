-- Description : 40-seed.sql - Web 알림마당 샘플 데이터
-- Author : Shiwoo Min
-- Date : 2025-02-09
-- Purpose : Web 알림마당 view 테스트용 샘플 데이터
-- Note : 공지사항, 게시판, 갤러리, 식단표, 프로그램 샘플 데이터

-- ============================================
-- 기본 데이터 (의존성)
-- ============================================

-- DEPARTMENTS (부서)
INSERT INTO departments (code, name, description, is_active) VALUES
  ('ADMIN',   '행정부', '사무국 및 관리', TRUE),
  ('NURSING', '간호부', '간호 및 의료',   TRUE),
  ('CARE',    '요양부', '요양보호',       TRUE),
  ('KITCHEN', '조리부', '급식 관리',      TRUE)
ON CONFLICT (code) DO NOTHING;

-- EMPLOYEE_ROLES (직원 역할)
INSERT INTO employee_roles (code, name, description, permissions) VALUES
  ('ADMIN',        '시스템 관리자', '모든 권한',   '{"all": true}'::jsonb),
  ('DIRECTOR',     '원장',          '최고 관리자', '{"management": true}'::jsonb),
  ('SOCIAL_WORKER','사회복지사',    '상담 및 지원','{"consultation": true}'::jsonb),
  ('COOK',         '조리사',        '급식 관리',   '{"meal": true}'::jsonb)
ON CONFLICT (code) DO NOTHING;

-- EMPLOYEES (직원) - email unique 기준으로 충돌 처리
INSERT INTO employees (department_id, role_id, email, password_hash, name, phone_number, hire_date, status, is_admin)
VALUES
  (
    (SELECT id FROM departments    WHERE code = 'ADMIN'),
    (SELECT id FROM employee_roles WHERE code = 'ADMIN'),
    'admin@agape-care.kr',
    '$2a$10$QHdobw1GNeLT3lxSyl9ms.y6qITjP.1S5DNRW3PcktTpwk22UWguC',
    '시스템관리자', '02-1234-5678', '2020-01-01', 'ACTIVE', TRUE
  ),
  (
    (SELECT id FROM departments    WHERE code = 'ADMIN'),
    (SELECT id FROM employee_roles WHERE code = 'DIRECTOR'),
    'director@agape-care.kr',
    '$2a$10$1vuXDmIt3Krmoz7XZozC8OZvQcBv8tS28MzfQXgAy14bq2y94hEZ2',
    '김원장', '010-1111-2222', '2020-01-01', 'ACTIVE', FALSE
  ),
  (
    (SELECT id FROM departments    WHERE code = 'KITCHEN'),
    (SELECT id FROM employee_roles WHERE code = 'COOK'),
    'cook1@agape-care.kr',
    '$2a$10$tD..HvTsKJc7VyAo/DBmv.Sy7ghP/XLdcoX43VTRI.pn1byF6LEeK',
    '강조리사', '010-5555-6666', '2021-04-01', 'ACTIVE', FALSE
  ),
  (
    (SELECT id FROM departments    WHERE code = 'ADMIN'),
    (SELECT id FROM employee_roles WHERE code = 'SOCIAL_WORKER'),
    'social1@agape-care.kr',
    '$2a$10$dewuQopfw9ixfKYFLtYy9eZCwkK6fendZJH360MJW7bkvUWvwcvti',
    '정사회복지사', '010-6666-7777', '2021-09-01', 'ACTIVE', FALSE
  )
ON CONFLICT (email) DO NOTHING;

-- FILE_STORAGE (샘플 파일)
-- bucket+path unique 충돌 방지
INSERT INTO file_storage (bucket, path, original_name, mime_type, size_bytes, created_by) VALUES
  ('notice', '2026/02/notice_001.pdf', '설연휴_운영안내.pdf',  'application/pdf', 245800,
   (SELECT id FROM employees WHERE email = 'director@agape-care.kr')),
  ('notice', '2026/02/notice_002.jpg', '행사사진.jpg',          'image/jpeg',      128400,
   (SELECT id FROM employees WHERE email = 'director@agape-care.kr')),
  ('board',  '2026/02/board_001.pdf',  '면회안내문.pdf',        'application/pdf',  98500,
   (SELECT id FROM employees WHERE email = 'social1@agape-care.kr')),
  ('gallery','2026/01/gallery_001.jpg','신년행사_1.jpg',         'image/jpeg',      512000,
   (SELECT id FROM employees WHERE email = 'social1@agape-care.kr')),
  ('gallery','2026/01/gallery_002.jpg','신년행사_2.jpg',         'image/jpeg',      487000,
   (SELECT id FROM employees WHERE email = 'social1@agape-care.kr')),
  ('gallery','2026/01/gallery_003.jpg','신년행사_3.jpg',         'image/jpeg',      523000,
   (SELECT id FROM employees WHERE email = 'social1@agape-care.kr')),
  ('gallery','2026/01/gallery_004.jpg','생신잔치_1.jpg',         'image/jpeg',      445000,
   (SELECT id FROM employees WHERE email = 'social1@agape-care.kr')),
  ('gallery','2026/01/gallery_005.jpg','생신잔치_2.jpg',         'image/jpeg',      478000,
   (SELECT id FROM employees WHERE email = 'social1@agape-care.kr')),
  ('meal',   '2026/01/meal_breakfast.jpg','아침식단.jpg',        'image/jpeg',      256000,
   (SELECT id FROM employees WHERE email = 'cook1@agape-care.kr')),
  ('meal',   '2026/01/meal_lunch.jpg',    '점심식단.jpg',        'image/jpeg',      289000,
   (SELECT id FROM employees WHERE email = 'cook1@agape-care.kr'))
ON CONFLICT (bucket, path) DO NOTHING;

-- ============================================
-- 1. 공지사항 (NOTICES)
-- ============================================
DO $$
DECLARE
  v_director_id  BIGINT;
  v_social_id    BIGINT;
  v_notice_1     BIGINT;
  v_notice_2     BIGINT;
  v_notice_3     BIGINT;
  v_notice_4     BIGINT;
  v_notice_5     BIGINT;
  v_notice_6     BIGINT;
  v_notice_7     BIGINT;
  v_file_1       BIGINT;
  v_file_2       BIGINT;
  v_file_3       BIGINT;
BEGIN
  SELECT id INTO v_director_id FROM employees WHERE email = 'director@agape-care.kr';
  SELECT id INTO v_social_id   FROM employees WHERE email = 'social1@agape-care.kr';
  SELECT id INTO v_file_1      FROM file_storage WHERE bucket = 'notice' AND path = '2026/02/notice_001.pdf';
  SELECT id INTO v_file_2      FROM file_storage WHERE bucket = 'notice' AND path = '2026/02/notice_002.jpg';
  SELECT id INTO v_file_3      FROM file_storage WHERE bucket = 'board'  AND path = '2026/02/board_001.pdf';

  -- 공지사항 삽입
  INSERT INTO notices (title, content, category, is_pinned, is_active, view_count, published_at, created_by)
  VALUES (
    '2026년 설날 연휴 운영 안내',
    '<h2>설날 연휴 운영 안내</h2>
<p>안녕하세요. 본 시설을 이용해주시는 보호자 및 가족 여러분께 진심으로 감사의 말씀을 드립니다.</p>
<p>2026년 설날 연휴를 맞아 시설 운영 일정 및 면회 관련 안내를 드립니다.</p>
<h3>연휴 기간</h3>
<ul>
  <li>2026년 2월 9일(토) ~ 2월 12일(화)</li>
  <li>총 4일간</li>
</ul>
<h3>면회 제한 안내</h3>
<p>안전한 환경 유지를 위해 연휴 기간 중 외부 방문 및 면회가 <strong>제한</strong>됩니다.</p>
<p>다만 응급상황이나 부득이한 사유가 있을 경우, 사전에 시설로 전화 주시면 담당자가 안내해 드리겠습니다.</p>
<h3>운영 안내</h3>
<ul>
  <li>상주 간호 인력 및 요양보호사 24시간 근무</li>
  <li>식사 및 투약 관리 정상 제공</li>
  <li>건강 상태 면밀히 모니터링</li>
</ul>
<h3>정상 운영 재개</h3>
<p>2026년 2월 13일(수)부터 평상시와 동일하게 운영됩니다.</p>
<p>방문 전 반드시 <strong>전화로 면회 가능 여부</strong>를 확인해 주시기 바랍니다.</p>
<p>따뜻한 명절 보내시길 바라며, 새해에도 변함없는 신뢰와 응원 부탁드립니다.</p>
<p style="text-align: right;">아가페케어 요양원 원장 올림</p>',
    'URGENT', TRUE, TRUE, 1245, '2026-01-15 09:00:00', v_director_id
  ) RETURNING id INTO v_notice_1;

  INSERT INTO notices (title, content, category, is_pinned, is_active, view_count, published_at, created_by)
  VALUES (
    '2월 정기 건강검진 일정 안내',
    '<h2>2월 정기 건강검진 일정</h2>
<p>어르신들의 건강관리를 위한 정기 건강검진을 다음과 같이 실시합니다.</p>
<h3>일시</h3>
<p>2026년 2월 20일(목) ~ 2월 21일(금)</p>
<h3>검진 항목</h3>
<ul>
  <li>혈압, 혈당 측정</li>
  <li>기본 혈액검사</li>
  <li>흉부 X-ray</li>
  <li>심전도 검사</li>
</ul>
<h3>주의사항</h3>
<p>검진 전날 저녁 9시 이후 금식이 필요합니다. 물은 소량 섭취 가능합니다.</p>
<p>기타 문의사항은 간호부(내선 201)로 연락 주시기 바랍니다.</p>',
    'GENERAL', FALSE, TRUE, 342, '2026-02-01 10:00:00', v_director_id
  ) RETURNING id INTO v_notice_2;

  INSERT INTO notices (title, content, category, is_pinned, is_active, view_count, published_at, created_by)
  VALUES (
    '겨울철 독감 예방접종 안내',
    '<h2>독감 예방접종 실시</h2>
<p>겨울철 독감 예방을 위한 예방접종을 실시합니다.</p>
<h3>대상</h3>
<p>전체 입소자 (보호자 동의 완료)</p>
<h3>일시</h3>
<p>2026년 2월 15일(토) 오전 10시</p>
<h3>장소</h3>
<p>1층 건강관리실</p>
<p>접종 후 이상반응 모니터링을 위해 30분간 대기실에서 관찰합니다.</p>',
    'GENERAL', FALSE, TRUE, 189, '2026-01-25 14:00:00', v_director_id
  ) RETURNING id INTO v_notice_3;

  INSERT INTO notices (title, content, category, is_pinned, is_active, view_count, published_at, created_by)
  VALUES (
    '면회 규칙 변경 안내',
    '<h2>면회 규칙 일부 변경</h2>
<p>어르신들의 안전과 건강을 위해 면회 규칙이 일부 변경됩니다.</p>
<h3>변경 내용</h3>
<ul>
  <li><strong>면회 시간</strong>: 평일 10:00~17:00, 주말 10:00~16:00</li>
  <li><strong>면회 인원</strong>: 1회 최대 2인</li>
  <li><strong>면회 장소</strong>: 1층 면회실 (생활실 방문 불가)</li>
</ul>
<h3>준수사항</h3>
<ul>
  <li>마스크 착용 필수</li>
  <li>손 소독 후 입실</li>
  <li>발열 체크 협조</li>
</ul>
<p>시행일: 2026년 2월 10일부터</p>',
    'GENERAL', TRUE, TRUE, 567, '2026-01-20 11:00:00', v_director_id
  ) RETURNING id INTO v_notice_4;

  INSERT INTO notices (title, content, category, is_pinned, is_active, view_count, published_at, created_by)
  VALUES (
    '식단 개선 안내',
    '<h2>식단 개선 사항 안내</h2>
<p>어르신들의 영양 상태 개선을 위해 식단을 일부 변경합니다.</p>
<h3>주요 변경 사항</h3>
<ul>
  <li>단백질 보충을 위한 육류 제공 횟수 증가</li>
  <li>저염식 제공으로 건강 관리 강화</li>
  <li>계절 과일 제공 확대</li>
</ul>
<p>개인별 식이 요구사항은 간호부와 상담 후 조정 가능합니다.</p>',
    'GENERAL', FALSE, TRUE, 234, '2026-01-18 09:30:00', v_director_id
  ) RETURNING id INTO v_notice_5;

  INSERT INTO notices (title, content, category, is_pinned, is_active, view_count, published_at, created_by)
  VALUES (
    '봄맞이 나들이 행사 안내',
    '<h2>봄맞이 나들이 행사</h2>
<p>따뜻한 봄을 맞아 야외 나들이 행사를 진행합니다.</p>
<h3>일시</h3>
<p>2026년 3월 25일(화) 오전 10시 ~ 오후 2시</p>
<h3>장소</h3>
<p>인근 ○○공원</p>
<h3>준비물</h3>
<ul>
  <li>편한 복장 및 운동화</li>
  <li>모자 또는 양산</li>
</ul>
<p>참여 희망 어르신은 2월 28일까지 신청해 주시기 바랍니다.</p>',
    'EVENT', FALSE, TRUE, 156, '2026-02-05 15:00:00', v_social_id
  ) RETURNING id INTO v_notice_6;

  INSERT INTO notices (title, content, category, is_pinned, is_active, view_count, published_at, created_by)
  VALUES (
    '보호자 교육 프로그램 안내',
    '<h2>보호자 대상 교육 프로그램</h2>
<p>치매 어르신 돌봄을 위한 보호자 교육을 실시합니다.</p>
<h3>교육 내용</h3>
<ul>
  <li>치매의 이해</li>
  <li>의사소통 방법</li>
  <li>응급상황 대처법</li>
</ul>
<h3>일시</h3>
<p>2026년 2월 28일(금) 오후 2시 ~ 4시</p>
<h3>장소</h3>
<p>2층 강당</p>
<p>참석을 원하시는 분은 사전 신청 부탁드립니다.</p>',
    'EDUCATION', FALSE, TRUE, 98, '2026-02-03 10:00:00', v_social_id
  ) RETURNING id INTO v_notice_7;

  -- 공지사항 첨부파일
  IF v_notice_1 IS NOT NULL AND v_file_1 IS NOT NULL THEN
    INSERT INTO notice_files (notice_id, file_id) VALUES (v_notice_1, v_file_1);
  END IF;
  IF v_notice_1 IS NOT NULL AND v_file_2 IS NOT NULL THEN
    INSERT INTO notice_files (notice_id, file_id) VALUES (v_notice_1, v_file_2);
  END IF;
  IF v_notice_4 IS NOT NULL AND v_file_3 IS NOT NULL THEN
    INSERT INTO notice_files (notice_id, file_id) VALUES (v_notice_4, v_file_3);
  END IF;

END$$;

-- ============================================
-- 2. 게시판 (BOARD_POSTS)
-- ============================================
DO $$
DECLARE
  v_director_id BIGINT;
  v_social_id   BIGINT;
  v_file_3      BIGINT;
  v_post_1      BIGINT;
  v_post_2      BIGINT;
  v_post_3      BIGINT;
  v_post_4      BIGINT;
  v_post_5      BIGINT;
  v_post_6      BIGINT;
  v_post_7      BIGINT;
  v_post_8      BIGINT;
  v_comment_1   BIGINT;
BEGIN
  SELECT id INTO v_director_id FROM employees WHERE email = 'director@agape-care.kr';
  SELECT id INTO v_social_id   FROM employees WHERE email = 'social1@agape-care.kr';
  SELECT id INTO v_file_3      FROM file_storage WHERE bucket = 'board' AND path = '2026/02/board_001.pdf';

  -- 자유게시판
  INSERT INTO board_posts (board_key, title, content, author_id, view_count, is_pinned)
  VALUES ('FREE', '새해 복 많이 받으세요!',
    '<p>2026년 새해를 맞아 모든 입소자분들과 가족분들께 건강과 행복이 가득하시길 기원합니다.</p>
<p>올해도 정성을 다해 어르신들을 모시겠습니다.</p>',
    v_director_id, 145, TRUE)
  RETURNING id INTO v_post_1;

  INSERT INTO board_posts (board_key, title, content, author_id, view_count, is_pinned)
  VALUES ('FREE', '감사 인사 드립니다',
    '<p>지난 한 해 동안 저희 시설을 믿고 맡겨주신 가족 여러분께 감사드립니다.</p>
<p>앞으로도 최선을 다하겠습니다.</p>',
    v_social_id, 87, FALSE)
  RETURNING id INTO v_post_2;

  INSERT INTO board_posts (board_key, title, content, author_id, view_count, is_pinned)
  VALUES ('FREE', '1월 생신 어르신 축하합니다',
    '<p>1월에 생신을 맞으신 어르신들께 축하 인사를 드립니다.</p>
<ul>
  <li>김순자 어르신 (1월 15일)</li>
  <li>박영희 어르신 (1월 22일)</li>
</ul>
<p>건강하시고 행복한 한 해 되시길 바랍니다.</p>',
    v_social_id, 123, FALSE)
  RETURNING id INTO v_post_3;

  -- 질문게시판
  INSERT INTO board_posts (board_key, title, content, author_id, view_count, is_pinned)
  VALUES ('QNA', '면회 시간 문의드립니다',
    '<p>안녕하세요.</p>
<p>주말 면회 가능한 시간이 궁금합니다.</p>
<p>평일에는 방문이 어려워서 주말에 방문하려고 하는데요.</p>',
    v_social_id, 56, FALSE)
  RETURNING id INTO v_post_4;

  INSERT INTO board_posts (board_key, title, content, author_id, view_count, is_pinned)
  VALUES ('QNA', '식단 조절 가능한가요?',
    '<p>어머니께서 당뇨가 있으신데 개인별 식단 조절이 가능한지 궁금합니다.</p>',
    v_director_id, 34, FALSE)
  RETURNING id INTO v_post_5;

  INSERT INTO board_posts (board_key, title, content, author_id, view_count, is_pinned)
  VALUES ('QNA', '외출 동행 문의',
    '<p>병원 진료를 위해 외출이 필요한데 직원분이 동행 가능한가요?</p>',
    v_social_id, 28, FALSE)
  RETURNING id INTO v_post_6;

  -- 건의게시판
  INSERT INTO board_posts (board_key, title, content, author_id, view_count, is_pinned)
  VALUES ('SUGGESTION', '프로그램 다양화 건의',
    '<p>현재 진행 중인 프로그램도 좋지만, 좀 더 다양한 활동이 있으면 좋겠습니다.</p>
<p>미술 치료나 원예 프로그램 같은 것도 고려해 주시면 감사하겠습니다.</p>',
    v_social_id, 45, FALSE)
  RETURNING id INTO v_post_7;

  INSERT INTO board_posts (board_key, title, content, author_id, view_count, is_pinned)
  VALUES ('SUGGESTION', '면회실 환경 개선 건의',
    '<p>면회실이 조금 좁아서 불편합니다.</p>
<p>가능하다면 공간 확장을 건의드립니다.</p>',
    v_director_id, 52, FALSE)
  RETURNING id INTO v_post_8;

  -- 게시판 첨부파일
  IF v_post_4 IS NOT NULL AND v_file_3 IS NOT NULL THEN
    INSERT INTO board_files (post_id, file_id) VALUES (v_post_4, v_file_3);
  END IF;

  -- 게시판 댓글
  -- 질문에 대한 답변
  INSERT INTO board_comments (post_id, parent_id, author_id, content, is_deleted)
  VALUES (v_post_4, NULL, v_director_id,
    '<p>주말 면회는 <strong>오전 10시부터 오후 4시</strong>까지 가능합니다.</p>
<p>방문 전 전화로 미리 알려주시면 더욱 원활한 면회가 가능합니다.</p>',
    FALSE)
  RETURNING id INTO v_comment_1;

  INSERT INTO board_comments (post_id, parent_id, author_id, content, is_deleted)
  VALUES (v_post_4, v_comment_1, v_social_id,
    '<p>감사합니다! 이번 주말에 방문하겠습니다.</p>',
    FALSE);

  INSERT INTO board_comments (post_id, parent_id, author_id, content, is_deleted)
  VALUES (v_post_5, NULL, v_director_id,
    '<p>개인별 식단 조절 가능합니다.</p>
<p>간호부(내선 201)로 연락 주시면 영양사와 상담 후 맞춤 식단을 제공해 드리겠습니다.</p>',
    FALSE);

  INSERT INTO board_comments (post_id, parent_id, author_id, content, is_deleted)
  VALUES (v_post_6, NULL, v_social_id,
    '<p>직원 동행 서비스를 제공하고 있습니다.</p>
<p>최소 3일 전에 예약해 주시면 일정을 조율해 드립니다.</p>',
    FALSE);

  -- 건의에 대한 답변
  INSERT INTO board_comments (post_id, parent_id, author_id, content, is_deleted)
  VALUES (v_post_7, NULL, v_director_id,
    '<p>소중한 의견 감사합니다.</p>
<p>3월부터 미술 치료 프로그램을 신규로 도입할 예정입니다.</p>
<p>원예 프로그램도 검토 중이니 조금만 기다려 주세요.</p>',
    FALSE);

  INSERT INTO board_comments (post_id, parent_id, author_id, content, is_deleted)
  VALUES (v_post_8, NULL, v_director_id,
    '<p>건의해 주신 사항 잘 받았습니다.</p>
<p>시설 개선 계획에 반영하도록 하겠습니다.</p>',
    FALSE);

  -- 삭제된 댓글 샘플
  INSERT INTO board_comments (post_id, parent_id, author_id, content, is_deleted)
  VALUES (v_post_1, NULL, v_social_id, '삭제된 댓글입니다.', TRUE);

END$$;

-- ============================================
-- 3. 갤러리 (GALLERY_ITEMS)
-- ============================================
DO $$
DECLARE
  v_social_id BIGINT;
  v_gallery_1 BIGINT;
  v_gallery_2 BIGINT;
  v_gallery_3 BIGINT;
  v_gallery_4 BIGINT;
  v_gallery_5 BIGINT;
  v_file_4    BIGINT;
  v_file_5    BIGINT;
  v_file_6    BIGINT;
  v_file_7    BIGINT;
  v_file_8    BIGINT;
BEGIN
  SELECT id INTO v_social_id FROM employees  WHERE email = 'social1@agape-care.kr';
  SELECT id INTO v_file_4    FROM file_storage WHERE bucket = 'gallery' AND path = '2026/01/gallery_001.jpg';
  SELECT id INTO v_file_5    FROM file_storage WHERE bucket = 'gallery' AND path = '2026/01/gallery_002.jpg';
  SELECT id INTO v_file_6    FROM file_storage WHERE bucket = 'gallery' AND path = '2026/01/gallery_003.jpg';
  SELECT id INTO v_file_7    FROM file_storage WHERE bucket = 'gallery' AND path = '2026/01/gallery_004.jpg';
  SELECT id INTO v_file_8    FROM file_storage WHERE bucket = 'gallery' AND path = '2026/01/gallery_005.jpg';

  INSERT INTO gallery_items (title, description, category, event_date, created_by, is_public)
  VALUES (
    '2026 신년 행사',
    '새해맞이 떡국 나누기 및 세배 행사를 진행했습니다. 어르신들께서 즐거운 시간을 보내셨습니다.',
    'EVENT', '2026-01-01', v_social_id, TRUE
  ) RETURNING id INTO v_gallery_1;

  INSERT INTO gallery_items (title, description, category, event_date, created_by, is_public)
  VALUES (
    '1월 생신 잔치',
    '1월 생신을 맞으신 어르신들을 위한 축하 행사를 열었습니다.',
    'EVENT', '2026-01-15', v_social_id, TRUE
  ) RETURNING id INTO v_gallery_2;

  INSERT INTO gallery_items (title, description, category, event_date, created_by, is_public)
  VALUES (
    '설맞이 전통놀이',
    '설날을 맞아 윷놀이, 제기차기 등 전통놀이를 함께 즐겼습니다.',
    'EVENT', '2026-01-28', v_social_id, TRUE
  ) RETURNING id INTO v_gallery_3;

  INSERT INTO gallery_items (title, description, category, event_date, created_by, is_public)
  VALUES (
    '겨울 나들이',
    '날씨가 좋은 날 근처 공원으로 나들이를 다녀왔습니다.',
    'DAILY', '2026-01-20', v_social_id, TRUE
  ) RETURNING id INTO v_gallery_4;

  INSERT INTO gallery_items (title, description, category, event_date, created_by, is_public)
  VALUES (
    '노래교실',
    '매주 목요일 진행되는 노래교실 활동 모습입니다.',
    'DAILY', '2026-01-23', v_social_id, TRUE
  ) RETURNING id INTO v_gallery_5;

  -- 갤러리 파일 연결
  -- 신년 행사 (3장)
  IF v_gallery_1 IS NOT NULL THEN
    IF v_file_4 IS NOT NULL THEN INSERT INTO gallery_files (gallery_id, file_id, sort_order) VALUES (v_gallery_1, v_file_4, 1); END IF;
    IF v_file_5 IS NOT NULL THEN INSERT INTO gallery_files (gallery_id, file_id, sort_order) VALUES (v_gallery_1, v_file_5, 2); END IF;
    IF v_file_6 IS NOT NULL THEN INSERT INTO gallery_files (gallery_id, file_id, sort_order) VALUES (v_gallery_1, v_file_6, 3); END IF;
  END IF;
  -- 생신 잔치 (2장)
  IF v_gallery_2 IS NOT NULL THEN
    IF v_file_7 IS NOT NULL THEN INSERT INTO gallery_files (gallery_id, file_id, sort_order) VALUES (v_gallery_2, v_file_7, 1); END IF;
    IF v_file_8 IS NOT NULL THEN INSERT INTO gallery_files (gallery_id, file_id, sort_order) VALUES (v_gallery_2, v_file_8, 2); END IF;
  END IF;
  -- 설맞이 전통놀이 (대표이미지만)
  IF v_gallery_3 IS NOT NULL AND v_file_4 IS NOT NULL THEN
    INSERT INTO gallery_files (gallery_id, file_id, sort_order) VALUES (v_gallery_3, v_file_4, 1);
  END IF;
  -- 겨울 나들이
  IF v_gallery_4 IS NOT NULL AND v_file_5 IS NOT NULL THEN
    INSERT INTO gallery_files (gallery_id, file_id, sort_order) VALUES (v_gallery_4, v_file_5, 1);
  END IF;
  -- 노래교실
  IF v_gallery_5 IS NOT NULL AND v_file_6 IS NOT NULL THEN
    INSERT INTO gallery_files (gallery_id, file_id, sort_order) VALUES (v_gallery_5, v_file_6, 1);
  END IF;

END$$;

-- ============================================
-- 4. 식단표 (MEAL_PLANS)
-- ============================================
DO $$
DECLARE
  v_cook_id   BIGINT;
  v_plan_1    BIGINT;
  v_plan_2    BIGINT;
BEGIN
  SELECT id INTO v_cook_id FROM employees WHERE email = 'cook1@agape-care.kr';

  -- 이번 주 식단 (게시됨)
  INSERT INTO meal_plans (facility_code, week_start_date, meal_month, created_by, nutrition_manager, status, notes)
  VALUES ('DEFAULT', '2026-02-03', 202602, v_cook_id, '박영희 영양사', 'PUBLISHED', '설 연휴 대체 식단 포함')
  ON CONFLICT (facility_code, week_start_date) DO NOTHING
  RETURNING id INTO v_plan_1;

  -- CONFLICT 발생 시 기존 ID 조회
  IF v_plan_1 IS NULL THEN
    SELECT id INTO v_plan_1 FROM meal_plans WHERE facility_code = 'DEFAULT' AND week_start_date = '2026-02-03';
  END IF;

  -- 다음 주 식단 (게시됨)
  INSERT INTO meal_plans (facility_code, week_start_date, meal_month, created_by, nutrition_manager, status, notes)
  VALUES ('DEFAULT', '2026-02-10', 202602, v_cook_id, '박영희 영양사', 'PUBLISHED', '정상 식단')
  ON CONFLICT (facility_code, week_start_date) DO NOTHING
  RETURNING id INTO v_plan_2;

  IF v_plan_2 IS NULL THEN
    SELECT id INTO v_plan_2 FROM meal_plans WHERE facility_code = 'DEFAULT' AND week_start_date = '2026-02-10';
  END IF;

  -- 다다음 주 식단 (작성중)
  INSERT INTO meal_plans (facility_code, week_start_date, meal_month, created_by, nutrition_manager, status, notes)
  VALUES ('DEFAULT', '2026-02-17', 202602, v_cook_id, '박영희 영양사', 'DRAFT', NULL)
  ON CONFLICT (facility_code, week_start_date) DO NOTHING;

  -- 식단 상세 항목 (1주차: 2026-02-03 ~ 2026-02-09)
  IF v_plan_1 IS NOT NULL THEN
    INSERT INTO meal_plan_items (meal_plan_id, meal_date, meal_type, menu_content, image_url, calories, notes) VALUES
      -- 월요일 (2/3)
      (v_plan_1,'2026-02-03','BREAKFAST','쇠고기미역국, 계란후라이, 김구이, 깍두기, 우유','/images/meals/breakfast.jpg',520,NULL),
      (v_plan_1,'2026-02-03','LUNCH','제육볶음, 두부조림, 시금치나물, 배추국, 귤','/images/meals/lunch.jpg',680,NULL),
      (v_plan_1,'2026-02-03','DINNER','생선구이, 감자조림, 콩나물무침, 미역국, 요구르트','/images/meals/dinner.jpg',610,NULL),
      -- 화요일 (2/4)
      (v_plan_1,'2026-02-04','BREAKFAST','북어국, 계란찜, 김, 깍두기, 우유','/images/meals/breakfast.jpg',500,NULL),
      (v_plan_1,'2026-02-04','LUNCH','닭볶음탕, 두부부침, 시금치나물, 무국, 사과','/images/meals/lunch.jpg',720,NULL),
      (v_plan_1,'2026-02-04','DINNER','돈가스, 샐러드, 단무지, 콩나물국, 푸딩','/images/meals/dinner.jpg',650,NULL),
      -- 수요일 (2/5)
      (v_plan_1,'2026-02-05','BREAKFAST','된장찌개, 계란프라이, 김, 깍두기, 우유','/images/meals/breakfast.jpg',510,NULL),
      (v_plan_1,'2026-02-05','LUNCH','불고기, 잡채, 나물, 배추국, 배','/images/meals/lunch.jpg',700,NULL),
      (v_plan_1,'2026-02-05','DINNER','고등어구이, 두부조림, 숙주나물, 미역국, 유산균','/images/meals/dinner.jpg',620,NULL),
      -- 목요일 (2/6)
      (v_plan_1,'2026-02-06','BREAKFAST','콩나물국, 계란찜, 김구이, 깍두기, 우유','/images/meals/breakfast.jpg',490,NULL),
      (v_plan_1,'2026-02-06','LUNCH','삼겹살김치찌개, 계란말이, 나물, 멸치볶음, 귤','/images/meals/lunch.jpg',710,NULL),
      (v_plan_1,'2026-02-06','DINNER','순두부찌개, 생선전, 시금치무침, 김치, 바나나','/images/meals/dinner.jpg',590,NULL),
      -- 금요일 (2/7)
      (v_plan_1,'2026-02-07','BREAKFAST','미역국, 계란후라이, 김, 깍두기, 우유','/images/meals/breakfast.jpg',520,NULL),
      (v_plan_1,'2026-02-07','LUNCH','비빔밥, 계란국, 김치전, 과일샐러드','/images/meals/lunch.jpg',730,NULL),
      (v_plan_1,'2026-02-07','DINNER','닭갈비, 야채볶음, 깍두기, 콩나물국, 요구르트','/images/meals/dinner.jpg',640,NULL),
      -- 토요일 (2/8)
      (v_plan_1,'2026-02-08','BREAKFAST','김치찌개, 계란프라이, 김구이, 깍두기, 우유','/images/meals/breakfast.jpg',530,NULL),
      (v_plan_1,'2026-02-08','LUNCH','갈비찜, 잡채, 나물3종, 미역국, 수박','/images/meals/lunch.jpg',750,'주말 특식'),
      (v_plan_1,'2026-02-08','DINNER','삼치구이, 두부조림, 시금치나물, 콩나물국, 푸딩','/images/meals/dinner.jpg',610,NULL),
      -- 일요일 (2/9) - 설날
      (v_plan_1,'2026-02-09','BREAKFAST','떡국, 전, 나물, 식혜','/images/meals/breakfast.jpg',580,'설날 특식'),
      (v_plan_1,'2026-02-09','LUNCH','갈비탕, 잡채, 전, 김치, 과일','/images/meals/lunch.jpg',780,'설날 특식'),
      (v_plan_1,'2026-02-09','DINNER','불고기, 계란찜, 나물, 미역국, 수정과','/images/meals/dinner.jpg',660,'설날 특식');
  END IF;

  -- 식단 상세 항목 (2주차: 2026-02-10 ~ 2026-02-16)
  IF v_plan_2 IS NOT NULL THEN
    INSERT INTO meal_plan_items (meal_plan_id, meal_date, meal_type, menu_content, image_url, calories, notes) VALUES
      -- 월요일 (2/10)
      (v_plan_2,'2026-02-10','BREAKFAST','된장찌개, 계란후라이, 김, 깍두기, 우유',NULL,510,NULL),
      (v_plan_2,'2026-02-10','LUNCH','제육볶음, 두부조림, 나물, 배추국, 사과',NULL,690,NULL),
      (v_plan_2,'2026-02-10','DINNER','고등어조림, 감자조림, 시금치나물, 미역국, 요구르트',NULL,600,NULL),
      -- 화요일 (2/11)
      (v_plan_2,'2026-02-11','BREAKFAST','미역국, 계란찜, 김구이, 깍두기, 우유',NULL,500,NULL),
      (v_plan_2,'2026-02-11','LUNCH','닭볶음탕, 잡채, 나물, 무국, 귤',NULL,720,NULL),
      (v_plan_2,'2026-02-11','DINNER','순두부찌개, 생선전, 콩나물무침, 배',NULL,590,NULL);
  END IF;

END$$;

-- ============================================
-- 5. 프로그램 (PROGRAMS)
-- ============================================
DO $$
DECLARE
  v_social_id BIGINT;
  v_prog_1    BIGINT;
  v_prog_2    BIGINT;
  v_prog_3    BIGINT;
  v_prog_4    BIGINT;
  v_prog_5    BIGINT;
  v_prog_6    BIGINT;
  v_prog_7    BIGINT;
BEGIN
  SELECT id INTO v_social_id FROM employees WHERE email = 'social1@agape-care.kr';

  INSERT INTO programs (title, description, category, is_active, created_by, meta)
  VALUES ('인지활동 프로그램',
    '기억력과 사고력 향상을 위한 인지 훈련 프로그램입니다. 퍼즐, 숫자 게임, 단어 맞추기 등 다양한 활동을 통해 두뇌를 활성화합니다.',
    'COGNITIVE', TRUE, v_social_id,
    '{"level":"초급/중급","duration":"60분","materials":["워크북","필기구","퍼즐"]}'::jsonb)
  RETURNING id INTO v_prog_1;

  INSERT INTO programs (title, description, category, is_active, created_by, meta)
  VALUES ('노래교실',
    '추억의 노래를 통한 정서 안정 프로그램입니다. 어르신들이 좋아하시는 옛날 노래를 함께 부르며 즐거운 시간을 보냅니다.',
    'MUSIC', TRUE, v_social_id,
    '{"level":"전체","duration":"60분","materials":["반주기","마이크","가사집"]}'::jsonb)
  RETURNING id INTO v_prog_2;

  INSERT INTO programs (title, description, category, is_active, created_by, meta)
  VALUES ('종이접기',
    '소근육 운동 및 집중력 향상을 위한 미술 활동입니다. 계절과 명절에 맞는 다양한 작품을 만듭니다.',
    'ART', TRUE, v_social_id,
    '{"level":"초급","duration":"60분","materials":["색종이","풀","가위"]}'::jsonb)
  RETURNING id INTO v_prog_3;

  INSERT INTO programs (title, description, category, is_active, created_by, meta)
  VALUES ('가벼운 체조',
    '건강 유지를 위한 스트레칭과 가벼운 체조 프로그램입니다. 관절 건강과 근력 향상에 도움이 됩니다.',
    'EXERCISE', TRUE, v_social_id,
    '{"level":"초급","duration":"30분","materials":["매트","의자","음악"]}'::jsonb)
  RETURNING id INTO v_prog_4;

  INSERT INTO programs (title, description, category, is_active, created_by, meta)
  VALUES ('영화감상',
    '문화생활 및 여가 활동 프로그램입니다. 어르신들이 좋아하시는 옛날 영화나 교양 프로그램을 감상합니다.',
    'RECREATION', TRUE, v_social_id,
    '{"level":"전체","duration":"90분","materials":["프로젝터","스피커"]}'::jsonb)
  RETURNING id INTO v_prog_5;

  INSERT INTO programs (title, description, category, is_active, created_by, meta)
  VALUES ('원예 프로그램',
    '식물을 가꾸며 정서적 안정을 얻는 프로그램입니다. 계절 꽃과 채소를 직접 심고 가꿉니다.',
    'ART', TRUE, v_social_id,
    '{"level":"초급","duration":"60분","materials":["화분","흙","씨앗","모종"]}'::jsonb)
  RETURNING id INTO v_prog_6;

  INSERT INTO programs (title, description, category, is_active, created_by, meta)
  VALUES ('회상 프로그램',
    '옛 추억을 떠올리며 이야기를 나누는 프로그램입니다. 사진, 음악, 물건 등을 활용하여 기억을 자극합니다.',
    'COGNITIVE', TRUE, v_social_id,
    '{"level":"전체","duration":"60분","materials":["옛날 사진","음악","추억의 물건들"]}'::jsonb)
  RETURNING id INTO v_prog_7;

  -- 프로그램 일정 (이번 주)
  INSERT INTO program_schedules (program_id, starts_at, ends_at, location, capacity, status) VALUES
    (v_prog_1,'2026-02-10 10:00:00+09','2026-02-10 11:00:00+09','1층 프로그램실',15,'PLANNED'),
    (v_prog_2,'2026-02-10 14:00:00+09','2026-02-10 15:00:00+09','2층 강당',20,'PLANNED'),
    (v_prog_4,'2026-02-11 09:00:00+09','2026-02-11 09:30:00+09','옥상 정원',10,'PLANNED'),
    (v_prog_3,'2026-02-11 15:00:00+09','2026-02-11 16:00:00+09','1층 프로그램실',12,'PLANNED'),
    (v_prog_5,'2026-02-12 14:00:00+09','2026-02-12 15:30:00+09','2층 강당',25,'PLANNED'),
    -- 다음 주 일정
    (v_prog_1,'2026-02-17 10:00:00+09','2026-02-17 11:00:00+09','1층 프로그램실',15,'PLANNED'),
    (v_prog_2,'2026-02-17 14:00:00+09','2026-02-17 15:00:00+09','2층 강당',20,'PLANNED'),
    (v_prog_6,'2026-02-18 10:00:00+09','2026-02-18 11:00:00+09','옥상 정원',10,'PLANNED'),
    (v_prog_7,'2026-02-18 15:00:00+09','2026-02-18 16:00:00+09','1층 프로그램실',12,'PLANNED'),
    -- 지난 일정 (완료)
    (v_prog_1,'2026-02-03 10:00:00+09','2026-02-03 11:00:00+09','1층 프로그램실',15,'DONE'),
    (v_prog_2,'2026-02-03 14:00:00+09','2026-02-03 15:00:00+09','2층 강당',20,'DONE'),
    (v_prog_4,'2026-02-04 09:00:00+09','2026-02-04 09:30:00+09','옥상 정원',10,'DONE');

END$$;

-- ============================================
-- 6. 팝업 배너 (POPUP_BANNERS)
-- ============================================
INSERT INTO popup_banners (title, content, image_url, link_url, display_type, start_date, end_date, is_active, priority)
VALUES
  ('신규 입소 상담 안내',
   '2026년 상반기 신규 입소 상담을 진행 중입니다.',
   '/images/popups/consultation.jpg', '/intro/consultation',
   'POPUP', '2026-02-01', '2026-12-31', TRUE, 10),
  ('보호자 전용 앱 런칭',
   '아가페케어 보호자 전용 앱이 런칭되었습니다.',
   '/images/popups/app_launch.jpg', '/notices',
   'MODAL', '2026-02-10', '2026-03-31', TRUE, 5);

-- ============================================
-- 7. 면회 예약 (VISIT_RESERVATIONS)
-- ============================================
INSERT INTO visit_reservations (
  visitor_name, visitor_phone, visitor_relationship, resident_name,
  visit_date, visit_time, visitor_count, visit_purpose,
  health_check_symptoms, health_check_assistance,
  notes, is_consented, status
) VALUES
  ('가보호자', '010-1111-2222', '딸', '가나다',
   '2026-02-15', '14:00', 2, '정기 방문',
   FALSE, FALSE, NULL, TRUE, 'APPROVED'),
  ('나보호자', '010-2222-3333', '아들', '나가다',
   '2026-02-20', '10:30', 1, '병원 동행 후 방문',
   FALSE, TRUE, '휠체어 이동 보조 필요', TRUE, 'PENDING'),
  ('다보호자', '010-3333-4444', '아들', '다가나',
   '2026-02-22', '11:00', 2, '어머니 생신 방문',
   FALSE, FALSE, '케이크 반입 가능 여부 확인 부탁드립니다', TRUE, 'PENDING'),
  ('라보호자', '010-4444-5555', '배우자', '라가나',
   '2026-02-10', '15:00', 1, '외박 복귀 확인',
   FALSE, FALSE, NULL, TRUE, 'APPROVED');

-- ============================================
-- 8. 웹 상담 문의 (WEB_INQUIRIES)
-- ============================================
INSERT INTO web_inquiries (
  name, phone, email, type,
  resident_age, care_grade, preferred_date,
  message, is_consented, status
) VALUES
  ('홍길동', '010-9999-1111', 'hong@email.com', '입소 상담',
   '82세', '3등급', '2026-02-25',
   '어머니가 치매 3등급 판정을 받으셨습니다. 시설 입소 상담을 받고 싶습니다.', TRUE, 'IN_PROGRESS'),
  ('이영희', '010-8888-2222', NULL, '비용 상담',
   '78세', '2등급', NULL,
   '장기요양보험 2등급인 아버지의 본인부담금이 얼마나 되는지 알고 싶습니다.', TRUE, 'DONE'),
  ('박민수', '010-7777-3333', 'park@email.com', '방문 상담',
   '75세', '미신청', '2026-03-05',
   '아직 장기요양등급을 신청하지 않은 상태입니다. 방문 상담 후 결정하고 싶습니다.', TRUE, 'PENDING');

-- ============================================
-- 9. 시설 정보 (FACILITIES) + 생활실 (ROOMS)
-- ============================================
INSERT INTO facilities (
  org_code, facility_name, facility_desc, facility_type, designated_date,
  director, director_phone, ceo_name, business_no, biz_type, staff_count,
  phone, fax, email, homepage, zip, address1, address2,
  total_capacity, short_stay_capacity, day_care_capacity
) VALUES (
  'F-2026-001', '아가페케어 요양원', '어르신들의 존엄한 노후를 위한 프리미엄 케어 서비스를 제공합니다.',
  '노인요양시설', '2020-03-01',
  '김원장', '010-1111-2222', '이아무개', '123-45-67890', '사회복지서비스업', 35,
  '02-1234-5678', '02-1234-5679', 'admin@agape-care.kr', 'https://agape-care.kr',
  '06234', '서울특별시 강남구 테헤란로 123', '아카이브 빌딩 7층',
  49, 5, 10
) ON CONFLICT (org_code) DO NOTHING;

DO $$
DECLARE
  v_facility_id BIGINT;
BEGIN
  SELECT id INTO v_facility_id FROM facilities WHERE org_code = 'F-2026-001';
  IF v_facility_id IS NOT NULL THEN
    INSERT INTO rooms (facility_id, floor, room_name, capacity) VALUES
      (v_facility_id, '1층', '101호', 4),
      (v_facility_id, '1층', '102호', 4),
      (v_facility_id, '1층', '103호', 4),
      (v_facility_id, '2층', '201호', 4),
      (v_facility_id, '2층', '202호', 4),
      (v_facility_id, '2층', '진달래방', 2),
      (v_facility_id, '3층', '301호(단기)', 3)
    ON CONFLICT (facility_id, floor, room_name) DO NOTHING;
  END IF;
END$$;

-- ============================================
-- 10. 사이트 설정 (SITE_INFOS)
-- ============================================
INSERT INTO site_infos (
  service_name, service_desc, contact_phone, contact_email, customer_hours,
  meta_title, meta_description, meta_keywords, footer_text, legal_notice
) VALUES (
  '아가페케어 요양원',
  '어르신들의 존엄한 노후를 위한 프리미엄 케어 서비스',
  '02-1234-5678', 'help@agape-care.kr',
  '평일 09:00 ~ 18:00 (주말 및 공휴일 휴무)',
  '아가페케어 요양원 | 프리미엄 시니어 케어',
  '2026년 최신 설비와 전문 인력을 갖춘 아가페케어에서 어르신들의 행복한 일상을 함께합니다.',
  '요양원, 노인복지, 주야간보호, 아가페케어',
  '© 2026 Agape-Care. All rights reserved.',
  '본 사이트의 모든 콘텐츠는 저작권법의 보호를 받습니다.'
);

-- ============================================
-- 11. 알림 템플릿 (NOTIFICATION_TEMPLATES)
-- ============================================
INSERT INTO notification_templates (name, category, channel, content, variables, status, usage_count) VALUES
  ('입소 환영 안내', '입소안내', 'SMS',
   '안녕하세요, {{name}}님. 아가페케어 요양원에 오신 것을 환영합니다. 입소일: {{date}}',
   '["{{name}}", "{{date}}"]'::jsonb, 'ACTIVE', 12),
  ('투약 알림', '투약알림', 'SMS',
   '{{name}}님의 {{time}} 투약 시간입니다. 담당 직원이 방문할 예정입니다.',
   '["{{name}}", "{{time}}"]'::jsonb, 'ACTIVE', 45),
  ('면회 예약 확인', '면회안내', 'SMS',
   '{{guardian_name}}님, {{date}} {{time}} 면회 예약이 확인되었습니다.',
   '["{{guardian_name}}", "{{date}}", "{{time}}"]'::jsonb, 'ACTIVE', 8),
  ('긴급 상황 알림', '긴급', 'SMS',
   '긴급 알림: {{resident_name}}님께서 {{situation}} 상황이 발생하였습니다. 연락처: {{phone}}',
   '["{{resident_name}}", "{{situation}}", "{{phone}}"]'::jsonb, 'ACTIVE', 3),
  ('월간 생활 보고', '생활보고', 'EMAIL',
   '안녕하세요 {{guardian_name}}님, {{month}}월 {{resident_name}}님의 생활 보고서를 전달드립니다.',
   '["{{guardian_name}}", "{{month}}", "{{resident_name}}"]'::jsonb, 'ACTIVE', 22),
  ('연말 인사 템플릿', '기타', 'SMS',
   '{{name}}님, 한 해 동안 아가페케어를 믿고 맡겨주셔서 감사합니다.',
   '["{{name}}"]'::jsonb, 'INACTIVE', 1)
ON CONFLICT DO NOTHING;

-- ============================================
-- 12. 수신자 그룹 (RECIPIENT_GROUPS)
-- ============================================
INSERT INTO recipient_groups (name, description, type, status, member_count, usage_count) VALUES
  ('전체 보호자', '모든 입소자의 보호자 그룹', 'GUARDIAN', 'ACTIVE', 29, 15),
  ('전체 직원',   '모든 재직 직원 그룹',       'STAFF',    'ACTIVE', 22,  8),
  ('1층 보호자',  '1층 생활실 입소자 보호자',  'GUARDIAN', 'ACTIVE', 15,  3),
  ('2층 보호자',  '2층 생활실 입소자 보호자',  'GUARDIAN', 'ACTIVE', 14,  2),
  ('치매 입소자 보호자', '치매 진단 입소자 보호자 그룹', 'GUARDIAN', 'ACTIVE', 12, 5),
  ('요양보호사팀', '요양보호사 직원 그룹',     'STAFF',    'ACTIVE', 15,  4)
ON CONFLICT DO NOTHING;

-- ============================================
-- 13. 문자 크레딧 이력 (SMS_CREDITS)
-- ============================================
INSERT INTO sms_credits (balance, deducted_amount, method, description, created_at) VALUES
  (1000,  -1000, 'SMS', '초기 크레딧 충전',          NOW() - INTERVAL '30 days'),
  ( 998,      2, 'SMS', '테스트 발송',                NOW() - INTERVAL '25 days'),
  ( 985,     13, 'SMS', '입소 안내 발송 (13건)',       NOW() - INTERVAL '20 days'),
  ( 982,      3, 'LMS', '긴급 알림 발송 (1건)',        NOW() - INTERVAL '15 days'),
  ( 960,     22, 'SMS', '월간 보고 알림 (22건)',       NOW() - INTERVAL '7 days'),
  ( 957,      3, 'SMS', '면회 예약 확인 (3건)',        NOW() - INTERVAL '2 days')
ON CONFLICT DO NOTHING;

-- ============================================
-- 14. 자료실 파일 (FACILITY_FILES)
-- ============================================
INSERT INTO facility_files (name, category, file_url, file_type, size, uploaded_by, created_at) VALUES
  ('2026년 케어플랜 양식',      '케어플랜', '/files/careplan-2026.xlsx',        'xlsx', 245760,   '관리자',   NOW() - INTERVAL '60 days'),
  ('입소계약서 양식 (최신)',     '운영서식', '/files/contract-form-v3.docx',     'docx', 163840,   '관리자',   NOW() - INTERVAL '45 days'),
  ('장기요양급여 청구 가이드',   '행정서류', '/files/insurance-claim-guide.pdf', 'pdf',  1048576,  '원장',     NOW() - INTERVAL '30 days'),
  ('치매예방 프로그램 교재',     '교육자료', '/files/dementia-prevention.pdf',   'pdf',  3145728,  '사회복지사',NOW() - INTERVAL '20 days'),
  ('직원 근무 수칙',             '행정서류', '/files/staff-work-rules.docx',     'docx', 122880,   '관리자',   NOW() - INTERVAL '15 days'),
  ('물리치료 안전 지침',         '교육자료', '/files/physio-safety-guide.pdf',   'pdf',  819200,   '물리치료사',NOW() - INTERVAL '10 days'),
  ('2025년 결산 보고서',         '행정서류', '/files/annual-report-2025.xlsx',   'xlsx', 491520,   '원장',     NOW() - INTERVAL '5 days'),
  ('어르신 인지활동 프로그램',   '교육자료', '/files/cognitive-program.pdf',     'pdf',  2097152,  '사회복지사',NOW() - INTERVAL '3 days')
ON CONFLICT DO NOTHING;

-- ============================================
-- 15. 입소자 + 연관 데이터
-- ============================================
DO $$
DECLARE
  v_emp_id     BIGINT;
  v_resident_1 BIGINT;
  v_resident_2 BIGINT;
  v_resident_3 BIGINT;
  v_resident_4 BIGINT;
  v_room_101   BIGINT;
  v_room_102   BIGINT;
  v_room_201   BIGINT;
  v_room_jin   BIGINT;
  v_care_plan_1 BIGINT;
  v_care_plan_2 BIGINT;
BEGIN
  SELECT id INTO v_emp_id FROM employees WHERE email = 'social1@agape-care.kr';

  -- 입소자 4명
  INSERT INTO residents (code, name, birthday, gender, admission_date, status, guardian_name, guardian_phone, memo, meta)
  VALUES
    ('R-2026-001', '가나다', '1945-01-15', 'F', '2026-01-23', 'ADMITTED', '가보호자', '010-1111-2222',
     '관절염, 약간의 인지저하, 당뇨있음',
     '{"grade":"3","gradeValidUntil":"2027-01-14","copayRate":15,"mainDiseases":["관절염","인지저하","당뇨"]}'::jsonb),
    ('R-2026-002', '나가다', '1938-07-22', 'M', '2026-01-15', 'ADMITTED', '나보호자', '010-2222-3333',
     '뇌졸중 후유증, 편마비',
     '{"grade":"2","gradeValidUntil":"2026-12-31","copayRate":12,"mainDiseases":["뇌졸중","편마비"]}'::jsonb),
    ('R-2026-003', '다가나', '1942-03-10', 'F', '2025-11-01', 'ADMITTED', '다보호자', '010-3333-4444',
     '치매(중등도), 당뇨, 고혈압',
     '{"grade":"4","gradeValidUntil":"2027-06-30","copayRate":0,"mainDiseases":["치매","당뇨","고혈압"]}'::jsonb),
    ('R-2026-004', '라가나', '1950-09-05', 'M', '2026-02-01', 'ON_LEAVE', '라보호자', '010-4444-5555',
     '파킨슨병, 우울증',
     '{"grade":"2","gradeValidUntil":"2026-10-15","copayRate":8,"mainDiseases":["파킨슨병","우울증"]}'::jsonb)
  ON CONFLICT (code) DO NOTHING;

  SELECT id INTO v_resident_1 FROM residents WHERE code = 'R-2026-001';
  SELECT id INTO v_resident_2 FROM residents WHERE code = 'R-2026-002';
  SELECT id INTO v_resident_3 FROM residents WHERE code = 'R-2026-003';
  SELECT id INTO v_resident_4 FROM residents WHERE code = 'R-2026-004';
  SELECT id INTO v_room_101   FROM rooms WHERE room_name = '101호';
  SELECT id INTO v_room_102   FROM rooms WHERE room_name = '102호';
  SELECT id INTO v_room_201   FROM rooms WHERE room_name = '201호';
  SELECT id INTO v_room_jin   FROM rooms WHERE room_name = '진달래방';

  IF v_resident_1 IS NOT NULL THEN

    -- 생활실 배정
    INSERT INTO resident_rooms (resident_id, room_id, starts_at, is_primary)
    VALUES (v_resident_1, v_room_101, '2026-01-23', TRUE),
           (v_resident_2, v_room_201, '2026-01-15', TRUE),
           (v_resident_3, v_room_102, '2025-11-01', TRUE),
           (v_resident_4, v_room_jin, '2026-02-01', TRUE)
    ON CONFLICT DO NOTHING;

    -- 보호자 연락처
    INSERT INTO resident_contacts (resident_id, name, relationship, phone_number, email, address, is_primary, receive_notice)
    VALUES
      (v_resident_1, '가보호자', '딸',   '010-1111-2222', 'guardian1@email.com', '서울시 강남구 테헤란로 1길', TRUE, TRUE),
      (v_resident_2, '나보호자', '아들', '010-2222-3333', 'guardian2@email.com', '서울시 서초구 반포대로 2길', TRUE, TRUE),
      (v_resident_3, '다보호자', '아들', '010-3333-4444', 'guardian3@email.com', '인천시 부평구 부평대로 3길', TRUE, FALSE),
      (v_resident_4, '라보호자', '배우자','010-4444-5555', 'guardian4@email.com', '서울시 마포구 홍대입구로 4길', TRUE, TRUE)
    ON CONFLICT DO NOTHING;

    -- 투약 정보
    INSERT INTO resident_medications (resident_id, prescribed_by, drug_name, dosage, schedule, start_date, end_date) VALUES
      (v_resident_1, '김내과',   '메트포르민', '500mg', '아침·저녁 식후',           '2026-01-23', NULL),
      (v_resident_1, '이정형외과','세레콕시브', '200mg', '저녁 식후',               '2026-01-23', '2026-06-30'),
      (v_resident_2, '박신경외과','아스피린',   '100mg', '아침 식후',               '2026-01-15', NULL),
      (v_resident_3, '최신경과', '도네페질',   '10mg',  '저녁 취침 전',            '2025-11-01', NULL),
      (v_resident_3, '최신경과', '메트포르민', '500mg', '아침·점심·저녁 식후',     '2025-11-01', NULL),
      (v_resident_4, '한신경과', '레보도파',   '100mg', '아침·점심·저녁 식후 1시간 전', '2026-02-01', NULL)
    ON CONFLICT DO NOTHING;

    -- 기초평가
    INSERT INTO resident_assessments (resident_id, assessed_by, assessment_type, assessment_round, reason, assessed_at, scores, total_score, risk_level, notes) VALUES
      (v_resident_1, v_emp_id, 'FALL_RISK', 1, 'INITIAL', '2026-01-24',
       '{"age":3,"mental":1,"elimination":2,"fall_history":0,"activity":2,"gait":2,"medication":1}'::jsonb,
       11, '고위험', '낙상 경험 없으나 보행기 사용으로 주의 필요'),
      (v_resident_2, v_emp_id, 'FALL_RISK', 1, 'INITIAL', '2026-01-16',
       '{"age":4,"mental":0,"elimination":3,"fall_history":2,"activity":3,"gait":3,"medication":2}'::jsonb,
       17, '고위험', '편마비로 낙상 위험 매우 높음, 1인 도움 필수'),
      (v_resident_2, v_emp_id, 'BEDSORE', 1, 'INITIAL', '2026-01-16',
       '{"sensory":2,"moisture":2,"activity":1,"mobility":2,"nutrition":2,"friction":1}'::jsonb,
       10, '고위험', '와상 상태로 2시간마다 체위 변경 필요'),
      (v_resident_3, v_emp_id, 'COGNITIVE', 1, 'INITIAL', '2025-11-05',
       '{"orientation":2,"memory":1,"attention":2,"language":3,"visuospatial":2}'::jsonb,
       10, '중등도', 'CDR 1.5 수준, 일상생활 부분 지원 필요')
    ON CONFLICT DO NOTHING;

    -- 상담일지
    INSERT INTO consultation_records (resident_id, counselor_id, consulted_at, type, channel, summary, details, follow_up_date) VALUES
      (v_resident_1, v_emp_id, NOW() - INTERVAL '30 days', 'FAMILY', '전화',
       '입소 초기 적응 상담 - 보호자 면담',
       '보호자(딸)와 전화 상담. 식사량 양호, 수면 패턴 안정 중. 관절 통증 약물 복용 중임을 확인.',
       (CURRENT_DATE + INTERVAL '30 days')::DATE),
      (v_resident_3, v_emp_id, NOW() - INTERVAL '15 days', 'GENERAL', '대면',
       '치매 증상 변화 상담 - 가족 직접 방문',
       '야간 배회 증상 일부 개선. 음악 프로그램 참여 후 정서 안정 효과 확인.',
       NULL),
      (v_resident_4, v_emp_id, NOW() - INTERVAL '5 days', 'MEDICAL', '대면',
       '파킨슨 증상 경과 및 투약 조정 상담',
       '레보도파 복용 시간 조정. 최근 진전 증상 다소 악화되어 추적 관찰 필요.',
       (CURRENT_DATE + INTERVAL '14 days')::DATE)
    ON CONFLICT DO NOTHING;

    -- 케어 플랜
    INSERT INTO care_plans (resident_id, created_by, title, goal_summary, start_date, status)
    VALUES (v_resident_1, v_emp_id, '2026년 상반기 케어 플랜 - 가나다',
            '관절염 통증 관리, 인지기능 유지, 자립 생활 극대화', '2026-01-23', 'ACTIVE')
    RETURNING id INTO v_care_plan_1;

    IF v_care_plan_1 IS NOT NULL THEN
      INSERT INTO care_plan_items (care_plan_id, sequence_no, description, frequency, notes) VALUES
        (v_care_plan_1, 1, '아침·저녁 혈당 측정', '매일 2회', NULL),
        (v_care_plan_1, 2, '보행기 이용 복도 보행 훈련', '매일 2회, 각 15분', '낙상 주의'),
        (v_care_plan_1, 3, '인지활동 프로그램 참여', '주 3회', NULL),
        (v_care_plan_1, 4, '온욕/반신욕 보조', '주 2회', '관절 온열 요법 병행')
      ON CONFLICT (care_plan_id, sequence_no) DO NOTHING;
    END IF;

    INSERT INTO care_plans (resident_id, created_by, title, goal_summary, start_date, status)
    VALUES (v_resident_2, v_emp_id, '2026년 상반기 케어 플랜 - 나가다',
            '욕창 예방, 낙상 방지, 재활 유지', '2026-01-15', 'ACTIVE')
    RETURNING id INTO v_care_plan_2;

    IF v_care_plan_2 IS NOT NULL THEN
      INSERT INTO care_plan_items (care_plan_id, sequence_no, description, frequency, notes) VALUES
        (v_care_plan_2, 1, '2시간마다 체위 변경', '매일', '욕창 예방'),
        (v_care_plan_2, 2, '수동적 관절 운동 (ROM)', '매일 1회 30분', '물리치료사 협력'),
        (v_care_plan_2, 3, '흡인 방지 식사 자세 지원', '매 식사', '좌위 90도 유지'),
        (v_care_plan_2, 4, '피부 상태 관찰 및 기록', '매일', NULL)
      ON CONFLICT (care_plan_id, sequence_no) DO NOTHING;
    END IF;

    -- 비급여/기타 항목
    INSERT INTO resident_extra_costs (resident_id, created_by, year_month, item_name, unit_price, quantity, total_amount, occurred_at) VALUES
      (v_resident_1, v_emp_id, '2026-02', '식재료비(석식)',   3500, 25,  87500, '2026-02-28'),
      (v_resident_2, v_emp_id, '2026-02', '식재료비(석식)',   3500, 25,  87500, '2026-02-28'),
      (v_resident_2, v_emp_id, '2026-02', '물리치료비(개인)', 15000, 4,  60000, '2026-02-28'),
      (v_resident_3, v_emp_id, '2026-02', '식재료비(석식)',   3500, 25,  87500, '2026-02-28')
    ON CONFLICT DO NOTHING;

    -- 본인부담금
    INSERT INTO resident_payments (resident_id, payment_month, claim_amount, paid_amount, unpaid_amount, deposit_date, depositor_name, payment_method) VALUES
      (v_resident_1, '2026-01', 191690, 191690,      0, '2026-02-05', '가보호자', 'BANK_TRANSFER'),
      (v_resident_2, '2026-01', 245780, 245780,      0, '2026-02-03', '나보호자', 'BANK_TRANSFER'),
      (v_resident_3, '2026-01',      0,      0,      0, NULL, NULL, NULL),
      (v_resident_4, '2026-01', 178900,      0, 178900, NULL, NULL, NULL)
    ON CONFLICT DO NOTHING;

    -- 건강 노트
    INSERT INTO resident_health_notes (resident_id, recorded_by, note_type, content) VALUES
      (v_resident_1, v_emp_id, 'GENERAL', '오늘 아침 식사 잘 하심. 혈당 128mg/dL. 오후 보행 훈련 15분 수행.'),
      (v_resident_2, v_emp_id, 'GENERAL', '체위 변경 2시간마다 수행. 천골 부위 발적 없음. 식사 도움 제공.'),
      (v_resident_3, v_emp_id, 'EMERGENCY', '야간 22:00경 배회 발생. 안전하게 생활실로 안내 완료. 담당 간호사 보고함.')
    ON CONFLICT DO NOTHING;

    -- 활력징후
    INSERT INTO resident_vitals (resident_id, recorded_by, measured_at, systolic_bp, diastolic_bp, heart_rate, temperature, spo2) VALUES
      (v_resident_1, v_emp_id, NOW() - INTERVAL '1 day', 128, 78, 72, 36.5, 98),
      (v_resident_1, v_emp_id, NOW(),                    132, 80, 74, 36.6, 97),
      (v_resident_2, v_emp_id, NOW() - INTERVAL '1 day', 145, 88, 80, 36.8, 95),
      (v_resident_2, v_emp_id, NOW(),                    142, 85, 78, 36.7, 96),
      (v_resident_3, v_emp_id, NOW(),                    138, 84, 76, 36.4, 98),
      (v_resident_4, v_emp_id, NOW(),                    118, 72, 68, 36.3, 99)
    ON CONFLICT DO NOTHING;

    -- 일일 케어 기록
    INSERT INTO daily_care_records (resident_id, date, nursing, weight, oral, elimination) VALUES
      (v_resident_1, CURRENT_DATE,
       '{"condition":"양호","notes":"특이사항 없음"}'::jsonb,
       '{"value":52.3,"unit":"kg"}'::jsonb,
       '{"morning":true,"evening":true}'::jsonb,
       '{"urine":{"count":5,"normal":true},"stool":{"count":1,"normal":true}}'::jsonb),
      (v_resident_2, CURRENT_DATE,
       '{"condition":"주의","notes":"체위변경 2시간 간격 수행"}'::jsonb,
       '{"value":68.1,"unit":"kg"}'::jsonb,
       '{"morning":true,"evening":false}'::jsonb,
       '{"urine":{"count":4,"normal":true},"stool":{"count":0,"normal":false},"notes":"변비 경향"}'::jsonb),
      (v_resident_3, CURRENT_DATE,
       '{"condition":"양호","notes":"오전 인지활동 프로그램 참여"}'::jsonb,
       '{"value":55.8,"unit":"kg"}'::jsonb,
       '{"morning":true,"evening":true}'::jsonb,
       '{"urine":{"count":6,"normal":true},"stool":{"count":1,"normal":true}}'::jsonb)
    ON CONFLICT (resident_id, date) DO NOTHING;

    -- 입퇴소 이력
    INSERT INTO resident_admission_histories (resident_id, history_type, occurred_at, reason) VALUES
      (v_resident_1, 'ADMISSION', '2026-01-23 10:00:00+09', '가족 요청에 의한 입소'),
      (v_resident_2, 'ADMISSION', '2026-01-15 11:00:00+09', '병원 퇴원 후 입소'),
      (v_resident_3, 'ADMISSION', '2025-11-01 09:00:00+09', '치매 진단 후 입소'),
      (v_resident_4, 'ADMISSION', '2026-02-01 10:00:00+09', '파킨슨 진행으로 입소'),
      (v_resident_4, 'LEAVE',     '2026-02-10 09:00:00+09', '자녀 집 임시 외박')
    ON CONFLICT DO NOTHING;

    -- 프로그램 참석 기록 (완료된 일정에 대해)
    INSERT INTO program_attendance (schedule_id, resident_id, role, attended, checked_at)
    SELECT ps.id, v_resident_1, 'PARTICIPANT', TRUE, ps.starts_at + INTERVAL '5 minutes'
    FROM program_schedules ps WHERE ps.status = 'DONE'
    ON CONFLICT (schedule_id, resident_id) DO NOTHING;

    INSERT INTO program_attendance (schedule_id, resident_id, role, attended, checked_at)
    SELECT ps.id, v_resident_3, 'PARTICIPANT', TRUE, ps.starts_at + INTERVAL '10 minutes'
    FROM program_schedules ps WHERE ps.status = 'DONE'
    ON CONFLICT (schedule_id, resident_id) DO NOTHING;

  END IF;
END$$;

-- ============================================
-- 16. 시스템 설정 (SYSTEM_SETTINGS)
-- ============================================
INSERT INTO system_settings (key, value, description) VALUES
  ('app.version',          '"1.0.0"'::jsonb,                               '애플리케이션 버전'),
  ('app.maintenance',      'false'::jsonb,                                  '점검 모드 여부'),
  ('visit.max_per_day',    '20'::jsonb,                                     '1일 최대 면회 허용 건수'),
  ('visit.time_slots',     '["10:00","11:00","14:00","15:00","16:00"]'::jsonb, '면회 예약 가능 시간'),
  ('sms.sender_number',    '"0212345678"'::jsonb,                           '문자 발신 번호'),
  ('meal.default_facility','\"DEFAULT\""'::jsonb,                           '기본 시설 코드')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- ============================================
-- 17. 근무 시간 템플릿 (SHIFT_TEMPLATES)
-- ============================================
INSERT INTO shift_templates (code, name, start_time, end_time) VALUES
  ('DAY',   '주간반',   '08:00', '16:00'),
  ('SWING', '준야반',   '16:00', '00:00'),
  ('NIGHT', '야간반',   '00:00', '08:00'),
  ('FULL',  '전일근무', '09:00', '18:00')
ON CONFLICT (code) DO NOTHING;

-- ============================================
-- 18. 계정과목 분류 & 계정과목 (ACCOUNT_CATEGORIES, ACCOUNTS)
-- ============================================
INSERT INTO account_categories (code, name, kind) VALUES
  ('100', '유동자산',   '자산'),
  ('200', '비유동자산', '자산'),
  ('300', '유동부채',   '부채'),
  ('400', '비유동부채', '부채'),
  ('500', '자본',       '자본'),
  ('600', '수익',       '수익'),
  ('700', '비용',       '비용')
ON CONFLICT (code) DO NOTHING;

INSERT INTO accounts (code, name, description, is_active,
  category_id)
SELECT a.code, a.name, a.description, TRUE,
  (SELECT id FROM account_categories WHERE code = a.cat_code)
FROM (VALUES
  ('110', '현금및현금성자산', '현금, 보통예금', '100'),
  ('120', '미수금',           '미수 청구금',    '100'),
  ('410', '장기차입금',       '금융기관 차입금','400'),
  ('610', '장기요양급여수익', '건보 급여 수입', '600'),
  ('620', '본인부담금수익',   '입소자 본인부담','600'),
  ('710', '인건비',           '급여 및 수당',   '700'),
  ('720', '운영비',           '시설 운영 비용', '700'),
  ('730', '급식비',           '식재료 및 조리', '700')
) AS a(code, name, description, cat_code)
ON CONFLICT (code) DO NOTHING;

-- ============================================
-- 19. 거래처 (SUPPLIERS)
-- ============================================
INSERT INTO suppliers (name, business_no, phone_number, email, address, memo) VALUES
  ('한국식품㈜',     '111-22-33333', '02-3333-4444', 'food@korea.com',    '서울시 송파구 식품로 1', '주 식재료 납품업체'),
  ('메디팜약국',     '222-33-44444', '02-4444-5555', NULL,               '서울시 강남구 약국로 2', '의약품 납품'),
  ('클린서비스㈜',   '333-44-55555', '02-5555-6666', 'clean@svc.com',    '서울시 마포구 청소로 3', '세탁 및 청소'),
  ('대한의료기기㈜', '444-55-66666', '02-6666-7777', 'medical@equip.com','경기도 성남시 기기로 4', '의료기기 납품')
ON CONFLICT DO NOTHING;

-- ============================================
-- 20. 재고 품목 (INVENTORY_ITEMS)
-- ============================================
INSERT INTO inventory_items (code, name, category, unit, current_stock, min_stock, unit_price, storage_location) VALUES
  ('MED-001', '일회용 장갑 (대)',      '소모품', '박스', 15,  5, 12000, '1층 창고'),
  ('MED-002', '마스크 (KF94)',         '소모품', '박스', 20,  5,  8500, '1층 창고'),
  ('MED-003', '소독용 에탄올 70%',    '소독제', '병',    8,  3, 15000, '1층 창고'),
  ('MED-004', '혈당 측정 스트립',     '의료소모','박스',  6,  2, 35000, '간호실'),
  ('FOOD-001','쌀 (20kg)',             '식재료', '포대', 12,  3, 45000, '조리실 창고'),
  ('FOOD-002','참기름',               '식재료', '병',    5,  2, 18000, '조리실 창고'),
  ('EQP-001', '휠체어 (표준형)',       '기기',   '대',    8,  2,350000, '1층 기기실'),
  ('EQP-002', '보행기',               '기기',   '대',    6,  2,120000, '1층 기기실')
ON CONFLICT (code) DO NOTHING;

-- ============================================
-- 21. 차량 (VEHICLES)
-- ============================================
INSERT INTO vehicles (vehicle_no, vehicle_type, purpose, ownership, driver, model, manufacturer, year, capacity, status) VALUES
  ('12가3456', '승합차', 'TRANSPORT', 'OWNED',  '김기사', '스타리아', '현대',  2022, 9, 'ACTIVE'),
  ('78나9012', '승용차', 'ADMIN',     'LEASED', '이기사', 'K8',      '기아',  2023, 5, 'ACTIVE')
ON CONFLICT (vehicle_no) DO NOTHING;

-- ============================================
-- 22. CCTV 장비 (CCTV_DEVICES)
-- ============================================
DO $$
DECLARE
  v_room_101 BIGINT;
  v_room_201 BIGINT;
BEGIN
  SELECT id INTO v_room_101 FROM rooms WHERE room_name = '101호';
  SELECT id INTO v_room_201 FROM rooms WHERE room_name = '201호';

  INSERT INTO cctv_devices (device_no, location, ip_address, model, install_date, status, consent_required, room_id) VALUES
    ('CAM-001', '1층 로비',    '192.168.1.101', 'DS-2CD2143G2-I', '2023-01-01', 'ACTIVE', FALSE, NULL),
    ('CAM-002', '1층 복도',    '192.168.1.102', 'DS-2CD2143G2-I', '2023-01-01', 'ACTIVE', FALSE, NULL),
    ('CAM-003', '2층 복도',    '192.168.1.103', 'DS-2CD2143G2-I', '2023-01-01', 'ACTIVE', FALSE, NULL),
    ('CAM-004', '1층 101호',   '192.168.1.104', 'DS-2CD2163G2-I', '2023-06-01', 'ACTIVE', TRUE,  v_room_101),
    ('CAM-005', '2층 201호',   '192.168.1.105', 'DS-2CD2163G2-I', '2023-06-01', 'ACTIVE', TRUE,  v_room_201)
  ON CONFLICT (device_no) DO NOTHING;
END$$;

-- ============================================
-- 23. 시설 점검 (FACILITY_INSPECTIONS)
-- ============================================
INSERT INTO facility_inspections (inspection_date, inspection_type, title, frequency, location, status, completed_date, next_inspection_date) VALUES
  ('2026-01-15', '소방점검',   '1월 소방 설비 점검',   '월간', '전체', 'COMPLETED', '2026-01-15 14:00:00+09', '2026-02-15'),
  ('2026-01-20', '위생점검',   '1월 급식 위생 점검',   '월간', '조리실', 'COMPLETED','2026-01-20 11:00:00+09', '2026-02-20'),
  ('2026-02-15', '소방점검',   '2월 소방 설비 점검',   '월간', '전체', 'SCHEDULED', NULL,                     '2026-03-15'),
  ('2026-02-20', '위생점검',   '2월 급식 위생 점검',   '월간', '조리실', 'SCHEDULED',NULL,                    '2026-03-20'),
  ('2026-03-01', '정기안전점검','1분기 정기 안전 점검', '분기', '전체', 'SCHEDULED', NULL,                     '2026-06-01')
ON CONFLICT DO NOTHING;

-- ============================================
-- 24. 민원 (GRIEVANCES)
-- ============================================
INSERT INTO grievances (grievance_no, complainant_name, complainant_phone, complainant_relation, category, title, content, received_method, status, response) VALUES
  ('GR-2026-001', '가보호자', '010-1111-2222', '딸', '서비스',
   '식사 온도 개선 요청',
   '어머니 식사가 식어서 제공되는 경우가 있어 개선을 요청드립니다.',
   '방문', 'RESOLVED',
   '급식 보온용기를 추가 구비하여 식사 온도 유지를 강화하였습니다. 개선 조치 완료.'),
  ('GR-2026-002', '다보호자', '010-3333-4444', '아들', '환경',
   '생활실 소음 문제',
   '야간에 옆 방에서 소리가 들려 어머니 수면에 방해가 됩니다.',
   '전화', 'IN_PROGRESS', NULL)
ON CONFLICT (grievance_no) DO NOTHING;

-- ============================================
-- 25. 의약품 마스터 (MEDICATIONS)
-- ============================================
INSERT INTO medications (name, generic_name, manufacturer, form, strength, unit, stock_qty, min_stock_qty, category, is_active) VALUES
  ('메트포르민정 500mg', '메트포르민염산염', '한국유나이티드제약', '정', '500mg', '정', 200, 30, '당뇨약',   TRUE),
  ('세레콕시브캡슐 200mg','세레콕시브',      '한국화이자제약',     '캡슐','200mg', '캡슐',150, 20, '진통소염제', TRUE),
  ('아스피린장용정 100mg','아세틸살리실산',  '바이엘코리아',       '정', '100mg', '정',  300, 50, '항혈소판제', TRUE),
  ('도네페질정 10mg',    '도네페질염산염',   '한국에자이',         '정', '10mg',  '정',  100, 15, '치매약',   TRUE),
  ('레보도파정 100mg',   '레보도파/카르비도파','한국로슈',           '정', '100mg', '정',   80, 10, '파킨슨약',  TRUE),
  ('비타민D 1000IU',     '콜레칼시페롤',     '광동제약',           '연질캡슐','1000IU','캡슐',500,100,'영양제',  TRUE)
ON CONFLICT DO NOTHING;

-- ============================================
-- 26. 회의록 (MEETING_RECORDS)
-- ============================================
DO $$
DECLARE
  v_emp_id   BIGINT;
  v_meeting_1 BIGINT;
BEGIN
  SELECT id INTO v_emp_id FROM employees WHERE email = 'director@agape-care.kr';

  INSERT INTO meeting_records (category, year, quarter, title, meeting_date, location, attendee_count, attendance_rate, status, summary, created_by)
  VALUES
    ('직원회의', 2026, 1, '2026년 1분기 직원 전체 회의',
     '2026-01-05 14:00:00+09', '2층 강당', 22, 88, 'CONFIRMED',
     '2026년 운영 방향 공유, 안전사고 예방 교육, 급여체계 개편 안내',
     v_emp_id)
  RETURNING id INTO v_meeting_1;

  IF v_meeting_1 IS NOT NULL THEN
    INSERT INTO meeting_minutes (meeting_id, topic, discussion, decision, action_items, sort_order) VALUES
      (v_meeting_1, '2026년 운영 방향',
       '작년 대비 입소율 92% 달성. 올해 목표 95% 설정.',
       '입소 상담 강화 및 SNS 홍보 확대',
       '[{"item":"SNS 홍보 계획 수립","owner":"사무원","due":"2026-01-31"}]'::jsonb, 1),
      (v_meeting_1, '안전사고 예방 교육',
       '낙상 사고 2건 발생 사례 공유. 야간 순찰 강화 논의.',
       '야간 순찰 횟수 2회 → 3회로 증가',
       '[{"item":"야간 순찰 일지 양식 개정","owner":"간호부","due":"2026-01-15"}]'::jsonb, 2)
    ON CONFLICT DO NOTHING;
  END IF;
END$$;

-- ============================================
-- 27. 직원 개인 권한 (EMPLOYEE_PERMISSIONS)
-- ============================================
DO $$
DECLARE
  v_admin_id   BIGINT;
  v_director_id BIGINT;
  v_social_id  BIGINT;
  v_cook_id    BIGINT;
BEGIN
  SELECT id INTO v_admin_id    FROM employees WHERE email = 'admin@agape-care.kr';
  SELECT id INTO v_director_id FROM employees WHERE email = 'director@agape-care.kr';
  SELECT id INTO v_social_id   FROM employees WHERE email = 'social1@agape-care.kr';
  SELECT id INTO v_cook_id     FROM employees WHERE email = 'cook1@agape-care.kr';

  INSERT INTO employee_permissions (employee_id, role_id, permissions, updated_by)
  VALUES
    (v_admin_id,
     (SELECT id FROM employee_roles WHERE code = 'ADMIN'),
     '{"all":true,"super_admin":true}'::jsonb,
     v_admin_id),
    (v_director_id,
     (SELECT id FROM employee_roles WHERE code = 'DIRECTOR'),
     '{"management":true,"reports":true,"payroll":true,"residents":true}'::jsonb,
     v_admin_id),
    (v_social_id,
     (SELECT id FROM employee_roles WHERE code = 'SOCIAL_WORKER'),
     '{"consultation":true,"residents":true,"programs":true,"reports":false}'::jsonb,
     v_admin_id),
    (v_cook_id,
     (SELECT id FROM employee_roles WHERE code = 'COOK'),
     '{"meal":true,"inventory_view":true}'::jsonb,
     v_admin_id)
  ON CONFLICT (employee_id) DO NOTHING;
END$$;

-- ============================================
-- 28. 직원 학력 이력 (EMPLOYEE_EDUCATIONS)
-- ============================================
DO $$
DECLARE
  v_director_id BIGINT;
  v_social_id   BIGINT;
BEGIN
  SELECT id INTO v_director_id FROM employees WHERE email = 'director@agape-care.kr';
  SELECT id INTO v_social_id   FROM employees WHERE email = 'social1@agape-care.kr';

  INSERT INTO employee_educations (employee_id, school_name, major, degree, graduated, start_year, end_year)
  VALUES
    (v_director_id, '연세대학교', '의학과', '학사', TRUE, 1982, 1988),
    (v_director_id, '연세대학교 대학원', '노인의학', '석사', TRUE, 1989, 1991),
    (v_social_id,   '서울복지대학교', '사회복지학과', '학사', TRUE, 2010, 2014),
    (v_social_id,   '고려대학교 사회정책대학원', '사회복지학', '석사', TRUE, 2015, 2017);
END$$;

-- ============================================
-- 29. 알림 캠페인 + 수신자 (NOTIFICATION_CAMPAIGNS, NOTIFICATION_CAMPAIGN_RECIPIENTS)
-- ============================================
DO $$
DECLARE
  v_template_id BIGINT;
  v_group_id    BIGINT;
  v_campaign_1  BIGINT;
  v_campaign_2  BIGINT;
BEGIN
  SELECT id INTO v_template_id FROM notification_templates WHERE name = '월간 생활 보고' LIMIT 1;
  SELECT id INTO v_group_id    FROM recipient_groups WHERE name = '전체 보호자' LIMIT 1;

  INSERT INTO notification_campaigns (campaign_name, purpose, title, body, channel, send_type, status, recipient_count, template_id, recipient_group_id, sent_at)
  VALUES
    ('1월 생활 보고 발송', '월간 보고 자동 발송', '1월 생활 보고서 안내', '안녕하세요 보호자님, 1월 생활 보고서를 전달드립니다.',
     'EMAIL', 'IMMEDIATE', 'SENT', 29, v_template_id, v_group_id, NOW() - INTERVAL '20 days'),
    ('설 연휴 안내 발송', '명절 안내', '설 연휴 운영 안내', '2026년 설 연휴 운영 안내 드립니다. 정상 운영됩니다.',
     'SMS', 'IMMEDIATE', 'SENT', 29, NULL, v_group_id, NOW() - INTERVAL '10 days')
  RETURNING id INTO v_campaign_1;

  -- campaign_1은 두 번째 INSERT의 id를 가짐; 첫 번째 것을 따로 조회
  SELECT id INTO v_campaign_1 FROM notification_campaigns WHERE campaign_name = '1월 생활 보고 발송' LIMIT 1;
  SELECT id INTO v_campaign_2 FROM notification_campaigns WHERE campaign_name = '설 연휴 안내 발송' LIMIT 1;

  IF v_campaign_1 IS NOT NULL THEN
    INSERT INTO notification_campaign_recipients (campaign_id, recipient_type, recipient_id, name, phone, status)
    VALUES
      (v_campaign_1, 'GUARDIAN', NULL, '가보호자', '010-1111-2222', 'SENT'),
      (v_campaign_1, 'GUARDIAN', NULL, '나보호자', '010-2222-3333', 'SENT'),
      (v_campaign_1, 'GUARDIAN', NULL, '다보호자', '010-3333-4444', 'SENT'),
      (v_campaign_1, 'GUARDIAN', NULL, '라보호자', '010-4444-5555', 'FAILED');
  END IF;

  IF v_campaign_2 IS NOT NULL THEN
    INSERT INTO notification_campaign_recipients (campaign_id, recipient_type, recipient_id, name, phone, status)
    VALUES
      (v_campaign_2, 'GUARDIAN', NULL, '가보호자', '010-1111-2222', 'SENT'),
      (v_campaign_2, 'GUARDIAN', NULL, '나보호자', '010-2222-3333', 'SENT'),
      (v_campaign_2, 'GUARDIAN', NULL, '다보호자', '010-3333-4444', 'SENT'),
      (v_campaign_2, 'GUARDIAN', NULL, '라보호자', '010-4444-5555', 'SENT');
  END IF;
END$$;

-- ============================================
-- 30. 수신자 그룹 멤버 (RECIPIENT_GROUP_MEMBERS)
-- ============================================
DO $$
DECLARE
  v_group_all_guardian BIGINT;
  v_group_staff        BIGINT;
BEGIN
  SELECT id INTO v_group_all_guardian FROM recipient_groups WHERE name = '전체 보호자' LIMIT 1;
  SELECT id INTO v_group_staff        FROM recipient_groups WHERE name = '전체 직원'   LIMIT 1;

  IF v_group_all_guardian IS NOT NULL THEN
    INSERT INTO recipient_group_members (group_id, recipient_type, recipient_id, name, phone, relation)
    VALUES
      (v_group_all_guardian, 'GUARDIAN', NULL, '가보호자', '010-1111-2222', '딸'),
      (v_group_all_guardian, 'GUARDIAN', NULL, '나보호자', '010-2222-3333', '아들'),
      (v_group_all_guardian, 'GUARDIAN', NULL, '다보호자', '010-3333-4444', '아들'),
      (v_group_all_guardian, 'GUARDIAN', NULL, '라보호자', '010-4444-5555', '배우자');
  END IF;

  IF v_group_staff IS NOT NULL THEN
    INSERT INTO recipient_group_members (group_id, recipient_type, recipient_id, name, phone, relation)
    SELECT v_group_staff, 'EMPLOYEE', id, name, phone_number, NULL
    FROM employees WHERE status = 'ACTIVE';
  END IF;
END$$;

-- ============================================
-- 31. 알림 큐 (NOTIFICATION_QUEUE)
-- ============================================
INSERT INTO notification_queue (channel, target_type, target_id, title, body, payload, scheduled_at, sent_at, status) VALUES
  ('SMS',   'GUARDIAN', NULL, '면회 예약 확인', '가보호자님, 2026-02-15 14:00 면회 예약이 확인되었습니다.',
   '{"reservation_id":1}'::jsonb, NOW() - INTERVAL '8 days', NOW() - INTERVAL '8 days', 'SENT'),
  ('EMAIL', 'GUARDIAN', NULL, '1월 생활 보고서', '가나다 어르신의 1월 생활 보고서를 첨부 드립니다.',
   '{"resident_code":"R-2026-001"}'::jsonb, NOW() - INTERVAL '20 days', NOW() - INTERVAL '20 days', 'SENT'),
  ('SMS',   'GUARDIAN', NULL, '설 연휴 운영 안내', '설 연휴 중 정상 운영됩니다. 자세한 사항은 시설로 문의 바랍니다.',
   '{}'::jsonb, NOW() - INTERVAL '10 days', NOW() - INTERVAL '10 days', 'SENT'),
  ('SMS',   'GUARDIAN', NULL, '투약 알림 테스트', '{{name}}님의 저녁 투약 시간입니다.',
   '{"test":true}'::jsonb, NOW() + INTERVAL '1 hour', NULL, 'PENDING');

-- ============================================
-- 32. 입소자 계약서 (RESIDENT_CONTRACTS)
-- ============================================
DO $$
DECLARE
  v_emp_id     BIGINT;
  v_resident_1 BIGINT;
  v_resident_2 BIGINT;
  v_resident_3 BIGINT;
  v_resident_4 BIGINT;
BEGIN
  SELECT id INTO v_emp_id     FROM employees WHERE email = 'social1@agape-care.kr';
  SELECT id INTO v_resident_1 FROM residents WHERE code = 'R-2026-001';
  SELECT id INTO v_resident_2 FROM residents WHERE code = 'R-2026-002';
  SELECT id INTO v_resident_3 FROM residents WHERE code = 'R-2026-003';
  SELECT id INTO v_resident_4 FROM residents WHERE code = 'R-2026-004';

  IF v_resident_1 IS NOT NULL THEN
    INSERT INTO resident_contracts (resident_id, created_by, contract_date, contract_type, signed_by, agreed_at, status, content)
    VALUES
      (v_resident_1, v_emp_id, '2026-01-23', 'STANDARD', '가보호자', '2026-01-23 10:30:00+09', 'ACTIVE',
       '본 계약서는 아가페케어 요양원(이하 "요양원")과 입소자 가나다(이하 "입소자") 및 보호자 간에 체결된 요양서비스 이용계약입니다.'),
      (v_resident_2, v_emp_id, '2026-01-15', 'STANDARD', '나보호자', '2026-01-15 11:30:00+09', 'ACTIVE',
       '본 계약서는 아가페케어 요양원과 입소자 나가다 및 보호자 간에 체결된 요양서비스 이용계약입니다.'),
      (v_resident_3, v_emp_id, '2025-11-01', 'LONG_TERM', '다보호자', '2025-11-01 09:30:00+09', 'ACTIVE',
       '본 계약서는 아가페케어 요양원과 입소자 다가나 및 보호자 간에 체결된 장기 요양서비스 이용계약입니다.'),
      (v_resident_4, v_emp_id, '2026-02-01', 'SHORT_TERM', '라보호자', '2026-02-01 10:30:00+09', 'ACTIVE',
       '본 계약서는 아가페케어 요양원과 입소자 라가나 및 보호자 간에 체결된 단기보호 이용계약입니다.');
  END IF;
END$$;

-- ============================================
-- 33. 입소자 서류 (RESIDENT_DOCUMENTS)
-- ============================================
DO $$
DECLARE
  v_emp_id     BIGINT;
  v_resident_1 BIGINT;
  v_resident_2 BIGINT;
  v_resident_3 BIGINT;
BEGIN
  SELECT id INTO v_emp_id     FROM employees WHERE email = 'social1@agape-care.kr';
  SELECT id INTO v_resident_1 FROM residents WHERE code = 'R-2026-001';
  SELECT id INTO v_resident_2 FROM residents WHERE code = 'R-2026-002';
  SELECT id INTO v_resident_3 FROM residents WHERE code = 'R-2026-003';

  IF v_resident_1 IS NOT NULL THEN
    INSERT INTO resident_documents (resident_id, uploaded_by, document_name, document_category, status, uploaded_at)
    VALUES
      (v_resident_1, v_emp_id, '장기요양인정서 (3등급)', 'REQUIRED', 'SUBMITTED', NOW() - INTERVAL '32 days'),
      (v_resident_1, v_emp_id, '주민등록증 사본',        'ID',       'SUBMITTED', NOW() - INTERVAL '32 days'),
      (v_resident_1, v_emp_id, '건강진단서',             'HEALTH',   'SUBMITTED', NOW() - INTERVAL '30 days'),
      (v_resident_2, v_emp_id, '장기요양인정서 (2등급)', 'REQUIRED', 'SUBMITTED', NOW() - INTERVAL '40 days'),
      (v_resident_2, v_emp_id, '주민등록증 사본',        'ID',       'SUBMITTED', NOW() - INTERVAL '40 days'),
      (v_resident_2, v_emp_id, '입원확인서 (병원)',      'HEALTH',   'SUBMITTED', NOW() - INTERVAL '40 days'),
      (v_resident_3, v_emp_id, '장기요양인정서 (4등급)', 'REQUIRED', 'SUBMITTED', NOW() - INTERVAL '115 days'),
      (v_resident_3, v_emp_id, '치매진단서',             'HEALTH',   'SUBMITTED', NOW() - INTERVAL '110 days');
  END IF;
END$$;

-- ============================================
-- 34. 출퇴근 기록 (ATTENDANCE_RECORDS)
-- ============================================
DO $$
DECLARE
  v_admin_id    BIGINT;
  v_director_id BIGINT;
  v_social_id   BIGINT;
  v_cook_id     BIGINT;
  d             DATE;
BEGIN
  SELECT id INTO v_admin_id    FROM employees WHERE email = 'admin@agape-care.kr';
  SELECT id INTO v_director_id FROM employees WHERE email = 'director@agape-care.kr';
  SELECT id INTO v_social_id   FROM employees WHERE email = 'social1@agape-care.kr';
  SELECT id INTO v_cook_id     FROM employees WHERE email = 'cook1@agape-care.kr';

  FOR d IN SELECT generate_series(CURRENT_DATE - 6, CURRENT_DATE - 1, '1 day'::interval)::date LOOP
    -- 주말 제외
    IF EXTRACT(DOW FROM d) NOT IN (0, 6) THEN
      INSERT INTO attendance_records (employee_id, work_date, check_in_at, check_out_at, status)
      VALUES
        (v_admin_id,    d, d + TIME '09:02:00', d + TIME '18:05:00', 'PRESENT'),
        (v_director_id, d, d + TIME '08:55:00', d + TIME '18:30:00', 'PRESENT'),
        (v_social_id,   d, d + TIME '09:08:00', d + TIME '18:00:00', 'PRESENT'),
        (v_cook_id,     d, d + TIME '07:30:00', d + TIME '16:35:00', 'PRESENT')
      ON CONFLICT (employee_id, work_date) DO NOTHING;
    END IF;
  END LOOP;
END$$;

-- ============================================
-- 35. 근무표 배정 (SHIFT_ASSIGNMENTS)
-- ============================================
DO $$
DECLARE
  v_social_id    BIGINT;
  v_cook_id      BIGINT;
  v_day_shift_id BIGINT;
  v_full_shift_id BIGINT;
  d              DATE;
BEGIN
  SELECT id INTO v_social_id    FROM employees       WHERE email = 'social1@agape-care.kr';
  SELECT id INTO v_cook_id      FROM employees       WHERE email = 'cook1@agape-care.kr';
  SELECT id INTO v_day_shift_id  FROM shift_templates WHERE code = 'DAY';
  SELECT id INTO v_full_shift_id FROM shift_templates WHERE code = 'FULL';

  FOR d IN SELECT generate_series(CURRENT_DATE, CURRENT_DATE + 6, '1 day'::interval)::date LOOP
    IF EXTRACT(DOW FROM d) NOT IN (0, 6) THEN
      INSERT INTO shift_assignments (employee_id, work_date, shift_template_id, starts_at, ends_at)
      VALUES
        (v_social_id, d, v_full_shift_id,
         (d + TIME '09:00:00')::TIMESTAMPTZ, (d + TIME '18:00:00')::TIMESTAMPTZ),
        (v_cook_id,   d, v_day_shift_id,
         (d + TIME '08:00:00')::TIMESTAMPTZ, (d + TIME '16:00:00')::TIMESTAMPTZ)
      ON CONFLICT (employee_id, work_date) DO NOTHING;
    END IF;
  END LOOP;
END$$;

-- ============================================
-- 36. 휴가 신청 + 승인 (LEAVE_REQUESTS, LEAVE_APPROVALS)
-- ============================================
DO $$
DECLARE
  v_admin_id    BIGINT;
  v_social_id   BIGINT;
  v_cook_id     BIGINT;
  v_leave_1     BIGINT;
  v_leave_2     BIGINT;
  v_leave_3     BIGINT;
BEGIN
  SELECT id INTO v_admin_id  FROM employees WHERE email = 'admin@agape-care.kr';
  SELECT id INTO v_social_id FROM employees WHERE email = 'social1@agape-care.kr';
  SELECT id INTO v_cook_id   FROM employees WHERE email = 'cook1@agape-care.kr';

  INSERT INTO leave_requests (employee_id, start_date, end_date, type, reason, status)
  VALUES (v_social_id, '2026-02-25', '2026-02-26', '연차', '개인 사유', 'APPROVED')
  RETURNING id INTO v_leave_1;

  INSERT INTO leave_requests (employee_id, start_date, end_date, type, reason, status)
  VALUES (v_cook_id,   '2026-03-03', '2026-03-03', '반차', '병원 방문', 'PENDING')
  RETURNING id INTO v_leave_2;

  INSERT INTO leave_requests (employee_id, start_date, end_date, type, reason, status)
  VALUES (v_social_id, '2026-01-20', '2026-01-20', '경조사', '가족 장례', 'APPROVED')
  RETURNING id INTO v_leave_3;

  IF v_leave_1 IS NOT NULL THEN
    INSERT INTO leave_approvals (leave_request_id, approved_by, approved_at, decision, comment)
    VALUES (v_leave_1, v_admin_id, NOW() - INTERVAL '3 days', 'APPROVED', '승인합니다.');
  END IF;

  IF v_leave_3 IS NOT NULL THEN
    INSERT INTO leave_approvals (leave_request_id, approved_by, approved_at, decision, comment)
    VALUES (v_leave_3, v_admin_id, NOW() - INTERVAL '35 days', 'APPROVED', '경조사 승인.');
  END IF;
END$$;

-- ============================================
-- 37. 회계 전표 + 분개 (TRANSACTIONS, TRANSACTION_ITEMS)
-- ============================================
DO $$
DECLARE
  v_admin_id     BIGINT;
  v_supplier_id  BIGINT;
  v_txn_1        BIGINT;
  v_txn_2        BIGINT;
  v_acc_cash     BIGINT;
  v_acc_opex     BIGINT;
  v_acc_food     BIGINT;
  v_acc_revenue  BIGINT;
  v_acc_copay    BIGINT;
BEGIN
  SELECT id INTO v_admin_id    FROM employees  WHERE email = 'admin@agape-care.kr';
  SELECT id INTO v_supplier_id FROM suppliers  WHERE name = '한국식품㈜' LIMIT 1;
  SELECT id INTO v_acc_cash    FROM accounts   WHERE code = '110';
  SELECT id INTO v_acc_opex    FROM accounts   WHERE code = '720';
  SELECT id INTO v_acc_food    FROM accounts   WHERE code = '730';
  SELECT id INTO v_acc_revenue FROM accounts   WHERE code = '610';
  SELECT id INTO v_acc_copay   FROM accounts   WHERE code = '620';

  INSERT INTO transactions (txn_date, description, reference_no, supplier_id, created_by, total_amount)
  VALUES ('2026-01-31', '1월 식재료 구매', 'PO-2026-001', v_supplier_id, v_admin_id, 1250000)
  RETURNING id INTO v_txn_1;

  INSERT INTO transactions (txn_date, description, reference_no, supplier_id, created_by, total_amount)
  VALUES ('2026-01-31', '1월 장기요양급여 수입', 'INS-2026-001', NULL, v_admin_id, 18750000)
  RETURNING id INTO v_txn_2;

  IF v_txn_1 IS NOT NULL AND v_acc_food IS NOT NULL AND v_acc_cash IS NOT NULL THEN
    INSERT INTO transaction_items (transaction_id, account_id, line_no, description, debit_amount, credit_amount)
    VALUES
      (v_txn_1, v_acc_food, 1, '급식비 (식재료)', 1250000, 0),
      (v_txn_1, v_acc_cash, 2, '현금 지급',        0, 1250000)
    ON CONFLICT (transaction_id, line_no) DO NOTHING;
  END IF;

  IF v_txn_2 IS NOT NULL AND v_acc_revenue IS NOT NULL AND v_acc_copay IS NOT NULL THEN
    INSERT INTO transaction_items (transaction_id, account_id, line_no, description, debit_amount, credit_amount)
    VALUES
      (v_txn_2, v_acc_cash,    1, '현금 수입',      18750000, 0),
      (v_txn_2, v_acc_revenue, 2, '장기요양급여수익', 0, 15000000),
      (v_txn_2, v_acc_copay,   3, '본인부담금수익',   0,  3750000)
    ON CONFLICT (transaction_id, line_no) DO NOTHING;
  END IF;
END$$;

-- ============================================
-- 38. 급여 설정 + 배치 + 급여 내역 (PAYROLL_SETTINGS, PAYROLL_BATCHES, PAYROLL_RECORDS, PAYROLL_ITEMS)
-- ============================================
DO $$
DECLARE
  v_admin_id    BIGINT;
  v_director_id BIGINT;
  v_social_id   BIGINT;
  v_cook_id     BIGINT;
  v_batch_1     BIGINT;
  v_payroll_1   BIGINT;
  v_payroll_2   BIGINT;
  v_payroll_3   BIGINT;
  v_payroll_4   BIGINT;
BEGIN
  SELECT id INTO v_admin_id    FROM employees WHERE email = 'admin@agape-care.kr';
  SELECT id INTO v_director_id FROM employees WHERE email = 'director@agape-care.kr';
  SELECT id INTO v_social_id   FROM employees WHERE email = 'social1@agape-care.kr';
  SELECT id INTO v_cook_id     FROM employees WHERE email = 'cook1@agape-care.kr';

  -- 급여 단가 설정
  INSERT INTO payroll_settings (employee_id, base_wage, hourly_rate, wage_type,
    meal_allowance, transport_allowance, position_allowance, effective_from,
    insurance_flags, tax_flags)
  VALUES
    (v_admin_id,    3500000, NULL, 'MONTHLY', 100000, 100000, 200000, '2025-01-01',
     '{"health":true,"pension":true,"employment":true,"accident":true}'::jsonb,
     '{"income":true,"local":true}'::jsonb),
    (v_director_id, 6000000, NULL, 'MONTHLY', 100000, 150000, 500000, '2025-01-01',
     '{"health":true,"pension":true,"employment":true,"accident":true}'::jsonb,
     '{"income":true,"local":true}'::jsonb),
    (v_social_id,   2800000, NULL, 'MONTHLY', 100000, 100000, 100000, '2025-01-01',
     '{"health":true,"pension":true,"employment":true,"accident":true}'::jsonb,
     '{"income":true,"local":true}'::jsonb),
    (v_cook_id,     2500000, NULL, 'MONTHLY', 100000, 100000,  50000, '2025-01-01',
     '{"health":true,"pension":true,"employment":true,"accident":true}'::jsonb,
     '{"income":true,"local":true}'::jsonb)
  ON CONFLICT (employee_id) DO NOTHING;

  -- 급여 배치 (1월)
  INSERT INTO payroll_batches (pay_month, status, total_amount, employee_count, processed_by, processed_at, memo)
  VALUES ('2026-01', 'PAID', 17250000, 4, v_admin_id, NOW() - INTERVAL '25 days', '2026년 1월 급여 지급 완료')
  ON CONFLICT (pay_month) DO NOTHING;

  SELECT id INTO v_batch_1 FROM payroll_batches WHERE pay_month = '2026-01';

  -- 급여 지급 내역
  INSERT INTO payroll_records (employee_id, period_start, period_end, base_salary, total_pay,
    total_allowance, total_deduction, net_pay, work_days, total_work_hours, reflected_to_accounting, paid_at, status)
  VALUES
    (v_admin_id,    '2026-01-01', '2026-01-31', 3500000, 3900000, 400000, 415000, 3485000, 21, 168, TRUE, NOW() - INTERVAL '25 days', 'PAID')
  RETURNING id INTO v_payroll_1;

  INSERT INTO payroll_records (employee_id, period_start, period_end, base_salary, total_pay,
    total_allowance, total_deduction, net_pay, work_days, total_work_hours, reflected_to_accounting, paid_at, status)
  VALUES
    (v_director_id, '2026-01-01', '2026-01-31', 6000000, 6750000, 750000, 780000, 5970000, 21, 168, TRUE, NOW() - INTERVAL '25 days', 'PAID')
  RETURNING id INTO v_payroll_2;

  INSERT INTO payroll_records (employee_id, period_start, period_end, base_salary, total_pay,
    total_allowance, total_deduction, net_pay, work_days, total_work_hours, reflected_to_accounting, paid_at, status)
  VALUES
    (v_social_id,   '2026-01-01', '2026-01-31', 2800000, 3100000, 300000, 360000, 2740000, 21, 168, TRUE, NOW() - INTERVAL '25 days', 'PAID')
  RETURNING id INTO v_payroll_3;

  INSERT INTO payroll_records (employee_id, period_start, period_end, base_salary, total_pay,
    total_allowance, total_deduction, net_pay, work_days, total_work_hours, reflected_to_accounting, paid_at, status)
  VALUES
    (v_cook_id,     '2026-01-01', '2026-01-31', 2500000, 2750000, 250000, 318000, 2432000, 21, 168, TRUE, NOW() - INTERVAL '25 days', 'PAID')
  RETURNING id INTO v_payroll_4;

  -- 급여 세부 항목
  IF v_payroll_1 IS NOT NULL THEN
    INSERT INTO payroll_items (payroll_id, kind, name, amount) VALUES
      (v_payroll_1, 'ALLOWANCE', '식대',       100000),
      (v_payroll_1, 'ALLOWANCE', '교통비',     100000),
      (v_payroll_1, 'ALLOWANCE', '직책수당',   200000),
      (v_payroll_1, 'DEDUCTION', '국민연금',   157500),
      (v_payroll_1, 'DEDUCTION', '건강보험',   122500),
      (v_payroll_1, 'DEDUCTION', '고용보험',    28000),
      (v_payroll_1, 'DEDUCTION', '소득세',      88000),
      (v_payroll_1, 'DEDUCTION', '지방소득세',  19000);
  END IF;

  IF v_payroll_2 IS NOT NULL THEN
    INSERT INTO payroll_items (payroll_id, kind, name, amount) VALUES
      (v_payroll_2, 'ALLOWANCE', '식대',       100000),
      (v_payroll_2, 'ALLOWANCE', '교통비',     150000),
      (v_payroll_2, 'ALLOWANCE', '직책수당',   500000),
      (v_payroll_2, 'DEDUCTION', '국민연금',   270000),
      (v_payroll_2, 'DEDUCTION', '건강보험',   210000),
      (v_payroll_2, 'DEDUCTION', '고용보험',    48000),
      (v_payroll_2, 'DEDUCTION', '소득세',     220000),
      (v_payroll_2, 'DEDUCTION', '지방소득세',  32000);
  END IF;
END$$;

-- ============================================
-- 39. 청구서 (INVOICE_HEADERS, INVOICE_ITEMS)
-- ============================================
DO $$
DECLARE
  v_resident_1 BIGINT;
  v_resident_2 BIGINT;
  v_inv_1      BIGINT;
  v_inv_2      BIGINT;
BEGIN
  SELECT id INTO v_resident_1 FROM residents WHERE code = 'R-2026-001';
  SELECT id INTO v_resident_2 FROM residents WHERE code = 'R-2026-002';

  IF v_resident_1 IS NOT NULL THEN
    INSERT INTO invoice_headers (invoice_no, resident_id, issue_date, due_date, total_amount, status)
    VALUES ('INV-2026-001', v_resident_1, '2026-02-01', '2026-02-15', 279190, 'PAID')
    ON CONFLICT (invoice_no) DO NOTHING
    RETURNING id INTO v_inv_1;

    IF v_inv_1 IS NULL THEN
      SELECT id INTO v_inv_1 FROM invoice_headers WHERE invoice_no = 'INV-2026-001';
    END IF;

    IF v_inv_1 IS NOT NULL THEN
      INSERT INTO invoice_items (invoice_id, line_no, description, quantity, unit_price, amount)
      VALUES
        (v_inv_1, 1, '장기요양급여 본인부담금 (15%)', 1, 191690, 191690),
        (v_inv_1, 2, '식재료비(석식)',                 25, 3500,   87500)
      ON CONFLICT (invoice_id, line_no) DO NOTHING;
    END IF;
  END IF;

  IF v_resident_2 IS NOT NULL THEN
    INSERT INTO invoice_headers (invoice_no, resident_id, issue_date, due_date, total_amount, status)
    VALUES ('INV-2026-002', v_resident_2, '2026-02-01', '2026-02-15', 333280, 'PAID')
    ON CONFLICT (invoice_no) DO NOTHING
    RETURNING id INTO v_inv_2;

    IF v_inv_2 IS NULL THEN
      SELECT id INTO v_inv_2 FROM invoice_headers WHERE invoice_no = 'INV-2026-002';
    END IF;

    IF v_inv_2 IS NOT NULL THEN
      INSERT INTO invoice_items (invoice_id, line_no, description, quantity, unit_price, amount)
      VALUES
        (v_inv_2, 1, '장기요양급여 본인부담금 (12%)', 1, 245780, 245780),
        (v_inv_2, 2, '식재료비(석식)',                 25, 3500,   87500),
        (v_inv_2, 3, '물리치료비(개인)',                4, 15000,  60000) -- correction: typo from earlier
      ON CONFLICT (invoice_id, line_no) DO NOTHING;

      -- update total
      UPDATE invoice_headers SET total_amount = 393280 WHERE id = v_inv_2;
    END IF;
  END IF;
END$$;

-- ============================================
-- 40. 보험청구 (INSURANCE_CLAIMS, INSURANCE_CLAIM_ITEMS, INSURANCE_CLAIM_HISTORY)
-- ============================================
DO $$
DECLARE
  v_emp_id     BIGINT;
  v_resident_1 BIGINT;
  v_resident_2 BIGINT;
  v_resident_3 BIGINT;
  v_claim_1    BIGINT;
  v_claim_2    BIGINT;
  v_claim_3    BIGINT;
BEGIN
  SELECT id INTO v_emp_id     FROM employees WHERE email = 'admin@agape-care.kr';
  SELECT id INTO v_resident_1 FROM residents WHERE code = 'R-2026-001';
  SELECT id INTO v_resident_2 FROM residents WHERE code = 'R-2026-002';
  SELECT id INTO v_resident_3 FROM residents WHERE code = 'R-2026-003';

  IF v_resident_1 IS NOT NULL THEN
    INSERT INTO insurance_claims (claim_no, resident_id, claim_month, claim_type, grade,
      service_days, copay_amount, insurance_amount, total_amount, approved_amount,
      submitted_at, approved_at, paid_at, status, created_by)
    VALUES
      ('CLM-2026-001', v_resident_1, '2026-01-01', '노인장기요양', '3등급',
       30, 191690, 1085810, 1277500, 1277500,
       '2026-02-05 09:00:00+09', '2026-02-15 10:00:00+09', '2026-02-20 14:00:00+09', 'PAID', v_emp_id)
    ON CONFLICT (claim_no) DO NOTHING
    RETURNING id INTO v_claim_1;

    IF v_claim_1 IS NULL THEN
      SELECT id INTO v_claim_1 FROM insurance_claims WHERE claim_no = 'CLM-2026-001';
    END IF;

    INSERT INTO insurance_claims (claim_no, resident_id, claim_month, claim_type, grade,
      service_days, copay_amount, insurance_amount, total_amount, status, created_by)
    VALUES
      ('CLM-2026-002', v_resident_2, '2026-01-01', '노인장기요양', '2등급',
       30, 245780, 1842750, 2088530, 'SUBMITTED', v_emp_id)
    ON CONFLICT (claim_no) DO NOTHING
    RETURNING id INTO v_claim_2;

    IF v_claim_2 IS NULL THEN
      SELECT id INTO v_claim_2 FROM insurance_claims WHERE claim_no = 'CLM-2026-002';
    END IF;

    INSERT INTO insurance_claims (claim_no, resident_id, claim_month, claim_type, grade,
      service_days, copay_amount, insurance_amount, total_amount, status, created_by)
    VALUES
      ('CLM-2026-003', v_resident_3, '2026-01-01', '노인장기요양', '4등급',
       30, 0, 1422000, 1422000, 'DRAFT', v_emp_id)
    ON CONFLICT (claim_no) DO NOTHING
    RETURNING id INTO v_claim_3;

    IF v_claim_3 IS NULL THEN
      SELECT id INTO v_claim_3 FROM insurance_claims WHERE claim_no = 'CLM-2026-003';
    END IF;

    -- 청구 항목
    IF v_claim_1 IS NOT NULL THEN
      INSERT INTO insurance_claim_items (claim_id, service_date, service_code, service_name, quantity, unit_price, amount, copay_amount)
      VALUES
        (v_claim_1, '2026-01-01', 'A001', '시설급여(노인요양)', 30, 42583, 1277490, 191624),
        (v_claim_1, '2026-01-15', 'B001', '건강검진',            1,    10, 10,       2)
      ON CONFLICT DO NOTHING;

      -- 청구 이력
      INSERT INTO insurance_claim_history (claim_id, status, changed_by, comment) VALUES
        (v_claim_1, 'SUBMITTED', v_emp_id, '청구 제출'),
        (v_claim_1, 'APPROVED',  v_emp_id, '심사 완료'),
        (v_claim_1, 'PAID',      v_emp_id, '지급 완료');
    END IF;

    IF v_claim_2 IS NOT NULL THEN
      INSERT INTO insurance_claim_items (claim_id, service_date, service_code, service_name, quantity, unit_price, amount, copay_amount)
      VALUES
        (v_claim_2, '2026-01-01', 'A001', '시설급여(노인요양)', 30, 69618, 2088540, 250625)
      ON CONFLICT DO NOTHING;

      INSERT INTO insurance_claim_history (claim_id, status, changed_by, comment) VALUES
        (v_claim_2, 'SUBMITTED', v_emp_id, '청구 제출');
    END IF;
  END IF;
END$$;

-- ============================================
-- 41. 재고 거래 내역 (INVENTORY_TRANSACTIONS)
-- ============================================
DO $$
DECLARE
  v_emp_id      BIGINT;
  v_supplier_id BIGINT;
  v_item_glove  BIGINT;
  v_item_mask   BIGINT;
  v_item_rice   BIGINT;
  v_item_strip  BIGINT;
BEGIN
  SELECT id INTO v_emp_id      FROM employees       WHERE email = 'cook1@agape-care.kr';
  SELECT id INTO v_supplier_id FROM suppliers        WHERE name = '한국식품㈜' LIMIT 1;
  SELECT id INTO v_item_glove  FROM inventory_items  WHERE code = 'MED-001';
  SELECT id INTO v_item_mask   FROM inventory_items  WHERE code = 'MED-002';
  SELECT id INTO v_item_rice   FROM inventory_items  WHERE code = 'FOOD-001';
  SELECT id INTO v_item_strip  FROM inventory_items  WHERE code = 'MED-004';

  INSERT INTO inventory_transactions (item_id, txn_date, txn_type, quantity, unit_price, total_amount, supplier_id, reference_no, notes, created_by)
  VALUES
    (v_item_glove, CURRENT_DATE - 30, 'IN',  20, 12000, 240000, NULL,         'PO-G-001', '초기 입고',                 v_emp_id),
    (v_item_glove, CURRENT_DATE - 15, 'OUT',  5, NULL,  NULL,   NULL,         NULL,       '1층 케어실 출고',            v_emp_id),
    (v_item_mask,  CURRENT_DATE - 30, 'IN',  25,  8500, 212500, NULL,         'PO-M-001', '초기 입고',                 v_emp_id),
    (v_item_mask,  CURRENT_DATE - 10, 'OUT',  5, NULL,  NULL,   NULL,         NULL,       '주간 소모 출고',             v_emp_id),
    (v_item_rice,  CURRENT_DATE - 14, 'IN',  15, 45000, 675000, v_supplier_id,'PO-R-001', '2월 식재료 입고',            v_emp_id),
    (v_item_rice,  CURRENT_DATE -  7, 'OUT',  3, NULL,  NULL,   NULL,         NULL,       '주간 사용',                  v_emp_id),
    (v_item_strip, CURRENT_DATE - 20, 'IN',   8, 35000, 280000, NULL,         'PO-S-001', '혈당 측정 스트립 입고',      v_emp_id),
    (v_item_strip, CURRENT_DATE -  5, 'OUT',  2, NULL,  NULL,   NULL,         NULL,       '간호실 출고',                v_emp_id);
END$$;

-- ============================================
-- 42. 운송 요청 + 차량 운행 일지 (TRANSPORT_REQUESTS, VEHICLE_RUN_LOGS)
-- ============================================
DO $$
DECLARE
  v_emp_id     BIGINT;
  v_resident_1 BIGINT;
  v_resident_4 BIGINT;
  v_vehicle_id BIGINT;
  v_req_1      BIGINT;
  v_req_2      BIGINT;
BEGIN
  SELECT id INTO v_emp_id     FROM employees WHERE email = 'social1@agape-care.kr';
  SELECT id INTO v_resident_1 FROM residents WHERE code = 'R-2026-001';
  SELECT id INTO v_resident_4 FROM residents WHERE code = 'R-2026-004';
  SELECT id INTO v_vehicle_id FROM vehicles  WHERE vehicle_no = '12가3456';

  IF v_resident_1 IS NOT NULL THEN
    INSERT INTO transport_requests (resident_id, vehicle_id, driver_id, request_date,
      pickup_location, destination, purpose, status, actual_departure, actual_arrival, notes, created_by)
    VALUES
      (v_resident_1, v_vehicle_id, v_emp_id, '2026-02-05 09:00:00+09',
       '아가페케어 요양원', '강남성심병원 정형외과', '정기 외래 진료',
       'COMPLETED', '2026-02-05 09:10:00+09', '2026-02-05 11:30:00+09', '관절염 정기 진료', v_emp_id),
      (v_resident_4, v_vehicle_id, v_emp_id, '2026-02-10 08:30:00+09',
       '아가페케어 요양원', '자녀 자택 (서울시 마포구)', '외박',
       'COMPLETED', '2026-02-10 08:45:00+09', NULL, '파킨슨 외박', v_emp_id)
    RETURNING id INTO v_req_1;

    SELECT id INTO v_req_1 FROM transport_requests
    WHERE resident_id = v_resident_1 AND DATE(request_date) = '2026-02-05' LIMIT 1;

    -- 차량 운행 일지
    IF v_vehicle_id IS NOT NULL THEN
      INSERT INTO vehicle_run_logs (vehicle_id, run_date, start_time, end_time, departure, destination,
        purpose, passengers, distance, fuel_cost, toll_cost, parking_cost, created_by)
      VALUES
        (v_vehicle_id, '2026-02-05', '09:10', '11:30', '아가페케어 요양원', '강남성심병원',
         '입소자 통원 차량', '가나다, 정사회복지사', 8.5, 12000, 2000, 3000, v_emp_id),
        (v_vehicle_id, '2026-02-10', '08:45', '09:30', '아가페케어 요양원', '마포구 자택',
         '입소자 외박 이송',  '라가나, 정사회복지사', 12.3, 18000, 0, 0, v_emp_id);
    END IF;
  END IF;
END$$;

-- ============================================
-- 43. CCTV 조회 로그 + 동의서 + 주간 점검 (CCTV_VIEW_LOGS, CCTV_CONSENTS, CCTV_WEEKLY_CHECKS)
-- ============================================
DO $$
DECLARE
  v_admin_id    BIGINT;
  v_director_id BIGINT;
  v_cam_101     BIGINT;
  v_cam_201     BIGINT;
  v_cam_lobby   BIGINT;
  v_resident_1  BIGINT;
  v_resident_2  BIGINT;
BEGIN
  SELECT id INTO v_admin_id    FROM employees    WHERE email = 'admin@agape-care.kr';
  SELECT id INTO v_director_id FROM employees    WHERE email = 'director@agape-care.kr';
  SELECT id INTO v_cam_101     FROM cctv_devices WHERE device_no = 'CAM-004';
  SELECT id INTO v_cam_201     FROM cctv_devices WHERE device_no = 'CAM-005';
  SELECT id INTO v_cam_lobby   FROM cctv_devices WHERE device_no = 'CAM-001';
  SELECT id INTO v_resident_1  FROM residents    WHERE code = 'R-2026-001';
  SELECT id INTO v_resident_2  FROM residents    WHERE code = 'R-2026-002';

  IF v_cam_lobby IS NOT NULL THEN
    -- CCTV 조회 로그
    INSERT INTO cctv_view_logs (device_id, viewer_id, view_start, view_end, purpose, approved_by)
    VALUES
      (v_cam_lobby, v_admin_id,    NOW() - INTERVAL '3 days',  NOW() - INTERVAL '3 days' + INTERVAL '15 minutes', '정기 보안 점검', v_director_id),
      (v_cam_101,   v_director_id, NOW() - INTERVAL '2 days',  NOW() - INTERVAL '2 days' + INTERVAL '10 minutes', '입소자 안전 확인', v_director_id),
      (v_cam_201,   v_admin_id,    NOW() - INTERVAL '1 day',   NOW() - INTERVAL '1 day'  + INTERVAL '5 minutes',  '이상 행동 확인', v_director_id);

    -- CCTV 동의서 (생활실 내 CCTV는 동의서 필요)
    IF v_resident_1 IS NOT NULL AND v_cam_101 IS NOT NULL THEN
      INSERT INTO cctv_consents (resident_id, device_id, consent_type, consent_date, consent_by, relationship, conditions)
      VALUES
        (v_resident_1, v_cam_101, 'AGREED', '2026-01-23', '가보호자', '딸', NULL),
        (v_resident_2, v_cam_201, 'AGREED', '2026-01-15', '나보호자', '아들', NULL);
    END IF;

    -- CCTV 주간 점검
    INSERT INTO cctv_weekly_checks (device_id, check_date, checked_by, image_quality, recording, night_vision, storage, memo)
    VALUES
      (v_cam_lobby, CURRENT_DATE - 7, v_admin_id, 'GOOD', TRUE, TRUE, TRUE, '이상 없음'),
      (v_cam_101,   CURRENT_DATE - 7, v_admin_id, 'GOOD', TRUE, TRUE, TRUE, '생활실 내 CCTV 정상'),
      (v_cam_201,   CURRENT_DATE - 7, v_admin_id, 'FAIR', TRUE, TRUE, TRUE, '야간 화질 약간 흐림, 렌즈 청소 필요');
  END IF;
END$$;

-- ============================================
-- 44. 사건사고 + 케어 태스크 (INCIDENTS, INCIDENT_FILES, CARE_TASKS)
-- ============================================
DO $$
DECLARE
  v_emp_id     BIGINT;
  v_resident_2 BIGINT;
  v_resident_3 BIGINT;
  v_incident_1 BIGINT;
  v_incident_2 BIGINT;
  v_task_1     BIGINT;
BEGIN
  SELECT id INTO v_emp_id     FROM employees WHERE email = 'social1@agape-care.kr';
  SELECT id INTO v_resident_2 FROM residents WHERE code = 'R-2026-002';
  SELECT id INTO v_resident_3 FROM residents WHERE code = 'R-2026-003';

  IF v_resident_2 IS NOT NULL THEN
    INSERT INTO incidents (resident_id, reported_by, occurred_at, severity, title, description, location, status, action_taken)
    VALUES
      (v_resident_2, v_emp_id, NOW() - INTERVAL '20 days', 'MEDIUM',
       '침대 낙상 위험 상황',
       '취침 중 침대 난간 미고정 상태 발견. 낙상 직전 상황으로 즉시 조치함.',
       '2층 201호', 'CLOSED',
       '침대 안전 난간 재고정. 야간 순찰 시 침대 안전 상태 확인 항목 추가.')
    RETURNING id INTO v_incident_1;

    INSERT INTO incidents (resident_id, reported_by, occurred_at, severity, title, description, location, status, action_taken)
    VALUES
      (v_resident_3, v_emp_id, NOW() - INTERVAL '5 days', 'LOW',
       '야간 배회',
       '오전 1시경 복도에서 배회 발견. 생활실로 안전하게 안내 완료.',
       '1층 복도', 'CLOSED',
       '담당 간호사 보고. 치매 증상 악화 여부 모니터링 강화. 야간 순찰 시 배회 확인 추가.')
    RETURNING id INTO v_incident_2;

    -- 케어 태스크
    INSERT INTO care_tasks (resident_id, assigned_to, due_at, title, description, status, priority)
    VALUES
      (v_resident_2, v_emp_id, NOW() + INTERVAL '1 day',
       '욕창 예방 체위 변경 확인', '2시간마다 체위 변경 수행 및 기록 확인', 'PENDING', 'HIGH'),
      (v_resident_3, v_emp_id, NOW() + INTERVAL '2 hours',
       '야간 배회 모니터링', '야간 순찰 시 치매 어르신 배회 여부 확인', 'IN_PROGRESS', 'NORMAL'),
      (v_resident_2, v_emp_id, NOW() + INTERVAL '3 days',
       '물리치료 일정 확인', '이번 주 물리치료 일정 및 이행 여부 확인', 'PENDING', 'NORMAL');
  END IF;
END$$;

-- ============================================
-- 45. 투약 계획 + 투약 기록 (MEDICATION_SCHEDULES, MEDICATION_RECORDS)
-- ============================================
DO $$
DECLARE
  v_emp_id      BIGINT;
  v_resident_1  BIGINT;
  v_resident_3  BIGINT;
  v_med_metro   BIGINT;
  v_med_done    BIGINT;
  v_sched_1     BIGINT;
  v_sched_2     BIGINT;
BEGIN
  SELECT id INTO v_emp_id     FROM employees  WHERE email = 'social1@agape-care.kr';
  SELECT id INTO v_resident_1 FROM residents  WHERE code = 'R-2026-001';
  SELECT id INTO v_resident_3 FROM residents  WHERE code = 'R-2026-003';
  SELECT id INTO v_med_metro  FROM medications WHERE name LIKE '메트포르민%' LIMIT 1;
  SELECT id INTO v_med_done   FROM medications WHERE name LIKE '도네페질%'  LIMIT 1;

  IF v_resident_1 IS NOT NULL AND v_med_metro IS NOT NULL THEN
    INSERT INTO medication_schedules (resident_id, medication_id, dosage, frequency, timing, start_date, prescribed_by, is_active)
    VALUES (v_resident_1, v_med_metro, '500mg 1정', '1일 2회', '["아침식후","저녁식후"]'::jsonb, '2026-01-23', '김내과', TRUE)
    RETURNING id INTO v_sched_1;

    IF v_sched_1 IS NOT NULL THEN
      INSERT INTO medication_records (schedule_id, medication_id, resident_id, administered_at, administered_by, status)
      VALUES
        (v_sched_1, v_med_metro, v_resident_1, NOW() - INTERVAL '2 days' + INTERVAL '8 hours',  v_emp_id, 'DONE'),
        (v_sched_1, v_med_metro, v_resident_1, NOW() - INTERVAL '2 days' + INTERVAL '19 hours', v_emp_id, 'DONE'),
        (v_sched_1, v_med_metro, v_resident_1, NOW() - INTERVAL '1 day'  + INTERVAL '8 hours',  v_emp_id, 'DONE'),
        (v_sched_1, v_med_metro, v_resident_1, NOW() - INTERVAL '1 day'  + INTERVAL '19 hours', v_emp_id, 'DONE');
    END IF;
  END IF;

  IF v_resident_3 IS NOT NULL AND v_med_done IS NOT NULL THEN
    INSERT INTO medication_schedules (resident_id, medication_id, dosage, frequency, timing, start_date, prescribed_by, is_active)
    VALUES (v_resident_3, v_med_done, '10mg 1정', '1일 1회', '["취침전"]'::jsonb, '2025-11-01', '최신경과', TRUE)
    RETURNING id INTO v_sched_2;

    IF v_sched_2 IS NOT NULL THEN
      INSERT INTO medication_records (schedule_id, medication_id, resident_id, administered_at, administered_by, status)
      VALUES
        (v_sched_2, v_med_done, v_resident_3, NOW() - INTERVAL '2 days' + INTERVAL '21 hours', v_emp_id, 'DONE'),
        (v_sched_2, v_med_done, v_resident_3, NOW() - INTERVAL '1 day'  + INTERVAL '21 hours', v_emp_id, 'DONE'),
        (v_sched_2, v_med_done, v_resident_3, NOW()                      + INTERVAL '21 hours', v_emp_id, 'DONE');
    END IF;
  END IF;
END$$;

-- ============================================
-- 46. 욕구사정 (NEEDS_ASSESSMENTS)
-- ============================================
DO $$
DECLARE
  v_emp_id     BIGINT;
  v_resident_1 BIGINT;
  v_resident_3 BIGINT;
BEGIN
  SELECT id INTO v_emp_id     FROM employees WHERE email = 'social1@agape-care.kr';
  SELECT id INTO v_resident_1 FROM residents WHERE code = 'R-2026-001';
  SELECT id INTO v_resident_3 FROM residents WHERE code = 'R-2026-003';

  IF v_resident_1 IS NOT NULL THEN
    INSERT INTO needs_assessments (resident_id, assessment_date, assessor_id, period,
      general_status, physical_needs, cognitive_needs, social_needs, environment_needs,
      summary, status, confirmed_at)
    VALUES
      (v_resident_1, '2026-01-24', v_emp_id, '초기',
       '{"health":"관절염 및 당뇨 관리 중","appetite":"양호","sleep":"양호"}'::jsonb,
       '{"mobility":"보행기 사용","bathing":"부분도움","eating":"자립","dressing":"부분도움"}'::jsonb,
       '{"orientation":"약간 저하","memory":"경도 저하","communication":"가능"}'::jsonb,
       '{"family_support":"딸과 정기 면회","social_activity":"프로그램 참여 원함"}'::jsonb,
       '{"room":"101호 창측","temperature":"온도 조절 필요","safety":"낙상 방지 난간 설치"}'::jsonb,
       '관절염 통증 관리와 인지기능 유지를 목표로 개인 맞춤 케어 계획 수립 필요',
       'CONFIRMED', '2026-01-25 14:00:00+09'),
      (v_resident_3, '2025-11-05', v_emp_id, '초기',
       '{"health":"치매(중등도), 당뇨, 고혈압","appetite":"양호","sleep":"야간 배회"}'::jsonb,
       '{"mobility":"보행 가능","bathing":"전도움","eating":"부분도움","dressing":"전도움"}'::jsonb,
       '{"orientation":"중등도 저하","memory":"심한 저하","communication":"제한적"}'::jsonb,
       '{"family_support":"아들과 월 2회 면회","social_activity":"음악치료 반응 긍정적"}'::jsonb,
       '{"room":"102호","safety":"배회 방지 센서 필요","environment":"친숙한 물건 배치"}'::jsonb,
       '치매 진행 단계에 맞는 인지활동 프로그램과 야간 배회 관리 강화 필요',
       'CONFIRMED', '2025-11-07 10:00:00+09');
  END IF;
END$$;

-- ============================================
-- 47. 근무 자동생성 규칙 (SCHEDULE_GENERATION_RULES)
-- ============================================
DO $$
DECLARE
  v_emp_id      BIGINT;
  v_care_dept   BIGINT;
  v_nursing_dept BIGINT;
  v_day_id      BIGINT;
  v_swing_id    BIGINT;
  v_night_id    BIGINT;
BEGIN
  SELECT id INTO v_emp_id       FROM employees   WHERE email = 'admin@agape-care.kr';
  SELECT id INTO v_care_dept    FROM departments  WHERE code = 'CARE';
  SELECT id INTO v_nursing_dept FROM departments  WHERE code = 'NURSING';
  SELECT id INTO v_day_id       FROM shift_templates WHERE code = 'DAY';
  SELECT id INTO v_swing_id     FROM shift_templates WHERE code = 'SWING';
  SELECT id INTO v_night_id     FROM shift_templates WHERE code = 'NIGHT';

  INSERT INTO schedule_generation_rules (name, department_id, rule_type, config, shift_template_ids, is_active, created_by)
  VALUES
    ('요양부 3교대 규칙', v_care_dept, 'ROTATION',
     '{"cycle_days":3,"min_rest_hours":8,"weekly_off_days":2}'::jsonb,
     ('[' || v_day_id || ',' || v_swing_id || ',' || v_night_id || ']')::jsonb,
     TRUE, v_emp_id),
    ('간호부 주간 고정 규칙', v_nursing_dept, 'FIXED',
     '{"work_days":["MON","TUE","WED","THU","FRI"],"off_days":["SAT","SUN"]}'::jsonb,
     ('[' || v_day_id || ']')::jsonb,
     TRUE, v_emp_id);
END$$;

-- ============================================
-- 48. 목욕 스케줄 (BATH_SCHEDULES)
-- ============================================
DO $$
DECLARE
  v_resident_1 BIGINT;
  v_resident_2 BIGINT;
  v_resident_3 BIGINT;
  v_resident_4 BIGINT;
BEGIN
  SELECT id INTO v_resident_1 FROM residents WHERE code = 'R-2026-001';
  SELECT id INTO v_resident_2 FROM residents WHERE code = 'R-2026-002';
  SELECT id INTO v_resident_3 FROM residents WHERE code = 'R-2026-003';
  SELECT id INTO v_resident_4 FROM residents WHERE code = 'R-2026-004';

  IF v_resident_1 IS NOT NULL THEN
    INSERT INTO bath_schedules (resident_id, frequency, frequency_period, preferred_day, scheduled_time, bath_method, start_date, is_active)
    VALUES
      (v_resident_1, 2, 7, '화,금', '10:00', '통목욕',   '2026-01-23', TRUE),
      (v_resident_2, 2, 7, '수,토', '11:00', '침상목욕', '2026-01-15', TRUE),
      (v_resident_3, 2, 7, '화,금', '14:00', '샤워',     '2025-11-01', TRUE),
      (v_resident_4, 1, 7, '목',    '10:30', '샤워',     '2026-02-01', TRUE);
  END IF;
END$$;

-- ============================================
-- 49. SMS 발송 로그 (SMS_SEND_LOGS)
-- ============================================
DO $$
DECLARE
  v_emp_id BIGINT;
BEGIN
  SELECT id INTO v_emp_id FROM employees WHERE email = 'admin@agape-care.kr';

  INSERT INTO sms_send_logs (recipient_phone, recipient_name, message, send_type,
    scheduled_at, sent_at, status, sms_count, cost, result_code, sender_id)
  VALUES
    ('010-1111-2222', '가보호자',
     '가나다 어르신의 2월 면회 예약이 확인되었습니다. 2026-02-15 14:00',
     'SINGLE', NOW() - INTERVAL '8 days', NOW() - INTERVAL '8 days', 'SUCCESS', 1, 20, '0000', v_emp_id),
    ('010-2222-3333', '나보호자',
     '나가다 어르신의 1월 생활보고서가 이메일로 발송되었습니다.',
     'BULK', NOW() - INTERVAL '20 days', NOW() - INTERVAL '20 days', 'SUCCESS', 1, 20, '0000', v_emp_id),
    ('010-3333-4444', '다보호자',
     '다가나 어르신의 1월 생활보고서가 이메일로 발송되었습니다.',
     'BULK', NOW() - INTERVAL '20 days', NOW() - INTERVAL '20 days', 'SUCCESS', 1, 20, '0000', v_emp_id),
    ('010-4444-5555', '라보호자',
     '라가나 어르신의 1월 생활보고서가 이메일로 발송되었습니다.',
     'BULK', NOW() - INTERVAL '20 days', NOW() - INTERVAL '20 days', 'FAILED', 1, 0, '1001', v_emp_id),
    ('010-9999-0000', '이영희',
     '아가페케어 요양원 비용 상담 문의 답변 드립니다. 자세한 사항은 02-1234-5678로 연락주세요.',
     'SINGLE', NOW() - INTERVAL '5 days', NOW() - INTERVAL '5 days', 'SUCCESS', 1, 20, '0000', v_emp_id);
END$$;

-- ============================================
-- 50. 감사 로그 (AUDIT_LOGS)
-- ============================================
DO $$
DECLARE
  v_admin_id    BIGINT;
  v_director_id BIGINT;
  v_social_id   BIGINT;
BEGIN
  SELECT id INTO v_admin_id    FROM employees WHERE email = 'admin@agape-care.kr';
  SELECT id INTO v_director_id FROM employees WHERE email = 'director@agape-care.kr';
  SELECT id INTO v_social_id   FROM employees WHERE email = 'social1@agape-care.kr';

  INSERT INTO audit_logs (actor_id, action, entity_type, entity_id, changes, ip_address, user_agent)
  VALUES
    (v_admin_id,    'LOGIN',  NULL,        NULL, NULL,
     '192.168.1.10', 'Mozilla/5.0 Chrome/120'),
    (v_director_id, 'LOGIN',  NULL,        NULL, NULL,
     '192.168.1.20', 'Mozilla/5.0 Chrome/120'),
    (v_social_id,   'CREATE', 'residents', NULL,
     '{"action":"입소자 등록","resident_code":"R-2026-001"}'::jsonb,
     '192.168.1.30', 'Mozilla/5.0 Firefox/121'),
    (v_social_id,   'UPDATE', 'care_plans', NULL,
     '{"action":"케어플랜 수정","field":"goal_summary"}'::jsonb,
     '192.168.1.30', 'Mozilla/5.0 Firefox/121'),
    (v_admin_id,    'DELETE', 'notices',   NULL,
     '{"action":"공지사항 삭제 시도"}'::jsonb,
     '192.168.1.10', 'Mozilla/5.0 Chrome/120'),
    (v_admin_id,    'UPDATE', 'system_settings', NULL,
     '{"key":"visit.max_per_day","old":15,"new":20}'::jsonb,
     '192.168.1.10', 'Mozilla/5.0 Chrome/120');
END$$;

-- ============================================
-- 51. 상담 첨부파일 (CONSULTATION_FILES)
-- ============================================
DO $$
DECLARE
  v_consult_id BIGINT;
  v_file_id    BIGINT;
BEGIN
  -- 상담일지 중 첫 번째 것 참조
  SELECT cr.id INTO v_consult_id
  FROM consultation_records cr
  JOIN residents r ON cr.resident_id = r.id
  WHERE r.code = 'R-2026-001'
  LIMIT 1;

  -- 기존 파일 중 하나 사용
  SELECT id INTO v_file_id FROM file_storage WHERE bucket = 'board' LIMIT 1;

  IF v_consult_id IS NOT NULL AND v_file_id IS NOT NULL THEN
    INSERT INTO consultation_files (consultation_id, file_id)
    VALUES (v_consult_id, v_file_id)
    ON CONFLICT DO NOTHING;
  END IF;
END$$;

-- ============================================
-- 완료 메시지
-- ============================================
DO $$
BEGIN
  RAISE NOTICE '========================================';
  RAISE NOTICE 'Seed Data 생성 완료! (40-seed.sql)';
  RAISE NOTICE '총 93개 테이블 샘플 데이터 삽입';
  RAISE NOTICE '========================================';
  RAISE NOTICE '[기본 데이터]';
  RAISE NOTICE '  부서: 4건, 직원 역할: 4건, 직원: 4건, 파일: 10건';
  RAISE NOTICE '  직원 권한: 4건, 학력 이력: 4건';
  RAISE NOTICE '[콘텐츠]';
  RAISE NOTICE '  공지사항: 7건, 게시판: 8건, 댓글: 7건';
  RAISE NOTICE '  갤러리: 5건, 식단표: 3주차, 프로그램: 7종/12일정';
  RAISE NOTICE '  팝업 배너: 2건';
  RAISE NOTICE '[시설/입소자]';
  RAISE NOTICE '  시설: 1건, 생활실: 7건, 사이트설정: 1건';
  RAISE NOTICE '  입소자: 4명, 보호자: 4건, 투약: 6건';
  RAISE NOTICE '  계약서: 4건, 서류: 8건';
  RAISE NOTICE '  기초평가: 4건, 케어플랜: 2건, 상담일지: 3건';
  RAISE NOTICE '  욕구사정: 2건, 목욕스케줄: 4건';
  RAISE NOTICE '  비급여: 4건, 본인부담금: 4건';
  RAISE NOTICE '  건강노트: 3건, 활력징후: 6건, 일일케어: 3건';
  RAISE NOTICE '  입퇴소이력: 5건, 사건사고: 2건, 케어태스크: 3건';
  RAISE NOTICE '  투약계획: 2건, 투약기록: 7건';
  RAISE NOTICE '[운영/HR]';
  RAISE NOTICE '  알림템플릿: 6건, 캠페인: 2건, 수신자: 8건';
  RAISE NOTICE '  수신자그룹: 6건, 그룹멤버: 6건, 알림큐: 4건';
  RAISE NOTICE '  SMS크레딧: 6건, SMS발송로그: 5건';
  RAISE NOTICE '  자료실: 8건, 시스템설정: 6건';
  RAISE NOTICE '  출퇴근: ~20건, 근무배정: ~10건';
  RAISE NOTICE '  휴가신청: 3건, 휴가승인: 2건';
  RAISE NOTICE '  근무템플릿: 4건, 근무규칙: 2건';
  RAISE NOTICE '[재무/회계]';
  RAISE NOTICE '  계정과목: 8건, 거래처: 4건';
  RAISE NOTICE '  전표: 2건, 분개: 5건';
  RAISE NOTICE '  급여설정: 4건, 급여배치: 1건, 급여내역: 4건, 급여항목: 16건';
  RAISE NOTICE '  청구서: 2건, 청구항목: 5건';
  RAISE NOTICE '  보험청구: 3건, 청구항목: 3건, 청구이력: 4건';
  RAISE NOTICE '[재고/차량/CCTV]';
  RAISE NOTICE '  재고: 8건, 재고거래: 8건';
  RAISE NOTICE '  차량: 2건, 운송요청: 2건, 운행일지: 2건';
  RAISE NOTICE '  CCTV: 5대, 조회로그: 3건, 동의서: 2건, 주간점검: 3건';
  RAISE NOTICE '[시설운영/시스템]';
  RAISE NOTICE '  시설점검: 5건, 민원: 2건';
  RAISE NOTICE '  의약품: 6종, 회의록: 1건, 방문예약: 4건, 문의: 3건';
  RAISE NOTICE '  감사로그: 6건';
  RAISE NOTICE '========================================';
END$$;
