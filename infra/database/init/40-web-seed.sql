-- Description : 40-web-seed.sql - 📌 Web 알림마당 Seed Data
-- Author : Shiwoo Min
-- Date : 2025-02-09
-- Purpose : Web 알림마당 view 테스트용 샘플 데이터
-- Note : 공지사항, 게시판, 갤러리, 식단표, 프로그램 샘플 데이터

-- ============================================
-- 기본 데이터 (의존성)
-- ============================================

-- DEPARTMENTS (부서)
INSERT INTO departments (id, code, name, description, is_active) VALUES
  (1, 'ADMIN', '행정부', '사무국 및 관리', TRUE),
  (2, 'NURSING', '간호부', '간호 및 의료', TRUE),
  (3, 'CARE', '요양부', '요양보호', TRUE),
  (4, 'KITCHEN', '조리부', '급식 관리', TRUE)
ON CONFLICT (id) DO NOTHING;

-- EMPLOYEE_ROLES (직원 역할)
INSERT INTO employee_roles (id, code, name, description, permissions) VALUES
  (1, 'ADMIN', '시스템 관리자', '모든 권한', '{"all": true}'::jsonb),
  (2, 'DIRECTOR', '원장', '최고 관리자', '{"management": true}'::jsonb),
  (6, 'SOCIAL_WORKER', '사회복지사', '상담 및 지원', '{"consultation": true}'::jsonb),
  (5, 'COOK', '조리사', '급식 관리', '{"meal": true}'::jsonb)
ON CONFLICT (id) DO NOTHING;

-- EMPLOYEES (직원)
INSERT INTO employees (id, department_id, role_id, email, password_hash, name, phone_number, hire_date, status, is_admin) VALUES
  (1, 1, 1, 'admin@agape-care.kr', '$2b$10$abcdefghijklmnopqrstuvwxyz1234567890', '시스템관리자', '02-1234-5678', '2020-01-01', 'ACTIVE', TRUE),
  (2, 1, 2, 'director@agape-care.kr', '$2b$10$abcdefghijklmnopqrstuvwxyz1234567890', '김원장', '010-1111-2222', '2020-01-01', 'ACTIVE', FALSE),
  (7, 1, 6, 'social1@agape-care.kr', '$2b$10$abcdefghijklmnopqrstuvwxyz1234567890', '정사회복지사', '010-6666-7777', '2021-09-01', 'ACTIVE', FALSE),
  (6, 4, 5, 'cook1@agape-care.kr', '$2b$10$abcdefghijklmnopqrstuvwxyz1234567890', '강조리사', '010-5555-6666', '2021-04-01', 'ACTIVE', FALSE)
ON CONFLICT (id) DO NOTHING;

-- FILE_STORAGE (샘플 파일)
INSERT INTO file_storage (id, bucket, path, original_name, mime_type, size_bytes, created_by) VALUES
  (1, 'notice', '2026/02/notice_001.pdf', '설연휴_운영안내.pdf', 'application/pdf', 245800, 2),
  (2, 'notice', '2026/02/notice_002.jpg', '행사사진.jpg', 'image/jpeg', 128400, 2),
  (3, 'board', '2026/02/board_001.pdf', '면회안내문.pdf', 'application/pdf', 98500, 7),
  (4, 'gallery', '2026/01/gallery_001.jpg', '신년행사_1.jpg', 'image/jpeg', 512000, 7),
  (5, 'gallery', '2026/01/gallery_002.jpg', '신년행사_2.jpg', 'image/jpeg', 487000, 7),
  (6, 'gallery', '2026/01/gallery_003.jpg', '신년행사_3.jpg', 'image/jpeg', 523000, 7),
  (7, 'gallery', '2026/01/gallery_004.jpg', '생신잔치_1.jpg', 'image/jpeg', 445000, 7),
  (8, 'gallery', '2026/01/gallery_005.jpg', '생신잔치_2.jpg', 'image/jpeg', 478000, 7),
  (9, 'meal', '2026/01/meal_breakfast.jpg', '아침식단.jpg', 'image/jpeg', 256000, 6),
  (10, 'meal', '2026/01/meal_lunch.jpg', '점심식단.jpg', 'image/jpeg', 289000, 6)
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- 1. 공지사항 (NOTICES)
-- ============================================

