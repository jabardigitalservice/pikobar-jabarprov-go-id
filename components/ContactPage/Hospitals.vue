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
    ...mapState('hospitals', {
      isLoading: (state) => {
        return !Array.isArray(state.items) ||
          !state.items.length
      }
    }),
    list () {
      if (this.isLoading) {
        return []
      }
      const { items } = this.$store.state.hospitals
      return items.map(this.mapHospitalItem)
    }
  },
  mounted () {
    this.$store.dispatch('hospitals/getItems', { perPage: 27 })
  },
  methods: {
    mapHospitalItem (item) {
      const phones = toArray(item.phones)
        .map(p => ({
          icon: 'phone',
          label: p,
          href: toPhoneURL(p)
        }))
      const websites = toArray(item.web)
        .map(w => ({
          icon: 'web',
          label: w,
          href: w
        }))

      return {
        title: item.name,
        body: `${item.address}, ${item.city}`,
        contacts: [...phones, ...websites]
      }
    }
  }
}
</script>
