import { composePlugins, withNx } from '@nx/webpack';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default composePlugins(withNx(), config => {
  // tsconfig paths를 webpack alias로 변환
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
  };

  return config;
});
