const { composePlugins, withNx } = require('@nx/webpack');
const path = require('path');

module.exports = composePlugins(withNx(), config => {
  // paths alias 설정
  config.resolve = {
    ...config.resolve,
    alias: {
      ...config.resolve?.alias,
      '@agape-care/api-contract': path.resolve(
        __dirname,
        '../../packages/api-contract/src/index.ts',
      ),
      '@agape-care/database': path.resolve(__dirname, '../../packages/database/src/index.ts'),
      '@agape-care/logger': path.resolve(__dirname, '../../packages/logger/src/index.ts'),
    },
    extensions: ['.ts', '.js', '.json'],
  };

  // 네이티브 모듈 externals 설정
  config.externals = [
    /^@nestjs/,
    /^@prisma/,
    'bcrypt',
    'bcryptjs',
    'class-transformer',
    'class-validator',
  ];

  return config;
});
