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
            :class="['app-drawer__menu-item', isMenuItemActive(m) && 'is-active']"
            :href="m.to"
            @click.prevent="onClickMenuItem(m)"
          >
            <FontAwesomeIcon v-if="m.icon" :icon="m.icon" class="mr-4" />
            <span>
              {{ m.label }}
            </span>
          </a>
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
        { to: '/', label: 'Home', exact: true, icon: this.icon.faHome },
        { to: '/data', label: 'Data', icon: this.icon.faChartLine },
        { to: '/articles?tab=jabar', label: 'Berita', icon: this.icon.faNewspaper },
        { to: '/contact', label: 'Kontak', icon: this.icon.faPhoneAlt },
        { to: '/faq', label: 'FAQ', icon: this.icon.faQuestionCircle },
        { to: 'https://forum.pikobar.jabarprov.go.id/', label: 'Forum', icon: this.icon.faComment }
        // { to: '/donate', label: 'Donasi' }
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
    async loadIcons () {
      const lib = await import('@fortawesome/free-solid-svg-icons')
        .then(m => m ? m.default || m : null)
      if (!lib) {
        return
      }

      const { faHome, faChartLine, faNewspaper, faPhoneAlt, faQuestionCircle, faComment, faWallet } = lib
      this.icon = {
        faHome,
        faChartLine,
        faNewspaper,
        faPhoneAlt,
        faQuestionCircle,
        faComment,
        faWallet
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
    onClickMenuItem (menu) {
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
</script>

<style lang="scss" scoped>
.app-drawer {
  @apply pointer-events-none fixed inset-0 z-50;
}

.app-drawer__content {
  transition: transform 0.3s ease-out;
  transform: translateX(-100%);
  width: 75%;
  min-width: 300px;
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
