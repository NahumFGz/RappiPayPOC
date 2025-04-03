export const endStringDateFrom = 'T00:00:00-05:00'
export const endStringDateTo = 'T23:59:59.999999-05:00'

//! formatYYYYMMDD para lateral filter
export function formatYYYYMMDD(date) {
  if (!date) return null
  const year = date.year
  const month = String(date.month).padStart(2, '0')
  const day = String(date.day).padStart(2, '0')

  return `${year}-${month}-${day}`
}

//! para formatear los request de fechas
export function convertShortLocalTime(dateString) {
  const date = new Date(dateString)

  const options = {
    timeZone: 'America/Lima',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }

  const formattedDate = new Intl.DateTimeFormat('es-PE', options).format(date)
  return formattedDate
}

export function convertLongLocalTime(dateString) {
  const date = new Date(dateString)

  const options = {
    timeZone: 'America/Lima',
    year: 'numeric',
    month: 'long',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  }

  const formattedDate = new Intl.DateTimeFormat('es-PE', options).format(date)
  return formattedDate
}

export function formatLocalYYYYMMDD(dateString) {
  const shortLocalTime = convertShortLocalTime(dateString)
  const [day, month, year] = shortLocalTime.split(', ')[0].split('/')
  return `${year}-${month}-${day}`
}

export function formatLocalHHMM(dateString) {
  const longLocalTime = convertShortLocalTime(dateString)

  const [, timePart] = longLocalTime.split(', ')
  const [hour, minute] = timePart.split(':')
  const hourInt = parseInt(hour, 10)
  const period = hourInt >= 12 ? 'pm' : 'am'

  const formattedHour = hourInt === 0 ? 12 : hourInt > 12 ? hourInt - 12 : hourInt

  return `${formattedHour}:${minute} ${period}`
}

export function formatLocalYYYYMMDDHHMM(dateString) {
  const shortLocalTime = convertShortLocalTime(dateString)
  const [day, month, year] = shortLocalTime.split(', ')[0].split('/')
  const [, timePart] = shortLocalTime.split(', ')
  const [hour, minute] = timePart.split(':')
  const hourInt = parseInt(hour, 10)
  const period = hourInt >= 12 ? 'pm' : 'am'

  const formattedHour = hourInt === 0 ? 12 : hourInt > 12 ? hourInt - 12 : hourInt

  return `${year}-${month}-${day} ${formattedHour}:${minute} ${period}`
}
