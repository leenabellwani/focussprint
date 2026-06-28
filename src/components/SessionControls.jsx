import { primaryButton, secondaryButton } from "../styles/components";

export default function SessionControls({
  onStart,
  onPause,
  onReset,
  isRunning,
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: "1rem",
        marginTop: "1.5rem",
      }}
    >
      <button onClick={isRunning ? onPause : onStart} style={primaryButton}>
        {isRunning ? "Pause" : "Start"}
      </button>

      <button onClick={onReset} style={secondaryButton}>
        Reset
      </button>
    </div>
  );
}
