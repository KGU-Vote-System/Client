export const fetchSessionData = <T = unknown>(key: string): T | null => {
  const stored = sessionStorage.getItem(key);
  if (stored) {
    const parsed = JSON.parse(stored);
    return parsed;
  }
  return null;
};
