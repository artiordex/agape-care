-- Description : 30-web-views.sql - 📌 Web 알림마당 조회용 View
-- Author : Shiwoo Min
-- Date : 2025-02-09
-- Purpose : Web에서 알림마당 콘텐츠를 효율적으로 조회하기 위한 가상 뷰
-- Note : 기존 테이블(notices, board_posts 등)을 활용한 읽기 전용 뷰

-- ============================================
-- 1. 공지사항 조회 뷰
-- ============================================

-- 공지사항 목록 조회 (파일, 작성자 정보 포함)
CREATE OR REPLACE VIEW v_web_notices AS
SELECT
  n.id,
  n.title,
  n.content,
  n.category,
  n.is_pinned,
  n.is_active,
  n.view_count,
  n.published_at,
  n.created_at,
  n.updated_at,
  -- 작성자 정보
  e.name AS creator_name,
  e.id AS creator_id,
  -- 첨부파일 개수
  (SELECT COUNT(*) FROM notice_files nf WHERE nf.notice_id = n.id) AS file_count,
  -- 첨부파일 정보 (JSON 배열)
  (
    SELECT COALESCE(jsonb_agg(
      jsonb_build_object(
        'id', f.id,
        'fileName', f.original_name,
        'filePath', f.path,
        'fileSize', f.size_bytes,
        'mimeType', f.mime_type
      ) ORDER BY nf.created_at
    ), '[]'::jsonb)
    FROM notice_files nf
    JOIN file_storage f ON f.id = nf.file_id
    WHERE nf.notice_id = n.id
  ) AS files
FROM notices n
LEFT JOIN employees e ON e.id = n.created_by
WHERE n.is_active = true;

COMMENT ON VIEW v_web_notices IS 'Web 공지사항 조회 뷰 - 활성화된 공지사항을 작성자 및 첨부파일 정보와 함께 제공';

-- 공지사항 상세보기 뷰 (이전글/다음글 포함)
CREATE OR REPLACE VIEW v_web_notice_detail AS
SELECT
  n.id,
  n.title,
  n.content,
  n.category,
  n.is_pinned,
  n.view_count,
  n.published_at,
  n.created_at,
  n.updated_at,
  -- 작성자 정보
  e.name AS creator_name,
  e.id AS creator_id,
  -- 첨부파일 정보
  (
    SELECT COALESCE(jsonb_agg(
      jsonb_build_object(
        'id', f.id,
        'fileName', f.original_name,
        'filePath', f.path,
        'fileSize', f.size_bytes,
        'mimeType', f.mime_type,
        'createdAt', nf.created_at
      ) ORDER BY nf.created_at
    ), '[]'::jsonb)
    FROM notice_files nf
    JOIN file_storage f ON f.id = nf.file_id
    WHERE nf.notice_id = n.id
  ) AS files,
  -- 이전글 정보
  (
    SELECT jsonb_build_object(
      'id', prev.id,
      'title', prev.title,
      'createdAt', prev.created_at
    )
    FROM notices prev
    WHERE prev.is_active = true
      AND prev.id < n.id
      AND (prev.published_at IS NULL OR prev.published_at <= NOW())
    ORDER BY prev.id DESC
    LIMIT 1
  ) AS prev_notice,
  -- 다음글 정보
  (
    SELECT jsonb_build_object(
      'id', next.id,
      'title', next.title,
      'createdAt', next.created_at
    )
    FROM notices next
    WHERE next.is_active = true
      AND next.id > n.id
      AND (next.published_at IS NULL OR next.published_at <= NOW())
    ORDER BY next.id ASC
    LIMIT 1
  ) AS next_notice
FROM notices n
LEFT JOIN employees e ON e.id = n.created_by
WHERE n.is_active = true;

COMMENT ON VIEW v_web_notice_detail IS 'Web 공지사항 상세 조회 뷰 - 이전글/다음글 정보 포함';

-- ============================================
-- 2. 게시판 조회 뷰
-- ============================================

