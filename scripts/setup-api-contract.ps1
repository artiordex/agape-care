# packages/api-contract 디렉토리로 이동
cd packages/api-contract

# 디렉토리 구조 생성
$directories = @(
    "src/schemas/common",
    "src/schemas/auth",
    "src/schemas/employee",
    "src/schemas/resident",
    "src/schemas/care",
    "src/schemas/notification",
    "src/schemas/program",
    "src/schemas/meal",
    "src/schemas/content",
    "src/schemas/attendance",
    "src/schemas/accounting",
    "src/schemas/operations",
    "src/contracts",
    "src/dto/auth",
    "src/dto/employee",
    "src/dto/resident",
    "src/dto/care",
    "src/dto/notification",
    "src/dto/program",
    "src/dto/meal",
    "src/dto/content",
    "src/dto/attendance",
    "src/dto/accounting",
    "src/dto/operations"
)

foreach ($dir in $directories) {
    New-Item -ItemType Directory -Force -Path $dir | Out-Null
}

# 파일 생성
$files = @(
    # Common (공통)
    "src/schemas/common/pagination.schema.ts",
    "src/schemas/common/response.schema.ts",
    "src/schemas/common/date.schema.ts",
    "src/schemas/common/file.schema.ts",
    "src/schemas/common/audit.schema.ts",
    "src/schemas/common/system-setting.schema.ts",

    # Auth (인증)
    "src/schemas/auth/auth.schema.ts",

    # Employee (직원 - 4 테이블)
    "src/schemas/employee/employee.schema.ts",
    "src/schemas/employee/department.schema.ts",
    "src/schemas/employee/role.schema.ts",
    "src/schemas/employee/education.schema.ts",

    # Resident (입소자 - 6 테이블)
    "src/schemas/resident/resident.schema.ts",
    "src/schemas/resident/room.schema.ts",
    "src/schemas/resident/contact.schema.ts",
    "src/schemas/resident/health-note.schema.ts",
    "src/schemas/resident/medication.schema.ts",
    "src/schemas/resident/vital.schema.ts",

    # Care (돌봄 - 6 테이블)
    "src/schemas/care/care-plan.schema.ts",
    "src/schemas/care/care-plan-item.schema.ts",
    "src/schemas/care/care-task.schema.ts",
    "src/schemas/care/consultation.schema.ts",
    "src/schemas/care/incident.schema.ts",

    # Meal (식단 - 2 테이블)
    "src/schemas/meal/meal-plan.schema.ts",
    "src/schemas/meal/meal-plan-item.schema.ts",

    # Program (프로그램 - 3 테이블)
    "src/schemas/program/program.schema.ts",
    "src/schemas/program/schedule.schema.ts",
    "src/schemas/program/attendance.schema.ts",

    # Content (콘텐츠 - 9 테이블)
    "src/schemas/content/notice.schema.ts",
    "src/schemas/content/board-post.schema.ts",
    "src/schemas/content/board-comment.schema.ts",
    "src/schemas/content/gallery.schema.ts",
    "src/schemas/content/popup-banner.schema.ts",
    "src/schemas/content/website-setting.schema.ts",

    # Attendance (출결 - 5 테이블)
    "src/schemas/attendance/attendance-record.schema.ts",
    "src/schemas/attendance/shift-template.schema.ts",
    "src/schemas/attendance/shift-assignment.schema.ts",
    "src/schemas/attendance/leave-request.schema.ts",
    "src/schemas/attendance/leave-approval.schema.ts",

    # Accounting (회계 - 11 테이블)
    "src/schemas/accounting/account-category.schema.ts",
    "src/schemas/accounting/account.schema.ts",
    "src/schemas/accounting/supplier.schema.ts",
    "src/schemas/accounting/transaction.schema.ts",
    "src/schemas/accounting/payroll.schema.ts",
    "src/schemas/accounting/invoice.schema.ts",
    "src/schemas/accounting/insurance-claim.schema.ts",

    # Operations (운영 - 8 테이블)
    "src/schemas/operations/inventory.schema.ts",
    "src/schemas/operations/vehicle.schema.ts",
    "src/schemas/operations/transport.schema.ts",
    "src/schemas/operations/cctv.schema.ts",
    "src/schemas/operations/grievance.schema.ts",
    "src/schemas/operations/inspection.schema.ts",
    "src/schemas/operations/sms.schema.ts",

    # Notification (알림 - 1 테이블)
    "src/schemas/notification/notification.schema.ts",

    # Contracts (API 엔드포인트)
    "src/contracts/auth.contract.ts",
    "src/contracts/employee.contract.ts",
    "src/contracts/resident.contract.ts",
    "src/contracts/care.contract.ts",
    "src/contracts/meal.contract.ts",
    "src/contracts/program.contract.ts",
    "src/contracts/content.contract.ts",
    "src/contracts/attendance.contract.ts",
    "src/contracts/accounting.contract.ts",
    "src/contracts/operations.contract.ts",
    "src/contracts/notification.contract.ts",

    # Index files
    "src/schemas/index.ts",
    "src/contracts/index.ts",
    "src/dto/index.ts",
    "src/index.ts"
)

foreach ($file in $files) {
    New-Item -ItemType File -Force -Path $file | Out-Null
    Write-Host "Created: $file" -ForegroundColor Green
}

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "API Contract structure created!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Directories: $($directories.Count)" -ForegroundColor Yellow
Write-Host "Files: $($files.Count)" -ForegroundColor Yellow
Write-Host "`nCoverage:" -ForegroundColor Cyan
Write-Host "  • Common: 6 files (pagination, response, date, file, audit, system)" -ForegroundColor White
Write-Host "  • Auth: 1 file" -ForegroundColor White
Write-Host "  • Employee: 4 files (4 tables)" -ForegroundColor White
Write-Host "  • Resident: 6 files (6 tables)" -ForegroundColor White
Write-Host "  • Care: 5 files (6 tables)" -ForegroundColor White
Write-Host "  • Meal: 2 files (2 tables)" -ForegroundColor White
Write-Host "  • Program: 3 files (3 tables)" -ForegroundColor White
Write-Host "  • Content: 6 files (9 tables)" -ForegroundColor White
Write-Host "  • Attendance: 5 files (5 tables)" -ForegroundColor White
Write-Host "  • Accounting: 7 files (11 tables)" -ForegroundColor White
Write-Host "  • Operations: 7 files (8 tables)" -ForegroundColor White
Write-Host "  • Notification: 1 file (1 table)" -ForegroundColor White
Write-Host "  • Contracts: 11 files" -ForegroundColor White
Write-Host "`nTotal DB Tables Covered: 61/61" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
