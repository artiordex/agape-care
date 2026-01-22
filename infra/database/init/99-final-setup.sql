-- Description : 99-final-setup.sql - 📌 Agape-Care 요양원 ERP Final Initialization Script
-- Author : Shiwoo Min
-- Date : 2026-01-23
-- Version : 2.0 (Agape-Care ERP Edition)
-- Note: 모든 테이블 생성 및 시드 후 반드시 마지막에 실행

------------------------------------------------------------
-- 시퀀스 초기화 (Seed 데이터 충돌 방지)
------------------------------------------------------------
DO $$
DECLARE
    rec RECORD;
BEGIN
    RAISE NOTICE '📌 Start: Sequence Reset';

    FOR rec IN
        SELECT sequence_name, table_name, column_name
        FROM information_schema.sequences s
        JOIN information_schema.columns c
        ON c.column_default LIKE ('nextval(''%'' || s.sequence_name || ''%''::regclass)')
    LOOP
        EXECUTE format(
            'SELECT setval(''%I'', GREATEST((SELECT COALESCE(MAX(%I), 0) FROM %I), 1000), false)',
            rec.sequence_name, rec.column_name, rec.table_name
        );
        RAISE NOTICE '  - 시퀀스 초기화 완료: %', rec.sequence_name;
    END LOOP;

    RAISE NOTICE '📌 Sequence Reset Completed';
END$$;

------------------------------------------------------------
-- 통계 업데이트 (ANALYZE)
------------------------------------------------------------
DO $$
BEGIN
    RAISE NOTICE '📌 Updating table statistics...';

    PERFORM (
        SELECT string_agg(format('ANALYZE %I;', table_name), E'\n')
        FROM information_schema.tables
        WHERE table_schema = 'public'
    )::text;

    RAISE NOTICE '📌 Statistics Updated';
END$$;

------------------------------------------------------------
-- 주요 인덱스 생성 (성능 최적화)
------------------------------------------------------------
DO $$
BEGIN
    RAISE NOTICE '📌 Creating optimized indexes...';

    -- Residents
    CREATE INDEX IF NOT EXISTS idx_residents_room_id ON residents(room_id);
    CREATE INDEX IF NOT EXISTS idx_residents_admission_date ON residents(admission_date);

    -- Staff
    CREATE INDEX IF NOT EXISTS idx_staff_role ON staff(role);
    CREATE INDEX IF NOT EXISTS idx_staff_status ON staff(status);

    -- Attendance
    CREATE INDEX IF NOT EXISTS idx_attendance_staff ON attendance(staff_id);
    CREATE INDEX IF NOT EXISTS idx_attendance_work_date ON attendance(work_date);

    -- Meal Plans
    CREATE INDEX IF NOT EXISTS idx_meal_plans_date ON meal_plans(meal_date);
    CREATE INDEX IF NOT EXISTS idx_meal_plans_type ON meal_plans(meal_type);

    -- Programs
    CREATE INDEX IF NOT EXISTS idx_programs_category ON programs(category);
    CREATE INDEX IF NOT EXISTS idx_sessions_date ON program_sessions(session_date);

    -- Rooms
    CREATE INDEX IF NOT EXISTS idx_rooms_floor ON rooms(floor);
    CREATE INDEX IF NOT EXISTS idx_rooms_status ON rooms(status);

    -- Gallery
    CREATE INDEX IF NOT EXISTS idx_gallery_author ON gallery(author_id);
    CREATE INDEX IF NOT EXISTS idx_gallery_images_gallery ON gallery_images(gallery_id);

    -- Accounting
    CREATE INDEX IF NOT EXISTS idx_accounting_expenses_date ON accounting_expenses(expense_date);
    CREATE INDEX IF NOT EXISTS idx_accounting_income_date ON accounting_income(income_date);

    -- Consultations
    CREATE INDEX IF NOT EXISTS idx_consult_resident ON consultations(resident_id);
    CREATE INDEX IF NOT EXISTS idx_consult_staff ON consultations(staff_id);

    -- Notifications
    CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id);
    CREATE INDEX IF NOT EXISTS idx_notifications_unread ON notifications(user_id) WHERE is_read = false;

    RAISE NOTICE '📌 Index creation finished';
END$$;

