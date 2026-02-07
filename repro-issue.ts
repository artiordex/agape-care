import { logger } from './packages/logger/src/logger.js';

console.log('--- Testing userId as Object ---');
// @ts-ignore
logger.info('Test message with object userId', { userId: { id: 456, name: 'test-user' } });

console.log('--- Testing userName as Object ---');
// @ts-ignore
logger.info('Test message with object userName', { userName: { first: 'John', last: 'Doe' } });

console.log('--- Testing action as Object ---');
// @ts-ignore
logger.info('Test message with object action', { action: { type: 'UPDATE', target: 'profile' } });
