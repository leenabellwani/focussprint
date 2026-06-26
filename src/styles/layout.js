import { theme } from "./theme";

export const pageContainer = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: `linear-gradient(135deg, ${theme.colors.bg}, #eef2ff)`,
  padding: "1rem",
};

export const appCard = {
  width: "min(480px, 95vw)",
  padding: "2rem",
  borderRadius: theme.radius.lg,
  background: theme.colors.card,
  backdropFilter: "blur(20px)",
  boxShadow: theme.shadow.strong,
  textAlign: "center",
};
