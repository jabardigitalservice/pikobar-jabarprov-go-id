import {
  getCitiesResult,
  getDistrictsResult,
  getSubDistrictsResult,
  getTestLocationsResult,
  getTestTypesResult
} from '../api/isoman'

export const state = () => ({
  cities: [],
  districts: [],
  subDistricts: [],
  testLocations: [],
  testTypes: [],
  formRequest: {
    name: '',
    nik: '',
    ktp_photo: null,
    birth_date: null,
    phone_primary: '',
    phone_secondary: '',
    email: '',
    city_id: null,
    district_id: null,
    subdistrict_id: null,
    rt: null,
    rw: null,
    package_id: null,
    address: '',
    landmark: '',
    date_check: null,
    date_confirmation: null,
    test_location_id: null,
    other_test_location: null,
    test_type_id: null,
    test_result_photo: null,
    is_reported: null,
    is_reported_tracing: null
  }
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
  },
  SET_TEST_LOCATIONS (state, result) {
    state.testLocations = result
  },
  SET_TEST_TYPES (state, result) {
    state.testTypes = result
  },
  SET_FORM (state, result) {
    state.formRequest = result
  }
}

export const actions = {
  async getCities ({ commit }) {
    const result = await getCitiesResult()
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
  },
  async getTestLocations ({ commit }) {
    const result = await getTestLocationsResult()
    commit('SET_TEST_LOCATIONS', result || [])
  },
  async getTestTypes ({ commit }) {
    const result = await getTestTypesResult()
    commit('SET_TEST_TYPES', result || [])
  },
  updateForm ({ commit }, data) {
    commit('SET_FORM', data)
  }
}