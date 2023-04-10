/**
 * Converts an HTML time input value (hh:mm) to a JavaScript Date object
 * @param {string} timeString - HTML time input element (e.g. hh:mm or 14:30)
 * @returns {Date} - Date object with set to current date & input hours.
 */
export function timeStringToDate(timeString) {
  const [hours, minutes] = timeString.split(":")
  const date = new Date
  date.setHours(hours, minutes)
  return date;
}
