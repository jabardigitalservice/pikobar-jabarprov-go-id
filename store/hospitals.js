import { get } from '../api/hospital'

export const state = () => ({
  items: []
})

export const mutations = {
  setItems (state, items) {
    state.items = items
  }
}

export const actions = {
  getItems ({ state, commit }, options) {
    if (!state.items || !state.items.length) {
      return get(options)
        .then((items) => {
          commit('setItems', items)
          return state.items
        })
    }
    return state.items
  }
}
