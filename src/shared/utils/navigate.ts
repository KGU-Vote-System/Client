export const push = (path: string) =>
  (window.location.href = `${import.meta.env.VITE_PRODUCTION_URL + path}`);

export const replace = (path: string) =>
  window.location.replace(`${import.meta.env.VITE_PRODUCTION_URL + path}`);
