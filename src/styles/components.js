import { theme } from "./theme";

export const card = {
  background: theme.colors.card,
  borderRadius: theme.radius.lg,
  padding: "1rem",
  backdropFilter: "blur(12px)",
  boxShadow: theme.shadow.soft,
};

export const primaryButton = {
  padding: "0.8rem 1.4rem",
  borderRadius: theme.radius.md,
  border: "none",
  cursor: "pointer",
  background: theme.colors.primary,
  color: "#fff",
  fontWeight: 600,
};

export const secondaryButton = {
  padding: "0.8rem 1.2rem",
  borderRadius: theme.radius.md,
  border: "none",
  cursor: "pointer",
  background: "#f1f1f1",
};
