import axios from 'axios'

const baseURL = process.env.NUXT_ENV_APP_MODE === 'production'
  ? process.env.ISOMAN_API_BASEURL
  : process.env.ISOMAN_API_BASEURL_STAGING
const isomanAPI = axios.create({
  baseURL
})

export {
  isomanAPI
}

export async function getTrackingResult (params) {
  try {
    const response = await isomanAPI.post('/tracking', params)
    return response.data
  } catch (e) {
    throw e
  }
}

export async function getCitiesResult () {
  try {
    const response = await isomanAPI.get('/cities')
    return response.data
  } catch (e) {
    throw e
  }
}
export async function getDistrictsResult (params) {
  try {
    const response = await isomanAPI({
      url: '/districts',
      method: 'GET',
      params
    })
    return response.data
  } catch (e) {
    throw e
  }
}
export async function getSubDistrictsResult (params) {
  try {
    const response = await isomanAPI({
      url: '/subdistricts',
      method: 'GET',
      params
    })
    return response.data
  } catch (e) {
    throw e
  }
}
export async function getTestLocationsResult () {
  try {
    const response = await isomanAPI({
      url: '/test-locations',
      method: 'GET'
    })
    return response.data
  } catch (e) {
    throw e
  }
}
export async function getTestTypesResult () {
  try {
    const response = await isomanAPI({
      url: '/test-types',
      method: 'GET'
    })
    return response.data
  } catch (e) {
    throw e
  }
}
export async function postVitaminRequest (data) {
  try {
    const response = await isomanAPI({
      url: '/request',
      method: 'POST',
      data
    })
    return response.data
  } catch (e) {
    return e
  }
}
export async function checkNikAvailability (data) {
  try {
    const response = await isomanAPI({
      url: '/nik-check',
      method: 'POST',
      data
    })
    return response.data
  } catch (e) {
    throw e
  }
}
