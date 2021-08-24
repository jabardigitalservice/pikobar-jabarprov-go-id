import axios from 'axios'

const isomanAPI = axios.create({
  baseURL: process.env.ISOMAN_API_BASEURL
})

export {
  isomanAPI
}

export async function getTrackingResult (params) {
  try {
    const response = await isomanAPI.post('/track', params)
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
