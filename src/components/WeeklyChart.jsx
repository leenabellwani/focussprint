import { useMemo } from "react";

export default function WeeklyChart({ history }) {
  const data = useMemo(() => {
    const days = [];
    const today = new Date();
    const safeHistory = history || [];

    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(today.getDate() - i);

      const label = d.toLocaleDateString(undefined, { weekday: "short" });
      const dateStr = d.toLocaleDateString();

      const count = safeHistory.filter((h) => h.date === dateStr).length;

      days.push({ label, count });
    }

    return days;
  }, [history]);

  return (
    <div style={{ marginTop: "1.5rem" }}>
      <h4 style={{ marginBottom: "0.5rem" }}>Weekly Progress</h4>

      <div style={{ display: "flex", gap: "8px", alignItems: "flex-end" }}>
        {data.map((d, i) => (
          <div key={i} style={{ textAlign: "center", flex: 1 }}>
            <div
              style={{
                height: `${d.count * 20}px`,
                background: "#8b5cf6",
                borderRadius: "6px",
                transition: "all 0.25s ease",
              }}
            />
            <small>{d.label}</small>
          </div>
        ))}
      </div>
    </div>
  );
}
