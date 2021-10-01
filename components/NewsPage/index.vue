<template>
  <!-- eslint-disable vue/valid-v-slot -->
  <Section class="bg-white min-h-screen">
    <div class="py-10">
      <h2 class="font-bold text-3xl">Berita Terkini</h2>
      <h4 class="text-gray-500">Berita seputar Covid-19 mulai dari berita lokal hingga mancanegara.</h4>
    </div>
    <TabLayout v-model="tabLayoutModel" :tabs="tabs">
      <template #content.all_news>
        <div class="mt-10">
          <RecentNewsCarousel
            ref="recentNews"
            @loading="onSectionLoad('recentNews', $event)"
          />
        </div>
      </template>
      <template #content.jabar>
        <div class="mt-10">
          <RecentNewsCarousel
            ref="recentNews"
            @loading="onSectionLoad('recentNews', $event)"
          />
        </div>
      </template>
      <template #content.national>
        <div class="mt-10">
          <RecentNewsCarousel
            ref="recentNews"
            @loading="onSectionLoad('recentNews', $event)"
          />
        </div>
      </template>
      <template #content.world>
        <div class="mt-10">
          <RecentNewsCarousel
            ref="recentNews"
            @loading="onSectionLoad('recentNews', $event)"
          />
        </div>
      </template>
    </TabLayout>
  </Section>
</template>

<script>
import { Section } from '../Base/Section'
import { TabLayout } from '~/components/Base/TabLayout'
import RecentNewsCarousel from '~/components/Homepage/RecentNewsCarousel'

export default {
  name: 'NewsTabPage',
  components: {
    TabLayout,
    RecentNewsCarousel,
    Section
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    /**
     * Active tab index. Refer to
     * './components/Base/TabLayout' bound model.
     */
    value: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      mValue: 0,
      tabs: Object.freeze([
        {
          name: 'all_news',
          label: 'Semua Berita'
        },
        {
          name: 'jabar',
          label: 'Jabar'
        },
        {
          name: 'national',
          label: 'Nasional'
        },
        {
          name: 'world',
          label: 'Dunia'
        }
      ]),
      section: {
        recentNews: {
          loading: true,
          title: 'Berita Terkini',
          subtitle: null
        }
      }
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
  watch: {
    value: {
      immediate: true,
      handler (v) {
        this.mValue = typeof v === 'number' ? v : 0
      }
    }
  },
  methods: {
    onSectionLoad (name, isLoading) {
      const { lastUpdate } = this.$refs[name]
      this.section[name].loading = isLoading
      this.section[name].subtitle = !isLoading && lastUpdate
        ? `Update Terakhir: ${lastUpdate}`
        : null
    }
  }
}
</script>
