import { useEffect, useState } from "react";

export default function DailyProgress({ progress, sessions, goal }) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (progress >= 1) {
      setAnimate(true);
      const t = setTimeout(() => setAnimate(false), 2500);
      return () => clearTimeout(t);
    }
  }, [progress]);

  return (
    <div style={{ marginTop: "1.5rem" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: "0.9rem",
          marginBottom: "0.4rem",
        }}
      >
        <span>Daily Goal</span>
        <span>
          {sessions}/{goal}
        </span>
      </div>

      <div
        style={{
          width: "100%",
          height: "10px",
          borderRadius: "999px",
          background: "#eee",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${progress * 100}%`,
            height: "100%",
            background:
              progress >= 1
                ? "linear-gradient(90deg, #22c55e, #16a34a)"
                : "linear-gradient(90deg, #8b5cf6, #7c3aed)",
            transition: "all 0.25s ease",
          }}
        />
      </div>

      {animate && (
        <div
          style={{
            marginTop: "0.8rem",
            textAlign: "center",
            fontWeight: "bold",
            color: "#22c55e",
            animation: "pop 0.4s ease",
          }}
        >
          🎯 Daily Goal Completed!
        </div>
      )}

      <style>
        {`@keyframes pop { 0% { transform: scale(0.8); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }`}
      </style>
    </div>
  );
}
