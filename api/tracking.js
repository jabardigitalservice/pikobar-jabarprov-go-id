import axios from 'axios'

const trackingAPI = axios.create({
  baseURL: process.env.ISOMAN_API_BASEURL
})

export {
  trackingAPI
}

export async function getTrackingResult (params) {
  try {
    const response = await trackingAPI.post('/track', params)
    return response.data
  } catch (error) {
    return error
  }
}
