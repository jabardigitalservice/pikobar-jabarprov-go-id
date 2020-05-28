<template>
  <div>
    <StringSearchQuery v-model="searchString" class="m-4 md:m-8" @search="onSearch" />
    <Hospitals />
    <CallCenter />
    <TaskForce />
  </div>
</template>

<script>
import Vue from 'vue'
const accordionProps = Vue.observable({
  searchString: '',
  isCollapsed: false
})

export default {
  components: {
    StringSearchQuery: () => import('../StringSearchQuery'),
    Hospitals: () => import('./Hospitals'),
    CallCenter: () => import('./CallCenter'),
    TaskForce: () => import('./TaskForce')
  },
  provide () {
    return {
      accordionProps
    }
  },
  data () {
    return {
      searchString: accordionProps.searchString
    }
  },
  methods: {
    onSearch (str) {
      accordionProps.searchString = str
      accordionProps.isCollapsed = true
    }
  }
}
</script>

<style>

</style>
