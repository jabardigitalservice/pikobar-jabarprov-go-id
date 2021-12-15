<template>
  <client-only>
    <div
      @mouseover="showNavigation = true"
      @mouseleave="showNavigation = false"
    >
      <template v-if="!isPending">
        <VueCarousel ref="vueCarousel" v-bind="carouselConfig">
          <VueCarouselSlide
            v-for="(item, index) in carouselItems"
            :key="index"
            :class="['banner-slide', item.action_url && 'cursor-pointer']"
            @slide-click="onItemClick(item)"
          >
            <img
              role="main"
              :src="item.url"
              :style="{'object-fit': item.objectFit || 'contain'}"
            >
          </VueCarouselSlide>
        </VueCarousel>
      </template>
      <template v-else>
        <slot name="pending">
          <div class="bg-white p-8 rounded-lg">
            <content-loader
              :speed="2"
              width="400"
              height="200"
            >
              <rect
                x="0"
                y="0"
                rx="0"
                ry="0"
                width="100%"
                height="100%"
              />
            </content-loader>
          </div>
        </slot>
      </template>
      <!-- assume that device smaller than 768px is touch device -->
      <div class="hidden md:flex flex-row justify-between items-center pointer-events-none absolute top-0 left-0 right-0 h-full p-4">
        <transition
          name="carousel-nav-appear-transition"
          enter-class="carousel-nav-appear-transition-enter--left"
          leave-to-class="carousel-nav-appear-transition-leave-to--left"
        >
          <button
            v-show="showNavigation"
            class="carousel-nav-button carousel-nav-button--left"
            @click="navigate('prev')"
          >
            <FontAwesomeIcon :icon="icon.faChevronLeft" />
          </button>
        </transition>
        <transition
          name="carousel-nav-appear-transition"
          enter-class="carousel-nav-appear-transition-enter--right"
          leave-to-class="carousel-nav-appear-transition-leave-to--right"
        >
          <button
            v-show="showNavigation"
            class="carousel-nav-button carousel-nav-button--right"
            @click="navigate('next')"
          >
            <FontAwesomeIcon :icon="icon.faChevronRight" />
          </button>
        </transition>
      </div>
    </div>
  </client-only>
</template>

<script>
import { ContentLoader } from 'vue-content-loader'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'

export default {
  name: 'ImageCarousel',
  components: {
    ContentLoader
  },
  props: {
    items: {
      type: [Array, Function, Promise],
      default: null
    },
    carouselProps: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      icon: {
        faChevronLeft,
        faChevronRight
      },

      isPending: true,
      error: null,
      carouselItems: null,

      showNavigation: false
    }
  },
  computed: {
    carouselConfig () {
      const def = {
        autoplay: true,
        autoplayTimeout: 4000,
        paginationEnabled: false,
        navigationEnabled: false,
        perPage: 1,
        mouseDrag: true,
        loop: true
      }
      return Object.assign({}, def, this.carouselProps)
    }
  },
  watch: {
    items: {
      immediate: true,
      handler (v) {
        let promise
        if (Array.isArray(this.items)) {
          promise = Promise.resolve(this.items)
        } else if (typeof this.items === 'function') {
          promise = this.items()
        } else if (this.items instanceof Promise) {
          promise = this.items
        } else {
          promise = Promise.resolve([])
        }
        this.isPending = true
        this.error = null
        this.carouselItems = null
        promise
          .then((carouselItems) => {
            this.carouselItems = JSON.parse(JSON.stringify(carouselItems))
          }).catch((e) => {
            this.error = e
          }).finally(() => {
            this.isPending = false
          })
      }
    }
  },

  methods: {
    onItemClick (item) {
      if (item.action_url) {
        window.open(item.action_url, '_blank')
      }
    },
    navigate (where) {
      if (!this.$refs.vueCarousel) {
        return
      }
      switch (where) {
        case 'next':
          this.$refs.vueCarousel.handleNavigation()
          break
        case 'prev':
          this.$refs.vueCarousel.handleNavigation('backward')
          break
      }
    },
    getCurrentPage () {
      return this.$refs.vueCarousel.currentPage
    }
  }
}
</script>

<style lang="scss" scoped>
.banner-slide {
  padding-top: (400% / 713);
  @apply relative flex flex-row justify-center items-center;

  > img[role="main"] {
    @apply absolute top-0 w-full h-full object-top;
  }
}

.carousel-nav-button {
  box-shadow: 0 0 0.5rem 0 rgba(0,0,0,0.1), 0 0.25rem 1.5rem 0 rgba(0,0,0,0.1);
  @apply pointer-events-auto
  relative flex justify-center items-center
  w-16 h-16 rounded-full
  text-lg
  bg-white;

  &:focus,
  &:active {
    outline: none;
  }

  &:hover {
    @apply bg-gray-200;
  }
  &:active {
    @apply bg-white;
  }
}

.carousel-nav-appear-transition {
  &-enter--left,
  &-leave-to--left {
    transform: translateX(-2rem);
    opacity: 0;
  }

  &-enter--right,
  &-leave-to--right {
    transform: translateX(2rem);
    opacity: 0;
  }

  &-enter-active,
  &-leave-active {
    transition-property: transform opacity;
    transition-duration: 0.2s;
    transition-timing-function: ease-out;
  }
}
</style>

<style lang="scss">
.VueCarousel,
.VueCarousel-wrapper,
.VueCarousel-inner {
  height: 100% !important;
}

.VueCarousel {
  position: relative;

  .VueCarousel-pagination {
    position: absolute;
    bottom: 0;
  }
}
</style>
