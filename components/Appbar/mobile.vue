<template>
  <div class="lg:hidden">
    <div
      class="flex justify-between items-center"
    >
      <div
        class="flex items-center"
      >
        <a
          class="cursor-pointer flex items-center mr-4"
          href="javascript:void(0)"
          @click.prevent="onToggleDrawer"
        >
          <FontAwesomeIcon :icon="icon.faBars" size="lg" class="text-gray-600 hover:text-green-700" />
        </a>
        <nuxt-link tag="img" to="/" class="flex-none block h-16 sm:h-10 mx-auto mr-3" src="/logo.jpg" alt />
        <nuxt-link to="/" tag="div" class="text-left">
          <p class="text-2xl font-bold">
            PIKOBAR
          </p>
          <p class="text-xs text-gray-700 font-bold">
            Pusat Informasi &amp; Koordinasi
          </p>
          <p class="text-xs text-gray-700 font-bold -mt-1">
            Provinsi Jawa Barat
          </p>
        </nuxt-link>
      </div>
      <nuxt-link
        tag="span"
        to="/notifications"
        :exact="true"
        class="cursor-pointer w-12 h-12 -mr-2 md:mr-0 flex items-center justify-center rounded-full text-gray-500 hover:bg-gray-200 box-content"
      >
        <FontAwesomeIcon
          :icon="icon.faBell"
        />
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import { faChevronLeft, faBell, faBars } from '@fortawesome/free-solid-svg-icons'

export default {
  props: {
    toggleDrawer: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      icon: {
        faBars,
        faChevronLeft,
        faBell
      },
      isDrawerToggled: false
    }
  },
  computed: {
    pathToGoBack () {
      return this.$store.state.route.from.path
    }
  },
  watch: {
    toggleDrawer: {
      immediate: true,
      handler (v) {
        this.isDrawerToggled = v
      }
    }
  },
  methods: {
    onToggleDrawer () {
      this.isDrawerToggled = !this.isDrawerToggled
      this.$emit('toggle:drawer', this.isDrawerToggled)
    },
    onGoBack () {
      this.$router.back()
    }
  }
}
</script>

<style>

</style>
