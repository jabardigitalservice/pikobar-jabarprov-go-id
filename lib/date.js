import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import moment from 'moment'

export function formatDateLong (date, formatStr = 'eeee, PP') {
  return format(date, formatStr, {
    locale: id
  })
}

export function formatDateShort (date, formatStr = 'eeee, PP') {
  return format(date, formatStr, {
    locale: id
  })
}

export function formatDateTimeShort (date, formatStr = 'eeee, PP p') {
  return format(date, formatStr, {
    locale: id
  })
}

export function formatTime (date, formatStr = 'p') {
  return format(date, formatStr, {
    locale: id
  })
}

export function formatDateDayIndonesia (date, formatStr = 'YYYY-MM-DD') {
  return moment(date, formatStr).locale('id').format('dddd, DD MMM YYYY')
}

export function formatDateIndonesia (date, format) {
  return moment(date).locale('id').format(format || 'DD MMMM YYYY')
}

export function formatDateIndonesiaShort (date) {
  return moment(date).locale('id').format('DD MMM YYYY')
}
