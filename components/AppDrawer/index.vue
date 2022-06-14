<template>
  <aside :class="['app-drawer', mShow && 'is-active']">
    <div
      ref="overlay"
      class="app-drawer__overlay"
      @click.self="animateHide"
    />
    <nav ref="content" class="app-drawer__content">
      <ul>
        <li v-for="(m, index) in menus" :key="index">
          <a
            v-if="m.children === undefined"
            :class="['app-drawer__menu-item' + ' 33', isMenuItemActive(m) && 'is-active']"
            v-bind="getAnchorProps(m)"
            @click.prevent="onClickMenuItem(m)"
          >
            <span class="app-drawer__menu-item__icon">
              <FontAwesomeIcon v-if="m.icon" :icon="m.icon" />
            </span>
            <span>
              {{ m.label }}
            </span>
          </a>
          <a
            v-if="m.children"
            :class="['app-drawer__menu-item', isMenuItemActive(m) && 'is-active']"
            v-bind="getAnchorProps(m)"
            @click.prevent="onClickMenuItem(m, index)"
          >
            <span class="app-drawer__menu-item__icon">
              <FontAwesomeIcon v-if="m.icon" :icon="m.icon" />
            </span>
            <span>
              {{ m.label }}
            </span>
            <span class="app-drawer__menu-item__arrow" :class="['hidden arrow-down-' + index]">
              <FontAwesomeIcon :icon="icon.faChevronDown" />
            </span>
            <span class="app-drawer__menu-item__arrow" :class="['arrow-right-' + index]">
              <FontAwesomeIcon :icon="icon.faChevronRight" />
            </span>
          </a>
          <ul v-if="m.children" :class="['hidden ml-5 submenu-' + index]">
            <li v-for="(subm, indexSub) in m.children" :key="indexSub">
              <a
                :class="[' ml-5 app-drawer__menu-item', isMenuItemActive(subm) && 'is-active']"
                :href="subm.to"
                @click.prevent="onClickMenuItem(subm)"
              >
                <span class="app-drawer__menu-item__icon">
                  <FontAwesomeIcon v-if="subm.icon" :icon="subm.icon" />
                </span>
                <span>
                  {{ subm.label }}
                </span>
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      mShow: false,
      icon: {}
    }
  },
  computed: {
    menus () {
      return [
        {
          to: '#',
          label: 'Data',
          icon: this.icon.faTachometerAlt,
          isExpanded: false,
          children: [
            { to: process.env.URL_STATISTIK, label: 'Statistik', icon: this.icon.faChartLine },
            { to: process.env.URL_FASYANKES_TREATMENT, label: 'Keterisian Tempat Tidur', icon: this.icon.faBed }
          ]
        },
        { to: '/vaccine', label: 'Vaksinasi', icon: this.icon.faSyringe },
        { to: '/isoman', label: 'Isoman', icon: this.icon.faHotel },
        {
          to: '#',
          label: 'Logistik',
          icon: this.icon.faBoxOpen,
          isExpanded: false,
          children: [
            { to: process.env.URL_LOGISTIC, label: 'Alat Kesehatan', icon: this.icon.faBoxOpen },
            { to: process.env.URL_LOGISTIC_VACCINE, label: 'Vaksin', icon: this.icon.faSyringe }
          ]
        },
        {
          to: '#',
          label: 'Informasi',
          icon: this.icon.faInfoCircle,
          isExpanded: false,
          children: [
            { to: '/articles?tab=jabar', label: 'Berita', icon: this.icon.faNewspaper },
            { to: '/faq', label: 'FAQ', icon: this.icon.faQuestionCircle },
            { to: '/cekbansos', label: 'Bantuan Sosial', icon: this.icon.faBoxOpen },
            { to: '/info/infographics', label: 'Info Praktikal', icon: this.icon.faInfoCircle },
            { to: '/info/documents', label: 'Dokumen', icon: this.icon.faFolderOpen },
            { to: '/transmission-potential', label: 'Peta Potensi dan Risiko Penularan', icon: this.icon.faMap }
          ]
        },
        { to: '/contact', label: 'Kontak', icon: this.icon.faPhoneAlt }
      ]
    }
  },
  created () {
    this.loadIcons()
  },
  mounted () {
    this.$watch(
      'show',
      function handler (v) {
        this.mShow = v
        this.$nextTick(() => {
          this.animate(v)
        })
      },
      { immediate: false }
    )
  },
  methods: {
    getAnchorProps (m) {
      const { href, to } = m
      if (href) {
        return { href, target: '_blank' }
      }
      return { to }
    },
    async loadIcons () {
      const lib = await import('@fortawesome/free-solid-svg-icons')
        .then(m => m ? m.default || m : null)
      if (!lib) {
        return
      }

      const {
        faHome,
        faHotel,
        faChartLine,
        faNewspaper,
        faPhoneAlt,
        faQuestionCircle,
        faComment,
        faWallet,
        faBoxOpen,
        faTachometerAlt,
        faMapMarked,
        faBed,
        faMap,
        faSyringe,
        faLungs,
        faFolderOpen,
        faInfoCircle,
        faChevronRight,
        faChevronDown
      } = lib
      this.icon = {
        faHome,
        faHotel,
        faChartLine,
        faNewspaper,
        faPhoneAlt,
        faQuestionCircle,
        faComment,
        faWallet,
        faBoxOpen,
        faTachometerAlt,
        faMapMarked,
        faBed,
        faMap,
        faSyringe,
        faLungs,
        faFolderOpen,
        faInfoCircle,
        faChevronRight,
        faChevronDown
      }
    },
    animate (toggled) {
      if (toggled) {
        this.animateShow()
      } else {
        this.animateHide()
      }
    },
    animateShow () {
      this.$emit('update:show', true)
      this.updateOverlayOpacity(1)
      this.showContent(true)
    },
    animateHide () {
      this.$emit('update:show', false)
      this.showContent(false)
      this.updateOverlayOpacity(0)
    },
    updateOverlayOpacity (opacity) {
      const overlay = this.$refs.overlay
      overlay.style.setProperty('opacity', opacity)
    },
    showContent (show) {
      const content = this.$refs.content
      content.style.setProperty('transform', `translateX(${show ? '0%' : '-100%'})`)
    },
    isExternalLink (path) {
      return path.startsWith('http')
    },
    isMenuItemActive (menu) {
      if (this.isExternalLink(menu.to)) {
        return
      }
      if (menu.exact) {
        return this.$route.path === menu.to
      } else {
        return this.$route.path.startsWith(menu.to)
      }
    },
    onClickMenuItem (menu, index = 0) {
      if (menu.children) {
        const x = document.getElementsByClassName('submenu-' + index)
        const arrowRight = document.getElementsByClassName('arrow-right-' + index)
        const arrowDown = document.getElementsByClassName('arrow-down-' + index)
        menu.isExpanded = !menu.isExpanded
        x[0].style.display = menu.isExpanded ? 'block' : 'none'
        arrowRight[0].style.display = menu.isExpanded ? 'none' : 'block'
        arrowDown[0].style.display = menu.isExpanded ? 'block' : 'none'
      } else {
        this.animateHide()
        setTimeout(() => {
          if (this.isExternalLink(menu.to)) {
            window.open(menu.to, '_blank')
            return
          }
          this.$router.push({
            path: menu.to
          }, null, () => {})
        }, 350)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.app-drawer {
  @apply pointer-events-none fixed inset-0 z-50;
}

.app-drawer__content {
  transition: transform 0.3s ease-out;
  transform: translateX(-100%);
  width: 75%;
  max-width: 400px;
  min-width: 300px;
  overflow: auto;
  @apply absolute top-0 left-0 bottom-0
  bg-white;
}

.app-drawer__overlay {
  transition: opacity 0.3s ease-out;
  opacity: 0;
  background-color: rgba(0,0,0,0.5);
  @apply absolute inset-0;
}

.app-drawer.is-active {
  @apply pointer-events-auto;
}

.app-drawer__menu-item {
  @apply cursor-pointer
  flex flex-row items-center
  text-xl text-gray-600 p-4;

  &__icon {
    min-width: 36px;
    display: inline-block;
  }

  &__arrow {
    @apply absolute right-0 mr-4;
  }

  &.is-active {
    @apply text-green-500;
  }

  &:hover {
    @apply
    text-white
    bg-green-500;
  }
}
</style>
