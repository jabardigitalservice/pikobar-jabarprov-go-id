<template>
  <div>
    <Section class="py-6 md:py-12 bg-white">
      <div class="space-y-3 mb-10">
        <h2 class="text-4xl text-gray-900 font-bold">
          Kontak Rumah Sakit dan Call Center
        </h2>
        <h4 class="subtitle">
          Informasi dan nomor alamat rumah sakit yang menjadi rujukan pemeriksaan gejala COVID-19.
        </h4>
      </div>
      <StringSearchQuery
        :placeholder="'Cari Kabupaten atau Kota'"
        :value="mSearchString"
        @search="onLocalSearchStringChanged"
      />
      <!-- eslint-disable vue/valid-v-slot -->
      <TabLayout
        v-model="tabLayoutModel"
        :tabs="tabs"
        :show-count="showCount"
        class="pt-8"
      >
        <template #content.contact>
          <div class="mt-10">
            <ListContact
              :items="list"
              :loading="loading"
              :is-empty="isEmpty"
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
          type: 'task_forces',
          label: 'Website Gugus Tugas Kota/Kabupaten Jawa Barat'
        }
      ]),
      contact_type: '',
      isEmpty: false,
      isHospitalLoading: false,
      isCallCenterLoading: false,
      isTaskForcesLoading: false
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
        if (!this.mSearchString && !this.list) { this.initializeData() }
        this.isEmpty = this.list.length === 0
      }
    },
    list () {
      switch (this.contact_type) {
        case 'call_center':
          return this.list_call_centers
        case 'task_forces':
          return this.list_websites
        default:
          return this.list_hospitals
      }
    },
    loading () {
      return this.isHospitalLoading || this.isCallCenterLoading || this.isTaskForcesLoading
    },
    showCount () {
      return this.mSearchString.length !== 0 && !this.loading
    }
  },
  mounted () {
    this.initializeData()
    this.$nextTick(() => {
      if (process.browser) {
        analytics.logEvent('contacts_view')
      }
    })
  },
  methods: {
    async getData () {
      // set isFiltered state
      if (this.mSearchString) {
        this.$store.dispatch('call-centers/setIsFiltered', true)
        this.$store.dispatch('task-forces/setIsFiltered', true)
        this.$store.dispatch('hospitals/setIsFiltered', true)
      } else {
        this.$store.dispatch('call-centers/setIsFiltered', false)
        this.$store.dispatch('task-forces/setIsFiltered', false)
        this.$store.dispatch('hospitals/setIsFiltered', false)
      }

      // search on call centers
      this.isCallCenterLoading = true
      // eslint-disable-next-line no-case-declarations
      const callCenterRawData = await this.$store.dispatch('call-centers/getItems', { perPage: 27, fresh: true })
      const filteredCallCenter = this.mSearchString ? this.arrayFilter('call_center', callCenterRawData) : callCenterRawData
      this.$store.dispatch('call-centers/setItems', filteredCallCenter)
        .finally(() => {
          this.isCallCenterLoading = false
        })

      // search on task forces
      this.isTaskForcesLoading = true
      // eslint-disable-next-line no-case-declarations
      const taskForcesRawData = await this.$store.dispatch('task-forces/getItems', { perPage: 27, fresh: true })
      const filteredTaskForces = this.mSearchString ? this.arrayFilter('task_forces', taskForcesRawData) : taskForcesRawData
      this.$store.dispatch('task-forces/setItems', filteredTaskForces)
        .finally(() => {
          this.isTaskForcesLoading = false
        })

      // search on hospitals
      this.isHospitalLoading = true
      // eslint-disable-next-line no-case-declarations
      const hospitalsRawData = await this.$store.dispatch('hospitals/getItems', { perPage: 999, fresh: true })
      const filteredHospitals = this.mSearchString ? this.arrayFilter('hospital', hospitalsRawData) : hospitalsRawData
      this.$store.dispatch('hospitals/setItems', filteredHospitals)
        .finally(() => {
          this.isHospitalLoading = false
        })

      if (this.mSearchString) {
        this.tabs[0].count = this.list_hospitals.length
        this.tabs[1].count = this.list_call_centers.length
        this.tabs[2].count = this.list_websites.length
      } else {
        this.tabs[0].count = null
        this.tabs[1].count = null
        this.tabs[2].count = null
      }
    },
    onLocalSearchStringChanged (str) {
      this.$emit('update:searchString')
      this.mSearchString = str
      this.getData()
      this.isEmpty = this.list.length === 0
    },
    arrayFilter (type, array) {
      switch (type) {
        case 'call_center':
          return array.filter((data) => {
            return [data.nama_kotkab].some((str) => {
              return `${str}`.toLowerCase().includes(this.mSearchString.toLowerCase())
            })
          })
        case 'task_forces':
          return array.filter((data) => {
            return [data.name].some((str) => {
              return `${str}`.toLowerCase().includes(this.mSearchString.toLowerCase())
            })
          })
        default:
          return array.filter((data) => {
            return [data.name, data.address, data.city].some((str) => {
              return `${str}`.toLowerCase().includes(this.mSearchString.toLowerCase())
            })
          })
      }
    },
    async initializeData () {
      switch (this.contact_type) {
        case 'call_center':
          this.isCallCenterLoading = true
          this.$store.dispatch('call-centers/setIsFiltered', false)
          await this.$store.dispatch('call-centers/getItems', { perPage: 27, fresh: true })
          this.isCallCenterLoading = false
          break
        case 'task_forces':
          this.isTaskForcesLoading = true
          this.$store.dispatch('task-forces/setIsFiltered', false)
          await this.$store.dispatch('task-forces/getItems', { perPage: 27, fresh: true })
          this.isTaskForcesLoading = false
          break
        default:
          this.isHospitalLoading = true
          this.$store.dispatch('hospitals/setIsFiltered', false)
          await this.$store.dispatch('hospitals/getItems', { perPage: 999, fresh: true })
          this.isHospitalLoading = false
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.subtitle {
  color: #424242;
  font-family: 'Roboto', sans-serif;
}
</style>
