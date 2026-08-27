-- Description : 99-final-setup.sql - 최종 설정 및 검증
-- Author : Shiwoo Min
-- Date : 2025-02-09
-- Purpose : 인덱스 추가, 통계 갱신, View 검증, 제약조건 추가
-- Note: 실행 순서: 00 → 20 → 30 → 31 → 40 → 99
--       40-seed.sql (기존 40-web-seed.sql 통합) 실행 후 마지막에 실행

-- ============================================
-- 1. 시퀀스 초기화 (Seed 데이터 충돌 방지)
-- ============================================

DO $$
DECLARE
    rec RECORD;
BEGIN
    RAISE NOTICE '========================================';
    RAISE NOTICE 'Step 1: Sequence Reset';
    RAISE NOTICE '========================================';

    FOR rec IN
        SELECT
            sequence_name,
            table_name,
            column_name
        FROM information_schema.sequences s
        JOIN information_schema.columns c
        ON c.column_default LIKE ('nextval(''%' || s.sequence_name || '%''::regclass)')
        WHERE s.sequence_schema = 'public'
    LOOP
        EXECUTE format(
            'SELECT setval(''%I'', GREATEST((SELECT COALESCE(MAX(%I), 0) FROM %I), 1000), false)',
            rec.sequence_name, rec.column_name, rec.table_name
        );
        RAISE NOTICE '  ✓ 시퀀스 초기화: % (테이블: %)', rec.sequence_name, rec.table_name;
    END LOOP;

    RAISE NOTICE '';
    RAISE NOTICE 'Sequence Reset Completed';
    RAISE NOTICE '';
END$$;

-- ============================================
-- 2. Web 알림마당 전용 인덱스 추가
-- ============================================

DO $$
BEGIN
    RAISE NOTICE '========================================';
    RAISE NOTICE 'Step 2: Creating Web-specific Indexes';
    RAISE NOTICE '========================================';

    -- 공지사항 인덱스
    CREATE INDEX IF NOT EXISTS idx_notices_web_list
        ON notices(is_active, is_pinned DESC, published_at DESC, created_at DESC)
        WHERE is_active = true;
    RAISE NOTICE '  ✓ 공지사항 목록 조회 인덱스';

    CREATE INDEX IF NOT EXISTS idx_notices_web_detail
        ON notices(id, is_active)
        WHERE is_active = true;
    RAISE NOTICE '  ✓ 공지사항 상세 조회 인덱스';

    CREATE INDEX IF NOT EXISTS idx_notice_files_notice
        ON notice_files(notice_id, created_at);
    RAISE NOTICE '  ✓ 공지사항 첨부파일 인덱스';

    -- 게시판 인덱스
    CREATE INDEX IF NOT EXISTS idx_board_posts_web_list
        ON board_posts(board_key, is_pinned DESC, created_at DESC);
    RAISE NOTICE '  ✓ 게시판 목록 조회 인덱스';

    CREATE INDEX IF NOT EXISTS idx_board_posts_web_detail
        ON board_posts(id, board_key);
    RAISE NOTICE '  ✓ 게시판 상세 조회 인덱스';

    CREATE INDEX IF NOT EXISTS idx_board_comments_post_tree
        ON board_comments(post_id, parent_id, created_at)
        WHERE is_deleted = false;
    RAISE NOTICE '  ✓ 게시판 댓글 트리 인덱스';

    CREATE INDEX IF NOT EXISTS idx_board_comments_parent
        ON board_comments(parent_id, created_at)
        WHERE parent_id IS NOT NULL AND is_deleted = false;
    RAISE NOTICE '  ✓ 게시판 대댓글 인덱스';

    CREATE INDEX IF NOT EXISTS idx_board_files_post
        ON board_files(post_id, created_at);
    RAISE NOTICE '  ✓ 게시판 첨부파일 인덱스';

    -- 갤러리 인덱스
    CREATE INDEX IF NOT EXISTS idx_gallery_items_web_list
        ON gallery_items(is_public, event_date DESC, created_at DESC)
        WHERE is_public = true;
    RAISE NOTICE '  ✓ 갤러리 목록 조회 인덱스';

    CREATE INDEX IF NOT EXISTS idx_gallery_items_web_detail
        ON gallery_items(id, is_public)
        WHERE is_public = true;
    RAISE NOTICE '  ✓ 갤러리 상세 조회 인덱스';

    CREATE INDEX IF NOT EXISTS idx_gallery_items_category
        ON gallery_items(category, is_public, event_date DESC)
        WHERE is_public = true;
    RAISE NOTICE '  ✓ 갤러리 카테고리별 인덱스';

    CREATE INDEX IF NOT EXISTS idx_gallery_files_gallery_sort
        ON gallery_files(gallery_id, sort_order, created_at);
    RAISE NOTICE '  ✓ 갤러리 파일 정렬 인덱스';

    -- 식단표 인덱스
    CREATE INDEX IF NOT EXISTS idx_meal_plans_web_list
        ON meal_plans(status, facility_code, week_start_date DESC)
        WHERE status = 'PUBLISHED';
    RAISE NOTICE '  ✓ 식단표 목록 조회 인덱스';

    CREATE INDEX IF NOT EXISTS idx_meal_plans_web_detail
        ON meal_plans(id, status)
        WHERE status = 'PUBLISHED';
    RAISE NOTICE '  ✓ 식단표 상세 조회 인덱스';

    CREATE INDEX IF NOT EXISTS idx_meal_plan_items_plan_date_type
        ON meal_plan_items(meal_plan_id, meal_date, meal_type);
    RAISE NOTICE '  ✓ 식단 항목 조회 인덱스';

    CREATE INDEX IF NOT EXISTS idx_meal_plan_items_date_range
        ON meal_plan_items(meal_date, meal_type);
    RAISE NOTICE '  ✓ 식단 날짜별 조회 인덱스';

    -- 프로그램 인덱스
    CREATE INDEX IF NOT EXISTS idx_programs_web_list
        ON programs(is_active, category, created_at DESC)
        WHERE is_active = true;
    RAISE NOTICE '  ✓ 프로그램 목록 조회 인덱스';

    CREATE INDEX IF NOT EXISTS idx_programs_web_detail
        ON programs(id, is_active)
        WHERE is_active = true;
    RAISE NOTICE '  ✓ 프로그램 상세 조회 인덱스';

    CREATE INDEX IF NOT EXISTS idx_program_schedules_upcoming
        ON program_schedules(program_id, starts_at, status)
        WHERE status NOT IN ('CANCELLED');
    RAISE NOTICE '  ✓ 프로그램 예정 일정 인덱스';

    CREATE INDEX IF NOT EXISTS idx_program_schedules_program_status
        ON program_schedules(program_id, status, starts_at DESC);
    RAISE NOTICE '  ✓ 프로그램 일정 상태별 인덱스';

    CREATE INDEX IF NOT EXISTS idx_program_attendance_schedule
        ON program_attendance(schedule_id, attended);
    RAISE NOTICE '  ✓ 프로그램 참석 인덱스';

    -- 파일 저장소 인덱스
    CREATE INDEX IF NOT EXISTS idx_file_storage_bucket_path
        ON file_storage(bucket, path);
    RAISE NOTICE '  ✓ 파일 저장소 경로 인덱스';

    CREATE INDEX IF NOT EXISTS idx_file_storage_created
        ON file_storage(created_at DESC);
    RAISE NOTICE '  ✓ 파일 생성일 인덱스';

    -- 직원 인덱스
    CREATE INDEX IF NOT EXISTS idx_employees_active
        ON employees(status, name)
        WHERE status = 'ACTIVE';
    RAISE NOTICE '  ✓ 직원 활성 상태 인덱스';

    -- 직원 권한 인덱스
    CREATE INDEX IF NOT EXISTS idx_employee_permissions_role
        ON employee_permissions(role_id);
    RAISE NOTICE '  ✓ 직원 권한 역할별 인덱스';

    RAISE NOTICE '';
    RAISE NOTICE 'Web-specific Indexes Created';
    RAISE NOTICE '';
END$$;

-- ============================================
-- 3. 통계 업데이트
-- ============================================

DO $$
BEGIN
    RAISE NOTICE '========================================';
    RAISE NOTICE 'Step 3: Updating Table Statistics';
    RAISE NOTICE '========================================';

    -- 기본 인프라
    ANALYZE facilities;
    ANALYZE site_infos;
    ANALYZE departments;
    ANALYZE employee_roles;
    ANALYZE employees;
    ANALYZE employee_permissions;
    ANALYZE employee_educations;
    -- 공간/방
    ANALYZE rooms;
    -- 입소자 기본
    ANALYZE residents;
    ANALYZE resident_rooms;
    ANALYZE resident_contacts;
    ANALYZE resident_contracts;
    ANALYZE resident_medications;
    ANALYZE resident_assessments;
    ANALYZE resident_extra_costs;
    ANALYZE resident_payments;
    ANALYZE resident_documents;
    ANALYZE resident_health_notes;
    ANALYZE resident_vitals;
    ANALYZE resident_admission_histories;
    -- 상담
    ANALYZE consultation_records;
    ANALYZE consultation_files;
    -- 케어플랜
    ANALYZE care_plans;
    ANALYZE care_plan_items;
    -- 케어 업무
    ANALYZE incidents;
    ANALYZE incident_files;
    ANALYZE care_tasks;
    ANALYZE daily_care_records;
    -- 인사/근무
    ANALYZE attendance_records;
    ANALYZE shift_templates;
    ANALYZE shift_assignments;
    ANALYZE leave_requests;
    ANALYZE leave_approvals;
    -- 급여
    ANALYZE payroll_settings;
    ANALYZE payroll_batches;
    ANALYZE payroll_records;
    ANALYZE payroll_items;
    -- 회계
    ANALYZE account_categories;
    ANALYZE accounts;
    ANALYZE suppliers;
    ANALYZE transactions;
    ANALYZE transaction_items;
    ANALYZE invoice_headers;
    ANALYZE invoice_items;
    -- 보험청구
    ANALYZE insurance_claims;
    ANALYZE insurance_claim_items;
    ANALYZE insurance_claim_history;
    -- 재고
    ANALYZE inventory_items;
    ANALYZE inventory_transactions;
    -- 차량
    ANALYZE vehicles;
    ANALYZE transport_requests;
    ANALYZE vehicle_run_logs;
    -- CCTV
    ANALYZE cctv_devices;
    ANALYZE cctv_view_logs;
    ANALYZE cctv_consents;
    ANALYZE cctv_weekly_checks;
    -- 시설 운영
    ANALYZE grievances;
    ANALYZE facility_inspections;
    -- 시스템
    ANALYZE sms_send_logs;
    ANALYZE audit_logs;
    ANALYZE system_settings;
    ANALYZE notification_queue;
    -- 알림 서비스
    ANALYZE notification_templates;
    ANALYZE notification_campaigns;
    ANALYZE notification_campaign_recipients;
    ANALYZE recipient_groups;
    ANALYZE recipient_group_members;
    ANALYZE sms_credits;
    -- 자료실
    ANALYZE facility_files;
    -- 투약
    ANALYZE medications;
    ANALYZE medication_schedules;
    ANALYZE medication_records;
    -- 욕구사정
    ANALYZE needs_assessments;
    -- 간담회
    ANALYZE meeting_records;
    ANALYZE meeting_minutes;
    -- 목욕
    ANALYZE bath_schedules;
    -- 근무 스케줄 생성 규칙
    ANALYZE schedule_generation_rules;
    -- Web 알림마당
    ANALYZE notices;
    ANALYZE notice_files;
    ANALYZE board_posts;
    ANALYZE board_comments;
    ANALYZE board_files;
    ANALYZE gallery_items;
    ANALYZE gallery_files;
    ANALYZE meal_plans;
    ANALYZE meal_plan_items;
    ANALYZE programs;
    ANALYZE program_schedules;
    ANALYZE program_attendance;
    ANALYZE file_storage;
    ANALYZE visit_reservations;
    ANALYZE web_inquiries;
    ANALYZE popup_banners;

    RAISE NOTICE '  ✓ All 93 tables analyzed';
    RAISE NOTICE '';
    RAISE NOTICE 'Statistics Updated';
    RAISE NOTICE '';
END$$;

-- ============================================
-- 4. View 검증
-- ============================================

DO $$
DECLARE
    view_record RECORD;
    view_count INT := 0;
    error_count INT := 0;
