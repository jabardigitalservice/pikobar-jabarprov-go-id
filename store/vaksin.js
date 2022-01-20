import {
  get,
  getSchedule as __getSchedule
} from '../api/vaksin'

export const state = () => ({
  items: null,
  schedule: null,
  offset: null
})

export const mutations = {
  setItems (state, items) {
    state.items = items
  },
  setSchedule (state, schedule) {
    state.schedule = schedule
  },
  setOffset (state, offset) {
    state.offset = offset
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
  async getSchedule ({ state, commit }, options = { params: null, setState: true }) {
    const response = await __getSchedule(options.params)
    if (options.setState) {
      response.records.sort(function compare (a, b) {
        const dateA = new Date(a.createdTime)
        const dateB = new Date(b.createdTime)
        return dateB - dateA
      })
      commit('setSchedule', response.records)
      commit('setOffset', response.offset)
    } else {
      return response.records
    }

    return state.schedule
  }
}