-- 게시글 목록 조회 (댓글 수, 파일, 작성자 정보 포함)
CREATE OR REPLACE VIEW v_web_board_posts AS
SELECT
  bp.id,
  bp.board_key,
  bp.title,
  bp.content,
  bp.view_count,
  bp.is_pinned,
  bp.is_locked,
  bp.created_at,
  bp.updated_at,
  -- 작성자 정보
  e.name AS author_name,
  e.id AS author_id,
  -- 댓글 개수
  (SELECT COUNT(*) FROM board_comments bc WHERE bc.post_id = bp.id AND bc.is_deleted = false) AS comment_count,
  -- 첨부파일 개수
  (SELECT COUNT(*) FROM board_files bf WHERE bf.post_id = bp.id) AS file_count,
  -- 첨부파일 정보 (JSON 배열)
  (
    SELECT COALESCE(jsonb_agg(
      jsonb_build_object(
        'id', f.id,
        'fileName', f.original_name,
        'filePath', f.path,
        'fileSize', f.size_bytes,
        'mimeType', f.mime_type
      ) ORDER BY bf.created_at
    ), '[]'::jsonb)
    FROM board_files bf
    JOIN file_storage f ON f.id = bf.file_id
    WHERE bf.post_id = bp.id
  ) AS files
FROM board_posts bp
LEFT JOIN employees e ON e.id = bp.author_id;

COMMENT ON VIEW v_web_board_posts IS 'Web 게시판 조회 뷰 - 게시글을 댓글 수, 작성자, 첨부파일 정보와 함께 제공';

-- 게시글 상세보기 뷰 (댓글, 이전글/다음글 포함)
CREATE OR REPLACE VIEW v_web_board_post_detail AS
SELECT
  bp.id,
  bp.board_key,
  bp.title,
  bp.content,
  bp.view_count,
  bp.is_pinned,
  bp.is_locked,
  bp.created_at,
  bp.updated_at,
  -- 작성자 정보
  e.name AS author_name,
  e.id AS author_id,
  -- 첨부파일 정보
  (
    SELECT COALESCE(jsonb_agg(
      jsonb_build_object(
        'id', f.id,
        'fileName', f.original_name,
        'filePath', f.path,
        'fileSize', f.size_bytes,
        'mimeType', f.mime_type,
        'createdAt', bf.created_at
      ) ORDER BY bf.created_at
    ), '[]'::jsonb)
    FROM board_files bf
    JOIN file_storage f ON f.id = bf.file_id
    WHERE bf.post_id = bp.id
  ) AS files,
  -- 댓글 목록 (대댓글 포함, 계층 구조)
  (
    SELECT COALESCE(jsonb_agg(
      jsonb_build_object(
        'id', bc.id,
        'content', CASE WHEN bc.is_deleted THEN '삭제된 댓글입니다.' ELSE bc.content END,
        'isDeleted', bc.is_deleted,
        'authorName', ae.name,
        'authorId', bc.author_id,
        'createdAt', bc.created_at,
        'updatedAt', bc.updated_at,
        'replies', (
          SELECT COALESCE(jsonb_agg(
            jsonb_build_object(
              'id', reply.id,
              'content', CASE WHEN reply.is_deleted THEN '삭제된 댓글입니다.' ELSE reply.content END,
              'isDeleted', reply.is_deleted,
              'authorName', re.name,
              'authorId', reply.author_id,
              'createdAt', reply.created_at,
              'updatedAt', reply.updated_at
            ) ORDER BY reply.created_at
          ), '[]'::jsonb)
          FROM board_comments reply
          LEFT JOIN employees re ON re.id = reply.author_id
          WHERE reply.parent_id = bc.id
        )
      ) ORDER BY bc.created_at
    ), '[]'::jsonb)
    FROM board_comments bc
    LEFT JOIN employees ae ON ae.id = bc.author_id
    WHERE bc.post_id = bp.id AND bc.parent_id IS NULL
  ) AS comments,
  -- 댓글 개수
  (SELECT COUNT(*) FROM board_comments bc WHERE bc.post_id = bp.id AND bc.is_deleted = false) AS comment_count,
  -- 이전글 정보 (같은 게시판)
  (
    SELECT jsonb_build_object(
      'id', prev.id,
      'title', prev.title,
      'createdAt', prev.created_at
    )
    FROM board_posts prev
    WHERE prev.board_key = bp.board_key
      AND prev.id < bp.id
    ORDER BY prev.id DESC
    LIMIT 1
  ) AS prev_post,
  -- 다음글 정보 (같은 게시판)
  (
    SELECT jsonb_build_object(
      'id', next.id,
      'title', next.title,
      'createdAt', next.created_at
    )
    FROM board_posts next
    WHERE next.board_key = bp.board_key
      AND next.id > bp.id
    ORDER BY next.id ASC
    LIMIT 1
  ) AS next_post