INSERT INTO notices (id, title, content, category, is_pinned, is_active, view_count, published_at, created_by) VALUES
  -- 고정 공지 (긴급)
  (1, '2026년 설날 연휴 운영 안내',
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
  'URGENT', TRUE, TRUE, 1245, '2026-01-15 09:00:00', 2),

  -- 일반 공지
  (2, '2월 정기 건강검진 일정 안내',
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
  'GENERAL', FALSE, TRUE, 342, '2026-02-01 10:00:00', 2),

  (3, '겨울철 독감 예방접종 안내',
  '<h2>독감 예방접종 실시</h2>
<p>겨울철 독감 예방을 위한 예방접종을 실시합니다.</p>

<h3>대상</h3>
<p>전체 입소자 (보호자 동의 완료)</p>

<h3>일시</h3>
<p>2026년 2월 15일(토) 오전 10시</p>

<h3>장소</h3>
<p>1층 건강관리실</p>

<p>접종 후 이상반응 모니터링을 위해 30분간 대기실에서 관찰합니다.</p>',
  'GENERAL', FALSE, TRUE, 189, '2026-01-25 14:00:00', 2),

  (4, '면회 규칙 변경 안내',
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
  'GENERAL', TRUE, TRUE, 567, '2026-01-20 11:00:00', 2),

  (5, '식단 개선 안내',
  '<h2>식단 개선 사항 안내</h2>
<p>어르신들의 영양 상태 개선을 위해 식단을 일부 변경합니다.</p>

<h3>주요 변경 사항</h3>
<ul>
  <li>단백질 보충을 위한 육류 제공 횟수 증가</li>
  <li>저염식 제공으로 건강 관리 강화</li>
  <li>계절 과일 제공 확대</li>
</ul>

<p>개인별 식이 요구사항은 간호부와 상담 후 조정 가능합니다.</p>',
  'GENERAL', FALSE, TRUE, 234, '2026-01-18 09:30:00', 2),

  -- 행사 공지
  (6, '봄맞이 나들이 행사 안내',
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
  'EVENT', FALSE, TRUE, 156, '2026-02-05 15:00:00', 7),

  -- 교육 공지
  (7, '보호자 교육 프로그램 안내',
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
  'EDUCATION', FALSE, TRUE, 98, '2026-02-03 10:00:00', 7)
ON CONFLICT (id) DO NOTHING;

-- 공지사항 첨부파일
INSERT INTO notice_files (notice_id, file_id) VALUES
  (1, 1),  -- 설연휴 안내 PDF
  (1, 2),  -- 설연휴 행사사진
  (4, 3)   -- 면회안내문 PDF
ON CONFLICT DO NOTHING;

-- ============================================
-- 2. 게시판 (BOARD_POSTS)
-- ============================================

INSERT INTO board_posts (id, board_key, title, content, author_id, view_count, is_pinned) VALUES
  -- 자유게시판
  (1, 'FREE', '새해 복 많이 받으세요!',
  '<p>2026년 새해를 맞아 모든 입소자분들과 가족분들께 건강과 행복이 가득하시길 기원합니다.</p>
<p>올해도 정성을 다해 어르신들을 모시겠습니다.</p>',
  2, 145, TRUE),

  (2, 'FREE', '감사 인사 드립니다',
  '<p>지난 한 해 동안 저희 시설을 믿고 맡겨주신 가족 여러분께 감사드립니다.</p>
<p>앞으로도 최선을 다하겠습니다.</p>',
  7, 87, FALSE),

  (3, 'FREE', '1월 생신 어르신 축하합니다',
  '<p>1월에 생신을 맞으신 어르신들께 축하 인사를 드립니다.</p>
<ul>
  <li>김순자 어르신 (1월 15일)</li>
  <li>박영희 어르신 (1월 22일)</li>
</ul>
<p>건강하시고 행복한 한 해 되시길 바랍니다.</p>',
  7, 123, FALSE),

  -- 질문게시판
  (4, 'QNA', '면회 시간 문의드립니다',
  '<p>안녕하세요.</p>
<p>주말 면회 가능한 시간이 궁금합니다.</p>
<p>평일에는 방문이 어려워서 주말에 방문하려고 하는데요.</p>',
  7, 56, FALSE),

  (5, 'QNA', '식단 조절 가능한가요?',
  '<p>어머니께서 당뇨가 있으신데 개인별 식단 조절이 가능한지 궁금합니다.</p>',
  2, 34, FALSE),

  (6, 'QNA', '외출 동행 문의',
  '<p>병원 진료를 위해 외출이 필요한데 직원분이 동행 가능한가요?</p>',
  7, 28, FALSE),

  -- 건의게시판
  (7, 'SUGGESTION', '프로그램 다양화 건의',
  '<p>현재 진행 중인 프로그램도 좋지만, 좀 더 다양한 활동이 있으면 좋겠습니다.</p>
<p>미술 치료나 원예 프로그램 같은 것도 고려해 주시면 감사하겠습니다.</p>',
  7, 45, FALSE),

  (8, 'SUGGESTION', '면회실 환경 개선 건의',
  '<p>면회실이 조금 좁아서 불편합니다.</p>
<p>가능하다면 공간 확장을 건의드립니다.</p>',
  2, 52, FALSE)
