<template>
  <!-- eslint-disable vue/valid-v-slot -->
  <TabLayout :tabs="tabs">
    <template #content.info>
      <p class="text-gray-900">
        Info yang memuat infografis terkait Covid-19
      </p>
      <div class="mt-10">
        <!--
          TODO: insert infographic list view
        -->
      </div>
    </template>
    <template #content.document>
      <p class="text-gray-900">
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
import DocumentTable from '../DocumentTable'
import { TabLayout } from '~/components/TabLayoutV2'

export default {
  name: 'HomepageInfographicAndDocument',
  components: {
    TabLayout,
    DocumentTable
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
