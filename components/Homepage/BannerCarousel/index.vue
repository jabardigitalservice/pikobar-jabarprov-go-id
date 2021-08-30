<template>
  <ImageCarousel
    :items="banners"
    :loading="loading"
  />
</template>

<script>
import { mapState } from 'vuex'
import { ImageCarousel } from '~/components/ImageCarouselV2'
export default {
  name: 'HomepageBannerCarousel',
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
