<template>
  <div
    v-if="isInfographicOrDocumentRoute"
  >
    <Section class="bg-white">
      <div class="space-y-3 pt-2 lg:pt-8">
        <h2 class="text-3xl text-gray-900 font-bold">
          Informasi Lainnya
        </h2>
        <h4 class="subtitle">
          Informasi terkait infografis, dokumen dan regulasi seputar Covid-19 di Jawa Barat.
        </h4>
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
          title: 'Info Praktikal',
          count: null
        },
        {
          id: 'document',
          to: '/info/documents',
          title: 'Dokumen',
          count: null
        }
      ],
      query: {
        search: this.$route.query?.search ?? null
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
      return this.query.search &&
      !this.isDocumentLoading &&
      !this.isInfographicLoading &&
      this.infographicsItems.length !== null &&
      this.documentItems.length !== null &&
      this.tabs[0].count !== null &&
      this.tabs[1].count !== null
    }
  },
  beforeMount () {
    if (!this.query.search) {
      this.$store.dispatch('infographics/setIsFiltered', false)
      this.$store.dispatch('documents/setIsFiltered', false)
    } else {
      this.$store.dispatch('infographics/setIsFiltered', true)
      this.$store.dispatch('documents/setIsFiltered', true)
      this.onSearchStringChanged(this.query.search)
    }
  },
  mounted () {
    if (this.query.search) {
      this.tabs[0].count = this.infographicsItems.length
      this.tabs[1].count = this.documentItems.length
    }
  },
  methods: {
    onTabChanged (newTabId) {
      const tab = this.tabs.find(item => item.id === newTabId)
      if (tab) {
        this.$router.replace({
          path: tab.to,
          query: this.$route.query.search ? { search: this.$route.query.search } : null
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

      // set search query
      this.$router.replace({
        query: {
          search: this.query.search ?? null
        }
      })

      // search on infographics
      this.isInfographicLoading = true
      if (this.query.search) { this.$store.dispatch('infographics/setLastSnapshot', null) }
      const infographicsRawData = await this.$store.dispatch('infographics/getItems', {
        perPage: this.query.search ? 500 : 8,
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
        this.$store.dispatch('infographics/setLastSnapshot', this.infographicsItems[this.infographicsItems.length - 1].published_date)
      }

      // search on documents
      this.isDocumentLoading = true
      if (this.query.search) { this.$store.dispatch('documents/setLastSnapshot', null) }
      const documentsRawData = await this.$store.dispatch('documents/getItems', {
        limit: this.query.search ? 500 : 8,
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
        this.$store.dispatch('documents/setLastSnapshot', this.documentItems[this.documentItems.length - 1].published_at)
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
