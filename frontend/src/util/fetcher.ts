import { getSessionRequestSignal } from "../auth/sessionScope";

export async function typedFetcher<T>(url: string): Promise<T> {
  const res = await fetch(url, {
    credentials: "include",
    signal: getSessionRequestSignal(),
  });

  if (res.status === 401) {
    const err = new Error("Unauthorized");
    (err as any).status = 401;
    throw err;
  }

  if (!res.ok) {
    const err = new Error(`Failed to fetch ${url}`);
    (err as any).status = res.status;
    throw err;
  }

  return res.json() as Promise<T>;
}
