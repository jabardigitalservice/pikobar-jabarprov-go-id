<template>
  <div class="appbar-desktop">
    <div class="appbar-desktop__wrapper">
      <div
        class="appbar-desktop__brand"
      >
        <nuxt-link to="/">
          <img class="appbar-desktop__brand-logo" src="/logo.jpg" alt>
        </nuxt-link>
        <nuxt-link to="/">
          <div class="text-left">
            <p class="text-2xl font-bold">
              PIKOBAR
            </p>
            <p class="text-xs text-gray-700 font-bold">
              Pusat Informasi &amp; Koordinasi
            </p>
            <p class="text-xs text-gray-700 font-bold -mt-1">
              Provinsi Jawa Barat
            </p>
          </div>
        </nuxt-link>
      </div>
      <ul class="appbar-desktop__menus">
        <li
          v-for="(item, index) in menus"
          :key="index"
          :class="{
            'appbar-desktop__menus__list-item': true,
            'appbar-desktop__menus__list-item--has-children': item.children
          }"
        >
          <component
            :is="item.href ? 'a' : 'nuxt-link'"
            v-if="item.children === undefined"
            :key="`single:${index}`"
            v-bind="getAnchorProps(item)"
            :exact="item.exact"
            class="appbar-desktop__menu-item appbar-menu-item"
          >
            {{ item.label }}
          </component>

          <span
            v-if="item.children"
            :key="`group:${index}`"
            :class="[
              'appbar-desktop__menu-item-parent appbar-menu-item',
              isChildActive(item) && 'nuxt-link-active'
            ]"
          >
            <a class="flex justify-start items-center">
              {{ item.label }}
              <svg
                id="Capa_1"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 256 256"
                class="w-3 h-3 ml-2 fill-current"
                style="enable-background:new 0 0 256 256;"
                xml:space="preserve"
              >
                <g>
                  <g>
                    <polygon points="225.813,48.907 128,146.72 30.187,48.907 0,79.093 128,207.093 256,79.093" />
                  </g>
                </g>
              </svg>
            </a>
          </span>
          <ul
            v-if="item.children"
            class="appbar-menu-item__dropdown"
          >
            <li
              v-for="(itemSub, itemSubIndex) in item.children"
              :key="itemSubIndex"
            >
              <nuxt-link
                v-if="itemSub.to"
                :to="itemSub.to"
                :exact="itemSub.exact"
                class="appbar-desktop__menu-item-child appbar-menu-item"
              >
                {{ itemSub.label }}
              </nuxt-link>
              <a
                v-else-if="itemSub.href"
                :href="itemSub.href"
                target="_blank"
                class="appbar-desktop__menu-item-child appbar-menu-item"
              >
                {{ itemSub.label }}
              </a>
            </li>
          </ul>
        </li>
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
        {
          to: '#',
          label: 'Data',
          children: [
            { to: '/data', label: 'Statisik' },
            { to: '/distribution-case', label: 'Sebaran Kasus' },
            { to: '/distribution-healthcare', label: 'Keterisian Tempat Tidur' },
            { to: '/transmission-potential', label: 'Peta Potensi dan Risiko Penularan' }
          ]
        },
        { to: '/vaccine', label: 'Vaksinasi' },
        { to: '/isoman', label: 'Isoman' },
        { to: '/oxygen', label: 'Cari Oksigen' },
        { to: '/donate/logistic', label: 'Donasi' },
        {
          to: '#',
          label: 'Informasi',
          children: [
            { to: '/articles?tab=jabar', label: 'Berita' },
            { to: '/faq', label: 'FAQ' },
            { to: '/contact', label: 'Kontak' },
            { to: '/cekbansos', label: 'Bantuan Sosial' }
          ]
        }
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
  },
  methods: {
    getAnchorProps (m) {
      const { href, to } = m
      if (href) {
        return { href, target: '_blank' }
      }
      return { to }
    },
    isChildActive (item) {
      const { children = [] } = item
      if (!Array.isArray(children)) {
        return false
      }
      return children.some((child) => {
        const backlink = child.to || child.href || ''
        return this.$route.fullPath.startsWith(backlink)
      })
    }
  }
}
</script>
