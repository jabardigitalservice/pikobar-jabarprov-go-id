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
      title: 'Daftar Rumah Sakit Rujukan',
      body: `
        Berikut ini adalah rumah sakit yang menjadi rujukan untuk pasien
        Covid-19 dengan status Pasien dalam Pengawasan.
      `,
      buttonLink: '/contact'
    })
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
    this.$store.dispatch('hospitals/getItems', { perPage: 3 })
  },
  methods: {
    mapHospitalItem (item) {
      const phones = {
        name: 'Telepon',
        contacts: []
      }
      const websites = {
        name: 'Website',
        contacts: []
      }
      try {
        phones.contacts = toArray(item.phones)
          .map(p => ({
            icon: 'phone',
            label: p,
            href: toPhoneURL(p)
          }))
        websites.contacts = toArray(item.web)
          .map(w => ({
            icon: 'web',
            label: w,
            href: w
          }))
        fillArrayIfEmpty(phones.contacts, { icon: 'phone' })
        fillArrayIfEmpty(websites.contacts, { icon: 'web' })
      } catch (e) {
        console.error(e)
      }

      return {
        title: item.name,
        body: `${item.address}, ${item.city}`,
        groups: [phones, websites]
      }
    }
  }
}
</script>
