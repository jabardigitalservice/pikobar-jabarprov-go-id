import {
  get,
  getArticleNational,
  getArticleWorld,
  getById,
  getLastUpdate as __getLastUpdate
} from '~/api/news'

export const state = () => ({
  items: [],
  item_articles_national: [],
  item_articles_world: [],
  isFiltered: null,
  tabActive: null,

  /**
   * @type {Date | null}
   */
  lastUpdate: null
})

export const getters = {
  itemsMap (state) {
    let items
    switch (state.tabActive) {
      case 0:
        items = [...state.items]
        break
      case 1:
        items = [...state.item_articles_national]
        break
      default:
        items = [...state.item_articles_world]
        break
    }
    return items.reduce((obj, item) => {
      obj[item.id] = item
      return obj
    }, {})
  }
}

export const mutations = {
  setLastUpdate (state, date) {
    state.lastUpdate = date
  },
  setItems (state, items) {
    state.items = items
  },
  setItemNationals (state, items) {
    state.item_articles_national = items
  },
  setItemWorlds (state, items) {
    state.item_articles_world = items
  },
  clearItems (state) {
    state.items = []
  },
  appendItems (state, items) {
    state.items = [...state.items, ...items]
  },
  prependItems (state, items) {
    state.items = [...items, ...state.items]
  },
  setIsFiltered (state, data) {
    state.isFiltered = data
  },
  setTabActive (state, data) {
    state.tabActive = data
  }
}

export const actions = {
  getItems ({ state, commit }, options) {
    return get(options)
      .then((arr) => {
        if (!state.isFiltered) { commit('setItems', arr) }
        return arr
      })
  },
  getArticleNationals ({ state, commit }, options) {
    return getArticleNational(options)
      .then((arr) => {
        if (!state.isFiltered) { commit('setItemNationals', arr) }
        return arr
      })
  },
  getArticleWorlds ({ state, commit }, options) {
    return getArticleWorld(options)
      .then((arr) => {
        if (!state.isFiltered) { commit('setItemWorlds', arr) }
        return arr
      })
  },
  getItemById ({ state, commit, getters }, id) {
    const existing = state.items.find(item => item.id === id)
    if (existing) {
      return Promise.resolve(existing)
    }
    return getById(id)
      .then((item) => {
        commit('setItems', [...state.items, item])
        return getters.itemsMap[id]
      })
  },
  async getLastUpdate ({ state, commit }) {
    if (!state.lastUpdate) {
      const date = await __getLastUpdate()
      commit('setLastUpdate', date)
    }
    return state.lastUpdate
  },
  setArticles ({ commit }, data) {
    commit('setItems', data)
  },
  setArticleNationals ({ commit }, data) {
    commit('setItemNationals', data)
  },
  setArticleWorlds ({ commit }, data) {
    commit('setItemWorlds', data)
  },
  setIsFiltered ({ commit }, data) {
    commit('setIsFiltered', data)
  },
  setTabActive ({ commit, state }, data) {
    commit('setTabActive', data)
  }
}
