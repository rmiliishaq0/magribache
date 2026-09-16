import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export default async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const pathname = request.nextUrl.pathname;

  // Protect admin routes
  if (pathname.startsWith("/admin")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
      jwt.verify(token, process.env.SECRET!);

      return NextResponse.next();
    } catch {
      const response = NextResponse.redirect(
        new URL("/login", request.url)
      );

      response.cookies.delete("token");

      return response;
    }
  }

  // Prevent logged users from accessing login
  if (pathname === "/login" && token) {
    try {
      jwt.verify(token, process.env.SECRET!);

      return NextResponse.redirect(new URL("/admin", request.url));
    } catch {
      const response = NextResponse.next();

      response.cookies.delete("token");

      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/login"],
};