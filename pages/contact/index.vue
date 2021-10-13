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
      <StringSearchQuery
        :placeholder="'Cari Kabupaten atau Kota'"
        :value="mSearchString"
        @search="onLocalSearchStringChanged"
      />
      <!-- eslint-disable vue/valid-v-slot -->
      <TabLayout v-model="tabLayoutModel" :tabs="tabs" class="pt-8">
        <template #content.contact>
          <div class="mt-10">
            <ListContact
              :items="list"
              :type="contact_type"
            />
          </div>
        </template>
      </TabLayout>
    </Section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
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
      list: [],
      contact_type: ''
    }
  },
  computed: {
    ...mapState('call-centers', {
      list_call_centers: state => state.items
    }),
    ...mapState('task-forces', {
      list_websites: state => state.items
    }),
    ...mapState('hospitals', {
      list_hospitals: state => state.items
    }),
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
      switch (this.contact_type) {
        case 'call_center':
          // eslint-disable-next-line no-case-declarations
          const callCenter = await this.$store.dispatch('call-centers/getItems', { perPage: 27 })
          this.list = callCenter
          return this.list
        case 'website':
          // eslint-disable-next-line no-case-declarations
          const websites = await this.$store.dispatch('task-forces/getItems', { perPage: 27 })
          this.list = websites
          return this.list
        default:
          // eslint-disable-next-line no-case-declarations
          const hospitals = await this.$store.dispatch('hospitals/getItems', { perPage: 999 })
          this.list = hospitals
          return this.list
      }
    },
    onLocalSearchStringChanged (str) {
      this.$emit('update:searchString')
      this.mSearchString = str
      this.onSearchData(str)
    },
    onSearchData (search) {
      switch (this.contact_type) {
        case 'call_center':
          if (!search) {
            this.list = this.list_call_centers
            return this.list
          }
          this.list = this.list.filter((data) => {
            return [data.nama_kotkab].some((str) => {
              return `${str}`.toLowerCase().includes(search.toLowerCase())
            })
          })
          return this.list
        case 'website':
          if (!search) {
            this.list = this.list_websites
            return this.list
          }
          this.list = this.list.filter((data) => {
            return [data.name].some((str) => {
              return `${str}`.toLowerCase().includes(search.toLowerCase())
            })
          })
          return this.list
        default:
          if (!search) {
            this.list = this.list_hospitals
            return this.list
          }
          this.list = this.list.filter((data) => {
            return [data.name, data.address, data.city].some((str) => {
              return `${str}`.toLowerCase().includes(search.toLowerCase())
            })
          })
          return this.list
      }
    }
  }
}
</script>
