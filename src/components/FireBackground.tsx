"use client";

export default function FireBackground() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      {/* Base fire glow — warm gradient shifting */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 120% 80% at 50% 100%, rgba(255,80,0,0.18) 0%, rgba(200,40,0,0.1) 30%, transparent 70%)",
          animation: "fireGlow 4s ease-in-out infinite alternate",
        }}
      />

      {/* Secondary fire layer — shifted timing */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 90% 60% at 30% 100%, rgba(255,120,0,0.12) 0%, transparent 60%)",
          animation: "fireGlow2 3.5s ease-in-out infinite alternate",
        }}
      />

      {/* Third fire layer — right side */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 80% 50% at 70% 100%, rgba(220,50,0,0.14) 0%, transparent 55%)",
          animation: "fireGlow3 5s ease-in-out infinite alternate",
        }}
      />

      {/* Ember particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            bottom: "-10px",
            left: `${5 + (i * 4.7) % 90}%`,
            width: `${2 + (i % 3)}px`,
            height: `${2 + (i % 3)}px`,
            borderRadius: "50%",
            background: i % 3 === 0 ? "rgba(255,180,50,0.8)" : i % 3 === 1 ? "rgba(255,100,20,0.7)" : "rgba(255,60,10,0.6)",
            boxShadow: `0 0 ${3 + (i % 4)}px ${i % 3 === 0 ? "rgba(255,180,50,0.5)" : "rgba(255,80,0,0.4)"}`,
            animation: `ember${i % 5} ${6 + (i % 8)}s linear infinite`,
            animationDelay: `${(i * 0.7) % 5}s`,
          }}
        />
      ))}

      <style>{`
        @keyframes fireGlow {
          0% { opacity: 0.7; transform: scale(1) translateY(0); }
          50% { opacity: 1; transform: scale(1.05) translateY(-2%); }
          100% { opacity: 0.8; transform: scale(0.98) translateY(1%); }
        }
        @keyframes fireGlow2 {
          0% { opacity: 0.6; transform: translateX(-3%) translateY(0); }
          100% { opacity: 1; transform: translateX(3%) translateY(-3%); }
        }
        @keyframes fireGlow3 {
          0% { opacity: 0.5; transform: translateX(2%) translateY(0); }
          100% { opacity: 0.9; transform: translateX(-2%) translateY(-2%); }
        }
        @keyframes ember0 {
          0% { transform: translateY(0) translateX(0) scale(1); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 0.3; }
          100% { transform: translateY(-100vh) translateX(30px) scale(0.3); opacity: 0; }
        }
        @keyframes ember1 {
          0% { transform: translateY(0) translateX(0) scale(1); opacity: 0; }
          10% { opacity: 0.8; }
          90% { opacity: 0.2; }
          100% { transform: translateY(-100vh) translateX(-20px) scale(0.2); opacity: 0; }
        }
        @keyframes ember2 {
          0% { transform: translateY(0) translateX(0) scale(1); opacity: 0; }
          10% { opacity: 0.9; }
          90% { opacity: 0.1; }
          100% { transform: translateY(-100vh) translateX(15px) scale(0.4); opacity: 0; }
        }
        @keyframes ember3 {
          0% { transform: translateY(0) translateX(0) scale(1); opacity: 0; }
          10% { opacity: 0.7; }
          90% { opacity: 0.2; }
          100% { transform: translateY(-100vh) translateX(-25px) scale(0.3); opacity: 0; }
        }
        @keyframes ember4 {
          0% { transform: translateY(0) translateX(0) scale(1); opacity: 0; }
          10% { opacity: 0.85; }
          90% { opacity: 0.15; }
          100% { transform: translateY(-100vh) translateX(10px) scale(0.25); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
