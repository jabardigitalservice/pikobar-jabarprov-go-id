<template>
  <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
    <template v-for="(item, i) in list">
      <ContactCard
        :key="i"
        v-bind="item"
        class="mt-6"
      />
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { toPhoneURL, toArray } from '../KenaliCovid/HospitalsAndCallCenters/utils'
import { ContactCard } from '~/components/Base/ContactCard'

export default {
  components: {
    ContactCard
  },
  data () {
    return Object.freeze({})
  },
  computed: {
    ...mapState('call-centers', {
      isLoading: (state) => {
        return !Array.isArray(state.items) ||
          !state.items.length
      }
    }),
    list () {
      if (this.isLoading) {
        return []
      }
      const { items } = this.$store.state['call-centers']
      return items.map(this.mapCallCenteritem)
    }
  },
  mounted () {
    this.$store.dispatch('call-centers/getItems', { perPage: 27 })
  },
  methods: {
    mapCallCenteritem (item) {
      const callCenters = toArray(item.call_center)
        .map(cc => ({
          icon: 'phone',
          label: cc,
          href: toPhoneURL(cc)
        }))
      const hotlines = toArray(item.hotline)
        .map(h => ({
          icon: 'phone',
          label: h,
          href: h
        }))

      return {
        title: item.nama_kotkab,
        contacts: [...callCenters, ...hotlines]
      }
    }
  }
}
</script>
