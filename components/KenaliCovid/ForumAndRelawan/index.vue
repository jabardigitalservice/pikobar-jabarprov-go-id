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
    return {
      cards: Object.freeze([
        {
          title: 'Tanya kepada sesama wargi Jabar soal penanganan Covid-19 di Forum Pikobar!',
          prompt: 'Tanyakan Sekarang',
          image: require('~/assets/illustrations/forum.svg'),
          backlink: 'https://forum.pikobar.jabarprov.go.id/'
        },
        {
          title: 'Ingin berkontribusi membantu Jabar dalam menangani Covid-19?',
          prompt: 'Daftar Relawan',
          image: require('~/assets/illustrations/volunteer.svg'),
          backlink: 'https://indorelawan.org/p/pikobar'
        }
      ])
    }
  }
}
</script>

<style lang="scss" scoped>
.grids {
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
