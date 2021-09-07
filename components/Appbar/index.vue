<template>
  <header
    :class="{
      'appbar': true,
      'appbar--shadowed': showAppbarShadow
    }"
  >
    <PWAPopupBar />
    <div class="container mx-auto p-4">
      <MobileAppBar :toggle-drawer="drawerActive" @toggle:drawer="$emit('toggle:drawer', $event)" />
      <DesktopAppBar />
    </div>
  </header>
</template>

<script>
import _throttle from 'lodash/throttle'
export default {
  components: {
    PWAPopupBar: () => import('./PWAPopupBar'),
    MobileAppBar: () => import('./mobile'),
    DesktopAppBar: () => import('./desktop')
  },
  props: {
    drawerActive: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      showAppbarShadow: false
    }
  },
  mounted () {
    this.determineShadow()
    window.addEventListener('scroll', this.determineShadow)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.determineShadow)
  },
  methods: {
    determineShadow: _throttle(
      function () {
        if (!window) {
          return
        }
        const { scrollY } = window
        this.showAppbarShadow = scrollY > 0
      },
      1000 / 60,
      { leading: true, trailing: true }
    )
  }
}
</script>

<style lang="scss" scoped>
.appbar {
  font-family: 'Product Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif !important;
  @apply sticky
  top-0 z-10
  bg-white
  border-b border-solid border-gray-300;

  &::before {
    content: '';

    @apply z-10 absolute inset-0
    shadow-xl
    opacity-0
    transition-opacity
    duration-300
    ease-linear;
  }

  &--shadowed::before {
    @apply opacity-100;
  }

  > * {
    @apply relative z-10;
  }
}
</style>
