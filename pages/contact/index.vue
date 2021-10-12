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
        <template #content.contact>
          <div class="mt-10">
            <ListContact
              :items="items"
              :type="contact_type"
            />
          </div>
        </template>
      </TabLayout>
    </Section>
  </div>
</template>

<script>
// import { mapState } from 'vuex'
import { analytics } from '~/lib/firebase'
import { TabLayout } from '~/components/Base/TabLayout'
import Section from '~/components/Base/Section'
import { ListContact } from '~/components/ContactPage'

export default {
  components: {
    StringSearchQuery: () => import('~/components/StringSearchQuery'),
    TabLayout,
    Section,
    ListContact
  },
  data () {
    return {
      mValue: 0,
      mSearchString: '',
      tabs: Object.freeze([
        {
          name: 'contact',
          type: 'hospital',
          label: 'Rumah Sakit Rujukan'
        },
        {
          name: 'contact',
          type: 'call_center',
          label: 'Call Center'
        },
        {
          name: 'contact',
          type: 'website',
          label: 'Website Gugus Tugas Kota/Kabupaten Jawa Barat'
        }
      ]),
      items: [],
      contact_type: ''
    }
  },
  computed: {
    tabLayoutModel: {
      get () {
        return this.mValue
      },
      set (index) {
        this.mValue = index
        this.contact_type = this.tabs[index].type
        this.$emit('change', index)
        this.getData()
      }
    }
  },
  mounted () {
    this.getData()
    this.$nextTick(() => {
      if (process.browser) {
        analytics.logEvent('contacts_view')
      }
    })
  },
  methods: {
    async getData () {
      console.log(this.contact_type)
      switch (this.contact_type) {
        case 'call_center':
          // eslint-disable-next-line no-case-declarations
          const callCenter = await this.$store.dispatch('call-centers/getItems', { perPage: 27 })
          this.items = callCenter
          return this.items
        default:
          // eslint-disable-next-line no-case-declarations
          const hospitals = await this.$store.dispatch('hospitals/getItems', { perPage: 999 })
          this.items = hospitals
          return this.items
      }
    },
    onLocalSearchStringChanged (str) {
      this.$emit('update:searchString')
      this.mSearchString = str
    }
  }
}
</script>

<style scoped>
</style>
