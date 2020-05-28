<template>
  <div class="hidden md:block md:mx-4">
    <div class="flex justify-between items-center">
      <div
        class="flex items-center"
      >
        <nuxt-link to="/">
          <img class="block h-10 mx-auto mr-4" src="/logo.jpg" alt>
        </nuxt-link>
        <nuxt-link to="/">
          <div class="text-left">
            <p class="text-base">
              Pusat Informasi <br class="inline-block md:hidden"> &amp;  Koordinasi COVID-19
            </p>
            <p class="text-sm text-gray-700">
              Provinsi Jawa Barat
            </p>
          </div>
        </nuxt-link>
      </div>
      <!-- <ul class="hidden md:block lg:hidden">
            Menu
          </ul> -->
      <ul class="flex flex-row items-center">
        <nuxt-link
          v-for="item in menus"
          :key="item.to"
          tag="li"
          :to="item.to"
          :exact="item.exact"
          class="hidden lg:flex appbar-menu-item cursor-pointer mx-2 px-2 py-2 hover:bg-gray-200"
        >
          <a>
            {{ item.label }}
          </a>
        </nuxt-link>
        <nuxt-link
          tag="li"
          to="/notifications"
          :exact="true"
          class="cursor-pointer w-12 h-12 flex items-center justify-center rounded-full hover:bg-gray-200 box-content"
        >
          <a class="text-gray-500">
            <FontAwesomeIcon
              :icon="icon.faBell"
            />
          </a>
        </nuxt-link>
        <a
          v-show="enableDownload"
          :href="downloadAppURL"
          class="cursor-pointer px-4 py-2 text-center ml-2 rounded-md bg-brand-green hover:bg-brand-green-light"
          style="color: white;"
        >
          Download App
        </a>
      </ul>
    </div>
  </div>
</template>

<script>
import { faChevronLeft, faBell, faBars } from '@fortawesome/free-solid-svg-icons'
export default {
  data () {
    return {
      icon: {
        faBars,
        faChevronLeft,
        faBell
      },
      menus: [
        { to: '/', label: 'Home', exact: true },
        { to: '/data', label: 'Data' },
        { to: '/articles?tab=jabar', label: 'Berita' },
        { to: '/faq', label: 'FAQ' },
        { to: '/contact', label: 'Kontak' }
        // { to: '/donate', label: 'Donasi' }
      ]
    }
  },
  computed: {
    enableDownload () {
      const { config } = this.$store.state['remote-config']
      return !!config && !!config.enableDownload
    },
    downloadAppURL () {
      const { config } = this.$store.state['remote-config']
      return !!config && !!config.downloadAppURL ? config.downloadAppURL : '#'
    }
  }
}
</script>

<style lang="scss" scoped>
.appbar-menu-item.nuxt-link-active {
  &,
  > * {
    @apply text-brand-green font-bold;
  }
}
</style>
