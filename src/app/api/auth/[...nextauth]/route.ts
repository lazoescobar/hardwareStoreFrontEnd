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
      async authorize(credentials) {
        const resLogin = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/modulo-usuario/login`,{
            method: "POST",
            body: JSON.stringify({
              uss: credentials?.username,
              pass: credentials?.password,
            }),
            headers: { "Content-Type": "application/json" },
          });

          const infoLogin = await resLogin.json();
          
          if(resLogin.status !== 200){
            const {mensaje} = infoLogin; 
            throw new Error(mensaje);
          }
          else{
            const userInfo = {...infoLogin};
            const token = jwt.sign(userInfo, "TOKEN", {
              expiresIn:  '60m',
            });
            return {...userInfo, token} ;
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
