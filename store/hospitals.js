import { get } from '../api/hospital'

export const state = () => ({
  items: [],
  isFiltered: null
})

export const mutations = {
  setItems (state, items) {
    state.items = items
  },
  setIsFiltered (state, data) {
    state.isFiltered = data
  }
}

export const actions = {
  getItems ({ state, commit }, options = { perPage: 999, fresh: false }) {
    if (!state.items || !state.items.length || options.fresh) {
      return get(options)
        .then((items) => {
          if (!state.isFiltered) { commit('setItems', items) }
          return items
        })
    }
  },
  setItems ({ commit }, data) {
    commit('setItems', data)
  },
  setIsFiltered ({ commit }, data) {
    commit('setIsFiltered', data)
  }
}
