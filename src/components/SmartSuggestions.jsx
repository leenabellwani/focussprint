import { useMemo } from "react";

export default function SmartSuggestions({ history }) {
  const insights = useMemo(() => {
    if (!history || history.length === 0) return [];

    const last7 = history.slice(-7);

    const avgDistractions =
      last7.reduce((sum, s) => sum + (s.distractions || 0), 0) / last7.length;

    const suggestions = [];

    if (avgDistractions > 3) {
      suggestions.push("You get distracted often. Try shorter focus sessions.");
    }

    if (avgDistractions < 2) {
      suggestions.push("Great focus! You can increase session length.");
    }

    const mostActiveDay = last7.reduce((acc, curr) => {
      acc[curr.date] = (acc[curr.date] || 0) + 1;
      return acc;
    }, {});

    const bestDay = Object.entries(mostActiveDay).sort(
      (a, b) => b[1] - a[1]
    )[0];

    if (bestDay) {
      suggestions.push(`You are most productive on ${bestDay[0]}`);
    }

    return suggestions;
  }, [history]);

  return (
    <div style={{ marginTop: "1.5rem" }}>
      <h4>Smart Insights</h4>

      {insights.map((text, i) => (
        <div
          key={i}
          style={{
            background: "#f3f0ff",
            padding: "0.7rem",
            borderRadius: "10px",
            marginBottom: "0.5rem",
            fontSize: "0.9rem",
          }}
        >
          💡 {text}
        </div>
      ))}
    </div>
  );
}
