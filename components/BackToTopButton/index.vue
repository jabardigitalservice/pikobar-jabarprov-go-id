<template>
  <button
    :class="['button-back-to-top', !showButton && 'is-hidden']"
    @click="onScrollToTop"
  >
    <FontAwesomeIcon :icon="icon.faArrowUp" />
  </button>
</template>

<script>
import _throttle from 'lodash/throttle'
import _debounce from 'lodash/debounce'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'

const DIRECTION = {
  UP: 'up',
  DOWN: 'down'
}

export default {
  data () {
    return {
      icon: {
        faArrowUp
      },
      showButton: false,
      isInit: false,
      currentScrollY: 0,
      scrollingDirection: null,
      isScrollingToTop: false
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.init()
    })
  },
  methods: {
    init () {
      if (!this.isInit) {
        this.removeWindowEventListeners()
        this.addWindowEventListeners()
        this.isInit = true
      }
    },
    addWindowEventListeners () {
      window.addEventListener('scroll', this.onScrollListener)
      window.addEventListener('scroll', this.onScrollEndListener)
    },
    removeWindowEventListeners () {
      window.removeEventListener('scroll', this.onScrollListener)
      window.removeEventListener('scroll', this.onScrollEndListener)
    },
    onScrollListener: _throttle(function (e) {
      const top = window.scrollY
      const innerHeight = window.innerHeight
      const totalHeight = document.documentElement.scrollHeight

      if (totalHeight <= innerHeight || this.isScrollingToTop) {
        return
      }

      const diff = Math.abs(top - this.currentScrollY)
      if (diff > (innerHeight / 2)) {
        if (top > this.currentScrollY) {
          this.scrollingDirection = DIRECTION.DOWN
          this.showButton = top > innerHeight
        } else {
          this.scrollingDirection = DIRECTION.UP
          this.showButton = false
        }
        this.currentScrollY = top
      }
    }, 1000 / 60),
    onScrollEndListener: _debounce(function (e) {
      this.isScrollingToTop = false
      this.onScrollListener()
    }, 350),
    onScrollToTop (e) {
      this.isScrollingToTop = true
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.button-back-to-top {
  --translateY: -6rem;
  right: 2rem;
  bottom: 0;
  transform: translateY(var(--translateY));
  transition-property: transform, opacity;
  transition-duration: 0.45s;
  transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
  @apply z-10 fixed w-16 h-16 flex justify-center items-center rounded-full shadow-xl text-white text-xl bg-brand-green-darker;

  &:focus,
  &:active {
    outline: none;
  }

  &:focus,
  &:hover {
    @apply bg-brand-green-light;
  }

  &:active {
    @apply bg-brand-green-lighter;
  }

  &.is-hidden {
    opacity: 0;
    transform: translateY(4rem);
  }

  &:not(.is-hidden) {
    opacity: 1;
  }
}
</style>
