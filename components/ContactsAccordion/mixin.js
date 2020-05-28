export default {
  components: {
    EmptyData: () => import('./EmptyData.vue')
  },
  inject: {
    accordionProps$: {
      from: 'accordionProps',
      default: () => ({})
    }
  }
}
