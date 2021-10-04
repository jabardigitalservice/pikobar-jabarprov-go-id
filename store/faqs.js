import { get, getFaqCategories } from '~/api/faqs'

export const state = () => ({
  categories: null,
  items: null
})

export const mutations = {
  setItemsCategories (state, categories) {
    state.categories = categories
  },
  setItems (state, items) {
    state.items = items
  }
}

export const actions = {
  getItems ({ state, commit }, options) {
    if (!state.items || !state.items.length) {
      return get()
        .then((faqs) => {
          commit('setItems', faqs)
          return state.items
        })
    }
    return state.items
  },
  getItemsCategories ({ state, commit }, options) {
    if (!state.items || !state.items.length) {
      return getFaqCategories()
        .then((categories) => {
          commit('setItemsCategories', categories)
          return state.categories
        })
    }
    return state.items
  }
}
