export function getAdaptiveSessionTime(distractions) {
  if (distractions >= 5) return 15 * 60;
  if (distractions >= 3) return 20 * 60;
  return 25 * 60;
}
