-- Description : 99-final-setup.sql - 📌 Agape-Care 요양원 ERP Final Initialization Script
-- Author : Shiwoo Min
-- Date : 2026-01-24
-- Version : 3.0 (61 Tables Edition)
-- Note: 모든 테이블 생성 및 시드 후 반드시 마지막에 실행

-- 시퀀스 초기화 (Seed 데이터 충돌 방지)

DO $$
DECLARE
    rec RECORD;
BEGIN
    RAISE NOTICE '📌 Start: Sequence Reset';

    FOR rec IN
        SELECT sequence_name, table_name, column_name
        FROM information_schema.sequences s
        JOIN information_schema.columns c
        ON c.column_default LIKE ('nextval(''%' || s.sequence_name || '%''::regclass)')
    LOOP
        EXECUTE format(
            'SELECT setval(''%I'', GREATEST((SELECT COALESCE(MAX(%I), 0) FROM %I), 1000), false)',
            rec.sequence_name, rec.column_name, rec.table_name
        );
        RAISE NOTICE '  - 시퀀스 초기화 완료: %', rec.sequence_name;
    END LOOP;

    RAISE NOTICE '📌 Sequence Reset Completed';
END$$;

-- 통계 업데이트 (ANALYZE)

DO $$
BEGIN
    RAISE NOTICE '📌 Updating table statistics...';

    ANALYZE;

    RAISE NOTICE '📌 Statistics Updated';
END$$;

-- 주요 인덱스 생성 (성능 최적화)