ON CONFLICT (id) DO NOTHING;

-- 게시판 첨부파일
INSERT INTO board_files (post_id, file_id) VALUES
  (4, 3)  -- 면회안내문
ON CONFLICT DO NOTHING;

-- 게시판 댓글
INSERT INTO board_comments (id, post_id, parent_id, author_id, content, is_deleted) VALUES
  -- 질문에 대한 답변
  (1, 4, NULL, 2,
  '<p>주말 면회는 <strong>오전 10시부터 오후 4시</strong>까지 가능합니다.</p>
<p>방문 전 전화로 미리 알려주시면 더욱 원활한 면회가 가능합니다.</p>',
  FALSE),

  (2, 4, 1, 7,
  '<p>감사합니다! 이번 주말에 방문하겠습니다.</p>',
  FALSE),

  (3, 5, NULL, 2,
  '<p>개인별 식단 조절 가능합니다.</p>
<p>간호부(내선 201)로 연락 주시면 영양사와 상담 후 맞춤 식단을 제공해 드리겠습니다.</p>',
  FALSE),

  (4, 6, NULL, 7,
  '<p>직원 동행 서비스를 제공하고 있습니다.</p>
<p>최소 3일 전에 예약해 주시면 일정을 조율해 드립니다.</p>',
  FALSE),

  -- 건의에 대한 답변
  (5, 7, NULL, 2,
  '<p>소중한 의견 감사합니다.</p>
<p>3월부터 미술 치료 프로그램을 신규로 도입할 예정입니다.</p>
<p>원예 프로그램도 검토 중이니 조금만 기다려 주세요.</p>',
  FALSE),

  (6, 8, NULL, 2,
  '<p>건의해 주신 사항 잘 받았습니다.</p>
<p>시설 개선 계획에 반영하도록 하겠습니다.</p>',
  FALSE),

  -- 삭제된 댓글 샘플
  (7, 1, NULL, 7, '삭제된 댓글입니다.', TRUE)
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- 3. 갤러리 (GALLERY_ITEMS)
-- ============================================

INSERT INTO gallery_items (id, title, description, category, event_date, created_by, is_public) VALUES
  (1, '2026 신년 행사',
  '새해맞이 떡국 나누기 및 세배 행사를 진행했습니다. 어르신들께서 즐거운 시간을 보내셨습니다.',
  'EVENT', '2026-01-01', 7, TRUE),

  (2, '1월 생신 잔치',
  '1월 생신을 맞으신 어르신들을 위한 축하 행사를 열었습니다.',
  'EVENT', '2026-01-15', 7, TRUE),

  (3, '설맞이 전통놀이',
  '설날을 맞아 윷놀이, 제기차기 등 전통놀이를 함께 즐겼습니다.',
  'EVENT', '2026-01-28', 7, TRUE),

  (4, '겨울 나들이',
  '날씨가 좋은 날 근처 공원으로 나들이를 다녀왔습니다.',
  'DAILY', '2026-01-20', 7, TRUE),

  (5, '노래교실',
  '매주 목요일 진행되는 노래교실 활동 모습입니다.',
  'DAILY', '2026-01-23', 7, TRUE)
ON CONFLICT (id) DO NOTHING;

-- 갤러리 파일
INSERT INTO gallery_files (gallery_id, file_id, sort_order) VALUES
  -- 신년 행사 (3장)
  (1, 4, 1),
  (1, 5, 2),
  (1, 6, 3),
  -- 생신 잔치 (2장)
  (2, 7, 1),
  (2, 8, 2),
  -- 설맞이 전통놀이 (대표이미지만)
  (3, 4, 1),
  -- 겨울 나들이
  (4, 5, 1),
  -- 노래교실
  (5, 6, 1)
ON CONFLICT DO NOTHING;

-- ============================================
-- 4. 식단표 (MEAL_PLANS)
-- ============================================

