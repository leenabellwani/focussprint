import { useMemo } from "react";

export default function StreakHeatmap({ history }) {
  const data = useMemo(() => {
    const map = {};
    (history || []).forEach((item) => {
      map[item.date] = (map[item.date] || 0) + 1;
    });

    const days = [];
    const today = new Date();

    for (let i = 29; i >= 0; i--) {
      const d = new Date();
      d.setDate(today.getDate() - i);

      const key = d.toLocaleDateString();
      const count = map[key] || 0;

      days.push({ date: key, count });
    }

    return days;
  }, [history]);

  const getColor = (count) => {
    if (count === 0) return "#eee";
    if (count < 2) return "#c4b5fd";
    if (count < 4) return "#8b5cf6";
    return "#5b21b6";
  };

  return (
    <div style={{ marginTop: "1.5rem" }}>
      <h4>Streak Heatmap</h4>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(10, 1fr)",
          gap: "4px",
        }}
      >
        {data.map((d, i) => (
          <div
            key={i}
            title={`${d.date} - ${d.count} sessions`}
            style={{
              width: "100%",
              paddingBottom: "100%",
              background: getColor(d.count),
              borderRadius: "4px",
            }}
          />
        ))}
      </div>
    </div>
  );
}
