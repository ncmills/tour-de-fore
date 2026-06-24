import { NextRequest, NextResponse } from "next/server";
import { VID_COOKIE, VID_MAX_AGE, newVid, isValidVid } from "@/lib/vid";

const PROTECTED_PATHS = ["/my-trips", "/set-password", "/plan/gallery"];

/**
 * Ensure the first-party visitor-id cookie is set on `res`, minting a new one
 * when absent/malformed. The vid is the lead-gen join key (see lib/vid.ts);
 * it carries no identity and is safe to set on every response.
 */
function ensureVid(req: NextRequest, res: NextResponse): NextResponse {
  if (!isValidVid(req.cookies.get(VID_COOKIE)?.value)) {
    res.cookies.set(VID_COOKIE, newVid(), {
      maxAge: VID_MAX_AGE,
      sameSite: "lax",
      httpOnly: false, // client logSignal() reads it; it carries no secret
      secure: true,
      path: "/",
    });
  }
  return res;
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isProtected = PROTECTED_PATHS.some(
    (p) => pathname === p || pathname.startsWith(p + "/")
  );

  if (isProtected && !req.cookies.get("tdf-session")?.value) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("returnTo", pathname);
    // Still stamp the vid on the redirect response.
    return ensureVid(req, NextResponse.redirect(loginUrl));
  }

  return ensureVid(req, NextResponse.next());
}

export const config = {
  // Run on all page routes so the vid cookie is set site-wide; skip API,
  // Next internals, and static files.
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
