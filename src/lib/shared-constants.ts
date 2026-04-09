import { NextResponse } from "next/server";

export const UNLIMITED_EMAILS = ["nicholauscmills@gmail.com", "matt@sixtenmgmt.com"];

/** Get month key like "2026-04" */
export function getMonthKey(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

/** Get first day of next month ISO string */
export function getNextMonthReset(): string {
  const d = new Date();
  const next = new Date(d.getFullYear(), d.getMonth() + 1, 1);
  return next.toISOString();
}

/** Set the standard TDF session cookie on a response. */
export function setSessionCookie(
  response: NextResponse,
  sessionId: string,
  sameSite: "strict" | "lax" = "strict"
): void {
  response.cookies.set("tdf-session", sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite,
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  });
}

/** Verify the admin secret from a request body or header. */
export function verifyAdmin(secret: string | null | undefined): boolean {
  return !!process.env.ADMIN_SECRET && secret === process.env.ADMIN_SECRET;
}
