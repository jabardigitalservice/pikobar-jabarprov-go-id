import { db } from '../lib/firebase'

export function getInfo () {
  return db.collection('self_isolation_info')
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