DO $$
BEGIN
    RAISE NOTICE '📌 Creating optimized indexes...';

    -- Residents (입소자)
    CREATE INDEX IF NOT EXISTS idx_residents_status ON residents(status);
    CREATE INDEX IF NOT EXISTS idx_residents_admission ON residents(admission_date DESC);
    CREATE INDEX IF NOT EXISTS idx_residents_name ON residents(name);

    -- Employees (직원)
    CREATE INDEX IF NOT EXISTS idx_employees_department ON employees(department_id);
    CREATE INDEX IF NOT EXISTS idx_employees_role ON employees(role_id);
    CREATE INDEX IF NOT EXISTS idx_employees_status ON employees(status);
    CREATE INDEX IF NOT EXISTS idx_employees_email ON employees(email);

    -- Attendance (출결)
    CREATE INDEX IF NOT EXISTS idx_attendance_work_date ON attendance_records(work_date DESC);
    CREATE INDEX IF NOT EXISTS idx_attendance_status ON attendance_records(status);

    -- Shift Assignments (근무표)
    CREATE INDEX IF NOT EXISTS idx_shift_assignments_date ON shift_assignments(work_date DESC);
    CREATE INDEX IF NOT EXISTS idx_shift_assignments_employee_date ON shift_assignments(employee_id, work_date);

    -- Programs (프로그램)
    CREATE INDEX IF NOT EXISTS idx_programs_category ON programs(category);
    CREATE INDEX IF NOT EXISTS idx_programs_active ON programs(is_active);

    -- Meal Plans (식단)
    CREATE INDEX IF NOT EXISTS idx_meal_plan_items_date ON meal_plan_items(meal_date DESC);

    -- Notices (공지사항)
    CREATE INDEX IF NOT EXISTS idx_notices_active ON notices(is_active, published_at DESC);
    CREATE INDEX IF NOT EXISTS idx_notices_pinned ON notices(is_pinned DESC, created_at DESC);

    -- Board Posts (게시판)
    CREATE INDEX IF NOT EXISTS idx_board_posts_author ON board_posts(author_id);
    CREATE INDEX IF NOT EXISTS idx_board_posts_pinned ON board_posts(is_pinned DESC, created_at DESC);

    -- Gallery (갤러리)
    CREATE INDEX IF NOT EXISTS idx_gallery_items_date ON gallery_items(event_date DESC);
    CREATE INDEX IF NOT EXISTS idx_gallery_items_public ON gallery_items(is_public);

    -- Transactions (회계 전표)
    CREATE INDEX IF NOT EXISTS idx_transactions_supplier ON transactions(supplier_id);
    CREATE INDEX IF NOT EXISTS idx_transaction_items_account ON transaction_items(account_id);

    -- Payroll (급여)
    CREATE INDEX IF NOT EXISTS idx_payroll_records_period ON payroll_records(period_start, period_end);
    CREATE INDEX IF NOT EXISTS idx_payroll_records_status ON payroll_records(status);

    -- Insurance Claims (보험 청구)
    CREATE INDEX IF NOT EXISTS idx_insurance_claims_claim_no ON insurance_claims(claim_no);
    CREATE INDEX IF NOT EXISTS idx_insurance_claims_resident ON insurance_claims(resident_id);

    -- Inventory (재고)
    CREATE INDEX IF NOT EXISTS idx_inventory_items_category ON inventory_items(category);
    CREATE INDEX IF NOT EXISTS idx_inventory_items_active ON inventory_items(is_active);
    CREATE INDEX IF NOT EXISTS idx_inventory_transactions_date ON inventory_transactions(txn_date DESC);

    -- Vehicles (차량)
    CREATE INDEX IF NOT EXISTS idx_vehicles_status ON vehicles(status);
    CREATE INDEX IF NOT EXISTS idx_vehicles_no ON vehicles(vehicle_no);

    -- Transport Requests (운송 요청)
    CREATE INDEX IF NOT EXISTS idx_transport_requests_resident ON transport_requests(resident_id);
    CREATE INDEX IF NOT EXISTS idx_transport_requests_date ON transport_requests(request_date DESC);

    -- CCTV (CCTV)
    CREATE INDEX IF NOT EXISTS idx_cctv_devices_status ON cctv_devices(status);
    CREATE INDEX IF NOT EXISTS idx_cctv_view_logs_viewer ON cctv_view_logs(viewer_id, view_start DESC);

    -- Grievances (민원)
    CREATE INDEX IF NOT EXISTS idx_grievances_status ON grievances(status, received_at DESC);
    CREATE INDEX IF NOT EXISTS idx_grievances_resident ON grievances(resident_id);

    -- Facility Inspections (시설 점검)
    CREATE INDEX IF NOT EXISTS idx_facility_inspections_type ON facility_inspections(inspection_type);
    CREATE INDEX IF NOT EXISTS idx_facility_inspections_status ON facility_inspections(status);

    -- SMS Logs (SMS 발송)
    CREATE INDEX IF NOT EXISTS idx_sms_send_logs_recipient ON sms_send_logs(recipient_phone);

    -- Popup Banners (팝업/배너)
    CREATE INDEX IF NOT EXISTS idx_popup_banners_priority ON popup_banners(priority DESC);

    -- Website Settings (웹사이트 설정)
    CREATE INDEX IF NOT EXISTS idx_website_settings_category_key ON website_settings(category, key);

    -- Audit Logs (감사 로그)
    CREATE INDEX IF NOT EXISTS idx_audit_logs_actor ON audit_logs(actor_id, created_at DESC);
    CREATE INDEX IF NOT EXISTS idx_audit_logs_created ON audit_logs(created_at DESC);

    -- File Storage (파일)
    CREATE INDEX IF NOT EXISTS idx_file_storage_created_by ON file_storage(created_by);
    CREATE INDEX IF NOT EXISTS idx_file_storage_created_at ON file_storage(created_at DESC);

    RAISE NOTICE '📌 Index creation finished';
END$$;

-- 데이터 유효성 제약조건 (추가 검증)

