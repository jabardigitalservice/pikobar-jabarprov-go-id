<template>
  <div class="w-full bg-gray-100">
    <div v-if="alertUpdate" class="bg-brand-yellow-darkest">
      <div class="container mx-auto">
        <div class="flex px-6 py-4">
          <div class="text-sm w-full">
            Ada update versi terbaru.
            <button
              class="ml-2 bg-brand-blue text-white font-bold py-1 px-4 rounded focus:outline-none focus:ring"
              type="button"
              @click="refreshApp"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
    <Appbar :drawer-active="isDrawerOpen" @toggle:drawer="isDrawerOpen = $event" />
    <div ref="sidebarTopRef" style="visibility: hidden;" />
    <AppDrawer ref="drawer" :show.sync="isDrawerOpen" class="lg:hidden" />
    <div
      class="w-full"
      style="min-height: 75vh;"
    >
      <nuxt />
    </div>
    <BackToTopButton />
    <AppFooter />
  </div>
</template>

<script>
import _throttle from 'lodash/throttle'
import Appbar from '~/components/Appbar'
import AppDrawer from '~/components/AppDrawer'
import AppFooter from '~/components/AppFooter'
import BackToTopButton from '~/components/BackToTopButton'
export default {
  components: {
    Appbar,
    AppDrawer,
    BackToTopButton,
    AppFooter
  },
  data () {
    return {
      layout: null,
      defaultLayout: 'default',
      alertUpdate: false,
      refreshing: false,
      registration: null,
      isDrawerOpen: false
    }
  },
  computed: {
    isTopLevelRoute () {
      return this.$route.path.split('/').length < 3 || this.$route.path.match(/\/donate/g)
    }
  },
  mounted () {
    if ('serviceWorker' in navigator) {
      document.addEventListener('swUpdated', this.showRefreshUI, { once: true })

      // Refresh all open app tabs when a new service worker is installed.
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (this.refreshing) {
          return
        }
        this.refreshing = true
        window.location.reload()
      })
    }
  },
  beforeUpdate () {
    this.$nextTick(() => {
      this.setDrawerFixedPosition()
      this.unwatchWindowResize()
      setTimeout(() => {
        this.watchWindowResize()
      }, 50)
    })
  },
  methods: {
    watchWindowResize () {
      if (!window) {
        return
      }
      window.addEventListener('resize', this.onWindowResize, { passive: false })
    },
    unwatchWindowResize () {
      window.removeEventListener('resize', this.onWindowResize, { passive: false })
    },
    onWindowResize: _throttle(function (e) {
      this.setDrawerFixedPosition()
    }, 1000 / 60),
    setDrawerFixedPosition () {
      const ref = this.$refs.sidebarTopRef
      const drawer = this.$refs.drawer
      if (!ref || !drawer) {
        return
      }
      const top = ref.offsetTop
      drawer.$el.style.setProperty('top', top + 'px')
    },
    showRefreshUI (e) {
      // Display a snackbar inviting the user to refresh/reload the app due
      // to an app update being available.
      // The new service worker is installed, but not yet active.
      // Store the ServiceWorkerRegistration instance for later use.
      this.registration = e.detail

      this.alertUpdate = true
    },

    refreshApp () {
      this.alertUpdate = false
      // Protect against missing registration.waiting.
      if (!this.registration || !this.registration.waiting) { return }
      this.registration.waiting.postMessage('skipWaiting')
    }
  }
}
</script>
