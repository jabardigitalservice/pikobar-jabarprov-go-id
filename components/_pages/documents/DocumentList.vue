<template>
  <div class="document-list">
    <DocumentItem
      v-for="doc in items"
      :key="doc.id"
      :doc="doc"
    />
    <div v-if="loading">
      <DocumentSkeleton
        v-for="i in 3"
        :key="i"
        class="mb-3"
      />
    </div>
    <div v-if="showLoadMore" class="document-list__container">
      <button
        class="document-list__button"
        @click="onLoadMore"
      >
        Load More
      </button>
    </div>
    <div
      v-if="showEmptyFig"
      class="flex justify-center"
    >
      <img
        src="~/static/img/icon-empty-state.svg"
        alt="img-faq-empty"
        class="mb-5"
      >
    </div>
  </div>
</template>

<script>
import DocumentItem from './DocumentItem.vue'
import DocumentSkeleton from './DocumentSkeleton.vue'
export default {
  components: {
    DocumentItem,
    DocumentSkeleton
  },
  props: {
    items: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    showLoadMore () {
      return !this.loading && this.items?.length
    },
    showEmptyFig () {
      return !this.loading && !this.items?.length
    }
  },
  methods: {
    onLoadMore () {
      this.$emit('load:more')
    }
  }
}
</script>

<style lang="scss" scoped>
.document-list {
  @apply flex flex-col gap-4;

  &__container {
    @apply flex justify-center items-center;
  }

  &__button {
      @apply w-full bg-green-600 border border-transparent
      rounded-md py-3 px-8 flex items-center justify-center
      text-base font-medium text-white mb-10;

      @screen lg {
        @apply w-1/4 ;
      }
  }
}
</style>
