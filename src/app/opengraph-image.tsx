import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "40px" }}>
          <div style={{ width: 56, height: 56, background: "#d4a017", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "#000", fontWeight: 900, fontSize: 28 }}>D</span>
          </div>
          <span style={{ color: "#fff", fontWeight: 800, fontSize: 32 }}>Don Va</span>
        </div>

        {/* Headline */}
        <h1 style={{ color: "#fff", fontSize: 64, fontWeight: 800, lineHeight: 1.1, margin: "0 0 24px 0", maxWidth: 800 }}>
          Virtual Assistants{" "}
          <span style={{ color: "#d4a017" }}>80% Cheaper</span>
        </h1>

        {/* Subtitle */}
        <p style={{ color: "#999", fontSize: 28, margin: "0 0 48px 0", maxWidth: 700 }}>
          Pre-vetted, German-speaking VAs. Scale your team in days, not months.
        </p>

        {/* Stats */}
        <div style={{ display: "flex", gap: "40px" }}>
          {[["200+", "Clients"], ["48h", "Onboarding"], ["4.9/5", "Rating"]].map(([val, label]) => (
            <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <span style={{ color: "#d4a017", fontSize: 36, fontWeight: 800 }}>{val}</span>
              <span style={{ color: "#666", fontSize: 18 }}>{label}</span>
            </div>
          ))}
        </div>

        {/* Domain */}
        <div style={{ position: "absolute", bottom: 60, right: 80, color: "#555", fontSize: 22 }}>
          don-va.com
        </div>
      </div>
    ),
    { ...size }
  );
}