FROM board_posts bp
LEFT JOIN employees e ON e.id = bp.author_id;

COMMENT ON VIEW v_web_board_post_detail IS 'Web 게시글 상세 조회 뷰 - 댓글, 이전글/다음글 정보 포함';

-- 댓글 조회 뷰 (대댓글 구조 포함)
CREATE OR REPLACE VIEW v_web_board_comments AS
SELECT
  bc.id,
  bc.post_id,
  bc.parent_id,
  bc.content,
  bc.is_deleted,
  bc.created_at,
  bc.updated_at,
  -- 작성자 정보
  e.name AS author_name,
  e.id AS author_id,
  -- 대댓글 개수
  (SELECT COUNT(*) FROM board_comments sub WHERE sub.parent_id = bc.id AND sub.is_deleted = false) AS reply_count,
  -- 삭제된 댓글 표시용
  CASE
    WHEN bc.is_deleted THEN '삭제된 댓글입니다.'
    ELSE bc.content
  END AS display_content
FROM board_comments bc
LEFT JOIN employees e ON e.id = bc.author_id;

COMMENT ON VIEW v_web_board_comments IS 'Web 게시판 댓글 조회 뷰 - 댓글과 대댓글 정보 제공';

-- ============================================
-- 3. 갤러리 조회 뷰
-- ============================================

-- 갤러리 목록 조회 (이미지 파일 포함)
CREATE OR REPLACE VIEW v_web_gallery_items AS
SELECT
  gi.id,
  gi.title,
  gi.description,
  gi.category,
  gi.event_date,
  gi.is_public,
  gi.created_at,
  gi.updated_at,
  -- 작성자 정보
  e.name AS creator_name,
  e.id AS creator_id,
  -- 파일 개수
  (SELECT COUNT(*) FROM gallery_files gf WHERE gf.gallery_id = gi.id) AS file_count,
  -- 대표 이미지 (첫 번째 이미지)
  (
    SELECT jsonb_build_object(
      'id', f.id,
      'fileName', f.original_name,
      'filePath', f.path,
      'mimeType', f.mime_type
    )
    FROM gallery_files gf
    JOIN file_storage f ON f.id = gf.file_id
    WHERE gf.gallery_id = gi.id
    ORDER BY gf.sort_order, gf.created_at
    LIMIT 1
  ) AS thumbnail,
  -- 전체 파일 목록 (정렬 순서대로)
  (
    SELECT COALESCE(jsonb_agg(
      jsonb_build_object(
        'id', f.id,
        'fileName', f.original_name,
        'filePath', f.path,
        'fileSize', f.size_bytes,
        'mimeType', f.mime_type,
        'sortOrder', gf.sort_order
      ) ORDER BY gf.sort_order, gf.created_at
    ), '[]'::jsonb)
    FROM gallery_files gf
    JOIN file_storage f ON f.id = gf.file_id
    WHERE gf.gallery_id = gi.id
  ) AS files
FROM gallery_items gi
LEFT JOIN employees e ON e.id = gi.created_by
WHERE gi.is_public = true;

COMMENT ON VIEW v_web_gallery_items IS 'Web 갤러리 조회 뷰 - 공개된 갤러리 항목을 대표 이미지 및 전체 파일과 함께 제공';

