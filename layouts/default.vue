<template>
  <div class="w-full bg-gray-100">
    <div v-if="alertUpdate" class="bg-brand-yellow-darkest">
      <div class="container mx-auto">
        <div class="flex px-6 py-4">
          <div class="text-sm w-full">
            Ada update versi terbaru.
            <button
              class="ml-2 bg-brand-blue text-white font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline"
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
    <AppDrawer ref="drawer" :show.sync="isDrawerOpen" class="-mt-4 md:hidden" />
    <div
      class="w-full"
      style="min-height: 75vh;"
    >
      <div ref="sidebarTopRef" style="visibility: hidden;" />
      <nuxt />
    </div>
    <BackToTopButton />
    <AppFooter v-show="isTopLevelRoute" class="container mx-auto pb-32">
      <SponsorList :title-sponsor="this.$route.path.startsWith('/donate') ? 'Thanks To :' : null" class="m-4 md:m-8 p-5 md:p-8 rounded-lg bg-white shadow-md" />
    </AppFooter>
  </div>
</template>

<script>
import _throttle from 'lodash/throttle'
import Appbar from '~/components/Appbar'
import AppDrawer from '~/components/AppDrawer'
import AppFooter from '~/components/AppFooter'
import SponsorList from '~/components/SponsorList'
import BackToTopButton from '~/components/BackToTopButton'
export default {
  components: {
    Appbar,
    AppDrawer,
    BackToTopButton,
    AppFooter,
    SponsorList
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
      return this.$route.path.split('/').length < 3
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
