<template>
  <div class="shareable_table">
    <!-- eslint-disable vue/valid-v-slot -->
    <SimpleTable
      fixed-layout
      :headers="headers"
      :rows="items"
      :loading="loading"
      @click:row="onClickItem"
    >
      <template #item.published_at="{ value }">
        <span class="block truncate">
          {{ formatDateDayIndonesia(value) }}
        </span>
      </template>
      <template #item.title="{ value }">
        <span class="block truncate">
          {{ value }}
        </span>
      </template>
    </SimpleTable>
    <div class="flex justify-center items-center">
      <button
        v-if="showLoadMore"
        class="shareable_table__button"
        @click="onLoadMore"
      >
        Load More
      </button>
    </div>
  </div>
</template>

<script>
import { onDownload, onShare } from '~/lib/download-and-share-firestore-doc'
import { SimpleTable } from '~/components/Base/SimpleTable'
import { formatDateDayIndonesia } from '~/lib/date'

export default {
  components: {
    SimpleTable
  },
  props: {
    columns: {
      type: Array,
      default: () => []
    },
    items: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    },
    showLoadMore: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      headers: Object.freeze([
        {
          value: 'published_at',
          text: 'Tanggal Rilis',
          // "table-layout: fixed", along with "white-space: nowrap"
          // mandates for width to be defined explicitly
          // to prevent equal column width
          width: '20ch'
        },
        {
          value: 'title',
          text: 'Judul Dokumen'
        }
      ])
    }
  },
  methods: {
    formatDateDayIndonesia,
    onClickItem (item) {
      this.$router.push({
        path: item.route
      })
    },
    beforeDownload (item) {
      onDownload(item.document_url, item.title)
    },
    beforeShare (item) {
      onShare(item.shareText)
    },
    onLoadMore () {
      this.$emit('load:more')
    }
  }
}
</script>

<style lang="scss" scoped>
.shareable_table {
  &__button {
      @apply w-full mt-6 bg-green-600 border border-transparent
      rounded-md py-3 px-8 flex items-center justify-center
      text-base font-medium text-white;

      @screen lg {
        @apply w-1/4 ;
      }
  }
}
</style>
