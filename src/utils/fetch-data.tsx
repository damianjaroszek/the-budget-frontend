// external function for fetching

type Obj = {
    method: "GET" | "POST" | "PUT" | "HEAD" | "DELETE" | "PATCH" | "OPTIONS",
    body?: string,
    headers?: { 'Content-Type': 'application/json' | 'text/html' },
}

export const fetchData = async (hostAddress: string, url: string, id = '', obj?: Obj) => {

    try {
        const res = await fetch(`${hostAddress}${url}/${id}`, obj);
        if (!res.ok) {
            const message = `Something wrong.`;
            throw new Error(message);
        }
        return await res.json();


    } catch (error) {
        return error;
    }
}
