import { NextRequest, NextResponse } from "next/server";

const PROTECTED_PATHS = ["/my-trips", "/set-password", "/plan/gallery"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Check if this is a protected route
  const isProtected = PROTECTED_PATHS.some((p) => pathname === p || pathname.startsWith(p + "/"));
  if (!isProtected) return NextResponse.next();

  // Check for session cookie
  const session = req.cookies.get("tdf-session")?.value;
  if (!session) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("returnTo", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/my-trips/:path*", "/set-password/:path*", "/plan/gallery/:path*"],
};
