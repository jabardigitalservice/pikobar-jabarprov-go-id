<template>
  <!-- eslint-disable vue/valid-v-slot -->
  <TabLayout v-model="tabLayoutModel" :tabs="tabs">
    <template #content.info>
      <p class="disclaimer">
        Info yang memuat infografis terkait Covid-19
      </p>
      <div class="mt-10">
        <InfographicCarousel />
      </div>
    </template>
    <template #content.document>
      <p class="disclaimer">
        Lihat dan unduh dokumen serta rilis pers seputar informasi COVID-19 di Jawa Barat.
        Dokumen dan rilis pers yang ditampilkan berdasarkan informasi resmi dari Pemerintah
        Provinsi Jawa Barat.
      </p>
      <div class="mt-10">
        <DocumentTable :limit="5" />
      </div>
    </template>
  </TabLayout>
</template>

<script>
import InfographicCarousel from '../InfographicCarousel'
import DocumentTable from '../DocumentTable'
import { TabLayout } from '~/components/Base/TabLayout'

export default {
  name: 'HomepageInfographicAndDocument',
  components: {
    TabLayout,
    InfographicCarousel,
    DocumentTable
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
          name: 'info',
          label: 'Info Praktikal'
        },
        {
          name: 'document',
          label: 'Dokumen'
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

<style lang="scss" scoped>
.disclaimer {
  @apply text-brand-black;

  font-family: 'Roboto', sans-serif;
}
</style>
