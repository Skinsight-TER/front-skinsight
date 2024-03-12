// types/next-auth.d.ts

import 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  // Étend l'interface User pour inclure accessToken
  interface User {
    accessToken?: string;
  }

  // Assurez-vous que l'interface Session inclut également accessToken
  interface Session {
    user?: User;
    accessToken?: string;
  }
}

declare module 'next-auth/jwt' {
  // Étend l'interface JWT pour inclure accessToken
  interface JWT {
    accessToken?: string;
  }
}
