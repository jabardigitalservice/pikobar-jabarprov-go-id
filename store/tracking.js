import { getTrackingResult } from '../api/isoman'

export const state = () => ({
  result: {},
  currentStatus: [],
  histories: []
})

export const mutations = {
  setResult (state, result) {
    const history = result.histories ? result.histories.reverse() : []
    const itemsHistory = history.splice(1)
    state.result = result
    state.histories = result.histories ? itemsHistory : []
    state.currentStatus = history
  }
}

export const actions = {
  async getTracking ({ commit }, params) {
    try {
      const result = await getTrackingResult(params)
      commit('setResult', result.status ? result : {})
    } catch (e) {
      commit('setResult', {})
    }
  }
}
