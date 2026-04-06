import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const response = await fetch(
      "http://api.geonames.org/countryInfoJSON?username=iuliatrufin",
    );

    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    console.error("GeoNames proxy failed:", error);
    res.status(500).json({ error: "Failed to fetch GeoNames data" });
  }
}
