import { useMemo } from "react";

export default function WeeklyReport({ history }) {
  const report = useMemo(() => {
    const last7 = history.slice(-7);

    const totalSessions = last7.length;

    const totalDistractions = last7.reduce(
      (sum, s) => sum + (s.distractions || 0),
      0
    );

    const avgDistractions =
      totalSessions > 0 ? (totalDistractions / totalSessions).toFixed(1) : 0;

    const bestDay = last7.reduce((best, curr) => {
      if (!best || (curr.distractions || 0) < (best.distractions || 999)) {
        return curr;
      }
      return best;
    }, null);

    return {
      totalSessions,
      avgDistractions,
      bestDay,
    };
  }, [history]);

  return (
    <div style={{ marginTop: "1.5rem" }}>
      <h4>Weekly Report</h4>

      <p>📊 Sessions: {report.totalSessions}</p>
      <p>⚡ Avg Distractions: {report.avgDistractions}</p>
      <p>🏆 Best Session Day: {report.bestDay ? report.bestDay.date : "N/A"}</p>
    </div>
  );
}
