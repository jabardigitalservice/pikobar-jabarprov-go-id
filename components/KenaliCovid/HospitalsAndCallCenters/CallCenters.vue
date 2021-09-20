<template>
  <WrapperItem v-bind="$data">
    <template v-for="(item, i) in list">
      <ContactCard
        :key="i"
        v-bind="item"
        class="mt-6"
      />
    </template>
  </WrapperItem>
</template>

<script>
import { mapState } from 'vuex'
import { toPhoneURL, toArray, fillArrayIfEmpty } from './utils'
import WrapperItem from './WrapperItem'
import { ContactCard } from '~/components/Base/ContactCard'

export default {
  components: {
    WrapperItem,
    ContactCard
  },
  data () {
    return Object.freeze({
      title: 'Hubungi Call Center',
      body: `
        Apabila Anda mengalami atau menemukan kejanggalan seputar Covid-19,
        segera hubungi nomor di bawah ini.
      `,
      buttonLink: '/contact'
    })
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
    this.$store.dispatch('call-centers/getItems', { perPage: 3 })
  },
  methods: {
    mapCallCenteritem (item) {
      const callCenters = {
        name: 'Call Center',
        contacts: []
      }
      const hotlines = {
        name: 'Hotline',
        contacts: []
      }

      try {
        callCenters.contacts = toArray(item.call_center)
          .map(cc => ({
            icon: 'phone',
            label: cc,
            href: toPhoneURL(cc)
          }))
        hotlines.contacts = toArray(item.hotline)
          .map(h => ({
            icon: 'phone',
            label: h,
            href: h
          }))
        fillArrayIfEmpty(callCenters.contacts, { icon: 'phone' })
        fillArrayIfEmpty(hotlines.contacts, { icon: 'phone' })
      } catch (e) {
        // silent error
      }

      return {
        title: item.nama_kotkab,
        groups: [callCenters, hotlines]
      }
    }
  }
}
</script>
