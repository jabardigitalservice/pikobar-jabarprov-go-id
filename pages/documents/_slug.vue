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
        <div class="document">
          <h2 class="document__title">
            {{ item.title }}
          </h2>
          <span class="document__date">
            {{ formatDateDayIndonesia(item.published_at) }}
          </span>
          <div
            class="document__preview"
            :style="`background-image: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.6) 100%), url(${item.images})`"
          >
            <img
              class="document__pdf-logo"
              src="~/assets/icons/pdf.svg"
            >
          </div>
          <span class="document__title-small">
            {{ item.description }}
          </span>
          <div class="document__button-container">
            <button
              class="document__button"
              @click="beforeDownload"
            >
              Unduh
            </button>
            <button
              class="document__button-reverted"
              @click="beforeShare"
            >
              Bagikan
            </button>
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
import { formatDateDayIndonesia } from '~/lib/date'
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
    formatDateDayIndonesia,
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
.document {
  @apply flex flex-col justify-start items-start;

  &__title {
    @apply text-3xl font-bold leading-tight mb-3;

    @screen lg {
      @apply mb-0;
    }
  }

  &__date {
    @apply my-5;

    color: #424242;
  }

  &__preview {
    @apply border border-solid rounded-lg
    w-full flex justify-center py-32 bg-cover;
  }

  &__pdf-logo {
    width: 70px;
    height: 80px;

    @screen sm {
      width: 105px;
      height: 120px;
    }
  }

  &__title-small {
    @apply mt-5;

    color: #212121;
  }

  &__button-container {
    @apply flex flex-col w-full justify-center
    items-center gap-5 mt-5;

    @screen sm {
      @apply flex-row mt-20;
    }
  }

  &__button {
    @apply w-full bg-green-600 border border-transparent
    rounded-md py-3 px-8 flex items-center justify-center
    text-base font-medium text-white;

    @screen lg {
      @apply w-1/4;
    }
  }

  &__button-reverted {
    @apply w-full border border-green-600
    rounded-md py-3 px-8 flex items-center justify-center
    text-base font-medium text-green-600;

    @screen lg {
      @apply w-1/4;
    }
  }
}
</style>
