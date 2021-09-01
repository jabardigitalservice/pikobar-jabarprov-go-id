<template>
  <ImageCarousel
    class="infographic-carousel"
    :items="infographics"
    :loading="loading"
    :swiper-props="swiperProps"
    @click:slide="onClickSlide"
  />
</template>

<script>
import { mapState } from 'vuex'
import { ImageCarousel } from '~/components/ImageCarouselV2'
export default {
  name: 'HomepageInfographicCarousel',
  components: {
    ImageCarousel
  },
  data () {
    return {
      swiperProps: Object.freeze({
        navigation: false,
        centeredSlides: false,
        spaceBetween: 16,
        breakpoints: {
          480: {
            slidesPerView: 2.25,
            centeredSlides: false,
            navigation: false
          },
          640: {
            slidesPerView: 3.25,
            centeredSlides: false,
            navigation: false
          },
          1024: {
            slidesPerView: 4,
            centeredSlides: false,
            navigation: false
          }
        }
      })
    }
  },
  computed: {
    ...mapState({
      infographics: (state) => {
        const items = state.infographics?.items || []
        return items.map(item => ({
          ...item,
          src: item.downloadURL,
          alt: item.title,
          caption: item.title
        }))
      }
    }),
    loading () {
      return !Array.isArray(this.infographics) ||
        !this.infographics.length
    }
  },
  mounted () {
    this.$store.dispatch('infographics/getItems', {
      perPage: 4
    })
  },
  methods: {
    onClickSlide (slide) {
      const { route } = slide
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

<style lang="scss" scoped>
.infographic-carousel::v-deep {
  .image-carousel__swiper-slide {
    @apply overflow-hidden
    border border-solid border-gray-300
    rounded-lg;
  }
}
</style>
