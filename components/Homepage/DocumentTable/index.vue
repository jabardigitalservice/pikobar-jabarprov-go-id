<template>
  <!-- eslint-disable vue/valid-v-slot -->
  <SimpleTable
    :headers="headers"
    :rows="documents"
    :loading="loading"
    fixed-layout
    @click:row="onClickRow"
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
</template>

<script>
import { mapState } from 'vuex'
import { formatDateDayIndonesia } from '~/lib/date'
import { SimpleTable } from '~/components/SimpleTable'
export default {
  components: {
    SimpleTable
  },
  props: {
    limit: {
      type: Number,
      default: 8
    }
  },
  data () {
    return {
      headers: Object.freeze([
        {
          value: 'published_at',
          text: 'Tanggal Rilis',
          width: '20ch'
        },
        {
          value: 'title',
          text: 'Judul Dokumen'
        }
      ])
    }
  },
  computed: {
    ...mapState({
      documents: state => state.documents.items
    }),
    loading () {
      return !Array.isArray(this.documents) ||
        !this.documents.length
    }
  },
  mounted () {
    this.$store.dispatch('documents/getItems', {
      limit: this.limit
    })
  },
  methods: {
    formatDateDayIndonesia,
    onClickRow (row, rowIndex) {
      if (row.route) {
        this.$router.push(row.route)
      }
    }
  }
}
</script>