DO $$
BEGIN
    RAISE NOTICE '📌 Adding constraints...';

    -- Residents: 성별 체크
    BEGIN
        ALTER TABLE residents DROP CONSTRAINT IF EXISTS chk_residents_gender;
        ALTER TABLE residents ADD CONSTRAINT chk_residents_gender
        CHECK (gender IS NULL OR gender IN ('M','F','OTHER'));
    EXCEPTION WHEN others THEN
        RAISE NOTICE '  - chk_residents_gender skip: %', SQLERRM;
    END;

    -- Employees: 상태 체크 (이미 employees_status_ck 존재)

    -- Meal Plans: 식단 타입 체크 (이미 meal_plan_items_type_ck 존재)

    -- Programs: 카테고리 체크
    BEGIN
        ALTER TABLE programs DROP CONSTRAINT IF EXISTS chk_program_category;
        ALTER TABLE programs ADD CONSTRAINT chk_program_category
        CHECK (category IS NULL OR category IN ('EXERCISE','MUSIC','COGNITIVE','CRAFT','SPORTS','RECREATION','OTHER'));
    EXCEPTION WHEN others THEN
        RAISE NOTICE '  - chk_program_category skip: %', SQLERRM;
    END;

    -- Vehicles: 상태 체크
    BEGIN
        ALTER TABLE vehicles DROP CONSTRAINT IF EXISTS chk_vehicles_status;
        ALTER TABLE vehicles ADD CONSTRAINT chk_vehicles_status
        CHECK (status IN ('ACTIVE','MAINTENANCE','RETIRED'));
    EXCEPTION WHEN others THEN
        RAISE NOTICE '  - chk_vehicles_status skip: %', SQLERRM;
    END;

    -- Inventory Items: 카테고리 체크
    BEGIN
        ALTER TABLE inventory_items DROP CONSTRAINT IF EXISTS chk_inventory_category;
        ALTER TABLE inventory_items ADD CONSTRAINT chk_inventory_category
        CHECK (category IN ('MEDICAL','FOOD','SUPPLY','EQUIPMENT','OTHER'));
    EXCEPTION WHEN others THEN
        RAISE NOTICE '  - chk_inventory_category skip: %', SQLERRM;
    END;

    -- Insurance Claims: 상태 체크
    BEGIN
        ALTER TABLE insurance_claims DROP CONSTRAINT IF EXISTS chk_insurance_claims_status;
        ALTER TABLE insurance_claims ADD CONSTRAINT chk_insurance_claims_status
        CHECK (status IN ('DRAFT','SUBMITTED','APPROVED','REJECTED','PAID'));
    EXCEPTION WHEN others THEN
        RAISE NOTICE '  - chk_insurance_claims_status skip: %', SQLERRM;
    END;

    RAISE NOTICE '📌 Constraints updated';
END$$;

-- app_user 계정 생성 및 권한 부여

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

        ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO app_user;
        ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT USAGE, SELECT ON SEQUENCES TO app_user;

        RAISE NOTICE '📌 app_user created. Password: %', app_pass;
    ELSE
        RAISE NOTICE '📌 app_user already exists';
    END IF;
END$$;

-- VIEW 생성 (대시보드 최적화)

