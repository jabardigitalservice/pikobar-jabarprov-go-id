import { getInfo } from '../api/self-isolation'

export const state = () => ({
  infoItems: [],
  isInfoItemsLoading: true
})

export const mutations = {
  setInfoItems (state, infoItems) {
    state.infoItems = infoItems
  },
  setInfoItemsLoading (state, isInfoItemsLoading) {
    state.isInfoItemsLoading = isInfoItemsLoading
  }
}

export const actions = {
  async getInfoItems ({ state, commit }) {
    const { infoItems } = state
    if (!infoItems || !infoItems.length) {
      commit('setInfoItemsLoading', true)
      const items = await getInfo()
      commit('setInfoItems', items)
      commit('setInfoItemsLoading', false)
    }
    return state.infoItems
  }
}
