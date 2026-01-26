/**
 * Description : ecosystem.config.js - 📌 PM2 프로세스 매니저 설정 파일
 * Author : Shiwoo Min
 * Date : 2026-01-26
 */

const path = require('node:path');
const fs = require('node:fs');
const ROOT = process.env.PM2_ROOT || '/app';
const DIST = path.join(ROOT, 'dist', 'apps', 'api');
const LOG_DIR = path.join(ROOT, 'logs');

// 로그 디렉토리 생성
if (!fs.existsSync(LOG_DIR)) {
  fs.mkdirSync(LOG_DIR, { recursive: true });
}

module.exports = {
  apps: [
    /* PRODUCTION MODE */
    {
      name: 'agape-care-api',
      script: 'main.js',
      cwd: DIST,
      interpreter: 'node',
      node_args: '--max-old-space-size=2048 --enable-source-maps',
      instances: process.env.NODE_ENV === 'production' ? 'max' : 1,
      exec_mode: process.env.NODE_ENV === 'production' ? 'cluster' : 'fork',
      env: {
        NODE_ENV: 'development',
        PORT: process.env.PORT || 8000,
        LOG_LEVEL: 'debug',
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: process.env.PORT || 8080,
        LOG_LEVEL: 'info',
      },
      watch: false,
      ignore_watch: ['node_modules', 'logs', '*.log'],
      max_memory_restart: '4G',
      min_uptime: '10s',
      max_restarts: 10,
      autorestart: true,
      log_file: path.join(LOG_DIR, 'api-combined.log'),
      out_file: path.join(LOG_DIR, 'api-out.log'),
      error_file: path.join(LOG_DIR, 'api-error.log'),
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
      kill_timeout: 5000,
      listen_timeout: 3000,
      reload_delay: 1000,
    },

    /* DEVELOPMENT MODE */
    {
      name: 'agape-care-api-dev',
      script: 'pnpm',
      args: ['nx', 'serve', '@agape-care/api'],
      cwd: ROOT,
      exec_mode: 'fork',
      instances: 1,
      watch: ['apps/api/src'],
      ignore_watch: ['dist', 'node_modules', 'logs'],
      env: {
        NODE_ENV: 'development',
        PORT: 8000,
        LOG_LEVEL: 'debug',
      },
    },
  ],
};