DO $$
BEGIN
    RAISE NOTICE '📌 Creating views...';

    -- 입소자 + 방 정보 뷰
    CREATE OR REPLACE VIEW v_resident_rooms AS
    SELECT
        r.id,
        r.code,
        r.name,
        r.gender,
        r.birthday,
        r.admission_date,
        r.status,
        rr.room_label,
        rr.bed_label
    FROM residents r
    LEFT JOIN resident_rooms rr ON r.id = rr.resident_id AND rr.is_primary = TRUE AND rr.ends_at IS NULL;

    -- 오늘 식단표 뷰
    CREATE OR REPLACE VIEW v_today_meals AS
    SELECT
        meal_date,
        meal_type,
        main_menu,
        side_menu,
        soup,
        dessert,
        calories
    FROM meal_plan_items
    WHERE meal_date = CURRENT_DATE
    ORDER BY
        CASE meal_type
            WHEN 'BREAKFAST' THEN 1
            WHEN 'LUNCH' THEN 2
            WHEN 'DINNER' THEN 3
            WHEN 'SNACK' THEN 4
        END;

    -- 이번주 프로그램 스케줄 뷰
    CREATE OR REPLACE VIEW v_weekly_program_schedule AS
    SELECT
        ps.id,
        ps.starts_at,
        ps.ends_at,
        ps.location,
        ps.status,
        p.title,
        p.category,
        p.description
    FROM program_schedules ps
    JOIN programs p ON ps.program_id = p.id
    WHERE ps.starts_at >= date_trunc('week', CURRENT_DATE)
      AND ps.starts_at < date_trunc('week', CURRENT_DATE) + INTERVAL '7 days'
    ORDER BY ps.starts_at;

    -- 직원 근태 요약 (이번 달)
    CREATE OR REPLACE VIEW v_monthly_attendance AS
    SELECT
        e.id AS employee_id,
        e.name,
        e.email,
        d.name AS department,
        er.name AS role,
        COUNT(*) FILTER (WHERE a.status = 'PRESENT') AS present_days,
        COUNT(*) FILTER (WHERE a.status = 'ABSENT') AS absent_days,
        COUNT(*) FILTER (WHERE a.status = 'LATE') AS late_days,
        COUNT(*) FILTER (WHERE a.status = 'ON_LEAVE') AS leave_days
    FROM employees e
    LEFT JOIN departments d ON e.department_id = d.id
    LEFT JOIN employee_roles er ON e.role_id = er.id
    LEFT JOIN attendance_records a ON e.id = a.employee_id
        AND a.work_date >= date_trunc('month', CURRENT_DATE)
        AND a.work_date < date_trunc('month', CURRENT_DATE) + INTERVAL '1 month'
    WHERE e.status = 'ACTIVE'
    GROUP BY e.id, e.name, e.email, d.name, er.name;

    -- 활성 공지사항 뷰
    CREATE OR REPLACE VIEW v_active_notices AS
    SELECT
        id,
        title,
        content,
        category,
        is_pinned,
        published_at,
        created_at
    FROM notices
    WHERE is_active = TRUE
      AND (published_at IS NULL OR published_at <= now())
    ORDER BY is_pinned DESC, published_at DESC NULLS LAST, created_at DESC;

    -- 보험 청구 현황 뷰
    CREATE OR REPLACE VIEW v_insurance_claim_summary AS
    SELECT
        ic.id,
        ic.claim_no,
        ic.claim_month,
        ic.claim_type,
        ic.status,
        ic.total_amount,
        ic.approved_amount,
        r.code AS resident_code,
        r.name AS resident_name,
        ic.submitted_at,
        ic.approved_at,
        ic.paid_at
    FROM insurance_claims ic
    JOIN residents r ON ic.resident_id = r.id
    ORDER BY ic.claim_month DESC, ic.created_at DESC;

    -- 재고 경고 뷰 (최소재고 이하)
    CREATE OR REPLACE VIEW v_inventory_alerts AS
    SELECT
        id,
        code,
        name,
        category,
        unit,
        current_stock,
        min_stock,
        (min_stock - current_stock) AS shortage,
        storage_location
    FROM inventory_items
    WHERE is_active = TRUE
      AND min_stock IS NOT NULL
      AND current_stock < min_stock
    ORDER BY (min_stock - current_stock) DESC;

    -- 미처리 민원 뷰
    CREATE OR REPLACE VIEW v_pending_grievances AS
    SELECT
        g.id,
        g.grievance_no,
        g.complainant_name,
        g.category,
        g.title,
        g.received_at,
        g.status,
        r.name AS resident_name,
        e.name AS assigned_to_name
    FROM grievances g
    LEFT JOIN residents r ON g.resident_id = r.id
    LEFT JOIN employees e ON g.assigned_to = e.id
    WHERE g.status IN ('RECEIVED', 'PROCESSING')
    ORDER BY g.received_at DESC;

    RAISE NOTICE '📌 Views created';
END$$;

-- 최종 검증 및 상태 출력

DO $$
DECLARE
    t_count INT;
    i_count INT;
    v_count INT;
    s_count INT;
    c_count INT;
BEGIN
    RAISE NOTICE '📌 Final Verification...';

    SELECT COUNT(*) INTO t_count
    FROM information_schema.tables WHERE table_schema='public' AND table_type='BASE TABLE';

    SELECT COUNT(*) INTO i_count
    FROM pg_indexes WHERE schemaname='public';

    SELECT COUNT(*) INTO v_count
    FROM information_schema.views WHERE table_schema='public';

    SELECT COUNT(*) INTO s_count
    FROM information_schema.sequences WHERE sequence_schema='public';

    SELECT COUNT(*) INTO c_count
    FROM information_schema.table_constraints
    WHERE constraint_schema='public' AND constraint_type='CHECK';

    RAISE NOTICE '=================================================';
    RAISE NOTICE 'Agape-Care ERP Database Initialization Complete!';
    RAISE NOTICE '=================================================';
    RAISE NOTICE 'Database: %', current_database();
    RAISE NOTICE 'Tables: %', t_count;
    RAISE NOTICE 'Indexes: %', i_count;
    RAISE NOTICE 'Views: %', v_count;
    RAISE NOTICE 'Sequences: %', s_count;
    RAISE NOTICE 'Constraints: %', c_count;
    RAISE NOTICE 'app_user: ready';
    RAISE NOTICE 'Stats: updated';
    RAISE NOTICE '=================================================';
    RAISE NOTICE 'System Ready for Production!';
    RAISE NOTICE '=================================================';
END$$;
