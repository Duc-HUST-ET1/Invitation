import { adventureConfig as config } from "../config"

function parseDate(value: string): Date | null {
  const isoDate = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value)

  const localizedDate = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(value)

  const match = isoDate ?? localizedDate

  if (!match) return null

  const year = Number(isoDate ? match[1] : match[3])

  const month = Number(isoDate ? match[2] : match[2])

  const day = Number(isoDate ? match[3] : match[1])

  const date = new Date(year, month - 1, day)

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null
  }

  return date
}

function parseTime(value: string): { hours: number; minutes: number } | null {
  const match = /^(\d{1,2}):(\d{2})(?:\s*(AM|PM))?$/i.exec(value.trim())

  if (!match) return null

  let hours = Number(match[1])

  const minutes = Number(match[2])

  const meridiem = match[3]?.toUpperCase()

  if (
    minutes > 59 ||
    hours > (meridiem ? 12 : 23) ||
    hours < (meridiem ? 1 : 0)
  )
    return null

  if (meridiem) hours = (hours % 12) + (meridiem === "PM" ? 12 : 0)

  return { hours, minutes }
}

export function isCalendarDateConfigured(
  dateValue: string,
  timeValue: string,
): boolean {
  return parseDate(dateValue) !== null && parseTime(timeValue) !== null
}

export function getGoogleCalendarUrl(): string | null {
  const date = parseDate(config.date)
  const time = parseTime(config.time)
  if (!date || !time) return null

  const start = new Date(date)
  start.setHours(time.hours, time.minutes, 0, 0)
  const end = new Date(start.getTime() + 3 * 60 * 60 * 1000)
  const pad = (value: number) => String(value).padStart(2, "0")
  const format = (value: Date) =>
    `${value.getFullYear()}${pad(value.getMonth() + 1)}${pad(value.getDate())}T${pad(value.getHours())}${pad(value.getMinutes())}00`
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: config.dateActivity,
    dates: `${format(start)}/${format(end)}`,
    ctz: "Asia/Ho_Chi_Minh",
    details: config.personalNote,
    location: `${config.venueName}, ${config.venueAddress}`,
  })
  return `https://calendar.google.com/calendar/render?${params.toString()}`
}