-- 갤러리 상세보기 뷰 (이전글/다음글 포함)
CREATE OR REPLACE VIEW v_web_gallery_detail AS
SELECT
  gi.id,
  gi.title,
  gi.description,
  gi.category,
  gi.event_date,
  gi.created_at,
  gi.updated_at,
  -- 작성자 정보
  e.name AS creator_name,
  e.id AS creator_id,
  -- 파일 목록 (정렬 순서대로)
  (
    SELECT COALESCE(jsonb_agg(
      jsonb_build_object(
        'id', f.id,
        'fileName', f.original_name,
        'filePath', f.path,
        'fileSize', f.size_bytes,
        'mimeType', f.mime_type,
        'sortOrder', gf.sort_order,
        'createdAt', gf.created_at
      ) ORDER BY gf.sort_order, gf.created_at
    ), '[]'::jsonb)
    FROM gallery_files gf
    JOIN file_storage f ON f.id = gf.file_id
    WHERE gf.gallery_id = gi.id
  ) AS files,
  -- 파일 개수
  (SELECT COUNT(*) FROM gallery_files gf WHERE gf.gallery_id = gi.id) AS file_count,
  -- 이전 갤러리
  (
    SELECT jsonb_build_object(
      'id', prev.id,
      'title', COALESCE(prev.title, '갤러리 ' || prev.id),
      'eventDate', prev.event_date,
      'thumbnail', (
        SELECT jsonb_build_object(
          'filePath', f.path,
          'mimeType', f.mime_type
        )
        FROM gallery_files gf
        JOIN file_storage f ON f.id = gf.file_id
        WHERE gf.gallery_id = prev.id
        ORDER BY gf.sort_order, gf.created_at
        LIMIT 1
      )
    )
    FROM gallery_items prev
    WHERE prev.is_public = true
      AND prev.id < gi.id
    ORDER BY prev.id DESC
    LIMIT 1
  ) AS prev_gallery,
  -- 다음 갤러리
  (
    SELECT jsonb_build_object(
      'id', next.id,
      'title', COALESCE(next.title, '갤러리 ' || next.id),
      'eventDate', next.event_date,
      'thumbnail', (
        SELECT jsonb_build_object(
          'filePath', f.path,
          'mimeType', f.mime_type
        )
        FROM gallery_files gf
        JOIN file_storage f ON f.id = gf.file_id
        WHERE gf.gallery_id = next.id
        ORDER BY gf.sort_order, gf.created_at
        LIMIT 1
      )
    )
    FROM gallery_items next
    WHERE next.is_public = true
      AND next.id > gi.id
    ORDER BY next.id ASC
    LIMIT 1
  ) AS next_gallery
FROM gallery_items gi
LEFT JOIN employees e ON e.id = gi.created_by
WHERE gi.is_public = true;

COMMENT ON VIEW v_web_gallery_detail IS 'Web 갤러리 상세 조회 뷰 - 이전/다음 갤러리 정보 포함';

-- ============================================
-- 4. 식단표 조회 뷰
-- ============================================

-- 주간 식단표 조회 (일별 식사 정보 포함)
CREATE OR REPLACE VIEW v_web_meal_plans AS
SELECT
  mp.id,
  mp.facility_code,
  mp.week_start_date,
  mp.status,
  mp.nutrition_manager,
  mp.notes,
  mp.created_at,
  mp.updated_at,
  -- 작성자 정보
  e.name AS creator_name,
  e.id AS creator_id,
  -- 주간 식단 데이터 (일자별 그룹화)
  (
    SELECT COALESCE(jsonb_agg(
      jsonb_build_object(
        'mealDate', mpi.meal_date,
        'meals', (
          SELECT jsonb_agg(
            jsonb_build_object(
              'id', mpi2.id,
              'mealType', mpi2.meal_type,
              'menuContent', mpi2.menu_content,
              'imageUrl', mpi2.image_url,
              'calories', mpi2.calories,
              'notes', mpi2.notes
            ) ORDER BY
              CASE mpi2.meal_type
                WHEN 'BREAKFAST' THEN 1
                WHEN 'LUNCH' THEN 2
                WHEN 'DINNER' THEN 3
                WHEN 'SNACK' THEN 4
                ELSE 5
              END
          )
          FROM meal_plan_items mpi2
          WHERE mpi2.meal_plan_id = mp.id
            AND mpi2.meal_date = mpi.meal_date
        )
      ) ORDER BY mpi.meal_date
    ), '[]'::jsonb)
    FROM (SELECT DISTINCT meal_date FROM meal_plan_items WHERE meal_plan_id = mp.id) mpi
  ) AS week_meals
