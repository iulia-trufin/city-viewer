import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { north, south, east, west } = req.query;
  if (!north || !south || !east || !west) {
    return res.status(400).json({ error: "Missing bounds" });
  }
  try {
    const response = await fetch(
      `http://api.geonames.org/citiesJSON?north=${north}&south=${south}&east=${east}&west=${west}&lang=en&username=iuliatrufin`,
    );

    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    console.error("GeoNames proxy failed:", error);
    res.status(500).json({ error: "Failed to fetch map cities data" });
  }
}
