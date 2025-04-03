import { today, getLocalTimeZone } from '@internationalized/date'

export function getToday() {
  const currentDay = today(getLocalTimeZone())
  return {
    start: currentDay,
    end: currentDay
  }
}

export function getYesterday() {
  const yesterday = today(getLocalTimeZone()).subtract({ days: 1 })
  return {
    start: yesterday,
    end: yesterday
  }
}

export function getThisWeek() {
  const currentDay = today(getLocalTimeZone())

  const auxCurrentDay = new Date()
  const dayOfWeek = auxCurrentDay.getDay() // Devuelve 0 para domingo y 1 para lunes

  // Ajustar el cálculo para que la semana comience el lunes
  // Si es domingo (dayOfWeek === 0), restamos 6 días; en otro caso restamos (dayOfWeek - 1)
  const daysToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1
  const startOfWeek = currentDay.subtract({ days: daysToMonday })
  const endOfWeek = startOfWeek.add({ days: 6 })

  return {
    start: startOfWeek,
    end: endOfWeek
  }
}

export function getThisMonth() {
  const currentDay = today(getLocalTimeZone())
  const startOfMonth = currentDay.subtract({ days: currentDay.day - 1 })

  return {
    start: startOfMonth,
    end: currentDay
  }
}

export function getThisYear() {
  const currentDay = today(getLocalTimeZone())
  const startOfYear = currentDay.set({ month: 1, day: 1 })

  return {
    start: startOfYear,
    end: currentDay
  }
}

export function getLast7Days() {
  const currentDay = today(getLocalTimeZone())
  const last7Days = currentDay.subtract({ days: 6 })

  return {
    start: last7Days,
    end: currentDay
  }
}

export function getLast30Days() {
  const currentDay = today(getLocalTimeZone())
  const last30Days = currentDay.subtract({ days: 29 })

  return {
    start: last30Days,
    end: currentDay
  }
}
