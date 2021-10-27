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
    return get(options)
      .then((items) => {
        commit('setItems', items)
        return state.items
      })
  }
}
