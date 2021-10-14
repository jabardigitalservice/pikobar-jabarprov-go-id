<template>
  <div>
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <template v-for="(item, i) in list">
        <ContactCard
          :key="i"
          v-bind="item"
          class="mt-6"
        />
      </template>
    </div>
    <template v-if="loading">
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <ContentLoader
          v-for="index in 4"
          :key="index"
          class="w-full hidden lg:block"
          :speed="3"
          :width="400"
          :height="200"
          primary-color="#eee"
          secondary-color="#fff"
        >
          <rect
            :key="1"
            x="0"
            :y="4"
            width="100%"
            height="200"
            rx="3"
            ry="3"
          />
        </ContentLoader>
      </div>
    </template>
    <template v-if="isEmpty">
      <div class="flex justify-center">
        <img src="~/static/img/icon-empty-state.svg" alt="img-faq-empty">
      </div>
    </template>
  </div>
</template>

<script>
import { ContentLoader } from 'vue-content-loader'
import { toPhoneURL, toArray } from '../KenaliCovid/HospitalsAndCallCenters/utils'
import { ContactCard } from '~/components/Base/ContactCard'

export default {
  components: {
    ContactCard,
    ContentLoader
  },
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    items: {
      type: Array,
      default: null
    },
    isEmpty: {
      type: Boolean,
      default: false
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
