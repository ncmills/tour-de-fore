import { NextResponse } from "next/server";

export const UNLIMITED_EMAILS = ["nicholauscmills@gmail.com", "matt@sixtenmgmt.com"];

/** Get ISO week key like "2026-W14" */
export function getWeekKey(): string {
  const d = new Date();
  const jan1 = new Date(d.getFullYear(), 0, 1);
  const days = Math.floor((d.getTime() - jan1.getTime()) / 86400000);
  const week = Math.ceil((days + jan1.getDay() + 1) / 7);
  return `${d.getFullYear()}-W${String(week).padStart(2, "0")}`;
}

/** Get next Monday midnight ISO string */
export function getNextWeekReset(): string {
  const d = new Date();
  const day = d.getDay();
  const daysUntilMonday = day === 0 ? 1 : 8 - day;
  const next = new Date(d.getFullYear(), d.getMonth(), d.getDate() + daysUntilMonday);
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
