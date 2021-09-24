import { get } from '../api/vaksin'

export const state = () => ({
  items: null
})

export const mutations = {
  setItems (state, items) {
    state.items = items
  }
}

export const actions = {
  async getItems ({ state, commit }) {
    /**
     * This checking is required to prevent re-hydration
     * on client renders.
     */
    if (!Array.isArray(state.items) || !state.items.length) {
      const items = await get()
      commit('setItems', items)
    }
    return state.items
  }
}
