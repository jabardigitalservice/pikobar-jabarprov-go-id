import { db } from '../lib/firebase'

function convertToJSON (documentSnapshot) {
  const data = documentSnapshot.data()
  return {
    ...data,
    published_at: data.published_at.toDate(),
    id: documentSnapshot.id
  }
}

export async function get () {
  const snapshots = await db
    .collection('vaccination_content')
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

export async function getVaccinationSchedule () {
  const document = await db.collection('iframes')
    .doc('airtable-jadwal-vaksinasi-jabar')
    .get()
    .then((doc) => {
      if (doc.exists) {
        return {
          id: doc.id,
          ...doc.data()
        }
      }
    })
  return document
}
