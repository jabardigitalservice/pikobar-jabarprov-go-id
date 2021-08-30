<template>
  <div
    class="image-carousel"
  >
    <ImageCarouselButtonNav
      v-show="showNavigation"
      type="left"
      class="image-carousel__btn-nav image-carousel__btn-nav--prev"
      :disabled="isBtnPrevDisabled"
      :style="[btnPrevPositionStyles]"
      @click="onNavigate('prev')"
    />
    <div class="image-carousel__track-outer">
      <div class="image-carousel__track-inner">
        <ImageCarouselSkeleton
          v-show="isLoading"
        />
        <client-only>
          <Swiper
            v-show="!isLoading"
            ref="swiper"
            class="swiper image-carousel__swiper"
            :options="swiperOptions"
            @ready="onSwiperReady"
            @resize="onSwiperResize"
            @slide-change="onSwiperSlideChange"
          >
            <SwiperSlide
              v-for="(item, index) in items"
              :key="index"
              class="swiper-slide image-carousel__swiper-slide"
            >
              <slot name="item" v-bind="{ item, index }">
                <ImageCarouselItem
                  v-bind="item"
                  @click="onClickSlide(item, index)"
                />
              </slot>
            </SwiperSlide>
          </Swiper>
        </client-only>
      </div>
    </div>
    <ImageCarouselButtonNav
      v-show="showNavigation"
      type="right"
      class="image-carousel__btn-nav image-carousel__btn-nav--next"
      :disabled="isBtnNextDisabled"
      :style="[btnNextPositionStyles]"
      @click="onNavigate('next')"
    />
  </div>
</template>

<script>
import { Swiper, SwiperSlide, directive as swiper } from 'vue-awesome-swiper'
import _merge from 'lodash/merge'
import ImageCarouselSkeleton from './ImageCarouselSkeleton'
import ImageCarouselItem from './ImageCarouseItem'
import ImageCarouselButtonNav from './ImageCarouselButtonNav'

export default {
  name: 'ImageCarousel',
  components: {
    Swiper,
    SwiperSlide,
    ImageCarouselSkeleton,
    ImageCarouselItem,
    ImageCarouselButtonNav
  },
  directives: {
    swiper
  },
  props: {
    /**
     * Array of ImageCarouselItem's props
     * @See './ImageCarouselItem.vue'
     */
    items: {
      type: Array,
      default: null
    },
    /**
     * Show loading hint
     */
    loading: {
      type: Boolean
    },
    /**
     * Gap between button and carousel track
     */
    buttonGap: {
      type: Number,
      default: 32
    },
    swiperProps: {
      type: Object,
      default: () => ({
        slidesPerView: 1.25,
        spaceBetween: 8,
        centeredSlides: true,
        centeredSlidesBounds: false,
        breakpoints: {
          480: {
            slidesPerView: 1.25,
            spaceBetween: 16,
            centeredSlides: true,
            centeredSlidesBounds: true,
            navigation: false
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 16,
            centeredSlides: false,
            centeredSlidesBounds: true,
            navigation: true
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 32,
            centeredSlides: false,
            centeredSlidesBounds: true,
            navigation: true
          }
        }
      })
    }
  },
  data () {
    return {
      // determine if current render is happened
      // on server or client side
      isServerSide: true,
      isBtnPrevDisabled: true,
      isBtnNextDisabled: false,
      showNavigation: false
    }
  },
  computed: {
    swiperOptions () {
      const defaultProps = this.$options
        .props
        .swiperProps
        .default()
      const defaultOptions = {
        autoplay: {
          delay: 4000
        },
        pagination: false,
        navigation: false,
        allowTouchMove: true,
        loop: false
      }
      return _merge(
        defaultProps,
        defaultOptions,
        this.swiperProps
      )
    },
    isLoading () {
      return this.loading || this.isServerSide
    },
    btnPrevPositionStyles () {
      return {
        marginRight: `${this.buttonGap}px`
      }
    },
    btnNextPositionStyles () {
      return {
        marginLeft: `${this.buttonGap}px`
      }
    }
  },
  async mounted () {
    await this.$nextTick()
    this.isServerSide = false
  },
  methods: {
    onSwiperReady () {
      const { $swiper } = this.$refs.swiper
      this.showNavigation = $swiper.params.navigation
    },
    onSwiperResize () {
      const { $swiper } = this.$refs.swiper
      this.showNavigation = $swiper.params.navigation
    },
    onSwiperSlideChange () {
      const { $swiper } = this.$refs.swiper
      const { isBeginning, isEnd } = $swiper
      this.isBtnPrevDisabled = isBeginning
      this.isBtnNextDisabled = isEnd
    },
    onNavigate (direction) {
      const { $swiper } = this.$refs.swiper
      switch (direction) {
        case 'prev':
          return $swiper.slidePrev()
        case 'next':
          return $swiper.slideNext()
      }
    },
    onClickSlide (slide, slideIndex) {
      this.$emit('click:slide', slide, slideIndex)
    }
  }
}
</script>

<style lang="scss" scoped>
$--button-gap: 32px;

.image-carousel {
  @apply relative w-full
  flex flex-row flex-no-wrap
  justify-start items-center;

  &__track-outer {
    @apply overflow-hidden flex-1;
  }

  &__track-inner {
    @apply w-full;
  }

  &__swiper {
    @apply flex-none w-full;
  }

  &__swiper-slide {
    // width: 80% !important;
  }

  &__btn-nav {
    transition: all 0.3s ease;
    transition-property: transform, opacity;
    transform: translateY(0);

    @apply z-10 absolute
    flex-none;

    &--prev {
      left: 1rem;
    }

    &--next {
      right: 1rem;
    }
  }

  &:not(:hover) & {
    &__btn-nav {
      transform: translateY(1rem);
      @apply opacity-0;
    }
  }
}
</style>

<style lang="scss">
/* purgecss start ignore */
@import 'swiper/css/swiper.css';
/* purgecss end ignore */
</style>
