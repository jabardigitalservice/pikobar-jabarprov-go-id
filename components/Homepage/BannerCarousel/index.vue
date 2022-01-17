<template>
  <ImageCarousel
    :items="banners"
    :loading="loading"
    @click:slide="onClickSlide"
  />
</template>

<script>
import { mapState } from 'vuex'
import { ImageCarousel } from '~/components/Base/ImageCarousel'
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
  },
  methods: {
    onClickSlide (slide) {
      const route = slide.route || slide.action_url
      if (typeof route !== 'string' || !route.length) {
        return
      }
      if (route.startsWith('http')) {
        return window.open(route, '_blank')
      } else {
        return this.$router.push(route)
      }
    }
  }
}
</script>
