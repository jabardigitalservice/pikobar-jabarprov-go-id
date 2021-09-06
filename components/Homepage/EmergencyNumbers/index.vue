<template>
  <div class="emergency-numbers">
    <ActionCard
      v-for="(action, i) in actions"
      :key="i"
      v-bind="action"
    />
  </div>
</template>

<script>
import ActionCard from '~/components/Base/ActionCard'
export default {
  components: {
    ActionCard
  },
  computed: {
    actions () {
      const hotlineMessage = encodeURIComponent('Halo Admin! Saya ingin tanya seputar PIKOBAR')
      return [
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
          backlink: `https://wa.me/6285697391854?text=${hotlineMessage}`
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.emergency-numbers {
  @apply grid grid-cols-1 gap-4;

  @screen md {
    @apply grid-cols-2
    items-stretch;
  }

  @screen lg {
    @apply gap-8;
  }
}
</style>
