import { contract } from '@agape-care/api-contract';
import { initQueryClient } from '@ts-rest/react-query';

const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

console.log('Contract Notification Keys:', Object.keys(contract.notification || {}));

export const api = initQueryClient(contract, {
  baseUrl,
  baseHeaders: {},
});
