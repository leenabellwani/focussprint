export default function TimerDashboard({ timeLeft, sessionType }) {
  return (
    <div>
      <h1>{sessionType}</h1>
      <h2>{timeLeft}</h2>
    </div>
  );
}
