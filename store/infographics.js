// import _cloneDeep from 'lodash/cloneDeep'
import _uniqBy from 'lodash/uniqBy'
import _orderBy from 'lodash/orderBy'
import { get, getById, ORDER_INDEX, ORDER_TYPE } from '~/api/infographic'

export const state = () => ({
  items: [],
  lastSnapshot: null,
  isFiltered: false
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
    state.items = items
  },
  clearItems (state) {
    state.items = []
  },
  appendItems (state, items) {
    const uniq = _uniqBy([...state.items, ...items], 'id')
    const ordered = _orderBy(uniq, [ORDER_INDEX], [ORDER_TYPE])
    state.items = ordered
  },
  prependItems (state, items) {
    state.items = [...items, ...state.items]
  },
  setLastSnapshot (state, lastSnapshot) {
    state.lastSnapshot = lastSnapshot
  },
  setIsFiltered (state, data) {
    state.isFiltered = data
  }
}

export const actions = {
  getItems ({ state, commit }, options = { perPage: 6, fresh: false, isFiltered: false }) {
    if (!state.items || !state.items.length || options.fresh) {
      return get({
        ...options,
        lastSnapshot: state.lastSnapshot
      })
        .then(({ data, lastSnapshot }) => {
          if (!options.isFiltered) {
            if (process.client || process.browser) {
              commit('appendItems', data)
              commit('setLastSnapshot', lastSnapshot)
            } else {
              commit('setItems', data)
            }
            return state.items
          } else {
            return data
          }
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
  },
  setItems ({ commit }, items) {
    commit('setItems', items)
  },
  setIsFiltered ({ commit }, data) {
    commit('setIsFiltered', data)
  },
  setLastSnapshot ({ commit }, data) {
    commit('setLastSnapshot', data)
  }
}
