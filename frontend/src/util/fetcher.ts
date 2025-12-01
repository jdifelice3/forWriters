export async function typedFetcher<T>(url: string): Promise<T> {
  const res = await fetch(url, { credentials: "include" });

  const json = await res.json();

  //console.log("FETCH RAW:", url, json);

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

  return json as T;
}
