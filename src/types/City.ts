export type CityType = "Primary" | "Capital" | "Town" | "Minor";

export type City = {
  cityName: string;
  lat: number;
  lon: number;
  country: string;
  countryIso2: string;
  countryIso3: string;
  type: CityType;
  population: number;
};
