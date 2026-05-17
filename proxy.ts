import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";

export default async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const pathname = request.nextUrl.pathname;

  if (!token && pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token) {
    try {
      const {userId} = jwt.verify(token, process.env.SECRET!) as {userId:string};
      const user = await prisma.admin.findFirst({
        where:{
            id:userId,
        }
      })
      if(!user){
        return NextResponse.redirect(new URL("/login", request.url));
      }

      if (pathname === "/login") {
        return NextResponse.redirect(new URL("/admin", request.url));
      }

      return NextResponse.next();
    } catch {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/login"],
};