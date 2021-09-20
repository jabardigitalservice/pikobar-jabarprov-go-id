<template>
  <div
    v-if="isInfographicOrDocumentRoute"
    class="container mx-auto"
  >
    <section class="m-4 md:m-8">
      <header>
        <TabLayout
          :tabs="tabs"
          :active-tab-id="activeTabId"
          @change="onTabChanged"
        />
      </header>
      <br>
      <div class="p-5 md:p-8 bg-white rounded-lg shadow-md border-solid border-gray-300">
        <nuxt-child />
      </div>
    </section>
  </div>
  <nuxt-child v-else />
</template>

<script>
import TabLayout from '~/components/TabLayout'
export default {
  scrollToTop: true,
  components: {
    TabLayout
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

<style lang="scss" scoped>
.infographic-list {
  display: grid;
  grid-template-columns: 1fr;
  column-gap: 1.5rem;
  row-gap: 3rem;

  &__item-image {
    height: 256px;
  }

  @screen md {
    grid-template-columns: 1fr 1fr;
  }

  @screen lg {
    grid-template-columns: 1fr 1fr 1fr;
  }
}
</style>
