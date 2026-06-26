export default function DailySummary({ history }) {
  return (
    <div style={{ marginTop: "1rem" }}>
      <h3>Recent Sessions</h3>
      {history.slice(-5).map((item, index) => (
        <div key={index}>{item.date}</div>
      ))}
    </div>
  );
}
