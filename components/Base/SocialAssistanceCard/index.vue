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
          title: 'Kini, cari data penerima bantuan Kemensos bisa lebih cepat dan praktis! Segera kunjungi tautan berikut untuk lakukan pengecekan',
          prompt: 'Cek Bansos',
          image: require('~/static/img/icon-artboard.png'),
          backlink: 'https://cekbansos.kemensos.go.id/'
        },
        {
          title: 'Informasi lebih lanjut seputar Data Penerima Bantuan Sosial Kementerian Sosial RI dapat diakses melalui link di bawah',
          prompt: 'DTKS Kemensos',
          image: require('~/static/img/logo-kemensos.png'),
          backlink: 'mailto:dtks@kemsos.co.id'
        }
      ])
    }
  }
}
</script>
