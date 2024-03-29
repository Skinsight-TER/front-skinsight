import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials"

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
          placeholder: "Jhon Doe",
        },
        password: { label: "Mot de passe", type: "password" }
      },
      async authorize(credentials, req){
        if (!credentials?.email || !credentials?.password) return null;
        const { email, password } = credentials;
        const res = await fetch (process.env.NEXT_PUBLIC_BACKEND_URL + "/auth/login", {
          method: "POST",
          body: JSON.stringify({
            email,
            password,
          }),
          headers: {
            "Content-Type": "application/json",
          }
        });
        if (res.status == 401){
          console.log(res.statusText);

          return null;
        }
        const user = await res.json()
        return user;
      },
    })
  ], 
  callbacks: {
    async session({ token, session }) {
      if (session.user) {
        session.user = token.user!;
      }
      return session;
    }
  }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };