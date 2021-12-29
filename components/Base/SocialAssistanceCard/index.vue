<template>
  <ActionCardGrid :cards="cards" />
</template>

<script>
import ActionCardGrid from '../ActionCardGrid'
export default {
  components: {
    ActionCardGrid
  },
  data () {
    return {
      cards: Object.freeze([
        {
          title: 'Lebih praktis & cepat cari data penerima Bansos Kemensos, klik tombol berikut untuk lakukan pengecekan',
          prompt: 'Cek Bansos',
          image: require('~/static/img/icon-artboard.png'),
          backlink: 'https://cekbansos.kemensos.go.id/'
        },
        {
          title: 'Hubungi email Kementerian Sosial RI untuk informasi lebih jauh seputar Bansos Kemensos',
          prompt: 'Kontak',
          image: require('~/static/img/logo-kemensos.png'),
          backlink: 'mailto:dtks@kemsos.co.id'
        }
      ])
    }
  }
}
</script>