INSERT INTO meal_plans (id, facility_code, week_start_date, created_by, nutrition_manager, status, notes) VALUES
  -- 이번 주 식단 (게시됨)
  (1, 'DEFAULT', '2026-02-03', 6, '박영희 영양사', 'PUBLISHED', '설 연휴 대체 식단 포함'),

  -- 다음 주 식단 (게시됨)
  (2, 'DEFAULT', '2026-02-10', 6, '박영희 영양사', 'PUBLISHED', '정상 식단'),

  -- 다다음 주 식단 (작성중)
  (3, 'DEFAULT', '2026-02-17', 6, '박영희 영양사', 'DRAFT', NULL)
ON CONFLICT (id) DO NOTHING;

-- 식단 상세 항목 (1주차: 2026-02-03 ~ 2026-02-09)
INSERT INTO meal_plan_items (meal_plan_id, meal_date, meal_type, menu_content, image_url, calories, notes) VALUES
  -- 월요일 (2/3)
  (1, '2026-02-03', 'BREAKFAST', '쇠고기미역국, 계란후라이, 김구이, 깍두기, 우유', '/images/meals/breakfast.jpg', 520, NULL),
  (1, '2026-02-03', 'LUNCH', '제육볶음, 두부조림, 시금치나물, 배추국, 귤', '/images/meals/lunch.jpg', 680, NULL),
  (1, '2026-02-03', 'DINNER', '생선구이, 감자조림, 콩나물무침, 미역국, 요구르트', '/images/meals/dinner.jpg', 610, NULL),

  -- 화요일 (2/4)
  (1, '2026-02-04', 'BREAKFAST', '북어국, 계란찜, 김, 깍두기, 우유', '/images/meals/breakfast.jpg', 500, NULL),
  (1, '2026-02-04', 'LUNCH', '닭볶음탕, 두부부침, 시금치나물, 무국, 사과', '/images/meals/lunch.jpg', 720, NULL),
  (1, '2026-02-04', 'DINNER', '돈가스, 샐러드, 단무지, 콩나물국, 푸딩', '/images/meals/dinner.jpg', 650, NULL),

  -- 수요일 (2/5)
  (1, '2026-02-05', 'BREAKFAST', '된장찌개, 계란프라이, 김, 깍두기, 우유', '/images/meals/breakfast.jpg', 510, NULL),
  (1, '2026-02-05', 'LUNCH', '불고기, 잡채, 나물, 배추국, 배', '/images/meals/lunch.jpg', 700, NULL),
  (1, '2026-02-05', 'DINNER', '고등어구이, 두부조림, 숙주나물, 미역국, 유산균', '/images/meals/dinner.jpg', 620, NULL),

  -- 목요일 (2/6)
  (1, '2026-02-06', 'BREAKFAST', '콩나물국, 계란찜, 김구이, 깍두기, 우유', '/images/meals/breakfast.jpg', 490, NULL),
  (1, '2026-02-06', 'LUNCH', '삼겹살김치찌개, 계란말이, 나물, 멸치볶음, 귤', '/images/meals/lunch.jpg', 710, NULL),
  (1, '2026-02-06', 'DINNER', '순두부찌개, 생선전, 시금치무침, 김치, 바나나', '/images/meals/dinner.jpg', 590, NULL),

  -- 금요일 (2/7)
  (1, '2026-02-07', 'BREAKFAST', '미역국, 계란후라이, 김, 깍두기, 우유', '/images/meals/breakfast.jpg', 520, NULL),
  (1, '2026-02-07', 'LUNCH', '비빔밥, 계란국, 김치전, 과일샐러드', '/images/meals/lunch.jpg', 730, NULL),
  (1, '2026-02-07', 'DINNER', '닭갈비, 야채볶음, 깍두기, 콩나물국, 요구르트', '/images/meals/dinner.jpg', 640, NULL),

  -- 토요일 (2/8)
  (1, '2026-02-08', 'BREAKFAST', '김치찌개, 계란프라이, 김구이, 깍두기, 우유', '/images/meals/breakfast.jpg', 530, NULL),
  (1, '2026-02-08', 'LUNCH', '갈비찜, 잡채, 나물3종, 미역국, 수박', '/images/meals/lunch.jpg', 750, '주말 특식'),
  (1, '2026-02-08', 'DINNER', '삼치구이, 두부조림, 시금치나물, 콩나물국, 푸딩', '/images/meals/dinner.jpg', 610, NULL),

  -- 일요일 (2/9) - 설날
  (1, '2026-02-09', 'BREAKFAST', '떡국, 전, 나물, 식혜', '/images/meals/breakfast.jpg', 580, '설날 특식'),
  (1, '2026-02-09', 'LUNCH', '갈비탕, 잡채, 전, 김치, 과일', '/images/meals/lunch.jpg', 780, '설날 특식'),
  (1, '2026-02-09', 'DINNER', '불고기, 계란찜, 나물, 미역국, 수정과', '/images/meals/dinner.jpg', 660, '설날 특식')
