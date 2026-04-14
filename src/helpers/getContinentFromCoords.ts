//antarctica needs to go first otherwise it would get colonised by another continent
export function getContinentFromCoords(lat: number, lng: number) {
  if (lat <= -60) {
    return "antarctica";
  }
  if (lat >= 35 && lat <= 71 && lng >= -25 && lng <= 40) {
    return "europe";
  }
  if (lat >= -35 && lat <= 37 && lng >= -20 && lng <= 55) {
    return "africa";
  }
  if (lat >= 15 && lat <= 72 && lng >= -170 && lng <= -30) {
    return "north_america";
  }
  if (lat >= -55 && lat <= 15 && lng >= -90 && lng <= -30) {
    return "south_america";
  }
  if (lat >= -50 && lat <= 0 && lng >= 110 && lng <= 180) {
    return "oceania";
  }
  return "asia";
}
