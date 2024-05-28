import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"
import * as jwt from 'jose'

const jwtConfig = {
  secret: new TextEncoder().encode("TOKEN"),
}

export default withAuth(
  async function middleware(req) {
    const token:any = req.nextauth.token?.token;
    if(!token) {
      return NextResponse.redirect(new URL('/login', req.url))
    }
    try {
      const decoded = await jwt.jwtVerify(token, jwtConfig.secret);
      if(!decoded){
        return NextResponse.redirect(new URL('/login', req.url))
      }
      if(decoded){
        if(req.nextUrl.pathname === "/"){
          return NextResponse.redirect(new URL('/cestaproductos', req.url))
        }
      }
    } catch (error) {
      return NextResponse.redirect(new URL('/login', req.url))
    }
  },
)

export const config = {
  matcher: ["/", "/cestaproductos", "/nuevoproducto", "/producto/:path*", "/usuario/:path*"],
};
