// TODO: might be wise to move this to "~/lib"

/**
 * @param   {any} value
 * @returns {boolean}
 */
export function isPhoneURL (value) {
  return typeof value === 'string' &&
    value.startsWith('tel://')
}

/**
 * @param   {string} value
 * @returns {string | undefined} phone URL (tel://\<number>)
 */
export function toPhoneURL (value) {
  if (isPhoneURL(value)) {
    return value
  }

  const types = {
    string: value,
    number: `${value}`
  }
  const num = types[typeof value]
  if (!num) {
    console.warn(`Invalid phone url. Expected string or number, got ${num}`)
    return
  }
  const trimmed = num.replace(/^\s+|\s+$|\s+(?=\s)/g, '')
  return `tel://${encodeURIComponent(trimmed)}`
}

/**
 * NOTES:
 * falsy values will be transformed into empty array
 * @param   {any} value
 * @returns {Array<any>}
 */
export function toArray (value) {
  // if falsy, e.g null, undefined, '', 0
  if (!value) {
    return []
  }
  // if not falsy, e.g 'abc', 123
  // => ['abc'], [123]
  if (!Array.isArray(value)) {
    return [value]
  }

  // if an array, return itself
  return value
}
