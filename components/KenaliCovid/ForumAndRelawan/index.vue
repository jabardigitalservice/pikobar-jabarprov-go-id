<template>
  <div class="grids">
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
      return [
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
      ]
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
