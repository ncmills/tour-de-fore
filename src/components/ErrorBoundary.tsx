"use client";

import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallbackHref?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("ErrorBoundary caught:", error, info.componentStack);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#000",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          textAlign: "center",
          gap: "1.5rem",
        }}
      >
        <h1
          style={{
            fontFamily: "var(--font-plan-block), sans-serif",
            fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
          }}
        >
          Something Went Wrong
        </h1>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.95rem", maxWidth: 400 }}>
          Hit a snag loading this page. Try refreshing, or head back and regenerate.
        </p>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: "12px 28px",
              background: "rgba(220,38,38,0.9)",
              border: "none",
              borderRadius: 6,
              color: "#fff",
              fontSize: "0.9rem",
              fontWeight: 700,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              fontFamily: "var(--font-plan-block), sans-serif",
              cursor: "pointer",
            }}
          >
            Refresh
          </button>
          <button
            onClick={() => { window.location.href = this.props.fallbackHref || "/"; }}
            style={{
              padding: "12px 28px",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: 6,
              color: "#fff",
              fontSize: "0.9rem",
              fontWeight: 600,
              letterSpacing: "0.06em",
              fontFamily: "var(--font-plan-block), sans-serif",
              cursor: "pointer",
            }}
          >
            Go Home
          </button>
        </div>
        {process.env.NODE_ENV === "development" && this.state.error && (
          <pre
            style={{
              marginTop: "1rem",
              fontSize: "0.7rem",
              color: "rgba(255,100,100,0.6)",
              maxWidth: 500,
              overflow: "auto",
              whiteSpace: "pre-wrap",
            }}
          >
            {this.state.error.message}
          </pre>
        )}
      </div>
    );
  }
}
