<template>
  <div class="image-carousel-skeleton">
    <!--
      FIXME: do not use content-loader since relative width
      and height on SVG would throw error
    -->
    <content-loader
      :speed="2"
      width="100%"
      height="100%"
      class="w-full h-full"
    >
      <rect
        x="0"
        y="0"
        rx="8"
        ry="8"
        width="100%"
        height="100%"
      />
    </content-loader>
  </div>
</template>

<script>
import { ContentLoader } from 'vue-content-loader'
export default {
  components: {
    ContentLoader
  }
}
</script>

<style lang="scss" scoped>
.image-carousel-skeleton {
  height: 200px;
  @apply w-full;
}
</style>
