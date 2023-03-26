type Obj = {
    method: "GET" | "POST" | "PUT" | "HEAD" | "DELETE" | "PATCH" | "OPTIONS",
    body: string,
    headers: { 'Content-Type': 'application/json' },
}

export const fetchData = async (hostAddress: string, url: string, obj?: Obj) => {
    const res = await fetch(`${hostAddress}${url}`, obj);
    const data = await res.json();
    return data;
}
