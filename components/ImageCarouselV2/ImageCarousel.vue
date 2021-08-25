<template>
  <div
    class="image-carousel"
    :style="[carouselStyles]"
  >
    <ImageCarouselButtonNav
      v-show="showNavigation"
      type="left"
      class="image-carousel__btn-nav"
      :disabled="isBtnPrevDisabled"
      :style="[btnPrevPositionStyles]"
      @click="onNavigate('backward')"
    />
    <div class="image-carousel__track">
      <ImageCarouselSkeleton
        v-show="loading || isServerSide"
        key="skeleton"
      />
      <client-only>
        <VueCarousel
          v-show="!loading"
          ref="vueCarousel"
          v-bind="carouselConfig"
          @hook:updated="onCarouselUpdated"
        >
          <VueCarouselSlide
            v-for="(item, index) in items"
            :key="index"
            :style="[slidePaddingStyles]"
          >
            <slot name="item" v-bind="{ item, index }">
              <ImageCarouselItem
                v-bind="item"
                @click="onClickSlide(item, index)"
              />
            </slot>
          </VueCarouselSlide>
        </VueCarousel>
      </client-only>
    </div>
    <ImageCarouselButtonNav
      v-show="showNavigation"
      type="right"
      class="image-carousel__btn-nav image-carousel__btn-nav--next"
      :disabled="isBtnNextDisabled"
      :style="[btnNextPositionStyles]"
      @click="onNavigate()"
    />
  </div>
</template>

<script>
import _merge from 'lodash/merge'
import ImageCarouselSkeleton from './ImageCarouselSkeleton'
import ImageCarouselItem from './ImageCarouseItem'
import ImageCarouselButtonNav from './ImageCarouselButtonNav'

export default {
  name: 'ImageCarousel',
  components: {
    ImageCarouselSkeleton,
    ImageCarouselItem,
    ImageCarouselButtonNav
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
     * Gap between slides
     */
    slideGap: {
      type: Number,
      default: 32
    },
    /**
     * Gap between button and carousel track
     */
    buttonGap: {
      type: Number,
      default: 32
    },
    navigation: {
      type: Boolean,
      default: true
    },
    carouselProps: {
      type: Object,
      default: () => ({
        perPage: 1,
        perPageCustom: [
          [720, 2],
          [1024, 3]
        ]
      })
    }
  },
  data () {
    return {
      // determine if current render is happened
      // on server or client side
      isServerSide: true,
      isBtnPrevDisabled: false,
      isBtnNextDisabled: false,
      currentViewportWidth: 0
    }
  },
  computed: {
    carouselConfig () {
      const defaultCarouselProps = this.$options
        .props
        .carouselProps
        .default()
      const defaultConfig = {
        autoplay: true,
        autoplayTimeout: 4000,
        paginationEnabled: false,
        navigationEnabled: false,
        spacePadding: 0,
        mouseDrag: true,
        touchDrag: true,
        loop: false,
        scrollPerPage: false
      }
      return _merge(
        defaultCarouselProps,
        defaultConfig,
        this.carouselProps
      )
    },
    showNavigation () {
      if (!this.navigation || this.loading) {
        return false
      }

      const { perPageCustom } = this.carouselConfig
      if (Array.isArray(perPageCustom)) {
        // arr[0] is minimum width of each perPageCustom config pair
        const widths = perPageCustom.map(arr => arr[0])
        const minWidth = Math.min(...widths)
        return this.currentViewportWidth > minWidth
      }
      return false
    },
    carouselStyles () {
      const styles = {}
      if (!this.showNavigation) {
        Object.assign(styles, {
          margin: `0 ${this.slideGap / -2}px`
        })
      }
      return styles
    },
    slidePaddingStyles () {
      return {
        padding: `0 ${this.slideGap / 2}px`
      }
    },
    btnPrevPositionStyles () {
      return {
        // ensure gap always reflect buttonGap value
        // regardless of gap between slide
        marginRight: `${this.buttonGap - (this.slideGap / 2)}px`
      }
    },
    btnNextPositionStyles () {
      return {
        // ensure gap always reflect buttonGap value
        // regardless of gap between slide
        marginLeft: `${this.buttonGap - (this.slideGap / 2)}px`
      }
    }
  },
  mounted () {
    this.isServerSide = false
    this.handleViewportResize()
    window.addEventListener('resize', this.handleViewportResize)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.handleViewportResize)
  },
  methods: {
    handleViewportResize () {
      // viewport width is used to determine whether to show
      // navigation button or not
      this.currentViewportWidth = window.innerWidth
    },
    onCarouselUpdated () {
      const { vueCarousel } = this.$refs

      // VueCarousel doesn't emit any event to determine
      // whether carousel can be advanced / navigated forward or backward
      // so, manual handling is written
      this.isBtnPrevDisabled = !vueCarousel.canAdvanceBackward
      this.isBtnNextDisabled = !vueCarousel.canAdvanceForward
    },
    onNavigate (direction) {
      // utilize VueCarousel own navigation method
      this.$refs.vueCarousel.handleNavigation(direction)
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
  overflow: hidden;

  @apply
  flex flex-row flex-no-wrap
  justify-start items-center;

  &__track {
    @apply flex-1;
  }

  &__btn-nav {
    @apply flex-none;
  }
}
</style>
