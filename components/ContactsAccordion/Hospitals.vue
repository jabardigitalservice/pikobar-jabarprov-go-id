<template>
  <Accordion id="hospitalList">
    <template #header>
      <h2 class="text-2xl font-bold leading-tight">
        Daftar Rumah Sakit Rujukan
      </h2>
    </template>
    <template #description>
      <p class="mb-6 mt-2 text-base opacity-50 leading-tight">
        Berikut ini adalah rumah sakit yang menjadi rujukan untuk pasien dengan status Pasien dalam Pengawasan. Anda harus mengunjungi fasilitas kesehatan terdekat terlebih dahulu seperti klinik/rumah sakit umum sebelum akhirnya dapat dirujuk ke rumah sakit di bawah ini.
      </p>
    </template>
    <br>
    <template #content>
      <div>
        <ContactList v-if="filteredHospitals && filteredHospitals.length" :items="filteredHospitals" />
        <EmptyData v-else />
      </div>
    </template>
  </Accordion>
</template>

<script>
import { mapState } from 'vuex'
import mixin from './mixin.js'
import ContactList from '~/components/ContactList'
export default {
  components: {
    Accordion: () => import('./Accordion'),
    ContactList
  },
  mixins: [mixin],
  data () {
    return {
      filteredHospitals: null,
      mSearchString: ''
    }
  },
  computed: {
    ...mapState('hospitals', {
      hospitals: 'items'
    })
  },
  watch: {
    hospitals: {
      immediate: true,
      deep: false,
      handler (v) {
        if (Array.isArray(v)) {
          this.$watch(
            'accordionProps$.searchString',
            function handler (v) {
              this.mSearchString = v
              this.performFiltering(this.mSearchString)
            },
            { immediate: true }
          )
        }
      }
    }
  },
  methods: {
    performFiltering (str) {
      if (!this.hospitals) {
        this.filteredHospitals = null
      }
      if (str) {
        this.filteredHospitals = this.hospitals.filter((cc) => {
          return cc.name.toLowerCase().includes(str.toLowerCase())
        })
      } else {
        this.filteredHospitals = this.hospitals
      }
    }
  }
}
</script>

<style>

</style>
