import { getCitiesResult, getDistrictsResult, getSubDistrictsResult } from '../api/isoman'

export const state = () => ({
  cities: [],
  districts: [],
  subDistricts: []
})

export const mutations = {
  SET_CITIES (state, result) {
    state.cities = result
  },
  SET_DISTRICTS (state, result) {
    state.districts = result
  },
  DELETE_DISTRICTS (state) {
    state.districts = []
  },
  SET_SUB_DISTRICTS (state, result) {
    state.subDistricts = result
  },
  DELETE_SUB_DISTRICTS (state) {
    state.subDistricts = []
  }
}

export const actions = {
  async getCities ({ commit }, params) {
    const result = await getCitiesResult(params)
    commit('SET_CITIES', result || [])
  },
  async getDistricts ({ commit }, params) {
    const result = await getDistrictsResult(params)
    commit('SET_DISTRICTS', result || [])
  },
  deleteDistricts ({ commit }) {
    commit('DELETE_DISTRICTS')
  },
  async getSubDistricts ({ commit }, params) {
    const result = await getSubDistrictsResult(params)
    commit('SET_SUB_DISTRICTS', result || [])
  },
  deleteSubDistricts ({ commit }) {
    commit('DELETE_SUB_DISTRICTS')
  }
}
