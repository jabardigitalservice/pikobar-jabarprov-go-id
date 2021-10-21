<template>
  <ImageCarousel
    class="news-carousel"
    :items="items"
    :loading="loading"
    :swiper-props="swiperProps"
  >
    <template #item="{ item }">
      <NewsCarouselItem v-bind="item" />
    </template>
  </ImageCarousel>
</template>

<script>
import NewsCarouselItem from './NewsCarouselItem'
import { ImageCarousel } from '~/components/Base/ImageCarousel'

export default {
  name: 'NewsCarousel',
  components: {
    ImageCarousel,
    NewsCarouselItem
  },
  props: {
    /**
     * Array of NewsCarouselItem's props.
     * @See './NewsCarouselItem.vue'
     */
    items: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean
    }
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
  }
}
</script>

<style lang="scss" scoped>
.news-carousel::v-deep {
  .swiper-wrapper {
    @apply flex-row flex-nowrap items-stretch;
  }
  .swiper-slide {
    @apply h-auto;
  }
}
</style>
