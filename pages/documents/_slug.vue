<template>
  <div>
    <Section
      class="bg-white py-6 md:py-16"
    >
      <div class="text-green-500 space-x-2 pb-8 cursor-pointer" @click="$router.go(-1)">
        <FontAwesomeIcon :icon="icon.faArrowLeft" class="mr-3" />
        Kembali
      </div>
      <template v-if="isPending">
        <ContentLoader
          :speed="2"
          width="400"
          height="200"
        >
          <rect
            x="0"
            y="0"
            rx="0"
            ry="0"
            width="100%"
            height="100%"
          />
        </ContentLoader>
      </template>
      <template v-else-if="item">
        <div class="flex flex-col justify-start items-start">
          <h2 class="text-3xl font-bold leading-tight mb-3 lg:mb-0">
            {{ item.title }}
          </h2>
          <p class="flex-none text-sm text-gray-600">
            <button
              class="px-2 py-2 mr-1 rounded-md hover:bg-gray-300"
              @click="beforeDownload"
            >
              <FontAwesomeIcon :icon="icon.faDownload" class="mr-1" />
              <span>
                Unduh
              </span>
            </button>
            <button
              class="px-2 py-2 rounded-md hover:bg-gray-300"
              @click="beforeShare"
            >
              <FontAwesomeIcon :icon="icon.faShare" class="mr-1" />
              <span>
                Bagikan
              </span>
            </button>
          </p>
        </div>
        <br>
        <div class="flex flex-row justify-start items-start">
          <div class="hidden md:inline-block px-4 py-3 mr-4 text-red-600 rounded-lg border border-solid border-gray-300">
            <FontAwesomeIcon :icon="icon.faFilePdf" style="font-size: 5rem;" />
          </div>
          <div style="display: grid; grid-template-columns: auto auto 1fr; gap: 1rem 0.5rem">
            <span>
              Tanggal Rilis
            </span>
            <small>:</small>
            <p>
              {{ formatDateTimeShort(item.published_at) }}
            </p>
            <span>
              Judul
            </span>
            <small>:</small>
            <p>
              {{ item.title }}
            </p>
            <span>
              Deskripsi
            </span>
            <small>:</small>
            <p>
              {{ item.description }}
            </p>
          </div>
        </div>
      </template>
    </Section>
    <div />
  </div>
</template>

<script>
import { faDownload, faArrowLeft, faShare, faFilePdf } from '@fortawesome/free-solid-svg-icons'
import { ContentLoader } from 'vue-content-loader'
import { onDownload, onShare } from '~/lib/download-and-share-firestore-doc'
import { analytics } from '~/lib/firebase'
import { formatDateTimeShort } from '~/lib/date'
import { useArticleMetaInfo } from '~/lib/metainfo'
import Section from '~/components/Base/Section'

const regex = /(?:(-dcmnt\.))(.*)$/
export default {
  components: {
    ContentLoader,
    Section
  },
  validate ({ redirect, params }) {
    const { slug } = params
    if (!slug || typeof slug !== 'string') {
      redirect('/info/documents')
      return
    }
    return true
  },
  async fetch () {
    await this.fetchItem()
      .then(() => {
        this.isPending = false
      })
  },
  data () {
    return {
      icon: {
        faDownload,
        faShare,
        faFilePdf,
        faArrowLeft
      },
      isPending: true
    }
  },
  computed: {
    itemId () {
      const slug = this.$route.params.slug
      if (slug.includes('-dcmnt.')) {
        const matched = regex.exec(slug)
        return matched && matched.length ? matched[2] : null
      } else {
        return slug
      }
    },
    item () {
      return this.$store.getters['documents/itemsMap'][this.itemId]
    }
  },
  methods: {
    formatDateTimeShort,
    fetchItem () {
      this.isPending = true
      return this.$store.dispatch('documents/getItemById', this.itemId)
        .then(() => {
          if (process.client || process.browser) {
            analytics.logEvent('document_detail_view', { id: this.$route.params.slug })
          }
        })
        .finally(() => {
          this.isPending = false
        })
    },
    beforeShare () {
      onShare(this.item.shareText)
    },
    beforeDownload () {
      onDownload(this.item.document_url, this.item.title)
    }
  },
  head () {
    if (this.item) {
      const { title, description, route, published_at: publishedAt } = this.item
      const date = publishedAt && typeof publishedAt.toISOString === 'function'
        ? publishedAt.toISOString()
        : ''
      return useArticleMetaInfo({
        title,
        description,
        publishedTime: date,
        url: `${process.env.URL}${route}`
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
