# Script: setup-api-modules.ps1
# Description: Agape-Care API 모듈 구조 자동 생성 (DTO 제외)
# Author: Shiwoo Min
# Date: 2026-01-26
# Usage: .\scripts\setup-api-modules.ps1

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Agape-Care API Modules Setup" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan

# API 디렉토리로 이동
cd apps/api/src/modules

# 모듈 디렉토리 생성
$modules = @(
    "auth",
    "auth/guards",
    "auth/strategies",
    "auth/decorators",
    "employee",
    "department",
    "role",
    "resident",
    "resident/health",
    "resident/medication",
    "resident/vital",
    "resident/contact",
    "resident/room",
    "care",
    "care/plan",
    "care/task",
    "care/consultation",
    "care/incident",
    "meal",
    "meal/plan",
    "program",
    "program/schedule",
    "program/attendance",
    "content",
    "content/notice",
    "content/board",
    "content/gallery",
    "content/popup",
    "content/website",
    "attendance",
    "attendance/shift",
    "attendance/leave",
    "accounting",
    "accounting/account",
    "accounting/transaction",
    "accounting/payroll",
    "accounting/invoice",
    "accounting/insurance-claim",
    "accounting/supplier",
    "operations",
    "operations/inventory",
    "operations/vehicle",
    "operations/transport",
    "operations/cctv",
    "operations/grievance",
    "operations/inspection",
    "operations/sms",
    "notification",
    "common",
    "common/interceptors",
    "common/filters",
    "common/pipes",
    "common/decorators",
    "common/middleware"
)

Write-Host ""
Write-Host "Creating directories..." -ForegroundColor Yellow

foreach ($dir in $modules) {
    New-Item -ItemType Directory -Force -Path $dir | Out-Null
    Write-Host "  OK $dir" -ForegroundColor Gray
}

# 파일 생성
$files = @(
    "auth/auth.module.ts",
    "auth/auth.controller.ts",
    "auth/auth.service.ts",
    "auth/guards/jwt-auth.guard.ts",
    "auth/guards/jwt-refresh.guard.ts",
    "auth/guards/roles.guard.ts",
    "auth/strategies/jwt.strategy.ts",
    "auth/strategies/jwt-refresh.strategy.ts",
    "auth/decorators/current-user.decorator.ts",
    "auth/decorators/roles.decorator.ts",
    "employee/employee.module.ts",
    "employee/employee.controller.ts",
    "employee/employee.service.ts",
    "department/department.module.ts",
    "department/department.controller.ts",
    "department/department.service.ts",
    "role/role.module.ts",
    "role/role.controller.ts",
    "role/role.service.ts",
    "resident/resident.module.ts",
    "resident/resident.controller.ts",
    "resident/resident.service.ts",
    "resident/health/health.service.ts",
    "resident/medication/medication.service.ts",
    "resident/vital/vital.service.ts",
    "resident/contact/contact.service.ts",
    "resident/room/room.service.ts",
    "care/care.module.ts",
    "care/care.controller.ts",
    "care/care.service.ts",
    "care/plan/care-plan.service.ts",
    "care/task/care-task.service.ts",
    "care/consultation/consultation.service.ts",
    "care/incident/incident.service.ts",
    "meal/meal.module.ts",
    "meal/meal.controller.ts",
    "meal/meal.service.ts",
    "meal/plan/meal-plan.service.ts",
    "program/program.module.ts",
    "program/program.controller.ts",
    "program/program.service.ts",
    "program/schedule/schedule.service.ts",
    "program/attendance/attendance.service.ts",
    "content/content.module.ts",
    "content/content.controller.ts",
    "content/content.service.ts",
    "content/notice/notice.service.ts",
    "content/board/board.service.ts",
    "content/gallery/gallery.service.ts",
    "content/popup/popup.service.ts",
    "content/website/website.service.ts",
    "attendance/attendance.module.ts",
    "attendance/attendance.controller.ts",
    "attendance/attendance.service.ts",
    "attendance/shift/shift.service.ts",
    "attendance/leave/leave.service.ts",
    "accounting/accounting.module.ts",
    "accounting/accounting.controller.ts",
    "accounting/accounting.service.ts",
    "accounting/account/account.service.ts",
    "accounting/transaction/transaction.service.ts",
    "accounting/payroll/payroll.service.ts",
    "accounting/invoice/invoice.service.ts",
    "accounting/insurance-claim/insurance-claim.service.ts",
    "accounting/supplier/supplier.service.ts",
    "operations/operations.module.ts",
    "operations/operations.controller.ts",
    "operations/operations.service.ts",
    "operations/inventory/inventory.service.ts",
    "operations/vehicle/vehicle.service.ts",
    "operations/transport/transport.service.ts",
    "operations/cctv/cctv.service.ts",
    "operations/grievance/grievance.service.ts",
    "operations/inspection/inspection.service.ts",
    "operations/sms/sms.service.ts",
    "notification/notification.module.ts",
    "notification/notification.controller.ts",
    "notification/notification.service.ts",
    "common/interceptors/logging.interceptor.ts",
    "common/interceptors/transform.interceptor.ts",
    "common/filters/http-exception.filter.ts",
    "common/filters/prisma-exception.filter.ts",
    "common/pipes/validation.pipe.ts",
    "common/decorators/api-paginated-response.decorator.ts",
    "common/middleware/logger.middleware.ts"
)

Write-Host ""
Write-Host "Creating files..." -ForegroundColor Yellow

foreach ($file in $files) {
    New-Item -ItemType File -Force -Path $file | Out-Null
    Write-Host "  $file" -ForegroundColor Gray
}

cd ../../../..

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "API Modules Setup Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Summary:" -ForegroundColor Yellow
Write-Host "  Directories: $($modules.Count)" -ForegroundColor White
Write-Host "  Files: $($files.Count)" -ForegroundColor White
Write-Host ""
Write-Host "Note:" -ForegroundColor Yellow
Write-Host "  DTO uses @agape-care/api-contract package" -ForegroundColor White
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Cyan
Write-Host "  1. Fill in Auth module files" -ForegroundColor White
Write-Host "  2. Install dependencies (cd apps/api && pnpm install)" -ForegroundColor White
Write-Host "  3. Create test account in database" -ForegroundColor White
Write-Host "  4. Run API server (pnpm nx serve api)" -ForegroundColor White
Write-Host "========================================" -ForegroundColor Cyan
