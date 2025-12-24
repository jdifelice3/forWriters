const API_BASE_URL = import.meta.env.VITE_API_HOST
  ? `${import.meta.env.VITE_API_HOST}/api`
  : "/api"; // fallback for dev / proxy setups

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
  contentType: string = "application/json"
): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    credentials: "include",
    headers: {
      "Content-Type": contentType,
      ...options.headers,
    },
    ...options,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || res.statusText);
  }

  return res.json();
}
