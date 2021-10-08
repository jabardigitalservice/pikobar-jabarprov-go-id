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
import { toPhoneURL, toArray } from './utils'
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
