<template>
  <div class="grid grid-rows-4 lg:grid-rows-2 xl:grid-rows-1 grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-5">
    <div class="total-bor rounded-lg p-6 text-white border border-solid border-gray-300">
      <ContentLoader
        :speed="2"
        width="400"
        height="120"
        primary-color="rgba(214, 210, 210,0.4)"
        secondary-color="rgba(214, 210, 210,7)"
      >
        <rect
          x="0"
          y="0"
          rx="8"
          ry="6"
          width="50%"
          height="27"
        />
        <rect
          x="0"
          y="50"
          rx="8"
          ry="6"
          width="66%"
          height="27"
        />
        <rect
          x="0"
          y="94"
          rx="8"
          ry="6"
          width="20%"
          height="27"
        />
      </ContentLoader>
    </div>
    <div class="rounded-lg p-6 bg-white border border-solid border-gray-300">
      <ContentLoader
        :speed="2"
        width="400"
        height="120"
        primary-color="rgba(214, 210, 210,0.4)"
        secondary-color="rgba(214, 210, 210,0.7)"
      >
        <rect
          x="0"
          y="0"
          rx="8"
          ry="6"
          width="50%"
          height="27"
        />
        <rect
          x="0"
          y="50"
          rx="8"
          ry="6"
          width="66%"
          height="27"
        />
        <rect
          x="0"
          y="94"
          rx="8"
          ry="6"
          width="20%"
          height="27"
        />
      </ContentLoader>
    </div>
    <div class="rounded-lg p-6 bg-white border border-solid border-gray-300">
      <ContentLoader
        :speed="2"
        width="400"
        height="120"
        primary-color="rgba(214, 210, 210,0.4)"
        secondary-color="rgba(214, 210, 210,0.7)"
      >
        <rect
          x="0"
          y="0"
          rx="8"
          ry="6"
          width="50%"
          height="27"
        />
        <rect
          x="0"
          y="50"
          rx="8"
          ry="6"
          width="66%"
          height="27"
        />
        <rect
          x="0"
          y="94"
          rx="8"
          ry="6"
          width="20%"
          height="27"
        />
      </ContentLoader>
    </div>
    <div class="rounded-lg p-6 bg-white border border-solid border-gray-300">
      <ContentLoader
        :speed="2"
        width="400"
        height="120"
        primary-color="rgba(214, 210, 210,0.4)"
        secondary-color="rgba(214, 210, 210,0.7)"
      >
        <rect
          x="0"
          y="0"
          rx="8"
          ry="6"
          width="50%"
          height="27"
        />
        <rect
          x="0"
          y="50"
          rx="8"
          ry="6"
          width="66%"
          height="27"
        />
        <rect
          x="0"
          y="94"
          rx="8"
          ry="6"
          width="20%"
          height="27"
        />
      </ContentLoader>
    </div>
  </div>
</template>

<script>
import { ContentLoader } from 'vue-content-loader'
export default {
  name: 'CardLoader',
  components: {
    ContentLoader
  }
}
</script>
<style scoped>
 .total-bor {
   background-color: #f09b78;
 }
</style>
