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
import { toPhoneURL, toArray } from '../KenaliCovid/HospitalsAndCallCenters/utils'
import { ContactCard } from '~/components/Base/ContactCard'

export default {
  components: {
    ContactCard
  },
  props: {
    items: {
      type: Array,
      default: () => []
    },
    type: {
      type: String,
      default: 'hospital'
    }
  },
  computed: {
    list: {
      get () {
        return this.items.map(this.mapItem)
      },
      set (value) {
        return value.map(this.mapItem)
      }
    }
  },
  methods: {
    mapItem (item) {
      switch (this.type) {
        case 'call_center':
          // eslint-disable-next-line no-case-declarations
          const callCenters = toArray(item.call_center)
            .map(cc => ({
              icon: 'phone',
              label: cc,
              href: toPhoneURL(cc)
            }))

          // eslint-disable-next-line no-case-declarations
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
        case 'website':
          // eslint-disable-next-line no-case-declarations
          const websites = toArray(item.website)
            .map(w => ({
              icon: 'web',
              label: w,
              href: w
            }))
          return {
            title: item.name,
            contacts: [...websites]
          }
        default:
          // eslint-disable-next-line no-case-declarations
          const phones = toArray(item.phones)
            .map(p => ({
              icon: 'phone',
              label: p,
              href: toPhoneURL(p)
            }))
          // eslint-disable-next-line no-case-declarations
          const hospitalWebsites = toArray(item.web)
            .map(w => ({
              icon: 'web',
              label: w,
              href: w
            }))

          return {
            title: item.name,
            body: `${item.address}, ${item.city}`,
            contacts: [...phones, ...hospitalWebsites]
          }
      }
    }
  }
}
</script>
