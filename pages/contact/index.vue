<template>
  <div class="">
    <Section class="py-6 md:py-16 bg-white">
      <div class="space-y-3 mb-10">
        <h3 class="text-3xl text-gray-900 font-bold">
          Kontak Rumah Sakit dan Call Center
        </h3>
        <p class="text-gray-500">
          Informasi dan nomor alamat rumah sakit yang menjadi rujukan pemeriksaan gejala COVID-19.
        </p>
      </div>
      <!-- eslint-disable vue/valid-v-slot -->
      <TabLayout v-model="tabLayoutModel" :tabs="tabs">
        <template #content.info>
          <div class="mt-10">
            <Hospitals />
          </div>
        </template>
        <template #content.document_0>
          <div class="mt-10">
            <CallCenters />
          </div>
        </template>
      </TabLayout>
    </Section>
  </div>
</template>

<script>
import { analytics } from '~/lib/firebase'
import { TabLayout } from '~/components/Base/TabLayout'
import Section from '~/components/Base/Section'
import { Hospitals, CallCenters } from '~/components/KenaliCovid/HospitalsAndCallCenters'

export default {
  components: {
    TabLayout,
    Section,
    Hospitals,
    CallCenters
  },
  data () {
    return {
      mValue: 0,
      tabs: Object.freeze([
        {
          name: 'info',
          label: 'Rumah Sakit Rujukan'
        },
        {
          name: 'document_0',
          label: 'Call Center'
        },
        {
          name: 'document_1',
          label: 'Website Gugus Tugas Kota/Kabupaten Jawa Barat'
        }
      ])
    }
  },
  computed: {
    tabLayoutModel: {
      get () {
        return this.mValue
      },
      set (index) {
        this.mValue = index
        this.$emit('change', index)
      }
    }
  },
  mounted () {
    this.$store.dispatch('hospitals/getItems')
    this.$nextTick(() => {
      if (process.browser) {
        analytics.logEvent('contacts_view')
      }
    })
  },
  head () {
    const title = 'Kontak - Pikobar [Pusat Informasi dan Koordinasi COVID-19 Jawa Barat]'
    return {
      title,
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          content: title
        },
        {
          hid: 'og:type',
          property: 'og:type',
          content: 'article'
        }
      ]
    }
  }
}
</script>

<style scoped>
</style>