FROM meal_plans mp
LEFT JOIN employees e ON e.id = mp.created_by
WHERE mp.status = 'PUBLISHED';

COMMENT ON VIEW v_web_meal_plans IS 'Web 식단표 조회 뷰 - 게시된 주간 식단표를 일자별 식사 정보와 함께 제공';

-- 식단표 상세보기 뷰 (이전주/다음주 포함)
CREATE OR REPLACE VIEW v_web_meal_plan_detail AS
SELECT
  mp.id,
  mp.facility_code,
  mp.week_start_date,
  mp.week_start_date + INTERVAL '6 days' AS week_end_date,
  mp.nutrition_manager,
  mp.notes,
  mp.created_at,
  mp.updated_at,
  -- 작성자 정보
  e.name AS creator_name,
  e.id AS creator_id,
  -- 주간 식단 데이터 (일자별 + 요일 정보)
  (
    SELECT COALESCE(jsonb_agg(
      jsonb_build_object(
        'mealDate', mpi.meal_date,
        'dayOfWeek', TO_CHAR(mpi.meal_date, 'Day'),
        'dayName', CASE EXTRACT(DOW FROM mpi.meal_date)
          WHEN 0 THEN '일요일'
          WHEN 1 THEN '월요일'
          WHEN 2 THEN '화요일'
          WHEN 3 THEN '수요일'
          WHEN 4 THEN '목요일'
          WHEN 5 THEN '금요일'
          WHEN 6 THEN '토요일'
        END,
        'meals', (
          SELECT jsonb_agg(
            jsonb_build_object(
              'id', mpi2.id,
              'mealType', mpi2.meal_type,
              'mealTypeName', CASE mpi2.meal_type
                WHEN 'BREAKFAST' THEN '아침'
                WHEN 'LUNCH' THEN '점심'
                WHEN 'DINNER' THEN '저녁'
                WHEN 'SNACK' THEN '간식'
                ELSE mpi2.meal_type
              END,
              'menuContent', mpi2.menu_content,
              'imageUrl', mpi2.image_url,
              'calories', mpi2.calories,
              'notes', mpi2.notes
            ) ORDER BY
              CASE mpi2.meal_type
                WHEN 'BREAKFAST' THEN 1
                WHEN 'LUNCH' THEN 2
                WHEN 'DINNER' THEN 3
                WHEN 'SNACK' THEN 4
                ELSE 5
              END
          )
          FROM meal_plan_items mpi2
          WHERE mpi2.meal_plan_id = mp.id
            AND mpi2.meal_date = mpi.meal_date
        )
      ) ORDER BY mpi.meal_date
    ), '[]'::jsonb)
    FROM (SELECT DISTINCT meal_date FROM meal_plan_items WHERE meal_plan_id = mp.id) mpi
  ) AS week_meals,
  -- 이전주 식단표
  (
    SELECT jsonb_build_object(
      'id', prev.id,
      'weekStartDate', prev.week_start_date,
      'weekEndDate', prev.week_start_date + INTERVAL '6 days'
    )
    FROM meal_plans prev
    WHERE prev.status = 'PUBLISHED'
      AND prev.facility_code = mp.facility_code
      AND prev.week_start_date < mp.week_start_date
    ORDER BY prev.week_start_date DESC
    LIMIT 1
  ) AS prev_week,
  -- 다음주 식단표
  (
    SELECT jsonb_build_object(
      'id', next.id,
      'weekStartDate', next.week_start_date,
      'weekEndDate', next.week_start_date + INTERVAL '6 days'
    )
    FROM meal_plans next
    WHERE next.status = 'PUBLISHED'
      AND next.facility_code = mp.facility_code
      AND next.week_start_date > mp.week_start_date
    ORDER BY next.week_start_date ASC
    LIMIT 1
  ) AS next_week
FROM meal_plans mp
LEFT JOIN employees e ON e.id = mp.created_by
WHERE mp.status = 'PUBLISHED';

