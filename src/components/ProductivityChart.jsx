import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useMemo } from "react";

export default function ProductivityChart({ history }) {
  const data = useMemo(() => {
    return (history || []).slice(-7).map((item) => ({
      date: item.date.slice(0, 5),
      score: Math.max(0, 100 - (item.distractions || 0) * 10),
    }));
  }, [history]);

  return (
    <div style={{ marginTop: "1.5rem" }}>
      <h4>Focus Score Trend</h4>

      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Line type="monotone" dataKey="score" stroke="#8b5cf6" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
