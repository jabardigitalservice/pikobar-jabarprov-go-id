<template>
  <div class="document-list">
    <div v-if="loading && !items.length">
      <DocumentSkeleton
        v-for="i in 3"
        :key="i"
        class="mb-3"
      />
    </div>
    <DocumentItem
      v-for="doc in items"
      :key="doc.id"
      :doc="doc"
    />
    <div v-if="!loading" class="document-list__container">
      <button
        class="document-list__button"
        @click="onLoadMore"
      >
        Load More
      </button>
    </div>
  </div>
</template>

<script>
import DocumentItem from './DocumentItem.vue'
import DocumentSkeleton from './DocumentSkeleton.vue'
export default {
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
  components: {
    DocumentItem,
    DocumentSkeleton
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