COMMENT ON VIEW v_web_meal_plan_detail IS 'Web 식단표 상세 조회 뷰 - 이전주/다음주 정보 포함';

-- 단순 식단 항목 조회 (검색/필터링용)
CREATE OR REPLACE VIEW v_web_meal_plan_items AS
SELECT
  mpi.id,
  mpi.meal_plan_id,
  mpi.meal_date,
  mpi.meal_type,
  mpi.menu_content,
  mpi.image_url,
  mpi.calories,
  mpi.notes,
  -- 식단표 정보
  mp.week_start_date,
  mp.facility_code,
  mp.nutrition_manager,
  -- 요일 정보 추가
  TO_CHAR(mpi.meal_date, 'Day') AS day_of_week,
  EXTRACT(DOW FROM mpi.meal_date) AS day_number,
  CASE EXTRACT(DOW FROM mpi.meal_date)
    WHEN 0 THEN '일요일'
    WHEN 1 THEN '월요일'
    WHEN 2 THEN '화요일'
    WHEN 3 THEN '수요일'
    WHEN 4 THEN '목요일'
    WHEN 5 THEN '금요일'
    WHEN 6 THEN '토요일'
  END AS day_name
FROM meal_plan_items mpi
JOIN meal_plans mp ON mp.id = mpi.meal_plan_id
WHERE mp.status = 'PUBLISHED';

COMMENT ON VIEW v_web_meal_plan_items IS 'Web 식단 항목 조회 뷰 - 개별 식단 항목 검색 및 필터링용';

-- ============================================
-- 5. 프로그램 조회 뷰
-- ============================================

-- 프로그램 목록 조회 (예정된 일정 포함)
CREATE OR REPLACE VIEW v_web_programs AS
SELECT
  p.id,
  p.title,
  p.description,
  p.category,
  p.is_active,
  p.meta,
  p.created_at,
  p.updated_at,
  -- 작성자 정보
  e.name AS creator_name,
  e.id AS creator_id,
  -- 예정된 일정 개수
  (
    SELECT COUNT(*)
    FROM program_schedules ps
    WHERE ps.program_id = p.id
      AND ps.starts_at >= NOW()
      AND ps.status NOT IN ('CANCELLED')
  ) AS upcoming_schedule_count,
  -- 가장 가까운 일정
  (
    SELECT jsonb_build_object(
      'id', ps.id,
      'startsAt', ps.starts_at,
      'endsAt', ps.ends_at,
      'location', ps.location,
      'capacity', ps.capacity,
      'status', ps.status
    )
    FROM program_schedules ps
    WHERE ps.program_id = p.id
      AND ps.starts_at >= NOW()
      AND ps.status NOT IN ('CANCELLED')
    ORDER BY ps.starts_at
    LIMIT 1
  ) AS next_schedule
FROM programs p
LEFT JOIN employees e ON e.id = p.created_by
WHERE p.is_active = true;

COMMENT ON VIEW v_web_programs IS 'Web 프로그램 조회 뷰 - 활성화된 프로그램을 예정된 일정 정보와 함께 제공';

-- 프로그램 상세보기 뷰 (전체 일정 목록 포함)
CREATE OR REPLACE VIEW v_web_program_detail AS
SELECT
  p.id,
  p.title,
  p.description,
  p.category,
  p.meta,
  p.created_at,
  p.updated_at,
  -- 작성자 정보
  e.name AS creator_name,
  e.id AS creator_id,
  -- 전체 일정 목록 (예정 + 완료)
  (
    SELECT COALESCE(jsonb_agg(
      jsonb_build_object(
        'id', ps.id,
        'startsAt', ps.starts_at,
        'endsAt', ps.ends_at,
        'location', ps.location,
        'capacity', ps.capacity,
        'status', ps.status,
        'attendanceCount', (
          SELECT COUNT(*)
          FROM program_attendance pa
          WHERE pa.schedule_id = ps.id
            AND pa.attended = true
        ),
        'displayStatus', CASE
          WHEN ps.status = 'CANCELLED' THEN '취소됨'
          WHEN ps.starts_at > NOW() THEN '예정'
          WHEN ps.ends_at < NOW() THEN '완료'
          ELSE '진행중'
        END
      ) ORDER BY ps.starts_at DESC
    ), '[]'::jsonb)
    FROM program_schedules ps
    WHERE ps.program_id = p.id
      AND ps.status NOT IN ('CANCELLED')
  ) AS schedules,
  -- 예정된 일정만
  (
    SELECT COALESCE(jsonb_agg(
      jsonb_build_object(
        'id', ps.id,
        'startsAt', ps.starts_at,
        'endsAt', ps.ends_at,
        'location', ps.location,
        'capacity', ps.capacity
      ) ORDER BY ps.starts_at
    ), '[]'::jsonb)
    FROM program_schedules ps
    WHERE ps.program_id = p.id
      AND ps.starts_at >= NOW()
      AND ps.status NOT IN ('CANCELLED')
  ) AS upcoming_schedules
