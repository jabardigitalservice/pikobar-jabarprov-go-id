<template>
  <!-- eslint-disable vue/valid-v-slot -->
  <TabLayout :tabs="tabs">
    <template #content.info>
      <p>
        Info yang memuat infografis terkait Covid-19
      </p>
      <div class="mt-10">
        <!--
          TODO: insert infographic list view
        -->
      </div>
    </template>
    <template #content.document>
      <p>
        Lihat dan unduh dokumen serta rilis pers seputar informasi COVID-19 di Jawa Barat.
        Dokumen dan rilis pers yang ditampilkan berdasarkan informasi resmi dari Pemerintah
        Provinsi Jawa Barat.
      </p>
      <div class="mt-10">
        <!--
          TODO: insert document table view
        -->
      </div>
    </template>
  </TabLayout>
</template>

<script>
import { TabLayout } from '~/components/TabLayoutV2'

export default {
  name: 'HomepageInfographicAndDocument',
  components: {
    TabLayout
  },
  data () {
    return {
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
  }
}
</script>
