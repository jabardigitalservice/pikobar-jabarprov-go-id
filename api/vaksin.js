import axios from 'axios'
import { db } from '../lib/firebase'

function convertToJSON (documentSnapshot) {
  const data = documentSnapshot.data()
  return {
    ...data,
    id: documentSnapshot.id
  }
}

export async function get () {
  const snapshots = await db
    .collection('vaccination_content_v2')
    .orderBy('order', 'asc')
    .get()

  if (snapshots.empty) {
    return []
  }
  return snapshots
    .docs
    /**
     * Convert FirebaseFirestore.DocumentSnapshot to POJO
     */
    .map(convertToJSON)
}

export async function getSchedule (params) {
  try {
    const baseURL = process.env.NUXT_ENV_AIRTABLE_URL
    const headers = { Authorization: `Bearer ${process.env.NUXT_ENV_AIRTABLE_API_KEY}` }
    const url = '/Informasi Vaksinasi Pikobar'

    const response = await axios.request({
      baseURL,
      headers,
      url,
      params,
      method: 'GET'
    })

    return response.data
  } catch (e) {
    throw e
  }
}
