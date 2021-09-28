<template>
  <!-- eslint-disable vue/valid-v-slot -->
  <TabLayout v-model="tabLayoutModel" :tabs="tabs">
    <template #content.recent>
      <p class="text-gray-900">
        Info yang memuat berita seputar vaksinasi di Jawa Barat.
      </p>
      <div class="mt-10">
        <RecentNewsCarousel key="recentNewsCarousel" />
      </div>
    </template>
    <template #content.antiHoax>
      <p class="text-gray-900">
        <!-- TODO: DEFINE TITLE -->
        Artikel Jabar Saber Hoaks seputar vaksin dan vaksinasi
      </p>
      <div class="mt-10">
        <HoaxNews key="antiHoaxNewsCarousel" />
      </div>
    </template>
  </TabLayout>
</template>

<script>
import HoaxNews from './HoaxNews'
import { TabLayout } from '~/components/Base/TabLayout'
import RecentNewsCarousel from '~/components/Homepage/RecentNewsCarousel'

export default {
  name: 'HomepageInfographicAndDocument',
  components: {
    TabLayout,
    RecentNewsCarousel,
    HoaxNews
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
          name: 'recent',
          label: 'Berita Terkini'
        },
        {
          name: 'antiHoax',
          label: 'Anti Hoax'
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
  watch: {
    value: {
      immediate: true,
      handler (v) {
        this.mValue = typeof v === 'number' ? v : 0
      }
    }
  }
}
</script>
