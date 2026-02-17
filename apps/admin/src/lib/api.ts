import { contract } from '@agape-care/api-contract';
import { useAuthStore } from '@/stores/auth.store';
import { initQueryClient } from '@ts-rest/react-query';

const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export const api = initQueryClient(contract, {
  baseUrl,
  baseHeaders: () => {
    // Zustand 스토어에서 accessToken을 동적으로 읽어 헤더에 주입
    const token = useAuthStore.getState().accessToken;
    if (!token) return {};
    return {
      authorization: `Bearer ${token}`,
    };
  },
});
