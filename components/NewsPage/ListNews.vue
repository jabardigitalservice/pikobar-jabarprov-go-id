<template>
  <div class="news-list">
    <!-- <template v-if="loading"> -->
    <div class="mb-8 rounded-lg p-6 bg-white">
      <ul role="list" class="news-list__grid">
        <li
          v-for="(item, index) in items"
          :key="index"
          class="news-list__grid-item"
        >
          <NewsCarouselItem
            v-bind="item"
          />
        </li>
      </ul>
    </div>
    <!-- </template> -->
    <template v-if="loading">
      <ul role="list" class="news-list__grid">
        <ImageCarouselSkeleton
          v-for="index in 4"
          v-show="loading"
          :key="index+'-loading'"
          class="news-list__grid-loading"
        />
      </ul>
    </template>
    <template v-if="!loading && items.length && !hasReachedEnd">
      <div class="text-center">
        <button
          type="button"
          class="news-list__button"
          @click="onLoadMore"
        >
          Load More
        </button>
      </div>
    </template>
    <template v-if="!loading && !items.length && hasReachedEnd">
      <div class="flex justify-center">
        <img src="~/static/img/icon-empty-state.svg" alt="img-faq-empty">
      </div>
    </template>
  </div>
</template>
<script>

import NewsCarouselItem from '~/components/Base/NewsCarousel/NewsCarouselItem'
import ImageCarouselSkeleton from '~/components/Base/ImageCarousel/ImageCarouselSkeleton'

export default {
  components: {
    NewsCarouselItem,
    ImageCarouselSkeleton
  },
  props: {
    items: {
      type: Array,
      default: () => {
        return []
      }
    },
    onLoadMore: {
      type: Function,
      default: null
    },
    loading: {
      type: Boolean,
      default: false
    },
    hasReachedEnd: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style lang="scss" scoped>
  .news-list {
    &__grid {
      @apply grid grid-cols-1 gap-6 grid-cols-1 pb-10;

      @screen lg {
        @apply grid-cols-4;
      }

      &-loading {
        @apply col-span-1 flex;
      }

      &-item {
        @apply col-span-1 flex flex-col;
      }
    }

    &__button {
        @apply inline-flex items-center px-16 py-3 font-bold
        border border-transparent text-sm leading-4 font-medium
        rounded-md shadow-sm text-white bg-green-600;
    }
  }
</style>
