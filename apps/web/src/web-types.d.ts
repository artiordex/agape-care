/**
 * Description : web-types.d.ts - ?? web-types.d ?? ?? ??
 * Author : Shiwoo Min
 * Date : 2025-09-07
 */
import NextAuth, { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      provider?: string;
    } & DefaultSession['user'];
  }

  interface User {
    id: string;
    provider?: string;
  }

  interface JWT {
    id?: string;
    provider?: string;
  }
}
