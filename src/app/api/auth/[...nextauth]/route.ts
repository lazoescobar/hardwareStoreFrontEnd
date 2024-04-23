import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import jwt from 'jsonwebtoken';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "UserName", type: "text", placeholder: "usuario"},
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if( process.env.NODE_ENV === "development"){
          const user = { id: 1, username: credentials?.username, paths : [ "/product", "/sales"]};
          const token = jwt.sign(user, "TOKEN", {
            expiresIn:  '1m', // Puedes ajustar la expiración según tus necesidades
          });

          return { ...user, token }; 
        }
        else{
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
            {
              method: "POST",
              body: JSON.stringify({
                email: credentials?.username,
                password: credentials?.password,
              }),
              headers: { "Content-Type": "application/json" },
            }
          );
          const user = await res.json();
          if (user.error) return null;
          return user;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login"
  },
});

export { handler as GET, handler as POST };