------------------------------------------------------------
-- 데이터 유효성 제약조건(추가 검증)
------------------------------------------------------------
DO $$
BEGIN
    RAISE NOTICE '📌 Adding constraints...';

    -- Residents: 성별 체크
    BEGIN
        ALTER TABLE residents ADD CONSTRAINT chk_residents_gender
        CHECK (gender IN ('M','F'));
    EXCEPTION WHEN duplicate_object THEN
        RAISE NOTICE '  - chk_residents_gender already exists';
    END;

    -- Staff: 상태 체크
    BEGIN
        ALTER TABLE staff ADD CONSTRAINT chk_staff_status
        CHECK (status IN ('ACTIVE','INACTIVE','LEAVE'));
    EXCEPTION WHEN duplicate_object THEN
        RAISE NOTICE '  - chk_staff_status already exists';
    END;

    -- MealPlans: 식단 3회 체크
    BEGIN
        ALTER TABLE meal_plans ADD CONSTRAINT chk_meal_type
        CHECK (meal_type IN ('BREAKFAST','LUNCH','DINNER'));
    EXCEPTION WHEN duplicate_object THEN
        RAISE NOTICE '  - chk_meal_type already exists';
    END;

    -- Programs
    BEGIN
        ALTER TABLE programs ADD CONSTRAINT chk_program_category
        CHECK (category IS NULL OR category IN ('COGNITIVE','MUSIC','CRAFT','SPORTS'));
    EXCEPTION WHEN duplicate_object THEN
        RAISE NOTICE '  - chk_program_category already exists';
    END;

    RAISE NOTICE '📌 Constraints updated';
END$$;

------------------------------------------------------------
-- app_user 계정 생성 및 권한 부여
------------------------------------------------------------
DO $$
DECLARE
    db_name TEXT;
    app_pass TEXT;
BEGIN
    RAISE NOTICE '📌 Creating app_user...';

    SELECT current_database() INTO db_name;

    IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname='app_user') THEN
        app_pass := encode(gen_random_bytes(16), 'hex');

        EXECUTE format('CREATE ROLE app_user LOGIN PASSWORD %L', app_pass);
        EXECUTE format('GRANT CONNECT ON DATABASE %I TO app_user', db_name);

        GRANT USAGE ON SCHEMA public TO app_user;
        GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO app_user;
        GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO app_user;

        ALTER DEFAULT PRIVILEGES GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO app_user;
        ALTER DEFAULT PRIVILEGES GRANT USAGE, SELECT ON SEQUENCES TO app_user;

        RAISE NOTICE '📌 app_user created. Password: %', app_pass;
    ELSE
        RAISE NOTICE '📌 app_user already exists';
    END IF;
END$$;

------------------------------------------------------------
-- VIEW 생성 (대시보드 최적화)
------------------------------------------------------------
DO $$
BEGIN
    RAISE NOTICE '📌 Creating views...';

    -- 입소자 + 방 정보 뷰
    CREATE OR REPLACE VIEW v_resident_rooms AS
    SELECT r.id, r.name, r.gender, r.birth_date, r.admission_date,
           rm.name AS room_name, rm.room_type
    FROM residents r
    LEFT JOIN rooms rm ON r.room_id = rm.id;

    -- 오늘 식단표 뷰
    CREATE OR REPLACE VIEW v_today_meals AS
    SELECT meal_date, meal_type, menu, calories
    FROM meal_plans
    WHERE meal_date = CURRENT_DATE;

    -- 프로그램 스케줄 뷰
    CREATE OR REPLACE VIEW v_program_schedule AS
    SELECT ps.id, ps.session_date, ps.starts_at, ps.ends_at,
           p.title, p.category, ps.instructor
    FROM program_sessions ps
    JOIN programs p ON ps.program_id = p.id;

    -- 직원 근태 요약
    CREATE OR REPLACE VIEW v_staff_attendance AS
    SELECT s.id AS staff_id, s.name, s.role,
           a.work_date, a.check_in, a.check_out, a.status
    FROM attendance a
    JOIN staff s ON a.staff_id = s.id;

    RAISE NOTICE '📌 Views created';
END$$;

------------------------------------------------------------
-- 최종 검증 및 상태 출력
------------------------------------------------------------
DO $$
DECLARE
    t_count INT;
    i_count INT;
    v_count INT;
BEGIN
    RAISE NOTICE '📌 Final Verification...';

    SELECT COUNT(*) INTO t_count
    FROM information_schema.tables WHERE table_schema='public';

    SELECT COUNT(*) INTO i_count
    FROM pg_indexes WHERE schemaname='public';

    SELECT COUNT(*) INTO v_count
    FROM information_schema.views WHERE table_schema='public';

    RAISE NOTICE '=================================================';
    RAISE NOTICE 'Agape-Care ERP Database Initialization Complete!';
    RAISE NOTICE 'Database: %', current_database();
    RAISE NOTICE 'Tables: %', t_count;
    RAISE NOTICE 'Indexes: %', i_count;
    RAISE NOTICE 'Views: %', v_count;
    RAISE NOTICE 'app_user: ready';
    RAISE NOTICE 'Sequences: adjusted';
    RAISE NOTICE 'Stats: updated';
    RAISE NOTICE '=================================================';
END$$;
