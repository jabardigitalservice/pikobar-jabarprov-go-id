import { db } from '~/lib/firebase'

export const state = () => ({
  items: null
})

export const mutations = {
  setItems (state, items) {
    state.items = items
  }
}

export const actions = {
  getItems ({ state, commit }, options) {
    if (!state.items || !state.items.length) {
      let query = db.collection('call_centers')
        .orderBy('nama_kotkab', 'asc')

      if (options) {
        query = query.limit(options.perPage)
      }
      // TODO: move to "~/api"
      return query.get()
        .then((docs) => {
          if (!docs.empty) {
            return docs.docs.map(doc => doc.data())
          }
          return []
        }).then((items) => {
          commit('setItems', items)
          return state.items
        })
    }
    return Promise.resolve(state.items)
  }
}
