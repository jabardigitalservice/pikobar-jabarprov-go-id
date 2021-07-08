<template>
  <p class="text-gray-800">
    Bagi Wargi Jabar yang kesulitan mendapatkan akses vitamin selama melakukan isolasi mandiri di rumah,
    Wargi bisa mengajukan permohonan kebutuhan vitamin melalui
    <a
      class="text-green-600 underline font-bold"
      :href="formLink"
      target="_blank"
      @click.prevent="onClick"
    >
      link ini.
    </a>
    Bagi Wargi yang membutuhkan obat,
    yuk konsultasikan terlebih dahulu dengan dokter melalui layanan telekonsultasi dokter Pikobar.
  </p>
</template>

<script>
import { permohonanKebutuhan } from './backlinks'
import { TAP_PERMOHONAN_ISOMAN } from './events'
import { analytics } from '~/lib/firebase'
export default {
  data () {
    return {
      formLink: permohonanKebutuhan
    }
  },
  methods: {
    onClick () {
      if (analytics) {
        analytics.logEvent(TAP_PERMOHONAN_ISOMAN)
      }
      window.open(this.formLink, '_blank')
      return true
    }
  }
}
</script>
