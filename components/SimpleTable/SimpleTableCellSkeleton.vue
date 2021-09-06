<template>
  <div>
    <!--
    FIXME: do not use content-loader since relative width
    and height on SVG would throw error
  -->
    <ContentLoader
      :speed="2"
      width="100%"
      height="100%"
      class="w-full h-4"
      v-bind="contentLoaderProps"
    >
      <rect
        x="0"
        y="0"
        rx="4"
        ry="4"
        width="100%"
        height="100%"
      />
    </ContentLoader>
  </div>
</template>

<script>
import { ContentLoader } from 'vue-content-loader'

export default {
  components: {
    ContentLoader
  },
  data () {
    return {
      contentLoaderProps: Object.freeze({
        primaryColor: 'black',
        secondaryColor: 'black',
        primaryOpacity: 0.025,
        secondaryOpacity: 0
      })
    }
  }
}
</script>
