export default function TimerDashboard({
  timeLeft,
  totalTime,
  mode,
  onModeChange,
}) {
  const progress = (timeLeft / totalTime) * 100;

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");

  const ringColor = mode === "focus" ? "#8b5cf6" : "#22c55e";

  return (
    <div style={{ marginBottom: "1.5rem" }}>
      {/* Mode Tabs */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "1rem",
          gap: "0.5rem",
        }}
      >
        {["focus", "break"].map((m) => (
          <button
            key={m}
            onClick={() => onModeChange(m)}
            style={{
              padding: "0.4rem 1rem",
              borderRadius: "20px",
              border: "none",
              cursor: "pointer",
              background: mode === m ? "#8b5cf6" : "#eee",
              color: mode === m ? "#fff" : "#555",
              fontWeight: "500",
            }}
          >
            {m === "focus" ? "Focus" : "Break"}
          </button>
        ))}
      </div>

      {/* Progress Ring */}
      <div
        style={{
          width: "240px",
          height: "240px",
          margin: "0 auto",
          borderRadius: "50%",
          background: `conic-gradient(
            ${ringColor} ${progress * 3.6}deg,
            #e9e5ff 0deg
          )`,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          transition: "all 0.25s ease",
        }}
      >
        <div
          style={{
            width: "190px",
            height: "190px",
            borderRadius: "50%",
            background: "#fff",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "inset 0 4px 10px rgba(0,0,0,0.05)",
          }}
        >
          <span style={{ fontSize: "3rem", fontWeight: "600" }}>
            {minutes}:{seconds}
          </span>

          <small style={{ color: "#888", marginTop: "0.4rem" }}>
            {mode === "focus" ? "Stay focused" : "Take a break"}
          </small>
        </div>
      </div>
    </div>
  );
}
