<template>
  <div
    class="image-carousel"
  >
    <ImageCarouselButtonNav
      v-show="showNavigation"
      type="left"
      :disabled="isBtnPrevDisabled"
      class="image-carousel__btn-nav"
      :style="[btnPrevPositionStyles]"
      @click="onNavigate('backward')"
    />
    <div class="image-carousel__track">
      <client-only>
        <ImageCarouselSkeleton
          v-show="loading || isServerSide"
          key="skeleton"
        />
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
            <ImageCarouselItem
              v-bind="item"
              @click="onClickSlide(item, index)"
            />
          </VueCarouselSlide>
        </VueCarousel>
      </client-only>
    </div>
    <ImageCarouselButtonNav
      v-show="showNavigation"
      :disabled="isBtnNextDisabled"
      type="right"
      class="image-carousel__btn-nav image-carousel__btn-nav--next"
      :style="[btnNextPositionStyles]"
      @click="onNavigate()"
    />
  </div>
</template>

<script>
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
    height: {
      type: Number,
      default: 200
    },
    items: {
      type: Array,
      default: null
    },
    loading: {
      type: Boolean
    },
    perPage: {
      type: Number,
      default: 1
    },
    /**
     * @See https://ssense.github.io/vue-carousel/api/#perPageCustom
     */
    perPageCustom: {
      type: [Number, Array],
      default: () => {
        return [
          [720, 2],
          [1024, 3]
        ]
      }
    },
    slideGap: {
      type: Number,
      default: 32
    },
    buttonGap: {
      type: Number,
      default: 32
    }
  },
  data () {
    return {
      isServerSide: true,
      isBtnPrevDisabled: false,
      isBtnNextDisabled: false,
      currentViewportWidth: 0
    }
  },
  computed: {
    carouselConfig () {
      const config = {
        autoplay: false,
        autoplayTimeout: 4000,
        paginationEnabled: false,
        navigationEnabled: false,
        perPage: this.perPage,
        perPageCustom: this.perPageCustom,
        spacePadding: 0,
        mouseDrag: true,
        touchDrag: true,
        loop: false
      }
      return config
    },
    showNavigation () {
      if (this.loading) {
        return false
      }
      if (Array.isArray(this.perPageCustom)) {
        const widths = this.perPageCustom.map(arr => arr[0])
        const minWidth = Math.min(...widths)
        return this.currentViewportWidth > minWidth
      }
      return false
    },
    slidePaddingStyles () {
      return {
        padding: `0 ${this.slideGap / 2}px`
      }
    },
    btnPrevPositionStyles () {
      return {
        marginRight: `${this.buttonGap - (this.slideGap / 2)}px`
      }
    },
    btnNextPositionStyles () {
      return {
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
      this.currentViewportWidth = window.innerWidth
    },
    onCarouselUpdated () {
      const { vueCarousel } = this.$refs
      this.isBtnPrevDisabled = !vueCarousel.canAdvanceBackward
      this.isBtnNextDisabled = !vueCarousel.canAdvanceForward
    },
    onNavigate (direction) {
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
    min-height: 200px;
    @apply flex-1;
  }

  &__btn-nav {
    @apply flex-none;
  }
}
</style>
