/**
 * Haversine formula — returns distance in km between two lat/lng points.
 */
export function haversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371 // Earth radius in km
  const dLat = toRad(lat2 - lat1)
  const dLon = toRad(lon2 - lon1)
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

function toRad(deg) {
  return (deg * Math.PI) / 180
}

/**
 * Sort an array of stations by distance from a given lat/lng.
 * Stations must have `latitude` and `longitude` fields.
 */
export function sortByDistance(stations, userLat, userLng) {
  return [...stations].sort((a, b) => {
    const distA = haversineDistance(userLat, userLng, a.latitude, a.longitude)
    const distB = haversineDistance(userLat, userLng, b.latitude, b.longitude)
    return distA - distB
  })
}

/**
 * Format distance for display.
 */
export function formatDistance(km) {
  if (km < 1) return `${Math.round(km * 1000)}m away`
  return `${km.toFixed(1)}km away`
}

/**
 * Get the user's current location via browser geolocation API.
 * Returns a Promise that resolves to { lat, lng }.
 */
export function getUserLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation not supported by this browser'))
      return
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      (err) => reject(err),
      { timeout: 10000 }
    )
  })
}
