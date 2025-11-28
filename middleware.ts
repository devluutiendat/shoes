import { NextResponse, NextRequest } from "next/server";

export default function middleware(request: NextRequest) {
  const token = request.cookies.get("refreshToken");

  const privateRoute = ["/carts", "/admin" , "/profile"];

  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/static") ||
    pathname.match(/\.(css|js|png|jpg|jpeg|svg|ico)$/)
  ) {
    return NextResponse.next();
  }
  
  if (!token && privateRoute.includes(pathname)) {
    console.log("this is ",token);

    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}


export const config = {
  matcher: ["/:path*"],
};
