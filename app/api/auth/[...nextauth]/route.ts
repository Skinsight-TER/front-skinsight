import { NextAuthOptions } from "next-auth";
import { jwtDecode } from "jwt-decode";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials"

interface NextSessionUser {
  id: string;
  name: string;
}

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/auth/login',
  },
  providers: [
    CredentialsProvider({
      name:"Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "Enter your email...",
        },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials){
        if (!credentials?.email || !credentials?.password) return null;
        const { email, password } = credentials;
        const res = await fetch (process.env.NEXT_PUBLIC_BACKEND_URL + "/auth/login", {
        // const res = await fetch ("http://localhost:3002/auth/login", {
          method: "POST",
          body: JSON.stringify({
            email,
            password,
          }),
          headers: {
            "Content-Type": "application/json",
          }
        });
        if (!res.ok) {
          console.log('Error while login', await res.text());
          return null;
        } 
        if (res.status == 401) return null;
        const tokens = (await res.json()) as {
          accessToken: string;
        };
        const userDecoded = jwtDecode<{
          id: string;
          email: string;
          iat: number;
          exp: number;
        }>(tokens.accessToken);
        const user: NextSessionUser = {
          id: userDecoded.id as never,
          name: userDecoded.email,
        };
        return user
      },
    })
  ], 
  callbacks: {
    session: ({ session, token, user}) => {
      console.log("callback.session", {session, token, user});
      return {
        ...session,
        user: {
          ...session.user,
        }
      }
    }
  }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };