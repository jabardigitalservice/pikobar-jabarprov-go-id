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
      </div>
      <TabLayout
        class="py-6"
        :tabs="tabs"
        :active-tab-id="activeTabId"
        @change="onTabChanged"
      />
      <nuxt-child />
    </Section>
  </div>
  <nuxt-child v-else />
</template>

<script>
import TabLayout from '~/components/TabLayout'
import Section from '~/components/Base/Section'

export default {
  scrollToTop: true,
  components: {
    TabLayout,
    Section
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
      ]
    }
  },
  computed: {
    activeTabId () {
      const path = this.$route.path
      const tab = this.tabs.find(item => path.startsWith(item.to))
      return tab ? tab.id : null
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
    }
  }
}
</script>