ON CONFLICT DO NOTHING;

-- 식단 상세 항목 (2주차: 2026-02-10 ~ 2026-02-16) - 샘플 일부만
INSERT INTO meal_plan_items (meal_plan_id, meal_date, meal_type, menu_content, image_url, calories) VALUES
  -- 월요일 (2/10)
  (2, '2026-02-10', 'BREAKFAST', '된장찌개, 계란후라이, 김, 깍두기, 우유', NULL, 510),
  (2, '2026-02-10', 'LUNCH', '제육볶음, 두부조림, 나물, 배추국, 사과', NULL, 690),
  (2, '2026-02-10', 'DINNER', '고등어조림, 감자조림, 시금치나물, 미역국, 요구르트', NULL, 600),

  -- 화요일 (2/11)
  (2, '2026-02-11', 'BREAKFAST', '미역국, 계란찜, 김구이, 깍두기, 우유', NULL, 500),
  (2, '2026-02-11', 'LUNCH', '닭볶음탕, 잡채, 나물, 무국, 귤', NULL, 720),
  (2, '2026-02-11', 'DINNER', '순두부찌개, 생선전, 콩나물무침, 배', NULL, 590)
ON CONFLICT DO NOTHING;

-- ============================================
-- 5. 프로그램 (PROGRAMS)
-- ============================================

INSERT INTO programs (id, title, description, category, is_active, created_by, meta) VALUES
  (1, '인지활동 프로그램',
  '기억력과 사고력 향상을 위한 인지 훈련 프로그램입니다. 퍼즐, 숫자 게임, 단어 맞추기 등 다양한 활동을 통해 두뇌를 활성화합니다.',
  'COGNITIVE', TRUE, 7,
  '{"level": "초급/중급", "duration": "60분", "materials": ["워크북", "필기구", "퍼즐"]}'::jsonb),

  (2, '노래교실',
  '추억의 노래를 통한 정서 안정 프로그램입니다. 어르신들이 좋아하시는 옛날 노래를 함께 부르며 즐거운 시간을 보냅니다.',
  'MUSIC', TRUE, 7,
  '{"level": "전체", "duration": "60분", "materials": ["반주기", "마이크", "가사집"]}'::jsonb),

  (3, '종이접기',
  '소근육 운동 및 집중력 향상을 위한 미술 활동입니다. 계절과 명절에 맞는 다양한 작품을 만듭니다.',
  'ART', TRUE, 7,
  '{"level": "초급", "duration": "60분", "materials": ["색종이", "풀", "가위"]}'::jsonb),

  (4, '가벼운 체조',
  '건강 유지를 위한 스트레칭과 가벼운 체조 프로그램입니다. 관절 건강과 근력 향상에 도움이 됩니다.',
  'EXERCISE', TRUE, 7,
  '{"level": "초급", "duration": "30분", "materials": ["매트", "의자", "음악"]}'::jsonb),

  (5, '영화감상',
  '문화생활 및 여가 활동 프로그램입니다. 어르신들이 좋아하시는 옛날 영화나 교양 프로그램을 감상합니다.',
  'RECREATION', TRUE, 7,
  '{"level": "전체", "duration": "90분", "materials": ["프로젝터", "스피커"]}'::jsonb),

  (6, '원예 프로그램',
  '식물을 가꾸며 정서적 안정을 얻는 프로그램입니다. 계절 꽃과 채소를 직접 심고 가꿉니다.',
  'ART', TRUE, 7,
  '{"level": "초급", "duration": "60분", "materials": ["화분", "흙", "씨앗", "모종"]}'::jsonb),

  (7, '회상 프로그램',
  '옛 추억을 떠올리며 이야기를 나누는 프로그램입니다. 사진, 음악, 물건 등을 활용하여 기억을 자극합니다.',
  'COGNITIVE', TRUE, 7,
  '{"level": "전체", "duration": "60분", "materials": ["옛날 사진", "음악", "추억의 물건들"]}'::jsonb)
ON CONFLICT (id) DO NOTHING;

