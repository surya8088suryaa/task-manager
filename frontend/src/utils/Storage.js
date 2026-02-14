const KEY = "tm_auth"; //localStorage key -> token stored

export const setAuth = (auth) => {
  localStorage.setItem(KEY, JSON.stringify(auth));
};

export const getAuth = () => {
  const raw = localStorage.getItem(KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

export const clearAuth = () => {
  localStorage.removeItem(KEY);
};