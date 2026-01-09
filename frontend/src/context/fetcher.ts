export const fetcher = async <T>(url: string): Promise<T> => {
    const res = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
    });
    if (!res.ok) throw new Error(await res.text());
        
    return res.json() as Promise<T>;
};