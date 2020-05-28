import axios from 'axios'
import { storage } from '../lib/firebase'

const WMSApi = axios.create({
  baseURL: process.env.WMS_BASE_URL,
  headers: {
    'api-key': process.env.WMS_API_KEY
  }
})

export {
  WMSApi
}

export async function getCollectedDonations (config = {}) {
  const data = await WMSApi.get('master/material', config)
    .then((r) => {
      return r.data.data
    }).catch((e) => {
      return []
    })
  const total = await WMSApi.get('master/material', {
    params: {
      count: true
    }
  }).then((r) => {
    return r.data.data.count
  })
  return {
    total,
    data
  }
}

export async function getLogistics (config = {}) {
  const data = await WMSApi.get('api/logistik', config)
    .then((r) => {
      return r.data.data
    }).catch((e) => {
      return []
    })

  const total = await WMSApi.get('api/logistik', {
    params: {
      search: config.params.search,
      where: config.params.where,
      count: true
    }
  }).then((r) => {
    return r.data.data.count
  })
  return {
    total,
    data
  }
}
export async function uploadDocument (file) {
  const timestamp = Number(new Date())
  const storageRef = await storage.ref('donation-documents/' + timestamp.toString())
    .put(file)
    .then(async function (snapshot) {
      return await snapshot.ref.getDownloadURL().then(function (downloadURL) {
        return downloadURL
      })
    })
  return storageRef
}
