<template>
  <div
    :class="{
      'image-carousel': true,
      'image-carousel--bleed': isBleed
    }"
  >
    <ImageCarouselButtonNav
      v-show="showNavigation"
      type="left"
      class="image-carousel__btn-nav image-carousel__btn-nav--prev"
      :disabled="isBtnPrevDisabled"
      :style="[btnPrevPositionStyles]"
      @click="onNavigate('prev')"
    />
    <div class="image-carousel__track">
      <ImageCarouselSkeleton
        v-show="isLoading"
      />
      <client-only>
        <Swiper
          v-if="!isLoading"
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
import 'swiper/css/swiper.css'
import _inRange from 'lodash/inRange'
import _get from 'lodash/get'
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
        centeredSlidesBounds: true,
        navigation: false,
        bleed: true,
        breakpoints: {
          480: {
            slidesPerView: 1.25,
            spaceBetween: 16,
            centeredSlides: true,
            centeredSlidesBounds: true,
            navigation: false,
            bleed: true
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 16,
            centeredSlides: false,
            centeredSlidesBounds: true,
            navigation: false,
            bleed: true
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 32,
            centeredSlides: false,
            centeredSlidesBounds: true,
            navigation: true,
            bleed: false
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
      isBleed: false,
      showNavigation: false
    }
  },
  computed: {
    swiperBreakpoints () {
      return Object
        .keys(this.swiperOptions.breakpoints ?? {})
        .map(Number)
    },
    swiperOptions () {
      const defaultProps = this.$options
        .props
        .swiperProps
        .default()
      const defaultOptions = {
        autoplay: {
          delay: 4000
        },
        navigation: false,
        allowTouchMove: false,
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
    getMatchedBreakpoint () {
      // sorted and reversed due to
      // min-width matching strategy
      const sorted = [...this.swiperBreakpoints]
        .sort((a, b) => b - a)

      return sorted.find((width, i) => {
        // first index is widest breakpoint
        if (i === 0) {
          return window.innerWidth >= width
        }
        const [min, max] = [width, sorted[i - 1]]
        return _inRange(window.innerWidth, min, max)
      })
    },
    getConfigByBreakpoint (name) {
      const bp = this.getMatchedBreakpoint()
      let value = _get(this.swiperOptions, `breakpoints.${bp}.${name}`)
      if (typeof value === 'undefined') {
        value = _get(this.swiperOptions, name)
      }
      return value
    },
    handleTouchMove () {
      const { $swiper } = this.$refs.swiper
      const slidesPerView = this.getConfigByBreakpoint('slidesPerView')
      $swiper.allowTouchMove = this.items.length > slidesPerView
    },
    handleResponsiveBleed () {
      this.isBleed = this.getConfigByBreakpoint('bleed')
    },
    handleNavigation () {
      const { $swiper } = this.$refs.swiper
      this.showNavigation = $swiper.params.navigation
    },
    onSwiperReady () {
      this.handleNavigation()
      this.handleTouchMove()
      this.handleResponsiveBleed()
    },
    onSwiperResize () {
      this.handleNavigation()
      this.handleTouchMove()
      this.handleResponsiveBleed()
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
.image-carousel {
  @apply relative w-full
  flex flex-row flex-nowrap
  justify-start items-center;

  &__track {
    @apply w-full;
  }

  &__swiper {
    @apply flex-none w-full;
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

.image-carousel--bleed::v-deep {
  .swiper-container {
    overflow: hidden;
  }
}
</style>
