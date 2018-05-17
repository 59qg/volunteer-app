export function setCache(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getCache(key) {
  return JSON.parse(localStorage.getItem(key));
}

export function clearCache(key) {
  localStorage.removeItem(key);
}