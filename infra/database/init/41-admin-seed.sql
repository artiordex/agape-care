-- Description : 31-admin.sql - ⚙️ Admin 시스템 설정 샘플 데이터
-- Author : Shiwoo Min
-- Date : 2026-02-17
-- Note : 시설 정보 및 사이트 설정 초기 데이터

-- ============================================
-- 1. 시설 정보 (Facilities)
-- ============================================
INSERT INTO facilities (
  org_code,
  facility_name,
  facility_desc,
  facility_type,
  designated_date,
  director,
  director_phone,
  ceo_name,
  business_no,
  biz_type,
  staff_count,
  phone,
  fax,
  email,
  homepage,
  zip,
  address1,
  address2,
  total_capacity,
  short_stay_capacity,
  day_care_capacity,
  stamp_image,
  created_at,
  updated_at
) VALUES (
  'F-2026-001',                            -- org_code
  '아가페케어 요양센터',                   -- facility_name
  '어르신들의 존엄한 노후를 위한 프리미엄 케어 서비스를 제공합니다.', -- facility_desc
  '노인요양시설',                          -- facility_type
  '2026-01-01',                            -- designated_date
  '홍길동',                                -- director
  '010-1234-5678',                         -- director_phone
  '이아무개',                              -- ceo_name
  '123-45-67890',                          -- business_no
  '사회복지서비스업',                      -- biz_type
  35,                                      -- staff_count
  '02-1234-5678',                          -- phone
  '02-1234-5679',                          -- fax
  'admin@agape-care.com',                  -- email
  'https://agape-care.com',                -- homepage
  '06234',                                 -- zip
  '서울특별시 강남구 테헤란로 123',        -- address1
  '아카이브 빌딩 7층',                     -- address2
  49,                                      -- total_capacity
  5,                                       -- short_stay_capacity
  10,                                      -- day_care_capacity
  NULL,                                    -- stamp_image (추후 업로드)
  now(),
  now()
) ON CONFLICT (org_code) DO NOTHING;

-- ============================================
-- 2. 사이트 설정 (Site Infos)
-- ============================================
INSERT INTO site_infos (
  service_name,
  service_desc,
  contact_phone,
  contact_email,
  customer_hours,
  meta_title,
  meta_description,
  meta_keywords,
  footer_text,
  legal_notice,
  updated_by,
  created_at,
  updated_at
) VALUES (
  '아가페케어 요양센터',                                      -- service_name
  '어르신들의 존엄한 노후를 위한 프리미엄 케어 서비스',       -- service_desc
  '02-1234-5678',                                             -- contact_phone
  'help@agape-care.com',                                      -- contact_email
  '평일 09:00 ~ 18:00 (주말 및 공휴일 휴무)',                 -- customer_hours
  '아가페케어 요양센터 | 프리미엄 시니어 케어',               -- meta_title
  '2026년 최신 설비와 전문 인력을 갖춘 아가페케어에서 어르신들의 행복한 일상을 함께합니다.', -- meta_description
  '요양원, 노인복지, 주야간보호, 아가페케어',                 -- meta_keywords
  '© 2026 Agape-Care. All rights reserved.',                  -- footer_text
  '본 사이트의 모든 콘텐츠는 저작권법의 보호를 받습니다.',    -- legal_notice
  NULL,                                                       -- updated_by
  now(),
  now()
);

-- 완료 메시지
DO $$
BEGIN
  RAISE NOTICE '========================================';
  RAISE NOTICE 'Admin 설정 샘플 데이터 생성 완료 (31-admin.sql)';
  RAISE NOTICE '  - Facilities: 1건';
  RAISE NOTICE '  - Site Infos: 1건';
  RAISE NOTICE '========================================';
END$$;
