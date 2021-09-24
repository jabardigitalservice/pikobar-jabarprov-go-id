<template>
  <div class="card-category">
    <div v-show="!data">
      <div
        v-for="i in 6"
        :key="i"
        class="mb-4 rounded-lg p-4 bg-white"
      >
        <ContentLoader
          :width="320"
          :height="16"
          :speed="3"
          primary-color="#eee"
          secondary-color="#fafafa"
        >
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            rx="4"
            ry="4"
          />
        </ContentLoader>
      </div>
    </div>
    <div
      v-for="(item, index) in data"
      :key="index"
    >
      <div class="card-category__title">
        {{ item.category }}
      </div>
      <div
        v-for="(categori, indexCategori) in item.list"
        :key="indexCategori"
        class="card-category__item hover:bg-green-200"
        :class="{active:categori.id == selected}"
        @click="selected = categori.id"
      >
        {{ categori.title }}
      </div>
    </div>
  </div>
</template>
<script>
import { ContentLoader } from 'vue-content-loader'
export default {
  components: {
    ContentLoader
  },
  props: {
    data: {
      type: Array,
      default () {
        return null
      }
    }
  },
  data () {
    return {
      selected: undefined
    }
  }
}
</script>
<style lang="scss" scoped>
.card-category {
    @apply relative;
    &__title {
        @apply text-gray-500 flex items-center px-3 py-4 text-base font-medium;
    }
    &__item {
        @apply cursor-pointer flex items-center px-3 py-4 text-base font-medium;
    }

    .active {
        &,
        > * {
        @apply bg-green-200 text-brand-green font-bold border-2 border-yellow-300;
        }
    }
}
</style>
