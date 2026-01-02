
export default async function fetcher(url) {
    const res = await fetch(url, {
      cache: "no-store",
    });
  
    if (!res.ok) {
      throw new Error("Fetch error");
    }
  
    return res.json();
  }

  