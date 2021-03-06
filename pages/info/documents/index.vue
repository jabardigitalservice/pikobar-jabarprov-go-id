<template>
  <div>
    <section>
      <h2 class="text-xl md:text-3xl leading-normal">
        <b>Dokumen</b>
        <br>
        <p class="text-base opacity-75">
          Lihat dan unduh dokumen serta rilis pers seputar informasi COVID-19 di Jawa Barat.
          Dokumen dan rilis pers yang ditampilkan berdasarkan informasi resmi dari
          Pemerintah Provinsi Jawa Barat.
        </p>
      </h2>
      <br>
      <ShareableItemTable
        :columns="shareableDocumentsColumns"
        :items="shareableDocuments"
        :show-load-more="true"
        @load:more="onLoadMore"
      />
    </section>
  </div>
</template>

<script>
import _get from 'lodash/get'
import { mapState, mapActions } from 'vuex'
import { analytics } from '~/lib/firebase'
import { formatDateTimeShort } from '~/lib/date'
import ShareableItemTable from '~/components/ShareableItemTable'
export default {
  components: {
    ShareableItemTable
  },
  data () {
    return {
      isPending: true,
      columns: [
        {
          prop: 'published_at',
          label: 'Tanggal Rilis'
        },
        {
          prop: 'title',
          label: 'Judul Dokumen'
        }
      ]
    }
  },
  computed: {
    ...mapState('documents', {
      documents: 'items'
    }),
    shareableDocumentsColumns () {
      return [
        {
          prop: 'published_at',
          format: v => formatDateTimeShort(v),
          label: 'Tanggal Rilis'
        },
        {
          prop: 'title',
          label: 'Judul Dokumen'
        }
      ]
    },
    shareableDocuments () {
      return this.documents
        .map((item) => {
          return {
            ...item,
            shareable: true,
            downloadable: true
          }
        })
    }
  },
  mounted () {
    this.isPending = true
    this.getItems({ fresh: true })
      .finally(() => {
        if (process.browser) {
          analytics.logEvent('documents_list_view')
        }
        this.isPending = false
      })
  },
  methods: {
    ...mapActions('documents', {
      getItems: 'getItems'
    }),
    getCellValue (column, row, columnIndex, rowIndex) {
      return _get(row, column.prop)
    },
    onLoadMore () {
      this.getItems({ fresh: true })
    }
  },
  head () {
    const title = 'Infografis - Pikobar [Pusat Informasi dan Koordinasi COVID-19 Jawa Barat]'
    return {
      title,
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          content: title
        },
        {
          hid: 'og:type',
          property: 'og:type',
          content: 'article'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.infographic-list {
  display: grid;
  grid-template-columns: 1fr;
  column-gap: 1.5rem;
  row-gap: 3rem;

  &__item-image {
    height: 256px;
  }

  @screen md {
    grid-template-columns: 1fr 1fr;
  }

  @screen lg {
    grid-template-columns: 1fr 1fr 1fr;
  }
}
</style>
