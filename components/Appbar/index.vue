<template>
  <header
    class="appbar"
    style="box-shadow: 0 0px 32px -4px rgba(0,0,0,0.15)"
  >
    <PWAPopupBar />
    <div class="container mx-auto p-4">
      <MobileAppBar :toggle-drawer="drawerActive" @toggle:drawer="$emit('toggle:drawer', $event)" />
      <DesktopAppBar />
    </div>
  </header>
</template>

<script>
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
}
</style>