FROM programs p
LEFT JOIN employees e ON e.id = p.created_by
WHERE p.is_active = true;

COMMENT ON VIEW v_web_program_detail IS 'Web 프로그램 상세 조회 뷰 - 전체 일정 목록 포함';

-- 프로그램 일정 조회 뷰
CREATE OR REPLACE VIEW v_web_program_schedules AS
SELECT
  ps.id,
  ps.program_id,
  ps.starts_at,
  ps.ends_at,
  ps.location,
  ps.capacity,
  ps.status,
  ps.created_at,
  ps.updated_at,
  -- 프로그램 정보
  p.title AS program_title,
  p.description AS program_description,
  p.category AS program_category,
  -- 참석자 수 (출석 완료된 인원)
  (
    SELECT COUNT(*)
    FROM program_attendance pa
    WHERE pa.schedule_id = ps.id
      AND pa.attended = true
  ) AS attendance_count,
  -- 진행 상태 표시
  CASE
    WHEN ps.status = 'CANCELLED' THEN '취소됨'
    WHEN ps.starts_at > NOW() THEN '예정'
    WHEN ps.ends_at < NOW() THEN '완료'
    ELSE '진행중'
  END AS display_status
FROM program_schedules ps
JOIN programs p ON p.id = ps.program_id
WHERE p.is_active = true
  AND ps.status NOT IN ('CANCELLED');

COMMENT ON VIEW v_web_program_schedules IS 'Web 프로그램 일정 조회 뷰 - 프로그램 일정을 참석 정보와 함께 제공';

-- ============================================
-- 6. 통합 최신 콘텐츠 뷰 (홈페이지 메인용)
-- ============================================

-- 최신 알림마당 콘텐츠 통합 조회
CREATE OR REPLACE VIEW v_web_latest_contents AS
-- 공지사항
SELECT
  'NOTICE' AS content_type,
  n.id,
  n.title,
  LEFT(n.content, 200) AS summary,
  n.created_at,
  n.view_count,
  NULL::INTEGER AS comment_count,
  (SELECT COUNT(*) FROM notice_files nf WHERE nf.notice_id = n.id) AS file_count,
  e.name AS author_name
FROM notices n
LEFT JOIN employees e ON e.id = n.created_by
WHERE n.is_active = true
  AND (n.published_at IS NULL OR n.published_at <= NOW())

UNION ALL

-- 게시글
SELECT
  'BOARD' AS content_type,
  bp.id,
  bp.title,
  LEFT(bp.content, 200) AS summary,
  bp.created_at,
  bp.view_count,
  (SELECT COUNT(*) FROM board_comments bc WHERE bc.post_id = bp.id AND bc.is_deleted = false) AS comment_count,
  (SELECT COUNT(*) FROM board_files bf WHERE bf.post_id = bp.id) AS file_count,
  e.name AS author_name
FROM board_posts bp
LEFT JOIN employees e ON e.id = bp.author_id

UNION ALL

-- 갤러리
SELECT
  'GALLERY' AS content_type,
  gi.id,
  COALESCE(gi.title, '갤러리 ' || gi.id) AS title,
  gi.description AS summary,
  gi.created_at,
  NULL::INTEGER AS view_count,
  NULL::INTEGER AS comment_count,
  (SELECT COUNT(*) FROM gallery_files gf WHERE gf.gallery_id = gi.id) AS file_count,
  e.name AS author_name
