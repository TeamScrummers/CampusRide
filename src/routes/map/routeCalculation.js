import { PUBLIC_MAPBOX_TOKEN } from '$env/static/public'

/**
 * Parses a string representing a coordinate to an array of numbers.
 * @param {string} coordinateString - The string representing the coordinate (e.g. "42.7132,-71.2161").
 * @returns {Array<number>} - The coordinate as an array of numbers (e.g. [42.7132, -71.2161]).
 */
export function parseCoordinate(coordinateString) {
    if (typeof coordinateString === 'string') {
        coordinateString = coordinateString.split(",").map(parseFloat);
    }
    return coordinateString
}

/**
 * Calculates the total driving distance and estimated time between two coordinates using Mapbox API.
 * @param {Array<number> | string} startCoordinates - The starting coordinates as [longitude, latitude].
 * @param {Array<number> | string} endCoordinates - The ending coordinates as [longitude, latitude].
 * @returns {Promise<{distance: number, duration: number}>} - The total distance in miles and estimated driving time in minutes.
 */
export async function getDriveDistanceAndTime(startCoordinates, endCoordinates) {
    startCoordinates = parseCoordinate(startCoordinates)
    endCoordinates = parseCoordinate(endCoordinates)
    
    const apiUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${startCoordinates};${endCoordinates}?access_token=${PUBLIC_MAPBOX_TOKEN}`
    const response = await fetch(apiUrl)
    const data = await response.json()
    const { distance, duration } = data.routes[0].legs[0]
    return { distance: distance / 1609.344, duration: duration / 60 }
}

/**
 * Calculates the driving distance between two coordinates using Mapbox API.
 * @param {Array<number> | string} startCoordinates - The starting coordinates as [longitude, latitude].
 * @param {Array<number> | string} endCoordinates - The ending coordinates as [longitude, latitude].
 * @returns {Promise<number>} - The total distance in miles.
 */
export async function getDriveDistance(startCoordinates, endCoordinates) {
    startCoordinates = parseCoordinate(startCoordinates)
    endCoordinates = parseCoordinate(endCoordinates)
    const apiUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${startCoordinates};${endCoordinates}?access_token=${PUBLIC_MAPBOX_TOKEN}`
    const response = await fetch(apiUrl)
    const data = await response.json()
    const distance = data.routes[0].legs[0].distance / 1609.344
    return distance
}

/**
 * Calculates the estimated driving time between two coordinates using Mapbox API.
 * @param {Array<number> | string} startCoordinates - The starting coordinates as [longitude, latitude].
 * @param {Array<number> | string} endCoordinates - The ending coordinates as [longitude, latitude].
 * @returns {Promise<number>} - The estimated driving time in minutes.
 */
export async function getDriveTime(startCoordinates, endCoordinates) {
    startCoordinates = parseCoordinate(startCoordinates)
    endCoordinates = parseCoordinate(endCoordinates)
    const apiUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${startCoordinates};${endCoordinates}?access_token=${PUBLIC_MAPBOX_TOKEN}`
    const response = await fetch(apiUrl)
    const data = await response.json()
    const duration = data.routes[0].legs[0].duration / 60
    return duration
}

/**
 * Retrieves the approximate address of a given coordinate using the Mapbox API for reverse geocoding.
 * @param {Array<number> | string} coordinates - The coordinates as [longitude, latitude].
 * @returns {Promise<string>} - The approximate address of the given coordinates.
 */
export async function getAddress(coordinates) {
    coordinates = parseCoordinate(coordinates)

    const apiUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${coordinates[0]},${coordinates[1]}.json?access_token=${PUBLIC_MAPBOX_TOKEN}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.features[0].place_name;
  }

  
/**
 * Geocodes an address and returns its coordinates using Mapbox API.
 * @param {string} address - The address to geocode.
 * @returns {Promise<Array<number>>} - The coordinates as [longitude, latitude].
 */
export async function geocodeAddress(address) {
    const apiUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${PUBLIC_MAPBOX_TOKEN}`
    const response = await fetch(apiUrl)
    const data = await response.json()
    const [longitude, latitude] = data.features[0].center
    return [longitude, latitude]
}
  