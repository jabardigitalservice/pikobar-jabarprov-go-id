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
    const chatbotMsg = encodeURIComponent('Halo Admin! Saya ingin tanya seputar Vaksinasi')
    return {
      cards: Object.freeze([
        {
          title: 'Ada pertanyaan seputar vaksinasi? Hubungi hotline kami di sini',
          prompt: 'Chatbot Pikobar',
          image: require('~/assets/illustrations/chatbot.svg'),
          backlink: `https://api.whatsapp.com/send/?phone=6285697391854&text=${chatbotMsg}`
        },
        {
          title: 'Ingin mencari pertanyaan lain seputar vaksinasi? Cek di sini',
          prompt: 'Halaman FAQ',
          image: require('~/assets/illustrations/faq.svg'),
          backlink: '/faq'
        }
      ])
    }
  }
}
</script>
