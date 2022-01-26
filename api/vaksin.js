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
    let additionalFormula = ''

    if (params.filterByFormula) {
      params.filterByFormula.forEach((item) => {
        additionalFormula = additionalFormula.concat(',', item)
      })
    }

    params.filterByFormula = `AND({F2. Status Production}="Ready to publish",{F1. Verification}="1"${additionalFormula})`
    let offset = null
    let scheduleList = []

    // this loop is necessary because airtable API provides max 100 row data per request
    do {
      params.offset = offset

      const response = await axios.request({
        baseURL,
        headers,
        url,
        params,
        method: 'GET'
      })

      scheduleList = [...scheduleList, ...response.data.records]
      offset = response.data.offset ?? null
    } while (offset)

    return scheduleList
  } catch (e) {
    throw e
  }
}
