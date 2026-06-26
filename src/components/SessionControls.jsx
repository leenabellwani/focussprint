import { primaryButton, secondaryButton } from "../styles/components";

export default function SessionControls({
  onStart,
  onPause,
  onReset,
  isRunning,
}) {
  const primary = {
    padding: "0.8rem 1.6rem",
    borderRadius: "14px",
    border: "none",
    cursor: "pointer",
    background: "#8b5cf6",
    color: "#fff",
    fontWeight: "600",
  };

  const secondary = {
    padding: "0.8rem 1.2rem",
    borderRadius: "14px",
    border: "none",
    cursor: "pointer",
    background: "#f1f1f1",
    color: "#555",
  };

  return (
    <div style={{ display: "flex", gap: "0.8rem", justifyContent: "center" }}>
      <button style={primaryButton}>Start</button>
      <button style={secondaryButton}>Reset</button>
    </div>
  );
}