BEGIN
    RAISE NOTICE '========================================';
    RAISE NOTICE 'Step 4: Verifying Views';
    RAISE NOTICE '========================================';

    -- Web/Admin View 목록 검증
    FOR view_record IN
        SELECT table_name
        FROM information_schema.views
        WHERE table_schema = 'public'
          AND (table_name LIKE 'v_web_%' OR table_name LIKE 'v_admin_%')
        ORDER BY table_name
    LOOP
        BEGIN
            EXECUTE format('SELECT * FROM %I LIMIT 1', view_record.table_name);
            view_count := view_count + 1;
            RAISE NOTICE '  ✓ % (OK)', view_record.table_name;
        EXCEPTION WHEN OTHERS THEN
            error_count := error_count + 1;
            RAISE NOTICE '  ✗ % (ERROR: %)', view_record.table_name, SQLERRM;
        END;
    END LOOP;

    RAISE NOTICE '';
    RAISE NOTICE 'View Verification Complete: % OK, % Errors', view_count, error_count;
    RAISE NOTICE '';
END$$;

-- ============================================
-- 5. 제약조건 추가 (데이터 무결성)
-- ============================================

DO $$
BEGIN
    RAISE NOTICE '========================================';
    RAISE NOTICE 'Step 5: Adding Data Constraints';
    RAISE NOTICE '========================================';

    -- 공지사항 카테고리 체크
    BEGIN
        ALTER TABLE notices DROP CONSTRAINT IF EXISTS chk_notices_category;
        ALTER TABLE notices ADD CONSTRAINT chk_notices_category
        CHECK (category IS NULL OR category IN ('GENERAL', 'URGENT', 'EVENT', 'EDUCATION', 'MAINTENANCE'));
        RAISE NOTICE '  ✓ 공지사항 카테고리 제약조건';
    EXCEPTION WHEN OTHERS THEN RAISE NOTICE '  ✗ 공지사항 카테고리 제약조건 실패: %', SQLERRM; END;

    -- 게시판 키 체크
    BEGIN
        ALTER TABLE board_posts DROP CONSTRAINT IF EXISTS chk_board_posts_key;
        ALTER TABLE board_posts ADD CONSTRAINT chk_board_posts_key
        CHECK (board_key IN ('FREE', 'QNA', 'SUGGESTION', 'NOTICE'));
        RAISE NOTICE '  ✓ 게시판 키 제약조건';
    EXCEPTION WHEN OTHERS THEN RAISE NOTICE '  ✗ 게시판 키 제약조건 실패: %', SQLERRM; END;

    -- 갤러리 카테고리 체크
    BEGIN
        ALTER TABLE gallery_items DROP CONSTRAINT IF EXISTS chk_gallery_category;
        ALTER TABLE gallery_items ADD CONSTRAINT chk_gallery_category
        CHECK (category IS NULL OR category IN ('GENERAL', 'EVENT', 'DAILY'));
        RAISE NOTICE '  ✓ 갤러리 카테고리 제약조건';
    EXCEPTION WHEN OTHERS THEN RAISE NOTICE '  ✗ 갤러리 카테고리 제약조건 실패: %', SQLERRM; END;

    -- 식단표 상태 체크
    BEGIN
        ALTER TABLE meal_plans DROP CONSTRAINT IF EXISTS chk_meal_plans_status;
        ALTER TABLE meal_plans ADD CONSTRAINT chk_meal_plans_status
        CHECK (status IN ('DRAFT', 'PUBLISHED', 'ARCHIVED'));
        RAISE NOTICE '  ✓ 식단표 상태 제약조건';
    EXCEPTION WHEN OTHERS THEN RAISE NOTICE '  ✗ 식단표 상태 제약조건 실패: %', SQLERRM; END;

    -- 식단 유형 체크
    BEGIN
        ALTER TABLE meal_plan_items DROP CONSTRAINT IF EXISTS chk_meal_type;
        ALTER TABLE meal_plan_items ADD CONSTRAINT chk_meal_type
        CHECK (meal_type IN ('BREAKFAST', 'LUNCH', 'DINNER', 'SNACK'));
        RAISE NOTICE '  ✓ 식단 유형 제약조건';
    EXCEPTION WHEN OTHERS THEN RAISE NOTICE '  ✗ 식단 유형 제약조건 실패: %', SQLERRM; END;

    -- 프로그램 카테고리 체크
    BEGIN
        ALTER TABLE programs DROP CONSTRAINT IF EXISTS chk_program_category;
        ALTER TABLE programs ADD CONSTRAINT chk_program_category
        CHECK (category IS NULL OR category IN ('EXERCISE', 'MUSIC', 'COGNITIVE', 'ART', 'CRAFT', 'SPORTS', 'RECREATION', 'OTHER'));
        RAISE NOTICE '  ✓ 프로그램 카테고리 제약조건';
    EXCEPTION WHEN OTHERS THEN RAISE NOTICE '  ✗ 프로그램 카테고리 제약조건 실패: %', SQLERRM; END;

    -- 프로그램 일정 상태 체크
    BEGIN
        ALTER TABLE program_schedules DROP CONSTRAINT IF EXISTS chk_program_schedules_status;
        ALTER TABLE program_schedules ADD CONSTRAINT chk_program_schedules_status
        CHECK (status IN ('PLANNED', 'CONFIRMED', 'ONGOING', 'DONE', 'CANCELLED'));
        RAISE NOTICE '  ✓ 프로그램 일정 상태 제약조건';
    EXCEPTION WHEN OTHERS THEN RAISE NOTICE '  ✗ 프로그램 일정 상태 제약조건 실패: %', SQLERRM; END;

    RAISE NOTICE '';
    RAISE NOTICE 'Constraints Updated';
    RAISE NOTICE '';
