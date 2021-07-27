<template>
  <div>
    <TrackingHeader
      :is-searched="isSearched"
      :is-search.sync="isSearched"
    />
    <TrackingResult v-if="isSearched && displayResult" :key="reRender" />
    <EmptyResult v-if="isSearched && !displayResult" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import TrackingHeader from '../../components/_pages/index/Tracking/TrackingHeader'
import TrackingResult from '../../components/_pages/index/Tracking/TrackingResult'
import EmptyResult from '../../components/_pages/index/Tracking/EmptyResult'
export default {
  components: {
    TrackingHeader,
    TrackingResult,
    EmptyResult
  },
  data () {
    return {
      isSearched: false,
      reRender: false
    }
  },
  computed: {
    ...mapState('tracking', [
      'result'
    ]),
    displayResult () {
      return Object.keys(this.result).length !== 0 && this.result.constructor === Object
    }
  },
  watch: {
    result () {
      this.reRender = !this.reRender
    }
  },
  head () {
    const title = 'Tracking - Pikobar [Pusat Informasi dan Koordinasi COVID-19 Jawa Barat]'
    return { title }
  }
}
</script>
