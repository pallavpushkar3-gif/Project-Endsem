export default async function handler(req, res) {
  const { q } = req.query;
 
  if (!q) {
    return res.status(400).json({ status: "error", message: "Missing query parameter" });
  }
 
  // Prefer the env var; fall back to the (already-public) dev key so the
  // deployed function still works if the env var hasn't been set in Vercel yet.
  const API_KEY = process.env.NEWS_API_KEY || "1d3a0eefa97b499d8fbc4ee93eeb40b7";
 
  if (!API_KEY) {
    return res.status(500).json({ status: "error", message: "Server misconfigured: missing API key" });
  }
 
  const apiUrl = `https://newsapi.org/v2/everything?q=${encodeURIComponent(q)}&apiKey=${API_KEY}`;
 
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
 
    // Cache at Vercel's edge for 10 min, serve stale for up to 59s while revalidating.
    // This means many visitors share the same cached response instead of each
    // triggering a fresh NewsAPI call -- helps a lot with the free-tier rate limit.
    res.setHeader("Cache-Control", "s-maxage=600, stale-while-revalidate=59");
    res.status(response.status).json(data);
  } catch (err) {
    res.status(500).json({ status: "error", message: "Failed to fetch news" });
  }
}