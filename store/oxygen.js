import { get, getInfo, getCollectedDistrict, getCollectedSubDistrict, getTotal } from '../api/oxygen'

export const state = () => ({
  items: [],
  isItemsLoading: true,
  infoItems: [],
  isInfoItemsLoading: true,
  districs: [],
  isDistricsLoading: true,
  subDistrics: [],
  isSubDistricsLoading: true,
  paramsSubDistrics: null,
  totalItem: 0
})

export const mutations = {
  setItems (state, items) {
    state.items = items
  },
  setItemsLoading (state, isItemsLoading) {
    state.isItemsLoading = isItemsLoading
  },
  setInfoItems (state, infoItems) {
    state.infoItems = infoItems
  },
  setInfoItemsLoading (state, isInfoItemsLoading) {
    state.isInfoItemsLoading = isInfoItemsLoading
  },
  setDistricts (state, districs) {
    state.districs = districs
  },
  setDistrictsLoading (state, isDistricsLoading) {
    state.isDistricsLoading = isDistricsLoading
  },
  setSubDistricts (state, subDistrics) {
    state.subDistrics = subDistrics
  },
  setSubDistrictsLoading (state, isSubDistricsLoading) {
    state.isSubDistricsLoading = isSubDistricsLoading
  },
  setTotalItem (state, totalItem) {
    state.totalItem = totalItem
  }
}

export const actions = {
  async getItems ({ state, commit }, params = {}) {
    commit('setItemsLoading', true)
    const items = await get({ params })
    commit('setItems', items.data)
    commit('setItemsLoading', false)
    return state.items
  },
  async getInfoItems ({ state, commit }) {
    const { infoItems } = state
    if (!infoItems || !infoItems.length) {
      commit('setInfoItemsLoading', true)
      const items = await getInfo()
      commit('setInfoItems', items)
      commit('setInfoItemsLoading', false)
    }
    return state.infoItems
  },
  async getCollectedDistricts ({ state, commit }) {
    const { districs } = state
    if (!districs.length) {
      commit('setDistrictsLoading', true)
      const items = await getCollectedDistrict()
      commit('setDistricts', items.data)
      commit('setDistrictsLoading', false)
    }
    return state.districs
  },
  async getCollectedSubDistricts ({ state, commit }, params = {}) {
    commit('setSubDistrictsLoading', true)
    const items = await getCollectedSubDistrict({ params })
    commit('setSubDistricts', items.data)
    commit('setSubDistrictsLoading', false)
    return state.subDistrics
  },
  async getTotals ({ state, commit }) {
    const items = await getTotal()
    commit('setTotalItem', items.data?.count || 0)
    return state.totalItem
  }
}
