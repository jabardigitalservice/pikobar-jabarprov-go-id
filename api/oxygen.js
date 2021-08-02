import axios from 'axios'
import { db } from '../lib/firebase'

const OxygenApi = axios.create({
  baseURL: process.env.NUXT_ENV_OXYGEN_CENTER_BASE_URL
})

export {
  OxygenApi
}

export async function getCollectedDistrict (config = {}) {
  const data = await OxygenApi.get('prest/public/district', config)
    .then((r) => {
      return r.data
    }).catch((e) => {
      return []
    })
  return {
    data
  }
}

export async function getCollectedSubDistrict ({ params }) {
  params = {
    _order: '-subdistrict.id',
    _select: 'subdistrict.district_code,district_name,subdistrict_code,subdistrict_name',
    _join: 'inner:district:district.district_code:$eq:subdistrict.district_code',
    'subdistrict.district_code': '$eq.' + params.district_code
  }
  const data = await OxygenApi.get('prest/public/subdistrict', { params })
    .then((r) => {
      return r.data
    }).catch((e) => {
      return []
    })
  return {
    data
  }
}

export async function get ({ params }) {
  const data = await OxygenApi.get('_QUERIES/oxygen/list', { params })
    .then((r) => {
      return r.data
    }).catch((e) => {
      return []
    })
  return {
    data
  }
}

export async function getTotal () {
  const data = await OxygenApi.get('/prest/public/oxygen_center?_count=id')
    .then((r) => {
      return r.data
    }).catch((e) => {
      return []
    })
  return {
    data
  }
}

export function getInfo () {
  return db.collection('oxygen_info')
    .orderBy('sequence_number', 'asc')
    .get()
    .then((docs) => {
      if (!docs.empty) {
        return docs.docs.map((doc) => {
          const data = doc.data()
          return {
            ...data,
            id: doc.id
          }
        })
      }
      return []
    })
}
