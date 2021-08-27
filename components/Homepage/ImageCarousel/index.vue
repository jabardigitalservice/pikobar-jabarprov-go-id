<template>
  <ImageCarousel
    :items="banners"
    :loading="loading"
    :peek-width="0.1"
    peek-center
  />
</template>

<script>
import { mapState } from 'vuex'
import { ImageCarousel } from '~/components/ImageCarouselV2'
export default {
  name: 'HomepageImageCarousel',
  components: {
    ImageCarousel
  },
  computed: {
    ...mapState({
      banners: (state) => {
        const items = state.banners?.items || []
        return items.map(item => ({
          ...item,
          src: item.url,
          alt: item.title
        }))
      }
    }),
    loading () {
      return !Array.isArray(this.banners) ||
        !this.banners.length
    }
  },
  mounted () {
    this.$store.dispatch('banners/getItems')
  }
}
</script>
