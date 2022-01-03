import {
  get,
  getVaccinationSchedule as __getSchedule
} from '../api/vaksin'

export const state = () => ({
  items: null,
  schedule: null
})

export const mutations = {
  setItems (state, items) {
    state.items = items
  },
  setSchedule (state, schedule) {
    state.schedule = schedule
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
  },
  async getSchedule ({ state, commit }) {
    if (!state.schedule) {
      const schedule = await __getSchedule()
      commit('setSchedule', schedule)
    }
    return state.schedule
  }
}
