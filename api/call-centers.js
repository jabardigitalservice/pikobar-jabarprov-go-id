import { db } from '../lib/firebase'

export function get (options = { perPage: 27 }) {
  let query = db.collection('call_centers')
    .orderBy('nama_kotkab', 'asc')

  if (options) {
    query = query.limit(options.perPage)
  }

  return query.get()
    .then((docs) => {
      if (!docs.empty) {
        return docs.docs.map(doc => doc.data())
      }
      return []
    }).then((items) => {
      return items
    })
}
