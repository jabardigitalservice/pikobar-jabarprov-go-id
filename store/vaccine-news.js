import _uniqBy from 'lodash/uniqBy'
import _orderBy from 'lodash/orderBy'
import { get, getById, ORDER_INDEX, ORDER_TYPE } from '~/api/news'

export const state = () => ({
  items: []
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
  setItems (state, items) {
    const uniq = _uniqBy([...state.items, ...items], 'id')
    const ordered = _orderBy(uniq, [ORDER_INDEX], [ORDER_TYPE])
    state.items = [
      ...ordered
    ]
  },
  clearItems (state) {
    state.items = []
  },
  appendItems (state, items) {
    state.items = [...state.items, ...items]
  },
  prependItems (state, items) {
    state.items = [...items, ...state.items]
  }
}

export const actions = {
  getItems ({ state, commit }, options) {
    if (!state.items || !state.items.length) {
      return get({
        perPage: 5,
        tag: 'vaksin'
      })
        .then((arr) => {
          commit('setItems', arr)
          return state.items
        })
        .catch((e) => {
          console.error(e)
        })
    }
    return state.items
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
  }
}
