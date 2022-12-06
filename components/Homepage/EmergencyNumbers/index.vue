<template>
  <ActionCardGrid :cards="cards" />
</template>

<script>
import ActionCardGrid from '~/components/Base/ActionCardGrid'
export default {
  components: {
    ActionCardGrid
  },
  data () {
    const hotlineMessage = encodeURIComponent('Halo Admin! Saya ingin tanya seputar PIKOBAR')
    return {
      cards: Object.freeze([
        {
          title: 'Hubungi nomor darurat jika Anda mendapati keadaan darurat',
          prompt: 'Nomor Darurat 119',
          image: require('~/assets/illustrations/chatbot.svg'),
          backlink: 'tel:119'
        },
        {
          title: 'Ingin chat lebih banyak lagi seputar Covid-19? Hubungi Hotline kami di sini',
          prompt: 'Hotline Pikobar',
          image: require('~/assets/illustrations/konsultasi-dokter.png'),
          backlink: `https://wa.me/${process.env.HOTLINE_PIKOBAR}?text=${hotlineMessage}`
        }
      ])
    }
  }
}
</script>
