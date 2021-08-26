import { db } from '../lib/firebase'
import { slufigyDocumentRoute } from '../lib/slugify'

export const ORDER_INDEX = 'published_at'
export const ORDER_TYPE = 'desc'

export async function get (options = { lastSnapshot: null }) {
  let query = db.collection('documents')
    .where('published', '==', true)
    .orderBy(ORDER_INDEX, 'desc')
    .limit(options.limit || 8)
  if (options.lastSnapshot) {
    query = query.startAfter(options.lastSnapshot)
  }
  const [data, lastSnapshot] = await query
    .get()
    .then((snapshots) => {
      let data = []
      let lastSnapshot = null
      if (!snapshots.empty) {
        lastSnapshot = snapshots.docs[snapshots.docs.length - 1].data().published_at
        data = snapshots.docs.map((doc) => {
          const data = doc.data()
          const route = slufigyDocumentRoute(doc.id, data.title)
          return {
            ...data,
            id: doc.id,
            published_at: data.published_at.toDate(),
            route,
            shareText: `[Pikobar] Bagikan "${data.title}". Selengkapnya di ${process.env.URL}${route}`
          }
        })
      }
      return [data, lastSnapshot]
    })

  return {
    data,
    lastSnapshot
  }
}

export function getById (id) {
  return db.collection('documents')
    .doc(id)
    .get()
    .then((doc) => {
      if (doc.exists) {
        const data = doc.data()
        const route = slufigyDocumentRoute(doc.id, data.title)
        return {
          ...data,
          id: doc.id,
          published_at: data.published_at.toDate(),
          route,
          shareText: `[Pikobar] Bagikan "${data.title}". Selengkapnya di ${process.env.URL}${route}`
        }
      }
      return null
    })
}
