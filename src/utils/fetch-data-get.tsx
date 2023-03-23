export const fetchDataGet = async (hostAddress: string, url: string) => {
    const res = await fetch(`${hostAddress}${url}`);
    const data = await res.json();
    return data;
}