FROM gallery_items gi
LEFT JOIN employees e ON e.id = gi.created_by
WHERE gi.is_public = true

ORDER BY created_at DESC
LIMIT 50;

COMMENT ON VIEW v_web_latest_contents IS 'Web 최신 콘텐츠 통합 조회 뷰 - 공지사항, 게시글, 갤러리의 최신 콘텐츠 50건 제공';

-- ============================================
-- 인덱스 추가 (성능 최적화)
-- ============================================

-- 공지사항 조회 성능 향상
CREATE INDEX IF NOT EXISTS idx_notices_active_published
  ON notices(is_active, published_at DESC)
  WHERE is_active = true;

CREATE INDEX IF NOT EXISTS idx_notices_pinned_active
  ON notices(is_pinned DESC, created_at DESC)
  WHERE is_active = true;

-- 게시판 조회 성능 향상
CREATE INDEX IF NOT EXISTS idx_board_posts_board_created
  ON board_posts(board_key, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_board_posts_author
  ON board_posts(author_id);

CREATE INDEX IF NOT EXISTS idx_board_comments_post
  ON board_comments(post_id, created_at)
  WHERE is_deleted = false;

-- 갤러리 조회 성능 향상
CREATE INDEX IF NOT EXISTS idx_gallery_items_public_event
  ON gallery_items(is_public, event_date DESC)
  WHERE is_public = true;

CREATE INDEX IF NOT EXISTS idx_gallery_files_gallery_sort
  ON gallery_files(gallery_id, sort_order, created_at);

-- 식단표 조회 성능 향상
CREATE INDEX IF NOT EXISTS idx_meal_plans_status_week
  ON meal_plans(status, week_start_date DESC)
  WHERE status = 'PUBLISHED';

CREATE INDEX IF NOT EXISTS idx_meal_plan_items_plan_date
  ON meal_plan_items(meal_plan_id, meal_date);

-- 프로그램 조회 성능 향상
CREATE INDEX IF NOT EXISTS idx_programs_active_category
  ON programs(is_active, category)
  WHERE is_active = true;

CREATE INDEX IF NOT EXISTS idx_program_schedules_upcoming
  ON program_schedules(program_id, starts_at)
  WHERE status NOT IN ('CANCELLED');

-- ============================================
-- 완료 메시지
-- ============================================

DO $$
BEGIN
  RAISE NOTICE '========================================';
  RAISE NOTICE 'Web 알림마당 View 생성 완료';
  RAISE NOTICE '생성된 목록 View:';
  RAISE NOTICE '  - v_web_notices (공지사항 목록)';
  RAISE NOTICE '  - v_web_board_posts (게시글 목록)';
  RAISE NOTICE '  - v_web_board_comments (댓글)';
  RAISE NOTICE '  - v_web_gallery_items (갤러리 목록)';
  RAISE NOTICE '  - v_web_meal_plans (식단표 목록)';
  RAISE NOTICE '  - v_web_meal_plan_items (식단 항목)';
  RAISE NOTICE '  - v_web_programs (프로그램 목록)';
  RAISE NOTICE '  - v_web_program_schedules (프로그램 일정)';
  RAISE NOTICE '  - v_web_latest_contents (최신 콘텐츠 통합)';
  RAISE NOTICE '';
  RAISE NOTICE '생성된 상세 View:';
  RAISE NOTICE '  - v_web_notice_detail (공지사항 상세)';
  RAISE NOTICE '  - v_web_board_post_detail (게시글 상세)';
  RAISE NOTICE '  - v_web_gallery_detail (갤러리 상세)';
  RAISE NOTICE '  - v_web_meal_plan_detail (식단표 상세)';
  RAISE NOTICE '  - v_web_program_detail (프로그램 상세)';
  RAISE NOTICE '';
  RAISE NOTICE '성능 최적화 인덱스 추가 완료';
  RAISE NOTICE '========================================';
END$$;
