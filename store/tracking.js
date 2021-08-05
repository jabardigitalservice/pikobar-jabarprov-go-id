import { getTrackingResult } from '../api/tracking'

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
    const result = await getTrackingResult(params)
    commit('setResult', result.status ? result : {})
  }
}