END$$;

-- ============================================
-- 6. 샘플 데이터 통계
-- ============================================

DO $$
DECLARE
    notice_count INT;
    board_count INT;
    comment_count INT;
    gallery_count INT;
    meal_count INT;
    program_count INT;
    schedule_count INT;
    file_count INT;
    facility_count INT;
    site_info_count INT;
    dept_count INT;
    role_count INT;
BEGIN
    RAISE NOTICE '========================================';
    RAISE NOTICE 'Step 6: Data Statistics';
    RAISE NOTICE '========================================';

    SELECT COUNT(*) INTO notice_count FROM notices WHERE is_active = true;
    SELECT COUNT(*) INTO board_count FROM board_posts;
    SELECT COUNT(*) INTO comment_count FROM board_comments WHERE is_deleted = false;
    SELECT COUNT(*) INTO gallery_count FROM gallery_items WHERE is_public = true;
    SELECT COUNT(*) INTO meal_count FROM meal_plans WHERE status = 'PUBLISHED';
    SELECT COUNT(*) INTO program_count FROM programs WHERE is_active = true;
    SELECT COUNT(*) INTO schedule_count FROM program_schedules;
    SELECT COUNT(*) INTO file_count FROM file_storage;
    SELECT COUNT(*) INTO facility_count FROM facilities;
    SELECT COUNT(*) INTO site_info_count FROM site_infos;
    SELECT COUNT(*) INTO dept_count FROM departments;
    SELECT COUNT(*) INTO role_count FROM employee_roles;

    RAISE NOTICE '공지사항: % 건', notice_count;
    RAISE NOTICE '게시글: % 건', board_count;
    RAISE NOTICE '댓글: % 건', comment_count;
    RAISE NOTICE '갤러리: % 건', gallery_count;
    RAISE NOTICE '식단표: % 주', meal_count;
    RAISE NOTICE '프로그램: % 종', program_count;
    RAISE NOTICE '프로그램 일정: % 건', schedule_count;
    RAISE NOTICE '파일: % 건', file_count;
    RAISE NOTICE '시설 정보: % 건', facility_count;
    RAISE NOTICE '사이트 설정: % 건', site_info_count;
    RAISE NOTICE '부서: % 건', dept_count;
    RAISE NOTICE '직원 역할: % 건', role_count;

    RAISE NOTICE '';
END$$;

-- ============================================
-- 7. 최종 검증 및 보고서
-- ============================================

DO $$
DECLARE
    db_name TEXT;
    table_count INT;
    view_count INT;
    index_count INT;
    sequence_count INT;
    constraint_count INT;
    web_admin_view_count INT;
