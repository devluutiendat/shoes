import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // const token = request.cookies.get("accessToken")?.value;

  // const publicRoutes = ["/login", "/register"];
  // if (
  //   request.nextUrl.pathname.startsWith("/_next") ||
  //   request.nextUrl.pathname.startsWith("/static") ||
  //   request.nextUrl.pathname.endsWith(".css") ||
  //   request.nextUrl.pathname.endsWith(".js")
  // ) {
  //   return NextResponse.next();
  // }
    
  // if (!token && !publicRoutes.includes(request.nextUrl.pathname)) {
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }

  // // Allow Next.js static assets (like CSS, images, and fonts) to load

  // if (!token && !publicRoutes.includes(request.nextUrl.pathname)) {
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"],
};
