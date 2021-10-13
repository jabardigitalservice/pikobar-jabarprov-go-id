import _uniqBy from 'lodash/uniqBy'
import _orderBy from 'lodash/orderBy'
import {
  get,
  getArticleNational,
  getArticleWorld,
  getById,
  getLastUpdate as __getLastUpdate,
  ORDER_INDEX,
  ORDER_TYPE
} from '~/api/news'

export const state = () => ({
  items: [],
  item_articles_national: [],
  item_articles_world: [],

  /**
   * @type {Date | null}
   */
  lastUpdate: null
})

export const getters = {
  itemsMap (state) {
    return state.items.reduce((obj, item) => {
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
    const uniq = _uniqBy([...state.items, ...items], 'id')
    const ordered = _orderBy(uniq, [ORDER_INDEX], [ORDER_TYPE])
    state.items = ordered
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
    console.log(state.items)
  },
  prependItems (state, items) {
    state.items = [...items, ...state.items]
  }
}

export const actions = {
  getItems ({ state, commit }, options) {
    if (!state.items || !state.items.length) {
      return get(options)
        .then((arr) => {
          commit('setItems', arr)
          return state.items
        })
    }
    return state.items
  },
  getArticleNationals ({ state, commit }, options) {
    if (!state.item_articles_national || !state.item_articles_national.length) {
      return getArticleNational(options)
        .then((arr) => {
          commit('setItemNationals', arr)
          return state.item_articles_national
        })
    }
    return state.item_articles_national
  },
  getArticleWorlds ({ state, commit }, options) {
    if (!state.item_articles_world || !state.item_articles_world.length) {
      return getArticleWorld(options)
        .then((arr) => {
          console.log(arr)
          commit('setItemWorlds', arr)
          return state.item_articles_world
        })
    }
    return state.item_articles_world
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
  }
}
