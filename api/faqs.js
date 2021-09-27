import { db } from '../lib/firebase'

export function get (options) {
  return db.collection('faqs')
    .orderBy('sequence_number', 'asc')
    .get()
    .then((docs) => {
      if (!docs.empty) {
        return docs.docs.map((doc) => {
          const data = doc.data()
          return {
            id: doc.id,
            ...data
          }
        })
      }
      return []
    })
}

export function getFaqCategories (options) {
  return db.collection('faq_categories')
    .get()
    .then((docs) => {
      if (!docs.empty) {
        return docs.docs.map((doc) => {
          const data = doc.data()
          return {
            id: doc.id,
            ...data
          }
        })
      }
      return []
    })
}
