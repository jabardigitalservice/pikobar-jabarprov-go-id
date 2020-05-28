<template>
  <div class="">
    <div class="bg-brand-green-dark">
      <div class="container mx-auto p-8 lg:p-16 text-white">
        <h2 class="text-2xl font-bold leading-tight">
          Kontak Rumah Sakit dan Call Center
        </h2>
        <p class="mb-6 mt-2 text-base opacity-75 leading-tight">
          Informasi dan nomor alamat rumah sakit yang menjadi rujukan pemeriksaan gejala COVID-19
        </p>
      </div>
    </div>
    <br>
    <div class="container mx-auto">
      <ContactsAccordion />
    </div>
  </div>
</template>

<script>
import { analytics } from '~/lib/firebase'
export default {
  components: {
    ContactsAccordion: () => import('~/components/ContactsAccordion')
  },
  mounted () {
    this.$store.dispatch('hospitals/getItems')
    this.$nextTick(() => {
      if (process.browser) {
        analytics.logEvent('contacts_view')
      }
    })
  },
  head () {
    const title = 'Kontak - Pikobar [Pusat Informasi dan Koordinasi COVID-19 Jawa Barat]'
    return {
      title,
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          content: title
        },
        {
          hid: 'og:type',
          property: 'og:type',
          content: 'article'
        }
      ]
    }
  }
}
</script>

<style scoped>
</style>
