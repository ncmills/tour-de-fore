"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import MulliganButton from "./MulliganButton";
import HomeButton from "./HomeButton";
import { getTripCountdown, type TripTiming } from "@/lib/trip-dates";
import type { WizardState } from "@/lib/plan-types";

interface PlannedTrip {
  id: string;
  city: string;
  state: string;
  createdAt: string;
  paid: boolean;
  groupSize: number;
  numberOfDays: number;
  tripName?: string;
  /** Structured trip timing for the countdown (see lib/trip-dates.ts). */
  timing?: TripTiming;
  /** Full wizard inputs so "Duplicate this trip" can prefill a new wizard. */
  inputs?: WizardState;
}

interface AccountStatus {
  canPlan: boolean;
  plansUsed: number;
  plansLimit: number;
  unlimited: boolean;
  email?: string;
  loggedIn?: boolean;
}

export default function MyTripsClient({
  email: initialEmail,
  name: initialName,
  plannedTrips: initialTrips,
}: {
  email: string;
  name: string;
  plannedTrips: PlannedTrip[];
}) {
  const router = useRouter();
  const [name, setName] = useState(initialName);
  const [editingName, setEditingName] = useState(false);
  const [savingName, setSavingName] = useState(false);
  const [email, setEmail] = useState(initialEmail);

  // Trips (mutable for deletion)
  const [trips, setTrips] = useState(initialTrips);

  // Delete modal state
  const [deletingTripId, setDeletingTripId] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Change email state
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [emailPassword, setEmailPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [emailSaving, setEmailSaving] = useState(false);

  // Change password state
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [passwordSaving, setPasswordSaving] = useState(false);

  // Trip names (editable)
  const [tripNames, setTripNames] = useState<Record<string, string>>(() => {
    const map: Record<string, string> = {};
    initialTrips.forEach((t) => {
      map[t.id] = t.tripName || `${t.city}${t.state ? `, ${t.state}` : ""} Trip`;
    });
    return map;
  });
  const [editingTripId, setEditingTripId] = useState<string | null>(null);

  // Account status
  const [accountStatus, setAccountStatus] = useState<AccountStatus | null>(null);

  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("/api/profile")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => { if (data) setAccountStatus(data); })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (editingName && nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, [editingName]);

  const saveName = async () => {
    setSavingName(true);
    await fetch("/api/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    }).catch(() => {});
    setEditingName(false);
    setSavingName(false);
  };

  const handleChangeEmail = async () => {
    setEmailError("");
    if (!newEmail.trim()) {
      setEmailError("Enter a new email address.");
      return;
    }
    if (!emailPassword) {
      setEmailError("Enter your current password to confirm.");
      return;
    }
    setEmailSaving(true);
    try {
      const res = await fetch("/api/auth/change-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newEmail: newEmail.trim(), password: emailPassword }),
      });
      const data = await res.json();
      if (!res.ok) {
        setEmailError(data.error || "Failed to change email.");
      } else {
        setEmail(data.email);
        setShowEmailForm(false);
        setNewEmail("");
        setEmailPassword("");
      }
    } catch {
      setEmailError("Something went wrong.");
    }
    setEmailSaving(false);
  };

  const handleChangePassword = async () => {
    setPasswordError("");
    setPasswordSuccess(false);
    if (!currentPassword) {
      setPasswordError("Enter your current password.");
      return;
    }
    if (newPassword.length < 8) {
      setPasswordError("New password must be at least 8 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords don't match.");
      return;
    }
    setPasswordSaving(true);
    try {
      // Verify current password via login endpoint
      const verifyRes = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: currentPassword }),
      });
      if (!verifyRes.ok) {
        setPasswordError("Current password is incorrect.");
        setPasswordSaving(false);
        return;
      }
      // Set new password
      const setRes = await fetch("/api/auth/set-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: newPassword }),
      });
      if (!setRes.ok) {
        setPasswordError("Failed to set new password.");
      } else {
        setPasswordSuccess(true);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setTimeout(() => {
          setShowPasswordForm(false);
          setPasswordSuccess(false);
        }, 2000);
      }
    } catch {
      setPasswordError("Something went wrong.");
    }
    setPasswordSaving(false);
  };

  const handleDeleteTrip = async () => {
    if (!deletingTripId) return;
    setDeleteLoading(true);
    try {
      const res = await fetch(`/api/plans/${deletingTripId}`, { method: "DELETE" });
      if (res.ok) {
        setTrips((prev) => prev.filter((t) => t.id !== deletingTripId));
        const updated = { ...tripNames };
        delete updated[deletingTripId];
        setTripNames(updated);
      }
    } catch {
      // silently fail
    }
    setDeleteLoading(false);
    setDeletingTripId(null);
  };

  // Duplicate this trip → seed the wizard's sessionStorage with the saved
  // inputs, then route to /plan-a-trip. The wizard's mount-effect reads
  // "tdf-wizard-state" and rehydrates every field. Same restore path as the
  // result page's "Edit your selections".
  const duplicateTrip = (trip: PlannedTrip) => {
    if (!trip.inputs) { router.push("/plan-a-trip"); return; }
    try {
      sessionStorage.setItem("tdf-wizard-state", JSON.stringify(trip.inputs));
    } catch { /* ignore — storage may be full or blocked */ }
    router.push("/plan-a-trip");
  };

  const isUnlimited = accountStatus?.unlimited ?? false;

  const remaining = accountStatus
    ? isUnlimited
      ? null
      : accountStatus.plansLimit - accountStatus.plansUsed
    : null;

  const canPlan = accountStatus?.canPlan ?? true;

  // ── Styles ──
  const inputStyle: React.CSSProperties = {
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.15)",
    borderRadius: 6,
    padding: "10px 14px",
    color: "#fff",
    fontSize: "0.9rem",
    width: "100%",
    outline: "none",
    fontFamily: "var(--font-inter), sans-serif",
  };

  const smallBtnStyle: React.CSSProperties = {
    padding: "8px 16px",
    minHeight: 44,
    fontSize: "0.75rem",
    fontWeight: 600,
    border: "1px solid rgba(255,255,255,0.15)",
    borderRadius: 6,
    background: "rgba(255,255,255,0.05)",
    color: "rgba(255,255,255,0.6)",
    cursor: "pointer",
    fontFamily: "var(--font-inter), sans-serif",
    transition: "all 0.15s",
  };

  const primaryBtnStyle: React.CSSProperties = {
    ...smallBtnStyle,
    background: "rgba(220,38,38,0.85)",
    border: "1px solid rgba(220,38,38,0.6)",
    color: "#fff",
  };

  return (
    <main style={{ minHeight: "100vh", background: "#000", color: "#fff", padding: "clamp(2rem, 6vw, 4rem) clamp(1rem, 4vw, 3rem)" }}>
      <MulliganButton />
      <HomeButton />

      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        {/* ── Profile Section ── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 14,
            padding: "2rem 2rem 1.75rem",
            marginBottom: "1.5rem",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
            <Image src="/devil-mascot.webp" alt="Tour de Fore devil mascot" width={160} height={160} style={{ width: "clamp(80px, 25vw, 160px)", height: "clamp(80px, 25vw, 160px)", objectFit: "contain", margin: "0 auto 0.09rem" }} />

            {editingName ? (
              <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                <input
                  ref={nameInputRef}
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") saveName(); if (e.key === "Escape") setEditingName(false); }}
                  onBlur={saveName}
                  style={{
                    ...inputStyle,
                    width: "auto",
                    maxWidth: 280,
                    textAlign: "center",
                    fontSize: "1.3rem",
                    fontFamily: "var(--font-plan-groovy), cursive",
                  }}
                />
              </div>
            ) : (
              <h1
                onClick={() => setEditingName(true)}
                style={{
                  fontFamily: "var(--font-plan-groovy), cursive",
                  fontSize: "clamp(1.8rem, 5vw, 2.8rem)",
                  marginBottom: "0.25rem",
                  cursor: "pointer",
                }}
                title="Click to edit name"
              >
                {name || "Set Your Name"}
                <span style={{ fontSize: "0.6em", color: "rgba(255,255,255,0.2)", marginLeft: "0.4em" }}>&#9998;</span>
              </h1>
            )}
            {savingName && <p style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.3)" }}>Saving...</p>}
          </div>

          {/* Email row */}
          <div style={{ marginBottom: "1rem" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem" }}>
              <div>
                <div style={{ fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.3)", marginBottom: "0.2rem" }}>Email</div>
                <div style={{ fontSize: "0.95rem", color: "rgba(255,255,255,0.7)" }}>{email}</div>
              </div>
              <button
                onClick={() => { setShowEmailForm(!showEmailForm); setShowPasswordForm(false); setEmailError(""); }}
                style={smallBtnStyle}
              >
                Change Email
              </button>
            </div>

            {showEmailForm && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} style={{ marginTop: "1rem", overflow: "hidden" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                  <input
                    type="email"
                    placeholder="New email address"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    autoComplete="email"
                    style={inputStyle}
                  />
                  <input
                    type="password"
                    placeholder="Current password to confirm"
                    value={emailPassword}
                    onChange={(e) => setEmailPassword(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") handleChangeEmail(); }}
                    autoComplete="current-password"
                    style={inputStyle}
                  />
                  {emailError && <p style={{ color: "rgba(220,38,38,0.9)", fontSize: "0.8rem", margin: 0 }}>{emailError}</p>}
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <button onClick={handleChangeEmail} disabled={emailSaving} style={primaryBtnStyle}>
                      {emailSaving ? "Saving..." : "Update Email"}
                    </button>
                    <button onClick={() => { setShowEmailForm(false); setEmailError(""); }} style={smallBtnStyle}>Cancel</button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Password row */}
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem" }}>
              <div>
                <div style={{ fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.3)", marginBottom: "0.2rem" }}>Password</div>
                <div style={{ fontSize: "0.95rem", color: "rgba(255,255,255,0.4)" }}>********</div>
              </div>
              <button
                onClick={() => { setShowPasswordForm(!showPasswordForm); setShowEmailForm(false); setPasswordError(""); setPasswordSuccess(false); }}
                style={smallBtnStyle}
              >
                Change Password
              </button>
            </div>

            {showPasswordForm && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} style={{ marginTop: "1rem", overflow: "hidden" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                  <input
                    type="password"
                    placeholder="Current password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    autoComplete="current-password"
                    style={inputStyle}
                  />
                  <input
                    type="password"
                    placeholder="New password (min 8 characters)"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    autoComplete="new-password"
                    style={inputStyle}
                  />
                  <input
                    type="password"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") handleChangePassword(); }}
                    autoComplete="new-password"
                    style={inputStyle}
                  />
                  {passwordError && <p style={{ color: "rgba(220,38,38,0.9)", fontSize: "0.8rem", margin: 0 }}>{passwordError}</p>}
                  {passwordSuccess && <p style={{ color: "color-mix(in srgb, var(--color-success) 90%, transparent)", fontSize: "0.8rem", margin: 0 }}>Password updated.</p>}
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <button onClick={handleChangePassword} disabled={passwordSaving} style={primaryBtnStyle}>
                      {passwordSaving ? "Saving..." : "Update Password"}
                    </button>
                    <button onClick={() => { setShowPasswordForm(false); setPasswordError(""); }} style={smallBtnStyle}>Cancel</button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Sign Out */}
          <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
            <button
              onClick={() => {
                fetch("/api/auth/logout", { method: "POST" }).then(() => {
                  window.location.href = "/?skip=1";
                });
              }}
              style={{
                ...smallBtnStyle,
                color: "rgba(255,255,255,0.35)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              Sign Out
            </button>
          </div>
        </motion.section>

        {/* ── Plan Limit Ticker ── */}
        {accountStatus && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{
              marginBottom: "1.5rem",
              padding: "0.85rem 1.25rem",
              borderRadius: 10,
              background: isUnlimited
                ? "rgba(212,168,67,0.08)"
                : canPlan
                  ? "color-mix(in srgb, var(--color-success) 6%, transparent)"
                  : "rgba(220,38,38,0.06)",
              border: `1px solid ${
                isUnlimited
                  ? "rgba(212,168,67,0.25)"
                  : canPlan
                    ? "color-mix(in srgb, var(--color-success) 20%, transparent)"
                    : "rgba(220,38,38,0.25)"
              }`,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "0.5rem",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
              <span style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: isUnlimited
                  ? "rgba(212,168,67,0.8)"
                  : canPlan
                    ? "color-mix(in srgb, var(--color-success) 80%, transparent)"
                    : "rgba(220,38,38,0.8)",
                display: "inline-block",
                flexShrink: 0,
              }} />
              <span style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.7)", fontFamily: "var(--font-inter), sans-serif" }}>
                {isUnlimited
                  ? "Unlimited plans"
                  : canPlan
                    ? `You can plan ${remaining} more trip${remaining !== 1 ? "s" : ""} this month`
                    : "You've reached your 3 free plans this month"}
              </span>
            </div>
            {isUnlimited ? (
              <span style={{
                fontSize: "0.6rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
                padding: "3px 8px",
                background: "rgba(212,168,67,0.12)",
                border: "1px solid rgba(212,168,67,0.3)",
                borderRadius: 4,
                color: "rgba(212,168,67,0.9)",
                textTransform: "uppercase",
              }}>
                UNLIMITED
              </span>
            ) : !canPlan && (
              <span style={{
                fontSize: "0.7rem",
                color: "rgba(255,255,255,0.4)",
                fontFamily: "var(--font-inter), sans-serif",
                fontStyle: "italic",
              }}>
                Resets on the 1st
              </span>
            )}
          </motion.div>
        )}

        {/* ── Planned Trips ── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          style={{ marginBottom: "3rem" }}
        >
          <h2 style={{
            fontFamily: "var(--font-plan-block), sans-serif",
            fontSize: "1.3rem",
            marginBottom: "1rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            letterSpacing: "0.02em",
          }}>
            My Planned Trips
            {canPlan ? (
              <Link href="/plan-a-trip" style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: "rgba(220,38,38,0.85)",
                color: "#fff",
                fontSize: "1.3rem",
                fontWeight: 300,
                textDecoration: "none",
                lineHeight: 1,
                transition: "background 0.15s",
              }}>
                +
              </Link>
            ) : (
              <span
                title="Plan limit reached"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.05)",
                  color: "rgba(255,255,255,0.2)",
                  fontSize: "1.3rem",
                  fontWeight: 300,
                  lineHeight: 1,
                  cursor: "not-allowed",
                }}
              >
                +
              </span>
            )}
          </h2>

          {trips.length === 0 ? (
            <div style={{
              textAlign: "center",
              padding: "3rem 2rem",
              background: "rgba(255,255,255,0.02)",
              border: "1px dashed rgba(255,255,255,0.1)",
              borderRadius: 12,
            }}>
              <p style={{ color: "rgba(255,255,255,0.4)", marginBottom: "1rem", fontFamily: "var(--font-inter), sans-serif" }}>No planned trips yet.</p>
              {canPlan && (
                <Link href="/plan-a-trip" style={{ color: "rgba(220,38,38,0.9)", textDecoration: "none", fontWeight: 600, fontSize: "0.9rem", fontFamily: "var(--font-inter), sans-serif" }}>
                  Plan your first trip &rarr;
                </Link>
              )}
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {trips.map((trip, i) => {
                const isEditing = editingTripId === trip.id;
                const tripName = tripNames[trip.id] || `${trip.city}${trip.state ? `, ${trip.state}` : ""} Trip`;
                const countdown = getTripCountdown(trip.timing);
                // Countdown badge palette: urgent (≤30d) = ember, future = white-dim,
                // past = muted, TBD = muted.
                const cdColor = countdown.urgent
                  ? "rgba(234,88,12,0.95)"
                  : countdown.past || countdown.tbd
                    ? "rgba(255,255,255,0.4)"
                    : "rgba(255,255,255,0.7)";
                const cdBg = countdown.urgent
                  ? "rgba(234,88,12,0.12)"
                  : "rgba(255,255,255,0.05)";
                const cdBorder = countdown.urgent
                  ? "1px solid rgba(234,88,12,0.4)"
                  : "1px solid rgba(255,255,255,0.1)";

                return (
                  <motion.div key={trip.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.05 }}>
                    <div style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: 10,
                      padding: "1.25rem",
                      transition: "border-color 0.2s",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}
                    >
                      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-start", gap: "0.5rem" }}>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          {isEditing ? (
                            <input
                              type="text"
                              value={tripNames[trip.id] || ""}
                              onChange={(e) => setTripNames({ ...tripNames, [trip.id]: e.target.value })}
                              onBlur={() => setEditingTripId(null)}
                              onKeyDown={(e) => { if (e.key === "Enter" || e.key === "Escape") setEditingTripId(null); }}
                              autoFocus
                              style={{
                                ...inputStyle,
                                fontSize: "1.05rem",
                                fontWeight: 600,
                                padding: "6px 10px",
                                marginBottom: "0.3rem",
                              }}
                            />
                          ) : (
                            <h3
                              onClick={() => setEditingTripId(trip.id)}
                              style={{
                                fontSize: "1.05rem",
                                fontWeight: 600,
                                marginBottom: "0.3rem",
                                cursor: "pointer",
                                fontFamily: "var(--font-inter), sans-serif",
                              }}
                              title="Click to rename"
                            >
                              {tripName}
                              <span style={{ fontSize: "0.6em", color: "rgba(255,255,255,0.2)", marginLeft: "0.4em" }}>&#9998;</span>
                            </h3>
                          )}
                          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.8rem", fontFamily: "var(--font-inter), sans-serif", display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.5rem" }}>
                            <span>{trip.groupSize} people &middot; {trip.numberOfDays} days</span>
                            {/* Trip countdown badge — derived from structured timing. */}
                            <span
                              title={countdown.tbd ? "No firm dates set yet" : "Time until your trip"}
                              style={{
                                fontSize: "0.68rem",
                                fontWeight: 700,
                                letterSpacing: "0.02em",
                                padding: "2px 8px",
                                borderRadius: 999,
                                color: cdColor,
                                background: cdBg,
                                border: cdBorder,
                                whiteSpace: "nowrap",
                              }}
                            >
                              {countdown.urgent && countdown.days !== null && countdown.days <= 7 ? "🔥 " : ""}{countdown.label}
                            </span>
                          </p>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                          <button
                            onClick={(e) => { e.stopPropagation(); duplicateTrip(trip); }}
                            title="Start a new trip prefilled from this one"
                            style={{
                              fontSize: "0.75rem",
                              color: "rgba(255,255,255,0.5)",
                              background: "none",
                              border: "1px solid rgba(255,255,255,0.12)",
                              borderRadius: 6,
                              cursor: "pointer",
                              padding: "4px 10px",
                              fontWeight: 600,
                              fontFamily: "var(--font-inter), sans-serif",
                              whiteSpace: "nowrap",
                              transition: "all 0.15s",
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)"; e.currentTarget.style.color = "#fff"; }}
                            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.color = "rgba(255,255,255,0.5)"; }}
                          >
                            Run it back
                          </button>
                          <Link
                            href={`/plan/result/${trip.id}`}
                            style={{
                              fontSize: "0.75rem",
                              color: "rgba(220,38,38,0.8)",
                              textDecoration: "none",
                              fontWeight: 600,
                              fontFamily: "var(--font-inter), sans-serif",
                              whiteSpace: "nowrap",
                            }}
                          >
                            View &rarr;
                          </Link>
                          <button
                            onClick={(e) => { e.stopPropagation(); setDeletingTripId(trip.id); }}
                            title="Delete trip"
                            style={{
                              background: "none",
                              border: "1px solid rgba(255,255,255,0.08)",
                              borderRadius: 6,
                              color: "rgba(255,255,255,0.25)",
                              cursor: "pointer",
                              padding: "4px 7px",
                              fontSize: "0.8rem",
                              lineHeight: 1,
                              transition: "all 0.15s",
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(220,38,38,0.5)"; e.currentTarget.style.color = "rgba(220,38,38,0.8)"; }}
                            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = "rgba(255,255,255,0.25)"; }}
                          >
                            &#128465;
                          </button>
                        </div>
                      </div>

                      {/* "Lock it in" nudge — appears within 30 days of the trip
                          and gets louder (copy + emphasis) as the day nears. */}
                      {countdown.urgent && countdown.days !== null && (
                        <motion.div
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          style={{
                            marginTop: "0.85rem",
                            padding: "0.6rem 0.85rem",
                            borderRadius: 8,
                            background: "rgba(234,88,12,0.1)",
                            border: "1px solid rgba(234,88,12,0.35)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            flexWrap: "wrap",
                            gap: "0.5rem",
                          }}
                        >
                          <span style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.85)", fontFamily: "var(--font-inter), sans-serif" }}>
                            {countdown.days <= 7
                              ? "It's go time — lock your tee times before they're gone."
                              : countdown.days <= 14
                                ? `Trip's in ${countdown.days} days — lock your tee times.`
                                : `Trip's in about 3 weeks — lock your tee times before the good slots vanish.`}
                          </span>
                          <Link
                            href={`/plan/result/${trip.id}`}
                            style={{
                              fontSize: "0.72rem",
                              fontWeight: 700,
                              color: "#fff",
                              background: "rgba(234,88,12,0.9)",
                              border: "none",
                              borderRadius: 6,
                              padding: "6px 14px",
                              textDecoration: "none",
                              whiteSpace: "nowrap",
                              fontFamily: "var(--font-inter), sans-serif",
                            }}
                          >
                            Lock it in &rarr;
                          </Link>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </motion.section>
      </div>

      {/* ── Delete Confirmation Modal ── */}
      {deletingTripId && (
        <div
          onClick={() => { if (!deleteLoading) setDeletingTripId(null); }}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.75)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 400,
            padding: "1rem",
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#111",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 14,
              padding: "2rem",
              maxWidth: 420,
              width: "100%",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>&#9888;&#65039;</div>
            <h3 style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "1.1rem", fontWeight: 600, marginBottom: "0.75rem" }}>
              Delete this trip?
            </h3>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.85rem", lineHeight: 1.5, fontFamily: "var(--font-inter), sans-serif", marginBottom: "1.5rem" }}>
              Deleting this trip will NOT reset your monthly plan limit. You will not be able to plan another trip this month.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center" }}>
              <button
                onClick={() => setDeletingTripId(null)}
                disabled={deleteLoading}
                style={{
                  ...smallBtnStyle,
                  padding: "10px 20px",
                  fontSize: "0.85rem",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteTrip}
                disabled={deleteLoading}
                style={{
                  padding: "10px 20px",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  border: "1px solid rgba(220,38,38,0.6)",
                  borderRadius: 6,
                  background: "rgba(220,38,38,0.85)",
                  color: "#fff",
                  cursor: deleteLoading ? "wait" : "pointer",
                  fontFamily: "var(--font-inter), sans-serif",
                  transition: "all 0.15s",
                }}
              >
                {deleteLoading ? "Deleting..." : "Delete Trip"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </main>
  );
}
