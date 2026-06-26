const card = {
  background: "rgba(255,255,255,0.6)",
  padding: "1rem",
  borderRadius: "16px",
  backdropFilter: "blur(10px)",
};

export default function SessionAnalytics({
  sessionsCompleted,
  focusScore,
  streak,
  sessionDistractions,
}) {
  return (
    <div
      style={{
        marginTop: "1.5rem",
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "0.8rem",
      }}
    >
      <div style={card}>
        <div>Sessions</div>
        <strong>{sessionsCompleted}</strong>
      </div>

      <div style={card}>
        <div>Focus</div>
        <strong>{focusScore}%</strong>
      </div>

      <div style={card}>
        <div>Streak</div>
        <strong>{streak}</strong>
      </div>

      <div style={card}>
        <div>Distractions</div>
        <strong>{sessionDistractions}</strong>
      </div>
    </div>
  );
}
