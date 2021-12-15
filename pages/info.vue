<template>
  <div
    v-if="isInfographicOrDocumentRoute"
  >
    <Section class="bg-white">
      <div class="space-y-3 pt-2 lg:pt-8">
        <h3 class="text-3xl text-gray-900 font-bold">
          Informasi Lainnya
        </h3>
        <p class="text-gray-500">
          Informasi terkait infografis, dokumen dan rilis pers seputar Covid-19 di Jawa Barat.
        </p>
        <StringSearchQuery
          :placeholder="'Cari informasi'"
          :value="query.search"
          @search="onSearchStringChanged"
        />
      </div>
      <TabLayout
        class="py-6"
        :tabs="tabs"
        :active-tab-id="activeTabId"
        :show-counts="showCounts"
        @change="onTabChanged"
      />
      <nuxt-child />
    </Section>
  </div>
  <nuxt-child v-else />
</template>

<script>
import { mapState } from 'vuex'
import TabLayout from '~/components/TabLayout'
import Section from '~/components/Base/Section'
import StringSearchQuery from '~/components/StringSearchQuery'

export default {
  scrollToTop: true,
  components: {
    TabLayout,
    Section,
    StringSearchQuery
  },
  asyncData ({ route }) {
    const isInfographicOrDocumentRoute = [
      '/info/documents',
      '/info/infographics'
    ].some(path => route.path.startsWith(path))
    return {
      isInfographicOrDocumentRoute
    }
  },
  data () {
    return {
      isInfographicOrDocumentRoute: false,
      tabs: [
        {
          id: 'infographic',
          to: '/info/infographics',
          title: 'Info Praktikal'
        },
        {
          id: 'document',
          to: '/info/documents',
          title: 'Dokumen'
        }
      ],
      query: {
        search: null
      },
      isInfographicLoading: false,
      isDocumentLoading: false
    }
  },
  computed: {
    ...mapState('infographics', {
      infographicsItems: 'items'
    }),
    ...mapState('documents', {
      documentItems: 'items'
    }),
    activeTabId () {
      const path = this.$route.path
      const tab = this.tabs.find(item => path.startsWith(item.to))
      return tab ? tab.id : null
    },
    showCounts () {
      return this.query.search && !this.isDocumentLoading && !this.isInfographicLoading
    }
  },
  methods: {
    onTabChanged (newTabId) {
      const tab = this.tabs.find(item => item.id === newTabId)
      if (tab) {
        this.$router.replace({
          path: tab.to
        })
      }
    },
    arrayFilter (array) {
      array = array.filter((data) => {
        return [data.title].some((str) => {
          return `${str}`.toLowerCase().includes(this.query.search.toLowerCase())
        })
      })
      return array
    },
    async onSearchStringChanged (str) {
      this.query.search = str !== '' ? str : null

      // search on infographics
      this.isInfographicLoading = true
      const infographicsRawData = await this.$store.dispatch('infographics/getItems', {
        perPage: this.query.search ? 500 : 6,
        fresh: true,
        isFiltered: true
      })
      const filteredInfographics = this.query.search ? this.arrayFilter(infographicsRawData) : infographicsRawData
      this.$store.dispatch('infographics/setItems', filteredInfographics)
        .finally(() => {
          this.isInfographicLoading = false
        })
      if (this.query.search) {
        this.tabs[0].counts = this.infographicsItems.length
        this.$store.dispatch('infographics/setIsFiltered', true)
      } else {
        this.tabs[0].counts = null
        this.$store.dispatch('infographics/setIsFiltered', false)
      }

      // search on documents
      this.isDocumentLoading = true
      const documentsRawData = await this.$store.dispatch('documents/getItems', {
        perPage: this.query.search ? 500 : 6,
        fresh: true,
        isFiltered: true
      })
      const filteredDocuments = this.query.search ? this.arrayFilter(documentsRawData) : documentsRawData
      this.$store.dispatch('documents/setItems', filteredDocuments)
        .finally(() => {
          this.isDocumentLoading = false
        })
      if (this.query.search) {
        this.tabs[1].counts = this.documentItems.length
        this.$store.dispatch('documents/setIsFiltered', true)
      } else {
        this.tabs[1].counts = null
        this.$store.dispatch('documents/setIsFiltered', false)
      }
    }
  }
}
</script>