BEGIN
    RAISE NOTICE '========================================';
    RAISE NOTICE 'Step 7: Final System Verification';
    RAISE NOTICE '========================================';

    SELECT current_database() INTO db_name;

    SELECT COUNT(*) INTO table_count FROM information_schema.tables WHERE table_schema = 'public' AND table_type = 'BASE TABLE';
    SELECT COUNT(*) INTO view_count FROM information_schema.views WHERE table_schema = 'public';
    SELECT COUNT(*) INTO web_admin_view_count FROM information_schema.views WHERE table_schema = 'public' AND (table_name LIKE 'v_web_%' OR table_name LIKE 'v_admin_%');
    SELECT COUNT(*) INTO index_count FROM pg_indexes WHERE schemaname = 'public';
    SELECT COUNT(*) INTO sequence_count FROM information_schema.sequences WHERE sequence_schema = 'public';
    SELECT COUNT(*) INTO constraint_count FROM information_schema.table_constraints WHERE constraint_schema = 'public' AND constraint_type = 'CHECK';

    RAISE NOTICE '';
    RAISE NOTICE '=================================================';
    RAISE NOTICE '    Agape-Care Initialization Complete!';
    RAISE NOTICE '=================================================';
    RAISE NOTICE '데이터베이스: %', db_name;
    RAISE NOTICE '테이블: % 개', table_count;
    RAISE NOTICE 'View (전체): % 개', view_count;
    RAISE NOTICE 'View (Web/Admin): % 개', web_admin_view_count;
    RAISE NOTICE '인덱스: % 개', index_count;
    RAISE NOTICE '시퀀스: % 개', sequence_count;
    RAISE NOTICE '제약조건: % 개', constraint_count;
    RAISE NOTICE '';
    RAISE NOTICE '=================================================';
    RAISE NOTICE '    Available Admin Views (32개)';
    RAISE NOTICE '=================================================';
    RAISE NOTICE '  [시설/알림/직원]';
    RAISE NOTICE '  • v_admin_facilities                - 시설 정보';
    RAISE NOTICE '  • v_admin_site_settings             - 사이트 설정';
    RAISE NOTICE '  • v_admin_employees                 - 직원 목록';
    RAISE NOTICE '  • v_admin_employee_permissions      - 직원 권한 상세';
    RAISE NOTICE '  • v_admin_notification_templates    - 알림 템플릿';
    RAISE NOTICE '  • v_admin_notification_campaigns    - 알림 캠페인';
    RAISE NOTICE '  • v_admin_recipient_groups          - 수신자 그룹';
    RAISE NOTICE '  • v_admin_facility_files            - 자료실 파일';
    RAISE NOTICE '  [입소자 관리]';
    RAISE NOTICE '  • v_admin_residents                 - 입소자 목록 (방+보호자)';
    RAISE NOTICE '  • v_admin_resident_assessments      - 기초평가 이력';
    RAISE NOTICE '  • v_admin_consultation_records      - 상담일지';
    RAISE NOTICE '  • v_admin_resident_extra_costs      - 비급여/기타 내역';
    RAISE NOTICE '  [급여]';
    RAISE NOTICE '  • v_admin_payroll_records           - 급여 대장';
    RAISE NOTICE '  • v_admin_payroll_batches           - 급여 배치';
    RAISE NOTICE '  • v_admin_payroll_settings          - 급여 설정';
    RAISE NOTICE '  [인사/근무]';
    RAISE NOTICE '  • v_admin_attendance_records        - 근태 기록';
    RAISE NOTICE '  • v_admin_leave_requests            - 휴가 신청';
    RAISE NOTICE '  • v_admin_shift_assignments         - 근무 배정';
    RAISE NOTICE '  [투약]';
    RAISE NOTICE '  • v_admin_medication_schedules      - 투약 스케줄';
    RAISE NOTICE '  • v_admin_medication_records        - 투약 기록';
    RAISE NOTICE '  [차량]';
    RAISE NOTICE '  • v_admin_vehicles                  - 차량 목록';
    RAISE NOTICE '  • v_admin_vehicle_run_logs          - 차량 운행 일지';
    RAISE NOTICE '  [CCTV]';
    RAISE NOTICE '  • v_admin_cctv_devices              - CCTV 장치';
    RAISE NOTICE '  • v_admin_cctv_consents             - CCTV 동의 현황';
    RAISE NOTICE '  [시설점검/간담회/욕구사정]';
    RAISE NOTICE '  • v_admin_facility_inspections      - 시설 점검 이력';
    RAISE NOTICE '  • v_admin_meeting_records           - 간담회 기록';
    RAISE NOTICE '  • v_admin_needs_assessments         - 욕구사정';
    RAISE NOTICE '  [회계/보험청구/민원/목욕/재고]';
    RAISE NOTICE '  • v_admin_insurance_claims          - 보험청구';
    RAISE NOTICE '  • v_admin_transactions              - 회계 거래내역';
    RAISE NOTICE '  • v_admin_grievances                - 민원 처리';
    RAISE NOTICE '  • v_admin_bath_schedules            - 목욕 스케줄';
    RAISE NOTICE '  • v_admin_inventory_items           - 재고 현황';
    RAISE NOTICE '';
    RAISE NOTICE '=================================================';
    RAISE NOTICE '    DB 구성 요약 (schema.prisma 기준 93개 테이블)';
    RAISE NOTICE '=================================================';
    RAISE NOTICE '  [기본 인프라]          facilities, site_infos, departments';
    RAISE NOTICE '                         employee_roles, employees, employee_permissions';
    RAISE NOTICE '                         employee_educations, rooms';
    RAISE NOTICE '  [입소자]               residents, resident_rooms, resident_contacts';
    RAISE NOTICE '                         resident_contracts, resident_medications';
    RAISE NOTICE '                         resident_assessments, resident_extra_costs';
    RAISE NOTICE '                         resident_payments, resident_documents';
    RAISE NOTICE '                         resident_health_notes, resident_vitals';
    RAISE NOTICE '                         resident_admission_histories';
    RAISE NOTICE '  [상담/케어플랜]        consultation_records, consultation_files';
    RAISE NOTICE '                         care_plans, care_plan_items';
    RAISE NOTICE '  [케어 업무]            incidents, incident_files';
    RAISE NOTICE '                         care_tasks, daily_care_records';
    RAISE NOTICE '  [인사/근무]            attendance_records, shift_templates';
    RAISE NOTICE '                         shift_assignments, leave_requests, leave_approvals';
    RAISE NOTICE '  [급여]                 payroll_settings, payroll_batches';
    RAISE NOTICE '                         payroll_records, payroll_items';
    RAISE NOTICE '  [회계]                 account_categories, accounts, suppliers';
    RAISE NOTICE '                         transactions, transaction_items';
    RAISE NOTICE '                         invoice_headers, invoice_items';
    RAISE NOTICE '  [보험청구]             insurance_claims, insurance_claim_items';
    RAISE NOTICE '                         insurance_claim_history';
    RAISE NOTICE '  [재고]                 inventory_items, inventory_transactions';
    RAISE NOTICE '  [차량]                 vehicles, transport_requests, vehicle_run_logs';
    RAISE NOTICE '  [CCTV]                 cctv_devices, cctv_view_logs';
    RAISE NOTICE '                         cctv_consents, cctv_weekly_checks';
    RAISE NOTICE '  [시설운영]             grievances, facility_inspections';
    RAISE NOTICE '  [투약]                 medications, medication_schedules, medication_records';
    RAISE NOTICE '  [욕구사정/간담회/목욕] needs_assessments, meeting_records, meeting_minutes';
    RAISE NOTICE '                         bath_schedules, schedule_generation_rules';
    RAISE NOTICE '  [시스템]               sms_send_logs, audit_logs';
    RAISE NOTICE '                         system_settings, notification_queue';
    RAISE NOTICE '  [알림 서비스]          notification_templates, notification_campaigns';
    RAISE NOTICE '                         notification_campaign_recipients';
    RAISE NOTICE '                         recipient_groups, recipient_group_members';
    RAISE NOTICE '                         sms_credits, facility_files';
    RAISE NOTICE '  [Web 알림마당]         notices, notice_files, board_posts, board_comments';
    RAISE NOTICE '                         board_files, gallery_items, gallery_files';
    RAISE NOTICE '                         meal_plans, meal_plan_items, programs';
    RAISE NOTICE '                         program_schedules, program_attendance';
    RAISE NOTICE '                         file_storage, visit_reservations';
    RAISE NOTICE '                         web_inquiries, popup_banners';
    RAISE NOTICE '=================================================';
END$$;
