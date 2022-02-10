import { getTrackingResult } from '../api/isoman'

export const state = () => ({
  result: {}
})

export const mutations = {
  setResult (state, result) {
    state.result = result
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
