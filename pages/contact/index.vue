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
      <StringSearchQuery :value="mSearchString" @search="onLocalSearchStringChanged" />
      <!-- eslint-disable vue/valid-v-slot -->
      <TabLayout v-model="tabLayoutModel" :tabs="tabs" class="pt-8">
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
        <template #content.document_1>
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
import { Hospitals, CallCenters } from '~/components/ContactPage'

export default {
  components: {
    StringSearchQuery: () => import('~/components/StringSearchQuery'),
    TabLayout,
    Section,
    Hospitals,
    CallCenters
  },
  data () {
    return {
      mValue: 0,
      mSearchString: '',
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
    this.$nextTick(() => {
      if (process.browser) {
        analytics.logEvent('contacts_view')
      }
    })
  },
  methods: {
    onLocalSearchStringChanged (str) {
      this.$emit('update:searchString')
      this.mSearchString = str
    }
  }
}
</script>

<style scoped>
</style>