-- 프로그램 일정
INSERT INTO program_schedules (id, program_id, starts_at, ends_at, location, capacity, status) VALUES
  -- 이번 주 일정
  (1, 1, '2026-02-10 10:00:00', '2026-02-10 11:00:00', '1층 프로그램실', 15, 'PLANNED'),
  (2, 2, '2026-02-10 14:00:00', '2026-02-10 15:00:00', '2층 강당', 20, 'PLANNED'),
  (3, 4, '2026-02-11 09:00:00', '2026-02-11 09:30:00', '옥상 정원', 10, 'PLANNED'),
  (4, 3, '2026-02-11 15:00:00', '2026-02-11 16:00:00', '1층 프로그램실', 12, 'PLANNED'),
  (5, 5, '2026-02-12 14:00:00', '2026-02-12 15:30:00', '2층 강당', 25, 'PLANNED'),

  -- 다음 주 일정
  (6, 1, '2026-02-17 10:00:00', '2026-02-17 11:00:00', '1층 프로그램실', 15, 'PLANNED'),
  (7, 2, '2026-02-17 14:00:00', '2026-02-17 15:00:00', '2층 강당', 20, 'PLANNED'),
  (8, 6, '2026-02-18 10:00:00', '2026-02-18 11:00:00', '옥상 정원', 10, 'PLANNED'),
  (9, 7, '2026-02-18 15:00:00', '2026-02-18 16:00:00', '1층 프로그램실', 12, 'PLANNED'),

  -- 지난 일정 (완료)
  (10, 1, '2026-02-03 10:00:00', '2026-02-03 11:00:00', '1층 프로그램실', 15, 'DONE'),
  (11, 2, '2026-02-03 14:00:00', '2026-02-03 15:00:00', '2층 강당', 20, 'DONE'),
  (12, 4, '2026-02-04 09:00:00', '2026-02-04 09:30:00', '옥상 정원', 10, 'DONE')
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- Sequence 업데이트
-- ============================================

-- 다음 삽입 시 ID 충돌 방지
SELECT setval('departments_id_seq', (SELECT MAX(id) FROM departments));
SELECT setval('employee_roles_id_seq', (SELECT MAX(id) FROM employee_roles));
SELECT setval('employees_id_seq', (SELECT MAX(id) FROM employees));
SELECT setval('file_storage_id_seq', (SELECT MAX(id) FROM file_storage));
SELECT setval('notices_id_seq', (SELECT MAX(id) FROM notices));
SELECT setval('board_posts_id_seq', (SELECT MAX(id) FROM board_posts));
SELECT setval('board_comments_id_seq', (SELECT MAX(id) FROM board_comments));
SELECT setval('gallery_items_id_seq', (SELECT MAX(id) FROM gallery_items));
SELECT setval('meal_plans_id_seq', (SELECT MAX(id) FROM meal_plans));
SELECT setval('programs_id_seq', (SELECT MAX(id) FROM programs));
SELECT setval('program_schedules_id_seq', (SELECT MAX(id) FROM program_schedules));

-- ============================================
-- 완료 메시지
-- ============================================

DO $$
BEGIN
  RAISE NOTICE '========================================';
  RAISE NOTICE 'Web 알림마당 Seed Data 생성 완료!';
  RAISE NOTICE '========================================';
  RAISE NOTICE '공지사항: 7건 (고정 2건 포함)';
  RAISE NOTICE '게시판: 8건 (자유 3, 질문 3, 건의 2)';
  RAISE NOTICE '댓글: 7건';
  RAISE NOTICE '갤러리: 5건';
  RAISE NOTICE '파일: 10건';
  RAISE NOTICE '식단표: 2주차 (게시됨)';
  RAISE NOTICE '프로그램: 7종';
  RAISE NOTICE '프로그램 일정: 12건';
  RAISE NOTICE '========================================';
  RAISE NOTICE 'View 테스트 가능:';
  RAISE NOTICE '  - v_web_notices';
  RAISE NOTICE '  - v_web_notice_detail';
  RAISE NOTICE '  - v_web_board_posts';
  RAISE NOTICE '  - v_web_board_post_detail';
  RAISE NOTICE '  - v_web_gallery_items';
  RAISE NOTICE '  - v_web_gallery_detail';
  RAISE NOTICE '  - v_web_meal_plans';
  RAISE NOTICE '  - v_web_meal_plan_detail';
  RAISE NOTICE '  - v_web_programs';
  RAISE NOTICE '  - v_web_program_detail';
  RAISE NOTICE '========================================';
END$$;
